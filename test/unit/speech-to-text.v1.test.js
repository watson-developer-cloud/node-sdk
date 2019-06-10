/**
 * Copyright 2019 IBM All Rights Reserved.
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

const helper = require('ibm-cloud-sdk-core');
const SpeechToTextV1 = require('../../speech-to-text/v1');
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
      speechToText.getModel(params, noop);

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

      speechToText.getModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const model_id = 'fake_model_id';
      const params = {
        model_id,
      };

      // invoke method
      const getModelPromise = speechToText.getModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['model_id'];

      const getModelPromise = speechToText.getModel();
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
      speechToText.listModels(params, noop);

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

      speechToText.listModels(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listModelsPromise = speechToText.listModels(params);
      expectToBePromise(listModelsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speechToText.listModels({}, noop);
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
      const audio_metrics = 'fake_audio_metrics';
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
        audio_metrics,
        content_type,
      };

      // invoke method
      speechToText.recognize(params, noop);

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
      expect(options.qs['audio_metrics']).toEqual(audio_metrics);
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

      speechToText.recognize(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const audio = 'fake_audio';
      const params = {
        audio,
      };

      // invoke method
      const recognizePromise = speechToText.recognize(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['audio'];

      const recognizePromise = speechToText.recognize();
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
      speechToText.checkJob(params, noop);

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

      speechToText.checkJob(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const id = 'fake_id';
      const params = {
        id,
      };

      // invoke method
      const checkJobPromise = speechToText.checkJob(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['id'];

      const checkJobPromise = speechToText.checkJob();
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
      speechToText.checkJobs(params, noop);

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

      speechToText.checkJobs(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const checkJobsPromise = speechToText.checkJobs(params);
      expectToBePromise(checkJobsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speechToText.checkJobs({}, noop);
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
      const processing_metrics = 'fake_processing_metrics';
      const processing_metrics_interval = 'fake_processing_metrics_interval';
      const audio_metrics = 'fake_audio_metrics';
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
        processing_metrics,
        processing_metrics_interval,
        audio_metrics,
        content_type,
      };

      // invoke method
      speechToText.createJob(params, noop);

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
      expect(options.qs['processing_metrics']).toEqual(processing_metrics);
      expect(options.qs['processing_metrics_interval']).toEqual(processing_metrics_interval);
      expect(options.qs['audio_metrics']).toEqual(audio_metrics);
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

      speechToText.createJob(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const audio = 'fake_audio';
      const params = {
        audio,
      };

      // invoke method
      const createJobPromise = speechToText.createJob(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['audio'];

      const createJobPromise = speechToText.createJob();
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
      speechToText.deleteJob(params, noop);

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

      speechToText.deleteJob(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const id = 'fake_id';
      const params = {
        id,
      };

      // invoke method
      const deleteJobPromise = speechToText.deleteJob(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['id'];

      const deleteJobPromise = speechToText.deleteJob();
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
      speechToText.registerCallback(params, noop);

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

      speechToText.registerCallback(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const callback_url = 'fake_callback_url';
      const params = {
        callback_url,
      };

      // invoke method
      const registerCallbackPromise = speechToText.registerCallback(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['callback_url'];

      const registerCallbackPromise = speechToText.registerCallback();
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
      speechToText.unregisterCallback(params, noop);

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

      speechToText.unregisterCallback(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const callback_url = 'fake_callback_url';
      const params = {
        callback_url,
      };

      // invoke method
      const unregisterCallbackPromise = speechToText.unregisterCallback(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['callback_url'];

      const unregisterCallbackPromise = speechToText.unregisterCallback();
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
      speechToText.createLanguageModel(params, noop);

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

      speechToText.createLanguageModel(params, noop);
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
      const createLanguageModelPromise = speechToText.createLanguageModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['name', 'base_model_name'];

      const createLanguageModelPromise = speechToText.createLanguageModel();
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
      speechToText.deleteLanguageModel(params, noop);

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

      speechToText.deleteLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const deleteLanguageModelPromise = speechToText.deleteLanguageModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const deleteLanguageModelPromise = speechToText.deleteLanguageModel();
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
      speechToText.getLanguageModel(params, noop);

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

      speechToText.getLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const getLanguageModelPromise = speechToText.getLanguageModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const getLanguageModelPromise = speechToText.getLanguageModel();
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
      speechToText.listLanguageModels(params, noop);

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

      speechToText.listLanguageModels(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listLanguageModelsPromise = speechToText.listLanguageModels(params);
      expectToBePromise(listLanguageModelsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speechToText.listLanguageModels({}, noop);
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
      speechToText.resetLanguageModel(params, noop);

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

      speechToText.resetLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const resetLanguageModelPromise = speechToText.resetLanguageModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const resetLanguageModelPromise = speechToText.resetLanguageModel();
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
      speechToText.trainLanguageModel(params, noop);

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

      speechToText.trainLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const trainLanguageModelPromise = speechToText.trainLanguageModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const trainLanguageModelPromise = speechToText.trainLanguageModel();
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
      speechToText.upgradeLanguageModel(params, noop);

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

      speechToText.upgradeLanguageModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const upgradeLanguageModelPromise = speechToText.upgradeLanguageModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const upgradeLanguageModelPromise = speechToText.upgradeLanguageModel();
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
      const params = {
        customization_id,
        corpus_name,
        corpus_file,
        allow_overwrite,
      };

      // invoke method
      speechToText.addCorpus(params, noop);

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

      speechToText.addCorpus(params, noop);
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
      const addCorpusPromise = speechToText.addCorpus(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name', 'corpus_file'];

      const addCorpusPromise = speechToText.addCorpus();
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
      speechToText.deleteCorpus(params, noop);

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

      speechToText.deleteCorpus(params, noop);
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
      const deleteCorpusPromise = speechToText.deleteCorpus(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name'];

      const deleteCorpusPromise = speechToText.deleteCorpus();
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
      speechToText.getCorpus(params, noop);

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

      speechToText.getCorpus(params, noop);
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
      const getCorpusPromise = speechToText.getCorpus(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'corpus_name'];

      const getCorpusPromise = speechToText.getCorpus();
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
      speechToText.listCorpora(params, noop);

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

      speechToText.listCorpora(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const listCorporaPromise = speechToText.listCorpora(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const listCorporaPromise = speechToText.listCorpora();
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
      speechToText.addWord(params, noop);

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

      speechToText.addWord(params, noop);
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
      const addWordPromise = speechToText.addWord(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      const addWordPromise = speechToText.addWord();
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
      speechToText.addWords(params, noop);

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

      speechToText.addWords(params, noop);
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
      const addWordsPromise = speechToText.addWords(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'words'];

      const addWordsPromise = speechToText.addWords();
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
      speechToText.deleteWord(params, noop);

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

      speechToText.deleteWord(params, noop);
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
      const deleteWordPromise = speechToText.deleteWord(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      const deleteWordPromise = speechToText.deleteWord();
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
      speechToText.getWord(params, noop);

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

      speechToText.getWord(params, noop);
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
      const getWordPromise = speechToText.getWord(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'word_name'];

      const getWordPromise = speechToText.getWord();
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
      speechToText.listWords(params, noop);

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

      speechToText.listWords(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const listWordsPromise = speechToText.listWords(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const listWordsPromise = speechToText.listWords();
      expectToBePromise(listWordsPromise);

      listWordsPromise.catch(err => {
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
      speechToText.addGrammar(params, noop);

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

      speechToText.addGrammar(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const grammar_file = 'fake_grammar_file';
      const content_type = 'fake_content_type';
      const params = {
        customization_id,
        grammar_name,
        grammar_file,
        content_type,
      };

      // invoke method
      const addGrammarPromise = speechToText.addGrammar(params);
      expectToBePromise(addGrammarPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'grammar_name', 'grammar_file', 'content_type'];

      const addGrammarPromise = speechToText.addGrammar();
      expectToBePromise(addGrammarPromise);

      addGrammarPromise.catch(err => {
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
      speechToText.deleteGrammar(params, noop);

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

      speechToText.deleteGrammar(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const params = {
        customization_id,
        grammar_name,
      };

      // invoke method
      const deleteGrammarPromise = speechToText.deleteGrammar(params);
      expectToBePromise(deleteGrammarPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'grammar_name'];

      const deleteGrammarPromise = speechToText.deleteGrammar();
      expectToBePromise(deleteGrammarPromise);

      deleteGrammarPromise.catch(err => {
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
      speechToText.getGrammar(params, noop);

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

      speechToText.getGrammar(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const grammar_name = 'fake_grammar_name';
      const params = {
        customization_id,
        grammar_name,
      };

      // invoke method
      const getGrammarPromise = speechToText.getGrammar(params);
      expectToBePromise(getGrammarPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'grammar_name'];

      const getGrammarPromise = speechToText.getGrammar();
      expectToBePromise(getGrammarPromise);

      getGrammarPromise.catch(err => {
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
      speechToText.listGrammars(params, noop);

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

      speechToText.listGrammars(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const listGrammarsPromise = speechToText.listGrammars(params);
      expectToBePromise(listGrammarsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const listGrammarsPromise = speechToText.listGrammars();
      expectToBePromise(listGrammarsPromise);

      listGrammarsPromise.catch(err => {
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
      speechToText.createAcousticModel(params, noop);

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

      speechToText.createAcousticModel(params, noop);
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
      const createAcousticModelPromise = speechToText.createAcousticModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['name', 'base_model_name'];

      const createAcousticModelPromise = speechToText.createAcousticModel();
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
      speechToText.deleteAcousticModel(params, noop);

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

      speechToText.deleteAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const deleteAcousticModelPromise = speechToText.deleteAcousticModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const deleteAcousticModelPromise = speechToText.deleteAcousticModel();
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
      speechToText.getAcousticModel(params, noop);

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

      speechToText.getAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const getAcousticModelPromise = speechToText.getAcousticModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const getAcousticModelPromise = speechToText.getAcousticModel();
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
      speechToText.listAcousticModels(params, noop);

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

      speechToText.listAcousticModels(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listAcousticModelsPromise = speechToText.listAcousticModels(params);
      expectToBePromise(listAcousticModelsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      speechToText.listAcousticModels({}, noop);
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
      speechToText.resetAcousticModel(params, noop);

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

      speechToText.resetAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const resetAcousticModelPromise = speechToText.resetAcousticModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const resetAcousticModelPromise = speechToText.resetAcousticModel();
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
      speechToText.trainAcousticModel(params, noop);

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

      speechToText.trainAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const trainAcousticModelPromise = speechToText.trainAcousticModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const trainAcousticModelPromise = speechToText.trainAcousticModel();
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
      const force = 'fake_force';
      const params = {
        customization_id,
        custom_language_model_id,
        force,
      };

      // invoke method
      speechToText.upgradeAcousticModel(params, noop);

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

      speechToText.upgradeAcousticModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const upgradeAcousticModelPromise = speechToText.upgradeAcousticModel(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const upgradeAcousticModelPromise = speechToText.upgradeAcousticModel();
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
      speechToText.addAudio(params, noop);

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

      speechToText.addAudio(params, noop);
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
      const addAudioPromise = speechToText.addAudio(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name', 'audio_resource'];

      const addAudioPromise = speechToText.addAudio();
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
      speechToText.deleteAudio(params, noop);

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

      speechToText.deleteAudio(params, noop);
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
      const deleteAudioPromise = speechToText.deleteAudio(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name'];

      const deleteAudioPromise = speechToText.deleteAudio();
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
      speechToText.getAudio(params, noop);

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

      speechToText.getAudio(params, noop);
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
      const getAudioPromise = speechToText.getAudio(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id', 'audio_name'];

      const getAudioPromise = speechToText.getAudio();
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
      speechToText.listAudio(params, noop);

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

      speechToText.listAudio(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customization_id = 'fake_customization_id';
      const params = {
        customization_id,
      };

      // invoke method
      const listAudioPromise = speechToText.listAudio(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customization_id'];

      const listAudioPromise = speechToText.listAudio();
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
      speechToText.deleteUserData(params, noop);

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

      speechToText.deleteUserData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const params = {
        customer_id,
      };

      // invoke method
      const deleteUserDataPromise = speechToText.deleteUserData(params);
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

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      const deleteUserDataPromise = speechToText.deleteUserData();
      expectToBePromise(deleteUserDataPromise);

      deleteUserDataPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
