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

const Duplex = require('stream').Duplex;
const util = require('util');
const extend = require('extend');
const pick = require('object.pick');
const W3CWebSocket = require('websocket').w3cwebsocket;

const OPENING_MESSAGE_PARAMS_ALLOWED = [
  'continuous',
  'max_alternatives',
  'timestamps',
  'word_confidence',
  'inactivity_timeout',
  'content-type',
  'interim_results',
  'keywords',
  'keywords_threshold',
  'word_alternatives_threshold',
  'profanity_filter',
  'smart_formatting',
  'speaker_labels'
];

const QUERY_PARAMS_ALLOWED = ['model', 'X-Watson-Learning-Opt-Out', 'watson-token', 'customization_id'];

/**
 * pipe()-able Node.js Readable/Writeable stream - accepts binary audio and emits text in it's `data` events.
 * Also emits `results` events with interim results and other data.
 *
 * Cannot be instantiated directly, instead reated by calling #createRecognizeStream()
 *
 * Uses WebSockets under the hood. For audio with no recognizable speech, no `data` events are emitted.
 * @param {Object} options
 * @constructor
 */
function RecognizeStream(options) {
  Duplex.call(this, options);
  this.options = options;
  this.listening = false;
  this.initialized = false;
}
util.inherits(RecognizeStream, Duplex);

RecognizeStream.prototype.initialize = function() {
  const options = this.options;

  // todo: apply these corrections to other methods (?)
  if (options.token && !options['watson-token']) {
    options['watson-token'] = options.token;
  }
  if (options.content_type && !options['content-type']) {
    options['content-type'] = options.content_type;
  }
  if (options['X-WDC-PL-OPT-OUT'] && !options['X-Watson-Learning-Opt-Out']) {
    options['X-Watson-Learning-Opt-Out'] = options['X-WDC-PL-OPT-OUT'];
  }

  const queryParams = extend({ model: 'en-US_BroadbandModel' }, pick(options, QUERY_PARAMS_ALLOWED));
  const queryString = Object.keys(queryParams)
    .map(function(key) {
      return key + '=' + (key === 'watson-token' ? queryParams[key] : encodeURIComponent(queryParams[key])); // our server chokes if the token is correctly url-encoded
    })
    .join('&');

  const url = (options.url || 'wss://stream.watsonplatform.net/speech-to-text/api').replace(/^http/, 'ws') + '/v1/recognize?' + queryString;

  const openingMessage = extend(
    {
      action: 'start',
      'content-type': 'audio/wav',
      continuous: true,
      interim_results: true,
      word_confidence: true,
      timestamps: true,
      max_alternatives: 3,
      inactivity_timeout: 600
    },
    pick(options, OPENING_MESSAGE_PARAMS_ALLOWED)
  );

  const closingMessage = { action: 'stop' };

  const self = this;

  // node params: requestUrl, protocols, origin, headers, extraRequestOptions
  // browser params: requestUrl, protocols (all others ignored)
  const socket = (this.socket = new W3CWebSocket(url, null, null, options.headers, null));

  // when the input stops, let the service know that we're done
  self.on('finish', function() {
    if (self.socket && self.socket.readyState === W3CWebSocket.OPEN) {
      self.socket.send(JSON.stringify(closingMessage));
    } else {
      self.once('connect', function() {
        self.socket.send(JSON.stringify(closingMessage));
      });
    }
  });

  socket.onerror = function(error) {
    self.listening = false;
    self.emit('error', error);
  };

  this.socket.onopen = function() {
    socket.send(JSON.stringify(openingMessage));
    self.emit('connect');
  };

  this.socket.onclose = function(e) {
    self.listening = false;
    self.push(null);
    /**
     * @event RecognizeStream#close
     * @param {Number} reasonCode
     * @param {String} description
     */
    self.emit('close', e.code, e.reason);
  };

  /**
   * @event RecognizeStream#error
   */
  function emitError(msg, frame, err) {
    if (err) {
      err.message = msg + ' ' + err.message;
    } else {
      err = new Error(msg);
    }
    err.raw = frame;
    self.emit('error', err);
  }

  socket.onmessage = function(frame) {
    if (typeof frame.data !== 'string') {
      return emitError('Unexpected binary data received from server', frame);
    }

    let data;
    try {
      data = JSON.parse(frame.data);
    } catch (jsonEx) {
      return emitError('Invalid JSON received from service:', frame, jsonEx);
    }

    let recognized = false;
    if (data.error) {
      emitError(data.error, frame);
      recognized = true;
    }

    if (data.state === 'listening') {
      // this is emitted both when the server is ready for audio, and after we send the close message to indicate that it's done processing
      if (!self.listening) {
        self.listening = true;
        self.emit('listening');
      } else {
        self.listening = false;
        socket.close();
      }
      recognized = true;
    }

    if (data.results) {
      /**
       * Object with interim or final results, including possible alternatives. May have no results at all for empty audio files.
       * @event RecognizeStream#results
       * @param {Object} results
       */
      self.emit('results', data);
      // note: currently there is always either no entries or exactly 1 entry in the results array. However, this may change in the future.
      if (data.results[0] && data.results[0].final && data.results[0].alternatives) {
        /**
         * Finalized text
         * @event RecognizeStream#data
         * @param {String} transcript
         */
        self.push(data.results[0].alternatives[0].transcript, 'utf8'); // this is the "data" event that can be easily piped to other streams
      }
      recognized = true;
    }

    // note: some messages will have both results and speaker_labels
    // this will cause them to be emitted twice - once for each event
    if (data.speaker_labels) {
      /**
       * Speaker labels
       * @event RecognizeStream#speaker_labels
       * @param {Object} speaker_labels
       */
      self.emit('speaker_labels', data);
      recognized = true;
    }

    if (!recognized) {
      emitError('Unrecognised message from server', frame);
    }
  };

  this.initialized = true;
};

RecognizeStream.prototype._read = function() /* size*/ {
  // there's no easy way to control reads from the underlying library
  // so, the best we can do here is a no-op
};

RecognizeStream.prototype._write = function(chunk, encoding, callback) {
  const self = this;
  if (self.listening) {
    self.socket.send(chunk);
    this.afterSend(callback);
  } else {
    if (!this.initialized) {
      if (!this.options['content-type']) {
        this.options['content-type'] = RecognizeStream.getContentType(chunk);
      }
      this.initialize();
    }
    this.once('listening', function() {
      self.socket.send(chunk);
      self.afterSend(callback);
    });
  }
};

// flow control - don't ask for more data until we've finished what we have
// todo: see if this can be improved
RecognizeStream.prototype.afterSend = function afterSend(next) {
  // note: bufferedAmount is currently always 0
  // see https://github.com/theturtle32/WebSocket-Node/issues/243
  if (this.socket.bufferedAmount <= (this._writableState.highWaterMark || 0)) {
    process.nextTick(next);
  } else {
    setTimeout(this.afterSend.bind(this, next), 10);
  }
};

RecognizeStream.prototype.stop = function() {
  this.emit('stopping');
  this.listening = false;
  this.socket.close();
};

/**
 * Returns a Promise that resolves with Watson Transaction ID from the X-Transaction-ID header
 *
 * Works in Node.js but not in browsers (the W3C WebSocket API does not expose headers)
 *
 * @return Promise<String>
 */
RecognizeStream.prototype.getTransactionId = function() {
  if (this.socket && this.socket._client && this.socket._client.response && this.socket._client.response.headers) {
    return Promise.resolve(this.socket._client.response.headers['x-global-transaction-id']);
  } else {
    return new Promise((resolve, reject) => {
      this.on('connect', () => {
        resolve(this.socket._client.response.headers['x-global-transaction-id']);
      });
      this.on('error', reject);
    });
  }
};

// quick/dumb way to determine content type from a supported file format
const headerToContentType = {
  fLaC: 'audio/flac',
  RIFF: 'audio/wav',
  OggS: 'audio/ogg',
  '\u001aEߣ': 'audio/webm' // String for first four hex's of webm: [1A][45][DF][A3] (https://www.matroska.org/technical/specs/index.html#EBML)
};

RecognizeStream.getContentType = function(buffer) {
  const header = buffer.slice(0, 4).toString();
  return headerToContentType[header];
};

module.exports = RecognizeStream;
