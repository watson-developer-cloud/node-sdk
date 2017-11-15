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

  private parseParameters(params, callback) {
    const _callback = callback ? callback : () => {};
    const err = new Error(
      'Watson VisualRecognition.classify() requires either an images_file or a url parameter'
    );
    if (!params) {
      return _callback(err);
    }
    params.images_file = params.images_file || params.image_file;
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
        this.xor(params.images_file, params.url) ||
        this.xor(params.images_file, _parameters.url)
      )
    ) {
      return _callback(err);
    }
    const _url = _parameters.url || params.url;
    const _classifier_ids = _parameters.classifier_ids || params.classifier_ids;
    const _owners = _parameters.owners || params.owners;
    const _threshold = _parameters.threshold || params.threshold;
    let _obj = {
      url: _url,
      classifier_ids: _classifier_ids,
      owners: _owners,
      threshold: _threshold
    };
    // remove null/undefined keys
    Object.keys(_obj).forEach(key => {
      _obj[key] == null && delete _obj[key];
    });
    return Object.keys(_obj).length > 0 ? _obj : null;
  }

  classify(params, callback) {
    const _parameters = this.parseParameters(params, callback) || {};
    // set defaults for classify()
    if (!_parameters.classifier_ids) {
      _parameters.classifier_ids = ['default'];
    }
    if (!_parameters.owners) {
      _parameters.owners = ['me', 'IBM'];
    }
    const _params = extend(params, { parameters: JSON.stringify(_parameters) });
    return super.classify(_params, callback);
  }

  detectFaces(params, callback) {
    if (!params || !this.xor(params.url, params.images_file)) {
      return callback(
        new Error(
          'Watson VisualRecognition.classify() requires either an images_file or a url parameter'
        )
      );
    }
    if (!params.url && params.images_file) {
      // if images_file
      return super.classify(params, callback);
    } else if (params.url && !params.images_file) {
      const _params = extend(params, {
        parameters: JSON.stringify({ url: params.url })
      });
      return super.classify(_params, callback);
    }
  }

  createClassifier(params, callback) {
    const _callback = callback ? callback : () => {};
    if (!params) {
      return _callback(
        new Error(
          'Missing required parameters: either two *_positive_examples' +
            'or one *_positive_examples and one negative_examples are required'
        )
      );
    }
    const example_keys = Object.keys(params).filter(key => {
      return key === 'negative_examples' || key.match(/^.+positive_examples$/);
    });
    if (example_keys.length < 2) {
      return _callback(
        new Error(
          'Missing required parameters: either two *_positive_examples' +
            'or one *_positive_examples and one negative_examples are required'
        )
      );
    }
    return super.createClassifier(params, _callback);
  }

  retrainClassifier(params, callback) {
    return super.updateClassifier(params, callback);
  }
}

export = VisualRecognitionV3;
