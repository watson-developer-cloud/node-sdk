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

const fs = require('fs');
const isStream = require('isstream');
const { IamAuthenticator } = require('../../dist/auth');
const VisualRecognitionV4 = require('../../dist/visual-recognition/v4');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

describe('visual recognition v4 integration', () => {
  const options = authHelper.auth.visualRecognition;
  options.version = '2019-09-27';
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const visualRecognition = new VisualRecognitionV4(options);

  // testing collections
  const { testCollectionId } = options;

  let collectionId;
  let imageId;

  const object = 'node sdk test - temp';
  const newObject = 'node sdk test - temp - updated';

  describe('analysis', () => {
    test('analyze', async () => {
      const params = {
        collectionIds: [testCollectionId],
        features: 'objects',
        imagesFile: [{ data: fs.createReadStream(__dirname + '/../resources/potato.jpeg') }],
      };

      const res = await visualRecognition.analyze(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.images).toBeDefined();
    });

    test('getModelFile', async () => {
      const params = {
        collectionId: testCollectionId,
        feature: 'objects',
        modelFormat: 'rscnn',
      };

      const res = await visualRecognition.getModelFile(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(isStream(result)).toBe(true);
    });
  });

  describe('collections', () => {
    test('createCollection', async () => {
      const params = {
        name: 'Node-SDK-Test-Collection-TEMP',
      };

      const res = await visualRecognition.createCollection(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.collection_id).toBeDefined();

      collectionId = result.collection_id;
    });

    test('listCollections', async () => {
      const res = await visualRecognition.listCollections();

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    }, 30000);

    test('getCollection', async () => {
      expect(collectionId).toBeTruthy();

      const params = {
        collectionId,
      };

      const res = await visualRecognition.getCollection(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    test('updateCollection', async () => {
      expect(collectionId).toBeTruthy();

      const description = 'updated description';
      const params = {
        collectionId,
        description,
      };

      const res = await visualRecognition.updateCollection(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.description).toBe(description);
    });
  });

  describe('images', () => {
    test('addImages', async () => {
      expect(collectionId).toBeTruthy();

      const params = {
        collectionId,
        imagesFile: [{ data: fs.createReadStream(__dirname + '/../resources/potato.jpeg') }],
      };

      const res = await visualRecognition.addImages(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.images).toBeDefined();
      expect(result.images).toBeInstanceOf(Array);
      expect(result.images[0]).toBeDefined();
      expect(result.images[0].image_id).toBeDefined();

      imageId = result.images[0].image_id;
    });

    test('listImages', async () => {
      expect(collectionId).toBeTruthy();

      const params = {
        collectionId,
      };

      const res = await visualRecognition.listImages(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    test('getImageDetails', async () => {
      expect(collectionId && imageId).toBeTruthy();

      const params = {
        collectionId,
        imageId,
      };

      const res = await visualRecognition.getImageDetails(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.image_id).toBeDefined();
    });

    test('getJpegImage', async () => {
      expect(collectionId && imageId).toBeTruthy();

      const params = {
        collectionId,
        imageId,
      };

      const res = await visualRecognition.getJpegImage(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(isStream(result)).toBe(true);
    });
  });

  describe('training', () => {
    test('addImageTrainingData + train', async () => {
      expect(collectionId && imageId).toBeTruthy();

      const params = {
        collectionId,
        imageId,
        objects: [
          {
            object,
            location: {
              top: 8,
              left: 48,
              width: 101,
              height: 91,
            },
          },
        ],
      };

      const res = await visualRecognition.addImageTrainingData(params);

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.objects).toBeDefined();
      expect(result.objects.length).toBeGreaterThan(0);

      // for some reason, train won't work in it's own test,
      // even when I run the tests serially
      // it tells me: 'The collection does not have enough training data.
      //   At least one image must have an object with a bounding box.'
      // combining the tests for now
      const res2 = await visualRecognition.train(params);
      expect(res2).toBeDefined();
      expect(res2.status).toBe(202);
      const result2 = res2.result || {};
      expect(result2).toBeDefined();
    });

    test('getTrainingUsage', async () => {
      const res = await visualRecognition.getTrainingUsage();
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });

  describe('objects', () => {
    // need to ensure training data is added before running these tests
    beforeAll(async () => {
      const params = {
        collectionId,
        imageId,
        objects: [
          {
            object,
            location: {
              top: 8,
              left: 48,
              width: 101,
              height: 91,
            },
          },
        ],
      };

      await visualRecognition.addImageTrainingData(params);
    });

    test('listObjectMetadata', async () => {
      expect(collectionId).toBeTruthy();

      const params = {
        collectionId,
      };

      const res = await visualRecognition.listObjectMetadata(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.object_count).toBeGreaterThan(0);
    });

    test('getObjectMetadata', async () => {
      expect(collectionId && object).toBeTruthy();

      const params = {
        collectionId,
        object,
      };

      const res = await visualRecognition.getObjectMetadata(params);
      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.object).toBe(object);
    });

    test('updateObjectMetadata', async () => {
      expect(collectionId && object).toBeTruthy();

      const params = {
        collectionId,
        object,
        newObject,
      };

      const res = await visualRecognition.updateObjectMetadata(params);

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.object).toBe(newObject);
    });
  });

  describe('userData', () => {
    test('deleteUserData', async () => {
      const params = {
        customerId: 'somefakeid',
      };

      const res = await visualRecognition.deleteUserData(params);

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });

  describe('cleanup - test the delete operations', () => {
    test('deleteObject', async () => {
      expect(collectionId).toBeTruthy();

      const params = {
        collectionId,
        object: newObject,
      };

      const res = await visualRecognition.deleteObject(params);

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    test('deleteImage', async () => {
      expect(collectionId && imageId).toBeTruthy();

      const params = {
        collectionId,
        imageId,
      };

      const res = await visualRecognition.deleteImage(params);

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    });

    test('deleteCollection', async () => {
      expect(collectionId).toBeTruthy();

      const params = {
        collectionId,
      };

      const res = await visualRecognition.deleteCollection(params);

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });
});
