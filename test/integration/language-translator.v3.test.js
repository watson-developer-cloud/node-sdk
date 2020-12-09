'use strict';

const fs = require('fs');
const { IamAuthenticator } = require('../../dist/auth');
const LanguageTranslatorV3 = require('../../dist/language-translator/v3');
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

  it('should listModels()', async () => {
    const res = await languageTranslator.listModels();
    expect(res).toBeDefined();
  });

  it('should translate()', async () => {
    const params = {
      text: 'this is a test',
      source: 'en',
      target: 'es',
    };
    const res = await languageTranslator.translate(params);
    expect(res).toBeDefined();
  });

  it('should listLanguages()', async () => {
    const res = await languageTranslator.listLanguages();
    expect(res).toBeDefined();
    const { result } = res || {};
    expect(result).toBeDefined();
  });

  it('should listIdentifiableLanguages()', async () => {
    const res = await languageTranslator.listIdentifiableLanguages();
    expect(res).toBeDefined();
  });

  it('should identify()', async () => {
    const params = {
      text: 'this is an important test that needs to work',
    };
    const res = await languageTranslator.identify(params);
    expect(res).toBeDefined();
  });

  describe('models', () => {
    let modelId;
    it('should list all the models', async () => {
      const res = await languageTranslator.listModels();
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    it('should create a model', async () => {
      const params = {
        name: 'node-test-custom-en-fr',
        baseModelId: 'en-fr',
        forcedGlossary: fs.createReadStream('./test/resources/glossary.tmx'),
      };

      const res = await languageTranslator.createModel(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      modelId = result.model_id;
    });

    it('should get the details of the model', async () => {
      // We cannot run this test when model creation failed.
      expect(modelId).toBeTruthy();
      const params = {
        modelId,
      };

      const res = await languageTranslator.getModel(params);
      expect(res).toBeDefined();
    });

    it('should delete the model', async () => {
      // We cannot run this test when model creation failed.
      expect(modelId).toBeTruthy();
      const params = {
        modelId,
      };

      const res = await languageTranslator.deleteModel(params);
      expect(res).toBeDefined();
    });
  });

  describe('documentTranslation @slow', () => {
    let documentId;
    // The service was down, could not test the test.
    it('should translate document', async () => {
      const params = {
        file: fs.createReadStream('./test/resources/alchemy-text.txt'),
        filename: 'alchemy-text.txt',
        modelId: 'en-es',
      };
      const res = await languageTranslator.translateDocument(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      documentId = result.document_id;
      console.log(documentId);
    });

    it('should list translated documents', async () => {
      const res = await languageTranslator.listDocuments();
      expect(res).toBeDefined();
    });

    it('should get translated document status', async () => {
      // We cannot run this test when document upload failed.
      expect(documentId).toBeTruthy();
      const params = {
        documentId,
      };

      const res = await languageTranslator.getDocumentStatus(params);
      expect(res).toBeDefined();
    });

    it('should get translated document', async () => {
      // We cannot run this test when document upload failed.
      expect(documentId).toBeTruthy();
      const params = {
        documentId,
      };

      const res = await languageTranslator.getTranslatedDocument(params);
      expect(res).toBeDefined();
    });

    it('should delete document', async () => {
      // We cannot run this test when document upload failed.
      expect(documentId).toBeTruthy();
      const params = {
        documentId,
      };

      const res = await languageTranslator.deleteDocument(params);
      expect(res).toBeDefined();
    });
  });
});
