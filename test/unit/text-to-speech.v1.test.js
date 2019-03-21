'use strict';

const TextToSpeechV1 = require('../../text-to-speech/v1-generated');
const helper = require('ibm-cloud-sdk-core');
const utils = require('../resources/unitTestUtils');

const missingParamsError = utils.missingParamsError;
const missingParamsSuccess = utils.missingParamsSuccess;
const checkUrlAndMethod = utils.checkUrlAndMethod;
const checkCallback = utils.checkCallback;
const checkMediaHeaders = utils.checkMediaHeaders;
const checkUserHeader = utils.checkUserHeader;
const checkDefaultSuccessArgs = utils.checkDefaultSuccessArgs;
const checkForEmptyObject = utils.checkForEmptyObject;
const checkRequiredParamsHandling = utils.checkRequiredParamsHandling;
const getOptions = utils.getOptions;
const expectToBePromise = utils.expectToBePromise;

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://stream.watsonplatform.net/text-to-speech/api',
  version: '2018-10-18',
};

const text_to_speech = new TextToSpeechV1(service);
const createRequestMock = jest.spyOn(text_to_speech, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');
const noop = () => {};

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('getVoice', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const voice = 'fake_voice';
      const customization_id = 'fake_customization_id';
      const params = {
        voice,
        customization_id,
      };

      // invoke method
      text_to_speech.getVoice(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/voices/{voice}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['customization_id']).toEqual(customization_id);
      expect(options.path['voice']).toEqual(voice);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const voice = 'fake_voice';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        voice,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.getVoice(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const voice = 'fake_voice';
      const params = {
        voice,
      };

      // invoke method
      const getVoicePromise = text_to_speech.getVoice(params);
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
      text_to_speech.getVoice(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['voice'];

      text_to_speech.getVoice({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['voice'];

      const getVoicePromise = text_to_speech.getVoice();
      expectToBePromise(getVoicePromise);

      getVoicePromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
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
      text_to_speech.listVoices(params, noop);

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
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.listVoices(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listVoicesPromise = text_to_speech.listVoices(params);
      expectToBePromise(listVoicesPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      text_to_speech.listVoices({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      text_to_speech.listVoices(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const customization_id = 'fake_customization_id';
      const params = {
        text,
        accept,
        voice,
        customization_id,
      };

      // invoke method
      text_to_speech.synthesize(params, noop);

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
      expect(options.qs['customization_id']).toEqual(customization_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.synthesize(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const text = 'fake_text';
      const params = {
        text,
      };

      // invoke method
      const synthesizePromise = text_to_speech.synthesize(params);
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
      text_to_speech.synthesize(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      text_to_speech.synthesize({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      const synthesizePromise = text_to_speech.synthesize();
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
      const customization_id = 'fake_customization_id';
      const params = {
        text,
        voice,
        format,
        customization_id,
      };

      // invoke method
      text_to_speech.getPronunciation(params, noop);

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
      expect(options.qs['customization_id']).toEqual(customization_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.getPronunciation(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const text = 'fake_text';
      const params = {
        text,
      };

      // invoke method
      const getPronunciationPromise = text_to_speech.getPronunciation(params);
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
      text_to_speech.getPronunciation(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      text_to_speech.getPronunciation({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['text'];

      const getPronunciationPromise = text_to_speech.getPronunciation();
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
      text_to_speech.createVoiceModel(params, noop);

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
      expect(options.json).toEqual(true);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const name = 'fake_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.createVoiceModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const name = 'fake_name';
      const params = {
        name,
      };

      // invoke method
      const createVoiceModelPromise = text_to_speech.createVoiceModel(params);
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
      text_to_speech.createVoiceModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['name'];

      text_to_speech.createVoiceModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['name'];

      const createVoiceModelPromise = text_to_speech.createVoiceModel();
      expectToBePromise(createVoiceModelPromise);

      createVoiceModelPromise.catch(err => {
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
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      text_to_speech.deleteVoiceModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.deleteVoiceModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const deleteVoiceModelPromise = text_to_speech.deleteVoiceModel(params);
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
      text_to_speech.deleteVoiceModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      text_to_speech.deleteVoiceModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const deleteVoiceModelPromise = text_to_speech.deleteVoiceModel();
      expectToBePromise(deleteVoiceModelPromise);

      deleteVoiceModelPromise.catch(err => {
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
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      text_to_speech.getVoiceModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.getVoiceModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const getVoiceModelPromise = text_to_speech.getVoiceModel(params);
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
      text_to_speech.getVoiceModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      text_to_speech.getVoiceModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const getVoiceModelPromise = text_to_speech.getVoiceModel();
      expectToBePromise(getVoiceModelPromise);

      getVoiceModelPromise.catch(err => {
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
      text_to_speech.listVoiceModels(params, noop);

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
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.listVoiceModels(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listVoiceModelsPromise = text_to_speech.listVoiceModels(params);
      expectToBePromise(listVoiceModelsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      text_to_speech.listVoiceModels({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      text_to_speech.listVoiceModels(noop);
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
      const customization_id = 'fake_customization_id';
      const name = 'fake_name';
      const description = 'fake_description';
      const words = 'fake_words';
      const params = {
        customization_id,
        name,
        description,
        words,
      };

      // invoke method
      text_to_speech.updateVoiceModel(params, noop);

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
      expect(options.json).toEqual(true);
      expect(options.path['customization_id']).toEqual(customization_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.updateVoiceModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const updateVoiceModelPromise = text_to_speech.updateVoiceModel(params);
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
      text_to_speech.updateVoiceModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      text_to_speech.updateVoiceModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const updateVoiceModelPromise = text_to_speech.updateVoiceModel();
      expectToBePromise(updateVoiceModelPromise);

      updateVoiceModelPromise.catch(err => {
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
      const customization_id = 'fake_customization_id';
      const word = 'fake_word';
      const translation = 'fake_translation';
      const part_of_speech = 'fake_part_of_speech';
      const params = {
        customization_id,
        word,
        translation,
        part_of_speech,
      };

      // invoke method
      text_to_speech.addWord(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word}', 'PUT');
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['translation']).toEqual(translation);
      expect(options.body['part_of_speech']).toEqual(part_of_speech);
      expect(options.json).toEqual(true);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['word']).toEqual(word);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word = 'fake_word';
      const translation = 'fake_translation';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        word,
        translation,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.addWord(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word = 'fake_word';
      const translation = 'fake_translation';
      const params = {
        customization_id,
        word,
        translation,
      };

      // invoke method
      const addWordPromise = text_to_speech.addWord(params);
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
      text_to_speech.addWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word', 'translation'];

      text_to_speech.addWord({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word', 'translation'];

      const addWordPromise = text_to_speech.addWord();
      expectToBePromise(addWordPromise);

      addWordPromise.catch(err => {
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
      const customization_id = 'fake_customization_id';
      const words = 'fake_words';
      const params = {
        customization_id,
        words,
      };

      // invoke method
      text_to_speech.addWords(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['words']).toEqual(words);
      expect(options.json).toEqual(true);
      expect(options.path['customization_id']).toEqual(customization_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const words = 'fake_words';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        words,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.addWords(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const words = 'fake_words';
      const params = {
        customization_id,
        words,
      };

      // invoke method
      const addWordsPromise = text_to_speech.addWords(params);
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
      text_to_speech.addWords(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'words'];

      text_to_speech.addWords({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'words'];

      const addWordsPromise = text_to_speech.addWords();
      expectToBePromise(addWordsPromise);

      addWordsPromise.catch(err => {
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
      const customization_id = 'fake_customization_id';
      const word = 'fake_word';
      const params = {
        customization_id,
        word,
      };

      // invoke method
      text_to_speech.deleteWord(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['word']).toEqual(word);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word = 'fake_word';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        word,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.deleteWord(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word = 'fake_word';
      const params = {
        customization_id,
        word,
      };

      // invoke method
      const deleteWordPromise = text_to_speech.deleteWord(params);
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
      text_to_speech.deleteWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word'];

      text_to_speech.deleteWord({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word'];

      const deleteWordPromise = text_to_speech.deleteWord();
      expectToBePromise(deleteWordPromise);

      deleteWordPromise.catch(err => {
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
      const customization_id = 'fake_customization_id';
      const word = 'fake_word';
      const params = {
        customization_id,
        word,
      };

      // invoke method
      text_to_speech.getWord(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['word']).toEqual(word);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word = 'fake_word';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        word,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.getWord(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word = 'fake_word';
      const params = {
        customization_id,
        word,
      };

      // invoke method
      const getWordPromise = text_to_speech.getWord(params);
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
      text_to_speech.getWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word'];

      text_to_speech.getWord({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word'];

      const getWordPromise = text_to_speech.getWord();
      expectToBePromise(getWordPromise);

      getWordPromise.catch(err => {
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
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      text_to_speech.listWords(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      text_to_speech.listWords(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const listWordsPromise = text_to_speech.listWords(params);
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
      text_to_speech.listWords(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      text_to_speech.listWords({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const listWordsPromise = text_to_speech.listWords();
      expectToBePromise(listWordsPromise);

      listWordsPromise.catch(err => {
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
      text_to_speech.deleteUserData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/user_data', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
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

      text_to_speech.deleteUserData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const params = {
        customer_id,
      };

      // invoke method
      const deleteUserDataPromise = text_to_speech.deleteUserData(params);
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
      text_to_speech.deleteUserData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      text_to_speech.deleteUserData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      const deleteUserDataPromise = text_to_speech.deleteUserData();
      expectToBePromise(deleteUserDataPromise);

      deleteUserDataPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
