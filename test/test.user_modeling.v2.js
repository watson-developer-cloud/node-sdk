'use strict';

var assert = require('assert');
var watson = require('../lib/index');
var nock = require('nock');

describe('user_modeling', function() {

  var noop = function() {};

  var service_request = {
    text: 'IBM Watson Developer Cloud'
  };

  var payload = {
    contentItems: [{
      userid: 'dummy',
      id: 'dummyUuid',
      sourceid: 'freetext',
      contenttype: 'text/plain',
      language: 'en',
      content: service_request.text
    }]
  };
  var service_response = {
    tree: {}
  };

  var service_path = '/v2/profile';

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v2'
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(service_path, payload)
      .reply(200, service_response);
  });

  after(function() {
    nock.cleanAll();
  });

  var user_modeling = watson.user_modeling(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  it('should check no parameters provided', function() {
    user_modeling.profile({}, missingParameter);
    user_modeling.profile(null, missingParameter);
    user_modeling.profile(undefined, missingParameter);
  });

  it('should generate a valid payload', function() {
    // Different ways to call the service should produce the same result
    var params = [{
      text: service_request.text
    }, payload];
    for (var i = 0; i < params.length; i++) {
      var req = user_modeling.profile(params[i], noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + service_path);
      assert.equal(body, JSON.stringify(payload));
      assert.equal(req.method, 'POST');
    }
  });

  it('should format the response', function(done) {
    user_modeling.profile(service_request, function(err, response) {
      if (err)
        done(err);
      else {
        assert.equal(JSON.stringify(response), JSON.stringify(service_response));
        done();
      }
    });
  });

});