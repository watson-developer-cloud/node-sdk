/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import * as extend from 'extend';
import * as request from 'request';
import * as vcapServices from 'vcap_services';
// new Buffer() is deprecated, replaced with Buffer.from() in node v4.5.0+ -
// `buffer-from` uses the new api when possible but falls back to the old one otherwise
import * as bufferFrom from 'buffer-from';
import { stripTrailingSlash } from './helper';

// custom interfaces
interface HeaderOptions {
  'X-Watson-Learning-Opt-Out'?: boolean;
  [key: string]: any;
}

interface UserOptions {
  url?: string;
  version_date?: string;
  username?: string;
  password?: string;
  api_key?: string;
  apikey?: string;
  use_unauthenticated?: boolean;
  headers?: HeaderOptions;
  token?: string;
}

interface BaseServiceOptions extends UserOptions {
  headers: HeaderOptions;
  url: string;
  jar?: request.CookieJar;
  qs: any;
}

interface Credentials {
  username: string;
  password: string;
  api_key: string;
  url: string;
}

// custom type guards
function hasCredentials(obj: any): boolean {
  return (
    (obj &&
      (obj.hasOwnProperty('username') &&
        obj.hasOwnProperty('password') &&
        obj['username'] &&
        obj['password'])) ||
    (obj.hasOwnProperty('api_key') && obj['api_key'])
  );
}

function hasUseUnauthenticated(obj: any): boolean {
  return (
    obj &&
    obj.hasOwnProperty('use_unauthenticated') &&
    obj['use_unauthenticated'] === true
  );
}

function acceptsApiKey(name: string): boolean {
  return name === 'watson_vision_combined' || name === 'visual_recognition';
}

export class BaseService {
  protected 'constructor': typeof BaseService;
  protected _options: BaseServiceOptions;
  protected serviceDefaults: object;
  static URL: string;
  name: string;
  version: string;
  /**
   * Internal base class that other services inherit from
   * @param {UserOptions} options
   * @param {string} [options.username] - required unless use_unauthenticated is set
   * @param {string} [options.password] - required unless use_unauthenticated is set
   * @param {boolean} [options.use_unauthenticated] - skip credential requirement
   * @param {HeaderOptions} [options.headers]
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out=false] - opt-out of data collection
   * @param {string} [options.url] - override default service base url
   * @private
   * @abstract
   * @constructor
   * @throws {Error}
   * @returns {BaseService}
   */
  constructor(user_options: UserOptions) {
    if (!(this instanceof BaseService)) {
      // it might be better to just create a new instance and return that..
      // but that can't be done here, it has to be done in each individual service.
      // So this is still a good failsafe even in that case.
      throw new Error(
        'the "new" keyword is required to create Watson service instances'
      );
    }
    const options = extend({}, user_options);
    const _options = this.initCredentials(options);
    if (options.url) {
      _options.url = stripTrailingSlash(options.url);
    }
    this._options = extend(
      { qs: {}, url: this.constructor.URL },
      this.serviceDefaults,
      options,
      _options
    );
  }
  /**
   * @private
   * @param {UserOptions} options
   * @returns {BaseServiceOptions}
   */
  private initCredentials(options: UserOptions): BaseServiceOptions {
    let _options: BaseServiceOptions = <BaseServiceOptions>{};
    if (options.token) {
      options.headers = options.headers || {};
      options.headers['X-Watson-Authorization-Token'] = options.token;
      _options = extend(_options, options);
      return _options;
    }
    if (options.api_key || options.apikey) {
      _options.api_key = options.api_key || options.apikey;
    }
    _options.jar = request.jar();
    // Get credentials from environment properties or Bluemix,
    // but prefer credentials provided programatically
    _options = extend(
      {},
      this.getCredentialsFromBluemix(this.name),
      this.getCredentialsFromEnvironment(this.name),
      options,
      _options
    );
    if (!hasUseUnauthenticated(_options)) {
      if (!hasCredentials(_options) && acceptsApiKey(this.name)) {
        throw new Error(
          'Argument error: api_key or username/password are' +
            ' required unless use_unauthenticated is set'
        );
      } else if (!hasCredentials(_options)) {
        throw new Error(
          'Argument error: username and password are required unless use_unauthenticated is set'
        );
      }
    }
    if (!acceptsApiKey(this.name)) {
      // Calculate and add Authorization header to base options
      const encodedCredentials = bufferFrom(
        `${_options.username}:${_options.password}`
      ).toString('base64');
      const authHeader = { Authorization: `Basic ${encodedCredentials}` };
      _options.headers = extend(authHeader, _options.headers);
    } else {
      _options.qs = extend({ api_key: _options.api_key }, _options.qs);
    }
    return _options;
  }
  /**
   * Pulls credentials from env properties
   *
   * Property checked is uppercase service.name suffixed by _USERNAME and _PASSWORD
   *
   * For example, if service.name is speech_to_text, 
   * env properties are SPEECH_TO_TEXT_USERNAME and SPEECH_TO_TEXT_PASSWORD
   *
   * @private
   * @param {string} name - the service snake case name
   * @returns {Credentials}
   */
  private getCredentialsFromEnvironment(name: string): Credentials {
    const envCredentials = <Credentials>{};
    const _name: string = name.toUpperCase();
    const _alternate_name: string =
      name === 'watson_vision_combined' ? 'VISUAL_RECOGNITION' : null;
    const _username: string =
      process.env[`${_name}_USERNAME`] ||
      process.env[`${_alternate_name}_USERNAME`];
    const _password: string =
      process.env[`${_name}_PASSWORD`] ||
      process.env[`${_alternate_name}_PASSWORD`];
    const _api_key: string =
      process.env[`${_name}_API_KEY`] ||
      process.env[`${_alternate_name}_API_KEY`];
    const _url: string =
      process.env[`${_name}_URL`] || process.env[`${_alternate_name}_URL`];
    return {
      username: _username,
      password: _password,
      api_key: _api_key,
      url: _url
    };
  }
  /**
   * Pulls credentials from VCAP_SERVICES env property that bluemix sets
   * @param {string} vcap_services_name
   * @private
   * @returns {Credentials}
   */
  private getCredentialsFromBluemix(vcap_services_name: string): Credentials {
    const _alternate_vcap_services_name =
      vcap_services_name === 'watson_vision_combined'
        ? 'visual_recognition'
        : null;
    return (
      vcapServices.getCredentials(vcap_services_name) ||
      vcapServices.getCredentials(_alternate_vcap_services_name)
    );
  }
  /**
   * Retrieve this service's credentials - useful for passing to the authorization service
   * 
   * Only returns a URL when token auth is used.
   *
   * @returns {Credentials}
   */
  public getCredentials(): Credentials {
    const _credentials = <Credentials>{};
    if (this._options.username) {
      _credentials.username = this._options.username;
    }
    if (this._options.password) {
      _credentials.password = this._options.password;
    }
    if (this._options.api_key) {
      _credentials.api_key = this._options.api_key;
    }
    if (this._options.url) {
      _credentials.url = this._options.url;
    }
    return _credentials;
  }
}
