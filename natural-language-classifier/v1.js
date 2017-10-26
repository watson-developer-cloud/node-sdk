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
const path = require('path');
const isStream = require('isstream');

/**
 * this function build a formData object for each file parameter
 * @param {Object} fileParamAttributes - An object with fields data, singleContentType and contentTypeParam
 */ 
function buildRequestFileObject(fileParamAttributes) {
  let filename = null;
  let contentType = null;
  let value = null;
  // build filename
  let userFileName =
    fileParamAttributes.data.options &&
    fileParamAttributes.data.options.filename
      ? fileParamAttributes.data.options.filename
      : fileParamAttributes.data.path
        ? fileParamAttributes.data.path
        : fileParamAttributes.data.value && fileParamAttributes.data.value.path
          ? fileParamAttributes.data.value.path
          : null;
  // toString handles the case when path is a buffer
  filename = userFileName? path.basename(userFileName.toString('utf-8')) : null;
  // build contentType
  contentType = fileParamAttributes.singleContentType
    ? fileParamAttributes.singleContentType
    : fileParamAttributes.contentTypeParam
      ? fileParamAttributes.contentTypeParam
      : fileParamAttributes.options && fileParamAttributes.options.contentType
        ? fileParamAttributes.options.contentType
        : 'application/octet-stream';
  // build value
  const userValue = fileParamAttributes.data.value
    ? fileParamAttributes.data.value
    : fileParamAttributes.data;
  value = isStream(userValue)
    ? userValue
    : typeof userValue === 'string' ? Buffer.from(userValue) : userValue;
  return {
    value: value,
    options: {
      filename: filename,
      contentType: contentType
    }
  };
}

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
      path: path,
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
 * Create classifier.
 *
 * Sends data to create and train a classifier and returns information about the new classifier.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {ReadableStream|Object} params.metadata - Metadata in JSON format. The metadata identifies the language of the data, and an optional name to identify the classifier. For details, see the [API reference](https://www.ibm.com/watson/developercloud/natural-language-classifier/api/v1/#create_classifier).
 * @param {ReadableStream|Object} params.training_data - Training data in CSV format. Each text value must have at least one class. The data can include up to 15,000 records. For details, see [Using your own data](https://www.ibm.com/watson/developercloud/doc/natural-language-classifier/using-your-data.html).
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
  let formData = {};
  formData.training_metadata = buildRequestFileObject({
      data: params.metadata, 
      singleContentType: "application/json",
      contentTypeParam: null
  });
  formData.training_data = buildRequestFileObject({
      data: params.training_data, 
      singleContentType: "text/csv",
      contentTypeParam: null
  });
  const parameters = {
    options: {
      url: '/v1/classifiers',
      method: 'POST',
      formData: formData
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
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
      path: path,
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
      path: path,
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
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

module.exports = NaturalLanguageClassifierV1;
