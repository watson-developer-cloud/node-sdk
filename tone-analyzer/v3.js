/**
 * Copyright 2017 IBM All Rights Reserved.
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

const extend = require('extend')
const pick = require('object.pick')
const requestFactory = require('../lib/requestwrapper')
const helper = require('../lib/helper')
const util = require('util')
const BaseService = require('../lib/base_service')

/**
 * @param {Object} options
 * @param {String} options.version_date - Release date of the API version in YYYY-MM-DD format.
 * @constructor
 */
function ToneAnalyzerV3(options) {
  BaseService.call(this, options);
  // check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use ToneAnalyzerV3.VERSION_DATE_2016_05_19');
  }
  this._options.qs.version = options.version_date;
}
util.inherits(ToneAnalyzerV3, BaseService);
ToneAnalyzerV3.prototype.name = 'tone_analyzer';
ToneAnalyzerV3.prototype.version = 'v3';
ToneAnalyzerV3.URL = 'https://gateway.watsonplatform.net/tone-analyzer/api';

ToneAnalyzerV3.VERSION_DATE_2016_05_19 = '2016-05-19';

/**
 * Analyze general purpose tone.
 *
 * Uses the general purpose endpoint to analyze the tone of your input content. The service can analyze the input for several tones: emotion, language, and social. It derives various characteristics for each tone that it analyzes. The method always analyzes the tone of the full document; by default, it also analyzes the tone of each individual sentence of the input. You can submit a maximum of 128 KB of content in JSON, plain text, or HTML format.   Per the JSON specification, the default character encoding for JSON content is effectively always UTF-8; per the HTTP specification, the default encoding for plain text and HTML is ISO-8859-1 (effectively, the ASCII character set). When specifying a content type of plain text or HTML, include the `charset` parameter to indicate the character encoding of the input text; for example: `Content-Type: text/plain;charset=utf-8`. For `text/html`, the service removes HTML tags and analyzes only the textual content.   Use the `POST` request method to analyze larger amounts of content in any of the available formats. Use the `GET` request method to analyze smaller quantities of plain text content.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {ToneInput} params.tone_input - JSON, plain text, or HTML input that contains the content to be analyzed. For JSON input, provide an object of type `ToneInput`. Submit a maximum of 128 KB of content. Sentences with fewer than three words cannot be analyzed.
 * @param {string} params.content_type - The type of the input: application/json, text/plain, or text/html. A character encoding can be specified by including a `charset` parameter. For example, 'text/plain;charset=utf-8'.
 * @param {string[]} [params.tones] - A comma-separated list of tones for which the service is to return its analysis of the input; the indicated tones apply both to the full document and to individual sentences of the document. You can specify one or more of the following values: `emotion`, `language`, and `social`. Omit the parameter to request results for all three tones.
 * @param {boolean} [params.sentences] - Indicates whether the service is to return an analysis of each individual sentence in addition to its analysis of the full document. If `true` (the default), the service returns results for each sentence. The service returns results only for the first 100 sentences of the input.
 * @param {Function} [callback] - The callback that handles the response.
 */
ToneAnalyzerV3.prototype.tone = function(params, callback) {
  params = params || {};
  const requiredParams = ['tone_input', 'content_type'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = params.tone_input;
  const query = { tones: params.tones, sentences: params.sentences };
  const parameters = {
    options: {
      url: '/v3/tone',
      method: 'POST',
      json: (params.content_type === 'application/json'),
      body: body,
      qs: query,
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': params.content_type
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Analyze customer engagement tone.
 *
 * Uses the customer engagement endpoint to analyze the tone of customer service and customer support conversations. For each utterance of a conversation, the method reports the most prevalent subset of the following seven tones: sad, frustrated, satisfied, excited, polite, impolite, and sympathetic. You can submit a maximum of 128 KB of JSON input. Per the JSON specification, the default character encoding for JSON content is effectively always UTF-8.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Utterance[]} params.utterances - An array of `Utterance` objects that provides the input content that the service is to analyze.
 * @param {Function} [callback] - The callback that handles the response.
 */
ToneAnalyzerV3.prototype.toneChat = function(params, callback) {
  params = params || {};
  const requiredParams = ['utterances'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { utterances: params.utterances };
  const parameters = {
    options: {
      url: '/v3/tone_chat',
      method: 'POST',
      json: true,
      body: body,
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

module.exports = ToneAnalyzerV3;