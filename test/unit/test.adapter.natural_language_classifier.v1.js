'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const fs = require('fs');
const extend = require('extend');
const pick = require('object.pick');

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

const invalidFormatParameter = function(err) {
  assert.ok(err instanceof Error && /Invalid training_data format/.test(err.message));
};

const invalidParameter = function(err) {
  assert.ok(err instanceof Error && /training_data needs to be/.test(err.message));
};

const emptyData = { text: '' };
const nullData = { text: null };
const emptyClassifier = { classifier: '' };
const nullClassifier = { classifier: null };
const undefinedClassifier = { classifier: undefined };
const emptyDataClassifier = { text: '', classifer: '' };
const nullDataClassifier = { text: null, classifer: null };
const goodData = { text: 'good', classifier: 'good' };
const goodDataWithClassifierId = { text: 'good', classifier_id: 'good' };
const noTrainingData = { language: 'en', name: 'foo' };

// training requests
// training with a string variable (CSV)
const createWithString = extend({ training_data: 'foo' }, noTrainingData);

// training with a stream variable (CSV)
const createWithStream = extend(
  {
    training_data: fs.createReadStream(__dirname + '/../resources/weather_data_train.csv'),
  },
  noTrainingData
);

// training with an object variable (JSON)
const createWithJson = extend(
  {
    training_data: [{ text: 'text', classes: ['class1'] }, { text: 'text2', classes: ['class2'] }],
  },
  noTrainingData
);

describe('natural_language_classifer', function() {
  it('should fail if no parameters are provided for create, classify, classifyCollection, status and delete requests', function() {
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

    natural_language_classifier.classifyCollection({}, missingParameter);
    natural_language_classifier.classifyCollection(null, missingParameter);
    natural_language_classifier.classifyCollection(undefined, missingParameter);
  });

  it('should fail if no classifier is provided for classify, status, classifyCollection, and delete requests', function() {
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

    natural_language_classifier.classifyCollection(emptyData, missingParameter);
    natural_language_classifier.classifyCollection(emptyClassifier, missingParameter);
    natural_language_classifier.classifyCollection(nullClassifier, missingParameter);
    natural_language_classifier.classifyCollection(undefinedClassifier, missingParameter);
    natural_language_classifier.classifyCollection(emptyDataClassifier, missingParameter);
    natural_language_classifier.classifyCollection(nullDataClassifier, missingParameter);
  });

  it('should fail if no data provided create and classify requests', function() {
    natural_language_classifier.create(noTrainingData, missingParameter);
    natural_language_classifier.create(emptyClassifier, missingParameter);
    natural_language_classifier.create(nullData, missingParameter);
    natural_language_classifier.create(emptyData, missingParameter);

    natural_language_classifier.classify(emptyClassifier, missingParameter);
    natural_language_classifier.classify(nullData, missingParameter);
    natural_language_classifier.classify(emptyData, missingParameter);
  });

  it('all other good requests should pass', function() {
    natural_language_classifier.status(goodData, goodRequest);
    natural_language_classifier.remove(goodData, goodRequest);

    natural_language_classifier.status(goodDataWithClassifierId, goodRequest);
    natural_language_classifier.remove(goodDataWithClassifierId, goodRequest);
    // list doesn't need params
    natural_language_classifier.list({}, goodRequest);
    natural_language_classifier.list(null, goodRequest);
    natural_language_classifier.list(undefined, goodRequest);

    // create classifier with string
    natural_language_classifier.create(createWithString, goodRequest);
    natural_language_classifier.create(createWithStream, goodRequest);
    natural_language_classifier.create(createWithJson, goodRequest);
  });

  it('should fail if training_data is not json, string or stream', function() {
    const params = extend({}, noTrainingData);

    params.training_data = null;
    natural_language_classifier.create(params, missingParameter);

    params.training_data = 0;
    natural_language_classifier.create(params, missingParameter);

    params.training_data = {};
    natural_language_classifier.create(params, invalidParameter);
  });

  it('should fail if training_data is not a valid json format', function() {
    const params = extend({}, noTrainingData);

    params.training_data = [{ json: 'bad' }];
    natural_language_classifier.create(params, invalidFormatParameter);
  });

  it('should classify collection', function() {
    const params = {
      classifier_id: 'good',
      collection: { text: 'text' },
    };
    const req = natural_language_classifier.classifyCollection(params, goodRequest);
    const body = Buffer.from(req.body).toString('ascii');
    assert.deepEqual(JSON.parse(body), pick(params, ['collection']));
    assert.equal(req.method, 'POST');
    assert.equal(req.uri.href, 'http://ibm.com:80/v1/classifiers/good/classify_collection');
  });
});
