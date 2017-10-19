/**
 * Copyright 2017 IBM All Rights Reserved.
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
const requestFactory = require('../lib/requestwrapper');
const helper = require('../lib/helper');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 * @param {Object} options
 * @constructor
 */
function LanguageTranslatorV2(options) {
  BaseService.call(this, options);
}
util.inherits(LanguageTranslatorV2, BaseService);
LanguageTranslatorV2.prototype.name = 'language_translator';
LanguageTranslatorV2.prototype.version = 'v2';
LanguageTranslatorV2.URL = 'https://gateway.watsonplatform.net/language-translator/api';


/**
 * Translates the input text from the source language to the target language.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string[]} params.text - Input text in UTF-8 encoding. It is a list so that multiple paragraphs can be submitted. Also accept a single string, instead of an array, as valid input.
 * @param {string} [params.model_id] - The unique model_id of the translation model being used to translate text. The model_id inherently specifies source language, target language, and domain. If the model_id is specified, there is no need for the source and target parameters and the values are ignored.
 * @param {string} [params.source] - Used in combination with target as an alternative way to select the model for translation. When target and source are set, and model_id is not set, the system chooses a default model with the right language pair to translate (usually the model based on the news domain).
 * @param {string} [params.target] - Used in combination with source as an alternative way to select the model for translation. When target and source are set, and model_id is not set, the system chooses a default model with the right language pair to translate (usually the model based on the news domain).
 * @param {Function} [callback] - The callback that handles the response.
 */
LanguageTranslatorV2.prototype.translate = function(params, callback) {
  params = params || {};
  const requiredParams = ['text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { text: params.text, model_id: params.model_id, source: params.source, target: params.target };
  const parameters = {
    options: {
      url: '/v2/translate',
      method: 'POST',
      json: true,
      body: body,
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Identifies the language of the input text.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.text - Input text in UTF-8 format.
 * @param {Function} [callback] - The callback that handles the response.
 */
LanguageTranslatorV2.prototype.identify = function(params, callback) {
  params = params || {};
  const requiredParams = ['text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = {  };
  const parameters = {
    options: {
      url: '/v2/identify',
      method: 'POST',
      json: true,
      body: body,
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'text/plain'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Lists all languages that can be identified by the API.
 *
 * Lists all languages that the service can identify. Returns the two-letter code (for example, `en` for English or `es` for Spanish) and name of each language.
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {Function} [callback] - The callback that handles the response.
 */
LanguageTranslatorV2.prototype.listIdentifiableLanguages = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    options: {
      url: '/v2/identifiable_languages',
      method: 'GET',
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Uploads a TMX glossary file on top of a domain to customize a translation model.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.base_model_id - Specifies the domain model that is used as the base for the training. To see current supported domain models, use the GET /v2/models parameter.
 * @param {string} [params.name] - The model name. Valid characters are letters, numbers, -, and _. No spaces.
 * @param {File} [params.forced_glossary] - A TMX file with your customizations. The customizations in the file completely overwrite the domain data translation, including high frequency or high confidence phrase translations. You can upload only one glossary with a file size less than 10 MB per call.
 * @param {File} [params.parallel_corpus] - A TMX file that contains entries that are treated as a parallel corpus instead of a glossary.
 * @param {File} [params.monolingual_corpus] - A UTF-8 encoded plain text file that is used to customize the target language model.
 * @param {string} [params.forced_glossary_content_type] - The content type of forced_glossary.
 * @param {string} [params.parallel_corpus_content_type] - The content type of parallel_corpus.
 * @param {string} [params.monolingual_corpus_content_type] - The content type of monolingual_corpus.
 * @param {Function} [callback] - The callback that handles the response.
 */
LanguageTranslatorV2.prototype.createModel = function(params, callback) {
  params = params || {};
  const requiredParams = ['base_model_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { base_model_id: params.base_model_id, name: params.name };
  const parameters = {
    options: {
      url: '/v2/models',
      method: 'POST',
      qs: query,
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Deletes a custom translation model.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.model_id - The model identifier.
 * @param {Function} [callback] - The callback that handles the response.
 */
LanguageTranslatorV2.prototype.deleteModel = function(params, callback) {
  params = params || {};
  const requiredParams = ['model_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { model_id: params.model_id };
  const parameters = {
    options: {
      url: '/v2/models/{model_id}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Get information about the given translation model, including training status.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.model_id - Model ID to use.
 * @param {Function} [callback] - The callback that handles the response.
 */
LanguageTranslatorV2.prototype.getModel = function(params, callback) {
  params = params || {};
  const requiredParams = ['model_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { model_id: params.model_id };
  const parameters = {
    options: {
      url: '/v2/models/{model_id}',
      method: 'GET',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Lists available standard and custom models by source or target language.
 *
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {string} [params.source] - Filter models by source language.
 * @param {string} [params.target] - Filter models by target language.
 * @param {boolean} [params.default_models] - Valid values are leaving it unset, `true`, and `false`. When `true`, it filters models to return the default_models model or models. When `false`, it returns the non-default_models model or models. If not set, it returns all models, default_models and non-default_models.
 * @param {Function} [callback] - The callback that handles the response.
 */
LanguageTranslatorV2.prototype.listModels = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const query = { source: params.source, target: params.target, default: params.default_models };
  const parameters = {
    options: {
      url: '/v2/models',
      method: 'GET',
      qs: query,
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  };
  return requestFactory(parameters, callback);
};

module.exports = LanguageTranslatorV2;