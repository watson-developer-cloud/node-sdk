/**
 * (C) Copyright IBM Corp. 2017, 2020.
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
 * The IBM Watson&trade; Visual Recognition service uses deep learning algorithms to identify scenes and objects in
 * images that you upload to the service. You can create and train a custom classifier to identify subjects that suit
 * your needs.
 */

class VisualRecognitionV3 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://gateway.watsonplatform.net/visual-recognition/api';
  static DEFAULT_SERVICE_NAME: string = 'watson_vision_combined';

  /**
   * Construct a VisualRecognitionV3 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever
   * the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses
   * the API version for the date you specify, or the most recent version before that date. Note that you should not
   * programmatically specify the current date at runtime, in case the API has been updated since your application's
   * release. Instead, specify a version date that is compatible with your application, and don't change it until your
   * application is ready for a later version.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/visual-recognition/api'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {VisualRecognitionV3}
   * @throws {Error}
   */
  constructor(options: UserOptions) {
    if (!options.serviceName) {
      options.serviceName = VisualRecognitionV3.DEFAULT_SERVICE_NAME;
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
   * general
   ************************/

  /**
   * Classify images.
   *
   * Classify images with built-in or custom classifiers.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|Buffer} [params.imagesFile] - An image file (.gif, .jpg, .png, .tif) or .zip file
   * with images. Maximum image size is 10 MB. Include no more than 20 images and limit the .zip file to 100 MB. Encode
   * the image and .zip file names in UTF-8 if they contain non-ASCII characters. The service assumes UTF-8 encoding if
   * it encounters non-ASCII characters.
   *
   * You can also include an image with the **url** parameter.
   * @param {string} [params.imagesFilename] - The filename for imagesFile.
   * @param {string} [params.imagesFileContentType] - The content type of imagesFile.
   * @param {string} [params.url] - The URL of an image (.gif, .jpg, .png, .tif) to analyze. The minimum recommended
   * pixel density is 32X32 pixels, but the service tends to perform better with images that are at least 224 x 224
   * pixels. The maximum image size is 10 MB.
   *
   * You can also include images with the **images_file** parameter.
   * @param {number} [params.threshold] - The minimum score a class must have to be displayed in the response. Set the
   * threshold to `0.0` to return all identified classes.
   * @param {string[]} [params.owners] - The categories of classifiers to apply. The **classifier_ids** parameter
   * overrides **owners**, so make sure that **classifier_ids** is empty.
   * - Use `IBM` to classify against the `default` general classifier. You get the same result if both
   * **classifier_ids** and **owners** parameters are empty.
   * - Use `me` to classify against all your custom classifiers. However, for better performance use **classifier_ids**
   * to specify the specific custom classifiers to apply.
   * - Use both `IBM` and `me` to analyze the image against both classifier categories.
   * @param {string[]} [params.classifierIds] - Which classifiers to apply. Overrides the **owners** parameter. You can
   * specify both custom and built-in classifier IDs. The built-in `default` classifier is used if both
   * **classifier_ids** and **owners** parameters are empty.
   *
   * The following built-in classifier IDs require no training:
   * - `default`: Returns classes from thousands of general tags.
   * - `food`: Enhances specificity and accuracy for images of food items.
   * - `explicit`: Evaluates whether the image might be pornographic.
   * @param {string} [params.acceptLanguage] - The desired language of parts of the response. See the response for
   * details.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<VisualRecognitionV3.Response<VisualRecognitionV3.ClassifiedImages>>}
   */
  public classify(params?: VisualRecognitionV3.ClassifyParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.ClassifiedImages>): Promise<VisualRecognitionV3.Response<VisualRecognitionV3.ClassifiedImages>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const formData = {
        'images_file': {
          data: _params.imagesFile,
          filename: _params.imagesFilename,
          contentType: _params.imagesFileContentType
        },
        'url': _params.url,
        'threshold': _params.threshold,
        'owners': _params.owners,
        'classifier_ids': _params.classifierIds
      };

      const sdkHeaders = getSdkHeaders(VisualRecognitionV3.DEFAULT_SERVICE_NAME, 'v3', 'classify');

      const parameters = {
        options: {
          url: '/v3/classify',
          method: 'POST',
          formData
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Accept-Language': _params.acceptLanguage
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
   * custom
   ************************/

  /**
   * Create a classifier.
   *
   * Train a new multi-faceted classifier on the uploaded image data. Create your custom classifier with positive or
   * negative example training images. Include at least two sets of examples, either two positive example files or one
   * positive and one negative file. You can upload a maximum of 256 MB per call.
   *
   * **Tips when creating:**
   *
   * - If you set the **X-Watson-Learning-Opt-Out** header parameter to `true` when you create a classifier, the example
   * training images are not stored. Save your training images locally. For more information, see [Data
   * collection](#data-collection).
   *
   * - Encode all names in UTF-8 if they contain non-ASCII characters (.zip and image file names, and classifier and
   * class names). The service assumes UTF-8 encoding if it encounters non-ASCII characters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the new classifier. Encode special characters in UTF-8.
   * @param {Record<string, NodeJS.ReadableStream|Buffer>} params.positiveExamples - A dictionary that contains the
   * value for each classname. The value is a .zip file of images that depict the visual subject of a class in the new
   * classifier. You can include more than one positive example file in a call.
   *
   * Specify the parameter name by appending `_positive_examples` to the class name. For example,
   * `goldenretriever_positive_examples` creates the class **goldenretriever**. The string cannot contain the following
   * characters: ``$ * - { } \ | / ' " ` [ ]``.
   *
   * Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The
   * maximum number of images is 10,000 images or 100 MB per .zip file.
   *
   * Encode special characters in the file name in UTF-8.
   * @param {NodeJS.ReadableStream|Buffer} [params.negativeExamples] - A .zip file of images that do not depict the
   * visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
   *
   * Encode special characters in the file name in UTF-8.
   * @param {string} [params.negativeExamplesFilename] - The filename for negativeExamples.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Classifier>>}
   */
  public createClassifier(params: VisualRecognitionV3.CreateClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>): Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Classifier>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['name', 'positiveExamples'];

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
        'name': _params.name,
        'negative_examples': {
          data: _params.negativeExamples,
          filename: _params.negativeExamplesFilename,
          contentType: 'application/octet-stream'
        }
      };

      Object.keys(_params.positiveExamples || {}).forEach(key => {
        const partName = `${key}_positive_examples`
        formData[partName] = {
          data: _params.positiveExamples[key],
          contentType: 'application/octet-stream',
        };
      });

      const sdkHeaders = getSdkHeaders(VisualRecognitionV3.DEFAULT_SERVICE_NAME, 'v3', 'createClassifier');

      const parameters = {
        options: {
          url: '/v3/classifiers',
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
   * Retrieve a list of classifiers.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.verbose] - Specify `true` to return details about the classifiers. Omit this parameter to
   * return a brief list of classifiers.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Classifiers>>}
   */
  public listClassifiers(params?: VisualRecognitionV3.ListClassifiersParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifiers>): Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Classifiers>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const query = {
        'verbose': _params.verbose
      };

      const sdkHeaders = getSdkHeaders(VisualRecognitionV3.DEFAULT_SERVICE_NAME, 'v3', 'listClassifiers');

      const parameters = {
        options: {
          url: '/v3/classifiers',
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
   * Retrieve classifier details.
   *
   * Retrieve information about a custom classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Classifier>>}
   */
  public getClassifier(params: VisualRecognitionV3.GetClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>): Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Classifier>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['classifierId'];

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
        'classifier_id': _params.classifierId
      };

      const sdkHeaders = getSdkHeaders(VisualRecognitionV3.DEFAULT_SERVICE_NAME, 'v3', 'getClassifier');

      const parameters = {
        options: {
          url: '/v3/classifiers/{classifier_id}',
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
   * Update a classifier.
   *
   * Update a custom classifier by adding new positive or negative classes or by adding new images to existing classes.
   * You must supply at least one set of positive or negative examples. For details, see [Updating custom
   * classifiers](https://cloud.ibm.com/docs/visual-recognition?topic=visual-recognition-customizing#updating-custom-classifiers).
   *
   * Encode all names in UTF-8 if they contain non-ASCII characters (.zip and image file names, and classifier and class
   * names). The service assumes UTF-8 encoding if it encounters non-ASCII characters.
   *
   * **Tips about retraining:**
   *
   * - You can't update the classifier if the **X-Watson-Learning-Opt-Out** header parameter was set to `true` when the
   * classifier was created. Training images are not stored in that case. Instead, create another classifier. For more
   * information, see [Data collection](#data-collection).
   *
   * - Don't make retraining calls on a classifier until the status is ready. When you submit retraining requests in
   * parallel, the last request overwrites the previous requests. The `retrained` property shows the last time the
   * classifier retraining finished.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {Record<string, NodeJS.ReadableStream|Buffer>} [params.positiveExamples] - A dictionary that contains the
   * value for each classname. The value is a .zip file of images that depict the visual subject of a class in the
   * classifier. The positive examples create or update classes in the classifier. You can include more than one
   * positive example file in a call.
   *
   * Specify the parameter name by appending `_positive_examples` to the class name. For example,
   * `goldenretriever_positive_examples` creates the class `goldenretriever`. The string cannot contain the following
   * characters: ``$ * - { } \ | / ' " ` [ ]``.
   *
   * Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The
   * maximum number of images is 10,000 images or 100 MB per .zip file.
   *
   * Encode special characters in the file name in UTF-8.
   * @param {NodeJS.ReadableStream|Buffer} [params.negativeExamples] - A .zip file of images that do not depict the
   * visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
   *
   * Encode special characters in the file name in UTF-8.
   * @param {string} [params.negativeExamplesFilename] - The filename for negativeExamples.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Classifier>>}
   */
  public updateClassifier(params: VisualRecognitionV3.UpdateClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>): Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Classifier>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['classifierId'];

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
        'negative_examples': {
          data: _params.negativeExamples,
          filename: _params.negativeExamplesFilename,
          contentType: 'application/octet-stream'
        }
      };

      Object.keys(_params.positiveExamples || {}).forEach(key => {
        const partName = `${key}_positive_examples`
        formData[partName] = {
          data: _params.positiveExamples[key],
          contentType: 'application/octet-stream',
        };
      });

      const path = {
        'classifier_id': _params.classifierId
      };

      const sdkHeaders = getSdkHeaders(VisualRecognitionV3.DEFAULT_SERVICE_NAME, 'v3', 'updateClassifier');

      const parameters = {
        options: {
          url: '/v3/classifiers/{classifier_id}',
          method: 'POST',
          path,
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
   * Delete a classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Empty>>}
   */
  public deleteClassifier(params: VisualRecognitionV3.DeleteClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Empty>): Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['classifierId'];

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
        'classifier_id': _params.classifierId
      };

      const sdkHeaders = getSdkHeaders(VisualRecognitionV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteClassifier');

      const parameters = {
        options: {
          url: '/v3/classifiers/{classifier_id}',
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

  /*************************
   * coreML
   ************************/

  /**
   * Retrieve a Core ML model of a classifier.
   *
   * Download a Core ML model file (.mlmodel) of a custom classifier that returns <tt>"core_ml_enabled": true</tt> in
   * the classifier details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<VisualRecognitionV3.Response<NodeJS.ReadableStream|Buffer>>}
   */
  public getCoreMlModel(params: VisualRecognitionV3.GetCoreMlModelParams, callback?: VisualRecognitionV3.Callback<NodeJS.ReadableStream|Buffer>): Promise<VisualRecognitionV3.Response<NodeJS.ReadableStream|Buffer>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['classifierId'];

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
        'classifier_id': _params.classifierId
      };

      const sdkHeaders = getSdkHeaders(VisualRecognitionV3.DEFAULT_SERVICE_NAME, 'v3', 'getCoreMlModel');

      const parameters = {
        options: {
          url: '/v3/classifiers/{classifier_id}/core_ml_model',
          method: 'GET',
          path,
          responseType: 'stream',
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/octet-stream',
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
   * userData
   ************************/

  /**
   * Delete labeled data.
   *
   * Deletes all data associated with a specified customer ID. The method has no effect if no data is associated with
   * the customer ID.
   *
   * You associate a customer ID with data by passing the `X-Watson-Metadata` header with a request that passes data.
   * For more information about personal data and customer IDs, see [Information
   * security](https://cloud.ibm.com/docs/visual-recognition?topic=visual-recognition-information-security).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customerId - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Empty>>}
   */
  public deleteUserData(params: VisualRecognitionV3.DeleteUserDataParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Empty>): Promise<VisualRecognitionV3.Response<VisualRecognitionV3.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['customerId'];

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
        'customer_id': _params.customerId
      };

      const sdkHeaders = getSdkHeaders(VisualRecognitionV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteUserData');

      const parameters = {
        options: {
          url: '/v3/user_data',
          method: 'DELETE',
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

}

/*************************
 * interfaces
 ************************/

namespace VisualRecognitionV3 {

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

  /** Parameters for the `classify` operation. */
  export interface ClassifyParams {
    /** An image file (.gif, .jpg, .png, .tif) or .zip file with images. Maximum image size is 10 MB. Include no
     *  more than 20 images and limit the .zip file to 100 MB. Encode the image and .zip file names in UTF-8 if they
     *  contain non-ASCII characters. The service assumes UTF-8 encoding if it encounters non-ASCII characters.
     *
     *  You can also include an image with the **url** parameter.
     */
    imagesFile?: NodeJS.ReadableStream|Buffer;
    /** The filename for imagesFile. */
    imagesFilename?: string;
    /** The content type of imagesFile. */
    imagesFileContentType?: string;
    /** The URL of an image (.gif, .jpg, .png, .tif) to analyze. The minimum recommended pixel density is 32X32
     *  pixels, but the service tends to perform better with images that are at least 224 x 224 pixels. The maximum
     *  image size is 10 MB.
     *
     *  You can also include images with the **images_file** parameter.
     */
    url?: string;
    /** The minimum score a class must have to be displayed in the response. Set the threshold to `0.0` to return
     *  all identified classes.
     */
    threshold?: number;
    /** The categories of classifiers to apply. The **classifier_ids** parameter overrides **owners**, so make sure
     *  that **classifier_ids** is empty.
     *  - Use `IBM` to classify against the `default` general classifier. You get the same result if both
     *  **classifier_ids** and **owners** parameters are empty.
     *  - Use `me` to classify against all your custom classifiers. However, for better performance use
     *  **classifier_ids** to specify the specific custom classifiers to apply.
     *  - Use both `IBM` and `me` to analyze the image against both classifier categories.
     */
    owners?: string[];
    /** Which classifiers to apply. Overrides the **owners** parameter. You can specify both custom and built-in
     *  classifier IDs. The built-in `default` classifier is used if both **classifier_ids** and **owners** parameters
     *  are empty.
     *
     *  The following built-in classifier IDs require no training:
     *  - `default`: Returns classes from thousands of general tags.
     *  - `food`: Enhances specificity and accuracy for images of food items.
     *  - `explicit`: Evaluates whether the image might be pornographic.
     */
    classifierIds?: string[];
    /** The desired language of parts of the response. See the response for details. */
    acceptLanguage?: ClassifyConstants.AcceptLanguage | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `classify` operation. */
  export namespace ClassifyConstants {
    /** The desired language of parts of the response. See the response for details. */
    export enum AcceptLanguage {
      EN = 'en',
      AR = 'ar',
      DE = 'de',
      ES = 'es',
      FR = 'fr',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
      PT_BR = 'pt-br',
      ZH_CN = 'zh-cn',
      ZH_TW = 'zh-tw',
    }
  }

  /** Parameters for the `createClassifier` operation. */
  export interface CreateClassifierParams {
    /** The name of the new classifier. Encode special characters in UTF-8. */
    name: string;
    /** A dictionary that contains the value for each classname. The value is a .zip file of images that depict the
     *  visual subject of a class in the new classifier. You can include more than one positive example file in a call.
     *
     *  Specify the parameter name by appending `_positive_examples` to the class name. For example,
     *  `goldenretriever_positive_examples` creates the class **goldenretriever**. The string cannot contain the
     *  following characters: ``$ * - { } \ | / ' " ` [ ]``.
     *
     *  Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The
     *  maximum number of images is 10,000 images or 100 MB per .zip file.
     *
     *  Encode special characters in the file name in UTF-8.
     */
    positiveExamples: Record<string, NodeJS.ReadableStream|Buffer>;
    /** A .zip file of images that do not depict the visual subject of any of the classes of the new classifier.
     *  Must contain a minimum of 10 images.
     *
     *  Encode special characters in the file name in UTF-8.
     */
    negativeExamples?: NodeJS.ReadableStream|Buffer;
    /** The filename for negativeExamples. */
    negativeExamplesFilename?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listClassifiers` operation. */
  export interface ListClassifiersParams {
    /** Specify `true` to return details about the classifiers. Omit this parameter to return a brief list of
     *  classifiers.
     */
    verbose?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getClassifier` operation. */
  export interface GetClassifierParams {
    /** The ID of the classifier. */
    classifierId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateClassifier` operation. */
  export interface UpdateClassifierParams {
    /** The ID of the classifier. */
    classifierId: string;
    /** A dictionary that contains the value for each classname. The value is a .zip file of images that depict the
     *  visual subject of a class in the classifier. The positive examples create or update classes in the classifier.
     *  You can include more than one positive example file in a call.
     *
     *  Specify the parameter name by appending `_positive_examples` to the class name. For example,
     *  `goldenretriever_positive_examples` creates the class `goldenretriever`. The string cannot contain the following
     *  characters: ``$ * - { } \ | / ' " ` [ ]``.
     *
     *  Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The
     *  maximum number of images is 10,000 images or 100 MB per .zip file.
     *
     *  Encode special characters in the file name in UTF-8.
     */
    positiveExamples?: Record<string, NodeJS.ReadableStream|Buffer>;
    /** A .zip file of images that do not depict the visual subject of any of the classes of the new classifier.
     *  Must contain a minimum of 10 images.
     *
     *  Encode special characters in the file name in UTF-8.
     */
    negativeExamples?: NodeJS.ReadableStream|Buffer;
    /** The filename for negativeExamples. */
    negativeExamplesFilename?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteClassifier` operation. */
  export interface DeleteClassifierParams {
    /** The ID of the classifier. */
    classifierId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCoreMlModel` operation. */
  export interface GetCoreMlModelParams {
    /** The ID of the classifier. */
    classifierId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** A category within a classifier. */
  export interface Class {
    /** The name of the class. */
    _class: string;
  }

  /** Result of a class within a classifier. */
  export interface ClassResult {
    /** Name of the class.
     *
     *  Class names are translated in the language defined by the **Accept-Language** request header for the build-in
     *  classifier IDs (`default`, `food`, and `explicit`). Class names of custom classifiers are not translated. The
     *  response might not be in the specified language when the requested language is not supported or when there is no
     *  translation for the class name.
     */
    _class: string;
    /** Confidence score for the property in the range of 0 to 1. A higher score indicates greater likelihood that
     *  the class is depicted in the image. The default threshold for returning scores from a classifier is 0.5.
     */
    score: number;
    /** Knowledge graph of the property. For example, `/fruit/pome/apple/eating apple/Granny Smith`. Included only
     *  if identified.
     */
    type_hierarchy?: string;
  }

  /** Results for one image. */
  export interface ClassifiedImage {
    /** Source of the image before any redirects. Not returned when the image is uploaded. */
    source_url?: string;
    /** Fully resolved URL of the image after redirects are followed. Not returned when the image is uploaded. */
    resolved_url?: string;
    /** Relative path of the image file if uploaded directly. Not returned when the image is passed by URL. */
    image?: string;
    /** Information about what might have caused a failure, such as an image that is too large. Not returned when
     *  there is no error.
     */
    error?: ErrorInfo;
    /** The classifiers. */
    classifiers: ClassifierResult[];
  }

  /** Results for all images. */
  export interface ClassifiedImages {
    /** Number of custom classes identified in the images. */
    custom_classes?: number;
    /** Number of images processed for the API call. */
    images_processed?: number;
    /** Classified images. */
    images: ClassifiedImage[];
    /** Information about what might cause less than optimal output. For example, a request sent with a corrupt .zip
     *  file and a list of image URLs will still complete, but does not return the expected output. Not returned when
     *  there is no warning.
     */
    warnings?: WarningInfo[];
  }

  /** Information about a classifier. */
  export interface Classifier {
    /** ID of a classifier identified in the image. */
    classifier_id: string;
    /** Name of the classifier. */
    name: string;
    /** Unique ID of the account who owns the classifier. Might not be returned by some requests. */
    owner?: string;
    /** Training status of classifier. */
    status?: string;
    /** Whether the classifier can be downloaded as a Core ML model after the training status is `ready`. */
    core_ml_enabled?: boolean;
    /** If classifier training has failed, this field might explain why. */
    explanation?: string;
    /** Date and time in Coordinated Universal Time (UTC) that the classifier was created. */
    created?: string;
    /** Classes that define a classifier. */
    classes?: Class[];
    /** Date and time in Coordinated Universal Time (UTC) that the classifier was updated. Might not be returned by
     *  some requests. Identical to `updated` and retained for backward compatibility.
     */
    retrained?: string;
    /** Date and time in Coordinated Universal Time (UTC) that the classifier was most recently updated. The field
     *  matches either `retrained` or `created`. Might not be returned by some requests.
     */
    updated?: string;
  }

  /** Classifier and score combination. */
  export interface ClassifierResult {
    /** Name of the classifier. */
    name: string;
    /** ID of a classifier identified in the image. */
    classifier_id: string;
    /** Classes within the classifier. */
    classes: ClassResult[];
  }

  /** A container for the list of classifiers. */
  export interface Classifiers {
    /** List of classifiers. */
    classifiers: Classifier[];
  }

  /** Information about what might have caused a failure, such as an image that is too large. Not returned when there is no error. */
  export interface ErrorInfo {
    /** HTTP status code. */
    code: number;
    /** Human-readable error description. For example, `File size limit exceeded`. */
    description: string;
    /** Codified error string. For example, `limit_exceeded`. */
    error_id: string;
  }

  /** Information about something that went wrong. */
  export interface WarningInfo {
    /** Codified warning string, such as `limit_reached`. */
    warning_id: string;
    /** Information about the error. */
    description: string;
  }

}

export = VisualRecognitionV3;
