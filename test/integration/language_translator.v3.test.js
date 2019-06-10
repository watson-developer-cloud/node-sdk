'use strict';

const fs = require('fs');
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

  describe('models', function() {
    let base_model_id;
    let model_id;
    it('should list all the models', function(done) {
      language_translator.listModels(
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          base_model_id = res.models[0].model_id;
          done();
        })
      );
    });

    it('should create a model', function(done) {
      language_translator.createModel(
        {
          base_model_id,
          forced_glossary: fs.createReadStream('./test/resources/glossary.tmx'),
        },
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          model_id = res.model_id;
          done();
        })
      );
    });

    it('should get the details of the model', function(done) {
      if (!model_id) {
        // We cannot run this test when model creation failed.
        return done();
      }

      language_translator.getModel({ model_id }, serviceErrorUtils.checkErrorCode(200, done));
    });

    it('should delete the model', function(done) {
      if (!model_id) {
        // We cannot run this test when model creation failed.
        return done();
      }

      language_translator.deleteModel({ model_id }, serviceErrorUtils.checkErrorCode(200, done));
    });
  });

  describe('documentTranslation @slow', function() {
    let document_id;
    // The service was down, could not test the test.
    it('should translate document', function(done) {
      language_translator.translateDocument(
        {
          file: fs.createReadStream('./test/resources/alchemy-text.txt'),
          filename: 'alchemy-text.txt',
          model_id: 'en-es',
        },
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          document_id = res.document_id;
          done();
        })
      );
    });

    it('should list translated documents', function(done) {
      language_translator.listDocuments(
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          done();
        })
      );
      done();
    });

    it('should get translated document status', function(done) {
      if (!document_id) {
        // We cannot run this test when document upload failed.
        return done();
      }

      language_translator.getDocumentStatus(
        {
          document_id,
        },
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          done();
        })
      );
      done();
    });

    it('should get translated document', function(done) {
      if (!document_id) {
        // We cannot run this test when document upload failed.
        return done();
      }

      language_translator.getTranslatedDocument(
        {
          document_id,
        },
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          done();
        })
      );
      done();
    });

    it('should delete document', function(done) {
      if (!document_id) {
        // We cannot run this test when document upload failed.
        return done();
      }

      language_translator.deleteDocument(
        {
          document_id,
        },
        serviceErrorUtils.checkErrorCode(200, (err, res) => {
          done();
        })
      );
      done();
    });
  });
});
