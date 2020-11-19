/**
 * (C) Copyright IBM Corp. 2020.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const ToneAnalyzerV3 = require('../../dist/tone-analyzer/v3');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com',
  version: 'testString',
};

const toneAnalyzerService = new ToneAnalyzerV3(service);

// dont actually create a request
const createRequestMock = jest.spyOn(toneAnalyzerService, 'createRequest');
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

describe('ToneAnalyzerV3', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ToneAnalyzerV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ToneAnalyzerV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ToneAnalyzerV3.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ToneAnalyzerV3(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ToneAnalyzerV3(options);

      expect(testInstance.baseOptions.serviceName).toBe(ToneAnalyzerV3.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ToneAnalyzerV3(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new ToneAnalyzerV3(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new ToneAnalyzerV3(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('tone', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ToneInput
      const toneInputModel = {
        text: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation tone
        const toneInput = toneInputModel;
        const contentType = 'application/json';
        const sentences = true;
        const tones = ['emotion'];
        const contentLanguage = 'en';
        const acceptLanguage = 'ar';
        const params = {
          toneInput: toneInput,
          contentType: contentType,
          sentences: sentences,
          tones: tones,
          contentLanguage: contentLanguage,
          acceptLanguage: acceptLanguage,
        };

        const toneResult = toneAnalyzerService.tone(params);

        // all methods should return a Promise
        expectToBePromise(toneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tone', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'Content-Language', contentLanguage);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(options.body).toEqual(toneInput);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['sentences']).toEqual(sentences);
        expect(options.qs['tones']).toEqual(tones);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const toneInput = toneInputModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          toneInput,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        toneAnalyzerService.tone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await toneAnalyzerService.tone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const tonePromise = toneAnalyzerService.tone();
        expectToBePromise(tonePromise);

        tonePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('toneChat', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Utterance
      const utteranceModel = {
        text: 'testString',
        user: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation toneChat
        const utterances = [utteranceModel];
        const contentLanguage = 'en';
        const acceptLanguage = 'ar';
        const params = {
          utterances: utterances,
          contentLanguage: contentLanguage,
          acceptLanguage: acceptLanguage,
        };

        const toneChatResult = toneAnalyzerService.toneChat(params);

        // all methods should return a Promise
        expectToBePromise(toneChatResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tone_chat', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Language', contentLanguage);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(options.body['utterances']).toEqual(utterances);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const utterances = [utteranceModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          utterances,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        toneAnalyzerService.toneChat(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await toneAnalyzerService.toneChat({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const toneChatPromise = toneAnalyzerService.toneChat();
        expectToBePromise(toneChatPromise);

        toneChatPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
