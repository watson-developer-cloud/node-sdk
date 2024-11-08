/**
 * (C) Copyright IBM Corp. 2018, 2024.
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
 * IBM OpenAPI SDK Code Generator Version: 3.96.1-5136e54a-20241108-203028
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM Watson&trade; Assistant service combines machine learning, natural language understanding, and an integrated
 * dialog editor to create conversation flows between your apps and your users.
 *
 * The Assistant v1 API provides authoring methods your application can use to create or update a workspace.
 *
 * API Version: 1.0
 * See: https://cloud.ibm.com/docs/assistant
 */

class AssistantV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.assistant.watson.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'conversation';

  /** Release date of the API version you want to use. Specify dates in YYYY-MM-DD format. The current version is
   *  `2021-11-27`.
   */
  version: string;

  /**
   * Construct a AssistantV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - Release date of the API version you want to use. Specify dates in YYYY-MM-DD
   * format. The current version is `2021-11-27`.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {AssistantV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const _requiredParams = ['version'];
    const _validationErrors = validateParams(options, _requiredParams, null);
    if (_validationErrors) {
      throw _validationErrors;
    }
    if (!options.serviceName) {
      options.serviceName = AssistantV1.DEFAULT_SERVICE_NAME;
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
   * message
   ************************/

  /**
   * Get response to user input.
   *
   * Send user input to a workspace and receive a response.
   *
   * **Important:** This method has been superseded by the new v2 runtime API. The v2 API offers significant advantages,
   * including ease of deployment, automatic state management, versioning, and search capabilities. For more
   * information, see the [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-api-overview).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {MessageInput} [params.input] - An input object that includes the input text.
   * @param {RuntimeIntent[]} [params.intents] - Intents to use when evaluating the user input. Include intents from the
   * previous response to continue using those intents rather than trying to recognize intents in the new input.
   * @param {RuntimeEntity[]} [params.entities] - Entities to use when evaluating the message. Include entities from the
   * previous response to continue using those entities rather than detecting entities in the new input.
   * @param {boolean} [params.alternateIntents] - Whether to return more than one intent. A value of `true` indicates
   * that all matching intents are returned.
   * @param {Context} [params.context] - State information for the conversation. To maintain state, include the context
   * from the previous response.
   * @param {OutputData} [params.output] - An output object that includes the response to the user, the dialog nodes
   * that were triggered, and messages from the log.
   * @param {string} [params.userId] - A string value that identifies the user who is interacting with the workspace.
   * The client must provide a unique identifier for each individual end user who accesses the application. For
   * user-based plans, this user ID is used to identify unique users for billing purposes. This string cannot contain
   * carriage return, newline, or tab characters. If no value is specified in the input, **user_id** is automatically
   * set to the value of **context.conversation_id**.
   *
   * **Note:** This property is the same as the **user_id** property in the context metadata. If **user_id** is
   * specified in both locations in a message request, the value specified at the root is used.
   * @param {boolean} [params.nodesVisitedDetails] - Whether to include additional diagnostic information about the
   * dialog nodes that were visited during processing of the message.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.MessageResponse>>}
   */
  public message(
    params: AssistantV1.MessageParams
  ): Promise<AssistantV1.Response<AssistantV1.MessageResponse>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', 'input', 'intents', 'entities', 'alternateIntents', 'context', 'output', 'userId', 'nodesVisitedDetails', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'input': _params.input,
      'intents': _params.intents,
      'entities': _params.entities,
      'alternate_intents': _params.alternateIntents,
      'context': _params.context,
      'output': _params.output,
      'user_id': _params.userId,
    };

    const query = {
      'version': this.version,
      'nodes_visited_details': _params.nodesVisitedDetails,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'message');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/message',
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
   * Send multiple user inputs to a workspace in a single request and receive information about the intents and entities
   * recognized in each input. This method is useful for testing and comparing the performance of different workspaces.
   *
   * This method is available only with Enterprise with Data Isolation plans.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {BulkClassifyUtterance[]} [params.input] - An array of input utterances to classify.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.BulkClassifyResponse>>}
   */
  public bulkClassify(
    params: AssistantV1.BulkClassifyParams
  ): Promise<AssistantV1.Response<AssistantV1.BulkClassifyResponse>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', 'input', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'input': _params.input,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'bulkClassify');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/bulk_classify',
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
   * workspaces
   ************************/

  /**
   * List workspaces.
   *
   * List the workspaces associated with a Watson Assistant service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {boolean} [params.includeCount] - Whether to include information about the number of records that satisfy
   * the request, regardless of the page limit. If this parameter is `true`, the `pagination` object in the response
   * includes the `total` property.
   * @param {string} [params.sort] - The attribute by which returned workspaces will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.WorkspaceCollection>>}
   */
  public listWorkspaces(
    params?: AssistantV1.ListWorkspacesParams
  ): Promise<AssistantV1.Response<AssistantV1.WorkspaceCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['pageLimit', 'includeCount', 'sort', 'cursor', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'page_limit': _params.pageLimit,
      'include_count': _params.includeCount,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.includeAudit,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listWorkspaces');

    const parameters = {
      options: {
        url: '/v1/workspaces',
        method: 'GET',
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

  /**
   * Create workspace.
   *
   * Create a workspace based on component objects. You must provide workspace components defining the content of the
   * new workspace.
   *
   * **Note:** The new workspace data cannot be larger than 1.5 MB. For larger requests, use the **Create workspace
   * asynchronously** method.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - The name of the workspace. This string cannot contain carriage return, newline, or
   * tab characters.
   * @param {string} [params.description] - The description of the workspace. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.language] - The language of the workspace.
   * @param {DialogNode[]} [params.dialogNodes] - An array of objects describing the dialog nodes in the workspace.
   * @param {Counterexample[]} [params.counterexamples] - An array of objects defining input examples that have been
   * marked as irrelevant input.
   * @param {JsonObject} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learningOptOut] - Whether training data from the workspace (including artifacts such as
   * intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training
   * data is not to be used.
   * @param {WorkspaceSystemSettings} [params.systemSettings] - Global settings for the workspace.
   * @param {Webhook[]} [params.webhooks] -
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects describing the entities for the workspace.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Workspace>>}
   */
  public createWorkspace(
    params?: AssistantV1.CreateWorkspaceParams
  ): Promise<AssistantV1.Response<AssistantV1.Workspace>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['name', 'description', 'language', 'dialogNodes', 'counterexamples', 'metadata', 'learningOptOut', 'systemSettings', 'webhooks', 'intents', 'entities', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'language': _params.language,
      'dialog_nodes': _params.dialogNodes,
      'counterexamples': _params.counterexamples,
      'metadata': _params.metadata,
      'learning_opt_out': _params.learningOptOut,
      'system_settings': _params.systemSettings,
      'webhooks': _params.webhooks,
      'intents': _params.intents,
      'entities': _params.entities,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'createWorkspace');

    const parameters = {
      options: {
        url: '/v1/workspaces',
        method: 'POST',
        body,
        qs: query,
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
   * Get information about a workspace.
   *
   * Get information about a workspace, optionally including all workspace content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {string} [params.sort] - Indicates how the returned workspace data will be sorted. This parameter is valid
   * only if **export**=`true`. Specify `sort=stable` to sort all workspace objects by unique identifier, in ascending
   * alphabetical order.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Workspace>>}
   */
  public getWorkspace(
    params: AssistantV1.GetWorkspaceParams
  ): Promise<AssistantV1.Response<AssistantV1.Workspace>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', '_export', 'includeAudit', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'export': _params._export,
      'include_audit': _params.includeAudit,
      'sort': _params.sort,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'getWorkspace');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
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

  /**
   * Update workspace.
   *
   * Update an existing workspace with new or modified data. You must provide component objects defining the content of
   * the updated workspace.
   *
   * **Note:** The new workspace data cannot be larger than 1.5 MB. For larger requests, use the **Update workspace
   * asynchronously** method.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} [params.name] - The name of the workspace. This string cannot contain carriage return, newline, or
   * tab characters.
   * @param {string} [params.description] - The description of the workspace. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.language] - The language of the workspace.
   * @param {DialogNode[]} [params.dialogNodes] - An array of objects describing the dialog nodes in the workspace.
   * @param {Counterexample[]} [params.counterexamples] - An array of objects defining input examples that have been
   * marked as irrelevant input.
   * @param {JsonObject} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learningOptOut] - Whether training data from the workspace (including artifacts such as
   * intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training
   * data is not to be used.
   * @param {WorkspaceSystemSettings} [params.systemSettings] - Global settings for the workspace.
   * @param {Webhook[]} [params.webhooks] -
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects describing the entities for the workspace.
   * @param {boolean} [params.append] - Whether the new data is to be appended to the existing data in the object. If
   * **append**=`false`, elements included in the new data completely replace the corresponding existing elements,
   * including all subelements. For example, if the new data for a workspace includes **entities** and
   * **append**=`false`, all existing entities in the workspace are discarded and replaced with the new entities.
   *
   * If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the new
   * data collide with existing elements, the update request fails.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Workspace>>}
   */
  public updateWorkspace(
    params: AssistantV1.UpdateWorkspaceParams
  ): Promise<AssistantV1.Response<AssistantV1.Workspace>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', 'name', 'description', 'language', 'dialogNodes', 'counterexamples', 'metadata', 'learningOptOut', 'systemSettings', 'webhooks', 'intents', 'entities', 'append', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'language': _params.language,
      'dialog_nodes': _params.dialogNodes,
      'counterexamples': _params.counterexamples,
      'metadata': _params.metadata,
      'learning_opt_out': _params.learningOptOut,
      'system_settings': _params.systemSettings,
      'webhooks': _params.webhooks,
      'intents': _params.intents,
      'entities': _params.entities,
    };

    const query = {
      'version': this.version,
      'append': _params.append,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'updateWorkspace');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
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
   * Delete workspace.
   *
   * Delete a workspace from the service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.EmptyObject>>}
   */
  public deleteWorkspace(
    params: AssistantV1.DeleteWorkspaceParams
  ): Promise<AssistantV1.Response<AssistantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteWorkspace');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
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

  /**
   * Create workspace asynchronously.
   *
   * Create a workspace asynchronously based on component objects. You must provide workspace components defining the
   * content of the new workspace.
   *
   * A successful call to this method only initiates asynchronous creation of the workspace. The new workspace is not
   * available until processing completes. To check the status of the asynchronous operation, use the **Get information
   * about a workspace** method.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - The name of the workspace. This string cannot contain carriage return, newline, or
   * tab characters.
   * @param {string} [params.description] - The description of the workspace. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.language] - The language of the workspace.
   * @param {DialogNode[]} [params.dialogNodes] - An array of objects describing the dialog nodes in the workspace.
   * @param {Counterexample[]} [params.counterexamples] - An array of objects defining input examples that have been
   * marked as irrelevant input.
   * @param {JsonObject} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learningOptOut] - Whether training data from the workspace (including artifacts such as
   * intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training
   * data is not to be used.
   * @param {WorkspaceSystemSettings} [params.systemSettings] - Global settings for the workspace.
   * @param {Webhook[]} [params.webhooks] -
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects describing the entities for the workspace.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Workspace>>}
   */
  public createWorkspaceAsync(
    params?: AssistantV1.CreateWorkspaceAsyncParams
  ): Promise<AssistantV1.Response<AssistantV1.Workspace>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['name', 'description', 'language', 'dialogNodes', 'counterexamples', 'metadata', 'learningOptOut', 'systemSettings', 'webhooks', 'intents', 'entities', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'language': _params.language,
      'dialog_nodes': _params.dialogNodes,
      'counterexamples': _params.counterexamples,
      'metadata': _params.metadata,
      'learning_opt_out': _params.learningOptOut,
      'system_settings': _params.systemSettings,
      'webhooks': _params.webhooks,
      'intents': _params.intents,
      'entities': _params.entities,
    };

    const query = {
      'version': this.version,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'createWorkspaceAsync');

    const parameters = {
      options: {
        url: '/v1/workspaces_async',
        method: 'POST',
        body,
        qs: query,
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
   * Update workspace asynchronously.
   *
   * Update an existing workspace asynchronously with new or modified data. You must provide component objects defining
   * the content of the updated workspace.
   *
   * A successful call to this method only initiates an asynchronous update of the workspace. The updated workspace is
   * not available until processing completes. To check the status of the asynchronous operation, use the **Get
   * information about a workspace** method.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} [params.name] - The name of the workspace. This string cannot contain carriage return, newline, or
   * tab characters.
   * @param {string} [params.description] - The description of the workspace. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.language] - The language of the workspace.
   * @param {DialogNode[]} [params.dialogNodes] - An array of objects describing the dialog nodes in the workspace.
   * @param {Counterexample[]} [params.counterexamples] - An array of objects defining input examples that have been
   * marked as irrelevant input.
   * @param {JsonObject} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learningOptOut] - Whether training data from the workspace (including artifacts such as
   * intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training
   * data is not to be used.
   * @param {WorkspaceSystemSettings} [params.systemSettings] - Global settings for the workspace.
   * @param {Webhook[]} [params.webhooks] -
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects describing the entities for the workspace.
   * @param {boolean} [params.append] - Whether the new data is to be appended to the existing data in the object. If
   * **append**=`false`, elements included in the new data completely replace the corresponding existing elements,
   * including all subelements. For example, if the new data for a workspace includes **entities** and
   * **append**=`false`, all existing entities in the workspace are discarded and replaced with the new entities.
   *
   * If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the new
   * data collide with existing elements, the update request fails.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Workspace>>}
   */
  public updateWorkspaceAsync(
    params: AssistantV1.UpdateWorkspaceAsyncParams
  ): Promise<AssistantV1.Response<AssistantV1.Workspace>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', 'name', 'description', 'language', 'dialogNodes', 'counterexamples', 'metadata', 'learningOptOut', 'systemSettings', 'webhooks', 'intents', 'entities', 'append', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'language': _params.language,
      'dialog_nodes': _params.dialogNodes,
      'counterexamples': _params.counterexamples,
      'metadata': _params.metadata,
      'learning_opt_out': _params.learningOptOut,
      'system_settings': _params.systemSettings,
      'webhooks': _params.webhooks,
      'intents': _params.intents,
      'entities': _params.entities,
    };

    const query = {
      'version': this.version,
      'append': _params.append,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'updateWorkspaceAsync');

    const parameters = {
      options: {
        url: '/v1/workspaces_async/{workspace_id}',
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
   * Export workspace asynchronously.
   *
   * Export the entire workspace asynchronously, including all workspace content.
   *
   * A successful call to this method only initiates an asynchronous export. The exported JSON data is not available
   * until processing completes. After the initial request is submitted, you can continue to poll by calling the same
   * request again and checking the value of the **status** property. When processing has completed, the request returns
   * the exported JSON data. Remember that the usual rate limits apply.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {string} [params.sort] - Indicates how the returned workspace data will be sorted. Specify `sort=stable` to
   * sort all workspace objects by unique identifier, in ascending alphabetical order.
   * @param {boolean} [params.verbose] - Whether the response should include the `counts` property, which indicates how
   * many of each component (such as intents and entities) the workspace contains.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Workspace>>}
   */
  public exportWorkspaceAsync(
    params: AssistantV1.ExportWorkspaceAsyncParams
  ): Promise<AssistantV1.Response<AssistantV1.Workspace>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', 'includeAudit', 'sort', 'verbose', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
      'sort': _params.sort,
      'verbose': _params.verbose,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'exportWorkspaceAsync');

    const parameters = {
      options: {
        url: '/v1/workspaces_async/{workspace_id}/export',
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
   * intents
   ************************/

  /**
   * List intents.
   *
   * List the intents for a workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {boolean} [params.includeCount] - Whether to include information about the number of records that satisfy
   * the request, regardless of the page limit. If this parameter is `true`, the `pagination` object in the response
   * includes the `total` property.
   * @param {string} [params.sort] - The attribute by which returned intents will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.IntentCollection>>}
   */
  public listIntents(
    params: AssistantV1.ListIntentsParams
  ): Promise<AssistantV1.Response<AssistantV1.IntentCollection>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', '_export', 'pageLimit', 'includeCount', 'sort', 'cursor', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'export': _params._export,
      'page_limit': _params.pageLimit,
      'include_count': _params.includeCount,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listIntents');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents',
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

  /**
   * Create intent.
   *
   * Create a new intent.
   *
   * If you want to create multiple intents with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The name of the intent. This string must conform to the following restrictions:
   * - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * @param {string} [params.description] - The description of the intent. This string cannot contain carriage return,
   * newline, or tab characters.
   * @param {Example[]} [params.examples] - An array of user input examples for the intent.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Intent>>}
   */
  public createIntent(
    params: AssistantV1.CreateIntentParams
  ): Promise<AssistantV1.Response<AssistantV1.Intent>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'intent'];
    const _validParams = ['workspaceId', 'intent', 'description', 'examples', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'intent': _params.intent,
      'description': _params.description,
      'examples': _params.examples,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'createIntent');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents',
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
   * Get intent.
   *
   * Get information about an intent, optionally including all intent content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Intent>>}
   */
  public getIntent(
    params: AssistantV1.GetIntentParams
  ): Promise<AssistantV1.Response<AssistantV1.Intent>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'intent'];
    const _validParams = ['workspaceId', 'intent', '_export', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'export': _params._export,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'intent': _params.intent,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'getIntent');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
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

  /**
   * Update intent.
   *
   * Update an existing intent with new or modified data. You must provide component objects defining the content of the
   * updated intent.
   *
   * If you want to update multiple intents with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} [params.newIntent] - The name of the intent. This string must conform to the following
   * restrictions:
   * - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * @param {string} [params.newDescription] - The description of the intent. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {Example[]} [params.newExamples] - An array of user input examples for the intent.
   * @param {boolean} [params.append] - Whether the new data is to be appended to the existing data in the object. If
   * **append**=`false`, elements included in the new data completely replace the corresponding existing elements,
   * including all subelements. For example, if the new data for the intent includes **examples** and
   * **append**=`false`, all existing examples for the intent are discarded and replaced with the new examples.
   *
   * If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the new
   * data collide with existing elements, the update request fails.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Intent>>}
   */
  public updateIntent(
    params: AssistantV1.UpdateIntentParams
  ): Promise<AssistantV1.Response<AssistantV1.Intent>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'intent'];
    const _validParams = ['workspaceId', 'intent', 'newIntent', 'newDescription', 'newExamples', 'append', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'intent': _params.newIntent,
      'description': _params.newDescription,
      'examples': _params.newExamples,
    };

    const query = {
      'version': this.version,
      'append': _params.append,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'intent': _params.intent,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'updateIntent');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
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
   * Delete intent.
   *
   * Delete an intent from a workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.EmptyObject>>}
   */
  public deleteIntent(
    params: AssistantV1.DeleteIntentParams
  ): Promise<AssistantV1.Response<AssistantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'intent'];
    const _validParams = ['workspaceId', 'intent', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'intent': _params.intent,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteIntent');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
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
   * examples
   ************************/

  /**
   * List user input examples.
   *
   * List the user input examples for an intent, optionally including contextual entity mentions.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {boolean} [params.includeCount] - Whether to include information about the number of records that satisfy
   * the request, regardless of the page limit. If this parameter is `true`, the `pagination` object in the response
   * includes the `total` property.
   * @param {string} [params.sort] - The attribute by which returned examples will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.ExampleCollection>>}
   */
  public listExamples(
    params: AssistantV1.ListExamplesParams
  ): Promise<AssistantV1.Response<AssistantV1.ExampleCollection>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'intent'];
    const _validParams = ['workspaceId', 'intent', 'pageLimit', 'includeCount', 'sort', 'cursor', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'page_limit': _params.pageLimit,
      'include_count': _params.includeCount,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'intent': _params.intent,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listExamples');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
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

  /**
   * Create user input example.
   *
   * Add a new user input example to an intent.
   *
   * If you want to add multiple examples with a single API call, consider using the **[Update intent](#update-intent)**
   * method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of a user input example. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {Mention[]} [params.mentions] - An array of contextual entity mentions.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Example>>}
   */
  public createExample(
    params: AssistantV1.CreateExampleParams
  ): Promise<AssistantV1.Response<AssistantV1.Example>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'intent', 'text'];
    const _validParams = ['workspaceId', 'intent', 'text', 'mentions', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'text': _params.text,
      'mentions': _params.mentions,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'intent': _params.intent,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'createExample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
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
   * Get user input example.
   *
   * Get information about a user input example.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of the user input example.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Example>>}
   */
  public getExample(
    params: AssistantV1.GetExampleParams
  ): Promise<AssistantV1.Response<AssistantV1.Example>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'intent', 'text'];
    const _validParams = ['workspaceId', 'intent', 'text', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'intent': _params.intent,
      'text': _params.text,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'getExample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
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

  /**
   * Update user input example.
   *
   * Update the text of a user input example.
   *
   * If you want to update multiple examples with a single API call, consider using the **[Update
   * intent](#update-intent)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of the user input example.
   * @param {string} [params.newText] - The text of the user input example. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {Mention[]} [params.newMentions] - An array of contextual entity mentions.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Example>>}
   */
  public updateExample(
    params: AssistantV1.UpdateExampleParams
  ): Promise<AssistantV1.Response<AssistantV1.Example>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'intent', 'text'];
    const _validParams = ['workspaceId', 'intent', 'text', 'newText', 'newMentions', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'text': _params.newText,
      'mentions': _params.newMentions,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'intent': _params.intent,
      'text': _params.text,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'updateExample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
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
   * Delete user input example.
   *
   * Delete a user input example from an intent.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of the user input example.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.EmptyObject>>}
   */
  public deleteExample(
    params: AssistantV1.DeleteExampleParams
  ): Promise<AssistantV1.Response<AssistantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'intent', 'text'];
    const _validParams = ['workspaceId', 'intent', 'text', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'intent': _params.intent,
      'text': _params.text,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteExample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
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
   * counterexamples
   ************************/

  /**
   * List counterexamples.
   *
   * List the counterexamples for a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {boolean} [params.includeCount] - Whether to include information about the number of records that satisfy
   * the request, regardless of the page limit. If this parameter is `true`, the `pagination` object in the response
   * includes the `total` property.
   * @param {string} [params.sort] - The attribute by which returned counterexamples will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.CounterexampleCollection>>}
   */
  public listCounterexamples(
    params: AssistantV1.ListCounterexamplesParams
  ): Promise<AssistantV1.Response<AssistantV1.CounterexampleCollection>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', 'pageLimit', 'includeCount', 'sort', 'cursor', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'page_limit': _params.pageLimit,
      'include_count': _params.includeCount,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listCounterexamples');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples',
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

  /**
   * Create counterexample.
   *
   * Add a new counterexample to a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * If you want to add multiple counterexamples with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input marked as irrelevant input. This string must conform to the
   * following restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Counterexample>>}
   */
  public createCounterexample(
    params: AssistantV1.CreateCounterexampleParams
  ): Promise<AssistantV1.Response<AssistantV1.Counterexample>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'text'];
    const _validParams = ['workspaceId', 'text', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'text': _params.text,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'createCounterexample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples',
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
   * Get counterexample.
   *
   * Get information about a counterexample. Counterexamples are examples that have been marked as irrelevant input.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Counterexample>>}
   */
  public getCounterexample(
    params: AssistantV1.GetCounterexampleParams
  ): Promise<AssistantV1.Response<AssistantV1.Counterexample>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'text'];
    const _validParams = ['workspaceId', 'text', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'text': _params.text,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'getCounterexample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
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

  /**
   * Update counterexample.
   *
   * Update the text of a counterexample. Counterexamples are examples that have been marked as irrelevant input.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {string} [params.newText] - The text of a user input marked as irrelevant input. This string must conform to
   * the following restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Counterexample>>}
   */
  public updateCounterexample(
    params: AssistantV1.UpdateCounterexampleParams
  ): Promise<AssistantV1.Response<AssistantV1.Counterexample>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'text'];
    const _validParams = ['workspaceId', 'text', 'newText', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'text': _params.newText,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'text': _params.text,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'updateCounterexample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
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
   * Delete counterexample.
   *
   * Delete a counterexample from a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.EmptyObject>>}
   */
  public deleteCounterexample(
    params: AssistantV1.DeleteCounterexampleParams
  ): Promise<AssistantV1.Response<AssistantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'text'];
    const _validParams = ['workspaceId', 'text', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'text': _params.text,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCounterexample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
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
   * entities
   ************************/

  /**
   * List entities.
   *
   * List the entities for a workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {boolean} [params.includeCount] - Whether to include information about the number of records that satisfy
   * the request, regardless of the page limit. If this parameter is `true`, the `pagination` object in the response
   * includes the `total` property.
   * @param {string} [params.sort] - The attribute by which returned entities will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.EntityCollection>>}
   */
  public listEntities(
    params: AssistantV1.ListEntitiesParams
  ): Promise<AssistantV1.Response<AssistantV1.EntityCollection>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', '_export', 'pageLimit', 'includeCount', 'sort', 'cursor', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'export': _params._export,
      'page_limit': _params.pageLimit,
      'include_count': _params.includeCount,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listEntities');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities',
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

  /**
   * Create entity.
   *
   * Create a new entity, or enable a system entity.
   *
   * If you want to create multiple entities with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity. This string must conform to the following restrictions:
   * - It can contain only Unicode alphanumeric, underscore, and hyphen characters.
   * - If you specify an entity name beginning with the reserved prefix `sys-`, it must be the name of a system entity
   * that you want to enable. (Any entity content specified with the request is ignored.).
   * @param {string} [params.description] - The description of the entity. This string cannot contain carriage return,
   * newline, or tab characters.
   * @param {JsonObject} [params.metadata] - Any metadata related to the entity.
   * @param {boolean} [params.fuzzyMatch] - Whether to use fuzzy matching for the entity.
   * @param {CreateValue[]} [params.values] - An array of objects describing the entity values.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Entity>>}
   */
  public createEntity(
    params: AssistantV1.CreateEntityParams
  ): Promise<AssistantV1.Response<AssistantV1.Entity>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity'];
    const _validParams = ['workspaceId', 'entity', 'description', 'metadata', 'fuzzyMatch', 'values', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'entity': _params.entity,
      'description': _params.description,
      'metadata': _params.metadata,
      'fuzzy_match': _params.fuzzyMatch,
      'values': _params.values,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'createEntity');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities',
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
   * Get entity.
   *
   * Get information about an entity, optionally including all entity content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Entity>>}
   */
  public getEntity(
    params: AssistantV1.GetEntityParams
  ): Promise<AssistantV1.Response<AssistantV1.Entity>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity'];
    const _validParams = ['workspaceId', 'entity', '_export', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'export': _params._export,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'getEntity');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
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

  /**
   * Update entity.
   *
   * Update an existing entity with new or modified data. You must provide component objects defining the content of the
   * updated entity.
   *
   * If you want to update multiple entities with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} [params.newEntity] - The name of the entity. This string must conform to the following
   * restrictions:
   * - It can contain only Unicode alphanumeric, underscore, and hyphen characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * @param {string} [params.newDescription] - The description of the entity. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {JsonObject} [params.newMetadata] - Any metadata related to the entity.
   * @param {boolean} [params.newFuzzyMatch] - Whether to use fuzzy matching for the entity.
   * @param {CreateValue[]} [params.newValues] - An array of objects describing the entity values.
   * @param {boolean} [params.append] - Whether the new data is to be appended to the existing data in the entity. If
   * **append**=`false`, elements included in the new data completely replace the corresponding existing elements,
   * including all subelements. For example, if the new data for the entity includes **values** and **append**=`false`,
   * all existing values for the entity are discarded and replaced with the new values.
   *
   * If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the new
   * data collide with existing elements, the update request fails.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Entity>>}
   */
  public updateEntity(
    params: AssistantV1.UpdateEntityParams
  ): Promise<AssistantV1.Response<AssistantV1.Entity>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity'];
    const _validParams = ['workspaceId', 'entity', 'newEntity', 'newDescription', 'newMetadata', 'newFuzzyMatch', 'newValues', 'append', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'entity': _params.newEntity,
      'description': _params.newDescription,
      'metadata': _params.newMetadata,
      'fuzzy_match': _params.newFuzzyMatch,
      'values': _params.newValues,
    };

    const query = {
      'version': this.version,
      'append': _params.append,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'updateEntity');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
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
   * Delete entity.
   *
   * Delete an entity from a workspace, or disable a system entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.EmptyObject>>}
   */
  public deleteEntity(
    params: AssistantV1.DeleteEntityParams
  ): Promise<AssistantV1.Response<AssistantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity'];
    const _validParams = ['workspaceId', 'entity', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteEntity');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
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
   * mentions
   ************************/

  /**
   * List entity mentions.
   *
   * List mentions for a contextual entity. An entity mention is an occurrence of a contextual entity in the context of
   * an intent user input example.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.EntityMentionCollection>>}
   */
  public listMentions(
    params: AssistantV1.ListMentionsParams
  ): Promise<AssistantV1.Response<AssistantV1.EntityMentionCollection>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity'];
    const _validParams = ['workspaceId', 'entity', '_export', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'export': _params._export,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listMentions');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/mentions',
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
   * values
   ************************/

  /**
   * List entity values.
   *
   * List the values for an entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {boolean} [params.includeCount] - Whether to include information about the number of records that satisfy
   * the request, regardless of the page limit. If this parameter is `true`, the `pagination` object in the response
   * includes the `total` property.
   * @param {string} [params.sort] - The attribute by which returned entity values will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.ValueCollection>>}
   */
  public listValues(
    params: AssistantV1.ListValuesParams
  ): Promise<AssistantV1.Response<AssistantV1.ValueCollection>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity'];
    const _validParams = ['workspaceId', 'entity', '_export', 'pageLimit', 'includeCount', 'sort', 'cursor', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'export': _params._export,
      'page_limit': _params.pageLimit,
      'include_count': _params.includeCount,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listValues');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
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

  /**
   * Create entity value.
   *
   * Create a new value for an entity.
   *
   * If you want to create multiple entity values with a single API call, consider using the **[Update
   * entity](#update-entity)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {JsonObject} [params.metadata] - Any metadata related to the entity value.
   * @param {string} [params.type] - Specifies the type of entity value.
   * @param {string[]} [params.synonyms] - An array of synonyms for the entity value. A value can specify either
   * synonyms or patterns (depending on the value type), but not both. A synonym must conform to the following
   * resrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {string[]} [params.patterns] - An array of patterns for the entity value. A value can specify either
   * synonyms or patterns (depending on the value type), but not both. A pattern is a regular expression; for more
   * information about how to specify a pattern, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-entities#entities-create-dictionary-based).
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Value>>}
   */
  public createValue(
    params: AssistantV1.CreateValueParams
  ): Promise<AssistantV1.Response<AssistantV1.Value>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity', 'value'];
    const _validParams = ['workspaceId', 'entity', 'value', 'metadata', 'type', 'synonyms', 'patterns', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
      'metadata': _params.metadata,
      'type': _params.type,
      'synonyms': _params.synonyms,
      'patterns': _params.patterns,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'createValue');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
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
   * Get entity value.
   *
   * Get information about an entity value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Value>>}
   */
  public getValue(
    params: AssistantV1.GetValueParams
  ): Promise<AssistantV1.Response<AssistantV1.Value>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity', 'value'];
    const _validParams = ['workspaceId', 'entity', 'value', '_export', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'export': _params._export,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
      'value': _params.value,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'getValue');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
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

  /**
   * Update entity value.
   *
   * Update an existing entity value with new or modified data. You must provide component objects defining the content
   * of the updated entity value.
   *
   * If you want to update multiple entity values with a single API call, consider using the **[Update
   * entity](#update-entity)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} [params.newValue] - The text of the entity value. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {JsonObject} [params.newMetadata] - Any metadata related to the entity value.
   * @param {string} [params.newType] - Specifies the type of entity value.
   * @param {string[]} [params.newSynonyms] - An array of synonyms for the entity value. A value can specify either
   * synonyms or patterns (depending on the value type), but not both. A synonym must conform to the following
   * resrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {string[]} [params.newPatterns] - An array of patterns for the entity value. A value can specify either
   * synonyms or patterns (depending on the value type), but not both. A pattern is a regular expression; for more
   * information about how to specify a pattern, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-entities#entities-create-dictionary-based).
   * @param {boolean} [params.append] - Whether the new data is to be appended to the existing data in the entity value.
   * If **append**=`false`, elements included in the new data completely replace the corresponding existing elements,
   * including all subelements. For example, if the new data for the entity value includes **synonyms** and
   * **append**=`false`, all existing synonyms for the entity value are discarded and replaced with the new synonyms.
   *
   * If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the new
   * data collide with existing elements, the update request fails.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Value>>}
   */
  public updateValue(
    params: AssistantV1.UpdateValueParams
  ): Promise<AssistantV1.Response<AssistantV1.Value>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity', 'value'];
    const _validParams = ['workspaceId', 'entity', 'value', 'newValue', 'newMetadata', 'newType', 'newSynonyms', 'newPatterns', 'append', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.newValue,
      'metadata': _params.newMetadata,
      'type': _params.newType,
      'synonyms': _params.newSynonyms,
      'patterns': _params.newPatterns,
    };

    const query = {
      'version': this.version,
      'append': _params.append,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
      'value': _params.value,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'updateValue');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
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
   * Delete entity value.
   *
   * Delete a value from an entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.EmptyObject>>}
   */
  public deleteValue(
    params: AssistantV1.DeleteValueParams
  ): Promise<AssistantV1.Response<AssistantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity', 'value'];
    const _validParams = ['workspaceId', 'entity', 'value', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
      'value': _params.value,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteValue');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
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
   * synonyms
   ************************/

  /**
   * List entity value synonyms.
   *
   * List the synonyms for an entity value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {boolean} [params.includeCount] - Whether to include information about the number of records that satisfy
   * the request, regardless of the page limit. If this parameter is `true`, the `pagination` object in the response
   * includes the `total` property.
   * @param {string} [params.sort] - The attribute by which returned entity value synonyms will be sorted. To reverse
   * the sort order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.SynonymCollection>>}
   */
  public listSynonyms(
    params: AssistantV1.ListSynonymsParams
  ): Promise<AssistantV1.Response<AssistantV1.SynonymCollection>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity', 'value'];
    const _validParams = ['workspaceId', 'entity', 'value', 'pageLimit', 'includeCount', 'sort', 'cursor', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'page_limit': _params.pageLimit,
      'include_count': _params.includeCount,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
      'value': _params.value,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listSynonyms');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
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

  /**
   * Create entity value synonym.
   *
   * Add a new synonym to an entity value.
   *
   * If you want to create multiple synonyms with a single API call, consider using the **[Update
   * entity](#update-entity)** or **[Update entity value](#update-entity-value)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym. This string must conform to the following restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Synonym>>}
   */
  public createSynonym(
    params: AssistantV1.CreateSynonymParams
  ): Promise<AssistantV1.Response<AssistantV1.Synonym>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];
    const _validParams = ['workspaceId', 'entity', 'value', 'synonym', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'synonym': _params.synonym,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
      'value': _params.value,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'createSynonym');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
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
   * Get entity value synonym.
   *
   * Get information about a synonym of an entity value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Synonym>>}
   */
  public getSynonym(
    params: AssistantV1.GetSynonymParams
  ): Promise<AssistantV1.Response<AssistantV1.Synonym>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];
    const _validParams = ['workspaceId', 'entity', 'value', 'synonym', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
      'value': _params.value,
      'synonym': _params.synonym,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'getSynonym');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
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

  /**
   * Update entity value synonym.
   *
   * Update an existing entity value synonym with new text.
   *
   * If you want to update multiple synonyms with a single API call, consider using the **[Update
   * entity](#update-entity)** or **[Update entity value](#update-entity-value)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {string} [params.newSynonym] - The text of the synonym. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.Synonym>>}
   */
  public updateSynonym(
    params: AssistantV1.UpdateSynonymParams
  ): Promise<AssistantV1.Response<AssistantV1.Synonym>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];
    const _validParams = ['workspaceId', 'entity', 'value', 'synonym', 'newSynonym', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'synonym': _params.newSynonym,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
      'value': _params.value,
      'synonym': _params.synonym,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSynonym');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
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
   * Delete entity value synonym.
   *
   * Delete a synonym from an entity value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.EmptyObject>>}
   */
  public deleteSynonym(
    params: AssistantV1.DeleteSynonymParams
  ): Promise<AssistantV1.Response<AssistantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];
    const _validParams = ['workspaceId', 'entity', 'value', 'synonym', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'entity': _params.entity,
      'value': _params.value,
      'synonym': _params.synonym,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteSynonym');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
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
   * dialogNodes
   ************************/

  /**
   * List dialog nodes.
   *
   * List the dialog nodes for a workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {boolean} [params.includeCount] - Whether to include information about the number of records that satisfy
   * the request, regardless of the page limit. If this parameter is `true`, the `pagination` object in the response
   * includes the `total` property.
   * @param {string} [params.sort] - The attribute by which returned dialog nodes will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.DialogNodeCollection>>}
   */
  public listDialogNodes(
    params: AssistantV1.ListDialogNodesParams
  ): Promise<AssistantV1.Response<AssistantV1.DialogNodeCollection>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', 'pageLimit', 'includeCount', 'sort', 'cursor', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'page_limit': _params.pageLimit,
      'include_count': _params.includeCount,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listDialogNodes');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes',
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

  /**
   * Create dialog node.
   *
   * Create a new dialog node.
   *
   * If you want to create multiple dialog nodes with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.dialogNode - The unique ID of the dialog node. This is an internal identifier used to refer
   * to the dialog node from other dialog nodes and in the diagnostic information included with message responses.
   *
   * This string can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.description] - The description of the dialog node. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.conditions] - The condition that will trigger the dialog node. This string cannot contain
   * carriage return, newline, or tab characters.
   * @param {string} [params.parent] - The unique ID of the parent dialog node. This property is omitted if the dialog
   * node has no parent.
   * @param {string} [params.previousSibling] - The unique ID of the previous sibling dialog node. This property is
   * omitted if the dialog node has no previous sibling.
   * @param {DialogNodeOutput} [params.output] - The output of the dialog node. For more information about how to
   * specify dialog node output, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
   * @param {DialogNodeContext} [params.context] - The context for the dialog node.
   * @param {JsonObject} [params.metadata] - The metadata for the dialog node.
   * @param {DialogNodeNextStep} [params.nextStep] - The next step to execute following this dialog node.
   * @param {string} [params.title] - A human-readable name for the dialog node. If the node is included in
   * disambiguation, this title is used to populate the **label** property of the corresponding suggestion in the
   * `suggestion` response type (unless it is overridden by the **user_label** property). The title is also used to
   * populate the **topic** property in the `connect_to_agent` response type.
   *
   * This string can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.type] - How the dialog node is processed.
   * @param {string} [params.eventName] - How an `event_handler` node is processed.
   * @param {string} [params.variable] - The location in the dialog context where output is stored.
   * @param {DialogNodeAction[]} [params.actions] - An array of objects describing any actions to be invoked by the
   * dialog node.
   * @param {string} [params.digressIn] - Whether this top-level dialog node can be digressed into.
   * @param {string} [params.digressOut] - Whether this dialog node can be returned to after a digression.
   * @param {string} [params.digressOutSlots] - Whether the user can digress to top-level nodes while filling out slots.
   * @param {string} [params.userLabel] - A label that can be displayed externally to describe the purpose of the node
   * to users. If set, this label is used to identify the node in disambiguation responses (overriding the value of the
   * **title** property).
   * @param {boolean} [params.disambiguationOptOut] - Whether the dialog node should be excluded from disambiguation
   * suggestions. Valid only when **type**=`standard` or `frame`.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.DialogNode>>}
   */
  public createDialogNode(
    params: AssistantV1.CreateDialogNodeParams
  ): Promise<AssistantV1.Response<AssistantV1.DialogNode>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'dialogNode'];
    const _validParams = ['workspaceId', 'dialogNode', 'description', 'conditions', 'parent', 'previousSibling', 'output', 'context', 'metadata', 'nextStep', 'title', 'type', 'eventName', 'variable', 'actions', 'digressIn', 'digressOut', 'digressOutSlots', 'userLabel', 'disambiguationOptOut', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'dialog_node': _params.dialogNode,
      'description': _params.description,
      'conditions': _params.conditions,
      'parent': _params.parent,
      'previous_sibling': _params.previousSibling,
      'output': _params.output,
      'context': _params.context,
      'metadata': _params.metadata,
      'next_step': _params.nextStep,
      'title': _params.title,
      'type': _params.type,
      'event_name': _params.eventName,
      'variable': _params.variable,
      'actions': _params.actions,
      'digress_in': _params.digressIn,
      'digress_out': _params.digressOut,
      'digress_out_slots': _params.digressOutSlots,
      'user_label': _params.userLabel,
      'disambiguation_opt_out': _params.disambiguationOptOut,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'createDialogNode');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes',
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
   * Get dialog node.
   *
   * Get information about a dialog node.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.dialogNode - The dialog node ID (for example, `node_1_1479323581900`).
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.DialogNode>>}
   */
  public getDialogNode(
    params: AssistantV1.GetDialogNodeParams
  ): Promise<AssistantV1.Response<AssistantV1.DialogNode>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'dialogNode'];
    const _validParams = ['workspaceId', 'dialogNode', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'dialog_node': _params.dialogNode,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'getDialogNode');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
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

  /**
   * Update dialog node.
   *
   * Update an existing dialog node with new or modified data.
   *
   * If you want to update multiple dialog nodes with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.dialogNode - The dialog node ID (for example, `node_1_1479323581900`).
   * @param {string} [params.newDialogNode] - The unique ID of the dialog node. This is an internal identifier used to
   * refer to the dialog node from other dialog nodes and in the diagnostic information included with message responses.
   *
   * This string can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.newDescription] - The description of the dialog node. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.newConditions] - The condition that will trigger the dialog node. This string cannot
   * contain carriage return, newline, or tab characters.
   * @param {string} [params.newParent] - The unique ID of the parent dialog node. This property is omitted if the
   * dialog node has no parent.
   * @param {string} [params.newPreviousSibling] - The unique ID of the previous sibling dialog node. This property is
   * omitted if the dialog node has no previous sibling.
   * @param {DialogNodeOutput} [params.newOutput] - The output of the dialog node. For more information about how to
   * specify dialog node output, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
   * @param {DialogNodeContext} [params.newContext] - The context for the dialog node.
   * @param {JsonObject} [params.newMetadata] - The metadata for the dialog node.
   * @param {DialogNodeNextStep} [params.newNextStep] - The next step to execute following this dialog node.
   * @param {string} [params.newTitle] - A human-readable name for the dialog node. If the node is included in
   * disambiguation, this title is used to populate the **label** property of the corresponding suggestion in the
   * `suggestion` response type (unless it is overridden by the **user_label** property). The title is also used to
   * populate the **topic** property in the `connect_to_agent` response type.
   *
   * This string can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.newType] - How the dialog node is processed.
   * @param {string} [params.newEventName] - How an `event_handler` node is processed.
   * @param {string} [params.newVariable] - The location in the dialog context where output is stored.
   * @param {DialogNodeAction[]} [params.newActions] - An array of objects describing any actions to be invoked by the
   * dialog node.
   * @param {string} [params.newDigressIn] - Whether this top-level dialog node can be digressed into.
   * @param {string} [params.newDigressOut] - Whether this dialog node can be returned to after a digression.
   * @param {string} [params.newDigressOutSlots] - Whether the user can digress to top-level nodes while filling out
   * slots.
   * @param {string} [params.newUserLabel] - A label that can be displayed externally to describe the purpose of the
   * node to users. If set, this label is used to identify the node in disambiguation responses (overriding the value of
   * the **title** property).
   * @param {boolean} [params.newDisambiguationOptOut] - Whether the dialog node should be excluded from disambiguation
   * suggestions. Valid only when **type**=`standard` or `frame`.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.DialogNode>>}
   */
  public updateDialogNode(
    params: AssistantV1.UpdateDialogNodeParams
  ): Promise<AssistantV1.Response<AssistantV1.DialogNode>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'dialogNode'];
    const _validParams = ['workspaceId', 'dialogNode', 'newDialogNode', 'newDescription', 'newConditions', 'newParent', 'newPreviousSibling', 'newOutput', 'newContext', 'newMetadata', 'newNextStep', 'newTitle', 'newType', 'newEventName', 'newVariable', 'newActions', 'newDigressIn', 'newDigressOut', 'newDigressOutSlots', 'newUserLabel', 'newDisambiguationOptOut', 'includeAudit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'dialog_node': _params.newDialogNode,
      'description': _params.newDescription,
      'conditions': _params.newConditions,
      'parent': _params.newParent,
      'previous_sibling': _params.newPreviousSibling,
      'output': _params.newOutput,
      'context': _params.newContext,
      'metadata': _params.newMetadata,
      'next_step': _params.newNextStep,
      'title': _params.newTitle,
      'type': _params.newType,
      'event_name': _params.newEventName,
      'variable': _params.newVariable,
      'actions': _params.newActions,
      'digress_in': _params.newDigressIn,
      'digress_out': _params.newDigressOut,
      'digress_out_slots': _params.newDigressOutSlots,
      'user_label': _params.newUserLabel,
      'disambiguation_opt_out': _params.newDisambiguationOptOut,
    };

    const query = {
      'version': this.version,
      'include_audit': _params.includeAudit,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'dialog_node': _params.dialogNode,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'updateDialogNode');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
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
   * Delete dialog node.
   *
   * Delete a dialog node from a workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.dialogNode - The dialog node ID (for example, `node_1_1479323581900`).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.EmptyObject>>}
   */
  public deleteDialogNode(
    params: AssistantV1.DeleteDialogNodeParams
  ): Promise<AssistantV1.Response<AssistantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId', 'dialogNode'];
    const _validParams = ['workspaceId', 'dialogNode', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'workspace_id': _params.workspaceId,
      'dialog_node': _params.dialogNode,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteDialogNode');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
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
   * logs
   ************************/

  /**
   * List log events in a workspace.
   *
   * List the events from the log of a specific workspace.
   *
   * This method requires Manager access.
   *
   * **Note:** If you use the **cursor** parameter to retrieve results one page at a time, subsequent requests must be
   * no more than 5 minutes apart. Any returned value for the **cursor** parameter becomes invalid after 5 minutes. For
   * more information about using pagination, see [Pagination](#pagination).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} [params.sort] - How to sort the returned log events. You can sort by **request_timestamp**. To
   * reverse the sort order, prefix the parameter value with a minus sign (`-`).
   * @param {string} [params.filter] - A cacheable parameter that limits the results to those matching the specified
   * filter. For more information, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-filter-reference#filter-reference).
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   *
   * **Note:** If the API is not returning your data, try lowering the page_limit value.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.LogCollection>>}
   */
  public listLogs(
    params: AssistantV1.ListLogsParams
  ): Promise<AssistantV1.Response<AssistantV1.LogCollection>> {
    const _params = { ...params };
    const _requiredParams = ['workspaceId'];
    const _validParams = ['workspaceId', 'sort', 'filter', 'pageLimit', 'cursor', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'sort': _params.sort,
      'filter': _params.filter,
      'page_limit': _params.pageLimit,
      'cursor': _params.cursor,
    };

    const path = {
      'workspace_id': _params.workspaceId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listLogs');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/logs',
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

  /**
   * List log events in all workspaces.
   *
   * List the events from the logs of all workspaces in the service instance.
   *
   * **Note:** If you use the **cursor** parameter to retrieve results one page at a time, subsequent requests must be
   * no more than 5 minutes apart. Any returned value for the **cursor** parameter becomes invalid after 5 minutes. For
   * more information about using pagination, see [Pagination](#pagination).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.filter - A cacheable parameter that limits the results to those matching the specified
   * filter. You must specify a filter query that includes a value for `language`, as well as a value for
   * `request.context.system.assistant_id`, `workspace_id`, or `request.context.metadata.deployment`. These required
   * filters must be specified using the exact match (`::`) operator. For more information, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-filter-reference#filter-reference).
   * @param {string} [params.sort] - How to sort the returned log events. You can sort by **request_timestamp**. To
   * reverse the sort order, prefix the parameter value with a minus sign (`-`).
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AssistantV1.Response<AssistantV1.LogCollection>>}
   */
  public listAllLogs(
    params: AssistantV1.ListAllLogsParams
  ): Promise<AssistantV1.Response<AssistantV1.LogCollection>> {
    const _params = { ...params };
    const _requiredParams = ['filter'];
    const _validParams = ['filter', 'sort', 'pageLimit', 'cursor', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'filter': _params.filter,
      'sort': _params.sort,
      'page_limit': _params.pageLimit,
      'cursor': _params.cursor,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllLogs');

    const parameters = {
      options: {
        url: '/v1/logs',
        method: 'GET',
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
   * @returns {Promise<AssistantV1.Response<AssistantV1.EmptyObject>>}
   */
  public deleteUserData(
    params: AssistantV1.DeleteUserDataParams
  ): Promise<AssistantV1.Response<AssistantV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customerId'];
    const _validParams = ['customerId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'customer_id': _params.customerId,
    };

    const sdkHeaders = getSdkHeaders(AssistantV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteUserData');

    const parameters = {
      options: {
        url: '/v1/user_data',
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

namespace AssistantV1 {
  /** Options for the `AssistantV1` constructor. */
  export interface Options extends UserOptions {
    /** Release date of the API version you want to use. Specify dates in YYYY-MM-DD format. The current version is
     *  `2021-11-27`.
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
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `message` operation. */
  export interface MessageParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** Intents to use when evaluating the user input. Include intents from the previous response to continue using
     *  those intents rather than trying to recognize intents in the new input.
     */
    intents?: RuntimeIntent[];
    /** Entities to use when evaluating the message. Include entities from the previous response to continue using
     *  those entities rather than detecting entities in the new input.
     */
    entities?: RuntimeEntity[];
    /** Whether to return more than one intent. A value of `true` indicates that all matching intents are returned. */
    alternateIntents?: boolean;
    /** State information for the conversation. To maintain state, include the context from the previous response. */
    context?: Context;
    /** An output object that includes the response to the user, the dialog nodes that were triggered, and messages
     *  from the log.
     */
    output?: OutputData;
    /** A string value that identifies the user who is interacting with the workspace. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For user-based plans, this user ID
     *  is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or
     *  tab characters. If no value is specified in the input, **user_id** is automatically set to the value of
     *  **context.conversation_id**.
     *
     *  **Note:** This property is the same as the **user_id** property in the context metadata. If **user_id** is
     *  specified in both locations in a message request, the value specified at the root is used.
     */
    userId?: string;
    /** Whether to include additional diagnostic information about the dialog nodes that were visited during
     *  processing of the message.
     */
    nodesVisitedDetails?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `bulkClassify` operation. */
  export interface BulkClassifyParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** An array of input utterances to classify. */
    input?: BulkClassifyUtterance[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listWorkspaces` operation. */
  export interface ListWorkspacesParams {
    /** The number of records to return in each page of results. */
    pageLimit?: number;
    /** Whether to include information about the number of records that satisfy the request, regardless of the page
     *  limit. If this parameter is `true`, the `pagination` object in the response includes the `total` property.
     */
    includeCount?: boolean;
    /** The attribute by which returned workspaces will be sorted. To reverse the sort order, prefix the value with
     *  a minus sign (`-`).
     */
    sort?: ListWorkspacesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listWorkspaces` operation. */
  export namespace ListWorkspacesConstants {
    /** The attribute by which returned workspaces will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      NAME = 'name',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `createWorkspace` operation. */
  export interface CreateWorkspaceParams {
    /** The name of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    name?: string;
    /** The description of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The language of the workspace. */
    language?: string;
    /** An array of objects describing the dialog nodes in the workspace. */
    dialogNodes?: DialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: Counterexample[];
    /** Any metadata related to the workspace. */
    metadata?: JsonObject;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by
     *  IBM for general service improvements. `true` indicates that workspace training data is not to be used.
     */
    learningOptOut?: boolean;
    /** Global settings for the workspace. */
    systemSettings?: WorkspaceSystemSettings;
    webhooks?: Webhook[];
    /** An array of objects defining the intents for the workspace. */
    intents?: CreateIntent[];
    /** An array of objects describing the entities for the workspace. */
    entities?: CreateEntity[];
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getWorkspace` operation. */
  export interface GetWorkspaceParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data
     *  includes only information about the element itself. If **export**=`true`, all content, including subelements, is
     *  included.
     */
    _export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    /** Indicates how the returned workspace data will be sorted. This parameter is valid only if **export**=`true`.
     *  Specify `sort=stable` to sort all workspace objects by unique identifier, in ascending alphabetical order.
     */
    sort?: GetWorkspaceConstants.Sort | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getWorkspace` operation. */
  export namespace GetWorkspaceConstants {
    /** Indicates how the returned workspace data will be sorted. This parameter is valid only if **export**=`true`. Specify `sort=stable` to sort all workspace objects by unique identifier, in ascending alphabetical order. */
    export enum Sort {
      STABLE = 'stable',
    }
  }

  /** Parameters for the `updateWorkspace` operation. */
  export interface UpdateWorkspaceParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    name?: string;
    /** The description of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The language of the workspace. */
    language?: string;
    /** An array of objects describing the dialog nodes in the workspace. */
    dialogNodes?: DialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: Counterexample[];
    /** Any metadata related to the workspace. */
    metadata?: JsonObject;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by
     *  IBM for general service improvements. `true` indicates that workspace training data is not to be used.
     */
    learningOptOut?: boolean;
    /** Global settings for the workspace. */
    systemSettings?: WorkspaceSystemSettings;
    webhooks?: Webhook[];
    /** An array of objects defining the intents for the workspace. */
    intents?: CreateIntent[];
    /** An array of objects describing the entities for the workspace. */
    entities?: CreateEntity[];
    /** Whether the new data is to be appended to the existing data in the object. If **append**=`false`, elements
     *  included in the new data completely replace the corresponding existing elements, including all subelements. For
     *  example, if the new data for a workspace includes **entities** and **append**=`false`, all existing entities in
     *  the workspace are discarded and replaced with the new entities.
     *
     *  If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the
     *  new data collide with existing elements, the update request fails.
     */
    append?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteWorkspace` operation. */
  export interface DeleteWorkspaceParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createWorkspaceAsync` operation. */
  export interface CreateWorkspaceAsyncParams {
    /** The name of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    name?: string;
    /** The description of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The language of the workspace. */
    language?: string;
    /** An array of objects describing the dialog nodes in the workspace. */
    dialogNodes?: DialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: Counterexample[];
    /** Any metadata related to the workspace. */
    metadata?: JsonObject;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by
     *  IBM for general service improvements. `true` indicates that workspace training data is not to be used.
     */
    learningOptOut?: boolean;
    /** Global settings for the workspace. */
    systemSettings?: WorkspaceSystemSettings;
    webhooks?: Webhook[];
    /** An array of objects defining the intents for the workspace. */
    intents?: CreateIntent[];
    /** An array of objects describing the entities for the workspace. */
    entities?: CreateEntity[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateWorkspaceAsync` operation. */
  export interface UpdateWorkspaceAsyncParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    name?: string;
    /** The description of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The language of the workspace. */
    language?: string;
    /** An array of objects describing the dialog nodes in the workspace. */
    dialogNodes?: DialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: Counterexample[];
    /** Any metadata related to the workspace. */
    metadata?: JsonObject;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by
     *  IBM for general service improvements. `true` indicates that workspace training data is not to be used.
     */
    learningOptOut?: boolean;
    /** Global settings for the workspace. */
    systemSettings?: WorkspaceSystemSettings;
    webhooks?: Webhook[];
    /** An array of objects defining the intents for the workspace. */
    intents?: CreateIntent[];
    /** An array of objects describing the entities for the workspace. */
    entities?: CreateEntity[];
    /** Whether the new data is to be appended to the existing data in the object. If **append**=`false`, elements
     *  included in the new data completely replace the corresponding existing elements, including all subelements. For
     *  example, if the new data for a workspace includes **entities** and **append**=`false`, all existing entities in
     *  the workspace are discarded and replaced with the new entities.
     *
     *  If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the
     *  new data collide with existing elements, the update request fails.
     */
    append?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `exportWorkspaceAsync` operation. */
  export interface ExportWorkspaceAsyncParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    /** Indicates how the returned workspace data will be sorted. Specify `sort=stable` to sort all workspace
     *  objects by unique identifier, in ascending alphabetical order.
     */
    sort?: ExportWorkspaceAsyncConstants.Sort | string;
    /** Whether the response should include the `counts` property, which indicates how many of each component (such
     *  as intents and entities) the workspace contains.
     */
    verbose?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `exportWorkspaceAsync` operation. */
  export namespace ExportWorkspaceAsyncConstants {
    /** Indicates how the returned workspace data will be sorted. Specify `sort=stable` to sort all workspace objects by unique identifier, in ascending alphabetical order. */
    export enum Sort {
      STABLE = 'stable',
    }
  }

  /** Parameters for the `listIntents` operation. */
  export interface ListIntentsParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data
     *  includes only information about the element itself. If **export**=`true`, all content, including subelements, is
     *  included.
     */
    _export?: boolean;
    /** The number of records to return in each page of results. */
    pageLimit?: number;
    /** Whether to include information about the number of records that satisfy the request, regardless of the page
     *  limit. If this parameter is `true`, the `pagination` object in the response includes the `total` property.
     */
    includeCount?: boolean;
    /** The attribute by which returned intents will be sorted. To reverse the sort order, prefix the value with a
     *  minus sign (`-`).
     */
    sort?: ListIntentsConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listIntents` operation. */
  export namespace ListIntentsConstants {
    /** The attribute by which returned intents will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      INTENT = 'intent',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `createIntent` operation. */
  export interface CreateIntentParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the intent. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
     *  - It cannot begin with the reserved prefix `sys-`.
     */
    intent: string;
    /** The description of the intent. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** An array of user input examples for the intent. */
    examples?: Example[];
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getIntent` operation. */
  export interface GetIntentParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The intent name. */
    intent: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data
     *  includes only information about the element itself. If **export**=`true`, all content, including subelements, is
     *  included.
     */
    _export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateIntent` operation. */
  export interface UpdateIntentParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The intent name. */
    intent: string;
    /** The name of the intent. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
     *  - It cannot begin with the reserved prefix `sys-`.
     */
    newIntent?: string;
    /** The description of the intent. This string cannot contain carriage return, newline, or tab characters. */
    newDescription?: string;
    /** An array of user input examples for the intent. */
    newExamples?: Example[];
    /** Whether the new data is to be appended to the existing data in the object. If **append**=`false`, elements
     *  included in the new data completely replace the corresponding existing elements, including all subelements. For
     *  example, if the new data for the intent includes **examples** and **append**=`false`, all existing examples for
     *  the intent are discarded and replaced with the new examples.
     *
     *  If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the
     *  new data collide with existing elements, the update request fails.
     */
    append?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteIntent` operation. */
  export interface DeleteIntentParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The intent name. */
    intent: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listExamples` operation. */
  export interface ListExamplesParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The intent name. */
    intent: string;
    /** The number of records to return in each page of results. */
    pageLimit?: number;
    /** Whether to include information about the number of records that satisfy the request, regardless of the page
     *  limit. If this parameter is `true`, the `pagination` object in the response includes the `total` property.
     */
    includeCount?: boolean;
    /** The attribute by which returned examples will be sorted. To reverse the sort order, prefix the value with a
     *  minus sign (`-`).
     */
    sort?: ListExamplesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listExamples` operation. */
  export namespace ListExamplesConstants {
    /** The attribute by which returned examples will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      TEXT = 'text',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `createExample` operation. */
  export interface CreateExampleParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The intent name. */
    intent: string;
    /** The text of a user input example. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    text: string;
    /** An array of contextual entity mentions. */
    mentions?: Mention[];
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getExample` operation. */
  export interface GetExampleParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The intent name. */
    intent: string;
    /** The text of the user input example. */
    text: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateExample` operation. */
  export interface UpdateExampleParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The intent name. */
    intent: string;
    /** The text of the user input example. */
    text: string;
    /** The text of the user input example. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    newText?: string;
    /** An array of contextual entity mentions. */
    newMentions?: Mention[];
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteExample` operation. */
  export interface DeleteExampleParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The intent name. */
    intent: string;
    /** The text of the user input example. */
    text: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listCounterexamples` operation. */
  export interface ListCounterexamplesParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The number of records to return in each page of results. */
    pageLimit?: number;
    /** Whether to include information about the number of records that satisfy the request, regardless of the page
     *  limit. If this parameter is `true`, the `pagination` object in the response includes the `total` property.
     */
    includeCount?: boolean;
    /** The attribute by which returned counterexamples will be sorted. To reverse the sort order, prefix the value
     *  with a minus sign (`-`).
     */
    sort?: ListCounterexamplesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listCounterexamples` operation. */
  export namespace ListCounterexamplesConstants {
    /** The attribute by which returned counterexamples will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      TEXT = 'text',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `createCounterexample` operation. */
  export interface CreateCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The text of a user input marked as irrelevant input. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    text: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCounterexample` operation. */
  export interface GetCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The text of a user input counterexample (for example, `What are you wearing?`). */
    text: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCounterexample` operation. */
  export interface UpdateCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The text of a user input counterexample (for example, `What are you wearing?`). */
    text: string;
    /** The text of a user input marked as irrelevant input. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    newText?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCounterexample` operation. */
  export interface DeleteCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The text of a user input counterexample (for example, `What are you wearing?`). */
    text: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listEntities` operation. */
  export interface ListEntitiesParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data
     *  includes only information about the element itself. If **export**=`true`, all content, including subelements, is
     *  included.
     */
    _export?: boolean;
    /** The number of records to return in each page of results. */
    pageLimit?: number;
    /** Whether to include information about the number of records that satisfy the request, regardless of the page
     *  limit. If this parameter is `true`, the `pagination` object in the response includes the `total` property.
     */
    includeCount?: boolean;
    /** The attribute by which returned entities will be sorted. To reverse the sort order, prefix the value with a
     *  minus sign (`-`).
     */
    sort?: ListEntitiesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listEntities` operation. */
  export namespace ListEntitiesConstants {
    /** The attribute by which returned entities will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      ENTITY = 'entity',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `createEntity` operation. */
  export interface CreateEntityParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, underscore, and hyphen characters.
     *  - If you specify an entity name beginning with the reserved prefix `sys-`, it must be the name of a system
     *  entity that you want to enable. (Any entity content specified with the request is ignored.).
     */
    entity: string;
    /** The description of the entity. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** Any metadata related to the entity. */
    metadata?: JsonObject;
    /** Whether to use fuzzy matching for the entity. */
    fuzzyMatch?: boolean;
    /** An array of objects describing the entity values. */
    values?: CreateValue[];
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEntity` operation. */
  export interface GetEntityParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data
     *  includes only information about the element itself. If **export**=`true`, all content, including subelements, is
     *  included.
     */
    _export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateEntity` operation. */
  export interface UpdateEntityParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** The name of the entity. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, underscore, and hyphen characters.
     *  - It cannot begin with the reserved prefix `sys-`.
     */
    newEntity?: string;
    /** The description of the entity. This string cannot contain carriage return, newline, or tab characters. */
    newDescription?: string;
    /** Any metadata related to the entity. */
    newMetadata?: JsonObject;
    /** Whether to use fuzzy matching for the entity. */
    newFuzzyMatch?: boolean;
    /** An array of objects describing the entity values. */
    newValues?: CreateValue[];
    /** Whether the new data is to be appended to the existing data in the entity. If **append**=`false`, elements
     *  included in the new data completely replace the corresponding existing elements, including all subelements. For
     *  example, if the new data for the entity includes **values** and **append**=`false`, all existing values for the
     *  entity are discarded and replaced with the new values.
     *
     *  If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the
     *  new data collide with existing elements, the update request fails.
     */
    append?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteEntity` operation. */
  export interface DeleteEntityParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listMentions` operation. */
  export interface ListMentionsParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data
     *  includes only information about the element itself. If **export**=`true`, all content, including subelements, is
     *  included.
     */
    _export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listValues` operation. */
  export interface ListValuesParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data
     *  includes only information about the element itself. If **export**=`true`, all content, including subelements, is
     *  included.
     */
    _export?: boolean;
    /** The number of records to return in each page of results. */
    pageLimit?: number;
    /** Whether to include information about the number of records that satisfy the request, regardless of the page
     *  limit. If this parameter is `true`, the `pagination` object in the response includes the `total` property.
     */
    includeCount?: boolean;
    /** The attribute by which returned entity values will be sorted. To reverse the sort order, prefix the value
     *  with a minus sign (`-`).
     */
    sort?: ListValuesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listValues` operation. */
  export namespace ListValuesConstants {
    /** The attribute by which returned entity values will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      VALUE = 'value',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `createValue` operation. */
  export interface CreateValueParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    value: string;
    /** Any metadata related to the entity value. */
    metadata?: JsonObject;
    /** Specifies the type of entity value. */
    type?: CreateValueConstants.Type | string;
    /** An array of synonyms for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A synonym must conform to the following resrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    synonyms?: string[];
    /** An array of patterns for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A pattern is a regular expression; for more information about how to specify a
     *  pattern, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-entities#entities-create-dictionary-based).
     */
    patterns?: string[];
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createValue` operation. */
  export namespace CreateValueConstants {
    /** Specifies the type of entity value. */
    export enum Type {
      SYNONYMS = 'synonyms',
      PATTERNS = 'patterns',
    }
  }

  /** Parameters for the `getValue` operation. */
  export interface GetValueParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data
     *  includes only information about the element itself. If **export**=`true`, all content, including subelements, is
     *  included.
     */
    _export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateValue` operation. */
  export interface UpdateValueParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the entity value. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    newValue?: string;
    /** Any metadata related to the entity value. */
    newMetadata?: JsonObject;
    /** Specifies the type of entity value. */
    newType?: UpdateValueConstants.Type | string;
    /** An array of synonyms for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A synonym must conform to the following resrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    newSynonyms?: string[];
    /** An array of patterns for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A pattern is a regular expression; for more information about how to specify a
     *  pattern, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-entities#entities-create-dictionary-based).
     */
    newPatterns?: string[];
    /** Whether the new data is to be appended to the existing data in the entity value. If **append**=`false`,
     *  elements included in the new data completely replace the corresponding existing elements, including all
     *  subelements. For example, if the new data for the entity value includes **synonyms** and **append**=`false`, all
     *  existing synonyms for the entity value are discarded and replaced with the new synonyms.
     *
     *  If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the
     *  new data collide with existing elements, the update request fails.
     */
    append?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateValue` operation. */
  export namespace UpdateValueConstants {
    /** Specifies the type of entity value. */
    export enum Type {
      SYNONYMS = 'synonyms',
      PATTERNS = 'patterns',
    }
  }

  /** Parameters for the `deleteValue` operation. */
  export interface DeleteValueParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSynonyms` operation. */
  export interface ListSynonymsParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The number of records to return in each page of results. */
    pageLimit?: number;
    /** Whether to include information about the number of records that satisfy the request, regardless of the page
     *  limit. If this parameter is `true`, the `pagination` object in the response includes the `total` property.
     */
    includeCount?: boolean;
    /** The attribute by which returned entity value synonyms will be sorted. To reverse the sort order, prefix the
     *  value with a minus sign (`-`).
     */
    sort?: ListSynonymsConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listSynonyms` operation. */
  export namespace ListSynonymsConstants {
    /** The attribute by which returned entity value synonyms will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      SYNONYM = 'synonym',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `createSynonym` operation. */
  export interface CreateSynonymParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the synonym. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    synonym: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSynonym` operation. */
  export interface GetSynonymParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the synonym. */
    synonym: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSynonym` operation. */
  export interface UpdateSynonymParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the synonym. */
    synonym: string;
    /** The text of the synonym. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    newSynonym?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSynonym` operation. */
  export interface DeleteSynonymParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the synonym. */
    synonym: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDialogNodes` operation. */
  export interface ListDialogNodesParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The number of records to return in each page of results. */
    pageLimit?: number;
    /** Whether to include information about the number of records that satisfy the request, regardless of the page
     *  limit. If this parameter is `true`, the `pagination` object in the response includes the `total` property.
     */
    includeCount?: boolean;
    /** The attribute by which returned dialog nodes will be sorted. To reverse the sort order, prefix the value
     *  with a minus sign (`-`).
     */
    sort?: ListDialogNodesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listDialogNodes` operation. */
  export namespace ListDialogNodesConstants {
    /** The attribute by which returned dialog nodes will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      DIALOG_NODE = 'dialog_node',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `createDialogNode` operation. */
  export interface CreateDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The unique ID of the dialog node. This is an internal identifier used to refer to the dialog node from other
     *  dialog nodes and in the diagnostic information included with message responses.
     *
     *  This string can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
     */
    dialogNode: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab
     *  characters.
     */
    conditions?: string;
    /** The unique ID of the parent dialog node. This property is omitted if the dialog node has no parent. */
    parent?: string;
    /** The unique ID of the previous sibling dialog node. This property is omitted if the dialog node has no
     *  previous sibling.
     */
    previousSibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
     */
    output?: DialogNodeOutput;
    /** The context for the dialog node. */
    context?: DialogNodeContext;
    /** The metadata for the dialog node. */
    metadata?: JsonObject;
    /** The next step to execute following this dialog node. */
    nextStep?: DialogNodeNextStep;
    /** A human-readable name for the dialog node. If the node is included in disambiguation, this title is used to
     *  populate the **label** property of the corresponding suggestion in the `suggestion` response type (unless it is
     *  overridden by the **user_label** property). The title is also used to populate the **topic** property in the
     *  `connect_to_agent` response type.
     *
     *  This string can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
     */
    title?: string;
    /** How the dialog node is processed. */
    type?: CreateDialogNodeConstants.Type | string;
    /** How an `event_handler` node is processed. */
    eventName?: CreateDialogNodeConstants.EventName | string;
    /** The location in the dialog context where output is stored. */
    variable?: string;
    /** An array of objects describing any actions to be invoked by the dialog node. */
    actions?: DialogNodeAction[];
    /** Whether this top-level dialog node can be digressed into. */
    digressIn?: CreateDialogNodeConstants.DigressIn | string;
    /** Whether this dialog node can be returned to after a digression. */
    digressOut?: CreateDialogNodeConstants.DigressOut | string;
    /** Whether the user can digress to top-level nodes while filling out slots. */
    digressOutSlots?: CreateDialogNodeConstants.DigressOutSlots | string;
    /** A label that can be displayed externally to describe the purpose of the node to users. If set, this label is
     *  used to identify the node in disambiguation responses (overriding the value of the **title** property).
     */
    userLabel?: string;
    /** Whether the dialog node should be excluded from disambiguation suggestions. Valid only when
     *  **type**=`standard` or `frame`.
     */
    disambiguationOptOut?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createDialogNode` operation. */
  export namespace CreateDialogNodeConstants {
    /** How the dialog node is processed. */
    export enum Type {
      STANDARD = 'standard',
      EVENT_HANDLER = 'event_handler',
      FRAME = 'frame',
      SLOT = 'slot',
      RESPONSE_CONDITION = 'response_condition',
      FOLDER = 'folder',
    }
    /** How an `event_handler` node is processed. */
    export enum EventName {
      FOCUS = 'focus',
      INPUT = 'input',
      FILLED = 'filled',
      VALIDATE = 'validate',
      FILLED_MULTIPLE = 'filled_multiple',
      GENERIC = 'generic',
      NOMATCH = 'nomatch',
      NOMATCH_RESPONSES_DEPLETED = 'nomatch_responses_depleted',
      DIGRESSION_RETURN_PROMPT = 'digression_return_prompt',
    }
    /** Whether this top-level dialog node can be digressed into. */
    export enum DigressIn {
      NOT_AVAILABLE = 'not_available',
      RETURNS = 'returns',
      DOES_NOT_RETURN = 'does_not_return',
    }
    /** Whether this dialog node can be returned to after a digression. */
    export enum DigressOut {
      ALLOW_RETURNING = 'allow_returning',
      ALLOW_ALL = 'allow_all',
      ALLOW_ALL_NEVER_RETURN = 'allow_all_never_return',
    }
    /** Whether the user can digress to top-level nodes while filling out slots. */
    export enum DigressOutSlots {
      NOT_ALLOWED = 'not_allowed',
      ALLOW_RETURNING = 'allow_returning',
      ALLOW_ALL = 'allow_all',
    }
  }

  /** Parameters for the `getDialogNode` operation. */
  export interface GetDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The dialog node ID (for example, `node_1_1479323581900`). */
    dialogNode: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDialogNode` operation. */
  export interface UpdateDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The dialog node ID (for example, `node_1_1479323581900`). */
    dialogNode: string;
    /** The unique ID of the dialog node. This is an internal identifier used to refer to the dialog node from other
     *  dialog nodes and in the diagnostic information included with message responses.
     *
     *  This string can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
     */
    newDialogNode?: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    newDescription?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab
     *  characters.
     */
    newConditions?: string;
    /** The unique ID of the parent dialog node. This property is omitted if the dialog node has no parent. */
    newParent?: string;
    /** The unique ID of the previous sibling dialog node. This property is omitted if the dialog node has no
     *  previous sibling.
     */
    newPreviousSibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
     */
    newOutput?: DialogNodeOutput;
    /** The context for the dialog node. */
    newContext?: DialogNodeContext;
    /** The metadata for the dialog node. */
    newMetadata?: JsonObject;
    /** The next step to execute following this dialog node. */
    newNextStep?: DialogNodeNextStep;
    /** A human-readable name for the dialog node. If the node is included in disambiguation, this title is used to
     *  populate the **label** property of the corresponding suggestion in the `suggestion` response type (unless it is
     *  overridden by the **user_label** property). The title is also used to populate the **topic** property in the
     *  `connect_to_agent` response type.
     *
     *  This string can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
     */
    newTitle?: string;
    /** How the dialog node is processed. */
    newType?: UpdateDialogNodeConstants.Type | string;
    /** How an `event_handler` node is processed. */
    newEventName?: UpdateDialogNodeConstants.EventName | string;
    /** The location in the dialog context where output is stored. */
    newVariable?: string;
    /** An array of objects describing any actions to be invoked by the dialog node. */
    newActions?: DialogNodeAction[];
    /** Whether this top-level dialog node can be digressed into. */
    newDigressIn?: UpdateDialogNodeConstants.DigressIn | string;
    /** Whether this dialog node can be returned to after a digression. */
    newDigressOut?: UpdateDialogNodeConstants.DigressOut | string;
    /** Whether the user can digress to top-level nodes while filling out slots. */
    newDigressOutSlots?: UpdateDialogNodeConstants.DigressOutSlots | string;
    /** A label that can be displayed externally to describe the purpose of the node to users. If set, this label is
     *  used to identify the node in disambiguation responses (overriding the value of the **title** property).
     */
    newUserLabel?: string;
    /** Whether the dialog node should be excluded from disambiguation suggestions. Valid only when
     *  **type**=`standard` or `frame`.
     */
    newDisambiguationOptOut?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateDialogNode` operation. */
  export namespace UpdateDialogNodeConstants {
    /** How the dialog node is processed. */
    export enum Type {
      STANDARD = 'standard',
      EVENT_HANDLER = 'event_handler',
      FRAME = 'frame',
      SLOT = 'slot',
      RESPONSE_CONDITION = 'response_condition',
      FOLDER = 'folder',
    }
    /** How an `event_handler` node is processed. */
    export enum EventName {
      FOCUS = 'focus',
      INPUT = 'input',
      FILLED = 'filled',
      VALIDATE = 'validate',
      FILLED_MULTIPLE = 'filled_multiple',
      GENERIC = 'generic',
      NOMATCH = 'nomatch',
      NOMATCH_RESPONSES_DEPLETED = 'nomatch_responses_depleted',
      DIGRESSION_RETURN_PROMPT = 'digression_return_prompt',
    }
    /** Whether this top-level dialog node can be digressed into. */
    export enum DigressIn {
      NOT_AVAILABLE = 'not_available',
      RETURNS = 'returns',
      DOES_NOT_RETURN = 'does_not_return',
    }
    /** Whether this dialog node can be returned to after a digression. */
    export enum DigressOut {
      ALLOW_RETURNING = 'allow_returning',
      ALLOW_ALL = 'allow_all',
      ALLOW_ALL_NEVER_RETURN = 'allow_all_never_return',
    }
    /** Whether the user can digress to top-level nodes while filling out slots. */
    export enum DigressOutSlots {
      NOT_ALLOWED = 'not_allowed',
      ALLOW_RETURNING = 'allow_returning',
      ALLOW_ALL = 'allow_all',
    }
  }

  /** Parameters for the `deleteDialogNode` operation. */
  export interface DeleteDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The dialog node ID (for example, `node_1_1479323581900`). */
    dialogNode: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listLogs` operation. */
  export interface ListLogsParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** How to sort the returned log events. You can sort by **request_timestamp**. To reverse the sort order,
     *  prefix the parameter value with a minus sign (`-`).
     */
    sort?: string;
    /** A cacheable parameter that limits the results to those matching the specified filter. For more information,
     *  see the [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-filter-reference#filter-reference).
     */
    filter?: string;
    /** The number of records to return in each page of results.
     *
     *  **Note:** If the API is not returning your data, try lowering the page_limit value.
     */
    pageLimit?: number;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAllLogs` operation. */
  export interface ListAllLogsParams {
    /** A cacheable parameter that limits the results to those matching the specified filter. You must specify a
     *  filter query that includes a value for `language`, as well as a value for `request.context.system.assistant_id`,
     *  `workspace_id`, or `request.context.metadata.deployment`. These required filters must be specified using the
     *  exact match (`::`) operator. For more information, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-filter-reference#filter-reference).
     */
    filter: string;
    /** How to sort the returned log events. You can sort by **request_timestamp**. To reverse the sort order,
     *  prefix the parameter value with a minus sign (`-`).
     */
    sort?: string;
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

  /**
   * AgentAvailabilityMessage.
   */
  export interface AgentAvailabilityMessage {
    /** The text of the message. */
    message?: string;
  }

  /**
   * BulkClassifyOutput.
   */
  export interface BulkClassifyOutput {
    /** The user input utterance to classify. */
    input?: BulkClassifyUtterance;
    /** An array of entities identified in the utterance. */
    entities?: RuntimeEntity[];
    /** An array of intents recognized in the utterance. */
    intents?: RuntimeIntent[];
  }

  /**
   * BulkClassifyResponse.
   */
  export interface BulkClassifyResponse {
    /** An array of objects that contain classification information for the submitted input utterances. */
    output?: BulkClassifyOutput[];
  }

  /**
   * The user input utterance to classify.
   */
  export interface BulkClassifyUtterance {
    /** The text of the input utterance. */
    text: string;
  }

  /**
   * A recognized capture group for a pattern-based entity.
   */
  export interface CaptureGroup {
    /** A recognized capture group for the entity. */
    group: string;
    /** Zero-based character offsets that indicate where the entity value begins and ends in the input text. */
    location?: number[];
  }

  /**
   * Information used by an integration to transfer the conversation to a different channel.
   */
  export interface ChannelTransferInfo {
    /** An object specifying target channels available for the transfer. Each property of this object represents an
     *  available transfer target. Currently, the only supported property is **chat**, representing the web chat
     *  integration.
     */
    target: ChannelTransferTarget;
  }

  /**
   * An object specifying target channels available for the transfer. Each property of this object represents an
   * available transfer target. Currently, the only supported property is **chat**, representing the web chat
   * integration.
   */
  export interface ChannelTransferTarget {
    /** Information for transferring to the web chat integration. */
    chat?: ChannelTransferTargetChat;
  }

  /**
   * Information for transferring to the web chat integration.
   */
  export interface ChannelTransferTargetChat {
    /** The URL of the target web chat. */
    url?: string;
  }

  /**
   * State information for the conversation. To maintain state, include the context from the previous response.
   *
   * This type supports additional properties of type any. Any context variable.
   */
  export interface Context {
    /** The unique identifier of the conversation. The conversation ID cannot contain any of the following
     *  characters: `+` `=` `&&` `||` `>` `<` `!` `(` `)` `{` `}` `[` `]` `^` `"` `~` `*` `?` `:` `\` `/`.
     */
    conversation_id?: string;
    /** For internal use only. */
    system?: JsonObject;
    /** Metadata related to the message. */
    metadata?: MessageContextMetadata;

    /**
     * Context accepts additional properties of type any. Any context variable.
     */
    [propName: string]: any;
  }

  /**
   * Counterexample.
   */
  export interface Counterexample {
    /** The text of a user input marked as irrelevant input. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    text: string;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }

  /**
   * CounterexampleCollection.
   */
  export interface CounterexampleCollection {
    /** An array of objects describing the examples marked as irrelevant input. */
    counterexamples: Counterexample[];
    /** The pagination data for the returned objects. For more information about using pagination, see
     *  [Pagination](#pagination).
     */
    pagination: Pagination;
  }

  /**
   * CreateEntity.
   */
  export interface CreateEntity {
    /** The name of the entity. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, underscore, and hyphen characters.
     *  - If you specify an entity name beginning with the reserved prefix `sys-`, it must be the name of a system
     *  entity that you want to enable. (Any entity content specified with the request is ignored.).
     */
    entity: string;
    /** The description of the entity. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** Any metadata related to the entity. */
    metadata?: JsonObject;
    /** Whether to use fuzzy matching for the entity. */
    fuzzy_match?: boolean;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
    /** An array of objects describing the entity values. */
    values?: CreateValue[];
  }

  /**
   * CreateIntent.
   */
  export interface CreateIntent {
    /** The name of the intent. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
     *  - It cannot begin with the reserved prefix `sys-`.
     */
    intent: string;
    /** The description of the intent. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
    /** An array of user input examples for the intent. */
    examples?: Example[];
  }

  /**
   * CreateValue.
   */
  export interface CreateValue {
    /** The text of the entity value. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    value: string;
    /** Any metadata related to the entity value. */
    metadata?: JsonObject;
    /** Specifies the type of entity value. */
    type?: CreateValue.Constants.Type | string;
    /** An array of synonyms for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A synonym must conform to the following resrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    synonyms?: string[];
    /** An array of patterns for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A pattern is a regular expression; for more information about how to specify a
     *  pattern, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-entities#entities-create-dictionary-based).
     */
    patterns?: string[];
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }
  export namespace CreateValue {
    export namespace Constants {
      /** Specifies the type of entity value. */
      export enum Type {
        SYNONYMS = 'synonyms',
        PATTERNS = 'patterns',
      }
    }
  }

  /**
   * DialogNode.
   */
  export interface DialogNode {
    /** The unique ID of the dialog node. This is an internal identifier used to refer to the dialog node from other
     *  dialog nodes and in the diagnostic information included with message responses.
     *
     *  This string can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
     */
    dialog_node: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab
     *  characters.
     */
    conditions?: string;
    /** The unique ID of the parent dialog node. This property is omitted if the dialog node has no parent. */
    parent?: string;
    /** The unique ID of the previous sibling dialog node. This property is omitted if the dialog node has no
     *  previous sibling.
     */
    previous_sibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
     */
    output?: DialogNodeOutput;
    /** The context for the dialog node. */
    context?: DialogNodeContext;
    /** The metadata for the dialog node. */
    metadata?: JsonObject;
    /** The next step to execute following this dialog node. */
    next_step?: DialogNodeNextStep;
    /** A human-readable name for the dialog node. If the node is included in disambiguation, this title is used to
     *  populate the **label** property of the corresponding suggestion in the `suggestion` response type (unless it is
     *  overridden by the **user_label** property). The title is also used to populate the **topic** property in the
     *  `connect_to_agent` response type.
     *
     *  This string can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
     */
    title?: string;
    /** How the dialog node is processed. */
    type?: DialogNode.Constants.Type | string;
    /** How an `event_handler` node is processed. */
    event_name?: DialogNode.Constants.EventName | string;
    /** The location in the dialog context where output is stored. */
    variable?: string;
    /** An array of objects describing any actions to be invoked by the dialog node. */
    actions?: DialogNodeAction[];
    /** Whether this top-level dialog node can be digressed into. */
    digress_in?: DialogNode.Constants.DigressIn | string;
    /** Whether this dialog node can be returned to after a digression. */
    digress_out?: DialogNode.Constants.DigressOut | string;
    /** Whether the user can digress to top-level nodes while filling out slots. */
    digress_out_slots?: DialogNode.Constants.DigressOutSlots | string;
    /** A label that can be displayed externally to describe the purpose of the node to users. If set, this label is
     *  used to identify the node in disambiguation responses (overriding the value of the **title** property).
     */
    user_label?: string;
    /** Whether the dialog node should be excluded from disambiguation suggestions. Valid only when
     *  **type**=`standard` or `frame`.
     */
    disambiguation_opt_out?: boolean;
    /** For internal use only. */
    disabled?: boolean;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }
  export namespace DialogNode {
    export namespace Constants {
      /** How the dialog node is processed. */
      export enum Type {
        STANDARD = 'standard',
        EVENT_HANDLER = 'event_handler',
        FRAME = 'frame',
        SLOT = 'slot',
        RESPONSE_CONDITION = 'response_condition',
        FOLDER = 'folder',
      }
      /** How an `event_handler` node is processed. */
      export enum EventName {
        FOCUS = 'focus',
        INPUT = 'input',
        FILLED = 'filled',
        VALIDATE = 'validate',
        FILLED_MULTIPLE = 'filled_multiple',
        GENERIC = 'generic',
        NOMATCH = 'nomatch',
        NOMATCH_RESPONSES_DEPLETED = 'nomatch_responses_depleted',
        DIGRESSION_RETURN_PROMPT = 'digression_return_prompt',
      }
      /** Whether this top-level dialog node can be digressed into. */
      export enum DigressIn {
        NOT_AVAILABLE = 'not_available',
        RETURNS = 'returns',
        DOES_NOT_RETURN = 'does_not_return',
      }
      /** Whether this dialog node can be returned to after a digression. */
      export enum DigressOut {
        ALLOW_RETURNING = 'allow_returning',
        ALLOW_ALL = 'allow_all',
        ALLOW_ALL_NEVER_RETURN = 'allow_all_never_return',
      }
      /** Whether the user can digress to top-level nodes while filling out slots. */
      export enum DigressOutSlots {
        NOT_ALLOWED = 'not_allowed',
        ALLOW_RETURNING = 'allow_returning',
        ALLOW_ALL = 'allow_all',
      }
    }
  }

  /**
   * DialogNodeAction.
   */
  export interface DialogNodeAction {
    /** The name of the action. */
    name: string;
    /** The type of action to invoke. */
    type?: DialogNodeAction.Constants.Type | string;
    /** A map of key/value pairs to be provided to the action. */
    parameters?: JsonObject;
    /** The location in the dialog context where the result of the action is stored. */
    result_variable: string;
    /** The name of the context variable that the client application will use to pass in credentials for the action. */
    credentials?: string;
  }
  export namespace DialogNodeAction {
    export namespace Constants {
      /** The type of action to invoke. */
      export enum Type {
        CLIENT = 'client',
        SERVER = 'server',
        CLOUD_FUNCTION = 'cloud_function',
        WEB_ACTION = 'web_action',
        WEBHOOK = 'webhook',
      }
    }
  }

  /**
   * An array of dialog nodes.
   */
  export interface DialogNodeCollection {
    /** An array of objects describing the dialog nodes defined for the workspace. */
    dialog_nodes: DialogNode[];
    /** The pagination data for the returned objects. For more information about using pagination, see
     *  [Pagination](#pagination).
     */
    pagination: Pagination;
  }

  /**
   * The context for the dialog node.
   *
   * This type supports additional properties of type any. Any context variable.
   */
  export interface DialogNodeContext {
    /** Context data intended for specific integrations. */
    integrations?: JsonObject;

    /**
     * DialogNodeContext accepts additional properties of type any. Any context variable.
     */
    [propName: string]: any;
  }

  /**
   * The next step to execute following this dialog node.
   */
  export interface DialogNodeNextStep {
    /** What happens after the dialog node completes. The valid values depend on the node type:
     *  - The following values are valid for any node:
     *    - `get_user_input`
     *    - `skip_user_input`
     *    - `jump_to`
     *  - If the node is of type `event_handler` and its parent node is of type `slot` or `frame`, additional values are
     *  also valid:
     *    - if **event_name**=`filled` and the type of the parent node is `slot`:
     *      - `reprompt`
     *      - `skip_all_slots`
     *  - if **event_name**=`nomatch` and the type of the parent node is `slot`:
     *      - `reprompt`
     *      - `skip_slot`
     *      - `skip_all_slots`
     *  - if **event_name**=`generic` and the type of the parent node is `frame`:
     *      - `reprompt`
     *      - `skip_slot`
     *      - `skip_all_slots`
     *       If you specify `jump_to`, then you must also specify a value for the `dialog_node` property.
     */
    behavior: DialogNodeNextStep.Constants.Behavior | string;
    /** The unique ID of the dialog node to process next. This parameter is required if **behavior**=`jump_to`. */
    dialog_node?: string;
    /** Which part of the dialog node to process next. */
    selector?: DialogNodeNextStep.Constants.Selector | string;
  }
  export namespace DialogNodeNextStep {
    export namespace Constants {
      /** What happens after the dialog node completes. The valid values depend on the node type: - The following values are valid for any node: - `get_user_input` - `skip_user_input` - `jump_to` - If the node is of type `event_handler` and its parent node is of type `slot` or `frame`, additional values are also valid: - if **event_name**=`filled` and the type of the parent node is `slot`: - `reprompt` - `skip_all_slots` - if **event_name**=`nomatch` and the type of the parent node is `slot`: - `reprompt` - `skip_slot` - `skip_all_slots` - if **event_name**=`generic` and the type of the parent node is `frame`: - `reprompt` - `skip_slot` - `skip_all_slots` If you specify `jump_to`, then you must also specify a value for the `dialog_node` property. */
      export enum Behavior {
        GET_USER_INPUT = 'get_user_input',
        SKIP_USER_INPUT = 'skip_user_input',
        JUMP_TO = 'jump_to',
        REPROMPT = 'reprompt',
        SKIP_SLOT = 'skip_slot',
        SKIP_ALL_SLOTS = 'skip_all_slots',
      }
      /** Which part of the dialog node to process next. */
      export enum Selector {
        CONDITION = 'condition',
        CLIENT = 'client',
        USER_INPUT = 'user_input',
        BODY = 'body',
      }
    }
  }

  /**
   * The output of the dialog node. For more information about how to specify dialog node output, see the
   * [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
   *
   * This type supports additional properties of type any. Any additional data included in the dialog node output.
   */
  export interface DialogNodeOutput {
    /** An array of objects describing the output defined for the dialog node. */
    generic?: DialogNodeOutputGeneric[];
    /** Output intended for specific integrations. For more information, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-dialog-responses-json).
     */
    integrations?: JsonObject;
    /** Options that modify how specified output is handled. */
    modifiers?: DialogNodeOutputModifiers;

    /**
     * DialogNodeOutput accepts additional properties of type any. Any additional data included in the dialog node
     * output.
     */
    [propName: string]: any;
  }

  /**
   * Routing or other contextual information to be used by target service desk systems.
   */
  export interface DialogNodeOutputConnectToAgentTransferInfo {
    target?: JsonObject;
  }

  /**
   * DialogNodeOutputGeneric.
   */
  export interface DialogNodeOutputGeneric {
  }

  /**
   * Options that modify how specified output is handled.
   */
  export interface DialogNodeOutputModifiers {
    /** Whether values in the output will overwrite output values in an array specified by previously executed
     *  dialog nodes. If this option is set to `false`, new values will be appended to previously specified values.
     */
    overwrite?: boolean;
  }

  /**
   * DialogNodeOutputOptionsElement.
   */
  export interface DialogNodeOutputOptionsElement {
    /** The user-facing label for the option. */
    label: string;
    /** An object defining the message input to be sent to the Watson Assistant service if the user selects the
     *  corresponding option.
     */
    value: DialogNodeOutputOptionsElementValue;
  }

  /**
   * An object defining the message input to be sent to the Watson Assistant service if the user selects the
   * corresponding option.
   */
  export interface DialogNodeOutputOptionsElementValue {
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** An array of intents to be used while processing the input.
     *
     *  **Note:** This property is supported for backward compatibility with applications that use the v1 **Get response
     *  to user input** method.
     */
    intents?: RuntimeIntent[];
    /** An array of entities to be used while processing the user input.
     *
     *  **Note:** This property is supported for backward compatibility with applications that use the v1 **Get response
     *  to user input** method.
     */
    entities?: RuntimeEntity[];
  }

  /**
   * DialogNodeOutputTextValuesElement.
   */
  export interface DialogNodeOutputTextValuesElement {
    /** The text of a response. This string can include newline characters (`\n`), Markdown tagging, or other
     *  special characters, if supported by the channel.
     */
    text?: string;
  }

  /**
   * DialogNodeVisitedDetails.
   */
  export interface DialogNodeVisitedDetails {
    /** The unique ID of a dialog node that was triggered during processing of the input message. */
    dialog_node?: string;
    /** The title of the dialog node. */
    title?: string;
    /** The conditions that trigger the dialog node. */
    conditions?: string;
  }

  /**
   * DialogSuggestion.
   */
  export interface DialogSuggestion {
    /** The user-facing label for the disambiguation option. This label is taken from the **title** or
     *  **user_label** property of the corresponding dialog node.
     */
    label: string;
    /** An object defining the message input, intents, and entities to be sent to the Watson Assistant service if
     *  the user selects the corresponding disambiguation option.
     *
     *   **Note:** These properties must be included in the request body of the next message sent to the assistant. Do
     *  not modify or remove any of the included properties.
     */
    value: DialogSuggestionValue;
    /** The dialog output that will be returned from the Watson Assistant service if the user selects the
     *  corresponding option.
     */
    output?: JsonObject;
    /** The unique ID of the dialog node that the **label** property is taken from. The **label** property is
     *  populated using the value of the dialog node's **title** or **user_label** property.
     */
    dialog_node?: string;
  }

  /**
   * An object defining the message input, intents, and entities to be sent to the Watson Assistant service if the user
   * selects the corresponding disambiguation option.
   *
   *  **Note:** These properties must be included in the request body of the next message sent to the assistant. Do not
   * modify or remove any of the included properties.
   */
  export interface DialogSuggestionValue {
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** An array of intents to be sent along with the user input. */
    intents?: RuntimeIntent[];
    /** An array of entities to be sent along with the user input. */
    entities?: RuntimeEntity[];
  }

  /**
   * Entity.
   */
  export interface Entity {
    /** The name of the entity. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, underscore, and hyphen characters.
     *  - If you specify an entity name beginning with the reserved prefix `sys-`, it must be the name of a system
     *  entity that you want to enable. (Any entity content specified with the request is ignored.).
     */
    entity: string;
    /** The description of the entity. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** Any metadata related to the entity. */
    metadata?: JsonObject;
    /** Whether to use fuzzy matching for the entity. */
    fuzzy_match?: boolean;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
    /** An array of objects describing the entity values. */
    values?: Value[];
  }

  /**
   * An array of objects describing the entities for the workspace.
   */
  export interface EntityCollection {
    /** An array of objects describing the entities defined for the workspace. */
    entities: Entity[];
    /** The pagination data for the returned objects. For more information about using pagination, see
     *  [Pagination](#pagination).
     */
    pagination: Pagination;
  }

  /**
   * An object describing a contextual entity mention.
   */
  export interface EntityMention {
    /** The text of the user input example. */
    text: string;
    /** The name of the intent. */
    intent: string;
    /** An array of zero-based character offsets that indicate where the entity mentions begin and end in the input
     *  text.
     */
    location: number[];
  }

  /**
   * EntityMentionCollection.
   */
  export interface EntityMentionCollection {
    /** An array of objects describing the entity mentions defined for an entity. */
    examples: EntityMention[];
    /** The pagination data for the returned objects. For more information about using pagination, see
     *  [Pagination](#pagination).
     */
    pagination: Pagination;
  }

  /**
   * Example.
   */
  export interface Example {
    /** The text of a user input example. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    text: string;
    /** An array of contextual entity mentions. */
    mentions?: Mention[];
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }

  /**
   * ExampleCollection.
   */
  export interface ExampleCollection {
    /** An array of objects describing the examples defined for the intent. */
    examples: Example[];
    /** The pagination data for the returned objects. For more information about using pagination, see
     *  [Pagination](#pagination).
     */
    pagination: Pagination;
  }

  /**
   * Intent.
   */
  export interface Intent {
    /** The name of the intent. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
     *  - It cannot begin with the reserved prefix `sys-`.
     */
    intent: string;
    /** The description of the intent. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
    /** An array of user input examples for the intent. */
    examples?: Example[];
  }

  /**
   * IntentCollection.
   */
  export interface IntentCollection {
    /** An array of objects describing the intents defined for the workspace. */
    intents: Intent[];
    /** The pagination data for the returned objects. For more information about using pagination, see
     *  [Pagination](#pagination).
     */
    pagination: Pagination;
  }

  /**
   * Log.
   */
  export interface Log {
    /** A request sent to the workspace, including the user input and context. */
    request: MessageRequest;
    /** The response sent by the workspace, including the output text, detected intents and entities, and context. */
    response: MessageResponse;
    /** A unique identifier for the logged event. */
    log_id: string;
    /** The timestamp for receipt of the message. */
    request_timestamp: string;
    /** The timestamp for the system response to the message. */
    response_timestamp: string;
    /** The unique identifier of the workspace where the request was made. */
    workspace_id: string;
    /** The language of the workspace where the message request was made. */
    language: string;
  }

  /**
   * LogCollection.
   */
  export interface LogCollection {
    /** An array of objects describing log events. */
    logs: Log[];
    /** The pagination data for the returned objects. For more information about using pagination, see
     *  [Pagination](#pagination).
     */
    pagination: LogPagination;
  }

  /**
   * Log message details.
   */
  export interface LogMessage {
    /** The severity of the log message. */
    level: LogMessage.Constants.Level | string;
    /** The text of the log message. */
    msg: string;
    /** A code that indicates the category to which the error message belongs. */
    code: string;
    /** An object that identifies the dialog element that generated the error message. */
    source?: LogMessageSource;
  }
  export namespace LogMessage {
    export namespace Constants {
      /** The severity of the log message. */
      export enum Level {
        INFO = 'info',
        ERROR = 'error',
        WARN = 'warn',
      }
    }
  }

  /**
   * An object that identifies the dialog element that generated the error message.
   */
  export interface LogMessageSource {
    /** A string that indicates the type of dialog element that generated the error message. */
    type?: LogMessageSource.Constants.Type | string;
    /** The unique identifier of the dialog node that generated the error message. */
    dialog_node?: string;
  }
  export namespace LogMessageSource {
    export namespace Constants {
      /** A string that indicates the type of dialog element that generated the error message. */
      export enum Type {
        DIALOG_NODE = 'dialog_node',
      }
    }
  }

  /**
   * The pagination data for the returned objects. For more information about using pagination, see
   * [Pagination](#pagination).
   */
  export interface LogPagination {
    /** The URL that will return the next page of results, if any. */
    next_url?: string;
    /** Reserved for future use. */
    matched?: number;
    /** A token identifying the next page of results. */
    next_cursor?: string;
  }

  /**
   * A mention of a contextual entity.
   */
  export interface Mention {
    /** The name of the entity. */
    entity: string;
    /** An array of zero-based character offsets that indicate where the entity mentions begin and end in the input
     *  text.
     */
    location: number[];
  }

  /**
   * Metadata related to the message.
   */
  export interface MessageContextMetadata {
    /** A label identifying the deployment environment, used for filtering log data. This string cannot contain
     *  carriage return, newline, or tab characters.
     */
    deployment?: string;
    /** A string value that identifies the user who is interacting with the workspace. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For user-based plans, this user ID
     *  is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or
     *  tab characters. If no value is specified in the input, **user_id** is automatically set to the value of
     *  **context.conversation_id**.
     *
     *  **Note:** This property is the same as the **user_id** property at the root of the message body. If **user_id**
     *  is specified in both locations in a message request, the value specified at the root is used.
     */
    user_id?: string;
  }

  /**
   * An input object that includes the input text.
   *
   * This type supports additional properties of type any. Any additional data included with the message input.
   */
  export interface MessageInput {
    /** The text of the user input. This string cannot contain carriage return, newline, or tab characters. */
    text?: string;
    /** Whether to use spelling correction when processing the input. This property overrides the value of the
     *  **spelling_suggestions** property in the workspace settings.
     */
    spelling_suggestions?: boolean;
    /** Whether to use autocorrection when processing the input. If spelling correction is used and this property is
     *  `false`, any suggested corrections are returned in the **suggested_text** property of the message response. If
     *  this property is `true`, any corrections are automatically applied to the user input, and the original text is
     *  returned in the **original_text** property of the message response. This property overrides the value of the
     *  **spelling_auto_correct** property in the workspace settings.
     */
    spelling_auto_correct?: boolean;
    /** Any suggested corrections of the input text. This property is returned only if spelling correction is
     *  enabled and autocorrection is disabled.
     */
    suggested_text?: string;
    /** The original user input text. This property is returned only if autocorrection is enabled and the user input
     *  was corrected.
     */
    original_text?: string;

    /**
     * MessageInput accepts additional properties of type any. Any additional data included with the message input.
     */
    [propName: string]: any;
  }

  /**
   * A request sent to the workspace, including the user input and context.
   */
  export interface MessageRequest {
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** Intents to use when evaluating the user input. Include intents from the previous response to continue using
     *  those intents rather than trying to recognize intents in the new input.
     */
    intents?: RuntimeIntent[];
    /** Entities to use when evaluating the message. Include entities from the previous response to continue using
     *  those entities rather than detecting entities in the new input.
     */
    entities?: RuntimeEntity[];
    /** Whether to return more than one intent. A value of `true` indicates that all matching intents are returned. */
    alternate_intents?: boolean;
    /** State information for the conversation. To maintain state, include the context from the previous response. */
    context?: Context;
    /** An output object that includes the response to the user, the dialog nodes that were triggered, and messages
     *  from the log.
     */
    output?: OutputData;
    /** An array of objects describing any actions requested by the dialog node. */
    actions?: DialogNodeAction[];
    /** A string value that identifies the user who is interacting with the workspace. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For user-based plans, this user ID
     *  is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or
     *  tab characters. If no value is specified in the input, **user_id** is automatically set to the value of
     *  **context.conversation_id**.
     *
     *  **Note:** This property is the same as the **user_id** property in the context metadata. If **user_id** is
     *  specified in both locations in a message request, the value specified at the root is used.
     */
    user_id?: string;
  }

  /**
   * The response sent by the workspace, including the output text, detected intents and entities, and context.
   */
  export interface MessageResponse {
    /** An input object that includes the input text. */
    input: MessageInput;
    /** An array of intents recognized in the user input, sorted in descending order of confidence. */
    intents: RuntimeIntent[];
    /** An array of entities identified in the user input. */
    entities: RuntimeEntity[];
    /** Whether to return more than one intent. A value of `true` indicates that all matching intents are returned. */
    alternate_intents?: boolean;
    /** State information for the conversation. To maintain state, include the context from the previous response. */
    context: Context;
    /** An output object that includes the response to the user, the dialog nodes that were triggered, and messages
     *  from the log.
     */
    output: OutputData;
    /** An array of objects describing any actions requested by the dialog node. */
    actions?: DialogNodeAction[];
    /** A string value that identifies the user who is interacting with the workspace. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For user-based plans, this user ID
     *  is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or
     *  tab characters. If no value is specified in the input, **user_id** is automatically set to the value of
     *  **context.conversation_id**.
     *
     *  **Note:** This property is the same as the **user_id** property in the context metadata. If **user_id** is
     *  specified in both locations in a message request, the value specified at the root is used.
     */
    user_id: string;
  }

  /**
   * An output object that includes the response to the user, the dialog nodes that were triggered, and messages from
   * the log.
   *
   * This type supports additional properties of type any. Any additional data included with the output.
   */
  export interface OutputData {
    /** An array of the nodes that were triggered to create the response, in the order in which they were visited.
     *  This information is useful for debugging and for tracing the path taken through the node tree.
     */
    nodes_visited?: string[];
    /** An array of objects containing detailed diagnostic information about the nodes that were triggered during
     *  processing of the input message. Included only if **nodes_visited_details** is set to `true` in the message
     *  request.
     */
    nodes_visited_details?: DialogNodeVisitedDetails[];
    /** An array of up to 50 messages logged with the request. */
    log_messages: LogMessage[];
    /** Output intended for any channel. It is the responsibility of the client application to implement the
     *  supported response types.
     */
    generic?: RuntimeResponseGeneric[];

    /**
     * OutputData accepts additional properties of type any. Any additional data included with the output.
     */
    [propName: string]: any;
  }

  /**
   * The pagination data for the returned objects. For more information about using pagination, see
   * [Pagination](#pagination).
   */
  export interface Pagination {
    /** The URL that will return the same page of results. */
    refresh_url: string;
    /** The URL that will return the next page of results. */
    next_url?: string;
    /** The total number of objects that satisfy the request. This total includes all results, not just those
     *  included in the current page.
     */
    total?: number;
    /** Reserved for future use. */
    matched?: number;
    /** A token identifying the current page of results. */
    refresh_cursor?: string;
    /** A token identifying the next page of results. */
    next_cursor?: string;
  }

  /**
   * ResponseGenericChannel.
   */
  export interface ResponseGenericChannel {
    /** A channel for which the response is intended.
     *
     *   **Note:** On IBM Cloud Pak for Data, only `chat` is supported.
     */
    channel?: ResponseGenericChannel.Constants.Channel | string;
  }
  export namespace ResponseGenericChannel {
    export namespace Constants {
      /** A channel for which the response is intended. **Note:** On IBM Cloud Pak for Data, only `chat` is supported. */
      export enum Channel {
        CHAT = 'chat',
        FACEBOOK = 'facebook',
        INTERCOM = 'intercom',
        SLACK = 'slack',
        TEXT_MESSAGING = 'text_messaging',
        VOICE_TELEPHONY = 'voice_telephony',
        WHATSAPP = 'whatsapp',
      }
    }
  }

  /**
   * A term from the request that was identified as an entity.
   */
  export interface RuntimeEntity {
    /** An entity detected in the input. */
    entity: string;
    /** An array of zero-based character offsets that indicate where the detected entity values begin and end in the
     *  input text.
     */
    location?: number[];
    /** The entity value that was recognized in the user input. */
    value: string;
    /** A decimal percentage that represents confidence in the recognized entity. */
    confidence?: number;
    /** The recognized capture groups for the entity, as defined by the entity pattern. */
    groups?: CaptureGroup[];
    /** An object containing detailed information about the entity recognized in the user input.
     *
     *  For more information about how system entities are interpreted, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-system-entities).
     */
    interpretation?: RuntimeEntityInterpretation;
    /** An array of possible alternative values that the user might have intended instead of the value returned in
     *  the **value** property. This property is returned only for `@sys-time` and `@sys-date` entities when the user's
     *  input is ambiguous.
     *
     *  This property is included only if the new system entities are enabled for the workspace.
     */
    alternatives?: RuntimeEntityAlternative[];
    /** An object describing the role played by a system entity that is specifies the beginning or end of a range
     *  recognized in the user input. This property is included only if the new system entities are enabled for the
     *  workspace.
     */
    role?: RuntimeEntityRole;
  }

  /**
   * An alternative value for the recognized entity.
   */
  export interface RuntimeEntityAlternative {
    /** The entity value that was recognized in the user input. */
    value?: string;
    /** A decimal percentage that represents confidence in the recognized entity. */
    confidence?: number;
  }

  /**
   * RuntimeEntityInterpretation.
   */
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
    granularity?: RuntimeEntityInterpretation.Constants.Granularity | string;
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
  export namespace RuntimeEntityInterpretation {
    export namespace Constants {
      /** The precision or duration of a time range specified by a recognized `@sys-time` or `@sys-date` entity. */
      export enum Granularity {
        DAY = 'day',
        FORTNIGHT = 'fortnight',
        HOUR = 'hour',
        INSTANT = 'instant',
        MINUTE = 'minute',
        MONTH = 'month',
        QUARTER = 'quarter',
        SECOND = 'second',
        WEEK = 'week',
        WEEKEND = 'weekend',
        YEAR = 'year',
      }
    }
  }

  /**
   * An object describing the role played by a system entity that is specifies the beginning or end of a range
   * recognized in the user input. This property is included only if the new system entities are enabled for the
   * workspace.
   */
  export interface RuntimeEntityRole {
    /** The relationship of the entity to the range. */
    type?: RuntimeEntityRole.Constants.Type | string;
  }
  export namespace RuntimeEntityRole {
    export namespace Constants {
      /** The relationship of the entity to the range. */
      export enum Type {
        DATE_FROM = 'date_from',
        DATE_TO = 'date_to',
        NUMBER_FROM = 'number_from',
        NUMBER_TO = 'number_to',
        TIME_FROM = 'time_from',
        TIME_TO = 'time_to',
      }
    }
  }

  /**
   * An intent identified in the user input.
   */
  export interface RuntimeIntent {
    /** The name of the recognized intent. */
    intent: string;
    /** A decimal percentage that represents confidence in the intent. If you are specifying an intent as part of a
     *  request, but you do not have a calculated confidence value, specify `1`.
     */
    confidence?: number;
  }

  /**
   * RuntimeResponseGeneric.
   */
  export interface RuntimeResponseGeneric {
  }

  /**
   * An object describing an error that occurred during processing of an asynchronous operation.
   */
  export interface StatusError {
    /** The text of the error message. */
    message?: string;
  }

  /**
   * Synonym.
   */
  export interface Synonym {
    /** The text of the synonym. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    synonym: string;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }

  /**
   * SynonymCollection.
   */
  export interface SynonymCollection {
    /** An array of synonyms. */
    synonyms: Synonym[];
    /** The pagination data for the returned objects. For more information about using pagination, see
     *  [Pagination](#pagination).
     */
    pagination: Pagination;
  }

  /**
   * Value.
   */
  export interface Value {
    /** The text of the entity value. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    value: string;
    /** Any metadata related to the entity value. */
    metadata?: JsonObject;
    /** Specifies the type of entity value. */
    type: Value.Constants.Type | string;
    /** An array of synonyms for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A synonym must conform to the following resrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    synonyms?: string[];
    /** An array of patterns for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A pattern is a regular expression; for more information about how to specify a
     *  pattern, see the
     *  [documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-entities#entities-create-dictionary-based).
     */
    patterns?: string[];
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }
  export namespace Value {
    export namespace Constants {
      /** Specifies the type of entity value. */
      export enum Type {
        SYNONYMS = 'synonyms',
        PATTERNS = 'patterns',
      }
    }
  }

  /**
   * ValueCollection.
   */
  export interface ValueCollection {
    /** An array of entity values. */
    values: Value[];
    /** The pagination data for the returned objects. For more information about using pagination, see
     *  [Pagination](#pagination).
     */
    pagination: Pagination;
  }

  /**
   * A webhook that can be used by dialog nodes to make programmatic calls to an external function.
   *
   * **Note:** Currently, only a single webhook named `main_webhook` is supported.
   */
  export interface Webhook {
    /** The URL for the external service or application to which you want to send HTTP POST requests. */
    url: string;
    /** The name of the webhook. Currently, `main_webhook` is the only supported value. */
    name: string;
    /** An optional array of HTTP headers to pass with the HTTP request. */
    headers?: WebhookHeader[];
  }

  /**
   * A key/value pair defining an HTTP header and a value.
   */
  export interface WebhookHeader {
    /** The name of an HTTP header (for example, `Authorization`). */
    name: string;
    /** The value of an HTTP header. */
    value: string;
  }

  /**
   * Workspace.
   */
  export interface Workspace {
    /** The name of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    name: string;
    /** The description of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The language of the workspace. */
    language: string;
    /** The workspace ID of the workspace. */
    workspace_id?: string;
    /** An array of objects describing the dialog nodes in the workspace. */
    dialog_nodes?: DialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: Counterexample[];
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
    /** Any metadata related to the workspace. */
    metadata?: JsonObject;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by
     *  IBM for general service improvements. `true` indicates that workspace training data is not to be used.
     */
    learning_opt_out: boolean;
    /** Global settings for the workspace. */
    system_settings?: WorkspaceSystemSettings;
    /** The current status of the workspace:
     *   - **Available**: The workspace is available and ready to process messages.
     *   - **Failed**: An asynchronous operation has failed. See the **status_errors** property for more information
     *  about the cause of the failure.
     *   - **Non Existent**: The workspace does not exist.
     *   - **Processing**: An asynchronous operation has not yet completed.
     *   - **Training**: The workspace is training based on new data such as intents or examples.
     */
    status?: Workspace.Constants.Status | string;
    /** An array of messages about errors that caused an asynchronous operation to fail. */
    status_errors?: StatusError[];
    webhooks?: Webhook[];
    /** An array of intents. */
    intents?: Intent[];
    /** An array of objects describing the entities for the workspace. */
    entities?: Entity[];
    /** An object containing properties that indicate how many intents, entities, and dialog nodes are defined in
     *  the workspace. This property is included only in responses from the **Export workspace asynchronously** method,
     *  and only when the **verbose** query parameter is set to `true`.
     */
    counts?: WorkspaceCounts;
  }
  export namespace Workspace {
    export namespace Constants {
      /** The current status of the workspace: - **Available**: The workspace is available and ready to process messages. - **Failed**: An asynchronous operation has failed. See the **status_errors** property for more information about the cause of the failure. - **Non Existent**: The workspace does not exist. - **Processing**: An asynchronous operation has not yet completed. - **Training**: The workspace is training based on new data such as intents or examples. */
      export enum Status {
        AVAILABLE = 'Available',
        FAILED = 'Failed',
        NON_EXISTENT = 'Non Existent',
        PROCESSING = 'Processing',
        TRAINING = 'Training',
        UNAVAILABLE = 'Unavailable',
      }
    }
  }

  /**
   * WorkspaceCollection.
   */
  export interface WorkspaceCollection {
    /** An array of objects describing the workspaces associated with the service instance. */
    workspaces: Workspace[];
    /** The pagination data for the returned objects. For more information about using pagination, see
     *  [Pagination](#pagination).
     */
    pagination: Pagination;
  }

  /**
   * An object containing properties that indicate how many intents, entities, and dialog nodes are defined in the
   * workspace. This property is included only in responses from the **Export workspace asynchronously** method, and
   * only when the **verbose** query parameter is set to `true`.
   */
  export interface WorkspaceCounts {
    /** The number of intents defined in the workspace. */
    intent?: number;
    /** The number of entities defined in the workspace. */
    entity?: number;
    /** The number of nodes defined in the workspace. */
    node?: number;
  }

  /**
   * Global settings for the workspace.
   *
   * This type supports additional properties of type any. For internal use only.
   */
  export interface WorkspaceSystemSettings {
    /** Workspace settings related to the Watson Assistant user interface. */
    tooling?: WorkspaceSystemSettingsTooling;
    /** Workspace settings related to the disambiguation feature. */
    disambiguation?: WorkspaceSystemSettingsDisambiguation;
    /** For internal use only. */
    human_agent_assist?: JsonObject;
    /** Whether spelling correction is enabled for the workspace. */
    spelling_suggestions?: boolean;
    /** Whether autocorrection is enabled for the workspace. If spelling correction is enabled and this property is
     *  `false`, any suggested corrections are returned in the **suggested_text** property of the message response. If
     *  this property is `true`, any corrections are automatically applied to the user input, and the original text is
     *  returned in the **original_text** property of the message response.
     */
    spelling_auto_correct?: boolean;
    /** Workspace settings related to the behavior of system entities. */
    system_entities?: WorkspaceSystemSettingsSystemEntities;
    /** Workspace settings related to detection of irrelevant input. */
    off_topic?: WorkspaceSystemSettingsOffTopic;
    /** Workspace settings related to the version of the training algorithms currently used by the skill. */
    nlp?: WorkspaceSystemSettingsNlp;

    /**
     * WorkspaceSystemSettings accepts additional properties of type any. For internal use only.
     */
    [propName: string]: any;
  }

  /**
   * Workspace settings related to the disambiguation feature.
   */
  export interface WorkspaceSystemSettingsDisambiguation {
    /** The text of the introductory prompt that accompanies disambiguation options presented to the user. */
    prompt?: string;
    /** The user-facing label for the option users can select if none of the suggested options is correct. If no
     *  value is specified for this property, this option does not appear.
     */
    none_of_the_above_prompt?: string;
    /** Whether the disambiguation feature is enabled for the workspace. */
    enabled?: boolean;
    /** The sensitivity of the disambiguation feature to intent detection uncertainty. Higher sensitivity means that
     *  the disambiguation feature is triggered more often and includes more choices.
     */
    sensitivity?: WorkspaceSystemSettingsDisambiguation.Constants.Sensitivity | string;
    /** Whether the order in which disambiguation suggestions are presented should be randomized (but still
     *  influenced by relative confidence).
     */
    randomize?: boolean;
    /** The maximum number of disambigation suggestions that can be included in a `suggestion` response. */
    max_suggestions?: number;
    /** For internal use only. */
    suggestion_text_policy?: string;
  }
  export namespace WorkspaceSystemSettingsDisambiguation {
    export namespace Constants {
      /** The sensitivity of the disambiguation feature to intent detection uncertainty. Higher sensitivity means that the disambiguation feature is triggered more often and includes more choices. */
      export enum Sensitivity {
        AUTO = 'auto',
        HIGH = 'high',
        MEDIUM_HIGH = 'medium_high',
        MEDIUM = 'medium',
        MEDIUM_LOW = 'medium_low',
        LOW = 'low',
      }
    }
  }

  /**
   * Workspace settings related to the version of the training algorithms currently used by the skill.
   */
  export interface WorkspaceSystemSettingsNlp {
    /** The policy the skill follows for selecting the algorithm version to use. For more information, see the
     *  [documentation](/docs/watson-assistant?topic=watson-assistant-algorithm-version).
     *
     *   On IBM Cloud, you can specify `latest`, `previous`, or `beta`.
     *
     *   On IBM Cloud Pak for Data, you can specify either `beta` or the date of the version you want to use, in
     *  `YYYY-MM-DD` format.
     */
    model?: string;
  }

  /**
   * Workspace settings related to detection of irrelevant input.
   */
  export interface WorkspaceSystemSettingsOffTopic {
    /** Whether enhanced irrelevance detection is enabled for the workspace. */
    enabled?: boolean;
  }

  /**
   * Workspace settings related to the behavior of system entities.
   */
  export interface WorkspaceSystemSettingsSystemEntities {
    /** Whether the new system entities are enabled for the workspace. */
    enabled?: boolean;
  }

  /**
   * Workspace settings related to the Watson Assistant user interface.
   */
  export interface WorkspaceSystemSettingsTooling {
    /** Whether the dialog JSON editor displays text responses within the `output.generic` object. */
    store_generic_responses?: boolean;
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypeAudio.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypeAudio extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The `https:` URL of the audio clip. */
    source: string;
    /** An optional title to show before the response. */
    title?: string;
    /** An optional description to show with the response. */
    description?: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
    /** For internal use only. */
    channel_options?: JsonObject;
    /** Descriptive text that can be used for screen readers or other situations where the audio player cannot be
     *  seen.
     */
    alt_text?: string;
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypeChannelTransfer.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypeChannelTransfer extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     *
     *   **Note:** The `channel_transfer` response type is not supported on IBM Cloud Pak for Data.
     */
    response_type: string;
    /** The message to display to the user when initiating a channel transfer. */
    message_to_user: string;
    /** Information used by an integration to transfer the conversation to a different channel. */
    transfer_info: ChannelTransferInfo;
    /** An array of objects specifying channels for which the response is intended. */
    channels?: ResponseGenericChannel[];
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypeConnectToAgent.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypeConnectToAgent extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** An optional message to be sent to the human agent who will be taking over the conversation. */
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
    /** An array of objects specifying channels for which the response is intended. */
    channels?: ResponseGenericChannel[];
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypeIframe.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypeIframe extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The `https:` URL of the embeddable content. */
    source: string;
    /** An optional title to show before the response. */
    title?: string;
    /** An optional description to show with the response. */
    description?: string;
    /** The URL of an image that shows a preview of the embedded content. */
    image_url?: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypeImage.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypeImage extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The `https:` URL of the image. */
    source: string;
    /** An optional title to show before the response. */
    title?: string;
    /** An optional description to show with the response. */
    description?: string;
    /** An array of objects specifying channels for which the response is intended. */
    channels?: ResponseGenericChannel[];
    /** Descriptive text that can be used for screen readers or other situations where the image cannot be seen. */
    alt_text?: string;
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypeOption.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypeOption extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** An optional title to show before the response. */
    title: string;
    /** An optional description to show with the response. */
    description?: string;
    /** The preferred type of control to display, if supported by the channel. */
    preference?: DialogNodeOutputGenericDialogNodeOutputResponseTypeOption.Constants.Preference | string;
    /** An array of objects describing the options from which the user can choose. You can include up to 20 options. */
    options: DialogNodeOutputOptionsElement[];
    /** An array of objects specifying channels for which the response is intended. */
    channels?: ResponseGenericChannel[];
  }
  export namespace DialogNodeOutputGenericDialogNodeOutputResponseTypeOption {
    export namespace Constants {
      /** The preferred type of control to display, if supported by the channel. */
      export enum Preference {
        DROPDOWN = 'dropdown',
        BUTTON = 'button',
      }
    }
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypePause.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypePause extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** How long to pause, in milliseconds. The valid values are from 0 to 10000. */
    time: number;
    /** Whether to send a "user is typing" event during the pause. Ignored if the channel does not support this
     *  event.
     */
    typing?: boolean;
    /** An array of objects specifying channels for which the response is intended. */
    channels?: ResponseGenericChannel[];
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypeSearchSkill.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypeSearchSkill extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     *
     *  **Note:** The **search_skill** response type is used only by the v2 runtime API.
     */
    response_type: string;
    /** The text of the search query. This can be either a natural-language query or a query that uses the Discovery
     *  query language syntax, depending on the value of the **query_type** property. For more information, see the
     *  [Discovery service
     *  documentation](https://cloud.ibm.com/docs/discovery?topic=discovery-query-operators#query-operators).
     */
    query: string;
    /** The type of the search query. */
    query_type: DialogNodeOutputGenericDialogNodeOutputResponseTypeSearchSkill.Constants.QueryType | string;
    /** An optional filter that narrows the set of documents to be searched. For more information, see the
     *  [Discovery service documentation]([Discovery service
     *  documentation](https://cloud.ibm.com/docs/discovery?topic=discovery-query-parameters#filter).
     */
    filter?: string;
    /** The version of the Discovery service API to use for the query. */
    discovery_version?: string;
    /** An array of objects specifying channels for which the response is intended. */
    channels?: ResponseGenericChannel[];
  }
  export namespace DialogNodeOutputGenericDialogNodeOutputResponseTypeSearchSkill {
    export namespace Constants {
      /** The type of the search query. */
      export enum QueryType {
        NATURAL_LANGUAGE = 'natural_language',
        DISCOVERY_QUERY_LANGUAGE = 'discovery_query_language',
      }
    }
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypeText.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypeText extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** A list of one or more objects defining text responses. */
    values: DialogNodeOutputTextValuesElement[];
    /** How a response is selected from the list, if more than one response is specified. */
    selection_policy?: DialogNodeOutputGenericDialogNodeOutputResponseTypeText.Constants.SelectionPolicy | string;
    /** The delimiter to use as a separator between responses when `selection_policy`=`multiline`. */
    delimiter?: string;
    /** An array of objects specifying channels for which the response is intended. */
    channels?: ResponseGenericChannel[];
  }
  export namespace DialogNodeOutputGenericDialogNodeOutputResponseTypeText {
    export namespace Constants {
      /** How a response is selected from the list, if more than one response is specified. */
      export enum SelectionPolicy {
        SEQUENTIAL = 'sequential',
        RANDOM = 'random',
        MULTILINE = 'multiline',
      }
    }
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypeUserDefined.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypeUserDefined extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** An object containing any properties for the user-defined response type. The total size of this object cannot
     *  exceed 5000 bytes.
     */
    user_defined: JsonObject;
    /** An array of objects specifying channels for which the response is intended. */
    channels?: ResponseGenericChannel[];
  }

  /**
   * DialogNodeOutputGenericDialogNodeOutputResponseTypeVideo.
   */
  export interface DialogNodeOutputGenericDialogNodeOutputResponseTypeVideo extends DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The `https:` URL of the video. */
    source: string;
    /** An optional title to show before the response. */
    title?: string;
    /** An optional description to show with the response. */
    description?: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
    /** For internal use only. */
    channel_options?: JsonObject;
    /** Descriptive text that can be used for screen readers or other situations where the video cannot be seen. */
    alt_text?: string;
  }

  /**
   * RuntimeResponseGenericRuntimeResponseTypeAudio.
   */
  export interface RuntimeResponseGenericRuntimeResponseTypeAudio extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The `https:` URL of the audio clip. */
    source: string;
    /** The title or introductory text to show before the response. */
    title?: string;
    /** The description to show with the response. */
    description?: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
    /** For internal use only. */
    channel_options?: JsonObject;
    /** Descriptive text that can be used for screen readers or other situations where the audio player cannot be
     *  seen.
     */
    alt_text?: string;
  }

  /**
   * RuntimeResponseGenericRuntimeResponseTypeChannelTransfer.
   */
  export interface RuntimeResponseGenericRuntimeResponseTypeChannelTransfer extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     *
     *   **Note:** The `channel_transfer` response type is not supported on IBM Cloud Pak for Data.
     */
    response_type: string;
    /** The message to display to the user when initiating a channel transfer. */
    message_to_user: string;
    /** Information used by an integration to transfer the conversation to a different channel. */
    transfer_info: ChannelTransferInfo;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended only for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /**
   * RuntimeResponseGenericRuntimeResponseTypeConnectToAgent.
   */
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
    /** The unique ID of the dialog node that the **topic** property is taken from. The **topic** property is
     *  populated using the value of the dialog node's **title** property.
     */
    dialog_node?: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /**
   * RuntimeResponseGenericRuntimeResponseTypeIframe.
   */
  export interface RuntimeResponseGenericRuntimeResponseTypeIframe extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The `https:` URL of the embeddable content. */
    source: string;
    /** The title or introductory text to show before the response. */
    title?: string;
    /** The description to show with the response. */
    description?: string;
    /** The URL of an image that shows a preview of the embedded content. */
    image_url?: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }

  /**
   * RuntimeResponseGenericRuntimeResponseTypeImage.
   */
  export interface RuntimeResponseGenericRuntimeResponseTypeImage extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The `https:` URL of the image. */
    source: string;
    /** The title or introductory text to show before the response. */
    title?: string;
    /** The description to show with the response. */
    description?: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
    /** Descriptive text that can be used for screen readers or other situations where the image cannot be seen. */
    alt_text?: string;
  }

  /**
   * RuntimeResponseGenericRuntimeResponseTypeOption.
   */
  export interface RuntimeResponseGenericRuntimeResponseTypeOption extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The title or introductory text to show before the response. */
    title: string;
    /** The description to show with the response. */
    description?: string;
    /** The preferred type of control to display. */
    preference?: RuntimeResponseGenericRuntimeResponseTypeOption.Constants.Preference | string;
    /** An array of objects describing the options from which the user can choose. */
    options: DialogNodeOutputOptionsElement[];
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
  }
  export namespace RuntimeResponseGenericRuntimeResponseTypeOption {
    export namespace Constants {
      /** The preferred type of control to display. */
      export enum Preference {
        DROPDOWN = 'dropdown',
        BUTTON = 'button',
      }
    }
  }

  /**
   * RuntimeResponseGenericRuntimeResponseTypePause.
   */
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

  /**
   * RuntimeResponseGenericRuntimeResponseTypeSuggestion.
   */
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

  /**
   * RuntimeResponseGenericRuntimeResponseTypeText.
   */
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

  /**
   * RuntimeResponseGenericRuntimeResponseTypeUserDefined.
   */
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

  /**
   * RuntimeResponseGenericRuntimeResponseTypeVideo.
   */
  export interface RuntimeResponseGenericRuntimeResponseTypeVideo extends RuntimeResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     */
    response_type: string;
    /** The `https:` URL of the video. */
    source: string;
    /** The title or introductory text to show before the response. */
    title?: string;
    /** The description to show with the response. */
    description?: string;
    /** An array of objects specifying channels for which the response is intended. If **channels** is present, the
     *  response is intended for a built-in integration and should not be handled by an API client.
     */
    channels?: ResponseGenericChannel[];
    /** For internal use only. */
    channel_options?: JsonObject;
    /** Descriptive text that can be used for screen readers or other situations where the video cannot be seen. */
    alt_text?: string;
  }
}

export = AssistantV1;
