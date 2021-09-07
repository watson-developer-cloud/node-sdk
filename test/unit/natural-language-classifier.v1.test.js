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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const NaturalLanguageClassifierV1 = require('../../dist/natural-language-classifier/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const naturalLanguageClassifierServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.natural-language-classifier.watson.cloud.ibm.com',
};

const naturalLanguageClassifierService = new NaturalLanguageClassifierV1(naturalLanguageClassifierServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(naturalLanguageClassifierService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('NaturalLanguageClassifierV1', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new NaturalLanguageClassifierV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new NaturalLanguageClassifierV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(NaturalLanguageClassifierV1.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      const testInstance = new NaturalLanguageClassifierV1(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new NaturalLanguageClassifierV1(options);

      expect(testInstance.baseOptions.serviceName).toBe(NaturalLanguageClassifierV1.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new NaturalLanguageClassifierV1(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new NaturalLanguageClassifierV1();

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('classify', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation classify
        const classifierId = 'testString';
        const text = 'testString';
        const params = {
          classifierId: classifierId,
          text: text,
        };

        const classifyResult = naturalLanguageClassifierService.classify(params);

        // all methods should return a Promise
        expectToBePromise(classifyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/classifiers/{classifier_id}/classify', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.text).toEqual(text);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const classifierId = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          classifierId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageClassifierService.classify(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageClassifierService.classify({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const classifyPromise = naturalLanguageClassifierService.classify();
        expectToBePromise(classifyPromise);

        classifyPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('classifyCollection', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ClassifyInput
      const classifyInputModel = {
        text: 'How hot will it be today?',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation classifyCollection
        const classifierId = 'testString';
        const collection = [classifyInputModel];
        const params = {
          classifierId: classifierId,
          collection: collection,
        };

        const classifyCollectionResult = naturalLanguageClassifierService.classifyCollection(params);

        // all methods should return a Promise
        expectToBePromise(classifyCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/classifiers/{classifier_id}/classify_collection', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.collection).toEqual(collection);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const classifierId = 'testString';
        const collection = [classifyInputModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          classifierId,
          collection,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageClassifierService.classifyCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageClassifierService.classifyCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const classifyCollectionPromise = naturalLanguageClassifierService.classifyCollection();
        expectToBePromise(classifyCollectionPromise);

        classifyCollectionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createClassifier', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createClassifier
        const trainingMetadata = Buffer.from('This is a mock file.');
        const trainingData = Buffer.from('This is a mock file.');
        const params = {
          trainingMetadata: trainingMetadata,
          trainingData: trainingData,
        };

        const createClassifierResult = naturalLanguageClassifierService.createClassifier(params);

        // all methods should return a Promise
        expectToBePromise(createClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/classifiers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.training_metadata.data).toEqual(trainingMetadata);
        expect(mockRequestOptions.formData.training_metadata.contentType).toEqual('application/json');
        expect(mockRequestOptions.formData.training_data.data).toEqual(trainingData);
        expect(mockRequestOptions.formData.training_data.contentType).toEqual('text/csv');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const trainingMetadata = Buffer.from('This is a mock file.');
        const trainingData = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          trainingMetadata,
          trainingData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        naturalLanguageClassifierService.createClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageClassifierService.createClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createClassifierPromise = naturalLanguageClassifierService.createClassifier();
        expectToBePromise(createClassifierPromise);

        createClassifierPromise.catch((err) => {
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
        const params = {};

        const listClassifiersResult = naturalLanguageClassifierService.listClassifiers(params);

        // all methods should return a Promise
        expectToBePromise(listClassifiersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/classifiers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        naturalLanguageClassifierService.listClassifiers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        naturalLanguageClassifierService.listClassifiers({});
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

        const getClassifierResult = naturalLanguageClassifierService.getClassifier(params);

        // all methods should return a Promise
        expectToBePromise(getClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/classifiers/{classifier_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
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

        naturalLanguageClassifierService.getClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageClassifierService.getClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getClassifierPromise = naturalLanguageClassifierService.getClassifier();
        expectToBePromise(getClassifierPromise);

        getClassifierPromise.catch((err) => {
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

        const deleteClassifierResult = naturalLanguageClassifierService.deleteClassifier(params);

        // all methods should return a Promise
        expectToBePromise(deleteClassifierResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/classifiers/{classifier_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.classifier_id).toEqual(classifierId);
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

        naturalLanguageClassifierService.deleteClassifier(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await naturalLanguageClassifierService.deleteClassifier({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteClassifierPromise = naturalLanguageClassifierService.deleteClassifier();
        expectToBePromise(deleteClassifierPromise);

        deleteClassifierPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
