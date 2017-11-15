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
import { FileObject } from '../lib/helper';
import { buildRequestFileObject } from '../lib/helper';

/**
 * Language Translator translates text from one language to another. The service offers multiple domain-specific models that you can customize based on your unique terminology and language. Use Language Translator to take news from across the globe and present it in your language, communicate with your customers in their own language, and more.
 */

class GeneratedLanguageTranslatorV2 extends BaseService {
  name: string; // set by prototype to 'language_translator'
  version: string; // set by prototype to 'v2'

  static URL: string = 'https://gateway.watsonplatform.net/language-translator/api';

  /**
   * Construct a GeneratedLanguageTranslatorV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/language-translator/api'). The base url may differ between Bluemix regions.
   * @param {String} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {String} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @returns {GeneratedLanguageTranslatorV2}
   * @constructor
   */
  constructor(options: GeneratedLanguageTranslatorV2.Options) {
    super(options);
  }

  /**
   * Translates the input text from the source language to the target language.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.text - Input text in UTF-8 encoding. It is a list so that multiple paragraphs can be submitted. Also accept a single string, instead of an array, as valid input.
   * @param {string} [params.model_id] - The unique model_id of the translation model being used to translate text. The model_id inherently specifies source language, target language, and domain. If the model_id is specified, there is no need for the source and target parameters and the values are ignored.
   * @param {string} [params.source] - Used in combination with target as an alternative way to select the model for translation. When target and source are set, and model_id is not set, the system chooses a default model with the right language pair to translate (usually the model based on the news domain).
   * @param {string} [params.target] - Used in combination with source as an alternative way to select the model for translation. When target and source are set, and model_id is not set, the system chooses a default model with the right language pair to translate (usually the model based on the news domain).
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  translate(
    params: GeneratedLanguageTranslatorV2.TranslateParams,
    callback?: GeneratedLanguageTranslatorV2.Callback<
      GeneratedLanguageTranslatorV2.TranslationResult
    >
  ): ReadableStream | void {
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _params = extend({}, params);
    const requiredParams = ['text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      text: _params.text,
      model_id: _params.model_id,
      source: _params.source,
      target: _params.target
    };
    const parameters = {
      options: {
        url: '/v2/translate',
        method: 'POST',
        json: true,
        body: body
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Identifies the language of the input text.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.text - Input text in UTF-8 format.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  identify(
    params: GeneratedLanguageTranslatorV2.IdentifyParams,
    callback?: GeneratedLanguageTranslatorV2.Callback<
      GeneratedLanguageTranslatorV2.IdentifiedLanguages
    >
  ): ReadableStream | void {
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _params = extend({}, params);
    const requiredParams = ['text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      text: _params.text
    };
    const parameters = {
      options: {
        url: '/v2/identify',
        method: 'POST',
        json: true,
        body: body
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'text/plain'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists all languages that can be identified by the API.
   *
   * Lists all languages that the service can identify. Returns the two-letter code (for example, `en` for English or `es` for Spanish) and name of each language.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listIdentifiableLanguages(
    params?: GeneratedLanguageTranslatorV2.ListIdentifiableLanguagesParams,
    callback?: GeneratedLanguageTranslatorV2.Callback<
      GeneratedLanguageTranslatorV2.IdentifiableLanguages
    >
  ): ReadableStream | void {
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _params = extend({}, params);
    const parameters = {
      options: {
        url: '/v2/identifiable_languages',
        method: 'GET'
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Uploads a TMX glossary file on top of a domain to customize a translation model.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.base_model_id - Specifies the domain model that is used as the base for the training. To see current supported domain models, use the GET /v2/models parameter.
   * @param {string} [params.name] - The model name. Valid characters are letters, numbers, -, and _. No spaces.
   * @param {ReadableStream|FileObject|Buffer} [params.forced_glossary] - A TMX file with your customizations. The customizations in the file completely overwrite the domain data translation, including high frequency or high confidence phrase translations. You can upload only one glossary with a file size less than 10 MB per call.
   * @param {ReadableStream|FileObject|Buffer} [params.parallel_corpus] - A TMX file that contains entries that are treated as a parallel corpus instead of a glossary.
   * @param {ReadableStream|FileObject|Buffer} [params.monolingual_corpus] - A UTF-8 encoded plain text file that is used to customize the target language model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createModel(
    params: GeneratedLanguageTranslatorV2.CreateModelParams,
    callback?: GeneratedLanguageTranslatorV2.Callback<
      GeneratedLanguageTranslatorV2.TranslationModel
    >
  ): ReadableStream | void {
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _params = extend({}, params);
    const requiredParams = ['base_model_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData: any = {};
    if (_params.forced_glossary) {
      formData.forced_glossary = buildRequestFileObject({
        data: _params.forced_glossary,
        contentType: 'application/octet-stream'
      });
    }
    if (_params.parallel_corpus) {
      formData.parallel_corpus = buildRequestFileObject({
        data: _params.parallel_corpus,
        contentType: 'application/octet-stream'
      });
    }
    if (_params.monolingual_corpus) {
      formData.monolingual_corpus = buildRequestFileObject({
        data: _params.monolingual_corpus,
        contentType: 'text/plain'
      });
    }
    const query = {
      base_model_id: _params.base_model_id,
      name: _params.name
    };
    const parameters = {
      options: {
        url: '/v2/models',
        method: 'POST',
        qs: query,
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Deletes a custom translation model.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.model_id - The model identifier.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteModel(
    params: GeneratedLanguageTranslatorV2.DeleteModelParams,
    callback?: GeneratedLanguageTranslatorV2.Callback<
      GeneratedLanguageTranslatorV2.DeleteModelResult
    >
  ): ReadableStream | void {
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _params = extend({}, params);
    const requiredParams = ['model_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      model_id: _params.model_id
    };
    const parameters = {
      options: {
        url: '/v2/models/{model_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Get information about the given translation model, including training status.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.model_id - Model ID to use.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getModel(
    params: GeneratedLanguageTranslatorV2.GetModelParams,
    callback?: GeneratedLanguageTranslatorV2.Callback<
      GeneratedLanguageTranslatorV2.TranslationModel
    >
  ): ReadableStream | void {
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _params = extend({}, params);
    const requiredParams = ['model_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      model_id: _params.model_id
    };
    const parameters = {
      options: {
        url: '/v2/models/{model_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists available standard and custom models by source or target language.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.source] - Filter models by source language.
   * @param {string} [params.target] - Filter models by target language.
   * @param {boolean} [params.default_models] - Valid values are leaving it unset, `true`, and `false`. When `true`, it filters models to return the default_models model or models. When `false`, it returns the non-default_models model or models. If not set, it returns all models, default_models and non-default_models.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listModels(
    params?: GeneratedLanguageTranslatorV2.ListModelsParams,
    callback?: GeneratedLanguageTranslatorV2.Callback<
      GeneratedLanguageTranslatorV2.TranslationModels
    >
  ): ReadableStream | void {
    const _callback = typeof callback === 'function' ? callback : () => {};
    const _params = extend({}, params);
    const query = {
      source: _params.source,
      target: _params.target,
      default: _params.default_models
    };
    const parameters = {
      options: {
        url: '/v2/models',
        method: 'GET',
        qs: query
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
    };
    return createRequest(parameters, _callback);
  }
}

GeneratedLanguageTranslatorV2.prototype.name = 'language_translator';
GeneratedLanguageTranslatorV2.prototype.version = 'v2';

namespace GeneratedLanguageTranslatorV2 {
  export interface Empty {}

  export type Callback<T> = (
    error: any,
    body?: T,
    response?: RequestResponse
  ) => void;

  export type Options = {
    url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  };

  export interface TranslateParams {
    text: string[];
    model_id?: string;
    source?: string;
    target?: string;
  }

  export interface IdentifyParams {
    text: string;
  }

  export interface ListIdentifiableLanguagesParams {}

  export interface CreateModelParams {
    base_model_id: string;
    name?: string;
    forced_glossary?: ReadableStream | FileObject | Buffer;
    parallel_corpus?: ReadableStream | FileObject | Buffer;
    monolingual_corpus?: ReadableStream | FileObject | Buffer;
  }

  export interface DeleteModelParams {
    model_id: string;
  }

  export interface GetModelParams {
    model_id: string;
  }

  export interface ListModelsParams {
    source?: string;
    target?: string;
    default_models?: boolean;
  }

  export interface DeleteModelResult {
    status: string;
  }

  export interface IdentifiableLanguage {
    language: string;
    name: string;
  }

  export interface IdentifiableLanguages {
    languages: IdentifiableLanguage[];
  }

  export interface IdentifiedLanguage {
    language: string;
    confidence: number;
  }

  export interface IdentifiedLanguages {
    languages: IdentifiedLanguage[];
  }

  export interface Translation {
    translation_output: string;
  }

  export interface TranslationModel {
    model_id: string;
    name?: string;
    source?: string;
    target?: string;
    base_model_id?: string;
    domain?: string;
    customizable?: boolean;
    default_model?: boolean;
    owner?: string;
    status?: string;
  }

  export interface TranslationModels {
    models: TranslationModel[];
  }

  export interface TranslationResult {
    word_count: number;
    character_count: number;
    translations: Translation[];
  }
}

export = GeneratedLanguageTranslatorV2;
