/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
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

const requestFactory = require('../lib/requestwrapper');
const pick = require('object.pick');
const extend = require('extend');
const helper = require('../lib/helper');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 *
 * @param {Object} options
 * @constructor
 */
function PersonalityInsightsV3(options) {
  BaseService.call(this, options);

  // Check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use 2016-10-19');
  }
  this._options.qs.version = options.version_date;
}
util.inherits(PersonalityInsightsV3, BaseService);
PersonalityInsightsV3.prototype.name = 'personality_insights';
PersonalityInsightsV3.prototype.version = 'v3';
PersonalityInsightsV3.URL = 'https://gateway.watsonplatform.net/personality-insights/api';

/**
 * @param {Object} params The parameters to call the service
 * @param {Object} [params.headers] - The header parameters.
 * @param {string} [params.headers.accept-language=en] - The desired language of the response.
 * @param {string} [params.headers.content-type=text/plain] - The content type of the request: text/plain (the default), text/html, or application/json.
 * @param {string} [params.headers.content-language=en] - The language of the input text for the request: ar (Arabic), en (English), es (Spanish), or ja (Japanese)
 * @param {string} [params.headers.accept=application/json] - The desired content type of the response: application/json (the default) or text/csv
 * @param {string} [params.text] - The text to analyze.
 * @param {Object} [params.content_items] - A JSON input (if 'text' not provided).
 * @param {boolean} [params.raw_scores=false] - include raw results.
 * @param {boolean} [params.csv_headers=false] - If true, column labels are returned with a CSV response; if false (the default), they are not. Applies only when the Accept header is set to text/csv.
 * @param {boolean} [params.consumption_preferences=false] - If true, information about consumption preferences is returned with the results.
 *
 * @param callback The callback.
 */
PersonalityInsightsV3.prototype.profile = function(
  _params,
  callback // eslint-disable-line complexity
) {
  const params = extend({}, _params);

  if (params.content_items) {
    params.contentItems = params.content_items;
  }

  if (!params.text && !params.contentItems) {
    callback(new Error('Missing required parameters: text or content_items'));
    return;
  }

  // Content-Type
  let content_type = null;
  if (params.text) {
    content_type = helper.isHTML(params.text) ? 'text/html' : 'text/plain';
  } else {
    content_type = 'application/json';
  }

  const parameters = {
    options: {
      method: 'POST',
      url: '/v3/profile',
      body: params.text || pick(params, ['contentItems']),
      json: true,
      qs: pick(params, ['csv_headers', 'raw_scores', 'consumption_preferences']),
      headers: extend({ 'content-type': content_type, 'accept-language': 'en' }, params.headers)
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};
module.exports = PersonalityInsightsV3;
