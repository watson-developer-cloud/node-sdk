'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const fs = require('fs');
const extend = require('extend');

const service = {
  username: 'foo',
  password: 'bar',
  url: 'http://ibm.com:80',
  version: 'v1',
};

before(function() {
  nock.disableNetConnect();
});

after(function() {
  nock.cleanAll();
});

const natural_language_classifier = watson.natural_language_classifier(service);

const missingParameter = function(err) {
  assert.ok(err instanceof Error && /Missing required/.test(err.message));
};

const goodRequest = function(err) {
  const check = err.message.indexOf('Missing required') > -1;
  assert.strictEqual(false, check);
};

const emptyData = { text: '' };
const nullData = { text: null };
const emptyClassifier = { classifier_id: '' };
const nullClassifier = { classifier_id: null };
const undefinedClassifier = { classifier_id: undefined };
const emptyDataClassifier = { text: '', classifier_id: '' };
const nullDataClassifier = { text: null, classifier_id: null };
const goodClassifier = { classifier_id: 'good' };
const goodData = { text: 'good' };
const goodDataWithClassifierId = { text: 'good', classifier_id: 'good' };
const noTrainingData = {
  metadata: JSON.stringify({ language: 'en', name: 'foo' }),
};

// training requests
// training with a string variable (CSV)
const createWithString = { training_data: 'foo' };
// training with a stream variable (CSV)
const createWithStream = {
  training_data: fs.createReadStream(__dirname + '/../resources/weather_data_train.csv'),
};
// training with a buffer variable (CSV)
const createWithBuffer = {
  training_data: fs.readFileSync(__dirname + '/../resources/weather_data_train.csv'),
};
// training with a form-data object
const createWithObject = {
  training_data: {
    value: fs.readFileSync(__dirname + '/../resources/weather_data_train.csv'),
  },
};

describe('natural_language_classifier', function() {
  it('should fail if no parameters are provided for create, classify, status and delete requests', function() {
    // classify
    natural_language_classifier.classify({}, missingParameter);
    natural_language_classifier.classify(null, missingParameter);
    natural_language_classifier.classify(undefined, missingParameter);
    // createClassifier
    natural_language_classifier.createClassifier({}, missingParameter);
    natural_language_classifier.createClassifier(null, missingParameter);
    natural_language_classifier.createClassifier(undefined, missingParameter);
    // getClassifier
    natural_language_classifier.getClassifier({}, missingParameter);
    natural_language_classifier.getClassifier(null, missingParameter);
    natural_language_classifier.getClassifier(undefined, missingParameter);
    // deleteClassifier
    natural_language_classifier.deleteClassifier({}, missingParameter);
    natural_language_classifier.deleteClassifier(null, missingParameter);
    natural_language_classifier.deleteClassifier(undefined, missingParameter);
  });

  it('should fail if no classifier_id is provided for classify, get and delete requests', function() {
    // classify
    natural_language_classifier.classify(emptyData, missingParameter);
    natural_language_classifier.classify(emptyClassifier, missingParameter);
    natural_language_classifier.classify(nullClassifier, missingParameter);
    natural_language_classifier.classify(undefinedClassifier, missingParameter);
    natural_language_classifier.classify(emptyDataClassifier, missingParameter);
    natural_language_classifier.classify(nullDataClassifier, missingParameter);
    natural_language_classifier.classify(goodData, missingParameter);
    // getClassifier
    natural_language_classifier.getClassifier(emptyClassifier, missingParameter);
    natural_language_classifier.getClassifier(nullClassifier, missingParameter);
    natural_language_classifier.getClassifier(undefinedClassifier, missingParameter);
    natural_language_classifier.getClassifier(emptyDataClassifier, missingParameter);
    natural_language_classifier.getClassifier(nullDataClassifier, missingParameter);
    natural_language_classifier.getClassifier(goodData, missingParameter);
    // deleteClassifier
    natural_language_classifier.deleteClassifier(emptyData, missingParameter);
    natural_language_classifier.deleteClassifier(emptyClassifier, missingParameter);
    natural_language_classifier.deleteClassifier(nullClassifier, missingParameter);
    natural_language_classifier.deleteClassifier(undefinedClassifier, missingParameter);
    natural_language_classifier.deleteClassifier(emptyDataClassifier, missingParameter);
    natural_language_classifier.deleteClassifier(nullDataClassifier, missingParameter);
    natural_language_classifier.deleteClassifier(goodData, missingParameter);
  });

  it('should fail if no data provided for create and classify requests', function() {
    // createClassifier
    natural_language_classifier.createClassifier(nullData, missingParameter);
    natural_language_classifier.createClassifier(emptyData, missingParameter);
    natural_language_classifier.createClassifier(noTrainingData, missingParameter);
    // classify
    natural_language_classifier.classify(emptyClassifier, missingParameter);
    natural_language_classifier.classify(nullData, missingParameter);
    natural_language_classifier.classify(emptyData, missingParameter);
    natural_language_classifier.classify(goodClassifier, missingParameter);
  });

  it('should fail if no metadata is provided for create requests', function() {
    natural_language_classifier.createClassifier(createWithString, missingParameter);
    natural_language_classifier.createClassifier(createWithStream, missingParameter);
    natural_language_classifier.createClassifier(createWithObject, missingParameter);
    natural_language_classifier.createClassifier(createWithBuffer, missingParameter);
  });

  it('all other good requests should pass', function() {
    natural_language_classifier.getClassifier(goodClassifier, goodRequest);
    natural_language_classifier.deleteClassifier(goodClassifier, goodRequest);
    // list doesn't need params
    natural_language_classifier.listClassifiers({}, goodRequest);
    natural_language_classifier.listClassifiers(null, goodRequest);
    natural_language_classifier.listClassifiers(undefined, goodRequest);
    // create classifier
    natural_language_classifier.createClassifier(
      extend(createWithBuffer, noTrainingData),
      goodRequest
    );
    natural_language_classifier.createClassifier(
      extend(createWithObject, noTrainingData),
      goodRequest
    );
    natural_language_classifier.createClassifier(
      extend(createWithStream, noTrainingData),
      goodRequest
    );
    natural_language_classifier.createClassifier(
      extend(createWithString, noTrainingData),
      goodRequest
    );
    natural_language_classifier.classify(goodDataWithClassifierId, goodRequest);
  });

  it('should fail if training_data is not buffer, string or stream', function() {
    const params = extend({}, noTrainingData);
    params.training_data = null;
    natural_language_classifier.createClassifier(params, missingParameter);
    params.training_data = 0;
    natural_language_classifier.createClassifier(params, missingParameter);
    params.training_data = undefined;
    natural_language_classifier.createClassifier(params, missingParameter);
  });
});
