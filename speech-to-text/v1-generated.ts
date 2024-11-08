/**
 * (C) Copyright IBM Corp. 2024.
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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.96.1-5136e54a-20241108-203028
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM Watson&trade; Speech to Text service provides APIs that use IBM's speech-recognition capabilities to produce
 * transcripts of spoken audio. The service can transcribe speech from various languages and audio formats. In addition
 * to basic transcription, the service can produce detailed information about many different aspects of the audio. It
 * returns all JSON response content in the UTF-8 character set.
 *
 * The service supports two types of models: previous-generation models that include the terms `Broadband` and
 * `Narrowband` in their names, and next-generation models that include the terms `Multimedia` and `Telephony` in their
 * names. Broadband and multimedia models have minimum sampling rates of 16 kHz. Narrowband and telephony models have
 * minimum sampling rates of 8 kHz. The next-generation models offer high throughput and greater transcription accuracy.
 *
 *
 * Effective **31 July 2023**, all previous-generation models will be removed from the service and the documentation.
 * Most previous-generation models were deprecated on 15 March 2022. You must migrate to the equivalent large speech
 * model or next-generation model by 31 July 2023. For more information, see [Migrating to large speech
 * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-migrate).{: deprecated}
 *
 * For speech recognition, the service supports synchronous and asynchronous HTTP Representational State Transfer (REST)
 * interfaces. It also supports a WebSocket interface that provides a full-duplex, low-latency communication channel:
 * Clients send requests and audio to the service and receive results over a single connection asynchronously.
 *
 * The service also offers two customization interfaces. Use language model customization to expand the vocabulary of a
 * base model with domain-specific terminology. Use acoustic model customization to adapt a base model for the acoustic
 * characteristics of your audio. For language model customization, the service also supports grammars. A grammar is a
 * formal language specification that lets you restrict the phrases that the service can recognize.
 *
 * Language model customization and grammars are available for most previous- and next-generation models. Acoustic model
 * customization is available for all previous-generation models.
 *
 * API Version: 1.0.0
 * See: https://cloud.ibm.com/docs/speech-to-text
 */

class SpeechToTextV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.speech-to-text.watson.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'speech_to_text';

  /**
   * Construct a SpeechToTextV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {SpeechToTextV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = SpeechToTextV1.DEFAULT_SERVICE_NAME;
    }
    // If the caller didn't supply an authenticator, construct one from external configuration.
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    super(options);
    this.configureService(options.serviceName);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    }
  }

  /*************************
   * models
   ************************/

  /**
   * List models.
   *
   * Lists all language models that are available for use with the service. The information includes the name of the
   * model and its minimum sampling rate in Hertz, among other things. The ordering of the list of models can change
   * from call to call; do not rely on an alphabetized or static list of models.
   *
   * **See also:** [Listing all
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-list#models-list-all).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.SpeechModels>>}
   */
  public listModels(
    params?: SpeechToTextV1.ListModelsParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.SpeechModels>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'listModels');

    const parameters = {
      options: {
        url: '/v1/models',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a model.
   *
   * Gets information for a single specified language model that is available for use with the service. The information
   * includes the name of the model and its minimum sampling rate in Hertz, among other things.
   *
   * **See also:** [Listing a specific
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-list#models-list-specific).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.modelId - The identifier of the model in the form of its name from the output of the [List
   * models](#listmodels) method.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.SpeechModel>>}
   */
  public getModel(
    params: SpeechToTextV1.GetModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.SpeechModel>> {
    const _params = { ...params };
    const _requiredParams = ['modelId'];
    const _validParams = ['modelId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'model_id': _params.modelId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'getModel');

    const parameters = {
      options: {
        url: '/v1/models/{model_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * synchronous
   ************************/

  /**
   * Recognize audio.
   *
   * Sends audio and returns transcription results for a recognition request. You can pass a maximum of 100 MB and a
   * minimum of 100 bytes of audio with a request. The service automatically detects the endianness of the incoming
   * audio and, for audio that includes multiple channels, downmixes the audio to one-channel mono during transcoding.
   * The method returns only final results; to enable interim results, use the WebSocket API. (With the `curl` command,
   * use the `--data-binary` option to upload the file for the request.)
   *
   * **See also:** [Making a basic HTTP
   * request](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-http#HTTP-basic).
   *
   * ### Streaming mode
   *
   *  For requests to transcribe live audio as it becomes available, you must set the `Transfer-Encoding` header to
   * `chunked` to use streaming mode. In streaming mode, the service closes the connection (status code 408) if it does
   * not receive at least 15 seconds of audio (including silence) in any 30-second period. The service also closes the
   * connection (status code 400) if it detects no speech for `inactivity_timeout` seconds of streaming audio; use the
   * `inactivity_timeout` parameter to change the default of 30 seconds.
   *
   * **See also:**
   * * [Audio transmission](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-input#transmission)
   * * [Timeouts](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-input#timeouts)
   *
   * ### Audio formats (content types)
   *
   *  The service accepts audio in the following formats (MIME types).
   * * For formats that are labeled **Required**, you must use the `Content-Type` header with the request to specify the
   * format of the audio.
   * * For all other formats, you can omit the `Content-Type` header or specify `application/octet-stream` with the
   * header to have the service automatically detect the format of the audio. (With the `curl` command, you can specify
   * either `"Content-Type:"` or `"Content-Type: application/octet-stream"`.)
   *
   * Where indicated, the format that you specify must include the sampling rate and can optionally include the number
   * of channels and the endianness of the audio.
   * * `audio/alaw` (**Required.** Specify the sampling rate (`rate`) of the audio.)
   * * `audio/basic` (**Required.** Use only with narrowband models.)
   * * `audio/flac`
   * * `audio/g729` (Use only with narrowband models.)
   * * `audio/l16` (**Required.** Specify the sampling rate (`rate`) and optionally the number of channels (`channels`)
   * and endianness (`endianness`) of the audio.)
   * * `audio/mp3`
   * * `audio/mpeg`
   * * `audio/mulaw` (**Required.** Specify the sampling rate (`rate`) of the audio.)
   * * `audio/ogg` (The service automatically detects the codec of the input audio.)
   * * `audio/ogg;codecs=opus`
   * * `audio/ogg;codecs=vorbis`
   * * `audio/wav` (Provide audio with a maximum of nine channels.)
   * * `audio/webm` (The service automatically detects the codec of the input audio.)
   * * `audio/webm;codecs=opus`
   * * `audio/webm;codecs=vorbis`
   *
   * The sampling rate of the audio must match the sampling rate of the model for the recognition request: for broadband
   * models, at least 16 kHz; for narrowband models, at least 8 kHz. If the sampling rate of the audio is higher than
   * the minimum required rate, the service down-samples the audio to the appropriate rate. If the sampling rate of the
   * audio is lower than the minimum required rate, the request fails.
   *
   *  **See also:** [Supported audio
   * formats](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-audio-formats).
   *
   * ### Large speech models and Next-generation models
   *
   *  The service supports large speech models and next-generation `Multimedia` (16 kHz) and `Telephony` (8 kHz) models
   * for many languages. Large speech models and next-generation models have higher throughput than the service's
   * previous generation of `Broadband` and `Narrowband` models. When you use large speech models and next-generation
   * models, the service can return transcriptions more quickly and also provide noticeably better transcription
   * accuracy.
   *
   * You specify a large speech model or next-generation model by using the `model` query parameter, as you do a
   * previous-generation model. Only the next-generation models support the `low_latency` parameter, and all large
   * speech models and next-generation models support the `character_insertion_bias` parameter. These parameters are not
   * available with previous-generation models.
   *
   * Large speech models and next-generation models do not support all of the speech recognition parameters that are
   * available for use with previous-generation models. Next-generation models do not support the following parameters:
   * * `acoustic_customization_id`
   * * `keywords` and `keywords_threshold`
   * * `processing_metrics` and `processing_metrics_interval`
   * * `word_alternatives_threshold`
   *
   * **Important:** Effective **31 July 2023**, all previous-generation models will be removed from the service and the
   * documentation. Most previous-generation models were deprecated on 15 March 2022. You must migrate to the equivalent
   * large speech model or next-generation model by 31 July 2023. For more information, see [Migrating to large speech
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-migrate).
   *
   * **See also:**
   * * [Large speech languages and
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-large-speech-languages)
   * * [Supported features for large speech
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-large-speech-languages#models-lsm-supported-features)
   * * [Next-generation languages and models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng)
   * * [Supported features for next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng#models-ng-features)
   *
   * ### Multipart speech recognition
   *
   *  **Note:** The asynchronous HTTP interface, WebSocket interface, and Watson SDKs do not support multipart speech
   * recognition.
   *
   * The HTTP `POST` method of the service also supports multipart speech recognition. With multipart requests, you pass
   * all audio data as multipart form data. You specify some parameters as request headers and query parameters, but you
   * pass JSON metadata as form data to control most aspects of the transcription. You can use multipart recognition to
   * pass multiple audio files with a single request.
   *
   * Use the multipart approach with browsers for which JavaScript is disabled or when the parameters used with the
   * request are greater than the 8 KB limit imposed by most HTTP servers and proxies. You can encounter this limit, for
   * example, if you want to spot a very large number of keywords.
   *
   * **See also:** [Making a multipart HTTP
   * request](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-http#HTTP-multi).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream | Buffer} params.audio - The audio to transcribe.
   * @param {string} [params.contentType] - The format (MIME type) of the audio. For more information about specifying
   * an audio format, see **Audio formats (content types)** in the method description.
   * @param {string} [params.model] - The model to use for speech recognition. If you omit the `model` parameter, the
   * service uses the US English `en-US_BroadbandModel` by default.
   *
   * _For IBM Cloud Pak for Data,_ if you do not install the `en-US_BroadbandModel`, you must either specify a model
   * with the request or specify a new default model for your installation of the service.
   *
   * **See also:**
   * * [Using a model for speech recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use)
   * * [Using the default
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use#models-use-default).
   * @param {boolean} [params.speechBeginEvent] - If `true`, the service returns a response object `SpeechActivity`
   * which contains the time when a speech activity is detected in the stream. This can be used both in standard and low
   * latency mode. This feature enables client applications to know that some words/speech has been detected and the
   * service is in the process of decoding. This can be used in lieu of interim results in standard mode. See [Using
   * speech recognition
   * parameters](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-service-features#features-parameters).
   * @param {string} [params.languageCustomizationId] - The customization ID (GUID) of a custom language model that is
   * to be used with the recognition request. The base model of the specified custom language model must match the model
   * specified with the `model` parameter. You must make the request with credentials for the instance of the service
   * that owns the custom model. By default, no custom language model is used. See [Using a custom language model for
   * speech recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageUse).
   *
   * **Note:** Use this parameter instead of the deprecated `customization_id` parameter.
   * @param {string} [params.acousticCustomizationId] - The customization ID (GUID) of a custom acoustic model that is
   * to be used with the recognition request. The base model of the specified custom acoustic model must match the model
   * specified with the `model` parameter. You must make the request with credentials for the instance of the service
   * that owns the custom model. By default, no custom acoustic model is used. See [Using a custom acoustic model for
   * speech recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-acousticUse).
   * @param {string} [params.baseModelVersion] - The version of the specified base model that is to be used with the
   * recognition request. Multiple versions of a base model can exist when a model is updated for internal improvements.
   * The parameter is intended primarily for use with custom models that have been upgraded for a new base model. The
   * default value depends on whether the parameter is used with or without a custom model. See [Making speech
   * recognition requests with upgraded custom
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade-use#custom-upgrade-use-recognition).
   * @param {number} [params.customizationWeight] - If you specify the customization ID (GUID) of a custom language
   * model with the recognition request, the customization weight tells the service how much weight to give to words
   * from the custom language model compared to those from the base model for the current request.
   *
   * Specify a value between 0.0 and 1.0. Unless a different customization weight was specified for the custom model
   * when the model was trained, the default value is:
   * * 0.5 for large speech models
   * * 0.3 for previous-generation models
   * * 0.2 for most next-generation models
   * * 0.1 for next-generation English and Japanese models
   *
   * A customization weight that you specify overrides a weight that was specified when the custom model was trained.
   * The default value yields the best performance in general. Assign a higher value if your audio makes frequent use of
   * OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy of
   * phrases from the custom model's domain, but it can negatively affect performance on non-domain phrases.
   *
   * See [Using customization
   * weight](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageUse#weight).
   * @param {number} [params.inactivityTimeout] - The time in seconds after which, if only silence (no speech) is
   * detected in streaming audio, the connection is closed with a 400 error. The parameter is useful for stopping audio
   * submission from a live microphone when a user simply walks away. Use `-1` for infinity. See [Inactivity
   * timeout](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-input#timeouts-inactivity).
   * @param {string[]} [params.keywords] - An array of keyword strings to spot in the audio. Each keyword string can
   * include one or more string tokens. Keywords are spotted only in the final results, not in interim hypotheses. If
   * you specify any keywords, you must also specify a keywords threshold. Omit the parameter or specify an empty array
   * if you do not need to spot keywords.
   *
   * You can spot a maximum of 1000 keywords with a single request. A single keyword can have a maximum length of 1024
   * characters, though the maximum effective length for double-byte languages might be shorter. Keywords are
   * case-insensitive.
   *
   * See [Keyword spotting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#keyword-spotting).
   * @param {number} [params.keywordsThreshold] - A confidence value that is the lower bound for spotting a keyword. A
   * word is considered to match a keyword if its confidence is greater than or equal to the threshold. Specify a
   * probability between 0.0 and 1.0. If you specify a threshold, you must also specify one or more keywords. The
   * service performs no keyword spotting if you omit either parameter. See [Keyword
   * spotting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#keyword-spotting).
   * @param {number} [params.maxAlternatives] - The maximum number of alternative transcripts that the service is to
   * return. By default, the service returns a single transcript. If you specify a value of `0`, the service uses the
   * default value, `1`. See [Maximum
   * alternatives](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#max-alternatives).
   * @param {number} [params.wordAlternativesThreshold] - A confidence value that is the lower bound for identifying a
   * hypothesis as a possible word alternative (also known as "Confusion Networks"). An alternative word is considered
   * if its confidence is greater than or equal to the threshold. Specify a probability between 0.0 and 1.0. By default,
   * the service computes no alternative words. See [Word
   * alternatives](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#word-alternatives).
   * @param {boolean} [params.wordConfidence] - If `true`, the service returns a confidence measure in the range of 0.0
   * to 1.0 for each word. By default, the service returns no word confidence scores. See [Word
   * confidence](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#word-confidence).
   * @param {boolean} [params.timestamps] - If `true`, the service returns time alignment for each word. By default, no
   * timestamps are returned. See [Word
   * timestamps](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#word-timestamps).
   * @param {boolean} [params.profanityFilter] - If `true`, the service filters profanity from all output except for
   * keyword results by replacing inappropriate words with a series of asterisks. Set the parameter to `false` to return
   * results with no censoring.
   *
   * **Note:** The parameter can be used with US English and Japanese transcription only. See [Profanity
   * filtering](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#profanity-filtering).
   * @param {boolean} [params.smartFormatting] - If `true`, the service converts dates, times, series of digits and
   * numbers, phone numbers, currency values, and internet addresses into more readable, conventional representations in
   * the final transcript of a recognition request. For US English, the service also converts certain keyword strings to
   * punctuation symbols. By default, the service performs no smart formatting.
   *
   * **Note:** The parameter can be used with US English, Japanese, and Spanish (all dialects) transcription only.
   *
   * See [Smart formatting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#smart-formatting).
   * @param {number} [params.smartFormattingVersion] - Smart formatting version for large speech models and
   * next-generation models is supported in US English, Brazilian Portuguese, French, German, Spanish and French
   * Canadian languages.
   * @param {boolean} [params.speakerLabels] - If `true`, the response includes labels that identify which words were
   * spoken by which participants in a multi-person exchange. By default, the service returns no speaker labels. Setting
   * `speaker_labels` to `true` forces the `timestamps` parameter to be `true`, regardless of whether you specify
   * `false` for the parameter.
   * * _For previous-generation models,_ the parameter can be used with Australian English, US English, German,
   * Japanese, Korean, and Spanish (both broadband and narrowband models) and UK English (narrowband model)
   * transcription only.
   * * _For large speech models and next-generation models,_ the parameter can be used with all available languages.
   *
   * See [Speaker labels](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-speaker-labels).
   * @param {string} [params.grammarName] - The name of a grammar that is to be used with the recognition request. If
   * you specify a grammar, you must also use the `language_customization_id` parameter to specify the name of the
   * custom language model for which the grammar is defined. The service recognizes only strings that are recognized by
   * the specified grammar; it does not recognize other custom words from the model's words resource.
   *
   * See [Using a grammar for speech
   * recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-grammarUse).
   * @param {boolean} [params.redaction] - If `true`, the service redacts, or masks, numeric data from final
   * transcripts. The feature redacts any number that has three or more consecutive digits by replacing each digit with
   * an `X` character. It is intended to redact sensitive numeric data, such as credit card numbers. By default, the
   * service performs no redaction.
   *
   * When you enable redaction, the service automatically enables smart formatting, regardless of whether you explicitly
   * disable that feature. To ensure maximum security, the service also disables keyword spotting (ignores the
   * `keywords` and `keywords_threshold` parameters) and returns only a single final transcript (forces the
   * `max_alternatives` parameter to be `1`).
   *
   * **Note:** The parameter can be used with US English, Japanese, and Korean transcription only.
   *
   * See [Numeric
   * redaction](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#numeric-redaction).
   * @param {boolean} [params.audioMetrics] - If `true`, requests detailed information about the signal characteristics
   * of the input audio. The service returns audio metrics with the final transcription results. By default, the service
   * returns no audio metrics.
   *
   * See [Audio metrics](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metrics#audio-metrics).
   * @param {number} [params.endOfPhraseSilenceTime] - Specifies the duration of the pause interval at which the service
   * splits a transcript into multiple final results. If the service detects pauses or extended silence before it
   * reaches the end of the audio stream, its response can include multiple final results. Silence indicates a point at
   * which the speaker pauses between spoken words or phrases.
   *
   * Specify a value for the pause interval in the range of 0.0 to 120.0.
   * * A value greater than 0 specifies the interval that the service is to use for speech recognition.
   * * A value of 0 indicates that the service is to use the default interval. It is equivalent to omitting the
   * parameter.
   *
   * The default pause interval for most languages is 0.8 seconds; the default for Chinese is 0.6 seconds.
   *
   * See [End of phrase silence
   * time](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#silence-time).
   * @param {boolean} [params.splitTranscriptAtPhraseEnd] - If `true`, directs the service to split the transcript into
   * multiple final results based on semantic features of the input, for example, at the conclusion of meaningful
   * phrases such as sentences. The service bases its understanding of semantic features on the base language model that
   * you use with a request. Custom language models and grammars can also influence how and where the service splits a
   * transcript.
   *
   * By default, the service splits transcripts based solely on the pause interval. If the parameters are used together
   * on the same request, `end_of_phrase_silence_time` has precedence over `split_transcript_at_phrase_end`.
   *
   * See [Split transcript at phrase
   * end](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#split-transcript).
   * @param {number} [params.speechDetectorSensitivity] - The sensitivity of speech activity detection that the service
   * is to perform. Use the parameter to suppress word insertions from music, coughing, and other non-speech events. The
   * service biases the audio it passes for speech recognition by evaluating the input audio against prior models of
   * speech and non-speech activity.
   *
   * Specify a value between 0.0 and 1.0:
   * * 0.0 suppresses all audio (no speech is transcribed).
   * * 0.5 (the default) provides a reasonable compromise for the level of sensitivity.
   * * 1.0 suppresses no audio (speech detection sensitivity is disabled).
   *
   * The values increase on a monotonic curve. Specifying one or two decimal places of precision (for example, `0.55`)
   * is typically more than sufficient.
   *
   * The parameter is supported with all large speech models, next-generation models and with most previous-generation
   * models. See [Speech detector
   * sensitivity](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-parameters-sensitivity)
   * and [Language model
   * support](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-support).
   * @param {number} [params.backgroundAudioSuppression] - The level to which the service is to suppress background
   * audio based on its volume to prevent it from being transcribed as speech. Use the parameter to suppress side
   * conversations or background noise.
   *
   * Specify a value in the range of 0.0 to 1.0:
   * * 0.0 (the default) provides no suppression (background audio suppression is disabled).
   * * 0.5 provides a reasonable level of audio suppression for general usage.
   * * 1.0 suppresses all audio (no audio is transcribed).
   *
   * The values increase on a monotonic curve. Specifying one or two decimal places of precision (for example, `0.55`)
   * is typically more than sufficient.
   *
   * The parameter is supported with all large speech models, next-generation models and with most previous-generation
   * models. See [Background audio
   * suppression](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-parameters-suppression)
   * and [Language model
   * support](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-support).
   * @param {boolean} [params.lowLatency] - If `true` for next-generation `Multimedia` and `Telephony` models that
   * support low latency, directs the service to produce results even more quickly than it usually does. Next-generation
   * models produce transcription results faster than previous-generation models. The `low_latency` parameter causes the
   * models to produce results even more quickly, though the results might be less accurate when the parameter is used.
   *
   * The parameter is not available for large speech models and previous-generation `Broadband` and `Narrowband` models.
   * It is available for most next-generation models.
   * * For a list of next-generation models that support low latency, see [Supported next-generation language
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng#models-ng-supported).
   * * For more information about the `low_latency` parameter, see [Low
   * latency](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-interim#low-latency).
   * @param {number} [params.characterInsertionBias] - For large speech models and next-generation models, an indication
   * of whether the service is biased to recognize shorter or longer strings of characters when developing transcription
   * hypotheses. By default, the service is optimized to produce the best balance of strings of different lengths.
   *
   * The default bias is 0.0. The allowable range of values is -1.0 to 1.0.
   * * Negative values bias the service to favor hypotheses with shorter strings of characters.
   * * Positive values bias the service to favor hypotheses with longer strings of characters.
   *
   * As the value approaches -1.0 or 1.0, the impact of the parameter becomes more pronounced. To determine the most
   * effective value for your scenario, start by setting the value of the parameter to a small increment, such as -0.1,
   * -0.05, 0.05, or 0.1, and assess how the value impacts the transcription results. Then experiment with different
   * values as necessary, adjusting the value by small increments.
   *
   * The parameter is not available for previous-generation models.
   *
   * See [Character insertion
   * bias](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#insertion-bias).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.SpeechRecognitionResults>>}
   */
  public recognize(
    params: SpeechToTextV1.RecognizeParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.SpeechRecognitionResults>> {
    const _params = { ...params };
    const _requiredParams = ['audio'];
    const _validParams = ['audio', 'contentType', 'model', 'speechBeginEvent', 'languageCustomizationId', 'acousticCustomizationId', 'baseModelVersion', 'customizationWeight', 'inactivityTimeout', 'keywords', 'keywordsThreshold', 'maxAlternatives', 'wordAlternativesThreshold', 'wordConfidence', 'timestamps', 'profanityFilter', 'smartFormatting', 'smartFormattingVersion', 'speakerLabels', 'grammarName', 'redaction', 'audioMetrics', 'endOfPhraseSilenceTime', 'splitTranscriptAtPhraseEnd', 'speechDetectorSensitivity', 'backgroundAudioSuppression', 'lowLatency', 'characterInsertionBias', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.audio;
    const query = {
      'model': _params.model,
      'speech_begin_event': _params.speechBeginEvent,
      'language_customization_id': _params.languageCustomizationId,
      'acoustic_customization_id': _params.acousticCustomizationId,
      'base_model_version': _params.baseModelVersion,
      'customization_weight': _params.customizationWeight,
      'inactivity_timeout': _params.inactivityTimeout,
      'keywords': _params.keywords,
      'keywords_threshold': _params.keywordsThreshold,
      'max_alternatives': _params.maxAlternatives,
      'word_alternatives_threshold': _params.wordAlternativesThreshold,
      'word_confidence': _params.wordConfidence,
      'timestamps': _params.timestamps,
      'profanity_filter': _params.profanityFilter,
      'smart_formatting': _params.smartFormatting,
      'smart_formatting_version': _params.smartFormattingVersion,
      'speaker_labels': _params.speakerLabels,
      'grammar_name': _params.grammarName,
      'redaction': _params.redaction,
      'audio_metrics': _params.audioMetrics,
      'end_of_phrase_silence_time': _params.endOfPhraseSilenceTime,
      'split_transcript_at_phrase_end': _params.splitTranscriptAtPhraseEnd,
      'speech_detector_sensitivity': _params.speechDetectorSensitivity,
      'background_audio_suppression': _params.backgroundAudioSuppression,
      'low_latency': _params.lowLatency,
      'character_insertion_bias': _params.characterInsertionBias,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'recognize');

    const parameters = {
      options: {
        url: '/v1/recognize',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * asynchronous
   ************************/

  /**
   * Register a callback.
   *
   * Registers a callback URL with the service for use with subsequent asynchronous recognition requests. The service
   * attempts to register, or allowlist, the callback URL if it is not already registered by sending a `GET` request to
   * the callback URL. The service passes a random alphanumeric challenge string via the `challenge_string` parameter of
   * the request. The request includes an `Accept` header that specifies `text/plain` as the required response type.
   *
   * To be registered successfully, the callback URL must respond to the `GET` request from the service. The response
   * must send status code 200 and must include the challenge string in its body. Set the `Content-Type` response header
   * to `text/plain`. Upon receiving this response, the service responds to the original registration request with
   * response code 201.
   *
   * The service sends only a single `GET` request to the callback URL. If the service does not receive a reply with a
   * response code of 200 and a body that echoes the challenge string sent by the service within five seconds, it does
   * not allowlist the URL; it instead sends status code 400 in response to the request to register a callback. If the
   * requested callback URL is already allowlisted, the service responds to the initial registration request with
   * response code 200.
   *
   * If you specify a user secret with the request, the service uses it as a key to calculate an HMAC-SHA1 signature of
   * the challenge string in its response to the `POST` request. It sends this signature in the `X-Callback-Signature`
   * header of its `GET` request to the URL during registration. It also uses the secret to calculate a signature over
   * the payload of every callback notification that uses the URL. The signature provides authentication and data
   * integrity for HTTP communications.
   *
   * After you successfully register a callback URL, you can use it with an indefinite number of recognition requests.
   * You can register a maximum of 20 callback URLS in a one-hour span of time.
   *
   * **See also:** [Registering a callback
   * URL](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-async#register).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.callbackUrl - An HTTP or HTTPS URL to which callback notifications are to be sent. To be
   * allowlisted, the URL must successfully echo the challenge string during URL verification. During verification, the
   * client can also check the signature that the service sends in the `X-Callback-Signature` header to verify the
   * origin of the request.
   * @param {string} [params.userSecret] - A user-specified string that the service uses to generate the HMAC-SHA1
   * signature that it sends via the `X-Callback-Signature` header. The service includes the header during URL
   * verification and with every notification sent to the callback URL. It calculates the signature over the payload of
   * the notification. If you omit the parameter, the service does not send the header.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.RegisterStatus>>}
   */
  public registerCallback(
    params: SpeechToTextV1.RegisterCallbackParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.RegisterStatus>> {
    const _params = { ...params };
    const _requiredParams = ['callbackUrl'];
    const _validParams = ['callbackUrl', 'userSecret', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'callback_url': _params.callbackUrl,
      'user_secret': _params.userSecret,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'registerCallback');

    const parameters = {
      options: {
        url: '/v1/register_callback',
        method: 'POST',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Unregister a callback.
   *
   * Unregisters a callback URL that was previously allowlisted with a [Register a callback](#registercallback) request
   * for use with the asynchronous interface. Once unregistered, the URL can no longer be used with asynchronous
   * recognition requests.
   *
   * **See also:** [Unregistering a callback
   * URL](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-async#unregister).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.callbackUrl - The callback URL that is to be unregistered.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public unregisterCallback(
    params: SpeechToTextV1.UnregisterCallbackParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['callbackUrl'];
    const _validParams = ['callbackUrl', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'callback_url': _params.callbackUrl,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'unregisterCallback');

    const parameters = {
      options: {
        url: '/v1/unregister_callback',
        method: 'POST',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a job.
   *
   * Creates a job for a new asynchronous recognition request. The job is owned by the instance of the service whose
   * credentials are used to create it. How you learn the status and results of a job depends on the parameters you
   * include with the job creation request:
   * * By callback notification: Include the `callback_url` parameter to specify a URL to which the service is to send
   * callback notifications when the status of the job changes. Optionally, you can also include the `events` and
   * `user_token` parameters to subscribe to specific events and to specify a string that is to be included with each
   * notification for the job.
   * * By polling the service: Omit the `callback_url`, `events`, and `user_token` parameters. You must then use the
   * [Check jobs](#checkjobs) or [Check a job](#checkjob) methods to check the status of the job, using the latter to
   * retrieve the results when the job is complete.
   *
   * The two approaches are not mutually exclusive. You can poll the service for job status or obtain results from the
   * service manually even if you include a callback URL. In both cases, you can include the `results_ttl` parameter to
   * specify how long the results are to remain available after the job is complete. Using the HTTPS [Check a
   * job](#checkjob) method to retrieve results is more secure than receiving them via callback notification over HTTP
   * because it provides confidentiality in addition to authentication and data integrity.
   *
   * The method supports the same basic parameters as other HTTP and WebSocket recognition requests. It also supports
   * the following parameters specific to the asynchronous interface:
   * * `callback_url`
   * * `events`
   * * `user_token`
   * * `results_ttl`
   *
   * You can pass a maximum of 1 GB and a minimum of 100 bytes of audio with a request. The service automatically
   * detects the endianness of the incoming audio and, for audio that includes multiple channels, downmixes the audio to
   * one-channel mono during transcoding. The method returns only final results; to enable interim results, use the
   * WebSocket API. (With the `curl` command, use the `--data-binary` option to upload the file for the request.)
   *
   * **See also:** [Creating a job](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-async#create).
   *
   * ### Streaming mode
   *
   *  For requests to transcribe live audio as it becomes available, you must set the `Transfer-Encoding` header to
   * `chunked` to use streaming mode. In streaming mode, the service closes the connection (status code 408) if it does
   * not receive at least 15 seconds of audio (including silence) in any 30-second period. The service also closes the
   * connection (status code 400) if it detects no speech for `inactivity_timeout` seconds of streaming audio; use the
   * `inactivity_timeout` parameter to change the default of 30 seconds.
   *
   * **See also:**
   * * [Audio transmission](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-input#transmission)
   * * [Timeouts](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-input#timeouts)
   *
   * ### Audio formats (content types)
   *
   *  The service accepts audio in the following formats (MIME types).
   * * For formats that are labeled **Required**, you must use the `Content-Type` header with the request to specify the
   * format of the audio.
   * * For all other formats, you can omit the `Content-Type` header or specify `application/octet-stream` with the
   * header to have the service automatically detect the format of the audio. (With the `curl` command, you can specify
   * either `"Content-Type:"` or `"Content-Type: application/octet-stream"`.)
   *
   * Where indicated, the format that you specify must include the sampling rate and can optionally include the number
   * of channels and the endianness of the audio.
   * * `audio/alaw` (**Required.** Specify the sampling rate (`rate`) of the audio.)
   * * `audio/basic` (**Required.** Use only with narrowband models.)
   * * `audio/flac`
   * * `audio/g729` (Use only with narrowband models.)
   * * `audio/l16` (**Required.** Specify the sampling rate (`rate`) and optionally the number of channels (`channels`)
   * and endianness (`endianness`) of the audio.)
   * * `audio/mp3`
   * * `audio/mpeg`
   * * `audio/mulaw` (**Required.** Specify the sampling rate (`rate`) of the audio.)
   * * `audio/ogg` (The service automatically detects the codec of the input audio.)
   * * `audio/ogg;codecs=opus`
   * * `audio/ogg;codecs=vorbis`
   * * `audio/wav` (Provide audio with a maximum of nine channels.)
   * * `audio/webm` (The service automatically detects the codec of the input audio.)
   * * `audio/webm;codecs=opus`
   * * `audio/webm;codecs=vorbis`
   *
   * The sampling rate of the audio must match the sampling rate of the model for the recognition request: for broadband
   * models, at least 16 kHz; for narrowband models, at least 8 kHz. If the sampling rate of the audio is higher than
   * the minimum required rate, the service down-samples the audio to the appropriate rate. If the sampling rate of the
   * audio is lower than the minimum required rate, the request fails.
   *
   *  **See also:** [Supported audio
   * formats](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-audio-formats).
   *
   * ### Large speech models and Next-generation models
   *
   *  The service supports large speech models and next-generation `Multimedia` (16 kHz) and `Telephony` (8 kHz) models
   * for many languages. Large speech models and next-generation models have higher throughput than the service's
   * previous generation of `Broadband` and `Narrowband` models. When you use large speech models and next-generation
   * models, the service can return transcriptions more quickly and also provide noticeably better transcription
   * accuracy.
   *
   * You specify a large speech model or next-generation model by using the `model` query parameter, as you do a
   * previous-generation model. Only the next-generation models support the `low_latency` parameter, and all large
   * speech models and next-generation models support the `character_insertion_bias` parameter. These parameters are not
   * available with previous-generation models.
   *
   * Large speech models and next-generation models do not support all of the speech recognition parameters that are
   * available for use with previous-generation models. Next-generation models do not support the following parameters:
   * * `acoustic_customization_id`
   * * `keywords` and `keywords_threshold`
   * * `processing_metrics` and `processing_metrics_interval`
   * * `word_alternatives_threshold`
   *
   * **Important:** Effective **31 July 2023**, all previous-generation models will be removed from the service and the
   * documentation. Most previous-generation models were deprecated on 15 March 2022. You must migrate to the equivalent
   * large speech model or next-generation model by 31 July 2023. For more information, see [Migrating to large speech
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-migrate).
   *
   * **See also:**
   * * [Large speech languages and
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-large-speech-languages)
   * * [Supported features for large speech
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-large-speech-languages#models-lsm-supported-features)
   * * [Next-generation languages and models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng)
   * * [Supported features for next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng#models-ng-features).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream | Buffer} params.audio - The audio to transcribe.
   * @param {string} [params.contentType] - The format (MIME type) of the audio. For more information about specifying
   * an audio format, see **Audio formats (content types)** in the method description.
   * @param {string} [params.model] - The model to use for speech recognition. If you omit the `model` parameter, the
   * service uses the US English `en-US_BroadbandModel` by default.
   *
   * _For IBM Cloud Pak for Data,_ if you do not install the `en-US_BroadbandModel`, you must either specify a model
   * with the request or specify a new default model for your installation of the service.
   *
   * **See also:**
   * * [Using a model for speech recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use)
   * * [Using the default
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use#models-use-default).
   * @param {string} [params.callbackUrl] - A URL to which callback notifications are to be sent. The URL must already
   * be successfully allowlisted by using the [Register a callback](#registercallback) method. You can include the same
   * callback URL with any number of job creation requests. Omit the parameter to poll the service for job completion
   * and results.
   *
   * Use the `user_token` parameter to specify a unique user-specified string with each job to differentiate the
   * callback notifications for the jobs.
   * @param {string} [params.events] - If the job includes a callback URL, a comma-separated list of notification events
   * to which to subscribe. Valid events are
   * * `recognitions.started` generates a callback notification when the service begins to process the job.
   * * `recognitions.completed` generates a callback notification when the job is complete. You must use the [Check a
   * job](#checkjob) method to retrieve the results before they time out or are deleted.
   * * `recognitions.completed_with_results` generates a callback notification when the job is complete. The
   * notification includes the results of the request.
   * * `recognitions.failed` generates a callback notification if the service experiences an error while processing the
   * job.
   *
   * The `recognitions.completed` and `recognitions.completed_with_results` events are incompatible. You can specify
   * only of the two events.
   *
   * If the job includes a callback URL, omit the parameter to subscribe to the default events: `recognitions.started`,
   * `recognitions.completed`, and `recognitions.failed`. If the job does not include a callback URL, omit the
   * parameter.
   * @param {string} [params.userToken] - If the job includes a callback URL, a user-specified string that the service
   * is to include with each callback notification for the job; the token allows the user to maintain an internal
   * mapping between jobs and notification events. If the job does not include a callback URL, omit the parameter.
   * @param {number} [params.resultsTtl] - The number of minutes for which the results are to be available after the job
   * has finished. If not delivered via a callback, the results must be retrieved within this time. Omit the parameter
   * to use a time to live of one week. The parameter is valid with or without a callback URL.
   * @param {string} [params.languageCustomizationId] - The customization ID (GUID) of a custom language model that is
   * to be used with the recognition request. The base model of the specified custom language model must match the model
   * specified with the `model` parameter. You must make the request with credentials for the instance of the service
   * that owns the custom model. By default, no custom language model is used. See [Using a custom language model for
   * speech recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageUse).
   *
   * **Note:** Use this parameter instead of the deprecated `customization_id` parameter.
   * @param {string} [params.acousticCustomizationId] - The customization ID (GUID) of a custom acoustic model that is
   * to be used with the recognition request. The base model of the specified custom acoustic model must match the model
   * specified with the `model` parameter. You must make the request with credentials for the instance of the service
   * that owns the custom model. By default, no custom acoustic model is used. See [Using a custom acoustic model for
   * speech recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-acousticUse).
   * @param {string} [params.baseModelVersion] - The version of the specified base model that is to be used with the
   * recognition request. Multiple versions of a base model can exist when a model is updated for internal improvements.
   * The parameter is intended primarily for use with custom models that have been upgraded for a new base model. The
   * default value depends on whether the parameter is used with or without a custom model. See [Making speech
   * recognition requests with upgraded custom
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade-use#custom-upgrade-use-recognition).
   * @param {number} [params.customizationWeight] - If you specify the customization ID (GUID) of a custom language
   * model with the recognition request, the customization weight tells the service how much weight to give to words
   * from the custom language model compared to those from the base model for the current request.
   *
   * Specify a value between 0.0 and 1.0. Unless a different customization weight was specified for the custom model
   * when the model was trained, the default value is:
   * * 0.5 for large speech models
   * * 0.3 for previous-generation models
   * * 0.2 for most next-generation models
   * * 0.1 for next-generation English and Japanese models
   *
   * A customization weight that you specify overrides a weight that was specified when the custom model was trained.
   * The default value yields the best performance in general. Assign a higher value if your audio makes frequent use of
   * OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy of
   * phrases from the custom model's domain, but it can negatively affect performance on non-domain phrases.
   *
   * See [Using customization
   * weight](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageUse#weight).
   * @param {number} [params.inactivityTimeout] - The time in seconds after which, if only silence (no speech) is
   * detected in streaming audio, the connection is closed with a 400 error. The parameter is useful for stopping audio
   * submission from a live microphone when a user simply walks away. Use `-1` for infinity. See [Inactivity
   * timeout](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-input#timeouts-inactivity).
   * @param {string[]} [params.keywords] - An array of keyword strings to spot in the audio. Each keyword string can
   * include one or more string tokens. Keywords are spotted only in the final results, not in interim hypotheses. If
   * you specify any keywords, you must also specify a keywords threshold. Omit the parameter or specify an empty array
   * if you do not need to spot keywords.
   *
   * You can spot a maximum of 1000 keywords with a single request. A single keyword can have a maximum length of 1024
   * characters, though the maximum effective length for double-byte languages might be shorter. Keywords are
   * case-insensitive.
   *
   * See [Keyword spotting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#keyword-spotting).
   * @param {number} [params.keywordsThreshold] - A confidence value that is the lower bound for spotting a keyword. A
   * word is considered to match a keyword if its confidence is greater than or equal to the threshold. Specify a
   * probability between 0.0 and 1.0. If you specify a threshold, you must also specify one or more keywords. The
   * service performs no keyword spotting if you omit either parameter. See [Keyword
   * spotting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#keyword-spotting).
   * @param {number} [params.maxAlternatives] - The maximum number of alternative transcripts that the service is to
   * return. By default, the service returns a single transcript. If you specify a value of `0`, the service uses the
   * default value, `1`. See [Maximum
   * alternatives](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#max-alternatives).
   * @param {number} [params.wordAlternativesThreshold] - A confidence value that is the lower bound for identifying a
   * hypothesis as a possible word alternative (also known as "Confusion Networks"). An alternative word is considered
   * if its confidence is greater than or equal to the threshold. Specify a probability between 0.0 and 1.0. By default,
   * the service computes no alternative words. See [Word
   * alternatives](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#word-alternatives).
   * @param {boolean} [params.wordConfidence] - If `true`, the service returns a confidence measure in the range of 0.0
   * to 1.0 for each word. By default, the service returns no word confidence scores. See [Word
   * confidence](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#word-confidence).
   * @param {boolean} [params.timestamps] - If `true`, the service returns time alignment for each word. By default, no
   * timestamps are returned. See [Word
   * timestamps](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#word-timestamps).
   * @param {boolean} [params.profanityFilter] - If `true`, the service filters profanity from all output except for
   * keyword results by replacing inappropriate words with a series of asterisks. Set the parameter to `false` to return
   * results with no censoring.
   *
   * **Note:** The parameter can be used with US English and Japanese transcription only. See [Profanity
   * filtering](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#profanity-filtering).
   * @param {boolean} [params.smartFormatting] - If `true`, the service converts dates, times, series of digits and
   * numbers, phone numbers, currency values, and internet addresses into more readable, conventional representations in
   * the final transcript of a recognition request. For US English, the service also converts certain keyword strings to
   * punctuation symbols. By default, the service performs no smart formatting.
   *
   * **Note:** The parameter can be used with US English, Japanese, and Spanish (all dialects) transcription only.
   *
   * See [Smart formatting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#smart-formatting).
   * @param {number} [params.smartFormattingVersion] - Smart formatting version for large speech models and
   * next-generation models is supported in US English, Brazilian Portuguese, French, German, Spanish and French
   * Canadian languages.
   * @param {boolean} [params.speakerLabels] - If `true`, the response includes labels that identify which words were
   * spoken by which participants in a multi-person exchange. By default, the service returns no speaker labels. Setting
   * `speaker_labels` to `true` forces the `timestamps` parameter to be `true`, regardless of whether you specify
   * `false` for the parameter.
   * * _For previous-generation models,_ the parameter can be used with Australian English, US English, German,
   * Japanese, Korean, and Spanish (both broadband and narrowband models) and UK English (narrowband model)
   * transcription only.
   * * _For large speech models and next-generation models,_ the parameter can be used with all available languages.
   *
   * See [Speaker labels](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-speaker-labels).
   * @param {string} [params.grammarName] - The name of a grammar that is to be used with the recognition request. If
   * you specify a grammar, you must also use the `language_customization_id` parameter to specify the name of the
   * custom language model for which the grammar is defined. The service recognizes only strings that are recognized by
   * the specified grammar; it does not recognize other custom words from the model's words resource.
   *
   * See [Using a grammar for speech
   * recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-grammarUse).
   * @param {boolean} [params.redaction] - If `true`, the service redacts, or masks, numeric data from final
   * transcripts. The feature redacts any number that has three or more consecutive digits by replacing each digit with
   * an `X` character. It is intended to redact sensitive numeric data, such as credit card numbers. By default, the
   * service performs no redaction.
   *
   * When you enable redaction, the service automatically enables smart formatting, regardless of whether you explicitly
   * disable that feature. To ensure maximum security, the service also disables keyword spotting (ignores the
   * `keywords` and `keywords_threshold` parameters) and returns only a single final transcript (forces the
   * `max_alternatives` parameter to be `1`).
   *
   * **Note:** The parameter can be used with US English, Japanese, and Korean transcription only.
   *
   * See [Numeric
   * redaction](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#numeric-redaction).
   * @param {boolean} [params.processingMetrics] - If `true`, requests processing metrics about the service's
   * transcription of the input audio. The service returns processing metrics at the interval specified by the
   * `processing_metrics_interval` parameter. It also returns processing metrics for transcription events, for example,
   * for final and interim results. By default, the service returns no processing metrics.
   *
   * See [Processing
   * metrics](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metrics#processing-metrics).
   * @param {number} [params.processingMetricsInterval] - Specifies the interval in real wall-clock seconds at which the
   * service is to return processing metrics. The parameter is ignored unless the `processing_metrics` parameter is set
   * to `true`.
   *
   * The parameter accepts a minimum value of 0.1 seconds. The level of precision is not restricted, so you can specify
   * values such as 0.25 and 0.125.
   *
   * The service does not impose a maximum value. If you want to receive processing metrics only for transcription
   * events instead of at periodic intervals, set the value to a large number. If the value is larger than the duration
   * of the audio, the service returns processing metrics only for transcription events.
   *
   * See [Processing
   * metrics](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metrics#processing-metrics).
   * @param {boolean} [params.audioMetrics] - If `true`, requests detailed information about the signal characteristics
   * of the input audio. The service returns audio metrics with the final transcription results. By default, the service
   * returns no audio metrics.
   *
   * See [Audio metrics](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metrics#audio-metrics).
   * @param {number} [params.endOfPhraseSilenceTime] - Specifies the duration of the pause interval at which the service
   * splits a transcript into multiple final results. If the service detects pauses or extended silence before it
   * reaches the end of the audio stream, its response can include multiple final results. Silence indicates a point at
   * which the speaker pauses between spoken words or phrases.
   *
   * Specify a value for the pause interval in the range of 0.0 to 120.0.
   * * A value greater than 0 specifies the interval that the service is to use for speech recognition.
   * * A value of 0 indicates that the service is to use the default interval. It is equivalent to omitting the
   * parameter.
   *
   * The default pause interval for most languages is 0.8 seconds; the default for Chinese is 0.6 seconds.
   *
   * See [End of phrase silence
   * time](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#silence-time).
   * @param {boolean} [params.splitTranscriptAtPhraseEnd] - If `true`, directs the service to split the transcript into
   * multiple final results based on semantic features of the input, for example, at the conclusion of meaningful
   * phrases such as sentences. The service bases its understanding of semantic features on the base language model that
   * you use with a request. Custom language models and grammars can also influence how and where the service splits a
   * transcript.
   *
   * By default, the service splits transcripts based solely on the pause interval. If the parameters are used together
   * on the same request, `end_of_phrase_silence_time` has precedence over `split_transcript_at_phrase_end`.
   *
   * See [Split transcript at phrase
   * end](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#split-transcript).
   * @param {number} [params.speechDetectorSensitivity] - The sensitivity of speech activity detection that the service
   * is to perform. Use the parameter to suppress word insertions from music, coughing, and other non-speech events. The
   * service biases the audio it passes for speech recognition by evaluating the input audio against prior models of
   * speech and non-speech activity.
   *
   * Specify a value between 0.0 and 1.0:
   * * 0.0 suppresses all audio (no speech is transcribed).
   * * 0.5 (the default) provides a reasonable compromise for the level of sensitivity.
   * * 1.0 suppresses no audio (speech detection sensitivity is disabled).
   *
   * The values increase on a monotonic curve. Specifying one or two decimal places of precision (for example, `0.55`)
   * is typically more than sufficient.
   *
   * The parameter is supported with all large speech models, next-generation models and with most previous-generation
   * models. See [Speech detector
   * sensitivity](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-parameters-sensitivity)
   * and [Language model
   * support](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-support).
   * @param {number} [params.backgroundAudioSuppression] - The level to which the service is to suppress background
   * audio based on its volume to prevent it from being transcribed as speech. Use the parameter to suppress side
   * conversations or background noise.
   *
   * Specify a value in the range of 0.0 to 1.0:
   * * 0.0 (the default) provides no suppression (background audio suppression is disabled).
   * * 0.5 provides a reasonable level of audio suppression for general usage.
   * * 1.0 suppresses all audio (no audio is transcribed).
   *
   * The values increase on a monotonic curve. Specifying one or two decimal places of precision (for example, `0.55`)
   * is typically more than sufficient.
   *
   * The parameter is supported with all large speech models, next-generation models and with most previous-generation
   * models. See [Background audio
   * suppression](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-parameters-suppression)
   * and [Language model
   * support](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-support).
   * @param {boolean} [params.lowLatency] - If `true` for next-generation `Multimedia` and `Telephony` models that
   * support low latency, directs the service to produce results even more quickly than it usually does. Next-generation
   * models produce transcription results faster than previous-generation models. The `low_latency` parameter causes the
   * models to produce results even more quickly, though the results might be less accurate when the parameter is used.
   *
   * The parameter is not available for large speech models and previous-generation `Broadband` and `Narrowband` models.
   * It is available for most next-generation models.
   * * For a list of next-generation models that support low latency, see [Supported next-generation language
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng#models-ng-supported).
   * * For more information about the `low_latency` parameter, see [Low
   * latency](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-interim#low-latency).
   * @param {number} [params.characterInsertionBias] - For large speech models and next-generation models, an indication
   * of whether the service is biased to recognize shorter or longer strings of characters when developing transcription
   * hypotheses. By default, the service is optimized to produce the best balance of strings of different lengths.
   *
   * The default bias is 0.0. The allowable range of values is -1.0 to 1.0.
   * * Negative values bias the service to favor hypotheses with shorter strings of characters.
   * * Positive values bias the service to favor hypotheses with longer strings of characters.
   *
   * As the value approaches -1.0 or 1.0, the impact of the parameter becomes more pronounced. To determine the most
   * effective value for your scenario, start by setting the value of the parameter to a small increment, such as -0.1,
   * -0.05, 0.05, or 0.1, and assess how the value impacts the transcription results. Then experiment with different
   * values as necessary, adjusting the value by small increments.
   *
   * The parameter is not available for previous-generation models.
   *
   * See [Character insertion
   * bias](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#insertion-bias).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.RecognitionJob>>}
   */
  public createJob(
    params: SpeechToTextV1.CreateJobParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.RecognitionJob>> {
    const _params = { ...params };
    const _requiredParams = ['audio'];
    const _validParams = ['audio', 'contentType', 'model', 'callbackUrl', 'events', 'userToken', 'resultsTtl', 'languageCustomizationId', 'acousticCustomizationId', 'baseModelVersion', 'customizationWeight', 'inactivityTimeout', 'keywords', 'keywordsThreshold', 'maxAlternatives', 'wordAlternativesThreshold', 'wordConfidence', 'timestamps', 'profanityFilter', 'smartFormatting', 'smartFormattingVersion', 'speakerLabels', 'grammarName', 'redaction', 'processingMetrics', 'processingMetricsInterval', 'audioMetrics', 'endOfPhraseSilenceTime', 'splitTranscriptAtPhraseEnd', 'speechDetectorSensitivity', 'backgroundAudioSuppression', 'lowLatency', 'characterInsertionBias', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.audio;
    const query = {
      'model': _params.model,
      'callback_url': _params.callbackUrl,
      'events': _params.events,
      'user_token': _params.userToken,
      'results_ttl': _params.resultsTtl,
      'language_customization_id': _params.languageCustomizationId,
      'acoustic_customization_id': _params.acousticCustomizationId,
      'base_model_version': _params.baseModelVersion,
      'customization_weight': _params.customizationWeight,
      'inactivity_timeout': _params.inactivityTimeout,
      'keywords': _params.keywords,
      'keywords_threshold': _params.keywordsThreshold,
      'max_alternatives': _params.maxAlternatives,
      'word_alternatives_threshold': _params.wordAlternativesThreshold,
      'word_confidence': _params.wordConfidence,
      'timestamps': _params.timestamps,
      'profanity_filter': _params.profanityFilter,
      'smart_formatting': _params.smartFormatting,
      'smart_formatting_version': _params.smartFormattingVersion,
      'speaker_labels': _params.speakerLabels,
      'grammar_name': _params.grammarName,
      'redaction': _params.redaction,
      'processing_metrics': _params.processingMetrics,
      'processing_metrics_interval': _params.processingMetricsInterval,
      'audio_metrics': _params.audioMetrics,
      'end_of_phrase_silence_time': _params.endOfPhraseSilenceTime,
      'split_transcript_at_phrase_end': _params.splitTranscriptAtPhraseEnd,
      'speech_detector_sensitivity': _params.speechDetectorSensitivity,
      'background_audio_suppression': _params.backgroundAudioSuppression,
      'low_latency': _params.lowLatency,
      'character_insertion_bias': _params.characterInsertionBias,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'createJob');

    const parameters = {
      options: {
        url: '/v1/recognitions',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Check jobs.
   *
   * Returns the ID and status of the latest 100 outstanding jobs associated with the credentials with which it is
   * called. The method also returns the creation and update times of each job, and, if a job was created with a
   * callback URL and a user token, the user token for the job. To obtain the results for a job whose status is
   * `completed` or not one of the latest 100 outstanding jobs, use the [Check a job[(#checkjob) method. A job and its
   * results remain available until you delete them with the [Delete a job](#deletejob) method or until the job's time
   * to live expires, whichever comes first.
   *
   * **See also:** [Checking the status of the latest
   * jobs](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-async#jobs).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.RecognitionJobs>>}
   */
  public checkJobs(
    params?: SpeechToTextV1.CheckJobsParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.RecognitionJobs>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'checkJobs');

    const parameters = {
      options: {
        url: '/v1/recognitions',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Check a job.
   *
   * Returns information about the specified job. The response always includes the status of the job and its creation
   * and update times. If the status is `completed`, the response includes the results of the recognition request. You
   * must use credentials for the instance of the service that owns a job to list information about it.
   *
   * You can use the method to retrieve the results of any job, regardless of whether it was submitted with a callback
   * URL and the `recognitions.completed_with_results` event, and you can retrieve the results multiple times for as
   * long as they remain available. Use the [Check jobs](#checkjobs) method to request information about the most recent
   * jobs associated with the calling credentials.
   *
   * **See also:** [Checking the status and retrieving the results of a
   * job](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-async#job).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The identifier of the asynchronous job that is to be used for the request. You must
   * make the request with credentials for the instance of the service that owns the job.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.RecognitionJob>>}
   */
  public checkJob(
    params: SpeechToTextV1.CheckJobParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.RecognitionJob>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'checkJob');

    const parameters = {
      options: {
        url: '/v1/recognitions/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a job.
   *
   * Deletes the specified job. You cannot delete a job that the service is actively processing. Once you delete a job,
   * its results are no longer available. The service automatically deletes a job and its results when the time to live
   * for the results expires. You must use credentials for the instance of the service that owns a job to delete it.
   *
   * **See also:** [Deleting a job](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-async#delete-async).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The identifier of the asynchronous job that is to be used for the request. You must
   * make the request with credentials for the instance of the service that owns the job.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public deleteJob(
    params: SpeechToTextV1.DeleteJobParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteJob');

    const parameters = {
      options: {
        url: '/v1/recognitions/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customLanguageModels
   ************************/

  /**
   * Create a custom language model.
   *
   * Creates a new custom language model for a specified base model. The custom language model can be used only with the
   * base model for which it is created. The model is owned by the instance of the service whose credentials are used to
   * create it.
   *
   * You can create a maximum of 1024 custom language models per owning credentials. The service returns an error if you
   * attempt to create more than 1024 models. You do not lose any models, but you cannot create any more until your
   * model count is below the limit.
   *
   * **Important:** Effective **31 July 2023**, all previous-generation models will be removed from the service and the
   * documentation. Most previous-generation models were deprecated on 15 March 2022. You must migrate to the equivalent
   * large speech model or next-generation model by 31 July 2023. For more information, see [Migrating to large speech
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-migrate).
   *
   * **See also:**
   * * [Create a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageCreate#createModel-language)
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support)
   *
   * ### Large speech models and Next-generation models
   *
   *  The service supports large speech models and next-generation `Multimedia` (16 kHz) and `Telephony` (8 kHz) models
   * for many languages. Large speech models and next-generation models have higher throughput than the service's
   * previous generation of `Broadband` and `Narrowband` models. When you use large speech models and next-generation
   * models, the service can return transcriptions more quickly and also provide noticeably better transcription
   * accuracy.
   *
   * You specify a large speech model or next-generation model by using the `model` query parameter, as you do a
   * previous-generation model. Only the next-generation models support the `low_latency` parameter, and all large
   * speech models and next-generation models support the `character_insertion_bias` parameter. These parameters are not
   * available with previous-generation models.
   *
   * Large speech models and next-generation models do not support all of the speech recognition parameters that are
   * available for use with previous-generation models. Next-generation models do not support the following parameters:
   * * `acoustic_customization_id`
   * * `keywords` and `keywords_threshold`
   * * `processing_metrics` and `processing_metrics_interval`
   * * `word_alternatives_threshold`
   *
   * **Important:** Effective **31 July 2023**, all previous-generation models will be removed from the service and the
   * documentation. Most previous-generation models were deprecated on 15 March 2022. You must migrate to the equivalent
   * large speech model or next-generation model by 31 July 2023. For more information, see [Migrating to large speech
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-migrate).
   *
   * **See also:**
   * * [Large speech languages and
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-large-speech-languages)
   * * [Supported features for large speech
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-large-speech-languages#models-lsm-supported-features)
   * * [Next-generation languages and models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng)
   * * [Supported features for next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng#models-ng-features).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - A user-defined name for the new custom language model. Use a localized name that
   * matches the language of the custom model. Use a name that describes the domain of the custom model, such as
   * `Medical custom model` or `Legal custom model`. Use a name that is unique among all custom language models that you
   * own.
   *
   * Include a maximum of 256 characters in the name. Do not use backslashes, slashes, colons, equal signs, ampersands,
   * or question marks in the name.
   * @param {string} params.baseModelName - The name of the base language model that is to be customized by the new
   * custom language model. The new custom model can be used only with the base model that it customizes.
   *
   * To determine whether a base model supports language model customization, use the [Get a model](#getmodel) method
   * and check that the attribute `custom_language_model` is set to `true`. You can also refer to [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   * @param {string} [params.dialect] - The dialect of the specified language that is to be used with the custom
   * language model. _For all languages, it is always safe to omit this field._ The service automatically uses the
   * language identifier from the name of the base model. For example, the service automatically uses `en-US` for all US
   * English models.
   *
   * If you specify the `dialect` for a new custom model, follow these guidelines. _For non-Spanish previous-generation
   * models and for next-generation models,_ you must specify a value that matches the five-character language
   * identifier from the name of the base model. _For Spanish previous-generation models,_ you must specify one of the
   * following values:
   * * `es-ES` for Castilian Spanish (`es-ES` models)
   * * `es-LA` for Latin American Spanish (`es-AR`, `es-CL`, `es-CO`, and `es-PE` models)
   * * `es-US` for Mexican (North American) Spanish (`es-MX` models)
   *
   * All values that you pass for the `dialect` field are case-insensitive.
   * @param {string} [params.description] - A recommended description of the new custom language model. Use a localized
   * description that matches the language of the custom model. Include a maximum of 128 characters in the description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.LanguageModel>>}
   */
  public createLanguageModel(
    params: SpeechToTextV1.CreateLanguageModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.LanguageModel>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'baseModelName'];
    const _validParams = ['name', 'baseModelName', 'dialect', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'base_model_name': _params.baseModelName,
      'dialect': _params.dialect,
      'description': _params.description,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'createLanguageModel');

    const parameters = {
      options: {
        url: '/v1/customizations',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List custom language models.
   *
   * Lists information about all custom language models that are owned by an instance of the service. Use the `language`
   * parameter to see all custom language models for the specified language. Omit the parameter to see all custom
   * language models for all languages. You must use credentials for the instance of the service that owns a model to
   * list information about it.
   *
   * **See also:**
   * * [Listing custom language
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageLanguageModels#listModels-language)
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.language] - The identifier of the language for which custom language or custom acoustic
   * models are to be returned. Specify the five-character language identifier; for example, specify `en-US` to see all
   * custom language or custom acoustic models that are based on US English models. Omit the parameter to see all custom
   * language or custom acoustic models that are owned by the requesting credentials.
   *
   * To determine the languages for which customization is available, see [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.LanguageModels>>}
   */
  public listLanguageModels(
    params?: SpeechToTextV1.ListLanguageModelsParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.LanguageModels>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['language', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'language': _params.language,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'listLanguageModels');

    const parameters = {
      options: {
        url: '/v1/customizations',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a custom language model.
   *
   * Gets information about a specified custom language model. You must use credentials for the instance of the service
   * that owns a model to list information about it.
   *
   * **See also:**
   * * [Listing custom language
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageLanguageModels#listModels-language)
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.LanguageModel>>}
   */
  public getLanguageModel(
    params: SpeechToTextV1.GetLanguageModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.LanguageModel>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'getLanguageModel');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a custom language model.
   *
   * Deletes an existing custom language model. The custom model cannot be deleted if another request, such as adding a
   * corpus or grammar to the model, is currently being processed. You must use credentials for the instance of the
   * service that owns a model to delete it.
   *
   * **See also:**
   * * [Deleting a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageLanguageModels#deleteModel-language)
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public deleteLanguageModel(
    params: SpeechToTextV1.DeleteLanguageModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLanguageModel');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Train a custom language model.
   *
   * Initiates the training of a custom language model with new resources such as corpora, grammars, and custom words.
   * After adding, modifying, or deleting resources for a custom language model, use this method to begin the actual
   * training of the model on the latest data. You can specify whether the custom language model is to be trained with
   * all words from its words resource or only with words that were added or modified by the user directly. You must use
   * credentials for the instance of the service that owns a model to train it.
   *
   * The training method is asynchronous. It can take on the order of minutes to complete depending on the amount of
   * data on which the service is being trained and the current load on the service. The method returns an HTTP 200
   * response code to indicate that the training process has begun.
   *
   * You can monitor the status of the training by using the [Get a custom language model](#getlanguagemodel) method to
   * poll the model's status. Use a loop to check the status every 10 seconds. If you added custom words directly to a
   * custom model that is based on a next-generation model, allow for some minutes of extra training time for the model.
   *
   *
   * The method returns a `LanguageModel` object that includes `status` and `progress` fields. A status of `available`
   * means that the custom model is trained and ready to use. The service cannot accept subsequent training requests or
   * requests to add new resources until the existing request completes.
   *
   * For custom models that are based on improved base language models, training also performs an automatic upgrade to a
   * newer version of the base model. You do not need to use the [Upgrade a custom language
   * model](#upgradelanguagemodel) method to perform the upgrade.
   *
   * **See also:**
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support)
   * * [Train the custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageCreate#trainModel-language)
   * * [Upgrading custom language models that are based on improved next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade#custom-upgrade-language-ng)
   *
   * ### Training failures
   *
   *  Training can fail to start for the following reasons:
   * * The service is currently handling another request for the custom model, such as another training request or a
   * request to add a corpus or grammar to the model.
   * * No training data have been added to the custom model.
   * * The custom model contains one or more invalid corpora, grammars, or words (for example, a custom word has an
   * invalid sounds-like pronunciation). You can correct the invalid resources or set the `strict` parameter to `false`
   * to exclude the invalid resources from the training. The model must contain at least one valid resource for training
   * to succeed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} [params.wordTypeToAdd] - _For custom models that are based on previous-generation models_, the type
   * of words from the custom language model's words resource on which to train the model:
   * * `all` (the default) trains the model on all new words, regardless of whether they were extracted from corpora or
   * grammars or were added or modified by the user.
   * * `user` trains the model only on custom words that were added or modified by the user directly. The model is not
   * trained on new words extracted from corpora or grammars.
   *
   * _For custom models that are based on large speech models and next-generation models_, the service ignores the
   * `word_type_to_add` parameter. The words resource contains only custom words that the user adds or modifies
   * directly, so the parameter is unnecessary.
   * @param {number} [params.customizationWeight] - Specifies a customization weight for the custom language model. The
   * customization weight tells the service how much weight to give to words from the custom language model compared to
   * those from the base model for speech recognition. Specify a value between 0.0 and 1.0. The default value is:
   * * 0.5 for large speech models
   * * 0.3 for previous-generation models
   * * 0.2 for most next-generation models
   * * 0.1 for next-generation English and Japanese models
   *
   * The default value yields the best performance in general. Assign a higher value if your audio makes frequent use of
   * OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy of
   * phrases from the custom model's domain, but it can negatively affect performance on non-domain phrases.
   *
   * The value that you assign is used for all recognition requests that use the model. You can override it for any
   * recognition request by specifying a customization weight for that request.
   *
   * See [Using customization
   * weight](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageUse#weight).
   * @param {boolean} [params.strict] - If `false`, allows training of the custom language model to proceed as long as
   * the model contains at least one valid resource. The method returns an array of `TrainingWarning` objects that lists
   * any invalid resources. By default (`true`), training of a custom language model fails (status code 400) if the
   * model contains one or more invalid resources (corpus files, grammar files, or custom words).
   * @param {boolean} [params.force] - If `true`, forces the training of the custom language model regardless of whether
   * it contains any changes (is in the `ready` or `available` state). By default (`false`), the model must be in the
   * `ready` state to be trained. You can use the parameter to train and thus upgrade a custom model that is based on an
   * improved next-generation model. *The parameter is available only for IBM Cloud, not for IBM Cloud Pak for Data.*
   *
   * See [Upgrading a custom language model based on an improved next-generation
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade#custom-upgrade-language-ng).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.TrainingResponse>>}
   */
  public trainLanguageModel(
    params: SpeechToTextV1.TrainLanguageModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.TrainingResponse>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'wordTypeToAdd', 'customizationWeight', 'strict', 'force', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'word_type_to_add': _params.wordTypeToAdd,
      'customization_weight': _params.customizationWeight,
      'strict': _params.strict,
      'force': _params.force,
    };

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'trainLanguageModel');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/train',
        method: 'POST',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Reset a custom language model.
   *
   * Resets a custom language model by removing all corpora, grammars, and words from the model. Resetting a custom
   * language model initializes the model to its state when it was first created. Metadata such as the name and language
   * of the model are preserved, but the model's words resource is removed and must be re-created. You must use
   * credentials for the instance of the service that owns a model to reset it.
   *
   * **See also:**
   * * [Resetting a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageLanguageModels#resetModel-language)
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public resetLanguageModel(
    params: SpeechToTextV1.ResetLanguageModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'resetLanguageModel');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/reset',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Upgrade a custom language model.
   *
   * Initiates the upgrade of a custom language model to the latest version of its base language model. The upgrade
   * method is asynchronous. It can take on the order of minutes to complete depending on the amount of data in the
   * custom model and the current load on the service. A custom model must be in the `ready` or `available` state to be
   * upgraded. You must use credentials for the instance of the service that owns a model to upgrade it.
   *
   * The method returns an HTTP 200 response code to indicate that the upgrade process has begun successfully. You can
   * monitor the status of the upgrade by using the [Get a custom language model](#getlanguagemodel) method to poll the
   * model's status. The method returns a `LanguageModel` object that includes `status` and `progress` fields. Use a
   * loop to check the status every 10 seconds.
   *
   * While it is being upgraded, the custom model has the status `upgrading`. When the upgrade is complete, the model
   * resumes the status that it had prior to upgrade. The service cannot accept subsequent requests for the model until
   * the upgrade completes.
   *
   * For custom models that are based on improved base language models, the [Train a custom language
   * model](#trainlanguagemodel) method also performs an automatic upgrade to a newer version of the base model. You do
   * not need to use the upgrade method.
   *
   * **See also:**
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support)
   * * [Upgrading a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade#custom-upgrade-language)
   * * [Upgrading custom language models that are based on improved next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade#custom-upgrade-language-ng).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public upgradeLanguageModel(
    params: SpeechToTextV1.UpgradeLanguageModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'upgradeLanguageModel');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/upgrade_model',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customCorpora
   ************************/

  /**
   * List corpora.
   *
   * Lists information about all corpora from a custom language model. The information includes the name, status, and
   * total number of words for each corpus. _For custom models that are based on previous-generation models_, it also
   * includes the number of out-of-vocabulary (OOV) words from the corpus. You must use credentials for the instance of
   * the service that owns a model to list its corpora.
   *
   * **See also:** [Listing corpora for a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageCorpora#listCorpora).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.Corpora>>}
   */
  public listCorpora(
    params: SpeechToTextV1.ListCorporaParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.Corpora>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'listCorpora');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/corpora',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add a corpus.
   *
   * Adds a single corpus text file of new training data to a custom language model. Use multiple requests to submit
   * multiple corpus text files. You must use credentials for the instance of the service that owns a model to add a
   * corpus to it. Adding a corpus does not affect the custom language model until you train the model for the new data
   * by using the [Train a custom language model](#trainlanguagemodel) method.
   *
   * Submit a plain text file that contains sample sentences from the domain of interest to enable the service to parse
   * the words in context. The more sentences you add that represent the context in which speakers use words from the
   * domain, the better the service's recognition accuracy.
   *
   * The call returns an HTTP 201 response code if the corpus is valid. The service then asynchronously processes and
   * automatically extracts data from the contents of the corpus. This operation can take on the order of minutes to
   * complete depending on the current load on the service, the total number of words in the corpus, and, _for custom
   * models that are based on previous-generation models_, the number of new (out-of-vocabulary) words in the corpus.
   * You cannot submit requests to add additional resources to the custom model or to train the model until the
   * service's analysis of the corpus for the current request completes. Use the [Get a corpus](#getcorpus) method to
   * check the status of the analysis.
   *
   * _For custom models that are based on large speech models_, the service parses and extracts word sequences from one
   * or multiple corpora files. The characters help the service learn and predict character sequences from audio.
   *
   * _For custom models that are based on previous-generation models_, the service auto-populates the model's words
   * resource with words from the corpus that are not found in its base vocabulary. These words are referred to as
   * out-of-vocabulary (OOV) words. After adding a corpus, you must validate the words resource to ensure that each OOV
   * word's definition is complete and valid. You can use the [List custom words](#listwords) method to examine the
   * words resource. You can use other words method to eliminate typos and modify how words are pronounced and displayed
   * as needed.
   *
   * To add a corpus file that has the same name as an existing corpus, set the `allow_overwrite` parameter to `true`;
   * otherwise, the request fails. Overwriting an existing corpus causes the service to process the corpus text file and
   * extract its data anew. _For a custom model that is based on a previous-generation model_, the service first removes
   * any OOV words that are associated with the existing corpus from the model's words resource unless they were also
   * added by another corpus or grammar, or they have been modified in some way with the [Add custom words](#addwords)
   * or [Add a custom word](#addword) method.
   *
   * The service limits the overall amount of data that you can add to a custom model to a maximum of 10 million total
   * words from all sources combined. _For a custom model that is based on a previous-generation model_, you can add no
   * more than 90 thousand custom (OOV) words to a model. This includes words that the service extracts from corpora and
   * grammars, and words that you add directly.
   *
   * **See also:**
   * * [Add a corpus to the custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageCreate#addCorpus)
   * * [Working with corpora for previous-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#workingCorpora)
   * * [Working with corpora for large speech models and next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords-ng#workingCorpora-ng)
   * * [Validating a words resource for previous-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#validateModel)
   * * [Validating a words resource for large speech models and next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords-ng#validateModel-ng).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.corpusName - The name of the new corpus for the custom language model. Use a localized name
   * that matches the language of the custom model and reflects the contents of the corpus.
   * * Include a maximum of 128 characters in the name.
   * * Do not use characters that need to be URL-encoded. For example, do not use spaces, slashes, backslashes, colons,
   * ampersands, double quotes, plus signs, equals signs, questions marks, and so on in the name. (The service does not
   * prevent the use of these characters. But because they must be URL-encoded wherever used, their use is strongly
   * discouraged.)
   * * Do not use the name of an existing corpus or grammar that is already defined for the custom model.
   * * Do not use the name `user`, which is reserved by the service to denote custom words that are added or modified by
   * the user.
   * * Do not use the name `base_lm` or `default_lm`. Both names are reserved for future use by the service.
   * @param {NodeJS.ReadableStream | Buffer} params.corpusFile - A plain text file that contains the training data for
   * the corpus. Encode the file in UTF-8 if it contains non-ASCII characters; the service assumes UTF-8 encoding if it
   * encounters non-ASCII characters.
   *
   * Make sure that you know the character encoding of the file. You must use that same encoding when working with the
   * words in the custom language model. For more information, see [Character encoding for custom
   * words](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageWords#charEncoding).
   *
   * With the `curl` command, use the `--data-binary` option to upload the file for the request.
   * @param {boolean} [params.allowOverwrite] - If `true`, the specified corpus overwrites an existing corpus with the
   * same name. If `false`, the request fails if a corpus with the same name already exists. The parameter has no effect
   * if a corpus with the same name does not already exist.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public addCorpus(
    params: SpeechToTextV1.AddCorpusParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'corpusName', 'corpusFile'];
    const _validParams = ['customizationId', 'corpusName', 'corpusFile', 'allowOverwrite', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const formData = {
      'corpus_file': {
        data: _params.corpusFile,
        contentType: 'text/plain',
      },
    };

    const query = {
      'allow_overwrite': _params.allowOverwrite,
    };

    const path = {
      'customization_id': _params.customizationId,
      'corpus_name': _params.corpusName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'addCorpus');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/corpora/{corpus_name}',
        method: 'POST',
        qs: query,
        path,
        formData
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a corpus.
   *
   * Gets information about a corpus from a custom language model. The information includes the name, status, and total
   * number of words for the corpus. _For custom models that are based on previous-generation models_, it also includes
   * the number of out-of-vocabulary (OOV) words from the corpus. You must use credentials for the instance of the
   * service that owns a model to list its corpora.
   *
   * **See also:** [Listing corpora for a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageCorpora#listCorpora).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.corpusName - The name of the corpus for the custom language model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.Corpus>>}
   */
  public getCorpus(
    params: SpeechToTextV1.GetCorpusParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.Corpus>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'corpusName'];
    const _validParams = ['customizationId', 'corpusName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
      'corpus_name': _params.corpusName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'getCorpus');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/corpora/{corpus_name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a corpus.
   *
   * Deletes an existing corpus from a custom language model. Removing a corpus does not affect the custom model until
   * you train the model with the [Train a custom language model](#trainlanguagemodel) method. You must use credentials
   * for the instance of the service that owns a model to delete its corpora.
   *
   * _For custom models that are based on previous-generation models_, the service removes any out-of-vocabulary (OOV)
   * words that are associated with the corpus from the custom model's words resource unless they were also added by
   * another corpus or grammar, or they were modified in some way with the [Add custom words](#addwords) or [Add a
   * custom word](#addword) method.
   *
   *
   *
   * **See also:** [Deleting a corpus from a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageCorpora#deleteCorpus).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.corpusName - The name of the corpus for the custom language model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public deleteCorpus(
    params: SpeechToTextV1.DeleteCorpusParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'corpusName'];
    const _validParams = ['customizationId', 'corpusName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
      'corpus_name': _params.corpusName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCorpus');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/corpora/{corpus_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customWords
   ************************/

  /**
   * List custom words.
   *
   * Lists information about custom words from a custom language model. You can list all words from the custom model's
   * words resource, only custom words that were added or modified by the user, or, _for a custom model that is based on
   * a previous-generation model_, only out-of-vocabulary (OOV) words that were extracted from corpora or are recognized
   * by grammars. _For a custom model that is based on a next-generation model_, you can list all words or only those
   * words that were added directly by a user, which return the same results.
   *
   * You can also indicate the order in which the service is to return words; by default, the service lists words in
   * ascending alphabetical order. You must use credentials for the instance of the service that owns a model to list
   * information about its words.
   *
   * **See also:** [Listing words from a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageWords#listWords).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} [params.wordType] - The type of words to be listed from the custom language model's words resource:
   * * `all` (the default) shows all words.
   * * `user` shows only custom words that were added or modified by the user directly.
   * * `corpora` shows only OOV that were extracted from corpora.
   * * `grammars` shows only OOV words that are recognized by grammars.
   *
   * _For a custom model that is based on a next-generation model_, only `all` and `user` apply. Both options return the
   * same results. Words from other sources are not added to custom models that are based on next-generation models.
   * @param {string} [params.sort] - Indicates the order in which the words are to be listed, `alphabetical` or by
   * `count`. You can prepend an optional `+` or `-` to an argument to indicate whether the results are to be sorted in
   * ascending or descending order. By default, words are sorted in ascending alphabetical order. For alphabetical
   * ordering, the lexicographical precedence is numeric values, uppercase letters, and lowercase letters. For count
   * ordering, values with the same count are ordered alphabetically. With the `curl` command, URL-encode the `+` symbol
   * as `%2B`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.Words>>}
   */
  public listWords(
    params: SpeechToTextV1.ListWordsParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.Words>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'wordType', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'word_type': _params.wordType,
      'sort': _params.sort,
    };

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'listWords');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add custom words.
   *
   * Adds one or more custom words to a custom language model. You can use this method to add words or to modify
   * existing words in a custom model's words resource. _For custom models that are based on previous-generation
   * models_, the service populates the words resource for a custom model with out-of-vocabulary (OOV) words from each
   * corpus or grammar that is added to the model. You can use this method to modify OOV words in the model's words
   * resource.
   *
   * _For a custom model that is based on a previous-generation model_, the words resource for a model can contain a
   * maximum of 90 thousand custom (OOV) words. This includes words that the service extracts from corpora and grammars
   * and words that you add directly.
   *
   * You must use credentials for the instance of the service that owns a model to add or modify custom words for the
   * model. Adding or modifying custom words does not affect the custom model until you train the model for the new data
   * by using the [Train a custom language model](#trainlanguagemodel) method.
   *
   * You add custom words by providing a `CustomWords` object, which is an array of `CustomWord` objects, one per word.
   * Use the object's `word` parameter to identify the word that is to be added. You can also provide one or both of the
   * optional `display_as` or `sounds_like` fields for each word.
   * * The `display_as` field provides a different way of spelling the word in a transcript. Use the parameter when you
   * want the word to appear different from its usual representation or from its spelling in training data. For example,
   * you might indicate that the word `IBM` is to be displayed as `IBM&trade;`.
   * * The `sounds_like` field provides an array of one or more pronunciations for the word. Use the parameter to
   * specify how the word can be pronounced by users. Use the parameter for words that are difficult to pronounce,
   * foreign words, acronyms, and so on. For example, you might specify that the word `IEEE` can sound like `I triple
   * E`. You can specify a maximum of five sounds-like pronunciations for a word. _For a custom model that is based on a
   * previous-generation model_, if you omit the `sounds_like` field, the service attempts to set the field to its
   * pronunciation of the word. It cannot generate a pronunciation for all words, so you must review the word's
   * definition to ensure that it is complete and valid.
   * * The `mapping_only` field provides parameter for custom words. You can use the 'mapping_only' key in custom words
   * as a form of post processing. This key parameter has a boolean value to determine whether 'sounds_like' (for
   * non-Japanese models) or word (for Japanese) is not used for the model fine-tuning, but for the replacement for
   * 'display_as'. This feature helps you when you use custom words exclusively to map 'sounds_like' (or word) to
   * 'display_as' value. When you use custom words solely for post-processing purposes that does not need fine-tuning.
   *
   * If you add a custom word that already exists in the words resource for the custom model, the new definition
   * overwrites the existing data for the word. If the service encounters an error with the input data, it returns a
   * failure code and does not add any of the words to the words resource.
   *
   * The call returns an HTTP 201 response code if the input data is valid. It then asynchronously processes the words
   * to add them to the model's words resource. The time that it takes for the analysis to complete depends on the
   * number of new words that you add but is generally faster than adding a corpus or grammar.
   *
   * You can monitor the status of the request by using the [Get a custom language model](#getlanguagemodel) method to
   * poll the model's status. Use a loop to check the status every 10 seconds. The method returns a `Customization`
   * object that includes a `status` field. A status of `ready` means that the words have been added to the custom
   * model. The service cannot accept requests to add new data or to train the model until the existing request
   * completes.
   *
   * You can use the [List custom words](#listwords) or [Get a custom word](#getword) method to review the words that
   * you add. Words with an invalid `sounds_like` field include an `error` field that describes the problem. You can use
   * other words-related methods to correct errors, eliminate typos, and modify how words are pronounced as needed.
   *
   * **See also:**
   * * [Add words to the custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageCreate#addWords)
   * * [Working with custom words for previous-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#workingWords)
   * * [Working with custom words for large speech models and next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords-ng#workingWords-ng)
   * * [Validating a words resource for previous-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#validateModel)
   * * [Validating a words resource for large speech models and next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords-ng#validateModel-ng).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {CustomWord[]} params.words - An array of `CustomWord` objects that provides information about each custom
   * word that is to be added to or updated in the custom language model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public addWords(
    params: SpeechToTextV1.AddWordsParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'words'];
    const _validParams = ['customizationId', 'words', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'words': _params.words,
    };

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'addWords');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add a custom word.
   *
   * Adds a custom word to a custom language model. You can use this method to add a word or to modify an existing word
   * in the words resource. _For custom models that are based on previous-generation models_, the service populates the
   * words resource for a custom model with out-of-vocabulary (OOV) words from each corpus or grammar that is added to
   * the model. You can use this method to modify OOV words in the model's words resource.
   *
   * _For a custom model that is based on a previous-generation models_, the words resource for a model can contain a
   * maximum of 90 thousand custom (OOV) words. This includes words that the service extracts from corpora and grammars
   * and words that you add directly.
   *
   * You must use credentials for the instance of the service that owns a model to add or modify a custom word for the
   * model. Adding or modifying a custom word does not affect the custom model until you train the model for the new
   * data by using the [Train a custom language model](#trainlanguagemodel) method.
   *
   * Use the `word_name` parameter to specify the custom word that is to be added or modified. Use the `CustomWord`
   * object to provide one or both of the optional `display_as` or `sounds_like` fields for the word.
   * * The `display_as` field provides a different way of spelling the word in a transcript. Use the parameter when you
   * want the word to appear different from its usual representation or from its spelling in training data. For example,
   * you might indicate that the word `IBM` is to be displayed as `IBM&trade;`.
   * * The `sounds_like` field provides an array of one or more pronunciations for the word. Use the parameter to
   * specify how the word can be pronounced by users. Use the parameter for words that are difficult to pronounce,
   * foreign words, acronyms, and so on. For example, you might specify that the word `IEEE` can sound like `i triple
   * e`. You can specify a maximum of five sounds-like pronunciations for a word. _For custom models that are based on
   * previous-generation models_, if you omit the `sounds_like` field, the service attempts to set the field to its
   * pronunciation of the word. It cannot generate a pronunciation for all words, so you must review the word's
   * definition to ensure that it is complete and valid.
   *
   * If you add a custom word that already exists in the words resource for the custom model, the new definition
   * overwrites the existing data for the word. If the service encounters an error, it does not add the word to the
   * words resource. Use the [Get a custom word](#getword) method to review the word that you add.
   *
   * **See also:**
   * * [Add words to the custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageCreate#addWords)
   * * [Working with custom words for previous-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#workingWords)
   * * [Working with custom words for large speech models and next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords-ng#workingWords-ng)
   * * [Validating a words resource for previous-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#validateModel)
   * * [Validating a words resource for large speech models and next-generation
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords-ng#validateModel-ng).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.wordName - The custom word that is to be added to or updated in the custom language model.
   * Do not use characters that need to be URL-encoded, for example, spaces, slashes, backslashes, colons, ampersands,
   * double quotes, plus signs, equals signs, or question marks. Use a `-` (dash) or `_` (underscore) to connect the
   * tokens of compound words. URL-encode the word if it includes non-ASCII characters. For more information, see
   * [Character encoding](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#charEncoding).
   * @param {string} [params.word] - For the [Add custom words](#addwords) method, you must specify the custom word that
   * is to be added to or updated in the custom model. Do not use characters that need to be URL-encoded, for example,
   * spaces, slashes, backslashes, colons, ampersands, double quotes, plus signs, equals signs, or question marks. Use a
   * `-` (dash) or `_` (underscore) to connect the tokens of compound words. A Japanese custom word can include at most
   * 25 characters, not including leading or trailing spaces.
   *
   * Omit this parameter for the [Add a custom word](#addword) method.
   * @param {string[]} [params.mappingOnly] - Parameter for custom words. You can use the 'mapping_only' key in custom
   * words as a form of post processing. This key parameter has a boolean value to determine whether 'sounds_like' (for
   * non-Japanese models) or word (for Japanese) is not used for the model fine-tuning, but for the replacement for
   * 'display_as'. This feature helps you when you use custom words exclusively to map 'sounds_like' (or word) to
   * 'display_as' value. When you use custom words solely for post-processing purposes that does not need fine-tuning.
   * @param {string[]} [params.soundsLike] - As array of sounds-like pronunciations for the custom word. Specify how
   * words that are difficult to pronounce, foreign words, acronyms, and so on can be pronounced by users.
   * * _For custom models that are based on previous-generation models_, for a word that is not in the service's base
   * vocabulary, omit the parameter to have the service automatically generate a sounds-like pronunciation for the word.
   * * For a word that is in the service's base vocabulary, use the parameter to specify additional pronunciations for
   * the word. You cannot override the default pronunciation of a word; pronunciations you add augment the pronunciation
   * from the base vocabulary.
   *
   * A word can have at most five sounds-like pronunciations. A pronunciation can include at most 40 characters, not
   * including leading or trailing spaces. A Japanese pronunciation can include at most 25 characters, not including
   * leading or trailing spaces.
   * @param {string} [params.displayAs] - An alternative spelling for the custom word when it appears in a transcript.
   * Use the parameter when you want the word to have a spelling that is different from its usual representation or from
   * its spelling in corpora training data.
   *
   * _For custom models that are based on next-generation models_, the service uses the spelling of the word as the
   * display-as value if you omit the field.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public addWord(
    params: SpeechToTextV1.AddWordParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'wordName'];
    const _validParams = ['customizationId', 'wordName', 'word', 'mappingOnly', 'soundsLike', 'displayAs', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'word': _params.word,
      'mapping_only': _params.mappingOnly,
      'sounds_like': _params.soundsLike,
      'display_as': _params.displayAs,
    };

    const path = {
      'customization_id': _params.customizationId,
      'word_name': _params.wordName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'addWord');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word_name}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a custom word.
   *
   * Gets information about a custom word from a custom language model. You must use credentials for the instance of the
   * service that owns a model to list information about its words.
   *
   * **See also:** [Listing words from a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageWords#listWords).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.wordName - The custom word that is to be read from the custom language model. URL-encode the
   * word if it includes non-ASCII characters. For more information, see [Character
   * encoding](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#charEncoding).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.Word>>}
   */
  public getWord(
    params: SpeechToTextV1.GetWordParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.Word>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'wordName'];
    const _validParams = ['customizationId', 'wordName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
      'word_name': _params.wordName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'getWord');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word_name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a custom word.
   *
   * Deletes a custom word from a custom language model. You can remove any word that you added to the custom model's
   * words resource via any means. However, if the word also exists in the service's base vocabulary, the service
   * removes the word only from the words resource; the word remains in the base vocabulary. Removing a custom word does
   * not affect the custom model until you train the model with the [Train a custom language model](#trainlanguagemodel)
   * method. You must use credentials for the instance of the service that owns a model to delete its words.
   *
   * **See also:** [Deleting a word from a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageWords#deleteWord).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.wordName - The custom word that is to be deleted from the custom language model. URL-encode
   * the word if it includes non-ASCII characters. For more information, see [Character
   * encoding](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#charEncoding).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public deleteWord(
    params: SpeechToTextV1.DeleteWordParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'wordName'];
    const _validParams = ['customizationId', 'wordName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
      'word_name': _params.wordName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteWord');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customGrammars
   ************************/

  /**
   * List grammars.
   *
   * Lists information about all grammars from a custom language model. For each grammar, the information includes the
   * name, status, and (for grammars that are based on previous-generation models) the total number of out-of-vocabulary
   * (OOV) words. You must use credentials for the instance of the service that owns a model to list its grammars.
   *
   * **See also:**
   * * [Listing grammars from a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageGrammars#listGrammars)
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.Grammars>>}
   */
  public listGrammars(
    params: SpeechToTextV1.ListGrammarsParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.Grammars>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'listGrammars');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/grammars',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add a grammar.
   *
   * Adds a single grammar file to a custom language model. Submit a plain text file in UTF-8 format that defines the
   * grammar. Use multiple requests to submit multiple grammar files. You must use credentials for the instance of the
   * service that owns a model to add a grammar to it. Adding a grammar does not affect the custom language model until
   * you train the model for the new data by using the [Train a custom language model](#trainlanguagemodel) method.
   *
   * The call returns an HTTP 201 response code if the grammar is valid. The service then asynchronously processes the
   * contents of the grammar and automatically extracts new words that it finds. This operation can take a few seconds
   * or minutes to complete depending on the size and complexity of the grammar, as well as the current load on the
   * service. You cannot submit requests to add additional resources to the custom model or to train the model until the
   * service's analysis of the grammar for the current request completes. Use the [Get a grammar](#getgrammar) method to
   * check the status of the analysis.
   *
   * _For grammars that are based on previous-generation models,_ the service populates the model's words resource with
   * any word that is recognized by the grammar that is not found in the model's base vocabulary. These are referred to
   * as out-of-vocabulary (OOV) words. You can use the [List custom words](#listwords) method to examine the words
   * resource and use other words-related methods to eliminate typos and modify how words are pronounced as needed. _For
   * grammars that are based on next-generation models,_ the service extracts no OOV words from the grammars.
   *
   * To add a grammar that has the same name as an existing grammar, set the `allow_overwrite` parameter to `true`;
   * otherwise, the request fails. Overwriting an existing grammar causes the service to process the grammar file and
   * extract OOV words anew. Before doing so, it removes any OOV words associated with the existing grammar from the
   * model's words resource unless they were also added by another resource or they have been modified in some way with
   * the [Add custom words](#addwords) or [Add a custom word](#addword) method.
   *
   * _For grammars that are based on previous-generation models,_ the service limits the overall amount of data that you
   * can add to a custom model to a maximum of 10 million total words from all sources combined. Also, you can add no
   * more than 90 thousand OOV words to a model. This includes words that the service extracts from corpora and grammars
   * and words that you add directly.
   *
   * **See also:**
   * * [Understanding
   * grammars](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-grammarUnderstand#grammarUnderstand)
   * * [Add a grammar to the custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-grammarAdd#addGrammar)
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.grammarName - The name of the new grammar for the custom language model. Use a localized
   * name that matches the language of the custom model and reflects the contents of the grammar.
   * * Include a maximum of 128 characters in the name.
   * * Do not use characters that need to be URL-encoded. For example, do not use spaces, slashes, backslashes, colons,
   * ampersands, double quotes, plus signs, equals signs, questions marks, and so on in the name. (The service does not
   * prevent the use of these characters. But because they must be URL-encoded wherever used, their use is strongly
   * discouraged.)
   * * Do not use the name of an existing grammar or corpus that is already defined for the custom model.
   * * Do not use the name `user`, which is reserved by the service to denote custom words that are added or modified by
   * the user.
   * * Do not use the name `base_lm` or `default_lm`. Both names are reserved for future use by the service.
   * @param {NodeJS.ReadableStream | Buffer} params.grammarFile - A plain text file that contains the grammar in the
   * format specified by the `Content-Type` header. Encode the file in UTF-8 (ASCII is a subset of UTF-8). Using any
   * other encoding can lead to issues when compiling the grammar or to unexpected results in decoding. The service
   * ignores an encoding that is specified in the header of the grammar.
   *
   * With the `curl` command, use the `--data-binary` option to upload the file for the request.
   * @param {string} params.contentType - The format (MIME type) of the grammar file:
   * * `application/srgs` for Augmented Backus-Naur Form (ABNF), which uses a plain-text representation that is similar
   * to traditional BNF grammars.
   * * `application/srgs+xml` for XML Form, which uses XML elements to represent the grammar.
   * @param {boolean} [params.allowOverwrite] - If `true`, the specified grammar overwrites an existing grammar with the
   * same name. If `false`, the request fails if a grammar with the same name already exists. The parameter has no
   * effect if a grammar with the same name does not already exist.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public addGrammar(
    params: SpeechToTextV1.AddGrammarParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'grammarName', 'grammarFile', 'contentType'];
    const _validParams = ['customizationId', 'grammarName', 'grammarFile', 'contentType', 'allowOverwrite', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.grammarFile;
    const query = {
      'allow_overwrite': _params.allowOverwrite,
    };

    const path = {
      'customization_id': _params.customizationId,
      'grammar_name': _params.grammarName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'addGrammar');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/grammars/{grammar_name}',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a grammar.
   *
   * Gets information about a grammar from a custom language model. For each grammar, the information includes the name,
   * status, and (for grammars that are based on previous-generation models) the total number of out-of-vocabulary (OOV)
   * words. You must use credentials for the instance of the service that owns a model to list its grammars.
   *
   * **See also:**
   * * [Listing grammars from a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageGrammars#listGrammars)
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.grammarName - The name of the grammar for the custom language model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.Grammar>>}
   */
  public getGrammar(
    params: SpeechToTextV1.GetGrammarParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.Grammar>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'grammarName'];
    const _validParams = ['customizationId', 'grammarName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
      'grammar_name': _params.grammarName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'getGrammar');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/grammars/{grammar_name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a grammar.
   *
   * Deletes an existing grammar from a custom language model. _For grammars that are based on previous-generation
   * models,_ the service removes any out-of-vocabulary (OOV) words associated with the grammar from the custom model's
   * words resource unless they were also added by another resource or they were modified in some way with the [Add
   * custom words](#addwords) or [Add a custom word](#addword) method. Removing a grammar does not affect the custom
   * model until you train the model with the [Train a custom language model](#trainlanguagemodel) method. You must use
   * credentials for the instance of the service that owns a model to delete its grammar.
   *
   * **See also:**
   * * [Deleting a grammar from a custom language
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageGrammars#deleteGrammar)
   * * [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom language model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.grammarName - The name of the grammar for the custom language model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public deleteGrammar(
    params: SpeechToTextV1.DeleteGrammarParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'grammarName'];
    const _validParams = ['customizationId', 'grammarName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
      'grammar_name': _params.grammarName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteGrammar');

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/grammars/{grammar_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customAcousticModels
   ************************/

  /**
   * Create a custom acoustic model.
   *
   * Creates a new custom acoustic model for a specified base model. The custom acoustic model can be used only with the
   * base model for which it is created. The model is owned by the instance of the service whose credentials are used to
   * create it.
   *
   * You can create a maximum of 1024 custom acoustic models per owning credentials. The service returns an error if you
   * attempt to create more than 1024 models. You do not lose any models, but you cannot create any more until your
   * model count is below the limit.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **Important:** Effective **31 July 2023**, all previous-generation models will be removed from the service and the
   * documentation. Most previous-generation models were deprecated on 15 March 2022. You must migrate to the equivalent
   * large speech model or next-generation model by 31 July 2023. For more information, see [Migrating to large speech
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-migrate).
   *
   * **See also:** [Create a custom acoustic
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-acoustic#createModel-acoustic).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - A user-defined name for the new custom acoustic model. Use a localized name that
   * matches the language of the custom model. Use a name that describes the acoustic environment of the custom model,
   * such as `Mobile custom model` or `Noisy car custom model`. Use a name that is unique among all custom acoustic
   * models that you own.
   *
   * Include a maximum of 256 characters in the name. Do not use backslashes, slashes, colons, equal signs, ampersands,
   * or question marks in the name.
   * @param {string} params.baseModelName - The name of the base language model that is to be customized by the new
   * custom acoustic model. The new custom model can be used only with the base model that it customizes.
   *
   * To determine whether a base model supports acoustic model customization, refer to [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   * @param {string} [params.description] - A recommended description of the new custom acoustic model. Use a localized
   * description that matches the language of the custom model. Include a maximum of 128 characters in the description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.AcousticModel>>}
   */
  public createAcousticModel(
    params: SpeechToTextV1.CreateAcousticModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.AcousticModel>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'baseModelName'];
    const _validParams = ['name', 'baseModelName', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'base_model_name': _params.baseModelName,
      'description': _params.description,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'createAcousticModel');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List custom acoustic models.
   *
   * Lists information about all custom acoustic models that are owned by an instance of the service. Use the `language`
   * parameter to see all custom acoustic models for the specified language. Omit the parameter to see all custom
   * acoustic models for all languages. You must use credentials for the instance of the service that owns a model to
   * list information about it.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **See also:** [Listing custom acoustic
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageAcousticModels#listModels-acoustic).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.language] - The identifier of the language for which custom language or custom acoustic
   * models are to be returned. Specify the five-character language identifier; for example, specify `en-US` to see all
   * custom language or custom acoustic models that are based on US English models. Omit the parameter to see all custom
   * language or custom acoustic models that are owned by the requesting credentials.
   *
   * To determine the languages for which customization is available, see [Language support for
   * customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.AcousticModels>>}
   */
  public listAcousticModels(
    params?: SpeechToTextV1.ListAcousticModelsParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.AcousticModels>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['language', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'language': _params.language,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'listAcousticModels');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a custom acoustic model.
   *
   * Gets information about a specified custom acoustic model. You must use credentials for the instance of the service
   * that owns a model to list information about it.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **See also:** [Listing custom acoustic
   * models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageAcousticModels#listModels-acoustic).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom acoustic model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.AcousticModel>>}
   */
  public getAcousticModel(
    params: SpeechToTextV1.GetAcousticModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.AcousticModel>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'getAcousticModel');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a custom acoustic model.
   *
   * Deletes an existing custom acoustic model. The custom model cannot be deleted if another request, such as adding an
   * audio resource to the model, is currently being processed. You must use credentials for the instance of the service
   * that owns a model to delete it.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **See also:** [Deleting a custom acoustic
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageAcousticModels#deleteModel-acoustic).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom acoustic model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public deleteAcousticModel(
    params: SpeechToTextV1.DeleteAcousticModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteAcousticModel');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Train a custom acoustic model.
   *
   * Initiates the training of a custom acoustic model with new or changed audio resources. After adding or deleting
   * audio resources for a custom acoustic model, use this method to begin the actual training of the model on the
   * latest audio data. The custom acoustic model does not reflect its changed data until you train it. You must use
   * credentials for the instance of the service that owns a model to train it.
   *
   * The training method is asynchronous. Training time depends on the cumulative amount of audio data that the custom
   * acoustic model contains and the current load on the service. When you train or retrain a model, the service uses
   * all of the model's audio data in the training. Training a custom acoustic model takes approximately as long as the
   * length of its cumulative audio data. For example, it takes approximately 2 hours to train a model that contains a
   * total of 2 hours of audio. The method returns an HTTP 200 response code to indicate that the training process has
   * begun.
   *
   * You can monitor the status of the training by using the [Get a custom acoustic model](#getacousticmodel) method to
   * poll the model's status. Use a loop to check the status once a minute. The method returns an `AcousticModel` object
   * that includes `status` and `progress` fields. A status of `available` indicates that the custom model is trained
   * and ready to use. The service cannot train a model while it is handling another request for the model. The service
   * cannot accept subsequent training requests, or requests to add new audio resources, until the existing training
   * request completes.
   *
   * You can use the optional `custom_language_model_id` parameter to specify the GUID of a separately created custom
   * language model that is to be used during training. Train with a custom language model if you have verbatim
   * transcriptions of the audio files that you have added to the custom model or you have either corpora (text files)
   * or a list of words that are relevant to the contents of the audio files. For training to succeed, both of the
   * custom models must be based on the same version of the same base model, and the custom language model must be fully
   * trained and available.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **See also:**
   * * [Train the custom acoustic
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-acoustic#trainModel-acoustic)
   * * [Using custom acoustic and custom language models
   * together](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-useBoth#useBoth)
   *
   * ### Training failures
   *
   *  Training can fail to start for the following reasons:
   * * The service is currently handling another request for the custom model, such as another training request or a
   * request to add audio resources to the model.
   * * The custom model contains less than 10 minutes of audio that includes speech, not silence.
   * * The custom model contains more than 50 hours of audio (for IBM Cloud) or more that 200 hours of audio (for IBM
   * Cloud Pak for Data). **Note:** For IBM Cloud, the maximum hours of audio for a custom acoustic model was reduced
   * from 200 to 50 hours in August and September 2022. For more information, see [Maximum hours of
   * audio](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-audioResources#audioMaximum).
   * * You passed a custom language model with the `custom_language_model_id` query parameter that is not in the
   * available state. A custom language model must be fully trained and available to be used to train a custom acoustic
   * model.
   * * You passed an incompatible custom language model with the `custom_language_model_id` query parameter. Both custom
   * models must be based on the same version of the same base model.
   * * The custom model contains one or more invalid audio resources. You can correct the invalid audio resources or set
   * the `strict` parameter to `false` to exclude the invalid resources from the training. The model must contain at
   * least one valid resource for training to succeed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom acoustic model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} [params.customLanguageModelId] - The customization ID (GUID) of a custom language model that is to
   * be used during training of the custom acoustic model. Specify a custom language model that has been trained with
   * verbatim transcriptions of the audio resources or that contains words that are relevant to the contents of the
   * audio resources. The custom language model must be based on the same version of the same base model as the custom
   * acoustic model, and the custom language model must be fully trained and available. The credentials specified with
   * the request must own both custom models.
   * @param {boolean} [params.strict] - If `false`, allows training of the custom acoustic model to proceed as long as
   * the model contains at least one valid audio resource. The method returns an array of `TrainingWarning` objects that
   * lists any invalid resources. By default (`true`), training of a custom acoustic model fails (status code 400) if
   * the model contains one or more invalid audio resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.TrainingResponse>>}
   */
  public trainAcousticModel(
    params: SpeechToTextV1.TrainAcousticModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.TrainingResponse>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'customLanguageModelId', 'strict', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'custom_language_model_id': _params.customLanguageModelId,
      'strict': _params.strict,
    };

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'trainAcousticModel');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}/train',
        method: 'POST',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Reset a custom acoustic model.
   *
   * Resets a custom acoustic model by removing all audio resources from the model. Resetting a custom acoustic model
   * initializes the model to its state when it was first created. Metadata such as the name and language of the model
   * are preserved, but the model's audio resources are removed and must be re-created. The service cannot reset a model
   * while it is handling another request for the model. The service cannot accept subsequent requests for the model
   * until the existing reset request completes. You must use credentials for the instance of the service that owns a
   * model to reset it.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **See also:** [Resetting a custom acoustic
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageAcousticModels#resetModel-acoustic).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom acoustic model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public resetAcousticModel(
    params: SpeechToTextV1.ResetAcousticModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'resetAcousticModel');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}/reset',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Upgrade a custom acoustic model.
   *
   * Initiates the upgrade of a custom acoustic model to the latest version of its base language model. The upgrade
   * method is asynchronous. It can take on the order of minutes or hours to complete depending on the amount of data in
   * the custom model and the current load on the service; typically, upgrade takes approximately twice the length of
   * the total audio contained in the custom model. A custom model must be in the `ready` or `available` state to be
   * upgraded. You must use credentials for the instance of the service that owns a model to upgrade it.
   *
   * The method returns an HTTP 200 response code to indicate that the upgrade process has begun successfully. You can
   * monitor the status of the upgrade by using the [Get a custom acoustic model](#getacousticmodel) method to poll the
   * model's status. The method returns an `AcousticModel` object that includes `status` and `progress` fields. Use a
   * loop to check the status once a minute.
   *
   * While it is being upgraded, the custom model has the status `upgrading`. When the upgrade is complete, the model
   * resumes the status that it had prior to upgrade. The service cannot upgrade a model while it is handling another
   * request for the model. The service cannot accept subsequent requests for the model until the existing upgrade
   * request completes.
   *
   * If the custom acoustic model was trained with a separately created custom language model, you must use the
   * `custom_language_model_id` parameter to specify the GUID of that custom language model. The custom language model
   * must be upgraded before the custom acoustic model can be upgraded. Omit the parameter if the custom acoustic model
   * was not trained with a custom language model.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **See also:** [Upgrading a custom acoustic
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade#custom-upgrade-acoustic).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom acoustic model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} [params.customLanguageModelId] - If the custom acoustic model was trained with a custom language
   * model, the customization ID (GUID) of that custom language model. The custom language model must be upgraded before
   * the custom acoustic model can be upgraded. The custom language model must be fully trained and available. The
   * credentials specified with the request must own both custom models.
   * @param {boolean} [params.force] - If `true`, forces the upgrade of a custom acoustic model for which no input data
   * has been modified since it was last trained. Use this parameter only to force the upgrade of a custom acoustic
   * model that is trained with a custom language model, and only if you receive a 400 response code and the message `No
   * input data modified since last training`. See [Upgrading a custom acoustic
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade#custom-upgrade-acoustic).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public upgradeAcousticModel(
    params: SpeechToTextV1.UpgradeAcousticModelParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'customLanguageModelId', 'force', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'custom_language_model_id': _params.customLanguageModelId,
      'force': _params.force,
    };

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'upgradeAcousticModel');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}/upgrade_model',
        method: 'POST',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customAudioResources
   ************************/

  /**
   * List audio resources.
   *
   * Lists information about all audio resources from a custom acoustic model. The information includes the name of the
   * resource and information about its audio data, such as its duration. It also includes the status of the audio
   * resource, which is important for checking the service's analysis of the resource in response to a request to add it
   * to the custom acoustic model. You must use credentials for the instance of the service that owns a model to list
   * its audio resources.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **See also:** [Listing audio resources for a custom acoustic
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageAudio#listAudio).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom acoustic model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.AudioResources>>}
   */
  public listAudio(
    params: SpeechToTextV1.ListAudioParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.AudioResources>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId'];
    const _validParams = ['customizationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'listAudio');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}/audio',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add an audio resource.
   *
   * Adds an audio resource to a custom acoustic model. Add audio content that reflects the acoustic characteristics of
   * the audio that you plan to transcribe. You must use credentials for the instance of the service that owns a model
   * to add an audio resource to it. Adding audio data does not affect the custom acoustic model until you train the
   * model for the new data by using the [Train a custom acoustic model](#trainacousticmodel) method.
   *
   * You can add individual audio files or an archive file that contains multiple audio files. Adding multiple audio
   * files via a single archive file is significantly more efficient than adding each file individually. You can add
   * audio resources in any format that the service supports for speech recognition.
   *
   * You can use this method to add any number of audio resources to a custom model by calling the method once for each
   * audio or archive file. You can add multiple different audio resources at the same time. You must add a minimum of
   * 10 minutes of audio that includes speech, not just silence, to a custom acoustic model before you can train it. No
   * audio resource, audio- or archive-type, can be larger than 100 MB. To add an audio resource that has the same name
   * as an existing audio resource, set the `allow_overwrite` parameter to `true`; otherwise, the request fails. A
   * custom model can contain no more than 50 hours of audio (for IBM Cloud) or 200 hours of audio (for IBM Cloud Pak
   * for Data). **Note:** For IBM Cloud, the maximum hours of audio for a custom acoustic model was reduced from 200 to
   * 50 hours in August and September 2022. For more information, see [Maximum hours of
   * audio](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-audioResources#audioMaximum).
   *
   * The method is asynchronous. It can take several seconds or minutes to complete depending on the duration of the
   * audio and, in the case of an archive file, the total number of audio files being processed. The service returns a
   * 201 response code if the audio is valid. It then asynchronously analyzes the contents of the audio file or files
   * and automatically extracts information about the audio such as its length, sampling rate, and encoding. You cannot
   * submit requests to train or upgrade the model until the service's analysis of all audio resources for current
   * requests completes.
   *
   * To determine the status of the service's analysis of the audio, use the [Get an audio resource](#getaudio) method
   * to poll the status of the audio. The method accepts the customization ID of the custom model and the name of the
   * audio resource, and it returns the status of the resource. Use a loop to check the status of the audio every few
   * seconds until it becomes `ok`.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **See also:** [Add audio to the custom acoustic
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-acoustic#addAudio).
   *
   * ### Content types for audio-type resources
   *
   *  You can add an individual audio file in any format that the service supports for speech recognition. For an
   * audio-type resource, use the `Content-Type` parameter to specify the audio format (MIME type) of the audio file,
   * including specifying the sampling rate, channels, and endianness where indicated.
   * * `audio/alaw` (Specify the sampling rate (`rate`) of the audio.)
   * * `audio/basic` (Use only with narrowband models.)
   * * `audio/flac`
   * * `audio/g729` (Use only with narrowband models.)
   * * `audio/l16` (Specify the sampling rate (`rate`) and optionally the number of channels (`channels`) and endianness
   * (`endianness`) of the audio.)
   * * `audio/mp3`
   * * `audio/mpeg`
   * * `audio/mulaw` (Specify the sampling rate (`rate`) of the audio.)
   * * `audio/ogg` (The service automatically detects the codec of the input audio.)
   * * `audio/ogg;codecs=opus`
   * * `audio/ogg;codecs=vorbis`
   * * `audio/wav` (Provide audio with a maximum of nine channels.)
   * * `audio/webm` (The service automatically detects the codec of the input audio.)
   * * `audio/webm;codecs=opus`
   * * `audio/webm;codecs=vorbis`
   *
   * The sampling rate of an audio file must match the sampling rate of the base model for the custom model: for
   * broadband models, at least 16 kHz; for narrowband models, at least 8 kHz. If the sampling rate of the audio is
   * higher than the minimum required rate, the service down-samples the audio to the appropriate rate. If the sampling
   * rate of the audio is lower than the minimum required rate, the service labels the audio file as `invalid`.
   *
   *  **See also:** [Supported audio
   * formats](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-audio-formats).
   *
   * ### Content types for archive-type resources
   *
   *  You can add an archive file (**.zip** or **.tar.gz** file) that contains audio files in any format that the
   * service supports for speech recognition. For an archive-type resource, use the `Content-Type` parameter to specify
   * the media type of the archive file:
   * * `application/zip` for a **.zip** file
   * * `application/gzip` for a **.tar.gz** file.
   *
   * When you add an archive-type resource, the `Contained-Content-Type` header is optional depending on the format of
   * the files that you are adding:
   * * For audio files of type `audio/alaw`, `audio/basic`, `audio/l16`, or `audio/mulaw`, you must use the
   * `Contained-Content-Type` header to specify the format of the contained audio files. Include the `rate`, `channels`,
   * and `endianness` parameters where necessary. In this case, all audio files contained in the archive file must have
   * the same audio format.
   * * For audio files of all other types, you can omit the `Contained-Content-Type` header. In this case, the audio
   * files contained in the archive file can have any of the formats not listed in the previous bullet. The audio files
   * do not need to have the same format.
   *
   * Do not use the `Contained-Content-Type` header when adding an audio-type resource.
   *
   * ### Naming restrictions for embedded audio files
   *
   *  The name of an audio file that is contained in an archive-type resource can include a maximum of 128 characters.
   * This includes the file extension and all elements of the name (for example, slashes).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom acoustic model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.audioName - The name of the new audio resource for the custom acoustic model. Use a
   * localized name that matches the language of the custom model and reflects the contents of the resource.
   * * Include a maximum of 128 characters in the name.
   * * Do not use characters that need to be URL-encoded. For example, do not use spaces, slashes, backslashes, colons,
   * ampersands, double quotes, plus signs, equals signs, questions marks, and so on in the name. (The service does not
   * prevent the use of these characters. But because they must be URL-encoded wherever used, their use is strongly
   * discouraged.)
   * * Do not use the name of an audio resource that has already been added to the custom model.
   * @param {NodeJS.ReadableStream | Buffer} params.audioResource - The audio resource that is to be added to the custom
   * acoustic model, an individual audio file or an archive file.
   *
   * With the `curl` command, use the `--data-binary` option to upload the file for the request.
   * @param {string} [params.contentType] - For an audio-type resource, the format (MIME type) of the audio. For more
   * information, see **Content types for audio-type resources** in the method description.
   *
   * For an archive-type resource, the media type of the archive file. For more information, see **Content types for
   * archive-type resources** in the method description.
   * @param {string} [params.containedContentType] - _For an archive-type resource_, specify the format of the audio
   * files that are contained in the archive file if they are of type `audio/alaw`, `audio/basic`, `audio/l16`, or
   * `audio/mulaw`. Include the `rate`, `channels`, and `endianness` parameters where necessary. In this case, all audio
   * files that are contained in the archive file must be of the indicated type.
   *
   * For all other audio formats, you can omit the header. In this case, the audio files can be of multiple types as
   * long as they are not of the types listed in the previous paragraph.
   *
   * The parameter accepts all of the audio formats that are supported for use with speech recognition. For more
   * information, see **Content types for audio-type resources** in the method description.
   *
   * _For an audio-type resource_, omit the header.
   * @param {boolean} [params.allowOverwrite] - If `true`, the specified audio resource overwrites an existing audio
   * resource with the same name. If `false`, the request fails if an audio resource with the same name already exists.
   * The parameter has no effect if an audio resource with the same name does not already exist.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public addAudio(
    params: SpeechToTextV1.AddAudioParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'audioName', 'audioResource'];
    const _validParams = ['customizationId', 'audioName', 'audioResource', 'contentType', 'containedContentType', 'allowOverwrite', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.audioResource;
    const query = {
      'allow_overwrite': _params.allowOverwrite,
    };

    const path = {
      'customization_id': _params.customizationId,
      'audio_name': _params.audioName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'addAudio');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': _params.contentType,
            'Contained-Content-Type': _params.containedContentType,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an audio resource.
   *
   * Gets information about an audio resource from a custom acoustic model. The method returns an `AudioListing` object
   * whose fields depend on the type of audio resource that you specify with the method's `audio_name` parameter:
   * * _For an audio-type resource_, the object's fields match those of an `AudioResource` object: `duration`, `name`,
   * `details`, and `status`.
   * * _For an archive-type resource_, the object includes a `container` field whose fields match those of an
   * `AudioResource` object. It also includes an `audio` field, which contains an array of `AudioResource` objects that
   * provides information about the audio files that are contained in the archive.
   *
   * The information includes the status of the specified audio resource. The status is important for checking the
   * service's analysis of a resource that you add to the custom model.
   * * _For an audio-type resource_, the `status` field is located in the `AudioListing` object.
   * * _For an archive-type resource_, the `status` field is located in the `AudioResource` object that is returned in
   * the `container` field.
   *
   * You must use credentials for the instance of the service that owns a model to list its audio resources.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **See also:** [Listing audio resources for a custom acoustic
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageAudio#listAudio).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom acoustic model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.audioName - The name of the audio resource for the custom acoustic model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.AudioListing>>}
   */
  public getAudio(
    params: SpeechToTextV1.GetAudioParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.AudioListing>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'audioName'];
    const _validParams = ['customizationId', 'audioName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
      'audio_name': _params.audioName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'getAudio');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an audio resource.
   *
   * Deletes an existing audio resource from a custom acoustic model. Deleting an archive-type audio resource removes
   * the entire archive of files. The service does not allow deletion of individual files from an archive resource.
   *
   * Removing an audio resource does not affect the custom model until you train the model on its updated data by using
   * the [Train a custom acoustic model](#trainacousticmodel) method. You can delete an existing audio resource from a
   * model while a different resource is being added to the model. You must use credentials for the instance of the
   * service that owns a model to delete its audio resources.
   *
   * **Note:** Acoustic model customization is supported only for use with previous-generation models. It is not
   * supported for large speech models and next-generation models.
   *
   * **See also:** [Deleting an audio resource from a custom acoustic
   * model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageAudio#deleteAudio).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom acoustic model that is to be
   * used for the request. You must make the request with credentials for the instance of the service that owns the
   * custom model.
   * @param {string} params.audioName - The name of the audio resource for the custom acoustic model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public deleteAudio(
    params: SpeechToTextV1.DeleteAudioParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customizationId', 'audioName'];
    const _validParams = ['customizationId', 'audioName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'customization_id': _params.customizationId,
      'audio_name': _params.audioName,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteAudio');

    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * userData
   ************************/

  /**
   * Delete labeled data.
   *
   * Deletes all data that is associated with a specified customer ID. The method deletes all data for the customer ID,
   * regardless of the method by which the information was added. The method has no effect if no data is associated with
   * the customer ID. You must issue the request with credentials for the same instance of the service that was used to
   * associate the customer ID with the data. You associate a customer ID with data by passing the `X-Watson-Metadata`
   * header with a request that passes the data.
   *
   * **Note:** If you delete an instance of the service from the service console, all data associated with that service
   * instance is automatically deleted. This includes all custom language models, corpora, grammars, and words; all
   * custom acoustic models and audio resources; all registered endpoints for the asynchronous HTTP interface; and all
   * data related to speech recognition requests.
   *
   * **See also:** [Information
   * security](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-information-security#information-security).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customerId - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>>}
   */
  public deleteUserData(
    params: SpeechToTextV1.DeleteUserDataParams
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customerId'];
    const _validParams = ['customerId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'customer_id': _params.customerId,
    };

    const sdkHeaders = getSdkHeaders(SpeechToTextV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteUserData');

    const parameters = {
      options: {
        url: '/v1/user_data',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace SpeechToTextV1 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listModels` operation. */
  export interface ListModelsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getModel` operation. */
  export interface GetModelParams {
    /** The identifier of the model in the form of its name from the output of the [List models](#listmodels)
     *  method.
     */
    modelId: GetModelConstants.ModelId | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getModel` operation. */
  export namespace GetModelConstants {
    /** The identifier of the model in the form of its name from the output of the [List models](#listmodels) method. */
    export enum ModelId {
      AR_MS_BROADBANDMODEL = 'ar-MS_BroadbandModel',
      AR_MS_TELEPHONY = 'ar-MS_Telephony',
      CS_CZ_TELEPHONY = 'cs-CZ_Telephony',
      DE_DE_BROADBANDMODEL = 'de-DE_BroadbandModel',
      DE_DE_MULTIMEDIA = 'de-DE_Multimedia',
      DE_DE_NARROWBANDMODEL = 'de-DE_NarrowbandModel',
      DE_DE_TELEPHONY = 'de-DE_Telephony',
      EN_AU = 'en-AU',
      EN_AU_BROADBANDMODEL = 'en-AU_BroadbandModel',
      EN_AU_MULTIMEDIA = 'en-AU_Multimedia',
      EN_AU_NARROWBANDMODEL = 'en-AU_NarrowbandModel',
      EN_AU_TELEPHONY = 'en-AU_Telephony',
      EN_GB = 'en-GB',
      EN_GB_BROADBANDMODEL = 'en-GB_BroadbandModel',
      EN_GB_MULTIMEDIA = 'en-GB_Multimedia',
      EN_GB_NARROWBANDMODEL = 'en-GB_NarrowbandModel',
      EN_GB_TELEPHONY = 'en-GB_Telephony',
      EN_IN = 'en-IN',
      EN_IN_TELEPHONY = 'en-IN_Telephony',
      EN_US = 'en-US',
      EN_US_BROADBANDMODEL = 'en-US_BroadbandModel',
      EN_US_MULTIMEDIA = 'en-US_Multimedia',
      EN_US_NARROWBANDMODEL = 'en-US_NarrowbandModel',
      EN_US_SHORTFORM_NARROWBANDMODEL = 'en-US_ShortForm_NarrowbandModel',
      EN_US_TELEPHONY = 'en-US_Telephony',
      EN_WW_MEDICAL_TELEPHONY = 'en-WW_Medical_Telephony',
      ES_AR = 'es-AR',
      ES_AR_BROADBANDMODEL = 'es-AR_BroadbandModel',
      ES_AR_NARROWBANDMODEL = 'es-AR_NarrowbandModel',
      ES_CL = 'es-CL',
      ES_CL_BROADBANDMODEL = 'es-CL_BroadbandModel',
      ES_CL_NARROWBANDMODEL = 'es-CL_NarrowbandModel',
      ES_CO = 'es-CO',
      ES_CO_BROADBANDMODEL = 'es-CO_BroadbandModel',
      ES_CO_NARROWBANDMODEL = 'es-CO_NarrowbandModel',
      ES_ES = 'es-ES',
      ES_ES_BROADBANDMODEL = 'es-ES_BroadbandModel',
      ES_ES_NARROWBANDMODEL = 'es-ES_NarrowbandModel',
      ES_ES_MULTIMEDIA = 'es-ES_Multimedia',
      ES_ES_TELEPHONY = 'es-ES_Telephony',
      ES_LA_TELEPHONY = 'es-LA_Telephony',
      ES_MX = 'es-MX',
      ES_MX_BROADBANDMODEL = 'es-MX_BroadbandModel',
      ES_MX_NARROWBANDMODEL = 'es-MX_NarrowbandModel',
      ES_PE = 'es-PE',
      ES_PE_BROADBANDMODEL = 'es-PE_BroadbandModel',
      ES_PE_NARROWBANDMODEL = 'es-PE_NarrowbandModel',
      FR_CA = 'fr-CA',
      FR_CA_BROADBANDMODEL = 'fr-CA_BroadbandModel',
      FR_CA_MULTIMEDIA = 'fr-CA_Multimedia',
      FR_CA_NARROWBANDMODEL = 'fr-CA_NarrowbandModel',
      FR_CA_TELEPHONY = 'fr-CA_Telephony',
      FR_FR = 'fr-FR',
      FR_FR_BROADBANDMODEL = 'fr-FR_BroadbandModel',
      FR_FR_MULTIMEDIA = 'fr-FR_Multimedia',
      FR_FR_NARROWBANDMODEL = 'fr-FR_NarrowbandModel',
      FR_FR_TELEPHONY = 'fr-FR_Telephony',
      HI_IN_TELEPHONY = 'hi-IN_Telephony',
      IT_IT_BROADBANDMODEL = 'it-IT_BroadbandModel',
      IT_IT_NARROWBANDMODEL = 'it-IT_NarrowbandModel',
      IT_IT_MULTIMEDIA = 'it-IT_Multimedia',
      IT_IT_TELEPHONY = 'it-IT_Telephony',
      JA_JP = 'ja-JP',
      JA_JP_BROADBANDMODEL = 'ja-JP_BroadbandModel',
      JA_JP_MULTIMEDIA = 'ja-JP_Multimedia',
      JA_JP_NARROWBANDMODEL = 'ja-JP_NarrowbandModel',
      JA_JP_TELEPHONY = 'ja-JP_Telephony',
      KO_KR_BROADBANDMODEL = 'ko-KR_BroadbandModel',
      KO_KR_MULTIMEDIA = 'ko-KR_Multimedia',
      KO_KR_NARROWBANDMODEL = 'ko-KR_NarrowbandModel',
      KO_KR_TELEPHONY = 'ko-KR_Telephony',
      NL_BE_TELEPHONY = 'nl-BE_Telephony',
      NL_NL_BROADBANDMODEL = 'nl-NL_BroadbandModel',
      NL_NL_MULTIMEDIA = 'nl-NL_Multimedia',
      NL_NL_NARROWBANDMODEL = 'nl-NL_NarrowbandModel',
      NL_NL_TELEPHONY = 'nl-NL_Telephony',
      PT_BR = 'pt-BR',
      PT_BR_BROADBANDMODEL = 'pt-BR_BroadbandModel',
      PT_BR_MULTIMEDIA = 'pt-BR_Multimedia',
      PT_BR_NARROWBANDMODEL = 'pt-BR_NarrowbandModel',
      PT_BR_TELEPHONY = 'pt-BR_Telephony',
      SV_SE_TELEPHONY = 'sv-SE_Telephony',
      ZH_CN_BROADBANDMODEL = 'zh-CN_BroadbandModel',
      ZH_CN_NARROWBANDMODEL = 'zh-CN_NarrowbandModel',
      ZH_CN_TELEPHONY = 'zh-CN_Telephony',
    }
  }

  /** Parameters for the `recognize` operation. */
  export interface RecognizeParams {
    /** The audio to transcribe. */
    audio: NodeJS.ReadableStream | Buffer;
    /** The format (MIME type) of the audio. For more information about specifying an audio format, see **Audio
     *  formats (content types)** in the method description.
     */
    contentType?: RecognizeConstants.ContentType | string;
    /** The model to use for speech recognition. If you omit the `model` parameter, the service uses the US English
     *  `en-US_BroadbandModel` by default.
     *
     *  _For IBM Cloud Pak for Data,_ if you do not install the `en-US_BroadbandModel`, you must either specify a model
     *  with the request or specify a new default model for your installation of the service.
     *
     *  **See also:**
     *  * [Using a model for speech
     *  recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use)
     *  * [Using the default
     *  model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use#models-use-default).
     */
    model?: RecognizeConstants.Model | string;
    /** If `true`, the service returns a response object `SpeechActivity` which contains the time when a speech
     *  activity is detected in the stream. This can be used both in standard and low latency mode. This feature enables
     *  client applications to know that some words/speech has been detected and the service is in the process of
     *  decoding. This can be used in lieu of interim results in standard mode. See [Using speech recognition
     *  parameters](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-service-features#features-parameters).
     */
    speechBeginEvent?: boolean;
    /** The customization ID (GUID) of a custom language model that is to be used with the recognition request. The
     *  base model of the specified custom language model must match the model specified with the `model` parameter. You
     *  must make the request with credentials for the instance of the service that owns the custom model. By default,
     *  no custom language model is used. See [Using a custom language model for speech
     *  recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageUse).
     *
     *  **Note:** Use this parameter instead of the deprecated `customization_id` parameter.
     */
    languageCustomizationId?: string;
    /** The customization ID (GUID) of a custom acoustic model that is to be used with the recognition request. The
     *  base model of the specified custom acoustic model must match the model specified with the `model` parameter. You
     *  must make the request with credentials for the instance of the service that owns the custom model. By default,
     *  no custom acoustic model is used. See [Using a custom acoustic model for speech
     *  recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-acousticUse).
     */
    acousticCustomizationId?: string;
    /** The version of the specified base model that is to be used with the recognition request. Multiple versions
     *  of a base model can exist when a model is updated for internal improvements. The parameter is intended primarily
     *  for use with custom models that have been upgraded for a new base model. The default value depends on whether
     *  the parameter is used with or without a custom model. See [Making speech recognition requests with upgraded
     *  custom
     *  models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade-use#custom-upgrade-use-recognition).
     */
    baseModelVersion?: string;
    /** If you specify the customization ID (GUID) of a custom language model with the recognition request, the
     *  customization weight tells the service how much weight to give to words from the custom language model compared
     *  to those from the base model for the current request.
     *
     *  Specify a value between 0.0 and 1.0. Unless a different customization weight was specified for the custom model
     *  when the model was trained, the default value is:
     *  * 0.5 for large speech models
     *  * 0.3 for previous-generation models
     *  * 0.2 for most next-generation models
     *  * 0.1 for next-generation English and Japanese models
     *
     *  A customization weight that you specify overrides a weight that was specified when the custom model was trained.
     *  The default value yields the best performance in general. Assign a higher value if your audio makes frequent use
     *  of OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy
     *  of phrases from the custom model's domain, but it can negatively affect performance on non-domain phrases.
     *
     *  See [Using customization
     *  weight](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageUse#weight).
     */
    customizationWeight?: number;
    /** The time in seconds after which, if only silence (no speech) is detected in streaming audio, the connection
     *  is closed with a 400 error. The parameter is useful for stopping audio submission from a live microphone when a
     *  user simply walks away. Use `-1` for infinity. See [Inactivity
     *  timeout](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-input#timeouts-inactivity).
     */
    inactivityTimeout?: number;
    /** An array of keyword strings to spot in the audio. Each keyword string can include one or more string tokens.
     *  Keywords are spotted only in the final results, not in interim hypotheses. If you specify any keywords, you must
     *  also specify a keywords threshold. Omit the parameter or specify an empty array if you do not need to spot
     *  keywords.
     *
     *  You can spot a maximum of 1000 keywords with a single request. A single keyword can have a maximum length of
     *  1024 characters, though the maximum effective length for double-byte languages might be shorter. Keywords are
     *  case-insensitive.
     *
     *  See [Keyword
     *  spotting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#keyword-spotting).
     */
    keywords?: string[];
    /** A confidence value that is the lower bound for spotting a keyword. A word is considered to match a keyword
     *  if its confidence is greater than or equal to the threshold. Specify a probability between 0.0 and 1.0. If you
     *  specify a threshold, you must also specify one or more keywords. The service performs no keyword spotting if you
     *  omit either parameter. See [Keyword
     *  spotting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#keyword-spotting).
     */
    keywordsThreshold?: number;
    /** The maximum number of alternative transcripts that the service is to return. By default, the service returns
     *  a single transcript. If you specify a value of `0`, the service uses the default value, `1`. See [Maximum
     *  alternatives](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#max-alternatives).
     */
    maxAlternatives?: number;
    /** A confidence value that is the lower bound for identifying a hypothesis as a possible word alternative (also
     *  known as "Confusion Networks"). An alternative word is considered if its confidence is greater than or equal to
     *  the threshold. Specify a probability between 0.0 and 1.0. By default, the service computes no alternative words.
     *  See [Word
     *  alternatives](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#word-alternatives).
     */
    wordAlternativesThreshold?: number;
    /** If `true`, the service returns a confidence measure in the range of 0.0 to 1.0 for each word. By default,
     *  the service returns no word confidence scores. See [Word
     *  confidence](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#word-confidence).
     */
    wordConfidence?: boolean;
    /** If `true`, the service returns time alignment for each word. By default, no timestamps are returned. See
     *  [Word timestamps](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#word-timestamps).
     */
    timestamps?: boolean;
    /** If `true`, the service filters profanity from all output except for keyword results by replacing
     *  inappropriate words with a series of asterisks. Set the parameter to `false` to return results with no
     *  censoring.
     *
     *  **Note:** The parameter can be used with US English and Japanese transcription only. See [Profanity
     *  filtering](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#profanity-filtering).
     */
    profanityFilter?: boolean;
    /** If `true`, the service converts dates, times, series of digits and numbers, phone numbers, currency values,
     *  and internet addresses into more readable, conventional representations in the final transcript of a recognition
     *  request. For US English, the service also converts certain keyword strings to punctuation symbols. By default,
     *  the service performs no smart formatting.
     *
     *  **Note:** The parameter can be used with US English, Japanese, and Spanish (all dialects) transcription only.
     *
     *  See [Smart
     *  formatting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#smart-formatting).
     */
    smartFormatting?: boolean;
    /** Smart formatting version for large speech models and next-generation models is supported in US English,
     *  Brazilian Portuguese, French, German, Spanish and French Canadian languages.
     */
    smartFormattingVersion?: number;
    /** If `true`, the response includes labels that identify which words were spoken by which participants in a
     *  multi-person exchange. By default, the service returns no speaker labels. Setting `speaker_labels` to `true`
     *  forces the `timestamps` parameter to be `true`, regardless of whether you specify `false` for the parameter.
     *  * _For previous-generation models,_ the parameter can be used with Australian English, US English, German,
     *  Japanese, Korean, and Spanish (both broadband and narrowband models) and UK English (narrowband model)
     *  transcription only.
     *  * _For large speech models and next-generation models,_ the parameter can be used with all available languages.
     *
     *  See [Speaker labels](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-speaker-labels).
     */
    speakerLabels?: boolean;
    /** The name of a grammar that is to be used with the recognition request. If you specify a grammar, you must
     *  also use the `language_customization_id` parameter to specify the name of the custom language model for which
     *  the grammar is defined. The service recognizes only strings that are recognized by the specified grammar; it
     *  does not recognize other custom words from the model's words resource.
     *
     *  See [Using a grammar for speech
     *  recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-grammarUse).
     */
    grammarName?: string;
    /** If `true`, the service redacts, or masks, numeric data from final transcripts. The feature redacts any
     *  number that has three or more consecutive digits by replacing each digit with an `X` character. It is intended
     *  to redact sensitive numeric data, such as credit card numbers. By default, the service performs no redaction.
     *
     *  When you enable redaction, the service automatically enables smart formatting, regardless of whether you
     *  explicitly disable that feature. To ensure maximum security, the service also disables keyword spotting (ignores
     *  the `keywords` and `keywords_threshold` parameters) and returns only a single final transcript (forces the
     *  `max_alternatives` parameter to be `1`).
     *
     *  **Note:** The parameter can be used with US English, Japanese, and Korean transcription only.
     *
     *  See [Numeric
     *  redaction](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#numeric-redaction).
     */
    redaction?: boolean;
    /** If `true`, requests detailed information about the signal characteristics of the input audio. The service
     *  returns audio metrics with the final transcription results. By default, the service returns no audio metrics.
     *
     *  See [Audio metrics](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metrics#audio-metrics).
     */
    audioMetrics?: boolean;
    /** Specifies the duration of the pause interval at which the service splits a transcript into multiple final
     *  results. If the service detects pauses or extended silence before it reaches the end of the audio stream, its
     *  response can include multiple final results. Silence indicates a point at which the speaker pauses between
     *  spoken words or phrases.
     *
     *  Specify a value for the pause interval in the range of 0.0 to 120.0.
     *  * A value greater than 0 specifies the interval that the service is to use for speech recognition.
     *  * A value of 0 indicates that the service is to use the default interval. It is equivalent to omitting the
     *  parameter.
     *
     *  The default pause interval for most languages is 0.8 seconds; the default for Chinese is 0.6 seconds.
     *
     *  See [End of phrase silence
     *  time](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#silence-time).
     */
    endOfPhraseSilenceTime?: number;
    /** If `true`, directs the service to split the transcript into multiple final results based on semantic
     *  features of the input, for example, at the conclusion of meaningful phrases such as sentences. The service bases
     *  its understanding of semantic features on the base language model that you use with a request. Custom language
     *  models and grammars can also influence how and where the service splits a transcript.
     *
     *  By default, the service splits transcripts based solely on the pause interval. If the parameters are used
     *  together on the same request, `end_of_phrase_silence_time` has precedence over `split_transcript_at_phrase_end`.
     *
     *
     *  See [Split transcript at phrase
     *  end](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#split-transcript).
     */
    splitTranscriptAtPhraseEnd?: boolean;
    /** The sensitivity of speech activity detection that the service is to perform. Use the parameter to suppress
     *  word insertions from music, coughing, and other non-speech events. The service biases the audio it passes for
     *  speech recognition by evaluating the input audio against prior models of speech and non-speech activity.
     *
     *  Specify a value between 0.0 and 1.0:
     *  * 0.0 suppresses all audio (no speech is transcribed).
     *  * 0.5 (the default) provides a reasonable compromise for the level of sensitivity.
     *  * 1.0 suppresses no audio (speech detection sensitivity is disabled).
     *
     *  The values increase on a monotonic curve. Specifying one or two decimal places of precision (for example,
     *  `0.55`) is typically more than sufficient.
     *
     *  The parameter is supported with all large speech models, next-generation models and with most
     *  previous-generation models. See [Speech detector
     *  sensitivity](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-parameters-sensitivity)
     *  and [Language model
     *  support](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-support).
     */
    speechDetectorSensitivity?: number;
    /** The level to which the service is to suppress background audio based on its volume to prevent it from being
     *  transcribed as speech. Use the parameter to suppress side conversations or background noise.
     *
     *  Specify a value in the range of 0.0 to 1.0:
     *  * 0.0 (the default) provides no suppression (background audio suppression is disabled).
     *  * 0.5 provides a reasonable level of audio suppression for general usage.
     *  * 1.0 suppresses all audio (no audio is transcribed).
     *
     *  The values increase on a monotonic curve. Specifying one or two decimal places of precision (for example,
     *  `0.55`) is typically more than sufficient.
     *
     *  The parameter is supported with all large speech models, next-generation models and with most
     *  previous-generation models. See [Background audio
     *  suppression](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-parameters-suppression)
     *  and [Language model
     *  support](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-support).
     */
    backgroundAudioSuppression?: number;
    /** If `true` for next-generation `Multimedia` and `Telephony` models that support low latency, directs the
     *  service to produce results even more quickly than it usually does. Next-generation models produce transcription
     *  results faster than previous-generation models. The `low_latency` parameter causes the models to produce results
     *  even more quickly, though the results might be less accurate when the parameter is used.
     *
     *  The parameter is not available for large speech models and previous-generation `Broadband` and `Narrowband`
     *  models. It is available for most next-generation models.
     *  * For a list of next-generation models that support low latency, see [Supported next-generation language
     *  models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng#models-ng-supported).
     *  * For more information about the `low_latency` parameter, see [Low
     *  latency](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-interim#low-latency).
     */
    lowLatency?: boolean;
    /** For large speech models and next-generation models, an indication of whether the service is biased to
     *  recognize shorter or longer strings of characters when developing transcription hypotheses. By default, the
     *  service is optimized to produce the best balance of strings of different lengths.
     *
     *  The default bias is 0.0. The allowable range of values is -1.0 to 1.0.
     *  * Negative values bias the service to favor hypotheses with shorter strings of characters.
     *  * Positive values bias the service to favor hypotheses with longer strings of characters.
     *
     *  As the value approaches -1.0 or 1.0, the impact of the parameter becomes more pronounced. To determine the most
     *  effective value for your scenario, start by setting the value of the parameter to a small increment, such as
     *  -0.1, -0.05, 0.05, or 0.1, and assess how the value impacts the transcription results. Then experiment with
     *  different values as necessary, adjusting the value by small increments.
     *
     *  The parameter is not available for previous-generation models.
     *
     *  See [Character insertion
     *  bias](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#insertion-bias).
     */
    characterInsertionBias?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `recognize` operation. */
  export namespace RecognizeConstants {
    /** The format (MIME type) of the audio. For more information about specifying an audio format, see **Audio formats (content types)** in the method description. */
    export enum ContentType {
      APPLICATION_OCTET_STREAM = 'application/octet-stream',
      AUDIO_ALAW = 'audio/alaw',
      AUDIO_BASIC = 'audio/basic',
      AUDIO_FLAC = 'audio/flac',
      AUDIO_G729 = 'audio/g729',
      AUDIO_L16 = 'audio/l16',
      AUDIO_MP3 = 'audio/mp3',
      AUDIO_MPEG = 'audio/mpeg',
      AUDIO_MULAW = 'audio/mulaw',
      AUDIO_OGG = 'audio/ogg',
      AUDIO_OGG_CODECS_OPUS = 'audio/ogg;codecs=opus',
      AUDIO_OGG_CODECS_VORBIS = 'audio/ogg;codecs=vorbis',
      AUDIO_WAV = 'audio/wav',
      AUDIO_WEBM = 'audio/webm',
      AUDIO_WEBM_CODECS_OPUS = 'audio/webm;codecs=opus',
      AUDIO_WEBM_CODECS_VORBIS = 'audio/webm;codecs=vorbis',
    }
    /** The model to use for speech recognition. If you omit the `model` parameter, the service uses the US English `en-US_BroadbandModel` by default. _For IBM Cloud Pak for Data,_ if you do not install the `en-US_BroadbandModel`, you must either specify a model with the request or specify a new default model for your installation of the service. **See also:** * [Using a model for speech recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use) * [Using the default model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use#models-use-default). */
    export enum Model {
      AR_MS_BROADBANDMODEL = 'ar-MS_BroadbandModel',
      AR_MS_TELEPHONY = 'ar-MS_Telephony',
      CS_CZ_TELEPHONY = 'cs-CZ_Telephony',
      DE_DE_BROADBANDMODEL = 'de-DE_BroadbandModel',
      DE_DE_MULTIMEDIA = 'de-DE_Multimedia',
      DE_DE_NARROWBANDMODEL = 'de-DE_NarrowbandModel',
      DE_DE_TELEPHONY = 'de-DE_Telephony',
      EN_AU = 'en-AU',
      EN_AU_BROADBANDMODEL = 'en-AU_BroadbandModel',
      EN_AU_MULTIMEDIA = 'en-AU_Multimedia',
      EN_AU_NARROWBANDMODEL = 'en-AU_NarrowbandModel',
      EN_AU_TELEPHONY = 'en-AU_Telephony',
      EN_IN = 'en-IN',
      EN_IN_TELEPHONY = 'en-IN_Telephony',
      EN_GB = 'en-GB',
      EN_GB_BROADBANDMODEL = 'en-GB_BroadbandModel',
      EN_GB_MULTIMEDIA = 'en-GB_Multimedia',
      EN_GB_NARROWBANDMODEL = 'en-GB_NarrowbandModel',
      EN_GB_TELEPHONY = 'en-GB_Telephony',
      EN_US = 'en-US',
      EN_US_BROADBANDMODEL = 'en-US_BroadbandModel',
      EN_US_MULTIMEDIA = 'en-US_Multimedia',
      EN_US_NARROWBANDMODEL = 'en-US_NarrowbandModel',
      EN_US_SHORTFORM_NARROWBANDMODEL = 'en-US_ShortForm_NarrowbandModel',
      EN_US_TELEPHONY = 'en-US_Telephony',
      EN_WW_MEDICAL_TELEPHONY = 'en-WW_Medical_Telephony',
      ES_AR = 'es-AR',
      ES_AR_BROADBANDMODEL = 'es-AR_BroadbandModel',
      ES_AR_NARROWBANDMODEL = 'es-AR_NarrowbandModel',
      ES_CL = 'es-CL',
      ES_CL_BROADBANDMODEL = 'es-CL_BroadbandModel',
      ES_CL_NARROWBANDMODEL = 'es-CL_NarrowbandModel',
      ES_CO = 'es-CO',
      ES_CO_BROADBANDMODEL = 'es-CO_BroadbandModel',
      ES_CO_NARROWBANDMODEL = 'es-CO_NarrowbandModel',
      ES_ES = 'es-ES',
      ES_ES_BROADBANDMODEL = 'es-ES_BroadbandModel',
      ES_ES_NARROWBANDMODEL = 'es-ES_NarrowbandModel',
      ES_ES_MULTIMEDIA = 'es-ES_Multimedia',
      ES_ES_TELEPHONY = 'es-ES_Telephony',
      ES_LA_TELEPHONY = 'es-LA_Telephony',
      ES_MX = 'es-MX',
      ES_MX_BROADBANDMODEL = 'es-MX_BroadbandModel',
      ES_MX_NARROWBANDMODEL = 'es-MX_NarrowbandModel',
      ES_PE = 'es-PE',
      ES_PE_BROADBANDMODEL = 'es-PE_BroadbandModel',
      ES_PE_NARROWBANDMODEL = 'es-PE_NarrowbandModel',
      FR_CA = 'fr-CA',
      FR_CA_BROADBANDMODEL = 'fr-CA_BroadbandModel',
      FR_CA_MULTIMEDIA = 'fr-CA_Multimedia',
      FR_CA_NARROWBANDMODEL = 'fr-CA_NarrowbandModel',
      FR_CA_TELEPHONY = 'fr-CA_Telephony',
      FR_FR = 'fr-FR',
      FR_FR_BROADBANDMODEL = 'fr-FR_BroadbandModel',
      FR_FR_MULTIMEDIA = 'fr-FR_Multimedia',
      FR_FR_NARROWBANDMODEL = 'fr-FR_NarrowbandModel',
      FR_FR_TELEPHONY = 'fr-FR_Telephony',
      HI_IN_TELEPHONY = 'hi-IN_Telephony',
      IT_IT_BROADBANDMODEL = 'it-IT_BroadbandModel',
      IT_IT_NARROWBANDMODEL = 'it-IT_NarrowbandModel',
      IT_IT_MULTIMEDIA = 'it-IT_Multimedia',
      IT_IT_TELEPHONY = 'it-IT_Telephony',
      JA_JP = 'ja-JP',
      JA_JP_BROADBANDMODEL = 'ja-JP_BroadbandModel',
      JA_JP_MULTIMEDIA = 'ja-JP_Multimedia',
      JA_JP_NARROWBANDMODEL = 'ja-JP_NarrowbandModel',
      JA_JP_TELEPHONY = 'ja-JP_Telephony',
      KO_KR_BROADBANDMODEL = 'ko-KR_BroadbandModel',
      KO_KR_MULTIMEDIA = 'ko-KR_Multimedia',
      KO_KR_NARROWBANDMODEL = 'ko-KR_NarrowbandModel',
      KO_KR_TELEPHONY = 'ko-KR_Telephony',
      NL_BE_TELEPHONY = 'nl-BE_Telephony',
      NL_NL_BROADBANDMODEL = 'nl-NL_BroadbandModel',
      NL_NL_MULTIMEDIA = 'nl-NL_Multimedia',
      NL_NL_NARROWBANDMODEL = 'nl-NL_NarrowbandModel',
      NL_NL_TELEPHONY = 'nl-NL_Telephony',
      PT_BR = 'pt-BR',
      PT_BR_BROADBANDMODEL = 'pt-BR_BroadbandModel',
      PT_BR_MULTIMEDIA = 'pt-BR_Multimedia',
      PT_BR_NARROWBANDMODEL = 'pt-BR_NarrowbandModel',
      PT_BR_TELEPHONY = 'pt-BR_Telephony',
      SV_SE_TELEPHONY = 'sv-SE_Telephony',
      ZH_CN_BROADBANDMODEL = 'zh-CN_BroadbandModel',
      ZH_CN_NARROWBANDMODEL = 'zh-CN_NarrowbandModel',
      ZH_CN_TELEPHONY = 'zh-CN_Telephony',
    }
  }

  /** Parameters for the `registerCallback` operation. */
  export interface RegisterCallbackParams {
    /** An HTTP or HTTPS URL to which callback notifications are to be sent. To be allowlisted, the URL must
     *  successfully echo the challenge string during URL verification. During verification, the client can also check
     *  the signature that the service sends in the `X-Callback-Signature` header to verify the origin of the request.
     */
    callbackUrl: string;
    /** A user-specified string that the service uses to generate the HMAC-SHA1 signature that it sends via the
     *  `X-Callback-Signature` header. The service includes the header during URL verification and with every
     *  notification sent to the callback URL. It calculates the signature over the payload of the notification. If you
     *  omit the parameter, the service does not send the header.
     */
    userSecret?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `unregisterCallback` operation. */
  export interface UnregisterCallbackParams {
    /** The callback URL that is to be unregistered. */
    callbackUrl: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createJob` operation. */
  export interface CreateJobParams {
    /** The audio to transcribe. */
    audio: NodeJS.ReadableStream | Buffer;
    /** The format (MIME type) of the audio. For more information about specifying an audio format, see **Audio
     *  formats (content types)** in the method description.
     */
    contentType?: CreateJobConstants.ContentType | string;
    /** The model to use for speech recognition. If you omit the `model` parameter, the service uses the US English
     *  `en-US_BroadbandModel` by default.
     *
     *  _For IBM Cloud Pak for Data,_ if you do not install the `en-US_BroadbandModel`, you must either specify a model
     *  with the request or specify a new default model for your installation of the service.
     *
     *  **See also:**
     *  * [Using a model for speech
     *  recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use)
     *  * [Using the default
     *  model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use#models-use-default).
     */
    model?: CreateJobConstants.Model | string;
    /** A URL to which callback notifications are to be sent. The URL must already be successfully allowlisted by
     *  using the [Register a callback](#registercallback) method. You can include the same callback URL with any number
     *  of job creation requests. Omit the parameter to poll the service for job completion and results.
     *
     *  Use the `user_token` parameter to specify a unique user-specified string with each job to differentiate the
     *  callback notifications for the jobs.
     */
    callbackUrl?: string;
    /** If the job includes a callback URL, a comma-separated list of notification events to which to subscribe.
     *  Valid events are
     *  * `recognitions.started` generates a callback notification when the service begins to process the job.
     *  * `recognitions.completed` generates a callback notification when the job is complete. You must use the [Check a
     *  job](#checkjob) method to retrieve the results before they time out or are deleted.
     *  * `recognitions.completed_with_results` generates a callback notification when the job is complete. The
     *  notification includes the results of the request.
     *  * `recognitions.failed` generates a callback notification if the service experiences an error while processing
     *  the job.
     *
     *  The `recognitions.completed` and `recognitions.completed_with_results` events are incompatible. You can specify
     *  only of the two events.
     *
     *  If the job includes a callback URL, omit the parameter to subscribe to the default events:
     *  `recognitions.started`, `recognitions.completed`, and `recognitions.failed`. If the job does not include a
     *  callback URL, omit the parameter.
     */
    events?: CreateJobConstants.Events | string;
    /** If the job includes a callback URL, a user-specified string that the service is to include with each
     *  callback notification for the job; the token allows the user to maintain an internal mapping between jobs and
     *  notification events. If the job does not include a callback URL, omit the parameter.
     */
    userToken?: string;
    /** The number of minutes for which the results are to be available after the job has finished. If not delivered
     *  via a callback, the results must be retrieved within this time. Omit the parameter to use a time to live of one
     *  week. The parameter is valid with or without a callback URL.
     */
    resultsTtl?: number;
    /** The customization ID (GUID) of a custom language model that is to be used with the recognition request. The
     *  base model of the specified custom language model must match the model specified with the `model` parameter. You
     *  must make the request with credentials for the instance of the service that owns the custom model. By default,
     *  no custom language model is used. See [Using a custom language model for speech
     *  recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageUse).
     *
     *  **Note:** Use this parameter instead of the deprecated `customization_id` parameter.
     */
    languageCustomizationId?: string;
    /** The customization ID (GUID) of a custom acoustic model that is to be used with the recognition request. The
     *  base model of the specified custom acoustic model must match the model specified with the `model` parameter. You
     *  must make the request with credentials for the instance of the service that owns the custom model. By default,
     *  no custom acoustic model is used. See [Using a custom acoustic model for speech
     *  recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-acousticUse).
     */
    acousticCustomizationId?: string;
    /** The version of the specified base model that is to be used with the recognition request. Multiple versions
     *  of a base model can exist when a model is updated for internal improvements. The parameter is intended primarily
     *  for use with custom models that have been upgraded for a new base model. The default value depends on whether
     *  the parameter is used with or without a custom model. See [Making speech recognition requests with upgraded
     *  custom
     *  models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade-use#custom-upgrade-use-recognition).
     */
    baseModelVersion?: string;
    /** If you specify the customization ID (GUID) of a custom language model with the recognition request, the
     *  customization weight tells the service how much weight to give to words from the custom language model compared
     *  to those from the base model for the current request.
     *
     *  Specify a value between 0.0 and 1.0. Unless a different customization weight was specified for the custom model
     *  when the model was trained, the default value is:
     *  * 0.5 for large speech models
     *  * 0.3 for previous-generation models
     *  * 0.2 for most next-generation models
     *  * 0.1 for next-generation English and Japanese models
     *
     *  A customization weight that you specify overrides a weight that was specified when the custom model was trained.
     *  The default value yields the best performance in general. Assign a higher value if your audio makes frequent use
     *  of OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy
     *  of phrases from the custom model's domain, but it can negatively affect performance on non-domain phrases.
     *
     *  See [Using customization
     *  weight](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageUse#weight).
     */
    customizationWeight?: number;
    /** The time in seconds after which, if only silence (no speech) is detected in streaming audio, the connection
     *  is closed with a 400 error. The parameter is useful for stopping audio submission from a live microphone when a
     *  user simply walks away. Use `-1` for infinity. See [Inactivity
     *  timeout](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-input#timeouts-inactivity).
     */
    inactivityTimeout?: number;
    /** An array of keyword strings to spot in the audio. Each keyword string can include one or more string tokens.
     *  Keywords are spotted only in the final results, not in interim hypotheses. If you specify any keywords, you must
     *  also specify a keywords threshold. Omit the parameter or specify an empty array if you do not need to spot
     *  keywords.
     *
     *  You can spot a maximum of 1000 keywords with a single request. A single keyword can have a maximum length of
     *  1024 characters, though the maximum effective length for double-byte languages might be shorter. Keywords are
     *  case-insensitive.
     *
     *  See [Keyword
     *  spotting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#keyword-spotting).
     */
    keywords?: string[];
    /** A confidence value that is the lower bound for spotting a keyword. A word is considered to match a keyword
     *  if its confidence is greater than or equal to the threshold. Specify a probability between 0.0 and 1.0. If you
     *  specify a threshold, you must also specify one or more keywords. The service performs no keyword spotting if you
     *  omit either parameter. See [Keyword
     *  spotting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#keyword-spotting).
     */
    keywordsThreshold?: number;
    /** The maximum number of alternative transcripts that the service is to return. By default, the service returns
     *  a single transcript. If you specify a value of `0`, the service uses the default value, `1`. See [Maximum
     *  alternatives](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#max-alternatives).
     */
    maxAlternatives?: number;
    /** A confidence value that is the lower bound for identifying a hypothesis as a possible word alternative (also
     *  known as "Confusion Networks"). An alternative word is considered if its confidence is greater than or equal to
     *  the threshold. Specify a probability between 0.0 and 1.0. By default, the service computes no alternative words.
     *  See [Word
     *  alternatives](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-spotting#word-alternatives).
     */
    wordAlternativesThreshold?: number;
    /** If `true`, the service returns a confidence measure in the range of 0.0 to 1.0 for each word. By default,
     *  the service returns no word confidence scores. See [Word
     *  confidence](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#word-confidence).
     */
    wordConfidence?: boolean;
    /** If `true`, the service returns time alignment for each word. By default, no timestamps are returned. See
     *  [Word timestamps](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metadata#word-timestamps).
     */
    timestamps?: boolean;
    /** If `true`, the service filters profanity from all output except for keyword results by replacing
     *  inappropriate words with a series of asterisks. Set the parameter to `false` to return results with no
     *  censoring.
     *
     *  **Note:** The parameter can be used with US English and Japanese transcription only. See [Profanity
     *  filtering](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#profanity-filtering).
     */
    profanityFilter?: boolean;
    /** If `true`, the service converts dates, times, series of digits and numbers, phone numbers, currency values,
     *  and internet addresses into more readable, conventional representations in the final transcript of a recognition
     *  request. For US English, the service also converts certain keyword strings to punctuation symbols. By default,
     *  the service performs no smart formatting.
     *
     *  **Note:** The parameter can be used with US English, Japanese, and Spanish (all dialects) transcription only.
     *
     *  See [Smart
     *  formatting](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#smart-formatting).
     */
    smartFormatting?: boolean;
    /** Smart formatting version for large speech models and next-generation models is supported in US English,
     *  Brazilian Portuguese, French, German, Spanish and French Canadian languages.
     */
    smartFormattingVersion?: number;
    /** If `true`, the response includes labels that identify which words were spoken by which participants in a
     *  multi-person exchange. By default, the service returns no speaker labels. Setting `speaker_labels` to `true`
     *  forces the `timestamps` parameter to be `true`, regardless of whether you specify `false` for the parameter.
     *  * _For previous-generation models,_ the parameter can be used with Australian English, US English, German,
     *  Japanese, Korean, and Spanish (both broadband and narrowband models) and UK English (narrowband model)
     *  transcription only.
     *  * _For large speech models and next-generation models,_ the parameter can be used with all available languages.
     *
     *  See [Speaker labels](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-speaker-labels).
     */
    speakerLabels?: boolean;
    /** The name of a grammar that is to be used with the recognition request. If you specify a grammar, you must
     *  also use the `language_customization_id` parameter to specify the name of the custom language model for which
     *  the grammar is defined. The service recognizes only strings that are recognized by the specified grammar; it
     *  does not recognize other custom words from the model's words resource.
     *
     *  See [Using a grammar for speech
     *  recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-grammarUse).
     */
    grammarName?: string;
    /** If `true`, the service redacts, or masks, numeric data from final transcripts. The feature redacts any
     *  number that has three or more consecutive digits by replacing each digit with an `X` character. It is intended
     *  to redact sensitive numeric data, such as credit card numbers. By default, the service performs no redaction.
     *
     *  When you enable redaction, the service automatically enables smart formatting, regardless of whether you
     *  explicitly disable that feature. To ensure maximum security, the service also disables keyword spotting (ignores
     *  the `keywords` and `keywords_threshold` parameters) and returns only a single final transcript (forces the
     *  `max_alternatives` parameter to be `1`).
     *
     *  **Note:** The parameter can be used with US English, Japanese, and Korean transcription only.
     *
     *  See [Numeric
     *  redaction](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-formatting#numeric-redaction).
     */
    redaction?: boolean;
    /** If `true`, requests processing metrics about the service's transcription of the input audio. The service
     *  returns processing metrics at the interval specified by the `processing_metrics_interval` parameter. It also
     *  returns processing metrics for transcription events, for example, for final and interim results. By default, the
     *  service returns no processing metrics.
     *
     *  See [Processing
     *  metrics](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metrics#processing-metrics).
     */
    processingMetrics?: boolean;
    /** Specifies the interval in real wall-clock seconds at which the service is to return processing metrics. The
     *  parameter is ignored unless the `processing_metrics` parameter is set to `true`.
     *
     *  The parameter accepts a minimum value of 0.1 seconds. The level of precision is not restricted, so you can
     *  specify values such as 0.25 and 0.125.
     *
     *  The service does not impose a maximum value. If you want to receive processing metrics only for transcription
     *  events instead of at periodic intervals, set the value to a large number. If the value is larger than the
     *  duration of the audio, the service returns processing metrics only for transcription events.
     *
     *  See [Processing
     *  metrics](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metrics#processing-metrics).
     */
    processingMetricsInterval?: number;
    /** If `true`, requests detailed information about the signal characteristics of the input audio. The service
     *  returns audio metrics with the final transcription results. By default, the service returns no audio metrics.
     *
     *  See [Audio metrics](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-metrics#audio-metrics).
     */
    audioMetrics?: boolean;
    /** Specifies the duration of the pause interval at which the service splits a transcript into multiple final
     *  results. If the service detects pauses or extended silence before it reaches the end of the audio stream, its
     *  response can include multiple final results. Silence indicates a point at which the speaker pauses between
     *  spoken words or phrases.
     *
     *  Specify a value for the pause interval in the range of 0.0 to 120.0.
     *  * A value greater than 0 specifies the interval that the service is to use for speech recognition.
     *  * A value of 0 indicates that the service is to use the default interval. It is equivalent to omitting the
     *  parameter.
     *
     *  The default pause interval for most languages is 0.8 seconds; the default for Chinese is 0.6 seconds.
     *
     *  See [End of phrase silence
     *  time](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#silence-time).
     */
    endOfPhraseSilenceTime?: number;
    /** If `true`, directs the service to split the transcript into multiple final results based on semantic
     *  features of the input, for example, at the conclusion of meaningful phrases such as sentences. The service bases
     *  its understanding of semantic features on the base language model that you use with a request. Custom language
     *  models and grammars can also influence how and where the service splits a transcript.
     *
     *  By default, the service splits transcripts based solely on the pause interval. If the parameters are used
     *  together on the same request, `end_of_phrase_silence_time` has precedence over `split_transcript_at_phrase_end`.
     *
     *
     *  See [Split transcript at phrase
     *  end](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#split-transcript).
     */
    splitTranscriptAtPhraseEnd?: boolean;
    /** The sensitivity of speech activity detection that the service is to perform. Use the parameter to suppress
     *  word insertions from music, coughing, and other non-speech events. The service biases the audio it passes for
     *  speech recognition by evaluating the input audio against prior models of speech and non-speech activity.
     *
     *  Specify a value between 0.0 and 1.0:
     *  * 0.0 suppresses all audio (no speech is transcribed).
     *  * 0.5 (the default) provides a reasonable compromise for the level of sensitivity.
     *  * 1.0 suppresses no audio (speech detection sensitivity is disabled).
     *
     *  The values increase on a monotonic curve. Specifying one or two decimal places of precision (for example,
     *  `0.55`) is typically more than sufficient.
     *
     *  The parameter is supported with all large speech models, next-generation models and with most
     *  previous-generation models. See [Speech detector
     *  sensitivity](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-parameters-sensitivity)
     *  and [Language model
     *  support](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-support).
     */
    speechDetectorSensitivity?: number;
    /** The level to which the service is to suppress background audio based on its volume to prevent it from being
     *  transcribed as speech. Use the parameter to suppress side conversations or background noise.
     *
     *  Specify a value in the range of 0.0 to 1.0:
     *  * 0.0 (the default) provides no suppression (background audio suppression is disabled).
     *  * 0.5 provides a reasonable level of audio suppression for general usage.
     *  * 1.0 suppresses all audio (no audio is transcribed).
     *
     *  The values increase on a monotonic curve. Specifying one or two decimal places of precision (for example,
     *  `0.55`) is typically more than sufficient.
     *
     *  The parameter is supported with all large speech models, next-generation models and with most
     *  previous-generation models. See [Background audio
     *  suppression](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-parameters-suppression)
     *  and [Language model
     *  support](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-detection#detection-support).
     */
    backgroundAudioSuppression?: number;
    /** If `true` for next-generation `Multimedia` and `Telephony` models that support low latency, directs the
     *  service to produce results even more quickly than it usually does. Next-generation models produce transcription
     *  results faster than previous-generation models. The `low_latency` parameter causes the models to produce results
     *  even more quickly, though the results might be less accurate when the parameter is used.
     *
     *  The parameter is not available for large speech models and previous-generation `Broadband` and `Narrowband`
     *  models. It is available for most next-generation models.
     *  * For a list of next-generation models that support low latency, see [Supported next-generation language
     *  models](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-ng#models-ng-supported).
     *  * For more information about the `low_latency` parameter, see [Low
     *  latency](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-interim#low-latency).
     */
    lowLatency?: boolean;
    /** For large speech models and next-generation models, an indication of whether the service is biased to
     *  recognize shorter or longer strings of characters when developing transcription hypotheses. By default, the
     *  service is optimized to produce the best balance of strings of different lengths.
     *
     *  The default bias is 0.0. The allowable range of values is -1.0 to 1.0.
     *  * Negative values bias the service to favor hypotheses with shorter strings of characters.
     *  * Positive values bias the service to favor hypotheses with longer strings of characters.
     *
     *  As the value approaches -1.0 or 1.0, the impact of the parameter becomes more pronounced. To determine the most
     *  effective value for your scenario, start by setting the value of the parameter to a small increment, such as
     *  -0.1, -0.05, 0.05, or 0.1, and assess how the value impacts the transcription results. Then experiment with
     *  different values as necessary, adjusting the value by small increments.
     *
     *  The parameter is not available for previous-generation models.
     *
     *  See [Character insertion
     *  bias](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-parsing#insertion-bias).
     */
    characterInsertionBias?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createJob` operation. */
  export namespace CreateJobConstants {
    /** The format (MIME type) of the audio. For more information about specifying an audio format, see **Audio formats (content types)** in the method description. */
    export enum ContentType {
      APPLICATION_OCTET_STREAM = 'application/octet-stream',
      AUDIO_ALAW = 'audio/alaw',
      AUDIO_BASIC = 'audio/basic',
      AUDIO_FLAC = 'audio/flac',
      AUDIO_G729 = 'audio/g729',
      AUDIO_L16 = 'audio/l16',
      AUDIO_MP3 = 'audio/mp3',
      AUDIO_MPEG = 'audio/mpeg',
      AUDIO_MULAW = 'audio/mulaw',
      AUDIO_OGG = 'audio/ogg',
      AUDIO_OGG_CODECS_OPUS = 'audio/ogg;codecs=opus',
      AUDIO_OGG_CODECS_VORBIS = 'audio/ogg;codecs=vorbis',
      AUDIO_WAV = 'audio/wav',
      AUDIO_WEBM = 'audio/webm',
      AUDIO_WEBM_CODECS_OPUS = 'audio/webm;codecs=opus',
      AUDIO_WEBM_CODECS_VORBIS = 'audio/webm;codecs=vorbis',
    }
    /** The model to use for speech recognition. If you omit the `model` parameter, the service uses the US English `en-US_BroadbandModel` by default. _For IBM Cloud Pak for Data,_ if you do not install the `en-US_BroadbandModel`, you must either specify a model with the request or specify a new default model for your installation of the service. **See also:** * [Using a model for speech recognition](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use) * [Using the default model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models-use#models-use-default). */
    export enum Model {
      AR_MS_BROADBANDMODEL = 'ar-MS_BroadbandModel',
      AR_MS_TELEPHONY = 'ar-MS_Telephony',
      CS_CZ_TELEPHONY = 'cs-CZ_Telephony',
      DE_DE_BROADBANDMODEL = 'de-DE_BroadbandModel',
      DE_DE_MULTIMEDIA = 'de-DE_Multimedia',
      DE_DE_NARROWBANDMODEL = 'de-DE_NarrowbandModel',
      DE_DE_TELEPHONY = 'de-DE_Telephony',
      EN_AU = 'en-AU',
      EN_AU_BROADBANDMODEL = 'en-AU_BroadbandModel',
      EN_AU_MULTIMEDIA = 'en-AU_Multimedia',
      EN_AU_NARROWBANDMODEL = 'en-AU_NarrowbandModel',
      EN_AU_TELEPHONY = 'en-AU_Telephony',
      EN_IN = 'en-IN',
      EN_IN_TELEPHONY = 'en-IN_Telephony',
      EN_GB = 'en-GB',
      EN_GB_BROADBANDMODEL = 'en-GB_BroadbandModel',
      EN_GB_MULTIMEDIA = 'en-GB_Multimedia',
      EN_GB_NARROWBANDMODEL = 'en-GB_NarrowbandModel',
      EN_GB_TELEPHONY = 'en-GB_Telephony',
      EN_US = 'en-US',
      EN_US_BROADBANDMODEL = 'en-US_BroadbandModel',
      EN_US_MULTIMEDIA = 'en-US_Multimedia',
      EN_US_NARROWBANDMODEL = 'en-US_NarrowbandModel',
      EN_US_SHORTFORM_NARROWBANDMODEL = 'en-US_ShortForm_NarrowbandModel',
      EN_US_TELEPHONY = 'en-US_Telephony',
      EN_WW_MEDICAL_TELEPHONY = 'en-WW_Medical_Telephony',
      ES_AR = 'es-AR',
      ES_AR_BROADBANDMODEL = 'es-AR_BroadbandModel',
      ES_AR_NARROWBANDMODEL = 'es-AR_NarrowbandModel',
      ES_CL = 'es-CL',
      ES_CL_BROADBANDMODEL = 'es-CL_BroadbandModel',
      ES_CL_NARROWBANDMODEL = 'es-CL_NarrowbandModel',
      ES_CO = 'es-CO',
      ES_CO_BROADBANDMODEL = 'es-CO_BroadbandModel',
      ES_CO_NARROWBANDMODEL = 'es-CO_NarrowbandModel',
      ES_ES = 'es-ES',
      ES_ES_BROADBANDMODEL = 'es-ES_BroadbandModel',
      ES_ES_NARROWBANDMODEL = 'es-ES_NarrowbandModel',
      ES_ES_MULTIMEDIA = 'es-ES_Multimedia',
      ES_ES_TELEPHONY = 'es-ES_Telephony',
      ES_LA_TELEPHONY = 'es-LA_Telephony',
      ES_MX = 'es-MX',
      ES_MX_BROADBANDMODEL = 'es-MX_BroadbandModel',
      ES_MX_NARROWBANDMODEL = 'es-MX_NarrowbandModel',
      ES_PE = 'es-PE',
      ES_PE_BROADBANDMODEL = 'es-PE_BroadbandModel',
      ES_PE_NARROWBANDMODEL = 'es-PE_NarrowbandModel',
      FR_CA = 'fr-CA',
      FR_CA_BROADBANDMODEL = 'fr-CA_BroadbandModel',
      FR_CA_MULTIMEDIA = 'fr-CA_Multimedia',
      FR_CA_NARROWBANDMODEL = 'fr-CA_NarrowbandModel',
      FR_CA_TELEPHONY = 'fr-CA_Telephony',
      FR_FR = 'fr-FR',
      FR_FR_BROADBANDMODEL = 'fr-FR_BroadbandModel',
      FR_FR_MULTIMEDIA = 'fr-FR_Multimedia',
      FR_FR_NARROWBANDMODEL = 'fr-FR_NarrowbandModel',
      FR_FR_TELEPHONY = 'fr-FR_Telephony',
      HI_IN_TELEPHONY = 'hi-IN_Telephony',
      IT_IT_BROADBANDMODEL = 'it-IT_BroadbandModel',
      IT_IT_NARROWBANDMODEL = 'it-IT_NarrowbandModel',
      IT_IT_MULTIMEDIA = 'it-IT_Multimedia',
      IT_IT_TELEPHONY = 'it-IT_Telephony',
      JA_JP = 'ja-JP',
      JA_JP_BROADBANDMODEL = 'ja-JP_BroadbandModel',
      JA_JP_MULTIMEDIA = 'ja-JP_Multimedia',
      JA_JP_NARROWBANDMODEL = 'ja-JP_NarrowbandModel',
      JA_JP_TELEPHONY = 'ja-JP_Telephony',
      KO_KR_BROADBANDMODEL = 'ko-KR_BroadbandModel',
      KO_KR_MULTIMEDIA = 'ko-KR_Multimedia',
      KO_KR_NARROWBANDMODEL = 'ko-KR_NarrowbandModel',
      KO_KR_TELEPHONY = 'ko-KR_Telephony',
      NL_BE_TELEPHONY = 'nl-BE_Telephony',
      NL_NL_BROADBANDMODEL = 'nl-NL_BroadbandModel',
      NL_NL_MULTIMEDIA = 'nl-NL_Multimedia',
      NL_NL_NARROWBANDMODEL = 'nl-NL_NarrowbandModel',
      NL_NL_TELEPHONY = 'nl-NL_Telephony',
      PT_BR = 'pt-BR',
      PT_BR_BROADBANDMODEL = 'pt-BR_BroadbandModel',
      PT_BR_MULTIMEDIA = 'pt-BR_Multimedia',
      PT_BR_NARROWBANDMODEL = 'pt-BR_NarrowbandModel',
      PT_BR_TELEPHONY = 'pt-BR_Telephony',
      SV_SE_TELEPHONY = 'sv-SE_Telephony',
      ZH_CN_BROADBANDMODEL = 'zh-CN_BroadbandModel',
      ZH_CN_NARROWBANDMODEL = 'zh-CN_NarrowbandModel',
      ZH_CN_TELEPHONY = 'zh-CN_Telephony',
    }
    /** If the job includes a callback URL, a comma-separated list of notification events to which to subscribe. Valid events are * `recognitions.started` generates a callback notification when the service begins to process the job. * `recognitions.completed` generates a callback notification when the job is complete. You must use the [Check a job](#checkjob) method to retrieve the results before they time out or are deleted. * `recognitions.completed_with_results` generates a callback notification when the job is complete. The notification includes the results of the request. * `recognitions.failed` generates a callback notification if the service experiences an error while processing the job. The `recognitions.completed` and `recognitions.completed_with_results` events are incompatible. You can specify only of the two events. If the job includes a callback URL, omit the parameter to subscribe to the default events: `recognitions.started`, `recognitions.completed`, and `recognitions.failed`. If the job does not include a callback URL, omit the parameter. */
    export enum Events {
      RECOGNITIONS_STARTED = 'recognitions.started',
      RECOGNITIONS_COMPLETED = 'recognitions.completed',
      RECOGNITIONS_COMPLETED_WITH_RESULTS = 'recognitions.completed_with_results',
      RECOGNITIONS_FAILED = 'recognitions.failed',
    }
  }

  /** Parameters for the `checkJobs` operation. */
  export interface CheckJobsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `checkJob` operation. */
  export interface CheckJobParams {
    /** The identifier of the asynchronous job that is to be used for the request. You must make the request with
     *  credentials for the instance of the service that owns the job.
     */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteJob` operation. */
  export interface DeleteJobParams {
    /** The identifier of the asynchronous job that is to be used for the request. You must make the request with
     *  credentials for the instance of the service that owns the job.
     */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLanguageModel` operation. */
  export interface CreateLanguageModelParams {
    /** A user-defined name for the new custom language model. Use a localized name that matches the language of the
     *  custom model. Use a name that describes the domain of the custom model, such as `Medical custom model` or `Legal
     *  custom model`. Use a name that is unique among all custom language models that you own.
     *
     *  Include a maximum of 256 characters in the name. Do not use backslashes, slashes, colons, equal signs,
     *  ampersands, or question marks in the name.
     */
    name: string;
    /** The name of the base language model that is to be customized by the new custom language model. The new
     *  custom model can be used only with the base model that it customizes.
     *
     *  To determine whether a base model supports language model customization, use the [Get a model](#getmodel) method
     *  and check that the attribute `custom_language_model` is set to `true`. You can also refer to [Language support
     *  for customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
     */
    baseModelName: CreateLanguageModelConstants.BaseModelName | string;
    /** The dialect of the specified language that is to be used with the custom language model. _For all languages,
     *  it is always safe to omit this field._ The service automatically uses the language identifier from the name of
     *  the base model. For example, the service automatically uses `en-US` for all US English models.
     *
     *  If you specify the `dialect` for a new custom model, follow these guidelines. _For non-Spanish
     *  previous-generation models and for next-generation models,_ you must specify a value that matches the
     *  five-character language identifier from the name of the base model. _For Spanish previous-generation models,_
     *  you must specify one of the following values:
     *  * `es-ES` for Castilian Spanish (`es-ES` models)
     *  * `es-LA` for Latin American Spanish (`es-AR`, `es-CL`, `es-CO`, and `es-PE` models)
     *  * `es-US` for Mexican (North American) Spanish (`es-MX` models)
     *
     *  All values that you pass for the `dialect` field are case-insensitive.
     */
    dialect?: string;
    /** A recommended description of the new custom language model. Use a localized description that matches the
     *  language of the custom model. Include a maximum of 128 characters in the description.
     */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createLanguageModel` operation. */
  export namespace CreateLanguageModelConstants {
    /** The name of the base language model that is to be customized by the new custom language model. The new custom model can be used only with the base model that it customizes. To determine whether a base model supports language model customization, use the [Get a model](#getmodel) method and check that the attribute `custom_language_model` is set to `true`. You can also refer to [Language support for customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support). */
    export enum BaseModelName {
      AR_MS_TELEPHONY = 'ar-MS_Telephony',
      CS_CZ_TELEPHONY = 'cs-CZ_Telephony',
      DE_DE_BROADBANDMODEL = 'de-DE_BroadbandModel',
      DE_DE_MULTIMEDIA = 'de-DE_Multimedia',
      DE_DE_NARROWBANDMODEL = 'de-DE_NarrowbandModel',
      DE_DE_TELEPHONY = 'de-DE_Telephony',
      EN_AU = 'en-AU',
      EN_AU_BROADBANDMODEL = 'en-AU_BroadbandModel',
      EN_AU_MULTIMEDIA = 'en-AU_Multimedia',
      EN_AU_NARROWBANDMODEL = 'en-AU_NarrowbandModel',
      EN_AU_TELEPHONY = 'en-AU_Telephony',
      EN_GB = 'en-GB',
      EN_GB_BROADBANDMODEL = 'en-GB_BroadbandModel',
      EN_GB_MULTIMEDIA = 'en-GB_Multimedia',
      EN_GB_NARROWBANDMODEL = 'en-GB_NarrowbandModel',
      EN_GB_TELEPHONY = 'en-GB_Telephony',
      EN_IN = 'en-IN',
      EN_IN_TELEPHONY = 'en-IN_Telephony',
      EN_US = 'en-US',
      EN_US_BROADBANDMODEL = 'en-US_BroadbandModel',
      EN_US_MULTIMEDIA = 'en-US_Multimedia',
      EN_US_NARROWBANDMODEL = 'en-US_NarrowbandModel',
      EN_US_SHORTFORM_NARROWBANDMODEL = 'en-US_ShortForm_NarrowbandModel',
      EN_US_TELEPHONY = 'en-US_Telephony',
      EN_WW_MEDICAL_TELEPHONY = 'en-WW_Medical_Telephony',
      ES_AR = 'es-AR',
      ES_AR_BROADBANDMODEL = 'es-AR_BroadbandModel',
      ES_AR_NARROWBANDMODEL = 'es-AR_NarrowbandModel',
      ES_CL = 'es-CL',
      ES_CL_BROADBANDMODEL = 'es-CL_BroadbandModel',
      ES_CL_NARROWBANDMODEL = 'es-CL_NarrowbandModel',
      ES_CO = 'es-CO',
      ES_CO_BROADBANDMODEL = 'es-CO_BroadbandModel',
      ES_CO_NARROWBANDMODEL = 'es-CO_NarrowbandModel',
      ES_ES = 'es-ES',
      ES_ES_BROADBANDMODEL = 'es-ES_BroadbandModel',
      ES_ES_NARROWBANDMODEL = 'es-ES_NarrowbandModel',
      ES_ES_MULTIMEDIA = 'es-ES_Multimedia',
      ES_ES_TELEPHONY = 'es-ES_Telephony',
      ES_LA_TELEPHONY = 'es-LA_Telephony',
      ES_MX = 'es-MX',
      ES_MX_BROADBANDMODEL = 'es-MX_BroadbandModel',
      ES_MX_NARROWBANDMODEL = 'es-MX_NarrowbandModel',
      ES_PE = 'es-PE',
      ES_PE_BROADBANDMODEL = 'es-PE_BroadbandModel',
      ES_PE_NARROWBANDMODEL = 'es-PE_NarrowbandModel',
      FR_CA = 'fr-CA',
      FR_CA_BROADBANDMODEL = 'fr-CA_BroadbandModel',
      FR_CA_MULTIMEDIA = 'fr-CA_Multimedia',
      FR_CA_NARROWBANDMODEL = 'fr-CA_NarrowbandModel',
      FR_CA_TELEPHONY = 'fr-CA_Telephony',
      FR_FR = 'fr-FR',
      FR_FR_BROADBANDMODEL = 'fr-FR_BroadbandModel',
      FR_FR_MULTIMEDIA = 'fr-FR_Multimedia',
      FR_FR_NARROWBANDMODEL = 'fr-FR_NarrowbandModel',
      FR_FR_TELEPHONY = 'fr-FR_Telephony',
      HI_IN_TELEPHONY = 'hi-IN_Telephony',
      IT_IT_BROADBANDMODEL = 'it-IT_BroadbandModel',
      IT_IT_NARROWBANDMODEL = 'it-IT_NarrowbandModel',
      IT_IT_MULTIMEDIA = 'it-IT_Multimedia',
      IT_IT_TELEPHONY = 'it-IT_Telephony',
      JA_JP = 'ja-JP',
      JA_JP_BROADBANDMODEL = 'ja-JP_BroadbandModel',
      JA_JP_MULTIMEDIA = 'ja-JP_Multimedia',
      JA_JP_NARROWBANDMODEL = 'ja-JP_NarrowbandModel',
      JA_JP_TELEPHONY = 'ja-JP_Telephony',
      KO_KR_BROADBANDMODEL = 'ko-KR_BroadbandModel',
      KO_KR_MULTIMEDIA = 'ko-KR_Multimedia',
      KO_KR_NARROWBANDMODEL = 'ko-KR_NarrowbandModel',
      KO_KR_TELEPHONY = 'ko-KR_Telephony',
      NL_BE_TELEPHONY = 'nl-BE_Telephony',
      NL_NL_BROADBANDMODEL = 'nl-NL_BroadbandModel',
      NL_NL_MULTIMEDIA = 'nl-NL_Multimedia',
      NL_NL_NARROWBANDMODEL = 'nl-NL_NarrowbandModel',
      NL_NL_TELEPHONY = 'nl-NL_Telephony',
      PT_BR = 'pt-BR',
      PT_BR_BROADBANDMODEL = 'pt-BR_BroadbandModel',
      PT_BR_MULTIMEDIA = 'pt-BR_Multimedia',
      PT_BR_NARROWBANDMODEL = 'pt-BR_NarrowbandModel',
      PT_BR_TELEPHONY = 'pt-BR_Telephony',
      SV_SE_TELEPHONY = 'sv-SE_Telephony',
      ZH_CN_TELEPHONY = 'zh-CN_Telephony',
    }
  }

  /** Parameters for the `listLanguageModels` operation. */
  export interface ListLanguageModelsParams {
    /** The identifier of the language for which custom language or custom acoustic models are to be returned.
     *  Specify the five-character language identifier; for example, specify `en-US` to see all custom language or
     *  custom acoustic models that are based on US English models. Omit the parameter to see all custom language or
     *  custom acoustic models that are owned by the requesting credentials.
     *
     *  To determine the languages for which customization is available, see [Language support for
     *  customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
     */
    language?: ListLanguageModelsConstants.Language | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listLanguageModels` operation. */
  export namespace ListLanguageModelsConstants {
    /** The identifier of the language for which custom language or custom acoustic models are to be returned. Specify the five-character language identifier; for example, specify `en-US` to see all custom language or custom acoustic models that are based on US English models. Omit the parameter to see all custom language or custom acoustic models that are owned by the requesting credentials. To determine the languages for which customization is available, see [Language support for customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support). */
    export enum Language {
      AR_MS = 'ar-MS',
      CS_CZ = 'cs-CZ',
      DE_DE = 'de-DE',
      EN_AU = 'en-AU',
      EN_GB = 'en-GB',
      EN_IN = 'en-IN',
      EN_US = 'en-US',
      EN_WW = 'en-WW',
      ES_AR = 'es-AR',
      ES_CL = 'es-CL',
      ES_CO = 'es-CO',
      ES_ES = 'es-ES',
      ES_LA = 'es-LA',
      ES_MX = 'es-MX',
      ES_PE = 'es-PE',
      FR_CA = 'fr-CA',
      FR_FR = 'fr-FR',
      HI_IN = 'hi-IN',
      IT_IT = 'it-IT',
      JA_JP = 'ja-JP',
      KO_KR = 'ko-KR',
      NL_BE = 'nl-BE',
      NL_NL = 'nl-NL',
      PT_BR = 'pt-BR',
      SV_SE = 'sv-SE',
      ZH_CN = 'zh-CN',
    }
  }

  /** Parameters for the `getLanguageModel` operation. */
  export interface GetLanguageModelParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteLanguageModel` operation. */
  export interface DeleteLanguageModelParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `trainLanguageModel` operation. */
  export interface TrainLanguageModelParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** _For custom models that are based on previous-generation models_, the type of words from the custom language
     *  model's words resource on which to train the model:
     *  * `all` (the default) trains the model on all new words, regardless of whether they were extracted from corpora
     *  or grammars or were added or modified by the user.
     *  * `user` trains the model only on custom words that were added or modified by the user directly. The model is
     *  not trained on new words extracted from corpora or grammars.
     *
     *  _For custom models that are based on large speech models and next-generation models_, the service ignores the
     *  `word_type_to_add` parameter. The words resource contains only custom words that the user adds or modifies
     *  directly, so the parameter is unnecessary.
     */
    wordTypeToAdd?: TrainLanguageModelConstants.WordTypeToAdd | string;
    /** Specifies a customization weight for the custom language model. The customization weight tells the service
     *  how much weight to give to words from the custom language model compared to those from the base model for speech
     *  recognition. Specify a value between 0.0 and 1.0. The default value is:
     *  * 0.5 for large speech models
     *  * 0.3 for previous-generation models
     *  * 0.2 for most next-generation models
     *  * 0.1 for next-generation English and Japanese models
     *
     *  The default value yields the best performance in general. Assign a higher value if your audio makes frequent use
     *  of OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy
     *  of phrases from the custom model's domain, but it can negatively affect performance on non-domain phrases.
     *
     *  The value that you assign is used for all recognition requests that use the model. You can override it for any
     *  recognition request by specifying a customization weight for that request.
     *
     *  See [Using customization
     *  weight](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-languageUse#weight).
     */
    customizationWeight?: number;
    /** If `false`, allows training of the custom language model to proceed as long as the model contains at least
     *  one valid resource. The method returns an array of `TrainingWarning` objects that lists any invalid resources.
     *  By default (`true`), training of a custom language model fails (status code 400) if the model contains one or
     *  more invalid resources (corpus files, grammar files, or custom words).
     */
    strict?: boolean;
    /** If `true`, forces the training of the custom language model regardless of whether it contains any changes
     *  (is in the `ready` or `available` state). By default (`false`), the model must be in the `ready` state to be
     *  trained. You can use the parameter to train and thus upgrade a custom model that is based on an improved
     *  next-generation model. *The parameter is available only for IBM Cloud, not for IBM Cloud Pak for Data.*
     *
     *  See [Upgrading a custom language model based on an improved next-generation
     *  model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade#custom-upgrade-language-ng).
     */
    force?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `trainLanguageModel` operation. */
  export namespace TrainLanguageModelConstants {
    /** _For custom models that are based on previous-generation models_, the type of words from the custom language model's words resource on which to train the model: * `all` (the default) trains the model on all new words, regardless of whether they were extracted from corpora or grammars or were added or modified by the user. * `user` trains the model only on custom words that were added or modified by the user directly. The model is not trained on new words extracted from corpora or grammars. _For custom models that are based on large speech models and next-generation models_, the service ignores the `word_type_to_add` parameter. The words resource contains only custom words that the user adds or modifies directly, so the parameter is unnecessary. */
    export enum WordTypeToAdd {
      ALL = 'all',
      USER = 'user',
    }
  }

  /** Parameters for the `resetLanguageModel` operation. */
  export interface ResetLanguageModelParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `upgradeLanguageModel` operation. */
  export interface UpgradeLanguageModelParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listCorpora` operation. */
  export interface ListCorporaParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addCorpus` operation. */
  export interface AddCorpusParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The name of the new corpus for the custom language model. Use a localized name that matches the language of
     *  the custom model and reflects the contents of the corpus.
     *  * Include a maximum of 128 characters in the name.
     *  * Do not use characters that need to be URL-encoded. For example, do not use spaces, slashes, backslashes,
     *  colons, ampersands, double quotes, plus signs, equals signs, questions marks, and so on in the name. (The
     *  service does not prevent the use of these characters. But because they must be URL-encoded wherever used, their
     *  use is strongly discouraged.)
     *  * Do not use the name of an existing corpus or grammar that is already defined for the custom model.
     *  * Do not use the name `user`, which is reserved by the service to denote custom words that are added or modified
     *  by the user.
     *  * Do not use the name `base_lm` or `default_lm`. Both names are reserved for future use by the service.
     */
    corpusName: string;
    /** A plain text file that contains the training data for the corpus. Encode the file in UTF-8 if it contains
     *  non-ASCII characters; the service assumes UTF-8 encoding if it encounters non-ASCII characters.
     *
     *  Make sure that you know the character encoding of the file. You must use that same encoding when working with
     *  the words in the custom language model. For more information, see [Character encoding for custom
     *  words](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-manageWords#charEncoding).
     *
     *  With the `curl` command, use the `--data-binary` option to upload the file for the request.
     */
    corpusFile: NodeJS.ReadableStream | Buffer;
    /** If `true`, the specified corpus overwrites an existing corpus with the same name. If `false`, the request
     *  fails if a corpus with the same name already exists. The parameter has no effect if a corpus with the same name
     *  does not already exist.
     */
    allowOverwrite?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCorpus` operation. */
  export interface GetCorpusParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The name of the corpus for the custom language model. */
    corpusName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCorpus` operation. */
  export interface DeleteCorpusParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The name of the corpus for the custom language model. */
    corpusName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listWords` operation. */
  export interface ListWordsParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The type of words to be listed from the custom language model's words resource:
     *  * `all` (the default) shows all words.
     *  * `user` shows only custom words that were added or modified by the user directly.
     *  * `corpora` shows only OOV that were extracted from corpora.
     *  * `grammars` shows only OOV words that are recognized by grammars.
     *
     *  _For a custom model that is based on a next-generation model_, only `all` and `user` apply. Both options return
     *  the same results. Words from other sources are not added to custom models that are based on next-generation
     *  models.
     */
    wordType?: ListWordsConstants.WordType | string;
    /** Indicates the order in which the words are to be listed, `alphabetical` or by `count`. You can prepend an
     *  optional `+` or `-` to an argument to indicate whether the results are to be sorted in ascending or descending
     *  order. By default, words are sorted in ascending alphabetical order. For alphabetical ordering, the
     *  lexicographical precedence is numeric values, uppercase letters, and lowercase letters. For count ordering,
     *  values with the same count are ordered alphabetically. With the `curl` command, URL-encode the `+` symbol as
     *  `%2B`.
     */
    sort?: ListWordsConstants.Sort | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listWords` operation. */
  export namespace ListWordsConstants {
    /** The type of words to be listed from the custom language model's words resource: * `all` (the default) shows all words. * `user` shows only custom words that were added or modified by the user directly. * `corpora` shows only OOV that were extracted from corpora. * `grammars` shows only OOV words that are recognized by grammars. _For a custom model that is based on a next-generation model_, only `all` and `user` apply. Both options return the same results. Words from other sources are not added to custom models that are based on next-generation models. */
    export enum WordType {
      ALL = 'all',
      USER = 'user',
      CORPORA = 'corpora',
      GRAMMARS = 'grammars',
    }
    /** Indicates the order in which the words are to be listed, `alphabetical` or by `count`. You can prepend an optional `+` or `-` to an argument to indicate whether the results are to be sorted in ascending or descending order. By default, words are sorted in ascending alphabetical order. For alphabetical ordering, the lexicographical precedence is numeric values, uppercase letters, and lowercase letters. For count ordering, values with the same count are ordered alphabetically. With the `curl` command, URL-encode the `+` symbol as `%2B`. */
    export enum Sort {
      ALPHABETICAL = 'alphabetical',
      COUNT = 'count',
    }
  }

  /** Parameters for the `addWords` operation. */
  export interface AddWordsParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** An array of `CustomWord` objects that provides information about each custom word that is to be added to or
     *  updated in the custom language model.
     */
    words: CustomWord[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addWord` operation. */
  export interface AddWordParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The custom word that is to be added to or updated in the custom language model. Do not use characters that
     *  need to be URL-encoded, for example, spaces, slashes, backslashes, colons, ampersands, double quotes, plus
     *  signs, equals signs, or question marks. Use a `-` (dash) or `_` (underscore) to connect the tokens of compound
     *  words. URL-encode the word if it includes non-ASCII characters. For more information, see [Character
     *  encoding](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#charEncoding).
     */
    wordName: string;
    /** For the [Add custom words](#addwords) method, you must specify the custom word that is to be added to or
     *  updated in the custom model. Do not use characters that need to be URL-encoded, for example, spaces, slashes,
     *  backslashes, colons, ampersands, double quotes, plus signs, equals signs, or question marks. Use a `-` (dash) or
     *  `_` (underscore) to connect the tokens of compound words. A Japanese custom word can include at most 25
     *  characters, not including leading or trailing spaces.
     *
     *  Omit this parameter for the [Add a custom word](#addword) method.
     */
    word?: string;
    /** Parameter for custom words. You can use the 'mapping_only' key in custom words as a form of post processing.
     *  This key parameter has a boolean value to determine whether 'sounds_like' (for non-Japanese models) or word (for
     *  Japanese) is not used for the model fine-tuning, but for the replacement for 'display_as'. This feature helps
     *  you when you use custom words exclusively to map 'sounds_like' (or word) to 'display_as' value. When you use
     *  custom words solely for post-processing purposes that does not need fine-tuning.
     */
    mappingOnly?: string[];
    /** As array of sounds-like pronunciations for the custom word. Specify how words that are difficult to
     *  pronounce, foreign words, acronyms, and so on can be pronounced by users.
     *  * _For custom models that are based on previous-generation models_, for a word that is not in the service's base
     *  vocabulary, omit the parameter to have the service automatically generate a sounds-like pronunciation for the
     *  word.
     *  * For a word that is in the service's base vocabulary, use the parameter to specify additional pronunciations
     *  for the word. You cannot override the default pronunciation of a word; pronunciations you add augment the
     *  pronunciation from the base vocabulary.
     *
     *  A word can have at most five sounds-like pronunciations. A pronunciation can include at most 40 characters, not
     *  including leading or trailing spaces. A Japanese pronunciation can include at most 25 characters, not including
     *  leading or trailing spaces.
     */
    soundsLike?: string[];
    /** An alternative spelling for the custom word when it appears in a transcript. Use the parameter when you want
     *  the word to have a spelling that is different from its usual representation or from its spelling in corpora
     *  training data.
     *
     *  _For custom models that are based on next-generation models_, the service uses the spelling of the word as the
     *  display-as value if you omit the field.
     */
    displayAs?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getWord` operation. */
  export interface GetWordParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The custom word that is to be read from the custom language model. URL-encode the word if it includes
     *  non-ASCII characters. For more information, see [Character
     *  encoding](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#charEncoding).
     */
    wordName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteWord` operation. */
  export interface DeleteWordParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The custom word that is to be deleted from the custom language model. URL-encode the word if it includes
     *  non-ASCII characters. For more information, see [Character
     *  encoding](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-corporaWords#charEncoding).
     */
    wordName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listGrammars` operation. */
  export interface ListGrammarsParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addGrammar` operation. */
  export interface AddGrammarParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The name of the new grammar for the custom language model. Use a localized name that matches the language of
     *  the custom model and reflects the contents of the grammar.
     *  * Include a maximum of 128 characters in the name.
     *  * Do not use characters that need to be URL-encoded. For example, do not use spaces, slashes, backslashes,
     *  colons, ampersands, double quotes, plus signs, equals signs, questions marks, and so on in the name. (The
     *  service does not prevent the use of these characters. But because they must be URL-encoded wherever used, their
     *  use is strongly discouraged.)
     *  * Do not use the name of an existing grammar or corpus that is already defined for the custom model.
     *  * Do not use the name `user`, which is reserved by the service to denote custom words that are added or modified
     *  by the user.
     *  * Do not use the name `base_lm` or `default_lm`. Both names are reserved for future use by the service.
     */
    grammarName: string;
    /** A plain text file that contains the grammar in the format specified by the `Content-Type` header. Encode the
     *  file in UTF-8 (ASCII is a subset of UTF-8). Using any other encoding can lead to issues when compiling the
     *  grammar or to unexpected results in decoding. The service ignores an encoding that is specified in the header of
     *  the grammar.
     *
     *  With the `curl` command, use the `--data-binary` option to upload the file for the request.
     */
    grammarFile: NodeJS.ReadableStream | Buffer;
    /** The format (MIME type) of the grammar file:
     *  * `application/srgs` for Augmented Backus-Naur Form (ABNF), which uses a plain-text representation that is
     *  similar to traditional BNF grammars.
     *  * `application/srgs+xml` for XML Form, which uses XML elements to represent the grammar.
     */
    contentType: AddGrammarConstants.ContentType | string;
    /** If `true`, the specified grammar overwrites an existing grammar with the same name. If `false`, the request
     *  fails if a grammar with the same name already exists. The parameter has no effect if a grammar with the same
     *  name does not already exist.
     */
    allowOverwrite?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `addGrammar` operation. */
  export namespace AddGrammarConstants {
    /** The format (MIME type) of the grammar file: * `application/srgs` for Augmented Backus-Naur Form (ABNF), which uses a plain-text representation that is similar to traditional BNF grammars. * `application/srgs+xml` for XML Form, which uses XML elements to represent the grammar. */
    export enum ContentType {
      APPLICATION_SRGS = 'application/srgs',
      APPLICATION_SRGS_XML = 'application/srgs+xml',
    }
  }

  /** Parameters for the `getGrammar` operation. */
  export interface GetGrammarParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The name of the grammar for the custom language model. */
    grammarName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteGrammar` operation. */
  export interface DeleteGrammarParams {
    /** The customization ID (GUID) of the custom language model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The name of the grammar for the custom language model. */
    grammarName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createAcousticModel` operation. */
  export interface CreateAcousticModelParams {
    /** A user-defined name for the new custom acoustic model. Use a localized name that matches the language of the
     *  custom model. Use a name that describes the acoustic environment of the custom model, such as `Mobile custom
     *  model` or `Noisy car custom model`. Use a name that is unique among all custom acoustic models that you own.
     *
     *  Include a maximum of 256 characters in the name. Do not use backslashes, slashes, colons, equal signs,
     *  ampersands, or question marks in the name.
     */
    name: string;
    /** The name of the base language model that is to be customized by the new custom acoustic model. The new
     *  custom model can be used only with the base model that it customizes.
     *
     *  To determine whether a base model supports acoustic model customization, refer to [Language support for
     *  customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
     */
    baseModelName: CreateAcousticModelConstants.BaseModelName | string;
    /** A recommended description of the new custom acoustic model. Use a localized description that matches the
     *  language of the custom model. Include a maximum of 128 characters in the description.
     */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createAcousticModel` operation. */
  export namespace CreateAcousticModelConstants {
    /** The name of the base language model that is to be customized by the new custom acoustic model. The new custom model can be used only with the base model that it customizes. To determine whether a base model supports acoustic model customization, refer to [Language support for customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support). */
    export enum BaseModelName {
      AR_MS_BROADBANDMODEL = 'ar-MS_BroadbandModel',
      DE_DE_BROADBANDMODEL = 'de-DE_BroadbandModel',
      DE_DE_NARROWBANDMODEL = 'de-DE_NarrowbandModel',
      EN_AU_BROADBANDMODEL = 'en-AU_BroadbandModel',
      EN_AU_NARROWBANDMODEL = 'en-AU_NarrowbandModel',
      EN_GB_BROADBANDMODEL = 'en-GB_BroadbandModel',
      EN_GB_NARROWBANDMODEL = 'en-GB_NarrowbandModel',
      EN_US_BROADBANDMODEL = 'en-US_BroadbandModel',
      EN_US_NARROWBANDMODEL = 'en-US_NarrowbandModel',
      EN_US_SHORTFORM_NARROWBANDMODEL = 'en-US_ShortForm_NarrowbandModel',
      ES_AR = 'es-AR',
      ES_AR_BROADBANDMODEL = 'es-AR_BroadbandModel',
      ES_AR_NARROWBANDMODEL = 'es-AR_NarrowbandModel',
      ES_CL = 'es-CL',
      ES_CL_BROADBANDMODEL = 'es-CL_BroadbandModel',
      ES_CL_NARROWBANDMODEL = 'es-CL_NarrowbandModel',
      ES_CO = 'es-CO',
      ES_CO_BROADBANDMODEL = 'es-CO_BroadbandModel',
      ES_CO_NARROWBANDMODEL = 'es-CO_NarrowbandModel',
      ES_ES = 'es-ES',
      ES_ES_BROADBANDMODEL = 'es-ES_BroadbandModel',
      ES_ES_NARROWBANDMODEL = 'es-ES_NarrowbandModel',
      ES_MX = 'es-MX',
      ES_MX_BROADBANDMODEL = 'es-MX_BroadbandModel',
      ES_MX_NARROWBANDMODEL = 'es-MX_NarrowbandModel',
      ES_PE = 'es-PE',
      ES_PE_BROADBANDMODEL = 'es-PE_BroadbandModel',
      ES_PE_NARROWBANDMODEL = 'es-PE_NarrowbandModel',
      FR_CA_BROADBANDMODEL = 'fr-CA_BroadbandModel',
      FR_CA_NARROWBANDMODEL = 'fr-CA_NarrowbandModel',
      FR_FR_BROADBANDMODEL = 'fr-FR_BroadbandModel',
      FR_FR_NARROWBANDMODEL = 'fr-FR_NarrowbandModel',
      IT_IT_BROADBANDMODEL = 'it-IT_BroadbandModel',
      IT_IT_NARROWBANDMODEL = 'it-IT_NarrowbandModel',
      JA_JP_BROADBANDMODEL = 'ja-JP_BroadbandModel',
      JA_JP_NARROWBANDMODEL = 'ja-JP_NarrowbandModel',
      KO_KR_BROADBANDMODEL = 'ko-KR_BroadbandModel',
      KO_KR_NARROWBANDMODEL = 'ko-KR_NarrowbandModel',
      NL_NL_BROADBANDMODEL = 'nl-NL_BroadbandModel',
      NL_NL_NARROWBANDMODEL = 'nl-NL_NarrowbandModel',
      PT_BR = 'pt-BR',
      PT_BR_BROADBANDMODEL = 'pt-BR_BroadbandModel',
      PT_BR_NARROWBANDMODEL = 'pt-BR_NarrowbandModel',
      ZH_CN_BROADBANDMODEL = 'zh-CN_BroadbandModel',
      ZH_CN_NARROWBANDMODEL = 'zh-CN_NarrowbandModel',
    }
  }

  /** Parameters for the `listAcousticModels` operation. */
  export interface ListAcousticModelsParams {
    /** The identifier of the language for which custom language or custom acoustic models are to be returned.
     *  Specify the five-character language identifier; for example, specify `en-US` to see all custom language or
     *  custom acoustic models that are based on US English models. Omit the parameter to see all custom language or
     *  custom acoustic models that are owned by the requesting credentials.
     *
     *  To determine the languages for which customization is available, see [Language support for
     *  customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support).
     */
    language?: ListAcousticModelsConstants.Language | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listAcousticModels` operation. */
  export namespace ListAcousticModelsConstants {
    /** The identifier of the language for which custom language or custom acoustic models are to be returned. Specify the five-character language identifier; for example, specify `en-US` to see all custom language or custom acoustic models that are based on US English models. Omit the parameter to see all custom language or custom acoustic models that are owned by the requesting credentials. To determine the languages for which customization is available, see [Language support for customization](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-support). */
    export enum Language {
      AR_MS = 'ar-MS',
      CS_CZ = 'cs-CZ',
      DE_DE = 'de-DE',
      EN_AU = 'en-AU',
      EN_GB = 'en-GB',
      EN_IN = 'en-IN',
      EN_US = 'en-US',
      EN_WW = 'en-WW',
      ES_AR = 'es-AR',
      ES_CL = 'es-CL',
      ES_CO = 'es-CO',
      ES_ES = 'es-ES',
      ES_LA = 'es-LA',
      ES_MX = 'es-MX',
      ES_PE = 'es-PE',
      FR_CA = 'fr-CA',
      FR_FR = 'fr-FR',
      HI_IN = 'hi-IN',
      IT_IT = 'it-IT',
      JA_JP = 'ja-JP',
      KO_KR = 'ko-KR',
      NL_BE = 'nl-BE',
      NL_NL = 'nl-NL',
      PT_BR = 'pt-BR',
      SV_SE = 'sv-SE',
      ZH_CN = 'zh-CN',
    }
  }

  /** Parameters for the `getAcousticModel` operation. */
  export interface GetAcousticModelParams {
    /** The customization ID (GUID) of the custom acoustic model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAcousticModel` operation. */
  export interface DeleteAcousticModelParams {
    /** The customization ID (GUID) of the custom acoustic model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `trainAcousticModel` operation. */
  export interface TrainAcousticModelParams {
    /** The customization ID (GUID) of the custom acoustic model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The customization ID (GUID) of a custom language model that is to be used during training of the custom
     *  acoustic model. Specify a custom language model that has been trained with verbatim transcriptions of the audio
     *  resources or that contains words that are relevant to the contents of the audio resources. The custom language
     *  model must be based on the same version of the same base model as the custom acoustic model, and the custom
     *  language model must be fully trained and available. The credentials specified with the request must own both
     *  custom models.
     */
    customLanguageModelId?: string;
    /** If `false`, allows training of the custom acoustic model to proceed as long as the model contains at least
     *  one valid audio resource. The method returns an array of `TrainingWarning` objects that lists any invalid
     *  resources. By default (`true`), training of a custom acoustic model fails (status code 400) if the model
     *  contains one or more invalid audio resources.
     */
    strict?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `resetAcousticModel` operation. */
  export interface ResetAcousticModelParams {
    /** The customization ID (GUID) of the custom acoustic model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `upgradeAcousticModel` operation. */
  export interface UpgradeAcousticModelParams {
    /** The customization ID (GUID) of the custom acoustic model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** If the custom acoustic model was trained with a custom language model, the customization ID (GUID) of that
     *  custom language model. The custom language model must be upgraded before the custom acoustic model can be
     *  upgraded. The custom language model must be fully trained and available. The credentials specified with the
     *  request must own both custom models.
     */
    customLanguageModelId?: string;
    /** If `true`, forces the upgrade of a custom acoustic model for which no input data has been modified since it
     *  was last trained. Use this parameter only to force the upgrade of a custom acoustic model that is trained with a
     *  custom language model, and only if you receive a 400 response code and the message `No input data modified since
     *  last training`. See [Upgrading a custom acoustic
     *  model](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-custom-upgrade#custom-upgrade-acoustic).
     */
    force?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAudio` operation. */
  export interface ListAudioParams {
    /** The customization ID (GUID) of the custom acoustic model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addAudio` operation. */
  export interface AddAudioParams {
    /** The customization ID (GUID) of the custom acoustic model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The name of the new audio resource for the custom acoustic model. Use a localized name that matches the
     *  language of the custom model and reflects the contents of the resource.
     *  * Include a maximum of 128 characters in the name.
     *  * Do not use characters that need to be URL-encoded. For example, do not use spaces, slashes, backslashes,
     *  colons, ampersands, double quotes, plus signs, equals signs, questions marks, and so on in the name. (The
     *  service does not prevent the use of these characters. But because they must be URL-encoded wherever used, their
     *  use is strongly discouraged.)
     *  * Do not use the name of an audio resource that has already been added to the custom model.
     */
    audioName: string;
    /** The audio resource that is to be added to the custom acoustic model, an individual audio file or an archive
     *  file.
     *
     *  With the `curl` command, use the `--data-binary` option to upload the file for the request.
     */
    audioResource: NodeJS.ReadableStream | Buffer;
    /** For an audio-type resource, the format (MIME type) of the audio. For more information, see **Content types
     *  for audio-type resources** in the method description.
     *
     *  For an archive-type resource, the media type of the archive file. For more information, see **Content types for
     *  archive-type resources** in the method description.
     */
    contentType?: AddAudioConstants.ContentType | string;
    /** _For an archive-type resource_, specify the format of the audio files that are contained in the archive file
     *  if they are of type `audio/alaw`, `audio/basic`, `audio/l16`, or `audio/mulaw`. Include the `rate`, `channels`,
     *  and `endianness` parameters where necessary. In this case, all audio files that are contained in the archive
     *  file must be of the indicated type.
     *
     *  For all other audio formats, you can omit the header. In this case, the audio files can be of multiple types as
     *  long as they are not of the types listed in the previous paragraph.
     *
     *  The parameter accepts all of the audio formats that are supported for use with speech recognition. For more
     *  information, see **Content types for audio-type resources** in the method description.
     *
     *  _For an audio-type resource_, omit the header.
     */
    containedContentType?: AddAudioConstants.ContainedContentType | string;
    /** If `true`, the specified audio resource overwrites an existing audio resource with the same name. If
     *  `false`, the request fails if an audio resource with the same name already exists. The parameter has no effect
     *  if an audio resource with the same name does not already exist.
     */
    allowOverwrite?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `addAudio` operation. */
  export namespace AddAudioConstants {
    /** For an audio-type resource, the format (MIME type) of the audio. For more information, see **Content types for audio-type resources** in the method description. For an archive-type resource, the media type of the archive file. For more information, see **Content types for archive-type resources** in the method description. */
    export enum ContentType {
      APPLICATION_ZIP = 'application/zip',
      APPLICATION_GZIP = 'application/gzip',
      AUDIO_ALAW = 'audio/alaw',
      AUDIO_BASIC = 'audio/basic',
      AUDIO_FLAC = 'audio/flac',
      AUDIO_G729 = 'audio/g729',
      AUDIO_L16 = 'audio/l16',
      AUDIO_MP3 = 'audio/mp3',
      AUDIO_MPEG = 'audio/mpeg',
      AUDIO_MULAW = 'audio/mulaw',
      AUDIO_OGG = 'audio/ogg',
      AUDIO_OGG_CODECS_OPUS = 'audio/ogg;codecs=opus',
      AUDIO_OGG_CODECS_VORBIS = 'audio/ogg;codecs=vorbis',
      AUDIO_WAV = 'audio/wav',
      AUDIO_WEBM = 'audio/webm',
      AUDIO_WEBM_CODECS_OPUS = 'audio/webm;codecs=opus',
      AUDIO_WEBM_CODECS_VORBIS = 'audio/webm;codecs=vorbis',
    }
    /** _For an archive-type resource_, specify the format of the audio files that are contained in the archive file if they are of type `audio/alaw`, `audio/basic`, `audio/l16`, or `audio/mulaw`. Include the `rate`, `channels`, and `endianness` parameters where necessary. In this case, all audio files that are contained in the archive file must be of the indicated type. For all other audio formats, you can omit the header. In this case, the audio files can be of multiple types as long as they are not of the types listed in the previous paragraph. The parameter accepts all of the audio formats that are supported for use with speech recognition. For more information, see **Content types for audio-type resources** in the method description. _For an audio-type resource_, omit the header. */
    export enum ContainedContentType {
      AUDIO_ALAW = 'audio/alaw',
      AUDIO_BASIC = 'audio/basic',
      AUDIO_FLAC = 'audio/flac',
      AUDIO_G729 = 'audio/g729',
      AUDIO_L16 = 'audio/l16',
      AUDIO_MP3 = 'audio/mp3',
      AUDIO_MPEG = 'audio/mpeg',
      AUDIO_MULAW = 'audio/mulaw',
      AUDIO_OGG = 'audio/ogg',
      AUDIO_OGG_CODECS_OPUS = 'audio/ogg;codecs=opus',
      AUDIO_OGG_CODECS_VORBIS = 'audio/ogg;codecs=vorbis',
      AUDIO_WAV = 'audio/wav',
      AUDIO_WEBM = 'audio/webm',
      AUDIO_WEBM_CODECS_OPUS = 'audio/webm;codecs=opus',
      AUDIO_WEBM_CODECS_VORBIS = 'audio/webm;codecs=vorbis',
    }
  }

  /** Parameters for the `getAudio` operation. */
  export interface GetAudioParams {
    /** The customization ID (GUID) of the custom acoustic model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The name of the audio resource for the custom acoustic model. */
    audioName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAudio` operation. */
  export interface DeleteAudioParams {
    /** The customization ID (GUID) of the custom acoustic model that is to be used for the request. You must make
     *  the request with credentials for the instance of the service that owns the custom model.
     */
    customizationId: string;
    /** The name of the audio resource for the custom acoustic model. */
    audioName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Information about an existing custom acoustic model.
   */
  export interface AcousticModel {
    /** The customization ID (GUID) of the custom acoustic model. The [Create a custom acoustic
     *  model](#createacousticmodel) method returns only this field of the object; it does not return the other fields.
     */
    customization_id: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom acoustic model was created. The
     *  value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`).
     */
    created?: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom acoustic model was last modified.
     *  The `created` and `updated` fields are equal when an acoustic model is first added but has yet to be updated.
     *  The value is provided in full ISO 8601 format (YYYY-MM-DDThh:mm:ss.sTZD).
     */
    updated?: string;
    /** The language identifier of the custom acoustic model (for example, `en-US`). */
    language?: string;
    /** A list of the available versions of the custom acoustic model. Each element of the array indicates a version
     *  of the base model with which the custom model can be used. Multiple versions exist only if the custom model has
     *  been upgraded to a new version of its base model. Otherwise, only a single version is shown.
     */
    versions?: string[];
    /** The GUID of the credentials for the instance of the service that owns the custom acoustic model. */
    owner?: string;
    /** The name of the custom acoustic model. */
    name?: string;
    /** The description of the custom acoustic model. */
    description?: string;
    /** The name of the language model for which the custom acoustic model was created. */
    base_model_name?: string;
    /** The current status of the custom acoustic model:
     *  * `pending`: The model was created but is waiting either for valid training data to be added or for the service
     *  to finish analyzing added data.
     *  * `ready`: The model contains valid data and is ready to be trained. If the model contains a mix of valid and
     *  invalid resources, you need to set the `strict` parameter to `false` for the training to proceed.
     *  * `training`: The model is currently being trained.
     *  * `available`: The model is trained and ready to use.
     *  * `upgrading`: The model is currently being upgraded.
     *  * `failed`: Training of the model failed.
     */
    status?: AcousticModel.Constants.Status | string;
    /** A percentage that indicates the progress of the custom acoustic model's current training. A value of `100`
     *  means that the model is fully trained. **Note:** The `progress` field does not currently reflect the progress of
     *  the training. The field changes from `0` to `100` when training is complete.
     */
    progress?: number;
    /** If the request included unknown parameters, the following message: `Unexpected query parameter(s)
     *  ['parameters'] detected`, where `parameters` is a list that includes a quoted string for each unknown parameter.
     */
    warnings?: string;
  }
  export namespace AcousticModel {
    export namespace Constants {
      /** The current status of the custom acoustic model: * `pending`: The model was created but is waiting either for valid training data to be added or for the service to finish analyzing added data. * `ready`: The model contains valid data and is ready to be trained. If the model contains a mix of valid and invalid resources, you need to set the `strict` parameter to `false` for the training to proceed. * `training`: The model is currently being trained. * `available`: The model is trained and ready to use. * `upgrading`: The model is currently being upgraded. * `failed`: Training of the model failed. */
      export enum Status {
        PENDING = 'pending',
        READY = 'ready',
        TRAINING = 'training',
        AVAILABLE = 'available',
        UPGRADING = 'upgrading',
        FAILED = 'failed',
      }
    }
  }

  /**
   * Information about existing custom acoustic models.
   */
  export interface AcousticModels {
    /** An array of `AcousticModel` objects that provides information about each available custom acoustic model.
     *  The array is empty if the requesting credentials own no custom acoustic models (if no language is specified) or
     *  own no custom acoustic models for the specified language.
     */
    customizations: AcousticModel[];
  }

  /**
   * Information about an audio resource from a custom acoustic model.
   */
  export interface AudioDetails {
    /** The type of the audio resource:
     *  * `audio` for an individual audio file
     *  * `archive` for an archive (**.zip** or **.tar.gz**) file that contains audio files
     *  * `undetermined` for a resource that the service cannot validate (for example, if the user mistakenly passes a
     *  file that does not contain audio, such as a JPEG file).
     */
    type?: AudioDetails.Constants.Type | string;
    /** _For an audio-type resource_, the codec in which the audio is encoded. Omitted for an archive-type resource. */
    codec?: string;
    /** _For an audio-type resource_, the sampling rate of the audio in Hertz (samples per second). Omitted for an
     *  archive-type resource.
     */
    frequency?: number;
    /** _For an archive-type resource_, the format of the compressed archive:
     *  * `zip` for a **.zip** file
     *  * `gzip` for a **.tar.gz** file
     *
     *  Omitted for an audio-type resource.
     */
    compression?: AudioDetails.Constants.Compression | string;
  }
  export namespace AudioDetails {
    export namespace Constants {
      /** The type of the audio resource: * `audio` for an individual audio file * `archive` for an archive (**.zip** or **.tar.gz**) file that contains audio files * `undetermined` for a resource that the service cannot validate (for example, if the user mistakenly passes a file that does not contain audio, such as a JPEG file). */
      export enum Type {
        AUDIO = 'audio',
        ARCHIVE = 'archive',
        UNDETERMINED = 'undetermined',
      }
      /** _For an archive-type resource_, the format of the compressed archive: * `zip` for a **.zip** file * `gzip` for a **.tar.gz** file Omitted for an audio-type resource. */
      export enum Compression {
        ZIP = 'zip',
        GZIP = 'gzip',
      }
    }
  }

  /**
   * Information about an audio resource from a custom acoustic model.
   */
  export interface AudioListing {
    /** _For an audio-type resource_, the total seconds of audio in the resource. Omitted for an archive-type
     *  resource.
     */
    duration?: number;
    /** _For an audio-type resource_, the user-specified name of the resource. Omitted for an archive-type resource. */
    name?: string;
    /** _For an audio-type resource_, an `AudioDetails` object that provides detailed information about the
     *  resource. The object is empty until the service finishes processing the audio. Omitted for an archive-type
     *  resource.
     */
    details?: AudioDetails;
    /** _For an audio-type resource_, the status of the resource:
     *  * `ok`: The service successfully analyzed the audio data. The data can be used to train the custom model.
     *  * `being_processed`: The service is still analyzing the audio data. The service cannot accept requests to add
     *  new audio resources or to train the custom model until its analysis is complete.
     *  * `invalid`: The audio data is not valid for training the custom model (possibly because it has the wrong format
     *  or sampling rate, or because it is corrupted).
     *
     *  Omitted for an archive-type resource.
     */
    status?: AudioListing.Constants.Status | string;
    /** _For an archive-type resource_, an object of type `AudioResource` that provides information about the
     *  resource. Omitted for an audio-type resource.
     */
    container?: AudioResource;
    /** _For an archive-type resource_, an array of `AudioResource` objects that provides information about the
     *  audio-type resources that are contained in the resource. Omitted for an audio-type resource.
     */
    audio?: AudioResource[];
  }
  export namespace AudioListing {
    export namespace Constants {
      /** _For an audio-type resource_, the status of the resource: * `ok`: The service successfully analyzed the audio data. The data can be used to train the custom model. * `being_processed`: The service is still analyzing the audio data. The service cannot accept requests to add new audio resources or to train the custom model until its analysis is complete. * `invalid`: The audio data is not valid for training the custom model (possibly because it has the wrong format or sampling rate, or because it is corrupted). Omitted for an archive-type resource. */
      export enum Status {
        OK = 'ok',
        BEING_PROCESSED = 'being_processed',
        INVALID = 'invalid',
      }
    }
  }

  /**
   * If audio metrics are requested, information about the signal characteristics of the input audio.
   */
  export interface AudioMetrics {
    /** The interval in seconds (typically 0.1 seconds) at which the service calculated the audio metrics. In other
     *  words, how often the service calculated the metrics. A single unit in each histogram (see the
     *  `AudioMetricsHistogramBin` object) is calculated based on a `sampling_interval` length of audio.
     */
    sampling_interval: number;
    /** Detailed information about the signal characteristics of the input audio. */
    accumulated: AudioMetricsDetails;
  }

  /**
   * Detailed information about the signal characteristics of the input audio.
   */
  export interface AudioMetricsDetails {
    /** If `true`, indicates the end of the audio stream, meaning that transcription is complete. Currently, the
     *  field is always `true`. The service returns metrics just once per audio stream. The results provide aggregated
     *  audio metrics that pertain to the complete audio stream.
     */
    final: boolean;
    /** The end time in seconds of the block of audio to which the metrics apply. */
    end_time: number;
    /** The signal-to-noise ratio (SNR) for the audio signal. The value indicates the ratio of speech to noise in
     *  the audio. A valid value lies in the range of 0 to 100 decibels (dB). The service omits the field if it cannot
     *  compute the SNR for the audio.
     */
    signal_to_noise_ratio?: number;
    /** The ratio of speech to non-speech segments in the audio signal. The value lies in the range of 0.0 to 1.0. */
    speech_ratio: number;
    /** The probability that the audio signal is missing the upper half of its frequency content.
     *  * A value close to 1.0 typically indicates artificially up-sampled audio, which negatively impacts the accuracy
     *  of the transcription results.
     *  * A value at or near 0.0 indicates that the audio signal is good and has a full spectrum.
     *  * A value around 0.5 means that detection of the frequency content is unreliable or not available.
     */
    high_frequency_loss: number;
    /** An array of `AudioMetricsHistogramBin` objects that defines a histogram of the cumulative direct current
     *  (DC) component of the audio signal.
     */
    direct_current_offset: AudioMetricsHistogramBin[];
    /** An array of `AudioMetricsHistogramBin` objects that defines a histogram of the clipping rate for the audio
     *  segments. The clipping rate is defined as the fraction of samples in the segment that reach the maximum or
     *  minimum value that is offered by the audio quantization range. The service auto-detects either a 16-bit
     *  Pulse-Code Modulation(PCM) audio range (-32768 to +32767) or a unit range (-1.0 to +1.0). The clipping rate is
     *  between 0.0 and 1.0, with higher values indicating possible degradation of speech recognition.
     */
    clipping_rate: AudioMetricsHistogramBin[];
    /** An array of `AudioMetricsHistogramBin` objects that defines a histogram of the signal level in segments of
     *  the audio that contain speech. The signal level is computed as the Root-Mean-Square (RMS) value in a decibel
     *  (dB) scale normalized to the range 0.0 (minimum level) to 1.0 (maximum level).
     */
    speech_level: AudioMetricsHistogramBin[];
    /** An array of `AudioMetricsHistogramBin` objects that defines a histogram of the signal level in segments of
     *  the audio that do not contain speech. The signal level is computed as the Root-Mean-Square (RMS) value in a
     *  decibel (dB) scale normalized to the range 0.0 (minimum level) to 1.0 (maximum level).
     */
    non_speech_level: AudioMetricsHistogramBin[];
  }

  /**
   * A bin with defined boundaries that indicates the number of values in a range of signal characteristics for a
   * histogram. The first and last bins of a histogram are the boundary bins. They cover the intervals between negative
   * infinity and the first boundary, and between the last boundary and positive infinity, respectively.
   */
  export interface AudioMetricsHistogramBin {
    /** The lower boundary of the bin in the histogram. */
    begin: number;
    /** The upper boundary of the bin in the histogram. */
    end: number;
    /** The number of values in the bin of the histogram. */
    count: number;
  }

  /**
   * Information about an audio resource from a custom acoustic model.
   */
  export interface AudioResource {
    /** The total seconds of audio in the audio resource. */
    duration: number;
    /** _For an archive-type resource_, the user-specified name of the resource.
     *
     *  _For an audio-type resource_, the user-specified name of the resource or the name of the audio file that the
     *  user added for the resource. The value depends on the method that is called.
     */
    name: string;
    /** An `AudioDetails` object that provides detailed information about the audio resource. The object is empty
     *  until the service finishes processing the audio.
     */
    details: AudioDetails;
    /** The status of the audio resource:
     *  * `ok`: The service successfully analyzed the audio data. The data can be used to train the custom model.
     *  * `being_processed`: The service is still analyzing the audio data. The service cannot accept requests to add
     *  new audio resources or to train the custom model until its analysis is complete.
     *  * `invalid`: The audio data is not valid for training the custom model (possibly because it has the wrong format
     *  or sampling rate, or because it is corrupted). For an archive file, the entire archive is invalid if any of its
     *  audio files are invalid.
     */
    status: AudioResource.Constants.Status | string;
  }
  export namespace AudioResource {
    export namespace Constants {
      /** The status of the audio resource: * `ok`: The service successfully analyzed the audio data. The data can be used to train the custom model. * `being_processed`: The service is still analyzing the audio data. The service cannot accept requests to add new audio resources or to train the custom model until its analysis is complete. * `invalid`: The audio data is not valid for training the custom model (possibly because it has the wrong format or sampling rate, or because it is corrupted). For an archive file, the entire archive is invalid if any of its audio files are invalid. */
      export enum Status {
        OK = 'ok',
        BEING_PROCESSED = 'being_processed',
        INVALID = 'invalid',
      }
    }
  }

  /**
   * Information about the audio resources from a custom acoustic model.
   */
  export interface AudioResources {
    /** The total minutes of accumulated audio summed over all of the valid audio resources for the custom acoustic
     *  model. You can use this value to determine whether the custom model has too little or too much audio to begin
     *  training.
     */
    total_minutes_of_audio: number;
    /** An array of `AudioResource` objects that provides information about the audio resources of the custom
     *  acoustic model. The array is empty if the custom model has no audio resources.
     */
    audio: AudioResource[];
  }

  /**
   * Information about the corpora from a custom language model.
   */
  export interface Corpora {
    /** An array of `Corpus` objects that provides information about the corpora for the custom model. The array is
     *  empty if the custom model has no corpora.
     */
    corpora: Corpus[];
  }

  /**
   * Information about a corpus from a custom language model.
   */
  export interface Corpus {
    /** The name of the corpus. */
    name: string;
    /** The total number of words in the corpus. The value is `0` while the corpus is being processed. */
    total_words: number;
    /** _For custom models that are based on large speech models and previous-generation models_, the number of OOV
     *  words extracted from the corpus. The value is `0` while the corpus is being processed.
     *
     *  _For custom models that are based on next-generation models_, no OOV words are extracted from corpora, so the
     *  value is always `0`.
     */
    out_of_vocabulary_words: number;
    /** The status of the corpus:
     *  * `analyzed`: The service successfully analyzed the corpus. The custom model can be trained with data from the
     *  corpus.
     *  * `being_processed`: The service is still analyzing the corpus. The service cannot accept requests to add new
     *  resources or to train the custom model.
     *  * `undetermined`: The service encountered an error while processing the corpus. The `error` field describes the
     *  failure.
     */
    status: Corpus.Constants.Status | string;
    /** If the status of the corpus is `undetermined`, the following message: `Analysis of corpus 'name' failed.
     *  Please try adding the corpus again by setting the 'allow_overwrite' flag to 'true'`.
     */
    error?: string;
  }
  export namespace Corpus {
    export namespace Constants {
      /** The status of the corpus: * `analyzed`: The service successfully analyzed the corpus. The custom model can be trained with data from the corpus. * `being_processed`: The service is still analyzing the corpus. The service cannot accept requests to add new resources or to train the custom model. * `undetermined`: The service encountered an error while processing the corpus. The `error` field describes the failure. */
      export enum Status {
        ANALYZED = 'analyzed',
        BEING_PROCESSED = 'being_processed',
        UNDETERMINED = 'undetermined',
      }
    }
  }

  /**
   * Information about a word that is to be added to a custom language model.
   */
  export interface CustomWord {
    /** For the [Add custom words](#addwords) method, you must specify the custom word that is to be added to or
     *  updated in the custom model. Do not use characters that need to be URL-encoded, for example, spaces, slashes,
     *  backslashes, colons, ampersands, double quotes, plus signs, equals signs, or question marks. Use a `-` (dash) or
     *  `_` (underscore) to connect the tokens of compound words. A Japanese custom word can include at most 25
     *  characters, not including leading or trailing spaces.
     *
     *  Omit this parameter for the [Add a custom word](#addword) method.
     */
    word?: string;
    /** Parameter for custom words. You can use the 'mapping_only' key in custom words as a form of post processing.
     *  This key parameter has a boolean value to determine whether 'sounds_like' (for non-Japanese models) or word (for
     *  Japanese) is not used for the model fine-tuning, but for the replacement for 'display_as'. This feature helps
     *  you when you use custom words exclusively to map 'sounds_like' (or word) to 'display_as' value. When you use
     *  custom words solely for post-processing purposes that does not need fine-tuning.
     */
    mapping_only?: string[];
    /** As array of sounds-like pronunciations for the custom word. Specify how words that are difficult to
     *  pronounce, foreign words, acronyms, and so on can be pronounced by users.
     *  * _For custom models that are based on previous-generation models_, for a word that is not in the service's base
     *  vocabulary, omit the parameter to have the service automatically generate a sounds-like pronunciation for the
     *  word.
     *  * For a word that is in the service's base vocabulary, use the parameter to specify additional pronunciations
     *  for the word. You cannot override the default pronunciation of a word; pronunciations you add augment the
     *  pronunciation from the base vocabulary.
     *
     *  A word can have at most five sounds-like pronunciations. A pronunciation can include at most 40 characters, not
     *  including leading or trailing spaces. A Japanese pronunciation can include at most 25 characters, not including
     *  leading or trailing spaces.
     */
    sounds_like?: string[];
    /** An alternative spelling for the custom word when it appears in a transcript. Use the parameter when you want
     *  the word to have a spelling that is different from its usual representation or from its spelling in corpora
     *  training data.
     *
     *  _For custom models that are based on next-generation models_, the service uses the spelling of the word as the
     *  display-as value if you omit the field.
     */
    display_as?: string;
  }

  /**
   * Information about a grammar from a custom language model.
   */
  export interface Grammar {
    /** The name of the grammar. */
    name: string;
    /** _For custom models that are based on previous-generation models_, the number of OOV words extracted from the
     *  grammar. The value is `0` while the grammar is being processed.
     *
     *  _For custom models that are based on next-generation models_, no OOV words are extracted from grammars, so the
     *  value is always `0`.
     */
    out_of_vocabulary_words: number;
    /** The status of the grammar:
     *  * `analyzed`: The service successfully analyzed the grammar. The custom model can be trained with data from the
     *  grammar.
     *  * `being_processed`: The service is still analyzing the grammar. The service cannot accept requests to add new
     *  resources or to train the custom model.
     *  * `undetermined`: The service encountered an error while processing the grammar. The `error` field describes the
     *  failure.
     */
    status: Grammar.Constants.Status | string;
    /** If the status of the grammar is `undetermined`, the following message: `Analysis of grammar '{grammar_name}'
     *  failed. Please try fixing the error or adding the grammar again by setting the 'allow_overwrite' flag to
     *  'true'.`.
     */
    error?: string;
  }
  export namespace Grammar {
    export namespace Constants {
      /** The status of the grammar: * `analyzed`: The service successfully analyzed the grammar. The custom model can be trained with data from the grammar. * `being_processed`: The service is still analyzing the grammar. The service cannot accept requests to add new resources or to train the custom model. * `undetermined`: The service encountered an error while processing the grammar. The `error` field describes the failure. */
      export enum Status {
        ANALYZED = 'analyzed',
        BEING_PROCESSED = 'being_processed',
        UNDETERMINED = 'undetermined',
      }
    }
  }

  /**
   * Information about the grammars from a custom language model.
   */
  export interface Grammars {
    /** An array of `Grammar` objects that provides information about the grammars for the custom model. The array
     *  is empty if the custom model has no grammars.
     */
    grammars: Grammar[];
  }

  /**
   * Information about a match for a keyword from speech recognition results.
   */
  export interface KeywordResult {
    /** A specified keyword normalized to the spoken phrase that matched in the audio input. */
    normalized_text: string;
    /** The start time in seconds of the keyword match. */
    start_time: number;
    /** The end time in seconds of the keyword match. */
    end_time: number;
    /** A confidence score for the keyword match in the range of 0.0 to 1.0. */
    confidence: number;
  }

  /**
   * Information about an existing custom language model.
   */
  export interface LanguageModel {
    /** The customization ID (GUID) of the custom language model. The [Create a custom language
     *  model](#createlanguagemodel) method returns only this field of the object; it does not return the other fields.
     */
    customization_id: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom language model was created. The
     *  value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`).
     */
    created?: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom language model was last modified.
     *  The `created` and `updated` fields are equal when a language model is first added but has yet to be updated. The
     *  value is provided in full ISO 8601 format (YYYY-MM-DDThh:mm:ss.sTZD).
     */
    updated?: string;
    /** The language identifier of the custom language model (for example, `en-US`). The value matches the
     *  five-character language identifier from the name of the base model for the custom model. This value might be
     *  different from the value of the `dialect` field.
     */
    language?: string;
    /** The dialect of the language for the custom language model. _For custom models that are based on non-Spanish
     *  previous-generation models and on next-generation models,_ the field matches the language of the base model; for
     *  example, `en-US` for one of the US English models. _For custom models that are based on Spanish
     *  previous-generation models,_ the field indicates the dialect with which the model was created. The value can
     *  match the name of the base model or, if it was specified by the user, can be one of the following:
     *  * `es-ES` for Castilian Spanish (`es-ES` models)
     *  * `es-LA` for Latin American Spanish (`es-AR`, `es-CL`, `es-CO`, and `es-PE` models)
     *  * `es-US` for Mexican (North American) Spanish (`es-MX` models)
     *
     *  Dialect values are case-insensitive.
     */
    dialect?: string;
    /** A list of the available versions of the custom language model. Each element of the array indicates a version
     *  of the base model with which the custom model can be used. Multiple versions exist only if the custom model has
     *  been upgraded to a new version of its base model. Otherwise, only a single version is shown.
     */
    versions?: string[];
    /** The GUID of the credentials for the instance of the service that owns the custom language model. */
    owner?: string;
    /** The name of the custom language model. */
    name?: string;
    /** The description of the custom language model. */
    description?: string;
    /** The name of the language model for which the custom language model was created. */
    base_model_name?: string;
    /** The current status of the custom language model:
     *  * `pending`: The model was created but is waiting either for valid training data to be added or for the service
     *  to finish analyzing added data.
     *  * `ready`: The model contains valid data and is ready to be trained. If the model contains a mix of valid and
     *  invalid resources, you need to set the `strict` parameter to `false` for the training to proceed.
     *  * `training`: The model is currently being trained.
     *  * `available`: The model is trained and ready to use.
     *  * `upgrading`: The model is currently being upgraded.
     *  * `failed`: Training of the model failed.
     */
    status?: LanguageModel.Constants.Status | string;
    /** A percentage that indicates the progress of the custom language model's current training. A value of `100`
     *  means that the model is fully trained. **Note:** The `progress` field does not currently reflect the progress of
     *  the training. The field changes from `0` to `100` when training is complete.
     */
    progress?: number;
    /** If an error occurred while adding a grammar file to the custom language model, a message that describes an
     *  `Internal Server Error` and includes the string `Cannot compile grammar`. The status of the custom model is not
     *  affected by the error, but the grammar cannot be used with the model.
     */
    error?: string;
    /** If the request included unknown parameters, the following message: `Unexpected query parameter(s)
     *  ['parameters'] detected`, where `parameters` is a list that includes a quoted string for each unknown parameter.
     */
    warnings?: string;
  }
  export namespace LanguageModel {
    export namespace Constants {
      /** The current status of the custom language model: * `pending`: The model was created but is waiting either for valid training data to be added or for the service to finish analyzing added data. * `ready`: The model contains valid data and is ready to be trained. If the model contains a mix of valid and invalid resources, you need to set the `strict` parameter to `false` for the training to proceed. * `training`: The model is currently being trained. * `available`: The model is trained and ready to use. * `upgrading`: The model is currently being upgraded. * `failed`: Training of the model failed. */
      export enum Status {
        PENDING = 'pending',
        READY = 'ready',
        TRAINING = 'training',
        AVAILABLE = 'available',
        UPGRADING = 'upgrading',
        FAILED = 'failed',
      }
    }
  }

  /**
   * Information about existing custom language models.
   */
  export interface LanguageModels {
    /** An array of `LanguageModel` objects that provides information about each available custom language model.
     *  The array is empty if the requesting credentials own no custom language models (if no language is specified) or
     *  own no custom language models for the specified language.
     */
    customizations: LanguageModel[];
  }

  /**
   * Detailed timing information about the service's processing of the input audio.
   */
  export interface ProcessedAudio {
    /** The seconds of audio that the service has received as of this response. The value of the field is greater
     *  than the values of the `transcription` and `speaker_labels` fields during speech recognition processing, since
     *  the service first has to receive the audio before it can begin to process it. The final value can also be
     *  greater than the value of the `transcription` and `speaker_labels` fields by a fractional number of seconds.
     */
    received: number;
    /** The seconds of audio that the service has passed to its speech-processing engine as of this response. The
     *  value of the field is greater than the values of the `transcription` and `speaker_labels` fields during speech
     *  recognition processing. The `received` and `seen_by_engine` fields have identical values when the service has
     *  finished processing all audio. This final value can be greater than the value of the `transcription` and
     *  `speaker_labels` fields by a fractional number of seconds.
     */
    seen_by_engine: number;
    /** The seconds of audio that the service has processed for speech recognition as of this response. */
    transcription: number;
    /** If speaker labels are requested, the seconds of audio that the service has processed to determine speaker
     *  labels as of this response. This value often trails the value of the `transcription` field during speech
     *  recognition processing. The `transcription` and `speaker_labels` fields have identical values when the service
     *  has finished processing all audio.
     */
    speaker_labels?: number;
  }

  /**
   * If processing metrics are requested, information about the service's processing of the input audio. Processing
   * metrics are not available with the synchronous [Recognize audio](#recognize) method.
   */
  export interface ProcessingMetrics {
    /** Detailed timing information about the service's processing of the input audio. */
    processed_audio: ProcessedAudio;
    /** The amount of real time in seconds that has passed since the service received the first byte of input audio.
     *  Values in this field are generally multiples of the specified metrics interval, with two differences:
     *  * Values might not reflect exact intervals (for instance, 0.25, 0.5, and so on). Actual values might be 0.27,
     *  0.52, and so on, depending on when the service receives and processes audio.
     *  * The service also returns values for transcription events if you set the `interim_results` parameter to `true`.
     *  The service returns both processing metrics and transcription results when such events occur.
     */
    wall_clock_since_first_byte_received: number;
    /** An indication of whether the metrics apply to a periodic interval or a transcription event:
     *  * `true` means that the response was triggered by a specified processing interval. The information contains
     *  processing metrics only.
     *  * `false` means that the response was triggered by a transcription event. The information contains processing
     *  metrics plus transcription results.
     *
     *  Use the field to identify why the service generated the response and to filter different results if necessary.
     */
    periodic: boolean;
  }

  /**
   * Information about a current asynchronous speech recognition job.
   */
  export interface RecognitionJob {
    /** The ID of the asynchronous job. */
    id: string;
    /** The current status of the job:
     *  * `waiting`: The service is preparing the job for processing. The service returns this status when the job is
     *  initially created or when it is waiting for capacity to process the job. The job remains in this state until the
     *  service has the capacity to begin processing it.
     *  * `processing`: The service is actively processing the job.
     *  * `completed`: The service has finished processing the job. If the job specified a callback URL and the event
     *  `recognitions.completed_with_results`, the service sent the results with the callback notification. Otherwise,
     *  you must retrieve the results by checking the individual job.
     *  * `failed`: The job failed.
     */
    status: RecognitionJob.Constants.Status | string;
    /** The date and time in Coordinated Universal Time (UTC) at which the job was created. The value is provided in
     *  full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`).
     */
    created: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the job was last updated by the service. The
     *  value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`). This field is returned only by the
     *  [Check jobs](#checkjobs) and [Check a job[(#checkjob) methods.
     */
    updated?: string;
    /** The URL to use to request information about the job with the [Check a job](#checkjob) method. This field is
     *  returned only by the [Create a job](#createjob) method.
     */
    url?: string;
    /** The user token associated with a job that was created with a callback URL and a user token. This field can
     *  be returned only by the [Check jobs](#checkjobs) method.
     */
    user_token?: string;
    /** If the status is `completed`, the results of the recognition request as an array that includes a single
     *  instance of a `SpeechRecognitionResults` object. This field is returned only by the [Check a job](#checkjob)
     *  method.
     */
    results?: SpeechRecognitionResults[];
    /** An array of warning messages about invalid parameters included with the request. Each warning includes a
     *  descriptive message and a list of invalid argument strings, for example, `"unexpected query parameter
     *  'user_token', query parameter 'callback_url' was not specified"`. The request succeeds despite the warnings.
     *  This field can be returned only by the [Create a job](#createjob) method. (If you use the
     *  `character_insertion_bias` parameter with a previous-generation model, the warning message refers to the
     *  parameter as `lambdaBias`.).
     */
    warnings?: string[];
  }
  export namespace RecognitionJob {
    export namespace Constants {
      /** The current status of the job: * `waiting`: The service is preparing the job for processing. The service returns this status when the job is initially created or when it is waiting for capacity to process the job. The job remains in this state until the service has the capacity to begin processing it. * `processing`: The service is actively processing the job. * `completed`: The service has finished processing the job. If the job specified a callback URL and the event `recognitions.completed_with_results`, the service sent the results with the callback notification. Otherwise, you must retrieve the results by checking the individual job. * `failed`: The job failed. */
      export enum Status {
        WAITING = 'waiting',
        PROCESSING = 'processing',
        COMPLETED = 'completed',
        FAILED = 'failed',
      }
    }
  }

  /**
   * Information about current asynchronous speech recognition jobs.
   */
  export interface RecognitionJobs {
    /** An array of `RecognitionJob` objects that provides the status for each of the user's current jobs. The array
     *  is empty if the user has no current jobs.
     */
    recognitions: RecognitionJob[];
  }

  /**
   * Information about a request to register a callback for asynchronous speech recognition.
   */
  export interface RegisterStatus {
    /** The current status of the job:
     *  * `created`: The service successfully allowlisted the callback URL as a result of the call.
     *  * `already created`: The URL was already allowlisted.
     */
    status: RegisterStatus.Constants.Status | string;
    /** The callback URL that is successfully registered. */
    url: string;
  }
  export namespace RegisterStatus {
    export namespace Constants {
      /** The current status of the job: * `created`: The service successfully allowlisted the callback URL as a result of the call. * `already created`: The URL was already allowlisted. */
      export enum Status {
        CREATED = 'created',
        ALREADY_CREATED = 'already created',
      }
    }
  }

  /**
   * Information about the speakers from speech recognition results.
   */
  export interface SpeakerLabelsResult {
    /** The start time of a word from the transcript. The value matches the start time of a word from the
     *  `timestamps` array.
     */
    from: number;
    /** The end time of a word from the transcript. The value matches the end time of a word from the `timestamps`
     *  array.
     */
    to: number;
    /** The numeric identifier that the service assigns to a speaker from the audio. Speaker IDs begin at `0`
     *  initially but can evolve and change across interim results (if supported by the method) and between interim and
     *  final results as the service processes the audio. They are not guaranteed to be sequential, contiguous, or
     *  ordered.
     */
    speaker: number;
    /** A score that indicates the service's confidence in its identification of the speaker in the range of 0.0 to
     *  1.0.
     */
    confidence: number;
    /** An indication of whether the service might further change word and speaker-label results. A value of `true`
     *  means that the service guarantees not to send any further updates for the current or any preceding results;
     *  `false` means that the service might send further updates to the results.
     */
    final: boolean;
  }

  /**
   * Information about an available language model.
   */
  export interface SpeechModel {
    /** The name of the model for use as an identifier in calls to the service (for example,
     *  `en-US_BroadbandModel`).
     */
    name: string;
    /** The language identifier of the model (for example, `en-US`). */
    language: string;
    /** The sampling rate (minimum acceptable rate for audio) used by the model in Hertz. */
    rate: number;
    /** The URI for the model. */
    url: string;
    /** Indicates whether select service features are supported with the model. */
    supported_features: SupportedFeatures;
    /** A brief description of the model. */
    description: string;
  }

  /**
   * Information about the available language models.
   */
  export interface SpeechModels {
    /** An array of `SpeechModel` objects that provides information about each available model. */
    models: SpeechModel[];
  }

  /**
   * An alternative transcript from speech recognition results.
   */
  export interface SpeechRecognitionAlternative {
    /** A transcription of the audio. */
    transcript: string;
    /** A score that indicates the service's confidence in the transcript in the range of 0.0 to 1.0. The service
     *  returns a confidence score only for the best alternative and only with results marked as final.
     */
    confidence?: number;
    /** Time alignments for each word from the transcript as a list of lists. Each inner list consists of three
     *  elements: the word followed by its start and end time in seconds, for example:
     *  `[["hello",0.0,1.2],["world",1.2,2.5]]`. Timestamps are returned only for the best alternative.
     */
    timestamps?: string[];
    /** A confidence score for each word of the transcript as a list of lists. Each inner list consists of two
     *  elements: the word and its confidence score in the range of 0.0 to 1.0, for example:
     *  `[["hello",0.95],["world",0.86]]`. Confidence scores are returned only for the best alternative and only with
     *  results marked as final.
     */
    word_confidence?: string[];
  }

  /**
   * Component results for a speech recognition request.
   */
  export interface SpeechRecognitionResult {
    /** An indication of whether the transcription results are final:
     *  * If `true`, the results for this utterance are final. They are guaranteed not to be updated further.
     *  * If `false`, the results are interim. They can be updated with further interim results until final results are
     *  eventually sent.
     *
     *  **Note:** Because `final` is a reserved word in Java and Swift, the field is renamed `xFinal` in Java and is
     *  escaped with back quotes in Swift.
     */
    final: boolean;
    /** An array of alternative transcripts. The `alternatives` array can include additional requested output such
     *  as word confidence or timestamps.
     */
    alternatives: SpeechRecognitionAlternative[];
    /** A dictionary (or associative array) whose keys are the strings specified for `keywords` if both that
     *  parameter and `keywords_threshold` are specified. The value for each key is an array of matches spotted in the
     *  audio for that keyword. Each match is described by a `KeywordResult` object. A keyword for which no matches are
     *  found is omitted from the dictionary. The dictionary is omitted entirely if no matches are found for any
     *  keywords.
     */
    keywords_result?: JsonObject;
    /** An array of alternative hypotheses found for words of the input audio if a `word_alternatives_threshold` is
     *  specified.
     */
    word_alternatives?: WordAlternativeResults[];
    /** If the `split_transcript_at_phrase_end` parameter is `true`, describes the reason for the split:
     *  * `end_of_data` - The end of the input audio stream.
     *  * `full_stop` - A full semantic stop, such as for the conclusion of a grammatical sentence. The insertion of
     *  splits is influenced by the base language model and biased by custom language models and grammars.
     *  * `reset` - The amount of audio that is currently being processed exceeds the two-minute maximum. The service
     *  splits the transcript to avoid excessive memory use.
     *  * `silence` - A pause or silence that is at least as long as the pause interval.
     */
    end_of_utterance?: SpeechRecognitionResult.Constants.EndOfUtterance | string;
  }
  export namespace SpeechRecognitionResult {
    export namespace Constants {
      /** If the `split_transcript_at_phrase_end` parameter is `true`, describes the reason for the split: * `end_of_data` - The end of the input audio stream. * `full_stop` - A full semantic stop, such as for the conclusion of a grammatical sentence. The insertion of splits is influenced by the base language model and biased by custom language models and grammars. * `reset` - The amount of audio that is currently being processed exceeds the two-minute maximum. The service splits the transcript to avoid excessive memory use. * `silence` - A pause or silence that is at least as long as the pause interval. */
      export enum EndOfUtterance {
        END_OF_DATA = 'end_of_data',
        FULL_STOP = 'full_stop',
        RESET = 'reset',
        SILENCE = 'silence',
      }
    }
  }

  /**
   * The complete results for a speech recognition request.
   */
  export interface SpeechRecognitionResults {
    /** An array of `SpeechRecognitionResult` objects that can include interim and final results (interim results
     *  are returned only if supported by the method). Final results are guaranteed not to change; interim results might
     *  be replaced by further interim results and eventually final results.
     *
     *  For the HTTP interfaces, all results arrive at the same time. For the WebSocket interface, results can be sent
     *  as multiple separate responses. The service periodically sends updates to the results list. The `result_index`
     *  is incremented to the lowest index in the array that has changed for new results.
     *
     *  For more information, see [Understanding speech recognition
     *  results](https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-basic-response).
     */
    results?: SpeechRecognitionResult[];
    /** An index that indicates a change point in the `results` array. The service increments the index for
     *  additional results that it sends for new audio for the same request. All results with the same index are
     *  delivered at the same time. The same index can include multiple final results that are delivered with the same
     *  response.
     */
    result_index?: number;
    /** An array of `SpeakerLabelsResult` objects that identifies which words were spoken by which speakers in a
     *  multi-person exchange. The array is returned only if the `speaker_labels` parameter is `true`. When interim
     *  results are also requested for methods that support them, it is possible for a `SpeechRecognitionResults` object
     *  to include only the `speaker_labels` field.
     */
    speaker_labels?: SpeakerLabelsResult[];
    /** If processing metrics are requested, information about the service's processing of the input audio.
     *  Processing metrics are not available with the synchronous [Recognize audio](#recognize) method.
     */
    processing_metrics?: ProcessingMetrics;
    /** If audio metrics are requested, information about the signal characteristics of the input audio. */
    audio_metrics?: AudioMetrics;
    /** An array of warning messages associated with the request:
     *  * Warnings for invalid parameters or fields can include a descriptive message and a list of invalid argument
     *  strings, for example, `"Unknown arguments:"` or `"Unknown url query arguments:"` followed by a list of the form
     *  `"{invalid_arg_1}, {invalid_arg_2}."` (If you use the `character_insertion_bias` parameter with a
     *  previous-generation model, the warning message refers to the parameter as `lambdaBias`.)
     *  * The following warning is returned if the request passes a custom model that is based on an older version of a
     *  base model for which an updated version is available: `"Using previous version of base model, because your
     *  custom model has been built with it. Please note that this version will be supported only for a limited time.
     *  Consider updating your custom model to the new base model. If you do not do that you will be automatically
     *  switched to base model when you used the non-updated custom model."`
     *
     *  In both cases, the request succeeds despite the warnings.
     */
    warnings?: string[];
  }

  /**
   * Indicates whether select service features are supported with the model.
   */
  export interface SupportedFeatures {
    /** Indicates whether the customization interface can be used to create a custom language model based on the
     *  language model.
     */
    custom_language_model: boolean;
    /** Indicates whether the customization interface can be used to create a custom acoustic model based on the
     *  language model.
     */
    custom_acoustic_model: boolean;
    /** Indicates whether the `speaker_labels` parameter can be used with the language model.
     *
     *  **Note:** The field returns `true` for all models. However, speaker labels are supported for use only with the
     *  following languages and models:
     *  * _For previous-generation models,_ the parameter can be used with Australian English, US English, German,
     *  Japanese, Korean, and Spanish (both broadband and narrowband models) and UK English (narrowband model)
     *  transcription only.
     *  * _For next-generation models,_ the parameter can be used with Czech, English (Australian, Indian, UK, and US),
     *  German, Japanese, Korean, and Spanish transcription only.
     *
     *  Speaker labels are not supported for use with any other languages or models.
     */
    speaker_labels: boolean;
    /** Indicates whether the `low_latency` parameter can be used with a next-generation language model. The field
     *  is returned only for next-generation models. Previous-generation models do not support the `low_latency`
     *  parameter.
     */
    low_latency?: boolean;
  }

  /**
   * The response from training of a custom language or custom acoustic model.
   */
  export interface TrainingResponse {
    /** An array of `TrainingWarning` objects that lists any invalid resources contained in the custom model. For
     *  custom language models, invalid resources are grouped and identified by type of resource. The method can return
     *  warnings only if the `strict` parameter is set to `false`.
     */
    warnings?: TrainingWarning[];
  }

  /**
   * A warning from training of a custom language or custom acoustic model.
   */
  export interface TrainingWarning {
    /** An identifier for the type of invalid resources listed in the `description` field. */
    code: TrainingWarning.Constants.Code | string;
    /** A warning message that lists the invalid resources that are excluded from the custom model's training. The
     *  message has the following format: `Analysis of the following {resource_type} has not completed successfully:
     *  [{resource_names}]. They will be excluded from custom {model_type} model training.`.
     */
    message: string;
  }
  export namespace TrainingWarning {
    export namespace Constants {
      /** An identifier for the type of invalid resources listed in the `description` field. */
      export enum Code {
        INVALID_AUDIO_FILES = 'invalid_audio_files',
        INVALID_CORPUS_FILES = 'invalid_corpus_files',
        INVALID_GRAMMAR_FILES = 'invalid_grammar_files',
        INVALID_WORDS = 'invalid_words',
      }
    }
  }

  /**
   * Information about a word from a custom language model.
   */
  export interface Word {
    /** A word from the custom model's words resource. The spelling of the word is used to train the model. */
    word: string;
    /** (Optional) Parameter for custom words. You can use the 'mapping_only' key in custom words as a form of post
     *  processing. A boolean value that indicates whether the added word should be used to fine-tune the mode for
     *  selected next-gen models. This field appears in the response body only when it's 'For a custom model that is
     *  based on a previous-generation model', the mapping_only field is populated with the value set by the user, but
     *  would not be used.
     */
    mapping_only?: string[];
    /** An array of as many as five pronunciations for the word.
     *  * _For a custom model that is based on a previous-generation model_, in addition to sounds-like pronunciations
     *  that were added by a user, the array can include a sounds-like pronunciation that is automatically generated by
     *  the service if none is provided when the word is added to the custom model.
     *  * _For a custom model that is based on a next-generation model_, the array can include only sounds-like
     *  pronunciations that were added by a user.
     */
    sounds_like: string[];
    /** The spelling of the word that the service uses to display the word in a transcript.
     *  * _For a custom model that is based on a previous-generation model_, the field can contain an empty string if no
     *  display-as value is provided for a word that exists in the service's base vocabulary. In this case, the word is
     *  displayed as it is spelled.
     *  * _For a custom model that is based on a next-generation model_, the service uses the spelling of the word as
     *  the value of the display-as field when the word is added to the model.
     */
    display_as: string;
    /** _For a custom model that is based on a previous-generation model_, a sum of the number of times the word is
     *  found across all corpora and grammars. For example, if the word occurs five times in one corpus and seven times
     *  in another, its count is `12`. If you add a custom word to a model before it is added by any corpora or
     *  grammars, the count begins at `1`; if the word is added from a corpus or grammar first and later modified, the
     *  count reflects only the number of times it is found in corpora and grammars.
     *
     *  _For a custom model that is based on a next-generation model_, the `count` field for any word is always `1`.
     */
    count: number;
    /** An array of sources that describes how the word was added to the custom model's words resource.
     *  * _For a custom model that is based on previous-generation model,_ the field includes the name of each corpus
     *  and grammar from which the service extracted the word. For OOV that are added by multiple corpora or grammars,
     *  the names of all corpora and grammars are listed. If you modified or added the word directly, the field includes
     *  the string `user`.
     *  * _For a custom model that is based on a next-generation model,_ this field shows only `user` for custom words
     *  that were added directly to the custom model. Words from corpora and grammars are not added to the words
     *  resource for custom models that are based on next-generation models.
     */
    source: string[];
    /** If the service discovered one or more problems that you need to correct for the word's definition, an array
     *  that describes each of the errors.
     */
    error?: WordError[];
  }

  /**
   * An alternative hypothesis for a word from speech recognition results.
   */
  export interface WordAlternativeResult {
    /** A confidence score for the word alternative hypothesis in the range of 0.0 to 1.0. */
    confidence: number;
    /** An alternative hypothesis for a word from the input audio. */
    word: string;
  }

  /**
   * Information about alternative hypotheses for words from speech recognition results.
   */
  export interface WordAlternativeResults {
    /** The start time in seconds of the word from the input audio that corresponds to the word alternatives. */
    start_time: number;
    /** The end time in seconds of the word from the input audio that corresponds to the word alternatives. */
    end_time: number;
    /** An array of alternative hypotheses for a word from the input audio. */
    alternatives: WordAlternativeResult[];
  }

  /**
   * An error associated with a word from a custom language model.
   */
  export interface WordError {
    /** A key-value pair that describes an error associated with the definition of a word in the words resource. The
     *  pair has the format `"element": "message"`, where `element` is the aspect of the definition that caused the
     *  problem and `message` describes the problem. The following example describes a problem with one of the word's
     *  sounds-like definitions: `"{sounds_like_string}": "Numbers are not allowed in sounds-like. You can try for
     *  example '{suggested_string}'."`.
     */
    element: string;
  }

  /**
   * Information about the words from a custom language model.
   */
  export interface Words {
    /** An array of `Word` objects that provides information about each word in the custom model's words resource.
     *  The array is empty if the custom model has no words.
     */
    words: Word[];
  }
}

export = SpeechToTextV1;
