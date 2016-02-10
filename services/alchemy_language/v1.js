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
var util           = require('util');
var requestFactory = require('../../lib/requestwrapper');
var endpoints      = require('../../lib/alchemy_endpoints.json');
var helper         = require('../../lib/helper');

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
        form: extend({}, params, {outputMode: 'json'}) // change default output to json
      },
      defaultOptions: this._options
    };
    return requestFactory(parameters, errorFormatter(callback));
  };
}

/**
 *
 * @param options
 * @constructor
 */
function AlchemyLanguage(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://access.alchemyapi.com/calls'
  };
  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Extracts a grouped, ranked list of named entities (people, companies,
 * organizations, etc.) from text, a URL or HTML.
 */
AlchemyLanguage.prototype.entities = createRequest('entities');

/**
 * Extracts the keywords from text, a URL or HTML.
 */
AlchemyLanguage.prototype.keywords = createRequest('keywords');

/**
 * Tags the concepts from text, a URL or HTML.
 */
AlchemyLanguage.prototype.concepts = createRequest('concepts');

/**
 * Calculates the sentiment for text, a URL or HTML.
 */
AlchemyLanguage.prototype.sentiment = function(params, callback) {
  var _params = extend({}, params);
  var service = (params.target || params.targets) ? 'sentiment_targeted' : 'sentiment';
  if (util.isArray(_params.targets))
    _params.targets = _params.targets.join('|');

  return createRequest(service).call(this, _params, callback);
};
/**
 * Extracts the cleaned text (removes ads, navigation, etc.) for a URL or HTML.
 * if raw = true, extracts the cleaned text (removes ads, navigation, etc.).
 */
AlchemyLanguage.prototype.text = function(params, callback) {
  var service = (params && params.raw) ? 'text_raw' : 'text';
  return createRequest(service).call(this, params, callback);
};

/**
 * Extracts the authors from a URL or HTML.
 */
AlchemyLanguage.prototype.authors = createRequest('authors');

/**
 * Detects the language for text, a URL or HTML.
 */
AlchemyLanguage.prototype.language = createRequest('language');

/**
 * Extracts the title for a URL or HTML.
 */
AlchemyLanguage.prototype.title = createRequest('title');

/**
 * Extracts the relations for text, a URL or HTML.
 */
AlchemyLanguage.prototype.relations = createRequest('relations');

/**
 * Categorizes the text for text, a URL or HTML.
 */
AlchemyLanguage.prototype.category = createRequest('category');

/**
 * Categorizes the text for text, a URL or HTML.
 */
AlchemyLanguage.prototype.publicationDate = createRequest('publication_date');

/**
 * Detects the RSS/ATOM feeds for a URL or HTML.
 */
AlchemyLanguage.prototype.feeds = createRequest('feeds');

/**
 * Parses the microformats for a URL or HTML.
 */
AlchemyLanguage.prototype.microformats = createRequest('microformats');

/**
 * Categorized through the taxonomy call for text, HTML, or a URL.
 */
AlchemyLanguage.prototype.taxonomy = createRequest('taxonomy');

/**
 * Categorized through the taxonomy call for text, HTML, or a URL.
 */
AlchemyLanguage.prototype.combined = createRequest('combined');

/**
 * Detects emotions (anger, digust, fear, joy, and sadness)
 * for text, HTML, or a URL.
 */
AlchemyLanguage.prototype.emotion = createRequest('emotion');

module.exports = AlchemyLanguage;
