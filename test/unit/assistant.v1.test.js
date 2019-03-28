'use strict';

const helper = require('ibm-cloud-sdk-core');
const AssistantV1 = require('../../assistant/v1');
const utils = require('../resources/unitTestUtils');

const getOptions = utils.getOptions;
const checkUrlAndMethod = utils.checkUrlAndMethod;
const checkCallback = utils.checkCallback;
const checkMediaHeaders = utils.checkMediaHeaders;
const missingParamsSuccess = utils.missingParamsSuccess;
const missingParamsError = utils.missingParamsError;
const checkForEmptyObject = utils.checkForEmptyObject;
const checkRequiredParamsHandling = utils.checkRequiredParamsHandling;

const checkDefaultSuccessArgs = utils.checkDefaultSuccessArgs;
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
      assistant.message(params);

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

      assistant.message(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.createWorkspace(params);

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

      assistant.createWorkspace(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      assistant.createWorkspace();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      assistant.createWorkspace(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      assistant.deleteWorkspace(params);

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

      assistant.deleteWorkspace(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.getWorkspace(params);

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

      assistant.getWorkspace(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listWorkspaces(params);

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

      assistant.listWorkspaces(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      assistant.listWorkspaces();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      assistant.listWorkspaces(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      assistant.updateWorkspace(params);

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

      assistant.updateWorkspace(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.createIntent(params);

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

      assistant.createIntent(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.deleteIntent(params);

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

      assistant.deleteIntent(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.getIntent(params);

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

      assistant.getIntent(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listIntents(params);

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

      assistant.listIntents(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.updateIntent(params);

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

      assistant.updateIntent(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.createExample(params);

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

      assistant.createExample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.deleteExample(params);

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

      assistant.deleteExample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.getExample(params);

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

      assistant.getExample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listExamples(params);

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

      assistant.listExamples(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.updateExample(params);

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

      assistant.updateExample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.createCounterexample(params);

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

      assistant.createCounterexample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.deleteCounterexample(params);

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

      assistant.deleteCounterexample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.getCounterexample(params);

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

      assistant.getCounterexample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listCounterexamples(params);

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

      assistant.listCounterexamples(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.updateCounterexample(params);

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

      assistant.updateCounterexample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.createEntity(params);

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

      assistant.createEntity(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.deleteEntity(params);

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

      assistant.deleteEntity(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.getEntity(params);

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

      assistant.getEntity(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listEntities(params);

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

      assistant.listEntities(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.updateEntity(params);

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

      assistant.updateEntity(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listMentions(params);

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

      assistant.listMentions(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.createValue(params);

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

      assistant.createValue(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.deleteValue(params);

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

      assistant.deleteValue(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.getValue(params);

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

      assistant.getValue(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listValues(params);

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

      assistant.listValues(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.updateValue(params);

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

      assistant.updateValue(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.createSynonym(params);

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

      assistant.createSynonym(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.deleteSynonym(params);

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

      assistant.deleteSynonym(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.getSynonym(params);

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

      assistant.getSynonym(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listSynonyms(params);

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

      assistant.listSynonyms(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.updateSynonym(params);

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

      assistant.updateSynonym(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.createDialogNode(params);

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

      assistant.createDialogNode(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.deleteDialogNode(params);

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

      assistant.deleteDialogNode(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.getDialogNode(params);

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

      assistant.getDialogNode(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listDialogNodes(params);

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

      assistant.listDialogNodes(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.updateDialogNode(params);

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

      assistant.updateDialogNode(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listAllLogs(params);

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

      assistant.listAllLogs(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.listLogs(params);

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

      assistant.listLogs(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      assistant.deleteUserData(params);

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

      assistant.deleteUserData(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
  });
});
