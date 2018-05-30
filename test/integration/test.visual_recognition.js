'use strict';
const fs = require('fs');
const nock = require('nock');
const watson = require('../../index');
const assert = require('assert');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

const THIRTY_SECONDS = 30000;
const TWO_SECONDS = 2000;

describe('visual_recognition_integration', function() {
  // ugh.
  this.timeout(THIRTY_SECONDS * 4);
  this.slow(TWO_SECONDS);
  this.retries(5);

  let visual_recognition;
  let visual_recognition_rc;
  let visual_recognition_url;

  before(function() {
    visual_recognition = new watson.VisualRecognitionV3(
      Object.assign({}, auth.visual_recognition.v3, {
        version: watson.VisualRecognitionV3.VERSION_DATE_2016_05_20,
      })
    );
    visual_recognition_url = new watson.VisualRecognitionV3(
      Object.assign({}, auth.visual_recognition.v3, {
        version: watson.VisualRecognitionV3.VERSION_DATE_2016_05_20,
        url: 'hello.com',
      })
    );
    visual_recognition_rc = new watson.VisualRecognitionV3(
      Object.assign({}, auth.visual_recognition_rc.v3, {
        version: watson.VisualRecognitionV3.VERSION_DATE_2016_05_20,
      })
    );
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  describe('authentication urls', function() {
    it('should have the correct URL depending on rc/cf', function(done) {
      assert.equal(
        visual_recognition._options.url,
        'https://gateway-a.watsonplatform.net/visual-recognition/api'
      );
      assert.equal(
        visual_recognition_rc._options.url,
        'https://gateway.watsonplatform.net/visual-recognition/api'
      );
      assert.equal(visual_recognition_url._options.url, 'hello.com');
      done();
    });
  });

  describe('classify()', function() {
    it('should classify an uploaded image', function(done) {
      const params = {
        images_file: fs.createReadStream(__dirname + '/../resources/car.png'),
      };
      visual_recognition.classify(params, function(err, result) {
        if (err) {
          return done(err);
        }
        // console.log(JSON.stringify(result, null, 2));
        assert.equal(result.images_processed, 1);
        assert.equal(result.images[0].image, 'car.png');
        assert(result.images[0].classifiers.length);
        assert(
          result.images[0].classifiers[0].classes.some(function(c) {
            return c.class === 'car';
          })
        );

        done();
      });
    });

    it('should classify from a buffer', function(done) {
      this.retries(0);
      const params = {
        images_file: fs.readFileSync(__dirname + '/../resources/car.png'),
      };
      visual_recognition.classify(params, function(err, result) {
        if (err) {
          return done(err);
        }
        // console.log(JSON.stringify(result, null, 2));
        assert.equal(result.images_processed, 1);
        assert(result.images[0].classifiers.length);
        assert(
          result.images[0].classifiers[0].classes.some(function(c) {
            return c.class === 'car';
          })
        );

        done();
      });
    });

    it('should classify an image via url', function(done) {
      const params = {
        url: 'https://watson-test-resources.mybluemix.net/resources/car.png',
      };
      visual_recognition.classify(params, function(err, result) {
        if (err) {
          return done(err);
        }
        // console.log(JSON.stringify(result, null, 2));
        assert.equal(result.images_processed, 1);
        assert.equal(
          result.images[0].resolved_url,
          'https://watson-test-resources.mybluemix.net/resources/car.png'
        );
        assert.equal(
          result.images[0].source_url,
          'https://watson-test-resources.mybluemix.net/resources/car.png'
        );
        assert(result.images[0].classifiers.length);
        assert(
          result.images[0].classifiers[0].classes.some(function(c) {
            return c.class === 'car';
          })
        );

        done();
      });
    });
  });

  describe('detectFaces()', function() {
    it('should detect faces in an uploaded image', function(done) {
      const params = {
        images_file: fs.createReadStream(__dirname + '/../resources/obama.jpg'),
      };
      visual_recognition.detectFaces(params, function(err, result) {
        if (err) {
          return done(err);
        }
        // console.log(JSON.stringify(result, null, 2));
        assert.equal(result.images_processed, 1);
        assert.equal(result.images[0].image, 'obama.jpg');
        assert.equal(result.images[0].faces.length, 1, 'There should be exactly one face detected'); // note: the api was sometimes failing to detect any faces right after the release
        const face = result.images[0].faces[0];
        assert.equal(face.gender.gender, 'MALE');
        done();
      });
    });

    it('should detect faces in an image via url', function(done) {
      const params = {
        url: 'https://watson-test-resources.mybluemix.net/resources/obama.jpg',
      };
      visual_recognition.detectFaces(params, function(err, result) {
        if (err) {
          return done(err);
        }
        // console.log(JSON.stringify(result, null, 2));
        assert.equal(result.images_processed, 1);
        assert.equal(
          result.images[0].resolved_url,
          'https://watson-test-resources.mybluemix.net/resources/obama.jpg'
        );
        assert.equal(
          result.images[0].source_url,
          'https://watson-test-resources.mybluemix.net/resources/obama.jpg'
        );
        assert.equal(result.images[0].faces.length, 1, 'There should be exactly one face detected'); // note: the api was sometimes failing to detect any faces right after the release
        const face = result.images[0].faces[0];
        assert.equal(face.gender.gender, 'MALE');
        done();
      });
    });
  });
}); // vr
