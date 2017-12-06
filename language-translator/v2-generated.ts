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

/**
 * Language Translator translates text from one language to another. The service offers multiple domain-specific models that you can customize based on your unique terminology and language. Use Language Translator to take news from across the globe and present it in your language, communicate with your customers in their own language, and more.
 */

class LanguageTranslatorV2 extends BaseService {
  name: string; // set by prototype to 'language_translator'
  version: string; // set by prototype to 'v2'

  static URL: string = 'https://gateway.watsonplatform.net/language-translator/api';

  /**
   * Construct a LanguageTranslatorV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/language-translator/api'). The base url may differ between Bluemix regions.
   * @param {String} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {String} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {LanguageTranslatorV2}
   */
  constructor(options: LanguageTranslatorV2.Options) {
    super(options);
  }

  /*************************
   * translate
   ************************/

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
    params: LanguageTranslatorV2.TranslateParams,
    callback?: LanguageTranslatorV2.Callback<
      LanguageTranslatorV2.TranslationResult
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
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
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * identify
   ************************/

  /**
   * Identifies the language of the input text.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.text - Input text in UTF-8 format.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  identify(
    params: LanguageTranslatorV2.IdentifyParams,
    callback?: LanguageTranslatorV2.Callback<
      LanguageTranslatorV2.IdentifiedLanguages
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { text: _params.text };
    const parameters = {
      options: {
        url: '/v2/identify',
        method: 'POST',
        json: true,
        body: body
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'text/plain'
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
    params?: LanguageTranslatorV2.ListIdentifiableLanguagesParams,
    callback?: LanguageTranslatorV2.Callback<
      LanguageTranslatorV2.IdentifiableLanguages
    >
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const parameters = {
      options: {
        url: '/v2/identifiable_languages',
        method: 'GET'
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * models
   ************************/

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
    params: LanguageTranslatorV2.CreateModelParams,
    callback?: LanguageTranslatorV2.Callback<
      LanguageTranslatorV2.TranslationModel
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['base_model_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      forced_glossary: {
        data: _params.forced_glossary,
        contentType: 'application/octet-stream'
      },
      parallel_corpus: {
        data: _params.parallel_corpus,
        contentType: 'application/octet-stream'
      },
      monolingual_corpus: {
        data: _params.monolingual_corpus,
        contentType: 'text/plain'
      }
    };
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
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
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
    params: LanguageTranslatorV2.DeleteModelParams,
    callback?: LanguageTranslatorV2.Callback<
      LanguageTranslatorV2.DeleteModelResult
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
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
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json'
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
    params: LanguageTranslatorV2.GetModelParams,
    callback?: LanguageTranslatorV2.Callback<
      LanguageTranslatorV2.TranslationModel
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
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
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json'
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
    params?: LanguageTranslatorV2.ListModelsParams,
    callback?: LanguageTranslatorV2.Callback<
      LanguageTranslatorV2.TranslationModels
    >
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
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
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    };
    return createRequest(parameters, _callback);
  }
}

LanguageTranslatorV2.prototype.name = 'language_translator';
LanguageTranslatorV2.prototype.version = 'v2';

/*************************
 * interfaces
 ************************/

namespace LanguageTranslatorV2 {
  /** Options for the `LanguageTranslatorV2` constructor. **/
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

  /** Parameters for the `translate` operation. **/
  export interface TranslateParams {
    /** Input text in UTF-8 encoding. It is a list so that multiple paragraphs can be submitted. Also accept a single string, instead of an array, as valid input. **/
    text: string[];
    /** The unique model_id of the translation model being used to translate text. The model_id inherently specifies source language, target language, and domain. If the model_id is specified, there is no need for the source and target parameters and the values are ignored. **/
    model_id?: string;
    /** Used in combination with target as an alternative way to select the model for translation. When target and source are set, and model_id is not set, the system chooses a default model with the right language pair to translate (usually the model based on the news domain). **/
    source?: string;
    /** Used in combination with source as an alternative way to select the model for translation. When target and source are set, and model_id is not set, the system chooses a default model with the right language pair to translate (usually the model based on the news domain). **/
    target?: string;
  }

  /** Parameters for the `identify` operation. **/
  export interface IdentifyParams {
    /** Input text in UTF-8 format. **/
    text: string;
  }

  /** Parameters for the `listIdentifiableLanguages` operation. **/
  export interface ListIdentifiableLanguagesParams {}

  /** Parameters for the `createModel` operation. **/
  export interface CreateModelParams {
    /** Specifies the domain model that is used as the base for the training. To see current supported domain models, use the GET /v2/models parameter. **/
    base_model_id: string;
    /** The model name. Valid characters are letters, numbers, -, and _. No spaces. **/
    name?: string;
    /** A TMX file with your customizations. The customizations in the file completely overwrite the domain data translation, including high frequency or high confidence phrase translations. You can upload only one glossary with a file size less than 10 MB per call. **/
    forced_glossary?: ReadableStream | FileObject | Buffer;
    /** A TMX file that contains entries that are treated as a parallel corpus instead of a glossary. **/
    parallel_corpus?: ReadableStream | FileObject | Buffer;
    /** A UTF-8 encoded plain text file that is used to customize the target language model. **/
    monolingual_corpus?: ReadableStream | FileObject | Buffer;
  }

  /** Parameters for the `deleteModel` operation. **/
  export interface DeleteModelParams {
    /** The model identifier. **/
    model_id: string;
  }

  /** Parameters for the `getModel` operation. **/
  export interface GetModelParams {
    /** Model ID to use. **/
    model_id: string;
  }

  /** Parameters for the `listModels` operation. **/
  export interface ListModelsParams {
    /** Filter models by source language. **/
    source?: string;
    /** Filter models by target language. **/
    target?: string;
    /** Valid values are leaving it unset, `true`, and `false`. When `true`, it filters models to return the default_models model or models. When `false`, it returns the non-default_models model or models. If not set, it returns all models, default_models and non-default_models. **/
    default_models?: boolean;
  }

  /*************************
   * model interfaces
   ************************/

  /** DeleteModelResult. **/
  export interface DeleteModelResult {
    /** "OK" indicates that the model was successfully deleted. **/
    status: string;
  }

  /** IdentifiableLanguage. **/
  export interface IdentifiableLanguage {
    /** The code for an identifiable language. **/
    language: string;
    /** The name of the identifiable language. **/
    name: string;
  }

  /** IdentifiableLanguages. **/
  export interface IdentifiableLanguages {
    /** A list of all languages that the service can identify. **/
    languages: IdentifiableLanguage[];
  }

  /** IdentifiedLanguage. **/
  export interface IdentifiedLanguage {
    /** The code for an identified language. **/
    language: string;
    /** The confidence score for the identified language. **/
    confidence: number;
  }

  /** IdentifiedLanguages. **/
  export interface IdentifiedLanguages {
    /** A ranking of identified languages with confidence scores. **/
    languages: IdentifiedLanguage[];
  }

  /** Translation. **/
  export interface Translation {
    /** Translation output in UTF-8. **/
    translation_output: string;
  }

  /** Response payload for models. **/
  export interface TranslationModel {
    /** A globally unique string that identifies the underlying model that is used for translation. This string contains all the information about source language, target language, domain, and various other related configurations. **/
    model_id: string;
    /** If a model is trained by a user, there might be an optional “name” parameter attached during training to help the user identify the model. **/
    name?: string;
    /** Source language in two letter language code. Use the five letter code when clarifying between multiple supported languages. When model_id is used directly, it will override the source-target language combination. Also, when a two letter language code is used, but no suitable default is found, it returns an error. **/
    source?: string;
    /** Target language in two letter language code. **/
    target?: string;
    /** If this model is a custom model, this returns the base model that it is trained on. For a base model, this response value is empty. **/
    base_model_id?: string;
    /** The domain of the translation model. **/
    domain?: string;
    /** Whether this model can be used as a base for customization. Customized models are not further customizable, and we don't allow the customization of certain base models. **/
    customizable?: boolean;
    /** Whether this model is considered a default model and is used when the source and target languages are specified without the model_id. **/
    default_model?: boolean;
    /** Returns the ID of the Language Translator service instance that created the model, or an empty string if it is a model that is trained by IBM. **/
    owner?: string;
    /** Availability of a model. **/
    status?: string;
  }

  /** The response type for listing existing translation models. **/
  export interface TranslationModels {
    /** An array of available models. **/
    models: TranslationModel[];
  }

  /** TranslationResult. **/
  export interface TranslationResult {
    /** Number of words of the complete input text. **/
    word_count: number;
    /** Number of characters of the complete input text. **/
    character_count: number;
    /** List of translation output in UTF-8, corresponding to the list of input text. **/
    translations: Translation[];
  }
}

export = LanguageTranslatorV2;
