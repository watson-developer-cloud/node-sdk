'use strict';

const NaturalLanguageClassifierV1 = require('../../natural-language-classifier/v1');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('natural_language_classifier_integration', function() {
  jest.setTimeout(TWENTY_SECONDS);

  const natural_language_classifier = new NaturalLanguageClassifierV1(
    auth.natural_language_classifier
  );

  it('getClassifier', function(done) {
    const params = {
      classifier_id: auth.natural_language_classifier.classifier_id,
    };
    natural_language_classifier.getClassifier(params, function(err, result) {
      if (err) {
        return done(err);
      }
      expect(result.classifier_id).toBe(params.classifier_id);
      done();
    });
  });

  it('classifyCollection', function(done) {
    const params = {
      classifier_id: auth.natural_language_classifier.classifier_id,
      collection: [{ text: 'string' }],
    };
    natural_language_classifier.classifyCollection(params, function(err, result) {
      if (err) {
        return done(err);
      }
      expect(result.classifier_id).toBe(params.classifier_id);
      done();
    });
  });
});
