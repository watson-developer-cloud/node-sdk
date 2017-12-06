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
 * IBM Watson Natural Language Classifier uses machine learning algorithms to return the top matching predefined classes for short text input. You create and train a classifier to connect predefined classes to example texts so that the service can apply those classes to new inputs.
 */

class NaturalLanguageClassifierV1 extends BaseService {
  name: string; // set by prototype to 'natural_language_classifier'
  version: string; // set by prototype to 'v1'

  static URL: string = 'https://gateway.watsonplatform.net/natural-language-classifier/api';

  /**
   * Construct a NaturalLanguageClassifierV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/natural-language-classifier/api'). The base url may differ between Bluemix regions.
   * @param {String} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {String} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {NaturalLanguageClassifierV1}
   */
  constructor(options: NaturalLanguageClassifierV1.Options) {
    super(options);
  }

  /*************************
   * naturallanguageclassifier
   ************************/

  /**
   * Classify.
   *
   * Returns label information for the input. The status must be `Available` before you can use the classifier to classify text. Use `Get information about a classifier` to retrieve the status.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - Classifier ID to use.
   * @param {string} params.text - The submitted phrase.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  classify(
    params: NaturalLanguageClassifierV1.ClassifyParams,
    callback?: NaturalLanguageClassifierV1.Callback<
      NaturalLanguageClassifierV1.Classification
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['classifier_id', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      text: _params.text
    };
    const path = {
      classifier_id: _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v1/classifiers/{classifier_id}/classify',
        method: 'POST',
        json: true,
        body: body,
        path: path
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

  /**
   * Create classifier.
   *
   * Sends data to create and train a classifier and returns information about the new classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ReadableStream|FileObject|Buffer} params.metadata - Metadata in JSON format. The metadata identifies the language of the data, and an optional name to identify the classifier. For details, see the [API reference](https://www.ibm.com/watson/developercloud/natural-language-classifier/api/v1/#create_classifier).
   * @param {ReadableStream|FileObject|Buffer} params.training_data - Training data in CSV format. Each text value must have at least one class. The data can include up to 15,000 records. For details, see [Using your own data](https://www.ibm.com/watson/developercloud/doc/natural-language-classifier/using-your-data.html).
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createClassifier(
    params: NaturalLanguageClassifierV1.CreateClassifierParams,
    callback?: NaturalLanguageClassifierV1.Callback<
      NaturalLanguageClassifierV1.Classifier
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['metadata', 'training_data'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      training_metadata: {
        data: _params.metadata,
        contentType: 'application/json'
      },
      training_data: {
        data: _params.training_data,
        contentType: 'text/csv'
      }
    };
    const parameters = {
      options: {
        url: '/v1/classifiers',
        method: 'POST',
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
   * Delete classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - Classifier ID to delete.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteClassifier(
    params: NaturalLanguageClassifierV1.DeleteClassifierParams,
    callback?: NaturalLanguageClassifierV1.Callback<
      NaturalLanguageClassifierV1.Empty
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['classifier_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      classifier_id: _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v1/classifiers/{classifier_id}',
        method: 'DELETE',
        path: path
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

  /**
   * Get information about a classifier.
   *
   * Returns status and other information about a classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - Classifier ID to query.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getClassifier(
    params: NaturalLanguageClassifierV1.GetClassifierParams,
    callback?: NaturalLanguageClassifierV1.Callback<
      NaturalLanguageClassifierV1.Classifier
    >
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['classifier_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      classifier_id: _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v1/classifiers/{classifier_id}',
        method: 'GET',
        path: path
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

  /**
   * List classifiers.
   *
   * Returns an empty array if no classifiers are available.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listClassifiers(
    params?: NaturalLanguageClassifierV1.ListClassifiersParams,
    callback?: NaturalLanguageClassifierV1.Callback<
      NaturalLanguageClassifierV1.ClassifierList
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
        url: '/v1/classifiers',
        method: 'GET'
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
}

NaturalLanguageClassifierV1.prototype.name = 'natural_language_classifier';
NaturalLanguageClassifierV1.prototype.version = 'v1';

/*************************
 * interfaces
 ************************/

namespace NaturalLanguageClassifierV1 {
  /** Options for the `NaturalLanguageClassifierV1` constructor. **/
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

  /** Parameters for the `classify` operation. **/
  export interface ClassifyParams {
    /** Classifier ID to use. **/
    classifier_id: string;
    /** The submitted phrase. **/
    text: string;
  }

  /** Parameters for the `createClassifier` operation. **/
  export interface CreateClassifierParams {
    /** Metadata in JSON format. The metadata identifies the language of the data, and an optional name to identify the classifier. For details, see the [API reference](https://www.ibm.com/watson/developercloud/natural-language-classifier/api/v1/#create_classifier). **/
    metadata: ReadableStream | FileObject | Buffer;
    /** Training data in CSV format. Each text value must have at least one class. The data can include up to 15,000 records. For details, see [Using your own data](https://www.ibm.com/watson/developercloud/doc/natural-language-classifier/using-your-data.html). **/
    training_data: ReadableStream | FileObject | Buffer;
  }

  /** Parameters for the `deleteClassifier` operation. **/
  export interface DeleteClassifierParams {
    /** Classifier ID to delete. **/
    classifier_id: string;
  }

  /** Parameters for the `getClassifier` operation. **/
  export interface GetClassifierParams {
    /** Classifier ID to query. **/
    classifier_id: string;
  }

  /** Parameters for the `listClassifiers` operation. **/
  export interface ListClassifiersParams {}

  /*************************
   * model interfaces
   ************************/

  /** Response from the classifier for a phrase. **/
  export interface Classification {
    /** Unique identifier for this classifier. **/
    classifier_id?: string;
    /** Link to the classifier. **/
    url?: string;
    /** The submitted phrase. **/
    text?: string;
    /** The class with the highest confidence. **/
    top_class?: string;
    /** An array of up to ten class-confidence pairs sorted in descending order of confidence. **/
    classes?: ClassifiedClass[];
  }

  /** Class and confidence. **/
  export interface ClassifiedClass {
    /** A decimal percentage that represents the confidence that Watson has in this class. Higher values represent higher confidences. **/
    confidence?: number;
    /** Class label. **/
    class_name?: string;
  }

  /** A classifier for natural language phrases. **/
  export interface Classifier {
    /** User-supplied name for the classifier. **/
    name?: string;
    /** Link to the classifier. **/
    url: string;
    /** The state of the classifier. **/
    status?: string;
    /** Unique identifier for this classifier. **/
    classifier_id: string;
    /** Date and time (UTC) the classifier was created. **/
    created?: string;
    /** Additional detail about the status. **/
    status_description?: string;
    /** The language used for the classifier. **/
    language?: string;
  }

  /** List of available classifiers. **/
  export interface ClassifierList {
    /** The classifiers available to the user. Returns an empty array if no classifiers are available. **/
    classifiers: Classifier[];
  }
}

export = NaturalLanguageClassifierV1;
