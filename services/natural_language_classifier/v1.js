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

var extend = require('extend');
var requestFactory = require('../../lib/requestwrapper');
var pick = require('object.pick');

function NaturalLanguageClassifier(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/natural-language-classifier-experimental/api'
  };
  this._options = extend(serviceDefaults, options);
}

/**
 * Creates a classifier
 */
NaturalLanguageClassifier.prototype.create = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/classifiers',
      body: params,
      json: true
    },
    requiredParams: ['language', 'training_data'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns the classification information for a classifier on a phrase
 */
NaturalLanguageClassifier.prototype.classify = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/classifiers/{classifier}/classify',
      method: 'POST',
      json: true,
      path: pick(params, ['classifier']),
      body: pick(params, ['text'])
    },
    requiredParams: ['classifier', 'text'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Returns the training status of the classifier
 */
NaturalLanguageClassifier.prototype.status = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/classifiers/{classifier}',
      method: 'GET',
      json: true,
      path: params
    },
    requiredParams: ['classifier'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Retrieves the list of classifiers for the user
 */
NaturalLanguageClassifier.prototype.list = function(params, callback) {
  var parameters = {
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
NaturalLanguageClassifier.prototype.remove = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/classifiers/{classifier}',
      method: 'DELETE',
      path: params,
      json: true
    },
    requiredParams: ['classifier'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

module.exports = NaturalLanguageClassifier;