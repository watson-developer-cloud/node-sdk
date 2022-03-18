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

// dont actually create a request
const createRequestMock = jest.spyOn(textToSpeechService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('TextToSpeechV1', () => {
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listVoices
        const params = {};

        const listVoicesResult = textToSpeechService.listVoices(params);

        // all methods should return a Promise
        expectToBePromise(listVoicesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/voices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        textToSpeechService.listVoices(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getVoice
        const voice = 'ar-AR_OmarVoice';
        const customizationId = 'testString';
        const params = {
          voice: voice,
          customizationId: customizationId,
        };

        const getVoiceResult = textToSpeechService.getVoice(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const voice = 'ar-AR_OmarVoice';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          voice,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getVoice(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.getVoice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getVoicePromise = textToSpeechService.getVoice();
        expectToBePromise(getVoicePromise);

        getVoicePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('synthesize', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation synthesize
        const text = 'testString';
        const accept = 'audio/ogg;codecs=opus';
        const voice = 'en-US_MichaelV3Voice';
        const customizationId = 'testString';
        const params = {
          text: text,
          accept: accept,
          voice: voice,
          customizationId: customizationId,
        };

        const synthesizeResult = textToSpeechService.synthesize(params);

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
        expect(mockRequestOptions.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.synthesize(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.synthesize({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const synthesizePromise = textToSpeechService.synthesize();
        expectToBePromise(synthesizePromise);

        synthesizePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPronunciation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPronunciation
        const text = 'testString';
        const voice = 'en-US_MichaelV3Voice';
        const format = 'ipa';
        const customizationId = 'testString';
        const params = {
          text: text,
          voice: voice,
          format: format,
          customizationId: customizationId,
        };

        const getPronunciationResult = textToSpeechService.getPronunciation(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getPronunciation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.getPronunciation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getPronunciationPromise = textToSpeechService.getPronunciation();
        expectToBePromise(getPronunciationPromise);

        getPronunciationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createCustomModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createCustomModel
        const name = 'testString';
        const language = 'en-US';
        const description = 'testString';
        const params = {
          name: name,
          language: language,
          description: description,
        };

        const createCustomModelResult = textToSpeechService.createCustomModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.createCustomModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.createCustomModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createCustomModelPromise = textToSpeechService.createCustomModel();
        expectToBePromise(createCustomModelPromise);

        createCustomModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listCustomModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCustomModels
        const language = 'ar-MS';
        const params = {
          language: language,
        };

        const listCustomModelsResult = textToSpeechService.listCustomModels(params);

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

        textToSpeechService.listCustomModels(params);
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateCustomModel
        const customizationId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const words = [wordModel];
        const params = {
          customizationId: customizationId,
          name: name,
          description: description,
          words: words,
        };

        const updateCustomModelResult = textToSpeechService.updateCustomModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.updateCustomModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.updateCustomModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateCustomModelPromise = textToSpeechService.updateCustomModel();
        expectToBePromise(updateCustomModelPromise);

        updateCustomModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCustomModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCustomModel
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const getCustomModelResult = textToSpeechService.getCustomModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getCustomModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.getCustomModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getCustomModelPromise = textToSpeechService.getCustomModel();
        expectToBePromise(getCustomModelPromise);

        getCustomModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCustomModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCustomModel
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const deleteCustomModelResult = textToSpeechService.deleteCustomModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.deleteCustomModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.deleteCustomModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteCustomModelPromise = textToSpeechService.deleteCustomModel();
        expectToBePromise(deleteCustomModelPromise);

        deleteCustomModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addWords
        const customizationId = 'testString';
        const words = [wordModel];
        const params = {
          customizationId: customizationId,
          words: words,
        };

        const addWordsResult = textToSpeechService.addWords(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const words = [wordModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          words,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.addWords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.addWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const addWordsPromise = textToSpeechService.addWords();
        expectToBePromise(addWordsPromise);

        addWordsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listWords', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listWords
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const listWordsResult = textToSpeechService.listWords(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.listWords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.listWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listWordsPromise = textToSpeechService.listWords();
        expectToBePromise(listWordsPromise);

        listWordsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addWord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addWord
        const customizationId = 'testString';
        const word = 'testString';
        const translation = 'testString';
        const partOfSpeech = 'Dosi';
        const params = {
          customizationId: customizationId,
          word: word,
          translation: translation,
          partOfSpeech: partOfSpeech,
        };

        const addWordResult = textToSpeechService.addWord(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const word = 'testString';
        const translation = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          word,
          translation,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.addWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.addWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const addWordPromise = textToSpeechService.addWord();
        expectToBePromise(addWordPromise);

        addWordPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getWord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getWord
        const customizationId = 'testString';
        const word = 'testString';
        const params = {
          customizationId: customizationId,
          word: word,
        };

        const getWordResult = textToSpeechService.getWord(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const word = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          word,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.getWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getWordPromise = textToSpeechService.getWord();
        expectToBePromise(getWordPromise);

        getWordPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteWord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteWord
        const customizationId = 'testString';
        const word = 'testString';
        const params = {
          customizationId: customizationId,
          word: word,
        };

        const deleteWordResult = textToSpeechService.deleteWord(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const word = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          word,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.deleteWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.deleteWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteWordPromise = textToSpeechService.deleteWord();
        expectToBePromise(deleteWordPromise);

        deleteWordPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listCustomPrompts', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCustomPrompts
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const listCustomPromptsResult = textToSpeechService.listCustomPrompts(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.listCustomPrompts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.listCustomPrompts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listCustomPromptsPromise = textToSpeechService.listCustomPrompts();
        expectToBePromise(listCustomPromptsPromise);

        listCustomPromptsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addCustomPrompt
        const customizationId = 'testString';
        const promptId = 'testString';
        const metadata = promptMetadataModel;
        const file = Buffer.from('This is a mock file.');
        const params = {
          customizationId: customizationId,
          promptId: promptId,
          metadata: metadata,
          file: file,
        };

        const addCustomPromptResult = textToSpeechService.addCustomPrompt(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const promptId = 'testString';
        const metadata = promptMetadataModel;
        const file = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          promptId,
          metadata,
          file,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.addCustomPrompt(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.addCustomPrompt({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const addCustomPromptPromise = textToSpeechService.addCustomPrompt();
        expectToBePromise(addCustomPromptPromise);

        addCustomPromptPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCustomPrompt', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCustomPrompt
        const customizationId = 'testString';
        const promptId = 'testString';
        const params = {
          customizationId: customizationId,
          promptId: promptId,
        };

        const getCustomPromptResult = textToSpeechService.getCustomPrompt(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const promptId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          promptId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getCustomPrompt(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.getCustomPrompt({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getCustomPromptPromise = textToSpeechService.getCustomPrompt();
        expectToBePromise(getCustomPromptPromise);

        getCustomPromptPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCustomPrompt', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCustomPrompt
        const customizationId = 'testString';
        const promptId = 'testString';
        const params = {
          customizationId: customizationId,
          promptId: promptId,
        };

        const deleteCustomPromptResult = textToSpeechService.deleteCustomPrompt(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const promptId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          promptId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.deleteCustomPrompt(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.deleteCustomPrompt({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteCustomPromptPromise = textToSpeechService.deleteCustomPrompt();
        expectToBePromise(deleteCustomPromptPromise);

        deleteCustomPromptPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSpeakerModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSpeakerModels
        const params = {};

        const listSpeakerModelsResult = textToSpeechService.listSpeakerModels(params);

        // all methods should return a Promise
        expectToBePromise(listSpeakerModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/speakers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        textToSpeechService.listSpeakerModels(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSpeakerModel
        const speakerName = 'testString';
        const audio = Buffer.from('This is a mock file.');
        const params = {
          speakerName: speakerName,
          audio: audio,
        };

        const createSpeakerModelResult = textToSpeechService.createSpeakerModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const speakerName = 'testString';
        const audio = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          speakerName,
          audio,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.createSpeakerModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.createSpeakerModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createSpeakerModelPromise = textToSpeechService.createSpeakerModel();
        expectToBePromise(createSpeakerModelPromise);

        createSpeakerModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSpeakerModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSpeakerModel
        const speakerId = 'testString';
        const params = {
          speakerId: speakerId,
        };

        const getSpeakerModelResult = textToSpeechService.getSpeakerModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const speakerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          speakerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.getSpeakerModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.getSpeakerModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSpeakerModelPromise = textToSpeechService.getSpeakerModel();
        expectToBePromise(getSpeakerModelPromise);

        getSpeakerModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSpeakerModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSpeakerModel
        const speakerId = 'testString';
        const params = {
          speakerId: speakerId,
        };

        const deleteSpeakerModelResult = textToSpeechService.deleteSpeakerModel(params);

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
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const speakerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          speakerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeechService.deleteSpeakerModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.deleteSpeakerModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteSpeakerModelPromise = textToSpeechService.deleteSpeakerModel();
        expectToBePromise(deleteSpeakerModelPromise);

        deleteSpeakerModelPromise.catch((err) => {
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

        const deleteUserDataResult = textToSpeechService.deleteUserData(params);

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

        textToSpeechService.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await textToSpeechService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteUserDataPromise = textToSpeechService.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
