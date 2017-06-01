'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const extend = require('extend');

describe('tone_analyzer.v3', function() {
  const noop = function() {};

  const tone_request = {
    text: 'IBM Watson Developer Cloud'
  };
  const tone_response = {
    tree: {}
  };

  const tone_path = '/v3/tone';

  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:86',
    version: 'v3',
    version_date: '2016-05-19'
  };
  const service_es = extend(service, {
    headers: {
      'accept-language': 'es',
      'x-custom-header': 'foo'
    }
  });

  before(function() {
    nock.disableNetConnect();
    nock(service.url).persist().post(tone_path + '?version=2016-05-19', tone_request.text).reply(200, tone_response);
  });

  after(function() {
    nock.cleanAll();
  });

  const tone_analyzer = watson.tone_analyzer(service);
  const tone_analyzer_es = watson.tone_analyzer(service_es);

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  // Tone API
  it('tone API should check no parameters provided', function() {
    tone_analyzer.tone({}, missingParameter);
    tone_analyzer.tone(null, missingParameter);
    tone_analyzer.tone(undefined, missingParameter);
  });

  it('tone API should generate a valid payload with text', function() {
    const req = tone_analyzer.tone(tone_request, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + tone_path + '?version=2016-05-19');
    assert.equal(body, tone_request.text);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['content-type'], 'text/plain');
    assert.equal(req.headers['accept'], 'application/json');
  });

  it('tone API should add optional query parameters', function() {
    const options = {
      text: tone_request.text,
      tones: 'emotion',
      sentences: true,
      language: 'en'
    };
    const req = tone_analyzer.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + tone_path + '?version=2016-05-19&tones=emotion&sentences=true');
    assert.equal(body, tone_request.text);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['content-type'], 'text/plain');
    assert.equal(req.headers['accept'], 'application/json');
  });

  it('tone API should set HTML content-type', function() {
    const options = { text: tone_request.text, isHTML: true };
    const req = tone_analyzer.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + tone_path + '?version=2016-05-19');
    assert.equal(body, tone_request.text);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['content-type'], 'text/html');
    assert.equal(req.headers['accept'], 'application/json');
  });

  it('tone API should format the response', function(done) {
    tone_analyzer.tone(tone_request, function(err, response) {
      if (err) {
        done(err);
      } else {
        assert.equal(JSON.stringify(response), JSON.stringify(tone_response));
        done();
      }
    });
  });

  it('tone API should honor headers passed by client', function() {
    const options = { text: tone_request.text, isHTML: true };
    const req = tone_analyzer_es.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + tone_path + '?version=2016-05-19');
    assert.equal(body, tone_request.text);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['content-type'], 'text/html');
    assert.equal(req.headers['accept'], 'application/json');
    assert.equal(req.headers['x-custom-header'], 'foo');
    assert.equal(req.headers['accept-language'], 'es');
  });
});
