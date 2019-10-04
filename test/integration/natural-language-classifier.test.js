'use strict';

const { IamAuthenticator } = require('../../auth');
const NaturalLanguageClassifierV1 = require('../../natural-language-classifier/v1');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('natural language classifier integration', () => {
  jest.setTimeout(TWENTY_SECONDS);

  const options = authHelper.auth.naturalLanguageClassifier;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const naturalLanguageClassifier = new NaturalLanguageClassifierV1(options);
  const { classifierId } = options;

  it('getClassifier', done => {
    const params = {
      classifierId,
    };
    naturalLanguageClassifier.getClassifier(params, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.classifier_id).toBe(params.classifierId);
      done();
    });
  });

  it('classifyCollection', done => {
    const params = {
      classifierId,
      collection: [{ text: 'string' }],
    };
    naturalLanguageClassifier.classifyCollection(params, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.classifier_id).toBe(params.classifierId);
      done();
    });
  });
});
