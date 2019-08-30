'use strict';

const { IamAuthenticator } = require('../../auth');
const NaturalLanguageClassifierV1 = require('../../natural-language-classifier/v1');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('natural_language_classifier_integration', function() {
  jest.setTimeout(TWENTY_SECONDS);

  const options = authHelper.auth.natural_language_classifier;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const natural_language_classifier = new NaturalLanguageClassifierV1(options);
  const { classifierId } = options;

  it('getClassifier', function(done) {
    const params = {
      classifierId,
    };
    natural_language_classifier.getClassifier(params, (err, { result }) => {
      expect(result.classifier_id).toBe(params.classifierId);
      done();
    });
  });

  it('classifyCollection', function(done) {
    const params = {
      classifierId,
      collection: [{ text: 'string' }],
    };
    natural_language_classifier.classifyCollection(params, (err, { result }) => {
      expect(result.classifier_id).toBe(params.classifierId);
      done();
    });
  });
});
