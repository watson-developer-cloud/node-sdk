/**
 * (C) Copyright IBM Corp. 2019.
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

const helper = require('ibm-cloud-sdk-core'); // for mocking `getMissingParams`
const { NoAuthAuthenticator } = require('ibm-cloud-sdk-core');
const AssistantV1 = require('../../assistant/v1');
const utils = require('../resources/unitTestUtils');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  missingParamsSuccess,
  expectToBePromise,
  missingParamsError,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  checkDefaultSuccessArgs,
} = utils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://gateway.watsonplatform.net/assistant/api/assistant/api',
  version: '2018-10-18',
};

const assistant = new AssistantV1(service);
const createRequestMock = jest.spyOn(assistant, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
  missingParamsMock.mockClear();
});

describe('AssistantV1', () => {
  describe('message', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const input = 'fake_input';
        const intents = 'fake_intents';
        const entities = 'fake_entities';
        const alternateIntents = 'fake_alternateIntents';
        const context = 'fake_context';
        const output = 'fake_output';
        const nodesVisitedDetails = 'fake_nodesVisitedDetails';
        const params = {
          workspaceId,
          input,
          intents,
          entities,
          alternateIntents,
          context,
          output,
          nodesVisitedDetails,
        };

        assistant.message(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/message', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['input']).toEqual(input);
        expect(options.body['intents']).toEqual(intents);
        expect(options.body['entities']).toEqual(entities);
        expect(options.body['alternate_intents']).toEqual(alternateIntents);
        expect(options.body['context']).toEqual(context);
        expect(options.body['output']).toEqual(output);
        expect(options.qs['nodes_visited_details']).toEqual(nodesVisitedDetails);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.message(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const params = {
          workspaceId,
        };

        // invoke method
        const messagePromise = assistant.message(params);
        expectToBePromise(messagePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.message(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        let err;
        try {
          await assistant.message({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        const messagePromise = assistant.message();
        expectToBePromise(messagePromise);

        messagePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listWorkspaces', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const pageLimit = 'fake_pageLimit';
        const sort = 'fake_sort';
        const cursor = 'fake_cursor';
        const includeAudit = 'fake_includeAudit';
        const params = {
          pageLimit,
          sort,
          cursor,
          includeAudit,
        };

        assistant.listWorkspaces(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.qs['include_audit']).toEqual(includeAudit);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listWorkspaces(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const params = {};

        // invoke method
        const listWorkspacesPromise = assistant.listWorkspaces(params);
        expectToBePromise(listWorkspacesPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        assistant.listWorkspaces({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await assistant.listWorkspaces(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('createWorkspace', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const name = 'fake_name';
        const description = 'fake_description';
        const language = 'fake_language';
        const metadata = 'fake_metadata';
        const learningOptOut = 'fake_learningOptOut';
        const systemSettings = 'fake_systemSettings';
        const intents = 'fake_intents';
        const entities = 'fake_entities';
        const dialogNodes = 'fake_dialogNodes';
        const counterexamples = 'fake_counterexamples';
        const params = {
          name,
          description,
          language,
          metadata,
          learningOptOut,
          systemSettings,
          intents,
          entities,
          dialogNodes,
          counterexamples,
        };

        assistant.createWorkspace(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['language']).toEqual(language);
        expect(options.body['metadata']).toEqual(metadata);
        expect(options.body['learning_opt_out']).toEqual(learningOptOut);
        expect(options.body['system_settings']).toEqual(systemSettings);
        expect(options.body['intents']).toEqual(intents);
        expect(options.body['entities']).toEqual(entities);
        expect(options.body['dialog_nodes']).toEqual(dialogNodes);
        expect(options.body['counterexamples']).toEqual(counterexamples);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.createWorkspace(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const params = {};

        // invoke method
        const createWorkspacePromise = assistant.createWorkspace(params);
        expectToBePromise(createWorkspacePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        assistant.createWorkspace({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await assistant.createWorkspace(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getWorkspace', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const _export = 'fake__export';
        const includeAudit = 'fake_includeAudit';
        const sort = 'fake_sort';
        const params = {
          workspaceId,
          _export,
          includeAudit,
          sort,
        };

        assistant.getWorkspace(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['export']).toEqual(_export);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.getWorkspace(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const params = {
          workspaceId,
        };

        // invoke method
        const getWorkspacePromise = assistant.getWorkspace(params);
        expectToBePromise(getWorkspacePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.getWorkspace(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        let err;
        try {
          await assistant.getWorkspace({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        const getWorkspacePromise = assistant.getWorkspace();
        expectToBePromise(getWorkspacePromise);

        getWorkspacePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateWorkspace', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const name = 'fake_name';
        const description = 'fake_description';
        const language = 'fake_language';
        const metadata = 'fake_metadata';
        const learningOptOut = 'fake_learningOptOut';
        const systemSettings = 'fake_systemSettings';
        const intents = 'fake_intents';
        const entities = 'fake_entities';
        const dialogNodes = 'fake_dialogNodes';
        const counterexamples = 'fake_counterexamples';
        const append = 'fake_append';
        const params = {
          workspaceId,
          name,
          description,
          language,
          metadata,
          learningOptOut,
          systemSettings,
          intents,
          entities,
          dialogNodes,
          counterexamples,
          append,
        };

        assistant.updateWorkspace(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['language']).toEqual(language);
        expect(options.body['metadata']).toEqual(metadata);
        expect(options.body['learning_opt_out']).toEqual(learningOptOut);
        expect(options.body['system_settings']).toEqual(systemSettings);
        expect(options.body['intents']).toEqual(intents);
        expect(options.body['entities']).toEqual(entities);
        expect(options.body['dialog_nodes']).toEqual(dialogNodes);
        expect(options.body['counterexamples']).toEqual(counterexamples);
        expect(options.qs['append']).toEqual(append);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.updateWorkspace(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const params = {
          workspaceId,
        };

        // invoke method
        const updateWorkspacePromise = assistant.updateWorkspace(params);
        expectToBePromise(updateWorkspacePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.updateWorkspace(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        let err;
        try {
          await assistant.updateWorkspace({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        const updateWorkspacePromise = assistant.updateWorkspace();
        expectToBePromise(updateWorkspacePromise);

        updateWorkspacePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteWorkspace', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const params = {
          workspaceId,
        };

        assistant.deleteWorkspace(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.deleteWorkspace(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const params = {
          workspaceId,
        };

        // invoke method
        const deleteWorkspacePromise = assistant.deleteWorkspace(params);
        expectToBePromise(deleteWorkspacePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.deleteWorkspace(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        let err;
        try {
          await assistant.deleteWorkspace({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        const deleteWorkspacePromise = assistant.deleteWorkspace();
        expectToBePromise(deleteWorkspacePromise);

        deleteWorkspacePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listIntents', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const _export = 'fake__export';
        const pageLimit = 'fake_pageLimit';
        const sort = 'fake_sort';
        const cursor = 'fake_cursor';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          _export,
          pageLimit,
          sort,
          cursor,
          includeAudit,
        };

        assistant.listIntents(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['export']).toEqual(_export);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listIntents(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const params = {
          workspaceId,
        };

        // invoke method
        const listIntentsPromise = assistant.listIntents(params);
        expectToBePromise(listIntentsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.listIntents(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        let err;
        try {
          await assistant.listIntents({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        const listIntentsPromise = assistant.listIntents();
        expectToBePromise(listIntentsPromise);

        listIntentsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createIntent', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const description = 'fake_description';
        const examples = 'fake_examples';
        const params = {
          workspaceId,
          intent,
          description,
          examples,
        };

        assistant.createIntent(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['intent']).toEqual(intent);
        expect(options.body['description']).toEqual(description);
        expect(options.body['examples']).toEqual(examples);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.createIntent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const params = {
          workspaceId,
          intent,
        };

        // invoke method
        const createIntentPromise = assistant.createIntent(params);
        expectToBePromise(createIntentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.createIntent(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent'];

        let err;
        try {
          await assistant.createIntent({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent'];

        const createIntentPromise = assistant.createIntent();
        expectToBePromise(createIntentPromise);

        createIntentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getIntent', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const _export = 'fake__export';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          intent,
          _export,
          includeAudit,
        };

        assistant.getIntent(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents/{intent}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['export']).toEqual(_export);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['intent']).toEqual(intent);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.getIntent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const params = {
          workspaceId,
          intent,
        };

        // invoke method
        const getIntentPromise = assistant.getIntent(params);
        expectToBePromise(getIntentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.getIntent(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent'];

        let err;
        try {
          await assistant.getIntent({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent'];

        const getIntentPromise = assistant.getIntent();
        expectToBePromise(getIntentPromise);

        getIntentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateIntent', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const newIntent = 'fake_newIntent';
        const newDescription = 'fake_newDescription';
        const newExamples = 'fake_newExamples';
        const params = {
          workspaceId,
          intent,
          newIntent,
          newDescription,
          newExamples,
        };

        assistant.updateIntent(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents/{intent}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['intent']).toEqual(newIntent);
        expect(options.body['description']).toEqual(newDescription);
        expect(options.body['examples']).toEqual(newExamples);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['intent']).toEqual(intent);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.updateIntent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const params = {
          workspaceId,
          intent,
        };

        // invoke method
        const updateIntentPromise = assistant.updateIntent(params);
        expectToBePromise(updateIntentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.updateIntent(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent'];

        let err;
        try {
          await assistant.updateIntent({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent'];

        const updateIntentPromise = assistant.updateIntent();
        expectToBePromise(updateIntentPromise);

        updateIntentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteIntent', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const params = {
          workspaceId,
          intent,
        };

        assistant.deleteIntent(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents/{intent}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['intent']).toEqual(intent);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.deleteIntent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const params = {
          workspaceId,
          intent,
        };

        // invoke method
        const deleteIntentPromise = assistant.deleteIntent(params);
        expectToBePromise(deleteIntentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.deleteIntent(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent'];

        let err;
        try {
          await assistant.deleteIntent({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent'];

        const deleteIntentPromise = assistant.deleteIntent();
        expectToBePromise(deleteIntentPromise);

        deleteIntentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listExamples', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const pageLimit = 'fake_pageLimit';
        const sort = 'fake_sort';
        const cursor = 'fake_cursor';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          intent,
          pageLimit,
          sort,
          cursor,
          includeAudit,
        };

        assistant.listExamples(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['intent']).toEqual(intent);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          intent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listExamples(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const params = {
          workspaceId,
          intent,
        };

        // invoke method
        const listExamplesPromise = assistant.listExamples(params);
        expectToBePromise(listExamplesPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.listExamples(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent'];

        let err;
        try {
          await assistant.listExamples({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent'];

        const listExamplesPromise = assistant.listExamples();
        expectToBePromise(listExamplesPromise);

        listExamplesPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createExample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const mentions = 'fake_mentions';
        const params = {
          workspaceId,
          intent,
          text,
          mentions,
        };

        assistant.createExample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['text']).toEqual(text);
        expect(options.body['mentions']).toEqual(mentions);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['intent']).toEqual(intent);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.createExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const params = {
          workspaceId,
          intent,
          text,
        };

        // invoke method
        const createExamplePromise = assistant.createExample(params);
        expectToBePromise(createExamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.createExample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent', 'text'];

        let err;
        try {
          await assistant.createExample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent', 'text'];

        const createExamplePromise = assistant.createExample();
        expectToBePromise(createExamplePromise);

        createExamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getExample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          intent,
          text,
          includeAudit,
        };

        assistant.getExample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['intent']).toEqual(intent);
        expect(options.path['text']).toEqual(text);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.getExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const params = {
          workspaceId,
          intent,
          text,
        };

        // invoke method
        const getExamplePromise = assistant.getExample(params);
        expectToBePromise(getExamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.getExample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent', 'text'];

        let err;
        try {
          await assistant.getExample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent', 'text'];

        const getExamplePromise = assistant.getExample();
        expectToBePromise(getExamplePromise);

        getExamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateExample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const newText = 'fake_newText';
        const newMentions = 'fake_newMentions';
        const params = {
          workspaceId,
          intent,
          text,
          newText,
          newMentions,
        };

        assistant.updateExample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['text']).toEqual(newText);
        expect(options.body['mentions']).toEqual(newMentions);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['intent']).toEqual(intent);
        expect(options.path['text']).toEqual(text);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.updateExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const params = {
          workspaceId,
          intent,
          text,
        };

        // invoke method
        const updateExamplePromise = assistant.updateExample(params);
        expectToBePromise(updateExamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.updateExample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent', 'text'];

        let err;
        try {
          await assistant.updateExample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent', 'text'];

        const updateExamplePromise = assistant.updateExample();
        expectToBePromise(updateExamplePromise);

        updateExamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteExample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const params = {
          workspaceId,
          intent,
          text,
        };

        assistant.deleteExample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['intent']).toEqual(intent);
        expect(options.path['text']).toEqual(text);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          intent,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.deleteExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const intent = 'fake_intent';
        const text = 'fake_text';
        const params = {
          workspaceId,
          intent,
          text,
        };

        // invoke method
        const deleteExamplePromise = assistant.deleteExample(params);
        expectToBePromise(deleteExamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.deleteExample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent', 'text'];

        let err;
        try {
          await assistant.deleteExample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'intent', 'text'];

        const deleteExamplePromise = assistant.deleteExample();
        expectToBePromise(deleteExamplePromise);

        deleteExamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listCounterexamples', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const pageLimit = 'fake_pageLimit';
        const sort = 'fake_sort';
        const cursor = 'fake_cursor';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          pageLimit,
          sort,
          cursor,
          includeAudit,
        };

        assistant.listCounterexamples(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/counterexamples', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listCounterexamples(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const params = {
          workspaceId,
        };

        // invoke method
        const listCounterexamplesPromise = assistant.listCounterexamples(params);
        expectToBePromise(listCounterexamplesPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.listCounterexamples(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        let err;
        try {
          await assistant.listCounterexamples({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        const listCounterexamplesPromise = assistant.listCounterexamples();
        expectToBePromise(listCounterexamplesPromise);

        listCounterexamplesPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createCounterexample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const params = {
          workspaceId,
          text,
        };

        assistant.createCounterexample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/counterexamples', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['text']).toEqual(text);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.createCounterexample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const params = {
          workspaceId,
          text,
        };

        // invoke method
        const createCounterexamplePromise = assistant.createCounterexample(params);
        expectToBePromise(createCounterexamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.createCounterexample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'text'];

        let err;
        try {
          await assistant.createCounterexample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'text'];

        const createCounterexamplePromise = assistant.createCounterexample();
        expectToBePromise(createCounterexamplePromise);

        createCounterexamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getCounterexample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          text,
          includeAudit,
        };

        assistant.getCounterexample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/counterexamples/{text}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['text']).toEqual(text);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.getCounterexample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const params = {
          workspaceId,
          text,
        };

        // invoke method
        const getCounterexamplePromise = assistant.getCounterexample(params);
        expectToBePromise(getCounterexamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.getCounterexample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'text'];

        let err;
        try {
          await assistant.getCounterexample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'text'];

        const getCounterexamplePromise = assistant.getCounterexample();
        expectToBePromise(getCounterexamplePromise);

        getCounterexamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateCounterexample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const newText = 'fake_newText';
        const params = {
          workspaceId,
          text,
          newText,
        };

        assistant.updateCounterexample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/counterexamples/{text}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['text']).toEqual(newText);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['text']).toEqual(text);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.updateCounterexample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const params = {
          workspaceId,
          text,
        };

        // invoke method
        const updateCounterexamplePromise = assistant.updateCounterexample(params);
        expectToBePromise(updateCounterexamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.updateCounterexample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'text'];

        let err;
        try {
          await assistant.updateCounterexample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'text'];

        const updateCounterexamplePromise = assistant.updateCounterexample();
        expectToBePromise(updateCounterexamplePromise);

        updateCounterexamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteCounterexample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const params = {
          workspaceId,
          text,
        };

        assistant.deleteCounterexample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/counterexamples/{text}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['text']).toEqual(text);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.deleteCounterexample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const text = 'fake_text';
        const params = {
          workspaceId,
          text,
        };

        // invoke method
        const deleteCounterexamplePromise = assistant.deleteCounterexample(params);
        expectToBePromise(deleteCounterexamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.deleteCounterexample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'text'];

        let err;
        try {
          await assistant.deleteCounterexample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'text'];

        const deleteCounterexamplePromise = assistant.deleteCounterexample();
        expectToBePromise(deleteCounterexamplePromise);

        deleteCounterexamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listEntities', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const _export = 'fake__export';
        const pageLimit = 'fake_pageLimit';
        const sort = 'fake_sort';
        const cursor = 'fake_cursor';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          _export,
          pageLimit,
          sort,
          cursor,
          includeAudit,
        };

        assistant.listEntities(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['export']).toEqual(_export);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listEntities(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const params = {
          workspaceId,
        };

        // invoke method
        const listEntitiesPromise = assistant.listEntities(params);
        expectToBePromise(listEntitiesPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.listEntities(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        let err;
        try {
          await assistant.listEntities({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        const listEntitiesPromise = assistant.listEntities();
        expectToBePromise(listEntitiesPromise);

        listEntitiesPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createEntity', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const description = 'fake_description';
        const metadata = 'fake_metadata';
        const fuzzyMatch = 'fake_fuzzyMatch';
        const values = 'fake_values';
        const params = {
          workspaceId,
          entity,
          description,
          metadata,
          fuzzyMatch,
          values,
        };

        assistant.createEntity(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['entity']).toEqual(entity);
        expect(options.body['description']).toEqual(description);
        expect(options.body['metadata']).toEqual(metadata);
        expect(options.body['fuzzy_match']).toEqual(fuzzyMatch);
        expect(options.body['values']).toEqual(values);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.createEntity(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const params = {
          workspaceId,
          entity,
        };

        // invoke method
        const createEntityPromise = assistant.createEntity(params);
        expectToBePromise(createEntityPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.createEntity(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        let err;
        try {
          await assistant.createEntity({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        const createEntityPromise = assistant.createEntity();
        expectToBePromise(createEntityPromise);

        createEntityPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getEntity', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const _export = 'fake__export';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          entity,
          _export,
          includeAudit,
        };

        assistant.getEntity(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities/{entity}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['export']).toEqual(_export);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.getEntity(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const params = {
          workspaceId,
          entity,
        };

        // invoke method
        const getEntityPromise = assistant.getEntity(params);
        expectToBePromise(getEntityPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.getEntity(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        let err;
        try {
          await assistant.getEntity({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        const getEntityPromise = assistant.getEntity();
        expectToBePromise(getEntityPromise);

        getEntityPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateEntity', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const newEntity = 'fake_newEntity';
        const newDescription = 'fake_newDescription';
        const newMetadata = 'fake_newMetadata';
        const newFuzzyMatch = 'fake_newFuzzyMatch';
        const newValues = 'fake_newValues';
        const params = {
          workspaceId,
          entity,
          newEntity,
          newDescription,
          newMetadata,
          newFuzzyMatch,
          newValues,
        };

        assistant.updateEntity(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities/{entity}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['entity']).toEqual(newEntity);
        expect(options.body['description']).toEqual(newDescription);
        expect(options.body['metadata']).toEqual(newMetadata);
        expect(options.body['fuzzy_match']).toEqual(newFuzzyMatch);
        expect(options.body['values']).toEqual(newValues);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.updateEntity(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const params = {
          workspaceId,
          entity,
        };

        // invoke method
        const updateEntityPromise = assistant.updateEntity(params);
        expectToBePromise(updateEntityPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.updateEntity(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        let err;
        try {
          await assistant.updateEntity({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        const updateEntityPromise = assistant.updateEntity();
        expectToBePromise(updateEntityPromise);

        updateEntityPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteEntity', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const params = {
          workspaceId,
          entity,
        };

        assistant.deleteEntity(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities/{entity}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.deleteEntity(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const params = {
          workspaceId,
          entity,
        };

        // invoke method
        const deleteEntityPromise = assistant.deleteEntity(params);
        expectToBePromise(deleteEntityPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.deleteEntity(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        let err;
        try {
          await assistant.deleteEntity({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        const deleteEntityPromise = assistant.deleteEntity();
        expectToBePromise(deleteEntityPromise);

        deleteEntityPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listMentions', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const _export = 'fake__export';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          entity,
          _export,
          includeAudit,
        };

        assistant.listMentions(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/entities/{entity}/mentions',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['export']).toEqual(_export);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listMentions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const params = {
          workspaceId,
          entity,
        };

        // invoke method
        const listMentionsPromise = assistant.listMentions(params);
        expectToBePromise(listMentionsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.listMentions(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        let err;
        try {
          await assistant.listMentions({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        const listMentionsPromise = assistant.listMentions();
        expectToBePromise(listMentionsPromise);

        listMentionsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listValues', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const _export = 'fake__export';
        const pageLimit = 'fake_pageLimit';
        const sort = 'fake_sort';
        const cursor = 'fake_cursor';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          entity,
          _export,
          pageLimit,
          sort,
          cursor,
          includeAudit,
        };

        assistant.listValues(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities/{entity}/values', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['export']).toEqual(_export);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listValues(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const params = {
          workspaceId,
          entity,
        };

        // invoke method
        const listValuesPromise = assistant.listValues(params);
        expectToBePromise(listValuesPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.listValues(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        let err;
        try {
          await assistant.listValues({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity'];

        const listValuesPromise = assistant.listValues();
        expectToBePromise(listValuesPromise);

        listValuesPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createValue', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const metadata = 'fake_metadata';
        const type = 'fake_type';
        const synonyms = 'fake_synonyms';
        const patterns = 'fake_patterns';
        const params = {
          workspaceId,
          entity,
          value,
          metadata,
          type,
          synonyms,
          patterns,
        };

        assistant.createValue(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/entities/{entity}/values',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['value']).toEqual(value);
        expect(options.body['metadata']).toEqual(metadata);
        expect(options.body['type']).toEqual(type);
        expect(options.body['synonyms']).toEqual(synonyms);
        expect(options.body['patterns']).toEqual(patterns);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.createValue(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const params = {
          workspaceId,
          entity,
          value,
        };

        // invoke method
        const createValuePromise = assistant.createValue(params);
        expectToBePromise(createValuePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.createValue(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value'];

        let err;
        try {
          await assistant.createValue({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value'];

        const createValuePromise = assistant.createValue();
        expectToBePromise(createValuePromise);

        createValuePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getValue', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const _export = 'fake__export';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          entity,
          value,
          _export,
          includeAudit,
        };

        assistant.getValue(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['export']).toEqual(_export);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
        expect(options.path['value']).toEqual(value);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.getValue(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const params = {
          workspaceId,
          entity,
          value,
        };

        // invoke method
        const getValuePromise = assistant.getValue(params);
        expectToBePromise(getValuePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.getValue(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value'];

        let err;
        try {
          await assistant.getValue({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value'];

        const getValuePromise = assistant.getValue();
        expectToBePromise(getValuePromise);

        getValuePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateValue', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const newValue = 'fake_newValue';
        const newMetadata = 'fake_newMetadata';
        const newType = 'fake_newType';
        const newSynonyms = 'fake_newSynonyms';
        const newPatterns = 'fake_newPatterns';
        const params = {
          workspaceId,
          entity,
          value,
          newValue,
          newMetadata,
          newType,
          newSynonyms,
          newPatterns,
        };

        assistant.updateValue(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['value']).toEqual(newValue);
        expect(options.body['metadata']).toEqual(newMetadata);
        expect(options.body['type']).toEqual(newType);
        expect(options.body['synonyms']).toEqual(newSynonyms);
        expect(options.body['patterns']).toEqual(newPatterns);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
        expect(options.path['value']).toEqual(value);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.updateValue(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const params = {
          workspaceId,
          entity,
          value,
        };

        // invoke method
        const updateValuePromise = assistant.updateValue(params);
        expectToBePromise(updateValuePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.updateValue(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value'];

        let err;
        try {
          await assistant.updateValue({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value'];

        const updateValuePromise = assistant.updateValue();
        expectToBePromise(updateValuePromise);

        updateValuePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteValue', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const params = {
          workspaceId,
          entity,
          value,
        };

        assistant.deleteValue(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
        expect(options.path['value']).toEqual(value);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.deleteValue(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const params = {
          workspaceId,
          entity,
          value,
        };

        // invoke method
        const deleteValuePromise = assistant.deleteValue(params);
        expectToBePromise(deleteValuePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.deleteValue(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value'];

        let err;
        try {
          await assistant.deleteValue({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value'];

        const deleteValuePromise = assistant.deleteValue();
        expectToBePromise(deleteValuePromise);

        deleteValuePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listSynonyms', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const pageLimit = 'fake_pageLimit';
        const sort = 'fake_sort';
        const cursor = 'fake_cursor';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          entity,
          value,
          pageLimit,
          sort,
          cursor,
          includeAudit,
        };

        assistant.listSynonyms(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
        expect(options.path['value']).toEqual(value);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          entity,
          value,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listSynonyms(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const params = {
          workspaceId,
          entity,
          value,
        };

        // invoke method
        const listSynonymsPromise = assistant.listSynonyms(params);
        expectToBePromise(listSynonymsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.listSynonyms(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value'];

        let err;
        try {
          await assistant.listSynonyms({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value'];

        const listSynonymsPromise = assistant.listSynonyms();
        expectToBePromise(listSynonymsPromise);

        listSynonymsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createSynonym', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
        };

        assistant.createSynonym(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['synonym']).toEqual(synonym);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
        expect(options.path['value']).toEqual(value);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
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

        assistant.createSynonym(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
        };

        // invoke method
        const createSynonymPromise = assistant.createSynonym(params);
        expectToBePromise(createSynonymPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.createSynonym(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

        let err;
        try {
          await assistant.createSynonym({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

        const createSynonymPromise = assistant.createSynonym();
        expectToBePromise(createSynonymPromise);

        createSynonymPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getSynonym', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
          includeAudit,
        };

        assistant.getSynonym(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
        expect(options.path['value']).toEqual(value);
        expect(options.path['synonym']).toEqual(synonym);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
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

        assistant.getSynonym(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
        };

        // invoke method
        const getSynonymPromise = assistant.getSynonym(params);
        expectToBePromise(getSynonymPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.getSynonym(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

        let err;
        try {
          await assistant.getSynonym({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

        const getSynonymPromise = assistant.getSynonym();
        expectToBePromise(getSynonymPromise);

        getSynonymPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateSynonym', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const newSynonym = 'fake_newSynonym';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
          newSynonym,
        };

        assistant.updateSynonym(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['synonym']).toEqual(newSynonym);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
        expect(options.path['value']).toEqual(value);
        expect(options.path['synonym']).toEqual(synonym);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
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

        assistant.updateSynonym(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
        };

        // invoke method
        const updateSynonymPromise = assistant.updateSynonym(params);
        expectToBePromise(updateSynonymPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.updateSynonym(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

        let err;
        try {
          await assistant.updateSynonym({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

        const updateSynonymPromise = assistant.updateSynonym();
        expectToBePromise(updateSynonymPromise);

        updateSynonymPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteSynonym', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
        };

        assistant.deleteSynonym(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['entity']).toEqual(entity);
        expect(options.path['value']).toEqual(value);
        expect(options.path['synonym']).toEqual(synonym);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
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

        assistant.deleteSynonym(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const entity = 'fake_entity';
        const value = 'fake_value';
        const synonym = 'fake_synonym';
        const params = {
          workspaceId,
          entity,
          value,
          synonym,
        };

        // invoke method
        const deleteSynonymPromise = assistant.deleteSynonym(params);
        expectToBePromise(deleteSynonymPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.deleteSynonym(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

        let err;
        try {
          await assistant.deleteSynonym({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

        const deleteSynonymPromise = assistant.deleteSynonym();
        expectToBePromise(deleteSynonymPromise);

        deleteSynonymPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listDialogNodes', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const pageLimit = 'fake_pageLimit';
        const sort = 'fake_sort';
        const cursor = 'fake_cursor';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          pageLimit,
          sort,
          cursor,
          includeAudit,
        };

        assistant.listDialogNodes(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/dialog_nodes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listDialogNodes(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const params = {
          workspaceId,
        };

        // invoke method
        const listDialogNodesPromise = assistant.listDialogNodes(params);
        expectToBePromise(listDialogNodesPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.listDialogNodes(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        let err;
        try {
          await assistant.listDialogNodes({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        const listDialogNodesPromise = assistant.listDialogNodes();
        expectToBePromise(listDialogNodesPromise);

        listDialogNodesPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createDialogNode', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const description = 'fake_description';
        const conditions = 'fake_conditions';
        const parent = 'fake_parent';
        const previousSibling = 'fake_previousSibling';
        const output = 'fake_output';
        const context = 'fake_context';
        const metadata = 'fake_metadata';
        const nextStep = 'fake_nextStep';
        const title = 'fake_title';
        const type = 'fake_type';
        const eventName = 'fake_eventName';
        const variable = 'fake_variable';
        const actions = 'fake_actions';
        const digressIn = 'fake_digressIn';
        const digressOut = 'fake_digressOut';
        const digressOutSlots = 'fake_digressOutSlots';
        const userLabel = 'fake_userLabel';
        const params = {
          workspaceId,
          dialogNode,
          description,
          conditions,
          parent,
          previousSibling,
          output,
          context,
          metadata,
          nextStep,
          title,
          type,
          eventName,
          variable,
          actions,
          digressIn,
          digressOut,
          digressOutSlots,
          userLabel,
        };

        assistant.createDialogNode(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/dialog_nodes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['dialog_node']).toEqual(dialogNode);
        expect(options.body['description']).toEqual(description);
        expect(options.body['conditions']).toEqual(conditions);
        expect(options.body['parent']).toEqual(parent);
        expect(options.body['previous_sibling']).toEqual(previousSibling);
        expect(options.body['output']).toEqual(output);
        expect(options.body['context']).toEqual(context);
        expect(options.body['metadata']).toEqual(metadata);
        expect(options.body['next_step']).toEqual(nextStep);
        expect(options.body['title']).toEqual(title);
        expect(options.body['type']).toEqual(type);
        expect(options.body['event_name']).toEqual(eventName);
        expect(options.body['variable']).toEqual(variable);
        expect(options.body['actions']).toEqual(actions);
        expect(options.body['digress_in']).toEqual(digressIn);
        expect(options.body['digress_out']).toEqual(digressOut);
        expect(options.body['digress_out_slots']).toEqual(digressOutSlots);
        expect(options.body['user_label']).toEqual(userLabel);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.createDialogNode(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const params = {
          workspaceId,
          dialogNode,
        };

        // invoke method
        const createDialogNodePromise = assistant.createDialogNode(params);
        expectToBePromise(createDialogNodePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.createDialogNode(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'dialogNode'];

        let err;
        try {
          await assistant.createDialogNode({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'dialogNode'];

        const createDialogNodePromise = assistant.createDialogNode();
        expectToBePromise(createDialogNodePromise);

        createDialogNodePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getDialogNode', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const includeAudit = 'fake_includeAudit';
        const params = {
          workspaceId,
          dialogNode,
          includeAudit,
        };

        assistant.getDialogNode(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['include_audit']).toEqual(includeAudit);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['dialog_node']).toEqual(dialogNode);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.getDialogNode(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const params = {
          workspaceId,
          dialogNode,
        };

        // invoke method
        const getDialogNodePromise = assistant.getDialogNode(params);
        expectToBePromise(getDialogNodePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.getDialogNode(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'dialogNode'];

        let err;
        try {
          await assistant.getDialogNode({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'dialogNode'];

        const getDialogNodePromise = assistant.getDialogNode();
        expectToBePromise(getDialogNodePromise);

        getDialogNodePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateDialogNode', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const newDialogNode = 'fake_newDialogNode';
        const newDescription = 'fake_newDescription';
        const newConditions = 'fake_newConditions';
        const newParent = 'fake_newParent';
        const newPreviousSibling = 'fake_newPreviousSibling';
        const newOutput = 'fake_newOutput';
        const newContext = 'fake_newContext';
        const newMetadata = 'fake_newMetadata';
        const newNextStep = 'fake_newNextStep';
        const newTitle = 'fake_newTitle';
        const newType = 'fake_newType';
        const newEventName = 'fake_newEventName';
        const newVariable = 'fake_newVariable';
        const newActions = 'fake_newActions';
        const newDigressIn = 'fake_newDigressIn';
        const newDigressOut = 'fake_newDigressOut';
        const newDigressOutSlots = 'fake_newDigressOutSlots';
        const newUserLabel = 'fake_newUserLabel';
        const params = {
          workspaceId,
          dialogNode,
          newDialogNode,
          newDescription,
          newConditions,
          newParent,
          newPreviousSibling,
          newOutput,
          newContext,
          newMetadata,
          newNextStep,
          newTitle,
          newType,
          newEventName,
          newVariable,
          newActions,
          newDigressIn,
          newDigressOut,
          newDigressOutSlots,
          newUserLabel,
        };

        assistant.updateDialogNode(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['dialog_node']).toEqual(newDialogNode);
        expect(options.body['description']).toEqual(newDescription);
        expect(options.body['conditions']).toEqual(newConditions);
        expect(options.body['parent']).toEqual(newParent);
        expect(options.body['previous_sibling']).toEqual(newPreviousSibling);
        expect(options.body['output']).toEqual(newOutput);
        expect(options.body['context']).toEqual(newContext);
        expect(options.body['metadata']).toEqual(newMetadata);
        expect(options.body['next_step']).toEqual(newNextStep);
        expect(options.body['title']).toEqual(newTitle);
        expect(options.body['type']).toEqual(newType);
        expect(options.body['event_name']).toEqual(newEventName);
        expect(options.body['variable']).toEqual(newVariable);
        expect(options.body['actions']).toEqual(newActions);
        expect(options.body['digress_in']).toEqual(newDigressIn);
        expect(options.body['digress_out']).toEqual(newDigressOut);
        expect(options.body['digress_out_slots']).toEqual(newDigressOutSlots);
        expect(options.body['user_label']).toEqual(newUserLabel);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['dialog_node']).toEqual(dialogNode);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.updateDialogNode(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const params = {
          workspaceId,
          dialogNode,
        };

        // invoke method
        const updateDialogNodePromise = assistant.updateDialogNode(params);
        expectToBePromise(updateDialogNodePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.updateDialogNode(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'dialogNode'];

        let err;
        try {
          await assistant.updateDialogNode({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'dialogNode'];

        const updateDialogNodePromise = assistant.updateDialogNode();
        expectToBePromise(updateDialogNodePromise);

        updateDialogNodePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteDialogNode', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const params = {
          workspaceId,
          dialogNode,
        };

        assistant.deleteDialogNode(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['workspace_id']).toEqual(workspaceId);
        expect(options.path['dialog_node']).toEqual(dialogNode);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          dialogNode,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.deleteDialogNode(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const dialogNode = 'fake_dialogNode';
        const params = {
          workspaceId,
          dialogNode,
        };

        // invoke method
        const deleteDialogNodePromise = assistant.deleteDialogNode(params);
        expectToBePromise(deleteDialogNodePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.deleteDialogNode(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'dialogNode'];

        let err;
        try {
          await assistant.deleteDialogNode({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId', 'dialogNode'];

        const deleteDialogNodePromise = assistant.deleteDialogNode();
        expectToBePromise(deleteDialogNodePromise);

        deleteDialogNodePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listLogs', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const sort = 'fake_sort';
        const filter = 'fake_filter';
        const pageLimit = 'fake_pageLimit';
        const cursor = 'fake_cursor';
        const params = {
          workspaceId,
          sort,
          filter,
          pageLimit,
          cursor,
        };

        assistant.listLogs(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/logs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.path['workspace_id']).toEqual(workspaceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          workspaceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listLogs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const workspaceId = 'fake_workspaceId';
        const params = {
          workspaceId,
        };

        // invoke method
        const listLogsPromise = assistant.listLogs(params);
        expectToBePromise(listLogsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.listLogs(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        let err;
        try {
          await assistant.listLogs({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['workspaceId'];

        const listLogsPromise = assistant.listLogs();
        expectToBePromise(listLogsPromise);

        listLogsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listAllLogs', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const filter = 'fake_filter';
        const sort = 'fake_sort';
        const pageLimit = 'fake_pageLimit';
        const cursor = 'fake_cursor';
        const params = {
          filter,
          sort,
          pageLimit,
          cursor,
        };

        assistant.listAllLogs(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/logs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['cursor']).toEqual(cursor);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const filter = 'fake_filter';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          filter,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.listAllLogs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const filter = 'fake_filter';
        const params = {
          filter,
        };

        // invoke method
        const listAllLogsPromise = assistant.listAllLogs(params);
        expectToBePromise(listAllLogsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.listAllLogs(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['filter'];

        let err;
        try {
          await assistant.listAllLogs({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['filter'];

        const listAllLogsPromise = assistant.listAllLogs();
        expectToBePromise(listAllLogsPromise);

        listAllLogsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteUserData', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const customerId = 'fake_customerId';
        const params = {
          customerId,
        };

        assistant.deleteUserData(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/user_data', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['customer_id']).toEqual(customerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'fake_customerId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        assistant.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const customerId = 'fake_customerId';
        const params = {
          customerId,
        };

        // invoke method
        const deleteUserDataPromise = assistant.deleteUserData(params);
        expectToBePromise(deleteUserDataPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        assistant.deleteUserData(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        let err;
        try {
          await assistant.deleteUserData({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        const deleteUserDataPromise = assistant.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
});
