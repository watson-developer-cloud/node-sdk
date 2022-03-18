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

const SpeechToTextV1 = require('../../dist/speech-to-text/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const speechToTextServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com',
};

const speechToTextService = new SpeechToTextV1(speechToTextServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(speechToTextService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('SpeechToTextV1', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new SpeechToTextV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new SpeechToTextV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(SpeechToTextV1.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      const testInstance = new SpeechToTextV1(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new SpeechToTextV1(options);

      expect(testInstance.baseOptions.serviceName).toBe(SpeechToTextV1.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new SpeechToTextV1(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new SpeechToTextV1();

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('listModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listModels
        const params = {};

        const listModelsResult = speechToTextService.listModels(params);

        // all methods should return a Promise
        expectToBePromise(listModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models', 'GET');
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

        speechToTextService.listModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        speechToTextService.listModels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getModel
        const modelId = 'ar-AR_BroadbandModel';
        const params = {
          modelId: modelId,
        };

        const getModelResult = speechToTextService.getModel(params);

        // all methods should return a Promise
        expectToBePromise(getModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models/{model_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.model_id).toEqual(modelId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'ar-AR_BroadbandModel';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.getModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getModelPromise = speechToTextService.getModel();
        expectToBePromise(getModelPromise);

        getModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('recognize', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation recognize
        const audio = Buffer.from('This is a mock file.');
        const contentType = 'application/octet-stream';
        const model = 'en-US_BroadbandModel';
        const languageCustomizationId = 'testString';
        const acousticCustomizationId = 'testString';
        const baseModelVersion = 'testString';
        const customizationWeight = 72.5;
        const inactivityTimeout = 38;
        const keywords = ['testString'];
        const keywordsThreshold = 36.0;
        const maxAlternatives = 38;
        const wordAlternativesThreshold = 36.0;
        const wordConfidence = false;
        const timestamps = false;
        const profanityFilter = true;
        const smartFormatting = false;
        const speakerLabels = false;
        const customizationId = 'testString';
        const grammarName = 'testString';
        const redaction = false;
        const audioMetrics = false;
        const endOfPhraseSilenceTime = 72.5;
        const splitTranscriptAtPhraseEnd = false;
        const speechDetectorSensitivity = 36.0;
        const backgroundAudioSuppression = 36.0;
        const lowLatency = false;
        const params = {
          audio: audio,
          contentType: contentType,
          model: model,
          languageCustomizationId: languageCustomizationId,
          acousticCustomizationId: acousticCustomizationId,
          baseModelVersion: baseModelVersion,
          customizationWeight: customizationWeight,
          inactivityTimeout: inactivityTimeout,
          keywords: keywords,
          keywordsThreshold: keywordsThreshold,
          maxAlternatives: maxAlternatives,
          wordAlternativesThreshold: wordAlternativesThreshold,
          wordConfidence: wordConfidence,
          timestamps: timestamps,
          profanityFilter: profanityFilter,
          smartFormatting: smartFormatting,
          speakerLabels: speakerLabels,
          customizationId: customizationId,
          grammarName: grammarName,
          redaction: redaction,
          audioMetrics: audioMetrics,
          endOfPhraseSilenceTime: endOfPhraseSilenceTime,
          splitTranscriptAtPhraseEnd: splitTranscriptAtPhraseEnd,
          speechDetectorSensitivity: speechDetectorSensitivity,
          backgroundAudioSuppression: backgroundAudioSuppression,
          lowLatency: lowLatency,
        };

        const recognizeResult = speechToTextService.recognize(params);

        // all methods should return a Promise
        expectToBePromise(recognizeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/recognize', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(mockRequestOptions.body).toEqual(audio);
        expect(mockRequestOptions.qs.model).toEqual(model);
        expect(mockRequestOptions.qs.language_customization_id).toEqual(languageCustomizationId);
        expect(mockRequestOptions.qs.acoustic_customization_id).toEqual(acousticCustomizationId);
        expect(mockRequestOptions.qs.base_model_version).toEqual(baseModelVersion);
        expect(mockRequestOptions.qs.customization_weight).toEqual(customizationWeight);
        expect(mockRequestOptions.qs.inactivity_timeout).toEqual(inactivityTimeout);
        expect(mockRequestOptions.qs.keywords).toEqual(keywords);
        expect(mockRequestOptions.qs.keywords_threshold).toEqual(keywordsThreshold);
        expect(mockRequestOptions.qs.max_alternatives).toEqual(maxAlternatives);
        expect(mockRequestOptions.qs.word_alternatives_threshold).toEqual(wordAlternativesThreshold);
        expect(mockRequestOptions.qs.word_confidence).toEqual(wordConfidence);
        expect(mockRequestOptions.qs.timestamps).toEqual(timestamps);
        expect(mockRequestOptions.qs.profanity_filter).toEqual(profanityFilter);
        expect(mockRequestOptions.qs.smart_formatting).toEqual(smartFormatting);
        expect(mockRequestOptions.qs.speaker_labels).toEqual(speakerLabels);
        expect(mockRequestOptions.qs.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.qs.grammar_name).toEqual(grammarName);
        expect(mockRequestOptions.qs.redaction).toEqual(redaction);
        expect(mockRequestOptions.qs.audio_metrics).toEqual(audioMetrics);
        expect(mockRequestOptions.qs.end_of_phrase_silence_time).toEqual(endOfPhraseSilenceTime);
        expect(mockRequestOptions.qs.split_transcript_at_phrase_end).toEqual(splitTranscriptAtPhraseEnd);
        expect(mockRequestOptions.qs.speech_detector_sensitivity).toEqual(speechDetectorSensitivity);
        expect(mockRequestOptions.qs.background_audio_suppression).toEqual(backgroundAudioSuppression);
        expect(mockRequestOptions.qs.low_latency).toEqual(lowLatency);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const audio = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          audio,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.recognize(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.recognize({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const recognizePromise = speechToTextService.recognize();
        expectToBePromise(recognizePromise);

        recognizePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('registerCallback', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation registerCallback
        const callbackUrl = 'testString';
        const userSecret = 'testString';
        const params = {
          callbackUrl: callbackUrl,
          userSecret: userSecret,
        };

        const registerCallbackResult = speechToTextService.registerCallback(params);

        // all methods should return a Promise
        expectToBePromise(registerCallbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/register_callback', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.callback_url).toEqual(callbackUrl);
        expect(mockRequestOptions.qs.user_secret).toEqual(userSecret);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const callbackUrl = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          callbackUrl,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.registerCallback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.registerCallback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const registerCallbackPromise = speechToTextService.registerCallback();
        expectToBePromise(registerCallbackPromise);

        registerCallbackPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('unregisterCallback', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation unregisterCallback
        const callbackUrl = 'testString';
        const params = {
          callbackUrl: callbackUrl,
        };

        const unregisterCallbackResult = speechToTextService.unregisterCallback(params);

        // all methods should return a Promise
        expectToBePromise(unregisterCallbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/unregister_callback', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.callback_url).toEqual(callbackUrl);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const callbackUrl = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          callbackUrl,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.unregisterCallback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.unregisterCallback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const unregisterCallbackPromise = speechToTextService.unregisterCallback();
        expectToBePromise(unregisterCallbackPromise);

        unregisterCallbackPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createJob', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createJob
        const audio = Buffer.from('This is a mock file.');
        const contentType = 'application/octet-stream';
        const model = 'en-US_BroadbandModel';
        const callbackUrl = 'testString';
        const events = 'recognitions.started';
        const userToken = 'testString';
        const resultsTtl = 38;
        const languageCustomizationId = 'testString';
        const acousticCustomizationId = 'testString';
        const baseModelVersion = 'testString';
        const customizationWeight = 72.5;
        const inactivityTimeout = 38;
        const keywords = ['testString'];
        const keywordsThreshold = 36.0;
        const maxAlternatives = 38;
        const wordAlternativesThreshold = 36.0;
        const wordConfidence = false;
        const timestamps = false;
        const profanityFilter = true;
        const smartFormatting = false;
        const speakerLabels = false;
        const customizationId = 'testString';
        const grammarName = 'testString';
        const redaction = false;
        const processingMetrics = false;
        const processingMetricsInterval = 36.0;
        const audioMetrics = false;
        const endOfPhraseSilenceTime = 72.5;
        const splitTranscriptAtPhraseEnd = false;
        const speechDetectorSensitivity = 36.0;
        const backgroundAudioSuppression = 36.0;
        const lowLatency = false;
        const params = {
          audio: audio,
          contentType: contentType,
          model: model,
          callbackUrl: callbackUrl,
          events: events,
          userToken: userToken,
          resultsTtl: resultsTtl,
          languageCustomizationId: languageCustomizationId,
          acousticCustomizationId: acousticCustomizationId,
          baseModelVersion: baseModelVersion,
          customizationWeight: customizationWeight,
          inactivityTimeout: inactivityTimeout,
          keywords: keywords,
          keywordsThreshold: keywordsThreshold,
          maxAlternatives: maxAlternatives,
          wordAlternativesThreshold: wordAlternativesThreshold,
          wordConfidence: wordConfidence,
          timestamps: timestamps,
          profanityFilter: profanityFilter,
          smartFormatting: smartFormatting,
          speakerLabels: speakerLabels,
          customizationId: customizationId,
          grammarName: grammarName,
          redaction: redaction,
          processingMetrics: processingMetrics,
          processingMetricsInterval: processingMetricsInterval,
          audioMetrics: audioMetrics,
          endOfPhraseSilenceTime: endOfPhraseSilenceTime,
          splitTranscriptAtPhraseEnd: splitTranscriptAtPhraseEnd,
          speechDetectorSensitivity: speechDetectorSensitivity,
          backgroundAudioSuppression: backgroundAudioSuppression,
          lowLatency: lowLatency,
        };

        const createJobResult = speechToTextService.createJob(params);

        // all methods should return a Promise
        expectToBePromise(createJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/recognitions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(mockRequestOptions.body).toEqual(audio);
        expect(mockRequestOptions.qs.model).toEqual(model);
        expect(mockRequestOptions.qs.callback_url).toEqual(callbackUrl);
        expect(mockRequestOptions.qs.events).toEqual(events);
        expect(mockRequestOptions.qs.user_token).toEqual(userToken);
        expect(mockRequestOptions.qs.results_ttl).toEqual(resultsTtl);
        expect(mockRequestOptions.qs.language_customization_id).toEqual(languageCustomizationId);
        expect(mockRequestOptions.qs.acoustic_customization_id).toEqual(acousticCustomizationId);
        expect(mockRequestOptions.qs.base_model_version).toEqual(baseModelVersion);
        expect(mockRequestOptions.qs.customization_weight).toEqual(customizationWeight);
        expect(mockRequestOptions.qs.inactivity_timeout).toEqual(inactivityTimeout);
        expect(mockRequestOptions.qs.keywords).toEqual(keywords);
        expect(mockRequestOptions.qs.keywords_threshold).toEqual(keywordsThreshold);
        expect(mockRequestOptions.qs.max_alternatives).toEqual(maxAlternatives);
        expect(mockRequestOptions.qs.word_alternatives_threshold).toEqual(wordAlternativesThreshold);
        expect(mockRequestOptions.qs.word_confidence).toEqual(wordConfidence);
        expect(mockRequestOptions.qs.timestamps).toEqual(timestamps);
        expect(mockRequestOptions.qs.profanity_filter).toEqual(profanityFilter);
        expect(mockRequestOptions.qs.smart_formatting).toEqual(smartFormatting);
        expect(mockRequestOptions.qs.speaker_labels).toEqual(speakerLabels);
        expect(mockRequestOptions.qs.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.qs.grammar_name).toEqual(grammarName);
        expect(mockRequestOptions.qs.redaction).toEqual(redaction);
        expect(mockRequestOptions.qs.processing_metrics).toEqual(processingMetrics);
        expect(mockRequestOptions.qs.processing_metrics_interval).toEqual(processingMetricsInterval);
        expect(mockRequestOptions.qs.audio_metrics).toEqual(audioMetrics);
        expect(mockRequestOptions.qs.end_of_phrase_silence_time).toEqual(endOfPhraseSilenceTime);
        expect(mockRequestOptions.qs.split_transcript_at_phrase_end).toEqual(splitTranscriptAtPhraseEnd);
        expect(mockRequestOptions.qs.speech_detector_sensitivity).toEqual(speechDetectorSensitivity);
        expect(mockRequestOptions.qs.background_audio_suppression).toEqual(backgroundAudioSuppression);
        expect(mockRequestOptions.qs.low_latency).toEqual(lowLatency);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const audio = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          audio,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.createJob(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.createJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createJobPromise = speechToTextService.createJob();
        expectToBePromise(createJobPromise);

        createJobPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('checkJobs', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation checkJobs
        const params = {};

        const checkJobsResult = speechToTextService.checkJobs(params);

        // all methods should return a Promise
        expectToBePromise(checkJobsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/recognitions', 'GET');
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

        speechToTextService.checkJobs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        speechToTextService.checkJobs({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('checkJob', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation checkJob
        const id = 'testString';
        const params = {
          id: id,
        };

        const checkJobResult = speechToTextService.checkJob(params);

        // all methods should return a Promise
        expectToBePromise(checkJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/recognitions/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.checkJob(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.checkJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const checkJobPromise = speechToTextService.checkJob();
        expectToBePromise(checkJobPromise);

        checkJobPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteJob', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteJob
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteJobResult = speechToTextService.deleteJob(params);

        // all methods should return a Promise
        expectToBePromise(deleteJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/recognitions/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteJob(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.deleteJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteJobPromise = speechToTextService.deleteJob();
        expectToBePromise(deleteJobPromise);

        deleteJobPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLanguageModel
        const name = 'testString';
        const baseModelName = 'ar-MS_Telephony';
        const dialect = 'testString';
        const description = 'testString';
        const params = {
          name: name,
          baseModelName: baseModelName,
          dialect: dialect,
          description: description,
        };

        const createLanguageModelResult = speechToTextService.createLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(createLanguageModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.base_model_name).toEqual(baseModelName);
        expect(mockRequestOptions.body.dialect).toEqual(dialect);
        expect(mockRequestOptions.body.description).toEqual(description);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const baseModelName = 'ar-MS_Telephony';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          baseModelName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.createLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.createLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createLanguageModelPromise = speechToTextService.createLanguageModel();
        expectToBePromise(createLanguageModelPromise);

        createLanguageModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLanguageModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLanguageModels
        const language = 'ar-AR';
        const params = {
          language: language,
        };

        const listLanguageModelsResult = speechToTextService.listLanguageModels(params);

        // all methods should return a Promise
        expectToBePromise(listLanguageModelsResult);

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

        speechToTextService.listLanguageModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        speechToTextService.listLanguageModels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLanguageModel
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const getLanguageModelResult = speechToTextService.getLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(getLanguageModelResult);

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

        speechToTextService.getLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.getLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getLanguageModelPromise = speechToTextService.getLanguageModel();
        expectToBePromise(getLanguageModelPromise);

        getLanguageModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLanguageModel
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const deleteLanguageModelResult = speechToTextService.deleteLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(deleteLanguageModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}', 'DELETE');
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

        speechToTextService.deleteLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.deleteLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteLanguageModelPromise = speechToTextService.deleteLanguageModel();
        expectToBePromise(deleteLanguageModelPromise);

        deleteLanguageModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('trainLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation trainLanguageModel
        const customizationId = 'testString';
        const wordTypeToAdd = 'all';
        const customizationWeight = 72.5;
        const params = {
          customizationId: customizationId,
          wordTypeToAdd: wordTypeToAdd,
          customizationWeight: customizationWeight,
        };

        const trainLanguageModelResult = speechToTextService.trainLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(trainLanguageModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/train', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.word_type_to_add).toEqual(wordTypeToAdd);
        expect(mockRequestOptions.qs.customization_weight).toEqual(customizationWeight);
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

        speechToTextService.trainLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.trainLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const trainLanguageModelPromise = speechToTextService.trainLanguageModel();
        expectToBePromise(trainLanguageModelPromise);

        trainLanguageModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('resetLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation resetLanguageModel
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const resetLanguageModelResult = speechToTextService.resetLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(resetLanguageModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/reset', 'POST');
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

        speechToTextService.resetLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.resetLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const resetLanguageModelPromise = speechToTextService.resetLanguageModel();
        expectToBePromise(resetLanguageModelPromise);

        resetLanguageModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('upgradeLanguageModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation upgradeLanguageModel
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const upgradeLanguageModelResult = speechToTextService.upgradeLanguageModel(params);

        // all methods should return a Promise
        expectToBePromise(upgradeLanguageModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/upgrade_model', 'POST');
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

        speechToTextService.upgradeLanguageModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.upgradeLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const upgradeLanguageModelPromise = speechToTextService.upgradeLanguageModel();
        expectToBePromise(upgradeLanguageModelPromise);

        upgradeLanguageModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listCorpora', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCorpora
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const listCorporaResult = speechToTextService.listCorpora(params);

        // all methods should return a Promise
        expectToBePromise(listCorporaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/corpora', 'GET');
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

        speechToTextService.listCorpora(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.listCorpora({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listCorporaPromise = speechToTextService.listCorpora();
        expectToBePromise(listCorporaPromise);

        listCorporaPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addCorpus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addCorpus
        const customizationId = 'testString';
        const corpusName = 'testString';
        const corpusFile = Buffer.from('This is a mock file.');
        const allowOverwrite = false;
        const params = {
          customizationId: customizationId,
          corpusName: corpusName,
          corpusFile: corpusFile,
          allowOverwrite: allowOverwrite,
        };

        const addCorpusResult = speechToTextService.addCorpus(params);

        // all methods should return a Promise
        expectToBePromise(addCorpusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/corpora/{corpus_name}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.corpus_file.data).toEqual(corpusFile);
        expect(mockRequestOptions.formData.corpus_file.contentType).toEqual('text/plain');
        expect(mockRequestOptions.qs.allow_overwrite).toEqual(allowOverwrite);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.corpus_name).toEqual(corpusName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const corpusName = 'testString';
        const corpusFile = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          corpusName,
          corpusFile,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.addCorpus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.addCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const addCorpusPromise = speechToTextService.addCorpus();
        expectToBePromise(addCorpusPromise);

        addCorpusPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCorpus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCorpus
        const customizationId = 'testString';
        const corpusName = 'testString';
        const params = {
          customizationId: customizationId,
          corpusName: corpusName,
        };

        const getCorpusResult = speechToTextService.getCorpus(params);

        // all methods should return a Promise
        expectToBePromise(getCorpusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/corpora/{corpus_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.corpus_name).toEqual(corpusName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const corpusName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          corpusName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getCorpus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.getCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getCorpusPromise = speechToTextService.getCorpus();
        expectToBePromise(getCorpusPromise);

        getCorpusPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCorpus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCorpus
        const customizationId = 'testString';
        const corpusName = 'testString';
        const params = {
          customizationId: customizationId,
          corpusName: corpusName,
        };

        const deleteCorpusResult = speechToTextService.deleteCorpus(params);

        // all methods should return a Promise
        expectToBePromise(deleteCorpusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/corpora/{corpus_name}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.corpus_name).toEqual(corpusName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const corpusName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          corpusName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteCorpus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.deleteCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteCorpusPromise = speechToTextService.deleteCorpus();
        expectToBePromise(deleteCorpusPromise);

        deleteCorpusPromise.catch((err) => {
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
        const wordType = 'all';
        const sort = 'alphabetical';
        const params = {
          customizationId: customizationId,
          wordType: wordType,
          sort: sort,
        };

        const listWordsResult = speechToTextService.listWords(params);

        // all methods should return a Promise
        expectToBePromise(listWordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/words', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.word_type).toEqual(wordType);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
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

        speechToTextService.listWords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.listWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listWordsPromise = speechToTextService.listWords();
        expectToBePromise(listWordsPromise);

        listWordsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addWords', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CustomWord
      const customWordModel = {
        word: 'testString',
        sounds_like: ['testString'],
        display_as: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addWords
        const customizationId = 'testString';
        const words = [customWordModel];
        const params = {
          customizationId: customizationId,
          words: words,
        };

        const addWordsResult = speechToTextService.addWords(params);

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
        const words = [customWordModel];
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

        speechToTextService.addWords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.addWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const addWordsPromise = speechToTextService.addWords();
        expectToBePromise(addWordsPromise);

        addWordsPromise.catch((err) => {
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
        const wordName = 'testString';
        const word = 'testString';
        const soundsLike = ['testString'];
        const displayAs = 'testString';
        const params = {
          customizationId: customizationId,
          wordName: wordName,
          word: word,
          soundsLike: soundsLike,
          displayAs: displayAs,
        };

        const addWordResult = speechToTextService.addWord(params);

        // all methods should return a Promise
        expectToBePromise(addWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/words/{word_name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.word).toEqual(word);
        expect(mockRequestOptions.body.sounds_like).toEqual(soundsLike);
        expect(mockRequestOptions.body.display_as).toEqual(displayAs);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.word_name).toEqual(wordName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const wordName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          wordName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.addWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.addWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const addWordPromise = speechToTextService.addWord();
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
        const wordName = 'testString';
        const params = {
          customizationId: customizationId,
          wordName: wordName,
        };

        const getWordResult = speechToTextService.getWord(params);

        // all methods should return a Promise
        expectToBePromise(getWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/words/{word_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.word_name).toEqual(wordName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const wordName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          wordName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.getWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getWordPromise = speechToTextService.getWord();
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
        const wordName = 'testString';
        const params = {
          customizationId: customizationId,
          wordName: wordName,
        };

        const deleteWordResult = speechToTextService.deleteWord(params);

        // all methods should return a Promise
        expectToBePromise(deleteWordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/words/{word_name}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.word_name).toEqual(wordName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const wordName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          wordName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteWord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.deleteWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteWordPromise = speechToTextService.deleteWord();
        expectToBePromise(deleteWordPromise);

        deleteWordPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGrammars', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listGrammars
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const listGrammarsResult = speechToTextService.listGrammars(params);

        // all methods should return a Promise
        expectToBePromise(listGrammarsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/grammars', 'GET');
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

        speechToTextService.listGrammars(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.listGrammars({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listGrammarsPromise = speechToTextService.listGrammars();
        expectToBePromise(listGrammarsPromise);

        listGrammarsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addGrammar', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addGrammar
        const customizationId = 'testString';
        const grammarName = 'testString';
        const grammarFile = 'testString';
        const contentType = 'application/srgs';
        const allowOverwrite = false;
        const params = {
          customizationId: customizationId,
          grammarName: grammarName,
          grammarFile: grammarFile,
          contentType: contentType,
          allowOverwrite: allowOverwrite,
        };

        const addGrammarResult = speechToTextService.addGrammar(params);

        // all methods should return a Promise
        expectToBePromise(addGrammarResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/grammars/{grammar_name}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(mockRequestOptions.body).toEqual(grammarFile);
        expect(mockRequestOptions.qs.allow_overwrite).toEqual(allowOverwrite);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.grammar_name).toEqual(grammarName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const grammarName = 'testString';
        const grammarFile = 'testString';
        const contentType = 'application/srgs';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
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

        speechToTextService.addGrammar(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.addGrammar({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const addGrammarPromise = speechToTextService.addGrammar();
        expectToBePromise(addGrammarPromise);

        addGrammarPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGrammar', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getGrammar
        const customizationId = 'testString';
        const grammarName = 'testString';
        const params = {
          customizationId: customizationId,
          grammarName: grammarName,
        };

        const getGrammarResult = speechToTextService.getGrammar(params);

        // all methods should return a Promise
        expectToBePromise(getGrammarResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/grammars/{grammar_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.grammar_name).toEqual(grammarName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const grammarName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          grammarName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getGrammar(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.getGrammar({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getGrammarPromise = speechToTextService.getGrammar();
        expectToBePromise(getGrammarPromise);

        getGrammarPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteGrammar', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteGrammar
        const customizationId = 'testString';
        const grammarName = 'testString';
        const params = {
          customizationId: customizationId,
          grammarName: grammarName,
        };

        const deleteGrammarResult = speechToTextService.deleteGrammar(params);

        // all methods should return a Promise
        expectToBePromise(deleteGrammarResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/customizations/{customization_id}/grammars/{grammar_name}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.grammar_name).toEqual(grammarName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const grammarName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          grammarName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteGrammar(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.deleteGrammar({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteGrammarPromise = speechToTextService.deleteGrammar();
        expectToBePromise(deleteGrammarPromise);

        deleteGrammarPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createAcousticModel
        const name = 'testString';
        const baseModelName = 'ar-AR_BroadbandModel';
        const description = 'testString';
        const params = {
          name: name,
          baseModelName: baseModelName,
          description: description,
        };

        const createAcousticModelResult = speechToTextService.createAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(createAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.base_model_name).toEqual(baseModelName);
        expect(mockRequestOptions.body.description).toEqual(description);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const baseModelName = 'ar-AR_BroadbandModel';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          baseModelName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.createAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.createAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createAcousticModelPromise = speechToTextService.createAcousticModel();
        expectToBePromise(createAcousticModelPromise);

        createAcousticModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listAcousticModels', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAcousticModels
        const language = 'ar-AR';
        const params = {
          language: language,
        };

        const listAcousticModelsResult = speechToTextService.listAcousticModels(params);

        // all methods should return a Promise
        expectToBePromise(listAcousticModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations', 'GET');
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

        speechToTextService.listAcousticModels(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        speechToTextService.listAcousticModels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAcousticModel
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const getAcousticModelResult = speechToTextService.getAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(getAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations/{customization_id}', 'GET');
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

        speechToTextService.getAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.getAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getAcousticModelPromise = speechToTextService.getAcousticModel();
        expectToBePromise(getAcousticModelPromise);

        getAcousticModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteAcousticModel
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const deleteAcousticModelResult = speechToTextService.deleteAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(deleteAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations/{customization_id}', 'DELETE');
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

        speechToTextService.deleteAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.deleteAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteAcousticModelPromise = speechToTextService.deleteAcousticModel();
        expectToBePromise(deleteAcousticModelPromise);

        deleteAcousticModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('trainAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation trainAcousticModel
        const customizationId = 'testString';
        const customLanguageModelId = 'testString';
        const params = {
          customizationId: customizationId,
          customLanguageModelId: customLanguageModelId,
        };

        const trainAcousticModelResult = speechToTextService.trainAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(trainAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations/{customization_id}/train', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.custom_language_model_id).toEqual(customLanguageModelId);
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

        speechToTextService.trainAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.trainAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const trainAcousticModelPromise = speechToTextService.trainAcousticModel();
        expectToBePromise(trainAcousticModelPromise);

        trainAcousticModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('resetAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation resetAcousticModel
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const resetAcousticModelResult = speechToTextService.resetAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(resetAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations/{customization_id}/reset', 'POST');
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

        speechToTextService.resetAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.resetAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const resetAcousticModelPromise = speechToTextService.resetAcousticModel();
        expectToBePromise(resetAcousticModelPromise);

        resetAcousticModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('upgradeAcousticModel', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation upgradeAcousticModel
        const customizationId = 'testString';
        const customLanguageModelId = 'testString';
        const force = false;
        const params = {
          customizationId: customizationId,
          customLanguageModelId: customLanguageModelId,
          force: force,
        };

        const upgradeAcousticModelResult = speechToTextService.upgradeAcousticModel(params);

        // all methods should return a Promise
        expectToBePromise(upgradeAcousticModelResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations/{customization_id}/upgrade_model', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.custom_language_model_id).toEqual(customLanguageModelId);
        expect(mockRequestOptions.qs.force).toEqual(force);
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

        speechToTextService.upgradeAcousticModel(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.upgradeAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const upgradeAcousticModelPromise = speechToTextService.upgradeAcousticModel();
        expectToBePromise(upgradeAcousticModelPromise);

        upgradeAcousticModelPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listAudio', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAudio
        const customizationId = 'testString';
        const params = {
          customizationId: customizationId,
        };

        const listAudioResult = speechToTextService.listAudio(params);

        // all methods should return a Promise
        expectToBePromise(listAudioResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations/{customization_id}/audio', 'GET');
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

        speechToTextService.listAudio(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.listAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listAudioPromise = speechToTextService.listAudio();
        expectToBePromise(listAudioPromise);

        listAudioPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addAudio', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addAudio
        const customizationId = 'testString';
        const audioName = 'testString';
        const audioResource = Buffer.from('This is a mock file.');
        const contentType = 'application/zip';
        const containedContentType = 'audio/alaw';
        const allowOverwrite = false;
        const params = {
          customizationId: customizationId,
          audioName: audioName,
          audioResource: audioResource,
          contentType: contentType,
          containedContentType: containedContentType,
          allowOverwrite: allowOverwrite,
        };

        const addAudioResult = speechToTextService.addAudio(params);

        // all methods should return a Promise
        expectToBePromise(addAudioResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'Contained-Content-Type', containedContentType);
        expect(mockRequestOptions.body).toEqual(audioResource);
        expect(mockRequestOptions.qs.allow_overwrite).toEqual(allowOverwrite);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.audio_name).toEqual(audioName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const audioName = 'testString';
        const audioResource = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          audioName,
          audioResource,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.addAudio(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.addAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const addAudioPromise = speechToTextService.addAudio();
        expectToBePromise(addAudioPromise);

        addAudioPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getAudio', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAudio
        const customizationId = 'testString';
        const audioName = 'testString';
        const params = {
          customizationId: customizationId,
          audioName: audioName,
        };

        const getAudioResult = speechToTextService.getAudio(params);

        // all methods should return a Promise
        expectToBePromise(getAudioResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.audio_name).toEqual(audioName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const audioName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          audioName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getAudio(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.getAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getAudioPromise = speechToTextService.getAudio();
        expectToBePromise(getAudioPromise);

        getAudioPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteAudio', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteAudio
        const customizationId = 'testString';
        const audioName = 'testString';
        const params = {
          customizationId: customizationId,
          audioName: audioName,
        };

        const deleteAudioResult = speechToTextService.deleteAudio(params);

        // all methods should return a Promise
        expectToBePromise(deleteAudioResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
        expect(mockRequestOptions.path.audio_name).toEqual(audioName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const audioName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customizationId,
          audioName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteAudio(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.deleteAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteAudioPromise = speechToTextService.deleteAudio();
        expectToBePromise(deleteAudioPromise);

        deleteAudioPromise.catch((err) => {
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

        const deleteUserDataResult = speechToTextService.deleteUserData(params);

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

        speechToTextService.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await speechToTextService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteUserDataPromise = speechToTextService.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
