/**
 * Copyright 2017 IBM All Rights Reserved.
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

import * as extend from 'extend';
import { RequestResponse } from 'request';
import { createRequest } from '../lib/requestwrapper';
import { getMissingParams } from '../lib/helper';
import { BaseService } from '../lib/base_service';
import { FileObject } from '../lib/helper';

/**
 * ### Service Overview  The IBM Speech to Text service provides a Representational State Transfer (REST) Application Programming Interface (API) that enables you to add IBM's speech transcription capabilities to your applications. The service also supports an asynchronous HTTP interface for transcribing audio via non-blocking calls. And it supports a customization interface that lets you expand the vocabulary of a base model with domain-specific terminology or adapt a base model for the acoustic characteristics of your audio.   The service transcribes speech from various languages and audio formats to text with low latency. The service supports transcription of the following languages: Brazilian Portuguese, French, Japanese, Mandarin Chinese, Modern Standard Arabic, Spanish, UK English, and US English. For most languages, the service supports two sampling rates, broadband and narrowband.  ### API Overview The Speech to Text service provides the following endpoints: * `/v1/models` returns information about the language models that are available for speech recognition. * `/v1/recognize` (sessionless) includes a single method that provides a simple means of transcribing audio without the overhead of establishing and maintaining a session, but it lacks some of the capabilities available with sessions. * `/v1/sessions` provides a collection of methods that provide a mechanism for a client to maintain a long, multi-turn exchange, or session, with the service or to establish multiple parallel conversations with a particular instance of the service. * `/v1/recognitions` (asynchronous) provides a set of non-blocking methods for submitting, querying, and deleting jobs for recognition requests with the asynchronous HTTP interface. The interface includes calls to register (white-list) and unregister a callback URL. * `/v1/customizations` provides methods for creating and managing custom language models. Custom language models let you expand the vocabulary of a base model with domain-specific terminology. * `/v1/customizations/{customization_id}/corpora` provides methods for managing the corpora associated with a custom language model. You add corpora to extract out-of-vocabulary (OOV) words from the corpora into the custom language model's vocabulary. You can add, list, and delete corpora from a custom language model. * `/v1/customizations/{customization_id}/words` includes methods for managing individual words in a custom language model. You can add, modify, list, and delete words from a custom language model. * `/v1/acoustic_customizations` provides methods for creating and managing custom acoustic models. The interface lets you adapt a base model for the audio characteristics of your environment and speakers. * `/v1/acoustic_customizations/{customization_id}/audio` provides methods for managing the audio resources associated with a custom acoustic model. You add audio resources that closely match the acoustic characteristics of the audio that you want to transcribe. You can add, list, and delete audio resources from a custom acoustic model.    **Note about the Try It Out feature:** The `Try it out!` button lets you experiment with the methods of the API by making actual cURL calls to the service. The feature is **not** supported for use with the the session-based `POST /v1/sessions/{session_id}/recognize` and sessionless `POST /v1/recognize` methods. For examples of calls to these methods, see the [Speech to Text API reference](http://www.ibm.com/watson/developercloud/speech-to-text/api/v1/).  ### API Usage The following information provides details about using the service to transcribe audio: * **HTTP REST interfaces:** You can use methods of the session-based, sessionless, or asynchronous HTTP interfaces to pass audio data to the service. All interfaces let you send the data via the body of the request; the session-based and sessionless methods also let you pass data as multipart form data. With the former approach, you control the transcription via a collection of request headers and query parameters. With the latter, you control the transcription primarily via JSON metadata sent as form data. * **WebSocket interface:** The service also offers a WebSocket interface as an alternative to its HTTP interfaces. The WebSocket interface supports efficient implementation, lower latency, and higher throughput. The interface establishes a persistent connection with the service, eliminating the need for session-based calls from the HTTP interface. See [The WebSocket interface](https://console.bluemix.net/docs/services/speech-to-text/websockets.html). * **Audio formats:** The service supports a variety of popular audio formats. For more information, including links to a number of Internet sites that provide technical and usage details about the different formats, see [Audio formats](https://console.bluemix.net/docs/services/speech-to-text/audio-formats.html). * **Audio transmission:** You can pass the audio to be transcribed as a one-shot delivery or in streaming mode. With one-shot delivery, you pass all of the audio data to the service at one time. With streaming mode, you send audio data to the service in chunks over a persistent connection. To use streaming, you must pass the `Transfer-Encoding` request header with a value of `chunked`. Both forms of data transmission impose a limit of 100 MB of total data for transcription. See [Audio transmission](https://console.bluemix.net/docs/services/speech-to-text/input.html#transmission). * **Authentication:** You authenticate to the service by using your service credentials. You can use your credentials to authenticate via a proxy server that resides in IBM Cloud, or you can use your credentials to obtain a token and contact the service directly. See [Service credentials for Watson services](https://console.bluemix.net/docs/services/watson/getting-started-credentials.html) and [Tokens for authentication](https://console.bluemix.net/docs/services/watson/getting-started-tokens.html). * **Request Logging:** By default, all Watson services log requests and their results. Data is collected only to improve the Watson services. If you do not want to share your data, set the header parameter `X-Watson-Learning-Opt-Out` to `true` for each request. Data is collected for any request that omits this header. See [Controlling request logging for Watson services](https://console.bluemix.net/docs/services/watson/getting-started-logging.html).  For more information about the service and its various interfaces, see [About Speech to Text](https://console.bluemix.net/docs/services/speech-to-text/index.html). ### Customization API Usage   The following information pertains to methods of the customization interface: * Language model customization and acoustic model customization are available only for a limited set of languages. They are generally available for production use for some languages but are beta offerings for other languages. For a complete list of supported languages and the status of their availability, see [Language support for customization](https://console.bluemix.net/docs/services/speech-to-text/custom.html#languageSupport). * In all cases, you must use service credentials created for the instance of the service that owns a custom model to use the methods described in this documentation with that model. For more information, see [Ownership of custom language models](https://console.bluemix.net/docs/services/speech-to-text/custom.html#customOwner). * How the service handles request logging for the customization interface depends on the request. The service does not log data that are used to build custom models. But it does log data when a custom model is used with a recognition request. For more information, see [Request logging and data privacy](https://console.bluemix.net/docs/services/speech-to-text/custom.html#customLogging). * Each custom model is identified by a customization ID, which is a Globally Unique Identifier (GUID). A GUID is a hexadecimal string that has the same format as Watson service credentials: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. You specify a custom model's GUID with the appropriate customization parameter of methods that support customization.   For more information about using the service's customization interface, see [The customization interface](https://console.bluemix.net/docs/services/speech-to-text/custom.html).
 */

class SpeechToTextV1 extends BaseService {
  name: string; // set by prototype to 'speech_to_text'
  version: string; // set by prototype to 'v1'

  static URL: string = 'https://stream.watsonplatform.net/speech-to-text/api';

  /**
   * Construct a SpeechToTextV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://stream.watsonplatform.net/speech-to-text/api'). The base url may differ between Bluemix regions.
   * @param {String} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {String} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {SpeechToTextV1}
   */
  constructor(options: SpeechToTextV1.Options) {
    super(options);
  }

  /*************************
   * models
   ************************/

  /**
   * Retrieves information about the model.
   *
   * Returns information about a single specified language model that is available for use with the service. The information includes the name of the model and its minimum sampling rate in Hertz, among other things.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.model_id - The identifier of the desired model in the form of its `name` from the output of `GET /v1/models`.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getModel(
    params: SpeechToTextV1.GetModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.SpeechModel>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['model_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      model_id: _params.model_id
    };
    const parameters = {
      options: {
        url: '/v1/models/{model_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Retrieves the models available for the service.
   *
   * Returns a list of all language models that are available for use with the service. The information includes the name of the model and its minimum sampling rate in Hertz, among other things.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listModels(
    params?: SpeechToTextV1.ListModelsParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.SpeechModels>
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const parameters = {
      options: {
        url: '/v1/models',
        method: 'GET'
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * sessions
   ************************/

  /**
   * Creates a session.
   *
   * Creates a session and locks recognition requests to that engine. You can use the session for multiple recognition requests so that each request is processed with the same Speech to Text engine. The session expires after 30 seconds of inactivity. For information about avoiding session timeouts, see [Timeouts](https://console.bluemix.net/docs/services/speech-to-text/input.html#timeouts).   The method returns a cookie in the `Set-Cookie` response header. You must pass this cookie with each request that uses the session. For more information, see [Using cookies with sessions](https://console.bluemix.net/docs/services/speech-to-text/http.html#cookies).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.model] - The identifier of the model to be used by the new session. (Use `GET /v1/models` or `GET /v1/models/{model_id}` for information about available models.).
   * @param {string} [params.customization_id] - The GUID of a custom language model that is to be used with the new session. The base model of the specified custom language model must match the model specified with the `model` parameter. You must make the request with service credentials created for the instance of the service that owns the custom model. By default, no custom language model is used.
   * @param {string} [params.acoustic_customization_id] - The GUID of a custom acoustic model that is to be used with the new session. The base model of the specified custom acoustic model must match the model specified with the `model` parameter. You must make the request with service credentials created for the instance of the service that owns the custom model. By default, no custom acoustic model is used.
   * @param {number} [params.customization_weight] - If you specify a `customization_id` when you create the session, you can use the `customization_weight` parameter to tell the service how much weight to give to words from the custom language model compared to those from the base model for recognition requests made with the session.   Specify a value between 0.0 and 1.0. Unless a different customization weight was specified for the custom model when it was trained, the default value is 0.3. A customization weight that you specify overrides a weight that was specified when the custom model was trained.   The default value yields the best performance in general. Assign a higher value if your audio makes frequent use of OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy of phrases from the custom model's domain, but it can negatively affect performance on non-domain phrases.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createSession(
    params?: SpeechToTextV1.CreateSessionParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.SpeechSession>
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const query = {
      model: _params.model,
      customization_id: _params.customization_id,
      acoustic_customization_id: _params.acoustic_customization_id,
      customization_weight: _params.customization_weight
    };
    const parameters = {
      options: {
        url: '/v1/sessions',
        method: 'POST',
        qs: query
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Deletes the specified session.
   *
   * Deletes an existing session and its engine. The request must pass the cookie that was returned by the `POST /v1/sessions` method. You cannot send requests to a session after it is deleted. By default, a session expires after 30 seconds of inactivity if you do not delete it first.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.session_id - The ID of the session to be deleted.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteSession(
    params: SpeechToTextV1.DeleteSessionParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['session_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      session_id: _params.session_id
    };
    const parameters = {
      options: {
        url: '/v1/sessions/{session_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Checks whether a session is ready to accept a new recognition task.
   *
   * Checks whether a specified session can accept another recognition request. Concurrent recognition tasks during the same session are not allowed. The returned state must be `initialized` to indicate that you can send another recognition request with the `POST /v1/recognize` method. The request must pass the cookie that was returned by the `POST /v1/sessions` method.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.session_id - The ID of the session for the recognition task.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getSessionStatus(
    params: SpeechToTextV1.GetSessionStatusParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.SessionStatus>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['session_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      session_id: _params.session_id
    };
    const parameters = {
      options: {
        url: '/v1/sessions/{session_id}/recognize',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }
  
  /*************************
   * asynchronous
   ************************/

  /**
   * Checks the status of the specified asynchronous job.
   *
   * Returns information about the specified job. The response always includes the status of the job and its creation and update times. If the status is `completed`, the response includes the results of the recognition request. You must submit the request with the service credentials of the user who created the job.   You can use the method to retrieve the results of any job, regardless of whether it was submitted with a callback URL and the `recognitions.completed_with_results` event, and you can retrieve the results multiple times for as long as they remain available.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of the job whose status is to be checked.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  checkJob(
    params: SpeechToTextV1.CheckJobParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.RecognitionJob>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      id: _params.id
    };
    const parameters = {
      options: {
        url: '/v1/recognitions/{id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Checks the status of all asynchronous jobs.
   *
   * Returns the ID and status of all outstanding jobs associated with the service credentials with which it is called. The method also returns the creation and update times of each job, and, if a job was created with a callback URL and a user token, the user token for the job. To obtain the results for a job whose status is `completed`, use the `GET /v1/recognitions/{id}` method. A job and its results remain available until you delete them with the `DELETE /v1/recognitions/{id}` method or until the job's time to live expires, whichever comes first.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  checkJobs(
    params?: SpeechToTextV1.CheckJobsParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.RecognitionJobs>
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const parameters = {
      options: {
        url: '/v1/recognitions',
        method: 'GET'
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Creates a job for an asynchronous recognition request.
   *
   * Creates a job for a new asynchronous recognition request. The job is owned by the user whose service credentials are used to create it. How you learn the status and results of a job depends on the parameters you include with the job creation request: * By callback notification: Include the `callback_url` query parameter to specify a URL to which the service is to send callback notifications when the status of the job changes. Optionally, you can also include the `events` and `user_token` query parameters to subscribe to specific events and to specify a string that is to be included with each notification for the job. * By polling the service: Omit the `callback_url`, `events`, and `user_token` query parameters. You must then use the `GET /v1/recognitions` or `GET /v1/recognitions/{id}` methods to check the status of the job, using the latter to retrieve the results when the job is complete.  The two approaches are not mutually exclusive. You can poll the service for job status or obtain results from the service manually even if you include a callback URL. In both cases, you can include the `results_ttl` parameter to specify how long the results are to remain available after the job is complete. Note that using the HTTPS `GET /v1/recognitions/{id}` method to retrieve results is more secure than receiving them via callback notification over HTTP because it provides confidentiality in addition to authentication and data integrity.   The method supports the same basic parameters as other HTTP and WebSocket recognition requests. The service imposes a data size limit of 100 MB. It automatically detects the endianness of the incoming audio and, for audio that includes multiple channels, downmixes the audio to one-channel mono during transcoding. (For the `audio/l16` format, you can specify the endianness.)   **Note:** You can pass the `interim_results` parameter with a recognition request made with the HTTP asynchronous interface. However, the service sends all results, both interim and final, at the same time, when the request completes. The service does **not** return interim results as it generates them.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} [params.callback_url] - A URL to which callback notifications are to be sent. The URL must already be successfully white-listed by using the `POST /v1/register_callback` method. Omit the parameter to poll the service for job completion and results. You can include the same callback URL with any number of job creation requests. Use the `user_token` query parameter to specify a unique user-specified string with each job to differentiate the callback notifications for the jobs.
   * @param {string} [params.events] - If the job includes a callback URL, a comma-separated list of notification events to which to subscribe. Valid events are: `recognitions.started` generates a callback notification when the service begins to process the job. `recognitions.completed` generates a callback notification when the job is complete; you must use the `GET /v1/recognitions/{id}` method to retrieve the results before they time out or are deleted. `recognitions.completed_with_results` generates a callback notification when the job is complete; the notification includes the results of the request. `recognitions.failed` generates a callback notification if the service experiences an error while processing the job. Omit the parameter to subscribe to the default events: `recognitions.started`, `recognitions.completed`, and `recognitions.failed`. The `recognitions.completed` and `recognitions.completed_with_results` events are incompatible; you can specify only of the two events. If the job does not include a callback URL, omit the parameter.
   * @param {string} [params.user_token] - If the job includes a callback URL, a user-specified string that the service is to include with each callback notification for the job; the token allows the user to maintain an internal mapping between jobs and notification events. If the job does not include a callback URL, omit the parameter.
   * @param {number} [params.results_ttl] - The number of minutes for which the results are to be available after the job has finished. If not delivered via a callback, the results must be retrieved within this time. Omit the parameter to use a time to live of one week. The parameter is valid with or without a callback URL.
   * @param {string} [params.transfer_encoding] - Set to `chunked` to send the audio in streaming mode. The data does not need to exist fully before being streamed to the service.
   * @param {Blob} params.audio - Audio to transcribe in the format specified by the `Content-Type` header.
   * @param {string} params.content_type - The type of the input: audio/basic, audio/flac, audio/l16, audio/mp3, audio/mpeg, audio/mulaw, audio/ogg, audio/ogg;codecs=opus, audio/ogg;codecs=vorbis, audio/wav, audio/webm, audio/webm;codecs=opus, or audio/webm;codecs=vorbis.
   * @param {string} [params.model] - The identifier of the model to be used for the recognition request. (Use `GET /v1/models` for a list of available models.).
   * @param {string} [params.customization_id] - The GUID of a custom language model that is to be used with the request. The base model of the specified custom language model must match the model specified with the `model` parameter. You must make the request with service credentials created for the instance of the service that owns the custom model. By default, no custom language model is used.
   * @param {string} [params.acoustic_customization_id] - The GUID of a custom acoustic model that is to be used with the request. The base model of the specified custom acoustic model must match the model specified with the `model` parameter. You must make the request with service credentials created for the instance of the service that owns the custom model. By default, no custom acoustic model is used.
   * @param {number} [params.customization_weight] - If you specify a `customization_id` with the request, you can use the `customization_weight` parameter to tell the service how much weight to give to words from the custom language model compared to those from the base model for speech recognition.   Specify a value between 0.0 and 1.0. Unless a different customization weight was specified for the custom model when it was trained, the default value is 0.3. A customization weight that you specify overrides a weight that was specified when the custom model was trained.   The default value yields the best performance in general. Assign a higher value if your audio makes frequent use of OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy of phrases from the custom model's domain, but it can negatively affect  performance on non-domain phrases.
   * @param {number} [params.inactivity_timeout] - The time in seconds after which, if only silence (no speech) is detected in submitted audio, the connection is closed with a 400 error. Useful for stopping audio submission from a live microphone when a user simply walks away. Use `-1` for infinity.
   * @param {string[]} [params.keywords] - Array of keyword strings to spot in the audio. Each keyword string can include one or more tokens. Keywords are spotted only in the final hypothesis, not in interim results. Omit the parameter or specify an empty array if you do not need to spot keywords.
   * @param {number} [params.keywords_threshold] - Confidence value that is the lower bound for spotting a keyword. A word is considered to match a keyword if its confidence is greater than or equal to the threshold. Specify a probability between 0 and 1 inclusive. No keyword spotting is performed if you omit the parameter. If you specify a threshold, you must also specify one or more keywords.
   * @param {number} [params.max_alternatives] - Maximum number of alternative transcripts to be returned. By default, a single transcription is returned.
   * @param {number} [params.word_alternatives_threshold] - Confidence value that is the lower bound for identifying a hypothesis as a possible word alternative (also known as "Confusion Networks"). An alternative word is considered if its confidence is greater than or equal to the threshold. Specify a probability between 0 and 1 inclusive. No alternative words are computed if you omit the parameter.
   * @param {boolean} [params.word_confidence] - If `true`, confidence measure per word is returned.
   * @param {boolean} [params.timestamps] - If `true`, time alignment for each word is returned.
   * @param {boolean} [params.profanity_filter] - If `true` (the default), filters profanity from all output except for keyword results by replacing inappropriate words with a series of asterisks. Set the parameter to `false` to return results with no censoring. Applies to US English transcription only.
   * @param {boolean} [params.smart_formatting] - If `true`, converts dates, times, series of digits and numbers, phone numbers, currency values, and Internet addresses into more readable, conventional representations in the final transcript of a recognition request. If `false` (the default), no formatting is performed. Applies to US English transcription only.
   * @param {boolean} [params.speaker_labels] - Indicates whether labels that identify which words were spoken by which participants in a multi-person exchange are to be included in the response. The default is `false`; no speaker labels are returned. Setting `speaker_labels` to `true` forces the `timestamps` parameter to be `true`, regardless of whether you specify `false` for the parameter.   To determine whether a language model supports speaker labels, use the `GET /v1/models` method and check that the attribute `speaker_labels` is set to `true`. You can also refer to [Speaker labels](https://console.bluemix.net/docs/services/speech-to-text/output.html#speaker_labels).
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createJob(
    params: SpeechToTextV1.CreateJobParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.RecognitionJob>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['audio', 'content_type'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = _params.audio;
    const query = {
      callback_url: _params.callback_url,
      events: _params.events,
      user_token: _params.user_token,
      results_ttl: _params.results_ttl,
      model: _params.model,
      customization_id: _params.customization_id,
      acoustic_customization_id: _params.acoustic_customization_id,
      customization_weight: _params.customization_weight,
      inactivity_timeout: _params.inactivity_timeout,
      keywords: _params.keywords,
      keywords_threshold: _params.keywords_threshold,
      max_alternatives: _params.max_alternatives,
      word_alternatives_threshold: _params.word_alternatives_threshold,
      word_confidence: _params.word_confidence,
      timestamps: _params.timestamps,
      profanity_filter: _params.profanity_filter,
      smart_formatting: _params.smart_formatting,
      speaker_labels: _params.speaker_labels
    };
    const parameters = {
      options: {
        url: '/v1/recognitions',
        method: 'POST',
        json: _params.content_type === 'application/json',
        body: body,
        qs: query
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Transfer-Encoding': _params.transfer_encoding,
          'Content-Type': _params.content_type
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Deletes the specified asynchronous job.
   *
   * Deletes the specified job. You cannot delete a job that the service is actively processing. Once you delete a job, its results are no longer available. The service automatically deletes a job and its results when the time to live for the results expires. You must submit the request with the service credentials of the user who created the job.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID of the job that is to be deleted.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteJob(
    params: SpeechToTextV1.DeleteJobParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      id: _params.id
    };
    const parameters = {
      options: {
        url: '/v1/recognitions/{id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Registers a callback URL for use with the asynchronous interface.
   *
   * Registers a callback URL with the service for use with subsequent asynchronous recognition requests. The service attempts to register, or white-list, the callback URL if it is not already registered by sending a `GET` request to the callback URL. The service passes a random alphanumeric challenge string via the `challenge_string` query parameter of the request. The request includes an `Accept` header that specifies `text/plain` as the required response type.   To be registered successfully, the callback URL must respond to the `GET` request from the service. The response must send status code 200 and must include the challenge string in its body. Set the `Content-Type` response header to `text/plain`. Upon receiving this response, the service responds to the original `POST` registration request with response code 201.   The service sends only a single `GET` request to the callback URL. If the service does not receive a reply with a response code of 200 and a body that echoes the challenge string sent by the service within five seconds, it does not white-list the URL; it instead sends status code 400 in response to the `POST` registration request. If the requested callback URL is already white-listed, the service responds to the initial registration request with response code 200.   If you specify a user secret with the request, the service uses it as a key to calculate an HMAC-SHA1 signature of the challenge string in its response to the `POST` request. It sends this signature in the `X-Callback-Signature` header of its `GET` request to the URL during registration. It also uses the secret to calculate a signature over the payload of every callback notification that uses the URL. The signature provides authentication and data integrity for HTTP communications.   Once you successfully register a callback URL, you can use it with an indefinite number of recognition requests. You can register a maximum of 20 callback URLS in a one-hour span of time. For more information, see [Registering a callback URL](https://console.bluemix.net/docs/services/speech-to-text/async.html#register).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.callback_url - An HTTP or HTTPS URL to which callback notifications are to be sent. To be white-listed, the URL must successfully echo the challenge string during URL verification. During verification, the client can also check the signature that the service sends in the `X-Callback-Signature` header to verify the origin of the request.
   * @param {string} [params.user_secret] - A user-specified string that the service uses to generate the HMAC-SHA1 signature that it sends via the `X-Callback-Signature` header. The service includes the header during URL verification and with every notification sent to the callback URL. It calculates the signature over the payload of the notification. If you omit the parameter, the service does not send the header.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  registerCallback(
    params: SpeechToTextV1.RegisterCallbackParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.RegisterStatus>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['callback_url'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      callback_url: _params.callback_url,
      user_secret: _params.user_secret
    };
    const parameters = {
      options: {
        url: '/v1/register_callback',
        method: 'POST',
        qs: query
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Removes the registration for an asynchronous callback URL.
   *
   * Unregisters a callback URL that was previously white-listed with a `POST register_callback` request for use with the asynchronous interface. Once unregistered, the URL can no longer be used with asynchronous recognition requests.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.callback_url - The callback URL that is to be unregistered.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  unregisterCallback(
    params: SpeechToTextV1.UnregisterCallbackParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['callback_url'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      callback_url: _params.callback_url
    };
    const parameters = {
      options: {
        url: '/v1/unregister_callback',
        method: 'POST',
        qs: query
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * customLanguageModels
   ************************/

  /**
   * Creates a custom language model.
   *
   * Creates a new custom language model for a specified base model. The custom language model can be used only with the base model for which it is created. The model is owned by the instance of the service whose credentials are used to create it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.content_type - The type of the input.
   * @param {string} params.name - A user-defined name for the new custom language model. Use a name that is unique among all custom language models that you own. Use a localized name that matches the language of the custom model. Use a name that describes the domain of the custom model, such as `Medical custom model` or `Legal custom model`.
   * @param {string} params.base_model_name - The name of the base language model that is to be customized by the new custom language model. The new custom model can be used only with the base model that it customizes. To determine whether a base model supports language model customization, request information about the base model and check that the attribute `custom_language_model` is set to `true`, or refer to [Language support for customization](https://console.bluemix.net/docs/services/speech-to-text/custom.html#languageSupport).
   * @param {string} [params.dialect] - The dialect of the specified language that is to be used with the custom language model. The parameter is meaningful only for Spanish models, for which the service creates a custom language model that is suited for speech in one of the following dialects: * `es-ES` for Castilian Spanish (the default) * `es-LA` for Latin American Spanish * `es-US` for North American (Mexican) Spanish   A specified dialect must be valid for the base model. By default, the dialect matches the language of the base model; for example, `en-US` for either of the US English language models.
   * @param {string} [params.description] - A description of the new custom language model. Use a localized description that matches the language of the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createLanguageModel(
    params: SpeechToTextV1.CreateLanguageModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.LanguageModel>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['content_type', 'name', 'base_model_name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      name: _params.name,
      base_model_name: _params.base_model_name,
      dialect: _params.dialect,
      description: _params.description
    };
    const parameters = {
      options: {
        url: '/v1/customizations',
        method: 'POST',
        json: true,
        body: body
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': _params.content_type || 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Deletes a custom language model.
   *
   * Deletes an existing custom language model. The custom model cannot be deleted if another request, such as adding a corpus to the model, is currently being processed. You must use credentials for the instance of the service that owns a model to delete it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model that is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteLanguageModel(
    params: SpeechToTextV1.DeleteLanguageModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists information about a custom language model.
   *
   * Lists information about a specified custom language model. You must use credentials for the instance of the service that owns a model to list information about it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model for which information is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getLanguageModel(
    params: SpeechToTextV1.GetLanguageModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.LanguageModel>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists information about all custom language models.
   *
   * Lists information about all custom language models that are owned by an instance of the service. Use the `language` parameter to see all custom language models for the specified language; omit the parameter to see all custom language models for all languages. You must use credentials for the instance of the service that owns a model to list information about it.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.language] - The identifier of the language for which custom language models are to be returned (for example, `en-US`). Omit the parameter to see all custom language models owned by the requesting service credentials.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listLanguageModels(
    params?: SpeechToTextV1.ListLanguageModelsParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.LanguageModels>
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const query = {
      language: _params.language
    };
    const parameters = {
      options: {
        url: '/v1/customizations',
        method: 'GET',
        qs: query
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Resets a custom language model.
   *
   * Resets a custom language model by removing all corpora and words from the model. Resetting a custom language model initializes the model to its state when it was first created. Metadata such as the name and language of the model are preserved, but the model's words resource is removed and must be re-created. You must use credentials for the instance of the service that owns a model to reset it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model that is to be reset. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  resetLanguageModel(
    params: SpeechToTextV1.ResetLanguageModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/reset',
        method: 'POST',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Trains a custom language model.
   *
   * Initiates the training of a custom language model with new corpora, custom words, or both. After adding, modifying, or deleting corpora or words for a custom language model, use this method to begin the actual training of the model on the latest data. You can specify whether the custom language model is to be trained with all words from its words resource or only with words that were added or modified by the user. You must use credentials for the instance of the service that owns a model to train it.   The training method is asynchronous. It can take on the order of minutes to complete depending on the amount of data on which the service is being trained and the current load on the service. The method returns an HTTP 200 response code to indicate that the training process has begun.   You can monitor the status of the training by using the `GET /v1/customizations/{customization_id}` method to poll the model's status. Use a loop to check the status every 10 seconds. The method returns a `Customization` object that includes `status` and `progress` fields. A status of `available` means that the custom model is trained and ready to use. The service cannot accept subsequent training requests, or requests to add new corpora or words, until the existing request completes.   Training can fail to start for the following reasons: * The service is currently handling another request for the custom model, such as another training request or a request to add a corpus or words to the model. * No training data (corpora or words) have been added to the custom model. * One or more words that were added to the custom model have invalid sounds-like pronunciations that you must fix.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model that is to be trained. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} [params.word_type_to_add] - The type of words from the custom language model's words resource on which to train the model: * `all` (the default) trains the model on all new words, regardless of whether they were extracted from corpora or were added or modified by the user. * `user` trains the model only on new words that were added or modified by the user; the model is not trained on new words extracted from corpora.
   * @param {number} [params.customization_weight] - Specifies a customization weight for the custom language model. The customization weight tells the service how much weight to give to words from the custom language model compared to those from the base model for speech recognition. Specify a value between 0.0 and 1.0. The default value is 0.3.   The default value yields the best performance in general. Assign a higher value if your audio makes frequent use of OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy of phrases from the custom model's domain, but it can negatively affect performance on non-domain phrases.   The value that you assign is used for all recognition requests that use the model. You can override it for any recognition request by specifying a customization weight for that request.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  trainLanguageModel(
    params: SpeechToTextV1.TrainLanguageModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      word_type_to_add: _params.word_type_to_add,
      customization_weight: _params.customization_weight
    };
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/train',
        method: 'POST',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Upgrades a custom language model.
   *
   * Upgrades a custom language model to the latest release level of the Speech to Text service. The method bases the upgrade on the latest trained data stored for the custom model. If the corpora or words associated with the model have changed since the model was last trained, you must use the `POST /v1/customizations/{customization_id}/train` method to train the model on the new data. You must use credentials for the instance of the service that owns a model to upgrade it.   **Note:** This method is not currently implemented. It will be added for a future release of the API.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model that is to be upgraded. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  upgradeLanguageModel(
    params: SpeechToTextV1.UpgradeLanguageModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/upgrade',
        method: 'POST',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * customCorpora
   ************************/

  /**
   * Adds a corpus text file to a custom language model.
   *
   * Adds a single corpus text file of new training data to a custom language model. Use multiple requests to submit multiple corpus text files. You must use credentials for the instance of the service that owns a model to add a corpus to it. Note that adding a corpus does not affect the custom language model until you train the model for the new data by using the `POST /v1/customizations/{customization_id}/train` method.   Submit a plain text file that contains sample sentences from the domain of interest to enable the service to extract words in context. The more sentences you add that represent the context in which speakers use words from the domain, the better the service's recognition accuracy. For guidelines about adding a corpus text file and for information about how the service parses a corpus file, see [Preparing a corpus text file](https://console.bluemix.net/docs/services/speech-to-text/language-resource.html#prepareCorpus).   The call returns an HTTP 201 response code if the corpus is valid. The service then asynchronously processes the contents of the corpus and automatically extracts new words that it finds. This can take on the order of a minute or two to complete depending on the total number of words and the number of new words in the corpus, as well as the current load on the service. You cannot submit requests to add additional corpora or words to the custom model, or to train the model, until the service's analysis of the corpus for the current request completes. Use the `GET /v1/customizations/{customization_id}/corpora/{corpus_name}` method to check the status of the analysis.   The service auto-populates the model's words resource with any word that is not found in its base vocabulary; these are referred to as out-of-vocabulary (OOV) words. You can use the `GET /v1/customizations/{customization_id}/words` method to examine the words resource, using other words method to eliminate typos and modify how words are pronounced as needed.   To add a corpus file that has the same name as an existing corpus, set the allow_overwrite query parameter to true; otherwise, the request fails. Overwriting an existing corpus causes the service to process the corpus text file and extract OOV words anew. Before doing so, it removes any OOV words associated with the existing corpus from the model's words resource unless they were also added by another corpus or they have been modified in some way with the `POST /v1/customizations/{customization_id}/words` or `PUT /v1/customizations/{customization_id}/words/{word_name}` method.   The service limits the overall amount of data that you can add to a custom model to a maximum of 10 million total words from all corpora combined. Also, you can add no more than 30 thousand new custom words to a model; this includes words that the service extracts from corpora and words that you add directly.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model to which a corpus is to be added. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.corpus_name - The name of the corpus that is to be added to the custom language model. The name cannot contain spaces and cannot be the string `user`, which is reserved by the service to denote custom words added or modified by the user. Use a localized name that matches the language of the custom model.
   * @param {boolean} [params.allow_overwrite] - Indicates whether the specified corpus is to overwrite an existing corpus with the same name. If a corpus with the same name already exists, the request fails unless `allow_overwrite` is set to `true`; by default, the parameter is `false`. The parameter has no effect if a corpus with the same name does not already exist.
   * @param {ReadableStream|FileObject|Buffer} params.corpus_file - A plain text file that contains the training data for the corpus. Encode the file in UTF-8 if it contains non-ASCII characters; the service assumes UTF-8 encoding if it encounters non-ASCII characters. With cURL, use the `--data-binary` option to upload the file for the request.
   * @param {string} [params.corpus_file_content_type] - The content type of corpus_file.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  addCorpus(
    params: SpeechToTextV1.AddCorpusParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'corpus_name', 'corpus_file'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      corpus_file: {
        data: _params.corpus_file,
        contentType: _params.corpus_file_content_type
      }
    };
    const query = {
      allow_overwrite: _params.allow_overwrite
    };
    const path = {
      customization_id: _params.customization_id,
      corpus_name: _params.corpus_name
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/corpora/{corpus_name}',
        method: 'POST',
        qs: query,
        path: path,
        formData: formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'text/plain'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Deletes a corpus from a custom language model.
   *
   * Deletes an existing corpus from a custom language model. The service removes any out-of-vocabulary (OOV) words associated with the corpus from the custom model's words resource unless they were also added by another corpus or they have been modified in some way with the `POST /v1/customizations/{customization_id}/words` or `PUT /v1/customizations/{customization_id}/words/{word_name}` method. Removing a corpus does not affect the custom model until you train the model with the `POST /v1/customizations/{customization_id}/train` method. You must use credentials for the instance of the service that owns a model to delete its corpora.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model from which a corpus is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.corpus_name - The name of the corpus that is to be deleted from the custom language model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteCorpus(
    params: SpeechToTextV1.DeleteCorpusParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'corpus_name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id,
      corpus_name: _params.corpus_name
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/corpora/{corpus_name}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists information about a corpus for a custom language model.
   *
   * Lists information about a corpus from a custom language model. The information includes the total number of words and out-of-vocabulary (OOV) words, name, and status of the corpus. You must use credentials for the instance of the service that owns a model to list its corpora.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model for which a corpus is to be listed. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.corpus_name - The name of the corpus about which information is to be listed.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getCorpus(
    params: SpeechToTextV1.GetCorpusParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Corpus>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'corpus_name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id,
      corpus_name: _params.corpus_name
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/corpora/{corpus_name}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists information about all corpora for a custom language model.
   *
   * Lists information about all corpora from a custom language model. The information includes the total number of words and out-of-vocabulary (OOV) words, name, and status of each corpus. You must use credentials for the instance of the service that owns a model to list its corpora.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model for which corpora are to be listed. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listCorpora(
    params: SpeechToTextV1.ListCorporaParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Corpora>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/corpora',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * customWords
   ************************/

  /**
   * Adds a custom word to a custom language model.
   *
   * Adds a custom word to a custom language model. The service populates the words resource for a custom model with out-of-vocabulary (OOV) words found in each corpus added to the model. You can use this method to add additional words or to modify existing words in the words resource. You must use credentials for the instance of the service that owns a model to add or modify a custom word for the model. Adding or modifying a custom word does not affect the custom model until you train the model for the new data by using the `POST /v1/customizations/{customization_id}/train` method.   Use the `word_name` path parameter to specify the custom word that is to be added or modified. Use the `CustomWord` object to provide one or both of the optional `sounds_like` and `display_as` fields for the word. * The `sounds_like` field provides an array of one or more pronunciations for the word. Use the parameter to specify how the word can be pronounced by users. Use the parameter for words that are difficult to pronounce, foreign words, acronyms, and so on. For example, you might specify that the word `IEEE` can sound like `i triple e`. You can specify a maximum of five sounds-like pronunciations for a word. For information about pronunciation rules, see [Using the sounds_like field](https://console.bluemix.net/docs/services/speech-to-text/language-resource.html#soundsLike). * The `display_as` field provides a different way of spelling the word in a transcript. Use the parameter when you want the word to appear different from its usual representation or from its spelling in corpora training data. For example, you might indicate that the word `IBM(trademark)` is to be displayed as `IBM`. For more information, see [Using the display_as field](https://console.bluemix.net/docs/services/speech-to-text/language-resource.html#displayAs).    If you add a custom word that already exists in the words resource for the custom model, the new definition overwrites the existing data for the word. If the service encounters an error, it does not add the word to the words resource. Use the `GET /v1/customizations/{customization_id}/words/{word_name}` method to review the word that you add.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model to which a word is to be added. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.word_name - The custom word that is to be added to or updated in the custom model. Do not include spaces in the word. Use a - (dash) or _ (underscore) to connect the tokens of compound words.
   * @param {string} params.content_type - The type of the input.
   * @param {string} [params.word] - **When specifying an array of one or more words,** you must specify the custom word that is to be added to or updated in the custom model. Do not include spaces in the word. Use a - (dash) or _ (underscore) to connect the tokens of compound words. **When adding or updating a single word directly,** omit this field.
   * @param {string[]} [params.sounds_like] - An array of sounds-like pronunciations for the custom word. Specify how words that are difficult to pronounce, foreign words, acronyms, and so on can be pronounced by users. For a word that is not in the service's base vocabulary, omit the parameter to have the service automatically generate a sounds-like pronunciation for the word. For a word that is in the service's base vocabulary, use the parameter to specify additional pronunciations for the word. You cannot override the default pronunciation of a word; pronunciations you add augment the pronunciation from the base vocabulary. A word can have at most five sounds-like pronunciations, and a pronunciation can include at most 40 characters not including spaces.
   * @param {string} [params.display_as] - An alternative spelling for the custom word when it appears in a transcript. Use the parameter when you want the word to have a spelling that is different from its usual representation or from its spelling in corpora training data.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  addWord(
    params: SpeechToTextV1.AddWordParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'word_name', 'content_type'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      word: _params.word,
      sounds_like: _params.sounds_like,
      display_as: _params.display_as
    };
    const path = {
      customization_id: _params.customization_id,
      word_name: _params.word_name
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word_name}',
        method: 'PUT',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': _params.content_type || 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Adds one or more custom words to a custom language model.
   *
   * Adds one or more custom words to a custom language model. The service populates the words resource for a custom model with out-of-vocabulary (OOV) words found in each corpus added to the model. You can use this method to add additional words or to modify existing words in the words resource. You must use credentials for the instance of the service that owns a model to add or modify custom words for the model. Adding or modifying custom words does not affect the custom model until you train the model for the new data by using the `POST /v1/customizations/{customization_id}/train` method.   You add custom words by providing a `Words` object, which is an array of `Word` objects, one per word. You must use the object's word parameter to identify the word that is to be added. You can also provide one or both of the optional `sounds_like` and `display_as` fields for each word. * The `sounds_like` field provides an array of one or more pronunciations for the word. Use the parameter to specify how the word can be pronounced by users. Use the parameter for words that are difficult to pronounce, foreign words, acronyms, and so on. For example, you might specify that the word `IEEE` can sound like `i triple e`. You can specify a maximum of five sounds-like pronunciations for a word. For information about pronunciation rules, see [Using the sounds_like field](https://console.bluemix.net/docs/services/speech-to-text/language-resource.html#soundsLike). * The `display_as` field provides a different way of spelling the word in a transcript. Use the parameter when you want the word to appear different from its usual representation or from its spelling in corpora training data. For example, you might indicate that the word `IBM(trademark)` is to be displayed as `IBM`. For more information, see [Using the display_as field](https://console.bluemix.net/docs/services/speech-to-text/language-resource.html#displayAs).    If you add a custom word that already exists in the words resource for the custom model, the new definition overwrites the existing data for the word. If the service encounters an error with the input data, it returns a failure code and does not add any of the words to the words resource.   The call returns an HTTP 201 response code if the input data is valid. It then asynchronously processes the words to add them to the model's words resource. The time that it takes for the analysis to complete depends on the number of new words that you add but is generally faster than adding a corpus or training a model.   You can monitor the status of the request by using the `GET /v1/customizations/{customization_id}` method to poll the model's status. Use a loop to check the status every 10 seconds. The method returns a `Customization` object that includes a `status` field. A status of `ready` means that the words have been added to the custom model. The service cannot accept requests to add new corpora or words or to train the model until the existing request completes.   You can use the `GET /v1/customizations/{customization_id}/words` or `GET /v1/customizations/{customization_id}/words/{word_name}` method to review the words that you add. Words with an invalid `sounds_like` field include an `error` field that describes the problem. You can use other words methods to correct errors, eliminate typos, and modify how words are pronounced as needed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model to which words are to be added. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.content_type - The type of the input.
   * @param {CustomWord[]} params.words - An array of objects that provides information about each custom word that is to be added to or updated in the custom language model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  addWords(
    params: SpeechToTextV1.AddWordsParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'content_type', 'words'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      words: _params.words
    };
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': _params.content_type || 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Deletes a custom word from a custom language model.
   *
   * Deletes a custom word from a custom language model. You can remove any word that you added to the custom model's words resource via any means. However, if the word also exists in the service's base vocabulary, the service removes only the custom pronunciation for the word; the word remains in the base vocabulary. Removing a custom word does not affect the custom model until you train the model with the `POST /v1/customizations/{customization_id}/train` method. You must use credentials for the instance of the service that owns a model to delete its words.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model from which a word is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.word_name - The custom word that is to be deleted from the custom language model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteWord(
    params: SpeechToTextV1.DeleteWordParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'word_name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id,
      word_name: _params.word_name
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word_name}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists a custom word from a custom language model.
   *
   * Lists information about a custom word from a custom language model. You must use credentials for the instance of the service that owns a model to query information about its words.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model from which a word is to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.word_name - The custom word that is to be queried from the custom language model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getWord(
    params: SpeechToTextV1.GetWordParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Word>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'word_name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id,
      word_name: _params.word_name
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word_name}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists all custom words from a custom language model.
   *
   * Lists information about custom words from a custom language model. You can list all words from the custom model's words resource, only custom words that were added or modified by the user, or only out-of-vocabulary (OOV) words that were extracted from corpora. You can also indicate the order in which the service is to return words; by default, words are listed in ascending alphabetical order. You must use credentials for the instance of the service that owns a model to query information about its words.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom language model from which words are to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} [params.word_type] - The type of words to be listed from the custom language model's words resource: * `all` (the default) shows all words. * `user` shows only custom words that were added or modified by the user. * `corpora` shows only OOV that were extracted from corpora.
   * @param {string} [params.sort] - Indicates the order in which the words are to be listed, `alphabetical` or by `count`. You can prepend an optional `+` or `-` to an argument to indicate whether the results are to be sorted in ascending or descending order. By default, words are sorted in ascending alphabetical order. For alphabetical ordering, the lexicographical precedence is numeric values, uppercase letters, and lowercase letters. For count ordering, values with the same count are not ordered. With cURL, URL encode the `+` symbol as `%2B`.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listWords(
    params: SpeechToTextV1.ListWordsParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Words>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      word_type: _params.word_type,
      sort: _params.sort
    };
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * customAcousticModels
   ************************/

  /**
   * Creates a custom acoustic model.
   *
   * Creates a new custom acoustic model for a specified base model. The custom acoustic model can be used only with the base model for which it is created. The model is owned by the instance of the service whose credentials are used to create it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.content_type - The type of the input.
   * @param {string} params.name - A user-defined name for the new custom acoustic model. Use a name that is unique among all custom acoustic models that you own. Use a localized name that matches the language of the custom model. Use a name that describes the acoustic environment of the custom model, such as `Mobile custom model` or `Noisy car custom model`.
   * @param {string} params.base_model_name - The name of the base language model that is to be customized by the new custom acoustic model. The new custom model can be used only with the base model that it customizes. To determine whether a base model supports acoustic model customization, refer to [Language support for customization](https://console.bluemix.net/docs/services/speech-to-text/custom.html#languageSupport).
   * @param {string} [params.description] - A description of the new custom acoustic model. Use a localized description that matches the language of the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createAcousticModel(
    params: SpeechToTextV1.CreateAcousticModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.AcousticModel>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['content_type', 'name', 'base_model_name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      name: _params.name,
      base_model_name: _params.base_model_name,
      description: _params.description
    };
    const parameters = {
      options: {
        url: '/v1/acoustic_customizations',
        method: 'POST',
        json: true,
        body: body
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': _params.content_type || 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Deletes a custom acoustic model.
   *
   * Deletes an existing custom acoustic model. The custom model cannot be deleted if another request, such as adding an audio resource to the model, is currently being processed. You must use credentials for the instance of the service that owns a model to delete it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom acoustic model that is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteAcousticModel(
    params: SpeechToTextV1.DeleteAcousticModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists information about a custom acoustic model.
   *
   * Lists information about a specified custom acoustic model. You must use credentials for the instance of the service that owns a model to list information about it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom acoustic model for which information is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getAcousticModel(
    params: SpeechToTextV1.GetAcousticModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.AcousticModel>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists information about all custom acoustic models.
   *
   * Lists information about all custom acoustic models that are owned by an instance of the service. Use the `language` parameter to see all custom acoustic models for the specified language; omit the parameter to see all custom acoustic models for all languages. You must use credentials for the instance of the service that owns a model to list information about it.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.language] - The identifier of the language for which custom acoustic models are to be returned (for example, `en-US`). Omit the parameter to see all custom acoustic models owned by the requesting service credentials.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listAcousticModels(
    params?: SpeechToTextV1.ListAcousticModelsParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.AcousticModels>
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const query = {
      language: _params.language
    };
    const parameters = {
      options: {
        url: '/v1/acoustic_customizations',
        method: 'GET',
        qs: query
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Resets a custom acoustic model.
   *
   * Resets a custom acoustic model by removing all audio resources from the model. Resetting a custom acoustic model initializes the model to its state when it was first created. Metadata such as the name and language of the model are preserved, but the model's audio resources are removed and must be re-created. You must use credentials for the instance of the service that owns a model to reset it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom acoustic model that is to be reset. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  resetAcousticModel(
    params: SpeechToTextV1.ResetAcousticModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}/reset',
        method: 'POST',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Trains a custom acoustic model.
   *
   * Initiates the training of a custom acoustic model with new or changed audio resources. After adding or deleting audio resources for a custom acoustic model, use this method to begin the actual training of the model on the latest audio data. The custom acoustic model does not reflect its changed data until you train it. You must use credentials for the instance of the service that owns a model to train it.   The training method is asynchronous. It can take on the order of minutes or hours to complete depending on the total amount of audio data on which the model is being trained and the current load on the service. Typically, training takes approximately twice the length of the total audio contained in the custom model. The method returns an HTTP 200 response code to indicate that the training process has begun.   You can monitor the status of the training by using the `GET /v1/acoustic_customizations/{customization_id}` method to poll the model's status. Use a loop to check the status once a minute. The method returns an `Customization` object that includes `status` and `progress` fields. A status of `available` indicates that the custom model is trained and ready to use. The service cannot accept subsequent training requests, or requests to add new audio resources, until the existing request completes.   You can use the optional `custom_language_model_id` query parameter to specify the GUID of a separately created custom language model that is to be used during training. Specify a custom language model if you have verbatim transcriptions of the audio files that you have added to the custom model or you have either corpora (text files) or a list of words that are relevant to the contents of the audio files. For information about creating a separate custom language model, see [Creating a custom language model](https://console.bluemix.net/docs/services/speech-to-text/language-create.html).   Training can fail to start for the following reasons: * The service is currently handling another request for the custom model, such as another training request or a request to add audio resources to the model. * The custom model contains less than 10 minutes or more than 50 hours of audio data. * One or more of the custom model's audio resources is invalid.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom acoustic model that is to be trained. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} [params.custom_language_model_id] - The GUID of a custom language model that is to be used during training of the custom acoustic model. Specify a custom language model that has been trained with verbatim transcriptions of the audio resources or that contains words that are relevant to the contents of the audio resources.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  trainAcousticModel(
    params: SpeechToTextV1.TrainAcousticModelParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      custom_language_model_id: _params.custom_language_model_id
    };
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}/train',
        method: 'POST',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * customAudioResources
   ************************/

  /**
   * Adds an audio resource to a custom acoustic model.
   *
   * Adds an audio resource to a custom acoustic model. Add audio content that reflects the acoustic characteristics of the audio that you plan to transcribe. You must use credentials for the instance of the service that owns a model to add an audio resource to it. Adding audio data does not affect the custom acoustic model until you train the model for the new data by using the `POST /v1/acoustic_customizations/{customization_id}/train` method.   You can add individual audio files or an archive file that contains multiple audio files. Adding multiple audio files via a single archive file is significantly more efficient than adding each file individually. * You can add an individual audio file in any format that the service supports for speech recognition. Use the `Content-Type` header to specify the format of the audio file. * You can add an archive file (**.zip** or **.tar.gz** file) that contains audio files in any format that the service supports for speech recognition. All audio files added with the same archive file must have the same audio format. Use the `Content-Type` header to specify the archive type, `application/zip` or `application/gzip`. Use the `Contained-Content-Type` header to specify the format of the contained audio files; the default format is `audio/wav`.   You can use this method to add any number of audio resources to a custom model by calling the method once for each audio or archive file. But the addition of one audio resource must be fully complete before you can add another. You must add a minimum of 10 minutes and a maximum of 50 hours of audio that includes speech, not just silence, to a custom acoustic model before you can train it. No audio resource, audio- or archive-type, can be larger than 100 MB.   The method is asynchronous. It can take several seconds to complete depending on the duration of the audio and, in the case of an archive file, the total number of audio files being processed. The service returns a 201 response code if the audio is valid. It then asynchronously analyzes the contents of the audio file or files and automatically extracts information about the audio such as its length, sampling rate, and encoding. You cannot submit requests to add additional audio resources to a custom acoustic model, or to train the model, until the service's analysis of all audio files for the current request completes.   To determine the status of the service's analysis of the audio, use the `GET /v1/acoustic_customizations/{customization_id}/audio/{audio_name}` method to poll the status of the audio. The method accepts the GUID of the custom model and the name of the audio resource, and it returns the status of the resource. Use a loop to check the status of the audio every few seconds until it becomes `ok`.   **Note:** The sampling rate of an audio file must match the sampling rate of the base model for the custom model: for broadband models, at least 16 kHz; for narrowband models, at least 8 kHz. If the sampling rate of the audio is higher than the minimum required rate, the service down-samples the audio to the appropriate rate. If the sampling rate of the audio is lower than the minimum required rate, the service labels the audio file as `invalid`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom acoustic model to which an audio resource is to be added. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.audio_name - The name of the audio resource that is to be added to the custom acoustic model. The name cannot contain spaces. Use a localized name that matches the language of the custom model.
   * @param {string} [params.contained_content_type] - For an archive-type resource that contains audio files whose format is not `audio/wav`, specifies the format of the audio files. The header accepts all of the audio formats supported for use with speech recognition and with the `Content-Type` header, including the `rate`, `channels`, and `endianness` parameters that are used with some formats. For a complete list of supported audio formats, see [Audio formats](/docs/services/speech-to-text/input.html#formats).
   * @param {boolean} [params.allow_overwrite] - Indicates whether the specified audio resource is to overwrite an existing resource with the same name. If a resource with the same name already exists, the request fails unless `allow_overwrite` is set to `true`; by default, the parameter is `false`. The parameter has no effect if a resource with the same name does not already exist.
   * @param {ByteArray[]} params.audio_resource - The audio resource that is to be added to the custom acoustic model, an individual audio file or an archive file.
   * @param {string} params.content_type - The type of the input: application/zip, application/gzip, audio/basic, audio/flac, audio/l16, audio/mp3, audio/mpeg, audio/mulaw, audio/ogg, audio/ogg;codecs=opus, audio/ogg;codecs=vorbis, audio/wav, audio/webm, audio/webm;codecs=opus, or audio/webm;codecs=vorbis.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  addAudio(
    params: SpeechToTextV1.AddAudioParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = [
      'customization_id',
      'audio_name',
      'audio_resource',
      'content_type'
    ];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = _params.audio_resource;
    const query = {
      allow_overwrite: _params.allow_overwrite
    };
    const path = {
      customization_id: _params.customization_id,
      audio_name: _params.audio_name
    };
    const parameters = {
      options: {
        url:
          '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
        method: 'POST',
        json: _params.content_type === 'application/json',
        body: body,
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Contained-Content-Type': _params.contained_content_type,
          'Content-Type': _params.content_type
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Deletes an audio resource from a custom acoustic model.
   *
   * Deletes an existing audio resource from a custom acoustic model. Deleting an archive-type audio resource removes the entire archive of files; the current interface does not allow deletion of individual files from an archive resource. Removing an audio resource does not affect the custom model until you train the model on its updated data by using the `POST /v1/acoustic_customizations/{customization_id}/train` method. You must use credentials for the instance of the service that owns a model to delete its audio resources.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom acoustic model from which an audio resource is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.audio_name - The name of the audio resource that is to be deleted from the custom acoustic model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteAudio(
    params: SpeechToTextV1.DeleteAudioParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'audio_name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id,
      audio_name: _params.audio_name
    };
    const parameters = {
      options: {
        url:
          '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists information about an audio resource for a custom acoustic model.
   *
   * Lists information about an audio resource from a custom acoustic model. The method returns an `AudioListing` object whose fields depend on the type of audio resource you specify with the method's `audio_name` parameter: * **For an audio-type resource,** the object's fields match those of an `AudioResource` object: `duration`, `name`, `details`, and `status`. * **For an archive-type resource,** the object includes a `container` field whose fields match those of an `AudioResource` object. It also includes an `audio` field, which contains an array of `AudioResource` objects that provides information about the audio files that are contained in the archive.   The information includes the status of the specified audio resource, which is important for checking the service's analysis of the resource in response to a request to add it to the custom model. You must use credentials for the instance of the service that owns a model to list its audio resources.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom acoustic model for which an audio resource is to be listed. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {string} params.audio_name - The name of the audio resource about which information is to be listed.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getAudio(
    params: SpeechToTextV1.GetAudioParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.AudioListing>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id', 'audio_name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id,
      audio_name: _params.audio_name
    };
    const parameters = {
      options: {
        url:
          '/v1/acoustic_customizations/{customization_id}/audio/{audio_name}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Lists information about all audio resources for a custom acoustic model.
   *
   * Lists information about all audio resources from a custom acoustic model. The information includes the name of the resource and information about its audio data, such as its duration. It also includes the status of the audio resource, which is important for checking the service's analysis of the resource in response to a request to add it to the custom acoustic model. You must use credentials for the instance of the service that owns a model to list its audio resources.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customization_id - The GUID of the custom acoustic model for which audio resources are to be listed. You must make the request with service credentials created for the instance of the service that owns the custom model.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listAudio(
    params: SpeechToTextV1.ListAudioParams,
    callback?: SpeechToTextV1.Callback<SpeechToTextV1.AudioResources>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['customization_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      customization_id: _params.customization_id
    };
    const parameters = {
      options: {
        url: '/v1/acoustic_customizations/{customization_id}/audio',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }
}

SpeechToTextV1.prototype.name = 'speech_to_text';
SpeechToTextV1.prototype.version = 'v1';

/*************************
 * interfaces
 ************************/

namespace SpeechToTextV1 {
  /** Options for the `SpeechToTextV1` constructor. **/
  export type Options = {
    url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  };

  /** The callback for a service request. **/
  export type Callback<T> = (
    error: any,
    body?: T,
    response?: RequestResponse
  ) => void;

  /** The body of a service request that returns no response data. **/
  export interface Empty {}

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getModel` operation. **/
  export interface GetModelParams {
    /** The identifier of the desired model in the form of its `name` from the output of `GET /v1/models`. **/
    model_id: GetModelConstants.ModelId | string;
  }

  /** Constants for the `getModel` operation. **/
  export namespace GetModelConstants {
    /** The identifier of the desired model in the form of its `name` from the output of `GET /v1/models`. **/
    export enum ModelId {
      AR_AR_BROADBANDMODEL = 'ar-AR_BroadbandModel',
      EN_GB_BROADBANDMODEL = 'en-GB_BroadbandModel',
      EN_GB_NARROWBANDMODEL = 'en-GB_NarrowbandModel',
      EN_US_BROADBANDMODEL = 'en-US_BroadbandModel',
      EN_US_NARROWBANDMODEL = 'en-US_NarrowbandModel',
      ES_ES_BROADBANDMODEL = 'es-ES_BroadbandModel',
      ES_ES_NARROWBANDMODEL = 'es-ES_NarrowbandModel',
      FR_FR_BROADBANDMODEL = 'fr-FR_BroadbandModel',
      JA_JP_BROADBANDMODEL = 'ja-JP_BroadbandModel',
      JA_JP_NARROWBANDMODEL = 'ja-JP_NarrowbandModel',
      PT_BR_BROADBANDMODEL = 'pt-BR_BroadbandModel',
      PT_BR_NARROWBANDMODEL = 'pt-BR_NarrowbandModel',
      ZH_CN_BROADBANDMODEL = 'zh-CN_BroadbandModel',
      ZH_CN_NARROWBANDMODEL = 'zh-CN_NarrowbandModel'
    }
  }

  /** Parameters for the `listModels` operation. **/
  export interface ListModelsParams {}

  /** Parameters for the `createSession` operation. **/
  export interface CreateSessionParams {
    /** The identifier of the model to be used by the new session. (Use `GET /v1/models` or `GET /v1/models/{model_id}` for information about available models.). **/
    model?: CreateSessionConstants.Model | string;
    /** The GUID of a custom language model that is to be used with the new session. The base model of the specified custom language model must match the model specified with the `model` parameter. You must make the request with service credentials created for the instance of the service that owns the custom model. By default, no custom language model is used. **/
    customization_id?: string;
    /** The GUID of a custom acoustic model that is to be used with the new session. The base model of the specified custom acoustic model must match the model specified with the `model` parameter. You must make the request with service credentials created for the instance of the service that owns the custom model. By default, no custom acoustic model is used. **/
    acoustic_customization_id?: string;
    /** If you specify a `customization_id` when you create the session, you can use the `customization_weight` parameter to tell the service how much weight to give to words from the custom language model compared to those from the base model for recognition requests made with the session.   Specify a value between 0.0 and 1.0. Unless a different customization weight was specified for the custom model when it was trained, the default value is 0.3. A customization weight that you specify overrides a weight that was specified when the custom model was trained.   The default value yields the best performance in general. Assign a higher value if your audio makes frequent use of OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy of phrases from the custom model's domain, but it can negatively affect performance on non-domain phrases. **/
    customization_weight?: number;
  }

  /** Constants for the `createSession` operation. **/
  export namespace CreateSessionConstants {
    /** The identifier of the model to be used by the new session. (Use `GET /v1/models` or `GET /v1/models/{model_id}` for information about available models.). **/
    export enum Model {
      AR_AR_BROADBANDMODEL = 'ar-AR_BroadbandModel',
      EN_GB_BROADBANDMODEL = 'en-GB_BroadbandModel',
      EN_GB_NARROWBANDMODEL = 'en-GB_NarrowbandModel',
      EN_US_BROADBANDMODEL = 'en-US_BroadbandModel',
      EN_US_NARROWBANDMODEL = 'en-US_NarrowbandModel',
      ES_ES_BROADBANDMODEL = 'es-ES_BroadbandModel',
      ES_ES_NARROWBANDMODEL = 'es-ES_NarrowbandModel',
      FR_FR_BROADBANDMODEL = 'fr-FR_BroadbandModel',
      JA_JP_BROADBANDMODEL = 'ja-JP_BroadbandModel',
      JA_JP_NARROWBANDMODEL = 'ja-JP_NarrowbandModel',
      PT_BR_BROADBANDMODEL = 'pt-BR_BroadbandModel',
      PT_BR_NARROWBANDMODEL = 'pt-BR_NarrowbandModel',
      ZH_CN_BROADBANDMODEL = 'zh-CN_BroadbandModel',
      ZH_CN_NARROWBANDMODEL = 'zh-CN_NarrowbandModel'
    }
  }

  /** Parameters for the `deleteSession` operation. **/
  export interface DeleteSessionParams {
    /** The ID of the session to be deleted. **/
    session_id: string;
  }

  /** Parameters for the `getSessionStatus` operation. **/
  export interface GetSessionStatusParams {
    /** The ID of the session for the recognition task. **/
    session_id: string;
  }

  /** Parameters for the `checkJob` operation. **/
  export interface CheckJobParams {
    /** The ID of the job whose status is to be checked. **/
    id: string;
  }

  /** Parameters for the `checkJobs` operation. **/
  export interface CheckJobsParams {}

  /** Parameters for the `createJob` operation. **/
  export interface CreateJobParams {
    /** A URL to which callback notifications are to be sent. The URL must already be successfully white-listed by using the `POST /v1/register_callback` method. Omit the parameter to poll the service for job completion and results. You can include the same callback URL with any number of job creation requests. Use the `user_token` query parameter to specify a unique user-specified string with each job to differentiate the callback notifications for the jobs. **/
    callback_url?: string;
    /** If the job includes a callback URL, a comma-separated list of notification events to which to subscribe. Valid events are: `recognitions.started` generates a callback notification when the service begins to process the job. `recognitions.completed` generates a callback notification when the job is complete; you must use the `GET /v1/recognitions/{id}` method to retrieve the results before they time out or are deleted. `recognitions.completed_with_results` generates a callback notification when the job is complete; the notification includes the results of the request. `recognitions.failed` generates a callback notification if the service experiences an error while processing the job. Omit the parameter to subscribe to the default events: `recognitions.started`, `recognitions.completed`, and `recognitions.failed`. The `recognitions.completed` and `recognitions.completed_with_results` events are incompatible; you can specify only of the two events. If the job does not include a callback URL, omit the parameter. **/
    events?: CreateJobConstants.Events | string;
    /** If the job includes a callback URL, a user-specified string that the service is to include with each callback notification for the job; the token allows the user to maintain an internal mapping between jobs and notification events. If the job does not include a callback URL, omit the parameter. **/
    user_token?: string;
    /** The number of minutes for which the results are to be available after the job has finished. If not delivered via a callback, the results must be retrieved within this time. Omit the parameter to use a time to live of one week. The parameter is valid with or without a callback URL. **/
    results_ttl?: number;
    /** Set to `chunked` to send the audio in streaming mode. The data does not need to exist fully before being streamed to the service. **/
    transfer_encoding?: CreateJobConstants.TransferEncoding | string;
    /** Audio to transcribe in the format specified by the `Content-Type` header. **/
    audio: Blob;
    /** The type of the input: audio/basic, audio/flac, audio/l16, audio/mp3, audio/mpeg, audio/mulaw, audio/ogg, audio/ogg;codecs=opus, audio/ogg;codecs=vorbis, audio/wav, audio/webm, audio/webm;codecs=opus, or audio/webm;codecs=vorbis. **/
    content_type: CreateJobConstants.ContentType | string;
    /** The identifier of the model to be used for the recognition request. (Use `GET /v1/models` for a list of available models.). **/
    model?: CreateJobConstants.Model | string;
    /** The GUID of a custom language model that is to be used with the request. The base model of the specified custom language model must match the model specified with the `model` parameter. You must make the request with service credentials created for the instance of the service that owns the custom model. By default, no custom language model is used. **/
    customization_id?: string;
    /** The GUID of a custom acoustic model that is to be used with the request. The base model of the specified custom acoustic model must match the model specified with the `model` parameter. You must make the request with service credentials created for the instance of the service that owns the custom model. By default, no custom acoustic model is used. **/
    acoustic_customization_id?: string;
    /** If you specify a `customization_id` with the request, you can use the `customization_weight` parameter to tell the service how much weight to give to words from the custom language model compared to those from the base model for speech recognition.   Specify a value between 0.0 and 1.0. Unless a different customization weight was specified for the custom model when it was trained, the default value is 0.3. A customization weight that you specify overrides a weight that was specified when the custom model was trained.   The default value yields the best performance in general. Assign a higher value if your audio makes frequent use of OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy of phrases from the custom model's domain, but it can negatively affect  performance on non-domain phrases. **/
    customization_weight?: number;
    /** The time in seconds after which, if only silence (no speech) is detected in submitted audio, the connection is closed with a 400 error. Useful for stopping audio submission from a live microphone when a user simply walks away. Use `-1` for infinity. **/
    inactivity_timeout?: number;
    /** Array of keyword strings to spot in the audio. Each keyword string can include one or more tokens. Keywords are spotted only in the final hypothesis, not in interim results. Omit the parameter or specify an empty array if you do not need to spot keywords. **/
    keywords?: string[];
    /** Confidence value that is the lower bound for spotting a keyword. A word is considered to match a keyword if its confidence is greater than or equal to the threshold. Specify a probability between 0 and 1 inclusive. No keyword spotting is performed if you omit the parameter. If you specify a threshold, you must also specify one or more keywords. **/
    keywords_threshold?: number;
    /** Maximum number of alternative transcripts to be returned. By default, a single transcription is returned. **/
    max_alternatives?: number;
    /** Confidence value that is the lower bound for identifying a hypothesis as a possible word alternative (also known as "Confusion Networks"). An alternative word is considered if its confidence is greater than or equal to the threshold. Specify a probability between 0 and 1 inclusive. No alternative words are computed if you omit the parameter. **/
    word_alternatives_threshold?: number;
    /** If `true`, confidence measure per word is returned. **/
    word_confidence?: boolean;
    /** If `true`, time alignment for each word is returned. **/
    timestamps?: boolean;
    /** If `true` (the default), filters profanity from all output except for keyword results by replacing inappropriate words with a series of asterisks. Set the parameter to `false` to return results with no censoring. Applies to US English transcription only. **/
    profanity_filter?: boolean;
    /** If `true`, converts dates, times, series of digits and numbers, phone numbers, currency values, and Internet addresses into more readable, conventional representations in the final transcript of a recognition request. If `false` (the default), no formatting is performed. Applies to US English transcription only. **/
    smart_formatting?: boolean;
    /** Indicates whether labels that identify which words were spoken by which participants in a multi-person exchange are to be included in the response. The default is `false`; no speaker labels are returned. Setting `speaker_labels` to `true` forces the `timestamps` parameter to be `true`, regardless of whether you specify `false` for the parameter.   To determine whether a language model supports speaker labels, use the `GET /v1/models` method and check that the attribute `speaker_labels` is set to `true`. You can also refer to [Speaker labels](https://console.bluemix.net/docs/services/speech-to-text/output.html#speaker_labels). **/
    speaker_labels?: boolean;
  }

  /** Constants for the `createJob` operation. **/
  export namespace CreateJobConstants {
    /** If the job includes a callback URL, a comma-separated list of notification events to which to subscribe. Valid events are: `recognitions.started` generates a callback notification when the service begins to process the job. `recognitions.completed` generates a callback notification when the job is complete; you must use the `GET /v1/recognitions/{id}` method to retrieve the results before they time out or are deleted. `recognitions.completed_with_results` generates a callback notification when the job is complete; the notification includes the results of the request. `recognitions.failed` generates a callback notification if the service experiences an error while processing the job. Omit the parameter to subscribe to the default events: `recognitions.started`, `recognitions.completed`, and `recognitions.failed`. The `recognitions.completed` and `recognitions.completed_with_results` events are incompatible; you can specify only of the two events. If the job does not include a callback URL, omit the parameter. **/
    export enum Events {
      STARTED = 'recognitions.started',
      COMPLETED = 'recognitions.completed',
      COMPLETED_WITH_RESULTS = 'recognitions.completed_with_results',
      FAILED = 'recognitions.failed'
    }
    /** Set to `chunked` to send the audio in streaming mode. The data does not need to exist fully before being streamed to the service. **/
    export enum TransferEncoding {
      CHUNKED = 'chunked'
    }
    /** The type of the input: audio/basic, audio/flac, audio/l16, audio/mp3, audio/mpeg, audio/mulaw, audio/ogg, audio/ogg;codecs=opus, audio/ogg;codecs=vorbis, audio/wav, audio/webm, audio/webm;codecs=opus, or audio/webm;codecs=vorbis. **/
    export enum ContentType {
      BASIC = 'audio/basic',
      FLAC = 'audio/flac',
      L16 = 'audio/l16',
      MP3 = 'audio/mp3',
      MPEG = 'audio/mpeg',
      MULAW = 'audio/mulaw',
      OGG = 'audio/ogg',
      OGG_CODECS_OPUS = 'audio/ogg;codecs=opus',
      OGG_CODECS_VORBIS = 'audio/ogg;codecs=vorbis',
      WAV = 'audio/wav',
      WEBM = 'audio/webm',
      WEBM_CODECS_OPUS = 'audio/webm;codecs=opus',
      WEBM_CODECS_VORBIS = 'audio/webm;codecs=vorbis'
    }
    /** The identifier of the model to be used for the recognition request. (Use `GET /v1/models` for a list of available models.). **/
    export enum Model {
      AR_AR_BROADBANDMODEL = 'ar-AR_BroadbandModel',
      EN_GB_BROADBANDMODEL = 'en-GB_BroadbandModel',
      EN_GB_NARROWBANDMODEL = 'en-GB_NarrowbandModel',
      EN_US_BROADBANDMODEL = 'en-US_BroadbandModel',
      EN_US_NARROWBANDMODEL = 'en-US_NarrowbandModel',
      ES_ES_BROADBANDMODEL = 'es-ES_BroadbandModel',
      ES_ES_NARROWBANDMODEL = 'es-ES_NarrowbandModel',
      FR_FR_BROADBANDMODEL = 'fr-FR_BroadbandModel',
      JA_JP_BROADBANDMODEL = 'ja-JP_BroadbandModel',
      JA_JP_NARROWBANDMODEL = 'ja-JP_NarrowbandModel',
      PT_BR_BROADBANDMODEL = 'pt-BR_BroadbandModel',
      PT_BR_NARROWBANDMODEL = 'pt-BR_NarrowbandModel',
      ZH_CN_BROADBANDMODEL = 'zh-CN_BroadbandModel',
      ZH_CN_NARROWBANDMODEL = 'zh-CN_NarrowbandModel'
    }
  }

  /** Parameters for the `deleteJob` operation. **/
  export interface DeleteJobParams {
    /** The ID of the job that is to be deleted. **/
    id: string;
  }

  /** Parameters for the `registerCallback` operation. **/
  export interface RegisterCallbackParams {
    /** An HTTP or HTTPS URL to which callback notifications are to be sent. To be white-listed, the URL must successfully echo the challenge string during URL verification. During verification, the client can also check the signature that the service sends in the `X-Callback-Signature` header to verify the origin of the request. **/
    callback_url: string;
    /** A user-specified string that the service uses to generate the HMAC-SHA1 signature that it sends via the `X-Callback-Signature` header. The service includes the header during URL verification and with every notification sent to the callback URL. It calculates the signature over the payload of the notification. If you omit the parameter, the service does not send the header. **/
    user_secret?: string;
  }

  /** Parameters for the `unregisterCallback` operation. **/
  export interface UnregisterCallbackParams {
    /** The callback URL that is to be unregistered. **/
    callback_url: string;
  }

  /** Parameters for the `createLanguageModel` operation. **/
  export interface CreateLanguageModelParams {
    /** The type of the input. **/
    content_type: CreateLanguageModelConstants.ContentType | string;
    /** A user-defined name for the new custom language model. Use a name that is unique among all custom language models that you own. Use a localized name that matches the language of the custom model. Use a name that describes the domain of the custom model, such as `Medical custom model` or `Legal custom model`. **/
    name: string;
    /** The name of the base language model that is to be customized by the new custom language model. The new custom model can be used only with the base model that it customizes. To determine whether a base model supports language model customization, request information about the base model and check that the attribute `custom_language_model` is set to `true`, or refer to [Language support for customization](https://console.bluemix.net/docs/services/speech-to-text/custom.html#languageSupport). **/
    base_model_name: string;
    /** The dialect of the specified language that is to be used with the custom language model. The parameter is meaningful only for Spanish models, for which the service creates a custom language model that is suited for speech in one of the following dialects: * `es-ES` for Castilian Spanish (the default) * `es-LA` for Latin American Spanish * `es-US` for North American (Mexican) Spanish   A specified dialect must be valid for the base model. By default, the dialect matches the language of the base model; for example, `en-US` for either of the US English language models. **/
    dialect?: string;
    /** A description of the new custom language model. Use a localized description that matches the language of the custom model. **/
    description?: string;
  }

  /** Constants for the `createLanguageModel` operation. **/
  export namespace CreateLanguageModelConstants {
    /** The type of the input. **/
    export enum ContentType {
      JSON = 'application/json'
    }
  }

  /** Parameters for the `deleteLanguageModel` operation. **/
  export interface DeleteLanguageModelParams {
    /** The GUID of the custom language model that is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `getLanguageModel` operation. **/
  export interface GetLanguageModelParams {
    /** The GUID of the custom language model for which information is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `listLanguageModels` operation. **/
  export interface ListLanguageModelsParams {
    /** The identifier of the language for which custom language models are to be returned (for example, `en-US`). Omit the parameter to see all custom language models owned by the requesting service credentials. **/
    language?: string;
  }

  /** Parameters for the `resetLanguageModel` operation. **/
  export interface ResetLanguageModelParams {
    /** The GUID of the custom language model that is to be reset. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `trainLanguageModel` operation. **/
  export interface TrainLanguageModelParams {
    /** The GUID of the custom language model that is to be trained. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The type of words from the custom language model's words resource on which to train the model: * `all` (the default) trains the model on all new words, regardless of whether they were extracted from corpora or were added or modified by the user. * `user` trains the model only on new words that were added or modified by the user; the model is not trained on new words extracted from corpora. **/
    word_type_to_add?: TrainLanguageModelConstants.WordTypeToAdd | string;
    /** Specifies a customization weight for the custom language model. The customization weight tells the service how much weight to give to words from the custom language model compared to those from the base model for speech recognition. Specify a value between 0.0 and 1.0. The default value is 0.3.   The default value yields the best performance in general. Assign a higher value if your audio makes frequent use of OOV words from the custom model. Use caution when setting the weight: a higher value can improve the accuracy of phrases from the custom model's domain, but it can negatively affect performance on non-domain phrases.   The value that you assign is used for all recognition requests that use the model. You can override it for any recognition request by specifying a customization weight for that request. **/
    customization_weight?: number;
  }

  /** Constants for the `trainLanguageModel` operation. **/
  export namespace TrainLanguageModelConstants {
    /** The type of words from the custom language model's words resource on which to train the model: * `all` (the default) trains the model on all new words, regardless of whether they were extracted from corpora or were added or modified by the user. * `user` trains the model only on new words that were added or modified by the user; the model is not trained on new words extracted from corpora. **/
    export enum WordTypeToAdd {
      ALL = 'all',
      USER = 'user'
    }
  }

  /** Parameters for the `upgradeLanguageModel` operation. **/
  export interface UpgradeLanguageModelParams {
    /** The GUID of the custom language model that is to be upgraded. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `addCorpus` operation. **/
  export interface AddCorpusParams {
    /** The GUID of the custom language model to which a corpus is to be added. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The name of the corpus that is to be added to the custom language model. The name cannot contain spaces and cannot be the string `user`, which is reserved by the service to denote custom words added or modified by the user. Use a localized name that matches the language of the custom model. **/
    corpus_name: string;
    /** Indicates whether the specified corpus is to overwrite an existing corpus with the same name. If a corpus with the same name already exists, the request fails unless `allow_overwrite` is set to `true`; by default, the parameter is `false`. The parameter has no effect if a corpus with the same name does not already exist. **/
    allow_overwrite?: boolean;
    /** A plain text file that contains the training data for the corpus. Encode the file in UTF-8 if it contains non-ASCII characters; the service assumes UTF-8 encoding if it encounters non-ASCII characters. With cURL, use the `--data-binary` option to upload the file for the request. **/
    corpus_file: ReadableStream | FileObject | Buffer;
    /** The content type of corpus_file. **/
    corpus_file_content_type?: string;
  }

  /** Parameters for the `deleteCorpus` operation. **/
  export interface DeleteCorpusParams {
    /** The GUID of the custom language model from which a corpus is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The name of the corpus that is to be deleted from the custom language model. **/
    corpus_name: string;
  }

  /** Parameters for the `getCorpus` operation. **/
  export interface GetCorpusParams {
    /** The GUID of the custom language model for which a corpus is to be listed. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The name of the corpus about which information is to be listed. **/
    corpus_name: string;
  }

  /** Parameters for the `listCorpora` operation. **/
  export interface ListCorporaParams {
    /** The GUID of the custom language model for which corpora are to be listed. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `addWord` operation. **/
  export interface AddWordParams {
    /** The GUID of the custom language model to which a word is to be added. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The custom word that is to be added to or updated in the custom model. Do not include spaces in the word. Use a - (dash) or _ (underscore) to connect the tokens of compound words. **/
    word_name: string;
    /** The type of the input. **/
    content_type: AddWordConstants.ContentType | string;
    /** **When specifying an array of one or more words,** you must specify the custom word that is to be added to or updated in the custom model. Do not include spaces in the word. Use a - (dash) or _ (underscore) to connect the tokens of compound words. **When adding or updating a single word directly,** omit this field. **/
    word?: string;
    /** An array of sounds-like pronunciations for the custom word. Specify how words that are difficult to pronounce, foreign words, acronyms, and so on can be pronounced by users. For a word that is not in the service's base vocabulary, omit the parameter to have the service automatically generate a sounds-like pronunciation for the word. For a word that is in the service's base vocabulary, use the parameter to specify additional pronunciations for the word. You cannot override the default pronunciation of a word; pronunciations you add augment the pronunciation from the base vocabulary. A word can have at most five sounds-like pronunciations, and a pronunciation can include at most 40 characters not including spaces. **/
    sounds_like?: string[];
    /** An alternative spelling for the custom word when it appears in a transcript. Use the parameter when you want the word to have a spelling that is different from its usual representation or from its spelling in corpora training data. **/
    display_as?: string;
  }

  /** Constants for the `addWord` operation. **/
  export namespace AddWordConstants {
    /** The type of the input. **/
    export enum ContentType {
      JSON = 'application/json'
    }
  }

  /** Parameters for the `addWords` operation. **/
  export interface AddWordsParams {
    /** The GUID of the custom language model to which words are to be added. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The type of the input. **/
    content_type: AddWordsConstants.ContentType | string;
    /** An array of objects that provides information about each custom word that is to be added to or updated in the custom language model. **/
    words: CustomWord[];
  }

  /** Constants for the `addWords` operation. **/
  export namespace AddWordsConstants {
    /** The type of the input. **/
    export enum ContentType {
      JSON = 'application/json'
    }
  }

  /** Parameters for the `deleteWord` operation. **/
  export interface DeleteWordParams {
    /** The GUID of the custom language model from which a word is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The custom word that is to be deleted from the custom language model. **/
    word_name: string;
  }

  /** Parameters for the `getWord` operation. **/
  export interface GetWordParams {
    /** The GUID of the custom language model from which a word is to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The custom word that is to be queried from the custom language model. **/
    word_name: string;
  }

  /** Parameters for the `listWords` operation. **/
  export interface ListWordsParams {
    /** The GUID of the custom language model from which words are to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The type of words to be listed from the custom language model's words resource: * `all` (the default) shows all words. * `user` shows only custom words that were added or modified by the user. * `corpora` shows only OOV that were extracted from corpora. **/
    word_type?: ListWordsConstants.WordType | string;
    /** Indicates the order in which the words are to be listed, `alphabetical` or by `count`. You can prepend an optional `+` or `-` to an argument to indicate whether the results are to be sorted in ascending or descending order. By default, words are sorted in ascending alphabetical order. For alphabetical ordering, the lexicographical precedence is numeric values, uppercase letters, and lowercase letters. For count ordering, values with the same count are not ordered. With cURL, URL encode the `+` symbol as `%2B`. **/
    sort?: ListWordsConstants.Sort | string;
  }

  /** Constants for the `listWords` operation. **/
  export namespace ListWordsConstants {
    /** The type of words to be listed from the custom language model's words resource: * `all` (the default) shows all words. * `user` shows only custom words that were added or modified by the user. * `corpora` shows only OOV that were extracted from corpora. **/
    export enum WordType {
      ALL = 'all',
      USER = 'user',
      CORPORA = 'corpora'
    }
    /** Indicates the order in which the words are to be listed, `alphabetical` or by `count`. You can prepend an optional `+` or `-` to an argument to indicate whether the results are to be sorted in ascending or descending order. By default, words are sorted in ascending alphabetical order. For alphabetical ordering, the lexicographical precedence is numeric values, uppercase letters, and lowercase letters. For count ordering, values with the same count are not ordered. With cURL, URL encode the `+` symbol as `%2B`. **/
    export enum Sort {
      ALPHABETICAL = 'alphabetical',
      COUNT = 'count'
    }
  }

  /** Parameters for the `createAcousticModel` operation. **/
  export interface CreateAcousticModelParams {
    /** The type of the input. **/
    content_type: CreateAcousticModelConstants.ContentType | string;
    /** A user-defined name for the new custom acoustic model. Use a name that is unique among all custom acoustic models that you own. Use a localized name that matches the language of the custom model. Use a name that describes the acoustic environment of the custom model, such as `Mobile custom model` or `Noisy car custom model`. **/
    name: string;
    /** The name of the base language model that is to be customized by the new custom acoustic model. The new custom model can be used only with the base model that it customizes. To determine whether a base model supports acoustic model customization, refer to [Language support for customization](https://console.bluemix.net/docs/services/speech-to-text/custom.html#languageSupport). **/
    base_model_name: string;
    /** A description of the new custom acoustic model. Use a localized description that matches the language of the custom model. **/
    description?: string;
  }

  /** Constants for the `createAcousticModel` operation. **/
  export namespace CreateAcousticModelConstants {
    /** The type of the input. **/
    export enum ContentType {
      JSON = 'application/json'
    }
  }

  /** Parameters for the `deleteAcousticModel` operation. **/
  export interface DeleteAcousticModelParams {
    /** The GUID of the custom acoustic model that is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `getAcousticModel` operation. **/
  export interface GetAcousticModelParams {
    /** The GUID of the custom acoustic model for which information is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `listAcousticModels` operation. **/
  export interface ListAcousticModelsParams {
    /** The identifier of the language for which custom acoustic models are to be returned (for example, `en-US`). Omit the parameter to see all custom acoustic models owned by the requesting service credentials. **/
    language?: string;
  }

  /** Parameters for the `resetAcousticModel` operation. **/
  export interface ResetAcousticModelParams {
    /** The GUID of the custom acoustic model that is to be reset. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /** Parameters for the `trainAcousticModel` operation. **/
  export interface TrainAcousticModelParams {
    /** The GUID of the custom acoustic model that is to be trained. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The GUID of a custom language model that is to be used during training of the custom acoustic model. Specify a custom language model that has been trained with verbatim transcriptions of the audio resources or that contains words that are relevant to the contents of the audio resources. **/
    custom_language_model_id?: string;
  }

  /** Parameters for the `addAudio` operation. **/
  export interface AddAudioParams {
    /** The GUID of the custom acoustic model to which an audio resource is to be added. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The name of the audio resource that is to be added to the custom acoustic model. The name cannot contain spaces. Use a localized name that matches the language of the custom model. **/
    audio_name: string;
    /** For an archive-type resource that contains audio files whose format is not `audio/wav`, specifies the format of the audio files. The header accepts all of the audio formats supported for use with speech recognition and with the `Content-Type` header, including the `rate`, `channels`, and `endianness` parameters that are used with some formats. For a complete list of supported audio formats, see [Audio formats](/docs/services/speech-to-text/input.html#formats). **/
    contained_content_type?: AddAudioConstants.ContainedContentType | string;
    /** Indicates whether the specified audio resource is to overwrite an existing resource with the same name. If a resource with the same name already exists, the request fails unless `allow_overwrite` is set to `true`; by default, the parameter is `false`. The parameter has no effect if a resource with the same name does not already exist. **/
    allow_overwrite?: boolean;
    /** The audio resource that is to be added to the custom acoustic model, an individual audio file or an archive file. **/
    audio_resource: Buffer[];
    /** The type of the input: application/zip, application/gzip, audio/basic, audio/flac, audio/l16, audio/mp3, audio/mpeg, audio/mulaw, audio/ogg, audio/ogg;codecs=opus, audio/ogg;codecs=vorbis, audio/wav, audio/webm, audio/webm;codecs=opus, or audio/webm;codecs=vorbis. **/
    content_type: AddAudioConstants.ContentType | string;
  }

  /** Constants for the `addAudio` operation. **/
  export namespace AddAudioConstants {
    /** For an archive-type resource that contains audio files whose format is not `audio/wav`, specifies the format of the audio files. The header accepts all of the audio formats supported for use with speech recognition and with the `Content-Type` header, including the `rate`, `channels`, and `endianness` parameters that are used with some formats. For a complete list of supported audio formats, see [Audio formats](/docs/services/speech-to-text/input.html#formats). **/
    export enum ContainedContentType {
      BASIC = 'audio/basic',
      FLAC = 'audio/flac',
      L16 = 'audio/l16',
      MP3 = 'audio/mp3',
      MPEG = 'audio/mpeg',
      MULAW = 'audio/mulaw',
      OGG = 'audio/ogg',
      OGG_CODECS_OPUS = 'audio/ogg;codecs=opus',
      OGG_CODECS_VORBIS = 'audio/ogg;codecs=vorbis',
      WAV = 'audio/wav',
      WEBM = 'audio/webm',
      WEBM_CODECS_OPUS = 'audio/webm;codecs=opus',
      WEBM_CODECS_VORBIS = 'audio/webm;codecs=vorbis'
    }
    /** The type of the input: application/zip, application/gzip, audio/basic, audio/flac, audio/l16, audio/mp3, audio/mpeg, audio/mulaw, audio/ogg, audio/ogg;codecs=opus, audio/ogg;codecs=vorbis, audio/wav, audio/webm, audio/webm;codecs=opus, or audio/webm;codecs=vorbis. **/
    export enum ContentType {
      APPLICATION_ZIP = 'application/zip',
      APPLICATION_GZIP = 'application/gzip',
      AUDIO_BASIC = 'audio/basic',
      AUDIO_FLAC = 'audio/flac',
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
      AUDIO_WEBM_CODECS_VORBIS = 'audio/webm;codecs=vorbis'
    }
  }

  /** Parameters for the `deleteAudio` operation. **/
  export interface DeleteAudioParams {
    /** The GUID of the custom acoustic model from which an audio resource is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The name of the audio resource that is to be deleted from the custom acoustic model. **/
    audio_name: string;
  }

  /** Parameters for the `getAudio` operation. **/
  export interface GetAudioParams {
    /** The GUID of the custom acoustic model for which an audio resource is to be listed. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
    /** The name of the audio resource about which information is to be listed. **/
    audio_name: string;
  }

  /** Parameters for the `listAudio` operation. **/
  export interface ListAudioParams {
    /** The GUID of the custom acoustic model for which audio resources are to be listed. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
    customization_id: string;
  }

  /*************************
   * model interfaces
   ************************/

  /** AcousticModel. **/
  export interface AcousticModel {
    /** The customization ID (GUID) of the custom acoustic model. **Note:** When you create a new custom acoustic model, the service returns only the GUID of the new model; it does not return the other fields of this object. **/
    customization_id: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom acoustic model was created. The value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`). **/
    created?: string;
    /** The language identifier of the custom acoustic model (for example, `en-US`). **/
    language?: string;
    /** The GUID of the service credentials for the instance of the service that owns the custom acoustic model. **/
    owner?: string;
    /** The name of the custom acoustic model. **/
    name?: string;
    /** The description of the custom acoustic model. **/
    description?: string;
    /** The name of the language model for which the custom acoustic model was created. **/
    base_model_name?: string;
    /** The current status of the custom acoustic model: * `pending` indicates that the model was created but is waiting either for training data to be added or for the service to finish analyzing added data. * `ready` indicates that the model contains data and is ready to be trained. * `training` indicates that the model is currently being trained. * `available` indicates that the model is trained and ready to use. * `failed` indicates that training of the model failed. **/
    status?: string;
    /** A percentage that indicates the progress of the custom acoustic model's current training. A value of `100` means that the model is fully trained. **Note:** The `progress` field does not currently reflect the progress of the training; the field changes from `0` to `100` when training is complete. **/
    progress?: number;
    /** If the request included unknown query parameters, the following message: `Unexpected query parameter(s) ['parameters'] detected`, where `parameters` is a list that includes a quoted string for each unknown parameter. **/
    warnings?: string;
  }

  /** AcousticModels. **/
  export interface AcousticModels {
    /** An array of objects that provides information about each available custom acoustic model. The array is empty if the requesting service credentials own no custom acoustic models (if no language is specified) or own no custom acoustic models for the specified language. **/
    customizations: AcousticModel[];
  }

  /** AudioDetails. **/
  export interface AudioDetails {
    /** The type of the audio resource: * `audio` for an individual audio file * `archive` for an archive (**.zip** or **.tar.gz**) file that contains audio files. **/
    type: string;
    /** **For an audio-type resource,** the codec in which the audio is encoded. Omitted for an archive-type resource. **/
    codec?: string;
    /** **For an audio-type resource,** the sampling rate of the audio in Hertz (samples per second). Omitted for an archive-type resource. **/
    frequency?: number;
    /** **For an archive-type resource,** the format of the compressed archive: * `zip` for a **.zip** file * `gzip` for a **.tar.gz** file   Omitted for an audio-type resource. **/
    compression?: string;
  }

  /** AudioListing. **/
  export interface AudioListing {
    /** **For an audio-type resource,**  the total seconds of audio in the resource. Omitted for an archive-type resource. **/
    duration?: number;
    /** **For an audio-type resource,** the name of the resource. Omitted for an archive-type resource. **/
    name?: string;
    /** **For an audio-type resource,** an `AudioDetails` object that provides detailed information about the resource. The object is empty until the service finishes processing the audio. Omitted for an archive-type resource. **/
    details?: AudioDetails;
    /** **For an audio-type resource,** the status of the resource: * `ok` indicates that the service has successfully analyzed the audio data. The data can be used to train the custom model. * `being_processed` indicates that the service is still analyzing the audio data. The service cannot accept requests to add new audio resources or to train the custom model until its analysis is complete. * `invalid` indicates that the audio data is not valid for training the custom model (possibly because it has the wrong format or sampling rate, or because it is corrupted).   Omitted for an archive-type resource. **/
    status?: string;
    /** **For an archive-type resource,** an object of type `AudioResource` that provides information about the resource. Omitted for an audio-type resource. **/
    container?: AudioResource;
    /** **For an archive-type resource,** an array of `AudioResource` objects that provides information about the audio-type resources that are contained in the resource. Omitted for an audio-type resource. **/
    audio?: AudioResource[];
  }

  /** AudioResource. **/
  export interface AudioResource {
    /** The total seconds of audio in the audio resource. **/
    duration: number;
    /** The name of the audio resource. **/
    name: string;
    /** An `AudioDetails` object that provides detailed information about the audio resource. The object is empty until the service finishes processing the audio. **/
    details: AudioDetails;
    /** The status of the audio resource: * `ok` indicates that the service has successfully analyzed the audio data. The data can be used to train the custom model. * `being_processed` indicates that the service is still analyzing the audio data. The service cannot accept requests to add new audio resources or to train the custom model until its analysis is complete. * `invalid` indicates that the audio data is not valid for training the custom model (possibly because it has the wrong format or sampling rate, or because it is corrupted). For an archive file, the entire archive is invalid if any of its audio files are invalid. **/
    status: string;
  }

  /** AudioResources. **/
  export interface AudioResources {
    /** The total minutes of accumulated audio summed over all of the valid audio resources for the custom acoustic model. You can use this value to determine whether the custom model has too little or too much audio to begin training. **/
    total_minutes_of_audio: number;
    /** An array of `AudioResource` objects that provides information about the audio resources of the custom acoustic model. The array is empty if the custom model has no audio resources. **/
    audio: AudioResource[];
  }

  /** Corpora. **/
  export interface Corpora {
    /** Information about corpora of the custom model. The array is empty if the custom model has no corpora. **/
    corpora: Corpus[];
  }

  /** Corpus. **/
  export interface Corpus {
    /** The name of the corpus. **/
    name: string;
    /** The total number of words in the corpus. The value is `0` while the corpus is being processed. **/
    total_words: number;
    /** The number of OOV words in the corpus. The value is `0` while the corpus is being processed. **/
    out_of_vocabulary_words: number;
    /** The status of the corpus: * `analyzed` indicates that the service has successfully analyzed the corpus; the custom model can be trained with data from the corpus. * `being_processed` indicates that the service is still analyzing the corpus; the service cannot accept requests to add new corpora or words, or to train the custom model. * `undetermined` indicates that the service encountered an error while processing the corpus. **/
    status: string;
    /** If the status of the corpus is `undetermined`, the following message: `Analysis of corpus 'name' failed. Please try adding the corpus again by setting the 'allow_overwrite' flag to 'true'`. **/
    error?: string;
  }

  /** CustomWord. **/
  export interface CustomWord {
    /** **When specifying an array of one or more words,** you must specify the custom word that is to be added to or updated in the custom model. Do not include spaces in the word. Use a - (dash) or _ (underscore) to connect the tokens of compound words. **When adding or updating a single word directly,** omit this field. **/
    word?: string;
    /** An array of sounds-like pronunciations for the custom word. Specify how words that are difficult to pronounce, foreign words, acronyms, and so on can be pronounced by users. For a word that is not in the service's base vocabulary, omit the parameter to have the service automatically generate a sounds-like pronunciation for the word. For a word that is in the service's base vocabulary, use the parameter to specify additional pronunciations for the word. You cannot override the default pronunciation of a word; pronunciations you add augment the pronunciation from the base vocabulary. A word can have at most five sounds-like pronunciations, and a pronunciation can include at most 40 characters not including spaces. **/
    sounds_like?: string[];
    /** An alternative spelling for the custom word when it appears in a transcript. Use the parameter when you want the word to have a spelling that is different from its usual representation or from its spelling in corpora training data. **/
    display_as?: string;
  }

  /** KeywordResult. **/
  export interface KeywordResult {
    /** A specified keyword normalized to the spoken phrase that matched in the audio input. **/
    normalized_text: string;
    /** The start time in seconds of the keyword match. **/
    start_time: number;
    /** The end time in seconds of the keyword match. **/
    end_time: number;
    /** A confidence score for the keyword match in the range of 0 to 1. **/
    confidence: number;
  }

  /** KeywordResults. **/
  export interface KeywordResults {
    /** A list of each keyword entered via the `keywords` parameter and, for each keyword, an array of `KeywordResult` objects that provides information about its occurrences in the input audio. The keys of the list are the actual keyword strings. A keyword for which no matches are spotted in the input is omitted from the array. **/
    keyword: KeywordResult[];
  }

  /** LanguageModel. **/
  export interface LanguageModel {
    /** The customization ID (GUID) of the custom language model. **Note:** When you create a new custom language model, the service returns only the GUID of the new model; it does not return the other fields of this object. **/
    customization_id: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom language model was created. The value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`). **/
    created?: string;
    /** The language identifier of the custom language model (for example, `en-US`). **/
    language?: string;
    /** The dialect of the language for the custom language model. By default, the dialect matches the language of the base model; for example, `en-US` for either of the US English language models. For Spanish models, the field indicates the dialect for which the model was created: * `es-ES` for Castilian Spanish (the default) * `es-LA` for Latin American Spanish * `es-US` for North American (Mexican) Spanish. **/
    dialect?: string;
    /** The GUID of the service credentials for the instance of the service that owns the custom language model. **/
    owner?: string;
    /** The name of the custom language model. **/
    name?: string;
    /** The description of the custom language model. **/
    description?: string;
    /** The name of the language model for which the custom language model was created. **/
    base_model_name?: string;
    /** The current status of the custom language model: * `pending` indicates that the model was created but is waiting either for training data to be added or for the service to finish analyzing added data. * `ready` indicates that the model contains data and is ready to be trained. * `training` indicates that the model is currently being trained. * `available` indicates that the model is trained and ready to use. * `failed` indicates that training of the model failed. **/
    status?: string;
    /** A percentage that indicates the progress of the custom language model's current training. A value of `100` means that the model is fully trained. **Note:** The `progress` field does not currently reflect the progress of the training; the field changes from `0` to `100` when training is complete. **/
    progress?: number;
    /** If the request included unknown query parameters, the following message: `Unexpected query parameter(s) ['parameters'] detected`, where `parameters` is a list that includes a quoted string for each unknown parameter. **/
    warnings?: string;
  }

  /** LanguageModels. **/
  export interface LanguageModels {
    /** An array of objects that provides information about each available custom language model. The array is empty if the requesting service credentials own no custom language models (if no language is specified) or own no custom language models for the specified language. **/
    customizations: LanguageModel[];
  }

  /** RecognitionJob. **/
  export interface RecognitionJob {
    /** The ID of the job. **/
    id: string;
    /** The current status of the job: * `waiting`: The service is preparing the job for processing. The service returns this status when the job is initially created or when it is waiting for capacity to process the job. The job remains in this state until the service has the capacity to begin processing it. * `processing`: The service is actively processing the job. * `completed`: The service has finished processing the job. If the job specified a callback URL and the event `recognitions.completed_with_results`, the service sent the results with the callback notification; otherwise, you must retrieve the results by checking the individual job. * `failed`: The job failed. **/
    status: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the job was created. The value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`). **/
    created: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the job was last updated by the service. The value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`). **Note:** This field is returned only when you list information about a specific or all existing jobs. **/
    updated?: string;
    /** The URL to use to request information about the job with the `GET /v1/recognitions/{id}` method. **Note:** This field is returned only when you create a new job. **/
    url?: string;
    /** The user token associated with a job that was created with a callback URL and a user token. **Note:** This field can be returned only when you list information about all existing jobs. **/
    user_token?: string;
    /** If the status is `completed`, the results of the recognition request as an array that includes a single instance of a `SpeechRecognitionResults` object. **Note:** This field can be returned only when you list information about a specific existing job. **/
    results?: SpeechRecognitionResults[];
    /** An array of warning messages about invalid query parameters included with the request. Each warning includes a descriptive message and a list of invalid argument strings, for example, `"unexpected query parameter 'user_token', query parameter 'callback_url' was not specified"`. The request succeeds despite the warnings. **Note:** This field can be returned only when you create a new job. **/
    warnings?: string[];
  }

  /** RecognitionJobs. **/
  export interface RecognitionJobs {
    /** An array of objects that provides the status for each of the user's current jobs. The array is empty if the user has no current jobs. **/
    recognitions: RecognitionJob[];
  }

  /** RegisterStatus. **/
  export interface RegisterStatus {
    /** The current status of the job: * `created` if the callback URL was successfully white-listed as a result of the call. * `already created` if the URL was already white-listed. **/
    status: string;
    /** The callback URL that is successfully registered. **/
    url: string;
  }

  /** SessionStatus. **/
  export interface SessionStatus {
    /** Information about the specified existing session. **/
    session: SpeechSession;
  }

  /** SpeakerLabelsResult. **/
  export interface SpeakerLabelsResult {
    /** The start time of a word from the transcript. The value matches the start time of a word from the `timestamps` array. **/
    from: number;
    /** The end time of a word from the transcript. The value matches the end time of a word from the `timestamps` array. **/
    to: number;
    /** The numeric identifier that the service assigns to a speaker from the audio. Speaker IDs begin at `0` initially but can evolve and change across interim results (if supported by the method) and between interim and final results as the service processes the audio. They are not guaranteed to be sequential, contiguous, or ordered. **/
    speaker: number;
    /** A score that indicates the service's confidence in its identification of the speaker in the range of 0 to 1. **/
    confidence: number;
    /** An indication of whether the service might further change word and speaker-label results. A value of `true` means that the service guarantees not to send any further updates for the current or any preceding results; `false` means that the service might send further updates to the results. **/
    final: boolean;
  }

  /** SpeechModel. **/
  export interface SpeechModel {
    /** The name of the model for use as an identifier in calls to the service (for example, `en-US_BroadbandModel`). **/
    name: string;
    /** The language identifier for the model (for example, `en-US`). **/
    language: string;
    /** The sampling rate (minimum acceptable rate for audio) used by the model in Hertz. **/
    rate: number;
    /** The URI for the model. **/
    url: string;
    /** Describes the additional service features supported with the model. **/
    supported_features: SupportedFeatures;
    /** Brief description of the model. **/
    description: string;
    /** The URI for the model for use with the `POST /v1/sessions` method. (Returned only for requests for a single model with the `GET /v1/models/{model_id}` method.). **/
    sessions?: string;
  }

  /** SpeechModels. **/
  export interface SpeechModels {
    /** Information about each available model. **/
    models: SpeechModel[];
  }

  /** SpeechRecognitionAlternative. **/
  export interface SpeechRecognitionAlternative {
    /** A transcription of the audio. **/
    transcript: string;
    /** A score that indicates the service's confidence in the transcript in the range of 0 to 1. Available only for the best alternative and only in results marked as final. **/
    confidence?: number;
    /** Time alignments for each word from the transcript as a list of lists. Each inner list consists of three elements: the word followed by its start and end time in seconds. Example: `[["hello",0.0,1.2],["world",1.2,2.5]]`. Available only for the best alternative. **/
    timestamps?: string[];
    /** A confidence score for each word of the transcript as a list of lists. Each inner list consists of two elements: the word and its confidence score in the range of 0 to 1. Example: `[["hello",0.95],["world",0.866]]`. Available only for the best alternative and only in results marked as final. **/
    word_confidence?: string[];
  }

  /** SpeechRecognitionResult. **/
  export interface SpeechRecognitionResult {
    /** An indication of whether the transcription results are final. If `true`, the results for this utterance are not updated further; no additional results are sent for a `result_index` once its results are indicated as final. **/
    final: boolean;
    /** An array of alternative transcripts. The `alternatives` array can include additional requested output such as word confidence or timestamps. **/
    alternatives: SpeechRecognitionAlternative[];
    /** A dictionary (or associative array) whose keys are the strings specified for `keywords` if both that parameter and `keywords_threshold` are specified. A keyword for which no matches are found is omitted from the array. The array is omitted if no keywords are found. **/
    keywords_result?: KeywordResults;
    /** An array of alternative hypotheses found for words of the input audio if a `word_alternatives_threshold` is specified. **/
    word_alternatives?: WordAlternativeResults[];
  }

  /** SpeechRecognitionResults. **/
  export interface SpeechRecognitionResults {
    /** An array that can include interim and final results (interim results are returned only if supported by the method). Final results are guaranteed not to change; interim results might be replaced by further interim results and final results. The service periodically sends updates to the results list; the `result_index` is set to the lowest index in the array that has changed; it is incremented for new results. **/
    results?: SpeechRecognitionResult[];
    /** An index that indicates a change point in the `results` array. The service increments the index only for additional results that it sends for new audio for the same request. **/
    result_index?: number;
    /** An array that identifies which words were spoken by which speakers in a multi-person exchange. Returned in the response only if `speaker_labels` is `true`. When interim results are also requested for methods that support them, it is possible for a `SpeechRecognitionResults` object to include only the `speaker_labels` field. **/
    speaker_labels?: SpeakerLabelsResult[];
    /** An array of warning messages about invalid query parameters or JSON fields included with the request. Each warning includes a descriptive message and a list of invalid argument strings, for example, `"Unknown arguments:"` or `"Unknown url query arguments:"` followed by a list of the form `"invalid_arg_1, invalid_arg_2."` The request succeeds despite the warnings. **/
    warnings?: string[];
  }

  /** SpeechSession. **/
  export interface SpeechSession {
    /** URI for HTTP REST recognition requests. **/
    recognize: string;
    /** URI for WebSocket recognition requests. Needed only for working with the WebSocket interface. **/
    recognize_ws: string;
    /** URI for HTTP REST results observers. **/
    observe_result: string;
    /** Identifier for the new session. **Note:** This field is returned only when you create a new session. **/
    session_id?: string;
    /** URI for the new session. **Note:** This field is returned only when you create a new session. **/
    new_session_uri?: string;
    /** State of the session. The state must be `initialized` to perform a new recognition request on the session. **Note:** This field is returned only when you request the status of an existing session. **/
    state?: string;
    /** URI for information about the model that is used with the session. **Note:** This field is returned only when you request the status of an existing session. **/
    model?: string;
  }

  /** SupportedFeatures. **/
  export interface SupportedFeatures {
    /** Indicates whether the customization interface can be used to create a custom language model based on the language model. **/
    custom_language_model: boolean;
    /** Indicates whether the `speaker_labels` parameter can be used with the language model. **/
    speaker_labels: boolean;
  }

  /** Word. **/
  export interface Word {
    /** A word from the custom model's words resource. The spelling of the word is used to train the model. **/
    word: string;
    /** An array of pronunciations for the word. The array can include the sounds-like pronunciation automatically generated by the service if none is provided for the word; the service adds this pronunciation when it finishes processing the word. **/
    sounds_like: string[];
    /** The spelling of the word that the service uses to display the word in a transcript. The field contains an empty string if no display-as value is provided for the word, in which case the word is displayed as it is spelled. **/
    display_as: string;
    /** A sum of the number of times the word is found across all corpora. For example, if the word occurs five times in one corpus and seven times in another, its count is `12`. If you add a custom word to a model before it is added by any corpora, the count begins at `1`; if the word is added from a corpus first and later modified, the count reflects only the number of times it is found in corpora. **/
    count: number;
    /** An array of sources that describes how the word was added to the custom model's words resource. For OOV words added from a corpus, includes the name of the corpus; if the word was added by multiple corpora, the names of all corpora are listed. If the word was modified or added by the user directly, the field includes the string `user`. **/
    source: string[];
    /** If the service discovered one or more problems with the word's definition that you need to correct, an array that describes each of the errors. **/
    error?: WordError[];
  }

  /** WordAlternativeResult. **/
  export interface WordAlternativeResult {
    /** A confidence score for the word alternative hypothesis in the range of 0 to 1. **/
    confidence: number;
    /** An alternative hypothesis for a word from the input audio. **/
    word: string;
  }

  /** WordAlternativeResults. **/
  export interface WordAlternativeResults {
    /** The start time in seconds of the word from the input audio that corresponds to the word alternatives. **/
    start_time: number;
    /** The end time in seconds of the word from the input audio that corresponds to the word alternatives. **/
    end_time: number;
    /** An array of alternative hypotheses for a word from the input audio. **/
    alternatives: WordAlternativeResult[];
  }

  /** WordError. **/
  export interface WordError {
    /** A key-value pair that describes an error associated with the definition of a word in the words resource. Each pair has the format `"element": "message"`, where `element` is the aspect of the definition that caused the problem and `message` describes the problem. The following example describes a problem with one of the word's sounds-like definitions: `"sounds_like_string": "Numbers are not allowed in sounds-like. You can try for example 'suggested_string'."` You must correct the error before you can train the model. **/
    element: string;
  }

  /** Words. **/
  export interface Words {
    /** Information about each word in the custom model's words resource. The array is empty if the custom model has no words. **/
    words: Word[];
  }
}

export = SpeechToTextV1;
