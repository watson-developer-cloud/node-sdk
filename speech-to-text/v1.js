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

var extend         = require('extend');
var helper         = require('../lib/helper');
var cookie         = require('cookie');
var pick           = require('object.pick');
var url            = require('url');
var https          = require('https');
var http           = require('http');
var isStream       = require('isstream');
var requestFactory = require('../lib/requestwrapper');
var RecognizeStream = require('./recognize_stream');
var pkg            = require('../package.json'); // todo: consider using env properties here instead (to enable webpack support without requiring a plugin)
var util = require('util');
var BaseService = require('../lib/base_service');
var async = require('async');

var PARAMS_ALLOWED = ['continuous', 'max_alternatives', 'timestamps', 'word_confidence', 'inactivity_timeout',
  'model', 'content-type', 'interim_results', 'keywords', 'keywords_threshold', 'word_alternatives_threshold',
  'profanity_filter', 'smart_formatting', 'customization_id' ];

function formatChunk(chunk) {
  // Convert the string into an array
  var result = chunk;

  // Check if in the stream doesn't have
  // two results together and parse them
  if (!result || result.indexOf('}{') === -1)
    return JSON.parse(result);

  // Check if we can parse the response
  try {
    result = '[' + result.replace(/}{/g, '},{') + ']';
    result = JSON.parse(result);
    return result[result.length - 1];
  } catch (e) {} // eslint-disable-line no-empty

  return result;
}

/**
 * Speech Recognition API Wrapper
 * @constructor
 * @param options
 */
function SpeechToTextV1(options) {
  BaseService.call(this, options);
}
util.inherits(SpeechToTextV1, BaseService);
SpeechToTextV1.prototype.name = 'speech_to_text';
SpeechToTextV1.prototype.version = 'v1';
SpeechToTextV1.URL = 'https://stream.watsonplatform.net/speech-to-text/api';

/**
 * Speech recognition for given audio using default model.
 *
 * @param {Audio} [audio] Audio to be recognized.
 * @param {String} [content_type] Content-type
 */
SpeechToTextV1.prototype.recognize = function(params, callback) {

  var missingParams = helper.getMissingParams(params, ['audio', 'content_type']);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  if (!isStream(params.audio)) {
    callback(new Error('audio is not a standard Node.js Stream'));
    return;
  }

  var queryParams = pick(params, PARAMS_ALLOWED);

  var _url = '/v1';
  _url += (params.session_id) ? ('/sessions/' + params.session_id) : '';
  _url += '/recognize';

  var parameters = {
    options: {
      method: 'POST',
      url: _url,
      headers: {
        'Content-Type': params.content_type
      },
      json: true,
      qs: queryParams,
    },
    defaultOptions: this._options
  };
  return params.audio.on('response', function(response) {
    // Replace content-type
    response.headers['content-type'] = params.content_type;
  }).pipe(requestFactory(parameters, callback));
};

/**
 * Creates a HTTP/HTTPS request to /recognize and keep the connection open.
 * Sets 'Transfer-Encoding': 'chunked' and prepare the connection to send
 * chunk data
 *
 * @param {String} [content_type] The Content-type e.g. audio/l16; rate=48000
 * @param {String} [session_id] The session id
 * @deprecated use createRecognizeStream instead
 */
SpeechToTextV1.prototype.recognizeLive = function(params, callback) {
  var missingParams = helper.getMissingParams(params,
    ['session_id', 'content_type', 'cookie_session']);

  if (missingParams) {
    callback(missingParams);
    return;
  }

  var serviceUrl = [this._options.url, '/v1/sessions/', params.session_id, '/recognize'].join('');
  var parts = url.parse(serviceUrl);
  var options = {
    agent: false,
    host: parts.hostname,
    port: parts.port,
    path: parts.pathname + (params.continuous ? '?continuous=true' : ''),
    method: 'POST',
    headers: extend({
      'Transfer-Encoding': 'chunked',
      'cookie': 'SESSIONID=' + params.cookie_session,
      'Content-type': params.content_type
    }, this._options.headers)
  };
  var protocol = (parts.protocol.match('http:')) ? http : https;
  var recognize_req = protocol.request(options, function(result) {
    result.setEncoding('utf-8');
    var transcript = '';

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
 * @param {String} [params.session_id] Session used in the recognition.
 * @param {boolean} [params.interim_results] If true, interim results will be returned. Default: false.
 * @deprecated use createRecognizeStream instead
 */
SpeechToTextV1.prototype.observeResult = function(params, callback) {
  var missingParams = helper.getMissingParams(params, ['session_id', 'cookie_session']);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  var serviceUrl = [this._options.url, '/v1/sessions/',
    params.session_id, '/observe_result'].join('');
  var parts = url.parse(serviceUrl);
  var options = {
    agent: false,
    host: parts.hostname,
    port: parts.port,
    path: parts.pathname + (params.interim_results ? '?interim_results=true' : ''),
    method: 'GET',
    headers: extend({
      'cookie': 'SESSIONID=' + params.cookie_session,
      'Accept': 'application/json'
    }, this._options.headers)
  };
  var protocol = (parts.protocol.match('http:')) ? http : https;
  var req = protocol.request(options, function(result) {
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
 * @param {String} [params.session_id] Session used in the recognition.
 * @deprecated use createRecognizeStream instead
 */
SpeechToTextV1.prototype.getRecognizeStatus = function(params, callback) {
  var missingParams = helper.getMissingParams(params, ['session_id']);
  if (missingParams) {
    callback(missingParams);
    return;
  }

  var path = params || {};
  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/sessions/' + path.session_id + '/recognize',
      path: path,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * List of models available.
 *
 */
SpeechToTextV1.prototype.getModels = function(params, callback) {
  var parameters = {
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
 * @param {String} [params.model_id] The desired model
 *
 */
SpeechToTextV1.prototype.getModel = function(params, callback) {
  var path = params || {};

  var parameters = {
    options: {
      method: 'GET',
      url: '/v1/models/' + path.model_id,
      path: path,
      json: true
    },
    requiredParams: ['model_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Create a session
 * Set-cookie header is returned with a cookie that must be used for
 * each request using this session.
 * The session expires after 15 minutes of inactivity.
 * @param string model The model to use during the session
 */
SpeechToTextV1.prototype.createSession = function(params, callback) {
  var parameters = {
    options: {
      method: 'POST',
      url: '/v1/sessions',
      json: true,
      qs: params
    },
    defaultOptions: this._options
  };

  // Add the cookie_session to the response
  function addSessionId(cb) {
    return function(error, body, response) {
      if (error) {
        cb(error, body, response);
        return;
      }
      var cookies = cookie.parse(response.headers['set-cookie'][0]);
      body.cookie_session = cookies.SESSIONID;
      cb(error, body, response);
    };
  }

  return requestFactory(parameters, addSessionId(callback));
};

/**
 * Deletes the specified session.
 *
 * @param {String} [params.session_id] Session id.
 */
SpeechToTextV1.prototype.deleteSession = function(params, callback) {
  var missingParams = helper.getMissingParams(params, ['session_id']);
  if (missingParams) {
    callback(missingParams);
    return;
  }

  var parameters = {
    options: {
      method: 'DELETE',
      url: '/v1/sessions/' + params.session_id,
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};


/**
 * Replaces recognizeLive & friends with a single 2-way stream over websockets
 * @param params
 * @returns {RecognizeStream}
 */
SpeechToTextV1.prototype.createRecognizeStream = function(params) {
  params = params || {};
  params.url = this._options.url;

  params.headers = extend({
    'user-agent': pkg.name + '-nodejs-'+ pkg.version,
    authorization:  this._options.headers.Authorization
  }, params.headers);

  return new RecognizeStream(params);
};

// set up a warning message for the deprecated methods
['recognizeLive', 'observeResult'].forEach(function(name) {
  var original = SpeechToTextV1.prototype[name];
  SpeechToTextV1.prototype[name] = function deprecated(params) {
    if (!(params||{}).silent && !this._options.silent) {
      // eslint-disable-next-line no-console
      console.log(new Error('The ' + name + '() method is deprecated and will be removed from a future version of the watson-developer-cloud SDK. ' +
        'Please use createRecognizeStream() instead.\n(Set {silent: true} to hide this message.)'));
    }
    return original.apply(this, arguments);
  };
});

/**
 * Creates a new empty custom voice model
 *
 * Response looks like:
 *
 * {
 *   "customization_id": "abc996ea-86ca-482e-b7ec-0f31c34e5ee9"
 * }
 *
 *
 * @param {Object} params
 * @param {String} params.name
 * @param {String} params.base_model_name - for example, en-US_BroadbandModel
 * @param {String} [params.description]
 * @param {Function} callback
 */
SpeechToTextV1.prototype.createCustomization = function(params, callback) {
  var parameters = {
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
 * @property {String} word - the word as written
 * @property {String} translation - The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word.
 */

/**
 * Update voice model
 *
 * Updates information for the specified custom voice model.
 * You can update the metadata such as the name and description of the voice model.
 * You can also update the words in the model and their translations.
 * A custom model can contain no more than 20,000 entries.
 * Only the owner of a custom voice model can use this method to update the model.
 *
 * An example of params.words could be:
 *
 *  [
 *    {"word":"NCAA", "translation":"N C double A"},
 *    {"word":"iPhone", "translation":"I phone"}
 *  ]
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {String} [params.name]
 * @param {String} [params.description]
 * @param {Array<Word>} params.words - Array of {word, translation} objects where translation is the phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.updateCustomization = function(params, callback) {
  var parameters = {
    requiredParams: ['customization_id', 'words'],
    options: {
      method: 'POST',
      url: '/v1/customizations/' + params.customization_id,
      body: pick(params, ['name', 'description', 'words']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * List all customizations
 *
 * Example response:
 *
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
 *
 *
 * @param {Object} [params]
 * @param {String} [params.language] optional filter. Currently only en-US is supported.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getCustomizations = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  var parameters = {
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

function isPending(customization) {
  return (customization.status === 'pending' || customization.status === 'training')
}

/**
 * Get customization details
 *
 * Example response:
 *
 { owner: '8a6f5bb1-5b2d-4a20-85a9-eaa421d25c88',
   base_model_name: 'en-US_BroadbandModel',
   customization_id: 'e695ad30-97c1-11e6-be92-bb627d4684b9',
   created: '2016-10-21T19:09:33.443Z',
   name: 'js-sdk-test-temporary',
   description: 'Temporary customization to test the JS SDK. Should be automatically deleted within a few minutes.',
   progress: 0,
   language: 'en-US',
   status: 'pending' }
 *
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getCustomization = function(params, callback) {
  var parameters = {
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
 * Train a custom model
 *
 * Initiates the training of a custom language model with new corpora, words, or both.
 * After adding training data to the custom model with the corpora or words methods, use this method to begin the actual training of the model on the new data.
 * You can specify whether the custom model is to be trained with all words from its words resources or only with words that were added or modified by the user.
 * Only the owner of a custom model can use this method to train the model.
 *
 * Pre-processing of words and corpa must be complete before initiating training.
 * Use the whenCustomizationReady() method to be notified once pre-processing has completed.
 *
 * Training can take on the order of minutes to complete depending on the amount of data on which the service is being trained and the current load on the service.
 * This method triggers the callback as soon as the training process has begun.
 *
 * Use the whenCustomizationReady() method again to be notified once training has completed.
 *
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {String} [params.word_type_to_add=all] - set to 'user' to train the model only on new words that were added or modified by the user; the model is not trained on new words extracted from corpora.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.trainCustomization = function(params, callback) {
  var parameters = {
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
 * Reset a custom model
 *
 * Resets a custom language model by removing all corpora and words from the model.
 * Resetting a custom model initializes the model to its state when it was first created.
 * Metadata such as the name and language of the model are preserved.
 * Only the owner of a custom model can use this method to reset the model.
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Function} callback
 */
SpeechToTextV1.prototype.resetCustomization = function(params, callback) {
  var parameters = {
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
 * Upgrade a custom model
 *
 * Upgrades a custom language model to the latest release level of the Speech to Text service.
 * The method bases the upgrade on the latest trained data stored for the custom model.
 * If the corpora or words for the model have changed since the model was last trained, you must use the Train a custom model method to train the model on the new data.
 * Only the owner of a custom model can use this method to upgrade the model.
 *
 * Note: This method is not currently implemented. It will be added for a future release of the API.
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Function} callback
 */
SpeechToTextV1.prototype.upgradeCustomization = function(params, callback) {
  var parameters = {
    requiredParams: ['customization_id'],
    options: {
      method: 'POST',
      url: '/v1/customizations/{customization_id}/upgrade_model',
      path: pick(params, ['customization_id']),
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a custom model
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Function} callback
 */
SpeechToTextV1.prototype.deleteCustomization = function(params, callback) {
  var parameters = {
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
 * Add a corpus to a custom model

 Adds a single corpus text file of new training data to the custom language model.

 Submit a plain text file that contains sample sentences from the domain of interest to enable the service to extract words in context. The more sentences you add that represent the context in which speakers use words from the domain, the better the service's recognition accuracy. Adding a corpus does not affect the custom model until you train the model for the new data by using the Train a custom model method.

 Use the following guidelines to prepare a corpus text file:

 * Provide a plain text file that is encoded in UTF-8 if it contains non-ASCII characters. The service assumes UTF-8 encoding if it encounters such characters.
 * Include each sentence of the corpus on its own line, terminating each line with a carriage return. Including multiple sentences on the same line can degrade accuracy.
 * Use consistent capitalization for words in the corpus. The words resource is case-sensitive; mix upper- and lowercase letters and use capitalization only when intended.
 * Beware of typographical errors. The service assumes that typos are new words; unless you correct them before training the model, the service adds them to the model's vocabulary.

 The service automatically does the following:

 * Converts numbers to their equivalent words. For example, 500 becomes five hundred, and 0.15 becomes zero point fifteen.
 * Removes punctuation and special characters:
 * Ignores phrases enclosed in ( ) (parentheses), < > (angle brackets), [ ] (square brackets), and { } (curly braces).
 * Converts tokens that include certain symbols to meaningful strings. For example, the service converts a $ (dollar sign) followed by a number to its string representation. For example, $100 becomes one hundred dollars.

 *
 * @param {Object} params
 * @param {String} params.customization_id - The GUID of the custom language model to which a corpus is to be added. You must make the request with the service credentials of the model's owner.
 * @params {String} params.name - The name of the corpus that is to be added. The name cannot contain spaces and cannot be the string user, which is reserved by the service to denote custom words added or modified by the user.
 * @params {Boolean [parms.allow_overwrite=false] - Indicates whether the specified corpus is to overwrite an existing corpus with the same name. If a corpus with the same name already exists, the request fails unless allow_overwrite is set to true; by default, the parameter is false. The parameter has no effect if a corpus with the same name does not already exist.
 * @param {String|Buffer|ReadStream} [params.corpus] - the text of the corpus - may be provided as a String, a Buffer, or a ReadableStream. A ReadableStream is recommended when reading a file from disk.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.addCorpus = function(params, callback) {

  var parameters = {
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
 * { corpora:
   [ { out_of_vocabulary_words: 0,
       total_words: 233,
       name: 'test_corpus_1',
       status: 'analyzed' },
     { out_of_vocabulary_words: 0,
       total_words: 0,
       name: 'test_corpus_2',
       status: 'being_processed' } ] }
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getCorpora = function(params, callback) {
  var parameters = {
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
 * Delete a corpus
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @params {String} params.name - The name of the corpus that is to be deleted
 * @param {Function} callback
 */
SpeechToTextV1.prototype.deleteCorpus = function(params, callback) {
  var parameters = {
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
 * Waits while a customization status is 'pending' or 'training', fires callback once the status is 'ready' or 'available'
 *
 * Note: the customization will remain in 'pending' status until at least one corpus is added. Calling this on a customization with no corpa will result in an error.
 *
 * See http://www.ibm.com/watson/developercloud/speech-to-text/api/v1/#list_models for status details
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Number} [params.interval=5000] - (milliseconds) - how log to wait between status checks
 * @param {Number} [params.times=30] - maximum number of attempts
 */
SpeechToTextV1.prototype.whenCustomizationReady = function(params, callback) {
  var self = this;

  async.parallel([

    // validate that it has at least one corpus
    function(next) {
      self.getCorpora(params, function(err, res) {
        if (err) {
          return next(err);
        }
        if (!res.corpora.length) {
          err = new Error('Customization has no corpa and therefore will never be ready.');
          err.code = SpeechToTextV1.ERR_NO_CORPORA;
          return next(err)
        }
        next();
      })
    },

    // check the customization status repeatedly until it's ready or avaliable
    function(next) {
      var options = extend({
        interval: 5000,
        times: 30
      }, params);
      options.errorFilter = function(err) {
        // if it's a timeout error, then getCustomization is called again after params.interval
        // otherwise the error is passed back to the user
        // if the params.times limit is reached, the error will be passed to the user regardless
        return err.code === SpeechToTextV1.ERR_TIMEOUT;
      };
      async.retry(options, function(done) {
        self.getCustomization(params, function(err, customization) {
          if (err) {
            done(err);
          } else if (isPending(customization)) {
            // if the loop times out, async returns the last error, which will be this one.
            err = new Error('Customization is still pending, try increasing interval or times params');
            err.code = SpeechToTextV1.ERR_TIMEOUT;
            done(err);
          } else if (customization.status === 'ready' || customization.status === 'available') {
            done(null, customization);
          } else if (customization.status === 'failed') {
            done(new Error('Customization training failed'));
          } else {
            done(new Error('Unexpected customization status: ' + customization.status));
          }
        })
      }, next)
    }

  ], function(err, res) {
    if (err) {
      return callback(err);
    }
    callback(null, res[1]); // callback with the final customization object
  });
};


/**
 * Add multiple custom words
 *
 * Adds one or more custom words to a custom language model.
 * The service populates the words resource for a custom model with out-of-vocabulary (OOV) words found in each corpus added to the model.
 * You can use this method to add additional words or to modify existing words in the words resource.
 * Adding or modifying custom words does not affect the custom model until you train the model for the new data by using the Train a custom model method.
 *
 * You add custom words by providing a Words object, which is an array of Word objects, one per word. You must use the object's word parameter to identify the word that is to be added. You can also provide one or both of the following optional fields for each word:
 *
 * The sounds_like field provides an array of one or more pronunciations for the word. Use the parameter to specify how the word can be pronounced by users.
 *  - Use the parameter for words that are difficult to pronounce, foreign words, acronyms, and so on.
 *  - For example, you might specify that the word IEEE can sound like i triple e.
 *  - You can specify a maximum of five sounds-like pronunciations for a word, and each pronunciation must adhere to the following rules:
 *  - Use English alphabetic characters: a-z and A-Z.
 *  - To pronounce a single letter, use the letter followed by a period, for example, N. C. A. A. for the word NCAA.
 *  - Use real or made-up words that are pronounceable in the native language, for example, shuchensnie for the word Sczcesny.
 *  - Substitute equivalent English letters for non-English letters, for example, s for ç or ny for ñ.
 *  - Substitute non-accented letters for accented letters, for example a for à or e for è.
 *  - Use the spelling of numbers, for example, seventy-five for 75.
 *  - You can include multiple words separated by spaces, but the service enforces a maximum of 40 total characters not including spaces.
 *
 * Yhe display_as field provides an optional different way of spelling the word in a transcript.
 * Use the parameter when you want the word to appear different from its usual representation or from its spelling in corpora training data.
 * For example, you might indicate that the word IBM(trademark) is to be displayed as IBM™.
 *
 * If you add a custom word that already exists in the words resource for the custom model, the new definition overrides the existing data for the word.
 * If the service encounters an error with the input data, it returns a failure code and does not add any of the words to the words resource.
 *
 * The call returns an HTTP 201 response code if the input data is valid.
 * It then asynchronously pre-processes the words to add them to the model's words resource.
 * The time that it takes for the analysis to complete depends on the number of new words that you add but is generally faster than adding a corpus or training a model.
 *
 * You can use the List custom words or List a custom word method to review the words that you add. Words with an invalid sounds_like field include an error field that describes the problem.
 * You can use other words methods to correct errors, eliminate typos, and modify how words are pronounced as needed.

 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {Array<Word>} params.words - Array of objects: [{word: String, sounds_like: [String, ...], display_as: String}, ...]
 * @param {Function} callback
 */
SpeechToTextV1.prototype.addWords = function(params, callback) {
  var parameters = {
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
 * Add a single custom word
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {String} params.word
 * @param {Array<String>} params.sounds_like
 * @param {String} [params.display_as]
 * @param {Function} callback
 */
SpeechToTextV1.prototype.addWord = function(params, callback) {
  var parameters = {
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
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {String} [params.word_type=all] - all|user|corpora - user shows only custom words that were added or modified by the user; corpora shows only OOV that were extracted from corpora.
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getWords = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  var parameters = {
    requiredParams: ['customization_id'],
    options: {
      method: 'GET',
      url: '/v1/customizations/{customization_id}/words',
      path: pick(params, ['customization_id']),
      qs: pick(params, ['language']),
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
 {
    "sounds_like": ["N. C. A. A.","N. C. double A."],
    "display_as": "NCAA",
    "source": ["corpus3","user"]
 }
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {String} params.word
 * @param {Function} callback
 */
SpeechToTextV1.prototype.getWord = function(params, callback) {
  var parameters = {
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
 * Deletes a custom word from a custom language model.
 * You can remove any word that you added to the custom model's words resource via any means.
 * However, if the word also exists in the service's base vocabulary, the service removes only the custom pronunciation for the word; the word remains in the base vocabulary.
 *
 * Removing a custom word does not affect the custom model until you train the model with the Train a custom model method.
 *
 * @param {Object} params
 * @param {String} params.customization_id
 * @param {String} params.word
 * @param {Function} callback
 */
SpeechToTextV1.prototype.deleteWord = function(params, callback) {
  var parameters = {
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
