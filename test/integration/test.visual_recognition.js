'use strict';
const fs = require('fs');
const nock = require('nock');
const watson = require('../../index');
const assert = require('assert');
const path = require('path');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const async = require('async');

const THIRTY_SECONDS = 30000;
const TWO_SECONDS = 2000;

describe('visual_recognition_integration', function() {
  // ugh.
  this.timeout(THIRTY_SECONDS * 4);
  this.slow(TWO_SECONDS);
  this.retries(5);

  let visual_recognition;

  before(function() {
    visual_recognition = watson.visual_recognition(auth.visual_recognition.v3);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('should return error when invalid api_key', function(done) {
    const constructor = auth.visual_recognition.v3;
    constructor.api_key = 'not-a-valid-key';
    const recognition = watson.visual_recognition(constructor);

    recognition.listClassifiers({}, function(err) {
      if (err) {
        return done();
      } else {
        return done('Should return an error');
      }
    });
  });

  describe('classify()', function() {
    it('should classify an uploaded image', function(done) {
      const params = {
        images_file: fs.createReadStream(__dirname + '/../resources/car.png')
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
        images_file: fs.readFileSync(__dirname + '/../resources/car.png')
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
        url: 'https://watson-test-resources.mybluemix.net/resources/car.png'
      };
      visual_recognition.classify(params, function(err, result) {
        if (err) {
          return done(err);
        }
        // console.log(JSON.stringify(result, null, 2));
        assert.equal(result.images_processed, 1);
        assert.equal(result.images[0].resolved_url, 'https://watson-test-resources.mybluemix.net/resources/car.png');
        assert.equal(result.images[0].source_url, 'https://watson-test-resources.mybluemix.net/resources/car.png');
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

  describe.skip('detectFaces()', function() {
    it('should detect faces in an uploaded image', function(done) {
      const params = {
        images_file: fs.createReadStream(__dirname + '/../resources/obama.jpg')
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
        assert.equal(face.identity.name, 'Barack Obama');
        done();
      });
    });

    it('should detect faces in an image via url', function(done) {
      const params = {
        url: 'https://watson-test-resources.mybluemix.net/resources/obama.jpg'
      };
      visual_recognition.detectFaces(params, function(err, result) {
        if (err) {
          return done(err);
        }
        // console.log(JSON.stringify(result, null, 2));
        assert.equal(result.images_processed, 1);
        assert.equal(result.images[0].resolved_url, 'https://watson-test-resources.mybluemix.net/resources/obama.jpg');
        assert.equal(result.images[0].source_url, 'https://watson-test-resources.mybluemix.net/resources/obama.jpg');
        assert.equal(result.images[0].faces.length, 1, 'There should be exactly one face detected'); // note: the api was sometimes failing to detect any faces right after the release
        const face = result.images[0].faces[0];
        assert.equal(face.gender.gender, 'MALE');
        assert.equal(face.identity.name, 'Barack Obama');
        done();
      });
    });
  });

  // this endpoint is currently experiencing issues
  describe.skip('recognizeText()', function() {
    it('read text in an uploaded image', function(done) {
      const params = {
        images_file: fs.createReadStream(__dirname + '/../resources/car.png')
      };
      visual_recognition.recognizeText(params, function(err, result) {
        if (err) {
          return done(err);
        }

        // console.log(JSON.stringify(actual, null, 2));

        assert.equal(result.images_processed, 1);
        assert.equal(result.images[0].image, 'car.png');
        assert(result.images[0].text);
        assert(result.images[0].words.length);

        done();
      });
    });

    it('read text an image via url', function(done) {
      const params = {
        url: 'https://watson-test-resources.mybluemix.net/resources/car.png'
      };
      visual_recognition.recognizeText(params, function(err, result) {
        if (err) {
          return done(err);
        }
        // console.log(JSON.stringify(result, null, 2));

        assert.equal(result.images_processed, 1);
        assert.equal(result.images[0].resolved_url, 'https://watson-test-resources.mybluemix.net/resources/car.png');
        assert.equal(result.images[0].source_url, 'https://watson-test-resources.mybluemix.net/resources/car.png');
        assert(result.images[0].text);
        assert(result.images[0].words.length);

        done();
      });
    });
  });

  // todo: add more tests, consider splitting things between a permanent and a temporary classifier
  describe('custom classifiers', function() {
    let classifier_id;
    this.retries(0);

    it('createClassifier()', function(done) {
      visual_recognition.createClassifier(
        {
          name: 'light_dark_test_temporary',
          light_positive_examples: fs.createReadStream(path.join(__dirname, '../resources/light.zip')),
          dark_positive_examples: fs.createReadStream(path.join(__dirname, '../resources/dark.zip'))
        },
        function(err, response) {
          if (err) {
            return done(err);
          }
          assert(response);
          assert(response.classifier_id);
          classifier_id = response.classifier_id;
          done();
        }
      );
    });

    it('listClassifiers()', function(done) {
      visual_recognition.listClassifiers({}, function(err, result) {
        if (err) {
          return done(err);
        }
        assert(result.classifiers);
        assert(result.classifiers.length);
        // hack until we're allowed multiple classifiers
        if (!classifier_id) {
          classifier_id = result.classifiers[0].classifier_id;
        }
        // var permament_classifiers = result.classifiers.filter(function(c) {
        //   return c.classifier_id === classifier_id;
        // });
        // assert(permament_classifiers.length);
        done();
      });
    });

    it('getClassifier()', function(done) {
      visual_recognition.getClassifier({ classifier_id: classifier_id }, function(err, classifier) {
        if (err) {
          return done(err);
        }
        assert.equal(classifier.classifier_id, classifier_id);
        assert.equal(classifier.name, 'light_dark_test_temporary');
        assert.deepEqual(classifier.classes, [{ class: 'light' }, { class: 'dark' }]);
        done();
      });
    });

    it('deleteClassifier()', function(done) {
      visual_recognition.deleteClassifier({ classifier_id: classifier_id }, done);
    });
  }); // custom classifiers
  // todo: consider creating a permanent collection to run most of these against so that a failure in creation will only kill the creation/deletion tests
  describe('collections', function() {
    this.retries(0);
    let collection_id;
    let image_id;

    // there is currently a limited number collections per service instance
    // so, this automatically deletes any existing collections that are > 15 minutes old
    // presumably they were left from previous (failed) test runs
    before(function(done) {
      visual_recognition.listCollections({}, function(err, result) {
        if (err) {
          return done(err);
        }
        const cutoff = new Date();
        cutoff.setMinutes(cutoff.getMinutes() - 15);
        if (result.collections && Array.isArray(result.collections)) {
          async.forEach(
            result.collections,
            function(col, next) {
              if (new Date(col.created) < cutoff) {
                // eslint-disable-next-line no-console
                console.log('Deleting old collection before running tests', col);
                visual_recognition.deleteCollection({ collection_id: col.collection_id }, function(err) {
                  if (err) {
                    // eslint-disable-next-line no-console
                    console.error('error deleting collection:', err, col);
                  }
                  next(); // even if it failed, go to the next step
                });
              } else {
                next();
              }
            },
            done
          );
        } else {
          done();
        }
      });
    });

    it('createCollection()', function(done) {
      visual_recognition.createCollection({ name: 'integration_test_' + Date.now() }, function(err, result) {
        if (err) {
          return done(err);
        }
        assert(result.collection_id);
        collection_id = result.collection_id;
        done();
      });
    });

    it('listCollections()', function(done) {
      visual_recognition.listCollections({}, function(err, result) {
        if (err) {
          return done(err);
        }
        assert(result);
        assert(result.collections);
        assert(result.collections.length);
        // todo: consider looping through collections to assert that collection_id is in the list
        done();
      });
    });

    it('getCollection()', function(done) {
      visual_recognition.getCollection({ collection_id: collection_id }, function(err, result) {
        if (err) {
          return done(err);
        }
        assert(result);
        assert.equal(result.collection_id, collection_id);
        done();
      });
    });

    it('addImage()', function(done) {
      visual_recognition.addImage(
        {
          collection_id: collection_id,
          image_file: fs.createReadStream(path.join(__dirname, '../resources/obama.jpg')),
          metadata: { foo: 'bar' }
        },
        function(err, response) {
          if (err) {
            return done(err);
          }
          assert(response);
          assert.equal(response.images_processed, 1);
          assert(response.images);
          assert(response.images.length);
          assert(response.images[0].image_id);
          image_id = response.images[0].image_id;
          assert.equal(response.images[0].image_file, 'obama.jpg');
          assert(response.images[0].metadata);
          assert.equal(response.images[0].metadata.foo, 'bar');
          done();
        }
      );
    });

    it('listImages()', function(done) {
      visual_recognition.listImages({ collection_id: collection_id }, function(err, result) {
        if (err) {
          return done(err);
        }
        assert(result);
        assert(result.images);
        assert(result.images.length);
        done();
      });
    });

    it('getImage()', function(done) {
      visual_recognition.getImage(
        {
          collection_id: collection_id,
          image_id: image_id
        },
        function(err, result) {
          if (err) {
            return done(err);
          }
          assert(result);
          assert(result.image_id);
          done();
        }
      );
    });

    it('setImageMetadata', function(done) {
      visual_recognition.setImageMetadata(
        {
          collection_id: collection_id,
          image_id: image_id,
          metadata: { baz: 'bam' }
        },
        function(err, result) {
          if (err) {
            return done(err);
          }
          assert(result);
          assert.equal(result.baz, 'bam');
          done();
        }
      );
    });

    it('getImageMetadata()', function(done) {
      visual_recognition.getImageMetadata(
        {
          collection_id: collection_id,
          image_id: image_id
        },
        function(err, result) {
          if (err) {
            return done(err);
          }
          assert(result);
          assert.equal(result.baz, 'bam');
          done();
        }
      );
    });

    it('findSimilar()', function(done) {
      visual_recognition.findSimilar(
        {
          collection_id: collection_id,
          image_file: fs.createReadStream(path.join(__dirname, '../resources/obama2.jpg'))
        },
        function(err, result) {
          if (err) {
            return done(err);
          }
          assert(result);
          assert(result.images_processed);
          assert(result.similar_images);
          done();
        }
      );
    });

    it('deleteImageMetadata()', function(done) {
      visual_recognition.deleteImageMetadata(
        {
          collection_id: collection_id,
          image_id: image_id
        },
        done
      );
    });

    it('deleteImage()', function(done) {
      visual_recognition.deleteImage(
        {
          collection_id: collection_id,
          image_id: image_id
        },
        done
      );
    });

    it('deleteCollection()', function(done) {
      visual_recognition.deleteCollection({ collection_id: collection_id }, done);
    });
  }); // collections
}); // vr
