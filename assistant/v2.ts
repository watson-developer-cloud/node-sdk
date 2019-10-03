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
 * limitations under the License.
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getAuthenticatorFromEnvironment } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM Watson&trade; Assistant service combines machine learning, natural language understanding, and an integrated
 * dialog editor to create conversation flows between your apps and your users.
 *
 * The Assistant v2 API provides runtime methods your client application can use to send user input to an assistant and
 * receive a response.
 */

class AssistantV2 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/assistant/api';
  name: string; // set by prototype to 'conversation'
  serviceVersion: string; // set by prototype to 'v2'

  /**
   * Construct a AssistantV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever
   * the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses
   * the API version for the date you specify, or the most recent version before that date. Note that you should not
   * programmatically specify the current date at runtime, in case the API has been updated since your application's
   * release. Instead, specify a version date that is compatible with your application, and don't change it until your
   * application is ready for a later version.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/assistant/api'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {AssistantV2}
   * @throws {Error}
   */
  constructor(options: UserOptions) {
    // If the caller didn't supply an authenticator, construct one from external configuration.
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment('conversation');
    }
    super(options);
    // check if 'version' was provided
    if (typeof this.baseOptions.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this.baseOptions.qs.version = options.version;
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
   * @param {string} params.assistantId - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createSession(params: AssistantV2.CreateSessionParams, callback?: AssistantV2.Callback<AssistantV2.SessionResponse>): Promise<AssistantV2.Response<AssistantV2.SessionResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['assistantId'];

    return new Promise((resolve, reject) => {

      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'assistant_id': _params.assistantId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v2', 'createSession');

      const parameters = {
        options: {
          url: '/v2/assistants/{assistant_id}/sessions',
          method: 'POST',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete session.
   *
   * Deletes a session explicitly before it times out.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assistantId - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {string} params.sessionId - Unique identifier of the session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteSession(params: AssistantV2.DeleteSessionParams, callback?: AssistantV2.Callback<AssistantV2.Empty>): Promise<AssistantV2.Response<AssistantV2.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['assistantId', 'sessionId'];

    return new Promise((resolve, reject) => {

      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'assistant_id': _params.assistantId,
        'session_id': _params.sessionId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v2', 'deleteSession');

      const parameters = {
        options: {
          url: '/v2/assistants/{assistant_id}/sessions/{session_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
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
   * @param {string} params.assistantId - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {string} params.sessionId - Unique identifier of the session.
   * @param {MessageInput} [params.input] - An input object that includes the input text.
   * @param {MessageContext} [params.context] - State information for the conversation. The context is stored by the
   * assistant on a per-session basis. You can use this property to set or modify context variables, which can also be
   * accessed by dialog nodes.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public message(params: AssistantV2.MessageParams, callback?: AssistantV2.Callback<AssistantV2.MessageResponse>): Promise<AssistantV2.Response<AssistantV2.MessageResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['assistantId', 'sessionId'];

    return new Promise((resolve, reject) => {

      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'input': _params.input,
        'context': _params.context
      };

      const path = {
        'assistant_id': _params.assistantId,
        'session_id': _params.sessionId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v2', 'message');

      const parameters = {
        options: {
          url: '/v2/assistants/{assistant_id}/sessions/{session_id}/message',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

}

AssistantV2.prototype.name = 'conversation';
AssistantV2.prototype.serviceVersion = 'v2';

/*************************
 * interfaces
 ************************/

namespace AssistantV2 {

  /** An operation response. **/
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

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
    /** Unique identifier of the assistant. To find the assistant ID in the Watson Assistant user interface, open
     *  the assistant settings and click **API Details**. For information about creating assistants, see the
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task).
     *
     *  **Note:** Currently, the v2 API does not support creating assistants.
     */
    assistantId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSession` operation. */
  export interface DeleteSessionParams {
    /** Unique identifier of the assistant. To find the assistant ID in the Watson Assistant user interface, open
     *  the assistant settings and click **API Details**. For information about creating assistants, see the
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task).
     *
     *  **Note:** Currently, the v2 API does not support creating assistants.
     */
    assistantId: string;
    /** Unique identifier of the session. */
    sessionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `message` operation. */
  export interface MessageParams {
    /** Unique identifier of the assistant. To find the assistant ID in the Watson Assistant user interface, open
     *  the assistant settings and click **API Details**. For information about creating assistants, see the
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-assistant-add#assistant-add-task).
     *
     *  **Note:** Currently, the v2 API does not support creating assistants.
     */
    assistantId: string;
    /** Unique identifier of the session. */
    sessionId: string;
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** State information for the conversation. The context is stored by the assistant on a per-session basis. You
     *  can use this property to set or modify context variables, which can also be accessed by dialog nodes.
     */
    context?: MessageContext;
    headers?: OutgoingHttpHeaders;
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
    type?: string;
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
    /** An object defining the message input to be sent to the assistant if the user selects the corresponding
     *  option.
     */
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

  /** DialogSuggestion. */
  export interface DialogSuggestion {
    /** The user-facing label for the disambiguation option. This label is taken from the **user_label** property of
     *  the corresponding dialog node.
     */
    label: string;
    /** An object defining the message input to be sent to the assistant if the user selects the corresponding
     *  disambiguation option.
     */
    value: DialogSuggestionValue;
    /** The dialog output that will be returned from the Watson Assistant service if the user selects the
     *  corresponding option.
     */
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
    /** Information specific to particular skills used by the Assistant.
     *
     *  **Note:** Currently, only a single property named `main skill` is supported. This object contains variables that
     *  apply to the dialog skill used by the assistant.
     */
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
    /** A string value that identifies the user who is interacting with the assistant. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For Plus and Premium plans, this
     *  user ID is used to identify unique users for billing purposes. This string cannot contain carriage return,
     *  newline, or tab characters.
     */
    user_id?: string;
    /** A counter that is automatically incremented with each turn of the conversation. A value of 1 indicates that
     *  this is the the first turn of a new conversation, which can affect the behavior of some skills (for example,
     *  triggering the start node of a dialog).
     */
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
    /** Intents to use when evaluating the user input. Include intents from the previous response to continue using
     *  those intents rather than trying to recognize intents in the new input.
     */
    intents?: RuntimeIntent[];
    /** Entities to use when evaluating the message. Include entities from the previous response to continue using
     *  those entities rather than detecting entities in the new input.
     */
    entities?: RuntimeEntity[];
    /** For internal use only. */
    suggestion_id?: string;
  }

  /** Optional properties that control how the assistant responds. */
  export interface MessageInputOptions {
    /** Whether to return additional diagnostic information. Set to `true` to return additional information under
     *  the `output.debug` key.
     */
    debug?: boolean;
    /** Whether to restart dialog processing at the root of the dialog, regardless of any previously visited nodes.
     *  **Note:** This does not affect `turn_count` or any other context variables.
     */
    restart?: boolean;
    /** Whether to return more than one intent. Set to `true` to return all matching intents. */
    alternate_intents?: boolean;
    /** Whether to return session context with the response. If you specify `true`, the response will include the
     *  `context` property.
     */
    return_context?: boolean;
  }

  /** Assistant output to be rendered or processed by the client. */
  export interface MessageOutput {
    /** Output intended for any channel. It is the responsibility of the client application to implement the
     *  supported response types.
     */
    generic?: RuntimeResponseGeneric[];
    /** An array of intents recognized in the user input, sorted in descending order of confidence. */
    intents?: RuntimeIntent[];
    /** An array of entities identified in the user input. */
    entities?: RuntimeEntity[];
    /** An array of objects describing any actions requested by the dialog node. */
    actions?: DialogNodeAction[];
    /** Additional detailed information about a message response and how it was generated. */
    debug?: MessageOutputDebug;
    /** An object containing any custom properties included in the response. This object includes any arbitrary
     *  properties defined in the dialog JSON editor as part of the dialog node output.
     */
    user_defined?: JsonObject;
  }

  /** Additional detailed information about a message response and how it was generated. */
  export interface MessageOutputDebug {
    /** An array of objects containing detailed diagnostic information about the nodes that were triggered during
     *  processing of the input message.
     */
    nodes_visited?: DialogNodesVisited[];
    /** An array of up to 50 messages logged with the request. */
    log_messages?: DialogLogMessage[];
    /** Assistant sets this to true when this message response concludes or interrupts a dialog. */
    branch_exited?: boolean;
    /** When `branch_exited` is set to `true` by the Assistant, the `branch_exited_reason` specifies whether the
     *  dialog completed by itself or got interrupted.
     */
    branch_exited_reason?: string;
  }

  /** A response from the Watson Assistant service. */
  export interface MessageResponse {
    /** Assistant output to be rendered or processed by the client. */
    output: MessageOutput;
    /** State information for the conversation. The context is stored by the assistant on a per-session basis. You
     *  can use this property to access context variables.
     *
     *  **Note:** The context is included in message responses only if **return_context**=`true` in the message request.
     */
    context?: MessageContext;
  }

  /** The entity value that was recognized in the user input. */
  export interface RuntimeEntity {
    /** An entity detected in the input. */
    entity: string;
    /** An array of zero-based character offsets that indicate where the detected entity values begin and end in the
     *  input text.
     */
    location: number[];
    /** The term in the input text that was recognized as an entity value. */
    value: string;
    /** A decimal percentage that represents Watson's confidence in the recognized entity. */
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

  /** RuntimeResponseGeneric. */
  export interface RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     *
     *  **Note:** The **suggestion** response type is part of the disambiguation feature, which is only available for
     *  Premium users.
     */
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
    /** A label identifying the topic of the conversation, derived from the **user_label** property of the relevant
     *  node.
     */
    topic?: string;
    /** An array of objects describing the possible matching dialog nodes from which the user can choose.
     *
     *  **Note:** The **suggestions** property is part of the disambiguation feature, which is only available for
     *  Premium users.
     */
    suggestions?: DialogSuggestion[];
    /** The title or introductory text to show before the response. This text is defined in the search skill
     *  configuration.
     */
    header?: string;
    /** An array of objects containing search results. */
    results?: SearchResult[];
  }

  /** SearchResult. */
  export interface SearchResult {
    /** The unique identifier of the document in the Discovery service collection.
     *
     *  This property is included in responses from search skills, which are a beta feature available only to Plus or
     *  Premium plan users.
     */
    id: string;
    /** An object containing search result metadata from the Discovery service. */
    result_metadata: SearchResultMetadata;
    /** A description of the search result. This is taken from an abstract, summary, or highlight field in the
     *  Discovery service response, as specified in the search skill configuration.
     */
    body?: string;
    /** The title of the search result. This is taken from a title or name field in the Discovery service response,
     *  as specified in the search skill configuration.
     */
    title?: string;
    /** The URL of the original data object in its native data source. */
    url?: string;
    /** An object containing segments of text from search results with query-matching text highlighted using HTML
     *  <em> tags.
     */
    highlight?: SearchResultHighlight;
  }

  /** An object containing segments of text from search results with query-matching text highlighted using HTML <em> tags. */
  export interface SearchResultHighlight {
    /** An array of strings containing segments taken from body text in the search results, with query-matching
     *  substrings highlighted.
     */
    body?: string[];
    /** An array of strings containing segments taken from title text in the search results, with query-matching
     *  substrings highlighted.
     */
    title?: string[];
    /** An array of strings containing segments taken from URLs in the search results, with query-matching
     *  substrings highlighted.
     */
    url?: string[];
    /** SearchResultHighlight accepts additional properties. */
    [propName: string]: any;
  }

  /** An object containing search result metadata from the Discovery service. */
  export interface SearchResultMetadata {
    /** The confidence score for the given result. For more information about how the confidence is calculated, see
     *  the Discovery service [documentation](../discovery#query-your-collection).
     */
    confidence?: number;
    /** An unbounded measure of the relevance of a particular result, dependent on the query and matching document.
     *  A higher score indicates a greater match to the query parameters.
     */
    score?: number;
  }

  /** SessionResponse. */
  export interface SessionResponse {
    /** The session ID. */
    session_id: string;
  }

}

export = AssistantV2;
