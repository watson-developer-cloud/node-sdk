const AssistantV2 = require('../../assistant/v2');
const helper = require('../../lib/helper');

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/assistant/api',
  version: '2018-09-19',
};

describe.skip('createSession', () => {
  describe('positive tests', () => {
    test('should pass the right params to createRequest', () => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock createRequest
      const createRequestMock = (assistant.createRequest = jest.fn());

      // parameters
      const assistant_id = 'fake_assistant_id';
      const params = {
        assistant_id,
      };

      // invoke method
      assistant.createSession(params);

      // assert that create request was called and extract called arguments
      expect(createRequestMock).toHaveBeenCalledTimes(1);
      const args = createRequestMock.mock.calls[0]; // only called once, so get args from first call
      const { options, defaultOptions } = args[0]; // the first arg is the parameters passed to create request

      // check `options` object
      expect(options.url).toEqual('/v2/assistants/{assistant_id}/sessions');
      expect(options.method).toEqual('POST');
      expect(options.path.assistant_id).toEqual(assistant_id);

      // check `headers` in the `defaultOptions` object
      const { headers } = defaultOptions;
      expect(headers.Accept).toEqual('application/json');
      expect(headers['Content-Type']).toEqual('application/json');

      // check callback, should be a function
      const callback = args[1];
      expect(callback).toBeInstanceOf(Function);
    });

    test('should prioritize user-given headers', () => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock createRequest
      const createRequestMock = (assistant.createRequest = jest.fn());

      // parameters
      const assistant_id = 'fake_assistant_id';
      const Accept = 'fake/header';
      const params = {
        assistant_id,
        headers: {
          Accept,
        },
      };

      // invoke the method
      assistant.createSession(params);

      // assert that create request was called and extract called arguments
      expect(createRequestMock).toHaveBeenCalledTimes(1);
      const { defaultOptions } = createRequestMock.mock.calls[0][0];

      // check `headers` in the `defaultOptions` object
      const { headers } = defaultOptions;
      expect(headers.Accept).toEqual(Accept);
      expect(headers['Content-Type']).toEqual('application/json');
    });
  });

  describe('negative tests', () => {
    test('should convert a `null` value for `params` to an empty object', done => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock getMissingParams
      const missingParamsMock = (helper.getMissingParams = jest.fn());

      // parameters
      const params = null;

      // invoke the method
      assistant.createSession(params, () => {
        // get arg to getMissingParams
        const userParams = missingParamsMock.mock.calls[0][0];

        // assert userParams is an object and is not null
        const emptyObject = {};
        expect(userParams).not.toBeNull();
        expect(userParams).toEqual(emptyObject);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock createRequest
      const createRequestMock = (assistant.createRequest = jest.fn());

      // mock getMissingParams, set to return a fake "error"
      const missingParamsMock = (helper.getMissingParams = jest.fn());
      const missingParamsError = 1; // fake error
      missingParamsMock.mockReturnValue(missingParamsError);

      // parameters
      const params = {};

      // invoke the method
      assistant.createSession(params, err => {
        // required parameters for this method
        const requiredParams = ['assistant_id'];

        // assert getMissingParams was called and extract called arguments
        expect(missingParamsMock).toHaveBeenCalledTimes(1);
        const userParams = missingParamsMock.mock.calls[0][0];
        const validatorParams = missingParamsMock.mock.calls[0][1];

        // assert getMissingParams is called with correct args
        expect(userParams).toEqual(params);
        expect(validatorParams).toEqual(requiredParams);

        // assert callback is called with missingParamsError
        expect(err).toEqual(missingParamsError);

        // assert createRequest is never called
        expect(createRequestMock).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});

describe.skip('deleteSession', () => {
  describe('positive tests', () => {
    test('should pass the right params to createRequest', () => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock createRequest
      const createRequestMock = (assistant.createRequest = jest.fn());

      // parameters
      const assistant_id = 'fake_assistant_id';
      const session_id = 'fake_session_id';
      const params = {
        assistant_id,
        session_id,
      };

      // invoke method
      assistant.deleteSession(params);

      // assert that create request was called and extract called arguments
      expect(createRequestMock).toHaveBeenCalledTimes(1);
      const args = createRequestMock.mock.calls[0]; // only called once, so get args from first call
      const { options, defaultOptions } = args[0]; // the first arg is the parameters passed to create request

      // check `options` object
      expect(options.url).toEqual('/v2/assistants/{assistant_id}/sessions/{session_id}');
      expect(options.method).toEqual('DELETE');
      expect(options.path.assistant_id).toEqual(assistant_id);
      expect(options.path.session_id).toEqual(session_id);

      // check `headers` in the `defaultOptions` object
      const { headers } = defaultOptions;
      expect(headers.Accept).toEqual('application/json');

      // check callback, should be a function
      const callback = args[1];
      expect(callback).toBeInstanceOf(Function);
    });

    test('should prioritize user-given headers', () => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock createRequest
      const createRequestMock = (assistant.createRequest = jest.fn());

      // parameters
      const assistant_id = 'fake_assistant_id';
      const session_id = 'fake_session_id';
      const Accept = 'fake/header';
      const params = {
        assistant_id,
        session_id,
        headers: {
          Accept,
        },
      };

      // invoke the method
      assistant.deleteSession(params);

      // assert that create request was called and extract called arguments
      expect(createRequestMock).toHaveBeenCalledTimes(1);
      const { defaultOptions } = createRequestMock.mock.calls[0][0];

      // check `headers` in the `defaultOptions` object
      const { headers } = defaultOptions;
      expect(headers.Accept).toEqual(Accept);
    });
  });

  describe('negative tests', () => {
    test('should convert a `null` value for `params` to an empty object', done => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock getMissingParams
      const missingParamsMock = (helper.getMissingParams = jest.fn());

      // parameters
      const params = null;

      // invoke the method
      assistant.deleteSession(params, () => {
        // get arg to getMissingParams
        const userParams = missingParamsMock.mock.calls[0][0];

        // assert userParams is an object and is not null
        const emptyObject = {};
        expect(userParams).not.toBeNull();
        expect(userParams).toEqual(emptyObject);
        done();
      });
    });

    test('should enforce required parameter', done => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock createRequest
      const createRequestMock = (assistant.createRequest = jest.fn());

      // mock getMissingParams, set to return a fake "error"
      const missingParamsMock = (helper.getMissingParams = jest.fn());
      const missingParamsError = 1; // fake error
      missingParamsMock.mockReturnValue(missingParamsError);

      // parameters
      const params = {};

      // invoke the method
      assistant.deleteSession(params, err => {
        // required parameters for this method
        const requiredParams = ['assistant_id', 'session_id'];

        // assert getMissingParams was called and extract called arguments
        expect(missingParamsMock).toHaveBeenCalledTimes(1);
        const userParams = missingParamsMock.mock.calls[0][0];
        const validatorParams = missingParamsMock.mock.calls[0][1];

        // assert getMissingParams is called with correct args
        expect(userParams).toEqual(params);
        expect(validatorParams).toEqual(requiredParams);

        // assert callback is called with missingParamsError
        expect(err).toEqual(missingParamsError);

        // assert createRequest is never called
        expect(createRequestMock).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});

describe('message', () => {
  describe('positive tests', () => {
    test('should pass the right params to createRequest', () => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock createRequest
      const createRequestMock = (assistant.createRequest = jest.fn());

      // parameters
      const assistant_id = 'fake_assistant_id';
      const session_id = 'fake_session_id';
      // so for objects parameters, we have two options.
      // we can either generate a fully done mockup...
      const input = {
        message_type: 'fake_message_type',
        text: 'fake_text',
        options: {
          debug: true,
          restart: true,
          alternate_intents: true,
          return_context: true,
        },
        intents: [
          {
            intent: 'fake_intent',
            confidence: 'fake_confidence',
          },
        ],
        entities: [
          {
            entity: 'fake_entity',
            location: [1],
            value: 'fake_value',
            confidence: 1,
            metadata: {},
            groups: [
              {
                group: 'fake_group',
                location: [1],
              },
            ],
          },
        ],
        suggestion_id: 'fake_suggestion_id',
      };
      // ... or just make it a string. the test will still pass and i'm not sure what could really
      // go wrong by not testing the object
      const context = 'fake_context'; // should have a type of MessageContext
      const params = {
        assistant_id,
        session_id,
        input,
        context,
      };

      // invoke method
      assistant.message(params);

      // assert that create request was called and extract called arguments
      expect(createRequestMock).toHaveBeenCalledTimes(1);
      const args = createRequestMock.mock.calls[0]; // only called once, so get args from first call
      const { options, defaultOptions } = args[0]; // the first arg is the parameters passed to create request

      // check `options` object
      expect(options.url).toEqual('/v2/assistants/{assistant_id}/sessions/{session_id}/message');
      expect(options.method).toEqual('POST');
      expect(options.path.assistant_id).toEqual(assistant_id);
      expect(options.path.session_id).toEqual(session_id);
      expect(options.body.input).toEqual(input);
      expect(options.body.context).toEqual(context);
      expect(options.json).toEqual(true); // not sure how we're going to know about this but i'm sure we will

      // check `headers` in the `defaultOptions` object
      const { headers } = defaultOptions;
      expect(headers.Accept).toEqual('application/json');
      expect(headers.Accept).toEqual('application/json');

      // check callback, should be a function
      const callback = args[1];
      expect(callback).toBeInstanceOf(Function);
    });

    test('should prioritize user-given headers', () => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock createRequest
      const createRequestMock = (assistant.createRequest = jest.fn());

      // parameters
      const assistant_id = 'fake_assistant_id';
      const session_id = 'fake_session_id';
      const Accept = 'fake/header';
      const params = {
        assistant_id,
        session_id,
        headers: {
          Accept,
        },
      };

      // invoke the method
      assistant.message(params);

      // assert that create request was called and extract called arguments
      expect(createRequestMock).toHaveBeenCalledTimes(1);
      const { defaultOptions } = createRequestMock.mock.calls[0][0];

      // check `headers` in the `defaultOptions` object
      const { headers } = defaultOptions;
      expect(headers.Accept).toEqual(Accept);
    });
  });

  describe('negative tests', () => {
    test('should convert a `null` value for `params` to an empty object', done => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock getMissingParams
      const missingParamsMock = (helper.getMissingParams = jest.fn());

      // parameters
      const params = null;

      // invoke the method
      assistant.message(params, () => {
        // get arg to getMissingParams
        const userParams = missingParamsMock.mock.calls[0][0];

        // assert userParams is an object and is not null
        const emptyObject = {};
        expect(userParams).not.toBeNull();
        expect(userParams).toEqual(emptyObject);
        done();
      });
    });

    test('should enforce required parameter', done => {
      // create the service instance
      const assistant = new AssistantV2(service);

      // mock createRequest
      const createRequestMock = (assistant.createRequest = jest.fn());

      // mock getMissingParams, set to return a fake "error"
      const missingParamsMock = (helper.getMissingParams = jest.fn());
      const missingParamsError = 1; // fake error
      missingParamsMock.mockReturnValue(missingParamsError);

      // parameters
      const params = {};

      // invoke the method
      assistant.message(params, err => {
        // required parameters for this method
        const requiredParams = ['assistant_id', 'session_id'];

        // assert getMissingParams was called and extract called arguments
        expect(missingParamsMock).toHaveBeenCalledTimes(1);
        const userParams = missingParamsMock.mock.calls[0][0];
        const validatorParams = missingParamsMock.mock.calls[0][1];

        // assert getMissingParams is called with correct args
        expect(userParams).toEqual(params);
        expect(validatorParams).toEqual(requiredParams);

        // assert callback is called with missingParamsError
        expect(err).toEqual(missingParamsError);

        // assert createRequest is never called
        expect(createRequestMock).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
