'use strict';

const sendRequest = require('../../lib/requestwrapper').sendRequest;
const formatError = require('../../lib/requestwrapper').formatErrorIfExists;
const assert = require('assert');
const isStream = require('isstream');
const watson = require('../../index');
const pjson = require('../../package.json');

describe('requestwrapper', () => {
  const noop = function() {};
  it('should emit error stream on missing parameters when callback is undefined', () => {
    const parameters = {
      options: {
        url: '/stuff/',
        qs: { fake: 'fake' },
      },
      requiredParams: ['fake_param'],
      defaultOptions: { url: 'more' },
    };
    assert(isStream(sendRequest(parameters, '')));
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
    const conversation = new watson.ConversationV1(service);
    const conversation_ow = new watson.ConversationV1(service2);
    const payload = {
      workspace_id: 'workspace1',
    };
    const req = conversation.getIntents(payload, noop);
    const req2 = conversation_ow.getIntents(payload, noop);
    assert.equal(req.headers['User-Agent'], 'watson-developer-cloud-nodejs-' + pjson.version + ';');
    assert.equal(
      req2.headers['User-Agent'],
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
      assert.equal(body, null);
      assert(err instanceof Error);
      assert.equal(err.message, 'Unauthorized: Access is denied due to invalid credentials.');
    };
    const formatted = formatError(cb);
    formatted(_error, _response, _body);
  });

  it('should check for error in body with error_code', () => {
    const _error = undefined;
    const _response = {};
    const _body = { error_code: '666', fake_key: 'fake_value' };
    const cb = (err, body, res) => {
      assert.equal(body, null);
      assert(err instanceof Error);
      assert.equal(err.code, _body.error_code);
      assert.equal(err.fake_key, _body.fake_key);
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
      assert.equal(body, null);
      assert(err instanceof Error);
      assert.equal(err.description, 'fake description');
      assert.equal(err.fake_key, 'fake_value');
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
      assert.equal(body, null);
      assert(err instanceof Error);
      assert.equal(err.error, JSON.stringify({ error: 'fake description' }));
      assert.equal(err.fake_key, 'fake_value');
    };
    const formatted = formatError(cb);
    formatted(_error, _response, _body);
  });

  it('should check for error if its not null', () => {
    const _error = { message: 'fake error' };
    const _response = {};
    const _body = {};
    const cb = (err, body, res) => {
      assert(err instanceof Error);
      assert.equal(err.message, _error.message);
    };
    const formatted = formatError(cb);
    formatted(_error, _response, _body);
  });

  it('should format error for invalid api keys', () => {
    const _error = undefined;
    const _response = { statusMessage: 'invalid-api-key' };
    const _body = {};
    const cb = (err, body, res) => {
      assert.equal(err.error, _response.statusMessage);
      assert.equal(err.code, 401);
    };
    const formatted = formatError(cb);
    formatted(_error, _response, _body);
  });
});
