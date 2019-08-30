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
const TextToSpeechV1 = require('../../text-to-speech/v1');
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
  checkUserHeader,
  checkDefaultSuccessArgs,
} = utils;

const noop = () => {};

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://stream.watsonplatform.net/text-to-speech/api/text-to-speech/api',
  version: '2018-10-18',
};

const textToSpeech = new TextToSpeechV1(service);
const createRequestMock = jest.spyOn(textToSpeech, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('listVoices', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const params = {};

      // invoke method
      textToSpeech.listVoices(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/voices', 'GET');
      checkCallback(createRequestMock);
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

      textToSpeech.listVoices(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listVoicesPromise = textToSpeech.listVoices(params);
      expectToBePromise(listVoicesPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      textToSpeech.listVoices({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      textToSpeech.listVoices(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('getVoice', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const voice = 'fake_voice';
      const customizationId = 'fake_customizationId';
      const params = {
        voice,
        customizationId,
      };

      // invoke method
      textToSpeech.getVoice(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/voices/{voice}', 'GET');
      checkCallback(createRequestMock);
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

      textToSpeech.getVoice(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const voice = 'fake_voice';
      const params = {
        voice,
      };

      // invoke method
      const getVoicePromise = textToSpeech.getVoice(params);
      expectToBePromise(getVoicePromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.getVoice(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['voice'];

      textToSpeech.getVoice({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['voice'];

      const getVoicePromise = textToSpeech.getVoice();
      expectToBePromise(getVoicePromise);

      getVoicePromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('synthesize', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
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

      // invoke method
      textToSpeech.synthesize(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/synthesize', 'POST');
      checkCallback(createRequestMock);
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

      textToSpeech.synthesize(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const text = 'fake_text';
      const params = {
        text,
      };

      // invoke method
      const synthesizePromise = textToSpeech.synthesize(params);
      expectToBePromise(synthesizePromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.synthesize(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      textToSpeech.synthesize({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      const synthesizePromise = textToSpeech.synthesize();
      expectToBePromise(synthesizePromise);

      synthesizePromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getPronunciation', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
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

      // invoke method
      textToSpeech.getPronunciation(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/pronunciation', 'GET');
      checkCallback(createRequestMock);
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

      textToSpeech.getPronunciation(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const text = 'fake_text';
      const params = {
        text,
      };

      // invoke method
      const getPronunciationPromise = textToSpeech.getPronunciation(params);
      expectToBePromise(getPronunciationPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.getPronunciation(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      textToSpeech.getPronunciation({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      const getPronunciationPromise = textToSpeech.getPronunciation();
      expectToBePromise(getPronunciationPromise);

      getPronunciationPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('createVoiceModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
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

      // invoke method
      textToSpeech.createVoiceModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations', 'POST');
      checkCallback(createRequestMock);
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

      textToSpeech.createVoiceModel(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const name = 'fake_name';
      const params = {
        name,
      };

      // invoke method
      const createVoiceModelPromise = textToSpeech.createVoiceModel(params);
      expectToBePromise(createVoiceModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.createVoiceModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['name'];

      textToSpeech.createVoiceModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['name'];

      const createVoiceModelPromise = textToSpeech.createVoiceModel();
      expectToBePromise(createVoiceModelPromise);

      createVoiceModelPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listVoiceModels', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const language = 'fake_language';
      const params = {
        language,
      };

      // invoke method
      textToSpeech.listVoiceModels(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations', 'GET');
      checkCallback(createRequestMock);
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

      textToSpeech.listVoiceModels(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listVoiceModelsPromise = textToSpeech.listVoiceModels(params);
      expectToBePromise(listVoiceModelsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      textToSpeech.listVoiceModels({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      textToSpeech.listVoiceModels(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('updateVoiceModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
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

      // invoke method
      textToSpeech.updateVoiceModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'POST');
      checkCallback(createRequestMock);
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

      textToSpeech.updateVoiceModel(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const params = {
        customizationId,
      };

      // invoke method
      const updateVoiceModelPromise = textToSpeech.updateVoiceModel(params);
      expectToBePromise(updateVoiceModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.updateVoiceModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customizationId'];

      textToSpeech.updateVoiceModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customizationId'];

      const updateVoiceModelPromise = textToSpeech.updateVoiceModel();
      expectToBePromise(updateVoiceModelPromise);

      updateVoiceModelPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getVoiceModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const params = {
        customizationId,
      };

      // invoke method
      textToSpeech.getVoiceModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'GET');
      checkCallback(createRequestMock);
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

      textToSpeech.getVoiceModel(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const params = {
        customizationId,
      };

      // invoke method
      const getVoiceModelPromise = textToSpeech.getVoiceModel(params);
      expectToBePromise(getVoiceModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.getVoiceModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customizationId'];

      textToSpeech.getVoiceModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customizationId'];

      const getVoiceModelPromise = textToSpeech.getVoiceModel();
      expectToBePromise(getVoiceModelPromise);

      getVoiceModelPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteVoiceModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const params = {
        customizationId,
      };

      // invoke method
      textToSpeech.deleteVoiceModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'DELETE');
      checkCallback(createRequestMock);
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

      textToSpeech.deleteVoiceModel(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const params = {
        customizationId,
      };

      // invoke method
      const deleteVoiceModelPromise = textToSpeech.deleteVoiceModel(params);
      expectToBePromise(deleteVoiceModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.deleteVoiceModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customizationId'];

      textToSpeech.deleteVoiceModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customizationId'];

      const deleteVoiceModelPromise = textToSpeech.deleteVoiceModel();
      expectToBePromise(deleteVoiceModelPromise);

      deleteVoiceModelPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('addWords', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const words = 'fake_words';
      const params = {
        customizationId,
        words,
      };

      // invoke method
      textToSpeech.addWords(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words', 'POST');
      checkCallback(createRequestMock);
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

      textToSpeech.addWords(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const words = 'fake_words';
      const params = {
        customizationId,
        words,
      };

      // invoke method
      const addWordsPromise = textToSpeech.addWords(params);
      expectToBePromise(addWordsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.addWords(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customizationId', 'words'];

      textToSpeech.addWords({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customizationId', 'words'];

      const addWordsPromise = textToSpeech.addWords();
      expectToBePromise(addWordsPromise);

      addWordsPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listWords', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const params = {
        customizationId,
      };

      // invoke method
      textToSpeech.listWords(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words', 'GET');
      checkCallback(createRequestMock);
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

      textToSpeech.listWords(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const params = {
        customizationId,
      };

      // invoke method
      const listWordsPromise = textToSpeech.listWords(params);
      expectToBePromise(listWordsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.listWords(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customizationId'];

      textToSpeech.listWords({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customizationId'];

      const listWordsPromise = textToSpeech.listWords();
      expectToBePromise(listWordsPromise);

      listWordsPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('addWord', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
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

      // invoke method
      textToSpeech.addWord(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word}', 'PUT');
      checkCallback(createRequestMock);
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

      textToSpeech.addWord(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const word = 'fake_word';
      const translation = 'fake_translation';
      const params = {
        customizationId,
        word,
        translation,
      };

      // invoke method
      const addWordPromise = textToSpeech.addWord(params);
      expectToBePromise(addWordPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.addWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customizationId', 'word', 'translation'];

      textToSpeech.addWord({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customizationId', 'word', 'translation'];

      const addWordPromise = textToSpeech.addWord();
      expectToBePromise(addWordPromise);

      addWordPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getWord', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const word = 'fake_word';
      const params = {
        customizationId,
        word,
      };

      // invoke method
      textToSpeech.getWord(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word}', 'GET');
      checkCallback(createRequestMock);
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

      textToSpeech.getWord(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const word = 'fake_word';
      const params = {
        customizationId,
        word,
      };

      // invoke method
      const getWordPromise = textToSpeech.getWord(params);
      expectToBePromise(getWordPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.getWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customizationId', 'word'];

      textToSpeech.getWord({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customizationId', 'word'];

      const getWordPromise = textToSpeech.getWord();
      expectToBePromise(getWordPromise);

      getWordPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteWord', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const word = 'fake_word';
      const params = {
        customizationId,
        word,
      };

      // invoke method
      textToSpeech.deleteWord(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word}', 'DELETE');
      checkCallback(createRequestMock);
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

      textToSpeech.deleteWord(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customizationId = 'fake_customizationId';
      const word = 'fake_word';
      const params = {
        customizationId,
        word,
      };

      // invoke method
      const deleteWordPromise = textToSpeech.deleteWord(params);
      expectToBePromise(deleteWordPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      textToSpeech.deleteWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customizationId', 'word'];

      textToSpeech.deleteWord({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customizationId', 'word'];

      const deleteWordPromise = textToSpeech.deleteWord();
      expectToBePromise(deleteWordPromise);

      deleteWordPromise.catch(err => {
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
      const customerId = 'fake_customerId';
      const params = {
        customerId,
      };

      // invoke method
      textToSpeech.deleteUserData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/user_data', 'DELETE');
      checkCallback(createRequestMock);
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

      textToSpeech.deleteUserData(params, noop);
      checkMediaHeaders(createRequestMock, userAccept, userContentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customerId = 'fake_customerId';
      const params = {
        customerId,
      };

      // invoke method
      const deleteUserDataPromise = textToSpeech.deleteUserData(params);
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
      textToSpeech.deleteUserData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customerId'];

      textToSpeech.deleteUserData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customerId'];

      const deleteUserDataPromise = textToSpeech.deleteUserData();
      expectToBePromise(deleteUserDataPromise);

      deleteUserDataPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
