'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock = require('nock');
var fs = require('fs');

var service = {
  username: 'foo',
  password: 'bar',
  url: 'http://ibm.com:80',
  version: 'v1'
};

before(function() {
  nock.disableNetConnect();
});

after(function() {
  nock.cleanAll();
});

var natural_language_classifier = watson.natural_language_classifier(service);

var missingParameter = function(err) {
  assert.ok((err instanceof Error) && /Missing required/.test(err.message));
};

var goodRequest = function(err) {
  var check = err.message.indexOf('Missing required') > -1;
  assert.strictEqual(false, check);
};

var emptyData = { text: '' },
  nullData = { text: null },
  emptyClassifier = { classifier: '' },
  nullClassifier = { classifier: null },
  undefinedClassifier = { classifier: undefined },
  emptyDataClassifier = { text: '', classifer: '' },
  nullDataClassifier = { text: null, classifer: null },
  goodData = { text: 'good', classifier: 'good' },
  jsonTrainingData,
  csvTrainingData = {
    training_metadata: JSON.stringify({ language: 'en', name: 'classifier' }),
    training_data: { options: { contentType: 'application/octet-stream' }}
  };

before('load test training_data', function (done) {
  fs.readFile('test/resources/training_data.json', 'utf8', function (err, data) {
    if (err) throw err;
    jsonTrainingData = JSON.parse(data);
  });

  fs.readFile('test/resources/training_data.csv', 'utf8', function (err, data) {
    if (err) throw err;
    csvTrainingData.training_data.value = data;
  });

  done();
});

describe('natural_language_classifer', function() {

  it('should fail if no parameters are provided for create, classify, status and delete requests', function() {
    natural_language_classifier.classify({}, missingParameter);
    natural_language_classifier.classify(null, missingParameter);
    natural_language_classifier.classify(undefined, missingParameter);

    natural_language_classifier.create({}, missingParameter);
    natural_language_classifier.create(null, missingParameter);
    natural_language_classifier.create(undefined, missingParameter);

    natural_language_classifier.status({}, missingParameter);
    natural_language_classifier.status(null, missingParameter);
    natural_language_classifier.status(undefined, missingParameter);

    natural_language_classifier.remove({}, missingParameter);
    natural_language_classifier.remove(null, missingParameter);
    natural_language_classifier.remove(undefined, missingParameter);
  });

  it('should fail if no classifier is provided for classify, status and delete requests', function() {
    natural_language_classifier.create(emptyData, missingParameter);
    natural_language_classifier.create(nullData, missingParameter);

    natural_language_classifier.classify(emptyData, missingParameter);
    natural_language_classifier.classify(emptyClassifier, missingParameter);
    natural_language_classifier.classify(nullClassifier, missingParameter);
    natural_language_classifier.classify(undefinedClassifier, missingParameter);
    natural_language_classifier.classify(emptyDataClassifier, missingParameter);
    natural_language_classifier.classify(nullDataClassifier, missingParameter);

    natural_language_classifier.status(emptyClassifier, missingParameter);
    natural_language_classifier.status(nullClassifier, missingParameter);
    natural_language_classifier.status(undefinedClassifier, missingParameter);
    natural_language_classifier.status(emptyDataClassifier, missingParameter);
    natural_language_classifier.status(nullDataClassifier, missingParameter);

    natural_language_classifier.remove(emptyData, missingParameter);
    natural_language_classifier.remove(emptyClassifier, missingParameter);
    natural_language_classifier.remove(nullClassifier, missingParameter);
    natural_language_classifier.remove(undefinedClassifier, missingParameter);
    natural_language_classifier.remove(emptyDataClassifier, missingParameter);
    natural_language_classifier.remove(nullDataClassifier, missingParameter);

  });

  it('should fail if no data provided create and classify requests', function() {
    natural_language_classifier.create(emptyClassifier, missingParameter);
    natural_language_classifier.create(nullData, missingParameter);
    natural_language_classifier.create(emptyData, missingParameter);

    natural_language_classifier.classify(emptyClassifier, missingParameter);
    natural_language_classifier.classify(nullData, missingParameter);
    natural_language_classifier.classify(emptyData, missingParameter);
  });

  it('all other good requests should pass', function() {
    natural_language_classifier.create(jsonTrainingData, goodRequest);
    natural_language_classifier.create(csvTrainingData, goodRequest);

    natural_language_classifier.status(goodData, goodRequest);
    natural_language_classifier.remove(goodData, goodRequest);

    //list doesn't need params
    natural_language_classifier.list({}, goodRequest);
    natural_language_classifier.list(null, goodRequest);
    natural_language_classifier.list(undefined, goodRequest);
  });


});
