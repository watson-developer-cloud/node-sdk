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

// new Buffer() is deprecated, replaced with Buffer.from() in node v4.5.0+ -
// `buffer-from` uses the new api when possible but falls back to the old one otherwise
import bufferFrom = require('buffer-from');
import extend = require('extend');
import request = require('request');
import vcapServices = require('vcap_services');
import { IamTokenManagerV1 } from '../iam-token-manager/v1';
import { stripTrailingSlash } from './helper';
import { sendRequest } from './requestwrapper';

// custom interfaces
export interface HeaderOptions {
  'X-Watson-Learning-Opt-Out'?: boolean;
  [key: string]: any;
}

export interface UserOptions {
  url?: string;
  version?: string;
  username?: string;
  password?: string;
  api_key?: string;
  apikey?: string;
  use_unauthenticated?: boolean;
  headers?: HeaderOptions;
  token?: string;
  iam_access_token?: string;
  iam_apikey?: string;
  iam_url?: string;
}

export interface BaseServiceOptions extends UserOptions {
  headers: HeaderOptions;
  url: string;
  jar?: request.CookieJar;
  qs: any;
}

export interface Credentials {
  username?: string;
  password?: string;
  api_key?: string;
  url?: string;
  iam_access_token?: string;
  iam_apikey?: string;
  iam_url?: string;
}

function hasCredentials(obj: any): boolean {
  return (
    obj &&
    ((obj.username && obj.password) ||
      obj.api_key ||
      obj.iam_access_token ||
      obj.iam_apikey)
  );
}

function hasBasicCredentials(obj: any): boolean {
  return obj && obj.username && obj.password && obj.username !== 'apikey';
}

export class BaseService {
  static URL: string;
  name: string;
  serviceVersion: string;
  protected _options: BaseServiceOptions;
  protected serviceDefaults: object;
  protected tokenManager;

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
  constructor(userOptions: UserOptions) {
    if (!(this instanceof BaseService)) {
      // it might be better to just create a new instance and return that..
      // but that can't be done here, it has to be done in each individual service.
      // So this is still a good failsafe even in that case.
      throw new Error(
        'the "new" keyword is required to create Watson service instances'
      );
    }
    const options = extend({}, userOptions);
    const _options = this.initCredentials(options);
    // If url is not specified, visual recognition requires gateway-a for CF instances
    // https://github.ibm.com/Watson/developer-experience/issues/4589
    if (_options && this.name === 'watson_vision_combined' && !_options.url && _options.api_key && !_options.iam_apikey){
      _options.url = 'https://gateway-a.watsonplatform.net/visual-recognition/api';
    }
    if (options.url) {
      _options.url = stripTrailingSlash(options.url);
    }
    const serviceClass = this.constructor as typeof BaseService;
    this._options = extend(
      { qs: {}, url: serviceClass.URL },
      this.serviceDefaults,
      options,
      _options
    );
    if (_options.iam_apikey || _options.iam_access_token) {
      this.tokenManager = new IamTokenManagerV1({
        iamApikey: _options.iam_apikey,
        iamAccessToken: _options.iam_access_token,
        iamUrl: _options.iam_url
      });
    } else if (_options.username === 'apikey') {
      this.tokenManager = new IamTokenManagerV1({
        iamApikey: _options.password,
        iamUrl: _options.iam_url
      });
    } else {
      this.tokenManager = null;
    }
  }

  /**
   * Retrieve this service's credentials - useful for passing to the authorization service
   *
   * Only returns a URL when token auth is used.
   *
   * @returns {Credentials}
   */
  public getCredentials(): Credentials {
    const credentials = {} as Credentials;
    if (this._options.username) {
      credentials.username = this._options.username;
    }
    if (this._options.password) {
      credentials.password = this._options.password;
    }
    if (this._options.api_key) {
      credentials.api_key = this._options.api_key;
    }
    if (this._options.url) {
      credentials.url = this._options.url;
    }
    if (this._options.iam_access_token) {
      credentials.iam_access_token = this._options.iam_access_token;
    }
    if (this._options.iam_apikey) {
      credentials.iam_apikey = this._options.iam_apikey;
    }
    if (this._options.iam_url) {
      credentials.iam_url = this._options.iam_url;
    }
    return credentials;
  }

  /**
   * Set an IAM access token to use when authenticating with the service.
   * The access token should be valid and not yet expired.
   *
   * By using this method, you accept responsibility for managing the
   * access token yourself. You must set a new access token before this
   * one expires. Failing to do so will result in authentication errors
   * after this token expires.
   *
   * @param {string} iam_access_token - A valid, non-expired IAM access token
   * @returns {void}
   */
  public setAccessToken(iam_access_token: string) { // tslint:disable-line variable-name
    if (this.tokenManager) {
      this.tokenManager.setAccessToken(iam_access_token);
    } else {
      this.tokenManager = new IamTokenManagerV1({
        iamAccessToken: iam_access_token
      });
    }
  }

  /**
   * Guarantee that the next request you make will be IAM authenticated. This
   * performs any requests necessary to get a valid IAM token so that if your
   * next request involves a streaming operation, it will not be interrupted.
   *
   * @param {Function} callback - callback function to return flow of execution
   *
   * @returns {void}
   */
  protected preAuthenticate(callback): void {
     if (Boolean(this.tokenManager)) {
      return this.tokenManager.getToken((err, token) => {
        if (err) {
          callback(err);
        }
        callback(null);
      });
    } else {
      callback(null);
    }
  }

  /**
   * Wrapper around `sendRequest` that determines whether or not IAM tokens
   * are being used to authenticate the request. If so, the token is 
   * retrieved by the token manager.
   *
   * @param {Object} parameters - service request options passed in by user
   * @param {Function} callback - callback function to pass the response back to
   * @returns {ReadableStream|undefined}
   */
  protected createRequest(parameters, callback) {
    if (Boolean(this.tokenManager)) {
      return this.tokenManager.getToken((err, accessToken) => {
        if (err) {
          return callback(err);
        }
        parameters.defaultOptions.headers.Authorization =
          `Bearer ${accessToken}`;
        return sendRequest(parameters, callback);
      });
    } else {
      return sendRequest(parameters, callback);
    }
  }

  /**
   * @private
   * @param {UserOptions} options
   * @returns {BaseServiceOptions}
   */
  private initCredentials(options: UserOptions): BaseServiceOptions {
    let _options: BaseServiceOptions = {} as BaseServiceOptions;
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
    if (!_options.use_unauthenticated) {
      if (!hasCredentials(_options)) {
        const errorMessage = 'Insufficient credentials provided in ' +
          'constructor argument. Refer to the documentation for the ' +
          'required parameters. Common examples are username/password, ' +
          'api_key, and iam_access_token.';
        throw new Error(errorMessage);
      }
      if (hasBasicCredentials(_options)) {
        // Calculate and add Authorization header to base options
        const encodedCredentials = bufferFrom(
          `${_options.username}:${_options.password}`
        ).toString('base64');
        const authHeader = { Authorization: `Basic ${encodedCredentials}` };
        _options.headers = extend(authHeader, _options.headers);
      } else {
        _options.qs = extend({ api_key: _options.api_key }, _options.qs);
      }
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
    if (name === 'watson_vision_combined') {
      return this.getCredentialsFromEnvironment('visual_recognition');
    }
    // Case handling for assistant - should look for assistant env variables before conversation
    if (name === 'conversation' && (process.env[`ASSISTANT_USERNAME`] ||  process.env[`ASSISTANT_IAM_APIKEY`])) {
       return this.getCredentialsFromEnvironment('assistant');
    }
    const _name: string = name.toUpperCase();
    // https://github.com/watson-developer-cloud/node-sdk/issues/605
    const nameWithUnderscore: string = _name.replace(/-/g, '_');
    const username: string = process.env[`${_name}_USERNAME`] || process.env[`${nameWithUnderscore}_USERNAME`];
    const password: string = process.env[`${_name}_PASSWORD`] || process.env[`${nameWithUnderscore}_PASSWORD`];
    const apiKey: string = process.env[`${_name}_API_KEY`] || process.env[`${nameWithUnderscore}_API_KEY`];
    const url: string = process.env[`${_name}_URL`] || process.env[`${nameWithUnderscore}_URL`];
    const iamAccessToken: string = process.env[`${_name}_IAM_ACCESS_TOKEN`] || process.env[`${nameWithUnderscore}_IAM_ACCESS_TOKEN`];
    const iamApiKey: string = process.env[`${_name}_IAM_APIKEY`] || process.env[`${nameWithUnderscore}_IAM_APIKEY`];
    const iamUrl: string = process.env[`${_name}_IAM_URL`] || process.env[`${nameWithUnderscore}_IAM_URL`];

    return {
      username,
      password,
      api_key: apiKey,
      url,
      iam_access_token: iamAccessToken,
      iam_apikey: iamApiKey,
      iam_url: iamUrl
    };
  }
  /**
   * Pulls credentials from VCAP_SERVICES env property that bluemix sets
   * @param {string} vcap_services_name
   * @private
   * @returns {Credentials}
   */
  private getCredentialsFromBluemix(vcapServicesName: string): Credentials {
    let credentials: Credentials;
    let temp: any;
    if (this.name === 'visual_recognition') {
      temp = vcapServices.getCredentials('watson_vision_combined');
    } if (this.name === 'assistant') {
      temp = vcapServices.getCredentials('conversation');
    } else {
      temp = vcapServices.getCredentials(vcapServicesName);
    }
    // convert an iam apikey to use the identifier iam_apikey
    if (temp.apikey && temp.iam_apikey_name) {
      temp.iam_apikey = temp.apikey;
      delete temp.apikey;
    }
    credentials = temp;
    return credentials;
  }
}
