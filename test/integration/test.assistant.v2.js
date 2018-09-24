'use strict';

const nock = require('nock');
const watson = require('../../index');
const assert = require('assert');
const authHelper = require('./auth_helper.js');

const auth = authHelper.auth.assistant;
auth.version = '2018-09-19';

describe('assistant v2 integration', function() {
  const assistant = new watson.AssistantV2(auth);
  const assistant_id = auth.assistant_id;
  let session_id;

  before(function() {
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  it('should createSession', function(done) {
    const params = {
      assistant_id,
    };
    assistant.createSession(params, function(err, res) {
      assert.ifError(err);
      assert(res.session_id);
      session_id = res.session_id;
      done();
    });
  });

  it('should message - generic', function(done) {
    const params = {
      assistant_id,
      session_id,
    };
    assistant.message(params, function(err, res) {
      assert.ifError(err);
      assert(res.output);
      assert(Array.isArray(res.output.generic));
      assert.equal(res.output.generic[0].response_type, 'text');
      assert(res.output.generic[0].text);
      assert(Array.isArray(res.output.intents));
      assert(Array.isArray(res.output.entities));
      assert.equal(res.output.intents.length, 0);
      assert.equal(res.output.entities.length, 0);
      done();
    });
  });

  it('should message - non-generic', function(done) {
    const input = {
      text: 'please tell me a joke',
    };
    const params = {
      assistant_id,
      session_id,
      input,
    };
    assistant.message(params, function(err, res) {
      assert.ifError(err);
      assert(res.output);
      assert(Array.isArray(res.output.generic));
      assert.equal(res.output.generic[0].response_type, 'text');
      assert(res.output.generic[0].text);
      assert(Array.isArray(res.output.intents));
      assert(Array.isArray(res.output.entities));
      done();
    });
  });

  it('should deleteSession', function(done) {
    const params = {
      assistant_id: auth.assistant_id,
      session_id,
    };
    assistant.deleteSession(params, function(err, res) {
      assert.ifError(err);
      done();
    });
  });
});
