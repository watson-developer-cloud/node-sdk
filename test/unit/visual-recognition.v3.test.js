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
const VisualRecognitionV3 = require('../../dist/visual-recognition/v3');

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
  url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com',
  version: '2018-10-18',
};

const visualRecognition = new VisualRecognitionV3(service);
const createRequestMock = jest.spyOn(visualRecognition, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('VisualRecognitionV3', () => {
  describe('classify', () => {
    describe('positive tests', () => {
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

        const classifyResult = visualRecognition.classify(params);

        // all methods should return a Promise
        expectToBePromise(classifyResult);

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

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        visualRecognition.classify({});
        checkForSuccessfulExecution(createRequestMock);
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

        const createClassifierResult = visualRecognition.createClassifier(params);

        // all methods should return a Promise
        expectToBePromise(createClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['name']).toEqual(name);
        expect(options.formData['${key}_positive_examples'.replace('${key}', 'fake')].data).toEqual(
          positiveExamples['fake']
        );
        expect(
          options.formData['${key}_positive_examples'.replace('${key}', 'fake')].contentType
        ).toEqual('application/octet-stream');
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
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['name', 'positiveExamples'];

        let err;
        try {
          await visualRecognition.createClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['name', 'positiveExamples'];

        const createClassifierPromise = visualRecognition.createClassifier();
        expectToBePromise(createClassifierPromise);

        createClassifierPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listClassifiers', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const verbose = 'fake_verbose';
        const params = {
          verbose,
        };

        const listClassifiersResult = visualRecognition.listClassifiers(params);

        // all methods should return a Promise
        expectToBePromise(listClassifiersResult);

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

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        visualRecognition.listClassifiers({});
        checkForSuccessfulExecution(createRequestMock);
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const params = {
          classifierId,
        };

        const getClassifierResult = visualRecognition.getClassifier(params);

        // all methods should return a Promise
        expectToBePromise(getClassifierResult);

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
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        let err;
        try {
          await visualRecognition.getClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        const getClassifierPromise = visualRecognition.getClassifier();
        expectToBePromise(getClassifierPromise);

        getClassifierPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateClassifier', () => {
    describe('positive tests', () => {
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

        const updateClassifierResult = visualRecognition.updateClassifier(params);

        // all methods should return a Promise
        expectToBePromise(updateClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['${key}_positive_examples'.replace('${key}', 'fake')].data).toEqual(
          positiveExamples['fake']
        );
        expect(
          options.formData['${key}_positive_examples'.replace('${key}', 'fake')].contentType
        ).toEqual('application/octet-stream');
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
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        let err;
        try {
          await visualRecognition.updateClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        const updateClassifierPromise = visualRecognition.updateClassifier();
        expectToBePromise(updateClassifierPromise);

        updateClassifierPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteClassifier', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const params = {
          classifierId,
        };

        const deleteClassifierResult = visualRecognition.deleteClassifier(params);

        // all methods should return a Promise
        expectToBePromise(deleteClassifierResult);

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
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        let err;
        try {
          await visualRecognition.deleteClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        const deleteClassifierPromise = visualRecognition.deleteClassifier();
        expectToBePromise(deleteClassifierPromise);

        deleteClassifierPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCoreMlModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const classifierId = 'fake_classifierId';
        const params = {
          classifierId,
        };

        const getCoreMlModelResult = visualRecognition.getCoreMlModel(params);

        // all methods should return a Promise
        expectToBePromise(getCoreMlModelResult);

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
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        let err;
        try {
          await visualRecognition.getCoreMlModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['classifierId'];

        const getCoreMlModelPromise = visualRecognition.getCoreMlModel();
        expectToBePromise(getCoreMlModelPromise);

        getCoreMlModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteUserData', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customerId = 'fake_customerId';
        const params = {
          customerId,
        };

        const deleteUserDataResult = visualRecognition.deleteUserData(params);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

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
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        let err;
        try {
          await visualRecognition.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        const deleteUserDataPromise = visualRecognition.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
