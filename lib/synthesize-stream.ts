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

import extend = require('extend');
import pick = require('object.pick');
import { Readable } from 'stream';
import websocket = require ('websocket');
import qs = require('./querystring');

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
  'x-watson-metadata'
];

interface SynthesizeStream extends Readable {
  _readableState;
}

class SynthesizeStream extends Readable {

  static WEBSOCKET_CONNECTION_ERROR: string = 'WebSocket connection error';

  private options;
  private socket;
  private initialized: boolean;
  private authenticated: boolean;

  constructor(options) {
    super(options);
    this.options = options;
    this.initialized = false;
    this.authenticated = options.token_manager ? false : true;
  }

  initialize() {
    const options = this.options;

    const queryParams = pick(options, QUERY_PARAMS_ALLOWED);
    const queryString = qs.stringify(queryParams);

    const url =
      (options.url || 'wss://stream.watsonplatform.net/text-to-speech/api')
        .replace(/^http/, 'ws') + 
        '/v1/synthesize' +
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
      // some messages are strings - emit those unencoded, but push them to
      // the stream as binary
      const data = typeof chunk === 'string' ? chunk : Buffer.from(chunk);
      /**
       * Emit any messages received over the wire, mainly used for debugging.
       *
       * @event SynthesizeStream#message
       * @param {Object} message - frame object received from service
       * @param {Object} data - a data attribute of the frame that's either a string or a Buffer/TypedArray
       */
      self.emit('message', message, data);
      self.push(Buffer.from(chunk));
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

   setAuthorizationHeaderToken(callback) {
    if (!this.authenticated) {
      this.options.token_manager.getToken((err, token) => {
        if (err) {
          callback(err);
        }
        const authHeader = { authorization: 'Bearer ' + token };
        this.options.headers = extend(authHeader, this.options.headers);
        this.authenticated = true;
        callback(null);
      });
    } else {
      callback(null);
    }
  }
}

export = SynthesizeStream;
