/**
 * Copyright 2019 IBM All Rights Reserved.
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

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { BaseService, getMissingParams } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM Watson&trade; Assistant service combines machine learning, natural language understanding, and an integrated dialog editor to create conversation flows between your apps and your users.
 */

class AssistantV2 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/assistant/api';
  name: string; // set by prototype to 'conversation'
  serviceVersion: string; // set by prototype to 'v2'

  /**
   * Construct a AssistantV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/assistant/api'). The base url may differ between IBM Cloud regions.
   * @param {string} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of IBM Cloud. When running on IBM Cloud, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of IBM Cloud. When running on IBM Cloud, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.iam_access_token] - An IAM access token fully managed by the application. Responsibility falls on the application to refresh the token, either before it expires or reactively upon receiving a 401 from the service, as any requests made with an expired token will fail.
   * @param {string} [options.iam_apikey] - An API key that can be used to request IAM tokens. If this API key is provided, the SDK will manage the token and handle the refreshing.
   * @param {string} [options.iam_url] - An optional URL for the IAM service API. Defaults to 'https://iam.cloud.ibm.com/identity/token'.
   * @param {string} [options.iam_client_id] - client id (username) for request to iam service
   * @param {string} [options.iam_client_secret] - client secret (password) for request to iam service
   * @param {string} [options.icp4d_access_token] - icp for data access token provided and managed by user
   * @param {string} [options.icp4d_url] - icp for data base url - used for authentication
   * @param {string} [options.authentication_type] - authentication pattern to be used. can be iam, basic, or icp4d
   * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This
   * option may be useful for requests that are proxied.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By
   * default, all IBM Watson services log requests and their results. Logging is done only to improve the services for
   * future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of
   * users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {AssistantV2}
   * @throws {Error}
   */
  constructor(options: AssistantV2.Options) {
    super(options);
    // check if 'version' was provided
    if (typeof this._options.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this._options.qs.version = options.version;
  }

  /*************************
   * sessions
   ************************/

  /**
   * Create a session.
   *
   * Create a new session. A session is used to send user input to a skill and receive responses. It also maintains the
   * state of the conversation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assistant_id - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createSession(params: AssistantV2.CreateSessionParams, callback?: AssistantV2.Callback<AssistantV2.SessionResponse>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['assistant_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createSession(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'assistant_id': _params.assistant_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v2', 'createSession');

    const parameters = {
      options: {
        url: '/v2/assistants/{assistant_id}/sessions',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /**
   * Delete session.
   *
   * Deletes a session explicitly before it times out.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assistant_id - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {string} params.session_id - Unique identifier of the session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteSession(params: AssistantV2.DeleteSessionParams, callback?: AssistantV2.Callback<AssistantV2.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['assistant_id', 'session_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteSession(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'assistant_id': _params.assistant_id,
      'session_id': _params.session_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v2', 'deleteSession');

    const parameters = {
      options: {
        url: '/v2/assistants/{assistant_id}/sessions/{session_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

  /*************************
   * message
   ************************/

  /**
   * Send user input to assistant.
   *
   * Send user input to an assistant and receive a response.
   *
   * There is no rate limit for this operation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assistant_id - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {string} params.session_id - Unique identifier of the session.
   * @param {MessageInput} [params.input] - An input object that includes the input text.
   * @param {MessageContext} [params.context] - State information for the conversation. The context is stored by the
   * assistant on a per-session basis. You can use this property to set or modify context variables, which can also be
   * accessed by dialog nodes.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public message(params: AssistantV2.MessageParams, callback?: AssistantV2.Callback<AssistantV2.MessageResponse>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['assistant_id', 'session_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.message(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'input': _params.input,
      'context': _params.context
    };

    const path = {
      'assistant_id': _params.assistant_id,
      'session_id': _params.session_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v2', 'message');

    const parameters = {
      options: {
        url: '/v2/assistants/{assistant_id}/sessions/{session_id}/message',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

}

AssistantV2.prototype.name = 'conversation';
AssistantV2.prototype.serviceVersion = 'v2';

/*************************
 * interfaces
 ************************/

namespace AssistantV2 {

  /** Options for the `AssistantV2` constructor. */
  export type Options = {
    version: string;
    url?: string;
    iam_access_token?: string;
    iam_apikey?: string;
    iam_url?: string;
    iam_client_id?: string;
    iam_client_secret?: string;
    icp4d_access_token?: string;
    icp4d_url?: string;
    username?: string;
    password?: string;
    token?: string;
    authentication_type?: string;
    disable_ssl_verification?: boolean;
    use_unauthenticated?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  export interface Response<T = any>  {
    result: T;
    data: T; // for compatibility
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, body?: T, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `createSession` operation. */
  export interface CreateSessionParams {
    /** Unique identifier of the assistant. To find the assistant ID in the Watson Assistant user interface, open the assistant settings and click **API Details**. For information about creating assistants, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task). **Note:** Currently, the v2 API does not support creating assistants. */
    assistant_id: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteSession` operation. */
  export interface DeleteSessionParams {
    /** Unique identifier of the assistant. To find the assistant ID in the Watson Assistant user interface, open the assistant settings and click **API Details**. For information about creating assistants, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task). **Note:** Currently, the v2 API does not support creating assistants. */
    assistant_id: string;
    /** Unique identifier of the session. */
    session_id: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `message` operation. */
  export interface MessageParams {
    /** Unique identifier of the assistant. To find the assistant ID in the Watson Assistant user interface, open the assistant settings and click **API Details**. For information about creating assistants, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task). **Note:** Currently, the v2 API does not support creating assistants. */
    assistant_id: string;
    /** Unique identifier of the session. */
    session_id: string;
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** State information for the conversation. The context is stored by the assistant on a per-session basis. You can use this property to set or modify context variables, which can also be accessed by dialog nodes. */
    context?: MessageContext;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /*************************
   * model interfaces
   ************************/

  /** CaptureGroup. */
  export interface CaptureGroup {
    /** A recognized capture group for the entity. */
    group: string;
    /** Zero-based character offsets that indicate where the entity value begins and ends in the input text. */
    location?: number[];
  }

  /** Dialog log message details. */
  export interface DialogLogMessage {
    /** The severity of the log message. */
    level: string;
    /** The text of the log message. */
    message: string;
  }

  /** DialogNodeAction. */
  export interface DialogNodeAction {
    /** The name of the action. */
    name: string;
    /** The type of action to invoke. */
    action_type?: string;
    /** A map of key/value pairs to be provided to the action. */
    parameters?: JsonObject;
    /** The location in the dialog context where the result of the action is stored. */
    result_variable: string;
    /** The name of the context variable that the client application will use to pass in credentials for the action. */
    credentials?: string;
  }

  /** DialogNodeOutputOptionsElement. */
  export interface DialogNodeOutputOptionsElement {
    /** The user-facing label for the option. */
    label: string;
    /** An object defining the message input to be sent to the assistant if the user selects the corresponding option. */
    value: DialogNodeOutputOptionsElementValue;
  }

  /** An object defining the message input to be sent to the assistant if the user selects the corresponding option. */
  export interface DialogNodeOutputOptionsElementValue {
    /** An input object that includes the input text. */
    input?: MessageInput;
  }

  /** DialogNodesVisited. */
  export interface DialogNodesVisited {
    /** A dialog node that was triggered during processing of the input message. */
    dialog_node?: string;
    /** The title of the dialog node. */
    title?: string;
    /** The conditions that trigger the dialog node. */
    conditions?: string;
  }

  /** DialogRuntimeResponseGeneric. */
  export interface DialogRuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the client application or channel. **Note:** The **suggestion** response type is part of the disambiguation feature, which is only available for Premium users. */
    response_type: string;
    /** The text of the response. */
    text?: string;
    /** How long to pause, in milliseconds. */
    time?: number;
    /** Whether to send a "user is typing" event during the pause. */
    typing?: boolean;
    /** The URL of the image. */
    source?: string;
    /** The title or introductory text to show before the response. */
    title?: string;
    /** The description to show with the the response. */
    description?: string;
    /** The preferred type of control to display. */
    preference?: string;
    /** An array of objects describing the options from which the user can choose. */
    options?: DialogNodeOutputOptionsElement[];
    /** A message to be sent to the human agent who will be taking over the conversation. */
    message_to_human_agent?: string;
    /** A label identifying the topic of the conversation, derived from the **user_label** property of the relevant node. */
    topic?: string;
    /** An array of objects describing the possible matching dialog nodes from which the user can choose. **Note:** The **suggestions** property is part of the disambiguation feature, which is only available for Premium users. */
    suggestions?: DialogSuggestion[];
  }

  /** DialogSuggestion. */
  export interface DialogSuggestion {
    /** The user-facing label for the disambiguation option. This label is taken from the **user_label** property of the corresponding dialog node. */
    label: string;
    /** An object defining the message input to be sent to the assistant if the user selects the corresponding disambiguation option. */
    value: DialogSuggestionValue;
    /** The dialog output that will be returned from the Watson Assistant service if the user selects the corresponding option. */
    output?: JsonObject;
  }

  /** An object defining the message input to be sent to the assistant if the user selects the corresponding disambiguation option. */
  export interface DialogSuggestionValue {
    /** An input object that includes the input text. */
    input?: MessageInput;
  }

  /** MessageContext. */
  export interface MessageContext {
    /** Information that is shared by all skills used by the Assistant. */
    global?: MessageContextGlobal;
    /** Information specific to particular skills used by the Assistant. **Note:** Currently, only a single property named `main skill` is supported. This object contains variables that apply to the dialog skill used by the assistant. */
    skills?: MessageContextSkills;
  }

  /** Information that is shared by all skills used by the Assistant. */
  export interface MessageContextGlobal {
    /** Built-in system properties that apply to all skills used by the assistant. */
    system?: MessageContextGlobalSystem;
  }

  /** Built-in system properties that apply to all skills used by the assistant. */
  export interface MessageContextGlobalSystem {
    /** The user time zone. The assistant uses the time zone to correctly resolve relative time references. */
    timezone?: string;
    /** A string value that identifies the user who is interacting with the assistant. The client must provide a unique identifier for each individual end user who accesses the application. For Plus and Premium plans, this user ID is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or tab characters. */
    user_id?: string;
    /** A counter that is automatically incremented with each turn of the conversation. A value of 1 indicates that this is the the first turn of a new conversation, which can affect the behavior of some skills (for example, triggering the start node of a dialog). */
    turn_count?: number;
  }

  /** Contains information specific to a particular skill used by the Assistant. */
  export interface MessageContextSkill {
    /** Arbitrary variables that can be read and written by a particular skill. */
    user_defined?: JsonObject;
  }

  /** Information specific to particular skills used by the Assistant. **Note:** Currently, only a single property named `main skill` is supported. This object contains variables that apply to the dialog skill used by the assistant. */
  export interface MessageContextSkills {
    /** MessageContextSkills accepts additional properties. */
    [propName: string]: any;
  }

  /** An input object that includes the input text. */
  export interface MessageInput {
    /** The type of user input. Currently, only text input is supported. */
    message_type?: string;
    /** The text of the user input. This string cannot contain carriage return, newline, or tab characters. */
    text?: string;
    /** Optional properties that control how the assistant responds. */
    options?: MessageInputOptions;
    /** Intents to use when evaluating the user input. Include intents from the previous response to continue using those intents rather than trying to recognize intents in the new input. */
    intents?: RuntimeIntent[];
    /** Entities to use when evaluating the message. Include entities from the previous response to continue using those entities rather than detecting entities in the new input. */
    entities?: RuntimeEntity[];
    /** For internal use only. */
    suggestion_id?: string;
  }

  /** Optional properties that control how the assistant responds. */
  export interface MessageInputOptions {
    /** Whether to return additional diagnostic information. Set to `true` to return additional information under the `output.debug` key. */
    debug?: boolean;
    /** Whether to restart dialog processing at the root of the dialog, regardless of any previously visited nodes. **Note:** This does not affect `turn_count` or any other context variables. */
    restart?: boolean;
    /** Whether to return more than one intent. Set to `true` to return all matching intents. */
    alternate_intents?: boolean;
    /** Whether to return session context with the response. If you specify `true`, the response will include the `context` property. */
    return_context?: boolean;
  }

  /** Assistant output to be rendered or processed by the client. */
  export interface MessageOutput {
    /** Output intended for any channel. It is the responsibility of the client application to implement the supported response types. */
    generic?: DialogRuntimeResponseGeneric[];
    /** An array of intents recognized in the user input, sorted in descending order of confidence. */
    intents?: RuntimeIntent[];
    /** An array of entities identified in the user input. */
    entities?: RuntimeEntity[];
    /** An array of objects describing any actions requested by the dialog node. */
    actions?: DialogNodeAction[];
    /** Additional detailed information about a message response and how it was generated. */
    debug?: MessageOutputDebug;
    /** An object containing any custom properties included in the response. This object includes any arbitrary properties defined in the dialog JSON editor as part of the dialog node output. */
    user_defined?: JsonObject;
  }

  /** Additional detailed information about a message response and how it was generated. */
  export interface MessageOutputDebug {
    /** An array of objects containing detailed diagnostic information about the nodes that were triggered during processing of the input message. */
    nodes_visited?: DialogNodesVisited[];
    /** An array of up to 50 messages logged with the request. */
    log_messages?: DialogLogMessage[];
    /** Assistant sets this to true when this message response concludes or interrupts a dialog. */
    branch_exited?: boolean;
    /** When `branch_exited` is set to `true` by the Assistant, the `branch_exited_reason` specifies whether the dialog completed by itself or got interrupted. */
    branch_exited_reason?: string;
  }

  /** A response from the Watson Assistant service. */
  export interface MessageResponse {
    /** Assistant output to be rendered or processed by the client. */
    output: MessageOutput;
    /** State information for the conversation. The context is stored by the assistant on a per-session basis. You can use this property to access context variables. **Note:** The context is included in message responses only if **return_context**=`true` in the message request. */
    context?: MessageContext;
  }

  /** A term from the request that was identified as an entity. */
  export interface RuntimeEntity {
    /** An entity detected in the input. */
    entity: string;
    /** An array of zero-based character offsets that indicate where the detected entity values begin and end in the input text. */
    location: number[];
    /** The term in the input text that was recognized as an entity value. */
    value: string;
    /** A decimal percentage that represents Watson's confidence in the entity. */
    confidence?: number;
    /** Any metadata for the entity. */
    metadata?: JsonObject;
    /** The recognized capture groups for the entity, as defined by the entity pattern. */
    groups?: CaptureGroup[];
  }

  /** An intent identified in the user input. */
  export interface RuntimeIntent {
    /** The name of the recognized intent. */
    intent: string;
    /** A decimal percentage that represents Watson's confidence in the intent. */
    confidence: number;
  }

  /** SessionResponse. */
  export interface SessionResponse {
    /** The session ID. */
    session_id: string;
  }

}

export = AssistantV2;
