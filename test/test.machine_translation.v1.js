'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var qs     = require('querystring');
var nock   = require('nock');

describe('machine_translation', function() {
  // Test params
  var payload = {
    text: 'Messi is the best',
    from: 'enus',
    to: 'eses'
  };
  var service_path = '/v1/smt/0';
  var service_request = {
    sid: 'mt-enus-eses',
    rt: 'text',
    txt: payload.text
  };
  var service_response = 'Messi es el mejor';

  var wrapper_response = {
    translation: service_response
  };

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };

  var noop = function() {};

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  var machine_translation = watson.machine_translation(service);

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(service_path, qs.stringify(service_request))
      .reply(200, service_response);
  });

  after(function() {
    nock.cleanAll();
  });

  it('should check for missing text', function() {
    var params = {
      from: 'enus',
      to: 'eses'
    };
    machine_translation.translate(params, missingParameter);
  });

  it('should check for missing "from"', function() {
    var params = {
      to: 'eses',
      text: 'Messi'
    };
    machine_translation.translate(params, missingParameter);
  });

  it('should check for missing "to"', function() {
    var params = {
      from: 'enus',
      text: 'Messi'
    };
    machine_translation.translate(params, missingParameter);
  });

  it('should check no parameters provided', function() {
    machine_translation.translate({}, missingParameter);
    machine_translation.translate(null, missingParameter);
    machine_translation.translate(undefined, missingParameter);
  });

  it('should generate a valid payload', function() {
    var req = machine_translation.translate(payload, noop);
    var body = new Buffer(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path);
    assert.equal(body, qs.stringify(service_request));
    assert.equal(req.method, 'POST');
  });

  it('should work with sid and text', function() {
    var params = {
      sid: 'mt-enus-eses',
      text: payload.text
    };
    var req = machine_translation.translate(params, noop);
    var body = new Buffer(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path);
    assert.equal(body, qs.stringify(service_request));

  });

  it('should format the response', function(done) {
    machine_translation.translate(payload, function(err, response) {
      if (err)
        done(err);
      else {
        assert.equal(
          JSON.stringify(response),
          JSON.stringify(wrapper_response));
        done();
      }
    });
  });

});