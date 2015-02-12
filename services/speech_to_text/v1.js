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

var extend = require('extend');
var requestFactory = require('../../lib/requestwrapper');
var helper = require('../../lib/helper');
var cookie = require('cookie');


function formatChunk(chunk) {
  // Convert the string into an array
  var result = chunk;

  // Check if in the stream doesn't have
  // two results together and parse them
  if (!result || result.indexOf('}{') === -1)
    return JSON.parse(result);

  // Check if we can parse the response
  try{
    result = '[' + result.replace(/}{/g,'},{') + ']';
    result = JSON.parse(result);
    return result[result.lenght-1];
  } catch(e){}

  return result;
}

/**
 * Speech Recognition API Wrapper
 *
 */
function SpeechToText(options) {
  // Default URL
  var default_option = {
    url: 'https://stream.watsonplatform.net/speech-to-text-beta/api'
  };

  // Replace default options with user provided
  this._options = extend(default_option, options);
}


/**
 * Speech recognition for given audio using default model.
 * PCM audio has to be LITTLE-ENDIAN with sample rate described
 * in the Content-type header,
 * e.g. Content-type:'audio/l16;rate=16000'.
 *
 *
 * @param {Audio} [audio] Audio to be recognized.
 * @param {String} [content_type] Content-type
 */
SpeechToText.prototype.recognize = function(params, callback) {

  var missingParams = helper.getMissingParams(params, ['audio','content_type']);
  if (missingParams){
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }

  var parameters = {
    options: {
      method: 'POST',
      url: this._options.url + '/v1/models/WatsonModel/recognize',
      headers: { 'Content-type': params.content_type},
      json: true,
    },
    default_options: this._options
  };
  return params.audio.pipe(requestFactory(parameters, callback));
};

// SpeechToText.prototype.recognize_live = function(params, callback) {
//   var service_url = this.url + util.format('/v1/sessions/%s/recognize',params.session_id);
//   var parts = url.parse(service_url);
//   var options = {
//     rejectUnauthorized: false,
//     agent:false,
//     host: parts.hostname,
//     port: parts.port,
//     path: parts.pathname + (params.continuous ? '?continuous=true' : ''),
//     method: 'POST',
//     headers: {
//       'Authorization': this.auth,
//       'Transfer-Encoding': 'chunked',
//       'Cookie': 'SESSIONID='+params.cookie_session,
//       'Content-type': util.format('audio/l16; rate=%s',params.rate || 48000)
//     }
//   };

//   // Create a request to POST to Watson
//   var recognize_req = https.request(options, function(result) {
//     result.setEncoding('utf-8');
//     result.on('data', function(chunk) {
//       try{
//         chunk = formatChunk(chunk);
//       } catch(e){
//         callback(chunk);
//         return;
//       }
//       callback(null, chunk);
//     });
//   });

//   recognize_req.on('error', function(error) {
//     callback(error);
//   });
//   return recognize_req;
// };

/**
 * Result observer for upcoming or ongoing recognition task in the session.
 * This request has to be started before POST on recognize finishes,
 * otherwise it waits for the next recognition.
 *
 * @param {String} [params.session_id] Session used in the recognition.
 * @param {boolean} [params.interim_results] If true,
 * interim results will be returned. Default: false.
 */
SpeechToText.prototype.observe_result = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: this._options.url + '/v1/sessions/{session}/observeResult',
      qs: {interim_results: params.interim_results},
      json: true,
      headers: { 'Cookie': 'SESSIONID=' + params.cookie_session }
    },
    default_options: this._options
  };
  var req = requestFactory(parameters);

  req.on('data', function(chunk) {
    try {
      chunk = formatChunk(chunk);
    } catch(e) {
      callback(chunk);
      return;
    }
    callback(null, chunk);
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
 */
SpeechToText.prototype.recognize_status = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: this._options.url + '/v1/sessions/{session_id}/recognize',
      path: params,
      json: true
    },
    requiredParams: ['session_id'],
    default_options: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * List of models available.
 *
 */
SpeechToText.prototype.get_models = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: this._options.url + '/v1/models',
      path: params,
      json: true
    },
    default_options: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get information about a model based on the given model_id
 * @param {String} [params.model_id] The desired model
 *
 */
SpeechToText.prototype.get_model = function(params, callback) {
  var parameters = {
    options: {
      method: 'GET',
      url: this._options.url + '/v1/models/{model_id}',
      path: params,
      json: true
    },
    requiredParams: ['model_id'],
    default_options: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Create a session
 * Set-cookie header is returned with a cookie that must be used for
 * each request using this session.
 * The session expires after 15 minutes of inactivity.
 *
 */
SpeechToText.prototype.create_session = function(params, callback) {
  var parameters = {
    options: {
      method: 'POST',
      url: this._options.url + '/v1/sessions',
      path: params,
      json: true
    },
    default_options: this._options
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
SpeechToText.prototype.delete_session = function(params, callback) {
  var parameters = {
    options: {
      method: 'DELETE',
      url: this._options.url + '/v1/sessions/{session_id}',
      path: params,
      json: true
    },
    requiredParams: ['session_id'],
    default_options: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = SpeechToText;