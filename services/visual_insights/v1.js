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

var extend         = require('extend');
var requestFactory = require('../../lib/requestwrapper');
var isStream       = require('isstream');

function VisualInsights(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/visual-insights-experimental/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Returns a list of the classifiers that are used in the summary call
 */
VisualInsights.prototype.classifiers = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/classifiers',
      qs: params,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Classifies @param images_file using all available classifiers.
 *
 * @param  {ReadStream} images_file The zip of images to analyze.
 */
VisualInsights.prototype.summary = function(params, callback) {
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
      method: 'POST',
      url: '/v1/summary',
      formData: params,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = VisualInsights;