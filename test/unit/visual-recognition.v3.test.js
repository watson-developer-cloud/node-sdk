/**
 * (C) Copyright IBM Corp. 2019.
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
const VisualRecognitionV3 = require('../../visual-recognition/v3');
const utils = require('../resources/unitTestUtils');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  missingParamsSuccess,
  expectToBePromise,
  missingParamsError,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  checkUserHeader,
  checkDefaultSuccessArgs,
} = utils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://gateway.watsonplatform.net/visual-recognition/api/visual-recognition/api',
  version: '2018-10-18',
};

const visualRecognition = new VisualRecognitionV3(service);
const createRequestMock = jest.spyOn(visualRecognition, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
  missingParamsMock.mockClear();
});

describe('VisualRecognitionV3', () => {
  describe('classify', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const imagesFile = 'fake_imagesFile';
        const imagesFilename = 'fake_imagesFilename';
        const imagesFileContentType = 'fake_imagesFileContentType';
        const url = 'fake_url';
        const threshold = 'fake_threshold';
        const owners = 'fake_owners';
        const classifierIds = 'fake_classifierIds';
        const acceptLanguage = 'fake_acceptLanguage';
        const params = {
          imagesFile,
          imagesFilename,
          imagesFileContentType,
          url,
          threshold,
          owners,
          classifierIds,
          acceptLanguage,
        };

        visualRecognition.classify(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classify', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(options.formData['images_file'].data).toEqual(imagesFile);
        expect(options.formData['images_file'].filename).toEqual(imagesFilename);
        expect(options.formData['images_file'].contentType).toEqual(imagesFileContentType);
        expect(options.formData['url']).toEqual(url);
        expect(options.formData['threshold']).toEqual(threshold);
        expect(options.formData['owners']).toEqual(owners);
        expect(options.formData['classifier_ids']).toEqual(classifierIds);
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

        visualRecognition.classify(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
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
        visualRecognition.classify({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await visualRecognition.classify(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
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
        const positiveExamples = { fake: 'fake_positiveExamples' };
        const negativeExamples = 'fake_negativeExamples';
        const negativeExamplesFilename = 'fake_negativeExamplesFilename';
        const params = {
          name,
          positiveExamples,
          negativeExamples,
          negativeExamplesFilename,
        };

        visualRecognition.createClassifier(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['name']).toEqual(name);
        expect(options.formData['fake_positive_examples'].data).toEqual(positiveExamples['fake']);
        expect(options.formData['fake_positive_examples'].contentType).toEqual(
          'application/octet-stream'
        );
        expect(options.formData['negative_examples'].data).toEqual(negativeExamples);
        expect(options.formData['negative_examples'].filename).toEqual(negativeExamplesFilename);
        expect(options.formData['negative_examples'].contentType).toEqual(
          'application/octet-stream'
        );
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'fake_name';
        const positiveExamples = { fake: 'fake_positiveExamples' };
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          name,
          positiveExamples,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.createClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const name = 'fake_name';
        const positiveExamples = { fake: 'fake_positiveExamples' };
        const params = {
          name,
          positiveExamples,
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
        visualRecognition.createClassifier(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['name', 'positiveExamples'];

        let err;
        try {
          await visualRecognition.createClassifier({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['name', 'positiveExamples'];

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

        visualRecognition.listClassifiers(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['verbose']).toEqual(verbose);
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

        visualRecognition.listClassifiers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
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
        visualRecognition.listClassifiers({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await visualRecognition.listClassifiers(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
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
        const classifierId = 'fake_classifierId';
        const params = {
          classifierId,
        };

        visualRecognition.getClassifier(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['classifier_id']).toEqual(classifierId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.getClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const params = {
          classifierId,
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
        visualRecognition.getClassifier(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        let err;
        try {
          await visualRecognition.getClassifier({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

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
        const classifierId = 'fake_classifierId';
        const positiveExamples = { fake: 'fake_positiveExamples' };
        const negativeExamples = 'fake_negativeExamples';
        const negativeExamplesFilename = 'fake_negativeExamplesFilename';
        const params = {
          classifierId,
          positiveExamples,
          negativeExamples,
          negativeExamplesFilename,
        };

        visualRecognition.updateClassifier(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['fake_positive_examples'].data).toEqual(positiveExamples['fake']);
        expect(options.formData['fake_positive_examples'].contentType).toEqual(
          'application/octet-stream'
        );
        expect(options.formData['negative_examples'].data).toEqual(negativeExamples);
        expect(options.formData['negative_examples'].filename).toEqual(negativeExamplesFilename);
        expect(options.formData['negative_examples'].contentType).toEqual(
          'application/octet-stream'
        );
        expect(options.path['classifier_id']).toEqual(classifierId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.updateClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const params = {
          classifierId,
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
        visualRecognition.updateClassifier(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        let err;
        try {
          await visualRecognition.updateClassifier({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

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
        const classifierId = 'fake_classifierId';
        const params = {
          classifierId,
        };

        visualRecognition.deleteClassifier(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['classifier_id']).toEqual(classifierId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.deleteClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const params = {
          classifierId,
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
        visualRecognition.deleteClassifier(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        let err;
        try {
          await visualRecognition.deleteClassifier({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

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
        const classifierId = 'fake_classifierId';
        const params = {
          classifierId,
        };

        visualRecognition.getCoreMlModel(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}/core_ml_model', 'GET');
        const expectedAccept = 'application/octet-stream';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['classifier_id']).toEqual(classifierId);
        expect(options.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.getCoreMlModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const params = {
          classifierId,
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
        visualRecognition.getCoreMlModel(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        let err;
        try {
          await visualRecognition.getCoreMlModel({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

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
        const customerId = 'fake_customerId';
        const params = {
          customerId,
        };

        visualRecognition.deleteUserData(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/user_data', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['customer_id']).toEqual(customerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'fake_customerId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const customerId = 'fake_customerId';
        const params = {
          customerId,
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
        visualRecognition.deleteUserData(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        let err;
        try {
          await visualRecognition.deleteUserData({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        const deleteUserDataPromise = visualRecognition.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
});
