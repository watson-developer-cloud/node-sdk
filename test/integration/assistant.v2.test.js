'use strict';

const AssistantV2 = require('../../assistant/v2');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const serviceErrorUtils = require('../resources/service_error_util');

describe('assistant v2 integration', function() {
  auth.assistant.version = '2019-03-27';
  const assistant = new AssistantV2(auth.assistant);
  const assistant_id = auth.assistant.assistant_id;
  let session_id;

  it('should createSession', function(done) {
    const params = {
      assistant_id,
    };
    assistant.createSession(
      params,
      serviceErrorUtils.checkErrorCode(200, function(err, res) {
        expect(err).toBeNull();
        expect(res.session_id).toBeDefined();
        session_id = res.session_id;
        done();
      })
    );
  });

  it('should message - generic', function(done) {
    if (!session_id) {
      // We cannot run this test when session creation failed.
      return done();
    }

    const params = {
      assistant_id,
      session_id,
    };

    assistant.message(
      params,
      serviceErrorUtils.checkErrorCode(200, function(err, res) {
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
      })
    );
  });

  it('should message - non-generic (Promise)', function(done) {
    if (!session_id) {
      // We cannot run this test when session creation failed.
      return done();
    }

    const input = {
      text: 'please tell me a joke',
    };
    const params = {
      assistant_id,
      session_id,
      input,
    };

    assistant
      .message(params)
      .then(res => {
        expect(res.output).toBeDefined();
        expect(Array.isArray(res.output.generic)).toBe(true);
        expect(res.output.generic[0].response_type).toBe('text');
        expect(res.output.generic[0].text).toBeDefined();
        expect(Array.isArray(res.output.intents)).toBe(true);
        expect(Array.isArray(res.output.entities)).toBe(true);
        done();
      })
      .catch(
        serviceErrorUtils.checkErrorCode(200, err => {
          throw new Error(err);
        })
      );
  });

  it('should deleteSession', function(done) {
    if (!session_id) {
      // We cannot run this test when session creation failed.
      return done();
    }

    const params = {
      assistant_id: auth.assistant.assistant_id,
      session_id,
    };
    assistant.deleteSession(
      params,
      serviceErrorUtils.checkErrorCode(200, function(err, res) {
        expect(err).toBeNull();
        done();
      })
    );
  });
});
