'use strict';

const watson = require('../../index');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

// todo: figure out why these started all failing with Not Authorized
describe('language_translator_integration', function() {
  jest.setTimeout(TWENTY_SECONDS * 2);

  const language_translator = new watson.LanguageTranslatorV2(auth.language_translator.v2);

  it('getModels()', function(done) {
    language_translator.getModels(null, done);
  });

  it('getIdentifiableLanguages()', function(done) {
    language_translator.getIdentifiableLanguages(null, done);
  });

  it('identify()', function(done) {
    const params = {
      text: 'this is an important test that needs to work',
    };
    language_translator.identify(params, done);
  });
});
