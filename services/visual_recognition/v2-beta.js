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

var extend = require('extend');
var requestFactory = require('../../lib/requestwrapper');
var pick = require('object.pick');
var isStream = require('isstream');

function VisualRecognition(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/visual-recognition-beta/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Returns a classifier
 * @param classifier_id The classifier id
 *
 */
VisualRecognition.prototype.getClassifier = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v2/classifiers/{classifier_id}',
      path: params,
      json: true,
    },
    requiredParams: ['classifier_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Deletes a classifier
 * @param classifier_id The classifier id
 *
 */
VisualRecognition.prototype.deleteClassifier = function(params, callback) {
  var parameters = {
    options: {
      method: 'DELETE',
      url: '/v2/classifiers/{classifier_id}',
      path: params,
      json: true,
    },
    requiredParams: ['classifier_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates a classifiers
 * Train a new classifier on the uploaded image data.
 * The upload should be a.zip file with a folder named 'train' and
 * another named 'test'.Each of those should have a folder named
 * after the name of the desired new classifier, for example 'tiger'.
 * train/tiger and test/tiger should contain images(.jpg, .png, .gif files)
 * showing tigers.Other folders under train and test will be assumed to
 * contain negative examples(leopards, dogs, horses, etc).
 * @param name The desired short name of the new classifier.
 * @param images_file A compressed (.zip) file of images.
 */
VisualRecognition.prototype.createClassifier = function(params, callback) {
  params = params || {};

  if (!params.images_file) {
    callback(new Error('Missing required parameters: images_file'));
    return;
  }

  if (!isStream(params.images_file)) {
    callback(new Error('images_file is not a standard Node.js Stream'));
    return;
  }

  var parameters = {
    options: {
      url: '/v2/classifiers',
      method: 'POST',
      json: true,
      formData: pick(params, ['name', 'images_file'])
    },
    requiredParams: ['name'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns the classifiers
 *
 */
VisualRecognition.prototype.listClassifiers = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v2/classifiers',
      qs: pick(params, ['name']),
      json: true,
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Accepts either a single image file or a zip file with multiple
 * images (.jpeg, .png, .gif) and scores every available classifier
 * on each image. It then applies a threshold and returns the list
 * of relevant classifier scores for each image.
 *
 * @param  {ReadStream} images_file The image/s to analyze.
 */
VisualRecognition.prototype.classify = function(params, callback) {
  params = params || {};

  if (!params.images_file) {
    callback(new Error('Missing required parameters: images_file'));
    return;
  }

  if (!isStream(params.images_file)) {
    callback(new Error('images_file is not a standard Node.js Stream'));
    return;
  }

  var parameters = {
    options: {
      url: '/v2/classify',
      method: 'POST',
      json: true,
      formData: pick(params, ['images_file'])
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = VisualRecognition;
