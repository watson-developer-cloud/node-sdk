/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
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
var endpoints      = require('../../lib/alchemy_endpoints.json');
var helper         = require('../../lib/helper');
var isStream       = require('isstream');
var pick           = require('object.pick');
var omit           = require('object.omit');
var fs             = require('fs');

function errorFormatter(cb) {
  return function(err, result, response) {
    if (err) {
      cb(err, result);
    }
    else {
      if (result.status === 'OK')
        cb(err,result);
      else
        cb({
          error: result.statusInfo || response['headers']['x-alchemyapi-error-msg'],
          code: 400
        }, null);
    }
  };
}

function createRequest(method) {
  return function(_params, callback ) {
    var params = _params || {};
    var accepted_formats = Object.keys(endpoints[method]);
    var format = helper.getFormat(params, accepted_formats);

    if (format === null) {
      callback(new Error('Missing required parameters: ' +
        accepted_formats.join(', ') +
        ' needs to be specified'));
      return;
    }

    var parameters = {
      options: {
        url: endpoints[method][format],
        method: 'POST',
        json: true,
        qs: extend({outputMode: 'json'}, params) // change default output to json
      },
      defaultOptions: this._options
    };

    return requestFactory(parameters, errorFormatter(callback));
  };
}

function AlchemyVision(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://access.alchemyapi.com/calls'
  };
  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Extracts images from a URL or html
 */
AlchemyVision.prototype.imageLinks = function(_params, callback ) {
  var params = _params || {};
  var accepted_formats = Object.keys(endpoints['image_link']);
  var format = helper.getFormat(params, accepted_formats);

  if (format === null) {
    callback(new Error('Missing required parameters: ' +
      accepted_formats.join(', ') + ' needs to be specified'));
    return;
  }

  var parameters = {
    options: {
      url: endpoints['image_link'][format],
      method: 'POST',
      json: true,
      qs: extend({outputMode: 'json'}, params) // change default output to json
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, errorFormatter(callback));
};

/**
 * Tags image with keywords
 */
AlchemyVision.prototype.getImageKeywords = function(_params, callback) {
  var params = _params || {};
  var accepted_formats = Object.keys(endpoints['image_keywords']);
  var format = helper.getFormat(params, accepted_formats);
  var image = null;
  if (format === null) {
    callback(new Error('Missing required parameters: ' +
      accepted_formats.join(', ') + ' needs to be specified'));
    return;
  }


  if (typeof(params.image) !== 'undefined') {
    // check if image is stream or string
    if (typeof(params.image) !== 'string' && !isStream(params.image)) {
      callback(new Error('Invalid arguments: image needs to be a stream or base64'));
      return;
    }

    if (isStream(params.image)) {
      params.imagePostMode = 'raw';
      image = params.image;
      delete params.image;
    } else {
      params.imagePostMode = 'not-raw';
    }
  }

  var parameters = {
    options: {
      url: endpoints['image_links'][format],
      method: 'POST',
      json: true,
      body: image,
      qs: extend({outputMode: 'json'}, params) // change default output to json
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, errorFormatter(callback));
};

/**
 * Face detection and Recognition
 */
AlchemyVision.prototype.recognizeFaces = function(_params, callback) {
  var params = _params || {};

  if (typeof(params.image) !== 'string')
    params.imagePostMode = 'raw';

  return createRequest('image_recognition').call(this, params, callback);
};

module.exports = AlchemyVision;