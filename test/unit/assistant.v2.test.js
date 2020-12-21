/**
 * (C) Copyright IBM Corp. 2018, 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const AssistantV2 = require('../../dist/assistant/v2');

const { getOptions, checkUrlAndMethod, checkMediaHeaders, expectToBePromise } = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.assistant.watson.cloud.ibm.com',
  version: 'testString',
};

const assistantService = new AssistantV2(service);

// dont actually create a request
const createRequestMock = jest.spyOn(assistantService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    version: 'testString',
  };
});

describe('AssistantV2', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AssistantV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AssistantV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(AssistantV2.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AssistantV2(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AssistantV2(options);

      expect(testInstance.baseOptions.serviceName).toBe(AssistantV2.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AssistantV2(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new AssistantV2(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new AssistantV2(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('createSession', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSession
        const assistantId = 'testString';
        const params = {
          assistantId: assistantId,
        };

        const createSessionResult = assistantService.createSession(params);

        // all methods should return a Promise
        expectToBePromise(createSessionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/assistants/{assistant_id}/sessions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['assistant_id']).toEqual(assistantId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createSession(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await assistantService.createSession({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createSessionPromise = assistantService.createSession();
        expectToBePromise(createSessionPromise);

        createSessionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSession', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSession
        const assistantId = 'testString';
        const sessionId = 'testString';
        const params = {
          assistantId: assistantId,
          sessionId: sessionId,
        };

        const deleteSessionResult = assistantService.deleteSession(params);

        // all methods should return a Promise
        expectToBePromise(deleteSessionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/assistants/{assistant_id}/sessions/{session_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['assistant_id']).toEqual(assistantId);
        expect(options.path['session_id']).toEqual(sessionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const sessionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          assistantId,
          sessionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteSession(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await assistantService.deleteSession({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteSessionPromise = assistantService.deleteSession();
        expectToBePromise(deleteSessionPromise);

        deleteSessionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('message', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RuntimeIntent
      const runtimeIntentModel = {
        intent: 'testString',
        confidence: 72.5,
      };

      // CaptureGroup
      const captureGroupModel = {
        group: 'testString',
        location: [38],
      };

      // RuntimeEntityInterpretation
      const runtimeEntityInterpretationModel = {
        calendar_type: 'testString',
        datetime_link: 'testString',
        festival: 'testString',
        granularity: 'day',
        range_link: 'testString',
        range_modifier: 'testString',
        relative_day: 72.5,
        relative_month: 72.5,
        relative_week: 72.5,
        relative_weekend: 72.5,
        relative_year: 72.5,
        specific_day: 72.5,
        specific_day_of_week: 'testString',
        specific_month: 72.5,
        specific_quarter: 72.5,
        specific_year: 72.5,
        numeric_value: 72.5,
        subtype: 'testString',
        part_of_day: 'testString',
        relative_hour: 72.5,
        relative_minute: 72.5,
        relative_second: 72.5,
        specific_hour: 72.5,
        specific_minute: 72.5,
        specific_second: 72.5,
        timezone: 'testString',
      };

      // RuntimeEntityAlternative
      const runtimeEntityAlternativeModel = {
        value: 'testString',
        confidence: 72.5,
      };

      // RuntimeEntityRole
      const runtimeEntityRoleModel = {
        type: 'date_from',
      };

      // RuntimeEntity
      const runtimeEntityModel = {
        entity: 'testString',
        location: [38],
        value: 'testString',
        confidence: 72.5,
        metadata: { key1: 'testString' },
        groups: [captureGroupModel],
        interpretation: runtimeEntityInterpretationModel,
        alternatives: [runtimeEntityAlternativeModel],
        role: runtimeEntityRoleModel,
      };

      // MessageInputOptionsSpelling
      const messageInputOptionsSpellingModel = {
        suggestions: true,
        auto_correct: true,
      };

      // MessageInputOptions
      const messageInputOptionsModel = {
        restart: true,
        alternate_intents: true,
        spelling: messageInputOptionsSpellingModel,
        debug: true,
        return_context: true,
        export: true,
      };

      // MessageInput
      const messageInputModel = {
        message_type: 'text',
        text: 'testString',
        intents: [runtimeIntentModel],
        entities: [runtimeEntityModel],
        suggestion_id: 'testString',
        options: messageInputOptionsModel,
      };

      // MessageContextGlobalSystem
      const messageContextGlobalSystemModel = {
        timezone: 'testString',
        user_id: 'testString',
        turn_count: 38,
        locale: 'en-us',
        reference_time: 'testString',
      };

      // MessageContextGlobal
      const messageContextGlobalModel = {
        system: messageContextGlobalSystemModel,
      };

      // MessageContextSkillSystem
      const messageContextSkillSystemModel = {
        state: 'testString',
        foo: 'testString',
      };

      // MessageContextSkill
      const messageContextSkillModel = {
        user_defined: { key1: { foo: 'bar' } },
        system: messageContextSkillSystemModel,
      };

      // MessageContext
      const messageContextModel = {
        global: messageContextGlobalModel,
        skills: { key1: messageContextSkillModel },
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation message
        const assistantId = 'testString';
        const sessionId = 'testString';
        const input = messageInputModel;
        const context = messageContextModel;
        const params = {
          assistantId: assistantId,
          sessionId: sessionId,
          input: input,
          context: context,
        };

        const messageResult = assistantService.message(params);

        // all methods should return a Promise
        expectToBePromise(messageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v2/assistants/{assistant_id}/sessions/{session_id}/message',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['input']).toEqual(input);
        expect(options.body['context']).toEqual(context);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['assistant_id']).toEqual(assistantId);
        expect(options.path['session_id']).toEqual(sessionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const sessionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          assistantId,
          sessionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.message(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await assistantService.message({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const messagePromise = assistantService.message();
        expectToBePromise(messagePromise);

        messagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('messageStateless', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RuntimeIntent
      const runtimeIntentModel = {
        intent: 'testString',
        confidence: 72.5,
      };

      // CaptureGroup
      const captureGroupModel = {
        group: 'testString',
        location: [38],
      };

      // RuntimeEntityInterpretation
      const runtimeEntityInterpretationModel = {
        calendar_type: 'testString',
        datetime_link: 'testString',
        festival: 'testString',
        granularity: 'day',
        range_link: 'testString',
        range_modifier: 'testString',
        relative_day: 72.5,
        relative_month: 72.5,
        relative_week: 72.5,
        relative_weekend: 72.5,
        relative_year: 72.5,
        specific_day: 72.5,
        specific_day_of_week: 'testString',
        specific_month: 72.5,
        specific_quarter: 72.5,
        specific_year: 72.5,
        numeric_value: 72.5,
        subtype: 'testString',
        part_of_day: 'testString',
        relative_hour: 72.5,
        relative_minute: 72.5,
        relative_second: 72.5,
        specific_hour: 72.5,
        specific_minute: 72.5,
        specific_second: 72.5,
        timezone: 'testString',
      };

      // RuntimeEntityAlternative
      const runtimeEntityAlternativeModel = {
        value: 'testString',
        confidence: 72.5,
      };

      // RuntimeEntityRole
      const runtimeEntityRoleModel = {
        type: 'date_from',
      };

      // RuntimeEntity
      const runtimeEntityModel = {
        entity: 'testString',
        location: [38],
        value: 'testString',
        confidence: 72.5,
        metadata: { key1: 'testString' },
        groups: [captureGroupModel],
        interpretation: runtimeEntityInterpretationModel,
        alternatives: [runtimeEntityAlternativeModel],
        role: runtimeEntityRoleModel,
      };

      // MessageInputOptionsSpelling
      const messageInputOptionsSpellingModel = {
        suggestions: true,
        auto_correct: true,
      };

      // MessageInputOptionsStateless
      const messageInputOptionsStatelessModel = {
        restart: true,
        alternate_intents: true,
        spelling: messageInputOptionsSpellingModel,
        debug: true,
      };

      // MessageInputStateless
      const messageInputStatelessModel = {
        message_type: 'text',
        text: 'testString',
        intents: [runtimeIntentModel],
        entities: [runtimeEntityModel],
        suggestion_id: 'testString',
        options: messageInputOptionsStatelessModel,
      };

      // MessageContextGlobalSystem
      const messageContextGlobalSystemModel = {
        timezone: 'testString',
        user_id: 'testString',
        turn_count: 38,
        locale: 'en-us',
        reference_time: 'testString',
      };

      // MessageContextGlobalStateless
      const messageContextGlobalStatelessModel = {
        system: messageContextGlobalSystemModel,
        session_id: 'testString',
      };

      // MessageContextSkillSystem
      const messageContextSkillSystemModel = {
        state: 'testString',
        foo: 'testString',
      };

      // MessageContextSkill
      const messageContextSkillModel = {
        user_defined: { key1: { foo: 'bar' } },
        system: messageContextSkillSystemModel,
      };

      // MessageContextStateless
      const messageContextStatelessModel = {
        global: messageContextGlobalStatelessModel,
        skills: { key1: messageContextSkillModel },
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation messageStateless
        const assistantId = 'testString';
        const input = messageInputStatelessModel;
        const context = messageContextStatelessModel;
        const params = {
          assistantId: assistantId,
          input: input,
          context: context,
        };

        const messageStatelessResult = assistantService.messageStateless(params);

        // all methods should return a Promise
        expectToBePromise(messageStatelessResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/assistants/{assistant_id}/message', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['input']).toEqual(input);
        expect(options.body['context']).toEqual(context);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['assistant_id']).toEqual(assistantId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.messageStateless(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await assistantService.messageStateless({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const messageStatelessPromise = assistantService.messageStateless();
        expectToBePromise(messageStatelessPromise);

        messageStatelessPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('bulkClassify', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BulkClassifyUtterance
      const bulkClassifyUtteranceModel = {
        text: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation bulkClassify
        const skillId = 'testString';
        const input = [bulkClassifyUtteranceModel];
        const params = {
          skillId: skillId,
          input: input,
        };

        const bulkClassifyResult = assistantService.bulkClassify(params);

        // all methods should return a Promise
        expectToBePromise(bulkClassifyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/skills/{skill_id}/workspace/bulk_classify', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['input']).toEqual(input);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['skill_id']).toEqual(skillId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const skillId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          skillId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.bulkClassify(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await assistantService.bulkClassify({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const bulkClassifyPromise = assistantService.bulkClassify();
        expectToBePromise(bulkClassifyPromise);

        bulkClassifyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLogs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLogs
        const assistantId = 'testString';
        const sort = 'testString';
        const filter = 'testString';
        const pageLimit = 38;
        const cursor = 'testString';
        const params = {
          assistantId: assistantId,
          sort: sort,
          filter: filter,
          pageLimit: pageLimit,
          cursor: cursor,
        };

        const listLogsResult = assistantService.listLogs(params);

        // all methods should return a Promise
        expectToBePromise(listLogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/assistants/{assistant_id}/logs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.path['assistant_id']).toEqual(assistantId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listLogs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await assistantService.listLogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listLogsPromise = assistantService.listLogs();
        expectToBePromise(listLogsPromise);

        listLogsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteUserData', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteUserData
        const customerId = 'testString';
        const params = {
          customerId: customerId,
        };

        const deleteUserDataResult = assistantService.deleteUserData(params);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/user_data', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['customer_id']).toEqual(customerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await assistantService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteUserDataPromise = assistantService.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
