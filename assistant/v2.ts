/**
 * (C) Copyright IBM Corp. 2018, 2021.
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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.38.0-07189efd-20210827-205025
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  getMissingParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM Watson&trade; Assistant service combines machine learning, natural language understanding, and an integrated
 * dialog editor to create conversation flows between your apps and your users.
 *
 * The Assistant v2 API provides runtime methods your client application can use to send user input to an assistant and
 * receive a response.
 *
 * API Version: 2.0
 * See: https://cloud.ibm.com/docs/assistant
 */

class AssistantV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.assistant.watson.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'conversation';

  /** Release date of the API version you want to use. Specify dates in YYYY-MM-DD format. The current version is
   *  `2021-06-14`.
   */
  version: string;

  /**
   * Construct a AssistantV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - Release date of the API version you want to use. Specify dates in YYYY-MM-DD
   * format. The current version is `2021-06-14`.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {AssistantV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['version'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
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
    this.version = options.version;
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
   * @returns {Promise<AssistantV2.Response<AssistantV2.SessionResponse>>}
   */
  public createSession(
    params: AssistantV2.CreateSessionParams
  ): Promise<AssistantV2.Response<AssistantV2.SessionResponse>> {
    const _params = { ...params };
    const requiredParams = ['assistantId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'assistant_id': _params.assistantId,
    };

    const sdkHeaders = getSdkHeaders(
      AssistantV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createSession'
    );

    const parameters = {
      options: {
        url: '/v2/assistants/{assistant_id}/sessions',
        method: 'POST',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

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
   * @returns {Promise<AssistantV2.Response<AssistantV2.Empty>>}
   */
  public deleteSession(
    params: AssistantV2.DeleteSessionParams
  ): Promise<AssistantV2.Response<AssistantV2.Empty>> {
    const _params = { ...params };
    const requiredParams = ['assistantId', 'sessionId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'assistant_id': _params.assistantId,
      'session_id': _params.sessionId,
    };

    const sdkHeaders = getSdkHeaders(
      AssistantV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteSession'
    );

    const parameters = {
      options: {
        url: '/v2/assistants/{assistant_id}/sessions/{session_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
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
   * @param {string} [params.userId] - A string value that identifies the user who is interacting with the assistant.
   * The client must provide a unique identifier for each individual end user who accesses the application. For
   * user-based plans, this user ID is used to identify unique users for billing purposes. This string cannot contain
   * carriage return, newline, or tab characters. If no value is specified in the input, **user_id** is automatically
   * set to the value of **context.global.session_id**.
   *
   * **Note:** This property is the same as the **user_id** property in the global system context. If **user_id** is
   * specified in both locations, the value specified at the root is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV2.Response<AssistantV2.MessageResponse>>}
   */
  public message(
    params: AssistantV2.MessageParams
  ): Promise<AssistantV2.Response<AssistantV2.MessageResponse>> {
    const _params = { ...params };
    const requiredParams = ['assistantId', 'sessionId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'input': _params.input,
      'context': _params.context,
      'user_id': _params.userId,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'assistant_id': _params.assistantId,
      'session_id': _params.sessionId,
    };

    const sdkHeaders = getSdkHeaders(
      AssistantV2.DEFAULT_SERVICE_NAME,
      'v2',
      'message'
    );

    const parameters = {
      options: {
        url: '/v2/assistants/{assistant_id}/sessions/{session_id}/message',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

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
   * @param {string} [params.userId] - A string value that identifies the user who is interacting with the assistant.
   * The client must provide a unique identifier for each individual end user who accesses the application. For
   * user-based plans, this user ID is used to identify unique users for billing purposes. This string cannot contain
   * carriage return, newline, or tab characters. If no value is specified in the input, **user_id** is automatically
   * set to the value of **context.global.session_id**.
   *
   * **Note:** This property is the same as the **user_id** property in the global system context. If **user_id** is
   * specified in both locations in a message request, the value specified at the root is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV2.Response<AssistantV2.MessageResponseStateless>>}
   */
  public messageStateless(
    params: AssistantV2.MessageStatelessParams
  ): Promise<AssistantV2.Response<AssistantV2.MessageResponseStateless>> {
    const _params = { ...params };
    const requiredParams = ['assistantId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'input': _params.input,
      'context': _params.context,
      'user_id': _params.userId,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'assistant_id': _params.assistantId,
    };

    const sdkHeaders = getSdkHeaders(
      AssistantV2.DEFAULT_SERVICE_NAME,
      'v2',
      'messageStateless'
    );

    const parameters = {
      options: {
        url: '/v2/assistants/{assistant_id}/message',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * bulkClassify
   ************************/

  /**
   * Identify intents and entities in multiple user utterances.
   *
   * Send multiple user inputs to a dialog skill in a single request and receive information about the intents and
   * entities recognized in each input. This method is useful for testing and comparing the performance of different
   * skills or skill versions.
   *
   * This method is available only with Enterprise with Data Isolation plans.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.skillId - Unique identifier of the skill. To find the skill ID in the Watson Assistant user
   * interface, open the skill settings and click **API Details**.
   * @param {BulkClassifyUtterance[]} [params.input] - An array of input utterances to classify.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV2.Response<AssistantV2.BulkClassifyResponse>>}
   */
  public bulkClassify(
    params: AssistantV2.BulkClassifyParams
  ): Promise<AssistantV2.Response<AssistantV2.BulkClassifyResponse>> {
    const _params = { ...params };
    const requiredParams = ['skillId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'input': _params.input,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'skill_id': _params.skillId,
    };

    const sdkHeaders = getSdkHeaders(
      AssistantV2.DEFAULT_SERVICE_NAME,
      'v2',
      'bulkClassify'
    );

    const parameters = {
      options: {
        url: '/v2/skills/{skill_id}/workspace/bulk_classify',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * logs
   ************************/

  /**
   * List log events for an assistant.
   *
   * List the events from the log of an assistant.
   *
   * This method requires Manager access, and is available only with Enterprise plans.
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
   * @returns {Promise<AssistantV2.Response<AssistantV2.LogCollection>>}
   */
  public listLogs(
    params: AssistantV2.ListLogsParams
  ): Promise<AssistantV2.Response<AssistantV2.LogCollection>> {
    const _params = { ...params };
    const requiredParams = ['assistantId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'sort': _params.sort,
      'filter': _params.filter,
      'page_limit': _params.pageLimit,
      'cursor': _params.cursor,
    };

    const path = {
      'assistant_id': _params.assistantId,
    };

    const sdkHeaders = getSdkHeaders(
      AssistantV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listLogs'
    );

    const parameters = {
      options: {
        url: '/v2/assistants/{assistant_id}/logs',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
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
   * **Note:** This operation is intended only for deleting data associated with a single specific customer, not for
   * deleting data associated with multiple customers or for any other purpose. For more information, see [Labeling and
   * deleting data in Watson
   * Assistant](https://cloud.ibm.com/docs/assistant?topic=assistant-information-security#information-security-gdpr-wa).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customerId - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV2.Response<AssistantV2.Empty>>}
   */
  public deleteUserData(
    params: AssistantV2.DeleteUserDataParams
  ): Promise<AssistantV2.Response<AssistantV2.Empty>> {
    const _params = { ...params };
    const requiredParams = ['customerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'customer_id': _params.customerId,
    };

    const sdkHeaders = getSdkHeaders(
      AssistantV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteUserData'
    );

    const parameters = {
      options: {
        url: '/v2/user_data',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace AssistantV2 {
  /** Options for the `AssistantV2` constructor. */
  export interface Options extends UserOptions {
    /** Release date of the API version you want to use. Specify dates in YYYY-MM-DD format. The current version is
     *  `2021-06-14`.
     */
    version: string;
  }

  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty {}

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
    /** A string value that identifies the user who is interacting with the assistant. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For user-based plans, this user ID
     *  is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or
     *  tab characters. If no value is specified in the input, **user_id** is automatically set to the value of
     *  **context.global.session_id**.
     *
     *  **Note:** This property is the same as the **user_id** property in the global system context. If **user_id** is
     *  specified in both locations, the value specified at the root is used.
     */
    userId?: string;
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
    /** A string value that identifies the user who is interacting with the assistant. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For user-based plans, this user ID
     *  is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or
     *  tab characters. If no value is specified in the input, **user_id** is automatically set to the value of
     *  **context.global.session_id**.
     *
     *  **Note:** This property is the same as the **user_id** property in the global system context. If **user_id** is
     *  specified in both locations in a message request, the value specified at the root is used.
     */
    userId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `bulkClassify` operation. */
  export interface BulkClassifyParams {
    /** Unique identifier of the skill. To find the skill ID in the Watson Assistant user interface, open the skill
     *  settings and click **API Details**.
     */
    skillId: string;
    /** An array of input utterances to classify. */
    input?: BulkClassifyUtterance[];
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

  /** AgentAvailabilityMessage. */
  export interface AgentAvailabilityMessage {
    /** The text of the message. */
    message?: string;
  }

  /** BulkClassifyOutput. */
  export interface BulkClassifyOutput {
    /** The user input utterance to classify. */
    input?: BulkClassifyUtterance;
    /** An array of entities identified in the utterance. */
    entities?: RuntimeEntity[];
    /** An array of intents recognized in the utterance. */
    intents?: RuntimeIntent[];
  }

  /** BulkClassifyResponse. */
  export interface BulkClassifyResponse {
    /** An array of objects that contain classification information for the submitted input utterances. */
    output?: BulkClassifyOutput[];
  }

  /** The user input utterance to classify. */
  export interface BulkClassifyUtterance {
    /** The text of the input utterance. */
    text: string;
  }

  /** CaptureGroup. */
  export interface CaptureGroup {
    /** A recognized capture group for the entity. */
    group: string;
    /** Zero-based character offsets that indicate where the entity value begins and ends in the input text. */
    location?: number[];
  }

  /** Information used by an integration to transfer the conversation to a different channel. */
  export interface ChannelTransferInfo {
    /** An object specifying target channels available for the transfer. Each property of this object represents an
     *  available transfer target. Currently, the only supported property is **chat**, representing the web chat
     *  integration.
     */
    target: ChannelTransferTarget;
  }

  /** An object specifying target channels available for the transfer. Each property of this object represents an available transfer target. Currently, the only supported property is **chat**, representing the web chat integration. */
  export interface ChannelTransferTarget {
    /** Information for transferring to the web chat integration. */
    chat?: ChannelTransferTargetChat;
  }

  /** Information for transferring to the web chat integration. */
  export interface ChannelTransferTargetChat {
    /** The URL of the target web chat. */
    url?: string;
  }

  /** Dialog log message details. */
  export interface DialogLogMessage {
    /** The severity of the log message. */
    level: string;
    /** The text of the log message. */
    message: string;
    /** A code that indicates the category to which the error message belongs. */
    code: string;
    /** An object that identifies the dialog element that generated the error message. */
    source?: LogMessageSource;
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

  /** Routing or other contextual information to be used by target service desk systems. */
  export interface DialogNodeOutputConnectToAgentTransferInfo {
    target?: JsonObject;
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

  /** An object that identifies the dialog element that generated the error message. */
  export interface LogMessageSource {
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
    skills?: JsonObject;
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
     *  unique identifier for each individual end user who accesses the application. For user-based plans, this user ID
     *  is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or
     *  tab characters. If no value is specified in the input, **user_id** is automatically set to the value of
     *  **context.global.session_id**.
     *
     *  **Note:** This property is the same as the **user_id** property at the root of the message body. If **user_id**
     *  is specified in both locations in a message request, the value specified at the root is used.
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
     *  This value must be a UTC time value formatted according to ISO 8601 (for example, `2021-06-26T12:00:00Z` for
     *  noon UTC on 26 June 2021).
     *
     *  This property is included only if the new system entities are enabled for the skill.
     */
    reference_time?: string;
    /** The time at which the session started. With the stateful `message` method, the start time is always present,
     *  and is set by the service based on the time the session was created. With the stateless `message` method, the
     *  start time is set by the service in the response to the first message, and should be returned as part of the
     *  context with each subsequent message in the session.
     *
     *  This value is a UTC time value formatted according to ISO 8601 (for example, `2021-06-26T12:00:00Z` for noon UTC
     *  on 26 June 2021).
     */
    session_start_time?: string;
    /** An encoded string that represents the configuration state of the assistant at the beginning of the
     *  conversation. If you are using the stateless `message` method, save this value and then send it in the context
     *  of the subsequent message request to avoid disruptions if there are configuration changes during the
     *  conversation (such as a change to a skill the assistant uses).
     */
    state?: string;
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
    /** An encoded string that represents the current conversation state. By saving this value and then sending it
     *  in the context of a subsequent message request, you can return to an earlier point in the conversation. If you
     *  are using stateful sessions, you can also use a stored state value to restore a paused conversation whose
     *  session is expired.
     */
    state?: string;
    /** MessageContextSkillSystem accepts additional properties. */
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
    skills?: JsonObject;
  }

  /** An input object that includes the input text. */
  export interface MessageInput {
    /** The type of the message:
     *
     *  - `text`: The user input is processed normally by the assistant.
     *  - `search`: Only search results are returned. (Any dialog or actions skill is bypassed.)
     *
     *  **Note:** A `search` message results in an error if no search skill is configured for the assistant.
     */
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
    export?: boolean;
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
    /** The type of the message:
     *
     *  - `text`: The user input is processed normally by the assistant.
     *  - `search`: Only search results are returned. (Any dialog or actions skill is bypassed.)
     *
     *  **Note:** A `search` message results in an error if no search skill is configured for the assistant.
     */
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
    /** A string value that identifies the user who is interacting with the assistant. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For user-based plans, this user ID
     *  is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or
     *  tab characters. If no value is specified in the input, **user_id** is automatically set to the value of
     *  **context.global.session_id**.
     *
     *  **Note:** This property is the same as the **user_id** property in the global system context. If **user_id** is
     *  specified in both locations, the value specified at the root is used.
     */
    user_id?: string;
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
    /** A string value that identifies the user who is interacting with the assistant. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For user-based plans, this user ID
     *  is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or
     *  tab characters. If no value is specified in the input, **user_id** is automatically set to the value of
     *  **context.global.session_id**.
     *
     *  **Note:** This property is the same as the **user_id** property in the global system context.
     */
    user_id: string;
  }

  /** A stateless response from the Watson Assistant service. */
  export interface MessageResponseStateless {
    /** Assistant output to be rendered or processed by the client. */
    output: MessageOutput;
    /** Context data for the conversation. You can use this property to access context variables. The context is not
     *  stored by the assistant; to maintain session state, include the context from the response in the next message.
     */
    context: MessageContextStateless;
    /** A string value that identifies the user who is interacting with the assistant. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For user-based plans, this user ID
     *  is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or
     *  tab characters. If no value is specified in the input, **user_id** is automatically set to the value of
     *  **context.global.session_id**.
     *
     *  **Note:** This property is the same as the **user_id** property in the global system context.
     */
    user_id?: string;
  }

  /** ResponseGenericChannel. */
  export interface ResponseGenericChannel {
    /** A channel for which the response is intended. */
    channel?: string;
  }

  /** The entity value that was recognized in the user input. */
  export interface RuntimeEntity {
    /** An entity detected in the input. */
    entity: string;
    /** An array of zero-based character offsets that indicate where the detected entity values begin and end in the
     *  input text.
     */
    location?: number[];
    /** The term in the input text that was recognized as an entity value. */
    value: string;
    /** A decimal percentage that represents Watson's confidence in the recognized entity. */
    confidence?: number;
    /** **Deprecated.** Any metadata for the entity.
     *
     *  Beginning with the `2021-06-14` API version, the `metadata` property is no longer returned. For information
     *  about system entities recognized in the user input, see the `interpretation` property.
     */
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
  }

  /** SearchResult. */
  export interface SearchResult {
    /** The unique identifier of the document in the Discovery service collection.
     *
     *  This property is included in responses from search skills, which are available only to Plus or Enterprise plan
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
    /** An array specifying segments of text within the result that were identified as direct answers to the search
     *  query. Currently, only the single answer with the highest confidence (if any) is returned.
     *
     *  **Note:** This property uses the answer finding beta feature, and is available only if the search skill is
     *  connected to a Discovery v2 service instance.
     */
    answers?: SearchResultAnswer[];
  }

  /** An object specifing a segment of text that was identified as a direct answer to the search query. */
  export interface SearchResultAnswer {
    /** The text of the answer. */
    text: string;
    /** The confidence score for the answer, as returned by the Discovery service. */
    confidence: number;
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
    /** The confidence score for the given result, as returned by the Discovery service. */
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

  /** An object that identifies the dialog element that generated the error message. */
  export interface LogMessageSourceAction extends LogMessageSource {
    /** A string that indicates the type of dialog element that generated the error message. */
    type: string;
    /** The unique identifier of the action that generated the error message. */
    action: string;
  }

  /** An object that identifies the dialog element that generated the error message. */
  export interface LogMessageSourceDialogNode extends LogMessageSource {
    /** A string that indicates the type of dialog element that generated the error message. */
    type: string;
    /** The unique identifier of the dialog node that generated the error message. */
    dialog_node: string;
  }

  /** An object that identifies the dialog element that generated the error message. */
  export interface LogMessageSourceHandler extends LogMessageSource {
    /** A string that indicates the type of dialog element that generated the error message. */
    type: string;
    /** The unique identifier of the action that generated the error message. */
    action: string;
    /** The unique identifier of the step that generated the error message. */
    step?: string;
    /** The unique identifier of the handler that generated the error message. */
    handler: string;
  }

  /** An object that identifies the dialog element that generated the error message. */
  export interface LogMessageSourceStep extends LogMessageSource {
    /** A string that indicates the type of dialog element that generated the error message. */
    type: string;
    /** The unique identifier of the action that generated the error message. */
    action: string;
    /** The unique identifier of the step that generated the error message. */
    step: string;
  }

  /** RuntimeResponseGenericRuntimeResponseTypeChannelTransfer. */
  export interface RuntimeResponseGenericRuntimeResponseTypeChannelTransfer extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The message to display to the user when initiating a channel transfer. */
    message_to_user: string;
    /** Information used by an integration to transfer the conversation to a different channel. */
    transfer_info: ChannelTransferInfo;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /** RuntimeResponseGenericRuntimeResponseTypeConnectToAgent. */
  export interface RuntimeResponseGenericRuntimeResponseTypeConnectToAgent extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** A message to be sent to the human agent who will be taking over the conversation. */
    message_to_human_agent?: string;
    /** An optional message to be displayed to the user to indicate that the conversation will be transferred to the
     *  next available agent.
     */
    agent_available?: AgentAvailabilityMessage;
    /** An optional message to be displayed to the user to indicate that no online agent is available to take over
     *  the conversation.
     */
    agent_unavailable?: AgentAvailabilityMessage;
    /** Routing or other contextual information to be used by target service desk systems. */
    transfer_info?: DialogNodeOutputConnectToAgentTransferInfo;
    /** A label identifying the topic of the conversation, derived from the **title** property of the relevant node
     *  or the **topic** property of the dialog node response.
     */
    topic?: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /** RuntimeResponseGenericRuntimeResponseTypeImage. */
  export interface RuntimeResponseGenericRuntimeResponseTypeImage extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The `https:` URL of the image. */
    source: string;
    /** The title to show before the response. */
    title?: string;
    /** The description to show with the the response. */
    description?: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
    /** Descriptive text that can be used for screen readers or other situations where the image cannot be seen. */
    alt_text?: string;
  }

  /** RuntimeResponseGenericRuntimeResponseTypeOption. */
  export interface RuntimeResponseGenericRuntimeResponseTypeOption extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The title or introductory text to show before the response. */
    title: string;
    /** The description to show with the the response. */
    description?: string;
    /** The preferred type of control to display. */
    preference?: string;
    /** An array of objects describing the options from which the user can choose. */
    options: DialogNodeOutputOptionsElement[];
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /** RuntimeResponseGenericRuntimeResponseTypePause. */
  export interface RuntimeResponseGenericRuntimeResponseTypePause extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** How long to pause, in milliseconds. */
    time: number;
    /** Whether to send a "user is typing" event during the pause. */
    typing?: boolean;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /** RuntimeResponseGenericRuntimeResponseTypeSearch. */
  export interface RuntimeResponseGenericRuntimeResponseTypeSearch extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The title or introductory text to show before the response. This text is defined in the search skill
     *  configuration.
     */
    header: string;
    /** An array of objects that contains the search results to be displayed in the initial response to the user. */
    primary_results: SearchResult[];
    /** An array of objects that contains additional search results that can be displayed to the user upon request. */
    additional_results: SearchResult[];
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /** RuntimeResponseGenericRuntimeResponseTypeSuggestion. */
  export interface RuntimeResponseGenericRuntimeResponseTypeSuggestion extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The title or introductory text to show before the response. */
    title: string;
    /** An array of objects describing the possible matching dialog nodes from which the user can choose. */
    suggestions: DialogSuggestion[];
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /** RuntimeResponseGenericRuntimeResponseTypeText. */
  export interface RuntimeResponseGenericRuntimeResponseTypeText extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The text of the response. */
    text: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /** RuntimeResponseGenericRuntimeResponseTypeUserDefined. */
  export interface RuntimeResponseGenericRuntimeResponseTypeUserDefined extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** An object containing any properties for the user-defined response type. */
    user_defined: JsonObject;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }
}

export = AssistantV2;
