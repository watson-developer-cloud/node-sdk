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
const pick = require('object.pick');
const omit = require('object.omit');
const isStream = require('isstream');
const toCSV = require('./json-training-to-csv');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 *
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
 * Creates a classifier
 */
NaturalLanguageClassifierV1.prototype.create = function(params, callback) {
  params = params || {};

  if (!params || !params.training_data) {
    callback(new Error('Missing required parameters: training_data'));
    return;
  }
  if (!(Array.isArray(params.training_data) || typeof params.training_data === 'string' || isStream(params.training_data))) {
    callback(new Error('training_data needs to be a String, Array or Stream'));
    return;
  }

  const self = this;

  toCSV(params.training_data, function(err, csv) {
    if (err) {
      callback(err);
      return;
    }

    const parameters = {
      options: {
        url: '/v1/classifiers',
        method: 'POST',
        json: true,
        formData: {
          training_data: csv,
          training_metadata: JSON.stringify(omit(params, ['training_data']))
        },
        // hack to check required parameters.
        // We don't actually need path parameters
        path: pick(params, ['language'])
      },
      requiredParams: ['language'],
      defaultOptions: self._options
    };
    return requestFactory(parameters, callback);
  });
};

/**
 * Returns the classification information for a classifier on a phrase
 */
NaturalLanguageClassifierV1.prototype.classify = function(params, callback) {
  params = params || {};

  // #84: use classifier_id not classifier.
  if (!params.classifier_id) {
    params.classifier_id = params.classifier;
  }

  const parameters = {
    options: {
      url: '/v1/classifiers/{classifier_id}/classify',
      method: 'POST',
      json: true,
      path: pick(params, ['classifier_id']),
      body: pick(params, ['text'])
    },
    requiredParams: ['classifier_id', 'text'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Returns the training status of the classifier
 */
NaturalLanguageClassifierV1.prototype.status = function(params, callback) {
  params = params || {};

  // #84: use classifier_id not classifier.
  if (!params.classifier_id) {
    params.classifier_id = params.classifier;
  }

  const parameters = {
    options: {
      url: '/v1/classifiers/{classifier_id}',
      method: 'GET',
      json: true,
      path: params
    },
    requiredParams: ['classifier_id'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Retrieves the list of classifiers for the user
 */
NaturalLanguageClassifierV1.prototype.list = function(params, callback) {
  const parameters = {
    options: {
      url: '/v1/classifiers',
      method: 'GET',
      json: true
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Deletes a classifier
 */
NaturalLanguageClassifierV1.prototype.remove = function(params, callback) {
  params = params || {};

  // #84: use classifier_id not classifier.
  if (!params.classifier_id) {
    params.classifier_id = params.classifier;
  }

  const parameters = {
    options: {
      url: '/v1/classifiers/{classifier_id}',
      method: 'DELETE',
      path: params,
      json: true
    },
    requiredParams: ['classifier_id'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

module.exports = NaturalLanguageClassifierV1;
