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

const logit = function(string) {
  console.log('==> ' + string); // eslint-disable-line
  return string;
};

describe.skip('visual_recognition_integration_custom_classifiers @slow', function() {
  // ugh.
  this.timeout(THIRTY_SECONDS * 8);
  this.slow(TWO_SECONDS);
  this.retries(5);

  let visual_recognition;

  before(function(done) {
    visual_recognition = new watson.VisualRecognitionV3(
      Object.assign({}, auth.visual_recognition_rc.v3, {
        version: '2018-03-19',
      })
    );
    nock.enableNetConnect();

    // clean up any leftover temp classifiers from previous test runs
    visual_recognition.listClassifiers({}, function(err, result) {
      if (err) {
        return done(err);
      }
      if (result.classifiers && Array.isArray(result.classifiers)) {
        const toDelete = result.classifiers.filter(c => c && c.name.includes('temporary'));
        // todo: consider fetching the classifier details and only delete ones older than 24 hours
        async.forEach(
          toDelete,
          function(cls, next) {
            // eslint-disable-next-line no-console
            console.log('Deleting old classifier before running tests', cls);
            visual_recognition.deleteClassifier({ classifier_id: cls.classifier_id }, function(
              err
            ) {
              if (err) {
                // eslint-disable-next-line no-console
                console.error('error deleting classifier:', err, cls);
              }
              next(); // even if it failed, go to the next step
            });
          },
          done
        );
      } else {
        done();
      }
    });
  });

  after(function() {
    nock.disableNetConnect();
  });

  // todo: add more tests, consider splitting things between a permanent and a temporary classifier
  describe('create, list, get, delete', function() {
    let classifier_id;
    this.retries(0);

    it('createClassifier()', function(done) {
      visual_recognition.createClassifier(
        {
          name: 'light_dark_test_temporary',
          light_positive_examples: fs.createReadStream(
            path.join(__dirname, '../resources/light.zip')
          ),
          dark_positive_examples: fs.createReadStream(
            path.join(__dirname, '../resources/dark.zip')
          ),
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
        const classes = [];
        classifier.classes.forEach(function(element) {
          classes.push(element.class);
        });
        classes.sort();
        assert.deepEqual(classes, ['dark', 'light']);
        done();
      });
    });

    describe('deletion', function() {
      const test_training_status = function(resolve, reject) {
        //  This evil recursive function will be used to verify that the classifier
        //  has finished training. 'resolve' and 'reject' are functions from an
        //  enclosing promise (or a follow-on callback for resolve if you prefer)
        visual_recognition.getClassifier({ classifier_id: classifier_id }, function(err, response) {
          if (err) {
            reject(err);
            return;
          }
          if (response.status === 'failed') {
            logit(`Classifier ${classifier_id} failed training, ready for deletion.`);
            resolve();
          }
          if (response.status !== 'ready') {
            logit(JSON.stringify(response));
            logit(`Classifier ${classifier_id} status is ${response.status}. Waiting 10 seconds.`);
            setTimeout(test_training_status, 10 * 1000, resolve, reject); // wait 10 seconds and try again
          } else {
            logit(`Classifier ${classifier_id} is ready.`);
            resolve();
          }
        });
      };

      beforeEach(function() {
        return new Promise(test_training_status);
      });

      it('deleteClassifier()', function(done) {
        visual_recognition.deleteClassifier({ classifier_id: classifier_id }, done);
      });
    });
  }); // custom classifiers

  describe.skip('pre-populated classifier @slow', function() {
    let classifier_id;

    before(function() {
      return new Promise(function(resolve, reject) {
        visual_recognition.listClassifiers({}, (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          const classifier_name = 'visual_recognition_test_prepop';
          const c = result.classifiers.find(element => element && element.name === classifier_name);

          if (c === undefined) {
            logit('Classifier not found, creating new classifier...');
            const p = path.join(__dirname, '../resources/visual_recognition.prepop');
            visual_recognition.createClassifier(
              {
                name: 'visual_recognition_test_prepop',
                beach_positive_examples: fs.createReadStream(path.join(p, 'beach.zip')),
                forest_positive_examples: fs.createReadStream(path.join(p, 'forest.zip')),
                still_positive_examples: fs.createReadStream(path.join(p, 'still.zip')),
                water_positive_examples: fs.createReadStream(path.join(p, 'water.zip')),
              },
              function(err, response) {
                if (err) {
                  reject(err);
                  return;
                }
                logit('Created classifier with ID="' + response.classifier_id + '"');
                logit(JSON.stringify(response));
                resolve(response.classifier_id);
              }
            );
          } else {
            logit('Classifier ' + classifier_name + ' found with ID=' + c.classifier_id);
            resolve(c.classifier_id);
          }
        });
      }).then(c => {
        classifier_id = c;
      });
    });

    const test_training_status = function(resolve, reject) {
      //  This evil recursive function will be used to verify that the classifier
      //  has finished training. 'resolve' and 'reject' are functions from an
      //  enclosing promise (or a follow-on callback for resolve if you prefer)
      visual_recognition.getClassifier({ classifier_id: classifier_id }, function(err, response) {
        if (err) {
          reject(err);
          return;
        }
        if (response.status === 'failed') {
          reject(new Error(response.explanation));
          return;
        }
        if (response.status !== 'ready') {
          logit(JSON.stringify(response));
          logit(`Classifier ${classifier_id} status is ${response.status}. Waiting 10 seconds.`);
          setTimeout(test_training_status, 10 * 1000, resolve, reject); // wait 10 seconds and try again
        } else {
          logit(`Classifier ${classifier_id} is ready.`);
          resolve();
        }
      });
    };

    beforeEach(function() {
      return new Promise(test_training_status);
    });

    it('should classify an uploaded image ', function() {
      return new Promise(function(resolve, reject) {
        logit('Classifing with classifier_id = ' + classifier_id); // eslint-disable-line
        const params = {
          images_file: fs.createReadStream(
            __dirname + '/../resources/183px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
          ),
          classifier_ids: [classifier_id],
          threshold: '0.0',
        };
        visual_recognition.classify(params, function(err, result) {
          if (err) {
            reject(err);
            return;
          }
          logit(JSON.stringify(result, null, 2));
          assert.equal(result.images_processed, 1);
          assert.equal(
            result.images[0].image,
            '183px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
          );
          assert.equal(result.images[0].classifiers.length, 1);
          assert.equal(result.images[0].classifiers[0].classifier_id, classifier_id);
          assert(
            result.images[0].classifiers[0].classes.every(function(cl) {
              if (['beach', 'water', 'still', 'forest'].indexOf(cl.class) !== -1) {
                return true;
              } else {
                logit('Rogue class ' + cl.class + ' found.');
                return false;
              }
            })
          );
          resolve();
        });
      });
    });

    it('should come back empty when nothing passes the classification threshold ', function() {
      return new Promise(function(resolve, reject) {
        logit('Classifing with classifier_id = ' + classifier_id); // eslint-disable-line
        const params = {
          images_file: fs.createReadStream(__dirname + '/../resources/potato.jpeg'),
          classifier_ids: [classifier_id],
          threshold: '0.9',
        };
        visual_recognition.classify(params, function(err, result) {
          if (err) {
            reject(err);
            return;
          }
          logit(JSON.stringify(result, null, 2));
          assert.equal(result.images_processed, 1);
          assert.equal(result.images[0].image, 'potato.jpeg');
          assert.equal(result.images[0].classifiers[0].classes.length, 0);
          assert(result.custom_classes > 0);
          resolve();
        });
      });
    });
  }); // pre-populated
}); // vr
