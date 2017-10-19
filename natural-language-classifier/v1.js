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
 * @constructor
 */
function NaturalLanguageClassifierV1(options) {
  BaseService.call(this, options);
}
util.inherits(NaturalLanguageClassifierV1, BaseService);
NaturalLanguageClassifierV1.prototype.name = 'natural_language_classifier';
NaturalLanguageClassifierV1.prototype.version = 'v1';
NaturalLanguageClassifierV1.URL = 'https://gateway.watsonplatform.net/natural-language-classifier/api';


/**
 * Returns label information for the input.
 *
 * The status must be `Available` before you can use the classifier to classify text. Use `Get information about a classifier` to retrieve the status.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.classifier_id - Classifier ID to use.
 * @param {string} params.text - The submitted phrase.
 * @param {Function} [callback] - The callback that handles the response.
 */
NaturalLanguageClassifierV1.prototype.classify = function(params, callback) {
  params = params || {};
  const requiredParams = ['classifier_id', 'text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { text: params.text };
  const path = { classifier_id: params.classifier_id };
  const parameters = {
    options: {
      url: '/v1/classifiers/{classifier_id}/classify',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Classify (GET).
 *
 * The status must be `Available` before you can use the classifier to classify calls. Use `GET /classifiers/{classifier_id}` to retrieve the status.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.classifier_id - Classifier ID to use.
 * @param {string} params.text - Phrase to classify.
 * @param {Function} [callback] - The callback that handles the response.
 */
NaturalLanguageClassifierV1.prototype.classifyGet = function(params, callback) {
  params = params || {};
  const requiredParams = ['classifier_id', 'text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { text: params.text };
  const path = { classifier_id: params.classifier_id };
  const parameters = {
    options: {
      url: '/v1/classifiers/{classifier_id}/classify',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Create classifier.
 *
 * Sends data to create and train a classifier and returns information about the new classifier.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {File} params.metadata - Metadata in JSON format. The metadata identifies the language of the data, and an optional name to identify the classifier. For details, see the [API reference](https://www.ibm.com/watson/developercloud/natural-language-classifier/api/v1/#create_classifier).
 * @param {File} params.training_data - Training data in CSV format. Each text value must have at least one class. The data can include up to 15,000 records. For details, see [Using your own data](https://www.ibm.com/watson/developercloud/doc/natural-language-classifier/using-your-data.html).
 * @param {string} [params.training_metadata_content_type] - The content type of training_metadata.
 * @param {string} [params.training_data_content_type] - The content type of training_data.
 * @param {Function} [callback] - The callback that handles the response.
 */
NaturalLanguageClassifierV1.prototype.createClassifier = function(params, callback) {
  params = params || {};
  const requiredParams = ['metadata', 'training_data'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const parameters = {
    options: {
      url: '/v1/classifiers',
      method: 'POST',
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete classifier.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.classifier_id - Classifier ID to delete.
 * @param {Function} [callback] - The callback that handles the response.
 */
NaturalLanguageClassifierV1.prototype.deleteClassifier = function(params, callback) {
  params = params || {};
  const requiredParams = ['classifier_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { classifier_id: params.classifier_id };
  const parameters = {
    options: {
      url: '/v1/classifiers/{classifier_id}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Get information about a classifier.
 *
 * Returns status and other information about a classifier.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.classifier_id - Classifier ID to query.
 * @param {Function} [callback] - The callback that handles the response.
 */
NaturalLanguageClassifierV1.prototype.getClassifier = function(params, callback) {
  params = params || {};
  const requiredParams = ['classifier_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { classifier_id: params.classifier_id };
  const parameters = {
    options: {
      url: '/v1/classifiers/{classifier_id}',
      method: 'GET',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List classifiers.
 *
 * Returns an empty array if no classifiers are available.
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {Function} [callback] - The callback that handles the response.
 */
NaturalLanguageClassifierV1.prototype.listClassifiers = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    options: {
      url: '/v1/classifiers',
      method: 'GET',
    },
    defaultOptions: extend(true, this._options, {
      headers: {
      }
    })
  };
  return requestFactory(parameters, callback);
};

module.exports = NaturalLanguageClassifierV1;