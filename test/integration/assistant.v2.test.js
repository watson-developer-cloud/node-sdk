'use strict';

const AssistantV2 = require('../../assistant/v2');
const { IamAuthenticator } = require('../../auth');
const authHelper = require('../resources/auth_helper.js');
const options = authHelper.auth.assistant;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

describe('assistant v2 integration', function() {
  options.version = '2019-03-27';
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const assistant = new AssistantV2(options);
  const assistantId = options.assistantId;
  let sessionId;

  it('should createSession', function(done) {
    const params = {
      assistantId,
    };
    assistant.createSession(params, (err, { result }) => {
      expect(err).toBeNull();
      expect(result.session_id).toBeDefined();
      sessionId = result.session_id;
      done();
    });
  });

  it('should message - generic', function(done) {
    if (!sessionId) {
      // We cannot run this test when session creation failed.
      return done();
    }

    const params = {
      assistantId,
      sessionId,
    };

    assistant.message(params, (err, { result }) => {
      expect(err).toBeNull();
      expect(result.output).toBeDefined();
      expect(Array.isArray(result.output.generic)).toBe(true);
      expect(result.output.generic[0].response_type).toBe('text');
      expect(result.output.generic[0].text).toBeDefined();
      expect(Array.isArray(result.output.intents)).toBe(true);
      expect(Array.isArray(result.output.entities)).toBe(true);
      expect(result.output.intents.length).toBe(0);
      expect(result.output.entities.length).toBe(0);
      done();
    });
  });

  it('should message - non-generic (Promise)', function(done) {
    if (!sessionId) {
      // We cannot run this test when session creation failed.
      return done();
    }

    const input = {
      text: 'please tell me a joke',
    };
    const params = {
      assistantId,
      sessionId,
      input,
    };

    assistant
      .message(params)
      .catch(err => {
        done(err);
      })
      .then(({ result }) => {
        expect(result.output).toBeDefined();
        expect(Array.isArray(result.output.generic)).toBe(true);
        expect(result.output.generic[0].response_type).toBe('text');
        expect(result.output.generic[0].text).toBeDefined();
        expect(Array.isArray(result.output.intents)).toBe(true);
        expect(Array.isArray(result.output.entities)).toBe(true);
        done();
      });
  });

  it('should deleteSession', function(done) {
    if (!sessionId) {
      // We cannot run this test when session creation failed.
      return done();
    }

    const params = {
      assistantId: options.assistantId,
      sessionId,
    };
    assistant.deleteSession(params, (err, { result }) => {
      expect(err).toBeNull();
      done();
    });
  });
});
