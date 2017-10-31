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
function TextToSpeechV1(options) {
  BaseService.call(this, options);
}
util.inherits(TextToSpeechV1, BaseService);
TextToSpeechV1.prototype.name = 'text_to_speech';
TextToSpeechV1.prototype.version = 'v1';
TextToSpeechV1.URL = 'https://gateway.watsonplatform.net/text-to-speech/api';


/**
 * Deletes a custom voice model.
 *
 * Deletes the custom voice model with the specified `customization_id`. You must use credentials for the instance of the service that owns a model to delete it.   **Note:** This method is currently a beta release.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.customization_id - GUID of the custom voice model to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.deleteCustomizationByID = function(params, callback) {
  params = params || {};
  const requiredParams = ['customization_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { customization_id: params.customization_id };
  const parameters = {
    options: {
      url: '/v1/customizations/{customization_id}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Queries the contents of a custom voice model.
 *
 * Lists all information about the custom voice model with the specified `customization_id`. In addition to metadata such as the name and description of the voice model, the output includes the words in the model and their translations as defined in the model. To see just the metadata for a voice model, use the `GET /v1/customizations` method. You must use credentials for the instance of the service that owns a model to list information about it.   **Note:** This method is currently a beta release.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.customization_id - GUID of the custom voice model to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.getCustomizationByID = function(params, callback) {
  params = params || {};
  const requiredParams = ['customization_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { customization_id: params.customization_id };
  const parameters = {
    options: {
      url: '/v1/customizations/{customization_id}',
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
 * Lists all available custom voice models for a language or for all languages.
 *
 * Lists metadata such as the name and description for the custom voice models that you own. Use the `language` query parameter to list the voice models that you own for the specified language only. Omit the parameter to see all voice models that you own for all languages. To see the words in addition to the metadata for a specific voice model, use the `GET /v1/customizations/{customization_id}` method. You must use credentials for the instance of the service that owns a model to list information about it.   **Note:** This method is currently a beta release.
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {string} [params.language] - The language for the custom voice models owned by the requesting service credentials that are to be returned. Omit the parameter to see all custom voice models owned by the requester.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.getCustomizations = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const query = { language: params.language };
  const parameters = {
    options: {
      url: '/v1/customizations',
      method: 'GET',
      qs: query,
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
 * Updates information and words for a custom voice model.
 *
 * Updates information for the custom voice model with the specified `customization_id`. You can update the metadata such as the name and description of the voice model. You can also update the words in the model and their translations. Adding a new translation for a word that already exists in a custom model overwrites the word's existing translation. A custom model can contain no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to update it.   **Note:** This method is currently a beta release.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.customization_id - GUID of the custom voice model to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model.
 * @param {Word[]} params.words - List of words and their translations to be added to or updated in the custom voice model. Pass an empty array to make no additions or updates.
 * @param {string} [params.name] - New name for the custom voice model.
 * @param {string} [params.description] - New description for the custom voice model.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.postCustomizationByID = function(params, callback) {
  params = params || {};
  const requiredParams = ['customization_id', 'words'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { words: params.words, name: params.name, description: params.description };
  const path = { customization_id: params.customization_id };
  const parameters = {
    options: {
      url: '/v1/customizations/{customization_id}',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Creates a new custom voice model.
 *
 * Creates a new empty custom voice model. The model is owned by the instance of the service whose credentials are used to create it.   **Note:** This method is currently a beta release.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.name - Name of the new custom voice model.
 * @param {string} [params.language] - Language of the new custom voice model. Omit the parameter to use the default language, `en-US`.
 * @param {string} [params.description] - Description of the new custom voice model.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.postCustomizations = function(params, callback) {
  params = params || {};
  const requiredParams = ['name'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { name: params.name, language: params.language, description: params.description };
  const parameters = {
    options: {
      url: '/v1/customizations',
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
 * Deletes a word from a custom voice model.
 *
 * Deletes a single word from the custom voice model with the specified `customization_id`. You must use credentials for the instance of the service that owns a model to delete it.   **Note:** This method is currently a beta release.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.customization_id - GUID of the custom voice model from which to delete a word. You must make the request with service credentials created for the instance of the service that owns the custom model.
 * @param {string} params.word - The word to be deleted from the custom voice model.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.deleteCustomizationByIDWord = function(params, callback) {
  params = params || {};
  const requiredParams = ['customization_id', 'word'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { customization_id: params.customization_id, word: params.word };
  const parameters = {
    options: {
      url: '/v1/customizations/{customization_id}/words/{word}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Queries details about a word in a custom voice model.
 *
 * Returns the translation for a single word from the custom model with the specified `customization_id`. The output shows the translation as it is defined in the model. You must use credentials for the instance of the service that owns a model to query information about its words.   **Note:** This method is currently a beta release.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.customization_id - GUID of the custom voice model in which to query a word. You must make the request with service credentials created for the instance of the service that owns the custom model.
 * @param {string} params.word - The word to be queried from the custom voice model.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.getCustomizationByIDWord = function(params, callback) {
  params = params || {};
  const requiredParams = ['customization_id', 'word'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { customization_id: params.customization_id, word: params.word };
  const parameters = {
    options: {
      url: '/v1/customizations/{customization_id}/words/{word}',
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
 * Queries details about the words in a custom voice model.
 *
 * Lists all of the words and their translations for the custom voice model with the specified `customization_id`. The output shows the translations as they are defined in the model. You must use credentials for the instance of the service that owns a model to query information about its words.   **Note:** This method is currently a beta release.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.customization_id - GUID of the custom voice model to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.getCustomizationByIDWords = function(params, callback) {
  params = params || {};
  const requiredParams = ['customization_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { customization_id: params.customization_id };
  const parameters = {
    options: {
      url: '/v1/customizations/{customization_id}/words',
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
 * Adds one or more words to a custom voice model.
 *
 * Adds one or more words and their translations to the custom voice model with the specified `customization_id`. Adding a new translation for a word that already exists in a custom model overwrites the word's existing translation. A custom model can contain no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to add words to it.   **Note:** This method is currently a beta release.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.customization_id - GUID of the custom voice model to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model.
 * @param {Word[]} params.words - List of words and their translations. The words are listed in alphabetical order, with uppercase letters listed before lowercase letters. The array is empty if the custom model contains no words.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.postCustomizationByIDWords = function(params, callback) {
  params = params || {};
  const requiredParams = ['customization_id', 'words'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { words: params.words };
  const path = { customization_id: params.customization_id };
  const parameters = {
    options: {
      url: '/v1/customizations/{customization_id}/words',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Adds a word to a custom voice model.
 *
 * Adds a single word and its translation to the custom voice model with the specified `customization_id`. Adding a new translation for a word that already exists in a custom model overwrites the word's existing translation. A custom model can contain no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to add a word to it.   **Note:** This method is currently a beta release.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.customization_id - GUID of the custom voice model to which to which to add a word. You must make the request with service credentials created for the instance of the service that owns the custom model.
 * @param {string} params.word - The word to be added to the custom voice model.
 * @param {string} params.translation - Phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. A sounds-like is one or more words that, when combined, sound like the word.
 * @param {string} [params.part_of_speech] - **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-using.html#jaNotes).
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.putCustomizationByIDWord = function(params, callback) {
  params = params || {};
  const requiredParams = ['customization_id', 'word', 'translation'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { translation: params.translation, part_of_speech: params.part_of_speech };
  const path = { customization_id: params.customization_id, word: params.word };
  const parameters = {
    options: {
      url: '/v1/customizations/{customization_id}/words/{word}',
      method: 'PUT',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Gets the pronunciation for a word.
 *
 * Returns the phonetic pronunciation for the word specified by the `text` parameter. You can request the pronunciation for a specific format. You can also request the pronunciation for a specific voice to see the default translation for the language of that voice or for a specific custom voice model to see the translation for that voice model.   **Note:** This method is currently a beta release.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.text - The word for which the pronunciation is requested.
 * @param {string} [params.voice] - Specify a voice to obtain the pronunciation for the specified word in the language of that voice. All voices for the same language (for example, `en-US`) return the same translation. Do not specify both a `voice` and a `customization_id`. Retrieve available voices with the `GET /v1/voices` method.
 * @param {string} [params.format] - Specify the phoneme set in which to return the pronunciation. Omit the parameter to obtain the pronunciation in the default format.
 * @param {string} [params.customization_id] - GUID of a custom voice model for which the pronunciation is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model. If the word is not defined in the specified voice model, the service returns the default translation for the model's language. Omit the parameter to see the translation for the specified voice with no customization. Do not specify both a `voice` and a `customization_id`.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.pronunciation = function(params, callback) {
  params = params || {};
  const requiredParams = ['text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { text: params.text, voice: params.voice, format: params.format, customization_id: params.customization_id };
  const parameters = {
    options: {
      url: '/v1/pronunciation',
      method: 'GET',
      qs: query,
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
 * Streaming speech synthesis of the text in a query parameter.
 *
 * Synthesizes text to spoken audio, returning the synthesized audio stream as an array of bytes. Identical to the `POST` method but passes shorter text in a query parameter. The text size is limited by the maximum length of the HTTP request line and headers (about 6 KB) or by system limits, whichever is less.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} [params.accept] - Requested audio format (MIME type) of the audio. You can use this header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.).
 * @param {string} [params.accept2] - Requested audio format (MIME type) of the audio. You can use this query parameter or the `Accept` header to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.).
 * @param {string} [params.voice] - Selects a voice to use for synthesis. Retrieve available voices with the `GET /v1/voices` method.
 * @param {string} [params.customization_id] - GUID of a custom voice model to be used for the synthesis. If a custom voice model is specified, it is guaranteed to work only if it matches the language of the indicated voice. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to use the specified voice with no customization.
 * @param {string} params.text - Text to synthesize. Use either plain text or a subset of SSML. Text size is limited to 5 KB.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.getSynthesize = function(params, callback) {
  params = params || {};
  const requiredParams = ['text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { accept: params.accept2, voice: params.voice, customization_id: params.customization_id, text: params.text };
  const parameters = {
    options: {
      url: '/v1/synthesize',
      method: 'GET',
      qs: query,
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'audio/basic',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Streaming speech synthesis of the text in the body parameter.
 *
 * Synthesizes text to spoken audio, returning the synthesized audio stream as an array of bytes. Identical to the `GET` method but passes longer text in the body of the request, not with the URL. Text size is limited to 5 KB.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} [params.accept] - Requested audio format (MIME type) of the audio. You can use this header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.).
 * @param {string} [params.accept2] - Requested audio format (MIME type) of the audio. You can use this query parameter or the `Accept` header to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.).
 * @param {string} [params.voice] - Selects a voice to use for synthesis. Retrieve available voices with the `GET /v1/voices` method.
 * @param {string} [params.customization_id] - GUID of a custom voice model to be used for the synthesis. If a custom voice model is specified, it is guaranteed to work only if it matches the language of the indicated voice. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to use the specified voice with no customization.
 * @param {string} params.text - Text to synthesize.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.postSynthesize = function(params, callback) {
  params = params || {};
  const requiredParams = ['text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { text: params.text };
  const query = { accept: params.accept2, voice: params.voice, customization_id: params.customization_id };
  const parameters = {
    options: {
      url: '/v1/synthesize',
      method: 'POST',
      json: true,
      body: body,
      qs: query,
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'audio/basic',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieves all voices available for speech synthesis.
 *
 * Lists information about all available voices. To see information about a specific voice, use the `/v1/voices/{voice}` method.
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.voices = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    options: {
      url: '/v1/voices',
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
 * Retrieves a specific voice available for speech synthesis.
 *
 * Lists information about the voice specified with the `voice` path parameter. Specify the `customization_id` query parameter to obtain information for that custom voice model of the specified voice. Use the `/v1/voices` method to see a list of all available voices.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.voice - The voice for which information is to be returned. Retrieve available voices with the `GET /v1/voices` method.
 * @param {string} [params.customization_id] - GUID of the custom voice model for which information is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to see information about the specified voice with no customization.
 * @param {Function} [callback] - The callback that handles the response.
 */
TextToSpeechV1.prototype.voicesByID = function(params, callback) {
  params = params || {};
  const requiredParams = ['voice'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { customization_id: params.customization_id };
  const path = { voice: params.voice };
  const parameters = {
    options: {
      url: '/v1/voices/{voice}',
      method: 'GET',
      qs: query,
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

module.exports = TextToSpeechV1;