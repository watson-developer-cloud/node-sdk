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
    test('analyze', async done => {
      const params = {
        collectionIds: [testCollectionId],
        features: 'objects',
        imagesFile: [{ data: fs.createReadStream(__dirname + '/../resources/potato.jpeg') }],
      };

      let res;
      try {
        res = await visualRecognition.analyze(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.images).toBeDefined();
      done();
    });

    test('getModelFile', async done => {
      const params = {
        collectionId: testCollectionId,
        feature: 'objects',
        modelFormat: 'rscnn',
      };

      let res;
      try {
        res = await visualRecognition.getModelFile(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(isStream(result)).toBe(true);
      done();
    });
  });

  describe('collections', () => {
    test('createCollection', async done => {
      const params = {
        name: 'Node-SDK-Test-Collection-TEMP',
      };

      let res;
      try {
        res = await visualRecognition.createCollection(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.collection_id).toBeDefined();

      collectionId = result.collection_id;
      done();
    });

    test('listCollections', async () => {
      const res = await visualRecognition.listCollections();

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
    }, 15000);

    test('getCollection', async done => {
      if (!collectionId) {
        return done();
      }

      const params = {
        collectionId,
      };

      let res;
      try {
        res = await visualRecognition.getCollection(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('updateCollection', async done => {
      if (!collectionId) {
        return done();
      }

      const description = 'updated description';
      const params = {
        collectionId,
        description,
      };

      let res;
      try {
        res = await visualRecognition.updateCollection(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.description).toBe(description);
      done();
    });
  });

  describe('images', () => {
    test('addImages', async done => {
      if (!collectionId) {
        return done();
      }

      const params = {
        collectionId,
        imagesFile: [{ data: fs.createReadStream(__dirname + '/../resources/potato.jpeg') }],
      };

      let res;
      try {
        res = await visualRecognition.addImages(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.images).toBeDefined();
      expect(result.images).toBeInstanceOf(Array);
      expect(result.images[0]).toBeDefined();
      expect(result.images[0].image_id).toBeDefined();

      imageId = result.images[0].image_id;
      done();
    });

    test('listImages', async done => {
      if (!collectionId) {
        return done();
      }

      const params = {
        collectionId,
      };

      let res;
      try {
        res = await visualRecognition.listImages(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('getImageDetails', async done => {
      if (!collectionId || !imageId) {
        return done();
      }

      const params = {
        collectionId,
        imageId,
      };

      let res;
      try {
        res = await visualRecognition.getImageDetails(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.image_id).toBeDefined();
      done();
    });

    test('getJpegImage', async done => {
      if (!collectionId || !imageId) {
        return done();
      }

      const params = {
        collectionId,
        imageId,
      };

      let res;
      try {
        res = await visualRecognition.getJpegImage(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(isStream(result)).toBe(true);
      done();
    });
  });

  describe('training', () => {
    test('addImageTrainingData + train', async done => {
      if (!collectionId || !imageId) {
        return done();
      }

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

      let res;
      try {
        res = await visualRecognition.addImageTrainingData(params);
      } catch (err) {
        return done(err);
      }

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
      let res2;
      try {
        res2 = await visualRecognition.train(params);
      } catch (err) {
        return done(err);
      }

      expect(res2).toBeDefined();
      expect(res2.status).toBe(202);
      const result2 = res2.result || {};
      expect(result2).toBeDefined();

      done();
    });

    test('getTrainingUsage', async done => {
      let res;
      try {
        res = await visualRecognition.getTrainingUsage();
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });
  });

  describe('objects', () => {
    // need to ensure training data is added before running these tests
    beforeAll(async done => {
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

      try {
        await visualRecognition.addImageTrainingData(params);
      } catch (err) {
        return done(err);
      }

      done();
    });

    test('listObjectMetadata', async done => {
      if (!collectionId) {
        return done();
      }

      const params = {
        collectionId,
      };

      let res;
      try {
        res = await visualRecognition.listObjectMetadata(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.object_count).toBeGreaterThan(0);
      done();
    });

    test('getObjectMetadata', async done => {
      if (!collectionId || !object) {
        return done();
      }

      const params = {
        collectionId,
        object,
      };

      let res;
      try {
        res = await visualRecognition.getObjectMetadata(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.object).toBe(object);
      done();
    });

    test('updateObjectMetadata', async done => {
      if (!collectionId || !object) {
        return done();
      }

      const params = {
        collectionId,
        object,
        newObject,
      };

      let res;
      try {
        res = await visualRecognition.updateObjectMetadata(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.object).toBe(newObject);
      done();
    });
  });

  describe('userData', () => {
    test('deleteUserData', async done => {
      const params = {
        customerId: 'somefakeid',
      };

      let res;
      try {
        res = await visualRecognition.deleteUserData(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });
  });

  describe('cleanup - test the delete operations', () => {
    test('deleteObject', async done => {
      if (!collectionId) {
        return done();
      }

      const params = {
        collectionId,
        object: newObject,
      };

      let res;
      try {
        res = await visualRecognition.deleteObject(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('deleteImage', async done => {
      if (!collectionId || !imageId) {
        return done();
      }

      const params = {
        collectionId,
        imageId,
      };

      let res;
      try {
        res = await visualRecognition.deleteImage(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });

    test('deleteCollection', async done => {
      if (!collectionId) {
        return done();
      }

      const params = {
        collectionId,
      };

      let res;
      try {
        res = await visualRecognition.deleteCollection(params);
      } catch (err) {
        return done(err);
      }

      expect(res).toBeDefined();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });
  });
});
