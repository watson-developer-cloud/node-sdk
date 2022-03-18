/**
 * (C) Copyright IBM Corp. 2022.
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

describe('AssistantV1', () => {
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

      test('should pass the right params to createRequest', () => {
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
        const params = {
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

        const messageResult = assistantService.message(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
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
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.message({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const messagePromise = assistantService.message();
        expectToBePromise(messagePromise);

        messagePromise.catch((err) => {
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
        const workspaceId = 'testString';
        const input = [bulkClassifyUtteranceModel];
        const params = {
          workspaceId: workspaceId,
          input: input,
        };

        const bulkClassifyResult = assistantService.bulkClassify(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
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
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.bulkClassify({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const bulkClassifyPromise = assistantService.bulkClassify();
        expectToBePromise(bulkClassifyPromise);

        bulkClassifyPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listWorkspaces', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listWorkspaces
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'name';
        const cursor = 'testString';
        const includeAudit = false;
        const params = {
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listWorkspacesResult = assistantService.listWorkspaces(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listWorkspaces(params);
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

      // WorkspaceSystemSettings
      const workspaceSystemSettingsModel = {
        tooling: workspaceSystemSettingsToolingModel,
        disambiguation: workspaceSystemSettingsDisambiguationModel,
        human_agent_assist: { 'key1': 'testString' },
        spelling_suggestions: false,
        spelling_auto_correct: false,
        system_entities: workspaceSystemSettingsSystemEntitiesModel,
        off_topic: workspaceSystemSettingsOffTopicModel,
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

      test('should pass the right params to createRequest', () => {
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
        const params = {
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

        const createWorkspaceResult = assistantService.createWorkspace(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createWorkspace(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getWorkspace
        const workspaceId = 'testString';
        const _export = false;
        const includeAudit = false;
        const sort = 'stable';
        const params = {
          workspaceId: workspaceId,
          _export: _export,
          includeAudit: includeAudit,
          sort: sort,
        };

        const getWorkspaceResult = assistantService.getWorkspace(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getWorkspace(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.getWorkspace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getWorkspacePromise = assistantService.getWorkspace();
        expectToBePromise(getWorkspacePromise);

        getWorkspacePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      // WorkspaceSystemSettings
      const workspaceSystemSettingsModel = {
        tooling: workspaceSystemSettingsToolingModel,
        disambiguation: workspaceSystemSettingsDisambiguationModel,
        human_agent_assist: { 'key1': 'testString' },
        spelling_suggestions: false,
        spelling_auto_correct: false,
        system_entities: workspaceSystemSettingsSystemEntitiesModel,
        off_topic: workspaceSystemSettingsOffTopicModel,
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

      test('should pass the right params to createRequest', () => {
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
        const params = {
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

        const updateWorkspaceResult = assistantService.updateWorkspace(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateWorkspace(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.updateWorkspace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateWorkspacePromise = assistantService.updateWorkspace();
        expectToBePromise(updateWorkspacePromise);

        updateWorkspacePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteWorkspace', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteWorkspace
        const workspaceId = 'testString';
        const params = {
          workspaceId: workspaceId,
        };

        const deleteWorkspaceResult = assistantService.deleteWorkspace(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteWorkspace(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.deleteWorkspace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteWorkspacePromise = assistantService.deleteWorkspace();
        expectToBePromise(deleteWorkspacePromise);

        deleteWorkspacePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listIntents', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listIntents
        const workspaceId = 'testString';
        const _export = false;
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'intent';
        const cursor = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          _export: _export,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listIntentsResult = assistantService.listIntents(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listIntents(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.listIntents({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listIntentsPromise = assistantService.listIntents();
        expectToBePromise(listIntentsPromise);

        listIntentsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createIntent
        const workspaceId = 'testString';
        const intent = 'testString';
        const description = 'testString';
        const examples = [exampleModel];
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          intent: intent,
          description: description,
          examples: examples,
          includeAudit: includeAudit,
        };

        const createIntentResult = assistantService.createIntent(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createIntent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.createIntent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createIntentPromise = assistantService.createIntent();
        expectToBePromise(createIntentPromise);

        createIntentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getIntent', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getIntent
        const workspaceId = 'testString';
        const intent = 'testString';
        const _export = false;
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          intent: intent,
          _export: _export,
          includeAudit: includeAudit,
        };

        const getIntentResult = assistantService.getIntent(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getIntent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.getIntent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getIntentPromise = assistantService.getIntent();
        expectToBePromise(getIntentPromise);

        getIntentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateIntent
        const workspaceId = 'testString';
        const intent = 'testString';
        const newIntent = 'testString';
        const newDescription = 'testString';
        const newExamples = [exampleModel];
        const append = false;
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          intent: intent,
          newIntent: newIntent,
          newDescription: newDescription,
          newExamples: newExamples,
          append: append,
          includeAudit: includeAudit,
        };

        const updateIntentResult = assistantService.updateIntent(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateIntent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.updateIntent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateIntentPromise = assistantService.updateIntent();
        expectToBePromise(updateIntentPromise);

        updateIntentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteIntent', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteIntent
        const workspaceId = 'testString';
        const intent = 'testString';
        const params = {
          workspaceId: workspaceId,
          intent: intent,
        };

        const deleteIntentResult = assistantService.deleteIntent(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteIntent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.deleteIntent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteIntentPromise = assistantService.deleteIntent();
        expectToBePromise(deleteIntentPromise);

        deleteIntentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listExamples', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listExamples
        const workspaceId = 'testString';
        const intent = 'testString';
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'text';
        const cursor = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          intent: intent,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listExamplesResult = assistantService.listExamples(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listExamples(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.listExamples({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listExamplesPromise = assistantService.listExamples();
        expectToBePromise(listExamplesPromise);

        listExamplesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createExample
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const mentions = [mentionModel];
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          intent: intent,
          text: text,
          mentions: mentions,
          includeAudit: includeAudit,
        };

        const createExampleResult = assistantService.createExample(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.createExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createExamplePromise = assistantService.createExample();
        expectToBePromise(createExamplePromise);

        createExamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getExample', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getExample
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          intent: intent,
          text: text,
          includeAudit: includeAudit,
        };

        const getExampleResult = assistantService.getExample(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.getExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getExamplePromise = assistantService.getExample();
        expectToBePromise(getExamplePromise);

        getExamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateExample
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const newText = 'testString';
        const newMentions = [mentionModel];
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          intent: intent,
          text: text,
          newText: newText,
          newMentions: newMentions,
          includeAudit: includeAudit,
        };

        const updateExampleResult = assistantService.updateExample(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.updateExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateExamplePromise = assistantService.updateExample();
        expectToBePromise(updateExamplePromise);

        updateExamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteExample', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteExample
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const params = {
          workspaceId: workspaceId,
          intent: intent,
          text: text,
        };

        const deleteExampleResult = assistantService.deleteExample(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const intent = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.deleteExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteExamplePromise = assistantService.deleteExample();
        expectToBePromise(deleteExamplePromise);

        deleteExamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listCounterexamples', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCounterexamples
        const workspaceId = 'testString';
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'text';
        const cursor = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listCounterexamplesResult = assistantService.listCounterexamples(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listCounterexamples(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.listCounterexamples({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listCounterexamplesPromise = assistantService.listCounterexamples();
        expectToBePromise(listCounterexamplesPromise);

        listCounterexamplesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createCounterexample', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createCounterexample
        const workspaceId = 'testString';
        const text = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          text: text,
          includeAudit: includeAudit,
        };

        const createCounterexampleResult = assistantService.createCounterexample(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createCounterexample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.createCounterexample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createCounterexamplePromise = assistantService.createCounterexample();
        expectToBePromise(createCounterexamplePromise);

        createCounterexamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCounterexample', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCounterexample
        const workspaceId = 'testString';
        const text = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          text: text,
          includeAudit: includeAudit,
        };

        const getCounterexampleResult = assistantService.getCounterexample(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getCounterexample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.getCounterexample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getCounterexamplePromise = assistantService.getCounterexample();
        expectToBePromise(getCounterexamplePromise);

        getCounterexamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateCounterexample', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateCounterexample
        const workspaceId = 'testString';
        const text = 'testString';
        const newText = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          text: text,
          newText: newText,
          includeAudit: includeAudit,
        };

        const updateCounterexampleResult = assistantService.updateCounterexample(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateCounterexample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.updateCounterexample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateCounterexamplePromise = assistantService.updateCounterexample();
        expectToBePromise(updateCounterexamplePromise);

        updateCounterexamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCounterexample', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCounterexample
        const workspaceId = 'testString';
        const text = 'testString';
        const params = {
          workspaceId: workspaceId,
          text: text,
        };

        const deleteCounterexampleResult = assistantService.deleteCounterexample(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteCounterexample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.deleteCounterexample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteCounterexamplePromise = assistantService.deleteCounterexample();
        expectToBePromise(deleteCounterexamplePromise);

        deleteCounterexamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listEntities', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listEntities
        const workspaceId = 'testString';
        const _export = false;
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'entity';
        const cursor = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          _export: _export,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listEntitiesResult = assistantService.listEntities(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listEntities(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.listEntities({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listEntitiesPromise = assistantService.listEntities();
        expectToBePromise(listEntitiesPromise);

        listEntitiesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createEntity
        const workspaceId = 'testString';
        const entity = 'testString';
        const description = 'testString';
        const metadata = { 'key1': 'testString' };
        const fuzzyMatch = true;
        const values = [createValueModel];
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          description: description,
          metadata: metadata,
          fuzzyMatch: fuzzyMatch,
          values: values,
          includeAudit: includeAudit,
        };

        const createEntityResult = assistantService.createEntity(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createEntity(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.createEntity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createEntityPromise = assistantService.createEntity();
        expectToBePromise(createEntityPromise);

        createEntityPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getEntity', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getEntity
        const workspaceId = 'testString';
        const entity = 'testString';
        const _export = false;
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          _export: _export,
          includeAudit: includeAudit,
        };

        const getEntityResult = assistantService.getEntity(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getEntity(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.getEntity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getEntityPromise = assistantService.getEntity();
        expectToBePromise(getEntityPromise);

        getEntityPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
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
        const params = {
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

        const updateEntityResult = assistantService.updateEntity(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateEntity(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.updateEntity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateEntityPromise = assistantService.updateEntity();
        expectToBePromise(updateEntityPromise);

        updateEntityPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteEntity', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteEntity
        const workspaceId = 'testString';
        const entity = 'testString';
        const params = {
          workspaceId: workspaceId,
          entity: entity,
        };

        const deleteEntityResult = assistantService.deleteEntity(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteEntity(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.deleteEntity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteEntityPromise = assistantService.deleteEntity();
        expectToBePromise(deleteEntityPromise);

        deleteEntityPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listMentions', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listMentions
        const workspaceId = 'testString';
        const entity = 'testString';
        const _export = false;
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          _export: _export,
          includeAudit: includeAudit,
        };

        const listMentionsResult = assistantService.listMentions(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listMentions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.listMentions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listMentionsPromise = assistantService.listMentions();
        expectToBePromise(listMentionsPromise);

        listMentionsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listValues', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listValues
        const workspaceId = 'testString';
        const entity = 'testString';
        const _export = false;
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'value';
        const cursor = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          _export: _export,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listValuesResult = assistantService.listValues(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listValues(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.listValues({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listValuesPromise = assistantService.listValues();
        expectToBePromise(listValuesPromise);

        listValuesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createValue', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createValue
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const metadata = { 'key1': 'testString' };
        const type = 'synonyms';
        const synonyms = ['testString'];
        const patterns = ['testString'];
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          metadata: metadata,
          type: type,
          synonyms: synonyms,
          patterns: patterns,
          includeAudit: includeAudit,
        };

        const createValueResult = assistantService.createValue(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createValue(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.createValue({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createValuePromise = assistantService.createValue();
        expectToBePromise(createValuePromise);

        createValuePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getValue', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getValue
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const _export = false;
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          _export: _export,
          includeAudit: includeAudit,
        };

        const getValueResult = assistantService.getValue(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getValue(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.getValue({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getValuePromise = assistantService.getValue();
        expectToBePromise(getValuePromise);

        getValuePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateValue', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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
        const params = {
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

        const updateValueResult = assistantService.updateValue(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateValue(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.updateValue({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateValuePromise = assistantService.updateValue();
        expectToBePromise(updateValuePromise);

        updateValuePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteValue', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteValue
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
        };

        const deleteValueResult = assistantService.deleteValue(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteValue(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.deleteValue({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteValuePromise = assistantService.deleteValue();
        expectToBePromise(deleteValuePromise);

        deleteValuePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSynonyms', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSynonyms
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'synonym';
        const cursor = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listSynonymsResult = assistantService.listSynonyms(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listSynonyms(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.listSynonyms({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listSynonymsPromise = assistantService.listSynonyms();
        expectToBePromise(listSynonymsPromise);

        listSynonymsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createSynonym', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSynonym
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          synonym: synonym,
          includeAudit: includeAudit,
        };

        const createSynonymResult = assistantService.createSynonym(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createSynonym(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.createSynonym({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createSynonymPromise = assistantService.createSynonym();
        expectToBePromise(createSynonymPromise);

        createSynonymPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSynonym', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSynonym
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          synonym: synonym,
          includeAudit: includeAudit,
        };

        const getSynonymResult = assistantService.getSynonym(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getSynonym(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.getSynonym({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSynonymPromise = assistantService.getSynonym();
        expectToBePromise(getSynonymPromise);

        getSynonymPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSynonym', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSynonym
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const newSynonym = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          synonym: synonym,
          newSynonym: newSynonym,
          includeAudit: includeAudit,
        };

        const updateSynonymResult = assistantService.updateSynonym(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateSynonym(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.updateSynonym({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateSynonymPromise = assistantService.updateSynonym();
        expectToBePromise(updateSynonymPromise);

        updateSynonymPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSynonym', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSynonym
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const params = {
          workspaceId: workspaceId,
          entity: entity,
          value: value,
          synonym: synonym,
        };

        const deleteSynonymResult = assistantService.deleteSynonym(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const entity = 'testString';
        const value = 'testString';
        const synonym = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteSynonym(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.deleteSynonym({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteSynonymPromise = assistantService.deleteSynonym();
        expectToBePromise(deleteSynonymPromise);

        deleteSynonymPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listDialogNodes', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listDialogNodes
        const workspaceId = 'testString';
        const pageLimit = 38;
        const includeCount = false;
        const sort = 'dialog_node';
        const cursor = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          pageLimit: pageLimit,
          includeCount: includeCount,
          sort: sort,
          cursor: cursor,
          includeAudit: includeAudit,
        };

        const listDialogNodesResult = assistantService.listDialogNodes(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listDialogNodes(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.listDialogNodes({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listDialogNodesPromise = assistantService.listDialogNodes();
        expectToBePromise(listDialogNodesPromise);

        listDialogNodesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
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
        const params = {
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

        const createDialogNodeResult = assistantService.createDialogNode(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.createDialogNode(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.createDialogNode({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createDialogNodePromise = assistantService.createDialogNode();
        expectToBePromise(createDialogNodePromise);

        createDialogNodePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDialogNode', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDialogNode
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const includeAudit = false;
        const params = {
          workspaceId: workspaceId,
          dialogNode: dialogNode,
          includeAudit: includeAudit,
        };

        const getDialogNodeResult = assistantService.getDialogNode(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.getDialogNode(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.getDialogNode({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDialogNodePromise = assistantService.getDialogNode();
        expectToBePromise(getDialogNodePromise);

        getDialogNodePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
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
        const params = {
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

        const updateDialogNodeResult = assistantService.updateDialogNode(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.updateDialogNode(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.updateDialogNode({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateDialogNodePromise = assistantService.updateDialogNode();
        expectToBePromise(updateDialogNodePromise);

        updateDialogNodePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDialogNode', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteDialogNode
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const params = {
          workspaceId: workspaceId,
          dialogNode: dialogNode,
        };

        const deleteDialogNodeResult = assistantService.deleteDialogNode(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const dialogNode = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.deleteDialogNode(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.deleteDialogNode({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteDialogNodePromise = assistantService.deleteDialogNode();
        expectToBePromise(deleteDialogNodePromise);

        deleteDialogNodePromise.catch((err) => {
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
        const workspaceId = 'testString';
        const sort = 'testString';
        const filter = 'testString';
        const pageLimit = 38;
        const cursor = 'testString';
        const params = {
          workspaceId: workspaceId,
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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          workspaceId,
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
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.listLogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listLogsPromise = assistantService.listLogs();
        expectToBePromise(listLogsPromise);

        listLogsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listAllLogs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllLogs
        const filter = 'testString';
        const sort = 'testString';
        const pageLimit = 38;
        const cursor = 'testString';
        const params = {
          filter: filter,
          sort: sort,
          pageLimit: pageLimit,
          cursor: cursor,
        };

        const listAllLogsResult = assistantService.listAllLogs(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const filter = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          filter,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistantService.listAllLogs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.listAllLogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listAllLogsPromise = assistantService.listAllLogs();
        expectToBePromise(listAllLogsPromise);

        listAllLogsPromise.catch((err) => {
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

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/user_data', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(assistantServiceOptions.version);
        expect(mockRequestOptions.qs.customer_id).toEqual(customerId);
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
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await assistantService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteUserDataPromise = assistantService.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
