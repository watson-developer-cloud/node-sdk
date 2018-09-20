'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');

// Test params
const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'http://ibm.com:80',
  version: '2018-09-19',
};

const noop = function() {};

const missingParameter = function(err) {
  assert.ok(err instanceof Error && /required parameters/.test(err));
};

const assistant = new watson.AssistantV2(service);

describe('assistant v2 unit tests', function() {
  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post('*')
      .reply(200, {});
  });

  after(function() {
    nock.cleanAll();
  });

  describe('createSession tests', function() {
    const params = { assistant_id: 'robin123' };
    it('should generate a valid payload', function() {
      const req = assistant.createSession(params, noop);
      assert.equal(
        req.uri.href,
        service.url + '/v2/assistants/robin123/sessions?version=2018-09-19'
      );
      assert.equal(req.method, 'POST');
      assert.equal(req.headers.Accept, 'application/json');
      assert.equal(req.headers['Content-Type'], 'application/json');
    });

    it('should check no parameters provided (negative test)', function() {
      assistant.createSession({}, missingParameter);
      assistant.createSession(null, missingParameter);
      assistant.createSession(undefined, missingParameter);
    });
  });

  describe('message tests', function() {
    const params = { assistant_id: 'robin123', session_id: 'abc123' };
    it('should generate a valid payload', function() {
      const req = assistant.message(params, noop);
      assert.equal(
        req.uri.href,
        service.url + '/v2/assistants/robin123/sessions/abc123/message?version=2018-09-19'
      );
      assert.equal(req.method, 'POST');
      assert.equal(req.headers.Accept, 'application/json');
      assert.equal(req.headers['Content-Type'], 'application/json');
    });

    it('should check no parameters provided (negative test)', function() {
      assistant.message({}, missingParameter);
      assistant.message(null, missingParameter);
      assistant.message(undefined, missingParameter);
      assistant.message({ assistant_id: 'a' }, missingParameter);
      assistant.message({ session_id: 'a' }, missingParameter);
    });
  });

  describe('deleteSession tests', function() {
    const params = { assistant_id: 'robin123', session_id: 'abc123' };
    it('should generate a valid payload', function() {
      const req = assistant.deleteSession(params, noop);
      assert.equal(
        req.uri.href,
        service.url + '/v2/assistants/robin123/sessions/abc123?version=2018-09-19'
      );
      assert.equal(req.method, 'DELETE');
      assert.equal(req.headers.Accept, 'application/json');
    });

    it('should check no parameters provided (negative test)', function() {
      assistant.deleteSession({}, missingParameter);
      assistant.deleteSession(null, missingParameter);
      assistant.deleteSession(undefined, missingParameter);
      assistant.deleteSession({ assistant_id: 'a' }, missingParameter);
      assistant.deleteSession({ session_id: 'a' }, missingParameter);
    });
  });
});
