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
var helper         = require('../../lib/helper');
var cookie         = require('cookie');
var pick           = require('object.pick');
var url            = require('url');
var https          = require('https');
var http           = require('http');
var isStream       = require('isstream');
var requestFactory = require('../../lib/requestwrapper');
var qs             = require('querystring');
var Duplex         = require('stream').Duplex;
var util           = require('util');
var WebSocketClient = require('websocket').client;
var pkg         = require('../../package.json');

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
  } catch (e) {}

  return result;
}

/**
 * Speech Recognition API Wrapper
 *
 */
function SpeechToText(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://stream.watsonplatform.net/speech-to-text/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}
/**
 * Replaces recognizeLive & friends with a single 2-way stream over websockets
 * @param params
 * @param callback
 * @returns {*}
 */
SpeechToText.prototype.recognizeWs = function(params, callback) {

  var missingParams = helper.getMissingParams(params, ['audio', 'content_type']);
  if (missingParams) {
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }
  if (!isStream(params.audio)) {
    callback(new Error('audio is not a standard Node.js Stream'));
    return;
  }

  var queryParams = pick(params, ['continuous', 'max_alternatives', 'timestamps',
    'word_confidence','inactivity_timeout', 'model']);

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
 * Speech recognition for given audio using default model.
 *
 * @param {Audio} [audio] Audio to be recognized.
 * @param {String} [content_type] Content-type
 */
SpeechToText.prototype.recognize = function(params, callback) {

  var missingParams = helper.getMissingParams(params, ['audio', 'content_type']);
  if (missingParams) {
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }
  if (!isStream(params.audio)) {
    callback(new Error('audio is not a standard Node.js Stream'));
    return;
  }

  var queryParams = pick(params, ['continuous', 'max_alternatives', 'timestamps',
    'word_confidence','inactivity_timeout', 'model']);

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
 */
SpeechToText.prototype.recognizeLive = function(params, callback) {
  var missingParams = helper.getMissingParams(params,
    ['session_id', 'content_type', 'cookie_session']);

  if (missingParams) {
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }

  var serviceUrl = [this._options.url, '/v1/sessions/', params.session_id, '/recognize'].join('');
  var parts = url.parse(serviceUrl);
  var options = {
    agent: false,
    host: parts.hostname,
    port: parts.port,
    path: parts.pathname + (params.continuous == true ? '?continuous=true' : ''),
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + this._options.api_key,
      'Transfer-Encoding': 'chunked',
      'cookie': 'SESSIONID=' + params.cookie_session,
      'Content-type': params.content_type
    }
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
 * @param {boolean} [params.interim_results] If true,
 * interim results will be returned. Default: false.
 */
SpeechToText.prototype.observeResult = function(params, callback) {
  var missingParams = helper.getMissingParams(params, ['session_id', 'cookie_session']);
  if (missingParams) {
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }
  var serviceUrl = [this._options.url, '/v1/sessions/',
    params.session_id, '/observeResult'].join('');
  var parts = url.parse(serviceUrl);
  var options = {
    agent: false,
    host: parts.hostname,
    port: parts.port,
    path: parts.pathname + (params.interim_results == true ? '?interim_results=true' : ''),
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + this._options.api_key,
      'cookie': 'SESSIONID=' + params.cookie_session,
      'Accept': 'application/json'
    }
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
 */
SpeechToText.prototype.getRecognizeStatus = function(params, callback) {
  var missingParams = helper.getMissingParams(params, ['session_id']);
  if (missingParams) {
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
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
SpeechToText.prototype.getModels = function(params, callback) {
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
SpeechToText.prototype.getModel = function(params, callback) {
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
SpeechToText.prototype.createSession = function(params, callback) {
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
SpeechToText.prototype.deleteSession = function(params, callback) {
  var missingParams = helper.getMissingParams(params, ['session_id']);
  if (missingParams) {
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
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


function RecognizeStream(options){
  Duplex.call(this, extend(options, { readableObjectMode : true }));

  var queryParams = pick(options, ['continuous', 'max_alternatives', 'timestamps',
    'word_confidence','inactivity_timeout', 'model', 'X-WDC-PL-OPT-OUT', 'watson-token']);

  var token = options.token;
  queryParams.model = options.model || 'en-US_BroadbandModel';
  var openingMessage = {action: 'start'};
  var closingMessage = {action: 'stop'};

  var url = options.base_url.replace(/^http/, 'ws') + '/v1/recognize?' + qs.stringify(queryParams);
  console.log('url', url);

  //requestUrl, protocols, origin, headers, extraRequestOptions
  var client = this.client = new WebSocketClient(url, null, null, options.headers, null);
  var self = this;

  self.on('finish', function() {
    if (self.connection) {
      console.log('sending closing message');
      self.connection.sendUTF(JSON.stringify(closingMessage));
    } else {
      this.once('connect', function () {
        console.log('sending delayed closing message');
        self.connection.sendUTF(JSON.stringify(closingMessage));
      });
    }
  });

  this.client.on('connectFailed', function(error) {
    console.log("Connection Error: ", error);
    self.emit('error', error);
  });
  this.listening = false;
  this.client.on('connect', function(connection) {
    self.connection = connection;
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
      console.log("Connection Error: ", error);
      self.listening = false;
      self.emit('error', error);
    });
    connection.on('close', function(reasonCode, description) {
      // reasonCode 1006 means invalid auth - get a new token
      console.log('echo-protocol Connection Closed', reasonCode, description);
      self.listening = false;
      self.push('null');
    });
    connection.on('message', function(envelope) {
      if (envelope.type === 'utf8') {
        console.log("Received: '" + envelope.utf8Data + "'");
        try {
          var msg = JSON.parse(envelope.utf8Data);
          if (msg.error) {
            var err = new Error(msg.error);
            err.raw = msg;
            self.emit('error', err);
          } else {
            if(msg.state == 'listening') {
              self.listening = true;
              self.emit('listening');
            } else {
              self.push(msg);
            }
          }
        } catch (jsonEx) {
          jsonEx.message = 'Invalid JSON recieved from service: ' +jsonEx.message;
          jsonEx.raw = envelope;
          console.log(envelope);
          self.emit('error', jsonEx);
        }
      } else {
        var binaryErr = new Error('Unexpected binary data received from server');
        binaryErr.raw = envelope;
        self.emit('error', binaryErr);
      }

    });
    connection.sendUTF(JSON.stringify(openingMessage));
    self.emit('connect', connection);
  });
  client.connect(url);
}
util.inherits(RecognizeStream, Duplex);


RecognizeStream.prototype._read = function(size) {
  // because the underlying websocket library doesn't behave like a node.js stream, there's no easy way to control reads
  // so, the best we can do here is a no-op
};

RecognizeStream.prototype._write = function(chunk, encoding, callback) {
  var self = this;
  if (this.listening) {
    console.log('sending chunk', chunk == null || chunk.length);
    this.connection.sendBytes(chunk, callback);
  } else {
    console.log('buffering chunk');
    this.once('listening', function() {
      console.log('sending buffered chunk');
      self.connection.sendBytes(chunk, callback);
    });
  }
};

/**
 * Replaces recognizeLive & friends with a single 2-way stream over websockets
 * @param params
 * @param callback
 * @returns {*}
 */
SpeechToText.prototype.createRecognizeStream = function(params) {

  // todo: validate params
  params.base_url = params.base_url || this._options.url;

  params.headers = extend({
    'User-Agent': pkg.name + '-nodejs-'+ pkg.version,
    //Authorization:  'Basic ' + this._options.api_key // todo: figure out why this isn't working
  }, params.headers);

  console.log(params.headers);

  return new RecognizeStream(params);

};

// set up a clear error message for the deprecated methods
['recognizeLive', 'observeResult', 'getRecognizeStatus', 'createSession', 'deleteSession'].forEach(function(name) {
  SpeechToText.prototype[name] = function deprecated() {
    throw new Error('IBM Watson Speech to Text no longer supports the ' + name + '() method, please use createRecognizeStream() instead.');
  };
});

module.exports = SpeechToText;
