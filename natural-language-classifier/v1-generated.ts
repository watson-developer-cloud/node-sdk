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

import Request = require('request'); 
import extend = require('extend');
import requestFactory = require('../lib/requestwrapper');
import helper = require('../lib/helper');
import util = require('util');
import BaseService = require('../lib/base_service');

class GeneratedNaturalLanguageClassifierV1 {

  name: string; // set by prototype to 'natural_language_classifier'
  version: string; // set by prototype to 'v1'
  _options: any // set by BaseService

  static URL: string = 'https://gateway.watsonplatform.net/natural-language-classifier/api';

  /**
   * Construct a GeneratedNaturalLanguageClassifierV1 object.
   *
   * @param {Object} options
   * @constructor
   */
  constructor(options: GeneratedNaturalLanguageClassifierV1.Options) {
    BaseService.call(this, options);
  }

  /*************************
   * naturalLanguageClassifier
   ************************/

  /**
   * Returns label information for the input.
   *
   * The status must be `Available` before you can use the classifier to classify text. Use `Get information about a classifier` to retrieve the status.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - Classifier ID to use.
   * @param {string} params.text - The submitted phrase.
   * @param {Function} [callback] - The callback that handles the response.
   */
  classify(params: GeneratedNaturalLanguageClassifierV1.ClassifyParams, callback?: GeneratedNaturalLanguageClassifierV1.Callback<GeneratedNaturalLanguageClassifierV1.Classification>): ReadableStream | void {
    const requiredParams = ['classifier_id', 'text'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { text: params.text };
    const path = { classifier_id: params.classifier_id };
    const parameters = {
      options: {
        url: '/v1/classifiers/{classifier_id}/classify',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Create classifier.
   *
   * Sends data to create and train a classifier and returns information about the new classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ReadableStream|Object|Uint8Array} params.metadata - Metadata in JSON format. The metadata identifies the language of the data, and an optional name to identify the classifier. For details, see the [API reference](https://www.ibm.com/watson/developercloud/natural-language-classifier/api/v1/#create_classifier).
   * @param {ReadableStream|Object|Uint8Array} params.training_data - Training data in CSV format. Each text value must have at least one class. The data can include up to 15,000 records. For details, see [Using your own data](https://www.ibm.com/watson/developercloud/doc/natural-language-classifier/using-your-data.html).
   * @param {Function} [callback] - The callback that handles the response.
   */
  createClassifier(params: GeneratedNaturalLanguageClassifierV1.CreateClassifierParams, callback?: GeneratedNaturalLanguageClassifierV1.Callback<GeneratedNaturalLanguageClassifierV1.Classifier>): ReadableStream | void {
    const requiredParams = ['metadata', 'training_data'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const formData = {
      training_metadata: helper.buildRequestFileObject({data: params.metadata, contentType: 'application/json'}),
      training_data: helper.buildRequestFileObject({data: params.training_data, contentType: 'text/csv'}),
    };
    const parameters = {
      options: {
        url: '/v1/classifiers',
        method: 'POST',
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'multipart/form-data',
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Delete classifier.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - Classifier ID to delete.
   * @param {Function} [callback] - The callback that handles the response.
   */
  deleteClassifier(params: GeneratedNaturalLanguageClassifierV1.DeleteClassifierParams, callback?: GeneratedNaturalLanguageClassifierV1.Callback<GeneratedNaturalLanguageClassifierV1.Empty>): ReadableStream | void {
    const requiredParams = ['classifier_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { classifier_id: params.classifier_id };
    const parameters = {
      options: {
        url: '/v1/classifiers/{classifier_id}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Get information about a classifier.
   *
   * Returns status and other information about a classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - Classifier ID to query.
   * @param {Function} [callback] - The callback that handles the response.
   */
  getClassifier(params: GeneratedNaturalLanguageClassifierV1.GetClassifierParams, callback?: GeneratedNaturalLanguageClassifierV1.Callback<GeneratedNaturalLanguageClassifierV1.Classifier>): ReadableStream | void {
    const requiredParams = ['classifier_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { classifier_id: params.classifier_id };
    const parameters = {
      options: {
        url: '/v1/classifiers/{classifier_id}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * List classifiers.
   *
   * Returns an empty array if no classifiers are available.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Function} [callback] - The callback that handles the response.
   */
  listClassifiers(params?: GeneratedNaturalLanguageClassifierV1.ListClassifiersParams, callback?: GeneratedNaturalLanguageClassifierV1.Callback<GeneratedNaturalLanguageClassifierV1.ClassifierList>): ReadableStream | void {
    params = params || {};
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }
    const parameters = {
      options: {
        url: '/v1/classifiers',
        method: 'GET',
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return requestFactory(parameters, callback);
  };

}

util.inherits(GeneratedNaturalLanguageClassifierV1, BaseService);
GeneratedNaturalLanguageClassifierV1.prototype.name = 'natural_language_classifier';
GeneratedNaturalLanguageClassifierV1.prototype.version = 'v1';

/*************************
 * interfaces
 ************************/

namespace GeneratedNaturalLanguageClassifierV1 {

  export interface Empty { }

  export type Callback<T> = (error: any, body?: T, response?: Request.RequestResponse) => void;

  export interface OptionsHeaders {
    headers?: {
      "X-Watson-Learning-Opt-Out"?: boolean
    }
  }

  export type Options =
    {
      headers?: OptionsHeaders;
      url?: string;
      username: string;
      password: string;
    } | {
      headers?: OptionsHeaders;
      url?: string;
      username?: string;
      password?: string;
      use_unauthenticated: true;
    }

  /*************************
   * request interfaces
   ************************/

  export interface ClassifyParams {
    classifier_id: string;
    text: string;
  }

  export interface CreateClassifierParams {
    metadata: ReadableStream|Object|Uint8Array;
    training_data: ReadableStream|Object|Uint8Array;
  }

  export interface DeleteClassifierParams {
    classifier_id: string;
  }

  export interface GetClassifierParams {
    classifier_id: string;
  }

  export interface ListClassifiersParams {
  }

  /*************************
   * model interfaces
   ************************/

  export interface Classification {
    classifier_id?: string;
    url?: string;
    text?: string;
    top_class?: string;
    classes?: ClassifiedClass[];
  }

  export interface ClassifiedClass {
    confidence?: number;
    class_name?: string;
  }

  export interface Classifier {
    name?: string;
    url: string;
    status?: string;
    classifier_id: string;
    created?: string;
    status_description?: string;
    language?: string;
  }

  export interface ClassifierList {
    classifiers: Classifier[];
  }

}

export = GeneratedNaturalLanguageClassifierV1;
