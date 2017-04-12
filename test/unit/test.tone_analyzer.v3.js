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

  const tone_chat_request = {
    utterances: [
      { text: 'My charger isn’t working.', user: 'customer' },
      { text: 'Thanks for reaching out. Can you give me some more detail about the issue?', user: 'agent' },
      {
        text: "I put my charger in my phone last night to charge and it isn't working. Which is ridiculous, it's a new charger, I bought it yesterday.",
        user: 'customer'
      },
      { text: 'I’m sorry you’re having issues with charging. What kind of charger do you have?', user: 'agent' }
    ]
  };

  const tone_path = '/v3/tone';
  const tone_chat_path = '/v3/tone_chat';

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

  // Tone Chat Endpoint API
  it('tone chat API should check no parameters provided', function() {
    tone_analyzer.tone_chat({}, missingParameter);
    tone_analyzer.tone_chat(null, missingParameter);
    tone_analyzer.tone_chat(undefined, missingParameter);
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

  it('tone-chat API endpoint should generate a valid payload with utterances json payload', function() {
    const req = tone_analyzer.tone_chat(tone_chat_request, noop);
    const body = req.body;
    assert.equal(req.uri.href, service.url + tone_chat_path + '?version=2016-05-19');
    assert.equal(body, tone_chat_request.utterances);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['content-type'], 'application/json');
    assert.equal(req.headers['accept'], 'application/json');
  });

  it('tone API should add optional query parameters', function() {
    const options = {
      text: tone_request.text,
      tones: 'emotion',
      sentences: true
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
