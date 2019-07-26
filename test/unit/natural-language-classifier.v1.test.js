/**
 * Copyright 2019 IBM All Rights Reserved.
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

const helper = require('ibm-cloud-sdk-core');
const NaturalLanguageClassifierV1 = require('../../natural-language-classifier/v1');
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
  checkDefaultSuccessArgs,
} = utils;

const noop = () => {};

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url:
    'https://gateway.watsonplatform.net/natural-language-classifier/api/natural-language-classifier/api',
  version: '2018-10-18',
};

const naturalLanguageClassifier = new NaturalLanguageClassifierV1(service);
const createRequestMock = jest.spyOn(naturalLanguageClassifier, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('classify', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const text = 'fake_text';
      const params = {
        classifier_id,
        text,
      };

      // invoke method
      naturalLanguageClassifier.classify(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers/{classifier_id}/classify', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['text']).toEqual(text);
      expect(options.path['classifier_id']).toEqual(classifier_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier_id,
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      naturalLanguageClassifier.classify(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const text = 'fake_text';
      const params = {
        classifier_id,
        text,
      };

      // invoke method
      const classifyPromise = naturalLanguageClassifier.classify(params);
      expectToBePromise(classifyPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      naturalLanguageClassifier.classify(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id', 'text'];

      naturalLanguageClassifier.classify({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id', 'text'];

      const classifyPromise = naturalLanguageClassifier.classify();
      expectToBePromise(classifyPromise);

      classifyPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('classifyCollection', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const collection = 'fake_collection';
      const params = {
        classifier_id,
        collection,
      };

      // invoke method
      naturalLanguageClassifier.classifyCollection(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers/{classifier_id}/classify_collection', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['collection']).toEqual(collection);
      expect(options.path['classifier_id']).toEqual(classifier_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const collection = 'fake_collection';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier_id,
        collection,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      naturalLanguageClassifier.classifyCollection(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const collection = 'fake_collection';
      const params = {
        classifier_id,
        collection,
      };

      // invoke method
      const classifyCollectionPromise = naturalLanguageClassifier.classifyCollection(params);
      expectToBePromise(classifyCollectionPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      naturalLanguageClassifier.classifyCollection(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id', 'collection'];

      naturalLanguageClassifier.classifyCollection({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id', 'collection'];

      const classifyCollectionPromise = naturalLanguageClassifier.classifyCollection();
      expectToBePromise(classifyCollectionPromise);

      classifyCollectionPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('createClassifier', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const metadata = 'fake_metadata';
      const training_data = 'fake_training_data';
      const params = {
        metadata,
        training_data,
      };

      // invoke method
      naturalLanguageClassifier.createClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['training_metadata'].data).toEqual(metadata);
      expect(options.formData['training_metadata'].contentType).toEqual('application/json');
      expect(options.formData['training_data'].data).toEqual(training_data);
      expect(options.formData['training_data'].contentType).toEqual('text/csv');
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const metadata = 'fake_metadata';
      const training_data = 'fake_training_data';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        metadata,
        training_data,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      naturalLanguageClassifier.createClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const metadata = 'fake_metadata';
      const training_data = 'fake_training_data';
      const params = {
        metadata,
        training_data,
      };

      // invoke method
      const createClassifierPromise = naturalLanguageClassifier.createClassifier(params);
      expectToBePromise(createClassifierPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      naturalLanguageClassifier.createClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['metadata', 'training_data'];

      naturalLanguageClassifier.createClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['metadata', 'training_data'];

      const createClassifierPromise = naturalLanguageClassifier.createClassifier();
      expectToBePromise(createClassifierPromise);

      createClassifierPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listClassifiers', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const params = {};

      // invoke method
      naturalLanguageClassifier.listClassifiers(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      naturalLanguageClassifier.listClassifiers(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listClassifiersPromise = naturalLanguageClassifier.listClassifiers(params);
      expectToBePromise(listClassifiersPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      naturalLanguageClassifier.listClassifiers({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      naturalLanguageClassifier.listClassifiers(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('getClassifier', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      naturalLanguageClassifier.getClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers/{classifier_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['classifier_id']).toEqual(classifier_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      naturalLanguageClassifier.getClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      const getClassifierPromise = naturalLanguageClassifier.getClassifier(params);
      expectToBePromise(getClassifierPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      naturalLanguageClassifier.getClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      naturalLanguageClassifier.getClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      const getClassifierPromise = naturalLanguageClassifier.getClassifier();
      expectToBePromise(getClassifierPromise);

      getClassifierPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteClassifier', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      naturalLanguageClassifier.deleteClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers/{classifier_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['classifier_id']).toEqual(classifier_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      naturalLanguageClassifier.deleteClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      const deleteClassifierPromise = naturalLanguageClassifier.deleteClassifier(params);
      expectToBePromise(deleteClassifierPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      naturalLanguageClassifier.deleteClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      naturalLanguageClassifier.deleteClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      const deleteClassifierPromise = naturalLanguageClassifier.deleteClassifier();
      expectToBePromise(deleteClassifierPromise);

      deleteClassifierPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
