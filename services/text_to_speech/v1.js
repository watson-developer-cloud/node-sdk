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

var pick           = require('object.pick');
var extend         = require('extend');
var requestFactory = require('../../lib/requestwrapper');

function TextToSpeech(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://stream.watsonplatform.net/text-to-speech/api',
    headers: {
      'content-type': 'application/json'
    }
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Streaming speech synthesis of the text in a query parameter
 */
TextToSpeech.prototype.synthesize = function(params, callback) {
  params = extend({accept:'audio/ogg; codecs=opus'}, params);
  if (!params.text){
    callback(new Error('Missing required parameters: text'));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/synthesize',
      body: JSON.stringify(pick(params, ['text'])),
      qs: pick(params, ['accept', 'voice']),
      encoding: null
    },
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
