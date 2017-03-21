/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
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

const extend = require('extend');
const helper = require('../lib/helper');
const cookie = require('cookie');
const pick = require('object.pick');
const url = require('url');
const https = require('https');
const http = require('http');
const isStream = require('isstream');
const requestFactory = require('../lib/requestwrapper');
const RecognizeStream = require('./recognize_stream');
const pkg = require('../package.json');
const util = require('util');
const BaseService = require('../lib/base_service');
const async = require('async');

const PARAMS_ALLOWED = [
  'continuous',
  'max_alternatives',
  'timestamps',
  'word_confidence',
  'inactivity_timeout',
  'model',
  'content-type', // this is accepted in querystring by the service, but methods here all accept content_type and then set a header
  'interim_results',
  'keywords',
  'keywords_threshold',
  'word_alternatives_threshold',
  'profanity_filter',
  'smart_formatting',
  'customization_id',
  'speaker_labels'
];

/**
 * @private
 * @param chunk
 * @return {*}
 */
function formatChunk(chunk) {
  // Convert the string into an array
  let result = chunk;

  // Check if in the stream doesn't have
  // two results together and parse them
  if (!result || result.indexOf('}{') === -1) {
    return JSON.parse(result);
  }

  // Check if we can parse the response
  try {
    result = '[' + result.replace(/}{/g, '},{') + ']';
    result = JSON.parse(result);
    return result[result.length - 1];
  } catch (e) {
    // if it fails, then this isn't valid json (or a concatenated list of valid json) - just return the original string
  }

  return result;
}

/**
 * Speech Recognition API Wrapper
 * @constructor
 * @param {Object} options
 */
function SpeechToTextV1(options) {
  BaseService.call(this, options);
}

util.inherits(SpeechToTextV1, BaseService);
SpeechToTextV1.prototype.name = 'speech_to_text';
SpeechToTextV1.prototype.version = 'v1';
SpeechToTextV1.URL = 'https://stream.watsonplatform.net/speech-to-text/api';

/**
 * Registers a callback URL with the service for use with subsequent asynchronous recognition requests.
 * The service attempts to register, or white-list, the callback URL if it is not already registered by sending a GET
 * request to the callback URL.
 *
 * @param {object} params - The parameters
 * @param {string} params.callback_url - A URL to which callback notifications are to be sent
 * @param {string} [params.user_secret] - A user-specified string that the service uses to generate the HMAC-SHA1 signature that it sends via the X-Callback-Signature header
 * @param {Function} callback
 * @returns {ReadableStream|undefined}
 */
SpeechToTextV1.prototype.registerCallback = function(params, callback) {
  const missingParams = helper.getMissingParams(params, ['callback_url']);
  if (missingParams) {
    callback(missingParams);
    return;
  }

  const parameters = {
    requiredParams: ['callback_url'],
    options: {
      method: 'POST',
      url: '/v1/register_callback',
      qs: pick(params, ['callback_url', 'user_secret']),
      json: true
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Creates a job for a new asynchronous recognition request.
 * The job is owned by the user whose service credentials are used to create it.
 * How you learn the status and results of a job depends on the parameters you include with the job creation request.
 *
 * @param {object} params - The parameters
 * @param {Stream}  params.audio - Audio to be recognized
 * @param {string} params.content_type - The Content-type e.g. audio/l16; rate=48000
 * @param {string} params.callback_url - A URL to which callback notifications are to be sent
 * @param {string|Array<string>} [params.events] - Events to trigger the callback for. Valid options are recognitions.started, recognitions.completed, recognitions.failed, recognitions.completed_with_results
 * @param {string} [params.user_token] - The token allows the user to maintain an internal mapping between jobs and notification events
 * @param {number} [params.results_ttl] - time to alive of the job result
 * @param {*} [params.*] - all params that .recognize() accepts may also be passed to createRecognitionJob()
 * @param {Function} callback
 * @returns {ReadableStream|undefined}
 */
SpeechToTextV1.prototype.createRecognitionJob = function(params, callback) {
  const missingParams = helper.getMissingParams(params, ['audio', 'content_type']);
  if (missingParams) {
    callback(missingParams);
    return;
  }

  if (!isStream(params.audio)) {
    callback(new Error('audio is not a standard Node.js Stream'));
    return;
  }

  const qs = pick(params, ['callback_url', 'events', 'user_token', 'results_ttl'].concat(PARAMS_ALLOWED));

  // multiple events must be sent as a comma-separated string. Default behavior is multiple &event= params in the querystring
  if (Array.isArray(qs.events)) {
    qs.events = qs.events.join(',');
  }

  const parameters = {
    options: {
      method: 'POST',
      url: '/v1/recognitions',
      headers: {
        'Content-Type': params.content_type
      },
      qs: qs,
      json: true
    },
    defaultOptions: this._options
  };

  return params.audio
    .on('response', function(response) {
      // Replace content-type
      response.headers['content-type'] = params.content_type;
    })
    .pipe(requestFactory(parameters, callback));
};

/**
 * Returns the status and ID of all outstanding jobs associated with the service credentials with which it is called.
 * The method also returns the creation and update times of each job, and, if a job was created with a callback URL
 * and a user token, the user token for the job.
 *
 * @param {Object} [params]
 * @param {Function} callback
 * @returns {ReadableStream|undefined}
 */
SpeechToTextV1.prototype.getRecognitionJobs = function(params, callback) {
  if (!callback && typeof params === 'function') {
    callback = params;
  }
  const parameters = {
    options: {
      method: 'GET',
      url: '/v1/recognitions',
      json: true
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Returns the status and ID of all outstanding jobs associated with the service credentials with which it is called.
 *
 * @param params
 * @param params.id - id of the Job
 * @param callback
 * @returns {ReadableStream|undefined}
 */
SpeechToTextV1.prototype.getRecognitionJob = function(params, callback) {
  const missingParams = helper.getMissingParams(params, ['id']);
  if (missingParams) {
    callback(missingParams);
    return;
  }

  const parameters = {
    options: {
      method: 'GET',
      url: '/v1/recognitions/{id}',
      path: pick(params, ['id']),
      json: true
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Deletes the specified job. You cannot delete a job that the service is actively processing.
 *
 * @param params - The parameters
 * @param params.id - id of the Job
 * @param callback
 * @returns {ReadableStream|undefined}
 */
SpeechToTextV1.prototype.deleteRecognitionJob = function(params, callback) {
  const missingParams = helper.getMissingParams(params, ['id']);
  if (missingParams) {
    callback(missingParams);
    return;
  }

  const parameters = {
    options: {
      method: 'DELETE',
      url: '/v1/recognitions/{id}',
      path: pick(params, ['id']),
      json: true
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Speech recognition for given audio using default model.
 *
 * @param {Object} params The parameters
 * @param {Stream} params.audio - Audio to be recognized
 * @param {String} params.content_type - Content-type
 * @param {Boolean} [params.continuous],
 * @param {Number} [params.max_alternatives],
 * @param {Boolean} [params.timestamps],
 * @param {Boolean} [params.word_confidence],
 * @param {Number} [params.inactivity_timeout],
 * @param {String} [params.model],
 * @param {Boolean} [params.interim_results],
 * @param {Boolean} [params.keywords],
 * @param {Number} [params.keywords_threshold],
 * @param {Number} [params.word_alternatives_threshold],
 * @param {Boolean} [params.profanity_filter],
 * @param {Boolean} [params.smart_formatting],
 * @param {String} [params.customization_id],
 * @param {Boolean} [params.speaker_labels]
 * @param {function} callback
 */
SpeechToTextV1.prototype.recognize = function(params, callback) {
  const missingParams = helper.getMissingParams(params, ['audio', 'content_type']);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  if (!isStream(params.audio)) {
    callback(new Error('audio is not a standard Node.js Stream'));
    return;
  }

  const queryParams = pick(params, PARAMS_ALLOWED);
  if (Array.isArray(queryParams.keywords)) {
    queryParams.keywords = queryParams.keywords.join(',');
  }

  let _url = '/v1';
  _url += params.session_id ? '/sessions/' + params.session_id : '';
  _url += '/recognize';

  const parameters = {
    options: {
      method: 'POST',
      url: _url,
      headers: {
        'Content-Type': params.content_type
      },
      json: true,
      qs: queryParams
    },
    defaultOptions: this._options
  };
  return params.audio
    .on('response', function(response) {
      // Replace content-type
      response.headers['content-type'] = params.content_type;
    })
    .pipe(requestFactory(parameters, callback));
};

/**
 * Creates a HTTP/HTTPS request to /recognize and keep the connection open.
 * Sets 'Transfer-Encoding': 'chunked' and prepare the connection to send
 * chunk data.
 *
 * @deprecated use createRecognizeStream instead
 *
 * @param {Object} params The parameters
 * @param {String} [params.content_type] - The Content-type e.g. audio/l16; rate=48000
 * @param {String} [params.session_id] - The session id
 * @param {function} callback
 */
SpeechToTextV1.prototype.recognizeLive = function(params, callback) {
  const missingParams = helper.getMissingParams(params, ['session_id', 'content_type', 'cookie_session']);

  if (missingParams) {
    callback(missingParams);
    return;
  }

  const serviceUrl = [this._options.url, '/v1/sessions/', params.session_id, '/recognize'].join('');
  const parts = url.parse(serviceUrl);
  const options = {
    agent: false,
    host: parts.hostname,
    port: parts.port,
    path: parts.pathname + (params.continuous ? '?continuous=true' : ''),
    method: 'POST',
    headers: extend(
      {
        'Transfer-Encoding': 'chunked',
        cookie: 'SESSIONID=' + params.cookie_session,
        'Content-type': params.content_type
      },
      this._options.headers
    )
  };
  const protocol = parts.protocol.match('http:') ? http : https;
  const recognize_req = protocol.request(options, function(result) {
    result.setEncoding('utf-8');
    let transcript = '';

    result.on('data', function(chunk) {
      transcript += chunk;
    });

    result.on('end', function() {
      try {
        transcript = formatChunk(transcript);
      } catch (e) {
        callback(transcript);
        return;
      }
      callback(null, transcript);
    });
  });

  recognize_req.on('error', function(error) {
    callback(error);
  });
  return recognize_req;
};

/**
 * Result observer for upcoming or ongoing recognition task in the session.
 * This request has to be started before POST on recognize finishes,
 * otherwise it waits for the next recognition.
 *
 * @deprecated use createRecognizeStream instead
 *
 * @param {Object} params The parameters
 * @param {String} [params.session_id] - Session used in the recognition
 * @param {boolean} [params.interim_results] - If true, interim results will be returned. Default: false
 * @param {Function} callback
 */
SpeechToTextV1.prototype.observeResult = function(params, callback) {
  const missingParams = helper.getMissingParams(params, ['session_id', 'cookie_session']);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const serviceUrl = [this._options.url, '/v1/sessions/', params.session_id, '/observe_result'].join('');
  const parts = url.parse(serviceUrl);
  const options = {
    agent: false,
    host: parts.hostname,
    port: parts.port,
    path: parts.pathname + (params.interim_results ? '?interim_results=true' : ''),
    method: 'GET',
    headers: extend(
      {
        cookie: 'SESSIONID=' + params.cookie_session,
        Accept: 'application/json'
      },
      this._options.headers
    )
  };
  const protocol = parts.protocol.match('http:') ? http : https;
  const req = protocol.request(options, function(result) {
    result.setEncoding('utf-8');
    result.on('data', function(chunk) {
      try {
        chunk = formatChunk(chunk);
      } catch (e) {
        callback(chunk);
        return;
      }
      callback(null, chunk);
    });
  });

  req.on('error', function(error) {
    callback(error);
  });

  req.end();

  return req;
};

/**
 * Get the state of the engine to check if recognize is available.
 * This is the way to check if the session is ready to accept a new recognition task.
 * The returned state has to be 'initialized' to be able to do recognize POST.
 *
 * @deprecated use createRecognizeStream instead
 *
 * @param {Object} params The parameters
 * @param {String} [params.session_id] - Session used in the recognition
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getRecognizeStatus = function(params, callback) {
  const parameters = {
    requiredParams: ['session_id'],
    options: {
      method: 'GET',
      url: '/v1/sessions/{session_id}/recognize',
      path: pick(params, ['session_id']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * List of models available.
 *
 * @param {Object} params The parameters
 * @param {Function} callback
 * @return {ReadableStream|undefined}
 */
SpeechToTextV1.prototype.getModels = function(params, callback) {
  const parameters = {
    options: {
      method: 'GET',
      url: '/v1/models',
      path: params,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get information about a model based on the given model_id
 *
 * @param {Object} params The parameters
 * @param {String} params.model_id - The desired model
 * @param {Function} callback
 * @return {ReadableStream|undefined}
 */
SpeechToTextV1.prototype.getModel = function(params, callback) {
  const parameters = {
    requiredParams: ['model_id'],
    options: {
      method: 'GET',
      url: '/v1/models/{model_id}',
      path: pick(params, ['model_id']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Create a session
 * Set-cookie header is returned with a cookie that must be used for
 * each request using this session.
 *
 * @param {Object} params The parameters
 * @param {string} params.model - The model to use during the session
 * @param {Function} callback
 */
SpeechToTextV1.prototype.createSession = function(params, callback) {
  const parameters = {
    options: {
      method: 'POST',
      url: '/v1/sessions',
      json: true,
      qs: params
    },
    defaultOptions: this._options
  };

  /**
   * Add the cookie_session to the response
   * @private
   * @param cb
   * @return {Function}
   */
  function addSessionId(cb) {
    return function(error, body, response) {
      if (error) {
        cb(error, body, response);
        return;
      }
      const cookies = cookie.parse(response.headers['set-cookie'][0]);
      body.cookie_session = cookies.SESSIONID;
      cb(error, body, response);
    };
  }

  return requestFactory(parameters, addSessionId(callback));
};

/**
 * Deletes the specified session.
 *
 * @param {Object} params The parameters
 * @param {String} params.session_id - Session id.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.deleteSession = function(params, callback) {
  const parameters = {
    requiredParams: ['session_id'],
    options: {
      method: 'DELETE',
      url: '/v1/sessions/{session_id}',
      json: true,
      path: pick(params, ['session_id'])
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Replaces recognizeLive & friends with a single 2-way stream over websockets
 *
 * @param {Object} params The parameters
 * @return {RecognizeStream}
 */
SpeechToTextV1.prototype.createRecognizeStream = function(params) {
  params = params || {};
  params.url = this._options.url;

  params.headers = extend(
    {
      'user-agent': pkg.name + '-nodejs-' + pkg.version,
      authorization: this._options.headers.Authorization
    },
    params.headers
  );

  return new RecognizeStream(params);
};

// set up a warning message for the deprecated methods
['recognizeLive', 'observeResult'].forEach(function(name) {
  const original = SpeechToTextV1.prototype[name];
  SpeechToTextV1.prototype[name] = function deprecated(params) {
    if (!(params || {}).silent && !this._options.silent) {
      // eslint-disable-next-line no-console
      console.log(
        new Error(
          `The ${name}() method is deprecated and will be removed from a future version of the watson-developer-cloud SDK. Please use createRecognizeStream() instead.\n(Set {silent: true} to hide this message.)`
        )
      );
    }
    return original.apply(this, arguments);
  };
});

/**
 * Creates a new empty custom voice model
 *
 * Response looks like:
 *
 * ```json
 * {
 *   "customization_id": "abc996ea-86ca-482e-b7ec-0f31c34e5ee9"
 * }
 * ```
 *
 * @param {Object} params The parameters
 * @param {String} params.base_model_name - The base language model, for example, en-US_BroadbandModel
 * @param {String} params.name - The customization name
 * @param {String} [params.description] - The customization description
 * @param {Function} callback
 */
SpeechToTextV1.prototype.createCustomization = function(params, callback) {
  const parameters = {
    requiredParams: ['base_model_name', 'name'],
    options: {
      method: 'POST',
      url: '/v1/customizations',
      body: pick(params, ['name', 'base_model_name', 'description']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * @typedef Word
 * @type {Object}
 * @property {String} word - The word as written
 * @property {String} translation - The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word.
 */

/**
 * List all customizations
 *
 * Example response:
 ```json
 { customizations:
     [ { owner: '8a6f5bb1-5b2d-4a20-85a9-eaa421d25c88',
         base_model_name: 'en-US_BroadbandModel',
         customization_id: '6a7785a0-9665-11e6-a73a-0da9193a4475',
         created: '2016-10-20T01:35:00.346Z',
         name: 'IEEE-test',
         description: '',
         progress: 0,
         language: 'en-US',
         status: 'pending' },
       { owner: '8a6f5bb1-5b2d-4a20-85a9-eaa421d25c88',
         base_model_name: 'en-US_BroadbandModel',
         customization_id: '9e2f6bb0-9665-11e6-a73a-0da9193a4475',
         created: '2016-10-20T01:36:27.115Z',
         name: 'IEEE-test',
         description: '',
         progress: 0,
         language: 'en-US',
         status: 'ready' },
       { owner: '8a6f5bb1-5b2d-4a20-85a9-eaa421d25c88',
         base_model_name: 'en-US_BroadbandModel',
         customization_id: '6b194e70-9666-11e6-a73a-0da9193a4475',
         created: '2016-10-20T01:42:10.903Z',
         name: 'IEEE-test',
         description: '',
         progress: 100,
         language: 'en-US',
         status: 'available' } ] }

 ```
 *
 * @param {Object} params The parameters
 * @param {String} [params.language] optional filter.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getCustomizations = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    options: {
      method: 'GET',
      url: '/v1/customizations/',
      qs: pick(params, ['language']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get customization details
 *
 * Example response:
 *
 ```json
 { owner: '8a6f5bb1-5b2d-4a20-85a9-eaa421d25c88',
   base_model_name: 'en-US_BroadbandModel',
   customization_id: 'e695ad30-97c1-11e6-be92-bb627d4684b9',
   created: '2016-10-21T19:09:33.443Z',
   name: 'js-sdk-test-temporary',
   description: 'Temporary customization to test the JS SDK. Should be automatically deleted within a few minutes.',
   progress: 0,
   language: 'en-US',
   status: 'pending' }
 ```
 *
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getCustomization = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id'],
    options: {
      method: 'GET',
      url: '/v1/customizations/{customization_id}',
      path: pick(params, ['customization_id']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Train a custom model.
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {String} [params.word_type_to_add=all] - set to 'user' to train the model only on new words that were added or modified by the user; the model is not trained on new words extracted from corpora.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.trainCustomization = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id'],
    options: {
      method: 'POST',
      url: '/v1/customizations/{customization_id}/train',
      path: pick(params, ['customization_id']),
      qs: pick(params, ['word_type_to_add']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Reset a custom model.
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {Function} callback
 */
SpeechToTextV1.prototype.resetCustomization = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id'],
    options: {
      method: 'POST',
      url: '/v1/customizations/{customization_id}/reset',
      path: pick(params, ['customization_id']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a custom model.
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {Function} callback
 */
SpeechToTextV1.prototype.deleteCustomization = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id'],
    options: {
      method: 'DELETE',
      url: '/v1/customizations/{customization_id}',
      path: pick(params, ['customization_id']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Add a corpus to a custom model.
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model to which a corpus is to be added. You must make the request with the service credentials of the model's owner.
 * @param {String} params.name - The name of the corpus that is to be added. The name cannot contain spaces and cannot be the string user, which is reserved by the service to denote custom words added or modified by the user.
 * @param {Boolean} [parms.allow_overwrite=false] - Indicates whether the specified corpus is to overwrite an existing corpus with the same name. If a corpus with the same name already exists, the request fails unless allow_overwrite is set to true; by default, the parameter is false. The parameter has no effect if a corpus with the same name does not already exist.
 * @param {String|Buffer|ReadStream} [params.corpus] - the text of the corpus - may be provided as a String, a Buffer, or a ReadableStream. A ReadableStream is recommended when reading a file from disk.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.addCorpus = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'name', 'corpus'],
    originalParams: params,
    options: {
      method: 'POST', // shouldn't this be a PUT?
      url: '/v1/customizations/{customization_id}/corpora/{name}',
      path: pick(params, ['customization_id', 'name']),
      qs: pick(params, ['allow_overwrite']),
      body: params.corpus
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * List corpora
 *
 * Lists information about all corpora that have been added to the specified custom language model.
 * The information includes the total number of words and out-of-vocabulary (OOV) words, name, and status of each corpus.
 *
 * Example Result:
 ```json
 {
     "corpora": [{
         "out_of_vocabulary_words": 1,
         "total_words": 233,
         "name": "corpus-1",
         "status": "analyzed"
     }, {
         "out_of_vocabulary_words": 3,
         "total_words": 20,
         "name": "corpus-2",
         "status": "being_processed"
     }]
 }
 ```
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getCorpora = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id'],
    options: {
      method: 'GET',
      url: '/v1/customizations/{customization_id}/corpora',
      path: pick(params, ['customization_id']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get corpus details
 *
 * Example response:
 *
 ```json
 {
   "name": "corpus-1",
   "total_words": 100,
   "out_of_vocabulary_words": 5,
   "status": "analyzed"
 }
 ```
 *
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {String} params.name - The corpus name
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getCorpus = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'name'],
    options: {
      method: 'GET',
      url: '/v1/customizations/{customization_id}/corpora/{name}',
      path: pick(params, ['customization_id', 'name']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a corpus.
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {String} params.name - The name of the corpus.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.deleteCorpus = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'name'],
    options: {
      method: 'DELETE',
      url: '/v1/customizations/{customization_id}/corpora/{name}',
      path: pick(params, ['customization_id', 'name']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

SpeechToTextV1.ERR_NO_CORPORA = 'ERR_NO_CORPORA';
SpeechToTextV1.ERR_TIMEOUT = 'ERR_TIMEOUT';

/**
 * Waits while a customization status is 'pending' or 'training', fires callback once the status is 'ready' or 'available'.
 *
 * Note: the customization will remain in 'pending' status until at least one word corpus is added.
 *
 * See http://www.ibm.com/watson/developercloud/speech-to-text/api/v1/#list_models for status details.
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {Number} [params.interval=5000] - (milliseconds) - how log to wait between status checks
 * @param {Number} [params.times=30] - maximum number of attempts
 * @param {Function} callback
 */
SpeechToTextV1.prototype.whenCustomizationReady = function(params, callback) {
  const self = this;

  // check the customization status repeatedly until it's ready or available

  const options = extend(
    {
      interval: 5000,
      times: 30
    },
    params
  );
  options.errorFilter = function(err) {
    // if it's a timeout error, then getCustomization is called again after params.interval
    // otherwise the error is passed back to the user
    // if the params.times limit is reached, the error will be passed to the user regardless
    return err.code === SpeechToTextV1.ERR_TIMEOUT;
  };
  async.retry(
    options,
    function(next) {
      self.getCustomization(params, function(err, customization) {
        if (err) {
          next(err);
        } else if (customization.status === 'pending' || customization.status === 'training') {
          // if the loop times out, async returns the last error, which will be this one.
          err = new Error('Customization is still pending, try increasing interval or times params');
          err.code = SpeechToTextV1.ERR_TIMEOUT;
          next(err);
        } else if (customization.status === 'ready' || customization.status === 'available') {
          next(null, customization);
        } else if (customization.status === 'failed') {
          next(new Error('Customization training failed'));
        } else {
          next(new Error('Unexpected customization status: ' + customization.status));
        }
      });
    },
    callback
  );
};

/**
 * Check if there is a corpus that is still being processed
 * @private
 * @param corporaList
 * @return {boolean}
 */
function isProcessing(corporaList) {
  const recordsBeingProcessed = corporaList.corpora.filter(function(record) {
    return record['status'] === 'being_processed';
  });
  if (recordsBeingProcessed.length === 0) {
    return false;
  } else {
    return true;
  }
}

/**
 * Check if corpora has been analyzed
 * @private
 * @param corporaList
 * @return {boolean}
 */
function isAnalyzed(corporaList) {
  const recordsAnalyzed = corporaList.corpora.filter(function(record) {
    return record['status'] === 'analyzed';
  });
  if (recordsAnalyzed.length === corporaList.corpora.length) {
    return true;
  } else {
    return false;
  }
}
/**
 * Waits while corpora analysis status is 'being_processes', fires callback once the status is 'analyzed'
 *
 * Note: the code will throw an error in case there in no corpus in the customization
 *
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {Number} [params.interval=5000] - (milliseconds) - how long to wait between status checks
 * @param {Number} [params.times=30] - maximum number of attempts
 * @param {Function} callback
 */
SpeechToTextV1.prototype.whenCorporaAnalyzed = function(params, callback) {
  const self = this;

  async.parallel(
    [
      // validate that it has at least one corpus
      function(next) {
        self.getCorpora(params, function(err, res) {
          if (err) {
            return next(err);
          }
          if (!res.corpora.length) {
            err = new Error('Customization has no corpa and therefore corpus cannot be analyzed');
            err.code = SpeechToTextV1.ERR_NO_CORPORA;
            return next(err);
          }
          next();
        });
      },
      // check the customization status repeatedly until it's available
      function(next) {
        const options = extend(
          {
            interval: 5000,
            times: 30
          },
          params
        );
        options.errorFilter = function(err) {
          // if it's a timeout error, then getCorpora is called again after params.interval
          // otherwise the error is passed back to the user
          // if the params.times limit is reached, the error will be passed to the user regardless
          return err.code === SpeechToTextV1.ERR_TIMEOUT;
        };
        async.retry(
          options,
          function(done) {
            self.getCorpora(params, function(err, corpora) {
              if (err) {
                done(err);
              } else if (isProcessing(corpora)) {
                // if the loop times out, async returns the last error, which will be this one.
                err = new Error('Corpora is still being processed, try increasing interval or times params');
                err.code = SpeechToTextV1.ERR_TIMEOUT;
                done(err);
              } else if (isAnalyzed(corpora)) {
                done(null, corpora);
              } else {
                done(new Error('Unexpected corpus analysis status'));
              }
            });
          },
          next
        );
      }
    ],
    function(err, res) {
      if (err) {
        return callback(err);
      }
      callback(null, res[1]); // callback with the final customization object
    }
  );
};

/**
 * Add multiple custom words.
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {Array<Word>} params.words - Array of objects: [{word: String, sounds_like: [String, ...], display_as: String}, ...]
 * @param {Function} callback
 */
SpeechToTextV1.prototype.addWords = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'words'],
    options: {
      method: 'POST',
      url: '/v1/customizations/{customization_id}/words',
      path: pick(params, ['customization_id']),
      body: pick(params, ['words']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Add a single custom word.
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {String} params.word - The custom word that is to be added to the custom model. Do not include spaces in the word. Use a - (dash) or _ (underscore) to connect the tokens of compound words.
 * @param {Array<String>} params.sounds_like - An array of sounds-like pronunciations for the custom word.
 * @param {String} [params.display_as] - An alternative spelling for the custom word when it appears in a transcript.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.addWord = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'word', 'sounds_like'],
    options: {
      method: 'PUT',
      url: '/v1/customizations/{customization_id}/words/{word}',
      path: pick(params, ['customization_id', 'word']),
      body: pick(params, ['sounds_like', 'display_as']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * List all custom words
 *
 * Lists information about all custom words from a custom language model.
 * You can list all words from the custom model's words resource, only custom words that were added or modified by the user, or only OOV words that were extracted from corpora.
 *
 * Example response:
 ```json
 {
     "words": [
        {
           "word": "hhonors",
           "sounds_like": ["hilton honors","h honors"],
           "display_as": "HHonors",
           "source": ["corpus1"]
        },
        {
           "word": "ieee",
           "sounds_like": ["i triple e"],
           "display_as": "IEEE",
           "source": ["corpus1","corpus2"]
        },
        {
           "word": "tomato",
           "sounds_like": ["tomatoh","tomayto"],
           "display_as": "",
           "source": ["user"]
        },
        {
           "word": "$75.00",
           "sounds_like": ["75 dollars"],
           "display_as": "",
           "source": ["user"],
           "error":" Numbers are not allowed in sounds-like"
        }
     ]
  }
 ```
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {String} params.sort - +alphabetical|-alphabetical|+count|-count to order result in alphabetical oredering or count ordering.
 * @param {String} [params.word_type=all] - all|user|corpora - user shows only custom words that were added or modified by the user; corpora shows only OOV that were extracted from corpora.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getWords = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const parameters = {
    requiredParams: ['customization_id'],
    options: {
      method: 'GET',
      url: '/v1/customizations/{customization_id}/words',
      path: pick(params, ['customization_id']),
      qs: pick(params, ['word_type', 'sort']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get a custom word
 *
 * Lists information about a custom word from a custom language model.
 *
 * Example output:
 *
 * ```json
 {
    "sounds_like": ["N. C. A. A.","N. C. double A."],
    "display_as": "NCAA",
    "source": ["corpus3","user"]
 }
 ```
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {String} params.word - The custom word
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getWord = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'word'],
    options: {
      method: 'GET',
      url: '/v1/customizations/{customization_id}/words/{word}',
      path: pick(params, ['customization_id', 'word']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a custom word
 *
 * Removing a custom word does not affect the custom model until you train the model with the Train a custom model method.
 *
 * @param {Object} params The parameters
 * @param {String} params.customization_id - The GUID of the custom language model
 * @param {String} params.word - The custom word that is to be deleted.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.deleteWord = function(params, callback) {
  const parameters = {
    requiredParams: ['customization_id', 'word'],
    options: {
      method: 'DELETE',
      url: '/v1/customizations/{customization_id}/words/{word}',
      path: pick(params, ['customization_id', 'word']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = SpeechToTextV1;
