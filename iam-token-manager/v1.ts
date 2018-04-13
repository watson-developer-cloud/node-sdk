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

import request = require('request');

export type Options = {
  iam_apikey?: string;
  access_token?: string;
  iam_url?: string;
}

export interface IamTokenData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expiration: number;
}

export interface TokenRequestParams {
  contentType?: string;
  authHeader?: string;
  grantType?: string;
  responseType?: string;
}

export interface TokenRefreshParams {
  contentType?: string;
  authHeader?: string;
}

export class IamTokenManagerV1 {
  name: string;
  serviceVersion: string;
  protected url: string;
  protected tokenInfo: IamTokenData;
  private apikey: string;
  private userAccessToken: string;

  /**
   * IAM Token Manager Service
   *
   * Retreives, stores, and refreshes IAM tokens.
   *
   * @param {Object} options
   * @param {String} options.iam_apikey
   * @param {String} options.access_token
   * @param {String} options.iam_url - url of the iam api to retrieve tokens from
   * @constructor
   */
  constructor(options: Options) {
    this.url = options.iam_url || 'https://iam.ng.bluemix.net/identity/token';
    this.tokenInfo = {} as IamTokenData;
    if (options.iam_apikey) {
      this.apikey = options.iam_apikey;
    }
    if (options.access_token) {
      this.userAccessToken = options.access_token;
    }
  }

  /**
   * This function sends an access token back through a callback. The source of the token
   * is determined by the following logic:
   * 1. If user provides their own managed access token, assume it is valid and send it
   * 2. If this class is managing tokens and does not yet have one, make a request for one
   * 3. If this class is managing tokens and the token has expired, refresh it
   * 4. If this class is managing tokens and has a valid token stored, send it
   */
  public getManagedToken(cb: Function) {
    if (this.userAccessToken) {
      // 1. use user-managed token
      return cb(this.userAccessToken);
    } else if (this.needToRequestToken()) {
      // 2. request an initial token
      this.requestToken({}, tokenResponse => {
        this.saveTokenInfo(tokenResponse);
        return cb(this.tokenInfo.access_token);
      });
    } else if (this.tokenIsExpired()) {
      // 3. refresh a token
      this.refreshToken({}, tokenResponse => {
        this.saveTokenInfo(tokenResponse);
        return cb(this.tokenInfo.access_token);
      });
    } else {
      // 4. use valid managed token
      return cb(this.tokenInfo.access_token);
    }
  }

  public requestToken(params: TokenRequestParams, cb: Function): void {
    const contentType = params.contentType ||
      'application/x-www-form-urlencoded';

    const grantType = params.grantType ||
      'urn:ibm:params:oauth:grant-type:apikey';

    const authorization = params.authHeader || 'Basic Yng6Yng=';
    const responseType = params.responseType || 'cloud_iam';

    const requestOptions = {
      url: this.url,
      headers: {
        'Content-type': contentType,
        Authorization: authorization
      },
      form: {
        grant_type: grantType,
        apikey: this.apikey,
        response_type: responseType
      }
    };
    request.post(requestOptions, (err, res, body) => {
      if (err) {
        throw new Error(err);
      } else if (res.statusCode < 200 || res.statusCode >= 300) {
        throw new Error(JSON.stringify(res, null, 2));
      } else {
        const tokenResponse = JSON.parse(body);
        cb(tokenResponse);
      }
    });
  }

  public refreshToken(params: TokenRefreshParams, cb: Function) {
    const authorization = params.authHeader || 'Basic Yng6Yng=';
    const contentType = params.contentType ||
      'application/x-www-form-urlencoded';

    const requestOptions = {
      url: this.url,
      headers: {
        'Content-type': contentType,
        Authorization: authorization
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: this.tokenInfo.refresh_token
      }
    };

    request.post(requestOptions, (err, res, body) => {
      if (err) {
        throw new Error(err);
      } else if (res.statusCode < 200 || res.statusCode >= 300) {
        throw new Error(JSON.stringify(res, null, 2));
      } else {
        const tokenResponse = JSON.parse(body);
        cb(tokenResponse);
      }
    });
  }

  public setAccessToken(access_token: string): void { // tslint:disable-line variable-name
    this.userAccessToken = access_token;
  }

  private needToRequestToken() {
    return !this.tokenInfo.access_token;
  }

  private tokenIsExpired(): boolean {
    // use a buffer to prevent the edge case of the token
    // expiring before the request could be made
    // the buffer will be a fraction of the total TTL
    const fractionOfTtl = 0.8;
    const timeToLive = this.tokenInfo.expires_in;
    const expireTime = this.tokenInfo.expiration;
    return expireTime - (timeToLive * (1.0 - fractionOfTtl))
      < Math.floor(Date.now() / 1000);
  }

  private saveTokenInfo(tokenResponse: IamTokenData) {
    this.tokenInfo = Object.assign({}, tokenResponse);
  }
}
