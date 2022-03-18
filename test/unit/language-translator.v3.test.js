/**
 * (C) Copyright IBM Corp. 2018, 2022.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const LanguageTranslatorV3 = require('../../dist/language-translator/v3');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const languageTranslatorServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.language-translator.watson.cloud.ibm.com',
  version: '2018-05-01',
};

const languageTranslatorService = new LanguageTranslatorV3(languageTranslatorServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(languageTranslatorService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    version: '2018-05-01',
  };
});

describe('LanguageTranslatorV3', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new LanguageTranslatorV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new LanguageTranslatorV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(LanguageTranslatorV3.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new LanguageTranslatorV3(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new LanguageTranslatorV3(options);

      expect(testInstance.baseOptions.serviceName).toBe(LanguageTranslatorV3.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new LanguageTranslatorV3(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new LanguageTranslatorV3(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new LanguageTranslatorV3(languageTranslatorServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(languageTranslatorServiceOptions.version);
      });
    });
  });
  describe('listLanguages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLanguages
        const params = {};

        const listLanguagesResult = languageTranslatorService.listLanguages(params);

        // all methods should return a Promise
        expectToBePromise(listLanguagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/languages', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.listLanguages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        languageTranslatorService.listLanguages({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('translate', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation translate
        const text = ['testString'];
        const modelId = 'testString';
        const source = 'testString';
        const target = 'testString';
        const params = {
          text: text,
          modelId: modelId,
          source: source,
          target: target,
        };

        const translateResult = languageTranslatorService.translate(params);

        // all methods should return a Promise
        expectToBePromise(translateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/translate', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.text).toEqual(text);
        expect(mockRequestOptions.body.model_id).toEqual(modelId);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.translate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await languageTranslatorService.translate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const translatePromise = languageTranslatorService.translate();
        expectToBePromise(translatePromise);

        translatePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listIdentifiableLanguages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listIdentifiableLanguages
        const params = {};

        const listIdentifiableLanguagesResult = languageTranslatorService.listIdentifiableLanguages(params);

        // all methods should return a Promise
        expectToBePromise(listIdentifiableLanguagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/identifiable_languages', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.listIdentifiableLanguages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        languageTranslatorService.listIdentifiableLanguages({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('identify', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation identify
        const text = 'testString';
        const params = {
          text: text,
        };

        const identifyResult = languageTranslatorService.identify(params);

        // all methods should return a Promise
        expectToBePromise(identifyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/identify', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'text/plain';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(text);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.identify(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await languageTranslatorService.identify({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const identifyPromise = languageTranslatorService.identify();
        expectToBePromise(identifyPromise);

        identifyPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listModels
        const source = 'testString';
        const target = 'testString';
        const _default = true;
        const params = {
          source: source,
          target: target,
          _default: _default,
        };

        const listModelsResult = languageTranslatorService.listModels(params);

        // all methods should return a Promise
        expectToBePromise(listModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/models', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
        expect(mockRequestOptions.qs.source).toEqual(source);
        expect(mockRequestOptions.qs.target).toEqual(target);
        expect(mockRequestOptions.qs.default).toEqual(_default);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.listModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        languageTranslatorService.listModels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createModel
        const baseModelId = 'testString';
        const forcedGlossary = Buffer.from('This is a mock file.');
        const parallelCorpus = Buffer.from('This is a mock file.');
        const name = 'testString';
        const params = {
          baseModelId: baseModelId,
          forcedGlossary: forcedGlossary,
          parallelCorpus: parallelCorpus,
          name: name,
        };

        const createModelResult = languageTranslatorService.createModel(params);

        // all methods should return a Promise
        expectToBePromise(createModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/models', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.forced_glossary.data).toEqual(forcedGlossary);
        expect(mockRequestOptions.formData.forced_glossary.contentType).toEqual('application/octet-stream');
        expect(mockRequestOptions.formData.parallel_corpus.data).toEqual(parallelCorpus);
        expect(mockRequestOptions.formData.parallel_corpus.contentType).toEqual('application/octet-stream');
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
        expect(mockRequestOptions.qs.base_model_id).toEqual(baseModelId);
        expect(mockRequestOptions.qs.name).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const baseModelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          baseModelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.createModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await languageTranslatorService.createModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createModelPromise = languageTranslatorService.createModel();
        expectToBePromise(createModelPromise);

        createModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteModel
        const modelId = 'testString';
        const params = {
          modelId: modelId,
        };

        const deleteModelResult = languageTranslatorService.deleteModel(params);

        // all methods should return a Promise
        expectToBePromise(deleteModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/models/{model_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.deleteModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await languageTranslatorService.deleteModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteModelPromise = languageTranslatorService.deleteModel();
        expectToBePromise(deleteModelPromise);

        deleteModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getModel
        const modelId = 'testString';
        const params = {
          modelId: modelId,
        };

        const getModelResult = languageTranslatorService.getModel(params);

        // all methods should return a Promise
        expectToBePromise(getModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/models/{model_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.getModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await languageTranslatorService.getModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getModelPromise = languageTranslatorService.getModel();
        expectToBePromise(getModelPromise);

        getModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listDocuments', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listDocuments
        const params = {};

        const listDocumentsResult = languageTranslatorService.listDocuments(params);

        // all methods should return a Promise
        expectToBePromise(listDocumentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/documents', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.listDocuments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        languageTranslatorService.listDocuments({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('translateDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation translateDocument
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/powerpoint';
        const modelId = 'testString';
        const source = 'testString';
        const target = 'testString';
        const documentId = 'testString';
        const params = {
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          modelId: modelId,
          source: source,
          target: target,
          documentId: documentId,
        };

        const translateDocumentResult = languageTranslatorService.translateDocument(params);

        // all methods should return a Promise
        expectToBePromise(translateDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/documents', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.file.data).toEqual(file);
        expect(mockRequestOptions.formData.file.filename).toEqual(filename);
        expect(mockRequestOptions.formData.file.contentType).toEqual(fileContentType);
        expect(mockRequestOptions.formData.model_id).toEqual(modelId);
        expect(mockRequestOptions.formData.source).toEqual(source);
        expect(mockRequestOptions.formData.target).toEqual(target);
        expect(mockRequestOptions.formData.document_id).toEqual(documentId);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          file,
          filename,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.translateDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await languageTranslatorService.translateDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const translateDocumentPromise = languageTranslatorService.translateDocument();
        expectToBePromise(translateDocumentPromise);

        translateDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentStatus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocumentStatus
        const documentId = 'testString';
        const params = {
          documentId: documentId,
        };

        const getDocumentStatusResult = languageTranslatorService.getDocumentStatus(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/documents/{document_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.getDocumentStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await languageTranslatorService.getDocumentStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDocumentStatusPromise = languageTranslatorService.getDocumentStatus();
        expectToBePromise(getDocumentStatusPromise);

        getDocumentStatusPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteDocument
        const documentId = 'testString';
        const params = {
          documentId: documentId,
        };

        const deleteDocumentResult = languageTranslatorService.deleteDocument(params);

        // all methods should return a Promise
        expectToBePromise(deleteDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/documents/{document_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.deleteDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await languageTranslatorService.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteDocumentPromise = languageTranslatorService.deleteDocument();
        expectToBePromise(deleteDocumentPromise);

        deleteDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getTranslatedDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getTranslatedDocument
        const documentId = 'testString';
        const accept = 'application/powerpoint';
        const params = {
          documentId: documentId,
          accept: accept,
        };

        const getTranslatedDocumentResult = languageTranslatorService.getTranslatedDocument(params);

        // all methods should return a Promise
        expectToBePromise(getTranslatedDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/documents/{document_id}/translated_document', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
        expect(mockRequestOptions.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.getTranslatedDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await languageTranslatorService.getTranslatedDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getTranslatedDocumentPromise = languageTranslatorService.getTranslatedDocument();
        expectToBePromise(getTranslatedDocumentPromise);

        getTranslatedDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
