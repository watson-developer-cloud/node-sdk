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

const requestFactory = require('../lib/requestwrapper');
const extend = require('extend');
const pick = require('object.pick');
const isStream = require('isstream');
const helper = require('../lib/helper');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 *
 * @param {string} [params.url=https://gateway.watsonplatform.net/language-translation/api] The service URL.
 * @param {string} params.username Username
 * @param {string} params.password Password
 * @constructor
 */
function LanguageTranslatorV2(options) {
  // Welp, this is awkward. Originally the rename was *just* a rename, but then (after the SDK was updated,
  // but before the backend was updated), it was decided that the billing should be simplified at the same time.
  // That's a solid improvement, but it means that the SDK now needs to support both services independently,
  // and correcting the default URL here will break older code, so it must be reserved for a major release.
  // todo: consider checking for options.url === LanguageTranslationV2.URL and also throw this warning then.
  // (This probably does't matter since the api didn't change)
  if (!options || !options.url) {
    const err = new Error(
      'LanguageTranslatorV2 currently defaults to the url for LanguageTranslationV2, ' +
        'but this will change in the next major release of the watson-developer-cloud Node.js SDK. ' +
        'Please either specify the url https://gateway.watsonplatform.net/language-translator/api or else use ' +
        'LanguageTranslationV2. ' +
        'See http://www.ibm.com/watson/developercloud/doc/language-translator/migrating.shtml for more details.'
    );
    // eslint-disable-next-line no-console
    console.warn(err);
  }

  BaseService.call(this, options);
}
util.inherits(LanguageTranslatorV2, BaseService);
LanguageTranslatorV2.prototype.name = 'language_translator';
LanguageTranslatorV2.prototype.version = 'v2';
LanguageTranslatorV2.URL = 'https://gateway.watsonplatform.net/language-translation/api'; // This is incorrect and will change in v 3.0.0
/**
 * Return the translation models
 */

/**
 * Return the translation models
 * @param  {string}   params.default   Query filters to check if the model is
 *                            the default one used when only source
 *                            and target languages are specified.
 * @param  {string}   params.source   Filter by source language
 * @param  {string}   params.target   Filter by target language
 */
LanguageTranslatorV2.prototype.getModels = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      method: 'GET',
      url: '/v2/models',
      qs: pick(params, ['default', 'source', 'target']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Return the translation model
 * @param  {string}   params.model_id   The model identifier
 */
LanguageTranslatorV2.prototype.getModel = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      method: 'GET',
      url: '/v2/models/{model_id}',
      path: pick(params, ['model_id']),
      json: true
    },
    requiredParams: ['model_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates a translation model
 * @param  {string}   params.base_model_id   The base model identifier
 * @param  {string}   params.name   The model name
 * @param  {stream}   params.forced_glossary   A UTF-8 encoded TMX file that contains pairs of matching terms in the source and target language that are seen as absolute by the system. This file completely overwrites the original domain data.
 * @param  {stream}   params.parallel_corpus   A UTF-8 encoded TMX file that contains matching phrases in the source and target language that serve as examples for Watson. Parallel corpora differ from glossaries because they do not overwrite the original domain data.
 * @param  {stream}   params.monolingual_corpus A UTF-8 encoded plain text file that contains a body of text in the target language that is related to what you are translating. A monolingual corpus helps improve literal translations to be more fluent and human.
 */

LanguageTranslatorV2.prototype.createModel = function(params, callback) {
  params = params || {};

  const missingParams = helper.getMissingParams(params, ['base_model_id']);
  if (missingParams) {
    callback(missingParams);
    return;
  }

  const inputTypes = ['forced_glossary', 'parallel_corpus', 'monolingual_corpus'];

  for (const type in inputTypes) {
    if (inputTypes.hasOwnProperty(type)) {
      if (params[inputTypes[type]] && !isStream(params[inputTypes[type]])) {
        callback(new Error(inputTypes[type] + ' is not a standard Node.js Stream'));
        return;
      }
    }
  }

  const parameters = {
    options: {
      method: 'POST',
      url: '/v2/models',
      qs: pick(params, ['name', 'base_model_id']),
      formData: pick(params, inputTypes),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Deletes a model
 * @param  {string}   params.model_id   The model identifier
 */
LanguageTranslatorV2.prototype.deleteModel = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      method: 'DELETE',
      url: '/v2/models/{model_id}',
      path: pick(params, ['model_id']),
      json: true
    },
    requiredParams: ['model_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Translate pharagraphs from one language into another
 * @param {string} params.source Source language
 * @param {string} params.target Target language
 */
LanguageTranslatorV2.prototype.translate = function(params, callback) {
  params = params || {};

  if (!(params.model_id || (params.source && params.target))) {
    callback(new Error('Missing required parameters: model_id or source and target'));
    return;
  }
  const parameters = {
    options: {
      url: '/v2/translate',
      method: 'POST',
      json: true,
      body: pick(params, ['source', 'target', 'text', 'model_id'])
    },
    requiredParams: ['text'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Returns the identifiable languages
 */
LanguageTranslatorV2.prototype.getIdentifiableLanguages = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v2/identifiable_languages',
      method: 'GET'
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Identify the text based on the identifiable languages
 * @param  {string} params.text  text to identify
 */
LanguageTranslatorV2.prototype.identify = function(params, callback) {
  if (!params || !params.text) {
    callback(new Error('Missing required parameters: text'));
    return;
  }

  const parameters = {
    options: {
      url: '/v2/identify',
      method: 'POST',
      body: params.text
    },
    defaultOptions: extend(true, {}, this._options, {
      headers: {
        accept: 'application/json',
        'content-type': 'text/plain'
      }
    })
  };

  return requestFactory(parameters, callback);
};

module.exports = LanguageTranslatorV2;
