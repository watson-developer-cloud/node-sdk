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
var helper         = require('../../lib/helper');

/**
 *
 * @param options
 * @constructor
 */
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
 *     - include_raw: include raw results
 *     - accept_language : The language expected for the output.
 *     - language: The language of the input.
 *
 * @param callback The callback.
 */
PersonalityInsights.prototype.profile = function(params, callback) { // eslint-disable-line complexity
  params = params || {};

  // support for the new snake_case
  if (params.content_items)
    params.contentItems = params.content_items;

  if ((!params.text && !params.contentItems)) {
    callback(new Error('Missing required parameters: text or content_items'));
    return;
  }

  // Content-Type
  var content_type = null;
  if (params.text)
    content_type = helper.isHTML(params.text) ? 'text/html' : 'text/plain';
  else
    content_type = 'application/json';

  var headers = {
    'Content-type'    : content_type,
    'Accept-language' : params.accept_language || params.acceptLanguage || 'en'
  };

  // service bug: language in header overrides language in each JSON content item, so we can't set it on those requests
  // (also, content-language doesn't really make sense on JSON)
  if (params.language || params.text) {
    headers['Content-language'] = params.language || 'en'
  }


  var parameters = {
    options: {
      method: 'POST',
      url: '/v2/profile',
      body: params.text || pick(params, ['contentItems']),
      json: true,
      qs: pick(params, ['include_raw']),
      headers: headers
    },
    defaultOptions: this._options
  };

  if (params.csv) {
    parameters.options.headers.Accept = 'text/csv';
    if (params.csv_headers) {
      parameters.options.qs.headers = 'true';
    }
  }

  return requestFactory(parameters, callback);
};
module.exports = PersonalityInsights;
