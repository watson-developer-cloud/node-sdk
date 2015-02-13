'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock = require('nock');

describe('message_resonance', function() {
  // Test params
  var service_request = {
    dataset: 1,
    text: 'X X X'
  };
  var service_response = {
    text: 'X X X',
    dataset: 1,
    resonances: [{
      word: 'X',
      word_offset: 0
    }, {
      word: 'X',
      word_offset: 2
    }, {
      word: 'X',
      word_offset: 2
    }]
  };
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };
  var ringscore_path = '/v1/ringscore';
  var datasets_path = '/v1/datasets';

  var mock_word_resonance = {
    word: 'X'
  };
  var mock_datasets = [{
    id: 1,
    name: 'cloud'
  }];

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .get(ringscore_path + '?text=X&dataset=1')
      .reply(200, mock_word_resonance)
      .get(datasets_path)
      .reply(200, mock_datasets);
  });

  after(function() {
    nock.cleanAll();
  });

  var message_resonance = watson.message_resonance(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  it('should check for missing text', function() {
    var params = {
      dataset: service_request.dataset
    };
    message_resonance.resonance(params, missingParameter);
  });

  it('should check for missing dataset', function() {
    var params = {
      text: service_request.text
    };
    message_resonance.resonance(params, missingParameter);
  });

  it('should check no parameters provided', function() {
    message_resonance.resonance({}, missingParameter);
    message_resonance.resonance(null, missingParameter);
    message_resonance.resonance(undefined, missingParameter);
  });

  it('/datasets: should generate a valid payload', function() {
    var checkDatasets = function(err, res) {
      assert.equal(JSON.stringify(res), JSON.stringify(mock_datasets));
    };

    message_resonance.datasets({}, checkDatasets);
    message_resonance.datasets(null, checkDatasets);
    message_resonance.datasets(undefined, checkDatasets);
  });

  it('should format the response', function(done) {
    message_resonance.resonance(service_request, function(err, response) {
      if (err)
        done(err);
      else {
        assert.equal(JSON.stringify(response), JSON.stringify(service_response));
        done();
      }
    });
  });

});