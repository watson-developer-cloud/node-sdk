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
const SpeechToTextV1 = require('../../dist/speech-to-text/v1');

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
  url: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com',
};

const speechToText = new SpeechToTextV1(service);
const createRequestMock = jest.spyOn(speechToText, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('SpeechToTextV1', () => {
  describe('listModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const params = {};

        const listModelsResult = speechToText.listModels(params);

        // all methods should return a Promise
        expectToBePromise(listModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/models', 'GET');
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

        speechToText.listModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        speechToText.listModels({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await speechToText.listModels(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const modelId = 'fake_modelId';
        const params = {
          modelId,
        };

        const getModelResult = speechToText.getModel(params);

        // all methods should return a Promise
        expectToBePromise(getModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/models/{model_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['model_id']).toEqual(modelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'fake_modelId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.getModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['modelId'];

        let err;
        try {
          await speechToText.getModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['modelId'];

        const getModelPromise = speechToText.getModel();
        expectToBePromise(getModelPromise);

        getModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('recognize', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const audio = 'fake_audio';
        const contentType = 'fake_contentType';
        const model = 'fake_model';
        const languageCustomizationId = 'fake_languageCustomizationId';
        const acousticCustomizationId = 'fake_acousticCustomizationId';
        const baseModelVersion = 'fake_baseModelVersion';
        const customizationWeight = 'fake_customizationWeight';
        const inactivityTimeout = 'fake_inactivityTimeout';
        const keywords = 'fake_keywords';
        const keywordsThreshold = 'fake_keywordsThreshold';
        const maxAlternatives = 'fake_maxAlternatives';
        const wordAlternativesThreshold = 'fake_wordAlternativesThreshold';
        const wordConfidence = 'fake_wordConfidence';
        const timestamps = 'fake_timestamps';
        const profanityFilter = 'fake_profanityFilter';
        const smartFormatting = 'fake_smartFormatting';
        const speakerLabels = 'fake_speakerLabels';
        const customizationId = 'fake_customizationId';
        const grammarName = 'fake_grammarName';
        const redaction = 'fake_redaction';
        const audioMetrics = 'fake_audioMetrics';
        const endOfPhraseSilenceTime = 'fake_endOfPhraseSilenceTime';
        const splitTranscriptAtPhraseEnd = 'fake_splitTranscriptAtPhraseEnd';
        const speechDetectorSensitivity = 'fake_speechDetectorSensitivity';
        const backgroundAudioSuppression = 'fake_backgroundAudioSuppression';
        const params = {
          audio,
          contentType,
          model,
          languageCustomizationId,
          acousticCustomizationId,
          baseModelVersion,
          customizationWeight,
          inactivityTimeout,
          keywords,
          keywordsThreshold,
          maxAlternatives,
          wordAlternativesThreshold,
          wordConfidence,
          timestamps,
          profanityFilter,
          smartFormatting,
          speakerLabels,
          customizationId,
          grammarName,
          redaction,
          audioMetrics,
          endOfPhraseSilenceTime,
          splitTranscriptAtPhraseEnd,
          speechDetectorSensitivity,
          backgroundAudioSuppression,
        };

        const recognizeResult = speechToText.recognize(params);

        // all methods should return a Promise
        expectToBePromise(recognizeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/recognize', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(options.body).toEqual(audio);
        expect(options.qs['model']).toEqual(model);
        expect(options.qs['language_customization_id']).toEqual(languageCustomizationId);
        expect(options.qs['acoustic_customization_id']).toEqual(acousticCustomizationId);
        expect(options.qs['base_model_version']).toEqual(baseModelVersion);
        expect(options.qs['customization_weight']).toEqual(customizationWeight);
        expect(options.qs['inactivity_timeout']).toEqual(inactivityTimeout);
        expect(options.qs['keywords']).toEqual(keywords);
        expect(options.qs['keywords_threshold']).toEqual(keywordsThreshold);
        expect(options.qs['max_alternatives']).toEqual(maxAlternatives);
        expect(options.qs['word_alternatives_threshold']).toEqual(wordAlternativesThreshold);
        expect(options.qs['word_confidence']).toEqual(wordConfidence);
        expect(options.qs['timestamps']).toEqual(timestamps);
        expect(options.qs['profanity_filter']).toEqual(profanityFilter);
        expect(options.qs['smart_formatting']).toEqual(smartFormatting);
        expect(options.qs['speaker_labels']).toEqual(speakerLabels);
        expect(options.qs['customization_id']).toEqual(customizationId);
        expect(options.qs['grammar_name']).toEqual(grammarName);
        expect(options.qs['redaction']).toEqual(redaction);
        expect(options.qs['audio_metrics']).toEqual(audioMetrics);
        expect(options.qs['end_of_phrase_silence_time']).toEqual(endOfPhraseSilenceTime);
        expect(options.qs['split_transcript_at_phrase_end']).toEqual(splitTranscriptAtPhraseEnd);
        expect(options.qs['speech_detector_sensitivity']).toEqual(speechDetectorSensitivity);
        expect(options.qs['background_audio_suppression']).toEqual(backgroundAudioSuppression);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const audio = 'fake_audio';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          audio,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.recognize(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['audio'];

        let err;
        try {
          await speechToText.recognize({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['audio'];

        const recognizePromise = speechToText.recognize();
        expectToBePromise(recognizePromise);

        recognizePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('registerCallback', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const callbackUrl = 'fake_callbackUrl';
        const userSecret = 'fake_userSecret';
        const params = {
          callbackUrl,
          userSecret,
        };

        const registerCallbackResult = speechToText.registerCallback(params);

        // all methods should return a Promise
        expectToBePromise(registerCallbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/register_callback', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['callback_url']).toEqual(callbackUrl);
        expect(options.qs['user_secret']).toEqual(userSecret);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const callbackUrl = 'fake_callbackUrl';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          callbackUrl,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.registerCallback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['callbackUrl'];

        let err;
        try {
          await speechToText.registerCallback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['callbackUrl'];

        const registerCallbackPromise = speechToText.registerCallback();
        expectToBePromise(registerCallbackPromise);

        registerCallbackPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('unregisterCallback', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const callbackUrl = 'fake_callbackUrl';
        const params = {
          callbackUrl,
        };

        const unregisterCallbackResult = speechToText.unregisterCallback(params);

        // all methods should return a Promise
        expectToBePromise(unregisterCallbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/unregister_callback', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['callback_url']).toEqual(callbackUrl);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const callbackUrl = 'fake_callbackUrl';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          callbackUrl,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.unregisterCallback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['callbackUrl'];

        let err;
        try {
          await speechToText.unregisterCallback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['callbackUrl'];

        const unregisterCallbackPromise = speechToText.unregisterCallback();
        expectToBePromise(unregisterCallbackPromise);

        unregisterCallbackPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createJob', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const audio = 'fake_audio';
        const contentType = 'fake_contentType';
        const model = 'fake_model';
        const callbackUrl = 'fake_callbackUrl';
        const events = 'fake_events';
        const userToken = 'fake_userToken';
        const resultsTtl = 'fake_resultsTtl';
        const languageCustomizationId = 'fake_languageCustomizationId';
        const acousticCustomizationId = 'fake_acousticCustomizationId';
        const baseModelVersion = 'fake_baseModelVersion';
        const customizationWeight = 'fake_customizationWeight';
        const inactivityTimeout = 'fake_inactivityTimeout';
        const keywords = 'fake_keywords';
        const keywordsThreshold = 'fake_keywordsThreshold';
        const maxAlternatives = 'fake_maxAlternatives';
        const wordAlternativesThreshold = 'fake_wordAlternativesThreshold';
        const wordConfidence = 'fake_wordConfidence';
        const timestamps = 'fake_timestamps';
        const profanityFilter = 'fake_profanityFilter';
        const smartFormatting = 'fake_smartFormatting';
        const speakerLabels = 'fake_speakerLabels';
        const customizationId = 'fake_customizationId';
        const grammarName = 'fake_grammarName';
        const redaction = 'fake_redaction';
        const processingMetrics = 'fake_processingMetrics';
        const processingMetricsInterval = 'fake_processingMetricsInterval';
        const audioMetrics = 'fake_audioMetrics';
        const endOfPhraseSilenceTime = 'fake_endOfPhraseSilenceTime';
        const splitTranscriptAtPhraseEnd = 'fake_splitTranscriptAtPhraseEnd';
        const speechDetectorSensitivity = 'fake_speechDetectorSensitivity';
        const backgroundAudioSuppression = 'fake_backgroundAudioSuppression';
        const params = {
          audio,
          contentType,
          model,
          callbackUrl,
          events,
          userToken,
          resultsTtl,
          languageCustomizationId,
          acousticCustomizationId,
          baseModelVersion,
          customizationWeight,
          inactivityTimeout,
          keywords,
          keywordsThreshold,
          maxAlternatives,
          wordAlternativesThreshold,
          wordConfidence,
          timestamps,
          profanityFilter,
          smartFormatting,
          speakerLabels,
          customizationId,
          grammarName,
          redaction,
          processingMetrics,
          processingMetricsInterval,
          audioMetrics,
          endOfPhraseSilenceTime,
          splitTranscriptAtPhraseEnd,
          speechDetectorSensitivity,
          backgroundAudioSuppression,
        };

        const createJobResult = speechToText.createJob(params);

        // all methods should return a Promise
        expectToBePromise(createJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/recognitions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(options.body).toEqual(audio);
        expect(options.qs['model']).toEqual(model);
        expect(options.qs['callback_url']).toEqual(callbackUrl);
        expect(options.qs['events']).toEqual(events);
        expect(options.qs['user_token']).toEqual(userToken);
        expect(options.qs['results_ttl']).toEqual(resultsTtl);
        expect(options.qs['language_customization_id']).toEqual(languageCustomizationId);
        expect(options.qs['acoustic_customization_id']).toEqual(acousticCustomizationId);
        expect(options.qs['base_model_version']).toEqual(baseModelVersion);
        expect(options.qs['customization_weight']).toEqual(customizationWeight);
        expect(options.qs['inactivity_timeout']).toEqual(inactivityTimeout);
        expect(options.qs['keywords']).toEqual(keywords);
        expect(options.qs['keywords_threshold']).toEqual(keywordsThreshold);
        expect(options.qs['max_alternatives']).toEqual(maxAlternatives);
        expect(options.qs['word_alternatives_threshold']).toEqual(wordAlternativesThreshold);
        expect(options.qs['word_confidence']).toEqual(wordConfidence);
        expect(options.qs['timestamps']).toEqual(timestamps);
        expect(options.qs['profanity_filter']).toEqual(profanityFilter);
        expect(options.qs['smart_formatting']).toEqual(smartFormatting);
        expect(options.qs['speaker_labels']).toEqual(speakerLabels);
        expect(options.qs['customization_id']).toEqual(customizationId);
        expect(options.qs['grammar_name']).toEqual(grammarName);
        expect(options.qs['redaction']).toEqual(redaction);
        expect(options.qs['processing_metrics']).toEqual(processingMetrics);
        expect(options.qs['processing_metrics_interval']).toEqual(processingMetricsInterval);
        expect(options.qs['audio_metrics']).toEqual(audioMetrics);
        expect(options.qs['end_of_phrase_silence_time']).toEqual(endOfPhraseSilenceTime);
        expect(options.qs['split_transcript_at_phrase_end']).toEqual(splitTranscriptAtPhraseEnd);
        expect(options.qs['speech_detector_sensitivity']).toEqual(speechDetectorSensitivity);
        expect(options.qs['background_audio_suppression']).toEqual(backgroundAudioSuppression);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const audio = 'fake_audio';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          audio,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.createJob(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['audio'];

        let err;
        try {
          await speechToText.createJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['audio'];

        const createJobPromise = speechToText.createJob();
        expectToBePromise(createJobPromise);

        createJobPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('checkJobs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const params = {};

        const checkJobsResult = speechToText.checkJobs(params);

        // all methods should return a Promise
        expectToBePromise(checkJobsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/recognitions', 'GET');
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

        speechToText.checkJobs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        speechToText.checkJobs({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await speechToText.checkJobs(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('checkJob', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const id = 'fake_id';
        const params = {
          id,
        };

        const checkJobResult = speechToText.checkJob(params);

        // all methods should return a Promise
        expectToBePromise(checkJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/recognitions/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'fake_id';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.checkJob(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['id'];

        let err;
        try {
          await speechToText.checkJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['id'];

        const checkJobPromise = speechToText.checkJob();
        expectToBePromise(checkJobPromise);

        checkJobPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteJob', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const id = 'fake_id';
        const params = {
          id,
        };

        const deleteJobResult = speechToText.deleteJob(params);

        // all methods should return a Promise
        expectToBePromise(deleteJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/recognitions/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'fake_id';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.deleteJob(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['id'];

        let err;
        try {
          await speechToText.deleteJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['id'];

        const deleteJobPromise = speechToText.deleteJob();
        expectToBePromise(deleteJobPromise);

        deleteJobPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const name = 'fake_name';
        const baseModelName = 'fake_baseModelName';
        const dialect = 'fake_dialect';
        const description = 'fake_description';
        const params = {
          name,
          baseModelName,
          dialect,
          description,
        };

        const createLanguageModelResult = speechToText.createLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(createLanguageModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['base_model_name']).toEqual(baseModelName);
        expect(options.body['dialect']).toEqual(dialect);
        expect(options.body['description']).toEqual(description);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'fake_name';
        const baseModelName = 'fake_baseModelName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          name,
          baseModelName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.createLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['name', 'baseModelName'];

        let err;
        try {
          await speechToText.createLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['name', 'baseModelName'];

        const createLanguageModelPromise = speechToText.createLanguageModel();
        expectToBePromise(createLanguageModelPromise);

        createLanguageModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLanguageModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const language = 'fake_language';
        const params = {
          language,
        };

        const listLanguageModelsResult = speechToText.listLanguageModels(params);

        // all methods should return a Promise
        expectToBePromise(listLanguageModelsResult);

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

        speechToText.listLanguageModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        speechToText.listLanguageModels({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await speechToText.listLanguageModels(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const getLanguageModelResult = speechToText.getLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(getLanguageModelResult);

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

        speechToText.getLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.getLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const getLanguageModelPromise = speechToText.getLanguageModel();
        expectToBePromise(getLanguageModelPromise);

        getLanguageModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const deleteLanguageModelResult = speechToText.deleteLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(deleteLanguageModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}', 'DELETE');
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

        speechToText.deleteLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.deleteLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const deleteLanguageModelPromise = speechToText.deleteLanguageModel();
        expectToBePromise(deleteLanguageModelPromise);

        deleteLanguageModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('trainLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const wordTypeToAdd = 'fake_wordTypeToAdd';
        const customizationWeight = 'fake_customizationWeight';
        const params = {
          customizationId,
          wordTypeToAdd,
          customizationWeight,
        };

        const trainLanguageModelResult = speechToText.trainLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(trainLanguageModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/train', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['word_type_to_add']).toEqual(wordTypeToAdd);
        expect(options.qs['customization_weight']).toEqual(customizationWeight);
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

        speechToText.trainLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.trainLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const trainLanguageModelPromise = speechToText.trainLanguageModel();
        expectToBePromise(trainLanguageModelPromise);

        trainLanguageModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('resetLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const resetLanguageModelResult = speechToText.resetLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(resetLanguageModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/reset', 'POST');
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

        speechToText.resetLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.resetLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const resetLanguageModelPromise = speechToText.resetLanguageModel();
        expectToBePromise(resetLanguageModelPromise);

        resetLanguageModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('upgradeLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const upgradeLanguageModelResult = speechToText.upgradeLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(upgradeLanguageModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/upgrade_model', 'POST');
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

        speechToText.upgradeLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.upgradeLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const upgradeLanguageModelPromise = speechToText.upgradeLanguageModel();
        expectToBePromise(upgradeLanguageModelPromise);

        upgradeLanguageModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listCorpora', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const listCorporaResult = speechToText.listCorpora(params);

        // all methods should return a Promise
        expectToBePromise(listCorporaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/corpora', 'GET');
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

        speechToText.listCorpora(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.listCorpora({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const listCorporaPromise = speechToText.listCorpora();
        expectToBePromise(listCorporaPromise);

        listCorporaPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addCorpus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const corpusName = 'fake_corpusName';
        const corpusFile = 'fake_corpusFile';
        const allowOverwrite = 'fake_allowOverwrite';
        const params = {
          customizationId,
          corpusName,
          corpusFile,
          allowOverwrite,
        };

        const addCorpusResult = speechToText.addCorpus(params);

        // all methods should return a Promise
        expectToBePromise(addCorpusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/customizations/{customization_id}/corpora/{corpus_name}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['corpus_file'].data).toEqual(corpusFile);
        expect(options.formData['corpus_file'].contentType).toEqual('text/plain');
        expect(options.qs['allow_overwrite']).toEqual(allowOverwrite);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['corpus_name']).toEqual(corpusName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const corpusName = 'fake_corpusName';
        const corpusFile = 'fake_corpusFile';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          corpusName,
          corpusFile,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.addCorpus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'corpusName', 'corpusFile'];

        let err;
        try {
          await speechToText.addCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'corpusName', 'corpusFile'];

        const addCorpusPromise = speechToText.addCorpus();
        expectToBePromise(addCorpusPromise);

        addCorpusPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCorpus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const corpusName = 'fake_corpusName';
        const params = {
          customizationId,
          corpusName,
        };

        const getCorpusResult = speechToText.getCorpus(params);

        // all methods should return a Promise
        expectToBePromise(getCorpusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/customizations/{customization_id}/corpora/{corpus_name}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['corpus_name']).toEqual(corpusName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const corpusName = 'fake_corpusName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          corpusName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.getCorpus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'corpusName'];

        let err;
        try {
          await speechToText.getCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'corpusName'];

        const getCorpusPromise = speechToText.getCorpus();
        expectToBePromise(getCorpusPromise);

        getCorpusPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCorpus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const corpusName = 'fake_corpusName';
        const params = {
          customizationId,
          corpusName,
        };

        const deleteCorpusResult = speechToText.deleteCorpus(params);

        // all methods should return a Promise
        expectToBePromise(deleteCorpusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/customizations/{customization_id}/corpora/{corpus_name}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['corpus_name']).toEqual(corpusName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const corpusName = 'fake_corpusName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          corpusName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.deleteCorpus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'corpusName'];

        let err;
        try {
          await speechToText.deleteCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'corpusName'];

        const deleteCorpusPromise = speechToText.deleteCorpus();
        expectToBePromise(deleteCorpusPromise);

        deleteCorpusPromise.catch(err => {
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
        const wordType = 'fake_wordType';
        const sort = 'fake_sort';
        const params = {
          customizationId,
          wordType,
          sort,
        };

        const listWordsResult = speechToText.listWords(params);

        // all methods should return a Promise
        expectToBePromise(listWordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/words', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['word_type']).toEqual(wordType);
        expect(options.qs['sort']).toEqual(sort);
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

        speechToText.listWords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.listWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const listWordsPromise = speechToText.listWords();
        expectToBePromise(listWordsPromise);

        listWordsPromise.catch(err => {
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

        const addWordsResult = speechToText.addWords(params);

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

        speechToText.addWords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'words'];

        let err;
        try {
          await speechToText.addWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'words'];

        const addWordsPromise = speechToText.addWords();
        expectToBePromise(addWordsPromise);

        addWordsPromise.catch(err => {
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
        const wordName = 'fake_wordName';
        const word = 'fake_word';
        const soundsLike = 'fake_soundsLike';
        const displayAs = 'fake_displayAs';
        const params = {
          customizationId,
          wordName,
          word,
          soundsLike,
          displayAs,
        };

        const addWordResult = speechToText.addWord(params);

        // all methods should return a Promise
        expectToBePromise(addWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/customizations/{customization_id}/words/{word_name}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['word']).toEqual(word);
        expect(options.body['sounds_like']).toEqual(soundsLike);
        expect(options.body['display_as']).toEqual(displayAs);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['word_name']).toEqual(wordName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const wordName = 'fake_wordName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          wordName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.addWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'wordName'];

        let err;
        try {
          await speechToText.addWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'wordName'];

        const addWordPromise = speechToText.addWord();
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
        const wordName = 'fake_wordName';
        const params = {
          customizationId,
          wordName,
        };

        const getWordResult = speechToText.getWord(params);

        // all methods should return a Promise
        expectToBePromise(getWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/customizations/{customization_id}/words/{word_name}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['word_name']).toEqual(wordName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const wordName = 'fake_wordName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          wordName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.getWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'wordName'];

        let err;
        try {
          await speechToText.getWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'wordName'];

        const getWordPromise = speechToText.getWord();
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
        const wordName = 'fake_wordName';
        const params = {
          customizationId,
          wordName,
        };

        const deleteWordResult = speechToText.deleteWord(params);

        // all methods should return a Promise
        expectToBePromise(deleteWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/customizations/{customization_id}/words/{word_name}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['word_name']).toEqual(wordName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const wordName = 'fake_wordName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          wordName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.deleteWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'wordName'];

        let err;
        try {
          await speechToText.deleteWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'wordName'];

        const deleteWordPromise = speechToText.deleteWord();
        expectToBePromise(deleteWordPromise);

        deleteWordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGrammars', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const listGrammarsResult = speechToText.listGrammars(params);

        // all methods should return a Promise
        expectToBePromise(listGrammarsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/customizations/{customization_id}/grammars', 'GET');
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

        speechToText.listGrammars(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.listGrammars({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const listGrammarsPromise = speechToText.listGrammars();
        expectToBePromise(listGrammarsPromise);

        listGrammarsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addGrammar', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const grammarName = 'fake_grammarName';
        const grammarFile = 'fake_grammarFile';
        const contentType = 'fake_contentType';
        const allowOverwrite = 'fake_allowOverwrite';
        const params = {
          customizationId,
          grammarName,
          grammarFile,
          contentType,
          allowOverwrite,
        };

        const addGrammarResult = speechToText.addGrammar(params);

        // all methods should return a Promise
        expectToBePromise(addGrammarResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/customizations/{customization_id}/grammars/{grammar_name}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(options.body).toEqual(grammarFile);
        expect(options.qs['allow_overwrite']).toEqual(allowOverwrite);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['grammar_name']).toEqual(grammarName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const grammarName = 'fake_grammarName';
        const grammarFile = 'fake_grammarFile';
        const contentType = 'fake_contentType';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          grammarName,
          grammarFile,
          contentType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.addGrammar(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'grammarName', 'grammarFile', 'contentType'];

        let err;
        try {
          await speechToText.addGrammar({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'grammarName', 'grammarFile', 'contentType'];

        const addGrammarPromise = speechToText.addGrammar();
        expectToBePromise(addGrammarPromise);

        addGrammarPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGrammar', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const grammarName = 'fake_grammarName';
        const params = {
          customizationId,
          grammarName,
        };

        const getGrammarResult = speechToText.getGrammar(params);

        // all methods should return a Promise
        expectToBePromise(getGrammarResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/customizations/{customization_id}/grammars/{grammar_name}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['grammar_name']).toEqual(grammarName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const grammarName = 'fake_grammarName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          grammarName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.getGrammar(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'grammarName'];

        let err;
        try {
          await speechToText.getGrammar({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'grammarName'];

        const getGrammarPromise = speechToText.getGrammar();
        expectToBePromise(getGrammarPromise);

        getGrammarPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteGrammar', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const grammarName = 'fake_grammarName';
        const params = {
          customizationId,
          grammarName,
        };

        const deleteGrammarResult = speechToText.deleteGrammar(params);

        // all methods should return a Promise
        expectToBePromise(deleteGrammarResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/customizations/{customization_id}/grammars/{grammar_name}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['grammar_name']).toEqual(grammarName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const grammarName = 'fake_grammarName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          grammarName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.deleteGrammar(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'grammarName'];

        let err;
        try {
          await speechToText.deleteGrammar({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'grammarName'];

        const deleteGrammarPromise = speechToText.deleteGrammar();
        expectToBePromise(deleteGrammarPromise);

        deleteGrammarPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const name = 'fake_name';
        const baseModelName = 'fake_baseModelName';
        const description = 'fake_description';
        const params = {
          name,
          baseModelName,
          description,
        };

        const createAcousticModelResult = speechToText.createAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(createAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/acoustic_customizations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['base_model_name']).toEqual(baseModelName);
        expect(options.body['description']).toEqual(description);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'fake_name';
        const baseModelName = 'fake_baseModelName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          name,
          baseModelName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.createAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['name', 'baseModelName'];

        let err;
        try {
          await speechToText.createAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['name', 'baseModelName'];

        const createAcousticModelPromise = speechToText.createAcousticModel();
        expectToBePromise(createAcousticModelPromise);

        createAcousticModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listAcousticModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const language = 'fake_language';
        const params = {
          language,
        };

        const listAcousticModelsResult = speechToText.listAcousticModels(params);

        // all methods should return a Promise
        expectToBePromise(listAcousticModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/acoustic_customizations', 'GET');
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

        speechToText.listAcousticModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        speechToText.listAcousticModels({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await speechToText.listAcousticModels(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const getAcousticModelResult = speechToText.getAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(getAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}', 'GET');
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

        speechToText.getAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.getAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const getAcousticModelPromise = speechToText.getAcousticModel();
        expectToBePromise(getAcousticModelPromise);

        getAcousticModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const deleteAcousticModelResult = speechToText.deleteAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(deleteAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}', 'DELETE');
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

        speechToText.deleteAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.deleteAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const deleteAcousticModelPromise = speechToText.deleteAcousticModel();
        expectToBePromise(deleteAcousticModelPromise);

        deleteAcousticModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('trainAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const customLanguageModelId = 'fake_customLanguageModelId';
        const params = {
          customizationId,
          customLanguageModelId,
        };

        const trainAcousticModelResult = speechToText.trainAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(trainAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}/train', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['custom_language_model_id']).toEqual(customLanguageModelId);
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

        speechToText.trainAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.trainAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const trainAcousticModelPromise = speechToText.trainAcousticModel();
        expectToBePromise(trainAcousticModelPromise);

        trainAcousticModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('resetAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const resetAcousticModelResult = speechToText.resetAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(resetAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}/reset', 'POST');
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

        speechToText.resetAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.resetAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const resetAcousticModelPromise = speechToText.resetAcousticModel();
        expectToBePromise(resetAcousticModelPromise);

        resetAcousticModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('upgradeAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const customLanguageModelId = 'fake_customLanguageModelId';
        const force = 'fake_force';
        const params = {
          customizationId,
          customLanguageModelId,
          force,
        };

        const upgradeAcousticModelResult = speechToText.upgradeAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(upgradeAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/acoustic_customizations/{customization_id}/upgrade_model',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['custom_language_model_id']).toEqual(customLanguageModelId);
        expect(options.qs['force']).toEqual(force);
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

        speechToText.upgradeAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.upgradeAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const upgradeAcousticModelPromise = speechToText.upgradeAcousticModel();
        expectToBePromise(upgradeAcousticModelPromise);

        upgradeAcousticModelPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listAudio', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const params = {
          customizationId,
        };

        const listAudioResult = speechToText.listAudio(params);

        // all methods should return a Promise
        expectToBePromise(listAudioResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/acoustic_customizations/{customization_id}/audio', 'GET');
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

        speechToText.listAudio(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        let err;
        try {
          await speechToText.listAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId'];

        const listAudioPromise = speechToText.listAudio();
        expectToBePromise(listAudioPromise);

        listAudioPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addAudio', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const audioName = 'fake_audioName';
        const audioResource = 'fake_audioResource';
        const contentType = 'fake_contentType';
        const containedContentType = 'fake_containedContentType';
        const allowOverwrite = 'fake_allowOverwrite';
        const params = {
          customizationId,
          audioName,
          audioResource,
          contentType,
          containedContentType,
          allowOverwrite,
        };

        const addAudioResult = speechToText.addAudio(params);

        // all methods should return a Promise
        expectToBePromise(addAudioResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'Contained-Content-Type', containedContentType);
        expect(options.body).toEqual(audioResource);
        expect(options.qs['allow_overwrite']).toEqual(allowOverwrite);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['audio_name']).toEqual(audioName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const audioName = 'fake_audioName';
        const audioResource = 'fake_audioResource';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          audioName,
          audioResource,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.addAudio(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'audioName', 'audioResource'];

        let err;
        try {
          await speechToText.addAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'audioName', 'audioResource'];

        const addAudioPromise = speechToText.addAudio();
        expectToBePromise(addAudioPromise);

        addAudioPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getAudio', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const audioName = 'fake_audioName';
        const params = {
          customizationId,
          audioName,
        };

        const getAudioResult = speechToText.getAudio(params);

        // all methods should return a Promise
        expectToBePromise(getAudioResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['audio_name']).toEqual(audioName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const audioName = 'fake_audioName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          audioName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.getAudio(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'audioName'];

        let err;
        try {
          await speechToText.getAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'audioName'];

        const getAudioPromise = speechToText.getAudio();
        expectToBePromise(getAudioPromise);

        getAudioPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteAudio', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const audioName = 'fake_audioName';
        const params = {
          customizationId,
          audioName,
        };

        const deleteAudioResult = speechToText.deleteAudio(params);

        // all methods should return a Promise
        expectToBePromise(deleteAudioResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['customization_id']).toEqual(customizationId);
        expect(options.path['audio_name']).toEqual(audioName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'fake_customizationId';
        const audioName = 'fake_audioName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customizationId,
          audioName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToText.deleteAudio(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'audioName'];

        let err;
        try {
          await speechToText.deleteAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customizationId', 'audioName'];

        const deleteAudioPromise = speechToText.deleteAudio();
        expectToBePromise(deleteAudioPromise);

        deleteAudioPromise.catch(err => {
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

        const deleteUserDataResult = speechToText.deleteUserData(params);

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

        speechToText.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        let err;
        try {
          await speechToText.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        const deleteUserDataPromise = speechToText.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
