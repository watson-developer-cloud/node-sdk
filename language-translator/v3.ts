/**
 * (C) Copyright IBM Corp. 2018, 2020.
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
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * IBM Watson&trade; Language Translator translates text from one language to another. The service offers multiple IBM
 * provided translation models that you can customize based on your unique terminology and language. Use Language
 * Translator to take news from across the globe and present it in your language, communicate with your customers in
 * their own language, and more.
 */

class LanguageTranslatorV3 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.language-translator.watson.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'language_translator';

  /**
   * Construct a LanguageTranslatorV3 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever
   * the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses
   * the API version for the date you specify, or the most recent version before that date. Note that you should not
   * programmatically specify the current date at runtime, in case the API has been updated since your application's
   * release. Instead, specify a version date that is compatible with your application, and don't change it until your
   * application is ready for a later version.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {LanguageTranslatorV3}
   * @throws {Error}
   */
  constructor(options: UserOptions) {
    if (!options.serviceName) {
      options.serviceName = LanguageTranslatorV3.DEFAULT_SERVICE_NAME;
    }
    // If the caller didn't supply an authenticator, construct one from external configuration.
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    super(options);
    this.configureService(options.serviceName);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    }
    // check if 'version' was provided
    if (typeof this.baseOptions.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this.baseOptions.qs.version = options.version;
  }

  /*************************
   * languages
   ************************/

  /**
   * List supported languages.
   *
   * Lists all supported languages. The method returns an array of supported languages with information about each
   * language. Languages are listed in alphabetical order by language code (for example, `af`, `ar`).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.Languages>>}
   */
  public listLanguages(params?: LanguageTranslatorV3.ListLanguagesParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.Languages>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.Languages>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'listLanguages');

      const parameters = {
        options: {
          url: '/v3/languages',
          method: 'GET',
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * translation
   ************************/

  /**
   * Translate.
   *
   * Translates the input text from the source language to the target language. A target language or translation model
   * ID is required. The service attempts to detect the language of the source text if it is not specified.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.text - Input text in UTF-8 encoding. Multiple entries will result in multiple translations
   * in the response.
   * @param {string} [params.modelId] - The model to use for translation. For example, `en-de` selects the IBM provided
   * base model for English to German translation. A model ID overrides the source and target parameters and is required
   * if you use a custom model. If no model ID is specified, you must specify a target language.
   * @param {string} [params.source] - Language code that specifies the language of the source document.
   * @param {string} [params.target] - Language code that specifies the target language for translation. Required if
   * model ID is not specified.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.TranslationResult>>}
   */
  public translate(params: LanguageTranslatorV3.TranslateParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.TranslationResult>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.TranslationResult>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['text'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'text': _params.text,
        'model_id': _params.modelId,
        'source': _params.source,
        'target': _params.target
      };

      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'translate');

      const parameters = {
        options: {
          url: '/v3/translate',
          method: 'POST',
          body,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * identification
   ************************/

  /**
   * List identifiable languages.
   *
   * Lists the languages that the service can identify. Returns the language code (for example, `en` for English or `es`
   * for Spanish) and name of each language.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.IdentifiableLanguages>>}
   */
  public listIdentifiableLanguages(params?: LanguageTranslatorV3.ListIdentifiableLanguagesParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.IdentifiableLanguages>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.IdentifiableLanguages>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'listIdentifiableLanguages');

      const parameters = {
        options: {
          url: '/v3/identifiable_languages',
          method: 'GET',
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Identify language.
   *
   * Identifies the language of the input text.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.text - Input text in UTF-8 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.IdentifiedLanguages>>}
   */
  public identify(params: LanguageTranslatorV3.IdentifyParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.IdentifiedLanguages>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.IdentifiedLanguages>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['text'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = _params.text;
      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'identify');

      const parameters = {
        options: {
          url: '/v3/identify',
          method: 'POST',
          body,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * models
   ************************/

  /**
   * List models.
   *
   * Lists available translation models.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.source] - Specify a language code to filter results by source language.
   * @param {string} [params.target] - Specify a language code to filter results by target language.
   * @param {boolean} [params._default] - If the default parameter isn't specified, the service will return all models
   * (default and non-default) for each language pair. To return only default models, set this to `true`. To return only
   * non-default models, set this to `false`. There is exactly one default model per language pair, the IBM provided
   * base model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.TranslationModels>>}
   */
  public listModels(params?: LanguageTranslatorV3.ListModelsParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.TranslationModels>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.TranslationModels>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const query = {
        'source': _params.source,
        'target': _params.target,
        'default': _params._default
      };

      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'listModels');

      const parameters = {
        options: {
          url: '/v3/models',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Create model.
   *
   * Uploads training files to customize a translation model. You can customize a model with a forced glossary or with a
   * parallel corpus:
   * * Use a *forced glossary* to force certain terms and phrases to be translated in a specific way. You can upload
   * only a single forced glossary file for a model. The size of a forced glossary file for a custom model is limited to
   * 10 MB.
   * * Use a *parallel corpus* when you want your custom model to learn from general translation patterns in parallel
   * sentences in your samples. What your model learns from a parallel corpus can improve translation results for input
   * text that the model has not been trained on. You can upload multiple parallel corpora files with a request. To
   * successfully train with parallel corpora, the corpora files must contain a cumulative total of at least 5000
   * parallel sentences. The cumulative size of all uploaded corpus files for a custom model is limited to 250 MB.
   *
   * Depending on the type of customization and the size of the uploaded files, training time can range from minutes for
   * a glossary to several hours for a large parallel corpus. To create a model that is customized with a parallel
   * corpus and a forced glossary, customize the model with a parallel corpus first and then customize the resulting
   * model with a forced glossary.
   *
   * You can create a maximum of 10 custom models per language pair. For more information about customizing a
   * translation model, including the formatting and character restrictions for data files, see [Customizing your
   * model](https://cloud.ibm.com/docs/language-translator?topic=language-translator-customizing).
   *
   * #### Supported file formats
   *
   *  You can provide your training data for customization in the following document formats:
   * * **TMX** (`.tmx`) - Translation Memory eXchange (TMX) is an XML specification for the exchange of translation
   * memories.
   * * **XLIFF** (`.xliff`) - XML Localization Interchange File Format (XLIFF) is an XML specification for the exchange
   * of translation memories.
   * * **CSV** (`.csv`) - Comma-separated values (CSV) file with two columns for aligned sentences and phrases. The
   * first row contains the language code.
   * * **TSV** (`.tsv` or `.tab`) - Tab-separated values (TSV) file with two columns for aligned sentences and phrases.
   * The first row contains the language code.
   * * **JSON** (`.json`) - Custom JSON format for specifying aligned sentences and phrases.
   * * **Microsoft Excel** (`.xls` or `.xlsx`) - Excel file with the first two columns for aligned sentences and
   * phrases. The first row contains the language code.
   *
   * You must encode all text data in UTF-8 format. For more information, see [Supported document formats for training
   * data](https://cloud.ibm.com/docs/language-translator?topic=language-translator-customizing#supported-document-formats-for-training-data).
   *
   *
   * #### Specifying file formats
   *
   *  You can indicate the format of a file by including the file extension with the file name. Use the file extensions
   * shown in **Supported file formats**.
   *
   * Alternatively, you can omit the file extension and specify one of the following `content-type` specifications for
   * the file:
   * * **TMX** - `application/x-tmx+xml`
   * * **XLIFF** - `application/xliff+xml`
   * * **CSV** - `text/csv`
   * * **TSV** - `text/tab-separated-values`
   * * **JSON** - `application/json`
   * * **Microsoft Excel** - `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
   *
   * For example, with `curl`, use the following `content-type` specification to indicate the format of a CSV file named
   * **glossary**:
   *
   * `--form "forced_glossary=@glossary;type=text/csv"`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.baseModelId - The ID of the translation model to use as the base for customization. To see
   * available models and IDs, use the `List models` method. Most models that are provided with the service are
   * customizable. In addition, all models that you create with parallel corpora customization can be further customized
   * with a forced glossary.
   * @param {NodeJS.ReadableStream|Buffer} [params.forcedGlossary] - A file with forced glossary terms for the source
   * and target languages. The customizations in the file completely overwrite the domain translation data, including
   * high frequency or high confidence phrase translations.
   *
   * You can upload only one glossary file for a custom model, and the glossary can have a maximum size of 10 MB. A
   * forced glossary must contain single words or short phrases. For more information, see **Supported file formats** in
   * the method description.
   *
   * *With `curl`, use `--form forced_glossary=@{filename}`.*.
   * @param {NodeJS.ReadableStream|Buffer} [params.parallelCorpus] - A file with parallel sentences for the source and
   * target languages. You can upload multiple parallel corpus files in one request by repeating the parameter. All
   * uploaded parallel corpus files combined must contain at least 5000 parallel sentences to train successfully. You
   * can provide a maximum of 500,000 parallel sentences across all corpora.
   *
   * A single entry in a corpus file can contain a maximum of 80 words. All corpora files for a custom model can have a
   * cumulative maximum size of 250 MB. For more information, see **Supported file formats** in the method description.
   *
   * *With `curl`, use `--form parallel_corpus=@{filename}`.*.
   * @param {string} [params.name] - An optional model name that you can use to identify the model. Valid characters are
   * letters, numbers, dashes, underscores, spaces, and apostrophes. The maximum length of the name is 32 characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.TranslationModel>>}
   */
  public createModel(params: LanguageTranslatorV3.CreateModelParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.TranslationModel>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.TranslationModel>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['baseModelId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const formData = {
        'forced_glossary': {
          data: _params.forcedGlossary,
          contentType: 'application/octet-stream'
        },
        'parallel_corpus': {
          data: _params.parallelCorpus,
          contentType: 'application/octet-stream'
        }
      };

      const query = {
        'base_model_id': _params.baseModelId,
        'name': _params.name
      };

      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'createModel');

      const parameters = {
        options: {
          url: '/v3/models',
          method: 'POST',
          qs: query,
          formData
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete model.
   *
   * Deletes a custom translation model.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.modelId - Model ID of the model to delete.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.DeleteModelResult>>}
   */
  public deleteModel(params: LanguageTranslatorV3.DeleteModelParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.DeleteModelResult>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.DeleteModelResult>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['modelId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'model_id': _params.modelId
      };

      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteModel');

      const parameters = {
        options: {
          url: '/v3/models/{model_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get model details.
   *
   * Gets information about a translation model, including training status for custom models. Use this API call to poll
   * the status of your customization request. A successfully completed training will have a status of `available`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.modelId - Model ID of the model to get.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.TranslationModel>>}
   */
  public getModel(params: LanguageTranslatorV3.GetModelParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.TranslationModel>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.TranslationModel>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['modelId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'model_id': _params.modelId
      };

      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'getModel');

      const parameters = {
        options: {
          url: '/v3/models/{model_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * documentTranslation
   ************************/

  /**
   * List documents.
   *
   * Lists documents that have been submitted for translation.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.DocumentList>>}
   */
  public listDocuments(params?: LanguageTranslatorV3.ListDocumentsParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.DocumentList>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.DocumentList>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'listDocuments');

      const parameters = {
        options: {
          url: '/v3/documents',
          method: 'GET',
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Translate document.
   *
   * Submit a document for translation. You can submit the document contents in the `file` parameter, or you can
   * reference a previously submitted document by document ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|Buffer} params.file - The contents of the source file to translate.
   *
   * [Supported file
   * types](https://cloud.ibm.com/docs/language-translator?topic=language-translator-document-translator-tutorial#supported-file-formats)
   *
   * Maximum file size: **20 MB**.
   * @param {string} params.filename - The filename for file.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.modelId] - The model to use for translation. For example, `en-de` selects the IBM provided
   * base model for English to German translation. A model ID overrides the source and target parameters and is required
   * if you use a custom model. If no model ID is specified, you must specify a target language.
   * @param {string} [params.source] - Language code that specifies the language of the source document. If omitted, the
   * service derives the source language from the input text.
   * @param {string} [params.target] - Language code that specifies the target language for translation. Required if
   * model ID is not specified.
   * @param {string} [params.documentId] - To use a previously submitted document as the source for a new translation,
   * enter the `document_id` of the document.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.DocumentStatus>>}
   */
  public translateDocument(params: LanguageTranslatorV3.TranslateDocumentParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.DocumentStatus>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.DocumentStatus>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['file', 'filename'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const formData = {
        'file': {
          data: _params.file,
          filename: _params.filename,
          contentType: _params.fileContentType
        },
        'model_id': _params.modelId,
        'source': _params.source,
        'target': _params.target,
        'document_id': _params.documentId
      };

      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'translateDocument');

      const parameters = {
        options: {
          url: '/v3/documents',
          method: 'POST',
          formData
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get document status.
   *
   * Gets the translation status of a document.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.documentId - The document ID of the document.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.DocumentStatus>>}
   */
  public getDocumentStatus(params: LanguageTranslatorV3.GetDocumentStatusParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.DocumentStatus>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.DocumentStatus>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['documentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'document_id': _params.documentId
      };

      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'getDocumentStatus');

      const parameters = {
        options: {
          url: '/v3/documents/{document_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete document.
   *
   * Deletes a document.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.documentId - Document ID of the document to delete.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.Empty>>}
   */
  public deleteDocument(params: LanguageTranslatorV3.DeleteDocumentParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.Empty>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['documentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'document_id': _params.documentId
      };

      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteDocument');

      const parameters = {
        options: {
          url: '/v3/documents/{document_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get translated document.
   *
   * Gets the translated document associated with the given document ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.documentId - The document ID of the document that was submitted for translation.
   * @param {string} [params.accept] - The type of the response: application/powerpoint, application/mspowerpoint,
   * application/x-rtf, application/json, application/xml, application/vnd.ms-excel,
   * application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint,
   * application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword,
   * application/vnd.openxmlformats-officedocument.wordprocessingml.document,
   * application/vnd.oasis.opendocument.spreadsheet, application/vnd.oasis.opendocument.presentation,
   * application/vnd.oasis.opendocument.text, application/pdf, application/rtf, text/html, text/json, text/plain,
   * text/richtext, text/rtf, or text/xml. A character encoding can be specified by including a `charset` parameter. For
   * example, 'text/html;charset=utf-8'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<LanguageTranslatorV3.Response<NodeJS.ReadableStream|Buffer>>}
   */
  public getTranslatedDocument(params: LanguageTranslatorV3.GetTranslatedDocumentParams, callback?: LanguageTranslatorV3.Callback<NodeJS.ReadableStream|Buffer>): Promise<LanguageTranslatorV3.Response<NodeJS.ReadableStream|Buffer>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['documentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'document_id': _params.documentId
      };

      const sdkHeaders = getSdkHeaders(LanguageTranslatorV3.DEFAULT_SERVICE_NAME, 'v3', 'getTranslatedDocument');

      const parameters = {
        options: {
          url: '/v3/documents/{document_id}/translated_document',
          method: 'GET',
          path,
          responseType: 'stream',
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': _params.accept
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

}

/*************************
 * interfaces
 ************************/

namespace LanguageTranslatorV3 {

  /** An operation response. **/
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listLanguages` operation. */
  export interface ListLanguagesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `translate` operation. */
  export interface TranslateParams {
    /** Input text in UTF-8 encoding. Multiple entries will result in multiple translations in the response. */
    text: string[];
    /** The model to use for translation. For example, `en-de` selects the IBM provided base model for English to
     *  German translation. A model ID overrides the source and target parameters and is required if you use a custom
     *  model. If no model ID is specified, you must specify a target language.
     */
    modelId?: string;
    /** Language code that specifies the language of the source document. */
    source?: string;
    /** Language code that specifies the target language for translation. Required if model ID is not specified. */
    target?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listIdentifiableLanguages` operation. */
  export interface ListIdentifiableLanguagesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `identify` operation. */
  export interface IdentifyParams {
    /** Input text in UTF-8 format. */
    text: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listModels` operation. */
  export interface ListModelsParams {
    /** Specify a language code to filter results by source language. */
    source?: string;
    /** Specify a language code to filter results by target language. */
    target?: string;
    /** If the default parameter isn't specified, the service will return all models (default and non-default) for
     *  each language pair. To return only default models, set this to `true`. To return only non-default models, set
     *  this to `false`. There is exactly one default model per language pair, the IBM provided base model.
     */
    _default?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createModel` operation. */
  export interface CreateModelParams {
    /** The ID of the translation model to use as the base for customization. To see available models and IDs, use
     *  the `List models` method. Most models that are provided with the service are customizable. In addition, all
     *  models that you create with parallel corpora customization can be further customized with a forced glossary.
     */
    baseModelId: string;
    /** A file with forced glossary terms for the source and target languages. The customizations in the file
     *  completely overwrite the domain translation data, including high frequency or high confidence phrase
     *  translations.
     *
     *  You can upload only one glossary file for a custom model, and the glossary can have a maximum size of 10 MB. A
     *  forced glossary must contain single words or short phrases. For more information, see **Supported file formats**
     *  in the method description.
     *
     *  *With `curl`, use `--form forced_glossary=@{filename}`.*.
     */
    forcedGlossary?: NodeJS.ReadableStream|Buffer;
    /** A file with parallel sentences for the source and target languages. You can upload multiple parallel corpus
     *  files in one request by repeating the parameter. All uploaded parallel corpus files combined must contain at
     *  least 5000 parallel sentences to train successfully. You can provide a maximum of 500,000 parallel sentences
     *  across all corpora.
     *
     *  A single entry in a corpus file can contain a maximum of 80 words. All corpora files for a custom model can have
     *  a cumulative maximum size of 250 MB. For more information, see **Supported file formats** in the method
     *  description.
     *
     *  *With `curl`, use `--form parallel_corpus=@{filename}`.*.
     */
    parallelCorpus?: NodeJS.ReadableStream|Buffer;
    /** An optional model name that you can use to identify the model. Valid characters are letters, numbers,
     *  dashes, underscores, spaces, and apostrophes. The maximum length of the name is 32 characters.
     */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteModel` operation. */
  export interface DeleteModelParams {
    /** Model ID of the model to delete. */
    modelId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getModel` operation. */
  export interface GetModelParams {
    /** Model ID of the model to get. */
    modelId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDocuments` operation. */
  export interface ListDocumentsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `translateDocument` operation. */
  export interface TranslateDocumentParams {
    /** The contents of the source file to translate.
     *
     *  [Supported file
     *  types](https://cloud.ibm.com/docs/language-translator?topic=language-translator-document-translator-tutorial#supported-file-formats)
     *
     *  Maximum file size: **20 MB**.
     */
    file: NodeJS.ReadableStream|Buffer;
    /** The filename for file. */
    filename: string;
    /** The content type of file. */
    fileContentType?: TranslateDocumentConstants.FileContentType | string;
    /** The model to use for translation. For example, `en-de` selects the IBM provided base model for English to
     *  German translation. A model ID overrides the source and target parameters and is required if you use a custom
     *  model. If no model ID is specified, you must specify a target language.
     */
    modelId?: string;
    /** Language code that specifies the language of the source document. If omitted, the service derives the source
     *  language from the input text.
     */
    source?: string;
    /** Language code that specifies the target language for translation. Required if model ID is not specified. */
    target?: string;
    /** To use a previously submitted document as the source for a new translation, enter the `document_id` of the
     *  document.
     */
    documentId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `translateDocument` operation. */
  export namespace TranslateDocumentConstants {
    /** The content type of file. */
    export enum FileContentType {
      APPLICATION_POWERPOINT = 'application/powerpoint',
      APPLICATION_MSPOWERPOINT = 'application/mspowerpoint',
      APPLICATION_X_RTF = 'application/x-rtf',
      APPLICATION_JSON = 'application/json',
      APPLICATION_XML = 'application/xml',
      APPLICATION_VND_MS_EXCEL = 'application/vnd.ms-excel',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      APPLICATION_VND_MS_POWERPOINT = 'application/vnd.ms-powerpoint',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET = 'application/vnd.oasis.opendocument.spreadsheet',
      APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION = 'application/vnd.oasis.opendocument.presentation',
      APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT = 'application/vnd.oasis.opendocument.text',
      APPLICATION_PDF = 'application/pdf',
      APPLICATION_RTF = 'application/rtf',
      TEXT_HTML = 'text/html',
      TEXT_JSON = 'text/json',
      TEXT_PLAIN = 'text/plain',
      TEXT_RICHTEXT = 'text/richtext',
      TEXT_RTF = 'text/rtf',
      TEXT_XML = 'text/xml',
    }
  }

  /** Parameters for the `getDocumentStatus` operation. */
  export interface GetDocumentStatusParams {
    /** The document ID of the document. */
    documentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDocument` operation. */
  export interface DeleteDocumentParams {
    /** Document ID of the document to delete. */
    documentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTranslatedDocument` operation. */
  export interface GetTranslatedDocumentParams {
    /** The document ID of the document that was submitted for translation. */
    documentId: string;
    /** The type of the response: application/powerpoint, application/mspowerpoint, application/x-rtf,
     *  application/json, application/xml, application/vnd.ms-excel,
     *  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint,
     *  application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword,
     *  application/vnd.openxmlformats-officedocument.wordprocessingml.document,
     *  application/vnd.oasis.opendocument.spreadsheet, application/vnd.oasis.opendocument.presentation,
     *  application/vnd.oasis.opendocument.text, application/pdf, application/rtf, text/html, text/json, text/plain,
     *  text/richtext, text/rtf, or text/xml. A character encoding can be specified by including a `charset` parameter.
     *  For example, 'text/html;charset=utf-8'.
     */
    accept?: GetTranslatedDocumentConstants.Accept | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getTranslatedDocument` operation. */
  export namespace GetTranslatedDocumentConstants {
    /** The type of the response: application/powerpoint, application/mspowerpoint, application/x-rtf, application/json, application/xml, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.oasis.opendocument.spreadsheet, application/vnd.oasis.opendocument.presentation, application/vnd.oasis.opendocument.text, application/pdf, application/rtf, text/html, text/json, text/plain, text/richtext, text/rtf, or text/xml. A character encoding can be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'. */
    export enum Accept {
      APPLICATION_POWERPOINT = 'application/powerpoint',
      APPLICATION_MSPOWERPOINT = 'application/mspowerpoint',
      APPLICATION_X_RTF = 'application/x-rtf',
      APPLICATION_JSON = 'application/json',
      APPLICATION_XML = 'application/xml',
      APPLICATION_VND_MS_EXCEL = 'application/vnd.ms-excel',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      APPLICATION_VND_MS_POWERPOINT = 'application/vnd.ms-powerpoint',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET = 'application/vnd.oasis.opendocument.spreadsheet',
      APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION = 'application/vnd.oasis.opendocument.presentation',
      APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT = 'application/vnd.oasis.opendocument.text',
      APPLICATION_PDF = 'application/pdf',
      APPLICATION_RTF = 'application/rtf',
      TEXT_HTML = 'text/html',
      TEXT_JSON = 'text/json',
      TEXT_PLAIN = 'text/plain',
      TEXT_RICHTEXT = 'text/richtext',
      TEXT_RTF = 'text/rtf',
      TEXT_XML = 'text/xml',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** DeleteModelResult. */
  export interface DeleteModelResult {
    /** "OK" indicates that the model was successfully deleted. */
    status: string;
  }

  /** DocumentList. */
  export interface DocumentList {
    /** An array of all previously submitted documents. */
    documents: DocumentStatus[];
  }

  /** Document information, including translation status. */
  export interface DocumentStatus {
    /** System generated ID identifying a document being translated using one specific translation model. */
    document_id: string;
    /** filename from the submission (if it was missing in the multipart-form, 'noname.<ext matching content type>'
     *  is used.
     */
    filename: string;
    /** The status of the translation job associated with a submitted document. */
    status: string;
    /** A globally unique string that identifies the underlying model that is used for translation. */
    model_id: string;
    /** Model ID of the base model that was used to customize the model. If the model is not a custom model, this
     *  will be absent or an empty string.
     */
    base_model_id?: string;
    /** Translation source language code. */
    source: string;
    /** A score between 0 and 1 indicating the confidence of source language detection. A higher value indicates
     *  greater confidence. This is returned only when the service automatically detects the source language.
     */
    detected_language_confidence?: number;
    /** Translation target language code. */
    target: string;
    /** The time when the document was submitted. */
    created: string;
    /** The time when the translation completed. */
    completed?: string;
    /** An estimate of the number of words in the source document. Returned only if `status` is `available`. */
    word_count?: number;
    /** The number of characters in the source document, present only if status=available. */
    character_count?: number;
  }

  /** IdentifiableLanguage. */
  export interface IdentifiableLanguage {
    /** The language code for an identifiable language. */
    language: string;
    /** The name of the identifiable language. */
    name: string;
  }

  /** IdentifiableLanguages. */
  export interface IdentifiableLanguages {
    /** A list of all languages that the service can identify. */
    languages: IdentifiableLanguage[];
  }

  /** IdentifiedLanguage. */
  export interface IdentifiedLanguage {
    /** The language code for an identified language. */
    language: string;
    /** The confidence score for the identified language. */
    confidence: number;
  }

  /** IdentifiedLanguages. */
  export interface IdentifiedLanguages {
    /** A ranking of identified languages with confidence scores. */
    languages: IdentifiedLanguage[];
  }

  /** Response payload for languages. */
  export interface Language {
    /** The language code for the language (for example, `af`). */
    language?: string;
    /** The name of the language in English (for example, `Afrikaans`). */
    language_name?: string;
    /** The native name of the language (for example, `Afrikaans`). */
    native_language_name?: string;
    /** The country code for the language (for example, `ZA` for South Africa). */
    country_code?: string;
    /** Indicates whether words of the language are separated by whitespace: `true` if the words are separated;
     *  `false` otherwise.
     */
    words_separated?: boolean;
    /** Indicates the direction of the language: `right_to_left` or `left_to_right`. */
    direction?: string;
    /** Indicates whether the language can be used as the source for translation: `true` if the language can be used
     *  as the source; `false` otherwise.
     */
    supported_as_source?: boolean;
    /** Indicates whether the language can be used as the target for translation: `true` if the language can be used
     *  as the target; `false` otherwise.
     */
    supported_as_target?: boolean;
    /** Indicates whether the language supports automatic detection: `true` if the language can be detected
     *  automatically; `false` otherwise.
     */
    identifiable?: boolean;
  }

  /** The response type for listing supported languages. */
  export interface Languages {
    /** An array of supported languages with information about each language. */
    languages: Language[];
  }

  /** Translation. */
  export interface Translation {
    /** Translation output in UTF-8. */
    translation: string;
  }

  /** Response payload for models. */
  export interface TranslationModel {
    /** A globally unique string that identifies the underlying model that is used for translation. */
    model_id: string;
    /** Optional name that can be specified when the model is created. */
    name?: string;
    /** Translation source language code. */
    source?: string;
    /** Translation target language code. */
    target?: string;
    /** Model ID of the base model that was used to customize the model. If the model is not a custom model, this
     *  will be an empty string.
     */
    base_model_id?: string;
    /** The domain of the translation model. */
    domain?: string;
    /** Whether this model can be used as a base for customization. Customized models are not further customizable,
     *  and some base models are not customizable.
     */
    customizable?: boolean;
    /** Whether or not the model is a default model. A default model is the model for a given language pair that
     *  will be used when that language pair is specified in the source and target parameters.
     */
    default_model?: boolean;
    /** Either an empty string, indicating the model is not a custom model, or the ID of the service instance that
     *  created the model.
     */
    owner?: string;
    /** Availability of a model. */
    status?: string;
  }

  /** The response type for listing existing translation models. */
  export interface TranslationModels {
    /** An array of available models. */
    models: TranslationModel[];
  }

  /** TranslationResult. */
  export interface TranslationResult {
    /** An estimate of the number of words in the input text. */
    word_count: number;
    /** Number of characters in the input text. */
    character_count: number;
    /** The language code of the source text if the source language was automatically detected. */
    detected_language?: string;
    /** A score between 0 and 1 indicating the confidence of source language detection. A higher value indicates
     *  greater confidence. This is returned only when the service automatically detects the source language.
     */
    detected_language_confidence?: number;
    /** List of translation output in UTF-8, corresponding to the input text entries. */
    translations: Translation[];
  }

}

export = LanguageTranslatorV3;
