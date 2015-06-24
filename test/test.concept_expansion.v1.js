'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock   = require('nock');

describe('concept_expansion', function() {
  // Test params
  var payload = {
    seeds: ['motrin', 'tylenol', 'aspirin'],
    dataset: 'mtsamples',
    label: 'medicaments'
  };
  var service_response = {
    return_seeds: [{
      prevalence: 1,
      result: 'zZzStarzZz'
    }, {
      prevalence: 2,
      result: 'zZzPluszZz'
    }]
  };
  var wrapper_response = {
    return_seeds: [{
      prevalence: 1,
      result: '*'
    }, {
      prevalence: 2,
      result: '+'
    }]
  };
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };

  before(function() {
    nock.disableNetConnect();
    // Create Job
    nock(service.url)
      .persist()
      .post('/v1/upload', payload)
      .reply(200, {
        jobid: '2014'
      })
      // Get status
      .get('/v1/status?jobid=2014')
      .reply(200, {
        state: 'D'
      })
      .put('/v1/result', {
        jobid: '2014'
      })
      .reply(200, service_response);
  });

  after(function() {
    nock.cleanAll();
  });

  var concept_expansion = watson.concept_expansion(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  it('should check for missing seeds', function() {
    var params = {
      dataset: payload.dataset,
      label: payload.label
    };
    concept_expansion.expand(params, missingParameter);
  });

  it('should check for missing dataset', function() {
    var params = {
      seeds: payload.seeds,
      label: payload.label
    };
    concept_expansion.expand(params, missingParameter);
  });
  it('should check for missing label', function() {
    var params = {
      seeds: payload.seeds,
      dataset: payload.dataset
    };
    concept_expansion.expand(params, missingParameter);
  });

  it('should check no parameters provided', function() {
    concept_expansion.expand({}, missingParameter);
    concept_expansion.expand(null, missingParameter);
    concept_expansion.expand(undefined, missingParameter);
  });

  it('should format the response', function(done) {
    concept_expansion.expand(payload, function(err, response) {
      if (err)
        done(err);
      else {
        assert.equal(JSON.stringify(response), JSON.stringify(wrapper_response));
        done();
      }
    });
  });

});
