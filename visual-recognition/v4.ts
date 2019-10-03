/**
 * (C) Copyright IBM Corp. 2019.
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
import { FileWithMetadata } from 'ibm-cloud-sdk-core';
import { getAuthenticatorFromEnvironment } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Provide images to the IBM Watson&trade; Visual Recognition service for analysis. The service detects objects based on
 * a set of images with training data.
 *
 * **Beta:** The Visual Recognition v4 API and Object Detection model are beta features. For more information about beta
 * features, see the [Release
 * notes](https://cloud.ibm.com/docs/services/visual-recognition?topic=visual-recognition-release-notes#beta).
 * {: important}
 */

class VisualRecognitionV4 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/visual-recognition/api';
  name: string; // set by prototype to 'watson_vision_combined'
  serviceVersion: string; // set by prototype to 'v4'

  /**
   * Construct a VisualRecognitionV4 object.
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
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {VisualRecognitionV4}
   * @throws {Error}
   */
  constructor(options: UserOptions) {
    // If the caller didn't supply an authenticator, construct one from external configuration.
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment('watson_vision_combined');
    }
    super(options);
    // check if 'version' was provided
    if (typeof this.baseOptions.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this.baseOptions.qs.version = options.version;
  }

  /*************************
   * analysis
   ************************/

  /**
   * Analyze images.
   *
   * Analyze images by URL, by file, or both against your own collection. Make sure that
   * **training_status.objects.ready** is `true` for the feature before you use a collection to analyze images.
   *
   * Encode the image and .zip file names in UTF-8 if they contain non-ASCII characters. The service assumes UTF-8
   * encoding if it encounters non-ASCII characters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.collectionIds - The IDs of the collections to analyze.
   * @param {string[]} params.features - The features to analyze.
   * @param {FileWithMetadata[]} [params.imagesFile] - An array of image files (.jpg or .png) or .zip files with images.
   * - Include a maximum of 20 images in a request.
   * - Limit the .zip file to 100 MB.
   * - Limit each image file to 10 MB.
   *
   * You can also include an image with the **image_url** parameter.
   * @param {string[]} [params.imageUrl] - An array of URLs of image files (.jpg or .png).
   * - Include a maximum of 20 images in a request.
   * - Limit each image file to 10 MB.
   * - Minimum width and height is 30 pixels, but the service tends to perform better with images that are at least 300
   * x 300 pixels. Maximum is 5400 pixels for either height or width.
   *
   * You can also include images with the **images_file** parameter.
   * @param {number} [params.threshold] - The minimum score a feature must have to be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public analyze(params: VisualRecognitionV4.AnalyzeParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.AnalyzeResponse>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.AnalyzeResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionIds', 'features'];

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
        'collection_ids': Array.isArray(_params.collectionIds) ? _params.collectionIds.join(',') : _params.collectionIds,
        'features': Array.isArray(_params.features) ? _params.features.join(',') : _params.features,
        'images_file': _params.imagesFile,
        'image_url': _params.imageUrl,
        'threshold': _params.threshold
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'analyze');

      const parameters = {
        options: {
          url: '/v4/analyze',
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

  /*************************
   * collections
   ************************/

  /**
   * Create a collection.
   *
   * Create a collection that can be used to store images.
   *
   * To create a collection without specifying a name and description, include an empty JSON object in the request body.
   *
   * Encode the name and description in UTF-8 if they contain non-ASCII characters. The service assumes UTF-8 encoding
   * if it encounters non-ASCII characters.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - The name of the collection. The name can contain alphanumeric, underscore, hyphen,
   * and dot characters. It cannot begin with the reserved prefix `sys-`.
   * @param {string} [params.description] - The description of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createCollection(params?: VisualRecognitionV4.CreateCollectionParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.Collection>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.Collection>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {

      const body = {
        'name': _params.name,
        'description': _params.description
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'createCollection');

      const parameters = {
        options: {
          url: '/v4/collections',
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
   * List collections.
   *
   * Retrieves a list of collections for the service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listCollections(params?: VisualRecognitionV4.ListCollectionsParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.CollectionsList>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.CollectionsList>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'listCollections');

      const parameters = {
        options: {
          url: '/v4/collections',
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
   * Get collection details.
   *
   * Get details of one collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.collectionId - The identifier of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getCollection(params: VisualRecognitionV4.GetCollectionParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.Collection>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.Collection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionId'];

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
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'getCollection');

      const parameters = {
        options: {
          url: '/v4/collections/{collection_id}',
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
   * Update a collection.
   *
   * Update the name or description of a collection.
   *
   * Encode the name and description in UTF-8 if they contain non-ASCII characters. The service assumes UTF-8 encoding
   * if it encounters non-ASCII characters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.collectionId - The identifier of the collection.
   * @param {string} [params.name] - The name of the collection. The name can contain alphanumeric, underscore, hyphen,
   * and dot characters. It cannot begin with the reserved prefix `sys-`.
   * @param {string} [params.description] - The description of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateCollection(params: VisualRecognitionV4.UpdateCollectionParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.Collection>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.Collection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionId'];

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
        'name': _params.name,
        'description': _params.description
      };

      const path = {
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'updateCollection');

      const parameters = {
        options: {
          url: '/v4/collections/{collection_id}',
          method: 'POST',
          body,
          path,
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
   * Delete a collection.
   *
   * Delete a collection from the service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.collectionId - The identifier of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteCollection(params: VisualRecognitionV4.DeleteCollectionParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.Empty>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionId'];

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
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'deleteCollection');

      const parameters = {
        options: {
          url: '/v4/collections/{collection_id}',
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
   * images
   ************************/

  /**
   * Add images.
   *
   * Add images to a collection by URL, by file, or both.
   *
   * Encode the image and .zip file names in UTF-8 if they contain non-ASCII characters. The service assumes UTF-8
   * encoding if it encounters non-ASCII characters.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.collectionId - The identifier of the collection.
   * @param {FileWithMetadata[]} [params.imagesFile] - An array of image files (.jpg or .png) or .zip files with images.
   * - Include a maximum of 20 images in a request.
   * - Limit the .zip file to 100 MB.
   * - Limit each image file to 10 MB.
   *
   * You can also include an image with the **image_url** parameter.
   * @param {string[]} [params.imageUrl] - The array of URLs of image files (.jpg or .png).
   * - Include a maximum of 20 images in a request.
   * - Limit each image file to 10 MB.
   * - Minimum width and height is 30 pixels, but the service tends to perform better with images that are at least 300
   * x 300 pixels. Maximum is 5400 pixels for either height or width.
   *
   * You can also include images with the **images_file** parameter.
   * @param {string} [params.trainingData] - Training data for a single image. Include training data only if you add one
   * image with the request.
   *
   * The `object` property can contain alphanumeric, underscore, hyphen, space, and dot characters. It cannot begin with
   * the reserved prefix `sys-` and must be no longer than 32 characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public addImages(params: VisualRecognitionV4.AddImagesParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.ImageDetailsList>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.ImageDetailsList>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionId'];

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
        'images_file': _params.imagesFile,
        'image_url': _params.imageUrl,
        'training_data': _params.trainingData
      };

      const path = {
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'addImages');

      const parameters = {
        options: {
          url: '/v4/collections/{collection_id}/images',
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
   * List images.
   *
   * Retrieves a list of images in a collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.collectionId - The identifier of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listImages(params: VisualRecognitionV4.ListImagesParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.ImageSummaryList>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.ImageSummaryList>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionId'];

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
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'listImages');

      const parameters = {
        options: {
          url: '/v4/collections/{collection_id}/images',
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
   * Get image details.
   *
   * Get the details of an image in a collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.collectionId - The identifier of the collection.
   * @param {string} params.imageId - The identifier of the image.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getImageDetails(params: VisualRecognitionV4.GetImageDetailsParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.ImageDetails>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.ImageDetails>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionId', 'imageId'];

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
        'collection_id': _params.collectionId,
        'image_id': _params.imageId
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'getImageDetails');

      const parameters = {
        options: {
          url: '/v4/collections/{collection_id}/images/{image_id}',
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
   * Delete an image.
   *
   * Delete one image from a collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.collectionId - The identifier of the collection.
   * @param {string} params.imageId - The identifier of the image.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteImage(params: VisualRecognitionV4.DeleteImageParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.Empty>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionId', 'imageId'];

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
        'collection_id': _params.collectionId,
        'image_id': _params.imageId
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'deleteImage');

      const parameters = {
        options: {
          url: '/v4/collections/{collection_id}/images/{image_id}',
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
   * Get a JPEG file of an image.
   *
   * Download a JPEG representation of an image.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.collectionId - The identifier of the collection.
   * @param {string} params.imageId - The identifier of the image.
   * @param {string} [params.size] - Specify the image size.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getJpegImage(params: VisualRecognitionV4.GetJpegImageParams, callback?: VisualRecognitionV4.Callback<NodeJS.ReadableStream|Buffer>): Promise<VisualRecognitionV4.Response<NodeJS.ReadableStream|Buffer>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionId', 'imageId'];

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
        'size': _params.size
      };

      const path = {
        'collection_id': _params.collectionId,
        'image_id': _params.imageId
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'getJpegImage');

      const parameters = {
        options: {
          url: '/v4/collections/{collection_id}/images/{image_id}/jpeg',
          method: 'GET',
          qs: query,
          path,
          responseType: 'stream',
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'image/jpeg',
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
   * training
   ************************/

  /**
   * Train a collection.
   *
   * Start training on images in a collection. The collection must have enough training data and untrained data (the
   * **training_status.objects.data_changed** is `true`). If training is in progress, the request queues the next
   * training job.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.collectionId - The identifier of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public train(params: VisualRecognitionV4.TrainParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.Collection>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.Collection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionId'];

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
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'train');

      const parameters = {
        options: {
          url: '/v4/collections/{collection_id}/train',
          method: 'POST',
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
   * Add training data to an image.
   *
   * Add, update, or delete training data for an image. Encode the object name in UTF-8 if it contains non-ASCII
   * characters. The service assumes UTF-8 encoding if it encounters non-ASCII characters.
   *
   * Elements in the request replace the existing elements.
   *
   * - To update the training data, provide both the unchanged and the new or changed values.
   *
   * - To delete the training data, provide an empty value for the training data.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.collectionId - The identifier of the collection.
   * @param {string} params.imageId - The identifier of the image.
   * @param {TrainingDataObject[]} [params.objects] - Training data for specific objects.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public addImageTrainingData(params: VisualRecognitionV4.AddImageTrainingDataParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.TrainingDataObjects>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.TrainingDataObjects>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['collectionId', 'imageId'];

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
        'objects': _params.objects
      };

      const path = {
        'collection_id': _params.collectionId,
        'image_id': _params.imageId
      };

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'addImageTrainingData');

      const parameters = {
        options: {
          url: '/v4/collections/{collection_id}/images/{image_id}/training_data',
          method: 'POST',
          body,
          path,
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
   * security](https://cloud.ibm.com/docs/services/visual-recognition?topic=visual-recognition-information-security).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customerId - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteUserData(params: VisualRecognitionV4.DeleteUserDataParams, callback?: VisualRecognitionV4.Callback<VisualRecognitionV4.Empty>): Promise<VisualRecognitionV4.Response<VisualRecognitionV4.Empty>> {
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

      const sdkHeaders = getSdkHeaders('watson_vision_combined', 'v4', 'deleteUserData');

      const parameters = {
        options: {
          url: '/v4/user_data',
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

VisualRecognitionV4.prototype.name = 'watson_vision_combined';
VisualRecognitionV4.prototype.serviceVersion = 'v4';

/*************************
 * interfaces
 ************************/

namespace VisualRecognitionV4 {

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

  /** Parameters for the `analyze` operation. */
  export interface AnalyzeParams {
    /** The IDs of the collections to analyze. */
    collectionIds: string[];
    /** The features to analyze. */
    features: AnalyzeConstants.Features[] | string[];
    /** An array of image files (.jpg or .png) or .zip files with images.
     *  - Include a maximum of 20 images in a request.
     *  - Limit the .zip file to 100 MB.
     *  - Limit each image file to 10 MB.
     *
     *  You can also include an image with the **image_url** parameter.
     */
    imagesFile?: FileWithMetadata[];
    /** An array of URLs of image files (.jpg or .png).
     *  - Include a maximum of 20 images in a request.
     *  - Limit each image file to 10 MB.
     *  - Minimum width and height is 30 pixels, but the service tends to perform better with images that are at least
     *  300 x 300 pixels. Maximum is 5400 pixels for either height or width.
     *
     *  You can also include images with the **images_file** parameter.
     */
    imageUrl?: string[];
    /** The minimum score a feature must have to be returned. */
    threshold?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `analyze` operation. */
  export namespace AnalyzeConstants {
    /** The features to analyze. */
    export enum Features {
      OBJECTS = 'objects',
    }
  }

  /** Parameters for the `createCollection` operation. */
  export interface CreateCollectionParams {
    /** The name of the collection. The name can contain alphanumeric, underscore, hyphen, and dot characters. It
     *  cannot begin with the reserved prefix `sys-`.
     */
    name?: string;
    /** The description of the collection. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listCollections` operation. */
  export interface ListCollectionsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCollection` operation. */
  export interface GetCollectionParams {
    /** The identifier of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCollection` operation. */
  export interface UpdateCollectionParams {
    /** The identifier of the collection. */
    collectionId: string;
    /** The name of the collection. The name can contain alphanumeric, underscore, hyphen, and dot characters. It
     *  cannot begin with the reserved prefix `sys-`.
     */
    name?: string;
    /** The description of the collection. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCollection` operation. */
  export interface DeleteCollectionParams {
    /** The identifier of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addImages` operation. */
  export interface AddImagesParams {
    /** The identifier of the collection. */
    collectionId: string;
    /** An array of image files (.jpg or .png) or .zip files with images.
     *  - Include a maximum of 20 images in a request.
     *  - Limit the .zip file to 100 MB.
     *  - Limit each image file to 10 MB.
     *
     *  You can also include an image with the **image_url** parameter.
     */
    imagesFile?: FileWithMetadata[];
    /** The array of URLs of image files (.jpg or .png).
     *  - Include a maximum of 20 images in a request.
     *  - Limit each image file to 10 MB.
     *  - Minimum width and height is 30 pixels, but the service tends to perform better with images that are at least
     *  300 x 300 pixels. Maximum is 5400 pixels for either height or width.
     *
     *  You can also include images with the **images_file** parameter.
     */
    imageUrl?: string[];
    /** Training data for a single image. Include training data only if you add one image with the request.
     *
     *  The `object` property can contain alphanumeric, underscore, hyphen, space, and dot characters. It cannot begin
     *  with the reserved prefix `sys-` and must be no longer than 32 characters.
     */
    trainingData?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listImages` operation. */
  export interface ListImagesParams {
    /** The identifier of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getImageDetails` operation. */
  export interface GetImageDetailsParams {
    /** The identifier of the collection. */
    collectionId: string;
    /** The identifier of the image. */
    imageId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteImage` operation. */
  export interface DeleteImageParams {
    /** The identifier of the collection. */
    collectionId: string;
    /** The identifier of the image. */
    imageId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getJpegImage` operation. */
  export interface GetJpegImageParams {
    /** The identifier of the collection. */
    collectionId: string;
    /** The identifier of the image. */
    imageId: string;
    /** Specify the image size. */
    size?: GetJpegImageConstants.Size | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getJpegImage` operation. */
  export namespace GetJpegImageConstants {
    /** Specify the image size. */
    export enum Size {
      FULL = 'full',
    }
  }

  /** Parameters for the `train` operation. */
  export interface TrainParams {
    /** The identifier of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addImageTrainingData` operation. */
  export interface AddImageTrainingDataParams {
    /** The identifier of the collection. */
    collectionId: string;
    /** The identifier of the image. */
    imageId: string;
    /** Training data for specific objects. */
    objects?: TrainingDataObject[];
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

  /** Results for all images. */
  export interface AnalyzeResponse {
    /** Analyzed images. */
    images: Image[];
    /** Information about what might cause less than optimal output. */
    warnings?: Warning[];
    /** A unique identifier of the request. Included only when an error or warning is returned. */
    trace?: string;
  }

  /** Details about a collection. */
  export interface Collection {
    /** The identifier of the collection. */
    collection_id: string;
    /** The name of the collection. */
    name: string;
    /** The description of the collection. */
    description: string;
    /** Date and time in Coordinated Universal Time (UTC) that the collection was created. */
    created: string;
    /** Date and time in Coordinated Universal Time (UTC) that the collection was most recently updated. */
    updated: string;
    /** Number of images in the collection. */
    image_count: number;
    /** Training status information for the collection. */
    training_status: TrainingStatus;
  }

  /** The objects in a collection that are detected in an image. */
  export interface CollectionObjects {
    /** The identifier of the collection. */
    collection_id: string;
    /** The identified objects in a collection. */
    objects: ObjectDetail[];
  }

  /** A container for the list of collections. */
  export interface CollectionsList {
    /** The collections in this service instance. */
    collections: Collection[];
  }

  /** Container for the list of collections that have objects detected in an image. */
  export interface DetectedObjects {
    /** The collections with identified objects. */
    collections?: CollectionObjects[];
  }

  /** Details about an error. */
  export interface Error {
    /** Identifier of the problem. */
    code: string;
    /** An explanation of the problem with possible solutions. */
    message: string;
    /** A URL for more information about the solution. */
    more_info?: string;
    /** Details about the specific area of the problem. */
    target?: ErrorTarget;
  }

  /** Details about the specific area of the problem. */
  export interface ErrorTarget {
    /** The parameter or property that is the focus of the problem. */
    type: string;
    /** The property that is identified with the problem. */
    name: string;
  }

  /** Details about an image. */
  export interface Image {
    /** The source type of the image. */
    source: ImageSource;
    /** Height and width of an image. */
    dimensions: ImageDimensions;
    /** Container for the list of collections that have objects detected in an image. */
    objects: DetectedObjects;
    /** Details about an error. */
    errors?: Error;
  }

  /** Details about an image. */
  export interface ImageDetails {
    /** The identifier of the image. */
    image_id: string;
    /** Date and time in Coordinated Universal Time (UTC) that the image was most recently updated. */
    updated: string;
    /** Date and time in Coordinated Universal Time (UTC) that the image was created. */
    created: string;
    /** The source type of the image. */
    source: ImageSource;
    /** Height and width of an image. */
    dimensions: ImageDimensions;
    /** Details about an error. */
    errors?: Error;
    /** Training data for all objects. */
    training_data: TrainingDataObjects;
  }

  /** List of information about the images. */
  export interface ImageDetailsList {
    /** The images in the collection. */
    images?: ImageDetails[];
    /** Information about what might cause less than optimal output. */
    warnings?: Warning[];
    /** A unique identifier of the request. Included only when an error or warning is returned. */
    trace?: string;
  }

  /** Height and width of an image. */
  export interface ImageDimensions {
    /** Height in pixels of the image. */
    height: number;
    /** Width in pixels of the image. */
    width: number;
  }

  /** The source type of the image. */
  export interface ImageSource {
    /** The source type of the image. */
    type: string;
    /** Name of the image file if uploaded. Not returned when the image is passed by URL. */
    filename?: string;
    /** Name of the .zip file of images if uploaded. Not returned when the image is passed directly or by URL. */
    archive_filename?: string;
    /** Source of the image before any redirects. Not returned when the image is uploaded. */
    source_url?: string;
    /** Fully resolved URL of the image after redirects are followed. Not returned when the image is uploaded. */
    resolved_url?: string;
  }

  /** Basic information about an image. */
  export interface ImageSummary {
    /** The identifier of the image. */
    image_id?: string;
    /** Date and time in Coordinated Universal Time (UTC) that the image was most recently updated. */
    updated?: string;
  }

  /** List of images. */
  export interface ImageSummaryList {
    /** The images in the collection. */
    images: ImageSummary[];
  }

  /** Defines the location of the bounding box around the object. */
  export interface Location {
    /** Y-position of top-left pixel of the bounding box. */
    top: number;
    /** X-position of top-left pixel of the bounding box. */
    left: number;
    /** Width in pixels of of the bounding box. */
    width: number;
    /** Height in pixels of the bounding box. */
    height: number;
  }

  /** Details about an object in the collection. */
  export interface ObjectDetail {
    /** The label for the object. */
    object: string;
    /** Defines the location of the bounding box around the object. */
    location: Location;
    /** Confidence score for the object in the range of 0 to 1. A higher score indicates greater likelihood that the
     *  object is depicted at this location in the image.
     */
    score: number;
  }

  /** Training status for the objects in the collection. */
  export interface ObjectTrainingStatus {
    /** Whether you can analyze images in the collection with the **objects** feature. */
    ready: boolean;
    /** Whether training is in progress. */
    in_progress: boolean;
    /** Whether there are changes to the training data since the most recent training. */
    data_changed: boolean;
    /** Whether the most recent training failed. */
    latest_failed: boolean;
    /** Details about the training. If training is in progress, includes information about the status. If training
     *  is not in progress, includes a success message or information about why training failed.
     */
    description: string;
  }

  /** Details about the training data. */
  export interface TrainingDataObject {
    /** The name of the object. */
    object?: string;
    /** Defines the location of the bounding box around the object. */
    location?: Location;
  }

  /** Training data for all objects. */
  export interface TrainingDataObjects {
    /** Training data for specific objects. */
    objects?: TrainingDataObject[];
  }

  /** Training status information for the collection. */
  export interface TrainingStatus {
    /** Training status for the objects in the collection. */
    objects: ObjectTrainingStatus;
  }

  /** Details about a problem. */
  export interface Warning {
    /** Identifier of the problem. */
    code: string;
    /** An explanation of the problem with possible solutions. */
    message: string;
    /** A URL for more information about the solution. */
    more_info?: string;
  }

}

export = VisualRecognitionV4;
