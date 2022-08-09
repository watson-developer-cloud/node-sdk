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

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(languageTranslatorService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('LanguageTranslatorV3', () => {

  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      version: '2018-05-01',
    };
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

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
      function __listLanguagesTest() {
        // Construct the params object for operation listLanguages
        const listLanguagesParams = {};

        const listLanguagesResult = languageTranslatorService.listLanguages(listLanguagesParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLanguagesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __listLanguagesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __listLanguagesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLanguagesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.listLanguages(listLanguagesParams);
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
      function __translateTest() {
        // Construct the params object for operation translate
        const text = ['testString'];
        const modelId = 'testString';
        const source = 'testString';
        const target = 'testString';
        const translateParams = {
          text: text,
          modelId: modelId,
          source: source,
          target: target,
        };

        const translateResult = languageTranslatorService.translate(translateParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __translateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __translateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __translateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const translateParams = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.translate(translateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await languageTranslatorService.translate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await languageTranslatorService.translate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listIdentifiableLanguages', () => {
    describe('positive tests', () => {
      function __listIdentifiableLanguagesTest() {
        // Construct the params object for operation listIdentifiableLanguages
        const listIdentifiableLanguagesParams = {};

        const listIdentifiableLanguagesResult = languageTranslatorService.listIdentifiableLanguages(listIdentifiableLanguagesParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listIdentifiableLanguagesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __listIdentifiableLanguagesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __listIdentifiableLanguagesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listIdentifiableLanguagesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.listIdentifiableLanguages(listIdentifiableLanguagesParams);
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
      function __identifyTest() {
        // Construct the params object for operation identify
        const text = 'testString';
        const identifyParams = {
          text: text,
        };

        const identifyResult = languageTranslatorService.identify(identifyParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __identifyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __identifyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __identifyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const identifyParams = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.identify(identifyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await languageTranslatorService.identify({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await languageTranslatorService.identify();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listModels', () => {
    describe('positive tests', () => {
      function __listModelsTest() {
        // Construct the params object for operation listModels
        const source = 'testString';
        const target = 'testString';
        const _default = true;
        const listModelsParams = {
          source: source,
          target: target,
          _default: _default,
        };

        const listModelsResult = languageTranslatorService.listModels(listModelsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __listModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __listModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listModelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.listModels(listModelsParams);
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
      function __createModelTest() {
        // Construct the params object for operation createModel
        const baseModelId = 'testString';
        const forcedGlossary = Buffer.from('This is a mock file.');
        const forcedGlossaryContentType = 'application/x-tmx+xml';
        const parallelCorpus = Buffer.from('This is a mock file.');
        const parallelCorpusContentType = 'application/x-tmx+xml';
        const name = 'testString';
        const createModelParams = {
          baseModelId: baseModelId,
          forcedGlossary: forcedGlossary,
          forcedGlossaryContentType: forcedGlossaryContentType,
          parallelCorpus: parallelCorpus,
          parallelCorpusContentType: parallelCorpusContentType,
          name: name,
        };

        const createModelResult = languageTranslatorService.createModel(createModelParams);

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
        expect(mockRequestOptions.formData.forced_glossary.contentType).toEqual(forcedGlossaryContentType);
        expect(mockRequestOptions.formData.parallel_corpus.data).toEqual(parallelCorpus);
        expect(mockRequestOptions.formData.parallel_corpus.contentType).toEqual(parallelCorpusContentType);
        expect(mockRequestOptions.qs.version).toEqual(languageTranslatorServiceOptions.version);
        expect(mockRequestOptions.qs.base_model_id).toEqual(baseModelId);
        expect(mockRequestOptions.qs.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __createModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __createModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const baseModelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createModelParams = {
          baseModelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.createModel(createModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await languageTranslatorService.createModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await languageTranslatorService.createModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteModel', () => {
    describe('positive tests', () => {
      function __deleteModelTest() {
        // Construct the params object for operation deleteModel
        const modelId = 'testString';
        const deleteModelParams = {
          modelId: modelId,
        };

        const deleteModelResult = languageTranslatorService.deleteModel(deleteModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __deleteModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __deleteModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteModelParams = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.deleteModel(deleteModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await languageTranslatorService.deleteModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await languageTranslatorService.deleteModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getModel', () => {
    describe('positive tests', () => {
      function __getModelTest() {
        // Construct the params object for operation getModel
        const modelId = 'testString';
        const getModelParams = {
          modelId: modelId,
        };

        const getModelResult = languageTranslatorService.getModel(getModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __getModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __getModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getModelParams = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.getModel(getModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await languageTranslatorService.getModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await languageTranslatorService.getModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDocuments', () => {
    describe('positive tests', () => {
      function __listDocumentsTest() {
        // Construct the params object for operation listDocuments
        const listDocumentsParams = {};

        const listDocumentsResult = languageTranslatorService.listDocuments(listDocumentsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDocumentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __listDocumentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __listDocumentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDocumentsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.listDocuments(listDocumentsParams);
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
      function __translateDocumentTest() {
        // Construct the params object for operation translateDocument
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/powerpoint';
        const modelId = 'testString';
        const source = 'testString';
        const target = 'testString';
        const documentId = 'testString';
        const translateDocumentParams = {
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          modelId: modelId,
          source: source,
          target: target,
          documentId: documentId,
        };

        const translateDocumentResult = languageTranslatorService.translateDocument(translateDocumentParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __translateDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __translateDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __translateDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const translateDocumentParams = {
          file,
          filename,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.translateDocument(translateDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await languageTranslatorService.translateDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await languageTranslatorService.translateDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDocumentStatus', () => {
    describe('positive tests', () => {
      function __getDocumentStatusTest() {
        // Construct the params object for operation getDocumentStatus
        const documentId = 'testString';
        const getDocumentStatusParams = {
          documentId: documentId,
        };

        const getDocumentStatusResult = languageTranslatorService.getDocumentStatus(getDocumentStatusParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDocumentStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __getDocumentStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __getDocumentStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDocumentStatusParams = {
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.getDocumentStatus(getDocumentStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await languageTranslatorService.getDocumentStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await languageTranslatorService.getDocumentStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDocument', () => {
    describe('positive tests', () => {
      function __deleteDocumentTest() {
        // Construct the params object for operation deleteDocument
        const documentId = 'testString';
        const deleteDocumentParams = {
          documentId: documentId,
        };

        const deleteDocumentResult = languageTranslatorService.deleteDocument(deleteDocumentParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __deleteDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __deleteDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDocumentParams = {
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.deleteDocument(deleteDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await languageTranslatorService.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await languageTranslatorService.deleteDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTranslatedDocument', () => {
    describe('positive tests', () => {
      function __getTranslatedDocumentTest() {
        // Construct the params object for operation getTranslatedDocument
        const documentId = 'testString';
        const accept = 'application/powerpoint';
        const getTranslatedDocumentParams = {
          documentId: documentId,
          accept: accept,
        };

        const getTranslatedDocumentResult = languageTranslatorService.getTranslatedDocument(getTranslatedDocumentParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTranslatedDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.enableRetries();
        __getTranslatedDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        languageTranslatorService.disableRetries();
        __getTranslatedDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTranslatedDocumentParams = {
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        languageTranslatorService.getTranslatedDocument(getTranslatedDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await languageTranslatorService.getTranslatedDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await languageTranslatorService.getTranslatedDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
