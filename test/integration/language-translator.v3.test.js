'use strict';

const fs = require('fs');
const { IamAuthenticator } = require('../../auth');
const LanguageTranslatorV3 = require('../../language-translator/v3');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const TWENTY_SECONDS = 20000;

// todo: figure out why these started all failing with Not Authorized
describe('language translator integration', () => {
  jest.setTimeout(TWENTY_SECONDS * 2);

  const options = authHelper.auth.languageTranslator;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  options.version = '2019-03-27';
  const languageTranslator = new LanguageTranslatorV3(options);

  it('listModels()', done => {
    languageTranslator.listModels(null, (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      done();
    });
  });

  it('translate()', done => {
    const params = {
      text: 'this is a test',
      source: 'en',
      target: 'es',
    };
    languageTranslator.translate(params, (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      done();
    });
  });

  it('listIdentifiableLanguages()', done => {
    languageTranslator.listIdentifiableLanguages((err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      done();
    });
  });

  it('identify()', done => {
    const params = {
      text: 'this is an important test that needs to work',
    };
    languageTranslator.identify(params, (err, res) => {
      expect(err).toBeNull();
      expect(res).toBeDefined();
      done();
    });
  });

  describe('models', () => {
    let baseModelId;
    let modelId;
    it('should list all the models', done => {
      languageTranslator.listModels((err, res) => {
        const { result } = res || {};
        expect(result).toBeDefined();
        baseModelId = result.models[0].model_id;
        done();
      });
    });

    it('should create a model', done => {
      languageTranslator.createModel(
        {
          baseModelId,
          forcedGlossary: fs.createReadStream('./test/resources/glossary.tmx'),
        },
        (err, res) => {
          const { result } = res || {};
          expect(result).toBeDefined();
          modelId = result.model_id;
          done();
        }
      );
    });

    it('should get the details of the model', done => {
      if (!modelId) {
        // We cannot run this test when model creation failed.
        return done();
      }

      languageTranslator.getModel({ modelId }, (err, res) => {
        expect(err).toBeNull();
        expect(res).toBeDefined();
        done();
      });
    });

    it('should delete the model', done => {
      if (!modelId) {
        // We cannot run this test when model creation failed.
        return done();
      }

      languageTranslator.deleteModel({ modelId }, (err, res) => {
        expect(err).toBeNull();
        expect(res).toBeDefined();
        done();
      });
    });
  });

  describe('documentTranslation @slow', () => {
    let documentId;
    // The service was down, could not test the test.
    it('should translate document', done => {
      languageTranslator.translateDocument(
        {
          file: fs.createReadStream('./test/resources/alchemy-text.txt'),
          filename: 'alchemy-text.txt',
          modelId: 'en-es',
        },
        (err, res) => {
          const { result } = res || {};
          expect(result).toBeDefined();
          documentId = result.document_id;
          done();
        }
      );
    });

    it('should list translated documents', done => {
      languageTranslator.listDocuments((err, res) => {
        expect(err).toBeNull();
        expect(res).toBeDefined();
        done();
      });
    });

    it('should get translated document status', done => {
      if (!documentId) {
        // We cannot run this test when document upload failed.
        return done();
      }

      languageTranslator.getDocumentStatus({ documentId }, (err, res) => {
        expect(err).toBeNull();
        expect(res).toBeDefined();
        done();
      });
    });

    it('should get translated document', done => {
      if (!documentId) {
        // We cannot run this test when document upload failed.
        return done();
      }

      languageTranslator.getTranslatedDocument({ documentId }, (err, res) => {
        expect(err).toBeNull();
        expect(res).toBeDefined();
        done();
      });
    });

    it('should delete document', done => {
      if (!documentId) {
        // We cannot run this test when document upload failed.
        return done();
      }

      languageTranslator.deleteDocument({ documentId }, (err, res) => {
        expect(err).toBeNull();
        expect(res).toBeDefined();
        done();
      });
    });
  });
});
