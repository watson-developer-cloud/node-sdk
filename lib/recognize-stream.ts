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
 * limitations under the License
 */

import { Duplex } from 'stream';
import extend = require('extend');
import pick = require('object.pick');
import omit = require('object.omit');
import contentType = require('./content-type');
import qs = require('./querystring');
const W3CWebSocket = require('websocket').w3cwebsocket;

const OPENING_MESSAGE_PARAMS_ALLOWED = [
  'inactivity_timeout',
  'timestamps',
  'word_confidence',
  'content-type',
  'interim_results',
  'keywords',
  'keywords_threshold',
  'max_alternatives',
  'word_alternatives_threshold',
  'profanity_filter',
  'smart_formatting',
  'speaker_labels'
];

const QUERY_PARAMS_ALLOWED = [
  'model',
  'X-Watson-Learning-Opt-Out',
  'watson-token',
  'customization_id'
];

interface RecognizeStream extends Duplex {
  _writableState;
  readableObjectMode;
}

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
class RecognizeStream extends Duplex {
  private options;
  private listening: boolean;
  private initialized: boolean;
  private finished: boolean;
  private socket;
  static WEBSOCKET_CONNECTION_ERROR: string = 'WebSocket connection error';
  static ERROR_UNRECOGNIZED_FORMAT: string = 'UNRECOGNIZED_FORMAT';
  private promise = require('./to-promise');

  /**
   * pipe()-able Node.js Duplex stream - accepts binary audio and emits text/objects in it's `data` events.
   *
   * Uses WebSockets under the hood. For audio with no recognizable speech, no `data` events are emitted.
   *
   * By default, only finalized text is emitted in the data events, however when `objectMode`/`readableObjectMode` and `interim_results` are enabled, both interim and final results objects are emitted.
   * WriteableElementStream uses this, for example, to live-update the DOM with word-by-word transcriptions.
   *
   * Note that the WebSocket connection is not established until the first chunk of data is recieved. This allows for auto-detection of content type (for wav/flac/opus audio).
   *
   * @param {Object} options
   * @param {String} [options.model='en-US_BroadbandModel'] - voice model to use. Microphone streaming only supports broadband models.
   * @param {String} [options.url='wss://stream.watsonplatform.net/speech-to-text/api'] base URL for service
   * @param {String} [options.token] - Auth token
   * @param {Object} [options.headers] - Only works in Node.js, not in browsers. Allows for custom headers to be set, including an Authorization header (preventing the need for auth tokens)
   * @param {String} [options.content-type='audio/wav'] - content type of audio; can be automatically determined from file header in most cases. only wav, flac, ogg/opus, and webm are supported
   * @param {Boolean} [options.interim_results=true] - Send back non-final previews of each "sentence" as it is being processed. These results are ignored in text mode.
   * @param {Boolean} [options.word_confidence=false] - include confidence scores with results. Defaults to true when in objectMode.
   * @param {Boolean} [options.timestamps=false] - include timestamps with results. Defaults to true when in objectMode.
   * @param {Number} [options.max_alternatives=1] - maximum number of alternative transcriptions to include. Defaults to 3 when in objectMode.
   * @param {Array<String>} [options.keywords] - a list of keywords to search for in the audio
   * @param {Number} [options.keywords_threshold] - Number between 0 and 1 representing the minimum confidence before including a keyword in the results. Required when options.keywords is set
   * @param {Number} [options.word_alternatives_threshold] - Number between 0 and 1 representing the minimum confidence before including an alternative word in the results. Must be set to enable word alternatives,
   * @param {Boolean} [options.profanity_filter=false] - set to true to filter out profanity and replace the words with *'s
   * @param {Number} [options.inactivity_timeout=30] - how many seconds of silence before automatically closing the stream. use -1 for infinity
   * @param {Boolean} [options.readableObjectMode=false] - emit `result` objects instead of string Buffers for the `data` events. Does not affect input (which must be binary)
   * @param {Boolean} [options.objectMode=false] - alias for options.readableObjectMode
   * @param {Number} [options.X-Watson-Learning-Opt-Out=false] - set to true to opt-out of allowing Watson to use this request to improve it's services
   * @param {Boolean} [options.smart_formatting=false] - formats numeric values such as dates, times, currency, etc.
   * @param {String} [options.customization_id] - Customization ID
   *
   * @constructor
   */
  constructor(options) {
    // this stream only supports objectMode on the output side.
    // It must receive binary data input.
    super(options);
    if (options.objectMode) {
      options.readableObjectMode = true;
      this.readableObjectMode = true;
      delete options.objectMode;
    }
    this.options = options;
    this.listening = false;
    this.initialized = false;
    this.finished = false;
    this.on('newListener', event => {
      if (!options.silent) {
        if (
          event === 'results' ||
          event === 'result' ||
          event === 'speaker_labels'
        ) {
          // eslint-disable-next-line no-console
          console.log(
            new Error(
              'Watson Speech to Text RecognizeStream: the ' +
                event +
                ' event was deprecated. ' +
                "Please set {objectMode: true} and listen for the 'data' event instead. " +
                'Pass {silent: true} to disable this message.'
            )
          );
        } else if (event === 'connection-close') {
          // eslint-disable-next-line no-console
          console.log(
            new Error(
              'Watson Speech to Text RecognizeStream: the ' +
                event +
                ' event was deprecated. ' +
                "Please listen for the 'close' event instead. " +
                'Pass {silent: true} to disable this message.'
            )
          );
        } else if (event === 'connect') {
          // eslint-disable-next-line no-console
          console.log(
            new Error(
              'Watson Speech to Text RecognizeStream: the ' +
                event +
                ' event was deprecated. ' +
                "Please listen for the 'open' event instead. " +
                'Pass {silent: true} to disable this message.'
            )
          );
        }
      }
    });
  }

  initialize() {
    const options = this.options;

    if (options.token && !options['watson-token']) {
      options['watson-token'] = options.token;
    }
    if (options.content_type && !options['content-type']) {
      options['content-type'] = options.content_type;
    }
    if (options['X-WDC-PL-OPT-OUT'] && !options['X-Watson-Learning-Opt-Out']) {
      options['X-Watson-Learning-Opt-Out'] = options['X-WDC-PL-OPT-OUT'];
    }

    const queryParams = extend(
      'customization_id' in options
        ? pick(options, QUERY_PARAMS_ALLOWED)
        : { model: 'en-US_BroadbandModel' },
      pick(options, QUERY_PARAMS_ALLOWED)
    );

    const queryString = qs.stringify(queryParams);
    const url =
      (options.url || 'wss://stream.watsonplatform.net/speech-to-text/api'
      ).replace(/^http/, 'ws') +
      '/v1/recognize?' +
      queryString;

    const openingMessage = pick(options, OPENING_MESSAGE_PARAMS_ALLOWED);
    openingMessage.action = 'start';

    const self = this;

    // node params: requestUrl, protocols, origin, headers, extraRequestOptions
    // browser params: requestUrl, protocols (all others ignored)
    const socket = (this.socket = new W3CWebSocket(
      url,
      null,
      null,
      options.headers,
      null
    ));

    // when the input stops, let the service know that we're done
    self.on('finish', self.finish.bind(self));

    /**
     * This can happen if the credentials are invalid - in that case, the response from DataPower doesn't include the
     * necessary CORS headers, so JS can't even read it :(
     *
     * @param {Event} event - event object with essentially no useful information
     */
    socket.onerror = function(event) {
      self.listening = false;
      const err = new Error('WebSocket connection error');
      err.name = RecognizeStream.WEBSOCKET_CONNECTION_ERROR;
      err['event'] = event;
      self.emit('error', err);
      self.push(null);
    };

    this.socket.onopen = function() {
      self.sendJSON(openingMessage);
      /**
       * emitted once the WebSocket connection has been established
       * @event RecognizeStream#open
       */
      self.emit('open');
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
     * @param {String} msg custom error message
     * @param {*} [frame] unprocessed frame (should have a .data property with either string or binary data)
     * @param {Error} [err]
     */
    function emitError(msg, frame, err?) {
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

      /**
       * Emit any messages received over the wire, mainly used for debugging.
       *
       * @event RecognizeStream#message
       * @param {Object} message - frame object with a data attribute that's either a string or a Buffer/TypedArray
       * @param {Object} [data] - parsed JSON object (if possible);
       */
      self.emit('message', frame, data);

      if (data.error) {
        emitError(data.error, frame);
      } else if (data.state === 'listening') {
        // this is emitted both when the server is ready for audio, and after we send the close message to indicate that it's done processing
        if (self.listening) {
          self.listening = false;
          socket.close();
        } else {
          self.listening = true;
          /**
           * Emitted when the Watson Service indicates readiness to transcribe audio. Any audio sent before this point will be buffered until now.
           * @event RecognizeStream#listening
           */
          self.emit('listening');
        }
      } else {
        if (options.readableObjectMode) {
          /**
             * Object with interim or final results, possibly including confidence scores, alternatives, and word timing.
             * @event RecognizeStream#data
             * @param {Object} data
             */
          self.push(data);
        } else if (Array.isArray(data.results)) {
          data.results.forEach(function(result) {
            if (result.final && result.alternatives) {
              /**
                 * Finalized text
                 * @event RecognizeStream#data
                 * @param {String} transcript
                 */
              self.push(result.alternatives[0].transcript, 'utf8');
            }
          });
        }
      }
    };

    this.initialized = true;
  }

  sendJSON(msg): void {
    /**
     * Emits any JSON object sent to the service from the client. Mainly used for debugging.
     * @event RecognizeStream#send-json
     * @param {Object} msg
     */
    this.emit('send-json', msg);
    return this.socket.send(JSON.stringify(msg));
  }

  sendData(data): void {
    /**
     * Emits any Binary object sent to the service from the client. Mainly used for debugging.
     * @event RecognizeStream#send-data
     * @param {Object} msg
     */
    this.emit('send-data', data);
    return this.socket.send(data);
  }

  /**
   * Flow control - don't ask for more data until we've finished what we have
   *
   * Notes:
   *
   * This limits upload speed to 100 * options.highWaterMark / second.
   *
   * The default highWaterMark is 16kB, so the default max upload speed is ~1.6MB/s.
   *
   * Microphone input provides audio at a (downsampled) rate of:
   *   16000 samples/s * 16-bits * 1 channel = 32kB/s
   * (note the bits to Bytes conversion there)
   *
   * @private
   * @param {Function} next
   */
  afterSend(next): void {
    if (
      this.socket.bufferedAmount <= (this._writableState.highWaterMark || 0)
    ) {
      process.nextTick(next);
    } else {
      setTimeout(this.afterSend.bind(this, next), 10);
    }
  }

  /**
   * Prevents any more audio from being sent over the WebSocket and gracefully closes the connection.
   * Additional data may still be emitted up until the `end` event is triggered.
   */
  stop(): void {
    /**
     * Event emitted when the stop method is called. Mainly for synchronising with file reading and playback.
     * @event RecognizeStream#stop
     */
    this.emit('stop');
    this.finish();
  }

  _read(): void /* size*/ {
    // there's no easy way to control reads from the underlying library
    // so, the best we can do here is a no-op
  }

  _write(chunk, encoding, callback): void {
    const self = this;
    if (self.finished) {
      // can't send any more data after the stop message (although this shouldn't happen normally...)
      return;
    }
    if (!this.initialized) {
      if (!this.options['content-type']) {
        const ct = RecognizeStream.getContentType(chunk);
        if (ct) {
          this.options['content-type'] = ct;
        } else {
          const err = new Error(
            'Unable to determine content-type from file header, please specify manually.'
          );
          err.name = RecognizeStream.ERROR_UNRECOGNIZED_FORMAT;
          this.emit('error', err);
          this.push(null);
          return;
        }
      }
      this.initialize();

      this.once('open', function() {
        self.sendData(chunk);
        self.afterSend(callback);
      });
    } else {
      self.sendData(chunk);
      this.afterSend(callback);
    }
  }

  finish(): void {
    // this is called both when the source stream finishes, and when .stop() is fired, but we only want to send the stop message once.
    if (this.finished) {
      return;
    }
    this.finished = true;
    const self = this;
    const closingMessage = { action: 'stop' };
    if (self.socket && self.socket.readyState === self.socket.OPEN) {
      self.sendJSON(closingMessage);
    } else {
      this.once('open', function() {
        self.sendJSON(closingMessage);
      });
    }
  }

  /**
   * Returns a Promise that resolves with Watson Transaction ID from the X-Transaction-ID header
   *
   * Works in Node.js but not in browsers (the W3C WebSocket API does not expose headers)
   *
   * @return Promise<String>
   */
  getTransactionId(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (
        this.socket &&
        this.socket._client &&
        this.socket._client.response &&
        this.socket._client.response.headers
      ) {
        resolve(
          this.socket._client.response.headers['x-global-transaction-id']
        );
      } else {
        this.on('connect', () =>
          resolve(
            this.socket._client.response.headers['x-global-transaction-id']
          )
        );
        this.on('error', reject);
      }
    });
  }

  static getContentType(buffer: Buffer): string {
    // the substr really shouldn't be necessary, but there's a bug somewhere that can cause buffer.slice(0,4) to return
    // the entire contents of the buffer, so it's a failsafe to catch that
    return contentType.fromHeader(buffer);
  }
}

export = RecognizeStream;
