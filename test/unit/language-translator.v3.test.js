/**
 * (C) Copyright IBM Corp. 2018, 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const { NoAuthAuthenticator, unitTestUtils } = require('ibm-cloud-sdk-core');
const LanguageTranslatorV3 = require('../../dist/language-translator/v3');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.language-translator.watson.cloud.ibm.com',
  version: '2018-10-18',
};

const languageTranslator = new LanguageTranslatorV3(service);
const createRequestMock = jest.spyOn(languageTranslator, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('LanguageTranslatorV3', () => {
  describe('listLanguages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const params = {};

        const listLanguagesResult = languageTranslator.listLanguages(params);

        // all methods should return a Promise
        expectToBePromise(listLanguagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/languages', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.listLanguages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        languageTranslator.listLanguages({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await languageTranslator.listLanguages(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('translate', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const text = 'fake_text';
        const modelId = 'fake_modelId';
        const source = 'fake_source';
        const target = 'fake_target';
        const params = {
          text,
          modelId,
          source,
          target,
        };

        const translateResult = languageTranslator.translate(params);

        // all methods should return a Promise
        expectToBePromise(translateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/translate', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['text']).toEqual(text);
        expect(options.body['model_id']).toEqual(modelId);
        expect(options.body['source']).toEqual(source);
        expect(options.body['target']).toEqual(target);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.translate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['text'];

        let err;
        try {
          await languageTranslator.translate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['text'];

        const translatePromise = languageTranslator.translate();
        expectToBePromise(translatePromise);

        translatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listIdentifiableLanguages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const params = {};

        const listIdentifiableLanguagesResult = languageTranslator.listIdentifiableLanguages(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listIdentifiableLanguagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/identifiable_languages', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.listIdentifiableLanguages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        languageTranslator.listIdentifiableLanguages({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await languageTranslator.listIdentifiableLanguages(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('identify', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const text = 'fake_text';
        const params = {
          text,
        };

        const identifyResult = languageTranslator.identify(params);

        // all methods should return a Promise
        expectToBePromise(identifyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/identify', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'text/plain';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(text);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.identify(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['text'];

        let err;
        try {
          await languageTranslator.identify({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['text'];

        const identifyPromise = languageTranslator.identify();
        expectToBePromise(identifyPromise);

        identifyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const source = 'fake_source';
        const target = 'fake_target';
        const _default = 'fake__default';
        const params = {
          source,
          target,
          _default,
        };

        const listModelsResult = languageTranslator.listModels(params);

        // all methods should return a Promise
        expectToBePromise(listModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/models', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['source']).toEqual(source);
        expect(options.qs['target']).toEqual(target);
        expect(options.qs['default']).toEqual(_default);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.listModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        languageTranslator.listModels({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await languageTranslator.listModels(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('createModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const baseModelId = 'fake_baseModelId';
        const forcedGlossary = 'fake_forcedGlossary';
        const parallelCorpus = 'fake_parallelCorpus';
        const name = 'fake_name';
        const params = {
          baseModelId,
          forcedGlossary,
          parallelCorpus,
          name,
        };

        const createModelResult = languageTranslator.createModel(params);

        // all methods should return a Promise
        expectToBePromise(createModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/models', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['forced_glossary'].data).toEqual(forcedGlossary);
        expect(options.formData['forced_glossary'].contentType).toEqual('application/octet-stream');
        expect(options.formData['parallel_corpus'].data).toEqual(parallelCorpus);
        expect(options.formData['parallel_corpus'].contentType).toEqual('application/octet-stream');
        expect(options.qs['base_model_id']).toEqual(baseModelId);
        expect(options.qs['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const baseModelId = 'fake_baseModelId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          baseModelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.createModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['baseModelId'];

        let err;
        try {
          await languageTranslator.createModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['baseModelId'];

        const createModelPromise = languageTranslator.createModel();
        expectToBePromise(createModelPromise);

        createModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const modelId = 'fake_modelId';
        const params = {
          modelId,
        };

        const deleteModelResult = languageTranslator.deleteModel(params);

        // all methods should return a Promise
        expectToBePromise(deleteModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/models/{model_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['model_id']).toEqual(modelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'fake_modelId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.deleteModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['modelId'];

        let err;
        try {
          await languageTranslator.deleteModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['modelId'];

        const deleteModelPromise = languageTranslator.deleteModel();
        expectToBePromise(deleteModelPromise);

        deleteModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const modelId = 'fake_modelId';
        const params = {
          modelId,
        };

        const getModelResult = languageTranslator.getModel(params);

        // all methods should return a Promise
        expectToBePromise(getModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/models/{model_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['model_id']).toEqual(modelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'fake_modelId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.getModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['modelId'];

        let err;
        try {
          await languageTranslator.getModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['modelId'];

        const getModelPromise = languageTranslator.getModel();
        expectToBePromise(getModelPromise);

        getModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listDocuments', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const params = {};

        const listDocumentsResult = languageTranslator.listDocuments(params);

        // all methods should return a Promise
        expectToBePromise(listDocumentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/documents', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.listDocuments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        languageTranslator.listDocuments({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await languageTranslator.listDocuments(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('translateDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const file = 'fake_file';
        const filename = 'fake_filename';
        const fileContentType = 'fake_fileContentType';
        const modelId = 'fake_modelId';
        const source = 'fake_source';
        const target = 'fake_target';
        const documentId = 'fake_documentId';
        const params = {
          file,
          filename,
          fileContentType,
          modelId,
          source,
          target,
          documentId,
        };

        const translateDocumentResult = languageTranslator.translateDocument(params);

        // all methods should return a Promise
        expectToBePromise(translateDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/documents', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].filename).toEqual(filename);
        expect(options.formData['file'].contentType).toEqual(fileContentType);
        expect(options.formData['model_id']).toEqual(modelId);
        expect(options.formData['source']).toEqual(source);
        expect(options.formData['target']).toEqual(target);
        expect(options.formData['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file = 'fake_file';
        const filename = 'fake_filename';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          file,
          filename,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.translateDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['file', 'filename'];

        let err;
        try {
          await languageTranslator.translateDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['file', 'filename'];

        const translateDocumentPromise = languageTranslator.translateDocument();
        expectToBePromise(translateDocumentPromise);

        translateDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentStatus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const documentId = 'fake_documentId';
        const params = {
          documentId,
        };

        const getDocumentStatusResult = languageTranslator.getDocumentStatus(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/documents/{document_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const documentId = 'fake_documentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.getDocumentStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['documentId'];

        let err;
        try {
          await languageTranslator.getDocumentStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['documentId'];

        const getDocumentStatusPromise = languageTranslator.getDocumentStatus();
        expectToBePromise(getDocumentStatusPromise);

        getDocumentStatusPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const documentId = 'fake_documentId';
        const params = {
          documentId,
        };

        const deleteDocumentResult = languageTranslator.deleteDocument(params);

        // all methods should return a Promise
        expectToBePromise(deleteDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/documents/{document_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const documentId = 'fake_documentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.deleteDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['documentId'];

        let err;
        try {
          await languageTranslator.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['documentId'];

        const deleteDocumentPromise = languageTranslator.deleteDocument();
        expectToBePromise(deleteDocumentPromise);

        deleteDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getTranslatedDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const documentId = 'fake_documentId';
        const accept = 'fake_accept';
        const params = {
          documentId,
          accept,
        };

        const getTranslatedDocumentResult = languageTranslator.getTranslatedDocument(params);

        // all methods should return a Promise
        expectToBePromise(getTranslatedDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/documents/{document_id}/translated_document', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(options.path['document_id']).toEqual(documentId);
        expect(options.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const documentId = 'fake_documentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslator.getTranslatedDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['documentId'];

        let err;
        try {
          await languageTranslator.getTranslatedDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['documentId'];

        const getTranslatedDocumentPromise = languageTranslator.getTranslatedDocument();
        expectToBePromise(getTranslatedDocumentPromise);

        getTranslatedDocumentPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
