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

const extend = require('extend');
const requestFactory = require('../lib/requestwrapper');
const helper = require('../lib/helper');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 * @param {Object} options
 * @param {String} options.version_date - Release date of the API version in YYYY-MM-DD format.
 * @constructor
 */
function NaturalLanguageUnderstandingV1(options) {
  BaseService.call(this, options);
  // check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use 2017-02-27');
  }
  this._options.qs.version = options.version_date;
}
util.inherits(NaturalLanguageUnderstandingV1, BaseService);
NaturalLanguageUnderstandingV1.prototype.name = 'natural_language_understanding';
NaturalLanguageUnderstandingV1.prototype.version = 'v1';
NaturalLanguageUnderstandingV1.URL = 'https://gateway.watsonplatform.net/natural-language-understanding/api';


/**
 * Analyze text, HTML, or a public webpage.
 *
 * Analyzes text, HTML, or a public webpage with one or more text analysis features.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Features} params.features - Specific features to analyze the document for.
 * @param {string} [params.text] - The plain text to analyze.
 * @param {string} [params.html] - The HTML file to analyze.
 * @param {string} [params.url] - The web page to analyze.
 * @param {boolean} [params.clean] - Remove website elements, such as links, ads, etc.
 * @param {string} [params.xpath] - XPath query for targeting nodes in HTML.
 * @param {boolean} [params.fallback_to_raw] - Whether to use raw HTML content if text cleaning fails.
 * @param {boolean} [params.return_analyzed_text] - Whether or not to return the analyzed text.
 * @param {string} [params.language] - ISO 639-1 code indicating the language to use in the analysis.
 * @param {number} [params.limit_text_characters] - Sets the maximum number of characters that are processed by the service.
 * @param {Function} [callback] - The callback that handles the response.
 */
NaturalLanguageUnderstandingV1.prototype.analyze = function(params, callback) {
  params = params || {};
  const requiredParams = ['features'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { features: params.features, text: params.text, html: params.html, url: params.url, clean: params.clean, xpath: params.xpath, fallback_to_raw: params.fallback_to_raw, return_analyzed_text: params.return_analyzed_text, language: params.language, limit_text_characters: params.limit_text_characters };
  const parameters = {
    options: {
      url: '/v1/analyze',
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

/**
 * Delete model.
 *
 * Deletes a custom model.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.model_id - model_id of the model to delete.
 * @param {Function} [callback] - The callback that handles the response.
 */
NaturalLanguageUnderstandingV1.prototype.deleteModel = function(params, callback) {
  params = params || {};
  const requiredParams = ['model_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { model_id: params.model_id };
  const parameters = {
    options: {
      url: '/v1/models/{model_id}',
      method: 'DELETE',
      path: path
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

/**
 * List models.
 *
 * Lists available models for Relations and Entities features, including Watson Knowledge Studio custom models that you have created and linked to your Natural Language Understanding service.
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {Function} [callback] - The callback that handles the response.
 */
NaturalLanguageUnderstandingV1.prototype.listModels = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    options: {
      url: '/v1/models',
      method: 'GET',
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

module.exports = NaturalLanguageUnderstandingV1;