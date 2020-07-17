/**
 * (C) Copyright IBM Corp. 2020.
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
const VisualRecognitionV4 = require('../../visual-recognition/v4');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://gateway.watsonplatform.net/visual-recognition/api/visual-recognition/api',
  version: '2018-10-18',
};

const visualRecognition = new VisualRecognitionV4(service);
const createRequestMock = jest.spyOn(visualRecognition, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('VisualRecognitionV4', () => {
  describe('analyze', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const collectionIds = 'fake_collectionIds';
        const features = 'fake_features';
        const imagesFile = 'fake_imagesFile';
        const imageUrl = 'fake_imageUrl';
        const threshold = 'fake_threshold';
        const params = {
          collectionIds,
          features,
          imagesFile,
          imageUrl,
          threshold,
        };

        const analyzeResult = visualRecognition.analyze(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionIds = 'fake_collectionIds';
        const features = 'fake_features';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionIds,
          features,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.analyze(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionIds', 'features'];

        let err;
        try {
          await visualRecognition.analyze({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionIds', 'features'];

        const analyzePromise = visualRecognition.analyze();
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const name = 'fake_name';
        const description = 'fake_description';
        const params = {
          name,
          description,
        };

        const createCollectionResult = visualRecognition.createCollection(params);

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

        visualRecognition.createCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        visualRecognition.createCollection({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await visualRecognition.createCollection(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('listCollections', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const params = {};

        const listCollectionsResult = visualRecognition.listCollections(params);

        // all methods should return a Promise
        expectToBePromise(listCollectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections', 'GET');
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

        visualRecognition.listCollections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        visualRecognition.listCollections({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await visualRecognition.listCollections(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getCollection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const params = {
          collectionId,
        };

        const getCollectionResult = visualRecognition.getCollection(params);

        // all methods should return a Promise
        expectToBePromise(getCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.getCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        let err;
        try {
          await visualRecognition.getCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        const getCollectionPromise = visualRecognition.getCollection();
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const name = 'fake_name';
        const description = 'fake_description';
        const params = {
          collectionId,
          name,
          description,
        };

        const updateCollectionResult = visualRecognition.updateCollection(params);

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
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.updateCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        let err;
        try {
          await visualRecognition.updateCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        const updateCollectionPromise = visualRecognition.updateCollection();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const params = {
          collectionId,
        };

        const deleteCollectionResult = visualRecognition.deleteCollection(params);

        // all methods should return a Promise
        expectToBePromise(deleteCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.deleteCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        let err;
        try {
          await visualRecognition.deleteCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        const deleteCollectionPromise = visualRecognition.deleteCollection();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const feature = 'fake_feature';
        const modelFormat = 'fake_modelFormat';
        const params = {
          collectionId,
          feature,
          modelFormat,
        };

        const getModelFileResult = visualRecognition.getModelFile(params);

        // all methods should return a Promise
        expectToBePromise(getModelFileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/model', 'GET');
        const expectedAccept = 'application/octet-stream';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['feature']).toEqual(feature);
        expect(options.qs['model_format']).toEqual(modelFormat);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const feature = 'fake_feature';
        const modelFormat = 'fake_modelFormat';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          feature,
          modelFormat,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.getModelFile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'feature', 'modelFormat'];

        let err;
        try {
          await visualRecognition.getModelFile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'feature', 'modelFormat'];

        const getModelFilePromise = visualRecognition.getModelFile();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const imagesFile = 'fake_imagesFile';
        const imageUrl = 'fake_imageUrl';
        const trainingData = 'fake_trainingData';
        const params = {
          collectionId,
          imagesFile,
          imageUrl,
          trainingData,
        };

        const addImagesResult = visualRecognition.addImages(params);

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
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.addImages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        let err;
        try {
          await visualRecognition.addImages({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        const addImagesPromise = visualRecognition.addImages();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const params = {
          collectionId,
        };

        const listImagesResult = visualRecognition.listImages(params);

        // all methods should return a Promise
        expectToBePromise(listImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/images', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.listImages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        let err;
        try {
          await visualRecognition.listImages({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        const listImagesPromise = visualRecognition.listImages();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const imageId = 'fake_imageId';
        const params = {
          collectionId,
          imageId,
        };

        const getImageDetailsResult = visualRecognition.getImageDetails(params);

        // all methods should return a Promise
        expectToBePromise(getImageDetailsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/images/{image_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['image_id']).toEqual(imageId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const imageId = 'fake_imageId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          imageId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.getImageDetails(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'imageId'];

        let err;
        try {
          await visualRecognition.getImageDetails({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'imageId'];

        const getImageDetailsPromise = visualRecognition.getImageDetails();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const imageId = 'fake_imageId';
        const params = {
          collectionId,
          imageId,
        };

        const deleteImageResult = visualRecognition.deleteImage(params);

        // all methods should return a Promise
        expectToBePromise(deleteImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/images/{image_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['image_id']).toEqual(imageId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const imageId = 'fake_imageId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          imageId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.deleteImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'imageId'];

        let err;
        try {
          await visualRecognition.deleteImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'imageId'];

        const deleteImagePromise = visualRecognition.deleteImage();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const imageId = 'fake_imageId';
        const size = 'fake_size';
        const params = {
          collectionId,
          imageId,
          size,
        };

        const getJpegImageResult = visualRecognition.getJpegImage(params);

        // all methods should return a Promise
        expectToBePromise(getJpegImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/images/{image_id}/jpeg', 'GET');
        const expectedAccept = 'image/jpeg';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['size']).toEqual(size);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['image_id']).toEqual(imageId);
        expect(options.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const imageId = 'fake_imageId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          imageId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.getJpegImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'imageId'];

        let err;
        try {
          await visualRecognition.getJpegImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'imageId'];

        const getJpegImagePromise = visualRecognition.getJpegImage();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const params = {
          collectionId,
        };

        const listObjectMetadataResult = visualRecognition.listObjectMetadata(params);

        // all methods should return a Promise
        expectToBePromise(listObjectMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/objects', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.listObjectMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        let err;
        try {
          await visualRecognition.listObjectMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        const listObjectMetadataPromise = visualRecognition.listObjectMetadata();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const object = 'fake_object';
        const newObject = 'fake_newObject';
        const params = {
          collectionId,
          object,
          newObject,
        };

        const updateObjectMetadataResult = visualRecognition.updateObjectMetadata(params);

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
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['object']).toEqual(object);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const object = 'fake_object';
        const newObject = 'fake_newObject';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          object,
          newObject,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.updateObjectMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'object', 'newObject'];

        let err;
        try {
          await visualRecognition.updateObjectMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'object', 'newObject'];

        const updateObjectMetadataPromise = visualRecognition.updateObjectMetadata();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const object = 'fake_object';
        const params = {
          collectionId,
          object,
        };

        const getObjectMetadataResult = visualRecognition.getObjectMetadata(params);

        // all methods should return a Promise
        expectToBePromise(getObjectMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/objects/{object}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['object']).toEqual(object);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const object = 'fake_object';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          object,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.getObjectMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'object'];

        let err;
        try {
          await visualRecognition.getObjectMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'object'];

        const getObjectMetadataPromise = visualRecognition.getObjectMetadata();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const object = 'fake_object';
        const params = {
          collectionId,
          object,
        };

        const deleteObjectResult = visualRecognition.deleteObject(params);

        // all methods should return a Promise
        expectToBePromise(deleteObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/objects/{object}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['object']).toEqual(object);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const object = 'fake_object';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          object,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.deleteObject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'object'];

        let err;
        try {
          await visualRecognition.deleteObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'object'];

        const deleteObjectPromise = visualRecognition.deleteObject();
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
        // parameters
        const collectionId = 'fake_collectionId';
        const params = {
          collectionId,
        };

        const trainResult = visualRecognition.train(params);

        // all methods should return a Promise
        expectToBePromise(trainResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/collections/{collection_id}/train', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.train(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        let err;
        try {
          await visualRecognition.train({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId'];

        const trainPromise = visualRecognition.train();
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const imageId = 'fake_imageId';
        const objects = 'fake_objects';
        const params = {
          collectionId,
          imageId,
          objects,
        };

        const addImageTrainingDataResult = visualRecognition.addImageTrainingData(params);

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
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['image_id']).toEqual(imageId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const collectionId = 'fake_collectionId';
        const imageId = 'fake_imageId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          collectionId,
          imageId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        visualRecognition.addImageTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'imageId'];

        let err;
        try {
          await visualRecognition.addImageTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['collectionId', 'imageId'];

        const addImageTrainingDataPromise = visualRecognition.addImageTrainingData();
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
        // parameters
        const startTime = 'fake_startTime';
        const endTime = 'fake_endTime';
        const params = {
          startTime,
          endTime,
        };

        const getTrainingUsageResult = visualRecognition.getTrainingUsage(params);

        // all methods should return a Promise
        expectToBePromise(getTrainingUsageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v4/training_usage', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['start_time']).toEqual(startTime);
        expect(options.qs['end_time']).toEqual(endTime);
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

        visualRecognition.getTrainingUsage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        visualRecognition.getTrainingUsage({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await visualRecognition.getTrainingUsage(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
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

        checkUrlAndMethod(options, '/v4/user_data', 'DELETE');
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
