/**
 * (C) Copyright IBM Corp. 2018, 2020.
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
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM Watson&trade; Assistant service combines machine learning, natural language understanding, and an integrated
 * dialog editor to create conversation flows between your apps and your users.
 *
 * The Assistant v2 API provides runtime methods your client application can use to send user input to an assistant and
 * receive a response.
 */

class AssistantV2 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.assistant.watson.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'conversation';

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
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {AssistantV2}
   * @throws {Error}
   */
  constructor(options: UserOptions) {
    if (!options.serviceName) {
      options.serviceName = AssistantV2.DEFAULT_SERVICE_NAME;
    }
    // If the caller didn't supply an authenticator, construct one from external configuration.
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    super(options);
    this.configureService(options.serviceName);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    }
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
   * state of the conversation. A session persists until it is deleted, or until it times out because of inactivity.
   * (For more information, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-settings).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assistantId - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<AssistantV2.Response<AssistantV2.SessionResponse>>}
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

      const sdkHeaders = getSdkHeaders(AssistantV2.DEFAULT_SERVICE_NAME, 'v2', 'createSession');

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
   * Deletes a session explicitly before it times out. (For more information about the session inactivity timeout, see
   * the [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-settings)).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assistantId - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {string} params.sessionId - Unique identifier of the session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<AssistantV2.Response<AssistantV2.Empty>>}
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

      const sdkHeaders = getSdkHeaders(AssistantV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSession');

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
   * Send user input to assistant (stateful).
   *
   * Send user input to an assistant and receive a response, with conversation state (including context data) stored by
   * Watson Assistant for the duration of the session.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assistantId - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {string} params.sessionId - Unique identifier of the session.
   * @param {MessageInput} [params.input] - An input object that includes the input text.
   * @param {MessageContext} [params.context] - Context data for the conversation. You can use this property to set or
   * modify context variables, which can also be accessed by dialog nodes. The context is stored by the assistant on a
   * per-session basis.
   *
   * **Note:** The total size of the context data stored for a stateful session cannot exceed 100KB.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<AssistantV2.Response<AssistantV2.MessageResponse>>}
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

      const sdkHeaders = getSdkHeaders(AssistantV2.DEFAULT_SERVICE_NAME, 'v2', 'message');

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

  /**
   * Send user input to assistant (stateless).
   *
   * Send user input to an assistant and receive a response, with conversation state (including context data) managed by
   * your application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assistantId - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {MessageInputStateless} [params.input] - An input object that includes the input text.
   * @param {MessageContextStateless} [params.context] - Context data for the conversation. You can use this property to
   * set or modify context variables, which can also be accessed by dialog nodes. The context is not stored by the
   * assistant. To maintain session state, include the context from the previous response.
   *
   * **Note:** The total size of the context data for a stateless session cannot exceed 250KB.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<AssistantV2.Response<AssistantV2.MessageResponseStateless>>}
   */
  public messageStateless(params: AssistantV2.MessageStatelessParams, callback?: AssistantV2.Callback<AssistantV2.MessageResponseStateless>): Promise<AssistantV2.Response<AssistantV2.MessageResponseStateless>> {
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

      const body = {
        'input': _params.input,
        'context': _params.context
      };

      const path = {
        'assistant_id': _params.assistantId
      };

      const sdkHeaders = getSdkHeaders(AssistantV2.DEFAULT_SERVICE_NAME, 'v2', 'messageStateless');

      const parameters = {
        options: {
          url: '/v2/assistants/{assistant_id}/message',
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

  /*************************
   * logs
   ************************/

  /**
   * List log events for an assistant.
   *
   * List the events from the log of an assistant.
   *
   * If **cursor** is not specified, this operation is limited to 40 requests per 30 minutes. If **cursor** is
   * specified, the limit is 120 requests per minute. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assistantId - Unique identifier of the assistant. To find the assistant ID in the Watson
   * Assistant user interface, open the assistant settings and click **API Details**. For information about creating
   * assistants, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add#assistant-add-task).
   *
   * **Note:** Currently, the v2 API does not support creating assistants.
   * @param {string} [params.sort] - How to sort the returned log events. You can sort by **request_timestamp**. To
   * reverse the sort order, prefix the parameter value with a minus sign (`-`).
   * @param {string} [params.filter] - A cacheable parameter that limits the results to those matching the specified
   * filter. For more information, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-filter-reference#filter-reference).
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<AssistantV2.Response<AssistantV2.LogCollection>>}
   */
  public listLogs(params: AssistantV2.ListLogsParams, callback?: AssistantV2.Callback<AssistantV2.LogCollection>): Promise<AssistantV2.Response<AssistantV2.LogCollection>> {
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

      const query = {
        'sort': _params.sort,
        'filter': _params.filter,
        'page_limit': _params.pageLimit,
        'cursor': _params.cursor
      };

      const path = {
        'assistant_id': _params.assistantId
      };

      const sdkHeaders = getSdkHeaders(AssistantV2.DEFAULT_SERVICE_NAME, 'v2', 'listLogs');

      const parameters = {
        options: {
          url: '/v2/assistants/{assistant_id}/logs',
          method: 'GET',
          qs: query,
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
   * userData
   ************************/

  /**
   * Delete labeled data.
   *
   * Deletes all data associated with a specified customer ID. The method has no effect if no data is associated with
   * the customer ID.
   *
   * You associate a customer ID with data by passing the `X-Watson-Metadata` header with a request that passes data.
   * For more information about personal data and customer IDs, see [Information
   * security](https://cloud.ibm.com/docs/assistant?topic=assistant-information-security#information-security).
   *
   * This operation is limited to 4 requests per minute. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customerId - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<AssistantV2.Response<AssistantV2.Empty>>}
   */
  public deleteUserData(params: AssistantV2.DeleteUserDataParams, callback?: AssistantV2.Callback<AssistantV2.Empty>): Promise<AssistantV2.Response<AssistantV2.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['customerId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
        'customer_id': _params.customerId
      };

      const sdkHeaders = getSdkHeaders(AssistantV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteUserData');

      const parameters = {
        options: {
          url: '/v2/user_data',
          method: 'DELETE',
          qs: query,
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

}

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
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add#assistant-add-task).
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
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add#assistant-add-task).
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
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add#assistant-add-task).
     *
     *  **Note:** Currently, the v2 API does not support creating assistants.
     */
    assistantId: string;
    /** Unique identifier of the session. */
    sessionId: string;
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** Context data for the conversation. You can use this property to set or modify context variables, which can
     *  also be accessed by dialog nodes. The context is stored by the assistant on a per-session basis.
     *
     *  **Note:** The total size of the context data stored for a stateful session cannot exceed 100KB.
     */
    context?: MessageContext;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `messageStateless` operation. */
  export interface MessageStatelessParams {
    /** Unique identifier of the assistant. To find the assistant ID in the Watson Assistant user interface, open
     *  the assistant settings and click **API Details**. For information about creating assistants, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add#assistant-add-task).
     *
     *  **Note:** Currently, the v2 API does not support creating assistants.
     */
    assistantId: string;
    /** An input object that includes the input text. */
    input?: MessageInputStateless;
    /** Context data for the conversation. You can use this property to set or modify context variables, which can
     *  also be accessed by dialog nodes. The context is not stored by the assistant. To maintain session state, include
     *  the context from the previous response.
     *
     *  **Note:** The total size of the context data for a stateless session cannot exceed 250KB.
     */
    context?: MessageContextStateless;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listLogs` operation. */
  export interface ListLogsParams {
    /** Unique identifier of the assistant. To find the assistant ID in the Watson Assistant user interface, open
     *  the assistant settings and click **API Details**. For information about creating assistants, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add#assistant-add-task).
     *
     *  **Note:** Currently, the v2 API does not support creating assistants.
     */
    assistantId: string;
    /** How to sort the returned log events. You can sort by **request_timestamp**. To reverse the sort order,
     *  prefix the parameter value with a minus sign (`-`).
     */
    sort?: string;
    /** A cacheable parameter that limits the results to those matching the specified filter. For more information,
     *  see the [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-filter-reference#filter-reference).
     */
    filter?: string;
    /** The number of records to return in each page of results. */
    pageLimit?: number;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customerId: string;
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
    /** The user-facing label for the suggestion. This label is taken from the **title** or **user_label** property
     *  of the corresponding dialog node, depending on the disambiguation options.
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

  /** Log. */
  export interface Log {
    /** A unique identifier for the logged event. */
    log_id: string;
    /** A stateful message request formatted for the Watson Assistant service. */
    request: MessageRequest;
    /** A response from the Watson Assistant service. */
    response: MessageResponse;
    /** Unique identifier of the assistant. */
    assistant_id: string;
    /** The ID of the session the message was part of. */
    session_id: string;
    /** The unique identifier of the skill that responded to the message. */
    skill_id: string;
    /** The name of the snapshot (dialog skill version) that responded to the message (for example, `draft`). */
    snapshot: string;
    /** The timestamp for receipt of the message. */
    request_timestamp: string;
    /** The timestamp for the system response to the message. */
    response_timestamp: string;
    /** The language of the assistant to which the message request was made. */
    language: string;
    /** The customer ID specified for the message, if any. */
    customer_id?: string;
  }

  /** LogCollection. */
  export interface LogCollection {
    /** An array of objects describing log events. */
    logs: Log[];
    /** The pagination data for the returned objects. */
    pagination: LogPagination;
  }

  /** The pagination data for the returned objects. */
  export interface LogPagination {
    /** The URL that will return the next page of results, if any. */
    next_url?: string;
    /** Reserved for future use. */
    matched?: number;
    /** A token identifying the next page of results. */
    next_cursor?: string;
  }

  /** MessageContext. */
  export interface MessageContext {
    /** Session context data that is shared by all skills used by the Assistant. */
    global?: MessageContextGlobal;
    /** Information specific to particular skills used by the assistant.
     *
     *  **Note:** Currently, only a single child property is supported, containing variables that apply to the dialog
     *  skill used by the assistant.
     */
    skills?: MessageContextSkills;
  }

  /** Session context data that is shared by all skills used by the Assistant. */
  export interface MessageContextGlobal {
    /** Built-in system properties that apply to all skills used by the assistant. */
    system?: MessageContextGlobalSystem;
    /** The session ID. */
    session_id?: string;
  }

  /** Session context data that is shared by all skills used by the Assistant. */
  export interface MessageContextGlobalStateless {
    /** Built-in system properties that apply to all skills used by the assistant. */
    system?: MessageContextGlobalSystem;
    /** The unique identifier of the session. */
    session_id?: string;
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
    /** The language code for localization in the user input. The specified locale overrides the default for the
     *  assistant, and is used for interpreting entity values in user input such as date values. For example,
     *  `04/03/2018` might be interpreted either as April 3 or March 4, depending on the locale.
     *
     *   This property is included only if the new system entities are enabled for the skill.
     */
    locale?: string;
    /** The base time for interpreting any relative time mentions in the user input. The specified time overrides
     *  the current server time, and is used to calculate times mentioned in relative terms such as `now` or `tomorrow`.
     *  This can be useful for simulating past or future times for testing purposes, or when analyzing documents such as
     *  news articles.
     *
     *  This value must be a UTC time value formatted according to ISO 8601 (for example, `2019-06-26T12:00:00Z` for
     *  noon on 26 June 2019.
     *
     *  This property is included only if the new system entities are enabled for the skill.
     */
    reference_time?: string;
  }

  /** Contains information specific to a particular skill used by the Assistant. The property name must be the same as the name of the skill (for example, `main skill`). */
  export interface MessageContextSkill {
    /** Arbitrary variables that can be read and written by a particular skill. */
    user_defined?: JsonObject;
    /** System context data used by the skill. */
    system?: MessageContextSkillSystem;
  }

  /** System context data used by the skill. */
  export interface MessageContextSkillSystem {
    /** An encoded string representing the current conversation state. By saving this value and then sending it in
     *  the context of a subsequent message request, you can restore the conversation to the same state. This can be
     *  useful if you need to return to an earlier point in the conversation. If you are using stateful sessions, you
     *  can also use a stored state value to restore a paused conversation whose session has expired.
     */
    state?: string;
    /** MessageContextSkillSystem accepts additional properties. */
    [propName: string]: any;
  }

  /** Information specific to particular skills used by the assistant. **Note:** Currently, only a single child property is supported, containing variables that apply to the dialog skill used by the assistant. */
  export interface MessageContextSkills {
    /** MessageContextSkills accepts additional properties. */
    [propName: string]: any;
  }

  /** MessageContextStateless. */
  export interface MessageContextStateless {
    /** Session context data that is shared by all skills used by the Assistant. */
    global?: MessageContextGlobalStateless;
    /** Information specific to particular skills used by the assistant.
     *
     *  **Note:** Currently, only a single child property is supported, containing variables that apply to the dialog
     *  skill used by the assistant.
     */
    skills?: MessageContextSkills;
  }

  /** An input object that includes the input text. */
  export interface MessageInput {
    /** The type of user input. Currently, only text input is supported. */
    message_type?: string;
    /** The text of the user input. This string cannot contain carriage return, newline, or tab characters. */
    text?: string;
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
    /** Optional properties that control how the assistant responds. */
    options?: MessageInputOptions;
  }

  /** Optional properties that control how the assistant responds. */
  export interface MessageInputOptions {
    /** Whether to restart dialog processing at the root of the dialog, regardless of any previously visited nodes.
     *  **Note:** This does not affect `turn_count` or any other context variables.
     */
    restart?: boolean;
    /** Whether to return more than one intent. Set to `true` to return all matching intents. */
    alternate_intents?: boolean;
    /** Spelling correction options for the message. Any options specified on an individual message override the
     *  settings configured for the skill.
     */
    spelling?: MessageInputOptionsSpelling;
    /** Whether to return additional diagnostic information. Set to `true` to return additional information in the
     *  `output.debug` property. If you also specify **return_context**=`true`, the returned skill context includes the
     *  `system.state` property.
     */
    debug?: boolean;
    /** Whether to return session context with the response. If you specify `true`, the response includes the
     *  `context` property. If you also specify **debug**=`true`, the returned skill context includes the `system.state`
     *  property.
     */
    return_context?: boolean;
    /** Whether to return session context, including full conversation state. If you specify `true`, the response
     *  includes the `context` property, and the skill context includes the `system.state` property.
     *
     *  **Note:** If **export**=`true`, the context is returned regardless of the value of **return_context**.
     */
    _export?: boolean;
  }

  /** Spelling correction options for the message. Any options specified on an individual message override the settings configured for the skill. */
  export interface MessageInputOptionsSpelling {
    /** Whether to use spelling correction when processing the input. If spelling correction is used and
     *  **auto_correct** is `true`, any spelling corrections are automatically applied to the user input. If
     *  **auto_correct** is `false`, any suggested corrections are returned in the **output.spelling** property.
     *
     *  This property overrides the value of the **spelling_suggestions** property in the workspace settings for the
     *  skill.
     */
    suggestions?: boolean;
    /** Whether to use autocorrection when processing the input. If this property is `true`, any corrections are
     *  automatically applied to the user input, and the original text is returned in the **output.spelling** property
     *  of the message response. This property overrides the value of the **spelling_auto_correct** property in the
     *  workspace settings for the skill.
     */
    auto_correct?: boolean;
  }

  /** Optional properties that control how the assistant responds. */
  export interface MessageInputOptionsStateless {
    /** Whether to restart dialog processing at the root of the dialog, regardless of any previously visited nodes.
     *  **Note:** This does not affect `turn_count` or any other context variables.
     */
    restart?: boolean;
    /** Whether to return more than one intent. Set to `true` to return all matching intents. */
    alternate_intents?: boolean;
    /** Spelling correction options for the message. Any options specified on an individual message override the
     *  settings configured for the skill.
     */
    spelling?: MessageInputOptionsSpelling;
    /** Whether to return additional diagnostic information. Set to `true` to return additional information in the
     *  `output.debug` property.
     */
    debug?: boolean;
  }

  /** An input object that includes the input text. */
  export interface MessageInputStateless {
    /** The type of user input. Currently, only text input is supported. */
    message_type?: string;
    /** The text of the user input. This string cannot contain carriage return, newline, or tab characters. */
    text?: string;
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
    /** Optional properties that control how the assistant responds. */
    options?: MessageInputOptionsStateless;
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
    /** Properties describing any spelling corrections in the user input that was received. */
    spelling?: MessageOutputSpelling;
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

  /** Properties describing any spelling corrections in the user input that was received. */
  export interface MessageOutputSpelling {
    /** The user input text that was used to generate the response. If spelling autocorrection is enabled, this text
     *  reflects any spelling corrections that were applied.
     */
    text?: string;
    /** The original user input text. This property is returned only if autocorrection is enabled and the user input
     *  was corrected.
     */
    original_text?: string;
    /** Any suggested corrections of the input text. This property is returned only if spelling correction is
     *  enabled and autocorrection is disabled.
     */
    suggested_text?: string;
  }

  /** A stateful message request formatted for the Watson Assistant service. */
  export interface MessageRequest {
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** Context data for the conversation. You can use this property to set or modify context variables, which can
     *  also be accessed by dialog nodes. The context is stored by the assistant on a per-session basis.
     *
     *  **Note:** The total size of the context data stored for a stateful session cannot exceed 100KB.
     */
    context?: MessageContext;
  }

  /** A response from the Watson Assistant service. */
  export interface MessageResponse {
    /** Assistant output to be rendered or processed by the client. */
    output: MessageOutput;
    /** Context data for the conversation. You can use this property to access context variables. The context is
     *  stored by the assistant on a per-session basis.
     *
     *  **Note:** The context is included in message responses only if **return_context**=`true` in the message request.
     *  Full context is always included in logs.
     */
    context?: MessageContext;
  }

  /** A stateless response from the Watson Assistant service. */
  export interface MessageResponseStateless {
    /** Assistant output to be rendered or processed by the client. */
    output: MessageOutput;
    /** Context data for the conversation. You can use this property to access context variables. The context is not
     *  stored by the assistant; to maintain session state, include the context from the response in the next message.
     */
    context: MessageContextStateless;
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
    /** An object containing detailed information about the entity recognized in the user input. This property is
     *  included only if the new system entities are enabled for the skill.
     *
     *  For more information about how the new system entities are interpreted, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-beta-system-entities).
     */
    interpretation?: RuntimeEntityInterpretation;
    /** An array of possible alternative values that the user might have intended instead of the value returned in
     *  the **value** property. This property is returned only for `@sys-time` and `@sys-date` entities when the user's
     *  input is ambiguous.
     *
     *  This property is included only if the new system entities are enabled for the skill.
     */
    alternatives?: RuntimeEntityAlternative[];
    /** An object describing the role played by a system entity that is specifies the beginning or end of a range
     *  recognized in the user input. This property is included only if the new system entities are enabled for the
     *  skill.
     */
    role?: RuntimeEntityRole;
  }

  /** An alternative value for the recognized entity. */
  export interface RuntimeEntityAlternative {
    /** The entity value that was recognized in the user input. */
    value?: string;
    /** A decimal percentage that represents Watson's confidence in the recognized entity. */
    confidence?: number;
  }

  /** RuntimeEntityInterpretation. */
  export interface RuntimeEntityInterpretation {
    /** The calendar used to represent a recognized date (for example, `Gregorian`). */
    calendar_type?: string;
    /** A unique identifier used to associate a recognized time and date. If the user input contains a date and time
     *  that are mentioned together (for example, `Today at 5`, the same **datetime_link** value is returned for both
     *  the `@sys-date` and `@sys-time` entities).
     */
    datetime_link?: string;
    /** A locale-specific holiday name (such as `thanksgiving` or `christmas`). This property is included when a
     *  `@sys-date` entity is recognized based on a holiday name in the user input.
     */
    festival?: string;
    /** The precision or duration of a time range specified by a recognized `@sys-time` or `@sys-date` entity. */
    granularity?: string;
    /** A unique identifier used to associate multiple recognized `@sys-date`, `@sys-time`, or `@sys-number`
     *  entities that are recognized as a range of values in the user's input (for example, `from July 4 until July 14`
     *  or `from 20 to 25`).
     */
    range_link?: string;
    /** The word in the user input that indicates that a `sys-date` or `sys-time` entity is part of an implied range
     *  where only one date or time is specified (for example, `since` or `until`).
     */
    range_modifier?: string;
    /** A recognized mention of a relative day, represented numerically as an offset from the current date (for
     *  example, `-1` for `yesterday` or `10` for `in ten days`).
     */
    relative_day?: number;
    /** A recognized mention of a relative month, represented numerically as an offset from the current month (for
     *  example, `1` for `next month` or `-3` for `three months ago`).
     */
    relative_month?: number;
    /** A recognized mention of a relative week, represented numerically as an offset from the current week (for
     *  example, `2` for `in two weeks` or `-1` for `last week).
     */
    relative_week?: number;
    /** A recognized mention of a relative date range for a weekend, represented numerically as an offset from the
     *  current weekend (for example, `0` for `this weekend` or `-1` for `last weekend`).
     */
    relative_weekend?: number;
    /** A recognized mention of a relative year, represented numerically as an offset from the current year (for
     *  example, `1` for `next year` or `-5` for `five years ago`).
     */
    relative_year?: number;
    /** A recognized mention of a specific date, represented numerically as the date within the month (for example,
     *  `30` for `June 30`.).
     */
    specific_day?: number;
    /** A recognized mention of a specific day of the week as a lowercase string (for example, `monday`). */
    specific_day_of_week?: string;
    /** A recognized mention of a specific month, represented numerically (for example, `7` for `July`). */
    specific_month?: number;
    /** A recognized mention of a specific quarter, represented numerically (for example, `3` for `the third
     *  quarter`).
     */
    specific_quarter?: number;
    /** A recognized mention of a specific year (for example, `2016`). */
    specific_year?: number;
    /** A recognized numeric value, represented as an integer or double. */
    numeric_value?: number;
    /** The type of numeric value recognized in the user input (`integer` or `rational`). */
    subtype?: string;
    /** A recognized term for a time that was mentioned as a part of the day in the user's input (for example,
     *  `morning` or `afternoon`).
     */
    part_of_day?: string;
    /** A recognized mention of a relative hour, represented numerically as an offset from the current hour (for
     *  example, `3` for `in three hours` or `-1` for `an hour ago`).
     */
    relative_hour?: number;
    /** A recognized mention of a relative time, represented numerically as an offset in minutes from the current
     *  time (for example, `5` for `in five minutes` or `-15` for `fifteen minutes ago`).
     */
    relative_minute?: number;
    /** A recognized mention of a relative time, represented numerically as an offset in seconds from the current
     *  time (for example, `10` for `in ten seconds` or `-30` for `thirty seconds ago`).
     */
    relative_second?: number;
    /** A recognized specific hour mentioned as part of a time value (for example, `10` for `10:15 AM`.). */
    specific_hour?: number;
    /** A recognized specific minute mentioned as part of a time value (for example, `15` for `10:15 AM`.). */
    specific_minute?: number;
    /** A recognized specific second mentioned as part of a time value (for example, `30` for `10:15:30 AM`.). */
    specific_second?: number;
    /** A recognized time zone mentioned as part of a time value (for example, `EST`). */
    timezone?: string;
  }

  /** An object describing the role played by a system entity that is specifies the beginning or end of a range recognized in the user input. This property is included only if the new system entities are enabled for the skill. */
  export interface RuntimeEntityRole {
    /** The relationship of the entity to the range. */
    type?: string;
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
    /** An array of objects describing the possible matching dialog nodes from which the user can choose. */
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
     *  This property is included in responses from search skills, which are available only to Plus or Premium plan
     *  users.
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
     *  `<em>` tags.
     */
    highlight?: SearchResultHighlight;
  }

  /** An object containing segments of text from search results with query-matching text highlighted using HTML `<em>` tags. */
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
