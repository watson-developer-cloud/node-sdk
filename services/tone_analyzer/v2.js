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
    url: 'https://gateway.watsonplatform.net/tone-analyzer-experimental/api'
  };

  // Replace default options with user provided
  this._options = extend(defaultOptions, options);
}

/**
 * Main API call. Returns the different tone dimensions of a text.
 *
 * @param params: An object with a string 'text' element. This is the
 * only field used. By this API call
 *
 * @return upon success, the callback function is called with an object
 * containing the different tones (emotion, writing and social), traits
 * and the evidence words found in the text.
 *
 * @see the API docs for a the full documentation.
 *
 */
ToneAnalyzer.prototype.tone = function(params, callback) {
  if (!params || !params.text){
    callback(new Error('Missing required parameters: text'));
    return;
  }

  var parameters = {
    options: {
      url: '/v2/tone',
      method: 'POST',
      body: params.text
    },
    defaultOptions: extend(this._options, {
      headers: {
        'accept':'application/json',
        'content-type': 'text/plain'
      }
    })
  };

  return requestFactory(parameters, callback);
};

/**
 * Returns related words for a given word (or set of words).
 *
 * @param params: An object to build the query string. It normally contains
 * a property "word", the term to look up.
 * Alternatively, one can specify a "context" (part of a phrase) and an
 * "index" (of the word to lookup, within "context").
 * A 'limit' parameter is also accepted to limit the number of related 
 * words suggested.
 *
 * @return upon success, the callback function is called with an object
 * containing related words to the ones given. Each word comes with
 * the semantic type and the meaning and sense of the root word, and
 * a weight associated to a trait. Positive weights would 'level up'
 * that particular tone, while negative weights would level it down.
 *
 * For example, if one wants to sound less "angry" on a message, the
 * suggestions with negative correlation with "Anger" (Emotion Tone)
 * could be replaced in the txt.
 *
 * @see the API docs for a the full documentation.
 *
 */
ToneAnalyzer.prototype.synonym = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2/synonyms',
      method: 'GET',
      qs: params,
      json: true
    },
    defaultOptions: extend(this._options, {})
  };

  return requestFactory(parameters, callback);
};



/**
 * Returns the different scorecards implemented by the service.
 * This is an array of objects with a "name" and "description" properties.
 * 
 * As a first version, only a "business email" scorecard is implemented.
 *
 * @see the API docs for a the full documentation.
 *
 */
ToneAnalyzer.prototype.scorecards = function(params, callback) {
  var parameters = {
    options: {
      url: '/v2/scorecards',
      method: 'GET',
      json: true
    },
    defaultOptions: extend(this._options, {})
  };

  return requestFactory(parameters, callback);
};

module.exports = ToneAnalyzer;
