'use strict';

const watson = require('../../index');
const authHelper = require('../resources/auth_helper.js');

const auth = authHelper.auth.assistant;
auth.version = '2018-09-19';

describe('assistant v2 integration', function() {
  const assistant = new watson.AssistantV2(auth);
  const assistant_id = auth.assistant_id;
  let session_id;

  it('should createSession', function(done) {
    const params = {
      assistant_id,
    };
    assistant.createSession(params, function(err, res) {
      expect(err).toBeNull();
      expect(res.session_id).toBeDefined();
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
      expect(err).toBeNull();
      expect(res.output).toBeDefined();
      expect(Array.isArray(res.output.generic)).toBe(true);
      expect(res.output.generic[0].response_type).toBe('text');
      expect(res.output.generic[0].text).toBeDefined();
      expect(Array.isArray(res.output.intents)).toBe(true);
      expect(Array.isArray(res.output.entities)).toBe(true);
      expect(res.output.intents.length).toBe(0);
      expect(res.output.entities.length).toBe(0);
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
      expect(err).toBeNull();
      expect(res.output).toBeDefined();
      expect(Array.isArray(res.output.generic)).toBe(true);
      expect(res.output.generic[0].response_type).toBe('text');
      expect(res.output.generic[0].text).toBeDefined();
      expect(Array.isArray(res.output.intents)).toBe(true);
      expect(Array.isArray(res.output.entities)).toBe(true);
      done();
    });
  });

  it('should deleteSession', function(done) {
    const params = {
      assistant_id: auth.assistant_id,
      session_id,
    };
    assistant.deleteSession(params, function(err, res) {
      expect(err).toBeNull();
      done();
    });
  });
});
