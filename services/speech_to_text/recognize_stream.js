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


var Duplex         = require('stream').Duplex;
var qs             = require('querystring');
var util           = require('util');
var extend         = require('extend');
var pick           = require('object.pick');
var W3CWebSocket = require('websocket').w3cwebsocket;


var PARAMS_ALLOWED = ['continuous', 'max_alternatives', 'timestamps', 'word_confidence', 'inactivity_timeout',
  'model', 'content-type', 'interim_results', 'keywords', 'keywords_threshold', 'word_alternatives_threshold' ];

/**
 * pipe()-able Node.js Readable/Writeable stream - accepts binary audio and emits text in it's `data` events.
 * Also emits `results` events with interim results and other data.
 *
 * Cannot be instantiated directly, instead reated by calling #createRecognizeStream()
 *
 * Uses WebSockets under the hood. For audio with no recognizable speech, no `data` events are emitted.
 * @param options
 * @constructor
 */
function RecognizeStream(options){
  Duplex.call(this, options);

  var queryParams = extend({model: 'en-US_BroadbandModel'}, pick(options, ['model', 'X-Watson-Learning-Opt-Out', 'watson-token']));

  var openingMessage = extend({
    // todo: confirm the mixed underscores/hyphens and/or get it fixed
    action: 'start',
    'content-type': 'audio/wav', // todo: try to determine content-type from the file extension if available
    'continuous': true,
    'interim_results': true
  }, pick(options, PARAMS_ALLOWED));

  var closingMessage = {action: 'stop'};

  var url = options.base_url.replace(/^http/, 'ws') + '/v1/recognize?' + qs.stringify(queryParams);

  var self = this;

  //node params: requestUrl, protocols, origin, headers, extraRequestOptions
  // browser params: requestUrl, protocols (all others ignored)
  var socket = this.socket = new W3CWebSocket(url, null, null, options.headers, null);

  // when the input stops, let the service know that we're done
  self.on('finish', function() {
    if (self.socket) {
      self.socket.send(JSON.stringify(closingMessage));
    } else {
      this.once('connect', function () {
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

  this.socket.onclose = function(reasonCode, description) {
    self.listening = false;
    self.push(null);
    /**
     * @event RecognizeStream#socket-close
     * @param {Number} reasonCode
     * @param {String} description
     */
    self.emit('socket-close', reasonCode, description);
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

    var data;
    try {
      data = JSON.parse(frame.data);
    } catch (jsonEx) {
      return emitError('Invalid JSON received from service:', frame, jsonEx);
    }

    if (data.error) {
      emitError(data.error, frame);
    } else if (data.state === 'listening') {
      // this is emitted both when the server is ready for audio, and after we send the close message to indicate that it's done processing
      if (!self.listening) {
        self.listening = true;
        self.emit('listening');
      } else {
        self.listening = false;
        socket.close();
      }
    } else if (data.results) {
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
    } else {
      emitError('Unrecognised message from server', frame);
    }
  }

}
util.inherits(RecognizeStream, Duplex);


RecognizeStream.prototype._read = function(size) {
  // there's no easy way to control reads from the underlying library
  // so, the best we can do here is a no-op
};

RecognizeStream.prototype._write = function(chunk, encoding, callback) {
  var self = this;
  if (self.listening) {
    self.socket.send(chunk);
    callback();
  } else {
    this.once('listening', function() {
      self.socket.send(chunk);
      callback();
    });
  }
};


module.exports = RecognizeStream;
