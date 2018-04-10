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

import request = require('request');

/**
 * make a request for an access token
 * @param {string} apikey - api key used to authenticate the access token request
 * @param {string} url - IAM token retrieval endpoint
 * @param {Function} cb - callback function to pass result to
 * @returns {void}
 */
export function requestToken(
  apikey: string,
  url: string,
  cb: Function
): void {
  const requestOptions = {
    url,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic Yng6Yng='
    },
    form: {
      grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
      apikey,
      response_type: 'cloud_iam'
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

/**
 * make a request to refresh an access token
 * @param {string} refresh_token - token used to refresh an access token
 * @param {string} url - IAM token retrieval endpoint
 * @param {Function} cb - callback function to pass result to
 * @returns {void}
 */
export function refreshToken(
  refresh_token: string, // tslint:disable-line variable-name
  url: string,
  cb: Function
): void {
  const requestOptions = {
    url,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic Yng6Yng='
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token
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
