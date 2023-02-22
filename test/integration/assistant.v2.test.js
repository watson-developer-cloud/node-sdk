'use strict';

const AssistantV2 = require('../../dist/assistant/v2');
const { IamAuthenticator } = require('../../dist/auth');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

const SIXTY_SECONDS = 600000;

describe('assistant v2 integration', () => {
  const options = authHelper.auth.assistantV2;
  const opts = {
    version: '2023-02-21',
    authenticator: new IamAuthenticator({
      apikey: options.apikey,
      url: 'https://iam.test.cloud.ibm.com',
    }),
    serviceUrl: options.serviceUrl,
  };
  const assistant = new AssistantV2(opts);
  let assistantId;
  let liveEnvironmentId;
  let sessionId;

  jest.setTimeout(SIXTY_SECONDS);
  it('should createAssistant', async () => {
    const params = {
      language: 'en',
      name: 'test assistant for node sdk',
    };

    const res = await assistant.createAssistant(params);
    const { result } = res || {};
    expect(res).toBeDefined();
    expect(result.assistant_id).toBeDefined();
    assistantId = result.assistant_id;
    liveEnvironmentId = result.assistant_environments[1].environment_id;
  });

  it('should listAssistants', async () => {
    const res = await assistant.listAssistants();
    const { result } = res || {};
    expect(res).toBeDefined();
    expect(result.assistants.some(ele => ele.name === 'test assistant for node sdk')).toBeTruthy();
  });

  it('should updateEnvironment', async () => {
    const params = {
      assistantId,
      environmentId: liveEnvironmentId,
      description: 'new description',
    };

    const res = await assistant.updateEnvironment(params);
    const { result } = res || {};
    console.log(result);
    expect(res).toBeDefined();
    expect(result.description).toBe('new description');
  });

  describe('releases', () => {
    let releaseId;
    it('should createRelease', async () => {
      const params = {
        assistantId,
      };

      const res = await assistant.createRelease(params);
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result.release).toBeDefined();
      releaseId = result.release;
    });

    it('should getRelease', async () => {
      const params = {
        assistantId,
        release: releaseId,
      };

      const res = await assistant.getRelease(params);
      const { result } = res || {};
      expect(res).toBeDefined();
      expect(result.release).toBe(releaseId);
    });

    it('should deleteRelease', async () => {
      const params = {
        assistantId,
        release: releaseId,
      };

      const res = await assistant.deleteRelease(params);
      const { result } = res || {};
      expect(res).toBeDefined();
    });
  });

  describe('skills @slow', () => {
    let assistantSkillId;
    let assistantSkills;
    let assistantState;

    it('should exportSkills', done => {
      const params = {
        assistantId,
      };

      const interval = setInterval(async () => {
        const { result } = await assistant.exportSkills(params);

        if (result.status !== 'Processing') {
          try {
            expect(result.assistant_skills[0].status).toBe('Available');
            assistantSkillId = result.assistant_skills[0].skill_id;
            assistantSkills = result.assistant_skills;
            assistantState = result.assistant_state;
            console.log('export skill successful');
            done();
          } catch (error) {
            done(error);
          }
          clearInterval(interval);
        }
      }, 1000);
    });

    it('should getSkill', async () => {
      const params = {
        assistantId,
        skillId: assistantSkillId,
      };

      const { result } = await assistant.getSkill(params);
      expect(result).toBeDefined();
      expect(result.type).toBe('action');
    });

    it('should updateSkill', done => {
      const updateParams = {
        assistantId,
        skillId: assistantSkillId,
        description: 'updated description',
      };
      const getParams = {
        assistantId,
        skillId: assistantSkillId,
      };

      assistant.updateSkill(updateParams);

      const interval = setInterval(async () => {
        const { result } = await assistant.getSkill(getParams);

        if (result.status !== 'Processing') {
          try {
            expect(result.status).toBe('Available');
            expect(result.description).toBe('updated description');
            done();
          } catch (error) {
            done(error);
          }
          clearInterval(interval);
        }
      }, 5000);
    });

    it('should importSkills', done => {
      const importParams = {
        assistantId,
        assistantSkills,
        assistantState,
      };
      const statusParams = {
        assistantId,
      };

      assistant.importSkills(importParams);

      const interval = setInterval(async () => {
        const { result } = await assistant.importSkillsStatus(statusParams);
        console.log(result);

        if (result.status !== 'Processing') {
          try {
            expect(result.status).toBe('Completed');
            done();
          } catch (error) {
            done(error);
          }
          clearInterval(interval);
        }
      }, 2000);
    });
  });

  it('should createSession', async () => {
    const params = {
      assistantId: liveEnvironmentId,
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
      assistantId: liveEnvironmentId,
      sessionId,
    };

    const res = await assistant.deleteSession(params);
    const { result } = res || {};
    expect(res).toBeDefined();
    expect(result).toBeDefined();
  });

  it('should deleteAssistant', async () => {
    // We cannot run this test when assistant creation failed.
    expect(assistantId).toBeTruthy();

    const params = {
      assistantId,
    };

    const res = await assistant.deleteAssistant(params);
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
