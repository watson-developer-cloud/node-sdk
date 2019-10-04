/**
 * (C) Copyright IBM Corp. 2018, 2019.
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

import { Agent, RequestOptions } from 'http';
import { Authenticator, qs } from 'ibm-cloud-sdk-core';
import { Readable, ReadableOptions } from 'stream';
import { w3cwebsocket as w3cWebSocket } from 'websocket';
import { SynthesizeWebSocketParams } from '../text-to-speech/v1';
import { processUserParameters } from './websocket-utils';


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

  static WEBSOCKET_ERROR: string = 'WebSocket error';
  static WEBSOCKET_CONNECTION_ERROR: string = 'WebSocket connection error';

  private options: SynthesizeStream.Options;
  private authenticator: Authenticator;
  private socket: w3cWebSocket;
  private initialized: boolean;


  /**
   * pipe()-able Node.js Readable stream - accepts text and emits binary audio data in its 'message' events
   *
   * Uses WebSockets under the hood.
   *
   *
   * Note that the WebSocket connection is not established until the first chunk of data is recieved. This allows for IAM token request management by the SDK.
   *
   * @param {Options} options
   * @param {Authenticator} options.authenticator - Authenticator to add Authorization header
   * @param {string} [options.url] - Base url for service (default='wss://stream.watsonplatform.net/speech-to-text/api')
   * @param {OutgoingHttpHeaders} [options.headers] - Only works in Node.js, not in browsers. Allows for custom headers to be set, including an Authorization header (preventing the need for auth tokens)
   * @param {boolean} [options.disableSslVerification] - If true, disable SSL verification for the WebSocket connection (default=false)
   * @param {Agent} [options.agent] - custom http(s) agent, useful for using the sdk behind a proxy (Node only)
   * @param {string} options.text - The text that us to be synthesized
   * @param {string} options.accept - The requested format (MIME type) of the audio
   * @param {string[]} [options.timings] - An array that specifies whether the service is to return word timing information for all strings of the input text
   * @param {string} [options.accessToken] - Bearer token to put in query string
   * @param {string} [options.watsonToken] - Valid Watson authentication token (for Cloud Foundry)
   * @param {string} [options.voice] - The voice to use for the synthesis (default='en-US_MichaelVoice')
   * @param {string} [options.customizationId] - The customization ID (GUID) of a custom voice model that is to be used for the synthesis
   * @param {boolean} [options.xWatsonLearningOptOut] - Indicates whether IBM can use data that is sent over the connection to improve the service for future users (default=false)
   * @param {string} [options.xWatsonMetadata] - Associates a customer ID with all data that is passed over the connection. The parameter accepts the argument customer_id={id}, where {id} is a random or generic string that is to be associated with the data
   * @constructor
   */
  constructor(options: SynthesizeStream.Options) {
    super(options);
    this.options = options;
    this.initialized = false;
    this.authenticator = options.authenticator;
  }

  initialize() {
    const options = this.options;

    // process query params
    const queryParamsAllowed = [
      'access_token',
      'watson-token',
      'voice',
      'customization_id',
      'x-watson-learning-opt-out',
      'x-watson-metadata',
    ];
    const queryParams = processUserParameters(options, queryParamsAllowed);
    const queryString = qs.stringify(queryParams);

    // synthesize the url
    const url =
      (options.url || 'wss://stream.watsonplatform.net/text-to-speech/api')
        .replace(/^http/, 'ws') +
        '/v1/synthesize?' +
        queryString;

    // add custom agent in the request options if given by user
    // default request options to null
    const { agent } = options;
    const requestOptions: RequestOptions = agent ? { agent } : null;

    const socket = (this.socket = new w3cWebSocket(
      url,
      null,
      null,
      options.headers,
      requestOptions,
      { tlsOptions: { rejectUnauthorized: !options.disableSslVerification }}
    ));

    // use class context within arrow functions
    const self = this;

    socket.onopen = () => {
      // process the payload params
      const payloadParamsAllowed = [
        'text',
        'accept',
        'timings',
      ];
      const payload = processUserParameters(options, payloadParamsAllowed);
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
            // this should have same structure as onerror emit
            const err = new Error(json['error']);
            err.name = SynthesizeStream.WEBSOCKET_ERROR;
            err['event'] = message;
            self.emit('error', err);
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
    this.authenticator.authenticate(this.options).then(
      () => {
        if (!this.initialized) {
          this.initialize();
        }
      },
      err => {
        this.emit('error', err);
        this.push(null);
      }
    );
  }
}

namespace SynthesizeStream {
  // these options represent the superset of the base params,
  // query params, and opening message params, with the keys
  // in lowerCamelCase format so we can expose a consistent style
  // to the user. this object should be updated any time either
  // payloadParamsAllowed or queryParamsAllowed is changed
  export interface Options extends ReadableOptions, SynthesizeWebSocketParams {
    /* base options */
    authenticator: Authenticator;
    url?: string;
    disableSslVerification?: boolean;
    agent?: Agent;
  }
}

export = SynthesizeStream;
