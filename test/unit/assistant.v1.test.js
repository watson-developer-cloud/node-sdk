/**
 * Copyright 2019 IBM All Rights Reserved.
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

const helper = require('ibm-cloud-sdk-core');
const AssistantV1 = require('../../assistant/v1');
const utils = require('../resources/unitTestUtils');

const {
  getOptions,
  checkUrlAndMethod,
  checkCallback,
  checkMediaHeaders,
  missingParamsSuccess,
  expectToBePromise,
  missingParamsError,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  checkDefaultSuccessArgs,
} = utils;

const noop = () => {};

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/assistant/api/assistant/api',
  version: '2018-10-18',
};

const assistant = new AssistantV1(service);
const createRequestMock = jest.spyOn(assistant, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('message', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const input = 'fake_input';
      const intents = 'fake_intents';
      const entities = 'fake_entities';
      const alternate_intents = 'fake_alternate_intents';
      const context = 'fake_context';
      const output = 'fake_output';
      const nodes_visited_details = 'fake_nodes_visited_details';
      const params = {
        workspace_id,
        input,
        intents,
        entities,
        alternate_intents,
        context,
        output,
        nodes_visited_details,
      };

      // invoke method
      assistant.message(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/message', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['input']).toEqual(input);
      expect(options.body['intents']).toEqual(intents);
      expect(options.body['entities']).toEqual(entities);
      expect(options.body['alternate_intents']).toEqual(alternate_intents);
      expect(options.body['context']).toEqual(context);
      expect(options.body['output']).toEqual(output);
      expect(options.qs['nodes_visited_details']).toEqual(nodes_visited_details);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.message(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const params = {
        workspace_id,
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
      assistant.message(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

      assistant.message({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

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
      const page_limit = 'fake_page_limit';
      const include_count = 'fake_include_count';
      const sort = 'fake_sort';
      const cursor = 'fake_cursor';
      const include_audit = 'fake_include_audit';
      const params = {
        page_limit,
        include_count,
        sort,
        cursor,
        include_audit,
      };

      // invoke method
      assistant.listWorkspaces(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['include_count']).toEqual(include_count);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['cursor']).toEqual(cursor);
      expect(options.qs['include_audit']).toEqual(include_audit);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listWorkspaces(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listWorkspaces({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      assistant.listWorkspaces(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const learning_opt_out = 'fake_learning_opt_out';
      const system_settings = 'fake_system_settings';
      const intents = 'fake_intents';
      const entities = 'fake_entities';
      const dialog_nodes = 'fake_dialog_nodes';
      const counterexamples = 'fake_counterexamples';
      const params = {
        name,
        description,
        language,
        metadata,
        learning_opt_out,
        system_settings,
        intents,
        entities,
        dialog_nodes,
        counterexamples,
      };

      // invoke method
      assistant.createWorkspace(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.body['description']).toEqual(description);
      expect(options.body['language']).toEqual(language);
      expect(options.body['metadata']).toEqual(metadata);
      expect(options.body['learning_opt_out']).toEqual(learning_opt_out);
      expect(options.body['system_settings']).toEqual(system_settings);
      expect(options.body['intents']).toEqual(intents);
      expect(options.body['entities']).toEqual(entities);
      expect(options.body['dialog_nodes']).toEqual(dialog_nodes);
      expect(options.body['counterexamples']).toEqual(counterexamples);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.createWorkspace(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.createWorkspace({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      assistant.createWorkspace(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const workspace_id = 'fake_workspace_id';
      const _export = 'fake__export';
      const include_audit = 'fake_include_audit';
      const sort = 'fake_sort';
      const params = {
        workspace_id,
        _export,
        include_audit,
        sort,
      };

      // invoke method
      assistant.getWorkspace(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['export']).toEqual(_export);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.getWorkspace(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const params = {
        workspace_id,
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
      assistant.getWorkspace(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

      assistant.getWorkspace({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

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
      const workspace_id = 'fake_workspace_id';
      const name = 'fake_name';
      const description = 'fake_description';
      const language = 'fake_language';
      const metadata = 'fake_metadata';
      const learning_opt_out = 'fake_learning_opt_out';
      const system_settings = 'fake_system_settings';
      const intents = 'fake_intents';
      const entities = 'fake_entities';
      const dialog_nodes = 'fake_dialog_nodes';
      const counterexamples = 'fake_counterexamples';
      const append = 'fake_append';
      const params = {
        workspace_id,
        name,
        description,
        language,
        metadata,
        learning_opt_out,
        system_settings,
        intents,
        entities,
        dialog_nodes,
        counterexamples,
        append,
      };

      // invoke method
      assistant.updateWorkspace(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.body['description']).toEqual(description);
      expect(options.body['language']).toEqual(language);
      expect(options.body['metadata']).toEqual(metadata);
      expect(options.body['learning_opt_out']).toEqual(learning_opt_out);
      expect(options.body['system_settings']).toEqual(system_settings);
      expect(options.body['intents']).toEqual(intents);
      expect(options.body['entities']).toEqual(entities);
      expect(options.body['dialog_nodes']).toEqual(dialog_nodes);
      expect(options.body['counterexamples']).toEqual(counterexamples);
      expect(options.qs['append']).toEqual(append);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.updateWorkspace(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const params = {
        workspace_id,
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
      assistant.updateWorkspace(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

      assistant.updateWorkspace({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

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
      const workspace_id = 'fake_workspace_id';
      const params = {
        workspace_id,
      };

      // invoke method
      assistant.deleteWorkspace(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.deleteWorkspace(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const params = {
        workspace_id,
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
      assistant.deleteWorkspace(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

      assistant.deleteWorkspace({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

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
      const workspace_id = 'fake_workspace_id';
      const _export = 'fake__export';
      const page_limit = 'fake_page_limit';
      const include_count = 'fake_include_count';
      const sort = 'fake_sort';
      const cursor = 'fake_cursor';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        _export,
        page_limit,
        include_count,
        sort,
        cursor,
        include_audit,
      };

      // invoke method
      assistant.listIntents(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['export']).toEqual(_export);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['include_count']).toEqual(include_count);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['cursor']).toEqual(cursor);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listIntents(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const params = {
        workspace_id,
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
      assistant.listIntents(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

      assistant.listIntents({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

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
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const description = 'fake_description';
      const examples = 'fake_examples';
      const params = {
        workspace_id,
        intent,
        description,
        examples,
      };

      // invoke method
      assistant.createIntent(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['intent']).toEqual(intent);
      expect(options.body['description']).toEqual(description);
      expect(options.body['examples']).toEqual(examples);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        intent,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.createIntent(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const params = {
        workspace_id,
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
      assistant.createIntent(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent'];

      assistant.createIntent({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent'];

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
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const _export = 'fake__export';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        intent,
        _export,
        include_audit,
      };

      // invoke method
      assistant.getIntent(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents/{intent}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['export']).toEqual(_export);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['intent']).toEqual(intent);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        intent,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.getIntent(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const params = {
        workspace_id,
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
      assistant.getIntent(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent'];

      assistant.getIntent({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent'];

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
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const new_intent = 'fake_new_intent';
      const new_description = 'fake_new_description';
      const new_examples = 'fake_new_examples';
      const params = {
        workspace_id,
        intent,
        new_intent,
        new_description,
        new_examples,
      };

      // invoke method
      assistant.updateIntent(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents/{intent}', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['intent']).toEqual(new_intent);
      expect(options.body['description']).toEqual(new_description);
      expect(options.body['examples']).toEqual(new_examples);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['intent']).toEqual(intent);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        intent,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.updateIntent(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const params = {
        workspace_id,
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
      assistant.updateIntent(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent'];

      assistant.updateIntent({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent'];

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
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const params = {
        workspace_id,
        intent,
      };

      // invoke method
      assistant.deleteIntent(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents/{intent}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['intent']).toEqual(intent);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        intent,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.deleteIntent(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const params = {
        workspace_id,
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
      assistant.deleteIntent(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent'];

      assistant.deleteIntent({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent'];

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
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const page_limit = 'fake_page_limit';
      const include_count = 'fake_include_count';
      const sort = 'fake_sort';
      const cursor = 'fake_cursor';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        intent,
        page_limit,
        include_count,
        sort,
        cursor,
        include_audit,
      };

      // invoke method
      assistant.listExamples(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents/{intent}/examples', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['include_count']).toEqual(include_count);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['cursor']).toEqual(cursor);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['intent']).toEqual(intent);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        intent,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listExamples(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const params = {
        workspace_id,
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
      assistant.listExamples(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent'];

      assistant.listExamples({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent'];

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
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const mentions = 'fake_mentions';
      const params = {
        workspace_id,
        intent,
        text,
        mentions,
      };

      // invoke method
      assistant.createExample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/intents/{intent}/examples', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['text']).toEqual(text);
      expect(options.body['mentions']).toEqual(mentions);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['intent']).toEqual(intent);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        intent,
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.createExample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const params = {
        workspace_id,
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
      assistant.createExample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent', 'text'];

      assistant.createExample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent', 'text'];

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
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        intent,
        text,
        include_audit,
      };

      // invoke method
      assistant.getExample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['intent']).toEqual(intent);
      expect(options.path['text']).toEqual(text);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        intent,
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.getExample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const params = {
        workspace_id,
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
      assistant.getExample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent', 'text'];

      assistant.getExample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent', 'text'];

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
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const new_text = 'fake_new_text';
      const new_mentions = 'fake_new_mentions';
      const params = {
        workspace_id,
        intent,
        text,
        new_text,
        new_mentions,
      };

      // invoke method
      assistant.updateExample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['text']).toEqual(new_text);
      expect(options.body['mentions']).toEqual(new_mentions);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['intent']).toEqual(intent);
      expect(options.path['text']).toEqual(text);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        intent,
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.updateExample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const params = {
        workspace_id,
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
      assistant.updateExample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent', 'text'];

      assistant.updateExample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent', 'text'];

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
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const params = {
        workspace_id,
        intent,
        text,
      };

      // invoke method
      assistant.deleteExample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['intent']).toEqual(intent);
      expect(options.path['text']).toEqual(text);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        intent,
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.deleteExample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const intent = 'fake_intent';
      const text = 'fake_text';
      const params = {
        workspace_id,
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
      assistant.deleteExample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent', 'text'];

      assistant.deleteExample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'intent', 'text'];

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
      const workspace_id = 'fake_workspace_id';
      const page_limit = 'fake_page_limit';
      const include_count = 'fake_include_count';
      const sort = 'fake_sort';
      const cursor = 'fake_cursor';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        page_limit,
        include_count,
        sort,
        cursor,
        include_audit,
      };

      // invoke method
      assistant.listCounterexamples(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/counterexamples', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['include_count']).toEqual(include_count);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['cursor']).toEqual(cursor);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listCounterexamples(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const params = {
        workspace_id,
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
      assistant.listCounterexamples(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

      assistant.listCounterexamples({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

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
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const params = {
        workspace_id,
        text,
      };

      // invoke method
      assistant.createCounterexample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/counterexamples', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['text']).toEqual(text);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.createCounterexample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const params = {
        workspace_id,
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
      assistant.createCounterexample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'text'];

      assistant.createCounterexample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'text'];

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
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        text,
        include_audit,
      };

      // invoke method
      assistant.getCounterexample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/counterexamples/{text}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['text']).toEqual(text);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.getCounterexample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const params = {
        workspace_id,
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
      assistant.getCounterexample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'text'];

      assistant.getCounterexample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'text'];

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
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const new_text = 'fake_new_text';
      const params = {
        workspace_id,
        text,
        new_text,
      };

      // invoke method
      assistant.updateCounterexample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/counterexamples/{text}', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['text']).toEqual(new_text);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['text']).toEqual(text);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.updateCounterexample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const params = {
        workspace_id,
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
      assistant.updateCounterexample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'text'];

      assistant.updateCounterexample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'text'];

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
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const params = {
        workspace_id,
        text,
      };

      // invoke method
      assistant.deleteCounterexample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/counterexamples/{text}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['text']).toEqual(text);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.deleteCounterexample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const text = 'fake_text';
      const params = {
        workspace_id,
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
      assistant.deleteCounterexample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'text'];

      assistant.deleteCounterexample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'text'];

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
      const workspace_id = 'fake_workspace_id';
      const _export = 'fake__export';
      const page_limit = 'fake_page_limit';
      const include_count = 'fake_include_count';
      const sort = 'fake_sort';
      const cursor = 'fake_cursor';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        _export,
        page_limit,
        include_count,
        sort,
        cursor,
        include_audit,
      };

      // invoke method
      assistant.listEntities(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['export']).toEqual(_export);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['include_count']).toEqual(include_count);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['cursor']).toEqual(cursor);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listEntities(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const params = {
        workspace_id,
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
      assistant.listEntities(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

      assistant.listEntities({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const description = 'fake_description';
      const metadata = 'fake_metadata';
      const fuzzy_match = 'fake_fuzzy_match';
      const values = 'fake_values';
      const params = {
        workspace_id,
        entity,
        description,
        metadata,
        fuzzy_match,
        values,
      };

      // invoke method
      assistant.createEntity(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['entity']).toEqual(entity);
      expect(options.body['description']).toEqual(description);
      expect(options.body['metadata']).toEqual(metadata);
      expect(options.body['fuzzy_match']).toEqual(fuzzy_match);
      expect(options.body['values']).toEqual(values);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.createEntity(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const params = {
        workspace_id,
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
      assistant.createEntity(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

      assistant.createEntity({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const _export = 'fake__export';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        entity,
        _export,
        include_audit,
      };

      // invoke method
      assistant.getEntity(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities/{entity}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['export']).toEqual(_export);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.getEntity(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const params = {
        workspace_id,
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
      assistant.getEntity(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

      assistant.getEntity({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const new_entity = 'fake_new_entity';
      const new_description = 'fake_new_description';
      const new_metadata = 'fake_new_metadata';
      const new_fuzzy_match = 'fake_new_fuzzy_match';
      const new_values = 'fake_new_values';
      const params = {
        workspace_id,
        entity,
        new_entity,
        new_description,
        new_metadata,
        new_fuzzy_match,
        new_values,
      };

      // invoke method
      assistant.updateEntity(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities/{entity}', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['entity']).toEqual(new_entity);
      expect(options.body['description']).toEqual(new_description);
      expect(options.body['metadata']).toEqual(new_metadata);
      expect(options.body['fuzzy_match']).toEqual(new_fuzzy_match);
      expect(options.body['values']).toEqual(new_values);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.updateEntity(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const params = {
        workspace_id,
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
      assistant.updateEntity(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

      assistant.updateEntity({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const params = {
        workspace_id,
        entity,
      };

      // invoke method
      assistant.deleteEntity(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities/{entity}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.deleteEntity(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const params = {
        workspace_id,
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
      assistant.deleteEntity(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

      assistant.deleteEntity({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const _export = 'fake__export';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        entity,
        _export,
        include_audit,
      };

      // invoke method
      assistant.listMentions(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities/{entity}/mentions', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['export']).toEqual(_export);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listMentions(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const params = {
        workspace_id,
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
      assistant.listMentions(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

      assistant.listMentions({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const _export = 'fake__export';
      const page_limit = 'fake_page_limit';
      const include_count = 'fake_include_count';
      const sort = 'fake_sort';
      const cursor = 'fake_cursor';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        entity,
        _export,
        page_limit,
        include_count,
        sort,
        cursor,
        include_audit,
      };

      // invoke method
      assistant.listValues(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities/{entity}/values', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['export']).toEqual(_export);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['include_count']).toEqual(include_count);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['cursor']).toEqual(cursor);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listValues(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const params = {
        workspace_id,
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
      assistant.listValues(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

      assistant.listValues({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const metadata = 'fake_metadata';
      const value_type = 'fake_value_type';
      const synonyms = 'fake_synonyms';
      const patterns = 'fake_patterns';
      const params = {
        workspace_id,
        entity,
        value,
        metadata,
        value_type,
        synonyms,
        patterns,
      };

      // invoke method
      assistant.createValue(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/entities/{entity}/values', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['value']).toEqual(value);
      expect(options.body['metadata']).toEqual(metadata);
      expect(options.body['type']).toEqual(value_type);
      expect(options.body['synonyms']).toEqual(synonyms);
      expect(options.body['patterns']).toEqual(patterns);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        value,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.createValue(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const params = {
        workspace_id,
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
      assistant.createValue(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value'];

      assistant.createValue({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const _export = 'fake__export';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        entity,
        value,
        _export,
        include_audit,
      };

      // invoke method
      assistant.getValue(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['export']).toEqual(_export);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
      expect(options.path['value']).toEqual(value);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        value,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.getValue(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const params = {
        workspace_id,
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
      assistant.getValue(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value'];

      assistant.getValue({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const new_value = 'fake_new_value';
      const new_metadata = 'fake_new_metadata';
      const new_value_type = 'fake_new_value_type';
      const new_synonyms = 'fake_new_synonyms';
      const new_patterns = 'fake_new_patterns';
      const params = {
        workspace_id,
        entity,
        value,
        new_value,
        new_metadata,
        new_value_type,
        new_synonyms,
        new_patterns,
      };

      // invoke method
      assistant.updateValue(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['value']).toEqual(new_value);
      expect(options.body['metadata']).toEqual(new_metadata);
      expect(options.body['type']).toEqual(new_value_type);
      expect(options.body['synonyms']).toEqual(new_synonyms);
      expect(options.body['patterns']).toEqual(new_patterns);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
      expect(options.path['value']).toEqual(value);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        value,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.updateValue(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const params = {
        workspace_id,
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
      assistant.updateValue(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value'];

      assistant.updateValue({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const params = {
        workspace_id,
        entity,
        value,
      };

      // invoke method
      assistant.deleteValue(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
      expect(options.path['value']).toEqual(value);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        value,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.deleteValue(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const params = {
        workspace_id,
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
      assistant.deleteValue(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value'];

      assistant.deleteValue({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const page_limit = 'fake_page_limit';
      const include_count = 'fake_include_count';
      const sort = 'fake_sort';
      const cursor = 'fake_cursor';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        entity,
        value,
        page_limit,
        include_count,
        sort,
        cursor,
        include_audit,
      };

      // invoke method
      assistant.listSynonyms(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['include_count']).toEqual(include_count);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['cursor']).toEqual(cursor);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
      expect(options.path['value']).toEqual(value);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        value,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listSynonyms(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const params = {
        workspace_id,
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
      assistant.listSynonyms(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value'];

      assistant.listSynonyms({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const params = {
        workspace_id,
        entity,
        value,
        synonym,
      };

      // invoke method
      assistant.createSynonym(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['synonym']).toEqual(synonym);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
      expect(options.path['value']).toEqual(value);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        value,
        synonym,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.createSynonym(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const params = {
        workspace_id,
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
      assistant.createSynonym(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

      assistant.createSynonym({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        entity,
        value,
        synonym,
        include_audit,
      };

      // invoke method
      assistant.getSynonym(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
      expect(options.path['value']).toEqual(value);
      expect(options.path['synonym']).toEqual(synonym);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        value,
        synonym,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.getSynonym(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const params = {
        workspace_id,
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
      assistant.getSynonym(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

      assistant.getSynonym({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const new_synonym = 'fake_new_synonym';
      const params = {
        workspace_id,
        entity,
        value,
        synonym,
        new_synonym,
      };

      // invoke method
      assistant.updateSynonym(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['synonym']).toEqual(new_synonym);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
      expect(options.path['value']).toEqual(value);
      expect(options.path['synonym']).toEqual(synonym);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        value,
        synonym,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.updateSynonym(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const params = {
        workspace_id,
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
      assistant.updateSynonym(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

      assistant.updateSynonym({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

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
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const params = {
        workspace_id,
        entity,
        value,
        synonym,
      };

      // invoke method
      assistant.deleteSynonym(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['entity']).toEqual(entity);
      expect(options.path['value']).toEqual(value);
      expect(options.path['synonym']).toEqual(synonym);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        entity,
        value,
        synonym,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.deleteSynonym(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const entity = 'fake_entity';
      const value = 'fake_value';
      const synonym = 'fake_synonym';
      const params = {
        workspace_id,
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
      assistant.deleteSynonym(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

      assistant.deleteSynonym({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

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
      const workspace_id = 'fake_workspace_id';
      const page_limit = 'fake_page_limit';
      const include_count = 'fake_include_count';
      const sort = 'fake_sort';
      const cursor = 'fake_cursor';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        page_limit,
        include_count,
        sort,
        cursor,
        include_audit,
      };

      // invoke method
      assistant.listDialogNodes(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/dialog_nodes', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['include_count']).toEqual(include_count);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['cursor']).toEqual(cursor);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listDialogNodes(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const params = {
        workspace_id,
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
      assistant.listDialogNodes(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

      assistant.listDialogNodes({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

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
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const description = 'fake_description';
      const conditions = 'fake_conditions';
      const parent = 'fake_parent';
      const previous_sibling = 'fake_previous_sibling';
      const output = 'fake_output';
      const context = 'fake_context';
      const metadata = 'fake_metadata';
      const next_step = 'fake_next_step';
      const title = 'fake_title';
      const node_type = 'fake_node_type';
      const event_name = 'fake_event_name';
      const variable = 'fake_variable';
      const actions = 'fake_actions';
      const digress_in = 'fake_digress_in';
      const digress_out = 'fake_digress_out';
      const digress_out_slots = 'fake_digress_out_slots';
      const user_label = 'fake_user_label';
      const params = {
        workspace_id,
        dialog_node,
        description,
        conditions,
        parent,
        previous_sibling,
        output,
        context,
        metadata,
        next_step,
        title,
        node_type,
        event_name,
        variable,
        actions,
        digress_in,
        digress_out,
        digress_out_slots,
        user_label,
      };

      // invoke method
      assistant.createDialogNode(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/dialog_nodes', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['dialog_node']).toEqual(dialog_node);
      expect(options.body['description']).toEqual(description);
      expect(options.body['conditions']).toEqual(conditions);
      expect(options.body['parent']).toEqual(parent);
      expect(options.body['previous_sibling']).toEqual(previous_sibling);
      expect(options.body['output']).toEqual(output);
      expect(options.body['context']).toEqual(context);
      expect(options.body['metadata']).toEqual(metadata);
      expect(options.body['next_step']).toEqual(next_step);
      expect(options.body['title']).toEqual(title);
      expect(options.body['type']).toEqual(node_type);
      expect(options.body['event_name']).toEqual(event_name);
      expect(options.body['variable']).toEqual(variable);
      expect(options.body['actions']).toEqual(actions);
      expect(options.body['digress_in']).toEqual(digress_in);
      expect(options.body['digress_out']).toEqual(digress_out);
      expect(options.body['digress_out_slots']).toEqual(digress_out_slots);
      expect(options.body['user_label']).toEqual(user_label);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        dialog_node,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.createDialogNode(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const params = {
        workspace_id,
        dialog_node,
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
      assistant.createDialogNode(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'dialog_node'];

      assistant.createDialogNode({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'dialog_node'];

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
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const include_audit = 'fake_include_audit';
      const params = {
        workspace_id,
        dialog_node,
        include_audit,
      };

      // invoke method
      assistant.getDialogNode(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['include_audit']).toEqual(include_audit);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['dialog_node']).toEqual(dialog_node);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        dialog_node,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.getDialogNode(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const params = {
        workspace_id,
        dialog_node,
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
      assistant.getDialogNode(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'dialog_node'];

      assistant.getDialogNode({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'dialog_node'];

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
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const new_dialog_node = 'fake_new_dialog_node';
      const new_description = 'fake_new_description';
      const new_conditions = 'fake_new_conditions';
      const new_parent = 'fake_new_parent';
      const new_previous_sibling = 'fake_new_previous_sibling';
      const new_output = 'fake_new_output';
      const new_context = 'fake_new_context';
      const new_metadata = 'fake_new_metadata';
      const new_next_step = 'fake_new_next_step';
      const new_title = 'fake_new_title';
      const new_node_type = 'fake_new_node_type';
      const new_event_name = 'fake_new_event_name';
      const new_variable = 'fake_new_variable';
      const new_actions = 'fake_new_actions';
      const new_digress_in = 'fake_new_digress_in';
      const new_digress_out = 'fake_new_digress_out';
      const new_digress_out_slots = 'fake_new_digress_out_slots';
      const new_user_label = 'fake_new_user_label';
      const params = {
        workspace_id,
        dialog_node,
        new_dialog_node,
        new_description,
        new_conditions,
        new_parent,
        new_previous_sibling,
        new_output,
        new_context,
        new_metadata,
        new_next_step,
        new_title,
        new_node_type,
        new_event_name,
        new_variable,
        new_actions,
        new_digress_in,
        new_digress_out,
        new_digress_out_slots,
        new_user_label,
      };

      // invoke method
      assistant.updateDialogNode(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['dialog_node']).toEqual(new_dialog_node);
      expect(options.body['description']).toEqual(new_description);
      expect(options.body['conditions']).toEqual(new_conditions);
      expect(options.body['parent']).toEqual(new_parent);
      expect(options.body['previous_sibling']).toEqual(new_previous_sibling);
      expect(options.body['output']).toEqual(new_output);
      expect(options.body['context']).toEqual(new_context);
      expect(options.body['metadata']).toEqual(new_metadata);
      expect(options.body['next_step']).toEqual(new_next_step);
      expect(options.body['title']).toEqual(new_title);
      expect(options.body['type']).toEqual(new_node_type);
      expect(options.body['event_name']).toEqual(new_event_name);
      expect(options.body['variable']).toEqual(new_variable);
      expect(options.body['actions']).toEqual(new_actions);
      expect(options.body['digress_in']).toEqual(new_digress_in);
      expect(options.body['digress_out']).toEqual(new_digress_out);
      expect(options.body['digress_out_slots']).toEqual(new_digress_out_slots);
      expect(options.body['user_label']).toEqual(new_user_label);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['dialog_node']).toEqual(dialog_node);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        dialog_node,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.updateDialogNode(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const params = {
        workspace_id,
        dialog_node,
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
      assistant.updateDialogNode(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'dialog_node'];

      assistant.updateDialogNode({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'dialog_node'];

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
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const params = {
        workspace_id,
        dialog_node,
      };

      // invoke method
      assistant.deleteDialogNode(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['workspace_id']).toEqual(workspace_id);
      expect(options.path['dialog_node']).toEqual(dialog_node);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        dialog_node,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.deleteDialogNode(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const dialog_node = 'fake_dialog_node';
      const params = {
        workspace_id,
        dialog_node,
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
      assistant.deleteDialogNode(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'dialog_node'];

      assistant.deleteDialogNode({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id', 'dialog_node'];

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
      const workspace_id = 'fake_workspace_id';
      const sort = 'fake_sort';
      const filter = 'fake_filter';
      const page_limit = 'fake_page_limit';
      const cursor = 'fake_cursor';
      const params = {
        workspace_id,
        sort,
        filter,
        page_limit,
        cursor,
      };

      // invoke method
      assistant.listLogs(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/workspaces/{workspace_id}/logs', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['filter']).toEqual(filter);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['cursor']).toEqual(cursor);
      expect(options.path['workspace_id']).toEqual(workspace_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        workspace_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listLogs(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const workspace_id = 'fake_workspace_id';
      const params = {
        workspace_id,
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
      assistant.listLogs(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

      assistant.listLogs({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['workspace_id'];

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
      const page_limit = 'fake_page_limit';
      const cursor = 'fake_cursor';
      const params = {
        filter,
        sort,
        page_limit,
        cursor,
      };

      // invoke method
      assistant.listAllLogs(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/logs', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['filter']).toEqual(filter);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['cursor']).toEqual(cursor);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const filter = 'fake_filter';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        filter,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.listAllLogs(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listAllLogs(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['filter'];

      assistant.listAllLogs({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
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
      const customer_id = 'fake_customer_id';
      const params = {
        customer_id,
      };

      // invoke method
      assistant.deleteUserData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/user_data', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['customer_id']).toEqual(customer_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customer_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      assistant.deleteUserData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const params = {
        customer_id,
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
      assistant.deleteUserData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      assistant.deleteUserData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      const deleteUserDataPromise = assistant.deleteUserData();
      expectToBePromise(deleteUserDataPromise);

      deleteUserDataPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
