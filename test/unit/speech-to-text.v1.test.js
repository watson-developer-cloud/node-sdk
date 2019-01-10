'use strict';

const SpeechToTextV1 = require('../../speech-to-text/v1-generated');
const helper = require('../../lib/helper');
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
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  version: '2018-10-18',
};

const speech_to_text = new SpeechToTextV1(service);
const createRequestMock = jest.spyOn(speech_to_text, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');
const noop = () => {};

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
      speech_to_text.getModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/models/{model_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.getModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const model_id = 'fake_model_id';
      const params = {
        model_id,
      };

      // invoke method
      const getModelPromise = speech_to_text.getModel(params);
      expectToBePromise(getModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.getModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['model_id'];

      speech_to_text.getModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['model_id'];

      const getModelPromise = speech_to_text.getModel();
      expectToBePromise(getModelPromise);

      getModelPromise.catch(err => {
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
      speech_to_text.listModels(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/models', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.listModels(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listModelsPromise = speech_to_text.listModels(params);
      expectToBePromise(listModelsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speech_to_text.listModels({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      speech_to_text.listModels(noop);
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
      const content_type = 'fake_content_type';
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
      const params = {
        audio,
        content_type,
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
      };

      // invoke method
      speech_to_text.recognize(params, noop);

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
      expect(options.json).toEqual(content_type === 'application/json');
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

      speech_to_text.recognize(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const audio = 'fake_audio';
      const params = {
        audio,
      };

      // invoke method
      const recognizePromise = speech_to_text.recognize(params);
      expectToBePromise(recognizePromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.recognize(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['audio'];

      speech_to_text.recognize({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['audio'];

      const recognizePromise = speech_to_text.recognize();
      expectToBePromise(recognizePromise);

      recognizePromise.catch(err => {
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
      speech_to_text.checkJob(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/recognitions/{id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.checkJob(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const id = 'fake_id';
      const params = {
        id,
      };

      // invoke method
      const checkJobPromise = speech_to_text.checkJob(params);
      expectToBePromise(checkJobPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.checkJob(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['id'];

      speech_to_text.checkJob({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['id'];

      const checkJobPromise = speech_to_text.checkJob();
      expectToBePromise(checkJobPromise);

      checkJobPromise.catch(err => {
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
      speech_to_text.checkJobs(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/recognitions', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.checkJobs(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const checkJobsPromise = speech_to_text.checkJobs(params);
      expectToBePromise(checkJobsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speech_to_text.checkJobs({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      speech_to_text.checkJobs(noop);
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
      const content_type = 'fake_content_type';
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
      const params = {
        audio,
        content_type,
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
      };

      // invoke method
      speech_to_text.createJob(params, noop);

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
      expect(options.json).toEqual(content_type === 'application/json');
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

      speech_to_text.createJob(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const audio = 'fake_audio';
      const params = {
        audio,
      };

      // invoke method
      const createJobPromise = speech_to_text.createJob(params);
      expectToBePromise(createJobPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.createJob(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['audio'];

      speech_to_text.createJob({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['audio'];

      const createJobPromise = speech_to_text.createJob();
      expectToBePromise(createJobPromise);

      createJobPromise.catch(err => {
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
      speech_to_text.deleteJob(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/recognitions/{id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.deleteJob(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const id = 'fake_id';
      const params = {
        id,
      };

      // invoke method
      const deleteJobPromise = speech_to_text.deleteJob(params);
      expectToBePromise(deleteJobPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.deleteJob(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['id'];

      speech_to_text.deleteJob({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['id'];

      const deleteJobPromise = speech_to_text.deleteJob();
      expectToBePromise(deleteJobPromise);

      deleteJobPromise.catch(err => {
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
      speech_to_text.registerCallback(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/register_callback', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.registerCallback(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const callback_url = 'fake_callback_url';
      const params = {
        callback_url,
      };

      // invoke method
      const registerCallbackPromise = speech_to_text.registerCallback(params);
      expectToBePromise(registerCallbackPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.registerCallback(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['callback_url'];

      speech_to_text.registerCallback({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['callback_url'];

      const registerCallbackPromise = speech_to_text.registerCallback();
      expectToBePromise(registerCallbackPromise);

      registerCallbackPromise.catch(err => {
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
      speech_to_text.unregisterCallback(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/unregister_callback', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.unregisterCallback(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const callback_url = 'fake_callback_url';
      const params = {
        callback_url,
      };

      // invoke method
      const unregisterCallbackPromise = speech_to_text.unregisterCallback(params);
      expectToBePromise(unregisterCallbackPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.unregisterCallback(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['callback_url'];

      speech_to_text.unregisterCallback({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['callback_url'];

      const unregisterCallbackPromise = speech_to_text.unregisterCallback();
      expectToBePromise(unregisterCallbackPromise);

      unregisterCallbackPromise.catch(err => {
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
      speech_to_text.createLanguageModel(params, noop);

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
      expect(options.json).toEqual(true);
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

      speech_to_text.createLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const name = 'fake_name';
      const base_model_name = 'fake_base_model_name';
      const params = {
        name,
        base_model_name,
      };

      // invoke method
      const createLanguageModelPromise = speech_to_text.createLanguageModel(params);
      expectToBePromise(createLanguageModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.createLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['name', 'base_model_name'];

      speech_to_text.createLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['name', 'base_model_name'];

      const createLanguageModelPromise = speech_to_text.createLanguageModel();
      expectToBePromise(createLanguageModelPromise);

      createLanguageModelPromise.catch(err => {
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
      speech_to_text.deleteLanguageModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.deleteLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const deleteLanguageModelPromise = speech_to_text.deleteLanguageModel(params);
      expectToBePromise(deleteLanguageModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.deleteLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.deleteLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const deleteLanguageModelPromise = speech_to_text.deleteLanguageModel();
      expectToBePromise(deleteLanguageModelPromise);

      deleteLanguageModelPromise.catch(err => {
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
      speech_to_text.getLanguageModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.getLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const getLanguageModelPromise = speech_to_text.getLanguageModel(params);
      expectToBePromise(getLanguageModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.getLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.getLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const getLanguageModelPromise = speech_to_text.getLanguageModel();
      expectToBePromise(getLanguageModelPromise);

      getLanguageModelPromise.catch(err => {
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
      speech_to_text.listLanguageModels(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.listLanguageModels(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listLanguageModelsPromise = speech_to_text.listLanguageModels(params);
      expectToBePromise(listLanguageModelsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speech_to_text.listLanguageModels({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      speech_to_text.listLanguageModels(noop);
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
      speech_to_text.resetLanguageModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/reset', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.resetLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const resetLanguageModelPromise = speech_to_text.resetLanguageModel(params);
      expectToBePromise(resetLanguageModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.resetLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.resetLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const resetLanguageModelPromise = speech_to_text.resetLanguageModel();
      expectToBePromise(resetLanguageModelPromise);

      resetLanguageModelPromise.catch(err => {
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
      speech_to_text.trainLanguageModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/train', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.trainLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const trainLanguageModelPromise = speech_to_text.trainLanguageModel(params);
      expectToBePromise(trainLanguageModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.trainLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.trainLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const trainLanguageModelPromise = speech_to_text.trainLanguageModel();
      expectToBePromise(trainLanguageModelPromise);

      trainLanguageModelPromise.catch(err => {
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
      speech_to_text.upgradeLanguageModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/upgrade_model', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.upgradeLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const upgradeLanguageModelPromise = speech_to_text.upgradeLanguageModel(params);
      expectToBePromise(upgradeLanguageModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.upgradeLanguageModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.upgradeLanguageModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const upgradeLanguageModelPromise = speech_to_text.upgradeLanguageModel();
      expectToBePromise(upgradeLanguageModelPromise);

      upgradeLanguageModelPromise.catch(err => {
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
      const corpus_filename = 'fake_corpus_filename';
      const params = {
        customization_id,
        corpus_name,
        corpus_file,
        allow_overwrite,
        corpus_filename,
      };

      // invoke method
      speech_to_text.addCorpus(params, noop);

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
      expect(options.formData['corpus_file'].filename).toEqual(corpus_filename);
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

      speech_to_text.addCorpus(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const corpus_name = 'fake_corpus_name';
      const corpus_file = 'fake_corpus_file';
      const params = {
        customization_id,
        corpus_name,
        corpus_file,
      };

      // invoke method
      const addCorpusPromise = speech_to_text.addCorpus(params);
      expectToBePromise(addCorpusPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.addCorpus(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name', 'corpus_file'];

      speech_to_text.addCorpus({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name', 'corpus_file'];

      const addCorpusPromise = speech_to_text.addCorpus();
      expectToBePromise(addCorpusPromise);

      addCorpusPromise.catch(err => {
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
      speech_to_text.deleteCorpus(params, noop);

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
      const expectedContentType = 'application/json';
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

      speech_to_text.deleteCorpus(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const corpus_name = 'fake_corpus_name';
      const params = {
        customization_id,
        corpus_name,
      };

      // invoke method
      const deleteCorpusPromise = speech_to_text.deleteCorpus(params);
      expectToBePromise(deleteCorpusPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.deleteCorpus(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name'];

      speech_to_text.deleteCorpus({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name'];

      const deleteCorpusPromise = speech_to_text.deleteCorpus();
      expectToBePromise(deleteCorpusPromise);

      deleteCorpusPromise.catch(err => {
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
      speech_to_text.getCorpus(params, noop);

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
      const expectedContentType = 'application/json';
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

      speech_to_text.getCorpus(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const corpus_name = 'fake_corpus_name';
      const params = {
        customization_id,
        corpus_name,
      };

      // invoke method
      const getCorpusPromise = speech_to_text.getCorpus(params);
      expectToBePromise(getCorpusPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.getCorpus(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name'];

      speech_to_text.getCorpus({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name'];

      const getCorpusPromise = speech_to_text.getCorpus();
      expectToBePromise(getCorpusPromise);

      getCorpusPromise.catch(err => {
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
      speech_to_text.listCorpora(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/corpora', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.listCorpora(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const listCorporaPromise = speech_to_text.listCorpora(params);
      expectToBePromise(listCorporaPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.listCorpora(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.listCorpora({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const listCorporaPromise = speech_to_text.listCorpora();
      expectToBePromise(listCorporaPromise);

      listCorporaPromise.catch(err => {
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
      speech_to_text.addWord(params, noop);

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
      expect(options.json).toEqual(true);
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

      speech_to_text.addWord(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word_name = 'fake_word_name';
      const params = {
        customization_id,
        word_name,
      };

      // invoke method
      const addWordPromise = speech_to_text.addWord(params);
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
      speech_to_text.addWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      speech_to_text.addWord({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      const addWordPromise = speech_to_text.addWord();
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
      speech_to_text.addWords(params, noop);

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

      speech_to_text.addWords(params, noop);
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
      const addWordsPromise = speech_to_text.addWords(params);
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
      speech_to_text.addWords(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'words'];

      speech_to_text.addWords({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'words'];

      const addWordsPromise = speech_to_text.addWords();
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
      const word_name = 'fake_word_name';
      const params = {
        customization_id,
        word_name,
      };

      // invoke method
      speech_to_text.deleteWord(params, noop);

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
      const expectedContentType = 'application/json';
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

      speech_to_text.deleteWord(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word_name = 'fake_word_name';
      const params = {
        customization_id,
        word_name,
      };

      // invoke method
      const deleteWordPromise = speech_to_text.deleteWord(params);
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
      speech_to_text.deleteWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      speech_to_text.deleteWord({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      const deleteWordPromise = speech_to_text.deleteWord();
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
      const word_name = 'fake_word_name';
      const params = {
        customization_id,
        word_name,
      };

      // invoke method
      speech_to_text.getWord(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words/{word_name}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.getWord(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const word_name = 'fake_word_name';
      const params = {
        customization_id,
        word_name,
      };

      // invoke method
      const getWordPromise = speech_to_text.getWord(params);
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
      speech_to_text.getWord(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      speech_to_text.getWord({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      const getWordPromise = speech_to_text.getWord();
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
      const word_type = 'fake_word_type';
      const sort = 'fake_sort';
      const params = {
        customization_id,
        word_type,
        sort,
      };

      // invoke method
      speech_to_text.listWords(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.listWords(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const listWordsPromise = speech_to_text.listWords(params);
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
      speech_to_text.listWords(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.listWords({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const listWordsPromise = speech_to_text.listWords();
      expectToBePromise(listWordsPromise);

      listWordsPromise.catch(err => {
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
      speech_to_text.createAcousticModel(params, noop);

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
      expect(options.json).toEqual(true);
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

      speech_to_text.createAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const name = 'fake_name';
      const base_model_name = 'fake_base_model_name';
      const params = {
        name,
        base_model_name,
      };

      // invoke method
      const createAcousticModelPromise = speech_to_text.createAcousticModel(params);
      expectToBePromise(createAcousticModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.createAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['name', 'base_model_name'];

      speech_to_text.createAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['name', 'base_model_name'];

      const createAcousticModelPromise = speech_to_text.createAcousticModel();
      expectToBePromise(createAcousticModelPromise);

      createAcousticModelPromise.catch(err => {
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
      speech_to_text.deleteAcousticModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.deleteAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const deleteAcousticModelPromise = speech_to_text.deleteAcousticModel(params);
      expectToBePromise(deleteAcousticModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.deleteAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.deleteAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const deleteAcousticModelPromise = speech_to_text.deleteAcousticModel();
      expectToBePromise(deleteAcousticModelPromise);

      deleteAcousticModelPromise.catch(err => {
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
      speech_to_text.getAcousticModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.getAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const getAcousticModelPromise = speech_to_text.getAcousticModel(params);
      expectToBePromise(getAcousticModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.getAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.getAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const getAcousticModelPromise = speech_to_text.getAcousticModel();
      expectToBePromise(getAcousticModelPromise);

      getAcousticModelPromise.catch(err => {
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
      speech_to_text.listAcousticModels(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.listAcousticModels(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listAcousticModelsPromise = speech_to_text.listAcousticModels(params);
      expectToBePromise(listAcousticModelsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speech_to_text.listAcousticModels({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      speech_to_text.listAcousticModels(noop);
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
      speech_to_text.resetAcousticModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}/reset', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.resetAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const resetAcousticModelPromise = speech_to_text.resetAcousticModel(params);
      expectToBePromise(resetAcousticModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.resetAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.resetAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const resetAcousticModelPromise = speech_to_text.resetAcousticModel();
      expectToBePromise(resetAcousticModelPromise);

      resetAcousticModelPromise.catch(err => {
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
      speech_to_text.trainAcousticModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}/train', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.trainAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const trainAcousticModelPromise = speech_to_text.trainAcousticModel(params);
      expectToBePromise(trainAcousticModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.trainAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.trainAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const trainAcousticModelPromise = speech_to_text.trainAcousticModel();
      expectToBePromise(trainAcousticModelPromise);

      trainAcousticModelPromise.catch(err => {
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
      const params = {
        customization_id,
        custom_language_model_id,
      };

      // invoke method
      speech_to_text.upgradeAcousticModel(params, noop);

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
      const expectedContentType = 'application/json';
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

      speech_to_text.upgradeAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const upgradeAcousticModelPromise = speech_to_text.upgradeAcousticModel(params);
      expectToBePromise(upgradeAcousticModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.upgradeAcousticModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.upgradeAcousticModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const upgradeAcousticModelPromise = speech_to_text.upgradeAcousticModel();
      expectToBePromise(upgradeAcousticModelPromise);

      upgradeAcousticModelPromise.catch(err => {
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
      const content_type = 'fake_content_type';
      const contained_content_type = 'fake_contained_content_type';
      const allow_overwrite = 'fake_allow_overwrite';
      const params = {
        customization_id,
        audio_name,
        audio_resource,
        content_type,
        contained_content_type,
        allow_overwrite,
      };

      // invoke method
      speech_to_text.addAudio(params, noop);

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
      checkUserHeader(createRequestMock, 'Content-Type', content_type);
      checkUserHeader(createRequestMock, 'Contained-Content-Type', contained_content_type);
      expect(options.body).toEqual(audio_resource);
      expect(options.json).toEqual(content_type === 'application/json');
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

      speech_to_text.addAudio(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const audio_name = 'fake_audio_name';
      const audio_resource = 'fake_audio_resource';
      const params = {
        customization_id,
        audio_name,
        audio_resource,
      };

      // invoke method
      const addAudioPromise = speech_to_text.addAudio(params);
      expectToBePromise(addAudioPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.addAudio(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name', 'audio_resource'];

      speech_to_text.addAudio({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name', 'audio_resource'];

      const addAudioPromise = speech_to_text.addAudio();
      expectToBePromise(addAudioPromise);

      addAudioPromise.catch(err => {
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
      speech_to_text.deleteAudio(params, noop);

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
      const expectedContentType = 'application/json';
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

      speech_to_text.deleteAudio(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const audio_name = 'fake_audio_name';
      const params = {
        customization_id,
        audio_name,
      };

      // invoke method
      const deleteAudioPromise = speech_to_text.deleteAudio(params);
      expectToBePromise(deleteAudioPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.deleteAudio(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name'];

      speech_to_text.deleteAudio({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name'];

      const deleteAudioPromise = speech_to_text.deleteAudio();
      expectToBePromise(deleteAudioPromise);

      deleteAudioPromise.catch(err => {
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
      speech_to_text.getAudio(params, noop);

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
      const expectedContentType = 'application/json';
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

      speech_to_text.getAudio(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const audio_name = 'fake_audio_name';
      const params = {
        customization_id,
        audio_name,
      };

      // invoke method
      const getAudioPromise = speech_to_text.getAudio(params);
      expectToBePromise(getAudioPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.getAudio(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name'];

      speech_to_text.getAudio({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name'];

      const getAudioPromise = speech_to_text.getAudio();
      expectToBePromise(getAudioPromise);

      getAudioPromise.catch(err => {
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
      speech_to_text.listAudio(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}/audio', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.listAudio(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const listAudioPromise = speech_to_text.listAudio(params);
      expectToBePromise(listAudioPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      speech_to_text.listAudio(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      speech_to_text.listAudio({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const listAudioPromise = speech_to_text.listAudio();
      expectToBePromise(listAudioPromise);

      listAudioPromise.catch(err => {
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
      speech_to_text.deleteUserData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/user_data', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      speech_to_text.deleteUserData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const params = {
        customer_id,
      };

      // invoke method
      const deleteUserDataPromise = speech_to_text.deleteUserData(params);
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
      speech_to_text.deleteUserData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      speech_to_text.deleteUserData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      const deleteUserDataPromise = speech_to_text.deleteUserData();
      expectToBePromise(deleteUserDataPromise);

      deleteUserDataPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
