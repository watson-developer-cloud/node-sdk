/**
 * (C) Copyright IBM Corp. 2018, 2020.
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

const { NoAuthAuthenticator, unitTestUtils } = require('ibm-cloud-sdk-core');
const TextToSpeechV1 = require('../../dist/text-to-speech/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com',
};

const textToSpeech = new TextToSpeechV1(service);
const createRequestMock = jest.spyOn(textToSpeech, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('TextToSpeechV1', () => {
  describe('listVoices', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const params = {};

        const listVoicesResult = textToSpeech.listVoices(params);

        // all methods should return a Promise
        expectToBePromise(listVoicesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/voices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        textToSpeech.listVoices(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        textToSpeech.listVoices({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await textToSpeech.listVoices(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getVoice', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const voice = 'fake_voice';
        const customizationId = 'fake_customizationId';
        const params = {
          voice,
          customizationId,
        };

        const getVoiceResult = textToSpeech.getVoice(params);

        // all methods should return a Promise
        expectToBePromise(getVoiceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/voices/{voice}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['customization_id']).toEqual(customizationId);
        expect(options.path['voice']).toEqual(voice);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const voice = 'fake_voice';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          voice,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.getVoice(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['voice'];

        let err;
        try {
          await textToSpeech.getVoice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['voice'];

        const getVoicePromise = textToSpeech.getVoice();
        expectToBePromise(getVoicePromise);

        getVoicePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('synthesize', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const text = 'fake_text';
        const accept = 'fake_accept';
        const voice = 'fake_voice';
        const customizationId = 'fake_customizationId';
        const params = {
          text,
          accept,
          voice,
          customizationId,
        };

        const synthesizeResult = textToSpeech.synthesize(params);

        // all methods should return a Promise
        expectToBePromise(synthesizeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/synthesize', 'POST');
        const expectedAccept = accept;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(options.body['text']).toEqual(text);
        expect(options.qs['voice']).toEqual(voice);
        expect(options.qs['customization_id']).toEqual(customizationId);
        expect(options.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.synthesize(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['text'];

        let err;
        try {
          await textToSpeech.synthesize({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['text'];

        const synthesizePromise = textToSpeech.synthesize();
        expectToBePromise(synthesizePromise);

        synthesizePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPronunciation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const text = 'fake_text';
        const voice = 'fake_voice';
        const format = 'fake_format';
        const customizationId = 'fake_customizationId';
        const params = {
          text,
          voice,
          format,
          customizationId,
        };

        const getPronunciationResult = textToSpeech.getPronunciation(params);

        // all methods should return a Promise
        expectToBePromise(getPronunciationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/pronunciation', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['text']).toEqual(text);
        expect(options.qs['voice']).toEqual(voice);
        expect(options.qs['format']).toEqual(format);
        expect(options.qs['customization_id']).toEqual(customizationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const text = 'fake_text';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          text,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.getPronunciation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['text'];

        let err;
        try {
          await textToSpeech.getPronunciation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['text'];

        const getPronunciationPromise = textToSpeech.getPronunciation();
        expectToBePromise(getPronunciationPromise);

        getPronunciationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createVoiceModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const name = 'fake_name';
        const language = 'fake_language';
        const description = 'fake_description';
        const params = {
          name,
          language,
          description,
        };

        const createVoiceModelResult = textToSpeech.createVoiceModel(params);

        // all methods should return a Promise
        expectToBePromise(createVoiceModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['language']).toEqual(language);
        expect(options.body['description']).toEqual(description);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'fake_name';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.createVoiceModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['name'];

        let err;
        try {
          await textToSpeech.createVoiceModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['name'];

        const createVoiceModelPromise = textToSpeech.createVoiceModel();
        expectToBePromise(createVoiceModelPromise);

        createVoiceModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listVoiceModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const language = 'fake_language';
        const params = {
          language,
        };

        const listVoiceModelsResult = textToSpeech.listVoiceModels(params);

        // all methods should return a Promise
        expectToBePromise(listVoiceModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['language']).toEqual(language);
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

        textToSpeech.listVoiceModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        textToSpeech.listVoiceModels({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await textToSpeech.listVoiceModels(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('updateVoiceModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const name = 'fake_name';
        const description = 'fake_description';
        const words = 'fake_words';
        const params = {
          customizationId,
          name,
          description,
          words,
        };

        const updateVoiceModelResult = textToSpeech.updateVoiceModel(params);

        // all methods should return a Promise
        expectToBePromise(updateVoiceModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['words']).toEqual(words);
        expect(options.path['customization_id']).toEqual(customizationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.updateVoiceModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await textToSpeech.updateVoiceModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const updateVoiceModelPromise = textToSpeech.updateVoiceModel();
        expectToBePromise(updateVoiceModelPromise);

        updateVoiceModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getVoiceModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const getVoiceModelResult = textToSpeech.getVoiceModel(params);

        // all methods should return a Promise
        expectToBePromise(getVoiceModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.getVoiceModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await textToSpeech.getVoiceModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const getVoiceModelPromise = textToSpeech.getVoiceModel();
        expectToBePromise(getVoiceModelPromise);

        getVoiceModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteVoiceModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const deleteVoiceModelResult = textToSpeech.deleteVoiceModel(params);

        // all methods should return a Promise
        expectToBePromise(deleteVoiceModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.deleteVoiceModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await textToSpeech.deleteVoiceModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const deleteVoiceModelPromise = textToSpeech.deleteVoiceModel();
        expectToBePromise(deleteVoiceModelPromise);

        deleteVoiceModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addWords', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const words = 'fake_words';
        const params = {
          customizationId,
          words,
        };

        const addWordsResult = textToSpeech.addWords(params);

        // all methods should return a Promise
        expectToBePromise(addWordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['words']).toEqual(words);
        expect(options.path['customization_id']).toEqual(customizationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const words = 'fake_words';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          words,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.addWords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'words'];

        let err;
        try {
          await textToSpeech.addWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'words'];

        const addWordsPromise = textToSpeech.addWords();
        expectToBePromise(addWordsPromise);

        addWordsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listWords', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const listWordsResult = textToSpeech.listWords(params);

        // all methods should return a Promise
        expectToBePromise(listWordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.listWords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await textToSpeech.listWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const listWordsPromise = textToSpeech.listWords();
        expectToBePromise(listWordsPromise);

        listWordsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addWord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const word = 'fake_word';
        const translation = 'fake_translation';
        const partOfSpeech = 'fake_partOfSpeech';
        const params = {
          customizationId,
          word,
          translation,
          partOfSpeech,
        };

        const addWordResult = textToSpeech.addWord(params);

        // all methods should return a Promise
        expectToBePromise(addWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word}', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['translation']).toEqual(translation);
        expect(options.body['part_of_speech']).toEqual(partOfSpeech);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['word']).toEqual(word);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const word = 'fake_word';
        const translation = 'fake_translation';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          word,
          translation,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.addWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'word', 'translation'];

        let err;
        try {
          await textToSpeech.addWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'word', 'translation'];

        const addWordPromise = textToSpeech.addWord();
        expectToBePromise(addWordPromise);

        addWordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getWord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const word = 'fake_word';
        const params = {
          customizationId,
          word,
        };

        const getWordResult = textToSpeech.getWord(params);

        // all methods should return a Promise
        expectToBePromise(getWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['word']).toEqual(word);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const word = 'fake_word';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          word,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.getWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'word'];

        let err;
        try {
          await textToSpeech.getWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'word'];

        const getWordPromise = textToSpeech.getWord();
        expectToBePromise(getWordPromise);

        getWordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteWord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const word = 'fake_word';
        const params = {
          customizationId,
          word,
        };

        const deleteWordResult = textToSpeech.deleteWord(params);

        // all methods should return a Promise
        expectToBePromise(deleteWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['word']).toEqual(word);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const word = 'fake_word';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          word,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        textToSpeech.deleteWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'word'];

        let err;
        try {
          await textToSpeech.deleteWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'word'];

        const deleteWordPromise = textToSpeech.deleteWord();
        expectToBePromise(deleteWordPromise);

        deleteWordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteUserData', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customerId = 'fake_customerId';
        const params = {
          customerId,
        };

        const deleteUserDataResult = textToSpeech.deleteUserData(params);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/user_data', 'DELETE');
        const expectedAccept = undefined;
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

        textToSpeech.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        let err;
        try {
          await textToSpeech.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        const deleteUserDataPromise = textToSpeech.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
