/**
 * (C) Copyright IBM Corp. 2015, 2019.
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

import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, TokenRequestBasedAuthenticator, UserOptions } from 'ibm-cloud-sdk-core';
import url = require('url');

class AuthorizationV1 extends BaseService {
  static URL: string = 'https://stream.watsonplatform.net/authorization/api';
  name: string; // set by prototype to 'authorization'
  serviceVersion: string; // set by prototype to 'v1'
  // tslint:disable-next-line:variable-name
  targetUrl?: string;

  /**
   * Authorization Service
   *
   * Generates temporary auth tokens for use in untrusted environments.
   * Tokens expire after one hour.
   *
   * @param {Object} options
   * @constructor
   */
  constructor(options: UserOptions) {
    super(options);
    this.targetUrl = options.url;
    // replace the url to always point to /authorization/api
    const hostname = url.parse(this.baseOptions.url);
    hostname.pathname = '/authorization/api';
    this.baseOptions.url = url.format(hostname);
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
      params = { url: this.targetUrl };
    }

    const authenticator = this.getAuthenticator();

    // if the authenticator is managing a token, return that token
    if (authenticator instanceof TokenRequestBasedAuthenticator) {
      const options = { headers: {} };
      return authenticator.authenticate(options).then(
        () => {
          callback(null, parseTokenFromHeader(options.headers));
        },
        err => {
          callback(err);
        }
      );
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
      defaultOptions: this.baseOptions
    };
    return this.createRequest(parameters).then(
      res => {
        callback(null, res);
        return res;
      },
      err => {
        callback(err);
      }
    );
  }
}

AuthorizationV1.prototype.name = 'authorization';
AuthorizationV1.prototype.serviceVersion = 'v1';

/*************************
 * interfaces
 ************************/

namespace AuthorizationV1 {
  export interface GetTokenResponse {
    result: string;
    status?: number;
    statusText?: string;
    headers?: IncomingHttpHeaders;
  }

  /** The callback for the getToken request. */
  export type GetTokenCallback = (error?: Error, response?: string|GetTokenResponse) => void;

  /** Parameters for the `getToken` operation */
  export interface GetTokenParams {
    url?: string;
  }
}

function parseTokenFromHeader(headers) {
  // get token from format `basic TOKEN` or `bearer TOKEN`
  return headers.Authorization ? headers.Authorization.split(' ')[1] : null;
}

export = AuthorizationV1;
