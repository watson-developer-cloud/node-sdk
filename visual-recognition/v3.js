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

'use strict';

const extend = require('extend');
const requestFactory = require('../lib/requestwrapper');
const helper = require('../lib/helper');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 * @param {Object} options
 * @param {String} options.version_date - Release date of the API version in YYYY-MM-DD format.
 * @constructor
 */
function VisualRecognitionV3(options) {
  BaseService.call(this, options);
  // check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use 2016-05-20');
  }
  this._options.qs.version = options.version_date;
}
util.inherits(VisualRecognitionV3, BaseService);
VisualRecognitionV3.prototype.name = 'visual_recognition';
VisualRecognitionV3.prototype.version = 'v3';
VisualRecognitionV3.URL = 'https://gateway.watsonplatform.net/visual-recognition/api';


/**
 * Classify images.
 *
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {File} [params.images_file] - An image file (.jpg, .png) or .zip file with images. Include no more than 20 images and limit the .zip file to 5 MB. You can also include images with the `url` property in the **parameters** object.
 * @param {string} [params.parameters] - Specifies input parameters. The parameter can include these inputs in a JSON object:  - url: A string with the image URL to analyze. You can also include images in the **images_file** parameter. - classifier_ids: An array of classifier IDs to classify the images against. - owners: An array with the values IBM, me, or both to specify which classifiers to run. - threshold: A floating point value that specifies the minimum score a class must have to be displayed in the response.  For example: {"url": "...", "classifier_ids": ["...","..."], "owners": ["IBM", "me"], "threshold": 0.4}.
 * @param {string} [params.accept_language] - Specifies the language of the output class names.  Can be `en` (English), `ar` (Arabic), `de` (German), `es` (Spanish), `it` (Italian), `ja` (Japanese), or `ko` (Korean).  Classes for which no translation is available are omitted.  The response might not be in the specified language under these conditions: - English is returned when the requested language is not supported. - Classes are not returned when there is no translation for them. - Custom classifiers returned with this method return tags in the language of the custom classifier.
 * @param {string} [params.images_file_content_type] - The content type of images_file.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.classify = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    options: {
      url: '/v3/classify',
      method: 'POST',
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Detect faces in an image.
 *
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {File} [params.images_file] - An image file (.jpg, .png) or .zip file with images. Include no more than 15 images. You can also include images with the `url` property in the **parameters** object.  All faces are detected, but if there are more than 10 faces in an image, age and gender confidence scores might return scores of 0.
 * @param {string} [params.parameters] - A JSON string containing the image URL to analyze.   For example: {"url": "..."}.
 * @param {string} [params.images_file_content_type] - The content type of images_file.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.detectFaces = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    options: {
      url: '/v3/detect_faces',
      method: 'POST',
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Create a classifier.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.name - The name of the new classifier. Cannot contain special characters.
 * @param {File} params.classname_positive_examples - A compressed (.zip) file of images that depict the visual subject for a class within the new classifier. Must contain a minimum of 10 images. The swagger limits you to training only one class. To train more classes, use the API functionality.
 * @param {File} [params.negative_examples] - A compressed (.zip) file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.createClassifier = function(params, callback) {
  params = params || {};
  const requiredParams = ['name', 'classname_positive_examples'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const parameters = {
    options: {
      url: '/v3/classifiers',
      method: 'POST',
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a custom classifier.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.classifier_id - The ID of the classifier.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.deleteClassifier = function(params, callback) {
  params = params || {};
  const requiredParams = ['classifier_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { classifier_id: params.classifier_id };
  const parameters = {
    options: {
      url: '/v3/classifiers/{classifier_id}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieve information about a custom classifier.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.classifier_id - The ID of the classifier.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.getClassifier = function(params, callback) {
  params = params || {};
  const requiredParams = ['classifier_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { classifier_id: params.classifier_id };
  const parameters = {
    options: {
      url: '/v3/classifiers/{classifier_id}',
      method: 'GET',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieve a list of custom classifiers.
 *
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {boolean} [params.verbose] - Specify true to return classifier details. Omit this parameter to return a brief list of classifiers.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.listClassifiers = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const query = { verbose: params.verbose };
  const parameters = {
    options: {
      url: '/v3/classifiers',
      method: 'GET',
      qs: query,
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Update a classifier.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.classifier_id - The ID of the classifier.
 * @param {File} [params.classname_positive_examples] - A compressed (.zip) file of images that depict the visual subject for a class within the classifier. Must contain a minimum of 10 images.
 * @param {File} [params.negative_examples] - A compressed (.zip) file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.updateClassifier = function(params, callback) {
  params = params || {};
  const requiredParams = ['classifier_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { classifier_id: params.classifier_id };
  const parameters = {
    options: {
      url: '/v3/classifiers/{classifier_id}',
      method: 'POST',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Create a new collection - beta.
 *
 * Create a new collection of images to search. You can create a maximum of 5 collections.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.name - The name of the new collection. The name can be a maximum of 128 UTF8 characters, with no spaces.
 * @param {File} [params.disregard] - Disregard this parameter. In order for the swagger spec to work, there needs to be at least one file in a multipart/form-data call. Uploading a file using this parameter has no impact on the collection.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.createCollection = function(params, callback) {
  params = params || {};
  const requiredParams = ['name'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const parameters = {
    options: {
      url: '/v3/collections',
      method: 'POST',
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Find similar images - beta.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.collection_id - The ID of your collection.
 * @param {File} params.image_file - The image file (.jpg or .png) of the image to search against the collection.
 * @param {number} [params.limit] - The number of similar results you want returned. Default limit is 10 results, you can specify a maximum limit of 100 results.
 * @param {string} [params.image_file_content_type] - The content type of image_file.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.findSimilarImages = function(params, callback) {
  params = params || {};
  const requiredParams = ['collection_id', 'image_file'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { limit: params.limit };
  const path = { collection_id: params.collection_id };
  const parameters = {
    options: {
      url: '/v3/collections/{collection_id}/find_similar',
      method: 'POST',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Retrieve collection details - beta.
 *
 * Retrieve information about a specific collection. Only user-created collections can be specified.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.collection_id - The ID of your collection.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.getCollection = function(params, callback) {
  params = params || {};
  const requiredParams = ['collection_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { collection_id: params.collection_id };
  const parameters = {
    options: {
      url: '/v3/collections/{collection_id}',
      method: 'GET',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List all custom collections - beta.
 *
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.listCollections = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    options: {
      url: '/v3/collections',
      method: 'GET',
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Add images to a collection - beta.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.collection_id - The ID of your collection.
 * @param {File} params.image_file - The image file (.jpg or .png) of the image to add to the collection. Maximum file size of 2 MB.
 * @param {File} [params.metadata] - A json object file that adds metadata to the image. Maximum 2 KB of metadata for each image.
 * @param {string} [params.image_file_content_type] - The content type of image_file.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.addCollectionImage = function(params, callback) {
  params = params || {};
  const requiredParams = ['collection_id', 'image_file'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { collection_id: params.collection_id };
  const parameters = {
    options: {
      url: '/v3/collections/{collection_id}/images',
      method: 'POST',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a collection - beta.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.collection_id - The ID of your collection.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.deleteCollection = function(params, callback) {
  params = params || {};
  const requiredParams = ['collection_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { collection_id: params.collection_id };
  const parameters = {
    options: {
      url: '/v3/collections/{collection_id}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete an image - beta.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.collection_id - The ID of your collection.
 * @param {string} params.image_id - The ID of your image.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.deleteCollectionImage = function(params, callback) {
  params = params || {};
  const requiredParams = ['collection_id', 'image_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { collection_id: params.collection_id, image_id: params.image_id };
  const parameters = {
    options: {
      url: '/v3/collections/{collection_id}/images/{image_id}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete image metadata - beta.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.collection_id - The ID of your collection.
 * @param {string} params.image_id - The ID of your image.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.deleteImageMetadata = function(params, callback) {
  params = params || {};
  const requiredParams = ['collection_id', 'image_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { collection_id: params.collection_id, image_id: params.image_id };
  const parameters = {
    options: {
      url: '/v3/collections/{collection_id}/images/{image_id}/metadata',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List image details - beta.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.collection_id - The ID of your collection.
 * @param {string} params.image_id - The ID of your image.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.getCollectionImage = function(params, callback) {
  params = params || {};
  const requiredParams = ['collection_id', 'image_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { collection_id: params.collection_id, image_id: params.image_id };
  const parameters = {
    options: {
      url: '/v3/collections/{collection_id}/images/{image_id}',
      method: 'GET',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List 100 images in a collection - beta.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {string} params.collection_id - The ID of your collection.
 * @param {Function} [callback] - The callback that handles the response.
 */
VisualRecognitionV3.prototype.listCollectionImages = function(params, callback) {
  params = params || {};
  const requiredParams = ['collection_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { collection_id: params.collection_id };
  const parameters = {
    options: {
      url: '/v3/collections/{collection_id}/images',
      method: 'GET',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

module.exports = VisualRecognitionV3;