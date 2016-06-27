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
var pick           = require('object.pick');
var requestFactory = require('../../lib/requestwrapper');

function ToneAnalyzer(options) {
  // Check if 'version_date' was provided
  if (typeof options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use 2016-05-19');
  }

  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
    qs: {
      version: options.version_date
    }
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Main API call. Returns the different tone dimensions of a text.
 *
 * @param params: An object with a string 'text' element.
 *
 * Additional arguments on `params` object are optional, they include:
 *
 * - `tones`: A Comma-separated list of tones. Only these will be computed
 *    in this API call. Allowed values are 'social', 'emotion', 'language'.
 *    It defaults to 'all of them'.
 * - `sentences`: A boolean, telling if sentence-level analysis (which is
 *    slower than just document-level) needs to be computed. It defaults
 *    to true.
 * - `isHTML`: A boolean value telling that the `params.text` argument is
 *    to be trated as HTML contents. On HTML input, the services does
 *    cleanup of tags and performs the analysis on the text contents only.
 *
 * @return upon success, the callback function is called with an object
 * containing the different tones (emotion, writing and social) analyzed.
 *
 * @see the API docs for a the full documentation.
 *
 */
ToneAnalyzer.prototype.tone = function(params, callback) {
  if (!params || !params.text){
    callback(new Error('Missing required parameters: text'));
    return;
  }
  var contentType = params.isHTML ? "text/html" : "text/plain";
  var parameters = {
    options: {
      url: '/v3/tone',
      method: 'POST',
      body: params.text,
      qs: pick(params, ['tones', 'sentences'])
    },
    defaultOptions: extend(true, this._options, {
      headers: {
       'accept': 'application/json',
       'content-type': contentType
      }
    }),
  };

  return requestFactory(parameters, callback);
};

module.exports = ToneAnalyzer;
