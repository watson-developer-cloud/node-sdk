/**
 * (C) Copyright IBM Corp. 2014, 2019.
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

import extend = require('extend');
import { qs } from 'ibm-cloud-sdk-core';
import pick = require('object.pick');
import { Readable } from 'stream';
import websocket = require ('websocket');

const w3cWebSocket = websocket.w3cwebsocket;

const PAYLOAD_PARAMS_ALLOWED = [
  'text',
  'accept',
  'timings'
];

const QUERY_PARAMS_ALLOWED = [
  'watson-token',
  'voice',
  'customization_id',
  'x-watson-learning-opt-out',
  'x-watson-metadata',
  'access_token'
];

interface SynthesizeStream extends Readable {
  _readableState;
}

/**
 * pipe()-able Node.js Readable stream - accepts text in the constructor and emits binary audio data in its 'message' events
 *
 * Cannot be instantiated directly, instead created by calling #synthesizeUsingWebSocket()
 *
 * Uses WebSockets under the hood.
 * @param {Object} options
 * @constructor
 */
class SynthesizeStream extends Readable {

  static WEBSOCKET_CONNECTION_ERROR: string = 'WebSocket connection error';

  private options;
  private socket;
  private initialized: boolean;


  /**
   * pipe()-able Node.js Readable stream - accepts text and emits binary audio data in its 'message' events
   *
   * Uses WebSockets under the hood.
   *
   *
   * Note that the WebSocket connection is not established until the first chunk of data is recieved. This allows for IAM token request management by the SDK.
   *
   * @param {Object} options
   * @param {String} options.text - The text that us to be synthesized. Provide plain text or text that is annotated with SSML. SSML input can include the SSML <mark> element. Pass a maximum of 5 KB of text.
   * @param {String} options.accept - The requested audio format (MIME type) of the audio.
   * @param {String[]} [options.timings] - An array that specifies whether the service is to return word timing information for all strings of the input text
   * @param {String} [options.voice='en-US_MichaelVoice'] - The voice that is to be used for the synthesis.
   * @param {String} [options.customization_id] - The customization ID (GUID) of a custom voice model that is to be used for the synthesis.
   * @param {String} [options.url='wss://stream.watsonplatform.net/speech-to-text/api'] base URL for service
   * @param {String} [options.watson-token] - Auth token
   * @param {String} [options.access_token] - IAM auth token
   * @param {Object} [options.headers] - Only works in Node.js, not in browsers. Allows for custom headers to be set, including an Authorization header (preventing the need for auth tokens)
   * @param {Boolean} [options.x-watson-learning-opt-out=false] - set to true to opt-out of allowing Watson to use this request to improve it's services
   * @param {String} [options.x-watson-metadata] - Associates a customer ID with data that is passed over the connection.
   * @param {IamTokenManagerV1} [options.token_manager] - Token manager for authenticating with IAM
   * @param {Boolean} [options.rejectUnauthorized] - If true, disable SSL verification for the WebSocket connection
   *
   * @constructor
   */
  constructor(options) {
    super(options);
    this.options = options;
    this.initialized = false;
  }

  initialize() {
    const options = this.options;

    const queryParams = pick(options, QUERY_PARAMS_ALLOWED);
    const queryString = qs.stringify(queryParams);

    const url =
      (options.url || 'wss://stream.watsonplatform.net/text-to-speech/api')
        .replace(/^http/, 'ws') +
        '/v1/synthesize?' +
        queryString;

    const socket = (this.socket = new w3cWebSocket(
      url,
      null,
      null,
      options.headers,
      null,
      { tlsOptions: { rejectUnauthorized: options.rejectUnauthorized }}
    ));

    // use class context within arrow functions
    const self = this;

    socket.onopen = () => {
      const payload = pick(options, PAYLOAD_PARAMS_ALLOWED);
      socket.send(JSON.stringify(payload));
      /**
       * emitted once the WebSocket connection has been established
       * @event SynthesizeStream#open
       */
      self.emit('open');
    };

    socket.onmessage = message => {
      const chunk = message.data;
      // some info messages are sent as strings, telling the content_type and
      // timings. Emit them as separate events, but do not send them along the
      // pipe.
      if (typeof chunk === 'string') {
        try {
          const json = JSON.parse(chunk);
          if (json['binary_streams']) {
            self.emit('binary_streams', message, json);
          }
          else if (json['marks']) {
            self.emit('marks', message, json);
          }
          else if (json['words']) {
            self.emit('words', message, json);
          }
          else if (json['error']) {
            self.emit('error', message, json);
          }
          else if (json['warnings']) {
            self.emit('warnings', message, json);
          }
        }
        finally {
          self.emit('message', message, chunk);
        }
        return;
      }

      /**
       * Emit any messages received over the wire, mainly used for debugging.
       *
       * @event SynthesizeStream#message
       * @param {Object} message - frame object received from service
       * @param {Object} data - a data attribute of the frame that's a Buffer/TypedArray
       */
      const data = Buffer.from(chunk);
      self.emit('message', message, data);
      self.push(data);
    };

    socket.onerror = event => {
      const err = new Error('WebSocket connection error');
      err.name = SynthesizeStream.WEBSOCKET_CONNECTION_ERROR;
      err['event'] = event;
      self.emit('error', err);
      self.push(null);
    };

    socket.onclose = event => {
      self.push(null);
      /**
       * @event SynthesizeStream#close
       * @param {Number} reasonCode
       * @param {String} description
       */
      self.emit('close', event.code, event.reason);
    };

    this.initialized = true;
  }

  _read() {
    // even though we aren't controlling the read from websocket,
    // we can take advantage of the fact that _read is async and hack
    // this funtion to retrieve a token if the service is using IAM auth
    this.setAuthorizationHeaderToken(err => {
      if (err) {
        this.emit('error', err);
        this.push(null);
        return;
      }

      if (!this.initialized) {
        this.initialize();
      }
    });
  }

  /**
   * This function retrieves an IAM access token and stores it in the
   * request header before calling the callback function, which will
   * execute the next iteration of `_read()`
   *
   *
   * @private
   * @param {Function} callback
   */
   setAuthorizationHeaderToken(callback) {
    if (this.options.token_manager) {
      this.options.token_manager.getToken((err, token) => {
        if (err) {
          callback(err);
        }
        const authHeader = { authorization: 'Bearer ' + token };
        this.options.headers = extend(this.options.headers, authHeader);
        callback(null);
      });
    } else {
      callback(null);
    }
  }
}

export = SynthesizeStream;
