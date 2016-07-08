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

var requestFactory = require('../lib/requestwrapper');
var url            = require('url');
var util = require('util');
var BaseService = require('../lib/base_service');

/**
 *
 * @param options
 * @constructor
 */
function AuthorizationV1(options) {
  BaseService.call(this, options);

  // replace the url to always point to /authorization/api
  var hostname = url.parse(this._options.url);
  hostname.pathname = '/authorization/api';
  this._options.url = url.format(hostname);
}
util.inherits(AuthorizationV1, BaseService);
AuthorizationV1.prototype.name = 'authorization';
AuthorizationV1.prototype.version = 'v1';
AuthorizationV1.prototype.serviceDefaults = {
  url: 'https://stream.watsonplatform.net/authorization/api'
};

/**
 * Get authorization token based on resource query string param
 */
AuthorizationV1.prototype.getToken = function(params, callback) {
  if (!params.url){
    callback(new Error('Missing required parameters: url'));
    return;
  }

  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/token?url='+params.url,
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


module.exports = AuthorizationV1;
