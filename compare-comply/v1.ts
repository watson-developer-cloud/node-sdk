/**
 * Copyright 2019 IBM All Rights Reserved.
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
import { BaseService, FileObject, getMissingParams } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * IBM Watson&trade; Compare and Comply analyzes governing documents to provide details about critical aspects of the documents.
 */

class CompareComplyV1 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/compare-comply/api';
  name: string; // set by prototype to 'compare-comply'
  serviceVersion: string; // set by prototype to 'v1'

  /**
   * Construct a CompareComplyV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/compare-comply/api'). The base url may differ between IBM Cloud regions.
   * @param {string} [options.iam_access_token] - An IAM access token fully managed by the application. Responsibility falls on the application to refresh the token, either before it expires or reactively upon receiving a 401 from the service, as any requests made with an expired token will fail.
   * @param {string} [options.iam_apikey] - An API key that can be used to request IAM tokens. If this API key is provided, the SDK will manage the token and handle the refreshing.
   * @param {string} [options.iam_url] - An optional URL for the IAM service API. Defaults to 'https://iam.cloud.ibm.com/identity/token'.
   * @param {string} [options.iam_client_id] - client id (username) for request to iam service
   * @param {string} [options.iam_client_secret] - client secret (password) for request to iam service
   * @param {string} [options.icp4d_access_token] - icp for data access token provided and managed by user
   * @param {string} [options.icp4d_url] - icp for data base url - used for authentication
   * @param {string} [options.authentication_type] - authentication pattern to be used. can be iam, basic, or icp4d
   * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This
   * option may be useful for requests that are proxied.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By
   * default, all IBM Watson services log requests and their results. Logging is done only to improve the services for
   * future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of
   * users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {CompareComplyV1}
   * @throws {Error}
   */
  constructor(options: CompareComplyV1.Options) {
    super(options);
    // check if 'version' was provided
    if (typeof this._options.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this._options.qs.version = options.version;
  }

  /*************************
   * hTMLConversion
   ************************/

  /**
   * Convert document to HTML.
   *
   * Converts a document to HTML.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} params.file - The document to convert.
   * @param {string} params.filename - The filename for file.
   * @param {string} [params.file_content_type] - The content type of file.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public convertToHtml(params: CompareComplyV1.ConvertToHtmlParams, callback?: CompareComplyV1.Callback<CompareComplyV1.HTMLReturn>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['file', 'filename'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.convertToHtml(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      'file': {
        data: _params.file,
        filename: _params.filename,
        contentType: _params.file_content_type
      }
    };
 
    const query = {
      'model': _params.model
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'convertToHtml');

    const parameters = {
      options: {
        url: '/v1/html_conversion',
        method: 'POST',
        qs: query,
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * elementClassification
   ************************/

  /**
   * Classify the elements of a document.
   *
   * Analyzes the structural and semantic elements of a document.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} params.file - The document to classify.
   * @param {string} [params.file_content_type] - The content type of file.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public classifyElements(params: CompareComplyV1.ClassifyElementsParams, callback?: CompareComplyV1.Callback<CompareComplyV1.ClassifyReturn>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['file'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.classifyElements(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      'file': {
        data: _params.file,
        contentType: _params.file_content_type
      }
    };
 
    const query = {
      'model': _params.model
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'classifyElements');

    const parameters = {
      options: {
        url: '/v1/element_classification',
        method: 'POST',
        qs: query,
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * tables
   ************************/

  /**
   * Extract a document's tables.
   *
   * Analyzes the tables in a document.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} params.file - The document on which to run table extraction.
   * @param {string} [params.file_content_type] - The content type of file.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public extractTables(params: CompareComplyV1.ExtractTablesParams, callback?: CompareComplyV1.Callback<CompareComplyV1.TableReturn>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['file'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.extractTables(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      'file': {
        data: _params.file,
        contentType: _params.file_content_type
      }
    };
 
    const query = {
      'model': _params.model
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'extractTables');

    const parameters = {
      options: {
        url: '/v1/tables',
        method: 'POST',
        qs: query,
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * comparison
   ************************/

  /**
   * Compare two documents.
   *
   * Compares two input documents. Documents must be in the same format.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} params.file_1 - The first document to compare.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} params.file_2 - The second document to compare.
   * @param {string} [params.file_1_content_type] - The content type of file_1.
   * @param {string} [params.file_2_content_type] - The content type of file_2.
   * @param {string} [params.file_1_label] - A text label for the first document.
   * @param {string} [params.file_2_label] - A text label for the second document.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public compareDocuments(params: CompareComplyV1.CompareDocumentsParams, callback?: CompareComplyV1.Callback<CompareComplyV1.CompareReturn>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['file_1', 'file_2'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.compareDocuments(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      'file_1': {
        data: _params.file_1,
        contentType: _params.file_1_content_type
      },
      'file_2': {
        data: _params.file_2,
        contentType: _params.file_2_content_type
      }
    };
 
    const query = {
      'file_1_label': _params.file_1_label,
      'file_2_label': _params.file_2_label,
      'model': _params.model
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'compareDocuments');

    const parameters = {
      options: {
        url: '/v1/comparison',
        method: 'POST',
        qs: query,
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * feedback
   ************************/

  /**
   * Add feedback.
   *
   * Adds feedback in the form of _labels_ from a subject-matter expert (SME) to a governing document.
   * **Important:** Feedback is not immediately incorporated into the training model, nor is it guaranteed to be
   * incorporated at a later date. Instead, submitted feedback is used to suggest future updates to the training model.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {FeedbackDataInput} params.feedback_data - Feedback data for submission.
   * @param {string} [params.user_id] - An optional string identifying the user.
   * @param {string} [params.comment] - An optional comment on or description of the feedback.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public addFeedback(params: CompareComplyV1.AddFeedbackParams, callback?: CompareComplyV1.Callback<CompareComplyV1.FeedbackReturn>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['feedback_data'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.addFeedback(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'feedback_data': _params.feedback_data,
      'user_id': _params.user_id,
      'comment': _params.comment
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'addFeedback');

    const parameters = {
      options: {
        url: '/v1/feedback',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Delete a specified feedback entry.
   *
   * Deletes a feedback entry with a specified `feedback_id`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.feedback_id - A string that specifies the feedback entry to be deleted from the document.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteFeedback(params: CompareComplyV1.DeleteFeedbackParams, callback?: CompareComplyV1.Callback<CompareComplyV1.FeedbackDeleted>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['feedback_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteFeedback(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'model': _params.model
    };

    const path = {
      'feedback_id': _params.feedback_id
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'deleteFeedback');

    const parameters = {
      options: {
        url: '/v1/feedback/{feedback_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Get a specified feedback entry.
   *
   * Gets a feedback entry with a specified `feedback_id`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.feedback_id - A string that specifies the feedback entry to be included in the output.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getFeedback(params: CompareComplyV1.GetFeedbackParams, callback?: CompareComplyV1.Callback<CompareComplyV1.GetFeedback>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['feedback_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getFeedback(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'model': _params.model
    };

    const path = {
      'feedback_id': _params.feedback_id
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'getFeedback');

    const parameters = {
      options: {
        url: '/v1/feedback/{feedback_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * List the feedback in a document.
   *
   * Lists the feedback in a document.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.feedback_type] - An optional string that filters the output to include only feedback with
   * the specified feedback type. The only permitted value is `element_classification`.
   * @param {string} [params.before] - An optional string in the format `YYYY-MM-DD` that filters the output to include
   * only feedback that was added before the specified date.
   * @param {string} [params.after] - An optional string in the format `YYYY-MM-DD` that filters the output to include
   * only feedback that was added after the specified date.
   * @param {string} [params.document_title] - An optional string that filters the output to include only feedback from
   * the document with the specified `document_title`.
   * @param {string} [params.model_id] - An optional string that filters the output to include only feedback with the
   * specified `model_id`. The only permitted value is `contracts`.
   * @param {string} [params.model_version] - An optional string that filters the output to include only feedback with
   * the specified `model_version`.
   * @param {string} [params.category_removed] - An optional string in the form of a comma-separated list of categories.
   * If this is specified, the service filters the output to include only feedback that has at least one category from
   * the list removed.
   * @param {string} [params.category_added] - An optional string in the form of a comma-separated list of categories.
   * If this is specified, the service filters the output to include only feedback that has at least one category from
   * the list added.
   * @param {string} [params.category_not_changed] - An optional string in the form of a comma-separated list of
   * categories. If this is specified, the service filters the output to include only feedback that has at least one
   * category from the list unchanged.
   * @param {string} [params.type_removed] - An optional string of comma-separated `nature`:`party` pairs. If this is
   * specified, the service filters the output to include only feedback that has at least one `nature`:`party` pair from
   * the list removed.
   * @param {string} [params.type_added] - An optional string of comma-separated `nature`:`party` pairs. If this is
   * specified, the service filters the output to include only feedback that has at least one `nature`:`party` pair from
   * the list removed.
   * @param {string} [params.type_not_changed] - An optional string of comma-separated `nature`:`party` pairs. If this
   * is specified, the service filters the output to include only feedback that has at least one `nature`:`party` pair
   * from the list unchanged.
   * @param {number} [params.page_limit] - An optional integer specifying the number of documents that you want the
   * service to return.
   * @param {string} [params.cursor] - An optional string that returns the set of documents after the previous set. Use
   * this parameter with the `page_limit` parameter.
   * @param {string} [params.sort] - An optional comma-separated list of fields in the document to sort on. You can
   * optionally specify the sort direction by prefixing the value of the field with `-` for descending order or `+` for
   * ascending order (the default). Currently permitted sorting fields are `created`, `user_id`, and `document_title`.
   * @param {boolean} [params.include_total] - An optional boolean value. If specified as `true`, the `pagination`
   * object in the output includes a value called `total` that gives the total count of feedback created.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listFeedback(params?: CompareComplyV1.ListFeedbackParams, callback?: CompareComplyV1.Callback<CompareComplyV1.FeedbackList>): Promise<any> | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listFeedback(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }
 
    const query = {
      'feedback_type': _params.feedback_type,
      'before': _params.before,
      'after': _params.after,
      'document_title': _params.document_title,
      'model_id': _params.model_id,
      'model_version': _params.model_version,
      'category_removed': _params.category_removed,
      'category_added': _params.category_added,
      'category_not_changed': _params.category_not_changed,
      'type_removed': _params.type_removed,
      'type_added': _params.type_added,
      'type_not_changed': _params.type_not_changed,
      'page_limit': _params.page_limit,
      'cursor': _params.cursor,
      'sort': _params.sort,
      'include_total': _params.include_total
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'listFeedback');

    const parameters = {
      options: {
        url: '/v1/feedback',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * batches
   ************************/

  /**
   * Submit a batch-processing request.
   *
   * Run Compare and Comply methods over a collection of input documents.
   *
   * **Important:** Batch processing requires the use of the [IBM Cloud Object Storage
   * service](https://cloud.ibm.com/docs/services/cloud-object-storage?topic=cloud-object-storage-about#about-ibm-cloud-object-storage).
   * The use of IBM Cloud Object Storage with Compare and Comply is discussed at [Using batch
   * processing](https://cloud.ibm.com/docs/services/compare-comply?topic=compare-comply-batching#before-you-batch).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params._function - The Compare and Comply method to run across the submitted input documents.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} params.input_credentials_file - A JSON file containing the input
   * Cloud Object Storage credentials. At a minimum, the credentials must enable `READ` permissions on the bucket
   * defined by the `input_bucket_name` parameter.
   * @param {string} params.input_bucket_location - The geographical location of the Cloud Object Storage input bucket
   * as listed on the **Endpoint** tab of your Cloud Object Storage instance; for example, `us-geo`, `eu-geo`, or
   * `ap-geo`.
   * @param {string} params.input_bucket_name - The name of the Cloud Object Storage input bucket.
   * @param {NodeJS.ReadableStream|FileObject|Buffer} params.output_credentials_file - A JSON file that lists the Cloud
   * Object Storage output credentials. At a minimum, the credentials must enable `READ` and `WRITE` permissions on the
   * bucket defined by the `output_bucket_name` parameter.
   * @param {string} params.output_bucket_location - The geographical location of the Cloud Object Storage output bucket
   * as listed on the **Endpoint** tab of your Cloud Object Storage instance; for example, `us-geo`, `eu-geo`, or
   * `ap-geo`.
   * @param {string} params.output_bucket_name - The name of the Cloud Object Storage output bucket.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createBatch(params: CompareComplyV1.CreateBatchParams, callback?: CompareComplyV1.Callback<CompareComplyV1.BatchStatus>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['_function', 'input_credentials_file', 'input_bucket_location', 'input_bucket_name', 'output_credentials_file', 'output_bucket_location', 'output_bucket_name'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createBatch(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      'input_credentials_file': {
        data: _params.input_credentials_file,
        contentType: 'application/json'
      },
      'input_bucket_location': _params.input_bucket_location,
      'input_bucket_name': _params.input_bucket_name,
      'output_credentials_file': {
        data: _params.output_credentials_file,
        contentType: 'application/json'
      },
      'output_bucket_location': _params.output_bucket_location,
      'output_bucket_name': _params.output_bucket_name
    };
 
    const query = {
      'function': _params._function,
      'model': _params.model
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'createBatch');

    const parameters = {
      options: {
        url: '/v1/batches',
        method: 'POST',
        qs: query,
        formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Get information about a specific batch-processing job.
   *
   * Gets information about a batch-processing job with a specified ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.batch_id - The ID of the batch-processing job whose information you want to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getBatch(params: CompareComplyV1.GetBatchParams, callback?: CompareComplyV1.Callback<CompareComplyV1.BatchStatus>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['batch_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getBatch(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'batch_id': _params.batch_id
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'getBatch');

    const parameters = {
      options: {
        url: '/v1/batches/{batch_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * List submitted batch-processing jobs.
   *
   * Lists batch-processing jobs submitted by users.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listBatches(params?: CompareComplyV1.ListBatchesParams, callback?: CompareComplyV1.Callback<CompareComplyV1.Batches>): Promise<any> | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listBatches(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'listBatches');

    const parameters = {
      options: {
        url: '/v1/batches',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Update a pending or active batch-processing job.
   *
   * Updates a pending or active batch-processing job. You can rescan the input bucket to check for new documents or
   * cancel a job.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.batch_id - The ID of the batch-processing job you want to update.
   * @param {string} params.action - The action you want to perform on the specified batch-processing job.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateBatch(params: CompareComplyV1.UpdateBatchParams, callback?: CompareComplyV1.Callback<CompareComplyV1.BatchStatus>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['batch_id', 'action'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.updateBatch(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'action': _params.action,
      'model': _params.model
    };

    const path = {
      'batch_id': _params.batch_id
    };

    const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'updateBatch');

    const parameters = {
      options: {
        url: '/v1/batches/{batch_id}',
        method: 'PUT',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

}

CompareComplyV1.prototype.name = 'compare-comply';
CompareComplyV1.prototype.serviceVersion = 'v1';

/*************************
 * interfaces
 ************************/

namespace CompareComplyV1 {

  /** Options for the `CompareComplyV1` constructor. */
  export type Options = {
    version: string;
    url?: string;
    iam_access_token?: string;
    iam_apikey?: string;
    iam_url?: string;
    iam_client_id?: string;
    iam_client_secret?: string;
    icp4d_access_token?: string;
    icp4d_url?: string;
    username?: string;
    password?: string;
    token?: string;
    authentication_type?: string;
    disable_ssl_verification?: boolean;
    use_unauthenticated?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  export interface Response<T = any>  {
    result: T;
    data: T; // for compatibility
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, body?: T, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `convertToHtml` operation. */
  export interface ConvertToHtmlParams {
    /** The document to convert. */
    file: NodeJS.ReadableStream|FileObject|Buffer;
    /** The filename for file. */
    filename: string;
    /** The content type of file. */
    file_content_type?: ConvertToHtmlConstants.FileContentType | string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    model?: ConvertToHtmlConstants.Model | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `convertToHtml` operation. */
  export namespace ConvertToHtmlConstants {
    /** The content type of file. */
    export enum FileContentType {
      APPLICATION_PDF = 'application/pdf',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      IMAGE_BMP = 'image/bmp',
      IMAGE_GIF = 'image/gif',
      IMAGE_JPEG = 'image/jpeg',
      IMAGE_PNG = 'image/png',
      IMAGE_TIFF = 'image/tiff',
      TEXT_PLAIN = 'text/plain',
    }
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    export enum Model {
      CONTRACTS = 'contracts',
      TABLES = 'tables',
    }
  }

  /** Parameters for the `classifyElements` operation. */
  export interface ClassifyElementsParams {
    /** The document to classify. */
    file: NodeJS.ReadableStream|FileObject|Buffer;
    /** The content type of file. */
    file_content_type?: ClassifyElementsConstants.FileContentType | string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    model?: ClassifyElementsConstants.Model | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `classifyElements` operation. */
  export namespace ClassifyElementsConstants {
    /** The content type of file. */
    export enum FileContentType {
      APPLICATION_PDF = 'application/pdf',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      IMAGE_BMP = 'image/bmp',
      IMAGE_GIF = 'image/gif',
      IMAGE_JPEG = 'image/jpeg',
      IMAGE_PNG = 'image/png',
      IMAGE_TIFF = 'image/tiff',
    }
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    export enum Model {
      CONTRACTS = 'contracts',
      TABLES = 'tables',
    }
  }

  /** Parameters for the `extractTables` operation. */
  export interface ExtractTablesParams {
    /** The document on which to run table extraction. */
    file: NodeJS.ReadableStream|FileObject|Buffer;
    /** The content type of file. */
    file_content_type?: ExtractTablesConstants.FileContentType | string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    model?: ExtractTablesConstants.Model | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `extractTables` operation. */
  export namespace ExtractTablesConstants {
    /** The content type of file. */
    export enum FileContentType {
      APPLICATION_PDF = 'application/pdf',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      IMAGE_BMP = 'image/bmp',
      IMAGE_GIF = 'image/gif',
      IMAGE_JPEG = 'image/jpeg',
      IMAGE_PNG = 'image/png',
      IMAGE_TIFF = 'image/tiff',
      TEXT_PLAIN = 'text/plain',
    }
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    export enum Model {
      CONTRACTS = 'contracts',
      TABLES = 'tables',
    }
  }

  /** Parameters for the `compareDocuments` operation. */
  export interface CompareDocumentsParams {
    /** The first document to compare. */
    file_1: NodeJS.ReadableStream|FileObject|Buffer;
    /** The second document to compare. */
    file_2: NodeJS.ReadableStream|FileObject|Buffer;
    /** The content type of file_1. */
    file_1_content_type?: CompareDocumentsConstants.File1ContentType | string;
    /** The content type of file_2. */
    file_2_content_type?: CompareDocumentsConstants.File2ContentType | string;
    /** A text label for the first document. */
    file_1_label?: string;
    /** A text label for the second document. */
    file_2_label?: string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    model?: CompareDocumentsConstants.Model | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `compareDocuments` operation. */
  export namespace CompareDocumentsConstants {
    /** The content type of file_1. */
    export enum File1ContentType {
      APPLICATION_PDF = 'application/pdf',
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      IMAGE_BMP = 'image/bmp',
      IMAGE_GIF = 'image/gif',
      IMAGE_JPEG = 'image/jpeg',
      IMAGE_PNG = 'image/png',
      IMAGE_TIFF = 'image/tiff',
    }
    /** The content type of file_2. */
    export enum File2ContentType {
      APPLICATION_PDF = 'application/pdf',
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      IMAGE_BMP = 'image/bmp',
      IMAGE_GIF = 'image/gif',
      IMAGE_JPEG = 'image/jpeg',
      IMAGE_PNG = 'image/png',
      IMAGE_TIFF = 'image/tiff',
    }
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    export enum Model {
      CONTRACTS = 'contracts',
      TABLES = 'tables',
    }
  }

  /** Parameters for the `addFeedback` operation. */
  export interface AddFeedbackParams {
    /** Feedback data for submission. */
    feedback_data: FeedbackDataInput;
    /** An optional string identifying the user. */
    user_id?: string;
    /** An optional comment on or description of the feedback. */
    comment?: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteFeedback` operation. */
  export interface DeleteFeedbackParams {
    /** A string that specifies the feedback entry to be deleted from the document. */
    feedback_id: string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    model?: DeleteFeedbackConstants.Model | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `deleteFeedback` operation. */
  export namespace DeleteFeedbackConstants {
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    export enum Model {
      CONTRACTS = 'contracts',
      TABLES = 'tables',
    }
  }

  /** Parameters for the `getFeedback` operation. */
  export interface GetFeedbackParams {
    /** A string that specifies the feedback entry to be included in the output. */
    feedback_id: string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    model?: GetFeedbackConstants.Model | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `getFeedback` operation. */
  export namespace GetFeedbackConstants {
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    export enum Model {
      CONTRACTS = 'contracts',
      TABLES = 'tables',
    }
  }

  /** Parameters for the `listFeedback` operation. */
  export interface ListFeedbackParams {
    /** An optional string that filters the output to include only feedback with the specified feedback type. The only permitted value is `element_classification`. */
    feedback_type?: string;
    /** An optional string in the format `YYYY-MM-DD` that filters the output to include only feedback that was added before the specified date. */
    before?: string;
    /** An optional string in the format `YYYY-MM-DD` that filters the output to include only feedback that was added after the specified date. */
    after?: string;
    /** An optional string that filters the output to include only feedback from the document with the specified `document_title`. */
    document_title?: string;
    /** An optional string that filters the output to include only feedback with the specified `model_id`. The only permitted value is `contracts`. */
    model_id?: string;
    /** An optional string that filters the output to include only feedback with the specified `model_version`. */
    model_version?: string;
    /** An optional string in the form of a comma-separated list of categories. If this is specified, the service filters the output to include only feedback that has at least one category from the list removed. */
    category_removed?: string;
    /** An optional string in the form of a comma-separated list of categories. If this is specified, the service filters the output to include only feedback that has at least one category from the list added. */
    category_added?: string;
    /** An optional string in the form of a comma-separated list of categories. If this is specified, the service filters the output to include only feedback that has at least one category from the list unchanged. */
    category_not_changed?: string;
    /** An optional string of comma-separated `nature`:`party` pairs. If this is specified, the service filters the output to include only feedback that has at least one `nature`:`party` pair from the list removed. */
    type_removed?: string;
    /** An optional string of comma-separated `nature`:`party` pairs. If this is specified, the service filters the output to include only feedback that has at least one `nature`:`party` pair from the list removed. */
    type_added?: string;
    /** An optional string of comma-separated `nature`:`party` pairs. If this is specified, the service filters the output to include only feedback that has at least one `nature`:`party` pair from the list unchanged. */
    type_not_changed?: string;
    /** An optional integer specifying the number of documents that you want the service to return. */
    page_limit?: number;
    /** An optional string that returns the set of documents after the previous set. Use this parameter with the `page_limit` parameter. */
    cursor?: string;
    /** An optional comma-separated list of fields in the document to sort on. You can optionally specify the sort direction by prefixing the value of the field with `-` for descending order or `+` for ascending order (the default). Currently permitted sorting fields are `created`, `user_id`, and `document_title`. */
    sort?: string;
    /** An optional boolean value. If specified as `true`, the `pagination` object in the output includes a value called `total` that gives the total count of feedback created. */
    include_total?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `createBatch` operation. */
  export interface CreateBatchParams {
    /** The Compare and Comply method to run across the submitted input documents. */
    _function: CreateBatchConstants.Function | string;
    /** A JSON file containing the input Cloud Object Storage credentials. At a minimum, the credentials must enable `READ` permissions on the bucket defined by the `input_bucket_name` parameter. */
    input_credentials_file: NodeJS.ReadableStream|FileObject|Buffer;
    /** The geographical location of the Cloud Object Storage input bucket as listed on the **Endpoint** tab of your Cloud Object Storage instance; for example, `us-geo`, `eu-geo`, or `ap-geo`. */
    input_bucket_location: string;
    /** The name of the Cloud Object Storage input bucket. */
    input_bucket_name: string;
    /** A JSON file that lists the Cloud Object Storage output credentials. At a minimum, the credentials must enable `READ` and `WRITE` permissions on the bucket defined by the `output_bucket_name` parameter. */
    output_credentials_file: NodeJS.ReadableStream|FileObject|Buffer;
    /** The geographical location of the Cloud Object Storage output bucket as listed on the **Endpoint** tab of your Cloud Object Storage instance; for example, `us-geo`, `eu-geo`, or `ap-geo`. */
    output_bucket_location: string;
    /** The name of the Cloud Object Storage output bucket. */
    output_bucket_name: string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    model?: CreateBatchConstants.Model | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `createBatch` operation. */
  export namespace CreateBatchConstants {
    /** The Compare and Comply method to run across the submitted input documents. */
    export enum Function {
      HTML_CONVERSION = 'html_conversion',
      ELEMENT_CLASSIFICATION = 'element_classification',
      TABLES = 'tables',
    }
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    export enum Model {
      CONTRACTS = 'contracts',
      TABLES = 'tables',
    }
  }

  /** Parameters for the `getBatch` operation. */
  export interface GetBatchParams {
    /** The ID of the batch-processing job whose information you want to retrieve. */
    batch_id: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listBatches` operation. */
  export interface ListBatchesParams {
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `updateBatch` operation. */
  export interface UpdateBatchParams {
    /** The ID of the batch-processing job you want to update. */
    batch_id: string;
    /** The action you want to perform on the specified batch-processing job. */
    action: UpdateBatchConstants.Action | string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    model?: UpdateBatchConstants.Model | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `updateBatch` operation. */
  export namespace UpdateBatchConstants {
    /** The action you want to perform on the specified batch-processing job. */
    export enum Action {
      RESCAN = 'rescan',
      CANCEL = 'cancel',
    }
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    export enum Model {
      CONTRACTS = 'contracts',
      TABLES = 'tables',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** A party's address. */
  export interface Address {
    /** A string listing the address. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
  }

  /** AlignedElement. */
  export interface AlignedElement {
    /** Identifies two elements that semantically align between the compared documents. */
    element_pair?: ElementPair[];
    /** Specifies whether the aligned element is identical. Elements are considered identical despite minor differences such as leading punctuation, end-of-sentence punctuation, whitespace, the presence or absence of definite or indefinite articles, and others. */
    identical_text?: boolean;
    /** One or more hashed values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
    /** Indicates that the elements aligned are contractual clauses of significance. */
    significant_elements?: boolean;
  }

  /** List of document attributes. */
  export interface Attribute {
    /** The type of attribute. */
    type?: string;
    /** The text associated with the attribute. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
  }

  /** The batch-request status. */
  export interface BatchStatus {
    /** The method to be run against the documents. Possible values are `html_conversion`, `element_classification`, and `tables`. */
    _function?: string;
    /** The geographical location of the Cloud Object Storage input bucket as listed on the **Endpoint** tab of your COS instance; for example, `us-geo`, `eu-geo`, or `ap-geo`. */
    input_bucket_location?: string;
    /** The name of the Cloud Object Storage input bucket. */
    input_bucket_name?: string;
    /** The geographical location of the Cloud Object Storage output bucket as listed on the **Endpoint** tab of your COS instance; for example, `us-geo`, `eu-geo`, or `ap-geo`. */
    output_bucket_location?: string;
    /** The name of the Cloud Object Storage output bucket. */
    output_bucket_name?: string;
    /** The unique identifier for the batch request. */
    batch_id?: string;
    /** Document counts. */
    document_counts?: DocCounts;
    /** The status of the batch request. */
    status?: string;
    /** The creation time of the batch request. */
    created?: string;
    /** The time of the most recent update to the batch request. */
    updated?: string;
  }

  /** The results of a successful **List Batches** request. */
  export interface Batches {
    /** A list of the status of all batch requests. */
    batches?: BatchStatus[];
  }

  /** Cells that are not table header, column header, or row header cells. */
  export interface BodyCells {
    /** The unique ID of the cell in the current table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** The textual contents of this cell from the input document without associated markup content. */
    text?: string;
    /** The `begin` index of this cell's `row` location in the current table. */
    row_index_begin?: number;
    /** The `end` index of this cell's `row` location in the current table. */
    row_index_end?: number;
    /** The `begin` index of this cell's `column` location in the current table. */
    column_index_begin?: number;
    /** The `end` index of this cell's `column` location in the current table. */
    column_index_end?: number;
    row_header_ids?: RowHeaderIds[];
    row_header_texts?: RowHeaderTexts[];
    row_header_texts_normalized?: RowHeaderTextsNormalized[];
    column_header_ids?: ColumnHeaderIds[];
    column_header_texts?: ColumnHeaderTexts[];
    column_header_texts_normalized?: ColumnHeaderTextsNormalized[];
    attributes?: Attribute[];
  }

  /** Information defining an element's subject matter. */
  export interface Category {
    /** The category of the associated element. */
    label?: string;
    /** One or more hashed values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
  }

  /** Information defining an element's subject matter. */
  export interface CategoryComparison {
    /** The category of the associated element. */
    label?: string;
  }

  /** The analysis of objects returned by the **Element classification** method. */
  export interface ClassifyReturn {
    /** Basic information about the input document. */
    document?: Document;
    /** The analysis model used to classify the input document. For the **Element classification** method, the only valid value is `contracts`. */
    model_id?: string;
    /** The version of the analysis model identified by the value of the `model_id` key. */
    model_version?: string;
    /** Document elements identified by the service. */
    elements?: Element[];
    /** Definition of tables identified in the input document. */
    tables?: Tables[];
    /** The structure of the input document. */
    document_structure?: DocStructure;
    /** Definitions of the parties identified in the input document. */
    parties?: Parties[];
    /** The date or dates on which the document becomes effective. */
    effective_dates?: EffectiveDates[];
    /** The monetary amounts that identify the total amount of the contract that needs to be paid from one party to another. */
    contract_amounts?: ContractAmts[];
    /** The date or dates on which the document is to be terminated. */
    termination_dates?: TerminationDates[];
    /** The document's contract type or types as declared in the document. */
    contract_type?: ContractType[];
  }

  /** An array of values, each being the `id` value of a column header that is applicable to the current cell. */
  export interface ColumnHeaderIds {
    /** The `id` value of a column header. */
    id?: string;
  }

  /** An array of values, each being the `text` value of a column header that is applicable to the current cell. */
  export interface ColumnHeaderTexts {
    /** The `text` value of a column header. */
    text?: string;
  }

  /** If you provide customization input, the normalized version of the column header texts according to the customization; otherwise, the same value as `column_header_texts`. */
  export interface ColumnHeaderTextsNormalized {
    /** The normalized version of a column header text. */
    text_normalized?: string;
  }

  /** Column-level cells, each applicable as a header to other cells in the same column as itself, of the current table. */
  export interface ColumnHeaders {
    /** The unique ID of the cell in the current table. */
    cell_id?: string;
    /** The location of the column header cell in the current table as defined by its `begin` and `end` offsets, respectfully, in the input document. */
    location?: JsonObject;
    /** The textual contents of this cell from the input document without associated markup content. */
    text?: string;
    /** If you provide customization input, the normalized version of the cell text according to the customization; otherwise, the same value as `text`. */
    text_normalized?: string;
    /** The `begin` index of this cell's `row` location in the current table. */
    row_index_begin?: number;
    /** The `end` index of this cell's `row` location in the current table. */
    row_index_end?: number;
    /** The `begin` index of this cell's `column` location in the current table. */
    column_index_begin?: number;
    /** The `end` index of this cell's `column` location in the current table. */
    column_index_end?: number;
  }

  /** The comparison of the two submitted documents. */
  export interface CompareReturn {
    /** The analysis model used to compare the input documents. For the **Compare two documents** method, the only valid value is `contracts`. */
    model_id?: string;
    /** The version of the analysis model identified by the value of the `model_id` key. */
    model_version?: string;
    /** Information about the documents being compared. */
    documents?: Document[];
    /** A list of pairs of elements that semantically align between the compared documents. */
    aligned_elements?: AlignedElement[];
    /** A list of elements that do not semantically align between the compared documents. */
    unaligned_elements?: UnalignedElement[];
  }

  /** A contact. */
  export interface Contact {
    /** A string listing the name of the contact. */
    name?: string;
    /** A string listing the role of the contact. */
    role?: string;
  }

  /** A monetary amount identified in the input document. */
  export interface ContractAmts {
    /** The monetary amount. */
    text?: string;
    /** The confidence level in the identification of the contract amount. */
    confidence_level?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
  }

  /** The contract type identified in the input document. */
  export interface ContractType {
    /** The contract type. */
    text?: string;
    /** The confidence level in the identification of the termination date. */
    confidence_level?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
  }

  /** Document counts. */
  export interface DocCounts {
    /** Total number of documents. */
    total?: number;
    /** Number of pending documents. */
    pending?: number;
    /** Number of documents successfully processed. */
    successful?: number;
    /** Number of documents not successfully processed. */
    failed?: number;
  }

  /** Information about the parsed input document. */
  export interface DocInfo {
    /** The full text of the parsed document in HTML format. */
    html?: string;
    /** The title of the parsed document. If the service did not detect a title, the value of this element is `null`. */
    title?: string;
    /** The MD5 hash of the input document. */
    hash?: string;
  }

  /** The structure of the input document. */
  export interface DocStructure {
    /** An array containing one object per section or subsection identified in the input document. */
    section_titles?: SectionTitles[];
    /** An array containing one object per section or subsection, in parallel with the `section_titles` array, that details the leading sentences in the corresponding section or subsection. */
    leading_sentences?: LeadingSentence[];
  }

  /** Basic information about the input document. */
  export interface Document {
    /** Document title, if detected. */
    title?: string;
    /** The input document converted into HTML format. */
    html?: string;
    /** The MD5 hash value of the input document. */
    hash?: string;
    /** The label applied to the input document with the calling method's `file_1_label` or `file_2_label` value. This field is specified only in the output of the **Comparing two documents** method. */
    label?: string;
  }

  /** An effective date. */
  export interface EffectiveDates {
    /** The effective date, listed as a string. */
    text?: string;
    /** The confidence level in the identification of the effective date. */
    confidence_level?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
  }

  /** A component part of the document. */
  export interface Element {
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** The text of the element. */
    text?: string;
    /** Description of the action specified by the element  and whom it affects. */
    types?: TypeLabel[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the element. */
    categories?: Category[];
    /** List of document attributes. */
    attributes?: Attribute[];
  }

  /** A list of `begin` and `end` indexes that indicate the locations of the elements in the input document. */
  export interface ElementLocations {
    /** An integer that indicates the starting position of the element in the input document. */
    begin?: number;
    /** An integer that indicates the ending position of the element in the input document. */
    end?: number;
  }

  /** Details of semantically aligned elements. */
  export interface ElementPair {
    /** The label of the document (that is, the value of either the `file_1_label` or `file_2_label` parameters) in which the element occurs. */
    document_label?: string;
    /** The contents of the element. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** Description of the action specified by the element and whom it affects. */
    types?: TypeLabelComparison[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the element. */
    categories?: CategoryComparison[];
    /** List of document attributes. */
    attributes?: Attribute[];
  }

  /** Feedback data for submission. */
  export interface FeedbackDataInput {
    /** The type of feedback. The only permitted value is `element_classification`. */
    feedback_type: string;
    /** Brief information about the input document. */
    document?: ShortDoc;
    /** An optional string identifying the model ID. The only permitted value is `contracts`. */
    model_id?: string;
    /** An optional string identifying the version of the model used. */
    model_version?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location: Location;
    /** The text on which to submit feedback. */
    text: string;
    /** The original labeling from the input document, without the submitted feedback. */
    original_labels: OriginalLabelsIn;
    /** The updated labeling from the input document, accounting for the submitted feedback. */
    updated_labels: UpdatedLabelsIn;
  }

  /** Information returned from the **Add Feedback** method. */
  export interface FeedbackDataOutput {
    /** A string identifying the user adding the feedback. The only permitted value is `element_classification`. */
    feedback_type?: string;
    /** Brief information about the input document. */
    document?: ShortDoc;
    /** An optional string identifying the model ID. The only permitted value is `contracts`. */
    model_id?: string;
    /** An optional string identifying the version of the model used. */
    model_version?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** The text to which the feedback applies. */
    text?: string;
    /** The original labeling from the input document, without the submitted feedback. */
    original_labels?: OriginalLabelsOut;
    /** The updated labeling from the input document, accounting for the submitted feedback. */
    updated_labels?: UpdatedLabelsOut;
    /** Pagination details, if required by the length of the output. */
    pagination?: Pagination;
  }

  /** The status and message of the deletion request. */
  export interface FeedbackDeleted {
    /** HTTP return code. */
    status?: number;
    /** Status message returned from the service. */
    message?: string;
  }

  /** The results of a successful **List Feedback** request for all feedback. */
  export interface FeedbackList {
    /** A list of all feedback for the document. */
    feedback?: GetFeedback[];
  }

  /** Information about the document and the submitted feedback. */
  export interface FeedbackReturn {
    /** The unique ID of the feedback object. */
    feedback_id?: string;
    /** An optional string identifying the person submitting feedback. */
    user_id?: string;
    /** An optional comment from the person submitting the feedback. */
    comment?: string;
    /** Timestamp listing the creation time of the feedback submission. */
    created?: string;
    /** Information returned from the **Add Feedback** method. */
    feedback_data?: FeedbackDataOutput;
  }

  /** The results of a successful **Get Feedback** request for a single feedback entry. */
  export interface GetFeedback {
    /** A string uniquely identifying the feedback entry. */
    feedback_id?: string;
    /** A timestamp identifying the creation time of the feedback entry. */
    created?: string;
    /** A string containing the user's comment about the feedback entry. */
    comment?: string;
    /** Information returned from the **Add Feedback** method. */
    feedback_data?: FeedbackDataOutput;
  }

  /** The HTML converted from an input document. */
  export interface HTMLReturn {
    /** The number of pages in the input document. */
    num_pages?: string;
    /** The author of the input document, if identified. */
    author?: string;
    /** The publication date of the input document, if identified. */
    publication_date?: string;
    /** The title of the input document, if identified. */
    title?: string;
    /** The HTML version of the input document. */
    html?: string;
  }

  /** A key in a key-value pair. */
  export interface Key {
    /** The unique ID of the key in the table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** The text content of the table cell without HTML markup. */
    text?: string;
  }

  /** Key-value pairs detected across cell boundaries. */
  export interface KeyValuePair {
    /** A key in a key-value pair. */
    key?: Key;
    /** A value in a key-value pair. */
    value?: Value;
  }

  /** A pair of `nature` and `party` objects. The `nature` object identifies the effect of the element on the identified `party`, and the `party` object identifies the affected party. */
  export interface Label {
    /** The identified `nature` of the element. */
    nature: string;
    /** The identified `party` of the element. */
    party: string;
  }

  /** The leading sentences in a section or subsection of the input document. */
  export interface LeadingSentence {
    /** The text of the leading sentence. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** An array of `location` objects that lists the locations of detected leading sentences. */
    element_locations?: ElementLocations[];
  }

  /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
  export interface Location {
    /** The element's `begin` index. */
    begin: number;
    /** The element's `end` index. */
    end: number;
  }

  /** The original labeling from the input document, without the submitted feedback. */
  export interface OriginalLabelsIn {
    /** Description of the action specified by the element and whom it affects. */
    types: TypeLabel[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the element. */
    categories: Category[];
  }

  /** The original labeling from the input document, without the submitted feedback. */
  export interface OriginalLabelsOut {
    /** Description of the action specified by the element and whom it affects. */
    types?: TypeLabel[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the element. */
    categories?: Category[];
    /** A string identifying the type of modification the feedback entry in the `updated_labels` array. Possible values are `added`, `not_changed`, and `removed`. */
    modification?: string;
  }

  /** Pagination details, if required by the length of the output. */
  export interface Pagination {
    /** A token identifying the current page of results. */
    refresh_cursor?: string;
    /** A token identifying the next page of results. */
    next_cursor?: string;
    /** The URL that returns the current page of results. */
    refresh_url?: string;
    /** The URL that returns the next page of results. */
    next_url?: string;
    /** Reserved for future use. */
    total?: number;
  }

  /** A party and its corresponding role, including address and contact information if identified. */
  export interface Parties {
    /** A string identifying the party. */
    party?: string;
    /** A string that identifies the importance of the party. */
    importance?: string;
    /** A string identifying the party's role. */
    role?: string;
    /** List of the party's address or addresses. */
    addresses?: Address[];
    /** List of the names and roles of contacts identified in the input document. */
    contacts?: Contact[];
  }

  /** An array of values, each being the `id` value of a row header that is applicable to this body cell. */
  export interface RowHeaderIds {
    /** The `id` values of a row header. */
    id?: string;
  }

  /** An array of values, each being the `text` value of a row header that is applicable to this body cell. */
  export interface RowHeaderTexts {
    /** The `text` value of a row header. */
    text?: string;
  }

  /** If you provide customization input, the normalized version of the row header texts according to the customization; otherwise, the same value as `row_header_texts`. */
  export interface RowHeaderTextsNormalized {
    /** The normalized version of a row header text. */
    text_normalized?: string;
  }

  /** Row-level cells, each applicable as a header to other cells in the same row as itself, of the current table. */
  export interface RowHeaders {
    /** The unique ID of the cell in the current table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** The textual contents of this cell from the input document without associated markup content. */
    text?: string;
    /** If you provide customization input, the normalized version of the cell text according to the customization; otherwise, the same value as `text`. */
    text_normalized?: string;
    /** The `begin` index of this cell's `row` location in the current table. */
    row_index_begin?: number;
    /** The `end` index of this cell's `row` location in the current table. */
    row_index_end?: number;
    /** The `begin` index of this cell's `column` location in the current table. */
    column_index_begin?: number;
    /** The `end` index of this cell's `column` location in the current table. */
    column_index_end?: number;
  }

  /** The table's section title, if identified. */
  export interface SectionTitle {
    /** The text of the section title, if identified. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
  }

  /** An array containing one object per section or subsection detected in the input document. Sections and subsections are not nested; instead, they are flattened out and can be placed back in order by using the `begin` and `end` values of the element and the `level` value of the section. */
  export interface SectionTitles {
    /** The text of the section title, if identified. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** An integer indicating the level at which the section is located in the input document. For example, `1` represents a top-level section, `2` represents a subsection within the level `1` section, and so forth. */
    level?: number;
    /** An array of `location` objects that lists the locations of detected section titles. */
    element_locations?: ElementLocations[];
  }

  /** Brief information about the input document. */
  export interface ShortDoc {
    /** The title of the input document, if identified. */
    title?: string;
    /** The MD5 hash of the input document. */
    hash?: string;
  }

  /** The contents of the current table's header. */
  export interface TableHeaders {
    /** The unique ID of the cell in the current table. */
    cell_id?: string;
    /** The location of the table header cell in the current table as defined by its `begin` and `end` offsets, respectfully, in the input document. */
    location?: JsonObject;
    /** The textual contents of the cell from the input document without associated markup content. */
    text?: string;
    /** The `begin` index of this cell's `row` location in the current table. */
    row_index_begin?: number;
    /** The `end` index of this cell's `row` location in the current table. */
    row_index_end?: number;
    /** The `begin` index of this cell's `column` location in the current table. */
    column_index_begin?: number;
    /** The `end` index of this cell's `column` location in the current table. */
    column_index_end?: number;
  }

  /** The analysis of the document's tables. */
  export interface TableReturn {
    /** Information about the parsed input document. */
    document?: DocInfo;
    /** The ID of the model used to extract the table contents. The value for table extraction is `tables`. */
    model_id?: string;
    /** The version of the `tables` model ID. */
    model_version?: string;
    /** Definitions of the tables identified in the input document. */
    tables?: Tables[];
  }

  /** The contents of the tables extracted from a document. */
  export interface Tables {
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** The textual contents of the current table from the input document without associated markup content. */
    text?: string;
    /** The table's section title, if identified. */
    section_title?: SectionTitle;
    /** An array of table-level cells that apply as headers to all the other cells in the current table. */
    table_headers?: TableHeaders[];
    /** An array of row-level cells, each applicable as a header to other cells in the same row as itself, of the current table. */
    row_headers?: RowHeaders[];
    /** An array of column-level cells, each applicable as a header to other cells in the same column as itself, of the current table. */
    column_headers?: ColumnHeaders[];
    /** An array of key-value pairs identified in the current table. */
    key_value_pairs?: KeyValuePair[];
    /** An array of cells that are neither table header nor column header nor row header cells, of the current table with corresponding row and column header associations. */
    body_cells?: BodyCells[];
  }

  /** Termination dates identified in the input document. */
  export interface TerminationDates {
    /** The termination date. */
    text?: string;
    /** The confidence level in the identification of the termination date. */
    confidence_level?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
  }

  /** Identification of a specific type. */
  export interface TypeLabel {
    /** A pair of `nature` and `party` objects. The `nature` object identifies the effect of the element on the identified `party`, and the `party` object identifies the affected party. */
    label?: Label;
    /** One or more hash values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
  }

  /** Identification of a specific type. */
  export interface TypeLabelComparison {
    /** A pair of `nature` and `party` objects. The `nature` object identifies the effect of the element on the identified `party`, and the `party` object identifies the affected party. */
    label?: Label;
  }

  /** Element that does not align semantically between two compared documents. */
  export interface UnalignedElement {
    /** The label assigned to the document by the value of the `file_1_label` or `file_2_label` parameters on the **Compare two documents** method. */
    document_label?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** The text of the element. */
    text?: string;
    /** Description of the action specified by the element and whom it affects. */
    types?: TypeLabelComparison[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the element. */
    categories?: CategoryComparison[];
    /** List of document attributes. */
    attributes?: Attribute[];
  }

  /** The updated labeling from the input document, accounting for the submitted feedback. */
  export interface UpdatedLabelsIn {
    /** Description of the action specified by the element and whom it affects. */
    types: TypeLabel[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the element. */
    categories: Category[];
  }

  /** The updated labeling from the input document, accounting for the submitted feedback. */
  export interface UpdatedLabelsOut {
    /** Description of the action specified by the element and whom it affects. */
    types?: TypeLabel[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the element. */
    categories?: Category[];
    /** The type of modification the feedback entry in the `updated_labels` array. Possible values are `added`, `not_changed`, and `removed`. */
    modification?: string;
  }

  /** A value in a key-value pair. */
  export interface Value {
    /** The unique ID of the value in the table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
    location?: Location;
    /** The text content of the table cell without HTML markup. */
    text?: string;
  }

}

export = CompareComplyV1;
