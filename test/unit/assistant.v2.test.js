const AssistantV2 = require('../../assistant/v2');
const helper = require('../../lib/helper');
const utils = require('../resources/unitTestUtils');

const {
  missingParamsError,
  missingParamsSuccess,
  checkUrlAndMethod,
  checkCallback,
  checkHeaders,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  getOptions,
} = utils;

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/assistant/api',
  version: '2018-09-19',
};

const assistant = new AssistantV2(service);
const createRequestMock = jest.spyOn(assistant, 'createRequest');
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
      assistant.createSession(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      // check `options` object
      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v2/assistants/{assistant_id}/sessions', 'POST');
      checkHeaders(createRequestMock, 'application/json', 'application/json');
      checkCallback(createRequestMock);

      // all parameters
      expect(options.path.assistant_id).toEqual(assistant_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const assistant_id = 'fake_assistant_id';
      const accept = 'fake/header';
      const params = {
        assistant_id,
        headers: {
          Accept: accept,
        },
      };

      // invoke the method
      assistant.createSession(params);
      checkHeaders(createRequestMock, accept);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      // invoke the method
      assistant.createSession(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['assistant_id'];

      // invoke the method
      assistant.createSession({}, err => {
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
      assistant.deleteSession(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      // check `options` object
      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v2/assistants/{assistant_id}/sessions/{session_id}', 'DELETE');
      checkHeaders(createRequestMock, 'application/json');
      checkCallback(createRequestMock);

      // parameters
      expect(options.path.assistant_id).toEqual(assistant_id);
      expect(options.path.session_id).toEqual(session_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const assistant_id = 'fake_assistant_id';
      const session_id = 'fake_session_id';
      const accept = 'fake/header';
      const params = {
        assistant_id,
        session_id,
        headers: {
          Accept: accept,
        },
      };

      // invoke the method
      assistant.deleteSession(params);
      checkHeaders(createRequestMock, accept);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      assistant.deleteSession(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameter', done => {
      // required parameters for this method
      const requiredParams = ['assistant_id', 'session_id'];

      // invoke the method
      assistant.deleteSession({}, err => {
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
      assistant.message(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v2/assistants/{assistant_id}/sessions/{session_id}/message',
        'POST'
      );
      checkHeaders(createRequestMock, 'application/json', 'application/json');
      checkCallback(createRequestMock);

      // parameters
      expect(options.path.assistant_id).toEqual(assistant_id);
      expect(options.path.session_id).toEqual(session_id);
      expect(options.body.input).toEqual(input);
      expect(options.body.context).toEqual(context);
      expect(options.json).toEqual(true);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const assistant_id = 'fake_assistant_id';
      const session_id = 'fake_session_id';
      const accept = 'fake/header';
      const params = {
        assistant_id,
        session_id,
        headers: {
          Accept: accept,
        },
      };

      // invoke the method
      assistant.message(params);
      checkHeaders(createRequestMock, accept);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      assistant.deleteSession(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameter', done => {
      // required parameters for this method
      const requiredParams = ['assistant_id', 'session_id'];

      // invoke the method
      assistant.deleteSession({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
