/**
 * (C) Copyright IBM Corp. 2018, 2019.
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

const helper = require('ibm-cloud-sdk-core'); // for mocking `getMissingParams`
const { NoAuthAuthenticator } = require('ibm-cloud-sdk-core');
const LanguageTranslatorV3 = require('../../language-translator/v3');
const utils = require('../resources/unitTestUtils');

const {
  getOptions,
  checkUrlAndMethod,
  checkCallback,
  checkMediaHeaders,
  missingParamsSuccess,
  expectToBePromise,
  missingParamsError,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  checkUserHeader,
  checkDefaultSuccessArgs,
} = utils;

const noop = () => {};

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://gateway.watsonplatform.net/language-translator/api/language-translator/api',
  version: '2018-10-18',
};

const languageTranslator = new LanguageTranslatorV3(service);
const createRequestMock = jest.spyOn(languageTranslator, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('translate', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
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

      // invoke method
      languageTranslator.translate(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/translate', 'POST');
      checkCallback(createRequestMock);
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

      languageTranslator.translate(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const text = 'fake_text';
      const params = {
        text,
      };

      // invoke method
      const translatePromise = languageTranslator.translate(params);
      expectToBePromise(translatePromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      languageTranslator.translate(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      languageTranslator.translate({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      const translatePromise = languageTranslator.translate();
      expectToBePromise(translatePromise);

      translatePromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listIdentifiableLanguages', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const params = {};

      // invoke method
      languageTranslator.listIdentifiableLanguages(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/identifiable_languages', 'GET');
      checkCallback(createRequestMock);
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

      languageTranslator.listIdentifiableLanguages(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listIdentifiableLanguagesPromise = languageTranslator.listIdentifiableLanguages(params);
      expectToBePromise(listIdentifiableLanguagesPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      languageTranslator.listIdentifiableLanguages({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      languageTranslator.listIdentifiableLanguages(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('identify', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const text = 'fake_text';
      const params = {
        text,
      };

      // invoke method
      languageTranslator.identify(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/identify', 'POST');
      checkCallback(createRequestMock);
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

      languageTranslator.identify(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const text = 'fake_text';
      const params = {
        text,
      };

      // invoke method
      const identifyPromise = languageTranslator.identify(params);
      expectToBePromise(identifyPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      languageTranslator.identify(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      languageTranslator.identify({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      const identifyPromise = languageTranslator.identify();
      expectToBePromise(identifyPromise);

      identifyPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listModels', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
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

      // invoke method
      languageTranslator.listModels(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/models', 'GET');
      checkCallback(createRequestMock);
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

      languageTranslator.listModels(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listModelsPromise = languageTranslator.listModels(params);
      expectToBePromise(listModelsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      languageTranslator.listModels({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      languageTranslator.listModels(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('createModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
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

      // invoke method
      languageTranslator.createModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/models', 'POST');
      checkCallback(createRequestMock);
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

      languageTranslator.createModel(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const baseModelId = 'fake_baseModelId';
      const params = {
        baseModelId,
      };

      // invoke method
      const createModelPromise = languageTranslator.createModel(params);
      expectToBePromise(createModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      languageTranslator.createModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['baseModelId'];

      languageTranslator.createModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['baseModelId'];

      const createModelPromise = languageTranslator.createModel();
      expectToBePromise(createModelPromise);

      createModelPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const modelId = 'fake_modelId';
      const params = {
        modelId,
      };

      // invoke method
      languageTranslator.deleteModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/models/{model_id}', 'DELETE');
      checkCallback(createRequestMock);
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

      languageTranslator.deleteModel(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const modelId = 'fake_modelId';
      const params = {
        modelId,
      };

      // invoke method
      const deleteModelPromise = languageTranslator.deleteModel(params);
      expectToBePromise(deleteModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      languageTranslator.deleteModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['modelId'];

      languageTranslator.deleteModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['modelId'];

      const deleteModelPromise = languageTranslator.deleteModel();
      expectToBePromise(deleteModelPromise);

      deleteModelPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const modelId = 'fake_modelId';
      const params = {
        modelId,
      };

      // invoke method
      languageTranslator.getModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/models/{model_id}', 'GET');
      checkCallback(createRequestMock);
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

      languageTranslator.getModel(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const modelId = 'fake_modelId';
      const params = {
        modelId,
      };

      // invoke method
      const getModelPromise = languageTranslator.getModel(params);
      expectToBePromise(getModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      languageTranslator.getModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['modelId'];

      languageTranslator.getModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['modelId'];

      const getModelPromise = languageTranslator.getModel();
      expectToBePromise(getModelPromise);

      getModelPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listDocuments', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const params = {};

      // invoke method
      languageTranslator.listDocuments(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/documents', 'GET');
      checkCallback(createRequestMock);
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

      languageTranslator.listDocuments(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listDocumentsPromise = languageTranslator.listDocuments(params);
      expectToBePromise(listDocumentsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      languageTranslator.listDocuments({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      languageTranslator.listDocuments(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('translateDocument', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
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

      // invoke method
      languageTranslator.translateDocument(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/documents', 'POST');
      checkCallback(createRequestMock);
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

      languageTranslator.translateDocument(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const file = 'fake_file';
      const filename = 'fake_filename';
      const params = {
        file,
        filename,
      };

      // invoke method
      const translateDocumentPromise = languageTranslator.translateDocument(params);
      expectToBePromise(translateDocumentPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      languageTranslator.translateDocument(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['file', 'filename'];

      languageTranslator.translateDocument({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['file', 'filename'];

      const translateDocumentPromise = languageTranslator.translateDocument();
      expectToBePromise(translateDocumentPromise);

      translateDocumentPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getDocumentStatus', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const documentId = 'fake_documentId';
      const params = {
        documentId,
      };

      // invoke method
      languageTranslator.getDocumentStatus(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/documents/{document_id}', 'GET');
      checkCallback(createRequestMock);
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

      languageTranslator.getDocumentStatus(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const documentId = 'fake_documentId';
      const params = {
        documentId,
      };

      // invoke method
      const getDocumentStatusPromise = languageTranslator.getDocumentStatus(params);
      expectToBePromise(getDocumentStatusPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      languageTranslator.getDocumentStatus(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['documentId'];

      languageTranslator.getDocumentStatus({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['documentId'];

      const getDocumentStatusPromise = languageTranslator.getDocumentStatus();
      expectToBePromise(getDocumentStatusPromise);

      getDocumentStatusPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteDocument', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const documentId = 'fake_documentId';
      const params = {
        documentId,
      };

      // invoke method
      languageTranslator.deleteDocument(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/documents/{document_id}', 'DELETE');
      checkCallback(createRequestMock);
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

      languageTranslator.deleteDocument(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const documentId = 'fake_documentId';
      const params = {
        documentId,
      };

      // invoke method
      const deleteDocumentPromise = languageTranslator.deleteDocument(params);
      expectToBePromise(deleteDocumentPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      languageTranslator.deleteDocument(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['documentId'];

      languageTranslator.deleteDocument({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['documentId'];

      const deleteDocumentPromise = languageTranslator.deleteDocument();
      expectToBePromise(deleteDocumentPromise);

      deleteDocumentPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getTranslatedDocument', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const documentId = 'fake_documentId';
      const accept = 'fake_accept';
      const params = {
        documentId,
        accept,
      };

      // invoke method
      languageTranslator.getTranslatedDocument(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/documents/{document_id}/translated_document', 'GET');
      checkCallback(createRequestMock);
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

      languageTranslator.getTranslatedDocument(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const documentId = 'fake_documentId';
      const params = {
        documentId,
      };

      // invoke method
      const getTranslatedDocumentPromise = languageTranslator.getTranslatedDocument(params);
      expectToBePromise(getTranslatedDocumentPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      languageTranslator.getTranslatedDocument(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['documentId'];

      languageTranslator.getTranslatedDocument({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['documentId'];

      const getTranslatedDocumentPromise = languageTranslator.getTranslatedDocument();
      expectToBePromise(getTranslatedDocumentPromise);

      getTranslatedDocumentPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
