import GeneratedVisualRecognitionV3 = require('./v3-generated');
import extend = require('extend');

class VisualRecognitionV3 extends GeneratedVisualRecognitionV3 {
  constructor(options) {
    super(options);
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
    const _images_file = params.images_file || params.image_file;
    // need a try/catch for parameters since it can be stringified JSON
    // or it can be null if users are using old parameter names
    let _parameters;
    try {
      _parameters = JSON.parse(params.parameters);
    } catch (e) {
      _parameters = {};
    }
    const _url = _parameters.url || params.url;
    if (
      !(
        this.xor(params.images_file, params.url) ||
        this.xor(params.images_file, _parameters.url)
      )
    ) {
      return _callback(err);
    }
    const _classifier_ids = _parameters.classifier_ids ||
      params.classifier_ids || ['default'];
    const _owners = _parameters.owners || params.owners || ['me', 'IBM'];
    const _threshold = _parameters.threshold || params.threshold;
    return JSON.stringify({
      url: _url,
      classifier_ids: _classifier_ids,
      owners: _owners,
      threshold: _threshold
    });
  }

  classify(params, callback) {
    const _parameters = this.parseParameters(params, callback);
    const _params = extend(params, { parameters: _parameters });
    return super.classify(_params, callback);
  }

  detectFaces(params, callback) {
    const _parameters = this.parseParameters(params, callback);
    const _params = extend(params, { parameters: _parameters });
    return super.classify(_params, callback);
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
