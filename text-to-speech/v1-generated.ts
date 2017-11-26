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

import * as extend from 'extend';
import { RequestResponse } from 'request';
import { createRequest } from '../lib/requestwrapper';
import { getMissingParams } from '../lib/helper';
import { BaseService } from '../lib/base_service';

/**
 * ### Service Overview The IBM Text to Speech service provides a Representational State Transfer (REST) Application Programming Interface (API) that uses IBM's speech-synthesis capabilities to synthesize text into natural-sounding speech in a variety of languages, dialects, and voices. The service currently synthesizes text from US English, UK English, French, German, Italian, Japanese, Spanish, or Brazilian Portuguese into audio spoken in a male or female voice (the service supports only a single gender for some languages). The audio is streamed back to the client with minimal delay. ### API Overview The Text to Speech service consists of the following related endpoints: * `/v1/synthesize` synthesizes written text to audio speech. * `/v1/voices` provides information about the voices available for synthesized speech. * `/v1/pronunciation` returns the pronunciation for a specified word. * `/v1/customizations` and `/v1/customizations/{customization_id}` lets users create custom voice models, which are dictionaries of words and their translations for use in speech synthesis. * `/v1/customizations/{customization_id}/words` and `/v1/customizations/{customization_id}/words/{word}` lets users manage the words in a custom voice model.   **Note:** The `/v1/pronunciation` and `/v1/customizations` interfaces are currently beta functionality. ### API Usage The following information provides details about using the service to synthesize audio: * **Audio formats:** The service supports a number of audio formats (MIME types). For more information about audio formats and sampling rates, including links to a number of Internet sites that provide technical and usage details about the different formats, see [Specifying an audio format](https://console.bluemix.net/docs/services/text-to-speech/http.html#format). * **SSML:** Many methods refer to the Speech Synthesis Markup Language (SSML), an XML-based markup language that provides annotations of text for speech-synthesis applications; for example, many methods accept or produce translations that use an SSML-based phoneme format. See [Using SSML](https://console.bluemix.net/docs/services/text-to-speech/SSML.html) and [Using IBM SPR](https://console.bluemix.net/docs/services/text-to-speech/SPRs.html). * **Word translations:** Many customization methods accept or return sounds-like or phonetic translations for words. A phonetic translation is based on the SSML format for representing the phonetic string of a word. Phonetic translations can use standard International Phonetic Alphabet (IPA) representation:   &lt;phoneme alphabet=\"ipa\" ph=\"t&#601;m&#712;&#593;to\"&gt;&lt;/phoneme&gt;   or the proprietary IBM Symbolic Phonetic Representation (SPR):   &lt;phoneme alphabet=\"ibm\" ph=\"1gAstroEntxrYFXs\"&gt;&lt;/phoneme&gt;   For more information about customization and about sounds-like and phonetic translations, see [Understanding customization](https://console.bluemix.net/docs/services/text-to-speech/custom-intro.html). * **GUIDs:** The pronunciation and customization methods accept or return a Globally Unique Identifier (GUID). For example, customization IDs (specified with the `customization_id` parameter) and service credentials are GUIDs. GUIDs are hexadecimal strings that have the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. * **WebSocket interface:** The service also offers a WebSocket interface as an alternative to its HTTP REST interface for speech synthesis. The WebSocket interface supports both plain text and SSML input, including the SSML &lt;mark&gt; element and word timings. See [The WebSocket interface](https://console.bluemix.net/docs/services/text-to-speech/websockets.html). * **Authentication:** You authenticate to the service by using your service credentials. You can use your credentials to authenticate via a proxy server that resides in IBM Cloud, or you can use your credentials to obtain a token and contact the service directly. See [Service credentials for Watson services](https://console.bluemix.net/docs/services/watson/getting-started-credentials.html) and [Tokens for authentication](https://console.bluemix.net/docs/services/watson/getting-started-tokens.html). * **Custom voice model ownership:** In all cases, you must use service credentials created for the instance of the service that owns a custom voice model to use the methods described in this documentation with that model. For more information, see [Ownership of custom voice models](https://console.bluemix.net/docs/services/text-to-speech/custom-models.html#customOwner). * **Request Logging:** By default, all Watson services log requests and their results. Data is collected only to improve the Watson services. If you do not want to share your data, set the header parameter `X-Watson-Learning-Opt-Out` to `true` for each request. Data is collected for any request that omits this header. See [Controlling request logging for Watson services](https://console.bluemix.net/docs/services/watson/getting-started-logging.html).   The service does not log data (words and translations) that are used to build custom language models; your training data is never used to improve the service's base models. The service does log data when a custom model is used with a synthesize request; you must set the `X-Watson-Learning-Opt-Out` request header to prevent logging for recognition requests. For more information, see [Request logging and data privacy](https://console.bluemix.net/docs/services/text-to-speech/custom-models.html#customLogging).  For more information about the service and its various interfaces, see [About Text to Speech](https://console.bluemix.net/docs/services/text-to-speech/index.html).
 */

class GeneratedTextToSpeechV1 extends BaseService {
  name: string; // set by prototype to ''
  version: string; // set by prototype to 'v1'

  static URL: string = 'https://gateway.watsonplatform.net/text-to-speech/api';

  /**
   * Construct a GeneratedTextToSpeechV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/text-to-speech/api'). The base url may differ between Bluemix regions.
   * @param {String} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {String} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {GeneratedTextToSpeechV1}
   */
  constructor(options: GeneratedTextToSpeechV1.Options) {
    super(options);
  }

  /*************************
   * customModels
   ************************/

  /**
   * Creates a new custom voice model.
   *
   * Creates a new empty custom voice model. The model is owned by the instance of the service whose credentials are used to create it.   **Note:** This method is currently a beta release.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - When you create a new custom voice model, you must specify the name of the new custom model. When you update an existing custom model, specify a name only if you want to change the model's name.
   * @param {string} [params.language] - When you create a new custom voice model, the language of the new custom model; omit the parameter to use the the default language, `en-US`. **Note:** When you update an existing custom model, you cannot specify a language; you cannot change the language of an existing model.
   * @param {string} [params.description] - A description of the custom voice model. When you create a new custom voice model, specifying a description is recommended. When you update an existing custom model, specify a description only if you want to change the model's description.
   * @param {Word[]} [params.words] - When you update an existing custom voice model, an array of words and their translations to be added to or updated in the custom voice model; pass an empty array to make no additions or updates. **Note:** When you create a new custom model, you cannot specify words for the new model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createCustomization(
    params?: GeneratedTextToSpeechV1.CreateCustomizationParams,
    callback?: GeneratedTextToSpeechV1.Callback<
      GeneratedTextToSpeechV1.Customization
    >
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const body = {
      name: _params.name,
      language: _params.language,
      description: _params.description,
      words: _params.words
    };
    const parameters = {
      options: {
        url: '/v1/customizations',
        method: 'POST',
        json: true,
        body: body
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Deletes a custom voice model.
   *
   * Deletes the custom voice model with the specified `customization_id`. You must use credentials for the instance of the service that owns a model to delete it.   **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - GUID of the custom voice model to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteCustomization(
    params: GeneratedTextToSpeechV1.DeleteCustomizationParams,
    callback?: GeneratedTextToSpeechV1.Callback<GeneratedTextToSpeechV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {}
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Queries the contents of a custom voice model.
   *
   * Lists all information about the custom voice model with the specified `customization_id`. In addition to metadata such as the name and description of the voice model, the output includes the words in the model and their translations as defined in the model. To see just the metadata for a voice model, use the `GET /v1/customizations` method. You must use credentials for the instance of the service that owns a model to list information about it.   **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - GUID of the custom voice model to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getCustomization(
    params: GeneratedTextToSpeechV1.GetCustomizationParams,
    callback?: GeneratedTextToSpeechV1.Callback<
      GeneratedTextToSpeechV1.Customization
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, extend(true, {}, this._options), {
        headers: {
          accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists all available custom voice models for a language or for all languages.
   *
   * Lists metadata such as the name and description for the custom voice models that you own. Use the `language` query parameter to list the voice models that you own for the specified language only. Omit the parameter to see all voice models that you own for all languages. To see the words in addition to the metadata for a specific voice model, use the `GET /v1/customizations/{customization_id}` method. You must use credentials for the instance of the service that owns a model to list information about it.   **Note:** This method is currently a beta release.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.language] - The language for the custom voice models owned by the requesting service credentials that are to be returned. Omit the parameter to see all custom voice models owned by the requester.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listCustomizations(
    params?: GeneratedTextToSpeechV1.ListCustomizationsParams,
    callback?: GeneratedTextToSpeechV1.Callback<
      GeneratedTextToSpeechV1.Customizations
    >
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const query = {
      language: _params.language
    };
    const parameters = {
      options: {
        url: '/v1/customizations',
        method: 'GET',
        qs: query
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Updates information and words for a custom voice model.
   *
   * Updates information for the custom voice model with the specified `customization_id`. You can update the metadata such as the name and description of the voice model. You can also update the words in the model and their translations. Adding a new translation for a word that already exists in a custom model overwrites the word's existing translation. A custom model can contain no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to update it.   **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - GUID of the custom voice model to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} [params.name] - When you create a new custom voice model, you must specify the name of the new custom model. When you update an existing custom model, specify a name only if you want to change the model's name.
   * @param {string} [params.language] - When you create a new custom voice model, the language of the new custom model; omit the parameter to use the the default language, `en-US`. **Note:** When you update an existing custom model, you cannot specify a language; you cannot change the language of an existing model.
   * @param {string} [params.description] - A description of the custom voice model. When you create a new custom voice model, specifying a description is recommended. When you update an existing custom model, specify a description only if you want to change the model's description.
   * @param {Word[]} [params.words] - When you update an existing custom voice model, an array of words and their translations to be added to or updated in the custom voice model; pass an empty array to make no additions or updates. **Note:** When you create a new custom model, you cannot specify words for the new model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateCustomization(
    params: GeneratedTextToSpeechV1.UpdateCustomizationParams,
    callback?: GeneratedTextToSpeechV1.Callback<GeneratedTextToSpeechV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      name: _params.name,
      language: _params.language,
      description: _params.description,
      words: _params.words
    };
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * customWords
   ************************/

  /**
   * Adds a word to a custom voice model.
   *
   * Adds a single word and its translation to the custom voice model with the specified `customization_id`. Adding a new translation for a word that already exists in a custom model overwrites the word's existing translation. A custom model can contain no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to add a word to it.   **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - GUID of the custom voice model to which to which to add a word. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.word - The word to be added to the custom voice model.
   * @param {string} params.translation - Phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. A sounds-like is one or more words that, when combined, sound like the word.
   * @param {string} [params.part_of_speech] - **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes).
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  addWord(
    params: GeneratedTextToSpeechV1.AddWordParams,
    callback?: GeneratedTextToSpeechV1.Callback<GeneratedTextToSpeechV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'word', 'translation'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      translation: _params.translation,
      part_of_speech: _params.part_of_speech
    };
    const path = {
      customization_id: _params.customization_id,
      word: _params.word
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word}',
        method: 'PUT',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Adds one or more words to a custom voice model.
   *
   * Adds one or more words and their translations to the custom voice model with the specified `customization_id`. Adding a new translation for a word that already exists in a custom model overwrites the word's existing translation. A custom model can contain no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to add words to it.   **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - GUID of the custom voice model to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Word[]} params.words - When you add words to a custom voice model, you provide the required information for each word. When you list the words from a custom model, the service returns information about all words from the model in alphabetical order, with uppercase letters listed before lowercase letters; the array is empty if the custom model contains no words.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  addWords(
    params: GeneratedTextToSpeechV1.AddWordsParams,
    callback?: GeneratedTextToSpeechV1.Callback<GeneratedTextToSpeechV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'words'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      words: _params.words
    };
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Deletes a word from a custom voice model.
   *
   * Deletes a single word from the custom voice model with the specified `customization_id`. You must use credentials for the instance of the service that owns a model to delete it.   **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - GUID of the custom voice model from which to delete a word. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.word - The word to be deleted from the custom voice model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteWord(
    params: GeneratedTextToSpeechV1.DeleteWordParams,
    callback?: GeneratedTextToSpeechV1.Callback<GeneratedTextToSpeechV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'word'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id,
      word: _params.word
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {}
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Queries details about a word in a custom voice model.
   *
   * Returns the translation for a single word from the custom model with the specified `customization_id`. The output shows the translation as it is defined in the model. You must use credentials for the instance of the service that owns a model to query information about its words.   **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - GUID of the custom voice model in which to query a word. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.word - The word to be queried from the custom voice model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getWord(
    params: GeneratedTextToSpeechV1.GetWordParams,
    callback?: GeneratedTextToSpeechV1.Callback<
      GeneratedTextToSpeechV1.Translation
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'word'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id,
      word: _params.word
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Queries details about the words in a custom voice model.
   *
   * Lists all of the words and their translations for the custom voice model with the specified `customization_id`. The output shows the translations as they are defined in the model. You must use credentials for the instance of the service that owns a model to query information about its words.   **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - GUID of the custom voice model to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listWords(
    params: GeneratedTextToSpeechV1.ListWordsParams,
    callback?: GeneratedTextToSpeechV1.Callback<GeneratedTextToSpeechV1.Words>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * pronunciation
   ************************/

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
   * @returns {ReadableStream|void}
   */
  pronunciation(
    params: GeneratedTextToSpeechV1.PronunciationParams,
    callback?: GeneratedTextToSpeechV1.Callback<
      GeneratedTextToSpeechV1.Pronunciation
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      text: _params.text,
      voice: _params.voice,
      format: _params.format,
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/pronunciation',
        method: 'GET',
        qs: query,
        json: true
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * synthesize
   ************************/

  /**
   * Streaming speech synthesis of the text in the body parameter.
   *
   * Synthesizes text to spoken audio, returning the synthesized audio stream as an array of bytes. Identical to the `GET` method but passes longer text in the body of the request, not with the URL. Text size is limited to 5 KB.   If a request includes invalid query parameters, the service returns a `Warnings` response header that provides messages about the invalid parameters. The warning includes a descriptive message and a list of invalid argument strings. For example, a message such as `\"Unknown arguments:\"` or `\"Unknown url query arguments:\"` followed by a list of the form `\"invalid_arg_1, invalid_arg_2.\"` The request succeeds despite the warnings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} [params.accept2] - Requested audio format (MIME type) of the audio. You can use this header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.).
   * @param {string} [params.accept] - Requested audio format (MIME type) of the audio. You can use this query parameter or the `Accept` header to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.).
   * @param {string} [params.voice] - Selects a voice to use for synthesis. Retrieve available voices with the `GET /v1/voices` method.
   * @param {string} [params.customization_id] - GUID of a custom voice model to be used for the synthesis. If a custom voice model is specified, it is guaranteed to work only if it matches the language of the indicated voice. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to use the specified voice with no customization.
   * @param {string} params.text - Text to synthesize.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  synthesize(
    params: GeneratedTextToSpeechV1.SynthesizeParams,
    callback?: GeneratedTextToSpeechV1.Callback<ReadableStream>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      text: _params.text
    };
    const query = {
      accept: _params.accept,
      voice: _params.voice,
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/synthesize',
        method: 'POST',
        json: true,
        body: body,
        qs: query,
        encoding: null
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          accept: _params.accept2 || 'audio/basic',
          'content-type': 'application/json',
          'X-Watson-Learning-Opt-Out': _params['X-Watson-Learning-Opt-Out'] || 0
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * voices
   ************************/

  /**
   * Retrieves a specific voice available for speech synthesis.
   *
   * Lists information about the voice specified with the `voice` path parameter. Specify the `customization_id` query parameter to obtain information for that custom voice model of the specified voice. Use the `GET /v1/voices` method to see a list of all available voices.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.voice - The voice for which information is to be returned. Retrieve available voices with the `GET /v1/voices` method.
   * @param {string} [params.customization_id] - GUID of the custom voice model for which information is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to see information about the specified voice with no customization.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getVoice(
    params: GeneratedTextToSpeechV1.GetVoiceParams,
    callback?: GeneratedTextToSpeechV1.Callback<GeneratedTextToSpeechV1.Voice>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['voice'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      customization_id: _params.customization_id
    };
    const path = {
      voice: _params.voice
    };
    const parameters = {
      options: {
        url: '/v1/voices/{voice}',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Retrieves all voices available for speech synthesis.
   *
   * Lists information about all available voices. To see information about a specific voice, use the `GET /v1/voices/{voice}` method.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listVoices(
    params?: GeneratedTextToSpeechV1.ListVoicesParams,
    callback?: GeneratedTextToSpeechV1.Callback<GeneratedTextToSpeechV1.Voices>
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const parameters = {
      options: {
        url: '/v1/voices',
        method: 'GET'
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }
}

GeneratedTextToSpeechV1.prototype.name = 'text_to_speech';
GeneratedTextToSpeechV1.prototype.version = 'v1';

/*************************
 * interfaces
 ************************/

namespace GeneratedTextToSpeechV1 {
  /** Options for the `GeneratedTextToSpeechV1` constructor. **/
  export type Options = {
    url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  };

  /** The callback for a service request. **/
  export type Callback<T> = (
    error: any,
    body?: T,
    response?: RequestResponse
  ) => void;

  /** The body of a service request that returns no response data. **/
  export interface Empty {}

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `createCustomization` operation. **/
  export interface CreateCustomizationParams {
    /** When you create a new custom voice model, you must specify the name of the new custom model. When you update an existing custom model, specify a name only if you want to change the model's name. **/
    name?: string;
    /** When you create a new custom voice model, the language of the new custom model; omit the parameter to use the the default language, `en-US`. **Note:** When you update an existing custom model, you cannot specify a language; you cannot change the language of an existing model. **/
    language?: CreateCustomizationConstants.Language | string;
    /** A description of the custom voice model. When you create a new custom voice model, specifying a description is recommended. When you update an existing custom model, specify a description only if you want to change the model's description. **/
    description?: string;
    /** When you update an existing custom voice model, an array of words and their translations to be added to or updated in the custom voice model; pass an empty array to make no additions or updates. **Note:** When you create a new custom model, you cannot specify words for the new model. **/
    words?: Word[];
  }

  /** Constants for the `createCustomization` operation. **/
  export namespace CreateCustomizationConstants {
    /** When you create a new custom voice model, the language of the new custom model; omit the parameter to use the the default language, `en-US`. **Note:** When you update an existing custom model, you cannot specify a language; you cannot change the language of an existing model. **/
    export enum Language {
      DE_DE = 'de-DE',
      EN_US = 'en-US',
      EN_GB = 'en-GB',
      ES_ES = 'es-ES',
      ES_LA = 'es-LA',
      ES_US = 'es-US',
      FR_FR = 'fr-FR',
      IT_IT = 'it-IT',
      JA_JP = 'ja-JP',
      PT_BR = 'pt-BR'
    }
  }

  /** Parameters for the `deleteCustomization` operation. **/
  export interface DeleteCustomizationParams {
    /** GUID of the custom voice model to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `getCustomization` operation. **/
  export interface GetCustomizationParams {
    /** GUID of the custom voice model to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `listCustomizations` operation. **/
  export interface ListCustomizationsParams {
    /** The language for the custom voice models owned by the requesting service credentials that are to be returned. Omit the parameter to see all custom voice models owned by the requester. **/
    language?: ListCustomizationsConstants.Language | string;
  }

  /** Constants for the `listCustomizations` operation. **/
  export namespace ListCustomizationsConstants {
    /** The language for the custom voice models owned by the requesting service credentials that are to be returned. Omit the parameter to see all custom voice models owned by the requester. **/
    export enum Language {
      DE_DE = 'de-DE',
      EN_US = 'en-US',
      EN_GB = 'en-GB',
      ES_ES = 'es-ES',
      ES_LA = 'es-LA',
      ES_US = 'es-US',
      FR_FR = 'fr-FR',
      IT_IT = 'it-IT',
      JA_JP = 'ja-JP',
      PT_BR = 'pt-BR'
    }
  }

  /** Parameters for the `updateCustomization` operation. **/
  export interface UpdateCustomizationParams {
    /** GUID of the custom voice model to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** When you create a new custom voice model, you must specify the name of the new custom model. When you update an existing custom model, specify a name only if you want to change the model's name. **/
    name?: string;
    /** When you create a new custom voice model, the language of the new custom model; omit the parameter to use the the default language, `en-US`. **Note:** When you update an existing custom model, you cannot specify a language; you cannot change the language of an existing model. **/
    language?: UpdateCustomizationConstants.Language | string;
    /** A description of the custom voice model. When you create a new custom voice model, specifying a description is recommended. When you update an existing custom model, specify a description only if you want to change the model's description. **/
    description?: string;
    /** When you update an existing custom voice model, an array of words and their translations to be added to or updated in the custom voice model; pass an empty array to make no additions or updates. **Note:** When you create a new custom model, you cannot specify words for the new model. **/
    words?: Word[];
  }

  /** Constants for the `updateCustomization` operation. **/
  export namespace UpdateCustomizationConstants {
    /** When you create a new custom voice model, the language of the new custom model; omit the parameter to use the the default language, `en-US`. **Note:** When you update an existing custom model, you cannot specify a language; you cannot change the language of an existing model. **/
    export enum Language {
      DE_DE = 'de-DE',
      EN_US = 'en-US',
      EN_GB = 'en-GB',
      ES_ES = 'es-ES',
      ES_LA = 'es-LA',
      ES_US = 'es-US',
      FR_FR = 'fr-FR',
      IT_IT = 'it-IT',
      JA_JP = 'ja-JP',
      PT_BR = 'pt-BR'
    }
  }

  /** Parameters for the `addWord` operation. **/
  export interface AddWordParams {
    /** GUID of the custom voice model to which to which to add a word. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The word to be added to the custom voice model. **/
    word: string;
    /** Phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. A sounds-like is one or more words that, when combined, sound like the word. **/
    translation: string;
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). **/
    part_of_speech?: AddWordConstants.PartOfSpeech | string;
  }

  /** Constants for the `addWord` operation. **/
  export namespace AddWordConstants {
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). **/
    export enum PartOfSpeech {
      JOSI = 'Josi',
      MESI = 'Mesi',
      KIGO = 'Kigo',
      GOBI = 'Gobi',
      DOSI = 'Dosi',
      JODO = 'Jodo',
      KOYU = 'Koyu',
      STBI = 'Stbi',
      SUJI = 'Suji',
      KEDO = 'Kedo',
      FUKU = 'Fuku',
      KEYO = 'Keyo',
      STTO = 'Stto',
      RETA = 'Reta',
      STZO = 'Stzo',
      KATO = 'Kato',
      HOKA = 'Hoka'
    }
  }

  /** Parameters for the `addWords` operation. **/
  export interface AddWordsParams {
    /** GUID of the custom voice model to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** When you add words to a custom voice model, you provide the required information for each word. When you list the words from a custom model, the service returns information about all words from the model in alphabetical order, with uppercase letters listed before lowercase letters; the array is empty if the custom model contains no words. **/
    words: Word[];
  }

  /** Parameters for the `deleteWord` operation. **/
  export interface DeleteWordParams {
    /** GUID of the custom voice model from which to delete a word. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The word to be deleted from the custom voice model. **/
    word: string;
  }

  /** Parameters for the `getWord` operation. **/
  export interface GetWordParams {
    /** GUID of the custom voice model in which to query a word. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The word to be queried from the custom voice model. **/
    word: string;
  }

  /** Parameters for the `listWords` operation. **/
  export interface ListWordsParams {
    /** GUID of the custom voice model to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `pronunciation` operation. **/
  export interface PronunciationParams {
    /** The word for which the pronunciation is requested. **/
    text: string;
    /** Specify a voice to obtain the pronunciation for the specified word in the language of that voice. All voices for the same language (for example, `en-US`) return the same translation. Do not specify both a `voice` and a `customization_id`. Retrieve available voices with the `GET /v1/voices` method. **/
    voice?: PronunciationConstants.Voice | string;
    /** Specify the phoneme set in which to return the pronunciation. Omit the parameter to obtain the pronunciation in the default format. **/
    format?: PronunciationConstants.Format | string;
    /** GUID of a custom voice model for which the pronunciation is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model. If the word is not defined in the specified voice model, the service returns the default translation for the model's language. Omit the parameter to see the translation for the specified voice with no customization. Do not specify both a `voice` and a `customization_id`. **/
    customization_id?: string;
  }

  /** Constants for the `pronunciation` operation. **/
  export namespace PronunciationConstants {
    /** Specify a voice to obtain the pronunciation for the specified word in the language of that voice. All voices for the same language (for example, `en-US`) return the same translation. Do not specify both a `voice` and a `customization_id`. Retrieve available voices with the `GET /v1/voices` method. **/
    export enum Voice {
      EN_US_ALLISONVOICE = 'en-US_AllisonVoice',
      EN_US_LISAVOICE = 'en-US_LisaVoice',
      EN_US_MICHAELVOICE = 'en-US_MichaelVoice',
      EN_GB_KATEVOICE = 'en-GB_KateVoice',
      ES_ES_ENRIQUEVOICE = 'es-ES_EnriqueVoice',
      ES_ES_LAURAVOICE = 'es-ES_LauraVoice',
      ES_LA_SOFIAVOICE = 'es-LA_SofiaVoice',
      ES_US_SOFIAVOICE = 'es-US_SofiaVoice',
      DE_DE_DIETERVOICE = 'de-DE_DieterVoice',
      DE_DE_BIRGITVOICE = 'de-DE_BirgitVoice',
      FR_FR_RENEEVOICE = 'fr-FR_ReneeVoice',
      IT_IT_FRANCESCAVOICE = 'it-IT_FrancescaVoice',
      JA_JP_EMIVOICE = 'ja-JP_EmiVoice',
      PT_BR_ISABELAVOICE = 'pt-BR_IsabelaVoice'
    }
    /** Specify the phoneme set in which to return the pronunciation. Omit the parameter to obtain the pronunciation in the default format. **/
    export enum Format {
      IPA = 'ipa',
      IBM = 'ibm'
    }
  }

  /** Parameters for the `synthesize` operation. **/
  export interface SynthesizeParams {
    /** Requested audio format (MIME type) of the audio. You can use this header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.). **/
    accept2?: SynthesizeConstants.Accept | string;
    /** Requested audio format (MIME type) of the audio. You can use this query parameter or the `Accept` header to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.). **/
    accept?: SynthesizeConstants.Accept | string;
    /** Selects a voice to use for synthesis. Retrieve available voices with the `GET /v1/voices` method. **/
    voice?: SynthesizeConstants.Voice | string;
    /** GUID of a custom voice model to be used for the synthesis. If a custom voice model is specified, it is guaranteed to work only if it matches the language of the indicated voice. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to use the specified voice with no customization. **/
    customization_id?: string;
    /** Text to synthesize. **/
    text: string;
  }

  /** Constants for the `synthesize` operation. **/
  export namespace SynthesizeConstants {
    /** Requested audio format (MIME type) of the audio. You can use this header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.). **/
    export enum Accept {
      BASIC = 'audio/basic',
      FLAC = 'audio/flac',
      L16_RATE_NNNN = 'audio/l16;rate=nnnn',
      OGG = 'audio/ogg',
      OGG_CODECS_OPUS = 'audio/ogg;codecs=opus',
      OGG_CODECS_VORBIS = 'audio/ogg;codecs=vorbis',
      MP3 = 'audio/mp3',
      MPEG = 'audio/mpeg',
      MULAW_RATE_NNNN = 'audio/mulaw;rate=nnnn',
      WAV = 'audio/wav',
      WEBM = 'audio/webm',
      WEBM_CODECS_OPUS = 'audio/webm:codecs=opus',
      WEBM_CODECS_VORBIS = 'audio/webm:codecs=vorbis'
    }

    /** Selects a voice to use for synthesis. Retrieve available voices with the `GET /v1/voices` method. **/
    export enum Voice {
      EN_US_ALLISONVOICE = 'en-US_AllisonVoice',
      EN_US_LISAVOICE = 'en-US_LisaVoice',
      EN_US_MICHAELVOICE = 'en-US_MichaelVoice',
      EN_GB_KATEVOICE = 'en-GB_KateVoice',
      ES_ES_ENRIQUEVOICE = 'es-ES_EnriqueVoice',
      ES_ES_LAURAVOICE = 'es-ES_LauraVoice',
      ES_LA_SOFIAVOICE = 'es-LA_SofiaVoice',
      ES_US_SOFIAVOICE = 'es-US_SofiaVoice',
      DE_DE_DIETERVOICE = 'de-DE_DieterVoice',
      DE_DE_BIRGITVOICE = 'de-DE_BirgitVoice',
      FR_FR_RENEEVOICE = 'fr-FR_ReneeVoice',
      IT_IT_FRANCESCAVOICE = 'it-IT_FrancescaVoice',
      JA_JP_EMIVOICE = 'ja-JP_EmiVoice',
      PT_BR_ISABELAVOICE = 'pt-BR_IsabelaVoice'
    }
  }

  /** Parameters for the `getVoice` operation. **/
  export interface GetVoiceParams {
    /** The voice for which information is to be returned. Retrieve available voices with the `GET /v1/voices` method. **/
    voice: GetVoiceConstants.Voice | string;
    /** GUID of the custom voice model for which information is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to see information about the specified voice with no customization. **/
    customization_id?: string;
  }

  /** Constants for the `getVoice` operation. **/
  export namespace GetVoiceConstants {
    /** The voice for which information is to be returned. Retrieve available voices with the `GET /v1/voices` method. **/
    export enum Voice {
      EN_US_ALLISONVOICE = 'en-US_AllisonVoice',
      EN_US_LISAVOICE = 'en-US_LisaVoice',
      EN_US_MICHAELVOICE = 'en-US_MichaelVoice',
      EN_GB_KATEVOICE = 'en-GB_KateVoice',
      ES_ES_ENRIQUEVOICE = 'es-ES_EnriqueVoice',
      ES_ES_LAURAVOICE = 'es-ES_LauraVoice',
      ES_LA_SOFIAVOICE = 'es-LA_SofiaVoice',
      ES_US_SOFIAVOICE = 'es-US_SofiaVoice',
      DE_DE_DIETERVOICE = 'de-DE_DieterVoice',
      DE_DE_BIRGITVOICE = 'de-DE_BirgitVoice',
      FR_FR_RENEEVOICE = 'fr-FR_ReneeVoice',
      IT_IT_FRANCESCAVOICE = 'it-IT_FrancescaVoice',
      JA_JP_EMIVOICE = 'ja-JP_EmiVoice',
      PT_BR_ISABELAVOICE = 'pt-BR_IsabelaVoice'
    }
  }

  /** Parameters for the `listVoices` operation. **/
  export interface ListVoicesParams {}

  /*************************
   * model interfaces
   ************************/

  /** Customization. **/
  export interface Customization {
    /** GUID of the custom voice model. **Note:** When you create a new custom voice model, the service returns only the GUID of the new custom model; it does not return the other fields of this object. **/
    customization_id: string;
    /** Name of the custom voice model. **/
    name?: string;
    /** Language of the custom voice model. **/
    language?: string;
    /** GUID of the service credentials for the instance of the service that owns the custom voice model. **/
    owner?: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom voice model was created. The value is provided in full ISO 8601 format (1YYYY-MM-DDThh:mm:ss.sTZD`). **/
    created?: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom voice model was last modified. Equals `created` when a new voice model is first added but has yet to be changed. The value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`). **/
    last_modified?: string;
    /** Description of the custom voice model. **/
    description?: string;
    /** An array of words and their translations from the custom voice model. The words are listed in alphabetical order, with uppercase letters listed before lowercase letters. The array is empty if the custom model contains no words. **Note:** This field is returned only when you list information about a specific custom voice model. **/
    words?: Word[];
  }

  /** Customizations. **/
  export interface Customizations {
    /** Array of all custom voice models owned by the requesting service credentials. The array is empty if the requester owns no custom models. **/
    customizations: Customization[];
  }

  /** Pronunciation. **/
  export interface Pronunciation {
    /** Pronunciation of the requested text in the specified voice and format. **/
    pronunciation: string;
  }

  /** SupportedFeatures. **/
  export interface SupportedFeatures {
    /** If `true`, the voice can be customized; if `false`, the voice cannot be customized. (Same as `customizable`.). **/
    custom_pronunciation: boolean;
    /** If `true`, the voice can be transformed by using the SSML &lt;voice-transformation&gt; element; if `false`, the voice cannot be transformed. **/
    voice_transformation: boolean;
  }

  /** Translation. **/
  export interface Translation {
    /** Phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. A sounds-like is one or more words that, when combined, sound like the word. **/
    translation: string;
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). **/
    part_of_speech?: string;
  }

  /** Voice. **/
  export interface Voice {
    /** URI of the voice. **/
    url: string;
    /** Gender of the voice: 'male' or 'female'. **/
    gender: string;
    /** Name of the voice. Use this as the voice identifier in all requests. **/
    name: string;
    /** Language and region of the voice (for example, 'en-US'). **/
    language: string;
    /** Textual description of the voice. **/
    description: string;
    /** If `true`, the voice can be customized; if `false`, the voice cannot be customized. (Same as `custom_pronunciation`; maintained for backward compatibility.). **/
    customizable: boolean;
    /** Describes the additional service features supported with the voice. **/
    supported_features: SupportedFeatures;
    /** Returns information about a specified custom voice model. **Note:** This field is returned only when you list information about a specific voice and specify the GUID of a custom voice model that is based on that voice. **/
    customization?: Customization;
  }

  /** Description of the available voices. **/
  export interface Voices {
    /** List of voices. **/
    voices: Voice[];
  }

  /** Word. **/
  export interface Word {
    /** Word from the custom voice model. **/
    word: string;
    /** Phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word. **/
    translation: string;
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). **/
    part_of_speech?: string;
  }

  /** Words. **/
  export interface Words {
    /** When you add words to a custom voice model, you provide the required information for each word. When you list the words from a custom model, the service returns information about all words from the model in alphabetical order, with uppercase letters listed before lowercase letters; the array is empty if the custom model contains no words. **/
    words: Word[];
  }
}

export = GeneratedTextToSpeechV1;
