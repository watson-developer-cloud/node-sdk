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
var pick = require('object.pick');
var util = require('util');
var omit = require('object.omit');
var isStream = require('isstream');
var requestFactory = require('../../lib/requestwrapper');

/**
 * Verifies that the variable is a valid stream
 * @param  {Object} value   Variable value
 * @param  {String} name Variable name
 * @private
 */
function verifyStream(value, name) {
  if (!value) {
    throw new Error('Missing required parameters: ' + name);
  }

  if (!isStream(value)) {
    throw new Error(name + ' is not a standard Node.js Stream');
  }
}

/**
 *
 * @param options
 * @constructor
 */
function VisualRecognitionV3(options) {
  // Check if 'version_date' was provided
  if (typeof options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use 2015-12-02');
  }

  // Default URL
  // url:
  var serviceDefaults = {
    url: 'http://gateway-a.watsonplatform.net/visual-recognition/api',
    alchemy: true,
    qs: {
      version: options.version_date,
      api_key: options.api_key
    }
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, omit(options, ['version_date']));
}

/**
 * Retrieves information about a specific classifier.
 * @param classifier_id The classifier id
 */
VisualRecognitionV3.prototype.getClassifier = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v3/classifiers/{classifier_id}',
      path: params,
      json: true
    },
    requiredParams: ['classifier_id', 'api_key'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Deletes a custom classifier with the specified classifier id.
 * @param classifier_id The classifier id
 *
 */
VisualRecognitionV3.prototype.deleteClassifier = function(params, callback) {
  var parameters = {
    options: {
      method: 'DELETE',
      url: '/v3/classifiers/{classifier_id}',
      path: params,
      json: true,
    },
    requiredParams: ['classifier_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Train a new classifier from example images which are uploaded.
 * This call returns before training has completed.  You'll need to use the
 * getClassifer method to make sure the classifier has completed training and
 * was successful before you can classify any images with the newly created
 * classifier.
 *
 * @param name The desired short name of the new classifier.
 * @param *_positive_examples A compressed (.zip) file of images which prominently
 *                            depict the visual subject for a new classifier.
 *                            each class has a name that is prefixed to the _positive_examples
 *                            parameter name.  For example, two classes apples and pears
 *                            would be passed in as apples_positive_examples and pears_positive_examples
 * @param negative_examples A compressed (.zip) file of images which did not
 *                            prominently depict the visual subject for a new
 *                            classifier. Negative examples are optional.
 * @param name The desired name of the new classifier.
 */
VisualRecognitionV3.prototype.createClassifier = function(params, callback) {
  params = params || {};

  try {
    verifyStream(params.negative_examples, 'negative_examples');
  } catch (e) {
    callback(e);
    return;
  }

  var allowed_keys = Object.keys(params).filter(function(item) {
    return item == 'name' || item.match(/^.*_positive_examples$/);
  });

  var parameters = {
    options: {
      url: '/v3/classifiers',
      method: 'POST',
      json: true,
      formData: pick(params, allowed_keys)
    },
    requiredParams: ['name'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieve a list of all classifiers, including built-in and
 * user-created classifiers.
 * @param verbose If verbose is present and not equal to "0",
 * return detailed results for each classifier.
 */
VisualRecognitionV3.prototype.listClassifiers = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v3/classifiers',
      qs: pick(params, ['verbose']),
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
 * @param  {ReadStream} classifier_ids The ids of the classifier
 *                                     to check images against.
 *                                     Omit this parameter to use
 *                                     all classifiers.
 */
VisualRecognitionV3.prototype.classify = function(params, callback) {
  var formData = extend(true, {}, params);

  try {
    verifyStream(formData.images_file, 'images_file');
  } catch (e) {
    callback(e);
    return;
  }

  // if is an array we wrap it in a `classifier_ids` element
  if (formData.classifier_ids && util.isArray(formData.classifier_ids))
    formData.classifier_ids = JSON.stringify(pick(formData,['classifier_ids']));

  var parameters = {
    options: {
      url: '/v3/classify',
      method: 'POST',
      json: true,
      formData: pick(formData, ['images_file', 'classifier_ids'])
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Accepts either a single image file or a zip file with multiple
 * images (.jpeg, .png, .gif) and attempts to extract faces and
 * identities. It then applies a threshold
 * and returns the list of relevant identities, locations, and metadata
 * for found faces for each image.
 *
 * @param  {ReadStream} images_file The image/s to analyze.
 */
VisualRecognitionV3.prototype.classify = function(params, callback) {
  var formData = extend(true, {}, params);

  try {
    verifyStream(formData.images_file, 'images_file');
  } catch (e) {
    callback(e);
    return;
  }

  var parameters = {
    options: {
      url: '/v3/detect_faces',
      method: 'POST',
      json: true,
      formData: pick(formData, ['images_file'])
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Accepts either a single image file or a zip file with multiple
 * images (.jpeg, .png, .gif) and attempts to recognize text
 * found in the image. It then applies a threshold
 * and returns the list of relevant locations, strings,  and metadata
 * for discovered text in each image.
 *
 * @param  {ReadStream} images_file The image/s to search for text.
 */
VisualRecognitionV3.prototype.classify = function(params, callback) {
  var formData = extend(true, {}, params);

  try {
    verifyStream(formData.images_file, 'images_file');
  } catch (e) {
    callback(e);
    return;
  }

  var parameters = {
    options: {
      url: '/v3/recognize_text',
      method: 'POST',
      json: true,
      formData: pick(formData, ['images_file'])
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = VisualRecognitionV3;
