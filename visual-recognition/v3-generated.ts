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
 * **Important:** As of September 8, 2017, the beta period for Similarity Search is closed. For more information, see [Visual Recognition API – Similarity Search Update](https://www.ibm.com/blogs/bluemix/2017/08/visual-recognition-api-similarity-search-update).  The IBM Watson Visual Recognition service uses deep learning algorithms to identify scenes, objects, and faces  in images you upload to the service. You can create and train a custom classifier to identify subjects that suit your needs.   **Tip:** To test calls to the **Custom classifiers** methods with the API explorer, provide your `api_key` from your IBM&reg; Cloud service instance.
 */

class VisualRecognitionV3 extends BaseService {
  name: string; // set by prototype to 'visual_recognition'
  version: string; // set by prototype to 'v3'

  static URL: string = 'https://gateway-a.watsonplatform.net/visual-recognition/api';

  /**
   * Construct a VisualRecognitionV3 object.
   *
   * @param {Object} options - Options for the service.
   * @param {String} options.version_date - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/visual-recognition/api'). The base url may differ between Bluemix regions.
   * @param {String} [options.api_key] - The API key used to authenticate with the service. The API key credential is only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {VisualRecognitionV3}
   * @throws {Error}
   */
  constructor(options: VisualRecognitionV3.Options) {
    super(options);
    // check if 'version_date' was provided
    if (typeof this._options.version_date === 'undefined') {
      throw new Error('Argument error: version_date was not specified');
    }
    this._options.qs.version = options.version_date;
  }

  /*************************
   * classify
   ************************/

  /**
   * Classify images.
   *
   * Classify images with the built-in classes. You can analyze images against the built-in classifiers or against an array of classifier IDs. To identify custom classifiers, include the **classifier_ids** or **owners** parameters.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {ReadableStream|FileObject|Buffer} [params.images_file] - An image file (.jpg, .png) or .zip file with images. Include no more than 20 images and limit the .zip file to 5 MB. You can also include images with the `url` property in the **parameters** object.
   * @param {string} [params.parameters] - Specifies input parameters. The parameter can include these inputs in a JSON object:  - url: A string with the image URL to analyze. You can also include images in the **images_file** parameter. - classifier_ids: An array of classifier IDs to classify the images against. - owners: An array with the values IBM, me, or both to specify which classifiers to run. - threshold: A floating point value that specifies the minimum score a class must have to be displayed in the response.  For example: {"url": "...", "classifier_ids": ["...","..."], "owners": ["IBM", "me"], "threshold": 0.4}.
   * @param {string} [params.accept_language] - Specifies the language of the output class names.  Can be `en` (English), `ar` (Arabic), `de` (German), `es` (Spanish), `it` (Italian), `ja` (Japanese), or `ko` (Korean).  Classes for which no translation is available are omitted.  The response might not be in the specified language under these conditions: - English is returned when the requested language is not supported. - Classes are not returned when there is no translation for them. - Custom classifiers returned with this method return tags in the language of the custom classifier.
   * @param {string} [params.images_file_content_type] - The content type of images_file.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  classify(
    params?: VisualRecognitionV3.ClassifyParams,
    callback?: VisualRecognitionV3.Callback<
      VisualRecognitionV3.ClassifiedImages
    >
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const formData = {
      images_file: {
        data: _params.images_file,
        contentType: _params.images_file_content_type
      },
      parameters: _params.parameters
    };
    const parameters = {
      options: {
        url: '/v3/classify',
        method: 'POST',
        formData: formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Accept-Language': _params.accept_language
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Detect faces in images.
   *
   * Analyze and get data about faces in images. Responses can include estimated age and gender, and the service can identify celebrities. This feature uses a built-in classifier, so you do not train it on custom classifiers. The Detect faces method does not support general biometric facial recognition.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {ReadableStream|FileObject|Buffer} [params.images_file] - An image file (.jpg, .png) or .zip file with images. Include no more than 15 images. You can also include images with the `url` property in the **parameters** object.  All faces are detected, but if there are more than 10 faces in an image, age and gender confidence scores might return scores of 0.
   * @param {string} [params.parameters] - A JSON string containing the image URL to analyze.   For example: {"url": "..."}.
   * @param {string} [params.images_file_content_type] - The content type of images_file.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  detectFaces(
    params?: VisualRecognitionV3.DetectFacesParams,
    callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.DetectedFaces>
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const formData = {
      images_file: {
        data: _params.images_file,
        contentType: _params.images_file_content_type
      },
      parameters: _params.parameters
    };
    const parameters = {
      options: {
        url: '/v3/detect_faces',
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

  /*************************
   * customClassifiers
   ************************/

  /**
   * Create a classifier.
   *
   * Train a new multi-faceted classifier on the uploaded image data. Create your custom classifier with positive or negative examples. Include at least two sets of examples, either two positive example files or one positive and one negative file. You can upload a maximum of 256 MB per call.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the new classifier. Cannot contain special characters.
   * @param {ReadableStream|FileObject|Buffer} params.classname_positive_examples - A .zip file of images that depict the visual subject of a class in the new classifier. You can include more than one positive example file in a call. Append `_positive_examples` to the form name. The prefix is used as the class name. For example, `goldenretriever_positive_examples` creates the class **goldenretriever**.  Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The maximum number of images is 10,000 images or 100 MB per .zip file.  The API explorer limits you to training only one class. To train more classes, use the API functionality.
   * @param {ReadableStream|FileObject|Buffer} [params.negative_examples] - A compressed (.zip) file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createClassifier(
    params: VisualRecognitionV3.CreateClassifierParams,
    callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const _positive_example_classes = Object.keys(_params).filter(key => {
      return key.match(/^.+positive_examples$/);
    }) || ['<classname>_positive_examples'];
    const requiredParams = ['name', ..._positive_example_classes];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      name: _params.name,
      negative_examples: {
        data: _params.negative_examples,
        contentType: 'application/octet-stream'
      }
    };
    _positive_example_classes.forEach(positive_example_class => {
      formData[positive_example_class] = {
        data: _params[positive_example_class],
        contentType: 'application/octet-stream'
      };
    });
    const parameters = {
      options: {
        url: '/v3/classifiers',
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
   * Delete a classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteClassifier(
    params: VisualRecognitionV3.DeleteClassifierParams,
    callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Empty>
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
        url: '/v3/classifiers/{classifier_id}',
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
   * Retrieve classifier details.
   *
   * Retrieve information about a user-created classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getClassifier(
    params: VisualRecognitionV3.GetClassifierParams,
    callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>
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
        url: '/v3/classifiers/{classifier_id}',
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
   * Retrieve a list of custom classifiers.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.verbose] - Specify `true` to return classifier details. Omit this parameter to return a brief list of classifiers.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listClassifiers(
    params?: VisualRecognitionV3.ListClassifiersParams,
    callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifiers>
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const query = {
      verbose: _params.verbose
    };
    const parameters = {
      options: {
        url: '/v3/classifiers',
        method: 'GET',
        qs: query
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
   * Update a classifier.
   *
   * Update a custom classifier by adding new positive or negative classes (examples) or by adding new images to existing classes. You must supply at least one set of positive or negative examples. For details, see [Updating custom classifiers](https://console.bluemix.net/docs/services/visual-recognition/customizing.html#updating-custom-classifiers).  **Important:** You can't update a custom classifier with a free API key. If you have a free key, you can upgrade to a Standard plan. For details, see [Changing your plan](https://console.bluemix.net/docs/pricing/changing_plan.html).  **Tip:** Don't make retraining calls on a classifier until the status is ready. When you submit retraining requests in parallel, the last request overwrites the previous requests. The retrained property shows the last time the classifier retraining finished.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {ReadableStream|FileObject|Buffer} [params.classname_positive_examples] - A .zip file of images that depict the visual subject of a class in the classifier. The positive examples create or update classes in the classifier. You can include more than one positive example file in a call. Append `_positive_examples` to the form name. The prefix is used to name the class. For example, `goldenretriever_positive_examples` creates the class `goldenretriever`.  Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The maximum number of images is 10,000 images or 100 MB per .zip file.
   * @param {ReadableStream|FileObject|Buffer} [params.negative_examples] - A compressed (.zip) file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateClassifier(
    params: VisualRecognitionV3.UpdateClassifierParams,
    callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const _positive_example_classes = Object.keys(_params).filter(key => {
      return key.match(/^.+positive_examples$/);
    });
    const requiredParams = ['classifier_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      negative_examples: {
        data: _params.negative_examples,
        contentType: 'application/octet-stream'
      }
    };
    _positive_example_classes.forEach(positive_example_class => {
      formData[positive_example_class] = {
        data: _params[positive_example_class],
        contentType: 'application/octet-stream'
      };
    });
    const path = {
      classifier_id: _params.classifier_id
    };
    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}',
        method: 'POST',
        path: path,
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
}

VisualRecognitionV3.prototype.name = 'visual_recognition';
VisualRecognitionV3.prototype.version = 'v3';

/*************************
 * interfaces
 ************************/

namespace VisualRecognitionV3 {
  /** Options for the `VisualRecognitionV3` constructor. **/
  export type Options = {
    version_date: string;
    url?: string;
    api_key?: string;
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
    /** An image file (.jpg, .png) or .zip file with images. Include no more than 20 images and limit the .zip file to 5 MB. You can also include images with the `url` property in the **parameters** object. **/
    images_file?: ReadableStream | FileObject | Buffer;
    /** Specifies input parameters. The parameter can include these inputs in a JSON object:  - url: A string with the image URL to analyze. You can also include images in the **images_file** parameter. - classifier_ids: An array of classifier IDs to classify the images against. - owners: An array with the values IBM, me, or both to specify which classifiers to run. - threshold: A floating point value that specifies the minimum score a class must have to be displayed in the response.  For example: {"url": "...", "classifier_ids": ["...","..."], "owners": ["IBM", "me"], "threshold": 0.4}. **/
    parameters?: string;
    /** Specifies the language of the output class names.  Can be `en` (English), `ar` (Arabic), `de` (German), `es` (Spanish), `it` (Italian), `ja` (Japanese), or `ko` (Korean).  Classes for which no translation is available are omitted.  The response might not be in the specified language under these conditions: - English is returned when the requested language is not supported. - Classes are not returned when there is no translation for them. - Custom classifiers returned with this method return tags in the language of the custom classifier. **/
    accept_language?: ClassifyConstants.AcceptLanguage | string;
    /** The content type of images_file. **/
    images_file_content_type?: string;
  }

  /** Constants for the `classify` operation. **/
  export namespace ClassifyConstants {
    /** Specifies the language of the output class names.  Can be `en` (English), `ar` (Arabic), `de` (German), `es` (Spanish), `it` (Italian), `ja` (Japanese), or `ko` (Korean).  Classes for which no translation is available are omitted.  The response might not be in the specified language under these conditions: - English is returned when the requested language is not supported. - Classes are not returned when there is no translation for them. - Custom classifiers returned with this method return tags in the language of the custom classifier. **/
    export enum AcceptLanguage {
      EN = 'en',
      AR = 'ar',
      DE = 'de',
      ES = 'es',
      IT = 'it',
      JA = 'ja',
      KO = 'ko'
    }
  }

  /** Parameters for the `detectFaces` operation. **/
  export interface DetectFacesParams {
    /** An image file (.jpg, .png) or .zip file with images. Include no more than 15 images. You can also include images with the `url` property in the **parameters** object.  All faces are detected, but if there are more than 10 faces in an image, age and gender confidence scores might return scores of 0. **/
    images_file?: ReadableStream | FileObject | Buffer;
    /** A JSON string containing the image URL to analyze.   For example: {"url": "..."}. **/
    parameters?: string;
    /** The content type of images_file. **/
    images_file_content_type?: string;
  }

  /** Parameters for the `createClassifier` operation. **/
  export interface CreateClassifierParams {
    /** The name of the new classifier. Cannot contain special characters. **/
    name: string;
    /** A .zip file of images that depict the visual subject of a class in the new classifier. You can include more than one positive example file in a call. Append `_positive_examples` to the form name. The prefix is used as the class name. For example, `goldenretriever_positive_examples` creates the class **goldenretriever**.  Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The maximum number of images is 10,000 images or 100 MB per .zip file.  The API explorer limits you to training only one class. To train more classes, use the API functionality. **/
    classname_positive_examples: ReadableStream | FileObject | Buffer;
    /** A compressed (.zip) file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images. **/
    negative_examples?: ReadableStream | FileObject | Buffer;
  }

  /** Parameters for the `deleteClassifier` operation. **/
  export interface DeleteClassifierParams {
    /** The ID of the classifier. **/
    classifier_id: string;
  }

  /** Parameters for the `getClassifier` operation. **/
  export interface GetClassifierParams {
    /** The ID of the classifier. **/
    classifier_id: string;
  }

  /** Parameters for the `listClassifiers` operation. **/
  export interface ListClassifiersParams {
    /** Specify `true` to return classifier details. Omit this parameter to return a brief list of classifiers. **/
    verbose?: boolean;
  }

  /** Parameters for the `updateClassifier` operation. **/
  export interface UpdateClassifierParams {
    /** The ID of the classifier. **/
    classifier_id: string;
    /** A .zip file of images that depict the visual subject of a class in the classifier. The positive examples create or update classes in the classifier. You can include more than one positive example file in a call. Append `_positive_examples` to the form name. The prefix is used to name the class. For example, `goldenretriever_positive_examples` creates the class `goldenretriever`.  Include at least 10 images in .jpg or .png format. The minimum recommended image resolution is 32X32 pixels. The maximum number of images is 10,000 images or 100 MB per .zip file. **/
    classname_positive_examples?: ReadableStream | FileObject | Buffer;
    /** A compressed (.zip) file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images. **/
    negative_examples?: ReadableStream | FileObject | Buffer;
  }

  /*************************
   * model interfaces
   ************************/

  /** A category within a classifier. **/
  export interface Class {
    /** The name of the class. **/
    class_name: string;
  }

  /** Result of a class within a classifier. **/
  export interface ClassResult {
    /** The name of the class. **/
    class_name: string;
    /** Confidence score for the property. Scores range from 0-1, with a higher score indicating greater correlation. **/
    score?: number;
    /** Knowledge graph of the property. For example, `People/Leaders/Presidents/USA/Barack Obama`. Included only if identified. **/
    type_hierarchy?: string;
  }

  /** Classifier results for one image. **/
  export interface ClassifiedImage {
    /** Source of the image before any redirects. Not returned when the image is uploaded. **/
    source_url?: string;
    /** Fully resolved URL of the image after redirects are followed. Not returned when the image is uploaded. **/
    resolved_url?: string;
    /** Relative path of the image file if uploaded directly. Not returned when the image is passed by URL. **/
    image?: string;
    error?: ErrorInfo;
    classifiers: ClassifierResult[];
  }

  /** Classify results for multiple images. **/
  export interface ClassifiedImages {
    /** The number of custom classes identified in the images. **/
    custom_classes?: number;
    /** Number of images processed for the API call. **/
    images_processed?: number;
    /** The array of classified images. **/
    images: ClassifiedImage[];
    /** Information about what might cause less than optimal output. For example, a request sent with a corrupt .zip file and a list of image URLs will still complete, but does not return the expected output. Not returned when there is no warning. **/
    warnings?: WarningInfo[];
  }

  /** Information about a classifier. **/
  export interface Classifier {
    /** The ID of the classifier. **/
    classifier_id: string;
    /** The name of the classifier. **/
    name: string;
    /** Unique ID of the account who owns the classifier. **/
    owner?: string;
    /** The training status of classifier. **/
    status?: string;
    /** If classifier training has failed, this field may explain why. **/
    explanation?: string;
    /** The time and date when classifier was created. **/
    created?: string;
    /** An array of classes that define a classifier. **/
    classes?: Class[];
  }

  /** Classifier and score combination. **/
  export interface ClassifierResult {
    /** Name of the classifier. **/
    name: string;
    /** Classifier ID.  Only returned if custom classifier. **/
    classifier_id: string;
    /** An array of classes within a classifier. **/
    classes: ClassResult[];
  }

  /** Verbose list of classifiers retrieved in the GET v2/classifiers call. **/
  export interface Classifiers {
    classifiers: Classifier[];
  }

  /** DetectedFaces. **/
  export interface DetectedFaces {
    /** Number of images processed for the API call. **/
    images_processed?: number;
    /** The array of images. **/
    images: ImageWithFaces[];
    /** Information about what might cause less than optimal output. For example, a request sent with a corrupt .zip file and a list of image URLs will still complete, but does not return the expected output. Not returned when there is no warning. **/
    warnings?: WarningInfo[];
  }

  /** Information about what might have caused a failure, such as an image that is too large. Not returned when there is no error. **/
  export interface ErrorInfo {
    /** Codified error string. For example, `limit_exceeded`. **/
    error_id: string;
    /** Human-readable error description. For example, `File size limit exceeded`. **/
    description: string;
  }

  /** Provides information about the face. **/
  export interface Face {
    age?: FaceAge;
    gender?: FaceGender;
    face_location?: FaceLocation;
    identity?: FaceIdentity;
  }

  /** Provides age information about a face. If there are more than 10 faces in an image, the response might return the confidence score `0g. **/
  export interface FaceAge {
    /** Estimated minimum age. **/
    min?: number;
    /** Estimated maximum age. **/
    max?: number;
    /** Confidence score for the property. Scores range from 0-1, with a higher score indicating greater correlation. **/
    score?: number;
  }

  /** Provides information about the gender of the face. If there are more than 10 faces in an image, the response might return the confidence score 0. **/
  export interface FaceGender {
    /** Gender identified by the face. For example, `MALE` or `FEMALE`. **/
    gender: string;
    /** Confidence score for the property. Scores range from 0-1, with a higher score indicating greater correlation. **/
    score?: number;
  }

  /** Provides information about a celebrity who is detected in the image. Not returned when a celebrity is not detected. **/
  export interface FaceIdentity {
    /** Name of the person. **/
    name: string;
    /** Confidence score for the property. Scores range from 0-1, with a higher score indicating greater correlation. **/
    score?: number;
    /** Knowledge graph of the property. For example, `People/Leaders/Presidents/USA/Barack Obama`. Included only if identified. **/
    type_hierarchy?: string;
  }

  /** Defines the location of the bounding box around the face. **/
  export interface FaceLocation {
    /** Width in pixels of face region. **/
    width: number;
    /** Height in pixels of face region. **/
    height: number;
    /** X-position of top-left pixel of face region. **/
    left: number;
    /** Y-position of top-left pixel of face region. **/
    top: number;
  }

  /** ImageWithFaces. **/
  export interface ImageWithFaces {
    /** An array of the faces detected in the images. **/
    faces: Face[];
    /** Relative path of the image file if uploaded directly. Not returned when the image is passed by URL. **/
    image?: string;
    /** Source of the image before any redirects. Not returned when the image is uploaded. **/
    source_url?: string;
    /** Fully resolved URL of the image after redirects are followed. Not returned when the image is uploaded. **/
    resolved_url?: string;
    error?: ErrorInfo;
  }

  /** Information about something that went wrong. **/
  export interface WarningInfo {
    /** Codified warning string, such as `limit_reached`. **/
    warning_id: string;
    /** Information about the error. **/
    description: string;
  }
}

export = VisualRecognitionV3;
