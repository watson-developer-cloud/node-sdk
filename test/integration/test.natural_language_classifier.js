'use strict';

const nock = require('nock');
const watson = require('../../index');
const assert = require('assert');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const TWO_SECONDS = 2000;

describe('natural_language_classifier_integration', function() {
  this.retries(1);

  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.timeout(TWENTY_SECONDS);
  let natural_language_classifier;

  before(function() {
    natural_language_classifier = new watson.NaturalLanguageClassifierV1(
      auth.natural_language_classifier
    );
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('getClassifier', function(done) {
    const params = {
      classifier_id: auth.natural_language_classifier.classifier_id,
    };
    natural_language_classifier.getClassifier(params, function(err, result) {
      if (err) {
        return done(err);
      }
      assert.equal(result.classifier_id, params.classifier_id);
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
      assert.equal(result.classifier_id, params.classifier_id);
      done();
    });
  });
});
