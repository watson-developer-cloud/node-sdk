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

describe('visual_recognition_integration_collections', function() {
  // ugh.
  this.timeout(THIRTY_SECONDS * 4);
  this.slow(TWO_SECONDS);
  this.retries(5);

  let visual_recognition;

  before(function() {
    visual_recognition = watson.visual_recognition(
      Object.assign({}, auth.visual_recognition.v3, {
        version_date: watson.VisualRecognitionV3.VERSION_DATE_2016_05_20
      })
    );
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

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
