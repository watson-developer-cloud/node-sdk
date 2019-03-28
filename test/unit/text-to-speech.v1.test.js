'use strict';

const helper = require('ibm-cloud-sdk-core');
const TextToSpeechV1 = require('../../text-to-speech/v1-generated');
const utils = require('../resources/unitTestUtils');

const getOptions = utils.getOptions;
const checkUrlAndMethod = utils.checkUrlAndMethod;
const checkCallback = utils.checkCallback;
const checkMediaHeaders = utils.checkMediaHeaders;
const missingParamsSuccess = utils.missingParamsSuccess;
const missingParamsError = utils.missingParamsError;
const checkForEmptyObject = utils.checkForEmptyObject;
const checkRequiredParamsHandling = utils.checkRequiredParamsHandling;
const checkUserHeader = utils.checkUserHeader;
const checkDefaultSuccessArgs = utils.checkDefaultSuccessArgs;
const noop = () => {};

const service = {
  username: 'batman',
  password: 'bruce-wayne',
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
      textToSpeech.getVoice(params);

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

      textToSpeech.getVoice(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      textToSpeech.listVoices(params);

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

      textToSpeech.listVoices(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      textToSpeech.listVoices();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      textToSpeech.listVoices(noop);
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
      const voice = 'fake_voice';
      const customization_id = 'fake_customization_id';
      const accept = 'fake_accept';
      const params = {
        text,
        voice,
        customization_id,
        accept,
      };

      // invoke method
      textToSpeech.synthesize(params);

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
      expect(options.responseType).toBe('stream');
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

      textToSpeech.synthesize(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      textToSpeech.getPronunciation(params);

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

      textToSpeech.getPronunciation(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      textToSpeech.createVoiceModel(params);

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
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      textToSpeech.createVoiceModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      textToSpeech.deleteVoiceModel(params);

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

      textToSpeech.deleteVoiceModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const requiredParams = ['customization_id'];

      textToSpeech.deleteVoiceModel({}, err => {
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
      textToSpeech.getVoiceModel(params);

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

      textToSpeech.getVoiceModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const requiredParams = ['customization_id'];

      textToSpeech.getVoiceModel({}, err => {
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
      textToSpeech.listVoiceModels(params);

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

      textToSpeech.listVoiceModels(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      textToSpeech.listVoiceModels();
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
      textToSpeech.updateVoiceModel(params);

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

      textToSpeech.updateVoiceModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const requiredParams = ['customization_id'];

      textToSpeech.updateVoiceModel({}, err => {
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
      textToSpeech.addWord(params);

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

      textToSpeech.addWord(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const requiredParams = ['customization_id', 'word', 'translation'];

      textToSpeech.addWord({}, err => {
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
      textToSpeech.addWords(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['words']).toEqual(words);
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

      textToSpeech.addWords(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const requiredParams = ['customization_id', 'words'];

      textToSpeech.addWords({}, err => {
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
      textToSpeech.deleteWord(params);

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

      textToSpeech.deleteWord(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const requiredParams = ['customization_id', 'word'];

      textToSpeech.deleteWord({}, err => {
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
      textToSpeech.getWord(params);

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

      textToSpeech.getWord(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const requiredParams = ['customization_id', 'word'];

      textToSpeech.getWord({}, err => {
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
      textToSpeech.listWords(params);

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

      textToSpeech.listWords(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const requiredParams = ['customization_id'];

      textToSpeech.listWords({}, err => {
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
      textToSpeech.deleteUserData(params);

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

      textToSpeech.deleteUserData(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const requiredParams = ['customer_id'];

      textToSpeech.deleteUserData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
