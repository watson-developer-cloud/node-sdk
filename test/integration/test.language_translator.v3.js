'use strict';

const nock = require('nock');
const watson = require('../../index');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;
const TWO_SECONDS = 2000;

// todo: figure out why these started all failing with Not Authorized
describe('language_translator_integration', function() {
  this.timeout(TWENTY_SECONDS * 2);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let language_translator;

  before(function() {
    auth.language_translator.v3.version = '2018-05-01';
    language_translator = new watson.LanguageTranslatorV3(auth.language_translator.v3);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('listModels()', function(done) {
    language_translator.listModels(null, done);
  });

  it('translate()', function(done) {
    const params = {
      text: 'this is a test',
      source: 'en',
      target: 'es',
    };
    language_translator.translate(params, done);
  });

  it('listIdentifiableLanguages()', function(done) {
    language_translator.listIdentifiableLanguages(null, done);
  });

  it('identify()', function(done) {
    const params = {
      text: 'this is an important test that needs to work',
    };
    language_translator.identify(params, done);
  });
});
