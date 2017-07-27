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

const extend = require('extend');
const pick = require('object.pick');
const requestFactory = require('../lib/requestwrapper');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 * Tone Analyzer
 * @param {Object} options
 * @constructor
 */
function ToneAnalyzerV3(options) {
  BaseService.call(this, options);
  // Check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use 2016-05-19');
  }
  // todo: confirm that the service wants version, not version_date
  this._options.qs.version = this._options.version_date;
}
util.inherits(ToneAnalyzerV3, BaseService);
ToneAnalyzerV3.prototype.name = 'tone_analyzer';
ToneAnalyzerV3.prototype.version = 'v3';
ToneAnalyzerV3.URL = 'https://gateway.watsonplatform.net/tone-analyzer/api';

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
 * - `language`: Language of the input. It defaults to `en`.
 *
 * @return upon success, the callback function is called with an object
 * containing the different tones (emotion, writing and social) analyzed.
 *
 * @see the API docs for a the full documentation.
 *
 */
ToneAnalyzerV3.prototype.tone = function(params, callback) {
  if (!params || !params.text) {
    callback(new Error('Missing required parameters: text'));
    return;
  }
  const contentType = params.isHTML ? 'text/html' : 'text/plain';

  const headers = {
    accept: 'application/json',
    'content-type': contentType
  };

  if (params.language) {
    headers['content-language'] = params.language;
  }

  const parameters = {
    options: {
      url: '/v3/tone',
      method: 'POST',
      body: params.text,
      qs: pick(params, ['tones', 'sentences'])
    },
    defaultOptions: extend(true, this._options, {
      headers: headers
    })
  };

  return requestFactory(parameters, callback);
};

/**
 * @param {Object} params The parameters to call the service
 * @param {Object} [params.utterances] - The utterances to analyze.  Utterances must be a JSON object.
 *
 * @param callback The callback.
 */
ToneAnalyzerV3.prototype.tone_chat = function(params, callback) {
  // For backward compatibility
  if (params && params.utterances && params.utterances.utterances) {
    params.utterances = params.utterances.utterances;
  }

  const parameters = {
    requiredParams: ['utterances'],
    originalParams: params,
    options: {
      url: '/v3/tone_chat',
      method: 'POST',
      json: true,
      body: pick(params, ['utterances'])
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
  };

  return requestFactory(parameters, callback);
};

module.exports = ToneAnalyzerV3;
