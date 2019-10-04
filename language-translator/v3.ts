/**
 * (C) Copyright IBM Corp. 2018, 2019.
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
import { Authenticator, BaseService, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getAuthenticatorFromEnvironment } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * IBM Watson&trade; Language Translator translates text from one language to another. The service offers multiple IBM
 * provided translation models that you can customize based on your unique terminology and language. Use Language
 * Translator to take news from across the globe and present it in your language, communicate with your customers in
 * their own language, and more.
 */

class LanguageTranslatorV3 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/language-translator/api';
  name: string; // set by prototype to 'language_translator'
  serviceVersion: string; // set by prototype to 'v3'

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
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/language-translator/api'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {LanguageTranslatorV3}
   * @throws {Error}
   */
  constructor(options: UserOptions) {
    // If the caller didn't supply an authenticator, construct one from external configuration.
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment('language_translator');
    }
    super(options);
    // check if 'version' was provided
    if (typeof this.baseOptions.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this.baseOptions.qs.version = options.version;
  }

  /*************************
   * translation
   ************************/

  /**
   * Translate.
   *
   * Translates the input text from the source language to the target language.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.text - Input text in UTF-8 encoding. Multiple entries will result in multiple translations
   * in the response.
   * @param {string} [params.modelId] - A globally unique string that identifies the underlying model that is used for
   * translation.
   * @param {string} [params.source] - Translation source language code.
   * @param {string} [params.target] - Translation target language code.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
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

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'translate');

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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listIdentifiableLanguages(params?: LanguageTranslatorV3.ListIdentifiableLanguagesParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.IdentifiableLanguages>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.IdentifiableLanguages>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'listIdentifiableLanguages');

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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
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

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'identify');

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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
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

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'listModels');

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
   * Uploads Translation Memory eXchange (TMX) files to customize a translation model.
   *
   * You can either customize a model with a forced glossary or with a corpus that contains parallel sentences. To
   * create a model that is customized with a parallel corpus <b>and</b> a forced glossary, proceed in two steps:
   * customize with a parallel corpus first and then customize the resulting model with a glossary. Depending on the
   * type of customization and the size of the uploaded corpora, training can range from minutes for a glossary to
   * several hours for a large parallel corpus. You can upload a single forced glossary file and this file must be less
   * than <b>10 MB</b>. You can upload multiple parallel corpora tmx files. The cumulative file size of all uploaded
   * files is limited to <b>250 MB</b>. To successfully train with a parallel corpus you must have at least <b>5,000
   * parallel sentences</b> in your corpus.
   *
   * You can have a <b>maximum of 10 custom models per language pair</b>.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.baseModelId - The model ID of the model to use as the base for customization. To see
   * available models, use the `List models` method. Usually all IBM provided models are customizable. In addition, all
   * your models that have been created via parallel corpus customization, can be further customized with a forced
   * glossary.
   * @param {NodeJS.ReadableStream|Buffer} [params.forcedGlossary] - A TMX file with your customizations. The
   * customizations in the file completely overwrite the domain translaton data, including high frequency or high
   * confidence phrase translations. You can upload only one glossary with a file size less than 10 MB per call. A
   * forced glossary should contain single words or short phrases.
   * @param {NodeJS.ReadableStream|Buffer} [params.parallelCorpus] - A TMX file with parallel sentences for source and
   * target language. You can upload multiple parallel_corpus files in one request. All uploaded parallel_corpus files
   * combined, your parallel corpus must contain at least 5,000 parallel sentences to train successfully.
   * @param {string} [params.name] - An optional model name that you can use to identify the model. Valid characters are
   * letters, numbers, dashes, underscores, spaces and apostrophes. The maximum length is 32 characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
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

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'createModel');

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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
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

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'deleteModel');

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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
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

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'getModel');

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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listDocuments(params?: LanguageTranslatorV3.ListDocumentsParams, callback?: LanguageTranslatorV3.Callback<LanguageTranslatorV3.DocumentList>): Promise<LanguageTranslatorV3.Response<LanguageTranslatorV3.DocumentList>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'listDocuments');

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
   * @param {NodeJS.ReadableStream|Buffer} params.file - The source file to translate.
   *
   * [Supported file
   * types](https://cloud.ibm.com/docs/services/language-translator?topic=language-translator-document-translator-tutorial#supported-file-formats)
   *
   * Maximum file size: **20 MB**.
   * @param {string} params.filename - The filename for file.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.modelId] - The model to use for translation. `model_id` or both `source` and `target` are
   * required.
   * @param {string} [params.source] - Language code that specifies the language of the source document.
   * @param {string} [params.target] - Language code that specifies the target language for translation.
   * @param {string} [params.documentId] - To use a previously submitted document as the source for a new translation,
   * enter the `document_id` of the document.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
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

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'translateDocument');

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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
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

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'getDocumentStatus');

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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
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

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'deleteDocument');

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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
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

      const sdkHeaders = getSdkHeaders('language_translator', 'v3', 'getTranslatedDocument');

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

LanguageTranslatorV3.prototype.name = 'language_translator';
LanguageTranslatorV3.prototype.serviceVersion = 'v3';

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

  /** Parameters for the `translate` operation. */
  export interface TranslateParams {
    /** Input text in UTF-8 encoding. Multiple entries will result in multiple translations in the response. */
    text: string[];
    /** A globally unique string that identifies the underlying model that is used for translation. */
    modelId?: string;
    /** Translation source language code. */
    source?: string;
    /** Translation target language code. */
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
    /** The model ID of the model to use as the base for customization. To see available models, use the `List
     *  models` method. Usually all IBM provided models are customizable. In addition, all your models that have been
     *  created via parallel corpus customization, can be further customized with a forced glossary.
     */
    baseModelId: string;
    /** A TMX file with your customizations. The customizations in the file completely overwrite the domain
     *  translaton data, including high frequency or high confidence phrase translations. You can upload only one
     *  glossary with a file size less than 10 MB per call. A forced glossary should contain single words or short
     *  phrases.
     */
    forcedGlossary?: NodeJS.ReadableStream|Buffer;
    /** A TMX file with parallel sentences for source and target language. You can upload multiple parallel_corpus
     *  files in one request. All uploaded parallel_corpus files combined, your parallel corpus must contain at least
     *  5,000 parallel sentences to train successfully.
     */
    parallelCorpus?: NodeJS.ReadableStream|Buffer;
    /** An optional model name that you can use to identify the model. Valid characters are letters, numbers,
     *  dashes, underscores, spaces and apostrophes. The maximum length is 32 characters.
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
    /** The source file to translate.
     *
     *  [Supported file
     *  types](https://cloud.ibm.com/docs/services/language-translator?topic=language-translator-document-translator-tutorial#supported-file-formats)
     *
     *  Maximum file size: **20 MB**.
     */
    file: NodeJS.ReadableStream|Buffer;
    /** The filename for file. */
    filename: string;
    /** The content type of file. */
    fileContentType?: TranslateDocumentConstants.FileContentType | string;
    /** The model to use for translation. `model_id` or both `source` and `target` are required. */
    modelId?: string;
    /** Language code that specifies the language of the source document. */
    source?: string;
    /** Language code that specifies the target language for translation. */
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
    /** Translation target language code. */
    target: string;
    /** The time when the document was submitted. */
    created: string;
    /** The time when the translation completed. */
    completed?: string;
    /** The number of words in the source document, present only if status=available. */
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
    /** Number of words in the input text. */
    word_count: number;
    /** Number of characters in the input text. */
    character_count: number;
    /** List of translation output in UTF-8, corresponding to the input text entries. */
    translations: Translation[];
  }

}

export = LanguageTranslatorV3;
