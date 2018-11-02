/**
 * @jest-environment node
 */

// the above comment instructs jest to use a node, rather than browser, environment
// the sendRequest method uses the environment to determine if running in the browser
// and uses special handling if it is. the tests will fail without the above comment

'use strict';

const sendRequest = require('../../lib/requestwrapper').sendRequest;
const formatError = require('../../lib/requestwrapper').formatErrorIfExists;
const isStream = require('isstream');
const watson = require('../../index');
const pjson = require('../../package.json');

describe('requestwrapper', () => {
  const noop = function() {};
  it('should emit error stream on missing parameters when callback is undefined', done => {
    const parameters = {
      options: {
        url: '/stuff/',
        qs: { fake: 'fake' },
      },
      requiredParams: ['fake_param'],
      defaultOptions: { url: 'more' },
    };
    const stream = sendRequest(parameters);
    stream.on('error', err => {
      expect(isStream(stream)).toBe(true);
      expect(err.toString().includes('Missing required parameters: fake_param')).toBe(true);
      done();
    });
  });

  it('header should be accurate', () => {
    const service = {
      username: 'batman',
      password: 'bruce-wayne',
      url: 'http://ibm.com:80',
      version: '2017-05-26',
    };
    const service2 = {
      username: 'batman',
      password: 'bruce-wayne',
      url: 'http://ibm.com:80',
      version: '2017-05-26',
      headers: {
        'User-Agent': 'openwhisk',
      },
    };
    const assistant = new watson.AssistantV1(service);
    const assistant_ow = new watson.AssistantV1(service2);
    const payload = {
      workspace_id: 'workspace1',
    };
    const req = assistant.listIntents(payload, noop);
    const req2 = assistant_ow.listIntents(payload, noop);
    expect(req.headers['User-Agent']).toBe('watson-developer-cloud-nodejs-' + pjson.version + ';');
    expect(req2.headers['User-Agent']).toBe(
      'watson-developer-cloud-nodejs-' + pjson.version + ';' + 'openwhisk'
    );
  });
});

describe('formatError', () => {
  it('should check for error in response', () => {
    const _error = undefined;
    const _response = { statusCode: 401 };
    const _body = 'fake body';
    const cb = (err, body, res) => {
      expect(body).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Unauthorized: Access is denied due to invalid credentials.');
    };
    const formatted = formatError(cb);
    formatted(_error, _response, _body);
  });

  it('should check for error in body with error_code', () => {
    const _error = undefined;
    const _response = {};
    const _body = { error_code: '555', fake_key: 'fake_value' };
    const cb = (err, body, res) => {
      expect(body).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err.code).toBe(_body.error_code);
      expect(err.fake_key).toBe(_body.fake_key);
    };
    const formatted = formatError(cb);
    formatted(_error, _response, _body);
  });

  it('should check for error in body with error', () => {
    const _error = undefined;
    const _response = {};
    const _body = {
      error: { description: 'fake description' },
      fake_key: 'fake_value',
    };
    const cb = (err, body, res) => {
      expect(body).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err.description).toBe('fake description');
      expect(err.fake_key).toBe('fake_value');
    };
    const formatted = formatError(cb);
    formatted(_error, _response, _body);
  });

  it('should check for error in body with error.error', () => {
    const _error = undefined;
    const _response = {};
    const _body = {
      error: { error: { error: 'fake description' } },
      fake_key: 'fake_value',
    };
    const cb = (err, body, res) => {
      expect(body).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err.error).toBe(JSON.stringify({ error: 'fake description' }));
      expect(err.fake_key).toBe('fake_value');
    };
    const formatted = formatError(cb);
    formatted(_error, _response, _body);
  });

  it('should check for error if its not null', () => {
    const _error = { message: 'fake error' };
    const _response = {};
    const _body = {};
    const cb = (err, body, res) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe(_error.message);
    };
    const formatted = formatError(cb);
    formatted(_error, _response, _body);
  });

  it('should format error for invalid api keys', () => {
    const _error = undefined;
    const _response = { statusMessage: 'invalid-api-key' };
    const _body = {};
    const cb = (err, body, res) => {
      expect(err.error).toBe(_response.statusMessage);
      expect(err.code).toBe(401);
    };
    const formatted = formatError(cb);
    formatted(_error, _response, _body);
  });
});
