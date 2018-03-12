'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const extend = require('extend');

describe('tone_analyzer.v3', function() {
  const noop = function() {};

  const text = 'IBM Watson Developer Cloud';
  const tone_response = {
    tree: {},
  };

  const tone_path = '/v3/tone';

  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:86',
    version: '2017-09-21',
  };
  const service_es = extend(service, {
    headers: {
      'Accept-Language': 'es',
      'x-custom-header': 'foo',
    },
  });

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(tone_path + '?version=2017-09-21', text)
      .reply(200, tone_response);
  });

  after(function() {
    nock.cleanAll();
  });

  const tone_analyzer = new watson.ToneAnalyzerV3(service);
  const tone_analyzer_es = new watson.ToneAnalyzerV3(service_es);

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
    const options = { tone_input: text, content_type: 'text/plain' };
    const req = tone_analyzer.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + tone_path + '?version=2017-09-21');
    assert.equal(body, text);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-Type'], 'text/plain');
    assert.equal(req.headers['Accept'], 'application/json');
  });

  it('tone API should add optional query parameters', function() {
    const options = {
      tone_input: text,
      content_type: 'text/plain',
      sentences: true,
    };
    const req = tone_analyzer.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + tone_path + '?version=2017-09-21&sentences=true');
    assert.equal(body, text);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-Type'], 'text/plain');
    assert.equal(req.headers['Accept'], 'application/json');
  });

  it('tone API should add optional language parameters', function() {
    const options = {
      tone_input: text,
      content_type: 'text/plain',
      sentences: true,
      content_language: 'en',
      accept_language: 'en',
    };
    const req = tone_analyzer.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + tone_path + '?version=2017-09-21&sentences=true');
    assert.equal(body, text);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-Type'], 'text/plain');
    assert.equal(req.headers['Accept'], 'application/json');
    assert.equal(req.headers['Content-Language'], 'en');
    assert.equal(req.headers['Accept-Language'], 'en');
  });

  it('tone API should set HTML content-type', function() {
    const options = { tone_input: text, content_type: 'text/html' };
    const req = tone_analyzer.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + tone_path + '?version=2017-09-21');
    assert.equal(body, text);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-Type'], 'text/html');
    assert.equal(req.headers['Accept'], 'application/json');
  });

  it('tone API should format the response', function(done) {
    const options = { tone_input: text, content_type: 'text/plain' };
    tone_analyzer.tone(options, function(err, response) {
      if (err) {
        done(err);
      } else {
        assert.equal(JSON.stringify(response), JSON.stringify(tone_response));
        done();
      }
    });
  });

  it('tone API should honor headers passed by client', function() {
    const options = { tone_input: text, content_type: 'text/html' };
    const req = tone_analyzer_es.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    assert.equal(req.uri.href, service.url + tone_path + '?version=2017-09-21');
    assert.equal(body, text);
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-Type'], 'text/html');
    assert.equal(req.headers['Accept'], 'application/json');
    assert.equal(req.headers['x-custom-header'], 'foo');
    assert.equal(req.headers['Accept-Language'], 'es');
  });

  const tone_chat_path = '/v3/tone_chat';

  // Tone Chat Endpoint API - test for valid payload
  it('tone-chat API endpoint should generate a valid payload with utterances json payload', function(done) {
    const tone_chat_request = {
      utterances: [
        { text: 'My charger isn’t working.', user: 'customer' },
        {
          text: 'Thanks for reaching out. Can you give me some more detail about the issue?',
          user: 'agent',
        },
        {
          text:
            "I put my charger in my phone last night to charge and it isn't working. Which is ridiculous, it's a new charger, I bought it yesterday.",
          user: 'customer',
        },
        {
          text: 'I’m sorry you’re having issues with charging. What kind of charger do you have?',
          user: 'agent',
        },
      ],
    };
    const tone_chat_response = {
      tree: {},
    };

    const expectation = nock(service.url)
      .post('/v3/tone_chat' + '?version=2017-09-21', tone_chat_request)
      .reply(200, tone_chat_response);

    // run tests
    const req = tone_analyzer.toneChat(tone_chat_request, function(err, res) {
      assert(req);
      const url = service.url + tone_chat_path;
      assert.equal(req.uri.href.slice(0, url.length), url);
      assert.equal(req.uri.href, service.url + tone_chat_path + '?version=2017-09-21');
      assert.equal(req.method, 'POST');
      assert.equal(req.headers['Content-Type'], 'application/json');
      assert.equal(req.headers['Accept'], 'application/json');
      assert.ifError(err);
      assert(expectation.isDone());
      done();
    });
  });

  it('tone-chat API should add optional language parameters', function() {
    const options = {
      utterances: [{ text: 'My charger isn’t working.', user: 'customer' }],
      content_language: 'en',
      accept_language: 'en',
    };
    const req = tone_analyzer.tone_chat(options, noop);
    assert.equal(req.uri.href, service.url + tone_chat_path + '?version=2017-09-21');
    assert.equal(req.method, 'POST');
    assert.equal(req.headers['Content-Type'], 'application/json');
    assert.equal(req.headers['Accept'], 'application/json');
    assert.equal(req.headers['Content-Language'], 'en');
    assert.equal(req.headers['Accept-Language'], 'en');
  });
});
