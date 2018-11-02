'use strict';

const watson = require('../../index');
const nock = require('nock');
const extend = require('extend');

describe('tone_analyzer.v3', function() {
  const noop = function() {};

  const tone_request = {
    text: 'IBM Watson Developer Cloud',
  };
  const tone_response = {
    tree: {},
  };

  const tone_path = '/v3/tone';

  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:86',
    version: 'v3',
    version_date: '2016-05-19',
  };
  const service_es = extend(service, {
    headers: {
      'Accept-Language': 'es',
      'x-custom-header': 'foo',
    },
  });

  beforeAll(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(tone_path + '?version=2016-05-19', tone_request.text)
      .reply(200, tone_response);
  });

  afterAll(function() {
    nock.cleanAll();
  });

  const tone_analyzer = watson.tone_analyzer(service);
  const tone_analyzer_es = watson.tone_analyzer(service_es);

  const missingParameter = function(err) {
    expect(err).toBeInstanceOf(Error);
    expect(/required parameters/.test(err)).toBe(true);
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
    expect(req.uri.href).toBe(service.url + tone_path + '?version=2016-05-19');
    expect(body).toBe(tone_request.text);
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Type']).toBe('text/plain');
    expect(req.headers['Accept']).toBe('application/json');
  });

  it('tone API should add optional query parameters', function() {
    const options = {
      text: tone_request.text,
      tones: 'emotion',
      sentences: true,
    };
    const req = tone_analyzer.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(
      service.url + tone_path + '?version=2016-05-19&sentences=true&tones=emotion'
    );
    expect(body).toBe(tone_request.text);
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Type']).toBe('text/plain');
    expect(req.headers['Accept']).toBe('application/json');
  });

  it('tone API should add optional language parameter', function() {
    const options = {
      text: tone_request.text,
      tones: 'emotion',
      sentences: true,
      language: 'en',
    };
    const req = tone_analyzer.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(
      service.url + tone_path + '?version=2016-05-19&sentences=true&tones=emotion'
    );
    expect(body).toBe(tone_request.text);
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Type']).toBe('text/plain');
    expect(req.headers['Accept']).toBe('application/json');
    expect(req.headers['Content-Language']).toBe('en');
  });

  it('tone API should set HTML content-type', function() {
    const options = { text: tone_request.text, isHTML: true };
    const req = tone_analyzer.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(service.url + tone_path + '?version=2016-05-19');
    expect(body).toBe(tone_request.text);
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Type']).toBe('text/html');
    expect(req.headers['Accept']).toBe('application/json');
  });

  it('tone API should format the response', function(done) {
    tone_analyzer.tone(tone_request, function(err, response) {
      if (err) {
        done(err);
      } else {
        expect(JSON.stringify(response)).toBe(JSON.stringify(tone_response));
        done();
      }
    });
  });

  it('tone API should honor headers passed by client', function() {
    const options = { text: tone_request.text, isHTML: true };
    const req = tone_analyzer_es.tone(options, noop);
    const body = Buffer.from(req.body).toString('ascii');
    expect(req.uri.href).toBe(service.url + tone_path + '?version=2016-05-19');
    expect(body).toBe(tone_request.text);
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Type']).toBe('text/html');
    expect(req.headers['Accept']).toBe('application/json');
    expect(req.headers['x-custom-header']).toBe('foo');
    expect(req.headers['Accept-Language']).toBe('es');
  });

  // Tone Chat Endpoint API - test for valid payload
  it('tone-chat API endpoint should generate a valid payload with utterances json payload', function(done) {
    const tone_chat_path = '/v3/tone_chat';
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
      .post('/v3/tone_chat' + '?version=2016-05-19', tone_chat_request)
      .reply(200, tone_chat_response);

    // run tests
    const req = tone_analyzer.tone_chat(tone_chat_request, function(err, res) {
      expect(req).toBeTruthy();
      const url = service.url + tone_chat_path;
      expect(req.uri.href.slice(0, url.length)).toBe(url);
      expect(req.uri.href).toBe(service.url + tone_chat_path + '?version=2016-05-19');
      expect(req.method).toBe('POST');
      expect(req.headers['Content-Type']).toBe('application/json');
      expect(req.headers['Accept']).toBe('application/json');
      expect(err).toBeNull();
      expect(expectation.isDone()).toBe(true);
      done();
    });
  });
});
