/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
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

import { IncomingHttpHeaders } from 'http';
import { BaseService } from 'ibm-cloud-sdk-core';
import url = require('url');

class AuthorizationV1 extends BaseService {
  static URL: string = 'https://stream.watsonplatform.net/authorization/api';
  name: string; // set by prototype to 'authorization'
  serviceVersion: string; // set by prototype to 'v1'
  // tslint:disable-next-line:variable-name
  target_url?: string;

  /**
   * Authorization Service
   *
   * Generates temporary auth tokens for use in untrusted environments.
   * Tokens expire after one hour.
   *
   * @param {Object} options
   * @param {String} options.username
   * @param {String} options.password
   * @param {String} [options.url] url of the service for which auth tokens are being generated
   * @constructor
   */
  constructor(options: AuthorizationV1.Options) {
    super(options);
    this.target_url = options.url;
    // replace the url to always point to /authorization/api
    const hostname = url.parse(this._options.url);
    hostname.pathname = '/authorization/api';
    this._options.url = url.format(hostname);
  }

  /**
   * If using an RC service, get an IAM access token. If using a CF service,
   * get a percent-encoded authorization token based on resource query string param
   *
   * @param {Object} [options]
   * @param {String} [options.url] defaults to url supplied to constructor (if any)
   * @param {Function(err, token)} callback - called with a %-encoded token if CF
   */
  getToken(params: AuthorizationV1.GetTokenParams | AuthorizationV1.GetTokenCallback, callback?: AuthorizationV1.GetTokenCallback) {
    if (typeof params === 'function') {
      callback = params;
      params = { url: this.target_url };
    }

    // if the service is an RC instance, return an IAM access token
    if (this.tokenManager) {
      // callback should expect (err, token) format,
      // which is what the token manager will pass in
      return this.tokenManager.getToken(callback);
    }

    // otherwise, return a CF Watson token
    if (!params.url) {
      callback(new Error('Missing required parameters: url'));
      return;
    }
    const parameters = {
      options: {
        method: 'GET',
        url: '/v1/token?url=' + params.url
      },
      defaultOptions: this._options
    };
    return this.createRequest(parameters, callback);
  }
}

AuthorizationV1.prototype.name = 'authorization';
AuthorizationV1.prototype.serviceVersion = 'v1';

/*************************
 * interfaces
 ************************/

namespace AuthorizationV1 {
  /** Options for the AuthorizationV1 constructor */
  export type Options = {
    username: string;
    password: string;
    url?: string;
  }

  export interface GetTokenResponse {
    result: string;
    data: string; // for compatibility
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for the getToken request. */
  export type GetTokenCallback = (error: any, token?: string, response?: GetTokenResponse) => void;

  /** Parameters for the `getToken` operation */
  export interface GetTokenParams {
    url?: string;
  }
}

export = AuthorizationV1;
