/**
 * (C) Copyright IBM Corp. 2018, 2019.
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
const AssistantV2 = require('../../assistant/v2');
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
} = utils;

const noop = () => {};

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://gateway.watsonplatform.net/assistant/api/assistant/api',
  version: '2018-10-18',
};

const assistant = new AssistantV2(service);
const createRequestMock = jest.spyOn(assistant, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

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
      const assistantId = 'fake_assistantId';
      const params = {
        assistantId,
      };

      // invoke method
      assistant.createSession(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v2/assistants/{assistant_id}/sessions', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['assistant_id']).toEqual(assistantId);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const assistantId = 'fake_assistantId';
      const userAccept = 'fake/header';
      const userContentType = 'fake/header';
      const params = {
        assistantId,
        headers: {
          Accept: userAccept,
          'Content-Type': userContentType,
        },
      };

      assistant.createSession(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const assistantId = 'fake_assistantId';
      const params = {
        assistantId,
      };

      // invoke method
      const createSessionPromise = assistant.createSession(params);
      expectToBePromise(createSessionPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      assistant.createSession(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['assistantId'];

      assistant.createSession({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['assistantId'];

      const createSessionPromise = assistant.createSession();
      expectToBePromise(createSessionPromise);

      createSessionPromise.catch(err => {
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
      const assistantId = 'fake_assistantId';
      const sessionId = 'fake_sessionId';
      const params = {
        assistantId,
        sessionId,
      };

      // invoke method
      assistant.deleteSession(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v2/assistants/{assistant_id}/sessions/{session_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['assistant_id']).toEqual(assistantId);
      expect(options.path['session_id']).toEqual(sessionId);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const assistantId = 'fake_assistantId';
      const sessionId = 'fake_sessionId';
      const userAccept = 'fake/header';
      const userContentType = 'fake/header';
      const params = {
        assistantId,
        sessionId,
        headers: {
          Accept: userAccept,
          'Content-Type': userContentType,
        },
      };

      assistant.deleteSession(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const assistantId = 'fake_assistantId';
      const sessionId = 'fake_sessionId';
      const params = {
        assistantId,
        sessionId,
      };

      // invoke method
      const deleteSessionPromise = assistant.deleteSession(params);
      expectToBePromise(deleteSessionPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
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

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['assistantId', 'sessionId'];

      assistant.deleteSession({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['assistantId', 'sessionId'];

      const deleteSessionPromise = assistant.deleteSession();
      expectToBePromise(deleteSessionPromise);

      deleteSessionPromise.catch(err => {
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
      const assistantId = 'fake_assistantId';
      const sessionId = 'fake_sessionId';
      const input = 'fake_input';
      const context = 'fake_context';
      const params = {
        assistantId,
        sessionId,
        input,
        context,
      };

      // invoke method
      assistant.message(params, noop);

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
      expect(options.path['assistant_id']).toEqual(assistantId);
      expect(options.path['session_id']).toEqual(sessionId);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const assistantId = 'fake_assistantId';
      const sessionId = 'fake_sessionId';
      const userAccept = 'fake/header';
      const userContentType = 'fake/header';
      const params = {
        assistantId,
        sessionId,
        headers: {
          Accept: userAccept,
          'Content-Type': userContentType,
        },
      };

      assistant.message(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const assistantId = 'fake_assistantId';
      const sessionId = 'fake_sessionId';
      const params = {
        assistantId,
        sessionId,
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
      const requiredParams = ['assistantId', 'sessionId'];

      assistant.message({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['assistantId', 'sessionId'];

      const messagePromise = assistant.message();
      expectToBePromise(messagePromise);

      messagePromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
