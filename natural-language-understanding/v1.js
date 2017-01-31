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

var requestFactory = require('../lib/requestwrapper');
var pick = require('object.pick');
var util = require('util');
var BaseService = require('../lib/base_service');

/**
 *
 * @param options
 * @constructor
 */
function NaturalLanguageUnderstandingV1(options) {
  BaseService.call(this, options);
}
util.inherits(NaturalLanguageUnderstandingV1, BaseService);
NaturalLanguageUnderstandingV1.prototype.name = 'natural_language_understanding';
NaturalLanguageUnderstandingV1.prototype.version = 'v1';
NaturalLanguageUnderstandingV1.URL = 'https://gateway-s.watsonplatform.net/natural-language-understanding/api/';
NaturalLanguageUnderstandingV1.VERSION_DATE = '2016-01-23';

const QueryBuilder = function(options) {
  this._options = {};
  Object.keys(options).apply((item) => { this._options[item] = options[item] });
  return this;
};

const afeatures = ['concepts', 'entities', 'keywords',
  'categories', 'emotion', 'sentiment',
  'relations', 'semantic_roles'];

QueryBuilder.prototype.availableFeatures = new Set(afeatures);

QueryBuilder.prototype.getFeature = function(featureName) {
  if (this.availableFeatures.has(featureName)) {
    if (this._options.features) {
      if (this._options.features.indexOf(featureName) === -1) {
        this._options.features.push(featureName);
      }
    } else {
      this._options.features = [ featureName ];
    }
    return this;
  } else {
    throw new Error(`${featureName} is not a valid feature`);
  }
}

QueryBuilder.prototype.getFeatures = function(featureNames) {
  featureNames.map((feature) => this.getFeature(feature) );
  return this;
}

QueryBuilder.prototype.getAllFeatures = function() {
  return this.getFeatures(afeatures);
}

QueryBuilder.prototype.withHtmlString = function(htmlstring) {
  this._options.html = htmlstring;
  if (this._options.text || this._options.url) {
    throw new Error("Only one HTML, Text, or URL can be supplied");
  }
  return this;
}

QueryBuilder.prototype.withTextString = function(textstring) {
  this._options.text = textstring;
  if (this._options.html || this._options.url) {
    throw new Error("Only one HTML, Text, or URL can be supplied");
  }
  return this;
}

QueryBuilder.prototype.withURL = function(urlstring) {
  this._options.url = urlstring
  if (this._options.html || this._options.text) {
    throw new Error("Only one HTML, Text, or URL can be supplied");
  }
  return this;
}

QueryBuilder.prototype.json = function(prettyprint) {
  if (prettyprint) {
    return JSON.dumps(this._options,null,2);
  } else {
    return JSON.dumps(this._options);
  }
}

QueryBuilder.prototype.object = function() {
  return this._options;
};

NaturalLanguageUnderstandingV1.prototype.analyze = function(query, params, callback) {
  if (typeof(params) === 'function') {
    callback = params;
    params = {};
  } else {
    params = params || {};
  }

  params.version = params.version || NaturalLanguageUnderstandingV1.VERSION_DATE;

  var parameters = {
    options: {
      url: '/v1/analyze',
      method: 'POST',
      json: true,
      qs: pick(params, ['version']),
      body: query.object()
    },
    requiredParams: ['collection_id', 'image_file'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

NaturalLanguageUnderstandingV1.prototype.QueryBuilder = QueryBuilder;

module.exports = NaturalLanguageUnderstandingV1;
