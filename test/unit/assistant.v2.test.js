/**
 * (C) Copyright IBM Corp. 2018, 2023.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const AssistantV2 = require('../../dist/assistant/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const assistantServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.assistant.watson.cloud.ibm.com',
  version: 'testString',
};

const assistantService = new AssistantV2(assistantServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(assistantService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('AssistantV2', () => {

  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      version: 'testString',
    };
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

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
        const serviceObj = new AssistantV2(assistantServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(assistantServiceOptions.version);
      });
    });
  });

  describe('createAssistant', () => {
    describe('positive tests', () => {
      function __createAssistantTest() {
        // Construct the params object for operation createAssistant
        const language = 'testString';
        const name = 'testString';
        const description = 'testString';
        const createAssistantParams = {
          language,
          name,
          description,
        };

        const createAssistantResult = assistantService.createAssistant(createAssistantParams);

        // all methods should return a Promise
        expectToBePromise(createAssistantResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.language).toEqual(language);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAssistantTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createAssistantTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createAssistantTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAssistantParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createAssistant(createAssistantParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        assistantService.createAssistant({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listAssistants', () => {
    describe('positive tests', () => {
      function __listAssistantsTest() {
        // Construct the params object for operation listAssistants
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'name';
        const cursor = 'testString';
        const includeAudit = false;
        const listAssistantsParams = {
          pageLimit,
          includeCount,
          sort,
          cursor,
          includeAudit,
        };

        const listAssistantsResult = assistantService.listAssistants(listAssistantsParams);

        // all methods should return a Promise
        expectToBePromise(listAssistantsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAssistantsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listAssistantsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listAssistantsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAssistantsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listAssistants(listAssistantsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        assistantService.listAssistants({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('deleteAssistant', () => {
    describe('positive tests', () => {
      function __deleteAssistantTest() {
        // Construct the params object for operation deleteAssistant
        const assistantId = 'testString';
        const deleteAssistantParams = {
          assistantId,
        };

        const deleteAssistantResult = assistantService.deleteAssistant(deleteAssistantParams);

        // all methods should return a Promise
        expectToBePromise(deleteAssistantResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAssistantTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteAssistantTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteAssistantTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAssistantParams = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteAssistant(deleteAssistantParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteAssistant({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteAssistant();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSession', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RequestAnalytics
      const requestAnalyticsModel = {
        browser: 'testString',
        device: 'testString',
        pageUrl: 'testString',
      };

      function __createSessionTest() {
        // Construct the params object for operation createSession
        const assistantId = 'testString';
        const analytics = requestAnalyticsModel;
        const createSessionParams = {
          assistantId,
          analytics,
        };

        const createSessionResult = assistantService.createSession(createSessionParams);

        // all methods should return a Promise
        expectToBePromise(createSessionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/sessions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.analytics).toEqual(analytics);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSessionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createSessionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createSessionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSessionParams = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createSession(createSessionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.createSession({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.createSession();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSession', () => {
    describe('positive tests', () => {
      function __deleteSessionTest() {
        // Construct the params object for operation deleteSession
        const assistantId = 'testString';
        const sessionId = 'testString';
        const deleteSessionParams = {
          assistantId,
          sessionId,
        };

        const deleteSessionResult = assistantService.deleteSession(deleteSessionParams);

        // all methods should return a Promise
        expectToBePromise(deleteSessionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/sessions/{session_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
        expect(mockRequestOptions.path.session_id).toEqual(sessionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSessionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteSessionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteSessionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const sessionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSessionParams = {
          assistantId,
          sessionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteSession(deleteSessionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteSession({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteSession();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        skill: 'testString',
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
        groups: [captureGroupModel],
        interpretation: runtimeEntityInterpretationModel,
        alternatives: [runtimeEntityAlternativeModel],
        role: runtimeEntityRoleModel,
        skill: 'testString',
      };

      // MessageInputAttachment
      const messageInputAttachmentModel = {
        url: 'testString',
        media_type: 'testString',
      };

      // RequestAnalytics
      const requestAnalyticsModel = {
        browser: 'testString',
        device: 'testString',
        pageUrl: 'testString',
      };

      // MessageInputOptionsSpelling
      const messageInputOptionsSpellingModel = {
        suggestions: true,
        auto_correct: true,
      };

      // MessageInputOptions
      const messageInputOptionsModel = {
        restart: false,
        alternate_intents: false,
        spelling: messageInputOptionsSpellingModel,
        debug: false,
        return_context: false,
        export: false,
      };

      // MessageInput
      const messageInputModel = {
        message_type: 'text',
        text: 'testString',
        intents: [runtimeIntentModel],
        entities: [runtimeEntityModel],
        suggestion_id: 'testString',
        attachments: [messageInputAttachmentModel],
        analytics: requestAnalyticsModel,
        options: messageInputOptionsModel,
      };

      // MessageContextGlobalSystem
      const messageContextGlobalSystemModel = {
        timezone: 'testString',
        user_id: 'testString',
        turn_count: 38,
        locale: 'en-us',
        reference_time: 'testString',
        session_start_time: 'testString',
        state: 'testString',
        skip_user_input: true,
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
        user_defined: { foo: 'bar' },
        system: messageContextSkillSystemModel,
      };

      // MessageContext
      const messageContextModel = {
        global: messageContextGlobalModel,
        skills: { 'key1': messageContextSkillModel },
        integrations: { foo: 'bar' },
      };

      function __messageTest() {
        // Construct the params object for operation message
        const assistantId = 'testString';
        const sessionId = 'testString';
        const input = messageInputModel;
        const context = messageContextModel;
        const userId = 'testString';
        const messageParams = {
          assistantId,
          sessionId,
          input,
          context,
          userId,
        };

        const messageResult = assistantService.message(messageParams);

        // all methods should return a Promise
        expectToBePromise(messageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/sessions/{session_id}/message', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.input).toEqual(input);
        expect(mockRequestOptions.body.context).toEqual(context);
        expect(mockRequestOptions.body.user_id).toEqual(userId);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
        expect(mockRequestOptions.path.session_id).toEqual(sessionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __messageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __messageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __messageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const sessionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const messageParams = {
          assistantId,
          sessionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.message(messageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.message({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.message();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        skill: 'testString',
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
        groups: [captureGroupModel],
        interpretation: runtimeEntityInterpretationModel,
        alternatives: [runtimeEntityAlternativeModel],
        role: runtimeEntityRoleModel,
        skill: 'testString',
      };

      // MessageInputAttachment
      const messageInputAttachmentModel = {
        url: 'testString',
        media_type: 'testString',
      };

      // RequestAnalytics
      const requestAnalyticsModel = {
        browser: 'testString',
        device: 'testString',
        pageUrl: 'testString',
      };

      // MessageInputOptionsSpelling
      const messageInputOptionsSpellingModel = {
        suggestions: true,
        auto_correct: true,
      };

      // MessageInputOptionsStateless
      const messageInputOptionsStatelessModel = {
        restart: false,
        alternate_intents: false,
        spelling: messageInputOptionsSpellingModel,
        debug: false,
      };

      // MessageInputStateless
      const messageInputStatelessModel = {
        message_type: 'text',
        text: 'testString',
        intents: [runtimeIntentModel],
        entities: [runtimeEntityModel],
        suggestion_id: 'testString',
        attachments: [messageInputAttachmentModel],
        analytics: requestAnalyticsModel,
        options: messageInputOptionsStatelessModel,
      };

      // MessageContextGlobalSystem
      const messageContextGlobalSystemModel = {
        timezone: 'testString',
        user_id: 'testString',
        turn_count: 38,
        locale: 'en-us',
        reference_time: 'testString',
        session_start_time: 'testString',
        state: 'testString',
        skip_user_input: true,
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
        user_defined: { foo: 'bar' },
        system: messageContextSkillSystemModel,
      };

      // MessageContextStateless
      const messageContextStatelessModel = {
        global: messageContextGlobalStatelessModel,
        skills: { 'key1': messageContextSkillModel },
        integrations: { foo: 'bar' },
      };

      function __messageStatelessTest() {
        // Construct the params object for operation messageStateless
        const assistantId = 'testString';
        const input = messageInputStatelessModel;
        const context = messageContextStatelessModel;
        const userId = 'testString';
        const messageStatelessParams = {
          assistantId,
          input,
          context,
          userId,
        };

        const messageStatelessResult = assistantService.messageStateless(messageStatelessParams);

        // all methods should return a Promise
        expectToBePromise(messageStatelessResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/message', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.input).toEqual(input);
        expect(mockRequestOptions.body.context).toEqual(context);
        expect(mockRequestOptions.body.user_id).toEqual(userId);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __messageStatelessTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __messageStatelessTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __messageStatelessTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const messageStatelessParams = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.messageStateless(messageStatelessParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.messageStateless({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.messageStateless();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __bulkClassifyTest() {
        // Construct the params object for operation bulkClassify
        const skillId = 'testString';
        const input = [bulkClassifyUtteranceModel];
        const bulkClassifyParams = {
          skillId,
          input,
        };

        const bulkClassifyResult = assistantService.bulkClassify(bulkClassifyParams);

        // all methods should return a Promise
        expectToBePromise(bulkClassifyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/skills/{skill_id}/workspace/bulk_classify', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.input).toEqual(input);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.skill_id).toEqual(skillId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __bulkClassifyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __bulkClassifyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __bulkClassifyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const skillId = 'testString';
        const input = [bulkClassifyUtteranceModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const bulkClassifyParams = {
          skillId,
          input,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.bulkClassify(bulkClassifyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.bulkClassify({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.bulkClassify();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listLogs', () => {
    describe('positive tests', () => {
      function __listLogsTest() {
        // Construct the params object for operation listLogs
        const assistantId = 'testString';
        const sort = 'testString';
        const filter = 'testString';
        const pageLimit = 38;
        const cursor = 'testString';
        const listLogsParams = {
          assistantId,
          sort,
          filter,
          pageLimit,
          cursor,
        };

        const listLogsResult = assistantService.listLogs(listLogsParams);

        // all methods should return a Promise
        expectToBePromise(listLogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/logs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listLogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listLogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLogsParams = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listLogs(listLogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listLogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listLogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteUserData', () => {
    describe('positive tests', () => {
      function __deleteUserDataTest() {
        // Construct the params object for operation deleteUserData
        const customerId = 'testString';
        const deleteUserDataParams = {
          customerId,
        };

        const deleteUserDataResult = assistantService.deleteUserData(deleteUserDataParams);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/user_data', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.customer_id).toEqual(customerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteUserDataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteUserDataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteUserDataTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteUserDataParams = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteUserData(deleteUserDataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteUserData();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listEnvironments', () => {
    describe('positive tests', () => {
      function __listEnvironmentsTest() {
        // Construct the params object for operation listEnvironments
        const assistantId = 'testString';
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'name';
        const cursor = 'testString';
        const includeAudit = false;
        const listEnvironmentsParams = {
          assistantId,
          pageLimit,
          includeCount,
          sort,
          cursor,
          includeAudit,
        };

        const listEnvironmentsResult = assistantService.listEnvironments(listEnvironmentsParams);

        // all methods should return a Promise
        expectToBePromise(listEnvironmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/environments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listEnvironmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listEnvironmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listEnvironmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listEnvironmentsParams = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listEnvironments(listEnvironmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listEnvironments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listEnvironments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getEnvironment', () => {
    describe('positive tests', () => {
      function __getEnvironmentTest() {
        // Construct the params object for operation getEnvironment
        const assistantId = 'testString';
        const environmentId = 'testString';
        const includeAudit = false;
        const getEnvironmentParams = {
          assistantId,
          environmentId,
          includeAudit,
        };

        const getEnvironmentResult = assistantService.getEnvironment(getEnvironmentParams);

        // all methods should return a Promise
        expectToBePromise(getEnvironmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/environments/{environment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEnvironmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getEnvironmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getEnvironmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEnvironmentParams = {
          assistantId,
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getEnvironment(getEnvironmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getEnvironment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateEnvironment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EnvironmentSkill
      const environmentSkillModel = {
        skill_id: 'testString',
        type: 'dialog',
        disabled: true,
        snapshot: 'testString',
        skill_reference: 'testString',
      };

      function __updateEnvironmentTest() {
        // Construct the params object for operation updateEnvironment
        const assistantId = 'testString';
        const environmentId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const sessionTimeout = 10;
        const skillReferences = [environmentSkillModel];
        const updateEnvironmentParams = {
          assistantId,
          environmentId,
          name,
          description,
          sessionTimeout,
          skillReferences,
        };

        const updateEnvironmentResult = assistantService.updateEnvironment(updateEnvironmentParams);

        // all methods should return a Promise
        expectToBePromise(updateEnvironmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/environments/{environment_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.session_timeout).toEqual(sessionTimeout);
        expect(mockRequestOptions.body.skill_references).toEqual(skillReferences);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateEnvironmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateEnvironmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateEnvironmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateEnvironmentParams = {
          assistantId,
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateEnvironment(updateEnvironmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateEnvironment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createRelease', () => {
    describe('positive tests', () => {
      function __createReleaseTest() {
        // Construct the params object for operation createRelease
        const assistantId = 'testString';
        const description = 'testString';
        const createReleaseParams = {
          assistantId,
          description,
        };

        const createReleaseResult = assistantService.createRelease(createReleaseParams);

        // all methods should return a Promise
        expectToBePromise(createReleaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/releases', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createReleaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createReleaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createReleaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createReleaseParams = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createRelease(createReleaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.createRelease({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.createRelease();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listReleases', () => {
    describe('positive tests', () => {
      function __listReleasesTest() {
        // Construct the params object for operation listReleases
        const assistantId = 'testString';
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'name';
        const cursor = 'testString';
        const includeAudit = false;
        const listReleasesParams = {
          assistantId,
          pageLimit,
          includeCount,
          sort,
          cursor,
          includeAudit,
        };

        const listReleasesResult = assistantService.listReleases(listReleasesParams);

        // all methods should return a Promise
        expectToBePromise(listReleasesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/releases', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listReleasesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listReleasesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listReleasesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listReleasesParams = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listReleases(listReleasesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listReleases({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listReleases();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getRelease', () => {
    describe('positive tests', () => {
      function __getReleaseTest() {
        // Construct the params object for operation getRelease
        const assistantId = 'testString';
        const release = 'testString';
        const includeAudit = false;
        const getReleaseParams = {
          assistantId,
          release,
          includeAudit,
        };

        const getReleaseResult = assistantService.getRelease(getReleaseParams);

        // all methods should return a Promise
        expectToBePromise(getReleaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/releases/{release}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
        expect(mockRequestOptions.path.release).toEqual(release);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReleaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getReleaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getReleaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const release = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReleaseParams = {
          assistantId,
          release,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getRelease(getReleaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getRelease({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getRelease();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteRelease', () => {
    describe('positive tests', () => {
      function __deleteReleaseTest() {
        // Construct the params object for operation deleteRelease
        const assistantId = 'testString';
        const release = 'testString';
        const deleteReleaseParams = {
          assistantId,
          release,
        };

        const deleteReleaseResult = assistantService.deleteRelease(deleteReleaseParams);

        // all methods should return a Promise
        expectToBePromise(deleteReleaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/releases/{release}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
        expect(mockRequestOptions.path.release).toEqual(release);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteReleaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteReleaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteReleaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const release = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteReleaseParams = {
          assistantId,
          release,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteRelease(deleteReleaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteRelease({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteRelease();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deployRelease', () => {
    describe('positive tests', () => {
      function __deployReleaseTest() {
        // Construct the params object for operation deployRelease
        const assistantId = 'testString';
        const release = 'testString';
        const environmentId = 'testString';
        const includeAudit = false;
        const deployReleaseParams = {
          assistantId,
          release,
          environmentId,
          includeAudit,
        };

        const deployReleaseResult = assistantService.deployRelease(deployReleaseParams);

        // all methods should return a Promise
        expectToBePromise(deployReleaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/releases/{release}/deploy', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
        expect(mockRequestOptions.path.release).toEqual(release);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deployReleaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deployReleaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deployReleaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const release = 'testString';
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deployReleaseParams = {
          assistantId,
          release,
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deployRelease(deployReleaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deployRelease({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deployRelease();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSkill', () => {
    describe('positive tests', () => {
      function __getSkillTest() {
        // Construct the params object for operation getSkill
        const assistantId = 'testString';
        const skillId = 'testString';
        const getSkillParams = {
          assistantId,
          skillId,
        };

        const getSkillResult = assistantService.getSkill(getSkillParams);

        // all methods should return a Promise
        expectToBePromise(getSkillResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/skills/{skill_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
        expect(mockRequestOptions.path.skill_id).toEqual(skillId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSkillTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getSkillTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getSkillTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const skillId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSkillParams = {
          assistantId,
          skillId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getSkill(getSkillParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getSkill({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getSkill();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSkill', () => {
    describe('positive tests', () => {
      function __updateSkillTest() {
        // Construct the params object for operation updateSkill
        const assistantId = 'testString';
        const skillId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const workspace = { foo: 'bar' };
        const dialogSettings = { foo: 'bar' };
        const searchSettings = { foo: 'bar' };
        const updateSkillParams = {
          assistantId,
          skillId,
          name,
          description,
          workspace,
          dialogSettings,
          searchSettings,
        };

        const updateSkillResult = assistantService.updateSkill(updateSkillParams);

        // all methods should return a Promise
        expectToBePromise(updateSkillResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/skills/{skill_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.workspace).toEqual(workspace);
        expect(mockRequestOptions.body.dialog_settings).toEqual(dialogSettings);
        expect(mockRequestOptions.body.search_settings).toEqual(searchSettings);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
        expect(mockRequestOptions.path.skill_id).toEqual(skillId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSkillTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateSkillTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateSkillTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const skillId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSkillParams = {
          assistantId,
          skillId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateSkill(updateSkillParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateSkill({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateSkill();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('exportSkills', () => {
    describe('positive tests', () => {
      function __exportSkillsTest() {
        // Construct the params object for operation exportSkills
        const assistantId = 'testString';
        const includeAudit = false;
        const exportSkillsParams = {
          assistantId,
          includeAudit,
        };

        const exportSkillsResult = assistantService.exportSkills(exportSkillsParams);

        // all methods should return a Promise
        expectToBePromise(exportSkillsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/skills_export', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __exportSkillsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __exportSkillsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __exportSkillsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const exportSkillsParams = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.exportSkills(exportSkillsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.exportSkills({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.exportSkills();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('importSkills', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SkillImport
      const skillImportModel = {
        name: 'testString',
        description: 'testString',
        workspace: { foo: 'bar' },
        dialog_settings: { foo: 'bar' },
        search_settings: { foo: 'bar' },
        language: 'testString',
        type: 'action',
      };

      // AssistantState
      const assistantStateModel = {
        action_disabled: true,
        dialog_disabled: true,
      };

      function __importSkillsTest() {
        // Construct the params object for operation importSkills
        const assistantId = 'testString';
        const assistantSkills = [skillImportModel];
        const assistantState = assistantStateModel;
        const includeAudit = false;
        const importSkillsParams = {
          assistantId,
          assistantSkills,
          assistantState,
          includeAudit,
        };

        const importSkillsResult = assistantService.importSkills(importSkillsParams);

        // all methods should return a Promise
        expectToBePromise(importSkillsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/skills_import', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.assistant_skills).toEqual(assistantSkills);
        expect(mockRequestOptions.body.assistant_state).toEqual(assistantState);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __importSkillsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __importSkillsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __importSkillsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const assistantSkills = [skillImportModel];
        const assistantState = assistantStateModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const importSkillsParams = {
          assistantId,
          assistantSkills,
          assistantState,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.importSkills(importSkillsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.importSkills({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.importSkills();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('importSkillsStatus', () => {
    describe('positive tests', () => {
      function __importSkillsStatusTest() {
        // Construct the params object for operation importSkillsStatus
        const assistantId = 'testString';
        const importSkillsStatusParams = {
          assistantId,
        };

        const importSkillsStatusResult = assistantService.importSkillsStatus(importSkillsStatusParams);

        // all methods should return a Promise
        expectToBePromise(importSkillsStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/assistants/{assistant_id}/skills_import/status', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.assistant_id).toEqual(assistantId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __importSkillsStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __importSkillsStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __importSkillsStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assistantId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const importSkillsStatusParams = {
          assistantId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.importSkillsStatus(importSkillsStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.importSkillsStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.importSkillsStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
