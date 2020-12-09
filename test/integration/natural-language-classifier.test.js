'use strict';

const { IamAuthenticator } = require('../../dist/auth');
const NaturalLanguageClassifierV1 = require('../../dist/natural-language-classifier/v1');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

describe('natural language classifier integration', () => {
  jest.setTimeout(TWENTY_SECONDS);

  const options = authHelper.auth.naturalLanguageClassifier;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const naturalLanguageClassifier = new NaturalLanguageClassifierV1(options);
  const { classifierId } = options;

  it('should getClassifier', async () => {
    const params = {
      classifierId,
    };
    const res = await naturalLanguageClassifier.getClassifier(params);
    const { result } = res || {};
    expect(result).toBeDefined();
    expect(result.classifier_id).toBe(params.classifierId);
  });

  it('should classifyCollection', async () => {
    const params = {
      classifierId,
      collection: [{ text: 'string' }],
    };
    const res = await naturalLanguageClassifier.classifyCollection(params);
    const { result } = res || {};
    expect(result).toBeDefined();
    expect(result.classifier_id).toBe(params.classifierId);
  });
});
