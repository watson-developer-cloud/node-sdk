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
 * IBM Watson&trade; Natural Language Classifier uses machine learning algorithms to return the top matching predefined classes for short text input. You create and train a classifier to connect predefined classes to example texts so that the service can apply those classes to new inputs.
 */

class NaturalLanguageClassifierV1 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/natural-language-classifier/api';
  name: string; // set by prototype to 'natural_language_classifier'
  serviceVersion: string; // set by prototype to 'v1'

  /**
   * Construct a NaturalLanguageClassifierV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/natural-language-classifier/api'). The base url may differ between Bluemix regions.
   * @param {string} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.iam_access_token] - An IAM access token fully managed by the application. Responsibility falls on the application to refresh the token, either before it expires or reactively upon receiving a 401 from the service, as any requests made with an expired token will fail.
   * @param {string} [options.iam_apikey] - An API key that can be used to request IAM tokens. If this API key is provided, the SDK will manage the token and handle the refreshing.
   * @param {string} [options.iam_url] - An optional URL for the IAM service API. Defaults to 'https://iam.bluemix.net/identity/token'.
   * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {NaturalLanguageClassifierV1}
   */
  constructor(options: NaturalLanguageClassifierV1.Options) {
    super(options);
  }

  /*************************
   * classifyText
   ************************/

  /**
   * Classify a phrase.
   *
   * Returns label information for the input. The status must be `Available` before you can use the classifier to
   * classify text.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - Classifier ID to use.
   * @param {string} params.text - The submitted phrase.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public classify(params: NaturalLanguageClassifierV1.ClassifyParams, callback?: NaturalLanguageClassifierV1.Callback<NaturalLanguageClassifierV1.Classification>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['classifier_id', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'text': _params.text
    };
    const path = {
      'classifier_id': _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v1/classifiers/{classifier_id}/classify',
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
   * Classify multiple phrases.
   *
   * Returns label information for multiple phrases. The status must be `Available` before you can use the classifier to
   * classify text.
   *
   * Note that classifying Japanese texts is a beta feature.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - Classifier ID to use.
   * @param {ClassifyInput[]} params.collection - The submitted phrases.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public classifyCollection(params: NaturalLanguageClassifierV1.ClassifyCollectionParams, callback?: NaturalLanguageClassifierV1.Callback<NaturalLanguageClassifierV1.ClassificationCollection>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['classifier_id', 'collection'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'collection': _params.collection
    };
    const path = {
      'classifier_id': _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v1/classifiers/{classifier_id}/classify_collection',
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
   * manageClassifiers
   ************************/

  /**
   * Create classifier.
   *
   * Sends data to create and train a classifier and returns information about the new classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} params.metadata - Metadata in JSON format. The metadata identifies
   * the language of the data, and an optional name to identify the classifier. Specify the language with the 2-letter
   * primary language code as assigned in ISO standard 639.
   *
   * Supported languages are English (`en`), Arabic (`ar`), French (`fr`), German, (`de`), Italian (`it`), Japanese
   * (`ja`), Korean (`ko`), Brazilian Portuguese (`pt`), and Spanish (`es`).
   * @param {NodeJS.ReadableStream|FileObject|Buffer} params.training_data - Training data in CSV format. Each text
   * value must have at least one class. The data can include up to 20,000 records. For details, see [Data
   * preparation](https://console.bluemix.net/docs/services/natural-language-classifier/using-your-data.html).
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public createClassifier(params: NaturalLanguageClassifierV1.CreateClassifierParams, callback?: NaturalLanguageClassifierV1.Callback<NaturalLanguageClassifierV1.Classifier>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['metadata', 'training_data'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      'training_metadata': {
        data: _params.metadata,
        contentType: 'application/json'
      },
      'training_data': {
        data: _params.training_data,
        contentType: 'text/csv'
      }
    };
    const parameters = {
      options: {
        url: '/v1/classifiers',
        method: 'POST',
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * Delete classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - Classifier ID to delete.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteClassifier(params: NaturalLanguageClassifierV1.DeleteClassifierParams, callback?: NaturalLanguageClassifierV1.Callback<NaturalLanguageClassifierV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['classifier_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'classifier_id': _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v1/classifiers/{classifier_id}',
        method: 'DELETE',
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
   * Get information about a classifier.
   *
   * Returns status and other information about a classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - Classifier ID to query.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getClassifier(params: NaturalLanguageClassifierV1.GetClassifierParams, callback?: NaturalLanguageClassifierV1.Callback<NaturalLanguageClassifierV1.Classifier>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['classifier_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'classifier_id': _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v1/classifiers/{classifier_id}',
        method: 'GET',
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
   * List classifiers.
   *
   * Returns an empty array if no classifiers are available.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listClassifiers(params?: NaturalLanguageClassifierV1.ListClassifiersParams, callback?: NaturalLanguageClassifierV1.Callback<NaturalLanguageClassifierV1.ClassifierList>): NodeJS.ReadableStream | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : (callback) ? callback : () => {/* noop */};
    const parameters = {
      options: {
        url: '/v1/classifiers',
        method: 'GET',
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

}

NaturalLanguageClassifierV1.prototype.name = 'natural_language_classifier';
NaturalLanguageClassifierV1.prototype.serviceVersion = 'v1';

/*************************
 * interfaces
 ************************/

namespace NaturalLanguageClassifierV1 {

  /** Options for the `NaturalLanguageClassifierV1` constructor. */
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

  /** Parameters for the `classify` operation. */
  export interface ClassifyParams {
    /** Classifier ID to use. */
    classifier_id: string;
    /** The submitted phrase. */
    text: string;
    headers?: Object;
  }

  /** Parameters for the `classifyCollection` operation. */
  export interface ClassifyCollectionParams {
    /** Classifier ID to use. */
    classifier_id: string;
    /** The submitted phrases. */
    collection: ClassifyInput[];
    headers?: Object;
  }

  /** Parameters for the `createClassifier` operation. */
  export interface CreateClassifierParams {
    /** Metadata in JSON format. The metadata identifies the language of the data, and an optional name to identify the classifier. Specify the language with the 2-letter primary language code as assigned in ISO standard 639. Supported languages are English (`en`), Arabic (`ar`), French (`fr`), German, (`de`), Italian (`it`), Japanese (`ja`), Korean (`ko`), Brazilian Portuguese (`pt`), and Spanish (`es`). */
    metadata: NodeJS.ReadableStream|FileObject|Buffer;
    /** Training data in CSV format. Each text value must have at least one class. The data can include up to 20,000 records. For details, see [Data preparation](https://console.bluemix.net/docs/services/natural-language-classifier/using-your-data.html). */
    training_data: NodeJS.ReadableStream|FileObject|Buffer;
    headers?: Object;
  }

  /** Parameters for the `deleteClassifier` operation. */
  export interface DeleteClassifierParams {
    /** Classifier ID to delete. */
    classifier_id: string;
    headers?: Object;
  }

  /** Parameters for the `getClassifier` operation. */
  export interface GetClassifierParams {
    /** Classifier ID to query. */
    classifier_id: string;
    headers?: Object;
  }

  /** Parameters for the `listClassifiers` operation. */
  export interface ListClassifiersParams {
    headers?: Object;
  }

  /*************************
   * model interfaces
   ************************/

  /** Response from the classifier for a phrase. */
  export interface Classification {
    /** Unique identifier for this classifier. */
    classifier_id?: string;
    /** Link to the classifier. */
    url?: string;
    /** The submitted phrase. */
    text?: string;
    /** The class with the highest confidence. */
    top_class?: string;
    /** An array of up to ten class-confidence pairs sorted in descending order of confidence. */
    classes?: ClassifiedClass[];
  }

  /** Response from the classifier for multiple phrases. */
  export interface ClassificationCollection {
    /** Unique identifier for this classifier. */
    classifier_id?: string;
    /** Link to the classifier. */
    url?: string;
    /** An array of classifier responses for each submitted phrase. */
    collection?: CollectionItem[];
  }

  /** Class and confidence. */
  export interface ClassifiedClass {
    /** A decimal percentage that represents the confidence that Watson has in this class. Higher values represent higher confidences. */
    confidence?: number;
    /** Class label. */
    class_name?: string;
  }

  /** A classifier for natural language phrases. */
  export interface Classifier {
    /** User-supplied name for the classifier. */
    name?: string;
    /** Link to the classifier. */
    url: string;
    /** The state of the classifier. */
    status?: string;
    /** Unique identifier for this classifier. */
    classifier_id: string;
    /** Date and time (UTC) the classifier was created. */
    created?: string;
    /** Additional detail about the status. */
    status_description?: string;
    /** The language used for the classifier. */
    language?: string;
  }

  /** List of available classifiers. */
  export interface ClassifierList {
    /** The classifiers available to the user. Returns an empty array if no classifiers are available. */
    classifiers: Classifier[];
  }

  /** Request payload to classify. */
  export interface ClassifyInput {
    /** The submitted phrase. */
    text: string;
  }

  /** Response from the classifier for a phrase in a collection. */
  export interface CollectionItem {
    /** The submitted phrase. */
    text?: string;
    /** The class with the highest confidence. */
    top_class?: string;
    /** An array of up to ten class-confidence pairs sorted in descending order of confidence. */
    classes?: ClassifiedClass[];
  }

}

export = NaturalLanguageClassifierV1;
