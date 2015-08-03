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

var requestFactory = require('../../lib/requestwrapper');
var extend         = require('extend');
var pick           = require('object.pick');
var isStream       = require('isstream');
var helper         = require('../../lib/helper');

function LanguageTranslation(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/language-translation/api'
  };
  this._options = extend(serviceDefaults, options);
}

/**
 * Return the translation models
 */

/**
 * Return the translation models
 * @param  string   default   Query filters to check if the model is
 *                            the default one used when only source
 *                            and target languages are specified.
 * @param  string   source   Filter by source language
 * @param  string   target   Filter by target language
 */
LanguageTranslation.prototype.getModels = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      method: 'GET',
      url: '/v2/models',
      qs: pick(params,['default','source','target']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Return the translation model
 * @param  string   model_id   The model identifier
 */
LanguageTranslation.prototype.getModel = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      method: 'GET',
      url: '/v2/models/{model_id}',
      path: pick(params,['model_id']),
      json: true
    },
    requiredParams: ['model_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates a translation model
 * @param  string   base_model_id   The base model identifier
 * @param  string   name   The model name
 * @param  stream   forced_glossary   The tmx stream
 */
LanguageTranslation.prototype.createModel = function(params, callback) {
  params = params || {};

  var missingParams = helper.getMissingParams(params, ['forced_glossary', 'base_model_id']);
  if (missingParams) {
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }


  if (!isStream(params.forced_glossary)) {
    callback(new Error('forced_glossary is not a standard Node.js Stream'));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: '/v2/models',
      qs: pick(params,['name', 'base_model_id']),
      formData: pick(params,['forced_glossary']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Deletes a translation model
 * @param  string   model_id   The model identifier
 */
LanguageTranslation.prototype.deleteModel = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      method: 'DELETE',
      url: '/v2/models/{model_id}',
      path: pick(params,['model_id']),
      json: true
    },
    requiredParams: ['model_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Translate pharagraphs from @param source to @param target.
 */
LanguageTranslation.prototype.translate = function(params, callback) {
  params = params || {};

  if (!(params.model_id || (params.source && params.target))){
    callback(new Error('Missing required parameters: model_id or source and target'));
    return;
  }
  var parameters = {
    options: {
      url: '/v2/translate',
      method: 'POST',
      json: true,
      body: pick(params, ['source','target','text','model_id'])
    },
    requiredParams: ['text'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Returns the identifiable languages
 */
LanguageTranslation.prototype.getIdentifiableLanguages = function(params, callback) {
  params = params || {};

  var parameters = {
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
 * @param  string   text   text to identify
 */
LanguageTranslation.prototype.identify = function(params, callback) {
  if (!params || !params.text){
    callback(new Error('Missing required parameters: text'));
    return;
  }

  var parameters = {
    options: {
      url: '/v2/identify',
      method: 'POST',
      body: params.text
    },
    defaultOptions: extend(this._options, {
      headers: {
        'accept':'application/json',
        'content-type': 'plain/text'
      }
    })
  };

  return requestFactory(parameters, callback);
};

module.exports = LanguageTranslation;