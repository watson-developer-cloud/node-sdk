'use strict';
const fs = require('fs');
const { IamAuthenticator } = require('../../dist/auth');
const VisualRecognitionV3 = require('../../dist/visual-recognition/v3');
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

  beforeAll(async () => {
    // clean up any leftover temp classifiers from previous test runs
    const result = await visualRecognition.listClassifiers();
    if (result.classifiers && Array.isArray(result.classifiers)) {
      const toDelete = result.classifiers.filter(c => c && c.name.includes('temporary'));
      // todo: consider fetching the classifier details and only delete ones older than 24 hours
      for (const cls of toDelete) {
        try {
          await visualRecognition.deleteClassifier({ classifierId: cls.classifier_id });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('error deleting classifier:', err, cls);
        }
      }
    }
  });

  // todo: add more tests, consider splitting things between a permanent and a temporary classifier
  describe('create, list, get, delete', () => {
    let classifier_id;

    it('should createClassifier()', async () => {
      const params = {
        name: 'light_dark_test_temporary',
        lightPositiveExamples: fs.createReadStream(path.join(__dirname, '../resources/light.zip')),
        darkPositiveExamples: fs.createReadStream(path.join(__dirname, '../resources/dark.zip')),
      };
      const res = await visualRecognition.createClassifier(params);
      expect(res).toBeDefined();
      expect(res.classifier_id).toBeDefined();
      classifier_id = res.classifier_id;
    });

    it('should listClassifiers()', async () => {
      const res = await visualRecognition.listClassifiers();
      const { result } = res || {};
      expect(result.classifiers).toBeDefined();
      expect(result.classifiers.length).toBeDefined();
    });

    it('should getClassifier()', async () => {
      const params = {
        classifierId: classifier_id,
      };
      const res = await visualRecognition.getClassifier(params);
      const classifier = res.result;
      expect(classifier.classifier_id).toBe(classifier_id);
      expect(classifier.name).toBe('light_dark_test_temporary');
      const classes = [];
      classifier.classes.forEach(element => {
        classes.push(element.class);
      });
      classes.sort();
      expect(classes).toEqual(['dark', 'light']);
    });

    describe('deletion', () => {
      const test_training_status = async (resolve, reject) => {
        //  This evil recursive function will be used to verify that the classifier
        //  has finished training. 'resolve' and 'reject' are functions from an
        //  enclosing promise (or a follow-on callback for resolve if you prefer)
        const params = {
          classifierId: classifier_id,
        };
        try {
          const res = await visualRecognition.getClassifier(params);

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
        } catch (err) {
          reject(err);
          return;
        }
      };

      beforeEach(() => {
        return new Promise(test_training_status);
      });

      it('deleteClassifier()', async () => {
        const res = await visualRecognition.deleteClassifier({ classifier_id: classifier_id });
      });
    });
  }); // custom classifier
}); // vr
