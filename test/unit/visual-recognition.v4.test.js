/**
 * (C) Copyright IBM Corp. 2019, 2020.
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

const VisualRecognitionV4 = require('../../dist/visual-recognition/v4');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com',
  version: 'testString',
};

const visualRecognitionService = new VisualRecognitionV4(service);

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

describe('VisualRecognitionV4', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VisualRecognitionV4(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VisualRecognitionV4(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(VisualRecognitionV4.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VisualRecognitionV4(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VisualRecognitionV4(options);

      expect(testInstance.baseOptions.serviceName).toBe(VisualRecognitionV4.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new VisualRecognitionV4(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new VisualRecognitionV4(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new VisualRecognitionV4(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('analyze', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation analyze
        const collectionIds = ['testString'];
        const features = ['objects'];
        const imagesFile = [Buffer.from('This is a mock file.')];
        const imageUrl = ['testString'];
        const threshold = 0.15;
        const params = {
          collectionIds: collectionIds,
          features: features,
          imagesFile: imagesFile,
          imageUrl: imageUrl,
          threshold: threshold,
        };

        const analyzeResult = visualRecognitionService.analyze(params);

        // all methods should return a Promise
        expectToBePromise(analyzeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['collection_ids']).toEqual(collectionIds);
        expect(options.formData['features']).toEqual(features);
        expect(options.formData['images_file']).toEqual(imagesFile);
        expect(options.formData['image_url']).toEqual(imageUrl);
        expect(options.formData['threshold']).toEqual(threshold);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionIds = ['testString'];
        const features = ['objects'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionIds,
          features,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.analyze(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.analyze({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const analyzePromise = visualRecognitionService.analyze();
        expectToBePromise(analyzePromise);

        analyzePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createCollection', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ObjectTrainingStatus
      const objectTrainingStatusModel = {
        ready: true,
        in_progress: true,
        data_changed: true,
        latest_failed: true,
        rscnn_ready: true,
        description: 'testString',
      };

      // TrainingStatus
      const trainingStatusModel = {
        objects: objectTrainingStatusModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createCollection
        const name = 'testString';
        const description = 'testString';
        const trainingStatus = trainingStatusModel;
        const params = {
          name: name,
          description: description,
          trainingStatus: trainingStatus,
        };

        const createCollectionResult = visualRecognitionService.createCollection(params);

        // all methods should return a Promise
        expectToBePromise(createCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['training_status']).toEqual(trainingStatus);
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

        visualRecognitionService.createCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        visualRecognitionService.createCollection({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listCollections', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCollections
        const params = {};

        const listCollectionsResult = visualRecognitionService.listCollections(params);

        // all methods should return a Promise
        expectToBePromise(listCollectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        visualRecognitionService.listCollections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        visualRecognitionService.listCollections({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getCollection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCollection
        const collectionId = 'testString';
        const params = {
          collectionId: collectionId,
        };

        const getCollectionResult = visualRecognitionService.getCollection(params);

        // all methods should return a Promise
        expectToBePromise(getCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.getCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.getCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getCollectionPromise = visualRecognitionService.getCollection();
        expectToBePromise(getCollectionPromise);

        getCollectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateCollection', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ObjectTrainingStatus
      const objectTrainingStatusModel = {
        ready: true,
        in_progress: true,
        data_changed: true,
        latest_failed: true,
        rscnn_ready: true,
        description: 'testString',
      };

      // TrainingStatus
      const trainingStatusModel = {
        objects: objectTrainingStatusModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateCollection
        const collectionId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const trainingStatus = trainingStatusModel;
        const params = {
          collectionId: collectionId,
          name: name,
          description: description,
          trainingStatus: trainingStatus,
        };

        const updateCollectionResult = visualRecognitionService.updateCollection(params);

        // all methods should return a Promise
        expectToBePromise(updateCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['training_status']).toEqual(trainingStatus);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.updateCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.updateCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateCollectionPromise = visualRecognitionService.updateCollection();
        expectToBePromise(updateCollectionPromise);

        updateCollectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCollection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCollection
        const collectionId = 'testString';
        const params = {
          collectionId: collectionId,
        };

        const deleteCollectionResult = visualRecognitionService.deleteCollection(params);

        // all methods should return a Promise
        expectToBePromise(deleteCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.deleteCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.deleteCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteCollectionPromise = visualRecognitionService.deleteCollection();
        expectToBePromise(deleteCollectionPromise);

        deleteCollectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getModelFile', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getModelFile
        const collectionId = 'testString';
        const feature = 'objects';
        const modelFormat = 'rscnn';
        const params = {
          collectionId: collectionId,
          feature: feature,
          modelFormat: modelFormat,
        };

        const getModelFileResult = visualRecognitionService.getModelFile(params);

        // all methods should return a Promise
        expectToBePromise(getModelFileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/model', 'GET');
        const expectedAccept = 'application/octet-stream';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['feature']).toEqual(feature);
        expect(options.qs['model_format']).toEqual(modelFormat);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const feature = 'objects';
        const modelFormat = 'rscnn';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          feature,
          modelFormat,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.getModelFile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.getModelFile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getModelFilePromise = visualRecognitionService.getModelFile();
        expectToBePromise(getModelFilePromise);

        getModelFilePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addImages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addImages
        const collectionId = 'testString';
        const imagesFile = [Buffer.from('This is a mock file.')];
        const imageUrl = ['testString'];
        const trainingData = 'testString';
        const params = {
          collectionId: collectionId,
          imagesFile: imagesFile,
          imageUrl: imageUrl,
          trainingData: trainingData,
        };

        const addImagesResult = visualRecognitionService.addImages(params);

        // all methods should return a Promise
        expectToBePromise(addImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/images', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['images_file']).toEqual(imagesFile);
        expect(options.formData['image_url']).toEqual(imageUrl);
        expect(options.formData['training_data']).toEqual(trainingData);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.addImages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.addImages({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addImagesPromise = visualRecognitionService.addImages();
        expectToBePromise(addImagesPromise);

        addImagesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listImages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listImages
        const collectionId = 'testString';
        const params = {
          collectionId: collectionId,
        };

        const listImagesResult = visualRecognitionService.listImages(params);

        // all methods should return a Promise
        expectToBePromise(listImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/images', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.listImages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.listImages({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listImagesPromise = visualRecognitionService.listImages();
        expectToBePromise(listImagesPromise);

        listImagesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getImageDetails', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getImageDetails
        const collectionId = 'testString';
        const imageId = 'testString';
        const params = {
          collectionId: collectionId,
          imageId: imageId,
        };

        const getImageDetailsResult = visualRecognitionService.getImageDetails(params);

        // all methods should return a Promise
        expectToBePromise(getImageDetailsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/images/{image_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['image_id']).toEqual(imageId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const imageId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          imageId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.getImageDetails(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.getImageDetails({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getImageDetailsPromise = visualRecognitionService.getImageDetails();
        expectToBePromise(getImageDetailsPromise);

        getImageDetailsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteImage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteImage
        const collectionId = 'testString';
        const imageId = 'testString';
        const params = {
          collectionId: collectionId,
          imageId: imageId,
        };

        const deleteImageResult = visualRecognitionService.deleteImage(params);

        // all methods should return a Promise
        expectToBePromise(deleteImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/images/{image_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['image_id']).toEqual(imageId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const imageId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          imageId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.deleteImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.deleteImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteImagePromise = visualRecognitionService.deleteImage();
        expectToBePromise(deleteImagePromise);

        deleteImagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getJpegImage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getJpegImage
        const collectionId = 'testString';
        const imageId = 'testString';
        const size = 'full';
        const params = {
          collectionId: collectionId,
          imageId: imageId,
          size: size,
        };

        const getJpegImageResult = visualRecognitionService.getJpegImage(params);

        // all methods should return a Promise
        expectToBePromise(getJpegImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/images/{image_id}/jpeg', 'GET');
        const expectedAccept = 'image/jpeg';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['size']).toEqual(size);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['image_id']).toEqual(imageId);
        expect(options.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const imageId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          imageId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.getJpegImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.getJpegImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getJpegImagePromise = visualRecognitionService.getJpegImage();
        expectToBePromise(getJpegImagePromise);

        getJpegImagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listObjectMetadata', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listObjectMetadata
        const collectionId = 'testString';
        const params = {
          collectionId: collectionId,
        };

        const listObjectMetadataResult = visualRecognitionService.listObjectMetadata(params);

        // all methods should return a Promise
        expectToBePromise(listObjectMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/objects', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.listObjectMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.listObjectMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listObjectMetadataPromise = visualRecognitionService.listObjectMetadata();
        expectToBePromise(listObjectMetadataPromise);

        listObjectMetadataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateObjectMetadata', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateObjectMetadata
        const collectionId = 'testString';
        const object = 'testString';
        const newObject = 'testString';
        const params = {
          collectionId: collectionId,
          object: object,
          newObject: newObject,
        };

        const updateObjectMetadataResult = visualRecognitionService.updateObjectMetadata(params);

        // all methods should return a Promise
        expectToBePromise(updateObjectMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/objects/{object}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['object']).toEqual(newObject);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['object']).toEqual(object);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const object = 'testString';
        const newObject = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          object,
          newObject,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.updateObjectMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.updateObjectMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateObjectMetadataPromise = visualRecognitionService.updateObjectMetadata();
        expectToBePromise(updateObjectMetadataPromise);

        updateObjectMetadataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getObjectMetadata', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getObjectMetadata
        const collectionId = 'testString';
        const object = 'testString';
        const params = {
          collectionId: collectionId,
          object: object,
        };

        const getObjectMetadataResult = visualRecognitionService.getObjectMetadata(params);

        // all methods should return a Promise
        expectToBePromise(getObjectMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/objects/{object}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['object']).toEqual(object);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const object = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          object,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.getObjectMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.getObjectMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getObjectMetadataPromise = visualRecognitionService.getObjectMetadata();
        expectToBePromise(getObjectMetadataPromise);

        getObjectMetadataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteObject', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteObject
        const collectionId = 'testString';
        const object = 'testString';
        const params = {
          collectionId: collectionId,
          object: object,
        };

        const deleteObjectResult = visualRecognitionService.deleteObject(params);

        // all methods should return a Promise
        expectToBePromise(deleteObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/objects/{object}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['object']).toEqual(object);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const object = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          object,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.deleteObject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.deleteObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteObjectPromise = visualRecognitionService.deleteObject();
        expectToBePromise(deleteObjectPromise);

        deleteObjectPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('train', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation train
        const collectionId = 'testString';
        const params = {
          collectionId: collectionId,
        };

        const trainResult = visualRecognitionService.train(params);

        // all methods should return a Promise
        expectToBePromise(trainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/train', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.train(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.train({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const trainPromise = visualRecognitionService.train();
        expectToBePromise(trainPromise);

        trainPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addImageTrainingData', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Location
      const locationModel = {
        top: 38,
        left: 38,
        width: 38,
        height: 38,
      };

      // TrainingDataObject
      const trainingDataObjectModel = {
        object: 'testString',
        location: locationModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addImageTrainingData
        const collectionId = 'testString';
        const imageId = 'testString';
        const objects = [trainingDataObjectModel];
        const params = {
          collectionId: collectionId,
          imageId: imageId,
          objects: objects,
        };

        const addImageTrainingDataResult = visualRecognitionService.addImageTrainingData(params);

        // all methods should return a Promise
        expectToBePromise(addImageTrainingDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v4/collections/{collection_id}/images/{image_id}/training_data',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['objects']).toEqual(objects);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['image_id']).toEqual(imageId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'testString';
        const imageId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          collectionId,
          imageId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognitionService.addImageTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await visualRecognitionService.addImageTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addImageTrainingDataPromise = visualRecognitionService.addImageTrainingData();
        expectToBePromise(addImageTrainingDataPromise);

        addImageTrainingDataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getTrainingUsage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getTrainingUsage
        const startTime = '2019-01-01';
        const endTime = '2019-01-01';
        const params = {
          startTime: startTime,
          endTime: endTime,
        };

        const getTrainingUsageResult = visualRecognitionService.getTrainingUsage(params);

        // all methods should return a Promise
        expectToBePromise(getTrainingUsageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/training_usage', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['start_time']).toEqual(startTime);
        expect(options.qs['end_time']).toEqual(endTime);
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

        visualRecognitionService.getTrainingUsage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        visualRecognitionService.getTrainingUsage({});
        checkForSuccessfulExecution(createRequestMock);
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

        checkUrlAndMethod(options, '/v4/user_data', 'DELETE');
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
