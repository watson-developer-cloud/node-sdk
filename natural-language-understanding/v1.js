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
 * NaturalLanguageUnderstanding
 * @param options
 * @constructor
 */
function NaturalLanguageUnderstandingV1(options) {
  BaseService.call(this, options);
}
util.inherits(NaturalLanguageUnderstandingV1, BaseService);
NaturalLanguageUnderstandingV1.prototype.name = 'natural_language_understanding';
NaturalLanguageUnderstandingV1.prototype.version = 'v1';
NaturalLanguageUnderstandingV1.URL = 'https://gateway-s.watsonplatform.net/natural-language-understanding/api';
NaturalLanguageUnderstandingV1.VERSION_DATE = '2016-01-23';

/**
  * QueryBuilder:  This object helps you build
  * an NLU query.
  * @param options: This is any api options you want to pass with your request
  * @constructor
  */

const QueryBuilder = function(options) {
  this._options = options || {};
  return this;
};

/**
  * These are the available features and their default arguments.
  */
const afeatures = {'concepts': {},
                   'entities': {},
                   'keywords': {},
                   'categories': {},
                   'emotion': {},
                   'sentiment': {},
                   'relations': {},
                   'semantic_roles': {} };

QueryBuilder.prototype.availableFeatures = new Set(Object.keys(afeatures));

/**
  * getFeature:  builds a query adding a feature to getFeature.
  * @param {string} featureName the name of the feature. Must be in availableFeatures.
  * @param {object} featureOptions options for that feature. May be null.
  * @returns {self} returns the query builder so they can be chained.
  */
QueryBuilder.prototype.getFeature = function(featureName, featureOptions) {
  const options = featureOptions || {};
  if (this.availableFeatures.has(featureName)) {
    if (this._options.features) {
      if (!this._options.features.hasOwnProperty(featureName)) {
        this._options.features[featureName] = options;
      }
    } else {
      this._options.features = {};
      this._options.features[featureName] = options;
    }
    return this;
  } else {
    throw new Error(`${featureName} is not a valid feature`);
  }
}

/**
  * getFeatures:  builds a query adding the features to getFeature.
  * @param {object} featureDict a dictionary of features and their options.
  * @returns {self} returns the query builder so they can be chained.
  */
QueryBuilder.prototype.getFeatures = function(featureDict) {
  Object.keys(featureDict).map((feature) => this.getFeature(feature, featureDict[feature]));
  return this;
}

/**
  * Get all available features
  * @returns {self} returns the query builder so they can be chained
  */
QueryBuilder.prototype.getAllFeatures = function() {
  return this.getFeatures(afeatures);
}

/**
  * adds the HTML content to the query
  * @param {string} htmlstring a string of html content
  * @returns {self} returns the query builder so they can be chained
  */
QueryBuilder.prototype.withHtmlString = function(htmlstring) {
  this._options.html = htmlstring;
  if (this._options.text || this._options.url) {
    throw new Error("Only one HTML, Text, or URL can be supplied");
  }
  return this;
}

/**
  * adds the Text content to the query
  * @param {string} textstring a string of text content
  * @returns {self} returns the query builder so they can be chained
  */
QueryBuilder.prototype.withTextString = function(textstring) {
  this._options.text = textstring;
  if (this._options.html || this._options.url) {
    throw new Error("Only one HTML, Text, or URL can be supplied");
  }
  return this;
}

/**
  * adds the URL to fetch to the query
  * @param {string} urlstring a string of a url to fetch
  * @returns {self} returns the query builder so they can be chained
  */
QueryBuilder.prototype.withURL = function(urlstring) {
  this._options.url = urlstring
  if (this._options.html || this._options.text) {
    throw new Error("Only one HTML, Text, or URL can be supplied");
  }
  return this;
}

/**
  * Object returns the query data
  * @returns {object} just the query options, formatted for the api
  */
QueryBuilder.prototype.object = function() {
  return this._options;
};

/**
  * Analyze the query.
  * @params {QueryBuilder} query a QueryBuilder query
  * @params {object} params any addtional request params, can be null
  * @params {function} callback taking (error,  jsonResult)
  * @returns {void}
  */
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
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

NaturalLanguageUnderstandingV1.prototype.QueryBuilder = QueryBuilder;

module.exports = NaturalLanguageUnderstandingV1;
