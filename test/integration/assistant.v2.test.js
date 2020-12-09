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

  it('should createSession', async () => {
    const params = {
      assistantId,
    };

    const res = await assistant.createSession(params);
    const { result } = res || {};
    expect(res).toBeDefined();
    expect(result.session_id).toBeDefined();
    sessionId = result.session_id;
  });

  it('should message - generic', async () => {
    // We cannot run this test when session creation failed.
    expect(sessionId).toBeTruthy();

    const params = {
      assistantId,
      sessionId,
    };

    const res = await assistant.message(params);
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
  });

  it('should messageStateless', async () => {
    const params = {
      assistantId,
      input: { text: 'Hello' },
    };

    const res = await assistant.messageStateless(params);
    const { result } = res || {};
    expect(result).toBeDefined();
  });

  it('should deleteSession', async () => {
    // We cannot run this test when session creation failed.
    expect(sessionId).toBeTruthy();

    const params = {
      assistantId: options.assistantId,
      sessionId,
    };

    const res = await assistant.deleteSession(params);
    const { result } = res || {};
    expect(res).toBeDefined();
    expect(result).toBeDefined();
  });

  // This test tests a method that requires a premium instance of Assistant v2

  // it('should listLogs @slow', async () => {
  //   const params = {
  //     assistantId: options.assistantId,
  //   };

  //   try{
  //     const res = await assistant.listLogs(params)
  //     const { result } = res || {};
  //     expect(res).toBeDefined;
  //     expect(result).toBeDefined();
  //     expect(result.logs).toBeDefined();
  //   } catch (err) {
  //     fail(err)
  //   }
  // });
});
