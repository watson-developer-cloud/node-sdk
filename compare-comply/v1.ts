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
 * IBM Watson&trade; Compare and Comply analyzes governing documents to provide details about critical aspects of the
 * documents.
 */

class CompareComplyV1 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/compare-comply/api';
  name: string; // set by prototype to 'compare-comply'
  serviceVersion: string; // set by prototype to 'v1'

  /**
   * Construct a CompareComplyV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever
   * the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses
   * the API version for the date you specify, or the most recent version before that date. Note that you should not
   * programmatically specify the current date at runtime, in case the API has been updated since your application's
   * release. Instead, specify a version date that is compatible with your application, and don't change it until your
   * application is ready for a later version.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/compare-comply/api'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {CompareComplyV1}
   * @throws {Error}
   */
  constructor(options: UserOptions) {
    // If the caller didn't supply an authenticator, construct one from external configuration.
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment('compare-comply');
    }
    super(options);
    // check if 'version' was provided
    if (typeof this.baseOptions.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this.baseOptions.qs.version = options.version;
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
   * @param {NodeJS.ReadableStream|Buffer} params.file - The document to convert.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public convertToHtml(params: CompareComplyV1.ConvertToHtmlParams, callback?: CompareComplyV1.Callback<CompareComplyV1.HTMLReturn>): Promise<CompareComplyV1.Response<CompareComplyV1.HTMLReturn>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['file'];

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
          contentType: _params.fileContentType
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

  /*************************
   * elementClassification
   ************************/

  /**
   * Classify the elements of a document.
   *
   * Analyzes the structural and semantic elements of a document.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|Buffer} params.file - The document to classify.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public classifyElements(params: CompareComplyV1.ClassifyElementsParams, callback?: CompareComplyV1.Callback<CompareComplyV1.ClassifyReturn>): Promise<CompareComplyV1.Response<CompareComplyV1.ClassifyReturn>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['file'];

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
          contentType: _params.fileContentType
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

  /*************************
   * tables
   ************************/

  /**
   * Extract a document's tables.
   *
   * Analyzes the tables in a document.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|Buffer} params.file - The document on which to run table extraction.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public extractTables(params: CompareComplyV1.ExtractTablesParams, callback?: CompareComplyV1.Callback<CompareComplyV1.TableReturn>): Promise<CompareComplyV1.Response<CompareComplyV1.TableReturn>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['file'];

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
          contentType: _params.fileContentType
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

  /*************************
   * comparison
   ************************/

  /**
   * Compare two documents.
   *
   * Compares two input documents. Documents must be in the same format.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|Buffer} params.file1 - The first document to compare.
   * @param {NodeJS.ReadableStream|Buffer} params.file2 - The second document to compare.
   * @param {string} [params.file1ContentType] - The content type of file1.
   * @param {string} [params.file2ContentType] - The content type of file2.
   * @param {string} [params.file1Label] - A text label for the first document.
   * @param {string} [params.file2Label] - A text label for the second document.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public compareDocuments(params: CompareComplyV1.CompareDocumentsParams, callback?: CompareComplyV1.Callback<CompareComplyV1.CompareReturn>): Promise<CompareComplyV1.Response<CompareComplyV1.CompareReturn>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['file1', 'file2'];

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
        'file_1': {
          data: _params.file1,
          contentType: _params.file1ContentType
        },
        'file_2': {
          data: _params.file2,
          contentType: _params.file2ContentType
        }
      };

      const query = {
        'file_1_label': _params.file1Label,
        'file_2_label': _params.file2Label,
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
   * @param {FeedbackDataInput} params.feedbackData - Feedback data for submission.
   * @param {string} [params.userId] - An optional string identifying the user.
   * @param {string} [params.comment] - An optional comment on or description of the feedback.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public addFeedback(params: CompareComplyV1.AddFeedbackParams, callback?: CompareComplyV1.Callback<CompareComplyV1.FeedbackReturn>): Promise<CompareComplyV1.Response<CompareComplyV1.FeedbackReturn>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['feedbackData'];

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
        'feedback_data': _params.feedbackData,
        'user_id': _params.userId,
        'comment': _params.comment
      };

      const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'addFeedback');

      const parameters = {
        options: {
          url: '/v1/feedback',
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

  /**
   * List the feedback in a document.
   *
   * Lists the feedback in a document.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.feedbackType] - An optional string that filters the output to include only feedback with
   * the specified feedback type. The only permitted value is `element_classification`.
   * @param {string} [params.before] - An optional string in the format `YYYY-MM-DD` that filters the output to include
   * only feedback that was added before the specified date.
   * @param {string} [params.after] - An optional string in the format `YYYY-MM-DD` that filters the output to include
   * only feedback that was added after the specified date.
   * @param {string} [params.documentTitle] - An optional string that filters the output to include only feedback from
   * the document with the specified `document_title`.
   * @param {string} [params.modelId] - An optional string that filters the output to include only feedback with the
   * specified `model_id`. The only permitted value is `contracts`.
   * @param {string} [params.modelVersion] - An optional string that filters the output to include only feedback with
   * the specified `model_version`.
   * @param {string} [params.categoryRemoved] - An optional string in the form of a comma-separated list of categories.
   * If it is specified, the service filters the output to include only feedback that has at least one category from the
   * list removed.
   * @param {string} [params.categoryAdded] - An optional string in the form of a comma-separated list of categories. If
   * this is specified, the service filters the output to include only feedback that has at least one category from the
   * list added.
   * @param {string} [params.categoryNotChanged] - An optional string in the form of a comma-separated list of
   * categories. If this is specified, the service filters the output to include only feedback that has at least one
   * category from the list unchanged.
   * @param {string} [params.typeRemoved] - An optional string of comma-separated `nature`:`party` pairs. If this is
   * specified, the service filters the output to include only feedback that has at least one `nature`:`party` pair from
   * the list removed.
   * @param {string} [params.typeAdded] - An optional string of comma-separated `nature`:`party` pairs. If this is
   * specified, the service filters the output to include only feedback that has at least one `nature`:`party` pair from
   * the list removed.
   * @param {string} [params.typeNotChanged] - An optional string of comma-separated `nature`:`party` pairs. If this is
   * specified, the service filters the output to include only feedback that has at least one `nature`:`party` pair from
   * the list unchanged.
   * @param {number} [params.pageLimit] - An optional integer specifying the number of documents that you want the
   * service to return.
   * @param {string} [params.cursor] - An optional string that returns the set of documents after the previous set. Use
   * this parameter with the `page_limit` parameter.
   * @param {string} [params.sort] - An optional comma-separated list of fields in the document to sort on. You can
   * optionally specify the sort direction by prefixing the value of the field with `-` for descending order or `+` for
   * ascending order (the default). Currently permitted sorting fields are `created`, `user_id`, and `document_title`.
   * @param {boolean} [params.includeTotal] - An optional boolean value. If specified as `true`, the `pagination` object
   * in the output includes a value called `total` that gives the total count of feedback created.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listFeedback(params?: CompareComplyV1.ListFeedbackParams, callback?: CompareComplyV1.Callback<CompareComplyV1.FeedbackList>): Promise<CompareComplyV1.Response<CompareComplyV1.FeedbackList>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {

      const query = {
        'feedback_type': _params.feedbackType,
        'before': _params.before,
        'after': _params.after,
        'document_title': _params.documentTitle,
        'model_id': _params.modelId,
        'model_version': _params.modelVersion,
        'category_removed': _params.categoryRemoved,
        'category_added': _params.categoryAdded,
        'category_not_changed': _params.categoryNotChanged,
        'type_removed': _params.typeRemoved,
        'type_added': _params.typeAdded,
        'type_not_changed': _params.typeNotChanged,
        'page_limit': _params.pageLimit,
        'cursor': _params.cursor,
        'sort': _params.sort,
        'include_total': _params.includeTotal
      };

      const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'listFeedback');

      const parameters = {
        options: {
          url: '/v1/feedback',
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
   * Get a specified feedback entry.
   *
   * Gets a feedback entry with a specified `feedback_id`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.feedbackId - A string that specifies the feedback entry to be included in the output.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getFeedback(params: CompareComplyV1.GetFeedbackParams, callback?: CompareComplyV1.Callback<CompareComplyV1.GetFeedback>): Promise<CompareComplyV1.Response<CompareComplyV1.GetFeedback>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['feedbackId'];

    return new Promise((resolve, reject) => {

      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
        'model': _params.model
      };

      const path = {
        'feedback_id': _params.feedbackId
      };

      const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'getFeedback');

      const parameters = {
        options: {
          url: '/v1/feedback/{feedback_id}',
          method: 'GET',
          qs: query,
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
   * Delete a specified feedback entry.
   *
   * Deletes a feedback entry with a specified `feedback_id`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.feedbackId - A string that specifies the feedback entry to be deleted from the document.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteFeedback(params: CompareComplyV1.DeleteFeedbackParams, callback?: CompareComplyV1.Callback<CompareComplyV1.FeedbackDeleted>): Promise<CompareComplyV1.Response<CompareComplyV1.FeedbackDeleted>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['feedbackId'];

    return new Promise((resolve, reject) => {

      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
        'model': _params.model
      };

      const path = {
        'feedback_id': _params.feedbackId
      };

      const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'deleteFeedback');

      const parameters = {
        options: {
          url: '/v1/feedback/{feedback_id}',
          method: 'DELETE',
          qs: query,
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
   * @param {NodeJS.ReadableStream|Buffer} params.inputCredentialsFile - A JSON file containing the input Cloud Object
   * Storage credentials. At a minimum, the credentials must enable `READ` permissions on the bucket defined by the
   * `input_bucket_name` parameter.
   * @param {string} params.inputBucketLocation - The geographical location of the Cloud Object Storage input bucket as
   * listed on the **Endpoint** tab of your Cloud Object Storage instance; for example, `us-geo`, `eu-geo`, or `ap-geo`.
   * @param {string} params.inputBucketName - The name of the Cloud Object Storage input bucket.
   * @param {NodeJS.ReadableStream|Buffer} params.outputCredentialsFile - A JSON file that lists the Cloud Object
   * Storage output credentials. At a minimum, the credentials must enable `READ` and `WRITE` permissions on the bucket
   * defined by the `output_bucket_name` parameter.
   * @param {string} params.outputBucketLocation - The geographical location of the Cloud Object Storage output bucket
   * as listed on the **Endpoint** tab of your Cloud Object Storage instance; for example, `us-geo`, `eu-geo`, or
   * `ap-geo`.
   * @param {string} params.outputBucketName - The name of the Cloud Object Storage output bucket.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createBatch(params: CompareComplyV1.CreateBatchParams, callback?: CompareComplyV1.Callback<CompareComplyV1.BatchStatus>): Promise<CompareComplyV1.Response<CompareComplyV1.BatchStatus>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['_function', 'inputCredentialsFile', 'inputBucketLocation', 'inputBucketName', 'outputCredentialsFile', 'outputBucketLocation', 'outputBucketName'];

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
        'input_credentials_file': {
          data: _params.inputCredentialsFile,
          contentType: 'application/json'
        },
        'input_bucket_location': _params.inputBucketLocation,
        'input_bucket_name': _params.inputBucketName,
        'output_credentials_file': {
          data: _params.outputCredentialsFile,
          contentType: 'application/json'
        },
        'output_bucket_location': _params.outputBucketLocation,
        'output_bucket_name': _params.outputBucketName
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
   * List submitted batch-processing jobs.
   *
   * Lists batch-processing jobs submitted by users.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listBatches(params?: CompareComplyV1.ListBatchesParams, callback?: CompareComplyV1.Callback<CompareComplyV1.Batches>): Promise<CompareComplyV1.Response<CompareComplyV1.Batches>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {

      const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'listBatches');

      const parameters = {
        options: {
          url: '/v1/batches',
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
   * Get information about a specific batch-processing job.
   *
   * Gets information about a batch-processing job with a specified ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.batchId - The ID of the batch-processing job whose information you want to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getBatch(params: CompareComplyV1.GetBatchParams, callback?: CompareComplyV1.Callback<CompareComplyV1.BatchStatus>): Promise<CompareComplyV1.Response<CompareComplyV1.BatchStatus>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['batchId'];

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
        'batch_id': _params.batchId
      };

      const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'getBatch');

      const parameters = {
        options: {
          url: '/v1/batches/{batch_id}',
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
   * Update a pending or active batch-processing job.
   *
   * Updates a pending or active batch-processing job. You can rescan the input bucket to check for new documents or
   * cancel a job.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.batchId - The ID of the batch-processing job you want to update.
   * @param {string} params.action - The action you want to perform on the specified batch-processing job.
   * @param {string} [params.model] - The analysis model to be used by the service. For the **Element classification**
   * and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default
   * is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing
   * requests.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateBatch(params: CompareComplyV1.UpdateBatchParams, callback?: CompareComplyV1.Callback<CompareComplyV1.BatchStatus>): Promise<CompareComplyV1.Response<CompareComplyV1.BatchStatus>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['batchId', 'action'];

    return new Promise((resolve, reject) => {

      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
        'action': _params.action,
        'model': _params.model
      };

      const path = {
        'batch_id': _params.batchId
      };

      const sdkHeaders = getSdkHeaders('compare-comply', 'v1', 'updateBatch');

      const parameters = {
        options: {
          url: '/v1/batches/{batch_id}',
          method: 'PUT',
          qs: query,
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

}

CompareComplyV1.prototype.name = 'compare-comply';
CompareComplyV1.prototype.serviceVersion = 'v1';

/*************************
 * interfaces
 ************************/

namespace CompareComplyV1 {

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

  /** Parameters for the `convertToHtml` operation. */
  export interface ConvertToHtmlParams {
    /** The document to convert. */
    file: NodeJS.ReadableStream|Buffer;
    /** The content type of file. */
    fileContentType?: ConvertToHtmlConstants.FileContentType | string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two
     *  documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`.
     *  These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests.
     */
    model?: ConvertToHtmlConstants.Model | string;
    headers?: OutgoingHttpHeaders;
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
    file: NodeJS.ReadableStream|Buffer;
    /** The content type of file. */
    fileContentType?: ClassifyElementsConstants.FileContentType | string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two
     *  documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`.
     *  These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests.
     */
    model?: ClassifyElementsConstants.Model | string;
    headers?: OutgoingHttpHeaders;
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
    file: NodeJS.ReadableStream|Buffer;
    /** The content type of file. */
    fileContentType?: ExtractTablesConstants.FileContentType | string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two
     *  documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`.
     *  These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests.
     */
    model?: ExtractTablesConstants.Model | string;
    headers?: OutgoingHttpHeaders;
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
    file1: NodeJS.ReadableStream|Buffer;
    /** The second document to compare. */
    file2: NodeJS.ReadableStream|Buffer;
    /** The content type of file1. */
    file1ContentType?: CompareDocumentsConstants.File1ContentType | string;
    /** The content type of file2. */
    file2ContentType?: CompareDocumentsConstants.File2ContentType | string;
    /** A text label for the first document. */
    file1Label?: string;
    /** A text label for the second document. */
    file2Label?: string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two
     *  documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`.
     *  These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests.
     */
    model?: CompareDocumentsConstants.Model | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `compareDocuments` operation. */
  export namespace CompareDocumentsConstants {
    /** The content type of file1. */
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
    /** The content type of file2. */
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
    feedbackData: FeedbackDataInput;
    /** An optional string identifying the user. */
    userId?: string;
    /** An optional comment on or description of the feedback. */
    comment?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listFeedback` operation. */
  export interface ListFeedbackParams {
    /** An optional string that filters the output to include only feedback with the specified feedback type. The
     *  only permitted value is `element_classification`.
     */
    feedbackType?: string;
    /** An optional string in the format `YYYY-MM-DD` that filters the output to include only feedback that was
     *  added before the specified date.
     */
    before?: string;
    /** An optional string in the format `YYYY-MM-DD` that filters the output to include only feedback that was
     *  added after the specified date.
     */
    after?: string;
    /** An optional string that filters the output to include only feedback from the document with the specified
     *  `document_title`.
     */
    documentTitle?: string;
    /** An optional string that filters the output to include only feedback with the specified `model_id`. The only
     *  permitted value is `contracts`.
     */
    modelId?: string;
    /** An optional string that filters the output to include only feedback with the specified `model_version`. */
    modelVersion?: string;
    /** An optional string in the form of a comma-separated list of categories. If it is specified, the service
     *  filters the output to include only feedback that has at least one category from the list removed.
     */
    categoryRemoved?: string;
    /** An optional string in the form of a comma-separated list of categories. If this is specified, the service
     *  filters the output to include only feedback that has at least one category from the list added.
     */
    categoryAdded?: string;
    /** An optional string in the form of a comma-separated list of categories. If this is specified, the service
     *  filters the output to include only feedback that has at least one category from the list unchanged.
     */
    categoryNotChanged?: string;
    /** An optional string of comma-separated `nature`:`party` pairs. If this is specified, the service filters the
     *  output to include only feedback that has at least one `nature`:`party` pair from the list removed.
     */
    typeRemoved?: string;
    /** An optional string of comma-separated `nature`:`party` pairs. If this is specified, the service filters the
     *  output to include only feedback that has at least one `nature`:`party` pair from the list removed.
     */
    typeAdded?: string;
    /** An optional string of comma-separated `nature`:`party` pairs. If this is specified, the service filters the
     *  output to include only feedback that has at least one `nature`:`party` pair from the list unchanged.
     */
    typeNotChanged?: string;
    /** An optional integer specifying the number of documents that you want the service to return. */
    pageLimit?: number;
    /** An optional string that returns the set of documents after the previous set. Use this parameter with the
     *  `page_limit` parameter.
     */
    cursor?: string;
    /** An optional comma-separated list of fields in the document to sort on. You can optionally specify the sort
     *  direction by prefixing the value of the field with `-` for descending order or `+` for ascending order (the
     *  default). Currently permitted sorting fields are `created`, `user_id`, and `document_title`.
     */
    sort?: string;
    /** An optional boolean value. If specified as `true`, the `pagination` object in the output includes a value
     *  called `total` that gives the total count of feedback created.
     */
    includeTotal?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getFeedback` operation. */
  export interface GetFeedbackParams {
    /** A string that specifies the feedback entry to be included in the output. */
    feedbackId: string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two
     *  documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`.
     *  These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests.
     */
    model?: GetFeedbackConstants.Model | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getFeedback` operation. */
  export namespace GetFeedbackConstants {
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    export enum Model {
      CONTRACTS = 'contracts',
      TABLES = 'tables',
    }
  }

  /** Parameters for the `deleteFeedback` operation. */
  export interface DeleteFeedbackParams {
    /** A string that specifies the feedback entry to be deleted from the document. */
    feedbackId: string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two
     *  documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`.
     *  These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests.
     */
    model?: DeleteFeedbackConstants.Model | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteFeedback` operation. */
  export namespace DeleteFeedbackConstants {
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`. These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests. */
    export enum Model {
      CONTRACTS = 'contracts',
      TABLES = 'tables',
    }
  }

  /** Parameters for the `createBatch` operation. */
  export interface CreateBatchParams {
    /** The Compare and Comply method to run across the submitted input documents. */
    _function: CreateBatchConstants.Function | string;
    /** A JSON file containing the input Cloud Object Storage credentials. At a minimum, the credentials must enable
     *  `READ` permissions on the bucket defined by the `input_bucket_name` parameter.
     */
    inputCredentialsFile: NodeJS.ReadableStream|Buffer;
    /** The geographical location of the Cloud Object Storage input bucket as listed on the **Endpoint** tab of your
     *  Cloud Object Storage instance; for example, `us-geo`, `eu-geo`, or `ap-geo`.
     */
    inputBucketLocation: string;
    /** The name of the Cloud Object Storage input bucket. */
    inputBucketName: string;
    /** A JSON file that lists the Cloud Object Storage output credentials. At a minimum, the credentials must
     *  enable `READ` and `WRITE` permissions on the bucket defined by the `output_bucket_name` parameter.
     */
    outputCredentialsFile: NodeJS.ReadableStream|Buffer;
    /** The geographical location of the Cloud Object Storage output bucket as listed on the **Endpoint** tab of
     *  your Cloud Object Storage instance; for example, `us-geo`, `eu-geo`, or `ap-geo`.
     */
    outputBucketLocation: string;
    /** The name of the Cloud Object Storage output bucket. */
    outputBucketName: string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two
     *  documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`.
     *  These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests.
     */
    model?: CreateBatchConstants.Model | string;
    headers?: OutgoingHttpHeaders;
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

  /** Parameters for the `listBatches` operation. */
  export interface ListBatchesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getBatch` operation. */
  export interface GetBatchParams {
    /** The ID of the batch-processing job whose information you want to retrieve. */
    batchId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateBatch` operation. */
  export interface UpdateBatchParams {
    /** The ID of the batch-processing job you want to update. */
    batchId: string;
    /** The action you want to perform on the specified batch-processing job. */
    action: UpdateBatchConstants.Action | string;
    /** The analysis model to be used by the service. For the **Element classification** and **Compare two
     *  documents** methods, the default is `contracts`. For the **Extract tables** method, the default is `tables`.
     *  These defaults apply to the standalone methods as well as to the methods' use in batch-processing requests.
     */
    model?: UpdateBatchConstants.Model | string;
    headers?: OutgoingHttpHeaders;
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
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** AlignedElement. */
  export interface AlignedElement {
    /** Identifies two elements that semantically align between the compared documents. */
    element_pair?: ElementPair[];
    /** Specifies whether the aligned element is identical. Elements are considered identical despite minor
     *  differences such as leading punctuation, end-of-sentence punctuation, whitespace, the presence or absence of
     *  definite or indefinite articles, and others.
     */
    identical_text?: boolean;
    /** Hashed values that you can send to IBM to provide feedback or receive support. */
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
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** The batch-request status. */
  export interface BatchStatus {
    /** The method to be run against the documents. Possible values are `html_conversion`, `element_classification`,
     *  and `tables`.
     */
    _function?: string;
    /** The geographical location of the Cloud Object Storage input bucket as listed on the **Endpoint** tab of your
     *  COS instance; for example, `us-geo`, `eu-geo`, or `ap-geo`.
     */
    input_bucket_location?: string;
    /** The name of the Cloud Object Storage input bucket. */
    input_bucket_name?: string;
    /** The geographical location of the Cloud Object Storage output bucket as listed on the **Endpoint** tab of
     *  your COS instance; for example, `us-geo`, `eu-geo`, or `ap-geo`.
     */
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
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
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
    /** An array that contains the `id` value of a row header that is applicable to this body cell. */
    row_header_ids?: string[];
    /** An array that contains the `text` value of a row header that is applicable to this body cell. */
    row_header_texts?: string[];
    /** If you provide customization input, the normalized version of the row header texts according to the
     *  customization; otherwise, the same value as `row_header_texts`.
     */
    row_header_texts_normalized?: string[];
    /** An array that contains the `id` value of a column header that is applicable to the current cell. */
    column_header_ids?: string[];
    /** An array that contains the `text` value of a column header that is applicable to the current cell. */
    column_header_texts?: string[];
    /** If you provide customization input, the normalized version of the column header texts according to the
     *  customization; otherwise, the same value as `column_header_texts`.
     */
    column_header_texts_normalized?: string[];
    attributes?: Attribute[];
  }

  /** Information defining an element's subject matter. */
  export interface Category {
    /** The category of the associated element. */
    label?: string;
    /** Hashed values that you can send to IBM to provide feedback or receive support. */
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
    /** The analysis model used to classify the input document. For the **Element classification** method, the only
     *  valid value is `contracts`.
     */
    model_id?: string;
    /** The version of the analysis model identified by the value of the `model_id` key. */
    model_version?: string;
    /** Document elements identified by the service. */
    elements?: Element[];
    /** The date or dates on which the document becomes effective. */
    effective_dates?: EffectiveDates[];
    /** The monetary amounts that identify the total amount of the contract that needs to be paid from one party to
     *  another.
     */
    contract_amounts?: ContractAmts[];
    /** The dates on which the document is to be terminated. */
    termination_dates?: TerminationDates[];
    /** The contract type as declared in the document. */
    contract_types?: ContractTypes[];
    /** The durations of the contract. */
    contract_terms?: ContractTerms[];
    /** The document's payment durations. */
    payment_terms?: PaymentTerms[];
    /** The contract currencies as declared in the document. */
    contract_currencies?: ContractCurrencies[];
    /** Definition of tables identified in the input document. */
    tables?: Tables[];
    /** The structure of the input document. */
    document_structure?: DocStructure;
    /** Definitions of the parties identified in the input document. */
    parties?: Parties[];
  }

  /** Column-level cells, each applicable as a header to other cells in the same column as itself, of the current table. */
  export interface ColumnHeaders {
    /** The unique ID of the cell in the current table. */
    cell_id?: string;
    /** The location of the column header cell in the current table as defined by its `begin` and `end` offsets,
     *  respectfully, in the input document.
     */
    location?: JsonObject;
    /** The textual contents of this cell from the input document without associated markup content. */
    text?: string;
    /** If you provide customization input, the normalized version of the cell text according to the customization;
     *  otherwise, the same value as `text`.
     */
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
    /** The analysis model used to compare the input documents. For the **Compare two documents** method, the only
     *  valid value is `contracts`.
     */
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

  /** Text that is related to the contents of the table and that precedes or follows the current table. */
  export interface Contexts {
    /** The related text. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** A monetary amount identified in the input document. */
  export interface ContractAmts {
    /** The confidence level in the identification of the contract amount. */
    confidence_level?: string;
    /** The monetary amount. */
    text?: string;
    /** The normalized form of the amount, which is listed as a string. This element is optional; it is returned
     *  only if normalized text exists.
     */
    text_normalized?: string;
    /** The details of the normalized text, if applicable. This element is optional; it is returned only if
     *  normalized text exists.
     */
    interpretation?: Interpretation;
    /** Hashed values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** The contract currencies that are declared in the document. */
  export interface ContractCurrencies {
    /** The confidence level in the identification of the contract currency. */
    confidence_level?: string;
    /** The contract currency. */
    text?: string;
    /** The normalized form of the contract currency, which is listed as a string in
     *  [ISO-4217](https://www.iso.org/iso-4217-currency-codes.html) format. This element is optional; it is returned
     *  only if normalized text exists.
     */
    text_normalized?: string;
    /** Hashed values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** The duration or durations of the contract. */
  export interface ContractTerms {
    /** The confidence level in the identification of the contract term. */
    confidence_level?: string;
    /** The contract term (duration). */
    text?: string;
    /** The normalized form of the contract term, which is listed as a string. This element is optional; it is
     *  returned only if normalized text exists.
     */
    text_normalized?: string;
    /** The details of the normalized text, if applicable. This element is optional; it is returned only if
     *  normalized text exists.
     */
    interpretation?: Interpretation;
    /** Hashed values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** The contract type identified in the input document. */
  export interface ContractTypes {
    /** The confidence level in the identification of the contract type. */
    confidence_level?: string;
    /** The contract type. */
    text?: string;
    /** Hashed values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
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
    /** The title of the parsed document. If the service did not detect a title, the value of this element is
     *  `null`.
     */
    title?: string;
    /** The MD5 hash of the input document. */
    hash?: string;
  }

  /** The structure of the input document. */
  export interface DocStructure {
    /** An array containing one object per section or subsection identified in the input document. */
    section_titles?: SectionTitles[];
    /** An array containing one object per section or subsection, in parallel with the `section_titles` array, that
     *  details the leading sentences in the corresponding section or subsection.
     */
    leading_sentences?: LeadingSentence[];
    /** An array containing one object per paragraph, in parallel with the `section_titles` and `leading_sentences`
     *  arrays.
     */
    paragraphs?: Paragraphs[];
  }

  /** Basic information about the input document. */
  export interface Document {
    /** Document title, if detected. */
    title?: string;
    /** The input document converted into HTML format. */
    html?: string;
    /** The MD5 hash value of the input document. */
    hash?: string;
    /** The label applied to the input document with the calling method's `file_1_label` or `file_2_label` value.
     *  This field is specified only in the output of the **Comparing two documents** method.
     */
    label?: string;
  }

  /** An effective date. */
  export interface EffectiveDates {
    /** The confidence level in the identification of the effective date. */
    confidence_level?: string;
    /** The effective date, listed as a string. */
    text?: string;
    /** The normalized form of the effective date, which is listed as a string. This element is optional; it is
     *  returned only if normalized text exists.
     */
    text_normalized?: string;
    /** Hashed values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** A component part of the document. */
  export interface Element {
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
    /** The text of the element. */
    text?: string;
    /** Description of the action specified by the element  and whom it affects. */
    types?: TypeLabel[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the
     *  element.
     */
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
    /** The label of the document (that is, the value of either the `file_1_label` or `file_2_label` parameters) in
     *  which the element occurs.
     */
    document_label?: string;
    /** The contents of the element. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
    /** Description of the action specified by the element and whom it affects. */
    types?: TypeLabelComparison[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the
     *  element.
     */
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
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
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
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
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

  /** The details of the normalized text, if applicable. This element is optional; it is returned only if normalized text exists. */
  export interface Interpretation {
    /** The value that was located in the normalized text. */
    value?: string;
    /** An integer or float expressing the numeric value of the `value` key. */
    numeric_value?: number;
    /** A string listing the unit of the value that was found in the normalized text.
     *
     *  **Note:** The value of `unit` is the [ISO-4217 currency code](https://www.iso.org/iso-4217-currency-codes.html)
     *  identified for the currency amount (for example, `USD` or `EUR`). If the service cannot disambiguate a currency
     *  symbol (for example, `$` or `£`), the value of `unit` contains the ambiguous symbol as-is.
     */
    unit?: string;
  }

  /** A key in a key-value pair. */
  export interface Key {
    /** The unique ID of the key in the table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
    /** The text content of the table cell without HTML markup. */
    text?: string;
  }

  /** Key-value pairs detected across cell boundaries. */
  export interface KeyValuePair {
    /** A key in a key-value pair. */
    key?: Key;
    /** A list of values in a key-value pair. */
    value?: Value[];
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
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
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

  /** A mention of a party. */
  export interface Mention {
    /** The name of the party. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** The original labeling from the input document, without the submitted feedback. */
  export interface OriginalLabelsIn {
    /** Description of the action specified by the element and whom it affects. */
    types: TypeLabel[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the
     *  element.
     */
    categories: Category[];
  }

  /** The original labeling from the input document, without the submitted feedback. */
  export interface OriginalLabelsOut {
    /** Description of the action specified by the element and whom it affects. */
    types?: TypeLabel[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the
     *  element.
     */
    categories?: Category[];
    /** A string identifying the type of modification the feedback entry in the `updated_labels` array. Possible
     *  values are `added`, `not_changed`, and `removed`.
     */
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

  /** The locations of each paragraph in the input document. */
  export interface Paragraphs {
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** A party and its corresponding role, including address and contact information if identified. */
  export interface Parties {
    /** The normalized form of the party's name. */
    party?: string;
    /** A string identifying the party's role. */
    role?: string;
    /** A string that identifies the importance of the party. */
    importance?: string;
    /** A list of the party's address or addresses. */
    addresses?: Address[];
    /** A list of the names and roles of contacts identified in the input document. */
    contacts?: Contact[];
    /** A list of the party's mentions in the input document. */
    mentions?: Mention[];
  }

  /** The document's payment duration or durations. */
  export interface PaymentTerms {
    /** The confidence level in the identification of the payment term. */
    confidence_level?: string;
    /** The payment term (duration). */
    text?: string;
    /** The normalized form of the payment term, which is listed as a string. This element is optional; it is
     *  returned only if normalized text exists.
     */
    text_normalized?: string;
    /** The details of the normalized text, if applicable. This element is optional; it is returned only if
     *  normalized text exists.
     */
    interpretation?: Interpretation;
    /** Hashed values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** Row-level cells, each applicable as a header to other cells in the same row as itself, of the current table. */
  export interface RowHeaders {
    /** The unique ID of the cell in the current table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
    /** The textual contents of this cell from the input document without associated markup content. */
    text?: string;
    /** If you provide customization input, the normalized version of the cell text according to the customization;
     *  otherwise, the same value as `text`.
     */
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
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** An array containing one object per section or subsection detected in the input document. Sections and subsections are not nested; instead, they are flattened out and can be placed back in order by using the `begin` and `end` values of the element and the `level` value of the section. */
  export interface SectionTitles {
    /** The text of the section title, if identified. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
    /** An integer indicating the level at which the section is located in the input document. For example, `1`
     *  represents a top-level section, `2` represents a subsection within the level `1` section, and so forth.
     */
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
    /** The location of the table header cell in the current table as defined by its `begin` and `end` offsets,
     *  respectfully, in the input document.
     */
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

  /** If identified, the title or caption of the current table of the form `Table x.: ...`. Empty when no title is identified. When exposed, the `title` is also excluded from the `contexts` array of the same table. */
  export interface TableTitle {
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
    /** The text of the identified table title or caption. */
    text?: string;
  }

  /** The contents of the tables extracted from a document. */
  export interface Tables {
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
    /** The textual contents of the current table from the input document without associated markup content. */
    text?: string;
    /** The table's section title, if identified. */
    section_title?: SectionTitle;
    /** If identified, the title or caption of the current table of the form `Table x.: ...`. Empty when no title is
     *  identified. When exposed, the `title` is also excluded from the `contexts` array of the same table.
     */
    title?: TableTitle;
    /** An array of table-level cells that apply as headers to all the other cells in the current table. */
    table_headers?: TableHeaders[];
    /** An array of row-level cells, each applicable as a header to other cells in the same row as itself, of the
     *  current table.
     */
    row_headers?: RowHeaders[];
    /** An array of column-level cells, each applicable as a header to other cells in the same column as itself, of
     *  the current table.
     */
    column_headers?: ColumnHeaders[];
    /** An array of cells that are neither table header nor column header nor row header cells, of the current table
     *  with corresponding row and column header associations.
     */
    body_cells?: BodyCells[];
    /** An array of objects that list text that is related to the table contents and that precedes or follows the
     *  current table.
     */
    contexts?: Contexts[];
    /** An array of key-value pairs identified in the current table. */
    key_value_pairs?: KeyValuePair[];
  }

  /** Termination dates identified in the input document. */
  export interface TerminationDates {
    /** The confidence level in the identification of the termination date. */
    confidence_level?: string;
    /** The termination date. */
    text?: string;
    /** The normalized form of the termination date, which is listed as a string. This element is optional; it is
     *  returned only if normalized text exists.
     */
    text_normalized?: string;
    /** Hashed values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
  }

  /** Identification of a specific type. */
  export interface TypeLabel {
    /** A pair of `nature` and `party` objects. The `nature` object identifies the effect of the element on the
     *  identified `party`, and the `party` object identifies the affected party.
     */
    label?: Label;
    /** Hashed values that you can send to IBM to provide feedback or receive support. */
    provenance_ids?: string[];
  }

  /** Identification of a specific type. */
  export interface TypeLabelComparison {
    /** A pair of `nature` and `party` objects. The `nature` object identifies the effect of the element on the
     *  identified `party`, and the `party` object identifies the affected party.
     */
    label?: Label;
  }

  /** Element that does not align semantically between two compared documents. */
  export interface UnalignedElement {
    /** The label assigned to the document by the value of the `file_1_label` or `file_2_label` parameters on the
     *  **Compare two documents** method.
     */
    document_label?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
    /** The text of the element. */
    text?: string;
    /** Description of the action specified by the element and whom it affects. */
    types?: TypeLabelComparison[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the
     *  element.
     */
    categories?: CategoryComparison[];
    /** List of document attributes. */
    attributes?: Attribute[];
  }

  /** The updated labeling from the input document, accounting for the submitted feedback. */
  export interface UpdatedLabelsIn {
    /** Description of the action specified by the element and whom it affects. */
    types: TypeLabel[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the
     *  element.
     */
    categories: Category[];
  }

  /** The updated labeling from the input document, accounting for the submitted feedback. */
  export interface UpdatedLabelsOut {
    /** Description of the action specified by the element and whom it affects. */
    types?: TypeLabel[];
    /** List of functional categories into which the element falls; in other words, the subject matter of the
     *  element.
     */
    categories?: Category[];
    /** The type of modification the feedback entry in the `updated_labels` array. Possible values are `added`,
     *  `not_changed`, and `removed`.
     */
    modification?: string;
  }

  /** A value in a key-value pair. */
  export interface Value {
    /** The unique ID of the value in the table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: Location;
    /** The text content of the table cell without HTML markup. */
    text?: string;
  }

}

export = CompareComplyV1;
