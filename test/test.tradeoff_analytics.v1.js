'use strict';

var assert = require('assert');
var watson = require('../index');
var nock   = require('nock');
var extend = require('extend');

describe('tradeoff_analytics', function() {

  var noop = function() {};

  var service_request = require('./resources/dilemma_problem');
  var events_request = require('./resources/ta_events');

  var service_response = {};

  var service_path = '/v1/dilemmas';
  var service_path_no_viz = '/v1/dilemmas?generate_visualization=false';
  var events_path = '/v1/events';

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
    nock(service.url)
      .persist()
      .post(service_path_no_viz, service_request)
      .reply(200, service_response);
    nock(service.url)
      .persist()
      .post(events_path, events_request)
      .reply(200);

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

    tradeoff_analytics.events({}, missingParameter);
    tradeoff_analytics.events(null, missingParameter);
    tradeoff_analytics.events(undefined, missingParameter);
  });

  it('should generate a valid payload', function() {
    var params = extend({}, service_request);
    params.metadata_header = 'test_header_content';
    var req = tradeoff_analytics.dilemmas(params, noop);
    var body = new Buffer(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path);
    assert.equal(body, JSON.stringify(service_request));
    assert.notEqual(body, JSON.stringify(params));
    assert.equal(req.headers['x-watson-metadata'], params.metadata_header);
    assert.equal(req.method, 'POST');
  });

  it('should append generate_visualization=false query param to url if (and only if) needed', function() {
    // check with generate_visualization = false
    var params = extend({}, service_request);
    params.generate_visualization = false;
    var req = tradeoff_analytics.dilemmas(params, noop);
    assert.equal(req.uri.href, service.url + service_path_no_viz);

    // check with generate_visualization = true
    params = extend({}, service_request);
    params.generate_visualization = true;
    req = tradeoff_analytics.dilemmas(params, noop);
    assert.equal(req.uri.href, service.url + service_path);

    // check with generate_visualization = 'sdfsd' - should be same as 'true'
    params = extend({}, service_request);
    params.generate_visualization = 'sdfsd';
    req = tradeoff_analytics.dilemmas(params, noop);
    assert.equal(req.uri.href, service.url + service_path);

    // check without generate_visualization- should be same as 'true'
    params = extend({}, service_request);
    req = tradeoff_analytics.dilemmas(params, noop);
    assert.equal(req.uri.href, service.url + service_path);
  });


  it('should forward the events correctly', function() {
    var params = extend({}, events_request);
    params.metadata_header = 'test_header_content';
    var req = tradeoff_analytics.events(params, noop);
    var body = new Buffer(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + events_path);
    assert.equal(body, JSON.stringify(events_request));
    assert.notEqual(body, JSON.stringify(params));
    assert.equal(req.headers['x-watson-metadata'], params.metadata_header);
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
