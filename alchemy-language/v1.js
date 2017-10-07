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

const extend = require('extend');
const util = require('util');
const BaseServiceAlchemy = require('../lib/base_service_alchemy');
const requestFactory = require('../lib/requestwrapper');
// IMPORTANT:
// Due to the current design, the URL must be the last key on each endpoint or
// it could inadvertently clobber a url query param in the users request.
// see #236
const endpoints = require('../lib/alchemy_endpoints.json');
const helper = require('../lib/helper');
const pick = require('object.pick');
const errorFormatter = require('../lib/alchemy_error_formatter');

/**
 * @privte
 * @param method
 * @return {Function}
 */
function createRequest(method) {
  return function(_params, callback) {
    const params = _params || {};
    const accepted_formats = Object.keys(endpoints[method]);
    const format = helper.getFormat(params, accepted_formats);

    if (format === null) {
      callback(new Error('Missing required parameters: ' + accepted_formats.join(', ') + ' needs to be specified'));
      return;
    }

    const parameters = {
      options: {
        url: endpoints[method][format],
        method: 'POST',
        json: true,
        qs: pick(params, ['model']),
        form: extend({}, params, { outputMode: 'json' }) // force output to json
      },
      defaultOptions: this._options // eslint-disable-line no-invalid-this
    };
    return requestFactory(parameters, errorFormatter(callback));
  };
}

/**
 *
 * @param {Object} options
 * @constructor
 */
function AlchemyLanguageV1(options) {
  BaseServiceAlchemy.call(this, options);
}
util.inherits(AlchemyLanguageV1, BaseServiceAlchemy);
AlchemyLanguageV1.prototype.name = 'alchemy_language';
AlchemyLanguageV1.prototype.version = 'v1';
AlchemyLanguageV1.URL = 'https://access.alchemyapi.com/calls';

/**
 * Extracts a grouped, ranked list of named entities (people, companies,
 * organizations, etc.) from text, a URL or HTML.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.entities = createRequest('entities');

/**
 * Extracts the keywords from text, a URL or HTML.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.keywords = createRequest('keywords');

/**
 * Tags the concepts from text, a URL or HTML.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.concepts = createRequest('concepts');

/**
 * Calculates the sentiment for text, a URL or HTML.
 */
AlchemyLanguageV1.prototype.sentiment = function(params, callback) {
  const _params = extend({}, params);
  const service = params.target || params.targets ? 'sentiment_targeted' : 'sentiment';
  if (Array.isArray(_params.targets)) {
    _params.targets = _params.targets.join('|');
  }

  return createRequest(service).call(this, _params, callback);
};
/**
 * Extracts the cleaned text (removes ads, navigation, etc.) for a URL or HTML.
 * if raw = true, extracts the cleaned text (removes ads, navigation, etc.).
 */
AlchemyLanguageV1.prototype.text = function(params, callback) {
  const service = params && params.raw ? 'text_raw' : 'text';
  return createRequest(service).call(this, params, callback);
};

/**
 * Extracts the authors from a URL or HTML.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.authors = createRequest('authors');

/**
 * Detects the language for text, a URL or HTML.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.language = createRequest('language');

/**
 * Extracts the title for a URL or HTML.
 *
 * @see http://www.alchemyapi.com/api/text/proc.html
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.title = createRequest('title');

/**
 * Extracts the relations for text, a URL or HTML.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.relations = createRequest('relations');

/**
 * Categorizes the text for text, a URL or HTML.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.category = createRequest('category');

/**
 * Extracts the publication date from a webpage or HTML file.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.publicationDate = createRequest('publication_date');

/**
 * Finds dates in the source text, including relative dates like "next Tuesday"
 * if an anchorDate is set.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.dates = createRequest('extract_dates');

/**
 * Detects the RSS/ATOM feeds for a URL or HTML.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.feeds = createRequest('feeds');

/**
 * Parses the microformats for a URL or HTML.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.microformats = createRequest('microformats');

/**
 * Categorized through the taxonomy call for text, HTML, or a URL.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.taxonomy = createRequest('taxonomy');

/**
 * Combines multiple API operations into a single call.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.combined = createRequest('combined');

/**
 * Detects emotions (anger, disgust, fear, joy, and sadness)
 * for text, HTML, or a URL.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.emotion = function(params, callback) {
  const _params = extend({}, params);
  const service = params.target || params.targets ? 'emotion_targeted' : 'emotion';
  if (Array.isArray(_params.targets)) {
    _params.targets = _params.targets.join('|');
  }

  return createRequest(service).call(this, _params, callback);
};

/**
 * Finds entities and their relationships
 * for text, HTML, or a URL.
 * @method
 * @param {Object} params
 * @param {Function} callback
 */
AlchemyLanguageV1.prototype.typedRelations = createRequest('typed_relations');

module.exports = AlchemyLanguageV1;
