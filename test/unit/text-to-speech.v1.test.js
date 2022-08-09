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

const TextToSpeechV1 = require('../../dist/text-to-speech/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const textToSpeechServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com',
};

const textToSpeechService = new TextToSpeechV1(textToSpeechServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(textToSpeechService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('TextToSpeechV1', () => {

  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new TextToSpeechV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new TextToSpeechV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(TextToSpeechV1.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      const testInstance = new TextToSpeechV1(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new TextToSpeechV1(options);

      expect(testInstance.baseOptions.serviceName).toBe(TextToSpeechV1.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new TextToSpeechV1(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new TextToSpeechV1();

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });

  describe('listVoices', () => {
    describe('positive tests', () => {
      function __listVoicesTest() {
        // Construct the params object for operation listVoices
        const listVoicesParams = {};

        const listVoicesResult = textToSpeechService.listVoices(listVoicesParams);

        // all methods should return a Promise
        expectToBePromise(listVoicesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/voices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVoicesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __listVoicesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __listVoicesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVoicesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.listVoices(listVoicesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        textToSpeechService.listVoices({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getVoice', () => {
    describe('positive tests', () => {
      function __getVoiceTest() {
        // Construct the params object for operation getVoice
        const voice = 'ar-MS_OmarVoice';
        const customizationId = 'testString';
        const getVoiceParams = {
          voice: voice,
          customizationId: customizationId,
        };

        const getVoiceResult = textToSpeechService.getVoice(getVoiceParams);

        // all methods should return a Promise
        expectToBePromise(getVoiceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/voices/{voice}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.voice).toEqual(voice);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVoiceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __getVoiceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __getVoiceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const voice = 'ar-MS_OmarVoice';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVoiceParams = {
          voice,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getVoice(getVoiceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.getVoice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.getVoice();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('synthesize', () => {
    describe('positive tests', () => {
      function __synthesizeTest() {
        // Construct the params object for operation synthesize
        const text = 'testString';
        const accept = 'audio/ogg;codecs=opus';
        const voice = 'en-US_MichaelV3Voice';
        const customizationId = 'testString';
        const spellOutMode = 'default';
        const synthesizeParams = {
          text: text,
          accept: accept,
          voice: voice,
          customizationId: customizationId,
          spellOutMode: spellOutMode,
        };

        const synthesizeResult = textToSpeechService.synthesize(synthesizeParams);

        // all methods should return a Promise
        expectToBePromise(synthesizeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/synthesize', 'POST');
        const expectedAccept = accept;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.body.text).toEqual(text);
        expect(mockRequestOptions.qs.voice).toEqual(voice);
        expect(mockRequestOptions.qs.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.qs.spell_out_mode).toEqual(spellOutMode);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __synthesizeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __synthesizeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __synthesizeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const synthesizeParams = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.synthesize(synthesizeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.synthesize({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.synthesize();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPronunciation', () => {
    describe('positive tests', () => {
      function __getPronunciationTest() {
        // Construct the params object for operation getPronunciation
        const text = 'testString';
        const voice = 'en-US_MichaelV3Voice';
        const format = 'ipa';
        const customizationId = 'testString';
        const getPronunciationParams = {
          text: text,
          voice: voice,
          format: format,
          customizationId: customizationId,
        };

        const getPronunciationResult = textToSpeechService.getPronunciation(getPronunciationParams);

        // all methods should return a Promise
        expectToBePromise(getPronunciationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/pronunciation', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.text).toEqual(text);
        expect(mockRequestOptions.qs.voice).toEqual(voice);
        expect(mockRequestOptions.qs.format).toEqual(format);
        expect(mockRequestOptions.qs.customization_id).toEqual(customizationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPronunciationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __getPronunciationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __getPronunciationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPronunciationParams = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getPronunciation(getPronunciationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.getPronunciation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.getPronunciation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createCustomModel', () => {
    describe('positive tests', () => {
      function __createCustomModelTest() {
        // Construct the params object for operation createCustomModel
        const name = 'testString';
        const language = 'en-US';
        const description = 'testString';
        const createCustomModelParams = {
          name: name,
          language: language,
          description: description,
        };

        const createCustomModelResult = textToSpeechService.createCustomModel(createCustomModelParams);

        // all methods should return a Promise
        expectToBePromise(createCustomModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.language).toEqual(language);
        expect(mockRequestOptions.body.description).toEqual(description);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCustomModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __createCustomModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __createCustomModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCustomModelParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.createCustomModel(createCustomModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.createCustomModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.createCustomModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listCustomModels', () => {
    describe('positive tests', () => {
      function __listCustomModelsTest() {
        // Construct the params object for operation listCustomModels
        const language = 'ar-MS';
        const listCustomModelsParams = {
          language: language,
        };

        const listCustomModelsResult = textToSpeechService.listCustomModels(listCustomModelsParams);

        // all methods should return a Promise
        expectToBePromise(listCustomModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.language).toEqual(language);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCustomModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __listCustomModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __listCustomModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCustomModelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.listCustomModels(listCustomModelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        textToSpeechService.listCustomModels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateCustomModel', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Word
      const wordModel = {
        word: 'testString',
        translation: 'testString',
        part_of_speech: 'Dosi',
      };

      function __updateCustomModelTest() {
        // Construct the params object for operation updateCustomModel
        const customizationId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const words = [wordModel];
        const updateCustomModelParams = {
          customizationId: customizationId,
          name: name,
          description: description,
          words: words,
        };

        const updateCustomModelResult = textToSpeechService.updateCustomModel(updateCustomModelParams);

        // all methods should return a Promise
        expectToBePromise(updateCustomModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.words).toEqual(words);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCustomModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __updateCustomModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __updateCustomModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCustomModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.updateCustomModel(updateCustomModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.updateCustomModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.updateCustomModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCustomModel', () => {
    describe('positive tests', () => {
      function __getCustomModelTest() {
        // Construct the params object for operation getCustomModel
        const customizationId = 'testString';
        const getCustomModelParams = {
          customizationId: customizationId,
        };

        const getCustomModelResult = textToSpeechService.getCustomModel(getCustomModelParams);

        // all methods should return a Promise
        expectToBePromise(getCustomModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCustomModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __getCustomModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __getCustomModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCustomModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getCustomModel(getCustomModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.getCustomModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.getCustomModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCustomModel', () => {
    describe('positive tests', () => {
      function __deleteCustomModelTest() {
        // Construct the params object for operation deleteCustomModel
        const customizationId = 'testString';
        const deleteCustomModelParams = {
          customizationId: customizationId,
        };

        const deleteCustomModelResult = textToSpeechService.deleteCustomModel(deleteCustomModelParams);

        // all methods should return a Promise
        expectToBePromise(deleteCustomModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCustomModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __deleteCustomModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __deleteCustomModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.deleteCustomModel(deleteCustomModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.deleteCustomModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.deleteCustomModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addWords', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Word
      const wordModel = {
        word: 'testString',
        translation: 'testString',
        part_of_speech: 'Dosi',
      };

      function __addWordsTest() {
        // Construct the params object for operation addWords
        const customizationId = 'testString';
        const words = [wordModel];
        const addWordsParams = {
          customizationId: customizationId,
          words: words,
        };

        const addWordsResult = textToSpeechService.addWords(addWordsParams);

        // all methods should return a Promise
        expectToBePromise(addWordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/words', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.words).toEqual(words);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addWordsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __addWordsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __addWordsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const words = [wordModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addWordsParams = {
          customizationId,
          words,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.addWords(addWordsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.addWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.addWords();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listWords', () => {
    describe('positive tests', () => {
      function __listWordsTest() {
        // Construct the params object for operation listWords
        const customizationId = 'testString';
        const listWordsParams = {
          customizationId: customizationId,
        };

        const listWordsResult = textToSpeechService.listWords(listWordsParams);

        // all methods should return a Promise
        expectToBePromise(listWordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/words', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listWordsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __listWordsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __listWordsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listWordsParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.listWords(listWordsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.listWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.listWords();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addWord', () => {
    describe('positive tests', () => {
      function __addWordTest() {
        // Construct the params object for operation addWord
        const customizationId = 'testString';
        const word = 'testString';
        const translation = 'testString';
        const partOfSpeech = 'Dosi';
        const addWordParams = {
          customizationId: customizationId,
          word: word,
          translation: translation,
          partOfSpeech: partOfSpeech,
        };

        const addWordResult = textToSpeechService.addWord(addWordParams);

        // all methods should return a Promise
        expectToBePromise(addWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/words/{word}', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.translation).toEqual(translation);
        expect(mockRequestOptions.body.part_of_speech).toEqual(partOfSpeech);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.word).toEqual(word);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addWordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __addWordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __addWordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const word = 'testString';
        const translation = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addWordParams = {
          customizationId,
          word,
          translation,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.addWord(addWordParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.addWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.addWord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getWord', () => {
    describe('positive tests', () => {
      function __getWordTest() {
        // Construct the params object for operation getWord
        const customizationId = 'testString';
        const word = 'testString';
        const getWordParams = {
          customizationId: customizationId,
          word: word,
        };

        const getWordResult = textToSpeechService.getWord(getWordParams);

        // all methods should return a Promise
        expectToBePromise(getWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/words/{word}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.word).toEqual(word);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getWordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __getWordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __getWordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const word = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getWordParams = {
          customizationId,
          word,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getWord(getWordParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.getWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.getWord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteWord', () => {
    describe('positive tests', () => {
      function __deleteWordTest() {
        // Construct the params object for operation deleteWord
        const customizationId = 'testString';
        const word = 'testString';
        const deleteWordParams = {
          customizationId: customizationId,
          word: word,
        };

        const deleteWordResult = textToSpeechService.deleteWord(deleteWordParams);

        // all methods should return a Promise
        expectToBePromise(deleteWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/words/{word}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.word).toEqual(word);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteWordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __deleteWordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __deleteWordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const word = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteWordParams = {
          customizationId,
          word,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.deleteWord(deleteWordParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.deleteWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.deleteWord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listCustomPrompts', () => {
    describe('positive tests', () => {
      function __listCustomPromptsTest() {
        // Construct the params object for operation listCustomPrompts
        const customizationId = 'testString';
        const listCustomPromptsParams = {
          customizationId: customizationId,
        };

        const listCustomPromptsResult = textToSpeechService.listCustomPrompts(listCustomPromptsParams);

        // all methods should return a Promise
        expectToBePromise(listCustomPromptsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/prompts', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCustomPromptsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __listCustomPromptsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __listCustomPromptsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCustomPromptsParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.listCustomPrompts(listCustomPromptsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.listCustomPrompts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.listCustomPrompts();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addCustomPrompt', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PromptMetadata
      const promptMetadataModel = {
        prompt_text: 'testString',
        speaker_id: 'testString',
      };

      function __addCustomPromptTest() {
        // Construct the params object for operation addCustomPrompt
        const customizationId = 'testString';
        const promptId = 'testString';
        const metadata = promptMetadataModel;
        const file = Buffer.from('This is a mock file.');
        const addCustomPromptParams = {
          customizationId: customizationId,
          promptId: promptId,
          metadata: metadata,
          file: file,
        };

        const addCustomPromptResult = textToSpeechService.addCustomPrompt(addCustomPromptParams);

        // all methods should return a Promise
        expectToBePromise(addCustomPromptResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/prompts/{prompt_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.metadata).toEqual(metadata);
        expect(mockRequestOptions.formData.file.data).toEqual(file);
        expect(mockRequestOptions.formData.file.contentType).toEqual('audio/wav');
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.prompt_id).toEqual(promptId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addCustomPromptTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __addCustomPromptTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __addCustomPromptTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const promptId = 'testString';
        const metadata = promptMetadataModel;
        const file = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addCustomPromptParams = {
          customizationId,
          promptId,
          metadata,
          file,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.addCustomPrompt(addCustomPromptParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.addCustomPrompt({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.addCustomPrompt();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCustomPrompt', () => {
    describe('positive tests', () => {
      function __getCustomPromptTest() {
        // Construct the params object for operation getCustomPrompt
        const customizationId = 'testString';
        const promptId = 'testString';
        const getCustomPromptParams = {
          customizationId: customizationId,
          promptId: promptId,
        };

        const getCustomPromptResult = textToSpeechService.getCustomPrompt(getCustomPromptParams);

        // all methods should return a Promise
        expectToBePromise(getCustomPromptResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/prompts/{prompt_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.prompt_id).toEqual(promptId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCustomPromptTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __getCustomPromptTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __getCustomPromptTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const promptId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCustomPromptParams = {
          customizationId,
          promptId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getCustomPrompt(getCustomPromptParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.getCustomPrompt({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.getCustomPrompt();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCustomPrompt', () => {
    describe('positive tests', () => {
      function __deleteCustomPromptTest() {
        // Construct the params object for operation deleteCustomPrompt
        const customizationId = 'testString';
        const promptId = 'testString';
        const deleteCustomPromptParams = {
          customizationId: customizationId,
          promptId: promptId,
        };

        const deleteCustomPromptResult = textToSpeechService.deleteCustomPrompt(deleteCustomPromptParams);

        // all methods should return a Promise
        expectToBePromise(deleteCustomPromptResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/prompts/{prompt_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.prompt_id).toEqual(promptId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCustomPromptTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __deleteCustomPromptTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __deleteCustomPromptTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const promptId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomPromptParams = {
          customizationId,
          promptId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.deleteCustomPrompt(deleteCustomPromptParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.deleteCustomPrompt({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.deleteCustomPrompt();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSpeakerModels', () => {
    describe('positive tests', () => {
      function __listSpeakerModelsTest() {
        // Construct the params object for operation listSpeakerModels
        const listSpeakerModelsParams = {};

        const listSpeakerModelsResult = textToSpeechService.listSpeakerModels(listSpeakerModelsParams);

        // all methods should return a Promise
        expectToBePromise(listSpeakerModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/speakers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSpeakerModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __listSpeakerModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __listSpeakerModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSpeakerModelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.listSpeakerModels(listSpeakerModelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        textToSpeechService.listSpeakerModels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createSpeakerModel', () => {
    describe('positive tests', () => {
      function __createSpeakerModelTest() {
        // Construct the params object for operation createSpeakerModel
        const speakerName = 'testString';
        const audio = Buffer.from('This is a mock file.');
        const createSpeakerModelParams = {
          speakerName: speakerName,
          audio: audio,
        };

        const createSpeakerModelResult = textToSpeechService.createSpeakerModel(createSpeakerModelParams);

        // all methods should return a Promise
        expectToBePromise(createSpeakerModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/speakers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'audio/wav';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(audio);
        expect(mockRequestOptions.qs.speaker_name).toEqual(speakerName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSpeakerModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __createSpeakerModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __createSpeakerModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const speakerName = 'testString';
        const audio = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSpeakerModelParams = {
          speakerName,
          audio,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.createSpeakerModel(createSpeakerModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.createSpeakerModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.createSpeakerModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSpeakerModel', () => {
    describe('positive tests', () => {
      function __getSpeakerModelTest() {
        // Construct the params object for operation getSpeakerModel
        const speakerId = 'testString';
        const getSpeakerModelParams = {
          speakerId: speakerId,
        };

        const getSpeakerModelResult = textToSpeechService.getSpeakerModel(getSpeakerModelParams);

        // all methods should return a Promise
        expectToBePromise(getSpeakerModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/speakers/{speaker_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.speaker_id).toEqual(speakerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSpeakerModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __getSpeakerModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __getSpeakerModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const speakerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSpeakerModelParams = {
          speakerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getSpeakerModel(getSpeakerModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.getSpeakerModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.getSpeakerModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSpeakerModel', () => {
    describe('positive tests', () => {
      function __deleteSpeakerModelTest() {
        // Construct the params object for operation deleteSpeakerModel
        const speakerId = 'testString';
        const deleteSpeakerModelParams = {
          speakerId: speakerId,
        };

        const deleteSpeakerModelResult = textToSpeechService.deleteSpeakerModel(deleteSpeakerModelParams);

        // all methods should return a Promise
        expectToBePromise(deleteSpeakerModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/speakers/{speaker_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.speaker_id).toEqual(speakerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSpeakerModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __deleteSpeakerModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
        __deleteSpeakerModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const speakerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSpeakerModelParams = {
          speakerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.deleteSpeakerModel(deleteSpeakerModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.deleteSpeakerModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.deleteSpeakerModel();
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

        const deleteUserDataResult = textToSpeechService.deleteUserData(deleteUserDataParams);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/user_data', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.customer_id).toEqual(customerId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteUserDataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.enableRetries();
        __deleteUserDataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        textToSpeechService.disableRetries();
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

        textToSpeechService.deleteUserData(deleteUserDataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await textToSpeechService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await textToSpeechService.deleteUserData();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
