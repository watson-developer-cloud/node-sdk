/**
 * (C) Copyright IBM Corp. 2018, 2022.
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

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(speechToTextService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('SpeechToTextV1', () => {

  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

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
      function __listModelsTest() {
        // Construct the params object for operation listModels
        const listModelsParams = {};

        const listModelsResult = speechToTextService.listModels(listModelsParams);

        // all methods should return a Promise
        expectToBePromise(listModelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/models', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __listModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __listModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listModelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.listModels(listModelsParams);
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
      function __getModelTest() {
        // Construct the params object for operation getModel
        const modelId = 'ar-AR_BroadbandModel';
        const getModelParams = {
          modelId: modelId,
        };

        const getModelResult = speechToTextService.getModel(getModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __getModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __getModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const modelId = 'ar-AR_BroadbandModel';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getModelParams = {
          modelId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getModel(getModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.getModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.getModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('recognize', () => {
    describe('positive tests', () => {
      function __recognizeTest() {
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
        const grammarName = 'testString';
        const redaction = false;
        const audioMetrics = false;
        const endOfPhraseSilenceTime = 72.5;
        const splitTranscriptAtPhraseEnd = false;
        const speechDetectorSensitivity = 36.0;
        const backgroundAudioSuppression = 36.0;
        const lowLatency = false;
        const characterInsertionBias = 36.0;
        const recognizeParams = {
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
          grammarName: grammarName,
          redaction: redaction,
          audioMetrics: audioMetrics,
          endOfPhraseSilenceTime: endOfPhraseSilenceTime,
          splitTranscriptAtPhraseEnd: splitTranscriptAtPhraseEnd,
          speechDetectorSensitivity: speechDetectorSensitivity,
          backgroundAudioSuppression: backgroundAudioSuppression,
          lowLatency: lowLatency,
          characterInsertionBias: characterInsertionBias,
        };

        const recognizeResult = speechToTextService.recognize(recognizeParams);

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
        expect(mockRequestOptions.qs.grammar_name).toEqual(grammarName);
        expect(mockRequestOptions.qs.redaction).toEqual(redaction);
        expect(mockRequestOptions.qs.audio_metrics).toEqual(audioMetrics);
        expect(mockRequestOptions.qs.end_of_phrase_silence_time).toEqual(endOfPhraseSilenceTime);
        expect(mockRequestOptions.qs.split_transcript_at_phrase_end).toEqual(splitTranscriptAtPhraseEnd);
        expect(mockRequestOptions.qs.speech_detector_sensitivity).toEqual(speechDetectorSensitivity);
        expect(mockRequestOptions.qs.background_audio_suppression).toEqual(backgroundAudioSuppression);
        expect(mockRequestOptions.qs.low_latency).toEqual(lowLatency);
        expect(mockRequestOptions.qs.character_insertion_bias).toEqual(characterInsertionBias);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __recognizeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __recognizeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __recognizeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const audio = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const recognizeParams = {
          audio,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.recognize(recognizeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.recognize({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.recognize();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('registerCallback', () => {
    describe('positive tests', () => {
      function __registerCallbackTest() {
        // Construct the params object for operation registerCallback
        const callbackUrl = 'testString';
        const userSecret = 'testString';
        const registerCallbackParams = {
          callbackUrl: callbackUrl,
          userSecret: userSecret,
        };

        const registerCallbackResult = speechToTextService.registerCallback(registerCallbackParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __registerCallbackTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __registerCallbackTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __registerCallbackTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const callbackUrl = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const registerCallbackParams = {
          callbackUrl,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.registerCallback(registerCallbackParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.registerCallback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.registerCallback();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('unregisterCallback', () => {
    describe('positive tests', () => {
      function __unregisterCallbackTest() {
        // Construct the params object for operation unregisterCallback
        const callbackUrl = 'testString';
        const unregisterCallbackParams = {
          callbackUrl: callbackUrl,
        };

        const unregisterCallbackResult = speechToTextService.unregisterCallback(unregisterCallbackParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __unregisterCallbackTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __unregisterCallbackTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __unregisterCallbackTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const callbackUrl = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const unregisterCallbackParams = {
          callbackUrl,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.unregisterCallback(unregisterCallbackParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.unregisterCallback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.unregisterCallback();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createJob', () => {
    describe('positive tests', () => {
      function __createJobTest() {
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
        const characterInsertionBias = 36.0;
        const createJobParams = {
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
          characterInsertionBias: characterInsertionBias,
        };

        const createJobResult = speechToTextService.createJob(createJobParams);

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
        expect(mockRequestOptions.qs.character_insertion_bias).toEqual(characterInsertionBias);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __createJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __createJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const audio = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createJobParams = {
          audio,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.createJob(createJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.createJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.createJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('checkJobs', () => {
    describe('positive tests', () => {
      function __checkJobsTest() {
        // Construct the params object for operation checkJobs
        const checkJobsParams = {};

        const checkJobsResult = speechToTextService.checkJobs(checkJobsParams);

        // all methods should return a Promise
        expectToBePromise(checkJobsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/recognitions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __checkJobsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __checkJobsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __checkJobsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const checkJobsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.checkJobs(checkJobsParams);
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
      function __checkJobTest() {
        // Construct the params object for operation checkJob
        const id = 'testString';
        const checkJobParams = {
          id: id,
        };

        const checkJobResult = speechToTextService.checkJob(checkJobParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __checkJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __checkJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __checkJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const checkJobParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.checkJob(checkJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.checkJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.checkJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteJob', () => {
    describe('positive tests', () => {
      function __deleteJobTest() {
        // Construct the params object for operation deleteJob
        const id = 'testString';
        const deleteJobParams = {
          id: id,
        };

        const deleteJobResult = speechToTextService.deleteJob(deleteJobParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __deleteJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __deleteJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteJobParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteJob(deleteJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.deleteJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.deleteJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createLanguageModel', () => {
    describe('positive tests', () => {
      function __createLanguageModelTest() {
        // Construct the params object for operation createLanguageModel
        const name = 'testString';
        const baseModelName = 'ar-MS_Telephony';
        const dialect = 'testString';
        const description = 'testString';
        const createLanguageModelParams = {
          name: name,
          baseModelName: baseModelName,
          dialect: dialect,
          description: description,
        };

        const createLanguageModelResult = speechToTextService.createLanguageModel(createLanguageModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLanguageModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __createLanguageModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __createLanguageModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const baseModelName = 'ar-MS_Telephony';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLanguageModelParams = {
          name,
          baseModelName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.createLanguageModel(createLanguageModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.createLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.createLanguageModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listLanguageModels', () => {
    describe('positive tests', () => {
      function __listLanguageModelsTest() {
        // Construct the params object for operation listLanguageModels
        const language = 'ar-AR';
        const listLanguageModelsParams = {
          language: language,
        };

        const listLanguageModelsResult = speechToTextService.listLanguageModels(listLanguageModelsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLanguageModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __listLanguageModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __listLanguageModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLanguageModelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.listLanguageModels(listLanguageModelsParams);
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
      function __getLanguageModelTest() {
        // Construct the params object for operation getLanguageModel
        const customizationId = 'testString';
        const getLanguageModelParams = {
          customizationId: customizationId,
        };

        const getLanguageModelResult = speechToTextService.getLanguageModel(getLanguageModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLanguageModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __getLanguageModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __getLanguageModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLanguageModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getLanguageModel(getLanguageModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.getLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.getLanguageModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteLanguageModel', () => {
    describe('positive tests', () => {
      function __deleteLanguageModelTest() {
        // Construct the params object for operation deleteLanguageModel
        const customizationId = 'testString';
        const deleteLanguageModelParams = {
          customizationId: customizationId,
        };

        const deleteLanguageModelResult = speechToTextService.deleteLanguageModel(deleteLanguageModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLanguageModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __deleteLanguageModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __deleteLanguageModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLanguageModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteLanguageModel(deleteLanguageModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.deleteLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.deleteLanguageModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('trainLanguageModel', () => {
    describe('positive tests', () => {
      function __trainLanguageModelTest() {
        // Construct the params object for operation trainLanguageModel
        const customizationId = 'testString';
        const wordTypeToAdd = 'all';
        const customizationWeight = 72.5;
        const strict = true;
        const trainLanguageModelParams = {
          customizationId: customizationId,
          wordTypeToAdd: wordTypeToAdd,
          customizationWeight: customizationWeight,
          strict: strict,
        };

        const trainLanguageModelResult = speechToTextService.trainLanguageModel(trainLanguageModelParams);

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
        expect(mockRequestOptions.qs.strict).toEqual(strict);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __trainLanguageModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __trainLanguageModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __trainLanguageModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const trainLanguageModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.trainLanguageModel(trainLanguageModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.trainLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.trainLanguageModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('resetLanguageModel', () => {
    describe('positive tests', () => {
      function __resetLanguageModelTest() {
        // Construct the params object for operation resetLanguageModel
        const customizationId = 'testString';
        const resetLanguageModelParams = {
          customizationId: customizationId,
        };

        const resetLanguageModelResult = speechToTextService.resetLanguageModel(resetLanguageModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __resetLanguageModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __resetLanguageModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __resetLanguageModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const resetLanguageModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.resetLanguageModel(resetLanguageModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.resetLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.resetLanguageModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('upgradeLanguageModel', () => {
    describe('positive tests', () => {
      function __upgradeLanguageModelTest() {
        // Construct the params object for operation upgradeLanguageModel
        const customizationId = 'testString';
        const upgradeLanguageModelParams = {
          customizationId: customizationId,
        };

        const upgradeLanguageModelResult = speechToTextService.upgradeLanguageModel(upgradeLanguageModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __upgradeLanguageModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __upgradeLanguageModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __upgradeLanguageModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const upgradeLanguageModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.upgradeLanguageModel(upgradeLanguageModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.upgradeLanguageModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.upgradeLanguageModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listCorpora', () => {
    describe('positive tests', () => {
      function __listCorporaTest() {
        // Construct the params object for operation listCorpora
        const customizationId = 'testString';
        const listCorporaParams = {
          customizationId: customizationId,
        };

        const listCorporaResult = speechToTextService.listCorpora(listCorporaParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCorporaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __listCorporaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __listCorporaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCorporaParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.listCorpora(listCorporaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.listCorpora({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.listCorpora();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addCorpus', () => {
    describe('positive tests', () => {
      function __addCorpusTest() {
        // Construct the params object for operation addCorpus
        const customizationId = 'testString';
        const corpusName = 'testString';
        const corpusFile = Buffer.from('This is a mock file.');
        const allowOverwrite = false;
        const addCorpusParams = {
          customizationId: customizationId,
          corpusName: corpusName,
          corpusFile: corpusFile,
          allowOverwrite: allowOverwrite,
        };

        const addCorpusResult = speechToTextService.addCorpus(addCorpusParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addCorpusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __addCorpusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __addCorpusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const corpusName = 'testString';
        const corpusFile = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addCorpusParams = {
          customizationId,
          corpusName,
          corpusFile,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.addCorpus(addCorpusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.addCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.addCorpus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCorpus', () => {
    describe('positive tests', () => {
      function __getCorpusTest() {
        // Construct the params object for operation getCorpus
        const customizationId = 'testString';
        const corpusName = 'testString';
        const getCorpusParams = {
          customizationId: customizationId,
          corpusName: corpusName,
        };

        const getCorpusResult = speechToTextService.getCorpus(getCorpusParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCorpusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __getCorpusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __getCorpusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const corpusName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCorpusParams = {
          customizationId,
          corpusName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getCorpus(getCorpusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.getCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.getCorpus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCorpus', () => {
    describe('positive tests', () => {
      function __deleteCorpusTest() {
        // Construct the params object for operation deleteCorpus
        const customizationId = 'testString';
        const corpusName = 'testString';
        const deleteCorpusParams = {
          customizationId: customizationId,
          corpusName: corpusName,
        };

        const deleteCorpusResult = speechToTextService.deleteCorpus(deleteCorpusParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCorpusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __deleteCorpusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __deleteCorpusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const corpusName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCorpusParams = {
          customizationId,
          corpusName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteCorpus(deleteCorpusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.deleteCorpus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.deleteCorpus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listWords', () => {
    describe('positive tests', () => {
      function __listWordsTest() {
        // Construct the params object for operation listWords
        const customizationId = 'testString';
        const wordType = 'all';
        const sort = 'alphabetical';
        const listWordsParams = {
          customizationId: customizationId,
          wordType: wordType,
          sort: sort,
        };

        const listWordsResult = speechToTextService.listWords(listWordsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listWordsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __listWordsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __listWordsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listWordsParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.listWords(listWordsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.listWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.listWords();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __addWordsTest() {
        // Construct the params object for operation addWords
        const customizationId = 'testString';
        const words = [customWordModel];
        const addWordsParams = {
          customizationId: customizationId,
          words: words,
        };

        const addWordsResult = speechToTextService.addWords(addWordsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addWordsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __addWordsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __addWordsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const words = [customWordModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addWordsParams = {
          customizationId,
          words,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.addWords(addWordsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.addWords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.addWords();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addWord', () => {
    describe('positive tests', () => {
      function __addWordTest() {
        // Construct the params object for operation addWord
        const customizationId = 'testString';
        const wordName = 'testString';
        const word = 'testString';
        const soundsLike = ['testString'];
        const displayAs = 'testString';
        const addWordParams = {
          customizationId: customizationId,
          wordName: wordName,
          word: word,
          soundsLike: soundsLike,
          displayAs: displayAs,
        };

        const addWordResult = speechToTextService.addWord(addWordParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addWordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __addWordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __addWordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const wordName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addWordParams = {
          customizationId,
          wordName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.addWord(addWordParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.addWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.addWord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getWord', () => {
    describe('positive tests', () => {
      function __getWordTest() {
        // Construct the params object for operation getWord
        const customizationId = 'testString';
        const wordName = 'testString';
        const getWordParams = {
          customizationId: customizationId,
          wordName: wordName,
        };

        const getWordResult = speechToTextService.getWord(getWordParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getWordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __getWordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __getWordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const wordName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getWordParams = {
          customizationId,
          wordName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getWord(getWordParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.getWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.getWord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteWord', () => {
    describe('positive tests', () => {
      function __deleteWordTest() {
        // Construct the params object for operation deleteWord
        const customizationId = 'testString';
        const wordName = 'testString';
        const deleteWordParams = {
          customizationId: customizationId,
          wordName: wordName,
        };

        const deleteWordResult = speechToTextService.deleteWord(deleteWordParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteWordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __deleteWordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __deleteWordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const wordName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteWordParams = {
          customizationId,
          wordName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteWord(deleteWordParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.deleteWord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.deleteWord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listGrammars', () => {
    describe('positive tests', () => {
      function __listGrammarsTest() {
        // Construct the params object for operation listGrammars
        const customizationId = 'testString';
        const listGrammarsParams = {
          customizationId: customizationId,
        };

        const listGrammarsResult = speechToTextService.listGrammars(listGrammarsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGrammarsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __listGrammarsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __listGrammarsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listGrammarsParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.listGrammars(listGrammarsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.listGrammars({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.listGrammars();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addGrammar', () => {
    describe('positive tests', () => {
      function __addGrammarTest() {
        // Construct the params object for operation addGrammar
        const customizationId = 'testString';
        const grammarName = 'testString';
        const grammarFile = Buffer.from('This is a mock file.');
        const contentType = 'application/srgs';
        const allowOverwrite = false;
        const addGrammarParams = {
          customizationId: customizationId,
          grammarName: grammarName,
          grammarFile: grammarFile,
          contentType: contentType,
          allowOverwrite: allowOverwrite,
        };

        const addGrammarResult = speechToTextService.addGrammar(addGrammarParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addGrammarTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __addGrammarTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __addGrammarTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const grammarName = 'testString';
        const grammarFile = Buffer.from('This is a mock file.');
        const contentType = 'application/srgs';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addGrammarParams = {
          customizationId,
          grammarName,
          grammarFile,
          contentType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.addGrammar(addGrammarParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.addGrammar({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.addGrammar();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getGrammar', () => {
    describe('positive tests', () => {
      function __getGrammarTest() {
        // Construct the params object for operation getGrammar
        const customizationId = 'testString';
        const grammarName = 'testString';
        const getGrammarParams = {
          customizationId: customizationId,
          grammarName: grammarName,
        };

        const getGrammarResult = speechToTextService.getGrammar(getGrammarParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGrammarTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __getGrammarTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __getGrammarTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const grammarName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGrammarParams = {
          customizationId,
          grammarName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getGrammar(getGrammarParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.getGrammar({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.getGrammar();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteGrammar', () => {
    describe('positive tests', () => {
      function __deleteGrammarTest() {
        // Construct the params object for operation deleteGrammar
        const customizationId = 'testString';
        const grammarName = 'testString';
        const deleteGrammarParams = {
          customizationId: customizationId,
          grammarName: grammarName,
        };

        const deleteGrammarResult = speechToTextService.deleteGrammar(deleteGrammarParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteGrammarTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __deleteGrammarTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __deleteGrammarTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const grammarName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteGrammarParams = {
          customizationId,
          grammarName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteGrammar(deleteGrammarParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.deleteGrammar({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.deleteGrammar();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createAcousticModel', () => {
    describe('positive tests', () => {
      function __createAcousticModelTest() {
        // Construct the params object for operation createAcousticModel
        const name = 'testString';
        const baseModelName = 'ar-AR_BroadbandModel';
        const description = 'testString';
        const createAcousticModelParams = {
          name: name,
          baseModelName: baseModelName,
          description: description,
        };

        const createAcousticModelResult = speechToTextService.createAcousticModel(createAcousticModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAcousticModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __createAcousticModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __createAcousticModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const baseModelName = 'ar-AR_BroadbandModel';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAcousticModelParams = {
          name,
          baseModelName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.createAcousticModel(createAcousticModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.createAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.createAcousticModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAcousticModels', () => {
    describe('positive tests', () => {
      function __listAcousticModelsTest() {
        // Construct the params object for operation listAcousticModels
        const language = 'ar-AR';
        const listAcousticModelsParams = {
          language: language,
        };

        const listAcousticModelsResult = speechToTextService.listAcousticModels(listAcousticModelsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAcousticModelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __listAcousticModelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __listAcousticModelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAcousticModelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.listAcousticModels(listAcousticModelsParams);
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
      function __getAcousticModelTest() {
        // Construct the params object for operation getAcousticModel
        const customizationId = 'testString';
        const getAcousticModelParams = {
          customizationId: customizationId,
        };

        const getAcousticModelResult = speechToTextService.getAcousticModel(getAcousticModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAcousticModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __getAcousticModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __getAcousticModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAcousticModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getAcousticModel(getAcousticModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.getAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.getAcousticModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAcousticModel', () => {
    describe('positive tests', () => {
      function __deleteAcousticModelTest() {
        // Construct the params object for operation deleteAcousticModel
        const customizationId = 'testString';
        const deleteAcousticModelParams = {
          customizationId: customizationId,
        };

        const deleteAcousticModelResult = speechToTextService.deleteAcousticModel(deleteAcousticModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAcousticModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __deleteAcousticModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __deleteAcousticModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAcousticModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteAcousticModel(deleteAcousticModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.deleteAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.deleteAcousticModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('trainAcousticModel', () => {
    describe('positive tests', () => {
      function __trainAcousticModelTest() {
        // Construct the params object for operation trainAcousticModel
        const customizationId = 'testString';
        const customLanguageModelId = 'testString';
        const strict = true;
        const trainAcousticModelParams = {
          customizationId: customizationId,
          customLanguageModelId: customLanguageModelId,
          strict: strict,
        };

        const trainAcousticModelResult = speechToTextService.trainAcousticModel(trainAcousticModelParams);

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
        expect(mockRequestOptions.qs.strict).toEqual(strict);
        expect(mockRequestOptions.path.customization_id).toEqual(customizationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __trainAcousticModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __trainAcousticModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __trainAcousticModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const trainAcousticModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.trainAcousticModel(trainAcousticModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.trainAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.trainAcousticModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('resetAcousticModel', () => {
    describe('positive tests', () => {
      function __resetAcousticModelTest() {
        // Construct the params object for operation resetAcousticModel
        const customizationId = 'testString';
        const resetAcousticModelParams = {
          customizationId: customizationId,
        };

        const resetAcousticModelResult = speechToTextService.resetAcousticModel(resetAcousticModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __resetAcousticModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __resetAcousticModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __resetAcousticModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const resetAcousticModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.resetAcousticModel(resetAcousticModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.resetAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.resetAcousticModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('upgradeAcousticModel', () => {
    describe('positive tests', () => {
      function __upgradeAcousticModelTest() {
        // Construct the params object for operation upgradeAcousticModel
        const customizationId = 'testString';
        const customLanguageModelId = 'testString';
        const force = false;
        const upgradeAcousticModelParams = {
          customizationId: customizationId,
          customLanguageModelId: customLanguageModelId,
          force: force,
        };

        const upgradeAcousticModelResult = speechToTextService.upgradeAcousticModel(upgradeAcousticModelParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __upgradeAcousticModelTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __upgradeAcousticModelTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __upgradeAcousticModelTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const upgradeAcousticModelParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.upgradeAcousticModel(upgradeAcousticModelParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.upgradeAcousticModel({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.upgradeAcousticModel();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAudio', () => {
    describe('positive tests', () => {
      function __listAudioTest() {
        // Construct the params object for operation listAudio
        const customizationId = 'testString';
        const listAudioParams = {
          customizationId: customizationId,
        };

        const listAudioResult = speechToTextService.listAudio(listAudioParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAudioTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __listAudioTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __listAudioTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAudioParams = {
          customizationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.listAudio(listAudioParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.listAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.listAudio();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addAudio', () => {
    describe('positive tests', () => {
      function __addAudioTest() {
        // Construct the params object for operation addAudio
        const customizationId = 'testString';
        const audioName = 'testString';
        const audioResource = Buffer.from('This is a mock file.');
        const contentType = 'application/zip';
        const containedContentType = 'audio/alaw';
        const allowOverwrite = false;
        const addAudioParams = {
          customizationId: customizationId,
          audioName: audioName,
          audioResource: audioResource,
          contentType: contentType,
          containedContentType: containedContentType,
          allowOverwrite: allowOverwrite,
        };

        const addAudioResult = speechToTextService.addAudio(addAudioParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addAudioTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __addAudioTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __addAudioTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const audioName = 'testString';
        const audioResource = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addAudioParams = {
          customizationId,
          audioName,
          audioResource,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.addAudio(addAudioParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.addAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.addAudio();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAudio', () => {
    describe('positive tests', () => {
      function __getAudioTest() {
        // Construct the params object for operation getAudio
        const customizationId = 'testString';
        const audioName = 'testString';
        const getAudioParams = {
          customizationId: customizationId,
          audioName: audioName,
        };

        const getAudioResult = speechToTextService.getAudio(getAudioParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAudioTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __getAudioTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __getAudioTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const audioName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAudioParams = {
          customizationId,
          audioName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.getAudio(getAudioParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.getAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.getAudio();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAudio', () => {
    describe('positive tests', () => {
      function __deleteAudioTest() {
        // Construct the params object for operation deleteAudio
        const customizationId = 'testString';
        const audioName = 'testString';
        const deleteAudioParams = {
          customizationId: customizationId,
          audioName: audioName,
        };

        const deleteAudioResult = speechToTextService.deleteAudio(deleteAudioParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAudioTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __deleteAudioTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __deleteAudioTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customizationId = 'testString';
        const audioName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAudioParams = {
          customizationId,
          audioName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteAudio(deleteAudioParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.deleteAudio({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.deleteAudio();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteUserData', () => {
    describe('positive tests', () => {
      function __deleteUserDataTest() {
        // Construct the params object for operation deleteUserData
        const customerId = 'testString';
        const deleteUserDataParams = {
          customerId: customerId,
        };

        const deleteUserDataResult = speechToTextService.deleteUserData(deleteUserDataParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteUserDataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        speechToTextService.enableRetries();
        __deleteUserDataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        speechToTextService.disableRetries();
        __deleteUserDataTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteUserDataParams = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        speechToTextService.deleteUserData(deleteUserDataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await speechToTextService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await speechToTextService.deleteUserData();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
