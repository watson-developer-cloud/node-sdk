'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock = require('nock');
var fs = require('fs');
var extend = require('extend');

var service = {
  username: '0475fdfa-753f-4f4a-bd75-defcb94ee9de',
  password: 'hDERI6dbPINd',
  url: 'https://gateway-d.watsonplatform.net/retrieve-and-rank/api',
  version: 'v1'
};

before(function() {
  nock.disableNetConnect();
});

after(function() {
  nock.cleanAll();
});

var service = watson.retrieve_and_rank(service);

var missingParameter = function(err) {
  assert.ok((err instanceof Error) && /Missing required/.test(err.message));
};

var goodRequest = function(err) {
  var check = err.message.indexOf('Missing required') > -1;
  assert.strictEqual(false, check);
};

var invalidFormatParameter = function(err) {
  assert.ok((err instanceof Error) && /Invalid training_data format/.test(err.message));
};

var invalidParameter = function(err) {
  assert.ok((err instanceof Error) && /training_data needs to be/.test(err.message));
};

var emptyData = { text: '' },
  nullData = { text: null },
  emptyClassifier = { classifier: '' },
  nullClassifier = { classifier: null },
  undefinedClassifier = { classifier: undefined },
  emptyDataClassifier = { text: '', classifer: '' },
  nullDataClassifier = { text: null, classifer: null },
  goodData = { text: 'good', classifier: 'good' },
  goodDataWithClassifierId = { text: 'good', classifier_id: 'good' },
  noTrainingData = {language:'en', name:'foo'};

// training requests
// training with a string variable (CSV)
var createWithString = extend ({training_data: 'foo'}, noTrainingData);

// training with a stream variable (CSV)
var createWithStream = extend({
    training_data: ''
}, noTrainingData);

// training with an object variable (JSON)
var createWithJson = extend ({
  training_data: [
    { text: 'text', classes:['class1'] },
    { text: 'text2', classes:['class2'] },
  ]
}, noTrainingData);


describe('ranker', function() {

  it('should fail if no parameters are provided for create, classify, status and delete requests', function() {
    service.rank({}, missingParameter);
    service.rank(null, missingParameter);
    service.rank(undefined, missingParameter);

    service.createRanker({}, missingParameter);
    service.createRanker(null, missingParameter);
    service.createRanker(undefined, missingParameter);

    service.rankerStatus({}, missingParameter);
    service.rankerStatus(null, missingParameter);
    service.rankerStatus(undefined, missingParameter);

    service.deleteRanker({}, missingParameter);
    service.deleteRanker(null, missingParameter);
    service.deleteRanker(undefined, missingParameter);
  });

  it('should fail if no classifier is provided for classify, status and delete requests', function() {

    service.rank(emptyData, missingParameter);
    service.rank(emptyClassifier, missingParameter);
    service.rank(nullClassifier, missingParameter);
    service.rank(undefinedClassifier, missingParameter);
    service.rank(emptyDataClassifier, missingParameter);
    service.rank(nullDataClassifier, missingParameter);

    service.rankerStatus(emptyClassifier, missingParameter);
    service.rankerStatus(nullClassifier, missingParameter);
    service.rankerStatus(undefinedClassifier, missingParameter);
    service.rankerStatus(emptyDataClassifier, missingParameter);
    service.rankerStatus(nullDataClassifier, missingParameter);

    service.deleteRanker(emptyData, missingParameter);
    service.deleteRanker(emptyClassifier, missingParameter);
    service.deleteRanker(nullClassifier, missingParameter);
    service.deleteRanker(undefinedClassifier, missingParameter);
    service.deleteRanker(emptyDataClassifier, missingParameter);
    service.deleteRanker(nullDataClassifier, missingParameter);

  });

  it('should fail if no data provided create and classify requests', function() {
    service.createRanker(noTrainingData, missingParameter);
    service.createRanker(emptyClassifier, missingParameter);
    service.createRanker(nullData, missingParameter);
    service.createRanker(emptyData, missingParameter);

    service.rank(emptyClassifier, missingParameter);
    service.rank(nullData, missingParameter);
    service.rank(emptyData, missingParameter);
  });

  it('all other good requests should pass', function() {
    service.rankerStatus(goodData, goodRequest);
    service.deleteRanker(goodData, goodRequest);

    service.rankerStatus(goodDataWithClassifierId, goodRequest);
    service.deleteRanker(goodDataWithClassifierId, goodRequest);
    //list doesn't need params
    service.list({}, goodRequest);
    service.list(null, goodRequest);
    service.list(undefined, goodRequest);

    // create classifier with string
    service.createRanker(createWithString, goodRequest);
    service.createRanker(createWithStream, goodRequest);
    service.createRanker(createWithJson, goodRequest);
  });


  it('should fail if training_data is not json, string or stream', function() {
    var params = extend({},noTrainingData);

    params.training_data = null;
    service.createRanker(params, missingParameter);

    params.training_data = 0;
    service.createRanker(params, missingParameter);

    params.training_data = {};
    service.createRanker(params, invalidParameter);
  });

  it('should fail if training_data is not a valid json format', function() {
    var params = extend({}, noTrainingData);

    params.training_data = [{json:'bad'}];
    service.createRanker(params, invalidFormatParameter);
  });

});
