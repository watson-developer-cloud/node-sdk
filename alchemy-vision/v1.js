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

var requestFactory = require('../lib/requestwrapper');
var endpoints      = require('../lib/alchemy_endpoints.json');
var helper         = require('../lib/helper');
var isStream       = require('isstream');
var omit           = require('object.omit');
var fs             = require('fs');
var util = require('util');
var BaseServiceAlchemy = require('../lib/base_service_alchemy');
var errorFormatter = require('../lib/alchemy_error_formatter');

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
    // always return json
    params.outputMode = 'json';

    var parameters = {
      options: {
        url: endpoints[method][format],
        method: 'POST'
      },
      defaultOptions: this._options
    };

    if (!params.image || !isStream(params.image)) {
      // url or base64 images are considered 'not-raw'
      if (params.image)
        params.imagePostMode = 'not-raw';
      // send the parameters as form url-encoded
      parameters.options.form = params;
      return requestFactory(parameters, errorFormatter(callback));
    } else {
      params.imagePostMode = 'raw';
      // send the parameters as query parameters
      parameters.options.qs = omit(params,['image']);
      // add the content-length to the headers
      parameters.options.headers = {
        'Content-Length': fs.statSync(params.image.path).size
      };
      return params.image.pipe(requestFactory(parameters, errorFormatter(callback)));
    }
  };
}


/**
 *
 * @param options
 * @constructor
 */
function AlchemyVisionV1(options) {
  BaseServiceAlchemy.call(this, options);
}
util.inherits(AlchemyVisionV1, BaseServiceAlchemy);
AlchemyVisionV1.prototype.name = 'alchemy_vision';
AlchemyVisionV1.prototype.version = 'v1';
AlchemyVisionV1.URL = 'https://access.alchemyapi.com/calls';

/**
 * Tags image with keywords
 */
AlchemyVisionV1.prototype.getImageKeywords = createRequest('image_keywords');

/**
 * Face detection and Recognition
 */
AlchemyVisionV1.prototype.recognizeFaces = createRequest('image_recognition');

/**
 * Extracts images from a URL or html
 */
AlchemyVisionV1.prototype.getImageLinks = createRequest('image_link');

/**
 * Identifies  text in an image
 */
AlchemyVisionV1.prototype.getImageSceneText = createRequest('image_scene_text');

module.exports = AlchemyVisionV1;
