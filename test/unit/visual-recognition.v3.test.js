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
const VisualRecognitionV3 = require('../../visual-recognition/v3');
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
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/visual-recognition/api/visual-recognition/api',
  version: '2018-10-18',
};

const visualRecognition = new VisualRecognitionV3(service);
const createRequestMock = jest.spyOn(visualRecognition, 'createRequest');
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
      const images_file = 'fake_images_file';
      const images_filename = 'fake_images_filename';
      const images_file_content_type = 'fake_images_file_content_type';
      const url = 'fake_url';
      const threshold = 'fake_threshold';
      const owners = 'fake_owners';
      const classifier_ids = 'fake_classifier_ids';
      const accept_language = 'fake_accept_language';
      const params = {
        images_file,
        images_filename,
        images_file_content_type,
        url,
        threshold,
        owners,
        classifier_ids,
        accept_language,
      };

      // invoke method
      visualRecognition.classify(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classify', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Accept-Language', accept_language);
      expect(options.formData['images_file'].data).toEqual(images_file);
      expect(options.formData['images_file'].filename).toEqual(images_filename);
      expect(options.formData['images_file'].contentType).toEqual(images_file_content_type);
      expect(options.formData['url']).toEqual(url);
      expect(options.formData['threshold']).toEqual(threshold);
      expect(options.formData['owners']).toEqual(owners);
      expect(options.formData['classifier_ids']).toEqual(classifier_ids);
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

      visualRecognition.classify(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const classifyPromise = visualRecognition.classify(params);
      expectToBePromise(classifyPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      visualRecognition.classify({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      visualRecognition.classify(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('detectFaces', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const images_file = 'fake_images_file';
      const images_filename = 'fake_images_filename';
      const images_file_content_type = 'fake_images_file_content_type';
      const url = 'fake_url';
      const accept_language = 'fake_accept_language';
      const params = {
        images_file,
        images_filename,
        images_file_content_type,
        url,
        accept_language,
      };

      // invoke method
      visualRecognition.detectFaces(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/detect_faces', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Accept-Language', accept_language);
      expect(options.formData['images_file'].data).toEqual(images_file);
      expect(options.formData['images_file'].filename).toEqual(images_filename);
      expect(options.formData['images_file'].contentType).toEqual(images_file_content_type);
      expect(options.formData['url']).toEqual(url);
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

      visualRecognition.detectFaces(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const detectFacesPromise = visualRecognition.detectFaces(params);
      expectToBePromise(detectFacesPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      visualRecognition.detectFaces({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      visualRecognition.detectFaces(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const name = 'fake_name';
      const positive_examples = { fake: 'fake_positive_examples' };
      const negative_examples = 'fake_negative_examples';
      const negative_examples_filename = 'fake_negative_examples_filename';
      const params = {
        name,
        positive_examples,
        negative_examples,
        negative_examples_filename,
      };

      // invoke method
      visualRecognition.createClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['name']).toEqual(name);
      expect(options.formData['fake_positive_examples'].data).toEqual(positive_examples['fake']);
      expect(options.formData['fake_positive_examples'].contentType).toEqual(
        'application/octet-stream'
      );
      expect(options.formData['negative_examples'].data).toEqual(negative_examples);
      expect(options.formData['negative_examples'].filename).toEqual(negative_examples_filename);
      expect(options.formData['negative_examples'].contentType).toEqual('application/octet-stream');
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const name = 'fake_name';
      const positive_examples = { fake: 'fake_positive_examples' };
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        name,
        positive_examples,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      visualRecognition.createClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const name = 'fake_name';
      const positive_examples = { fake: 'fake_positive_examples' };
      const params = {
        name,
        positive_examples,
      };

      // invoke method
      const createClassifierPromise = visualRecognition.createClassifier(params);
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
      visualRecognition.createClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['name', 'positive_examples'];

      visualRecognition.createClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['name', 'positive_examples'];

      const createClassifierPromise = visualRecognition.createClassifier();
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
      const verbose = 'fake_verbose';
      const params = {
        verbose,
      };

      // invoke method
      visualRecognition.listClassifiers(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['verbose']).toEqual(verbose);
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

      visualRecognition.listClassifiers(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listClassifiersPromise = visualRecognition.listClassifiers(params);
      expectToBePromise(listClassifiersPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      visualRecognition.listClassifiers({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      visualRecognition.listClassifiers(noop);
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
      visualRecognition.getClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'GET');
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

      visualRecognition.getClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      const getClassifierPromise = visualRecognition.getClassifier(params);
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
      visualRecognition.getClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      visualRecognition.getClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      const getClassifierPromise = visualRecognition.getClassifier();
      expectToBePromise(getClassifierPromise);

      getClassifierPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('updateClassifier', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const positive_examples = { fake: 'fake_positive_examples' };
      const negative_examples = 'fake_negative_examples';
      const negative_examples_filename = 'fake_negative_examples_filename';
      const params = {
        classifier_id,
        positive_examples,
        negative_examples,
        negative_examples_filename,
      };

      // invoke method
      visualRecognition.updateClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['fake_positive_examples'].data).toEqual(positive_examples['fake']);
      expect(options.formData['fake_positive_examples'].contentType).toEqual(
        'application/octet-stream'
      );
      expect(options.formData['negative_examples'].data).toEqual(negative_examples);
      expect(options.formData['negative_examples'].filename).toEqual(negative_examples_filename);
      expect(options.formData['negative_examples'].contentType).toEqual('application/octet-stream');
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

      visualRecognition.updateClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      const updateClassifierPromise = visualRecognition.updateClassifier(params);
      expectToBePromise(updateClassifierPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      visualRecognition.updateClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      visualRecognition.updateClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      const updateClassifierPromise = visualRecognition.updateClassifier();
      expectToBePromise(updateClassifierPromise);

      updateClassifierPromise.catch(err => {
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
      visualRecognition.deleteClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'DELETE');
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

      visualRecognition.deleteClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      const deleteClassifierPromise = visualRecognition.deleteClassifier(params);
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
      visualRecognition.deleteClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      visualRecognition.deleteClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      const deleteClassifierPromise = visualRecognition.deleteClassifier();
      expectToBePromise(deleteClassifierPromise);

      deleteClassifierPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getCoreMlModel', () => {
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
      visualRecognition.getCoreMlModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}/core_ml_model', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/octet-stream';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['classifier_id']).toEqual(classifier_id);
      expect(options.responseType).toBe('stream');
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

      visualRecognition.getCoreMlModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      const getCoreMlModelPromise = visualRecognition.getCoreMlModel(params);
      expectToBePromise(getCoreMlModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      visualRecognition.getCoreMlModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      visualRecognition.getCoreMlModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      const getCoreMlModelPromise = visualRecognition.getCoreMlModel();
      expectToBePromise(getCoreMlModelPromise);

      getCoreMlModelPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteUserData', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const params = {
        customer_id,
      };

      // invoke method
      visualRecognition.deleteUserData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/user_data', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['customer_id']).toEqual(customer_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customer_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      visualRecognition.deleteUserData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const params = {
        customer_id,
      };

      // invoke method
      const deleteUserDataPromise = visualRecognition.deleteUserData(params);
      expectToBePromise(deleteUserDataPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      visualRecognition.deleteUserData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      visualRecognition.deleteUserData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      const deleteUserDataPromise = visualRecognition.deleteUserData();
      expectToBePromise(deleteUserDataPromise);

      deleteUserDataPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
