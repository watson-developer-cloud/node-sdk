'use strict';

const LanguageTranslatorV3 = require('../../language-translator/v3');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const serviceErrorUtils = require('../resources/service_error_util');

// todo: figure out why these started all failing with Not Authorized
describe('language_translator_integration', function() {
  jest.setTimeout(TWENTY_SECONDS * 2);

  auth.language_translator.version = '2019-03-27';
  const language_translator = new LanguageTranslatorV3(auth.language_translator);

  it('listModels()', function(done) {
    language_translator.listModels(null, serviceErrorUtils.checkErrorCode(200, done));
  });

  it('translate()', function(done) {
    const params = {
      text: 'this is a test',
      source: 'en',
      target: 'es',
    };
    language_translator.translate(params, serviceErrorUtils.checkErrorCode(200, done));
  });

  it('listIdentifiableLanguages()', function(done) {
    language_translator.listIdentifiableLanguages(
      null,
      serviceErrorUtils.checkErrorCode(200, done)
    );
  });

  it('identify()', function(done) {
    const params = {
      text: 'this is an important test that needs to work',
    };
    language_translator.identify(params, serviceErrorUtils.checkErrorCode(200, done));
  });
});
