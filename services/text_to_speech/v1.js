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

function TextToSpeech(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://stream.watsonplatform.net/text-to-speech-beta/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Streaming speech synthesis of the text in a query parameter
 */
TextToSpeech.prototype.synthesize = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/synthesize',
      qs: params
    },
    requiredParams: ['text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves the voices available for speech synthesis
 */
TextToSpeech.prototype.voices = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/voices',
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = TextToSpeech;