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

var extend         = require('extend');
var requestFactory = require('../../lib/requestwrapper');

function ToneAnalyzer(options) {
  // Default URL
  var defaultOptions = {
    url: 'https://gateway.watsonplatform.net/tone-analyzer-beta/api'
  };

  // Replace default options with user provided
  this._options = extend(defaultOptions, options);
}


ToneAnalyzer.prototype.tone = function(params, callback) {
  if (!params || !params.text){
    callback(new Error('Missing required parameters: text'));
    return;
  }

  var parameters = {
    options: {
      url: '/v1/tone',
      method: 'POST',
      body: params.text
    },
    defaultOptions: extend(this._options, {
      headers: {
        'accept':'application/json',
        'content-type': 'plain/text'
      }
    })
  };

  return requestFactory(parameters, callback);
};

ToneAnalyzer.prototype.synonym = function(params, callback) {
  var parameters = {
    options: {
      url: '/v1/synonym',
      method: 'POST',
      body: params,
      json: true
    },
    requiredParams: ['words', 'limit'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

module.exports = ToneAnalyzer;