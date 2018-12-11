'use strict';

const AssistantV2 = require('../../assistant/v2');
const helper = require('../../lib/helper');
const utils = require('../resources/unitTestUtils');

const missingParamsError = utils.missingParamsError;
const missingParamsSuccess = utils.missingParamsSuccess;
const checkUrlAndMethod = utils.checkUrlAndMethod;
const checkCallback = utils.checkCallback;
const checkMediaHeaders = utils.checkMediaHeaders;
const checkForEmptyObject = utils.checkForEmptyObject;
const checkRequiredParamsHandling = utils.checkRequiredParamsHandling;
const getOptions = utils.getOptions;

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/assistant/api',
  version: '2018-10-18',
};

const conversation = new AssistantV2(service);
const createRequestMock = jest.spyOn(conversation, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('createSession', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const assistant_id = 'fake_assistant_id';
      const params = {
        assistant_id,
      };

      // invoke method
      conversation.createSession(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v2/assistants/{assistant_id}/sessions', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['assistant_id']).toEqual(assistant_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const assistant_id = 'fake_assistant_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        assistant_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      conversation.createSession(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      conversation.createSession(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['assistant_id'];

      conversation.createSession({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('deleteSession', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const assistant_id = 'fake_assistant_id';
      const session_id = 'fake_session_id';
      const params = {
        assistant_id,
        session_id,
      };

      // invoke method
      conversation.deleteSession(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v2/assistants/{assistant_id}/sessions/{session_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['assistant_id']).toEqual(assistant_id);
      expect(options.path['session_id']).toEqual(session_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const assistant_id = 'fake_assistant_id';
      const session_id = 'fake_session_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        assistant_id,
        session_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      conversation.deleteSession(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      conversation.deleteSession(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['assistant_id', 'session_id'];

      conversation.deleteSession({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('message', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const assistant_id = 'fake_assistant_id';
      const session_id = 'fake_session_id';
      const input = 'fake_input';
      const context = 'fake_context';
      const params = {
        assistant_id,
        session_id,
        input,
        context,
      };

      // invoke method
      conversation.message(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v2/assistants/{assistant_id}/sessions/{session_id}/message',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['input']).toEqual(input);
      expect(options.body['context']).toEqual(context);
      expect(options.json).toEqual(true);
      expect(options.path['assistant_id']).toEqual(assistant_id);
      expect(options.path['session_id']).toEqual(session_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const assistant_id = 'fake_assistant_id';
      const session_id = 'fake_session_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        assistant_id,
        session_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      conversation.message(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      conversation.message(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['assistant_id', 'session_id'];

      conversation.message({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
