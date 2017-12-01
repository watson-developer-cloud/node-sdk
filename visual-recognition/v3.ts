import GeneratedVisualRecognitionV3 = require('./v3-generated');
import extend = require('extend');

class VisualRecognitionV3 extends GeneratedVisualRecognitionV3 {
  static VERSION_DATE_2016_05_20: string = '2016-05-20';

  constructor(options) {
    super(options);
  }

  private static betaError: Error = new Error(
    'As of September 8, 2017, the beta period for Similarity Search is closed.' +
      'For more information, see [Visual Recognition API – Similarity Search Update]' +
      '(https://www.ibm.com/blogs/bluemix/2017/08/visual-recognition-api-similarity-search-update)'
  );

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

  private parseParameters(params) {
    const _params = params || {};
    if (_params.parameters) {
      return _params.parameters;
    }
    const _parameters = {};
    ['url', 'classifier_ids', 'owners', 'threshold'].forEach(
      key => _params[key] && (_parameters[key] = _params[key])
    );
    return _parameters;
  }

  classify(params, callback) {
    if (params && params.image_file) {
      params.images_file = params.image_file;
    }
    const defaultParameters = {
      classifier_ids: ['default'],
      owners: ['me', 'IBM']
    };
    const _parameters = extend(
      {},
      defaultParameters,
      this.parseParameters(params)
    );
    const _params = extend(params, { parameters: _parameters });
    return super.classify(_params, callback);
  }

  detectFaces(params, callback) {
    if (params && params.image_file) {
      params.images_file = params.image_file;
    }
    const _params = extend({}, params, {
      parameters: this.parseParameters(params)
    });
    return super.detectFaces(_params, callback);
  }

  retrainClassifier(params, callback) {
    return super.updateClassifier(params, callback);
  }
}

export = VisualRecognitionV3;
