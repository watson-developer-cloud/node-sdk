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

const pick = require('object.pick');
const extend = require('extend');
const requestFactory = require('../lib/requestwrapper');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 * Watson Text to Speech service
 *
 * @param {Object} options
 * @constructor
 */
function TextToSpeechV1(options) {
  BaseService.call(this, options);
}
util.inherits(TextToSpeechV1, BaseService);
TextToSpeechV1.prototype.name = 'text_to_speech';
TextToSpeechV1.prototype.version = 'v1';
TextToSpeechV1.URL = 'https://stream.watsonplatform.net/text-to-speech/api';

/**
 * Streaming speech synthesis of the text in a query parameter
 *
 * @param {Object} params
 * @param {String} params.text
 * @param {String} [params.voice=en-US_MichaelVoice] - Call .voices() for a complete list
 * @param {String} [params.accept=audio/ogg;codecs=opus] - Supported formats are audio/ogg;codecs=opus, audio/wav, audio/flac, audio/l16, audio/basic
 * @param {Boolean} [params.X-Watson-Learning-Opt-Out]
 * @param {String} [params.customization_id]
 * @param {Function} callback
 */
TextToSpeechV1.prototype.synthesize = function(params, callback) {
  params = extend({ accept: 'audio/ogg; codecs=opus' }, params);

  const parameters = {
    requiredParams: ['text'],
    options: {
      method: 'POST',
      url: '/v1/synthesize',
      body: JSON.stringify(pick(params, ['text'])),
      qs: pick(params, ['accept', 'voice', 'customization_id']),
      path: pick(params, ['text']),
      headers: extend(
        {
          'content-type': 'application/json'
        },
        pick(params, ['X-Watson-Learning-Opt-Out'])
      ),
      encoding: null
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

// todo: add websocket support
// http://www.ibm.com/watson/developercloud/text-to-speech/api/v1/?curl#www_synthesize12

/**
 * Retrieves the voices available for speech synthesis
 * @param {Object} params
 * @param {Function} callback
 */
TextToSpeechV1.prototype.voices = function(params, callback) {
  const parameters = {
    options: {
      method: 'GET',
      url: '/v1/voices',
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves information about the specified voice
 *
 * @param {Object} params
 * @param {String} params.voice
 * @param {String} [params.customization_id]
 */
TextToSpeechV1.prototype.voice = function(params, callback) {
  const parameters = {
    requiredParams: ['voice'],
    options: {
      method: 'GET',
      url: '/v1/voices/{voice}',
      path: pick(params, ['voice']),
      qs: pick(params, ['customization_id']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns the phonetic pronunciation for the specified word.
 *
 * @param {Object} params
 * @param {String} params.text - a single word
 * @param {String} [params.format=ipa] - Supported formats are ipa, spr for US English, or spr for other languages
 * @param {String} [params.voice] - Defaults to en-US_MichaelVoice unless a customization_id is specified. Do not specify both a voice and a customization_id
 * @param {String} [params.customization_id] - do not specify both a voice and a customization_id
 */
TextToSpeechV1.prototype.pronunciation = function(params, callback) {
  const parameters = {
    requiredParams: ['text'],
    options: {
      method: 'GET',
      url: '/v1/pronunciation',
      qs: pick(params, ['text', 'voice', 'format', 'customization_id']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates a new empty custom voice model
 *
 * Response looks like:
 *
 * ```json
 * {
 *   "customization_id": "abc996ea-86ca-482e-b7ec-0f31c34e5ee9"
 * }
 * ```
 *
 * @param {Object} params
 * @param {String} params.name
 * @param {String} [params.language=en-US]
 * @param {String} [params.description]
 * @param {Function} callback
 */
TextToSpeechV1.prototype.createCustomization = function(params, callback) {
  const parameters = {
    requiredParams: ['name'],
    options: {
      method: 'POST',
      url: '/v1/customizations',
      body: pick(params, ['name', 'language', 'description']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * @typedef Word
 * @type {Object}
 * @property {String} word - the word as written
 * @property {String} translation - The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word.
 */

/**
 * Update voice model
 *
 * Updates information for the specified custom voice model.
 * You can update the metadata such as the name and description of the voice model.
 * You can also update the words in the model and their translations.
 * A custom model can contain no more than 20,000 entries.
 * Only the owner of a custom voice model can use this method to update the model.
 *
 * An example of params.words could be:
 *
 * ```json
 *  [
 *    {"word":"NCAA", "translation":"N C double A"},
 *    {"word":"iPhone", "translation":"I phone"}
 *  ]
 * ```
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {String} [params.name]
 * @param {String} [params.description]
 * @param {Array<Word>} params.words - Array of {word, translation} objects where translation is the phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word.
 * @param {Function} callback
 */
TextToSpeechV1.prototype.updateCustomization = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'words'],
    originalParams: params,
    options: {
      method: 'POST',
      url: '/v1/customizations/' + params.customization_id,
      body: pick(params, ['name', 'description', 'words']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * List custom voice models
 *
 * Lists metadata such as the name and description for all custom voice models that you own for all languages.
 * Specify a language to list the voice models that you own for the specified language only.
 *
 * Example response:
 *
 * ```json
{
  "customizations": [
    {
      "owner": "53fd7517-af0d-849d-801b-6e042a5d2f22",
      "language": "en-US",
      "created": 1461173032707,
      "customization_id": "a4df11a9-7cf9-48e8-8319-08fb7c3b1aa8",
      "name": "Second cURL Test",
      "description": "Second customization test via cURL",
      "last_modified": 1461173032707
    },
    {
      "owner": "53fd7517-af0d-849d-801b-6e042a5d2f22",
      "language": "en-US",
      "created": 1461173032106,
      "customization_id": "53506a62-6861-41f5-9a44-352047edcf6f",
      "name": "First cURL Test Update",
      "description": "First customization test via cURL update",
      "last_modified": 1461173033323
    }
  ]
}```
 *
 *
 * @param {Object} [params]
 * @param {String} [params.language] optional filter.
 * @param {Function} callback
 */
TextToSpeechV1.prototype.getCustomizations = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    options: {
      method: 'GET',
      url: '/v1/customizations/',
      qs: pick(params, ['language']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get a custom voice model
 *
 * Lists all information about the specified custom voice model.
 * In addition to metadata such as the name and description of the voice model, the output includes the words in the model and their translations as defined in the model.
 * Only the owner of a custom voice model can use this method to query information about the model.
 *
 * Example response:
 * ```json
 {
   "words": [
     {
       "word": "NCAA",
       "translation": "N C double A"
     },
     {
       "word": "iPhone",
       "translation": "I phone"
     }
   ],
   "owner": "53fd7517-af0d-849d-801b-6e042a5d2f22",
   "created": 1461173032106,
   "language": "en-US",
   "last_modified": 1461173033323,
   "customization_id": "53506a62-6861-41f5-9a44-352047edcf6f",
   "name": "First cURL Test Update",
   "description": "First customization test via cURL update"
 }```
 *
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Function} callback
 */
TextToSpeechV1.prototype.getCustomization = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id'],
    originalParams: params,
    options: {
      method: 'GET',
      url: '/v1/customizations/' + params.customization_id,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a custom voice model
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Function} callback
 */
TextToSpeechV1.prototype.deleteCustomization = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id'],
    originalParams: params,
    options: {
      method: 'DELETE',
      url: '/v1/customizations/' + params.customization_id,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Add words to a custom voice model
 *
 * Adds one or more words and their translations to the specified custom voice model.
 * A custom model can contain no more than 20,000 entries.
 *
 * An example of params.words could be:
 *
 * ```json
 *  [
 *    {"word":"NCAA", "translation":"N C double A"},
 *    {"word":"iPhone", "translation":"I phone"}
 *  ]
 * ```
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Array<Word>} params.words - Array of {word, translation} objects where translation is the phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word.
 * @param {Function} callback
 */
TextToSpeechV1.prototype.addWords = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'words'],
    originalParams: params,
    options: {
      method: 'POST',
      url: '/v1/customizations/' + params.customization_id + '/words',
      body: pick(params, ['words']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Add a word to a custom voice model
 *
 * Adds a single word and its translation to the specified custom voice model.
 * A custom model can contain no more than 20,000 entries.
 *
 * An example call could be
 *
 * ```json
 *  myTextToSpeech.addWord({
 *      customization_id: '<model-id>',
 *      word: 'ACLs',
 *      translation: 'ackles'
 *    },
 *    function(err, res) {
 *      console.log(err, res);
 *   });
 * ```
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {String} params.word
 * @param {String} params.translation - the phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word.
 * @param {Function} callback
 */
TextToSpeechV1.prototype.addWord = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'word', 'translation'],
    originalParams: params,
    options: {
      method: 'PUT',
      url: '/v1/customizations/' + params.customization_id + '/words/' + params.word,
      body: pick(params, ['translation']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * List words
 *
 * Lists all of the words and their translations for the specified custom voice model.
 * The output shows the translations as they are defined in the model.
 *
 * Example response:
 *
 * ```json
 {
    "words": [
       {
          "word": "NCAA",
           "translation": "N C double A"
       },
       {
          "word": "iPhone",
          "translation": "I phone"
       },
       {
          "word": "EEE",
          "translation": "<phoneme alphabet="ibm" ph="tr1Ipxl.1i"></phoneme>"
       },
       {
          "word": "IEEE",
          "translation": "<phoneme alphabet="ibm" ph="1Y.tr1Ipxl.1i"></phoneme>"
       },
       {
          "word": "ACLs",
          "translation": "ackles"
       }
    ]
 }
 *  ```
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Function} callback
 */
TextToSpeechV1.prototype.getWords = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    requiredParams: ['customization_id'],
    originalParams: params,
    options: {
      method: 'GET',
      url: '/v1/customizations/' + params.customization_id + '/words',
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get the translation for a single word from the specified custom model.
 *
 * Example output:
 *
 * ```json
{
  "translation": "ackles"
}
 * ```
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {String} params.word
 * @param {Function} callback
 */
TextToSpeechV1.prototype.getWord = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'word'],
    originalParams: params,
    options: {
      method: 'GET',
      url: '/v1/customizations/' + params.customization_id + '/words/' + params.word,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Deletes a single word from the specified custom voice model.
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {String} params.word
 * @param {Function} callback
 */
TextToSpeechV1.prototype.deleteWord = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'word'],
    originalParams: params,
    options: {
      method: 'DELETE',
      url: '/v1/customizations/' + params.customization_id + '/words/' + params.word,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = TextToSpeechV1;
