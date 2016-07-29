'use strict';

var assert = require('assert');
var watson = require('../index');
var nock   = require('nock');
var extend = require('extend');

describe('personality_insights', function() {

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
      .reply(200, service_response)
      .post(service_path + '?include_raw=true', payload)
      .reply(200, service_response)
      .post(service_path, '"'+ service_request.text + '"')
      .reply(200, service_response);
  });

  after(function() {
    nock.cleanAll();
  });

  var personality_insights = watson.personality_insights(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  it('should check no parameters provided', function() {
    personality_insights.profile({}, missingParameter);
    personality_insights.profile(null, missingParameter);
    personality_insights.profile(undefined, missingParameter);
  });

  it('should generate a valid payload with text', function() {
      var req = personality_insights.profile(service_request, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + service_path);
      assert.equal(body, '"' + service_request.text + '"');
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['Content-type'], 'text/plain');
  });

  it('should generate a valid payload with contentItems', function() {
      var req = personality_insights.profile(payload, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + service_path);
      assert.equal(body, JSON.stringify(payload));
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['Content-language'], undefined); // service bug: content-language header overrides the language specified in JSON for each content item, so it must not be set
      assert.equal(req.headers['Content-type'], 'application/json');
  });

  it('should generate a valid payload with content_items', function() {
      var payload_with_content_items = { content_items: payload.contentItems};
      var req = personality_insights.profile(payload_with_content_items, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + service_path);
      assert.equal(body, JSON.stringify(payload));
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['Content-language'], undefined); // service bug: content-language header overrides the language specified in JSON for each content item, so it must not be set
      assert.equal(req.headers['Content-type'], 'application/json');
  });

  it('should generate a valid payload with html', function() {
      var html_req = { text:'<div>test</div>' };
      var req = personality_insights.profile(html_req, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + service_path);
      assert.equal(body, JSON.stringify(html_req.text));
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['Content-type'], 'text/html');
  });

  it('should generate a valid payload with include_raw, language and accept_language', function() {
    var params = extend({ language: 'es', accept_language: 'es', include_raw: true}, payload);

      var req = personality_insights.profile(params, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + service_path + '?include_raw=true');
      assert.equal(body, JSON.stringify(payload));
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['Content-type'], 'application/json');
      assert.equal(req.headers['Content-language'], 'es');
      assert.equal(req.headers['Accept-language'], 'es');
  });

  it('should generate a valid request with {csv: true}', function() {
    var params = extend({ csv: true}, payload);
    var req = personality_insights.profile(params, noop);
    var body = new Buffer(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path);
    assert.equal(body, JSON.stringify(payload));
    assert.equal(req.headers['Accept'], 'text/csv');
  });

  it('should generate a valid request with {csv: true, csv_headers: true}', function() {
    var params = extend({ csv: true, csv_headers: true}, payload);
    var req = personality_insights.profile(params, noop);
    var body = new Buffer(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + service_path + '?headers=true');
    assert.equal(body, JSON.stringify(payload));
    assert.equal(req.headers['Accept'], 'text/csv');
  });

  it('should format the response', function(done) {
    personality_insights.profile(service_request, function(err, response) {
      if (err)
        done(err);
      else {
        assert.equal(JSON.stringify(response), JSON.stringify(service_response));
        done();
      }
    });
  });

});
