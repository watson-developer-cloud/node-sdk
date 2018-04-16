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

import extend = require('extend');
import { sendRequest } from '../lib/requestwrapper';

export type Options = {
  iam_apikey?: string;
  iam_access_token?: string;
  iam_url?: string;
}

export interface IamTokenData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expiration: number;
}

export class IamTokenManagerV1 {
  name: string;
  serviceVersion: string;
  protected url: string;
  protected tokenInfo: IamTokenData;
  private iam_apikey: string; // tslint:disable-line variable-name
  private userAccessToken: string;

  /**
   * IAM Token Manager Service
   *
   * Retreives, stores, and refreshes IAM tokens.
   *
   * @param {Object} options
   * @param {String} options.iam_apikey
   * @param {String} options.iam_access_token
   * @param {String} options.iam_url - url of the iam api to retrieve tokens from
   * @constructor
   */
  constructor(options: Options) {
    this.url = options.iam_url || 'https://iam.ng.bluemix.net/identity/token';
    this.tokenInfo = {} as IamTokenData;
    if (options.iam_apikey) {
      this.iam_apikey = options.iam_apikey;
    }
    if (options.iam_access_token) {
      this.userAccessToken = options.iam_access_token;
    }
  }

  /**
   * This function sends an access token back through a callback. The source of the token
   * is determined by the following logic:
   * 1. If user provides their own managed access token, assume it is valid and send it
   * 2. If this class is managing tokens and does not yet have one, make a request for one
   * 3. If this class is managing tokens and the token has expired, refresh it
   * 4. If this class is managing tokens and has a valid token stored, send it
   *
   * @param {Function} cb - callback function that the token will be passed to
   */
  public getToken(cb: Function) {
    if (this.userAccessToken) {
      // 1. use user-managed token
      return cb(null, this.userAccessToken);
    } else if (!this.tokenInfo.access_token) {
      // 2. request an initial token
      this.requestToken(null, (err, tokenResponse) => {
        this.saveTokenInfo(tokenResponse);
        return cb(err, this.tokenInfo.access_token);
      });
    } else if (this.isTokenExpired()) {
      // 3. refresh a token
      this.refreshToken(null, (err, tokenResponse) => {
        this.saveTokenInfo(tokenResponse);
        return cb(err, this.tokenInfo.access_token);
      });
    } else {
      // 4. use valid managed token
      return cb(null, this.tokenInfo.access_token);
    }
  }

  /**
   * Request an IAM token using an API key.
   *
   * @param {string} authHeader - The authorization header to send to the service. Defaults to 'Basic Yng6Yng='.
   * @param {Function} cb - The callback that handles the response.
   * @returns {void}
   */
  public requestToken(authHeader: string, cb: Function): void {
    const authorization = authHeader || 'Basic Yng6Yng=';
    const parameters = {
      options: {
        url: this.url,
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: authorization
        },
        form: {
          grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
          apikey: this.iam_apikey,
          response_type: 'cloud_iam'
        }
      }
    };
    sendRequest(parameters, (error, body, response) => {
      cb(error, body);
    });

  }

  /**
   * Refresh an IAM token using a refresh token.
   *
   * @param {string} authHeader - The authorization header to send to the service. Defaults to 'Basic Yng6Yng='.
   * @param {Function} cb - The callback that handles the response.
   * @returns {void}
   */
  public refreshToken(authHeader: string, cb: Function) {
    const authorization = authHeader || 'Basic Yng6Yng=';
    const parameters = {
      options: {
        url: this.url,
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: authorization
        },
        form: {
          grant_type: 'refresh_token',
          refresh_token: this.tokenInfo.refresh_token
        }
      }
    };
    sendRequest(parameters, (error, body, response) => {
      cb(error, body);
    });
  }

  /**
   * Set a self-managed IAM access token.
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
  public setAccessToken(iam_access_token: string): void { // tslint:disable-line variable-name
    this.userAccessToken = iam_access_token;
  }

  /**
   * Check if currently stored token is expired.
   * 
   * Using a buffer to prevent the edge case of the 
   * token expiring before the request could be made.
   *
   * The buffer will be a fraction of the total TTL. Using 80%.
   *
   * @private
   * @returns {boolean}
   */
  private isTokenExpired(): boolean {
    const fractionOfTtl = 0.8;
    const timeToLive = this.tokenInfo.expires_in;
    const expireTime = this.tokenInfo.expiration;
    return expireTime - (timeToLive * (1.0 - fractionOfTtl))
      < Math.floor(Date.now() / 1000);
  }

  /**
   * Save the response from the IAM service request to the object's state.
   *
   * @param {IamTokenData} tokenResponse - Response object from IAM service request
   * @private
   * @returns {void}
   */
  private saveTokenInfo(tokenResponse: IamTokenData): void {
    this.tokenInfo = extend({}, tokenResponse);
  }
}
