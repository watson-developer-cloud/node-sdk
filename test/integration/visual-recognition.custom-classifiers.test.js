'use strict';
const fs = require('fs');
const { IamAuthenticator } = require('../../auth');
const VisualRecognitionV3 = require('../../visual-recognition/v3');
const path = require('path');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const async = require('async');

const THIRTY_SECONDS = 30000;

const logit = string => {
  console.log('==> ' + string); // eslint-disable-line
  return string;
};

describe.skip('visual_recognition_integration_custom_classifiers @slow', () => {
  // ugh.
  jest.setTimeout(THIRTY_SECONDS * 8);

  const options = authHelper.auth.visualRecognition;
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const visualRecognition = new VisualRecognitionV3(
    Object.assign({}, options.v3, {
      version: '2019-03-27',
    })
  );

  beforeAll(done => {
    // clean up any leftover temp classifiers from previous test runs
    visualRecognition.listClassifiers({}, (err, result) => {
      if (err) {
        return done(err);
      }
      if (result.classifiers && Array.isArray(result.classifiers)) {
        const toDelete = result.classifiers.filter(c => c && c.name.includes('temporary'));
        // todo: consider fetching the classifier details and only delete ones older than 24 hours
        async.forEach(
          toDelete,
          (cls, next) => {
            // eslint-disable-next-line no-console
            console.log('Deleting old classifier before running tests', cls);
            visualRecognition.deleteClassifier({ classifierId: cls.classifier_id }, err => {
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

  // todo: add more tests, consider splitting things between a permanent and a temporary classifier
  describe('create, list, get, delete', () => {
    let classifier_id;

    it('createClassifier()', done => {
      visualRecognition.createClassifier(
        {
          name: 'light_dark_test_temporary',
          lightPositiveExamples: fs.createReadStream(
            path.join(__dirname, '../resources/light.zip')
          ),
          darkPositiveExamples: fs.createReadStream(path.join(__dirname, '../resources/dark.zip')),
        },
        (err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).toBeDefined();
          expect(res.classifier_id).toBeDefined();
          classifier_id = res.classifier_id;
          done();
        }
      );
    });

    it('listClassifiers()', done => {
      visualRecognition.listClassifiers({}, (err, result) => {
        if (err) {
          return done(err);
        }
        expect(result.classifiers).toBeDefined();
        expect(result.classifiers.length).toBeDefined();
        done();
      });
    });

    it('getClassifier()', done => {
      visualRecognition.getClassifier({ classifierId: classifier_id }, (err, res) => {
        if (err) {
          return done(err);
        }
        const classifier = res.result;
        expect(classifier.classifier_id).toBe(classifier_id);
        expect(classifier.name).toBe('light_dark_test_temporary');
        const classes = [];
        classifier.classes.forEach(element => {
          classes.push(element.class);
        });
        classes.sort();
        expect(classes).toEqual(['dark', 'light']);
        done();
      });
    });

    describe('deletion', () => {
      const test_training_status = (resolve, reject) => {
        //  This evil recursive function will be used to verify that the classifier
        //  has finished training. 'resolve' and 'reject' are functions from an
        //  enclosing promise (or a follow-on callback for resolve if you prefer)
        visualRecognition.getClassifier({ classifierId: classifier_id }, (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          if (res.status === 'failed') {
            logit(`Classifier ${classifier_id} failed training, ready for deletion.`);
            resolve();
          }
          if (res.status !== 'ready') {
            logit(JSON.stringify(res));
            logit(`Classifier ${classifier_id} status is ${res.status}. Waiting 10 seconds.`);
            setTimeout(test_training_status, 10 * 1000, resolve, reject); // wait 10 seconds and try again
          } else {
            logit(`Classifier ${classifier_id} is ready.`);
            resolve();
          }
        });
      };

      beforeEach(() => {
        return new Promise(test_training_status);
      });

      it('deleteClassifier()', done => {
        visualRecognition.deleteClassifier({ classifier_id: classifier_id }, done);
      });
    });
  }); // custom classifiers

  describe.skip('pre-populated classifier @slow', () => {
    let classifier_id;

    beforeAll(() => {
      return new Promise((resolve, reject) => {
        visualRecognition.listClassifiers({}, (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          const classifier_name = 'visualRecognition_test_prepop';
          const c = result.classifiers.find(element => element && element.name === classifier_name);

          if (c === undefined) {
            logit('Classifier not found, creating new classifier...');
            const p = path.join(__dirname, '../resources/visualRecognition.prepop');
            visualRecognition.createClassifier(
              {
                name: 'visualRecognition_test_prepop',
                beach_positive_examples: fs.createReadStream(path.join(p, 'beach.zip')),
                forest_positive_examples: fs.createReadStream(path.join(p, 'forest.zip')),
                still_positive_examples: fs.createReadStream(path.join(p, 'still.zip')),
                water_positive_examples: fs.createReadStream(path.join(p, 'water.zip')),
              },
              (err, res) => {
                if (err) {
                  reject(err);
                  return;
                }
                logit('Created classifier with ID="' + res.classifier_id + '"');
                logit(JSON.stringify(res));
                resolve(res.classifier_id);
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

    const test_training_status = (resolve, reject) => {
      //  This evil recursive function will be used to verify that the classifier
      //  has finished training. 'resolve' and 'reject' are functions from an
      //  enclosing promise (or a follow-on callback for resolve if you prefer)
      visualRecognition.getClassifier({ classifier_id: classifier_id }, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        if (res.status === 'failed') {
          reject(new Error(res.explanation));
          return;
        }
        if (res.status !== 'ready') {
          logit(JSON.stringify(res));
          logit(`Classifier ${classifier_id} status is ${res.status}. Waiting 10 seconds.`);
          setTimeout(test_training_status, 10 * 1000, resolve, reject); // wait 10 seconds and try again
        } else {
          logit(`Classifier ${classifier_id} is ready.`);
          resolve();
        }
      });
    };

    beforeEach(() => {
      return new Promise(test_training_status);
    });

    it('should classify an uploaded image ', () => {
      return new Promise((resolve, reject) => {
        logit('Classifing with classifier_id = ' + classifier_id); // eslint-disable-line
        const params = {
          images_file: fs.createReadStream(
            __dirname + '/../resources/183px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
          ),
          classifier_ids: [classifier_id],
          threshold: '0.0',
        };
        visualRecognition.classify(params, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          logit(JSON.stringify(result, null, 2));
          expect(result.images_processed).toBe(1);
          expect(result.images[0].image).toBe(
            '183px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
          );
          expect(result.images[0].classifiers.length).toBe(1);
          expect(result.images[0].classifiers[0].classifier_id).toBe(classifier_id);
          expect(
            result.images[0].classifiers[0].classes.every(cl => {
              if (['beach', 'water', 'still', 'forest'].indexOf(cl.class) !== -1) {
                return true;
              } else {
                logit('Rogue class ' + cl.class + ' found.');
                return false;
              }
            })
          ).toBe(true);
          resolve();
        });
      });
    });

    it('should come back empty when nothing passes the classification threshold ', () => {
      return new Promise((resolve, reject) => {
        logit('Classifing with classifier_id = ' + classifier_id); // eslint-disable-line
        const params = {
          images_file: fs.createReadStream(__dirname + '/../resources/potato.jpeg'),
          classifier_ids: [classifier_id],
          threshold: '0.9',
        };
        visualRecognition.classify(params, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          logit(JSON.stringify(result, null, 2));
          expect(result.images_processed).toBe(1);
          expect(result.images[0].image).toBe('potato.jpeg');
          expect(result.images[0].classifiers[0].classes.length).toBe(0);
          expect(result.custom_classes > 0).toBe(true);
          resolve();
        });
      });
    });
  }); // pre-populated
}); // vr
