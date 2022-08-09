/**
 * (C) Copyright IBM Corp. 2018, 2022.
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

const AssistantV1 = require('../../dist/assistant/v1');

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

const assistantService = new AssistantV1(assistantServiceOptions);

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

describe('AssistantV1', () => {

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

      const testInstance = new AssistantV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AssistantV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(AssistantV1.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AssistantV1(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AssistantV1(options);

      expect(testInstance.baseOptions.serviceName).toBe(AssistantV1.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AssistantV1(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new AssistantV1(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });

  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new AssistantV1(assistantServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(assistantServiceOptions.version);
      });
    });
  });

  describe('message', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // MessageInput
      const messageInputModel = {
        text: 'testString',
        spelling_suggestions: false,
        spelling_auto_correct: false,
        foo: 'testString',
      };

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
        groups: [captureGroupModel],
        interpretation: runtimeEntityInterpretationModel,
        alternatives: [runtimeEntityAlternativeModel],
        role: runtimeEntityRoleModel,
      };

      // MessageContextMetadata
      const messageContextMetadataModel = {
        deployment: 'testString',
        user_id: 'testString',
      };

      // Context
      const contextModel = {
        conversation_id: 'testString',
        system: { 'key1': 'testString' },
        metadata: messageContextMetadataModel,
        foo: 'testString',
      };

      // DialogNodeVisitedDetails
      const dialogNodeVisitedDetailsModel = {
        dialog_node: 'testString',
        title: 'testString',
        conditions: 'testString',
      };

      // LogMessageSource
      const logMessageSourceModel = {
        type: 'dialog_node',
        dialog_node: 'testString',
      };

      // LogMessage
      const logMessageModel = {
        level: 'info',
        msg: 'testString',
        code: 'testString',
        source: logMessageSourceModel,
      };

      // DialogNodeOutputOptionsElementValue
      const dialogNodeOutputOptionsElementValueModel = {
        input: messageInputModel,
        intents: [runtimeIntentModel],
        entities: [runtimeEntityModel],
      };

      // DialogNodeOutputOptionsElement
      const dialogNodeOutputOptionsElementModel = {
        label: 'testString',
        value: dialogNodeOutputOptionsElementValueModel,
      };

      // ResponseGenericChannel
      const responseGenericChannelModel = {
        channel: 'chat',
      };

      // RuntimeResponseGenericRuntimeResponseTypeOption
      const runtimeResponseGenericModel = {
        response_type: 'option',
        title: 'testString',
        description: 'testString',
        preference: 'dropdown',
        options: [dialogNodeOutputOptionsElementModel],
        channels: [responseGenericChannelModel],
      };

      // OutputData
      const outputDataModel = {
        nodes_visited: ['testString'],
        nodes_visited_details: [dialogNodeVisitedDetailsModel],
        log_messages: [logMessageModel],
        generic: [runtimeResponseGenericModel],
        foo: 'testString',
      };

      function __messageTest() {
        // Construct the params object for operation message
        const workspaceId = 'testString';
        const input = messageInputModel;
        const intents = [runtimeIntentModel];
        const entities = [runtimeEntityModel];
        const alternateIntents = false;
        const context = contextModel;
        const output = outputDataModel;
        const userId = 'testString';
        const nodesVisitedDetails = false;
        const messageParams = {
          workspaceId: workspaceId,
          input: input,
          intents: intents,
          entities: entities,
          alternateIntents: alternateIntents,
          context: context,
          output: output,
          userId: userId,
          nodesVisitedDetails: nodesVisitedDetails,
        };

        const messageResult = assistantService.message(messageParams);

        // all methods should return a Promise
        expectToBePromise(messageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/message', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.input).toEqual(input);
        expect(mockRequestOptions.body.intents).toEqual(intents);
        expect(mockRequestOptions.body.entities).toEqual(entities);
        expect(mockRequestOptions.body.alternate_intents).toEqual(alternateIntents);
        expect(mockRequestOptions.body.context).toEqual(context);
        expect(mockRequestOptions.body.output).toEqual(output);
        expect(mockRequestOptions.body.user_id).toEqual(userId);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.nodes_visited_details).toEqual(nodesVisitedDetails);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
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
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const messageParams = {
          workspaceId,
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

  describe('bulkClassify', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BulkClassifyUtterance
      const bulkClassifyUtteranceModel = {
        text: 'testString',
      };

      function __bulkClassifyTest() {
        // Construct the params object for operation bulkClassify
        const workspaceId = 'testString';
        const input = [bulkClassifyUtteranceModel];
        const bulkClassifyParams = {
          workspaceId: workspaceId,
          input: input,
        };

        const bulkClassifyResult = assistantService.bulkClassify(bulkClassifyParams);

        // all methods should return a Promise
        expectToBePromise(bulkClassifyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/bulk_classify', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.input).toEqual(input);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
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
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const bulkClassifyParams = {
          workspaceId,
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

  describe('listWorkspaces', () => {
    describe('positive tests', () => {
      function __listWorkspacesTest() {
        // Construct the params object for operation listWorkspaces
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'name';
        const cursor = 'testString';
        const includeAudit = false;
        const listWorkspacesParams = {
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listWorkspacesResult = assistantService.listWorkspaces(listWorkspacesParams);

        // all methods should return a Promise
        expectToBePromise(listWorkspacesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listWorkspacesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listWorkspacesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listWorkspacesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listWorkspacesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listWorkspaces(listWorkspacesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        assistantService.listWorkspaces({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createWorkspace', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResponseGenericChannel
      const responseGenericChannelModel = {
        channel: 'chat',
      };

      // DialogNodeOutputGenericDialogNodeOutputResponseTypeAudio
      const dialogNodeOutputGenericModel = {
        response_type: 'audio',
        source: 'testString',
        title: 'testString',
        description: 'testString',
        channels: [responseGenericChannelModel],
        channel_options: { foo: 'bar' },
        alt_text: 'testString',
      };

      // DialogNodeOutputModifiers
      const dialogNodeOutputModifiersModel = {
        overwrite: true,
      };

      // DialogNodeOutput
      const dialogNodeOutputModel = {
        generic: [dialogNodeOutputGenericModel],
        integrations: { 'key1': { 'key1': 'testString' } },
        modifiers: dialogNodeOutputModifiersModel,
        foo: 'testString',
      };

      // DialogNodeContext
      const dialogNodeContextModel = {
        integrations: { 'key1': { 'key1': 'testString' } },
        foo: 'testString',
      };

      // DialogNodeNextStep
      const dialogNodeNextStepModel = {
        behavior: 'get_user_input',
        dialog_node: 'testString',
        selector: 'condition',
      };

      // DialogNodeAction
      const dialogNodeActionModel = {
        name: 'testString',
        type: 'client',
        parameters: { 'key1': 'testString' },
        result_variable: 'testString',
        credentials: 'testString',
      };

      // DialogNode
      const dialogNodeModel = {
        dialog_node: 'testString',
        description: 'testString',
        conditions: 'testString',
        parent: 'testString',
        previous_sibling: 'testString',
        output: dialogNodeOutputModel,
        context: dialogNodeContextModel,
        metadata: { 'key1': 'testString' },
        next_step: dialogNodeNextStepModel,
        title: 'testString',
        type: 'standard',
        event_name: 'focus',
        variable: 'testString',
        actions: [dialogNodeActionModel],
        digress_in: 'not_available',
        digress_out: 'allow_returning',
        digress_out_slots: 'not_allowed',
        user_label: 'testString',
        disambiguation_opt_out: false,
      };

      // Counterexample
      const counterexampleModel = {
        text: 'testString',
      };

      // WorkspaceSystemSettingsTooling
      const workspaceSystemSettingsToolingModel = {
        store_generic_responses: true,
      };

      // WorkspaceSystemSettingsDisambiguation
      const workspaceSystemSettingsDisambiguationModel = {
        prompt: 'testString',
        none_of_the_above_prompt: 'testString',
        enabled: false,
        sensitivity: 'auto',
        randomize: true,
        max_suggestions: 1,
        suggestion_text_policy: 'testString',
      };

      // WorkspaceSystemSettingsSystemEntities
      const workspaceSystemSettingsSystemEntitiesModel = {
        enabled: false,
      };

      // WorkspaceSystemSettingsOffTopic
      const workspaceSystemSettingsOffTopicModel = {
        enabled: false,
      };

      // WorkspaceSystemSettingsNlp
      const workspaceSystemSettingsNlpModel = {
        model: 'baseline',
      };

      // WorkspaceSystemSettings
      const workspaceSystemSettingsModel = {
        tooling: workspaceSystemSettingsToolingModel,
        disambiguation: workspaceSystemSettingsDisambiguationModel,
        human_agent_assist: { 'key1': 'testString' },
        spelling_suggestions: false,
        spelling_auto_correct: false,
        system_entities: workspaceSystemSettingsSystemEntitiesModel,
        off_topic: workspaceSystemSettingsOffTopicModel,
        nlp: workspaceSystemSettingsNlpModel,
        foo: 'testString',
      };

      // WebhookHeader
      const webhookHeaderModel = {
        name: 'testString',
        value: 'testString',
      };

      // Webhook
      const webhookModel = {
        url: 'testString',
        name: 'testString',
        headers: [webhookHeaderModel],
      };

      // Mention
      const mentionModel = {
        entity: 'testString',
        location: [38],
      };

      // Example
      const exampleModel = {
        text: 'testString',
        mentions: [mentionModel],
      };

      // CreateIntent
      const createIntentModel = {
        intent: 'testString',
        description: 'testString',
        examples: [exampleModel],
      };

      // CreateValue
      const createValueModel = {
        value: 'testString',
        metadata: { 'key1': 'testString' },
        type: 'synonyms',
        synonyms: ['testString'],
        patterns: ['testString'],
      };

      // CreateEntity
      const createEntityModel = {
        entity: 'testString',
        description: 'testString',
        metadata: { 'key1': 'testString' },
        fuzzy_match: true,
        values: [createValueModel],
      };

      function __createWorkspaceTest() {
        // Construct the params object for operation createWorkspace
        const name = 'testString';
        const description = 'testString';
        const language = 'testString';
        const dialogNodes = [dialogNodeModel];
        const counterexamples = [counterexampleModel];
        const metadata = { 'key1': 'testString' };
        const learningOptOut = false;
        const systemSettings = workspaceSystemSettingsModel;
        const webhooks = [webhookModel];
        const intents = [createIntentModel];
        const entities = [createEntityModel];
        const includeAudit = false;
        const createWorkspaceParams = {
          name: name,
          description: description,
          language: language,
          dialogNodes: dialogNodes,
          counterexamples: counterexamples,
          metadata: metadata,
          learningOptOut: learningOptOut,
          systemSettings: systemSettings,
          webhooks: webhooks,
          intents: intents,
          entities: entities,
          includeAudit: includeAudit,
        };

        const createWorkspaceResult = assistantService.createWorkspace(createWorkspaceParams);

        // all methods should return a Promise
        expectToBePromise(createWorkspaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.language).toEqual(language);
        expect(mockRequestOptions.body.dialog_nodes).toEqual(dialogNodes);
        expect(mockRequestOptions.body.counterexamples).toEqual(counterexamples);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.learning_opt_out).toEqual(learningOptOut);
        expect(mockRequestOptions.body.system_settings).toEqual(systemSettings);
        expect(mockRequestOptions.body.webhooks).toEqual(webhooks);
        expect(mockRequestOptions.body.intents).toEqual(intents);
        expect(mockRequestOptions.body.entities).toEqual(entities);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createWorkspaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createWorkspaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createWorkspaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createWorkspaceParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createWorkspace(createWorkspaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        assistantService.createWorkspace({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getWorkspace', () => {
    describe('positive tests', () => {
      function __getWorkspaceTest() {
        // Construct the params object for operation getWorkspace
        const workspaceId = 'testString';
        const _export = false;
        const includeAudit = false;
        const sort = 'stable';
        const getWorkspaceParams = {
          workspaceId: workspaceId,
          _export: _export,
          includeAudit: includeAudit,
          sort: sort,
        };

        const getWorkspaceResult = assistantService.getWorkspace(getWorkspaceParams);

        // all methods should return a Promise
        expectToBePromise(getWorkspaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.export).toEqual(_export);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getWorkspaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getWorkspaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getWorkspaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getWorkspaceParams = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getWorkspace(getWorkspaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getWorkspace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getWorkspace();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateWorkspace', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResponseGenericChannel
      const responseGenericChannelModel = {
        channel: 'chat',
      };

      // DialogNodeOutputGenericDialogNodeOutputResponseTypeAudio
      const dialogNodeOutputGenericModel = {
        response_type: 'audio',
        source: 'testString',
        title: 'testString',
        description: 'testString',
        channels: [responseGenericChannelModel],
        channel_options: { foo: 'bar' },
        alt_text: 'testString',
      };

      // DialogNodeOutputModifiers
      const dialogNodeOutputModifiersModel = {
        overwrite: true,
      };

      // DialogNodeOutput
      const dialogNodeOutputModel = {
        generic: [dialogNodeOutputGenericModel],
        integrations: { 'key1': { 'key1': 'testString' } },
        modifiers: dialogNodeOutputModifiersModel,
        foo: 'testString',
      };

      // DialogNodeContext
      const dialogNodeContextModel = {
        integrations: { 'key1': { 'key1': 'testString' } },
        foo: 'testString',
      };

      // DialogNodeNextStep
      const dialogNodeNextStepModel = {
        behavior: 'get_user_input',
        dialog_node: 'testString',
        selector: 'condition',
      };

      // DialogNodeAction
      const dialogNodeActionModel = {
        name: 'testString',
        type: 'client',
        parameters: { 'key1': 'testString' },
        result_variable: 'testString',
        credentials: 'testString',
      };

      // DialogNode
      const dialogNodeModel = {
        dialog_node: 'testString',
        description: 'testString',
        conditions: 'testString',
        parent: 'testString',
        previous_sibling: 'testString',
        output: dialogNodeOutputModel,
        context: dialogNodeContextModel,
        metadata: { 'key1': 'testString' },
        next_step: dialogNodeNextStepModel,
        title: 'testString',
        type: 'standard',
        event_name: 'focus',
        variable: 'testString',
        actions: [dialogNodeActionModel],
        digress_in: 'not_available',
        digress_out: 'allow_returning',
        digress_out_slots: 'not_allowed',
        user_label: 'testString',
        disambiguation_opt_out: false,
      };

      // Counterexample
      const counterexampleModel = {
        text: 'testString',
      };

      // WorkspaceSystemSettingsTooling
      const workspaceSystemSettingsToolingModel = {
        store_generic_responses: true,
      };

      // WorkspaceSystemSettingsDisambiguation
      const workspaceSystemSettingsDisambiguationModel = {
        prompt: 'testString',
        none_of_the_above_prompt: 'testString',
        enabled: false,
        sensitivity: 'auto',
        randomize: true,
        max_suggestions: 1,
        suggestion_text_policy: 'testString',
      };

      // WorkspaceSystemSettingsSystemEntities
      const workspaceSystemSettingsSystemEntitiesModel = {
        enabled: false,
      };

      // WorkspaceSystemSettingsOffTopic
      const workspaceSystemSettingsOffTopicModel = {
        enabled: false,
      };

      // WorkspaceSystemSettingsNlp
      const workspaceSystemSettingsNlpModel = {
        model: 'baseline',
      };

      // WorkspaceSystemSettings
      const workspaceSystemSettingsModel = {
        tooling: workspaceSystemSettingsToolingModel,
        disambiguation: workspaceSystemSettingsDisambiguationModel,
        human_agent_assist: { 'key1': 'testString' },
        spelling_suggestions: false,
        spelling_auto_correct: false,
        system_entities: workspaceSystemSettingsSystemEntitiesModel,
        off_topic: workspaceSystemSettingsOffTopicModel,
        nlp: workspaceSystemSettingsNlpModel,
        foo: 'testString',
      };

      // WebhookHeader
      const webhookHeaderModel = {
        name: 'testString',
        value: 'testString',
      };

      // Webhook
      const webhookModel = {
        url: 'testString',
        name: 'testString',
        headers: [webhookHeaderModel],
      };

      // Mention
      const mentionModel = {
        entity: 'testString',
        location: [38],
      };

      // Example
      const exampleModel = {
        text: 'testString',
        mentions: [mentionModel],
      };

      // CreateIntent
      const createIntentModel = {
        intent: 'testString',
        description: 'testString',
        examples: [exampleModel],
      };

      // CreateValue
      const createValueModel = {
        value: 'testString',
        metadata: { 'key1': 'testString' },
        type: 'synonyms',
        synonyms: ['testString'],
        patterns: ['testString'],
      };

      // CreateEntity
      const createEntityModel = {
        entity: 'testString',
        description: 'testString',
        metadata: { 'key1': 'testString' },
        fuzzy_match: true,
        values: [createValueModel],
      };

      function __updateWorkspaceTest() {
        // Construct the params object for operation updateWorkspace
        const workspaceId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const language = 'testString';
        const dialogNodes = [dialogNodeModel];
        const counterexamples = [counterexampleModel];
        const metadata = { 'key1': 'testString' };
        const learningOptOut = false;
        const systemSettings = workspaceSystemSettingsModel;
        const webhooks = [webhookModel];
        const intents = [createIntentModel];
        const entities = [createEntityModel];
        const append = false;
        const includeAudit = false;
        const updateWorkspaceParams = {
          workspaceId: workspaceId,
          name: name,
          description: description,
          language: language,
          dialogNodes: dialogNodes,
          counterexamples: counterexamples,
          metadata: metadata,
          learningOptOut: learningOptOut,
          systemSettings: systemSettings,
          webhooks: webhooks,
          intents: intents,
          entities: entities,
          append: append,
          includeAudit: includeAudit,
        };

        const updateWorkspaceResult = assistantService.updateWorkspace(updateWorkspaceParams);

        // all methods should return a Promise
        expectToBePromise(updateWorkspaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.language).toEqual(language);
        expect(mockRequestOptions.body.dialog_nodes).toEqual(dialogNodes);
        expect(mockRequestOptions.body.counterexamples).toEqual(counterexamples);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.learning_opt_out).toEqual(learningOptOut);
        expect(mockRequestOptions.body.system_settings).toEqual(systemSettings);
        expect(mockRequestOptions.body.webhooks).toEqual(webhooks);
        expect(mockRequestOptions.body.intents).toEqual(intents);
        expect(mockRequestOptions.body.entities).toEqual(entities);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.append).toEqual(append);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateWorkspaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateWorkspaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateWorkspaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateWorkspaceParams = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateWorkspace(updateWorkspaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateWorkspace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateWorkspace();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteWorkspace', () => {
    describe('positive tests', () => {
      function __deleteWorkspaceTest() {
        // Construct the params object for operation deleteWorkspace
        const workspaceId = 'testString';
        const deleteWorkspaceParams = {
          workspaceId: workspaceId,
        };

        const deleteWorkspaceResult = assistantService.deleteWorkspace(deleteWorkspaceParams);

        // all methods should return a Promise
        expectToBePromise(deleteWorkspaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteWorkspaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteWorkspaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteWorkspaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteWorkspaceParams = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteWorkspace(deleteWorkspaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteWorkspace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteWorkspace();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createWorkspaceAsync', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResponseGenericChannel
      const responseGenericChannelModel = {
        channel: 'chat',
      };

      // DialogNodeOutputGenericDialogNodeOutputResponseTypeAudio
      const dialogNodeOutputGenericModel = {
        response_type: 'audio',
        source: 'testString',
        title: 'testString',
        description: 'testString',
        channels: [responseGenericChannelModel],
        channel_options: { foo: 'bar' },
        alt_text: 'testString',
      };

      // DialogNodeOutputModifiers
      const dialogNodeOutputModifiersModel = {
        overwrite: true,
      };

      // DialogNodeOutput
      const dialogNodeOutputModel = {
        generic: [dialogNodeOutputGenericModel],
        integrations: { 'key1': { 'key1': 'testString' } },
        modifiers: dialogNodeOutputModifiersModel,
        foo: 'testString',
      };

      // DialogNodeContext
      const dialogNodeContextModel = {
        integrations: { 'key1': { 'key1': 'testString' } },
        foo: 'testString',
      };

      // DialogNodeNextStep
      const dialogNodeNextStepModel = {
        behavior: 'get_user_input',
        dialog_node: 'testString',
        selector: 'condition',
      };

      // DialogNodeAction
      const dialogNodeActionModel = {
        name: 'testString',
        type: 'client',
        parameters: { 'key1': 'testString' },
        result_variable: 'testString',
        credentials: 'testString',
      };

      // DialogNode
      const dialogNodeModel = {
        dialog_node: 'testString',
        description: 'testString',
        conditions: 'testString',
        parent: 'testString',
        previous_sibling: 'testString',
        output: dialogNodeOutputModel,
        context: dialogNodeContextModel,
        metadata: { 'key1': 'testString' },
        next_step: dialogNodeNextStepModel,
        title: 'testString',
        type: 'standard',
        event_name: 'focus',
        variable: 'testString',
        actions: [dialogNodeActionModel],
        digress_in: 'not_available',
        digress_out: 'allow_returning',
        digress_out_slots: 'not_allowed',
        user_label: 'testString',
        disambiguation_opt_out: false,
      };

      // Counterexample
      const counterexampleModel = {
        text: 'testString',
      };

      // WorkspaceSystemSettingsTooling
      const workspaceSystemSettingsToolingModel = {
        store_generic_responses: true,
      };

      // WorkspaceSystemSettingsDisambiguation
      const workspaceSystemSettingsDisambiguationModel = {
        prompt: 'testString',
        none_of_the_above_prompt: 'testString',
        enabled: false,
        sensitivity: 'auto',
        randomize: true,
        max_suggestions: 1,
        suggestion_text_policy: 'testString',
      };

      // WorkspaceSystemSettingsSystemEntities
      const workspaceSystemSettingsSystemEntitiesModel = {
        enabled: false,
      };

      // WorkspaceSystemSettingsOffTopic
      const workspaceSystemSettingsOffTopicModel = {
        enabled: false,
      };

      // WorkspaceSystemSettingsNlp
      const workspaceSystemSettingsNlpModel = {
        model: 'baseline',
      };

      // WorkspaceSystemSettings
      const workspaceSystemSettingsModel = {
        tooling: workspaceSystemSettingsToolingModel,
        disambiguation: workspaceSystemSettingsDisambiguationModel,
        human_agent_assist: { 'key1': 'testString' },
        spelling_suggestions: false,
        spelling_auto_correct: false,
        system_entities: workspaceSystemSettingsSystemEntitiesModel,
        off_topic: workspaceSystemSettingsOffTopicModel,
        nlp: workspaceSystemSettingsNlpModel,
        foo: 'testString',
      };

      // WebhookHeader
      const webhookHeaderModel = {
        name: 'testString',
        value: 'testString',
      };

      // Webhook
      const webhookModel = {
        url: 'testString',
        name: 'testString',
        headers: [webhookHeaderModel],
      };

      // Mention
      const mentionModel = {
        entity: 'testString',
        location: [38],
      };

      // Example
      const exampleModel = {
        text: 'testString',
        mentions: [mentionModel],
      };

      // CreateIntent
      const createIntentModel = {
        intent: 'testString',
        description: 'testString',
        examples: [exampleModel],
      };

      // CreateValue
      const createValueModel = {
        value: 'testString',
        metadata: { 'key1': 'testString' },
        type: 'synonyms',
        synonyms: ['testString'],
        patterns: ['testString'],
      };

      // CreateEntity
      const createEntityModel = {
        entity: 'testString',
        description: 'testString',
        metadata: { 'key1': 'testString' },
        fuzzy_match: true,
        values: [createValueModel],
      };

      function __createWorkspaceAsyncTest() {
        // Construct the params object for operation createWorkspaceAsync
        const name = 'testString';
        const description = 'testString';
        const language = 'testString';
        const dialogNodes = [dialogNodeModel];
        const counterexamples = [counterexampleModel];
        const metadata = { 'key1': 'testString' };
        const learningOptOut = false;
        const systemSettings = workspaceSystemSettingsModel;
        const webhooks = [webhookModel];
        const intents = [createIntentModel];
        const entities = [createEntityModel];
        const createWorkspaceAsyncParams = {
          name: name,
          description: description,
          language: language,
          dialogNodes: dialogNodes,
          counterexamples: counterexamples,
          metadata: metadata,
          learningOptOut: learningOptOut,
          systemSettings: systemSettings,
          webhooks: webhooks,
          intents: intents,
          entities: entities,
        };

        const createWorkspaceAsyncResult = assistantService.createWorkspaceAsync(createWorkspaceAsyncParams);

        // all methods should return a Promise
        expectToBePromise(createWorkspaceAsyncResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces_async', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.language).toEqual(language);
        expect(mockRequestOptions.body.dialog_nodes).toEqual(dialogNodes);
        expect(mockRequestOptions.body.counterexamples).toEqual(counterexamples);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.learning_opt_out).toEqual(learningOptOut);
        expect(mockRequestOptions.body.system_settings).toEqual(systemSettings);
        expect(mockRequestOptions.body.webhooks).toEqual(webhooks);
        expect(mockRequestOptions.body.intents).toEqual(intents);
        expect(mockRequestOptions.body.entities).toEqual(entities);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createWorkspaceAsyncTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createWorkspaceAsyncTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createWorkspaceAsyncTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createWorkspaceAsyncParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createWorkspaceAsync(createWorkspaceAsyncParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        assistantService.createWorkspaceAsync({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateWorkspaceAsync', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResponseGenericChannel
      const responseGenericChannelModel = {
        channel: 'chat',
      };

      // DialogNodeOutputGenericDialogNodeOutputResponseTypeAudio
      const dialogNodeOutputGenericModel = {
        response_type: 'audio',
        source: 'testString',
        title: 'testString',
        description: 'testString',
        channels: [responseGenericChannelModel],
        channel_options: { foo: 'bar' },
        alt_text: 'testString',
      };

      // DialogNodeOutputModifiers
      const dialogNodeOutputModifiersModel = {
        overwrite: true,
      };

      // DialogNodeOutput
      const dialogNodeOutputModel = {
        generic: [dialogNodeOutputGenericModel],
        integrations: { 'key1': { 'key1': 'testString' } },
        modifiers: dialogNodeOutputModifiersModel,
        foo: 'testString',
      };

      // DialogNodeContext
      const dialogNodeContextModel = {
        integrations: { 'key1': { 'key1': 'testString' } },
        foo: 'testString',
      };

      // DialogNodeNextStep
      const dialogNodeNextStepModel = {
        behavior: 'get_user_input',
        dialog_node: 'testString',
        selector: 'condition',
      };

      // DialogNodeAction
      const dialogNodeActionModel = {
        name: 'testString',
        type: 'client',
        parameters: { 'key1': 'testString' },
        result_variable: 'testString',
        credentials: 'testString',
      };

      // DialogNode
      const dialogNodeModel = {
        dialog_node: 'testString',
        description: 'testString',
        conditions: 'testString',
        parent: 'testString',
        previous_sibling: 'testString',
        output: dialogNodeOutputModel,
        context: dialogNodeContextModel,
        metadata: { 'key1': 'testString' },
        next_step: dialogNodeNextStepModel,
        title: 'testString',
        type: 'standard',
        event_name: 'focus',
        variable: 'testString',
        actions: [dialogNodeActionModel],
        digress_in: 'not_available',
        digress_out: 'allow_returning',
        digress_out_slots: 'not_allowed',
        user_label: 'testString',
        disambiguation_opt_out: false,
      };

      // Counterexample
      const counterexampleModel = {
        text: 'testString',
      };

      // WorkspaceSystemSettingsTooling
      const workspaceSystemSettingsToolingModel = {
        store_generic_responses: true,
      };

      // WorkspaceSystemSettingsDisambiguation
      const workspaceSystemSettingsDisambiguationModel = {
        prompt: 'testString',
        none_of_the_above_prompt: 'testString',
        enabled: false,
        sensitivity: 'auto',
        randomize: true,
        max_suggestions: 1,
        suggestion_text_policy: 'testString',
      };

      // WorkspaceSystemSettingsSystemEntities
      const workspaceSystemSettingsSystemEntitiesModel = {
        enabled: false,
      };

      // WorkspaceSystemSettingsOffTopic
      const workspaceSystemSettingsOffTopicModel = {
        enabled: false,
      };

      // WorkspaceSystemSettingsNlp
      const workspaceSystemSettingsNlpModel = {
        model: 'baseline',
      };

      // WorkspaceSystemSettings
      const workspaceSystemSettingsModel = {
        tooling: workspaceSystemSettingsToolingModel,
        disambiguation: workspaceSystemSettingsDisambiguationModel,
        human_agent_assist: { 'key1': 'testString' },
        spelling_suggestions: false,
        spelling_auto_correct: false,
        system_entities: workspaceSystemSettingsSystemEntitiesModel,
        off_topic: workspaceSystemSettingsOffTopicModel,
        nlp: workspaceSystemSettingsNlpModel,
        foo: 'testString',
      };

      // WebhookHeader
      const webhookHeaderModel = {
        name: 'testString',
        value: 'testString',
      };

      // Webhook
      const webhookModel = {
        url: 'testString',
        name: 'testString',
        headers: [webhookHeaderModel],
      };

      // Mention
      const mentionModel = {
        entity: 'testString',
        location: [38],
      };

      // Example
      const exampleModel = {
        text: 'testString',
        mentions: [mentionModel],
      };

      // CreateIntent
      const createIntentModel = {
        intent: 'testString',
        description: 'testString',
        examples: [exampleModel],
      };

      // CreateValue
      const createValueModel = {
        value: 'testString',
        metadata: { 'key1': 'testString' },
        type: 'synonyms',
        synonyms: ['testString'],
        patterns: ['testString'],
      };

      // CreateEntity
      const createEntityModel = {
        entity: 'testString',
        description: 'testString',
        metadata: { 'key1': 'testString' },
        fuzzy_match: true,
        values: [createValueModel],
      };

      function __updateWorkspaceAsyncTest() {
        // Construct the params object for operation updateWorkspaceAsync
        const workspaceId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const language = 'testString';
        const dialogNodes = [dialogNodeModel];
        const counterexamples = [counterexampleModel];
        const metadata = { 'key1': 'testString' };
        const learningOptOut = false;
        const systemSettings = workspaceSystemSettingsModel;
        const webhooks = [webhookModel];
        const intents = [createIntentModel];
        const entities = [createEntityModel];
        const append = false;
        const updateWorkspaceAsyncParams = {
          workspaceId: workspaceId,
          name: name,
          description: description,
          language: language,
          dialogNodes: dialogNodes,
          counterexamples: counterexamples,
          metadata: metadata,
          learningOptOut: learningOptOut,
          systemSettings: systemSettings,
          webhooks: webhooks,
          intents: intents,
          entities: entities,
          append: append,
        };

        const updateWorkspaceAsyncResult = assistantService.updateWorkspaceAsync(updateWorkspaceAsyncParams);

        // all methods should return a Promise
        expectToBePromise(updateWorkspaceAsyncResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces_async/{workspace_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.language).toEqual(language);
        expect(mockRequestOptions.body.dialog_nodes).toEqual(dialogNodes);
        expect(mockRequestOptions.body.counterexamples).toEqual(counterexamples);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.learning_opt_out).toEqual(learningOptOut);
        expect(mockRequestOptions.body.system_settings).toEqual(systemSettings);
        expect(mockRequestOptions.body.webhooks).toEqual(webhooks);
        expect(mockRequestOptions.body.intents).toEqual(intents);
        expect(mockRequestOptions.body.entities).toEqual(entities);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.append).toEqual(append);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateWorkspaceAsyncTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateWorkspaceAsyncTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateWorkspaceAsyncTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateWorkspaceAsyncParams = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateWorkspaceAsync(updateWorkspaceAsyncParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateWorkspaceAsync({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateWorkspaceAsync();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('exportWorkspaceAsync', () => {
    describe('positive tests', () => {
      function __exportWorkspaceAsyncTest() {
        // Construct the params object for operation exportWorkspaceAsync
        const workspaceId = 'testString';
        const includeAudit = false;
        const sort = 'stable';
        const verbose = false;
        const exportWorkspaceAsyncParams = {
          workspaceId: workspaceId,
          includeAudit: includeAudit,
          sort: sort,
          verbose: verbose,
        };

        const exportWorkspaceAsyncResult = assistantService.exportWorkspaceAsync(exportWorkspaceAsyncParams);

        // all methods should return a Promise
        expectToBePromise(exportWorkspaceAsyncResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces_async/{workspace_id}/export', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.verbose).toEqual(verbose);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __exportWorkspaceAsyncTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __exportWorkspaceAsyncTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __exportWorkspaceAsyncTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const exportWorkspaceAsyncParams = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.exportWorkspaceAsync(exportWorkspaceAsyncParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.exportWorkspaceAsync({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.exportWorkspaceAsync();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listIntents', () => {
    describe('positive tests', () => {
      function __listIntentsTest() {
        // Construct the params object for operation listIntents
        const workspaceId = 'testString';
        const _export = false;
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'intent';
        const cursor = 'testString';
        const includeAudit = false;
        const listIntentsParams = {
          workspaceId: workspaceId,
          _export: _export,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listIntentsResult = assistantService.listIntents(listIntentsParams);

        // all methods should return a Promise
        expectToBePromise(listIntentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/intents', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.export).toEqual(_export);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listIntentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listIntentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listIntentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listIntentsParams = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listIntents(listIntentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listIntents({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listIntents();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createIntent', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Mention
      const mentionModel = {
        entity: 'testString',
        location: [38],
      };

      // Example
      const exampleModel = {
        text: 'testString',
        mentions: [mentionModel],
      };

      function __createIntentTest() {
        // Construct the params object for operation createIntent
        const workspaceId = 'testString';
        const intent = 'testString';
        const description = 'testString';
        const examples = [exampleModel];
        const includeAudit = false;
        const createIntentParams = {
          workspaceId: workspaceId,
          intent: intent,
          description: description,
          examples: examples,
          includeAudit: includeAudit,
        };

        const createIntentResult = assistantService.createIntent(createIntentParams);

        // all methods should return a Promise
        expectToBePromise(createIntentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/intents', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.intent).toEqual(intent);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.examples).toEqual(examples);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createIntentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createIntentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createIntentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createIntentParams = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createIntent(createIntentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.createIntent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.createIntent();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getIntent', () => {
    describe('positive tests', () => {
      function __getIntentTest() {
        // Construct the params object for operation getIntent
        const workspaceId = 'testString';
        const intent = 'testString';
        const _export = false;
        const includeAudit = false;
        const getIntentParams = {
          workspaceId: workspaceId,
          intent: intent,
          _export: _export,
          includeAudit: includeAudit,
        };

        const getIntentResult = assistantService.getIntent(getIntentParams);

        // all methods should return a Promise
        expectToBePromise(getIntentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/intents/{intent}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.export).toEqual(_export);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.intent).toEqual(intent);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getIntentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getIntentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getIntentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getIntentParams = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getIntent(getIntentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getIntent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getIntent();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateIntent', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Mention
      const mentionModel = {
        entity: 'testString',
        location: [38],
      };

      // Example
      const exampleModel = {
        text: 'testString',
        mentions: [mentionModel],
      };

      function __updateIntentTest() {
        // Construct the params object for operation updateIntent
        const workspaceId = 'testString';
        const intent = 'testString';
        const newIntent = 'testString';
        const newDescription = 'testString';
        const newExamples = [exampleModel];
        const append = false;
        const includeAudit = false;
        const updateIntentParams = {
          workspaceId: workspaceId,
          intent: intent,
          newIntent: newIntent,
          newDescription: newDescription,
          newExamples: newExamples,
          append: append,
          includeAudit: includeAudit,
        };

        const updateIntentResult = assistantService.updateIntent(updateIntentParams);

        // all methods should return a Promise
        expectToBePromise(updateIntentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/intents/{intent}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.intent).toEqual(newIntent);
        expect(mockRequestOptions.body.description).toEqual(newDescription);
        expect(mockRequestOptions.body.examples).toEqual(newExamples);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.append).toEqual(append);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.intent).toEqual(intent);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateIntentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateIntentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateIntentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateIntentParams = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateIntent(updateIntentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateIntent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateIntent();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteIntent', () => {
    describe('positive tests', () => {
      function __deleteIntentTest() {
        // Construct the params object for operation deleteIntent
        const workspaceId = 'testString';
        const intent = 'testString';
        const deleteIntentParams = {
          workspaceId: workspaceId,
          intent: intent,
        };

        const deleteIntentResult = assistantService.deleteIntent(deleteIntentParams);

        // all methods should return a Promise
        expectToBePromise(deleteIntentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/intents/{intent}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.intent).toEqual(intent);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteIntentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteIntentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteIntentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteIntentParams = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteIntent(deleteIntentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteIntent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteIntent();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listExamples', () => {
    describe('positive tests', () => {
      function __listExamplesTest() {
        // Construct the params object for operation listExamples
        const workspaceId = 'testString';
        const intent = 'testString';
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'text';
        const cursor = 'testString';
        const includeAudit = false;
        const listExamplesParams = {
          workspaceId: workspaceId,
          intent: intent,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listExamplesResult = assistantService.listExamples(listExamplesParams);

        // all methods should return a Promise
        expectToBePromise(listExamplesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/intents/{intent}/examples', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.intent).toEqual(intent);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listExamplesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listExamplesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listExamplesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listExamplesParams = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listExamples(listExamplesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listExamples({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listExamples();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createExample', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Mention
      const mentionModel = {
        entity: 'testString',
        location: [38],
      };

      function __createExampleTest() {
        // Construct the params object for operation createExample
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const mentions = [mentionModel];
        const includeAudit = false;
        const createExampleParams = {
          workspaceId: workspaceId,
          intent: intent,
          text: text,
          mentions: mentions,
          includeAudit: includeAudit,
        };

        const createExampleResult = assistantService.createExample(createExampleParams);

        // all methods should return a Promise
        expectToBePromise(createExampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/intents/{intent}/examples', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.text).toEqual(text);
        expect(mockRequestOptions.body.mentions).toEqual(mentions);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.intent).toEqual(intent);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createExampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createExampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createExampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createExampleParams = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createExample(createExampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.createExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.createExample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getExample', () => {
    describe('positive tests', () => {
      function __getExampleTest() {
        // Construct the params object for operation getExample
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const includeAudit = false;
        const getExampleParams = {
          workspaceId: workspaceId,
          intent: intent,
          text: text,
          includeAudit: includeAudit,
        };

        const getExampleResult = assistantService.getExample(getExampleParams);

        // all methods should return a Promise
        expectToBePromise(getExampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.intent).toEqual(intent);
        expect(mockRequestOptions.path.text).toEqual(text);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getExampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getExampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getExampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getExampleParams = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getExample(getExampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getExample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateExample', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Mention
      const mentionModel = {
        entity: 'testString',
        location: [38],
      };

      function __updateExampleTest() {
        // Construct the params object for operation updateExample
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const newText = 'testString';
        const newMentions = [mentionModel];
        const includeAudit = false;
        const updateExampleParams = {
          workspaceId: workspaceId,
          intent: intent,
          text: text,
          newText: newText,
          newMentions: newMentions,
          includeAudit: includeAudit,
        };

        const updateExampleResult = assistantService.updateExample(updateExampleParams);

        // all methods should return a Promise
        expectToBePromise(updateExampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.text).toEqual(newText);
        expect(mockRequestOptions.body.mentions).toEqual(newMentions);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.intent).toEqual(intent);
        expect(mockRequestOptions.path.text).toEqual(text);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateExampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateExampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateExampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateExampleParams = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateExample(updateExampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateExample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteExample', () => {
    describe('positive tests', () => {
      function __deleteExampleTest() {
        // Construct the params object for operation deleteExample
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const deleteExampleParams = {
          workspaceId: workspaceId,
          intent: intent,
          text: text,
        };

        const deleteExampleResult = assistantService.deleteExample(deleteExampleParams);

        // all methods should return a Promise
        expectToBePromise(deleteExampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.intent).toEqual(intent);
        expect(mockRequestOptions.path.text).toEqual(text);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteExampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteExampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteExampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteExampleParams = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteExample(deleteExampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteExample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listCounterexamples', () => {
    describe('positive tests', () => {
      function __listCounterexamplesTest() {
        // Construct the params object for operation listCounterexamples
        const workspaceId = 'testString';
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'text';
        const cursor = 'testString';
        const includeAudit = false;
        const listCounterexamplesParams = {
          workspaceId: workspaceId,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listCounterexamplesResult = assistantService.listCounterexamples(listCounterexamplesParams);

        // all methods should return a Promise
        expectToBePromise(listCounterexamplesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/counterexamples', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCounterexamplesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listCounterexamplesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listCounterexamplesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCounterexamplesParams = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listCounterexamples(listCounterexamplesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listCounterexamples({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listCounterexamples();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createCounterexample', () => {
    describe('positive tests', () => {
      function __createCounterexampleTest() {
        // Construct the params object for operation createCounterexample
        const workspaceId = 'testString';
        const text = 'testString';
        const includeAudit = false;
        const createCounterexampleParams = {
          workspaceId: workspaceId,
          text: text,
          includeAudit: includeAudit,
        };

        const createCounterexampleResult = assistantService.createCounterexample(createCounterexampleParams);

        // all methods should return a Promise
        expectToBePromise(createCounterexampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/counterexamples', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.text).toEqual(text);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCounterexampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createCounterexampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createCounterexampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCounterexampleParams = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createCounterexample(createCounterexampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.createCounterexample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.createCounterexample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCounterexample', () => {
    describe('positive tests', () => {
      function __getCounterexampleTest() {
        // Construct the params object for operation getCounterexample
        const workspaceId = 'testString';
        const text = 'testString';
        const includeAudit = false;
        const getCounterexampleParams = {
          workspaceId: workspaceId,
          text: text,
          includeAudit: includeAudit,
        };

        const getCounterexampleResult = assistantService.getCounterexample(getCounterexampleParams);

        // all methods should return a Promise
        expectToBePromise(getCounterexampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/counterexamples/{text}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.text).toEqual(text);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCounterexampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getCounterexampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getCounterexampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCounterexampleParams = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getCounterexample(getCounterexampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getCounterexample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getCounterexample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateCounterexample', () => {
    describe('positive tests', () => {
      function __updateCounterexampleTest() {
        // Construct the params object for operation updateCounterexample
        const workspaceId = 'testString';
        const text = 'testString';
        const newText = 'testString';
        const includeAudit = false;
        const updateCounterexampleParams = {
          workspaceId: workspaceId,
          text: text,
          newText: newText,
          includeAudit: includeAudit,
        };

        const updateCounterexampleResult = assistantService.updateCounterexample(updateCounterexampleParams);

        // all methods should return a Promise
        expectToBePromise(updateCounterexampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/counterexamples/{text}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.text).toEqual(newText);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.text).toEqual(text);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCounterexampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateCounterexampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateCounterexampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCounterexampleParams = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateCounterexample(updateCounterexampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateCounterexample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateCounterexample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCounterexample', () => {
    describe('positive tests', () => {
      function __deleteCounterexampleTest() {
        // Construct the params object for operation deleteCounterexample
        const workspaceId = 'testString';
        const text = 'testString';
        const deleteCounterexampleParams = {
          workspaceId: workspaceId,
          text: text,
        };

        const deleteCounterexampleResult = assistantService.deleteCounterexample(deleteCounterexampleParams);

        // all methods should return a Promise
        expectToBePromise(deleteCounterexampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/counterexamples/{text}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.text).toEqual(text);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCounterexampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteCounterexampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteCounterexampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCounterexampleParams = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteCounterexample(deleteCounterexampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteCounterexample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteCounterexample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listEntities', () => {
    describe('positive tests', () => {
      function __listEntitiesTest() {
        // Construct the params object for operation listEntities
        const workspaceId = 'testString';
        const _export = false;
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'entity';
        const cursor = 'testString';
        const includeAudit = false;
        const listEntitiesParams = {
          workspaceId: workspaceId,
          _export: _export,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listEntitiesResult = assistantService.listEntities(listEntitiesParams);

        // all methods should return a Promise
        expectToBePromise(listEntitiesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.export).toEqual(_export);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listEntitiesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listEntitiesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listEntitiesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listEntitiesParams = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listEntities(listEntitiesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listEntities({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listEntities();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createEntity', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateValue
      const createValueModel = {
        value: 'testString',
        metadata: { 'key1': 'testString' },
        type: 'synonyms',
        synonyms: ['testString'],
        patterns: ['testString'],
      };

      function __createEntityTest() {
        // Construct the params object for operation createEntity
        const workspaceId = 'testString';
        const entity = 'testString';
        const description = 'testString';
        const metadata = { 'key1': 'testString' };
        const fuzzyMatch = true;
        const values = [createValueModel];
        const includeAudit = false;
        const createEntityParams = {
          workspaceId: workspaceId,
          entity: entity,
          description: description,
          metadata: metadata,
          fuzzyMatch: fuzzyMatch,
          values: values,
          includeAudit: includeAudit,
        };

        const createEntityResult = assistantService.createEntity(createEntityParams);

        // all methods should return a Promise
        expectToBePromise(createEntityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.entity).toEqual(entity);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.fuzzy_match).toEqual(fuzzyMatch);
        expect(mockRequestOptions.body.values).toEqual(values);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEntityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createEntityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createEntityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEntityParams = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createEntity(createEntityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.createEntity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.createEntity();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getEntity', () => {
    describe('positive tests', () => {
      function __getEntityTest() {
        // Construct the params object for operation getEntity
        const workspaceId = 'testString';
        const entity = 'testString';
        const _export = false;
        const includeAudit = false;
        const getEntityParams = {
          workspaceId: workspaceId,
          entity: entity,
          _export: _export,
          includeAudit: includeAudit,
        };

        const getEntityResult = assistantService.getEntity(getEntityParams);

        // all methods should return a Promise
        expectToBePromise(getEntityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.export).toEqual(_export);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEntityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getEntityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getEntityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEntityParams = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getEntity(getEntityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getEntity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getEntity();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateEntity', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateValue
      const createValueModel = {
        value: 'testString',
        metadata: { 'key1': 'testString' },
        type: 'synonyms',
        synonyms: ['testString'],
        patterns: ['testString'],
      };

      function __updateEntityTest() {
        // Construct the params object for operation updateEntity
        const workspaceId = 'testString';
        const entity = 'testString';
        const newEntity = 'testString';
        const newDescription = 'testString';
        const newMetadata = { 'key1': 'testString' };
        const newFuzzyMatch = true;
        const newValues = [createValueModel];
        const append = false;
        const includeAudit = false;
        const updateEntityParams = {
          workspaceId: workspaceId,
          entity: entity,
          newEntity: newEntity,
          newDescription: newDescription,
          newMetadata: newMetadata,
          newFuzzyMatch: newFuzzyMatch,
          newValues: newValues,
          append: append,
          includeAudit: includeAudit,
        };

        const updateEntityResult = assistantService.updateEntity(updateEntityParams);

        // all methods should return a Promise
        expectToBePromise(updateEntityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.entity).toEqual(newEntity);
        expect(mockRequestOptions.body.description).toEqual(newDescription);
        expect(mockRequestOptions.body.metadata).toEqual(newMetadata);
        expect(mockRequestOptions.body.fuzzy_match).toEqual(newFuzzyMatch);
        expect(mockRequestOptions.body.values).toEqual(newValues);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.append).toEqual(append);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateEntityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateEntityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateEntityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateEntityParams = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateEntity(updateEntityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateEntity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateEntity();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteEntity', () => {
    describe('positive tests', () => {
      function __deleteEntityTest() {
        // Construct the params object for operation deleteEntity
        const workspaceId = 'testString';
        const entity = 'testString';
        const deleteEntityParams = {
          workspaceId: workspaceId,
          entity: entity,
        };

        const deleteEntityResult = assistantService.deleteEntity(deleteEntityParams);

        // all methods should return a Promise
        expectToBePromise(deleteEntityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteEntityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteEntityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteEntityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteEntityParams = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteEntity(deleteEntityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteEntity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteEntity();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listMentions', () => {
    describe('positive tests', () => {
      function __listMentionsTest() {
        // Construct the params object for operation listMentions
        const workspaceId = 'testString';
        const entity = 'testString';
        const _export = false;
        const includeAudit = false;
        const listMentionsParams = {
          workspaceId: workspaceId,
          entity: entity,
          _export: _export,
          includeAudit: includeAudit,
        };

        const listMentionsResult = assistantService.listMentions(listMentionsParams);

        // all methods should return a Promise
        expectToBePromise(listMentionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/mentions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.export).toEqual(_export);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listMentionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listMentionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listMentionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listMentionsParams = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listMentions(listMentionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listMentions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listMentions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listValues', () => {
    describe('positive tests', () => {
      function __listValuesTest() {
        // Construct the params object for operation listValues
        const workspaceId = 'testString';
        const entity = 'testString';
        const _export = false;
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'value';
        const cursor = 'testString';
        const includeAudit = false;
        const listValuesParams = {
          workspaceId: workspaceId,
          entity: entity,
          _export: _export,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listValuesResult = assistantService.listValues(listValuesParams);

        // all methods should return a Promise
        expectToBePromise(listValuesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/values', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.export).toEqual(_export);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listValuesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listValuesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listValuesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listValuesParams = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listValues(listValuesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listValues({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listValues();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createValue', () => {
    describe('positive tests', () => {
      function __createValueTest() {
        // Construct the params object for operation createValue
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const metadata = { 'key1': 'testString' };
        const type = 'synonyms';
        const synonyms = ['testString'];
        const patterns = ['testString'];
        const includeAudit = false;
        const createValueParams = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          metadata: metadata,
          type: type,
          synonyms: synonyms,
          patterns: patterns,
          includeAudit: includeAudit,
        };

        const createValueResult = assistantService.createValue(createValueParams);

        // all methods should return a Promise
        expectToBePromise(createValueResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/values', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.synonyms).toEqual(synonyms);
        expect(mockRequestOptions.body.patterns).toEqual(patterns);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createValueTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createValueTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createValueTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createValueParams = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createValue(createValueParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.createValue({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.createValue();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getValue', () => {
    describe('positive tests', () => {
      function __getValueTest() {
        // Construct the params object for operation getValue
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const _export = false;
        const includeAudit = false;
        const getValueParams = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          _export: _export,
          includeAudit: includeAudit,
        };

        const getValueResult = assistantService.getValue(getValueParams);

        // all methods should return a Promise
        expectToBePromise(getValueResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.export).toEqual(_export);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
        expect(mockRequestOptions.path.value).toEqual(value);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getValueTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getValueTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getValueTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getValueParams = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getValue(getValueParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getValue({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getValue();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateValue', () => {
    describe('positive tests', () => {
      function __updateValueTest() {
        // Construct the params object for operation updateValue
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const newValue = 'testString';
        const newMetadata = { 'key1': 'testString' };
        const newType = 'synonyms';
        const newSynonyms = ['testString'];
        const newPatterns = ['testString'];
        const append = false;
        const includeAudit = false;
        const updateValueParams = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          newValue: newValue,
          newMetadata: newMetadata,
          newType: newType,
          newSynonyms: newSynonyms,
          newPatterns: newPatterns,
          append: append,
          includeAudit: includeAudit,
        };

        const updateValueResult = assistantService.updateValue(updateValueParams);

        // all methods should return a Promise
        expectToBePromise(updateValueResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(newValue);
        expect(mockRequestOptions.body.metadata).toEqual(newMetadata);
        expect(mockRequestOptions.body.type).toEqual(newType);
        expect(mockRequestOptions.body.synonyms).toEqual(newSynonyms);
        expect(mockRequestOptions.body.patterns).toEqual(newPatterns);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.append).toEqual(append);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
        expect(mockRequestOptions.path.value).toEqual(value);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateValueTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateValueTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateValueTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateValueParams = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateValue(updateValueParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateValue({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateValue();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteValue', () => {
    describe('positive tests', () => {
      function __deleteValueTest() {
        // Construct the params object for operation deleteValue
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const deleteValueParams = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
        };

        const deleteValueResult = assistantService.deleteValue(deleteValueParams);

        // all methods should return a Promise
        expectToBePromise(deleteValueResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
        expect(mockRequestOptions.path.value).toEqual(value);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteValueTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteValueTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteValueTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteValueParams = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteValue(deleteValueParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteValue({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteValue();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSynonyms', () => {
    describe('positive tests', () => {
      function __listSynonymsTest() {
        // Construct the params object for operation listSynonyms
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'synonym';
        const cursor = 'testString';
        const includeAudit = false;
        const listSynonymsParams = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listSynonymsResult = assistantService.listSynonyms(listSynonymsParams);

        // all methods should return a Promise
        expectToBePromise(listSynonymsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
        expect(mockRequestOptions.path.value).toEqual(value);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSynonymsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listSynonymsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listSynonymsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSynonymsParams = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listSynonyms(listSynonymsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listSynonyms({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listSynonyms();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSynonym', () => {
    describe('positive tests', () => {
      function __createSynonymTest() {
        // Construct the params object for operation createSynonym
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const includeAudit = false;
        const createSynonymParams = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          synonym: synonym,
          includeAudit: includeAudit,
        };

        const createSynonymResult = assistantService.createSynonym(createSynonymParams);

        // all methods should return a Promise
        expectToBePromise(createSynonymResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.synonym).toEqual(synonym);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
        expect(mockRequestOptions.path.value).toEqual(value);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSynonymTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createSynonymTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createSynonymTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSynonymParams = {
          workspaceId,
          entity,
          value,
          synonym,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createSynonym(createSynonymParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.createSynonym({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.createSynonym();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSynonym', () => {
    describe('positive tests', () => {
      function __getSynonymTest() {
        // Construct the params object for operation getSynonym
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const includeAudit = false;
        const getSynonymParams = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          synonym: synonym,
          includeAudit: includeAudit,
        };

        const getSynonymResult = assistantService.getSynonym(getSynonymParams);

        // all methods should return a Promise
        expectToBePromise(getSynonymResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
        expect(mockRequestOptions.path.value).toEqual(value);
        expect(mockRequestOptions.path.synonym).toEqual(synonym);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSynonymTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getSynonymTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getSynonymTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSynonymParams = {
          workspaceId,
          entity,
          value,
          synonym,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getSynonym(getSynonymParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getSynonym({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getSynonym();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSynonym', () => {
    describe('positive tests', () => {
      function __updateSynonymTest() {
        // Construct the params object for operation updateSynonym
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const newSynonym = 'testString';
        const includeAudit = false;
        const updateSynonymParams = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          synonym: synonym,
          newSynonym: newSynonym,
          includeAudit: includeAudit,
        };

        const updateSynonymResult = assistantService.updateSynonym(updateSynonymParams);

        // all methods should return a Promise
        expectToBePromise(updateSynonymResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.synonym).toEqual(newSynonym);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
        expect(mockRequestOptions.path.value).toEqual(value);
        expect(mockRequestOptions.path.synonym).toEqual(synonym);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSynonymTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateSynonymTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateSynonymTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSynonymParams = {
          workspaceId,
          entity,
          value,
          synonym,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateSynonym(updateSynonymParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateSynonym({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateSynonym();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSynonym', () => {
    describe('positive tests', () => {
      function __deleteSynonymTest() {
        // Construct the params object for operation deleteSynonym
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const deleteSynonymParams = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          synonym: synonym,
        };

        const deleteSynonymResult = assistantService.deleteSynonym(deleteSynonymParams);

        // all methods should return a Promise
        expectToBePromise(deleteSynonymResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.entity).toEqual(entity);
        expect(mockRequestOptions.path.value).toEqual(value);
        expect(mockRequestOptions.path.synonym).toEqual(synonym);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSynonymTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteSynonymTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteSynonymTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSynonymParams = {
          workspaceId,
          entity,
          value,
          synonym,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteSynonym(deleteSynonymParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteSynonym({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteSynonym();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDialogNodes', () => {
    describe('positive tests', () => {
      function __listDialogNodesTest() {
        // Construct the params object for operation listDialogNodes
        const workspaceId = 'testString';
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'dialog_node';
        const cursor = 'testString';
        const includeAudit = false;
        const listDialogNodesParams = {
          workspaceId: workspaceId,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listDialogNodesResult = assistantService.listDialogNodes(listDialogNodesParams);

        // all methods should return a Promise
        expectToBePromise(listDialogNodesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/dialog_nodes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.include_count).toEqual(includeCount);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDialogNodesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listDialogNodesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listDialogNodesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDialogNodesParams = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listDialogNodes(listDialogNodesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listDialogNodes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listDialogNodes();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDialogNode', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResponseGenericChannel
      const responseGenericChannelModel = {
        channel: 'chat',
      };

      // DialogNodeOutputGenericDialogNodeOutputResponseTypeAudio
      const dialogNodeOutputGenericModel = {
        response_type: 'audio',
        source: 'testString',
        title: 'testString',
        description: 'testString',
        channels: [responseGenericChannelModel],
        channel_options: { foo: 'bar' },
        alt_text: 'testString',
      };

      // DialogNodeOutputModifiers
      const dialogNodeOutputModifiersModel = {
        overwrite: true,
      };

      // DialogNodeOutput
      const dialogNodeOutputModel = {
        generic: [dialogNodeOutputGenericModel],
        integrations: { 'key1': { 'key1': 'testString' } },
        modifiers: dialogNodeOutputModifiersModel,
        foo: 'testString',
      };

      // DialogNodeContext
      const dialogNodeContextModel = {
        integrations: { 'key1': { 'key1': 'testString' } },
        foo: 'testString',
      };

      // DialogNodeNextStep
      const dialogNodeNextStepModel = {
        behavior: 'get_user_input',
        dialog_node: 'testString',
        selector: 'condition',
      };

      // DialogNodeAction
      const dialogNodeActionModel = {
        name: 'testString',
        type: 'client',
        parameters: { 'key1': 'testString' },
        result_variable: 'testString',
        credentials: 'testString',
      };

      function __createDialogNodeTest() {
        // Construct the params object for operation createDialogNode
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const description = 'testString';
        const conditions = 'testString';
        const parent = 'testString';
        const previousSibling = 'testString';
        const output = dialogNodeOutputModel;
        const context = dialogNodeContextModel;
        const metadata = { 'key1': 'testString' };
        const nextStep = dialogNodeNextStepModel;
        const title = 'testString';
        const type = 'standard';
        const eventName = 'focus';
        const variable = 'testString';
        const actions = [dialogNodeActionModel];
        const digressIn = 'not_available';
        const digressOut = 'allow_returning';
        const digressOutSlots = 'not_allowed';
        const userLabel = 'testString';
        const disambiguationOptOut = false;
        const includeAudit = false;
        const createDialogNodeParams = {
          workspaceId: workspaceId,
          dialogNode: dialogNode,
          description: description,
          conditions: conditions,
          parent: parent,
          previousSibling: previousSibling,
          output: output,
          context: context,
          metadata: metadata,
          nextStep: nextStep,
          title: title,
          type: type,
          eventName: eventName,
          variable: variable,
          actions: actions,
          digressIn: digressIn,
          digressOut: digressOut,
          digressOutSlots: digressOutSlots,
          userLabel: userLabel,
          disambiguationOptOut: disambiguationOptOut,
          includeAudit: includeAudit,
        };

        const createDialogNodeResult = assistantService.createDialogNode(createDialogNodeParams);

        // all methods should return a Promise
        expectToBePromise(createDialogNodeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/dialog_nodes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.dialog_node).toEqual(dialogNode);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.conditions).toEqual(conditions);
        expect(mockRequestOptions.body.parent).toEqual(parent);
        expect(mockRequestOptions.body.previous_sibling).toEqual(previousSibling);
        expect(mockRequestOptions.body.output).toEqual(output);
        expect(mockRequestOptions.body.context).toEqual(context);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.next_step).toEqual(nextStep);
        expect(mockRequestOptions.body.title).toEqual(title);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.event_name).toEqual(eventName);
        expect(mockRequestOptions.body.variable).toEqual(variable);
        expect(mockRequestOptions.body.actions).toEqual(actions);
        expect(mockRequestOptions.body.digress_in).toEqual(digressIn);
        expect(mockRequestOptions.body.digress_out).toEqual(digressOut);
        expect(mockRequestOptions.body.digress_out_slots).toEqual(digressOutSlots);
        expect(mockRequestOptions.body.user_label).toEqual(userLabel);
        expect(mockRequestOptions.body.disambiguation_opt_out).toEqual(disambiguationOptOut);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDialogNodeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __createDialogNodeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __createDialogNodeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDialogNodeParams = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createDialogNode(createDialogNodeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.createDialogNode({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.createDialogNode();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDialogNode', () => {
    describe('positive tests', () => {
      function __getDialogNodeTest() {
        // Construct the params object for operation getDialogNode
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const includeAudit = false;
        const getDialogNodeParams = {
          workspaceId: workspaceId,
          dialogNode: dialogNode,
          includeAudit: includeAudit,
        };

        const getDialogNodeResult = assistantService.getDialogNode(getDialogNodeParams);

        // all methods should return a Promise
        expectToBePromise(getDialogNodeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.dialog_node).toEqual(dialogNode);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDialogNodeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __getDialogNodeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __getDialogNodeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDialogNodeParams = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getDialogNode(getDialogNodeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.getDialogNode({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.getDialogNode();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDialogNode', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResponseGenericChannel
      const responseGenericChannelModel = {
        channel: 'chat',
      };

      // DialogNodeOutputGenericDialogNodeOutputResponseTypeAudio
      const dialogNodeOutputGenericModel = {
        response_type: 'audio',
        source: 'testString',
        title: 'testString',
        description: 'testString',
        channels: [responseGenericChannelModel],
        channel_options: { foo: 'bar' },
        alt_text: 'testString',
      };

      // DialogNodeOutputModifiers
      const dialogNodeOutputModifiersModel = {
        overwrite: true,
      };

      // DialogNodeOutput
      const dialogNodeOutputModel = {
        generic: [dialogNodeOutputGenericModel],
        integrations: { 'key1': { 'key1': 'testString' } },
        modifiers: dialogNodeOutputModifiersModel,
        foo: 'testString',
      };

      // DialogNodeContext
      const dialogNodeContextModel = {
        integrations: { 'key1': { 'key1': 'testString' } },
        foo: 'testString',
      };

      // DialogNodeNextStep
      const dialogNodeNextStepModel = {
        behavior: 'get_user_input',
        dialog_node: 'testString',
        selector: 'condition',
      };

      // DialogNodeAction
      const dialogNodeActionModel = {
        name: 'testString',
        type: 'client',
        parameters: { 'key1': 'testString' },
        result_variable: 'testString',
        credentials: 'testString',
      };

      function __updateDialogNodeTest() {
        // Construct the params object for operation updateDialogNode
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const newDialogNode = 'testString';
        const newDescription = 'testString';
        const newConditions = 'testString';
        const newParent = 'testString';
        const newPreviousSibling = 'testString';
        const newOutput = dialogNodeOutputModel;
        const newContext = dialogNodeContextModel;
        const newMetadata = { 'key1': 'testString' };
        const newNextStep = dialogNodeNextStepModel;
        const newTitle = 'testString';
        const newType = 'standard';
        const newEventName = 'focus';
        const newVariable = 'testString';
        const newActions = [dialogNodeActionModel];
        const newDigressIn = 'not_available';
        const newDigressOut = 'allow_returning';
        const newDigressOutSlots = 'not_allowed';
        const newUserLabel = 'testString';
        const newDisambiguationOptOut = false;
        const includeAudit = false;
        const updateDialogNodeParams = {
          workspaceId: workspaceId,
          dialogNode: dialogNode,
          newDialogNode: newDialogNode,
          newDescription: newDescription,
          newConditions: newConditions,
          newParent: newParent,
          newPreviousSibling: newPreviousSibling,
          newOutput: newOutput,
          newContext: newContext,
          newMetadata: newMetadata,
          newNextStep: newNextStep,
          newTitle: newTitle,
          newType: newType,
          newEventName: newEventName,
          newVariable: newVariable,
          newActions: newActions,
          newDigressIn: newDigressIn,
          newDigressOut: newDigressOut,
          newDigressOutSlots: newDigressOutSlots,
          newUserLabel: newUserLabel,
          newDisambiguationOptOut: newDisambiguationOptOut,
          includeAudit: includeAudit,
        };

        const updateDialogNodeResult = assistantService.updateDialogNode(updateDialogNodeParams);

        // all methods should return a Promise
        expectToBePromise(updateDialogNodeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.dialog_node).toEqual(newDialogNode);
        expect(mockRequestOptions.body.description).toEqual(newDescription);
        expect(mockRequestOptions.body.conditions).toEqual(newConditions);
        expect(mockRequestOptions.body.parent).toEqual(newParent);
        expect(mockRequestOptions.body.previous_sibling).toEqual(newPreviousSibling);
        expect(mockRequestOptions.body.output).toEqual(newOutput);
        expect(mockRequestOptions.body.context).toEqual(newContext);
        expect(mockRequestOptions.body.metadata).toEqual(newMetadata);
        expect(mockRequestOptions.body.next_step).toEqual(newNextStep);
        expect(mockRequestOptions.body.title).toEqual(newTitle);
        expect(mockRequestOptions.body.type).toEqual(newType);
        expect(mockRequestOptions.body.event_name).toEqual(newEventName);
        expect(mockRequestOptions.body.variable).toEqual(newVariable);
        expect(mockRequestOptions.body.actions).toEqual(newActions);
        expect(mockRequestOptions.body.digress_in).toEqual(newDigressIn);
        expect(mockRequestOptions.body.digress_out).toEqual(newDigressOut);
        expect(mockRequestOptions.body.digress_out_slots).toEqual(newDigressOutSlots);
        expect(mockRequestOptions.body.user_label).toEqual(newUserLabel);
        expect(mockRequestOptions.body.disambiguation_opt_out).toEqual(newDisambiguationOptOut);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.include_audit).toEqual(includeAudit);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.dialog_node).toEqual(dialogNode);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDialogNodeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __updateDialogNodeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __updateDialogNodeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDialogNodeParams = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateDialogNode(updateDialogNodeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.updateDialogNode({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.updateDialogNode();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDialogNode', () => {
    describe('positive tests', () => {
      function __deleteDialogNodeTest() {
        // Construct the params object for operation deleteDialogNode
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const deleteDialogNodeParams = {
          workspaceId: workspaceId,
          dialogNode: dialogNode,
        };

        const deleteDialogNodeResult = assistantService.deleteDialogNode(deleteDialogNodeParams);

        // all methods should return a Promise
        expectToBePromise(deleteDialogNodeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
        expect(mockRequestOptions.path.dialog_node).toEqual(dialogNode);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDialogNodeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __deleteDialogNodeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __deleteDialogNodeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDialogNodeParams = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteDialogNode(deleteDialogNodeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.deleteDialogNode({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.deleteDialogNode();
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
        const workspaceId = 'testString';
        const sort = 'testString';
        const filter = 'testString';
        const pageLimit = 38;
        const cursor = 'testString';
        const listLogsParams = {
          workspaceId: workspaceId,
          sort: sort,
          filter: filter,
          pageLimit: pageLimit,
          cursor: cursor,
        };

        const listLogsResult = assistantService.listLogs(listLogsParams);

        // all methods should return a Promise
        expectToBePromise(listLogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/workspaces/{workspace_id}/logs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.path.workspace_id).toEqual(workspaceId);
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
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLogsParams = {
          workspaceId,
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

  describe('listAllLogs', () => {
    describe('positive tests', () => {
      function __listAllLogsTest() {
        // Construct the params object for operation listAllLogs
        const filter = 'testString';
        const sort = 'testString';
        const pageLimit = 38;
        const cursor = 'testString';
        const listAllLogsParams = {
          filter: filter,
          sort: sort,
          pageLimit: pageLimit,
          cursor: cursor,
        };

        const listAllLogsResult = assistantService.listAllLogs(listAllLogsParams);

        // all methods should return a Promise
        expectToBePromise(listAllLogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/logs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.page_limit).toEqual(pageLimit);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAllLogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        assistantService.enableRetries();
        __listAllLogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        assistantService.disableRetries();
        __listAllLogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const filter = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAllLogsParams = {
          filter,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listAllLogs(listAllLogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await assistantService.listAllLogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await assistantService.listAllLogs();
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
          customerId: customerId,
        };

        const deleteUserDataResult = assistantService.deleteUserData(deleteUserDataParams);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/user_data', 'DELETE');
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
});
