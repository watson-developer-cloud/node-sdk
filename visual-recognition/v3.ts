import GeneratedVisualRecognitionV3 = require('./v3-generated');
import extend = require('extend');

class VisualRecognitionV3 extends GeneratedVisualRecognitionV3 {
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

  private xor(a, b): boolean {
    return (a || b) && !(a && b);
  }

  private checkVisionParams(params) {
    const err = new Error(
      'Watson VisualRecognition.classify() requires either an images_file or a url parameter'
    );
    if (!params) {
      throw err;
    }
    const _images_file = params.images_file || params.images_file;
    // need a try/catch for parameters since it can be stringified JSON
    // or it can be null if users are using old parameter names
    let _parameters;
    try {
      _parameters = JSON.parse(params.parameters);
    } catch (e) {
      _parameters = {};
    }
    if (
      !(
        this.xor(_images_file, params.url) ||
        this.xor(_images_file, _parameters.url)
      )
    ) {
      throw err;
    }
  }

  private parseParameters(params) {
    let parameters;
    try {
      parameters = JSON.parse(params.parameters);
    } catch (e) {
      parameters = {};
    }
    const parameters_keys = ['url', 'classifier_ids', 'owners', 'threshold'];
    let _parameters = {};
    parameters_keys.forEach(key => {
      if (parameters[key] || params[key]) {
        _parameters[key] = parameters[key] || params[key];
      }
    });
    return Object.keys(_parameters).length > 0 ? _parameters : null;
  }

  classify(params, callback) {
    const _callback = typeof callback === 'function' ? callback : () => {};
    try {
      this.checkVisionParams(params);
    } catch (e) {
      return _callback(e);
    }
    if (params.image_file) {
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
    return super.classify(_params, _callback);
  }

  detectFaces(params, callback) {
    const _callback = typeof callback === 'function' ? callback : () => {};
    try {
      this.checkVisionParams(params);
    } catch (e) {
      return _callback(e);
    }
    if (params.image_file) {
      params.images_file = params.image_file;
    }
    const _params = extend({}, params, {
      parameters: this.parseParameters(params)
    });
    return super.detectFaces(_params, _callback);
  }

  createClassifier(params, callback) {
    const _callback = callback ? callback : () => {};
    const err = new Error(
      'Missing required parameters: either two *_positive_examples' +
        'or one *_positive_examples and one negative_examples are required'
    );
    if (!params) {
      return _callback(err);
    }
    const example_keys = Object.keys(params).filter(key => {
      return key === 'negative_examples' || key.match(/^.+positive_examples$/);
    });
    if (example_keys.length < 2) {
      return _callback(err);
    }
    return super.createClassifier(params, _callback);
  }

  retrainClassifier(params, callback) {
    return super.updateClassifier(params, callback);
  }
}

export = VisualRecognitionV3;
