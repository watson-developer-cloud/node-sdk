'use strict';

const helper = require('ibm-cloud-sdk-core');
const SpeechToTextV1 = require('../../speech-to-text/v1-generated');
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
  url: 'https://stream.watsonplatform.net/speech-to-text/api/speech-to-text/api',
  version: '2018-10-18',
};

const speechToText = new SpeechToTextV1(service);
const createRequestMock = jest.spyOn(speechToText, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('getModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const model_id = 'fake_model_id';
      const params = {
        model_id,
      };

      // invoke method
      speechToText.getModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/models/{model_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['model_id']).toEqual(model_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const model_id = 'fake_model_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        model_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.getModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.getModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['model_id'];

      speechToText.getModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listModels', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const params = {};

      // invoke method
      speechToText.listModels(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/models', 'GET');
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

      speechToText.listModels(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speechToText.listModels();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      speechToText.listModels(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('recognize', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const audio = 'fake_audio';
      const model = 'fake_model';
      const language_customization_id = 'fake_language_customization_id';
      const acoustic_customization_id = 'fake_acoustic_customization_id';
      const base_model_version = 'fake_base_model_version';
      const customization_weight = 'fake_customization_weight';
      const inactivity_timeout = 'fake_inactivity_timeout';
      const keywords = 'fake_keywords';
      const keywords_threshold = 'fake_keywords_threshold';
      const max_alternatives = 'fake_max_alternatives';
      const word_alternatives_threshold = 'fake_word_alternatives_threshold';
      const word_confidence = 'fake_word_confidence';
      const timestamps = 'fake_timestamps';
      const profanity_filter = 'fake_profanity_filter';
      const smart_formatting = 'fake_smart_formatting';
      const speaker_labels = 'fake_speaker_labels';
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const redaction = 'fake_redaction';
      const content_type = 'fake_content_type';
      const params = {
        audio,
        model,
        language_customization_id,
        acoustic_customization_id,
        base_model_version,
        customization_weight,
        inactivity_timeout,
        keywords,
        keywords_threshold,
        max_alternatives,
        word_alternatives_threshold,
        word_confidence,
        timestamps,
        profanity_filter,
        smart_formatting,
        speaker_labels,
        customization_id,
        grammar_name,
        redaction,
        content_type,
      };

      // invoke method
      speechToText.recognize(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/recognize', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = content_type;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Content-Type', content_type);
      expect(options.body).toEqual(audio);
      expect(options.qs['model']).toEqual(model);
      expect(options.qs['language_customization_id']).toEqual(language_customization_id);
      expect(options.qs['acoustic_customization_id']).toEqual(acoustic_customization_id);
      expect(options.qs['base_model_version']).toEqual(base_model_version);
      expect(options.qs['customization_weight']).toEqual(customization_weight);
      expect(options.qs['inactivity_timeout']).toEqual(inactivity_timeout);
      expect(options.qs['keywords']).toEqual(keywords);
      expect(options.qs['keywords_threshold']).toEqual(keywords_threshold);
      expect(options.qs['max_alternatives']).toEqual(max_alternatives);
      expect(options.qs['word_alternatives_threshold']).toEqual(word_alternatives_threshold);
      expect(options.qs['word_confidence']).toEqual(word_confidence);
      expect(options.qs['timestamps']).toEqual(timestamps);
      expect(options.qs['profanity_filter']).toEqual(profanity_filter);
      expect(options.qs['smart_formatting']).toEqual(smart_formatting);
      expect(options.qs['speaker_labels']).toEqual(speaker_labels);
      expect(options.qs['customization_id']).toEqual(customization_id);
      expect(options.qs['grammar_name']).toEqual(grammar_name);
      expect(options.qs['redaction']).toEqual(redaction);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const audio = 'fake_audio';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        audio,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.recognize(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.recognize(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['audio'];

      speechToText.recognize({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('checkJob', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const id = 'fake_id';
      const params = {
        id,
      };

      // invoke method
      speechToText.checkJob(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/recognitions/{id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['id']).toEqual(id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const id = 'fake_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.checkJob(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.checkJob(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['id'];

      speechToText.checkJob({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('checkJobs', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const params = {};

      // invoke method
      speechToText.checkJobs(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/recognitions', 'GET');
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

      speechToText.checkJobs(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speechToText.checkJobs();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      speechToText.checkJobs(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('createJob', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const audio = 'fake_audio';
      const model = 'fake_model';
      const callback_url = 'fake_callback_url';
      const events = 'fake_events';
      const user_token = 'fake_user_token';
      const results_ttl = 'fake_results_ttl';
      const language_customization_id = 'fake_language_customization_id';
      const acoustic_customization_id = 'fake_acoustic_customization_id';
      const base_model_version = 'fake_base_model_version';
      const customization_weight = 'fake_customization_weight';
      const inactivity_timeout = 'fake_inactivity_timeout';
      const keywords = 'fake_keywords';
      const keywords_threshold = 'fake_keywords_threshold';
      const max_alternatives = 'fake_max_alternatives';
      const word_alternatives_threshold = 'fake_word_alternatives_threshold';
      const word_confidence = 'fake_word_confidence';
      const timestamps = 'fake_timestamps';
      const profanity_filter = 'fake_profanity_filter';
      const smart_formatting = 'fake_smart_formatting';
      const speaker_labels = 'fake_speaker_labels';
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const redaction = 'fake_redaction';
      const content_type = 'fake_content_type';
      const params = {
        audio,
        model,
        callback_url,
        events,
        user_token,
        results_ttl,
        language_customization_id,
        acoustic_customization_id,
        base_model_version,
        customization_weight,
        inactivity_timeout,
        keywords,
        keywords_threshold,
        max_alternatives,
        word_alternatives_threshold,
        word_confidence,
        timestamps,
        profanity_filter,
        smart_formatting,
        speaker_labels,
        customization_id,
        grammar_name,
        redaction,
        content_type,
      };

      // invoke method
      speechToText.createJob(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/recognitions', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = content_type;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Content-Type', content_type);
      expect(options.body).toEqual(audio);
      expect(options.qs['model']).toEqual(model);
      expect(options.qs['callback_url']).toEqual(callback_url);
      expect(options.qs['events']).toEqual(events);
      expect(options.qs['user_token']).toEqual(user_token);
      expect(options.qs['results_ttl']).toEqual(results_ttl);
      expect(options.qs['language_customization_id']).toEqual(language_customization_id);
      expect(options.qs['acoustic_customization_id']).toEqual(acoustic_customization_id);
      expect(options.qs['base_model_version']).toEqual(base_model_version);
      expect(options.qs['customization_weight']).toEqual(customization_weight);
      expect(options.qs['inactivity_timeout']).toEqual(inactivity_timeout);
      expect(options.qs['keywords']).toEqual(keywords);
      expect(options.qs['keywords_threshold']).toEqual(keywords_threshold);
      expect(options.qs['max_alternatives']).toEqual(max_alternatives);
      expect(options.qs['word_alternatives_threshold']).toEqual(word_alternatives_threshold);
      expect(options.qs['word_confidence']).toEqual(word_confidence);
      expect(options.qs['timestamps']).toEqual(timestamps);
      expect(options.qs['profanity_filter']).toEqual(profanity_filter);
      expect(options.qs['smart_formatting']).toEqual(smart_formatting);
      expect(options.qs['speaker_labels']).toEqual(speaker_labels);
      expect(options.qs['customization_id']).toEqual(customization_id);
      expect(options.qs['grammar_name']).toEqual(grammar_name);
      expect(options.qs['redaction']).toEqual(redaction);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const audio = 'fake_audio';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        audio,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.createJob(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.createJob(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['audio'];

      speechToText.createJob({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteJob', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const id = 'fake_id';
      const params = {
        id,
      };

      // invoke method
      speechToText.deleteJob(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/recognitions/{id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['id']).toEqual(id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const id = 'fake_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.deleteJob(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.deleteJob(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['id'];

      speechToText.deleteJob({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('registerCallback', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const callback_url = 'fake_callback_url';
      const user_secret = 'fake_user_secret';
      const params = {
        callback_url,
        user_secret,
      };

      // invoke method
      speechToText.registerCallback(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/register_callback', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['callback_url']).toEqual(callback_url);
      expect(options.qs['user_secret']).toEqual(user_secret);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const callback_url = 'fake_callback_url';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        callback_url,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.registerCallback(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.registerCallback(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['callback_url'];

      speechToText.registerCallback({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('unregisterCallback', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const callback_url = 'fake_callback_url';
      const params = {
        callback_url,
      };

      // invoke method
      speechToText.unregisterCallback(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/unregister_callback', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['callback_url']).toEqual(callback_url);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const callback_url = 'fake_callback_url';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        callback_url,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.unregisterCallback(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.unregisterCallback(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['callback_url'];

      speechToText.unregisterCallback({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('createLanguageModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const name = 'fake_name';
      const base_model_name = 'fake_base_model_name';
      const dialect = 'fake_dialect';
      const description = 'fake_description';
      const params = {
        name,
        base_model_name,
        dialect,
        description,
      };

      // invoke method
      speechToText.createLanguageModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.body['base_model_name']).toEqual(base_model_name);
      expect(options.body['dialect']).toEqual(dialect);
      expect(options.body['description']).toEqual(description);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const name = 'fake_name';
      const base_model_name = 'fake_base_model_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        name,
        base_model_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.createLanguageModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.createLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['name', 'base_model_name'];

      speechToText.createLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteLanguageModel', () => {
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
      speechToText.deleteLanguageModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'DELETE');
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

      speechToText.deleteLanguageModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.deleteLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.deleteLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getLanguageModel', () => {
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
      speechToText.getLanguageModel(params);

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

      speechToText.getLanguageModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.getLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.getLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listLanguageModels', () => {
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
      speechToText.listLanguageModels(params);

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

      speechToText.listLanguageModels(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speechToText.listLanguageModels();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      speechToText.listLanguageModels(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('resetLanguageModel', () => {
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
      speechToText.resetLanguageModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/reset', 'POST');
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

      speechToText.resetLanguageModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.resetLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.resetLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('trainLanguageModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word_type_to_add = 'fake_word_type_to_add';
      const customization_weight = 'fake_customization_weight';
      const params = {
        customization_id,
        word_type_to_add,
        customization_weight,
      };

      // invoke method
      speechToText.trainLanguageModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/train', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['word_type_to_add']).toEqual(word_type_to_add);
      expect(options.qs['customization_weight']).toEqual(customization_weight);
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

      speechToText.trainLanguageModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.trainLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.trainLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('upgradeLanguageModel', () => {
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
      speechToText.upgradeLanguageModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/upgrade_model', 'POST');
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

      speechToText.upgradeLanguageModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.upgradeLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.upgradeLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('addCorpus', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const corpus_name = 'fake_corpus_name';
      const corpus_file = 'fake_corpus_file';
      const allow_overwrite = 'fake_allow_overwrite';
      const params = {
        customization_id,
        corpus_name,
        corpus_file,
        allow_overwrite,
      };

      // invoke method
      speechToText.addCorpus(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/customizations/{customization_id}/corpora/{corpus_name}',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['corpus_file'].data).toEqual(corpus_file);
      expect(options.formData['corpus_file'].contentType).toEqual('text/plain');
      expect(options.qs['allow_overwrite']).toEqual(allow_overwrite);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['corpus_name']).toEqual(corpus_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const corpus_name = 'fake_corpus_name';
      const corpus_file = 'fake_corpus_file';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        corpus_name,
        corpus_file,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.addCorpus(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.addCorpus(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name', 'corpus_file'];

      speechToText.addCorpus({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteCorpus', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const corpus_name = 'fake_corpus_name';
      const params = {
        customization_id,
        corpus_name,
      };

      // invoke method
      speechToText.deleteCorpus(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/customizations/{customization_id}/corpora/{corpus_name}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['corpus_name']).toEqual(corpus_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const corpus_name = 'fake_corpus_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        corpus_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.deleteCorpus(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.deleteCorpus(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name'];

      speechToText.deleteCorpus({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getCorpus', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const corpus_name = 'fake_corpus_name';
      const params = {
        customization_id,
        corpus_name,
      };

      // invoke method
      speechToText.getCorpus(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/customizations/{customization_id}/corpora/{corpus_name}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['corpus_name']).toEqual(corpus_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const corpus_name = 'fake_corpus_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        corpus_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.getCorpus(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.getCorpus(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name'];

      speechToText.getCorpus({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listCorpora', () => {
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
      speechToText.listCorpora(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/corpora', 'GET');
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

      speechToText.listCorpora(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.listCorpora(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.listCorpora({}, err => {
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
      const word_name = 'fake_word_name';
      const word = 'fake_word';
      const sounds_like = 'fake_sounds_like';
      const display_as = 'fake_display_as';
      const params = {
        customization_id,
        word_name,
        word,
        sounds_like,
        display_as,
      };

      // invoke method
      speechToText.addWord(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word_name}', 'PUT');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['word']).toEqual(word);
      expect(options.body['sounds_like']).toEqual(sounds_like);
      expect(options.body['display_as']).toEqual(display_as);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['word_name']).toEqual(word_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word_name = 'fake_word_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        word_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.addWord(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.addWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      speechToText.addWord({}, err => {
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
      speechToText.addWords(params);

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

      speechToText.addWords(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.addWords(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'words'];

      speechToText.addWords({}, err => {
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
      const word_name = 'fake_word_name';
      const params = {
        customization_id,
        word_name,
      };

      // invoke method
      speechToText.deleteWord(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/customizations/{customization_id}/words/{word_name}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['word_name']).toEqual(word_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word_name = 'fake_word_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        word_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.deleteWord(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.deleteWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      speechToText.deleteWord({}, err => {
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
      const word_name = 'fake_word_name';
      const params = {
        customization_id,
        word_name,
      };

      // invoke method
      speechToText.getWord(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word_name}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['word_name']).toEqual(word_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word_name = 'fake_word_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        word_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.getWord(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.getWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      speechToText.getWord({}, err => {
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
      const word_type = 'fake_word_type';
      const sort = 'fake_sort';
      const params = {
        customization_id,
        word_type,
        sort,
      };

      // invoke method
      speechToText.listWords(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['word_type']).toEqual(word_type);
      expect(options.qs['sort']).toEqual(sort);
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

      speechToText.listWords(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.listWords(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.listWords({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('addGrammar', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const grammar_file = 'fake_grammar_file';
      const content_type = 'fake_content_type';
      const allow_overwrite = 'fake_allow_overwrite';
      const params = {
        customization_id,
        grammar_name,
        grammar_file,
        content_type,
        allow_overwrite,
      };

      // invoke method
      speechToText.addGrammar(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/customizations/{customization_id}/grammars/{grammar_name}',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = content_type;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Content-Type', content_type);
      expect(options.body).toEqual(grammar_file);
      expect(options.qs['allow_overwrite']).toEqual(allow_overwrite);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['grammar_name']).toEqual(grammar_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const grammar_file = 'fake_grammar_file';
      const content_type = 'fake_content_type';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        grammar_name,
        grammar_file,
        content_type,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.addGrammar(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.addGrammar(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'grammar_name', 'grammar_file', 'content_type'];

      speechToText.addGrammar({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteGrammar', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const params = {
        customization_id,
        grammar_name,
      };

      // invoke method
      speechToText.deleteGrammar(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/customizations/{customization_id}/grammars/{grammar_name}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['grammar_name']).toEqual(grammar_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        grammar_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.deleteGrammar(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.deleteGrammar(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'grammar_name'];

      speechToText.deleteGrammar({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getGrammar', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const params = {
        customization_id,
        grammar_name,
      };

      // invoke method
      speechToText.getGrammar(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/customizations/{customization_id}/grammars/{grammar_name}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['grammar_name']).toEqual(grammar_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        grammar_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.getGrammar(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.getGrammar(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'grammar_name'];

      speechToText.getGrammar({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listGrammars', () => {
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
      speechToText.listGrammars(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/grammars', 'GET');
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

      speechToText.listGrammars(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.listGrammars(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.listGrammars({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('createAcousticModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const name = 'fake_name';
      const base_model_name = 'fake_base_model_name';
      const description = 'fake_description';
      const params = {
        name,
        base_model_name,
        description,
      };

      // invoke method
      speechToText.createAcousticModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.body['base_model_name']).toEqual(base_model_name);
      expect(options.body['description']).toEqual(description);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const name = 'fake_name';
      const base_model_name = 'fake_base_model_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        name,
        base_model_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.createAcousticModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.createAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['name', 'base_model_name'];

      speechToText.createAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteAcousticModel', () => {
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
      speechToText.deleteAcousticModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}', 'DELETE');
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

      speechToText.deleteAcousticModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.deleteAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.deleteAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getAcousticModel', () => {
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
      speechToText.getAcousticModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}', 'GET');
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

      speechToText.getAcousticModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.getAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.getAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listAcousticModels', () => {
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
      speechToText.listAcousticModels(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations', 'GET');
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

      speechToText.listAcousticModels(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speechToText.listAcousticModels();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      speechToText.listAcousticModels(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});

describe('resetAcousticModel', () => {
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
      speechToText.resetAcousticModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}/reset', 'POST');
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

      speechToText.resetAcousticModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.resetAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.resetAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('trainAcousticModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const custom_language_model_id = 'fake_custom_language_model_id';
      const params = {
        customization_id,
        custom_language_model_id,
      };

      // invoke method
      speechToText.trainAcousticModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}/train', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['custom_language_model_id']).toEqual(custom_language_model_id);
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

      speechToText.trainAcousticModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.trainAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.trainAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('upgradeAcousticModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const custom_language_model_id = 'fake_custom_language_model_id';
      const force = 'fake_force';
      const params = {
        customization_id,
        custom_language_model_id,
        force,
      };

      // invoke method
      speechToText.upgradeAcousticModel(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/acoustic_customizations/{customization_id}/upgrade_model',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['custom_language_model_id']).toEqual(custom_language_model_id);
      expect(options.qs['force']).toEqual(force);
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

      speechToText.upgradeAcousticModel(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.upgradeAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.upgradeAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('addAudio', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const audio_name = 'fake_audio_name';
      const audio_resource = 'fake_audio_resource';
      const contained_content_type = 'fake_contained_content_type';
      const allow_overwrite = 'fake_allow_overwrite';
      const content_type = 'fake_content_type';
      const params = {
        customization_id,
        audio_name,
        audio_resource,
        contained_content_type,
        allow_overwrite,
        content_type,
      };

      // invoke method
      speechToText.addAudio(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = content_type;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Contained-Content-Type', contained_content_type);
      checkUserHeader(createRequestMock, 'Content-Type', content_type);
      expect(options.body).toEqual(audio_resource);
      expect(options.qs['allow_overwrite']).toEqual(allow_overwrite);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['audio_name']).toEqual(audio_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const audio_name = 'fake_audio_name';
      const audio_resource = 'fake_audio_resource';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        audio_name,
        audio_resource,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.addAudio(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.addAudio(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name', 'audio_resource'];

      speechToText.addAudio({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('deleteAudio', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const audio_name = 'fake_audio_name';
      const params = {
        customization_id,
        audio_name,
      };

      // invoke method
      speechToText.deleteAudio(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['audio_name']).toEqual(audio_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const audio_name = 'fake_audio_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        audio_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.deleteAudio(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.deleteAudio(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name'];

      speechToText.deleteAudio({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('getAudio', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const audio_name = 'fake_audio_name';
      const params = {
        customization_id,
        audio_name,
      };

      // invoke method
      speechToText.getAudio(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['customization_id']).toEqual(customization_id);
      expect(options.path['audio_name']).toEqual(audio_name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const audio_name = 'fake_audio_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customization_id,
        audio_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      speechToText.getAudio(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.getAudio(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name'];

      speechToText.getAudio({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('listAudio', () => {
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
      speechToText.listAudio(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}/audio', 'GET');
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

      speechToText.listAudio(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.listAudio(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speechToText.listAudio({}, err => {
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
      speechToText.deleteUserData(params);

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

      speechToText.deleteUserData(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speechToText.deleteUserData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      speechToText.deleteUserData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
