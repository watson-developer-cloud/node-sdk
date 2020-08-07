'use strict';

const AssistantV2 = require('../../dist/assistant/v2');
const { IamAuthenticator } = require('../../dist/auth');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

describe('assistant v2 integration', () => {
  const options = authHelper.auth.assistant;
  options.version = '2019-03-27';
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const assistant = new AssistantV2(options);
  const assistantId = options.assistantId;
  let sessionId;

  it('should createSession', done => {
    const params = {
      assistantId,
    };
    assistant.createSession(params, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result.session_id).toBeDefined();
      sessionId = result.session_id;
      done();
    });
  });

  it('should message - generic', done => {
    if (!sessionId) {
      // We cannot run this test when session creation failed.
      return done();
    }

    const params = {
      assistantId,
      sessionId,
    };

    assistant.message(params, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(res).toBeDefined();
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

  it('should message - non-generic (Promise)', done => {
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
      .then(res => {
        const { result } = res || {};
        expect(res).toBeDefined();
        expect(result.output).toBeDefined();
        expect(Array.isArray(result.output.generic)).toBe(true);
        expect(result.output.generic[0].response_type).toBe('search');
        done();
      });
  });

  it('should messageStateless', done => {
    const params = {
      assistantId,
      input: { text: 'Hello' },
    };

    assistant.messageStateless(params, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(result).toBeDefined();
      done();
    });
  });

  it('should deleteSession', done => {
    if (!sessionId) {
      // We cannot run this test when session creation failed.
      return done();
    }

    const params = {
      assistantId: options.assistantId,
      sessionId,
    };
    assistant.deleteSession(params, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result).toBeDefined();
      done();
    });
  });

  it('should listLogs @slow', done => {
    const params = {
      assistantId: options.assistantId,
    };

    assistant.listLogs(params, (err, res) => {
      expect(err).toBeNull();
      const { result } = res || {};
      expect(res).toBeDefined;
      expect(result).toBeDefined();
      expect(result.logs).toBeDefined();
      done();
    });
  });
});
