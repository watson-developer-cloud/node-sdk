import extend = require('extend');
import GeneratedVisualRecognitionV3 = require('./v3-generated');

class VisualRecognitionV3 extends GeneratedVisualRecognitionV3 {
  static VERSION_DATE_2016_05_20: string = '2016-05-20';

  private static betaError: Error = new Error(
    'As of September 8, 2017, the beta period for Similarity Search is closed.' +
      'For more information, see [Visual Recognition API – Similarity Search Update]' +
      '(https://www.ibm.com/blogs/bluemix/2017/08/visual-recognition-api-similarity-search-update)'
  );

  constructor(options) {
    // For backward compatibility, allow version to be passed in version_date.
    const _options = extend({}, options);
    _options.version = _options.version_date || _options.version;
    super(_options);
  }
  classify(params, callback) {
    if (params && params.image_file) {
      params.images_file = params.image_file;
    }
    const newParams = params? extend({}, params, ...(params.parameters || {})) : params;
    return super.classify(newParams, callback);
  }

  detectFaces(params, callback) {
    if (params && params.image_file) {
      params.images_file = params.image_file;
    }
    const newParams = params? extend({}, params, ...(params.parameters || {})) : params;
    return super.detectFaces(newParams, callback);
  }

  retrainClassifier(params, callback) {
    console.warn("WARNING: retrainClassifier() was renamed to updateClassifier(). Support for retrainClassifier() will be removed in the next major release");
    return super.updateClassifier(params, callback);
  }

  recognizeText(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  createCollection(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  getCollection(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  listCollections(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  deleteCollection(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  addImage(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  listImages(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  getImage(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  deleteImage(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  setImageData(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  getImageData(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  deleteImageData(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }

  findSimilar(params, callback) {
    console.warn(VisualRecognitionV3.betaError);
  }
}

export = VisualRecognitionV3;
