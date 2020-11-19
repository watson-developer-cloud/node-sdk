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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

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
  version: 'testString',
};

const visualRecognitionService = new VisualRecognitionV3(service);

// dont actually create a request
const createRequestMock = jest.spyOn(visualRecognitionService, 'createRequest');
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
    version: 'testString',
  };
});

describe('VisualRecognitionV3', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VisualRecognitionV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VisualRecognitionV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(VisualRecognitionV3.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VisualRecognitionV3(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VisualRecognitionV3(options);

      expect(testInstance.baseOptions.serviceName).toBe(VisualRecognitionV3.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VisualRecognitionV3(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new VisualRecognitionV3(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new VisualRecognitionV3(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('classify', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation classify
        const imagesFile = Buffer.from('This is a mock file.');
        const imagesFilename = 'testString';
        const imagesFileContentType = 'testString';
        const url = 'testString';
        const threshold = 36.0;
        const owners = ['testString'];
        const classifierIds = ['testString'];
        const acceptLanguage = 'en';
        const params = {
          imagesFile: imagesFile,
          imagesFilename: imagesFilename,
          imagesFileContentType: imagesFileContentType,
          url: url,
          threshold: threshold,
          owners: owners,
          classifierIds: classifierIds,
          acceptLanguage: acceptLanguage,
        };

        const classifyResult = visualRecognitionService.classify(params);

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
        expect(options.qs['version']).toEqual(service.version);
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

        visualRecognitionService.classify(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        visualRecognitionService.classify({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createClassifier', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createClassifier
        const name = 'testString';
        const positiveExamples = { key1: Buffer.from('This is a mock file.') };
        const negativeExamples = Buffer.from('This is a mock file.');
        const negativeExamplesFilename = 'testString';
        const params = {
          name: name,
          positiveExamples: positiveExamples,
          negativeExamples: negativeExamples,
          negativeExamplesFilename: negativeExamplesFilename,
        };

        const createClassifierResult = visualRecognitionService.createClassifier(params);

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
        expect(options.formData['${key}_positive_examples'.replace('${key}', 'key1')].data).toEqual(
          positiveExamples['key1']
        );
        expect(
          options.formData['${key}_positive_examples'.replace('${key}', 'key1')].contentType
        ).toEqual('application/octet-stream');
        expect(options.formData['negative_examples'].data).toEqual(negativeExamples);
        expect(options.formData['negative_examples'].filename).toEqual(negativeExamplesFilename);
        expect(options.formData['negative_examples'].contentType).toEqual(
          'application/octet-stream'
        );
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const positiveExamples = { key1: Buffer.from('This is a mock file.') };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          positiveExamples,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.createClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.createClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createClassifierPromise = visualRecognitionService.createClassifier();
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
        // Construct the params object for operation listClassifiers
        const verbose = true;
        const params = {
          verbose: verbose,
        };

        const listClassifiersResult = visualRecognitionService.listClassifiers(params);

        // all methods should return a Promise
        expectToBePromise(listClassifiersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['verbose']).toEqual(verbose);
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

        visualRecognitionService.listClassifiers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        visualRecognitionService.listClassifiers({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getClassifier', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getClassifier
        const classifierId = 'testString';
        const params = {
          classifierId: classifierId,
        };

        const getClassifierResult = visualRecognitionService.getClassifier(params);

        // all methods should return a Promise
        expectToBePromise(getClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['classifier_id']).toEqual(classifierId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const classifierId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.getClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.getClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getClassifierPromise = visualRecognitionService.getClassifier();
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
        // Construct the params object for operation updateClassifier
        const classifierId = 'testString';
        const positiveExamples = { key1: Buffer.from('This is a mock file.') };
        const negativeExamples = Buffer.from('This is a mock file.');
        const negativeExamplesFilename = 'testString';
        const params = {
          classifierId: classifierId,
          positiveExamples: positiveExamples,
          negativeExamples: negativeExamples,
          negativeExamplesFilename: negativeExamplesFilename,
        };

        const updateClassifierResult = visualRecognitionService.updateClassifier(params);

        // all methods should return a Promise
        expectToBePromise(updateClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['${key}_positive_examples'.replace('${key}', 'key1')].data).toEqual(
          positiveExamples['key1']
        );
        expect(
          options.formData['${key}_positive_examples'.replace('${key}', 'key1')].contentType
        ).toEqual('application/octet-stream');
        expect(options.formData['negative_examples'].data).toEqual(negativeExamples);
        expect(options.formData['negative_examples'].filename).toEqual(negativeExamplesFilename);
        expect(options.formData['negative_examples'].contentType).toEqual(
          'application/octet-stream'
        );
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['classifier_id']).toEqual(classifierId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const classifierId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.updateClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.updateClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateClassifierPromise = visualRecognitionService.updateClassifier();
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
        // Construct the params object for operation deleteClassifier
        const classifierId = 'testString';
        const params = {
          classifierId: classifierId,
        };

        const deleteClassifierResult = visualRecognitionService.deleteClassifier(params);

        // all methods should return a Promise
        expectToBePromise(deleteClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['classifier_id']).toEqual(classifierId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const classifierId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.deleteClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.deleteClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteClassifierPromise = visualRecognitionService.deleteClassifier();
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
        // Construct the params object for operation getCoreMlModel
        const classifierId = 'testString';
        const params = {
          classifierId: classifierId,
        };

        const getCoreMlModelResult = visualRecognitionService.getCoreMlModel(params);

        // all methods should return a Promise
        expectToBePromise(getCoreMlModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}/core_ml_model', 'GET');
        const expectedAccept = 'application/octet-stream';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['classifier_id']).toEqual(classifierId);
        expect(options.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const classifierId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          classifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.getCoreMlModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.getCoreMlModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getCoreMlModelPromise = visualRecognitionService.getCoreMlModel();
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
        // Construct the params object for operation deleteUserData
        const customerId = 'testString';
        const params = {
          customerId: customerId,
        };

        const deleteUserDataResult = visualRecognitionService.deleteUserData(params);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/user_data', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['customer_id']).toEqual(customerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteUserDataPromise = visualRecognitionService.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
