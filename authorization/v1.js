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

'use strict';

const requestFactory = require('../lib/requestwrapper');
const url = require('url');
const util = require('util');
const BaseService = require('../lib/base_service');

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
function AuthorizationV1(options) {
  BaseService.call(this, options);
  this.target_url = options.url;
  // replace the url to always point to /authorization/api
  const hostname = url.parse(this._options.url);
  hostname.pathname = '/authorization/api';
  this._options.url = url.format(hostname);
}
util.inherits(AuthorizationV1, BaseService);
AuthorizationV1.prototype.name = 'authorization';
AuthorizationV1.prototype.version = 'v1';
AuthorizationV1.URL = 'https://stream.watsonplatform.net/authorization/api';

/**
 * Get a percent-encoded authorization token based on resource query string param
 *
 * @param {Object} [options]
 * @param {String} [options.url] defaults to url supplied to constructor (if any)
 * @param {Function(err, token)} callback - called with a %-encoded token
 */
AuthorizationV1.prototype.getToken = function(params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = { url: this.target_url };
  }
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
  return requestFactory(parameters, callback);
};

module.exports = AuthorizationV1;
