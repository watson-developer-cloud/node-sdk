'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock = require('nock');

describe('tradeoff_analytics', function() {

  var noop = function() {};

  var service_request = require('./resources/dilemma_problem');

  var service_response = {};

  var service_path = '/v1/dilemmas';

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(service_path, service_request)
      .reply(200, service_response);
  });

  after(function() {
    nock.cleanAll();
  });

  var tradeoff_analytics = watson.tradeoff_analytics(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  it('should check no parameters provided', function() {
    tradeoff_analytics.dilemmas({}, missingParameter);
    tradeoff_analytics.dilemmas(null, missingParameter);
    tradeoff_analytics.dilemmas(undefined, missingParameter);
  });

  it('should generate a valid payload', function() {
      var req = tradeoff_analytics.dilemmas(service_request, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + service_path);
      assert.equal(body, JSON.stringify(service_request));
      assert.equal(req.method, 'POST');
  });

  it('should format the response', function(done) {
    tradeoff_analytics.dilemmas(service_request, function(err, response) {
      if (err)
        done(err);
      else {
        assert.equal(JSON.stringify(response), JSON.stringify(service_response));
        done();
      }
    });
  });

});