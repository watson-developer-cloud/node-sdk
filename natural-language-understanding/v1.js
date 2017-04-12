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
const extend = require('extend');

/**
 * NaturalLanguageUnderstanding
 * @param {Object} options
 * @constructor
 */
function NaturalLanguageUnderstandingV1(options) {
  BaseService.call(this, options);
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27');
  }
  this._options.qs.version = this._options.version_date;
}
util.inherits(NaturalLanguageUnderstandingV1, BaseService);
NaturalLanguageUnderstandingV1.prototype.name = 'natural_language_understanding';
NaturalLanguageUnderstandingV1.prototype.version = 'v1';
NaturalLanguageUnderstandingV1.URL = 'https://gateway.watsonplatform.net/natural-language-understanding/api';
NaturalLanguageUnderstandingV1.VERSION_DATE_2016_01_23 = '2016-01-23';
// GA version date: 2017-02-27
// https://www.ibm.com/watson/developercloud/doc/natural-language-understanding/release-notes.html
NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27 = '2017-02-27';

/**
 * Bluemix uses hyphens instead of underscores for NLU in the VCAP_SERVICES env property.
 * No idea why.
 *
 * This method also checks for the underscore'd version just in case they ever change it.
 *
 * @private
 * @override
 */
NaturalLanguageUnderstandingV1.prototype.getCredentialsFromBluemix = function(name) {
  return extend(
    {},
    BaseService.prototype.getCredentialsFromBluemix.call(this, name),
    BaseService.prototype.getCredentialsFromBluemix.call(this, name.replace(/_/g, '-'))
  );
};

/**
  * Analyze the query.
  * @params {object} params for the query
  * @param {object} [params.headers] - The headers added
  * @param {string} [params.text] - The text to analyze.
  * @param {string} [params.html] - The html to analyze.
  * @param {string} [params.url] - The url to fetch and analyze.
  * @param {object} [params.features] - The features to retrieve (need at least one)
  * @param {object} [params.features.categories] - categories feature
  * @param {object} [params.features.concepts] - concepts feature
  * @param {object} [params.features.emotion] - emotion feature
  * @param {object} [params.features.entities] - entities feature
  * @param {object} [params.features.keywords] - keywords feature
  * @param {object} [params.features.metadata] - metadata feature
  * @param {object} [params.features.relations] - relations feature
  * @param {object} [params.features.semantic_roles] - semantic roles feature
  * @param {object} [params.features.sentiment] - sentiment feature
  * @params {function} callback taking (error,  jsonResult)
  * @example
  * ```
  * const options = {
  *   'text': 'Natural Language Understanding analyzes unstructured text to return structured insights',
  *   'features': {
  *     'concepts': {
  *       'limit': 3
  *     },
  *     'emotion': {},
  *   },
  * };
  * nlu.analyze(options, myCallbackFunction);
  * ```
  * @return {void}
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

/**
  * List custom models deployed to your service instance.
  * @params {object} params for the query
  * @param {object} [params.headers] - The headers added
  * @params {function} callback taking (error,  jsonResult)
  * @example
  * ```
  * nlu.listModels({}, myCallbackFunction);
  * ```
  * @return {void}
  */
NaturalLanguageUnderstandingV1.prototype.listModels = function(params, callback) {
  const parameters = {
    options: {
      url: '/v1/models',
      method: 'GET',
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
  * Delete a custom model that is deployed to your service instance.
  * @params {object} params for the query
  * @param {object} [params.headers] - The headers added
  * @param {string} [params.model_id] - ID of the custom model to delete
  * @params {function} callback taking (error,  jsonResult)
  * @example
  * ```
  * const options = {
  *   'model_id': 'myModel123'
  * };
  * nlu.deleteModel(options, myCallbackFunction);
  * ```
  * @return {void}
  */
NaturalLanguageUnderstandingV1.prototype.deleteModel = function(params, callback) {
  const parameters = {
    options: {
      method: 'DELETE',
      url: '/v1/models/{model_id}',
      path: params,
      json: true
    },
    requiredParams: ['model_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = NaturalLanguageUnderstandingV1;
