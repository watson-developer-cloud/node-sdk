'use strict';
const fs = require('fs');
const VisualRecognitionV3 = require('../../visual-recognition/v3');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const serviceErrorUtils = require('../resources/service_error_util');

const THIRTY_SECONDS = 30000;

describe('visual_recognition_integration', function() {
  // ugh.
  jest.setTimeout(THIRTY_SECONDS * 4);

  const auth = authHelper.auth.visualRecognition;
  auth.iam_apikey = auth.apikey;
  const visual_recognition = new VisualRecognitionV3(
    Object.assign({}, auth, {
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
});
