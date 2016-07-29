'use strict';

var assert = require('assert');
var watson = require('../index');
var nock   = require('nock');
var extend = require('extend');

describe('tone_analyzer.v3', function() {

  var noop = function() {};

  var tone_request = {
    text: 'IBM Watson Developer Cloud'
  };
    var tone_response = {
    tree: {}
  };

  var tone_path = '/v3/tone';

  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:86',
    version: 'v3',
    version_date: '2016-05-19'
  };
  var service_es = extend(service, {
    headers: {
      'accept-language': 'es',
      'x-custom-header': 'foo'
    }
  });

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(tone_path + '?version=2016-05-19', tone_request.text)
      .reply(200, tone_response);
  });

  after(function() {
    nock.cleanAll();
  });

  var tone_analyzer = watson.tone_analyzer(service);
  var tone_analyzer_es = watson.tone_analyzer(service_es);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  // Tone API
  it('tone API should check no parameters provided', function() {
    tone_analyzer.tone({}, missingParameter);
    tone_analyzer.tone(null, missingParameter);
    tone_analyzer.tone(undefined, missingParameter);
  });

  it('tone API should generate a valid payload with text', function() {
      var req = tone_analyzer.tone(tone_request, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + tone_path + '?version=2016-05-19');
      assert.equal(body, tone_request.text);
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['content-type'], 'text/plain');
      assert.equal(req.headers['accept'], 'application/json');
  });

  it('tone API should add optional query parameters', function() {
      var options = {text: tone_request.text, tones: 'emotion', sentences: true};
      var req = tone_analyzer.tone(options, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + tone_path + '?version=2016-05-19&tones=emotion&sentences=true');
      assert.equal(body, tone_request.text);
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['content-type'], 'text/plain');
      assert.equal(req.headers['accept'], 'application/json');
  });

  it('tone API should set HTML content-type', function() {
      var options = {text: tone_request.text, isHTML: true};
      var req = tone_analyzer.tone(options, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + tone_path + '?version=2016-05-19');
      assert.equal(body, tone_request.text);
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['content-type'], 'text/html');
      assert.equal(req.headers['accept'], 'application/json');
  });

  it('tone API should format the response', function(done) {
    tone_analyzer.tone(tone_request, function(err, response) {
      if (err)
        done(err);
      else {
        assert.equal(JSON.stringify(response), JSON.stringify(tone_response));
        done();
      }
    });
  });

  it('tone API should honor headers passed by client', function() {
      var options = {text: tone_request.text, isHTML: true };
      var req = tone_analyzer_es.tone(options, noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + tone_path + '?version=2016-05-19');
      assert.equal(body, tone_request.text);
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['content-type'], 'text/html');
      assert.equal(req.headers['accept'], 'application/json');
      assert.equal(req.headers['x-custom-header'], 'foo');
      assert.equal(req.headers['accept-language'], 'es');
  });

});
