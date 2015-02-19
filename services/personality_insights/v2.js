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

var extend         = require('extend');
var requestFactory = require('../../lib/requestwrapper');

function PersonalityInsights(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/personality-insights/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

PersonalityInsights.prototype.profile = function(params, callback) {
  if (!params || (!params.text && !params.contentItems)) {
    callback(new Error('Missing required parameters: text or contentItems'));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v2/profile',
      body: params.text || params,
      json: true,
      headers: {
        'Content-type' : params.text ? 'text/plain' : 'application/json'
      }
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = PersonalityInsights;