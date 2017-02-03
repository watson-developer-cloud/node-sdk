/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

const requestFactory = require('../lib/requestwrapper');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 * NaturalLanguageUnderstanding
 * @param options
 * @constructor
 */
function NaturalLanguageUnderstandingV1(options) {
  BaseService.call(this, options);
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use NaturalLanguageUnderstandingV1.VERSION_DATE_2016_01_23');
  }
  this._options.qs.version = this._options.version_date;
}
util.inherits(NaturalLanguageUnderstandingV1, BaseService);
NaturalLanguageUnderstandingV1.prototype.name = 'natural_language_understanding';
NaturalLanguageUnderstandingV1.prototype.version = 'v1';
NaturalLanguageUnderstandingV1.URL = 'https://gateway.watsonplatform.net/natural-language-understanding/api';
NaturalLanguageUnderstandingV1.VERSION_DATE_2016_01_23 = '2016-01-23';

/**
  * Analyze the query.
  * @params {object} params for the query
  * @param {Object} [params.headers] - The headers added
  * @param {string} [params.text] - The text to analyze.
  * @param {string} [params.html] - The html to analyze.
  * @param {string} [params.url] - The url to fetch and analyze.
  * @param {object} [params.features] - The features to retrieve (need at least one)
  * @param {object} [params.features.concepts] - The concepts feature
  * @param {object} [params.features.entities] - The entities feature
  * @param {object} [params.features.keywords] - keywords feature
  * @param {object} [params.features.categories] - categories feature
  * @param {object} [params.features.emotion] - emotion feature
  * @param {object} [params.features.sentiment] - sentiment feature
  * @param {object} [params.features.relations] - relations feature
  * @param {object} [params.features.semantic_roles] - semantic roles feature
  * @params {function} callback taking (error,  jsonResult)
  * @example
  * ```
  * const options = { 'text': 'I am some text to analyze, am I not cool?',
  *                   'features': {
  *                                 'concepts': {},
  *                                 'emotion': {},
  *                    },
  *                 };
  * nlu.analyze(options, myCallbackFunction);
  * ```
  * @returns {void}
  */
NaturalLanguageUnderstandingV1.prototype.analyze = function(params, callback) {
  const parameters = {
    options: {
      url: '/v1/analyze',
      method: 'POST',
      json: true,
      body: params
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = NaturalLanguageUnderstandingV1;
