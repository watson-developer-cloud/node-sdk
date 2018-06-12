/**
 * Copyright 2018 IBM All Rights Reserved.
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
import { BaseService } from '../lib/base_service';
import { getMissingParams } from '../lib/helper';
import { FileObject } from '../lib/helper';

/**
 * ### Service Overview The IBM&reg; Text to Speech service provides an API that uses IBM's speech-synthesis capabilities to synthesize text into natural-sounding speech in a variety of languages, dialects, and voices. The service supports at least one male or female voice, sometimes both, for each language. The audio is streamed back to the client with minimal delay. For more information about the service, see the [IBM&reg; Cloud documentation](https://console.bluemix.net/docs/services/text-to-speech/index.html).  ### API usage guidelines * **Audio formats:** The service can produce audio in many formats (MIME types). See [Specifying an audio format](https://console.bluemix.net/docs/services/text-to-speech/http.html#format). * **SSML:** Many methods refer to the Speech Synthesis Markup Language (SSML). SSML is an XML-based markup language that provides text annotation for speech-synthesis applications. See [Using SSML](https://console.bluemix.net/docs/services/text-to-speech/SSML.html) and [Using IBM SPR](https://console.bluemix.net/docs/services/text-to-speech/SPRs.html). * **Word translations:** Many customization methods accept sounds-like or phonetic translations for words. Phonetic translations are based on the SSML phoneme format for representing a word. You can specify them in standard International Phonetic Alphabet (IPA) representation    &lt;phoneme alphabet=\"ipa\" ph=\"t&#601;m&#712;&#593;to\"&gt;&lt;/phoneme&gt;    or in the proprietary IBM Symbolic Phonetic Representation (SPR)    &lt;phoneme alphabet=\"ibm\" ph=\"1gAstroEntxrYFXs\"&gt;&lt;/phoneme&gt;    See [Understanding customization](https://console.bluemix.net/docs/services/text-to-speech/custom-intro.html). * **WebSocket interface:** The service also offers a WebSocket interface for speech synthesis. The WebSocket interface supports both plain text and SSML input, including the SSML &lt;mark&gt; element and word timings. See [The WebSocket interface](https://console.bluemix.net/docs/services/text-to-speech/websockets.html). * **Customization IDs:** Many methods accept a customization ID, which is a Globally Unique Identifier (GUID). Customization IDs are hexadecimal strings that have the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. * **`X-Watson-Learning-Opt-Out`:** By default, all Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. To prevent IBM from accessing your data for general service improvements, set the `X-Watson-Learning-Opt-Out` request header to `true` for all requests. You must set the header on each request that you do not want IBM to access for general service improvements.    Methods of the customization interface do not log words and translations that you use to build custom voice models. Your training data is never used to improve the service's base models. However, the service does log such data when a custom model is used with a synthesize request. You must set the `X-Watson-Learning-Opt-Out` request header to `true` to prevent IBM from accessing the data to improve the service. * **`X-Watson-Metadata`:** This header allows you to associate a customer ID with data that is passed with a request. If necessary, you can use the **Delete labeled data** method to delete the data for a customer ID. See [Information security](https://console.bluemix.net/docs/services/text-to-speech/information-security.html).
 */

class TextToSpeechV1 extends BaseService {

  static URL: string = 'https://stream.watsonplatform.net/text-to-speech/api';
  name: string; // set by prototype to 'text_to_speech'
  serviceVersion: string; // set by prototype to 'v1'

  /**
   * Construct a TextToSpeechV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/text-to-speech/api'). The base url may differ between Bluemix regions.
   * @param {string} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.iam_access_token] - An IAM access token fully managed by the application. Responsibility falls on the application to refresh the token, either before it expires or reactively upon receiving a 401 from the service, as any requests made with an expired token will fail.
   * @param {string} [options.iam_apikey] - An API key that can be used to request IAM tokens. If this API key is provided, the SDK will manage the token and handle the refreshing.
   * @param {string} [options.iam_url] - An optional URL for the IAM service API. Defaults to 'https://iam.bluemix.net/identity/token'.
   * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {TextToSpeechV1}
   */
  constructor(options: TextToSpeechV1.Options) {
    super(options);
  }

  /*************************
   * voices
   ************************/

  /**
   * Get a voice.
   *
   * Gets information about the specified voice. The information includes the name, language, gender, and other details
   * about the voice. Specify a customization ID to obtain information for that custom voice model of the specified
   * voice. To list information about all available voices, use the **List voices** method.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.voice - The voice for which information is to be returned.
   * @param {string} [params.customization_id] - The customization ID (GUID) of a custom voice model for which
   * information is to be returned. You must make the request with service credentials created for the instance of the
   * service that owns the custom model. Omit the parameter to see information about the specified voice with no
   * customization.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getVoice(params: TextToSpeechV1.GetVoiceParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Voice>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['voice'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'customization_id': _params.customization_id
    };
    const path = {
      'voice': _params.voice
    };
    const parameters = {
      options: {
        url: '/v1/voices/{voice}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * List voices.
   *
   * Lists all voices available for use with the service. The information includes the name, language, gender, and other
   * details about the voice. To see information about a specific voice, use the **Get a voice** method.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listVoices(params?: TextToSpeechV1.ListVoicesParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Voices>): NodeJS.ReadableStream | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : (callback) ? callback : () => {/* noop */};
    const parameters = {
      options: {
        url: '/v1/voices',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /*************************
   * synthesis
   ************************/

  /**
   * Synthesize audio.
   *
   * Synthesizes text to spoken audio, returning the synthesized audio stream as an array of bytes. You can pass a
   * maximum of 5 KB of text.  Use the `Accept` header or the `accept` query parameter to specify the requested format
   * (MIME type) of the response audio. By default, the service uses `audio/ogg;codecs=opus`. For detailed information
   * about the supported audio formats and sampling rates, see [Specifying an audio
   * format](https://console.bluemix.net/docs/services/text-to-speech/http.html#format).
   *
   * If a request includes invalid query parameters, the service returns a `Warnings` response header that provides
   * messages about the invalid parameters. The warning includes a descriptive message and a list of invalid argument
   * strings. For example, a message such as `\"Unknown arguments:\"` or `\"Unknown url query arguments:\"` followed by
   * a list of the form `\"invalid_arg_1, invalid_arg_2.\"` The request succeeds despite the warnings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.text - The text to synthesize.
   * @param {string} [params.accept] - The requested audio format (MIME type) of the audio. You can use the `Accept`
   * header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally
   * specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.) For detailed
   * information about the supported audio formats and sampling rates, see [Specifying an audio
   * format](https://console.bluemix.net/docs/services/text-to-speech/http.html#format).
   * @param {string} [params.voice] - The voice to use for synthesis.
   * @param {string} [params.customization_id] - The customization ID (GUID) of a custom voice model to use for the
   * synthesis. If a custom voice model is specified, it is guaranteed to work only if it matches the language of the
   * indicated voice. You must make the request with service credentials created for the instance of the service that
   * owns the custom model. Omit the parameter to use the specified voice with no customization.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public synthesize(params: TextToSpeechV1.SynthesizeParams, callback?: TextToSpeechV1.Callback<NodeJS.ReadableStream|FileObject|Buffer>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'text': _params.text
    };
    const query = {
      'voice': _params.voice,
      'customization_id': _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/synthesize',
        method: 'POST',
        json: true,
        body,
        qs: query,
        encoding: null,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Content-Type': 'application/json',
          'Accept': _params.accept
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /*************************
   * pronunciation
   ************************/

  /**
   * Get pronunciation.
   *
   * Gets the phonetic pronunciation for the specified word. You can request the pronunciation for a specific format.
   * You can also request the pronunciation for a specific voice to see the default translation for the language of that
   * voice or for a specific custom voice model to see the translation for that voice model.
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.text - The word for which the pronunciation is requested.
   * @param {string} [params.voice] - A voice that specifies the language in which the pronunciation is to be returned.
   * All voices for the same language (for example, `en-US`) return the same translation.
   * @param {string} [params.format] - The phoneme format in which to return the pronunciation. Omit the parameter to
   * obtain the pronunciation in the default format.
   * @param {string} [params.customization_id] - The customization ID (GUID) of a custom voice model for which the
   * pronunciation is to be returned. The language of a specified custom model must match the language of the specified
   * voice. If the word is not defined in the specified custom model, the service returns the default translation for
   * the custom model's language. You must make the request with service credentials created for the instance of the
   * service that owns the custom model. Omit the parameter to see the translation for the specified voice with no
   * customization.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getPronunciation(params: TextToSpeechV1.GetPronunciationParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Pronunciation>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'text': _params.text,
      'voice': _params.voice,
      'format': _params.format,
      'customization_id': _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/pronunciation',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /*************************
   * customModels
   ************************/

  /**
   * Create a custom model.
   *
   * Creates a new empty custom voice model. You must specify a name for the new custom model. You can optionally
   * specify the language and a description for the new model. The model is owned by the instance of the service whose
   * credentials are used to create it.
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the new custom voice model.
   * @param {string} [params.language] - The language of the new custom voice model. Omit the parameter to use the the
   * default language, `en-US`.
   * @param {string} [params.description] - A description of the new custom voice model. Specifying a description is
   * recommended.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public createVoiceModel(params: TextToSpeechV1.CreateVoiceModelParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.VoiceModel>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'name': _params.name,
      'language': _params.language,
      'description': _params.description
    };
    const parameters = {
      options: {
        url: '/v1/customizations',
        method: 'POST',
        json: true,
        body,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * Delete a custom model.
   *
   * Deletes the specified custom voice model. You must use credentials for the instance of the service that owns a
   * model to delete it.
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The customization ID (GUID) of the custom voice model. You must make the
   * request with service credentials created for the instance of the service that owns the custom model.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteVoiceModel(params: TextToSpeechV1.DeleteVoiceModelParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'customization_id': _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * Get a custom model.
   *
   * Gets all information about a specified custom voice model. In addition to metadata such as the name and description
   * of the voice model, the output includes the words and their translations as defined in the model. To see just the
   * metadata for a voice model, use the **List custom models** method.
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The customization ID (GUID) of the custom voice model. You must make the
   * request with service credentials created for the instance of the service that owns the custom model.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getVoiceModel(params: TextToSpeechV1.GetVoiceModelParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.VoiceModel>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'customization_id': _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * List custom models.
   *
   * Lists metadata such as the name and description for all custom voice models that are owned by an instance of the
   * service. Specify a language to list the voice models for that language only. To see the words in addition to the
   * metadata for a specific voice model, use the **List a custom model** method. You must use credentials for the
   * instance of the service that owns a model to list information about it.
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.language] - The language for which custom voice models that are owned by the requesting
   * service credentials are to be returned. Omit the parameter to see all custom voice models that are owned by the
   * requester.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listVoiceModels(params?: TextToSpeechV1.ListVoiceModelsParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.VoiceModels>): NodeJS.ReadableStream | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : (callback) ? callback : () => {/* noop */};
    const query = {
      'language': _params.language
    };
    const parameters = {
      options: {
        url: '/v1/customizations',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * Update a custom model.
   *
   * Updates information for the specified custom voice model. You can update metadata such as the name and description
   * of the voice model. You can also update the words in the model and their translations. Adding a new translation for
   * a word that already exists in a custom model overwrites the word's existing translation. A custom model can contain
   * no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to update
   * it.
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The customization ID (GUID) of the custom voice model. You must make the
   * request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} [params.name] - A new name for the custom voice model.
   * @param {string} [params.description] - A new description for the custom voice model.
   * @param {Word[]} [params.words] - An array of `Word` objects that provides the words and their translations that are
   * to be added or updated for the custom voice model. Pass an empty array to make no additions or updates.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public updateVoiceModel(params: TextToSpeechV1.UpdateVoiceModelParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'name': _params.name,
      'description': _params.description,
      'words': _params.words
    };
    const path = {
      'customization_id': _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /*************************
   * customWords
   ************************/

  /**
   * Add a custom word.
   *
   * Adds a single word and its translation to the specified custom voice model. Adding a new translation for a word
   * that already exists in a custom model overwrites the word's existing translation. A custom model can contain no
   * more than 20,000 entries. You must use credentials for the instance of the service that owns a model to add a word
   * to it.
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The customization ID (GUID) of the custom voice model. You must make the
   * request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.word - The word that is to be added or updated for the custom voice model.
   * @param {string} params.translation - The phonetic or sounds-like translation for the word. A phonetic translation
   * is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an
   * IBM SPR translation. A sounds-like is one or more words that, when combined, sound like the word.
   * @param {string} [params.part_of_speech] - **Japanese only.** The part of speech for the word. The service uses the
   * value to produce the correct intonation for the word. You can create only a single entry, with or without a single
   * part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word.
   * For more information, see [Working with Japanese
   * entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes).
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public addWord(params: TextToSpeechV1.AddWordParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['customization_id', 'word', 'translation'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'translation': _params.translation,
      'part_of_speech': _params.part_of_speech
    };
    const path = {
      'customization_id': _params.customization_id,
      'word': _params.word
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word}',
        method: 'PUT',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * Add custom words.
   *
   * Adds one or more words and their translations to the specified custom voice model. Adding a new translation for a
   * word that already exists in a custom model overwrites the word's existing translation. A custom model can contain
   * no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to add
   * words to it.
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The customization ID (GUID) of the custom voice model. You must make the
   * request with service credentials created for the instance of the service that owns the custom model.
   * @param {Word[]} params.words - The **Add custom words** method accepts an array of `Word` objects. Each object
   * provides a word that is to be added or updated for the custom voice model and the word's translation.
   *
   * The **List custom words** method returns an array of `Word` objects. Each object shows a word and its translation
   * from the custom voice model. The words are listed in alphabetical order, with uppercase letters listed before
   * lowercase letters. The array is empty if the custom model contains no words.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public addWords(params: TextToSpeechV1.AddWordsParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['customization_id', 'words'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'words': _params.words
    };
    const path = {
      'customization_id': _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * Delete a custom word.
   *
   * Deletes a single word from the specified custom voice model. You must use credentials for the instance of the
   * service that owns a model to delete its words.
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The customization ID (GUID) of the custom voice model. You must make the
   * request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.word - The word that is to be deleted from the custom voice model.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteWord(params: TextToSpeechV1.DeleteWordParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['customization_id', 'word'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'customization_id': _params.customization_id,
      'word': _params.word
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * Get a custom word.
   *
   * Gets the translation for a single word from the specified custom model. The output shows the translation as it is
   * defined in the model. You must use credentials for the instance of the service that owns a model to list its words.
   *
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The customization ID (GUID) of the custom voice model. You must make the
   * request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.word - The word that is to be queried from the custom voice model.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getWord(params: TextToSpeechV1.GetWordParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Translation>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['customization_id', 'word'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'customization_id': _params.customization_id,
      'word': _params.word
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * List custom words.
   *
   * Lists all of the words and their translations for the specified custom voice model. The output shows the
   * translations as they are defined in the model. You must use credentials for the instance of the service that owns a
   * model to list its words.
   *
   * **Note:** This method is currently a beta release.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The customization ID (GUID) of the custom voice model. You must make the
   * request with service credentials created for the instance of the service that owns the custom model.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listWords(params: TextToSpeechV1.ListWordsParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Words>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'customization_id': _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /*************************
   * userData
   ************************/

  /**
   * Delete labeled data.
   *
   * Deletes all data that is associated with a specified customer ID. The method deletes all data for the customer ID,
   * regardless of the method by which the information was added. The method has no effect if no data is associated with
   * the customer ID. You must issue the request with credentials for the same instance of the service that was used to
   * associate the customer ID with the data.
   *
   * You associate a customer ID with data by passing the `X-Watson-Metadata` header with a request that passes the
   * data. For more information about customer IDs and about using this method, see [Information
   * security](https://console.bluemix.net/docs/services/text-to-speech/information-security.html).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customer_id - The customer ID for which all data is to be deleted.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteUserData(params: TextToSpeechV1.DeleteUserDataParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['customer_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'customer_id': _params.customer_id
    };
    const parameters = {
      options: {
        url: '/v1/user_data',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

}

TextToSpeechV1.prototype.name = 'text_to_speech';
TextToSpeechV1.prototype.serviceVersion = 'v1';

/*************************
 * interfaces
 ************************/

namespace TextToSpeechV1 {

  /** Options for the `TextToSpeechV1` constructor. */
  export type Options = {
    url?: string;
    iam_access_token?: string;
    iam_apikey?: string;
    iam_url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, body?: T, response?: RequestResponse) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getVoice` operation. */
  export interface GetVoiceParams {
    /** The voice for which information is to be returned. */
    voice: GetVoiceConstants.Voice | string;
    /** The customization ID (GUID) of a custom voice model for which information is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to see information about the specified voice with no customization. */
    customization_id?: string;
    headers?: Object;
  }

  /** Constants for the `getVoice` operation. */
  export namespace GetVoiceConstants {
     /** The voice for which information is to be returned. */
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
      PT_BR_ISABELAVOICE = 'pt-BR_IsabelaVoice',
    }
  }

  /** Parameters for the `listVoices` operation. */
  export interface ListVoicesParams {
    headers?: Object;
  }

  /** Parameters for the `synthesize` operation. */
  export interface SynthesizeParams {
    /** The text to synthesize. */
    text: string;
    /** The requested audio format (MIME type) of the audio. You can use the `Accept` header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.) For detailed information about the supported audio formats and sampling rates, see [Specifying an audio format](https://console.bluemix.net/docs/services/text-to-speech/http.html#format). */
    accept?: SynthesizeConstants.Accept | string;
    /** The voice to use for synthesis. */
    voice?: SynthesizeConstants.Voice | string;
    /** The customization ID (GUID) of a custom voice model to use for the synthesis. If a custom voice model is specified, it is guaranteed to work only if it matches the language of the indicated voice. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to use the specified voice with no customization. */
    customization_id?: string;
    headers?: Object;
  }

  /** Constants for the `synthesize` operation. */
  export namespace SynthesizeConstants {
     /** The requested audio format (MIME type) of the audio. You can use the `Accept` header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.) For detailed information about the supported audio formats and sampling rates, see [Specifying an audio format](https://console.bluemix.net/docs/services/text-to-speech/http.html#format). */
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
      WEBM_CODECS_OPUS = 'audio/webm;codecs=opus',
      WEBM_CODECS_VORBIS = 'audio/webm;codecs=vorbis',
    }
     /** The voice to use for synthesis. */
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
      PT_BR_ISABELAVOICE = 'pt-BR_IsabelaVoice',
    }
  }

  /** Parameters for the `getPronunciation` operation. */
  export interface GetPronunciationParams {
    /** The word for which the pronunciation is requested. */
    text: string;
    /** A voice that specifies the language in which the pronunciation is to be returned. All voices for the same language (for example, `en-US`) return the same translation. */
    voice?: GetPronunciationConstants.Voice | string;
    /** The phoneme format in which to return the pronunciation. Omit the parameter to obtain the pronunciation in the default format. */
    format?: GetPronunciationConstants.Format | string;
    /** The customization ID (GUID) of a custom voice model for which the pronunciation is to be returned. The language of a specified custom model must match the language of the specified voice. If the word is not defined in the specified custom model, the service returns the default translation for the custom model's language. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to see the translation for the specified voice with no customization. */
    customization_id?: string;
    headers?: Object;
  }

  /** Constants for the `getPronunciation` operation. */
  export namespace GetPronunciationConstants {
     /** A voice that specifies the language in which the pronunciation is to be returned. All voices for the same language (for example, `en-US`) return the same translation. */
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
      PT_BR_ISABELAVOICE = 'pt-BR_IsabelaVoice',
    }
     /** The phoneme format in which to return the pronunciation. Omit the parameter to obtain the pronunciation in the default format. */
    export enum Format {
      IPA = 'ipa',
      IBM = 'ibm',
    }
  }

  /** Parameters for the `createVoiceModel` operation. */
  export interface CreateVoiceModelParams {
    /** The name of the new custom voice model. */
    name: string;
    /** The language of the new custom voice model. Omit the parameter to use the the default language, `en-US`. */
    language?: CreateVoiceModelConstants.Language | string;
    /** A description of the new custom voice model. Specifying a description is recommended. */
    description?: string;
    headers?: Object;
  }

  /** Constants for the `createVoiceModel` operation. */
  export namespace CreateVoiceModelConstants {
     /** The language of the new custom voice model. Omit the parameter to use the the default language, `en-US`. */
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
      PT_BR = 'pt-BR',
    }
  }

  /** Parameters for the `deleteVoiceModel` operation. */
  export interface DeleteVoiceModelParams {
    /** The customization ID (GUID) of the custom voice model. You must make the request with service credentials created for the instance of the service that owns the custom model. */
    customization_id: string;
    headers?: Object;
  }

  /** Parameters for the `getVoiceModel` operation. */
  export interface GetVoiceModelParams {
    /** The customization ID (GUID) of the custom voice model. You must make the request with service credentials created for the instance of the service that owns the custom model. */
    customization_id: string;
    headers?: Object;
  }

  /** Parameters for the `listVoiceModels` operation. */
  export interface ListVoiceModelsParams {
    /** The language for which custom voice models that are owned by the requesting service credentials are to be returned. Omit the parameter to see all custom voice models that are owned by the requester. */
    language?: ListVoiceModelsConstants.Language | string;
    headers?: Object;
  }

  /** Constants for the `listVoiceModels` operation. */
  export namespace ListVoiceModelsConstants {
     /** The language for which custom voice models that are owned by the requesting service credentials are to be returned. Omit the parameter to see all custom voice models that are owned by the requester. */
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
      PT_BR = 'pt-BR',
    }
  }

  /** Parameters for the `updateVoiceModel` operation. */
  export interface UpdateVoiceModelParams {
    /** The customization ID (GUID) of the custom voice model. You must make the request with service credentials created for the instance of the service that owns the custom model. */
    customization_id: string;
    /** A new name for the custom voice model. */
    name?: string;
    /** A new description for the custom voice model. */
    description?: string;
    /** An array of `Word` objects that provides the words and their translations that are to be added or updated for the custom voice model. Pass an empty array to make no additions or updates. */
    words?: Word[];
    headers?: Object;
  }

  /** Parameters for the `addWord` operation. */
  export interface AddWordParams {
    /** The customization ID (GUID) of the custom voice model. You must make the request with service credentials created for the instance of the service that owns the custom model. */
    customization_id: string;
    /** The word that is to be added or updated for the custom voice model. */
    word: string;
    /** The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. A sounds-like is one or more words that, when combined, sound like the word. */
    translation: string;
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). */
    part_of_speech?: AddWordConstants.PartOfSpeech | string;
    headers?: Object;
  }

  /** Constants for the `addWord` operation. */
  export namespace AddWordConstants {
     /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). */
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
      HOKA = 'Hoka',
    }
  }

  /** Parameters for the `addWords` operation. */
  export interface AddWordsParams {
    /** The customization ID (GUID) of the custom voice model. You must make the request with service credentials created for the instance of the service that owns the custom model. */
    customization_id: string;
    /** The **Add custom words** method accepts an array of `Word` objects. Each object provides a word that is to be added or updated for the custom voice model and the word's translation. The **List custom words** method returns an array of `Word` objects. Each object shows a word and its translation from the custom voice model. The words are listed in alphabetical order, with uppercase letters listed before lowercase letters. The array is empty if the custom model contains no words. */
    words: Word[];
    headers?: Object;
  }

  /** Parameters for the `deleteWord` operation. */
  export interface DeleteWordParams {
    /** The customization ID (GUID) of the custom voice model. You must make the request with service credentials created for the instance of the service that owns the custom model. */
    customization_id: string;
    /** The word that is to be deleted from the custom voice model. */
    word: string;
    headers?: Object;
  }

  /** Parameters for the `getWord` operation. */
  export interface GetWordParams {
    /** The customization ID (GUID) of the custom voice model. You must make the request with service credentials created for the instance of the service that owns the custom model. */
    customization_id: string;
    /** The word that is to be queried from the custom voice model. */
    word: string;
    headers?: Object;
  }

  /** Parameters for the `listWords` operation. */
  export interface ListWordsParams {
    /** The customization ID (GUID) of the custom voice model. You must make the request with service credentials created for the instance of the service that owns the custom model. */
    customization_id: string;
    headers?: Object;
  }

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customer_id: string;
    headers?: Object;
  }

  /*************************
   * model interfaces
   ************************/

  /** Pronunciation. */
  export interface Pronunciation {
    /** The pronunciation of the specified text in the requested voice and format. If a custom voice model is specified, the pronunciation also reflects that custom voice. */
    pronunciation: string;
  }

  /** SupportedFeatures. */
  export interface SupportedFeatures {
    /** If `true`, the voice can be customized; if `false`, the voice cannot be customized. (Same as `customizable`.). */
    custom_pronunciation: boolean;
    /** If `true`, the voice can be transformed by using the SSML &lt;voice-transformation&gt; element; if `false`, the voice cannot be transformed. */
    voice_transformation: boolean;
  }

  /** Translation. */
  export interface Translation {
    /** The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. A sounds-like is one or more words that, when combined, sound like the word. */
    translation: string;
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). */
    part_of_speech?: string;
  }

  /** Voice. */
  export interface Voice {
    /** The URI of the voice. */
    url: string;
    /** The gender of the voice: `male` or `female`. */
    gender: string;
    /** The name of the voice. Use this as the voice identifier in all requests. */
    name: string;
    /** The language and region of the voice (for example, `en-US`). */
    language: string;
    /** A textual description of the voice. */
    description: string;
    /** If `true`, the voice can be customized; if `false`, the voice cannot be customized. (Same as `custom_pronunciation`; maintained for backward compatibility.). */
    customizable: boolean;
    /** Describes the additional service features supported with the voice. */
    supported_features: SupportedFeatures;
    /** Returns information about a specified custom voice model. This field is returned only by the **Get a voice** method and only when you specify the customization ID of a custom voice model. */
    customization?: VoiceModel;
  }

  /** VoiceModel. */
  export interface VoiceModel {
    /** The customization ID (GUID) of the custom voice model. The **Create a custom model** method returns only this field. It does not not return the other fields of this object. */
    customization_id: string;
    /** The name of the custom voice model. */
    name?: string;
    /** The language identifier of the custom voice model (for example, `en-US`). */
    language?: string;
    /** The GUID of the service credentials for the instance of the service that owns the custom voice model. */
    owner?: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom voice model was created. The value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`). */
    created?: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom voice model was last modified. Equals `created` when a new voice model is first added but has yet to be updated. The value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`). */
    last_modified?: string;
    /** The description of the custom voice model. */
    description?: string;
    /** An array of `Word` objects that lists the words and their translations from the custom voice model. The words are listed in alphabetical order, with uppercase letters listed before lowercase letters. The array is empty if the custom model contains no words. This field is returned only by the **Get a voice** method and only when you specify the customization ID of a custom voice model. */
    words?: Word[];
  }

  /** VoiceModels. */
  export interface VoiceModels {
    /** An array of `VoiceModel` objects that provides information about each available custom voice model. The array is empty if the requesting service credentials own no custom voice models (if no language is specified) or own no custom voice models for the specified language. */
    customizations: VoiceModel[];
  }

  /** Voices. */
  export interface Voices {
    /** A list of available voices. */
    voices: Voice[];
  }

  /** Word. */
  export interface Word {
    /** A word from the custom voice model. */
    word: string;
    /** The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word. */
    translation: string;
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). */
    part_of_speech?: string;
  }

  /** Words. */
  export interface Words {
    /** The **Add custom words** method accepts an array of `Word` objects. Each object provides a word that is to be added or updated for the custom voice model and the word's translation. The **List custom words** method returns an array of `Word` objects. Each object shows a word and its translation from the custom voice model. The words are listed in alphabetical order, with uppercase letters listed before lowercase letters. The array is empty if the custom model contains no words. */
    words: Word[];
  }

}

export = TextToSpeechV1;
