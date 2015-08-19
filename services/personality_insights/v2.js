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
var pick           = require('object.pick');
var omit           = require('object.omit');


/**
 * Return true if 'text' is html
 * @param  {String}  text The 'text' to analyze
 * @return {Boolean}      true if 'text' has html tags
 */
function isHTML(text){
  return /<[a-z][\s\S]*>/i.test(text);
}

function PersonalityInsights(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/personality-insights/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * @param params {Object} The parameters to call the service
 *   The accepted parameters are:
 *     - text: The text to analyze.
 *     - contentItems: A JSON input (if 'text' not provided).
 *     - includeRaw: include raw results
 *     - acceptLanguage : The language expected for the output.
 *     - language: The language of the input.
 *
 * @param callback The callback.
 */
PersonalityInsights.prototype.profile = function(params, callback) {
  if (!params || (!params.text && !params.contentItems)) {
    callback(new Error('Missing required parameters: text or contentItems'));
    return;
  }
  // include_raw
  var queryString = { };
  if (params.include_raw || params.includeRaw)
    queryString.include_raw = true;

  // Content-Type
  var contentType = null;
  if (params.text)
    contentType = isHTML(params.text) ? 'text/html' : 'text/plain';
  else
    contentType = 'application/json';

  var parameters = {
    options: {
      method: 'POST',
      url: '/v2/profile',
      body: params.text || params.html || pick(params, ['contentItems']),
      json: true,
      qs: queryString,
      headers: {
        'Content-type'    : contentType,
        'Content-language': params.language ? params.language : 'en',
        'Accept-language' : params.acceptLanguage ? params.acceptLanguage : 'en'
      }
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};
module.exports = PersonalityInsights;