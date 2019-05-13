'use strict';
const fs = require('fs');
const VisualRecognitionV3 = require('../../visual-recognition/v3');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const serviceErrorUtils = require('../resources/service_error_util');

const THIRTY_SECONDS = 30000;

describe('visual_recognition_integration', function() {
  // ugh.
  jest.setTimeout(THIRTY_SECONDS * 4);

  const visual_recognition = new VisualRecognitionV3(
    Object.assign({}, auth.visual_recognition, {
      version: '2019-03-27',
    })
  );

  describe('classify()', function() {
    it('should classify an uploaded image', function(done) {
      const params = {
        images_file: fs.createReadStream(__dirname + '/../resources/car.png'),
      };
      visual_recognition.classify(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.images_processed).toBe(1);
          expect(result.images[0].image).toBe('car.png');
          expect(result.images[0].classifiers.length).toBeTruthy();
          expect(
            result.images[0].classifiers[0].classes.some(function(c) {
              return c.class === 'car';
            })
          ).toBe(true);

          done();
        })
      );
    });

    it('should classify from a buffer', function(done) {
      const params = {
        images_file: fs.readFileSync(__dirname + '/../resources/car.png'),
      };
      visual_recognition.classify(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.images_processed).toBe(1);
          expect(result.images[0].classifiers.length).toBeTruthy();
          expect(
            result.images[0].classifiers[0].classes.some(function(c) {
              return c.class === 'car';
            })
          ).toBe(true);

          done();
        })
      );
    });

    it('should classify an image via url', function(done) {
      const params = {
        url: 'https://watson-test-resources.mybluemix.net/resources/car.png',
      };
      visual_recognition.classify(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          // console.log(JSON.stringify(result, null, 2));
          expect(result.images_processed).toBe(1);
          expect(result.images[0].resolved_url).toBe(
            'https://watson-test-resources.mybluemix.net/resources/car.png'
          );
          expect(result.images[0].source_url).toBe(
            'https://watson-test-resources.mybluemix.net/resources/car.png'
          );
          expect(result.images[0].classifiers.length).toBeTruthy();
          expect(
            result.images[0].classifiers[0].classes.some(function(c) {
              return c.class === 'car';
            })
          ).toBe(true);

          done();
        })
      );
    });
  });

  describe('detectFaces()', function() {
    it('should detect faces in an uploaded image', function(done) {
      const params = {
        images_file: fs.createReadStream(__dirname + '/../resources/obama.jpg'),
      };
      visual_recognition.detectFaces(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.images_processed).toBe(1);
          expect(result.images[0].image).toBe('obama.jpg');
          expect(result.images[0].faces.length).toBe(
            1,
            'There should be exactly one face detected'
          ); // note: the api was sometimes failing to detect any faces right after the release
          const face = result.images[0].faces[0];
          expect(face.gender.gender).toBe('MALE');
          done();
        })
      );
    });

    it('should detect faces in an image via url', function(done) {
      const params = {
        url: 'https://watson-test-resources.mybluemix.net/resources/obama.jpg',
      };
      visual_recognition.detectFaces(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          // console.log(JSON.stringify(result, null, 2));
          expect(result.images_processed).toBe(1);
          expect(result.images[0].resolved_url).toBe(
            'https://watson-test-resources.mybluemix.net/resources/obama.jpg'
          );
          expect(result.images[0].source_url).toBe(
            'https://watson-test-resources.mybluemix.net/resources/obama.jpg'
          );
          expect(result.images[0].faces.length).toBe(1); // note: the api was sometimes failing to detect any faces right after the release
          const face = result.images[0].faces[0];
          expect(face.gender.gender).toBe('MALE');
          done();
        })
      );
    });
  });
}); // vr
