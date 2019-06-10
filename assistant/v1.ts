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

class AssistantV1 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/assistant/api';
  name: string; // set by prototype to 'conversation'
  serviceVersion: string; // set by prototype to 'v1'

  /**
   * Construct a AssistantV1 object.
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
   * @returns {AssistantV1}
   * @throws {Error}
   */
  constructor(options: AssistantV1.Options) {
    super(options);
    // check if 'version' was provided
    if (typeof this._options.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this._options.qs.version = options.version;
  }

  /*************************
   * message
   ************************/

  /**
   * Get response to user input.
   *
   * Send user input to a workspace and receive a response.
   *
   * There is no rate limit for this operation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {MessageInput} [params.input] - An input object that includes the input text.
   * @param {RuntimeIntent[]} [params.intents] - Intents to use when evaluating the user input. Include intents from the
   * previous response to continue using those intents rather than trying to recognize intents in the new input.
   * @param {RuntimeEntity[]} [params.entities] - Entities to use when evaluating the message. Include entities from the
   * previous response to continue using those entities rather than detecting entities in the new input.
   * @param {boolean} [params.alternate_intents] - Whether to return more than one intent. A value of `true` indicates
   * that all matching intents are returned.
   * @param {Context} [params.context] - State information for the conversation. To maintain state, include the context
   * from the previous response.
   * @param {OutputData} [params.output] - An output object that includes the response to the user, the dialog nodes
   * that were triggered, and messages from the log.
   * @param {boolean} [params.nodes_visited_details] - Whether to include additional diagnostic information about the
   * dialog nodes that were visited during processing of the message.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public message(params: AssistantV1.MessageParams, callback?: AssistantV1.Callback<AssistantV1.MessageResponse>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id'];

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
      'intents': _params.intents,
      'entities': _params.entities,
      'alternate_intents': _params.alternate_intents,
      'context': _params.context,
      'output': _params.output
    };
 
    const query = {
      'nodes_visited_details': _params.nodes_visited_details
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'message');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/message',
        method: 'POST',
        body,
        qs: query,
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

  /*************************
   * workspaces
   ************************/

  /**
   * Create workspace.
   *
   * Create a workspace based on component objects. You must provide workspace components defining the content of the
   * new workspace.
   *
   * This operation is limited to 30 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - The name of the workspace. This string cannot contain carriage return, newline, or
   * tab characters.
   * @param {string} [params.description] - The description of the workspace. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.language] - The language of the workspace.
   * @param {JsonObject} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learning_opt_out] - Whether training data from the workspace (including artifacts such as
   * intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training
   * data is not to be used.
   * @param {WorkspaceSystemSettings} [params.system_settings] - Global settings for the workspace.
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects describing the entities for the workspace.
   * @param {DialogNode[]} [params.dialog_nodes] - An array of objects describing the dialog nodes in the workspace.
   * @param {Counterexample[]} [params.counterexamples] - An array of objects defining input examples that have been
   * marked as irrelevant input.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createWorkspace(params?: AssistantV1.CreateWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Workspace>): Promise<any> | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createWorkspace(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'language': _params.language,
      'metadata': _params.metadata,
      'learning_opt_out': _params.learning_opt_out,
      'system_settings': _params.system_settings,
      'intents': _params.intents,
      'entities': _params.entities,
      'dialog_nodes': _params.dialog_nodes,
      'counterexamples': _params.counterexamples
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createWorkspace');

    const parameters = {
      options: {
        url: '/v1/workspaces',
        method: 'POST',
        body,
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

  /**
   * Delete workspace.
   *
   * Delete a workspace from the service instance.
   *
   * This operation is limited to 30 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteWorkspace(params: AssistantV1.DeleteWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteWorkspace(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteWorkspace');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
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

  /**
   * Get information about a workspace.
   *
   * Get information about a workspace, optionally including all workspace content.
   *
   * With **export**=`false`, this operation is limited to 6000 requests per 5 minutes. With **export**=`true`, the
   * limit is 20 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {string} [params.sort] - Indicates how the returned workspace data will be sorted. This parameter is valid
   * only if **export**=`true`. Specify `sort=stable` to sort all workspace objects by unique identifier, in ascending
   * alphabetical order.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getWorkspace(params: AssistantV1.GetWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Workspace>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getWorkspace(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'export': _params._export,
      'include_audit': _params.include_audit,
      'sort': _params.sort
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'getWorkspace');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
        method: 'GET',
        qs: query,
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
   * List workspaces.
   *
   * List the workspaces associated with a Watson Assistant service instance.
   *
   * This operation is limited to 500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned workspaces will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listWorkspaces(params?: AssistantV1.ListWorkspacesParams, callback?: AssistantV1.Callback<AssistantV1.WorkspaceCollection>): Promise<any> | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listWorkspaces(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }
 
    const query = {
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listWorkspaces');

    const parameters = {
      options: {
        url: '/v1/workspaces',
        method: 'GET',
        qs: query,
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
   * Update workspace.
   *
   * Update an existing workspace with new or modified data. You must provide component objects defining the content of
   * the updated workspace.
   *
   * This operation is limited to 30 request per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} [params.name] - The name of the workspace. This string cannot contain carriage return, newline, or
   * tab characters.
   * @param {string} [params.description] - The description of the workspace. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.language] - The language of the workspace.
   * @param {JsonObject} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learning_opt_out] - Whether training data from the workspace (including artifacts such as
   * intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training
   * data is not to be used.
   * @param {WorkspaceSystemSettings} [params.system_settings] - Global settings for the workspace.
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects describing the entities for the workspace.
   * @param {DialogNode[]} [params.dialog_nodes] - An array of objects describing the dialog nodes in the workspace.
   * @param {Counterexample[]} [params.counterexamples] - An array of objects defining input examples that have been
   * marked as irrelevant input.
   * @param {boolean} [params.append] - Whether the new data is to be appended to the existing data in the workspace. If
   * **append**=`false`, elements included in the new data completely replace the corresponding existing elements,
   * including all subelements. For example, if the new data includes **entities** and **append**=`false`, all existing
   * entities in the workspace are discarded and replaced with the new entities.
   *
   * If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the new
   * data collide with existing elements, the update request fails.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateWorkspace(params: AssistantV1.UpdateWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Workspace>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.updateWorkspace(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'language': _params.language,
      'metadata': _params.metadata,
      'learning_opt_out': _params.learning_opt_out,
      'system_settings': _params.system_settings,
      'intents': _params.intents,
      'entities': _params.entities,
      'dialog_nodes': _params.dialog_nodes,
      'counterexamples': _params.counterexamples
    };
 
    const query = {
      'append': _params.append
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'updateWorkspace');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
        method: 'POST',
        body,
        qs: query,
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

  /*************************
   * intents
   ************************/

  /**
   * Create intent.
   *
   * Create a new intent.
   *
   * If you want to create multiple intents with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * This operation is limited to 2000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The name of the intent. This string must conform to the following restrictions:
   * - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * @param {string} [params.description] - The description of the intent. This string cannot contain carriage return,
   * newline, or tab characters.
   * @param {Example[]} [params.examples] - An array of user input examples for the intent.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createIntent(params: AssistantV1.CreateIntentParams, callback?: AssistantV1.Callback<AssistantV1.Intent>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'intent'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createIntent(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'intent': _params.intent,
      'description': _params.description,
      'examples': _params.examples
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createIntent');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents',
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

  /**
   * Delete intent.
   *
   * Delete an intent from a workspace.
   *
   * This operation is limited to 2000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteIntent(params: AssistantV1.DeleteIntentParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'intent'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteIntent(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteIntent');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
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

  /**
   * Get intent.
   *
   * Get information about an intent, optionally including all intent content.
   *
   * With **export**=`false`, this operation is limited to 6000 requests per 5 minutes. With **export**=`true`, the
   * limit is 400 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getIntent(params: AssistantV1.GetIntentParams, callback?: AssistantV1.Callback<AssistantV1.Intent>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'intent'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getIntent(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'export': _params._export,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'getIntent');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
        method: 'GET',
        qs: query,
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
   * List intents.
   *
   * List the intents for a workspace.
   *
   * With **export**=`false`, this operation is limited to 2000 requests per 30 minutes. With **export**=`true`, the
   * limit is 400 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned intents will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listIntents(params: AssistantV1.ListIntentsParams, callback?: AssistantV1.Callback<AssistantV1.IntentCollection>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listIntents(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'export': _params._export,
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listIntents');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents',
        method: 'GET',
        qs: query,
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
   * Update intent.
   *
   * Update an existing intent with new or modified data. You must provide component objects defining the content of the
   * updated intent.
   *
   * If you want to update multiple intents with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * This operation is limited to 2000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} [params.new_intent] - The name of the intent. This string must conform to the following
   * restrictions:
   * - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * @param {string} [params.new_description] - The description of the intent. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {Example[]} [params.new_examples] - An array of user input examples for the intent.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateIntent(params: AssistantV1.UpdateIntentParams, callback?: AssistantV1.Callback<AssistantV1.Intent>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'intent'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.updateIntent(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'intent': _params.new_intent,
      'description': _params.new_description,
      'examples': _params.new_examples
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'updateIntent');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
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

  /*************************
   * examples
   ************************/

  /**
   * Create user input example.
   *
   * Add a new user input example to an intent.
   *
   * If you want to add multiple exaples with a single API call, consider using the **[Update intent](#update-intent)**
   * method instead.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of a user input example. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {Mention[]} [params.mentions] - An array of contextual entity mentions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createExample(params: AssistantV1.CreateExampleParams, callback?: AssistantV1.Callback<AssistantV1.Example>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'intent', 'text'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createExample(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'text': _params.text,
      'mentions': _params.mentions
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createExample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
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

  /**
   * Delete user input example.
   *
   * Delete a user input example from an intent.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of the user input example.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteExample(params: AssistantV1.DeleteExampleParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'intent', 'text'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteExample(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent,
      'text': _params.text
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteExample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
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

  /**
   * Get user input example.
   *
   * Get information about a user input example.
   *
   * This operation is limited to 6000 requests per 5 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of the user input example.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getExample(params: AssistantV1.GetExampleParams, callback?: AssistantV1.Callback<AssistantV1.Example>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'intent', 'text'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getExample(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent,
      'text': _params.text
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'getExample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
        method: 'GET',
        qs: query,
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
   * List user input examples.
   *
   * List the user input examples for an intent, optionally including contextual entity mentions.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned examples will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listExamples(params: AssistantV1.ListExamplesParams, callback?: AssistantV1.Callback<AssistantV1.ExampleCollection>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'intent'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listExamples(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listExamples');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
        method: 'GET',
        qs: query,
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
   * Update user input example.
   *
   * Update the text of a user input example.
   *
   * If you want to update multiple examples with a single API call, consider using the **[Update
   * intent](#update-intent)** method instead.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of the user input example.
   * @param {string} [params.new_text] - The text of the user input example. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {Mention[]} [params.new_mentions] - An array of contextual entity mentions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateExample(params: AssistantV1.UpdateExampleParams, callback?: AssistantV1.Callback<AssistantV1.Example>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'intent', 'text'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.updateExample(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'text': _params.new_text,
      'mentions': _params.new_mentions
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent,
      'text': _params.text
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'updateExample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
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

  /*************************
   * counterexamples
   ************************/

  /**
   * Create counterexample.
   *
   * Add a new counterexample to a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * If you want to add multiple counterexamples with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input marked as irrelevant input. This string must conform to the
   * following restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createCounterexample(params: AssistantV1.CreateCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Counterexample>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'text'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createCounterexample(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'text': _params.text
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createCounterexample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples',
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

  /**
   * Delete counterexample.
   *
   * Delete a counterexample from a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteCounterexample(params: AssistantV1.DeleteCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'text'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteCounterexample(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'workspace_id': _params.workspace_id,
      'text': _params.text
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteCounterexample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
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

  /**
   * Get counterexample.
   *
   * Get information about a counterexample. Counterexamples are examples that have been marked as irrelevant input.
   *
   * This operation is limited to 6000 requests per 5 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getCounterexample(params: AssistantV1.GetCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Counterexample>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'text'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getCounterexample(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'text': _params.text
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'getCounterexample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
        method: 'GET',
        qs: query,
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
   * List counterexamples.
   *
   * List the counterexamples for a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned counterexamples will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listCounterexamples(params: AssistantV1.ListCounterexamplesParams, callback?: AssistantV1.Callback<AssistantV1.CounterexampleCollection>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listCounterexamples(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listCounterexamples');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples',
        method: 'GET',
        qs: query,
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
   * Update counterexample.
   *
   * Update the text of a counterexample. Counterexamples are examples that have been marked as irrelevant input.
   *
   * If you want to update multiple counterexamples with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {string} [params.new_text] - The text of a user input marked as irrelevant input. This string must conform
   * to the following restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateCounterexample(params: AssistantV1.UpdateCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Counterexample>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'text'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.updateCounterexample(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'text': _params.new_text
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'text': _params.text
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'updateCounterexample');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
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

  /*************************
   * entities
   ************************/

  /**
   * Create entity.
   *
   * Create a new entity, or enable a system entity.
   *
   * If you want to create multiple entities with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity. This string must conform to the following restrictions:
   * - It can contain only Unicode alphanumeric, underscore, and hyphen characters.
   * - If you specify an entity name beginning with the reserved prefix `sys-`, it must be the name of a system entity
   * that you want to enable. (Any entity content specified with the request is ignored.).
   * @param {string} [params.description] - The description of the entity. This string cannot contain carriage return,
   * newline, or tab characters.
   * @param {JsonObject} [params.metadata] - Any metadata related to the entity.
   * @param {boolean} [params.fuzzy_match] - Whether to use fuzzy matching for the entity.
   * @param {CreateValue[]} [params.values] - An array of objects describing the entity values.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createEntity(params: AssistantV1.CreateEntityParams, callback?: AssistantV1.Callback<AssistantV1.Entity>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createEntity(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'entity': _params.entity,
      'description': _params.description,
      'metadata': _params.metadata,
      'fuzzy_match': _params.fuzzy_match,
      'values': _params.values
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createEntity');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities',
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

  /**
   * Delete entity.
   *
   * Delete an entity from a workspace, or disable a system entity.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteEntity(params: AssistantV1.DeleteEntityParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteEntity(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteEntity');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
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

  /**
   * Get entity.
   *
   * Get information about an entity, optionally including all entity content.
   *
   * With **export**=`false`, this operation is limited to 6000 requests per 5 minutes. With **export**=`true`, the
   * limit is 200 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getEntity(params: AssistantV1.GetEntityParams, callback?: AssistantV1.Callback<AssistantV1.Entity>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getEntity(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'export': _params._export,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'getEntity');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
        method: 'GET',
        qs: query,
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
   * List entities.
   *
   * List the entities for a workspace.
   *
   * With **export**=`false`, this operation is limited to 1000 requests per 30 minutes. With **export**=`true`, the
   * limit is 200 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned entities will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listEntities(params: AssistantV1.ListEntitiesParams, callback?: AssistantV1.Callback<AssistantV1.EntityCollection>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listEntities(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'export': _params._export,
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listEntities');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities',
        method: 'GET',
        qs: query,
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
   * Update entity.
   *
   * Update an existing entity with new or modified data. You must provide component objects defining the content of the
   * updated entity.
   *
   * If you want to update multiple entities with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} [params.new_entity] - The name of the entity. This string must conform to the following
   * restrictions:
   * - It can contain only Unicode alphanumeric, underscore, and hyphen characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * @param {string} [params.new_description] - The description of the entity. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {JsonObject} [params.new_metadata] - Any metadata related to the entity.
   * @param {boolean} [params.new_fuzzy_match] - Whether to use fuzzy matching for the entity.
   * @param {CreateValue[]} [params.new_values] - An array of objects describing the entity values.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateEntity(params: AssistantV1.UpdateEntityParams, callback?: AssistantV1.Callback<AssistantV1.Entity>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.updateEntity(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'entity': _params.new_entity,
      'description': _params.new_description,
      'metadata': _params.new_metadata,
      'fuzzy_match': _params.new_fuzzy_match,
      'values': _params.new_values
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'updateEntity');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
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

  /*************************
   * mentions
   ************************/

  /**
   * List entity mentions.
   *
   * List mentions for a contextual entity. An entity mention is an occurrence of a contextual entity in the context of
   * an intent user input example.
   *
   * This operation is limited to 200 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listMentions(params: AssistantV1.ListMentionsParams, callback?: AssistantV1.Callback<AssistantV1.EntityMentionCollection>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listMentions(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'export': _params._export,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listMentions');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/mentions',
        method: 'GET',
        qs: query,
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
   * values
   ************************/

  /**
   * Create entity value.
   *
   * Create a new value for an entity.
   *
   * If you want to create multiple entity values with a single API call, consider using the **[Update
   * entity](#update-entity)** method instead.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {JsonObject} [params.metadata] - Any metadata related to the entity value.
   * @param {string} [params.value_type] - Specifies the type of entity value.
   * @param {string[]} [params.synonyms] - An array of synonyms for the entity value. A value can specify either
   * synonyms or patterns (depending on the value type), but not both. A synonym must conform to the following
   * resrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {string[]} [params.patterns] - An array of patterns for the entity value. A value can specify either
   * synonyms or patterns (depending on the value type), but not both. A pattern is a regular expression; for more
   * information about how to specify a pattern, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createValue(params: AssistantV1.CreateValueParams, callback?: AssistantV1.Callback<AssistantV1.Value>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity', 'value'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createValue(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'value': _params.value,
      'metadata': _params.metadata,
      'type': _params.value_type,
      'synonyms': _params.synonyms,
      'patterns': _params.patterns
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createValue');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
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

  /**
   * Delete entity value.
   *
   * Delete a value from an entity.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteValue(params: AssistantV1.DeleteValueParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity', 'value'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteValue(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteValue');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
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

  /**
   * Get entity value.
   *
   * Get information about an entity value.
   *
   * This operation is limited to 6000 requests per 5 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getValue(params: AssistantV1.GetValueParams, callback?: AssistantV1.Callback<AssistantV1.Value>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity', 'value'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getValue(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'export': _params._export,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'getValue');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
        method: 'GET',
        qs: query,
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
   * List entity values.
   *
   * List the values for an entity.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned entity values will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listValues(params: AssistantV1.ListValuesParams, callback?: AssistantV1.Callback<AssistantV1.ValueCollection>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listValues(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'export': _params._export,
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listValues');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
        method: 'GET',
        qs: query,
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
   * Update entity value.
   *
   * Update an existing entity value with new or modified data. You must provide component objects defining the content
   * of the updated entity value.
   *
   * If you want to update multiple entity values with a single API call, consider using the **[Update
   * entity](#update-entity)** method instead.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} [params.new_value] - The text of the entity value. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {JsonObject} [params.new_metadata] - Any metadata related to the entity value.
   * @param {string} [params.new_value_type] - Specifies the type of entity value.
   * @param {string[]} [params.new_synonyms] - An array of synonyms for the entity value. A value can specify either
   * synonyms or patterns (depending on the value type), but not both. A synonym must conform to the following
   * resrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {string[]} [params.new_patterns] - An array of patterns for the entity value. A value can specify either
   * synonyms or patterns (depending on the value type), but not both. A pattern is a regular expression; for more
   * information about how to specify a pattern, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateValue(params: AssistantV1.UpdateValueParams, callback?: AssistantV1.Callback<AssistantV1.Value>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity', 'value'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.updateValue(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'value': _params.new_value,
      'metadata': _params.new_metadata,
      'type': _params.new_value_type,
      'synonyms': _params.new_synonyms,
      'patterns': _params.new_patterns
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'updateValue');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
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

  /*************************
   * synonyms
   ************************/

  /**
   * Create entity value synonym.
   *
   * Add a new synonym to an entity value.
   *
   * If you want to create multiple synonyms with a single API call, consider using the **[Update
   * entity](#update-entity)** or **[Update entity value](#update-entity-value)** method instead.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym. This string must conform to the following restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createSynonym(params: AssistantV1.CreateSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Synonym>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createSynonym(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'synonym': _params.synonym
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createSynonym');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
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

  /**
   * Delete entity value synonym.
   *
   * Delete a synonym from an entity value.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteSynonym(params: AssistantV1.DeleteSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteSynonym(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value,
      'synonym': _params.synonym
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteSynonym');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
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

  /**
   * Get entity value synonym.
   *
   * Get information about a synonym of an entity value.
   *
   * This operation is limited to 6000 requests per 5 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getSynonym(params: AssistantV1.GetSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Synonym>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getSynonym(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value,
      'synonym': _params.synonym
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'getSynonym');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
        method: 'GET',
        qs: query,
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
   * List entity value synonyms.
   *
   * List the synonyms for an entity value.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned entity value synonyms will be sorted. To reverse
   * the sort order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listSynonyms(params: AssistantV1.ListSynonymsParams, callback?: AssistantV1.Callback<AssistantV1.SynonymCollection>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity', 'value'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listSynonyms(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listSynonyms');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
        method: 'GET',
        qs: query,
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
   * Update entity value synonym.
   *
   * Update an existing entity value synonym with new text.
   *
   * If you want to update multiple synonyms with a single API call, consider using the **[Update
   * entity](#update-entity)** or **[Update entity value](#update-entity-value)** method instead.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {string} [params.new_synonym] - The text of the synonym. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateSynonym(params: AssistantV1.UpdateSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Synonym>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.updateSynonym(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'synonym': _params.new_synonym
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value,
      'synonym': _params.synonym
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'updateSynonym');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
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

  /*************************
   * dialogNodes
   ************************/

  /**
   * Create dialog node.
   *
   * Create a new dialog node.
   *
   * If you want to create multiple dialog nodes with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * This operation is limited to 500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.dialog_node - The dialog node ID. This string must conform to the following restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.description] - The description of the dialog node. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.conditions] - The condition that will trigger the dialog node. This string cannot contain
   * carriage return, newline, or tab characters.
   * @param {string} [params.parent] - The ID of the parent dialog node. This property is omitted if the dialog node has
   * no parent.
   * @param {string} [params.previous_sibling] - The ID of the previous sibling dialog node. This property is omitted if
   * the dialog node has no previous sibling.
   * @param {DialogNodeOutput} [params.output] - The output of the dialog node. For more information about how to
   * specify dialog node output, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
   * @param {JsonObject} [params.context] - The context for the dialog node.
   * @param {JsonObject} [params.metadata] - The metadata for the dialog node.
   * @param {DialogNodeNextStep} [params.next_step] - The next step to execute following this dialog node.
   * @param {string} [params.title] - The alias used to identify the dialog node. This string must conform to the
   * following restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.node_type] - How the dialog node is processed.
   * @param {string} [params.event_name] - How an `event_handler` node is processed.
   * @param {string} [params.variable] - The location in the dialog context where output is stored.
   * @param {DialogNodeAction[]} [params.actions] - An array of objects describing any actions to be invoked by the
   * dialog node.
   * @param {string} [params.digress_in] - Whether this top-level dialog node can be digressed into.
   * @param {string} [params.digress_out] - Whether this dialog node can be returned to after a digression.
   * @param {string} [params.digress_out_slots] - Whether the user can digress to top-level nodes while filling out
   * slots.
   * @param {string} [params.user_label] - A label that can be displayed externally to describe the purpose of the node
   * to users.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createDialogNode(params: AssistantV1.CreateDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.DialogNode>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'dialog_node'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.createDialogNode(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'dialog_node': _params.dialog_node,
      'description': _params.description,
      'conditions': _params.conditions,
      'parent': _params.parent,
      'previous_sibling': _params.previous_sibling,
      'output': _params.output,
      'context': _params.context,
      'metadata': _params.metadata,
      'next_step': _params.next_step,
      'title': _params.title,
      'type': _params.node_type,
      'event_name': _params.event_name,
      'variable': _params.variable,
      'actions': _params.actions,
      'digress_in': _params.digress_in,
      'digress_out': _params.digress_out,
      'digress_out_slots': _params.digress_out_slots,
      'user_label': _params.user_label
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createDialogNode');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes',
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

  /**
   * Delete dialog node.
   *
   * Delete a dialog node from a workspace.
   *
   * This operation is limited to 500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.dialog_node - The dialog node ID (for example, `get_order`).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteDialogNode(params: AssistantV1.DeleteDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'dialog_node'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteDialogNode(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const path = {
      'workspace_id': _params.workspace_id,
      'dialog_node': _params.dialog_node
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteDialogNode');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
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

  /**
   * Get dialog node.
   *
   * Get information about a dialog node.
   *
   * This operation is limited to 6000 requests per 5 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.dialog_node - The dialog node ID (for example, `get_order`).
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getDialogNode(params: AssistantV1.GetDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.DialogNode>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'dialog_node'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.getDialogNode(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'dialog_node': _params.dialog_node
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'getDialogNode');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
        method: 'GET',
        qs: query,
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
   * List dialog nodes.
   *
   * List the dialog nodes for a workspace.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned dialog nodes will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listDialogNodes(params: AssistantV1.ListDialogNodesParams, callback?: AssistantV1.Callback<AssistantV1.DialogNodeCollection>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listDialogNodes(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listDialogNodes');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes',
        method: 'GET',
        qs: query,
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
   * Update dialog node.
   *
   * Update an existing dialog node with new or modified data.
   *
   * If you want to update multiple dialog nodes with a single API call, consider using the **[Update
   * workspace](#update-workspace)** method instead.
   *
   * This operation is limited to 500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.dialog_node - The dialog node ID (for example, `get_order`).
   * @param {string} [params.new_dialog_node] - The dialog node ID. This string must conform to the following
   * restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.new_description] - The description of the dialog node. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.new_conditions] - The condition that will trigger the dialog node. This string cannot
   * contain carriage return, newline, or tab characters.
   * @param {string} [params.new_parent] - The ID of the parent dialog node. This property is omitted if the dialog node
   * has no parent.
   * @param {string} [params.new_previous_sibling] - The ID of the previous sibling dialog node. This property is
   * omitted if the dialog node has no previous sibling.
   * @param {DialogNodeOutput} [params.new_output] - The output of the dialog node. For more information about how to
   * specify dialog node output, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
   * @param {JsonObject} [params.new_context] - The context for the dialog node.
   * @param {JsonObject} [params.new_metadata] - The metadata for the dialog node.
   * @param {DialogNodeNextStep} [params.new_next_step] - The next step to execute following this dialog node.
   * @param {string} [params.new_title] - The alias used to identify the dialog node. This string must conform to the
   * following restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.new_node_type] - How the dialog node is processed.
   * @param {string} [params.new_event_name] - How an `event_handler` node is processed.
   * @param {string} [params.new_variable] - The location in the dialog context where output is stored.
   * @param {DialogNodeAction[]} [params.new_actions] - An array of objects describing any actions to be invoked by the
   * dialog node.
   * @param {string} [params.new_digress_in] - Whether this top-level dialog node can be digressed into.
   * @param {string} [params.new_digress_out] - Whether this dialog node can be returned to after a digression.
   * @param {string} [params.new_digress_out_slots] - Whether the user can digress to top-level nodes while filling out
   * slots.
   * @param {string} [params.new_user_label] - A label that can be displayed externally to describe the purpose of the
   * node to users.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateDialogNode(params: AssistantV1.UpdateDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.DialogNode>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id', 'dialog_node'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.updateDialogNode(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }

    const body = {
      'dialog_node': _params.new_dialog_node,
      'description': _params.new_description,
      'conditions': _params.new_conditions,
      'parent': _params.new_parent,
      'previous_sibling': _params.new_previous_sibling,
      'output': _params.new_output,
      'context': _params.new_context,
      'metadata': _params.new_metadata,
      'next_step': _params.new_next_step,
      'title': _params.new_title,
      'type': _params.new_node_type,
      'event_name': _params.new_event_name,
      'variable': _params.new_variable,
      'actions': _params.new_actions,
      'digress_in': _params.new_digress_in,
      'digress_out': _params.new_digress_out,
      'digress_out_slots': _params.new_digress_out_slots,
      'user_label': _params.new_user_label
    };

    const path = {
      'workspace_id': _params.workspace_id,
      'dialog_node': _params.dialog_node
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'updateDialogNode');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
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

  /*************************
   * logs
   ************************/

  /**
   * List log events in all workspaces.
   *
   * List the events from the logs of all workspaces in the service instance.
   *
   * If **cursor** is not specified, this operation is limited to 40 requests per 30 minutes. If **cursor** is
   * specified, the limit is 120 requests per minute. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.filter - A cacheable parameter that limits the results to those matching the specified
   * filter. You must specify a filter query that includes a value for `language`, as well as a value for `workspace_id`
   * or `request.context.metadata.deployment`. For more information, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-filter-reference#filter-reference).
   * @param {string} [params.sort] - How to sort the returned log events. You can sort by **request_timestamp**. To
   * reverse the sort order, prefix the parameter value with a minus sign (`-`).
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listAllLogs(params: AssistantV1.ListAllLogsParams, callback?: AssistantV1.Callback<AssistantV1.LogCollection>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['filter'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listAllLogs(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'filter': _params.filter,
      'sort': _params.sort,
      'page_limit': _params.page_limit,
      'cursor': _params.cursor
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listAllLogs');

    const parameters = {
      options: {
        url: '/v1/logs',
        method: 'GET',
        qs: query,
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
   * List log events in a workspace.
   *
   * List the events from the log of a specific workspace.
   *
   * If **cursor** is not specified, this operation is limited to 40 requests per 30 minutes. If **cursor** is
   * specified, the limit is 120 requests per minute. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} [params.sort] - How to sort the returned log events. You can sort by **request_timestamp**. To
   * reverse the sort order, prefix the parameter value with a minus sign (`-`).
   * @param {string} [params.filter] - A cacheable parameter that limits the results to those matching the specified
   * filter. For more information, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-filter-reference#filter-reference).
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listLogs(params: AssistantV1.ListLogsParams, callback?: AssistantV1.Callback<AssistantV1.LogCollection>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspace_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.listLogs(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'sort': _params.sort,
      'filter': _params.filter,
      'page_limit': _params.page_limit,
      'cursor': _params.cursor
    };

    const path = {
      'workspace_id': _params.workspace_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listLogs');

    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/logs',
        method: 'GET',
        qs: query,
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
   * security](https://cloud.ibm.com/docs/services/assistant?topic=assistant-information-security#information-security).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customer_id - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteUserData(params: AssistantV1.DeleteUserDataParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<any> | void {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['customer_id'];

    if (!_callback) {
      return new Promise((resolve, reject) => {
        this.deleteUserData(params, (err, bod, res) => {
          err ? reject(err) : _params.return_response ? resolve(res) : resolve(bod);
        });
      });
    }

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
 
    const query = {
      'customer_id': _params.customer_id
    };

    const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteUserData');

    const parameters = {
      options: {
        url: '/v1/user_data',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters, _callback);
  };

}

AssistantV1.prototype.name = 'conversation';
AssistantV1.prototype.serviceVersion = 'v1';

/*************************
 * interfaces
 ************************/

namespace AssistantV1 {

  /** Options for the `AssistantV1` constructor. */
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

  /** Parameters for the `message` operation. */
  export interface MessageParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** Intents to use when evaluating the user input. Include intents from the previous response to continue using those intents rather than trying to recognize intents in the new input. */
    intents?: RuntimeIntent[];
    /** Entities to use when evaluating the message. Include entities from the previous response to continue using those entities rather than detecting entities in the new input. */
    entities?: RuntimeEntity[];
    /** Whether to return more than one intent. A value of `true` indicates that all matching intents are returned. */
    alternate_intents?: boolean;
    /** State information for the conversation. To maintain state, include the context from the previous response. */
    context?: Context;
    /** An output object that includes the response to the user, the dialog nodes that were triggered, and messages from the log. */
    output?: OutputData;
    /** Whether to include additional diagnostic information about the dialog nodes that were visited during processing of the message. */
    nodes_visited_details?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `createWorkspace` operation. */
  export interface CreateWorkspaceParams {
    /** The name of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    name?: string;
    /** The description of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The language of the workspace. */
    language?: string;
    /** Any metadata related to the workspace. */
    metadata?: JsonObject;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training data is not to be used. */
    learning_opt_out?: boolean;
    /** Global settings for the workspace. */
    system_settings?: WorkspaceSystemSettings;
    /** An array of objects defining the intents for the workspace. */
    intents?: CreateIntent[];
    /** An array of objects describing the entities for the workspace. */
    entities?: CreateEntity[];
    /** An array of objects describing the dialog nodes in the workspace. */
    dialog_nodes?: DialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: Counterexample[];
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteWorkspace` operation. */
  export interface DeleteWorkspaceParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `getWorkspace` operation. */
  export interface GetWorkspaceParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    _export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    /** Indicates how the returned workspace data will be sorted. This parameter is valid only if **export**=`true`. Specify `sort=stable` to sort all workspace objects by unique identifier, in ascending alphabetical order. */
    sort?: GetWorkspaceConstants.Sort | string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `getWorkspace` operation. */
  export namespace GetWorkspaceConstants {
    /** Indicates how the returned workspace data will be sorted. This parameter is valid only if **export**=`true`. Specify `sort=stable` to sort all workspace objects by unique identifier, in ascending alphabetical order. */
    export enum Sort {
      STABLE = 'stable',
    }
  }

  /** Parameters for the `listWorkspaces` operation. */
  export interface ListWorkspacesParams {
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned workspaces will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    sort?: ListWorkspacesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `listWorkspaces` operation. */
  export namespace ListWorkspacesConstants {
    /** The attribute by which returned workspaces will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      NAME = 'name',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `updateWorkspace` operation. */
  export interface UpdateWorkspaceParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    name?: string;
    /** The description of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The language of the workspace. */
    language?: string;
    /** Any metadata related to the workspace. */
    metadata?: JsonObject;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training data is not to be used. */
    learning_opt_out?: boolean;
    /** Global settings for the workspace. */
    system_settings?: WorkspaceSystemSettings;
    /** An array of objects defining the intents for the workspace. */
    intents?: CreateIntent[];
    /** An array of objects describing the entities for the workspace. */
    entities?: CreateEntity[];
    /** An array of objects describing the dialog nodes in the workspace. */
    dialog_nodes?: DialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: Counterexample[];
    /** Whether the new data is to be appended to the existing data in the workspace. If **append**=`false`, elements included in the new data completely replace the corresponding existing elements, including all subelements. For example, if the new data includes **entities** and **append**=`false`, all existing entities in the workspace are discarded and replaced with the new entities. If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the new data collide with existing elements, the update request fails. */
    append?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `createIntent` operation. */
  export interface CreateIntentParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the intent. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters. - It cannot begin with the reserved prefix `sys-`. */
    intent: string;
    /** The description of the intent. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** An array of user input examples for the intent. */
    examples?: Example[];
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteIntent` operation. */
  export interface DeleteIntentParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `getIntent` operation. */
  export interface GetIntentParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    _export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listIntents` operation. */
  export interface ListIntentsParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    _export?: boolean;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned intents will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    sort?: ListIntentsConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `listIntents` operation. */
  export namespace ListIntentsConstants {
    /** The attribute by which returned intents will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      INTENT = 'intent',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `updateIntent` operation. */
  export interface UpdateIntentParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** The name of the intent. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters. - It cannot begin with the reserved prefix `sys-`. */
    new_intent?: string;
    /** The description of the intent. This string cannot contain carriage return, newline, or tab characters. */
    new_description?: string;
    /** An array of user input examples for the intent. */
    new_examples?: Example[];
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `createExample` operation. */
  export interface CreateExampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** The text of a user input example. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    text: string;
    /** An array of contextual entity mentions. */
    mentions?: Mention[];
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteExample` operation. */
  export interface DeleteExampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** The text of the user input example. */
    text: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `getExample` operation. */
  export interface GetExampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** The text of the user input example. */
    text: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listExamples` operation. */
  export interface ListExamplesParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned examples will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    sort?: ListExamplesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `listExamples` operation. */
  export namespace ListExamplesConstants {
    /** The attribute by which returned examples will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      TEXT = 'text',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `updateExample` operation. */
  export interface UpdateExampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** The text of the user input example. */
    text: string;
    /** The text of the user input example. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    new_text?: string;
    /** An array of contextual entity mentions. */
    new_mentions?: Mention[];
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `createCounterexample` operation. */
  export interface CreateCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The text of a user input marked as irrelevant input. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    text: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteCounterexample` operation. */
  export interface DeleteCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The text of a user input counterexample (for example, `What are you wearing?`). */
    text: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `getCounterexample` operation. */
  export interface GetCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The text of a user input counterexample (for example, `What are you wearing?`). */
    text: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listCounterexamples` operation. */
  export interface ListCounterexamplesParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned counterexamples will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    sort?: ListCounterexamplesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `listCounterexamples` operation. */
  export namespace ListCounterexamplesConstants {
    /** The attribute by which returned counterexamples will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      TEXT = 'text',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `updateCounterexample` operation. */
  export interface UpdateCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The text of a user input counterexample (for example, `What are you wearing?`). */
    text: string;
    /** The text of a user input marked as irrelevant input. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    new_text?: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `createEntity` operation. */
  export interface CreateEntityParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, and hyphen characters. - If you specify an entity name beginning with the reserved prefix `sys-`, it must be the name of a system entity that you want to enable. (Any entity content specified with the request is ignored.). */
    entity: string;
    /** The description of the entity. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** Any metadata related to the entity. */
    metadata?: JsonObject;
    /** Whether to use fuzzy matching for the entity. */
    fuzzy_match?: boolean;
    /** An array of objects describing the entity values. */
    values?: CreateValue[];
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteEntity` operation. */
  export interface DeleteEntityParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `getEntity` operation. */
  export interface GetEntityParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    _export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listEntities` operation. */
  export interface ListEntitiesParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    _export?: boolean;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned entities will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    sort?: ListEntitiesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `listEntities` operation. */
  export namespace ListEntitiesConstants {
    /** The attribute by which returned entities will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      ENTITY = 'entity',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `updateEntity` operation. */
  export interface UpdateEntityParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The name of the entity. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, and hyphen characters. - It cannot begin with the reserved prefix `sys-`. */
    new_entity?: string;
    /** The description of the entity. This string cannot contain carriage return, newline, or tab characters. */
    new_description?: string;
    /** Any metadata related to the entity. */
    new_metadata?: JsonObject;
    /** Whether to use fuzzy matching for the entity. */
    new_fuzzy_match?: boolean;
    /** An array of objects describing the entity values. */
    new_values?: CreateValue[];
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listMentions` operation. */
  export interface ListMentionsParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    _export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `createValue` operation. */
  export interface CreateValueParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    value: string;
    /** Any metadata related to the entity value. */
    metadata?: JsonObject;
    /** Specifies the type of entity value. */
    value_type?: CreateValueConstants.ValueType | string;
    /** An array of synonyms for the entity value. A value can specify either synonyms or patterns (depending on the value type), but not both. A synonym must conform to the following resrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    synonyms?: string[];
    /** An array of patterns for the entity value. A value can specify either synonyms or patterns (depending on the value type), but not both. A pattern is a regular expression; for more information about how to specify a pattern, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based). */
    patterns?: string[];
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `createValue` operation. */
  export namespace CreateValueConstants {
    /** Specifies the type of entity value. */
    export enum ValueType {
      SYNONYMS = 'synonyms',
      PATTERNS = 'patterns',
    }
  }

  /** Parameters for the `deleteValue` operation. */
  export interface DeleteValueParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `getValue` operation. */
  export interface GetValueParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    _export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listValues` operation. */
  export interface ListValuesParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    _export?: boolean;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned entity values will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    sort?: ListValuesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `listValues` operation. */
  export namespace ListValuesConstants {
    /** The attribute by which returned entity values will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      VALUE = 'value',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `updateValue` operation. */
  export interface UpdateValueParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the entity value. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    new_value?: string;
    /** Any metadata related to the entity value. */
    new_metadata?: JsonObject;
    /** Specifies the type of entity value. */
    new_value_type?: UpdateValueConstants.ValueType | string;
    /** An array of synonyms for the entity value. A value can specify either synonyms or patterns (depending on the value type), but not both. A synonym must conform to the following resrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    new_synonyms?: string[];
    /** An array of patterns for the entity value. A value can specify either synonyms or patterns (depending on the value type), but not both. A pattern is a regular expression; for more information about how to specify a pattern, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based). */
    new_patterns?: string[];
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `updateValue` operation. */
  export namespace UpdateValueConstants {
    /** Specifies the type of entity value. */
    export enum ValueType {
      SYNONYMS = 'synonyms',
      PATTERNS = 'patterns',
    }
  }

  /** Parameters for the `createSynonym` operation. */
  export interface CreateSynonymParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the synonym. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    synonym: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteSynonym` operation. */
  export interface DeleteSynonymParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the synonym. */
    synonym: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `getSynonym` operation. */
  export interface GetSynonymParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the synonym. */
    synonym: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listSynonyms` operation. */
  export interface ListSynonymsParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned entity value synonyms will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    sort?: ListSynonymsConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `listSynonyms` operation. */
  export namespace ListSynonymsConstants {
    /** The attribute by which returned entity value synonyms will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      SYNONYM = 'synonym',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `updateSynonym` operation. */
  export interface UpdateSynonymParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the synonym. */
    synonym: string;
    /** The text of the synonym. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    new_synonym?: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `createDialogNode` operation. */
  export interface CreateDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The dialog node ID. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. */
    dialog_node: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    conditions?: string;
    /** The ID of the parent dialog node. This property is omitted if the dialog node has no parent. */
    parent?: string;
    /** The ID of the previous sibling dialog node. This property is omitted if the dialog node has no previous sibling. */
    previous_sibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses). */
    output?: DialogNodeOutput;
    /** The context for the dialog node. */
    context?: JsonObject;
    /** The metadata for the dialog node. */
    metadata?: JsonObject;
    /** The next step to execute following this dialog node. */
    next_step?: DialogNodeNextStep;
    /** The alias used to identify the dialog node. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. */
    title?: string;
    /** How the dialog node is processed. */
    node_type?: CreateDialogNodeConstants.NodeType | string;
    /** How an `event_handler` node is processed. */
    event_name?: CreateDialogNodeConstants.EventName | string;
    /** The location in the dialog context where output is stored. */
    variable?: string;
    /** An array of objects describing any actions to be invoked by the dialog node. */
    actions?: DialogNodeAction[];
    /** Whether this top-level dialog node can be digressed into. */
    digress_in?: CreateDialogNodeConstants.DigressIn | string;
    /** Whether this dialog node can be returned to after a digression. */
    digress_out?: CreateDialogNodeConstants.DigressOut | string;
    /** Whether the user can digress to top-level nodes while filling out slots. */
    digress_out_slots?: CreateDialogNodeConstants.DigressOutSlots | string;
    /** A label that can be displayed externally to describe the purpose of the node to users. */
    user_label?: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `createDialogNode` operation. */
  export namespace CreateDialogNodeConstants {
    /** How the dialog node is processed. */
    export enum NodeType {
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
    workspace_id: string;
    /** The dialog node ID (for example, `get_order`). */
    dialog_node: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `getDialogNode` operation. */
  export interface GetDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The dialog node ID (for example, `get_order`). */
    dialog_node: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listDialogNodes` operation. */
  export interface ListDialogNodesParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned dialog nodes will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    sort?: ListDialogNodesConstants.Sort | string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `listDialogNodes` operation. */
  export namespace ListDialogNodesConstants {
    /** The attribute by which returned dialog nodes will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). */
    export enum Sort {
      DIALOG_NODE = 'dialog_node',
      UPDATED = 'updated',
    }
  }

  /** Parameters for the `updateDialogNode` operation. */
  export interface UpdateDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The dialog node ID (for example, `get_order`). */
    dialog_node: string;
    /** The dialog node ID. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. */
    new_dialog_node?: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    new_description?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    new_conditions?: string;
    /** The ID of the parent dialog node. This property is omitted if the dialog node has no parent. */
    new_parent?: string;
    /** The ID of the previous sibling dialog node. This property is omitted if the dialog node has no previous sibling. */
    new_previous_sibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses). */
    new_output?: DialogNodeOutput;
    /** The context for the dialog node. */
    new_context?: JsonObject;
    /** The metadata for the dialog node. */
    new_metadata?: JsonObject;
    /** The next step to execute following this dialog node. */
    new_next_step?: DialogNodeNextStep;
    /** The alias used to identify the dialog node. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. */
    new_title?: string;
    /** How the dialog node is processed. */
    new_node_type?: UpdateDialogNodeConstants.NodeType | string;
    /** How an `event_handler` node is processed. */
    new_event_name?: UpdateDialogNodeConstants.EventName | string;
    /** The location in the dialog context where output is stored. */
    new_variable?: string;
    /** An array of objects describing any actions to be invoked by the dialog node. */
    new_actions?: DialogNodeAction[];
    /** Whether this top-level dialog node can be digressed into. */
    new_digress_in?: UpdateDialogNodeConstants.DigressIn | string;
    /** Whether this dialog node can be returned to after a digression. */
    new_digress_out?: UpdateDialogNodeConstants.DigressOut | string;
    /** Whether the user can digress to top-level nodes while filling out slots. */
    new_digress_out_slots?: UpdateDialogNodeConstants.DigressOutSlots | string;
    /** A label that can be displayed externally to describe the purpose of the node to users. */
    new_user_label?: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Constants for the `updateDialogNode` operation. */
  export namespace UpdateDialogNodeConstants {
    /** How the dialog node is processed. */
    export enum NodeType {
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

  /** Parameters for the `listAllLogs` operation. */
  export interface ListAllLogsParams {
    /** A cacheable parameter that limits the results to those matching the specified filter. You must specify a filter query that includes a value for `language`, as well as a value for `workspace_id` or `request.context.metadata.deployment`. For more information, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-filter-reference#filter-reference). */
    filter: string;
    /** How to sort the returned log events. You can sort by **request_timestamp**. To reverse the sort order, prefix the parameter value with a minus sign (`-`). */
    sort?: string;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `listLogs` operation. */
  export interface ListLogsParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** How to sort the returned log events. You can sort by **request_timestamp**. To reverse the sort order, prefix the parameter value with a minus sign (`-`). */
    sort?: string;
    /** A cacheable parameter that limits the results to those matching the specified filter. For more information, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-filter-reference#filter-reference). */
    filter?: string;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customer_id: string;
    headers?: OutgoingHttpHeaders;
    return_response?: boolean;
  }

  /*************************
   * model interfaces
   ************************/

  /** A recognized capture group for a pattern-based entity. */
  export interface CaptureGroup {
    /** A recognized capture group for the entity. */
    group: string;
    /** Zero-based character offsets that indicate where the entity value begins and ends in the input text. */
    location?: number[];
  }

  /** State information for the conversation. To maintain state, include the context from the previous response. */
  export interface Context {
    /** The unique identifier of the conversation. */
    conversation_id?: string;
    /** For internal use only. */
    system?: SystemResponse;
    /** Metadata related to the message. */
    metadata?: MessageContextMetadata;
    /** Context accepts additional properties. */
    [propName: string]: any;
  }

  /** Counterexample. */
  export interface Counterexample {
    /** The text of a user input marked as irrelevant input. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    text: string;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }

  /** CounterexampleCollection. */
  export interface CounterexampleCollection {
    /** An array of objects describing the examples marked as irrelevant input. */
    counterexamples: Counterexample[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** CreateEntity. */
  export interface CreateEntity {
    /** The name of the entity. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, and hyphen characters. - If you specify an entity name beginning with the reserved prefix `sys-`, it must be the name of a system entity that you want to enable. (Any entity content specified with the request is ignored.). */
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

  /** CreateIntent. */
  export interface CreateIntent {
    /** The name of the intent. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters. - It cannot begin with the reserved prefix `sys-`. */
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

  /** CreateValue. */
  export interface CreateValue {
    /** The text of the entity value. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    value: string;
    /** Any metadata related to the entity value. */
    metadata?: JsonObject;
    /** Specifies the type of entity value. */
    value_type?: string;
    /** An array of synonyms for the entity value. A value can specify either synonyms or patterns (depending on the value type), but not both. A synonym must conform to the following resrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    synonyms?: string[];
    /** An array of patterns for the entity value. A value can specify either synonyms or patterns (depending on the value type), but not both. A pattern is a regular expression; for more information about how to specify a pattern, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based). */
    patterns?: string[];
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }

  /** DialogNode. */
  export interface DialogNode {
    /** The dialog node ID. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. */
    dialog_node: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    conditions?: string;
    /** The ID of the parent dialog node. This property is omitted if the dialog node has no parent. */
    parent?: string;
    /** The ID of the previous sibling dialog node. This property is omitted if the dialog node has no previous sibling. */
    previous_sibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses). */
    output?: DialogNodeOutput;
    /** The context for the dialog node. */
    context?: JsonObject;
    /** The metadata for the dialog node. */
    metadata?: JsonObject;
    /** The next step to execute following this dialog node. */
    next_step?: DialogNodeNextStep;
    /** The alias used to identify the dialog node. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. */
    title?: string;
    /** How the dialog node is processed. */
    node_type?: string;
    /** How an `event_handler` node is processed. */
    event_name?: string;
    /** The location in the dialog context where output is stored. */
    variable?: string;
    /** An array of objects describing any actions to be invoked by the dialog node. */
    actions?: DialogNodeAction[];
    /** Whether this top-level dialog node can be digressed into. */
    digress_in?: string;
    /** Whether this dialog node can be returned to after a digression. */
    digress_out?: string;
    /** Whether the user can digress to top-level nodes while filling out slots. */
    digress_out_slots?: string;
    /** A label that can be displayed externally to describe the purpose of the node to users. */
    user_label?: string;
    /** For internal use only. */
    disabled?: boolean;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
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

  /** An array of dialog nodes. */
  export interface DialogNodeCollection {
    /** An array of objects describing the dialog nodes defined for the workspace. */
    dialog_nodes: DialogNode[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** The next step to execute following this dialog node. */
  export interface DialogNodeNextStep {
    /** What happens after the dialog node completes. The valid values depend on the node type: - The following values are valid for any node: - `get_user_input` - `skip_user_input` - `jump_to` - If the node is of type `event_handler` and its parent node is of type `slot` or `frame`, additional values are also valid: - if **event_name**=`filled` and the type of the parent node is `slot`: - `reprompt` - `skip_all_slots` - if **event_name**=`nomatch` and the type of the parent node is `slot`: - `reprompt` - `skip_slot` - `skip_all_slots` - if **event_name**=`generic` and the type of the parent node is `frame`: - `reprompt` - `skip_slot` - `skip_all_slots` If you specify `jump_to`, then you must also specify a value for the `dialog_node` property. */
    behavior: string;
    /** The ID of the dialog node to process next. This parameter is required if **behavior**=`jump_to`. */
    dialog_node?: string;
    /** Which part of the dialog node to process next. */
    selector?: string;
  }

  /** The output of the dialog node. For more information about how to specify dialog node output, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses). */
  export interface DialogNodeOutput {
    /** An array of objects describing the output defined for the dialog node. */
    generic?: DialogNodeOutputGeneric[];
    /** Options that modify how specified output is handled. */
    modifiers?: DialogNodeOutputModifiers;
    /** DialogNodeOutput accepts additional properties. */
    [propName: string]: any;
  }

  /** DialogNodeOutputGeneric. */
  export interface DialogNodeOutputGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the client application or channel. */
    response_type: string;
    /** A list of one or more objects defining text responses. Required when **response_type**=`text`. */
    values?: DialogNodeOutputTextValuesElement[];
    /** How a response is selected from the list, if more than one response is specified. Valid only when **response_type**=`text`. */
    selection_policy?: string;
    /** The delimiter to use as a separator between responses when `selection_policy`=`multiline`. */
    delimiter?: string;
    /** How long to pause, in milliseconds. The valid values are from 0 to 10000. Valid only when **response_type**=`pause`. */
    time?: number;
    /** Whether to send a "user is typing" event during the pause. Ignored if the channel does not support this event. Valid only when **response_type**=`pause`. */
    typing?: boolean;
    /** The URL of the image. Required when **response_type**=`image`. */
    source?: string;
    /** An optional title to show before the response. Valid only when **response_type**=`image` or `option`. */
    title?: string;
    /** An optional description to show with the response. Valid only when **response_type**=`image` or `option`. */
    description?: string;
    /** The preferred type of control to display, if supported by the channel. Valid only when **response_type**=`option`. */
    preference?: string;
    /** An array of objects describing the options from which the user can choose. You can include up to 20 options. Required when **response_type**=`option`. */
    options?: DialogNodeOutputOptionsElement[];
    /** An optional message to be sent to the human agent who will be taking over the conversation. Valid only when **reponse_type**=`connect_to_agent`. */
    message_to_human_agent?: string;
  }

  /** Options that modify how specified output is handled. */
  export interface DialogNodeOutputModifiers {
    /** Whether values in the output will overwrite output values in an array specified by previously executed dialog nodes. If this option is set to `false`, new values will be appended to previously specified values. */
    overwrite?: boolean;
  }

  /** DialogNodeOutputOptionsElement. */
  export interface DialogNodeOutputOptionsElement {
    /** The user-facing label for the option. */
    label: string;
    /** An object defining the message input to be sent to the Watson Assistant service if the user selects the corresponding option. */
    value: DialogNodeOutputOptionsElementValue;
  }

  /** An object defining the message input to be sent to the Watson Assistant service if the user selects the corresponding option. */
  export interface DialogNodeOutputOptionsElementValue {
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** An array of intents to be used while processing the input. **Note:** This property is supported for backward compatibility with applications that use the v1 **Get response to user input** method. */
    intents?: RuntimeIntent[];
    /** An array of entities to be used while processing the user input. **Note:** This property is supported for backward compatibility with applications that use the v1 **Get response to user input** method. */
    entities?: RuntimeEntity[];
  }

  /** DialogNodeOutputTextValuesElement. */
  export interface DialogNodeOutputTextValuesElement {
    /** The text of a response. This string can include newline characters (`\\n`), Markdown tagging, or other special characters, if supported by the channel. */
    text?: string;
  }

  /** DialogNodeVisitedDetails. */
  export interface DialogNodeVisitedDetails {
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
    /** The ID of the dialog node that the **topic** property is taken from. The **topic** property is populated using the value of the dialog node's **user_label** property. */
    dialog_node?: string;
    /** An array of objects describing the possible matching dialog nodes from which the user can choose. **Note:** The **suggestions** property is part of the disambiguation feature, which is only available for Premium users. */
    suggestions?: DialogSuggestion[];
  }

  /** DialogSuggestion. */
  export interface DialogSuggestion {
    /** The user-facing label for the disambiguation option. This label is taken from the **user_label** property of the corresponding dialog node. */
    label: string;
    /** An object defining the message input, intents, and entities to be sent to the Watson Assistant service if the user selects the corresponding disambiguation option. */
    value: DialogSuggestionValue;
    /** The dialog output that will be returned from the Watson Assistant service if the user selects the corresponding option. */
    output?: JsonObject;
    /** The ID of the dialog node that the **label** property is taken from. The **label** property is populated using the value of the dialog node's **user_label** property. */
    dialog_node?: string;
  }

  /** An object defining the message input, intents, and entities to be sent to the Watson Assistant service if the user selects the corresponding disambiguation option. */
  export interface DialogSuggestionValue {
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** An array of intents to be sent along with the user input. */
    intents?: RuntimeIntent[];
    /** An array of entities to be sent along with the user input. */
    entities?: RuntimeEntity[];
  }

  /** Entity. */
  export interface Entity {
    /** The name of the entity. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, and hyphen characters. - If you specify an entity name beginning with the reserved prefix `sys-`, it must be the name of a system entity that you want to enable. (Any entity content specified with the request is ignored.). */
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

  /** An array of objects describing the entities for the workspace. */
  export interface EntityCollection {
    /** An array of objects describing the entities defined for the workspace. */
    entities: Entity[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** An object describing a contextual entity mention. */
  export interface EntityMention {
    /** The text of the user input example. */
    text: string;
    /** The name of the intent. */
    intent: string;
    /** An array of zero-based character offsets that indicate where the entity mentions begin and end in the input text. */
    location: number[];
  }

  /** EntityMentionCollection. */
  export interface EntityMentionCollection {
    /** An array of objects describing the entity mentions defined for an entity. */
    examples: EntityMention[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** Example. */
  export interface Example {
    /** The text of a user input example. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    text: string;
    /** An array of contextual entity mentions. */
    mentions?: Mention[];
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }

  /** ExampleCollection. */
  export interface ExampleCollection {
    /** An array of objects describing the examples defined for the intent. */
    examples: Example[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** Intent. */
  export interface Intent {
    /** The name of the intent. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters. - It cannot begin with the reserved prefix `sys-`. */
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

  /** IntentCollection. */
  export interface IntentCollection {
    /** An array of objects describing the intents defined for the workspace. */
    intents: Intent[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** Log. */
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

  /** LogCollection. */
  export interface LogCollection {
    /** An array of objects describing log events. */
    logs: Log[];
    /** The pagination data for the returned objects. */
    pagination: LogPagination;
  }

  /** Log message details. */
  export interface LogMessage {
    /** The severity of the log message. */
    level: string;
    /** The text of the log message. */
    msg: string;
    /** LogMessage accepts additional properties. */
    [propName: string]: any;
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

  /** A mention of a contextual entity. */
  export interface Mention {
    /** The name of the entity. */
    entity: string;
    /** An array of zero-based character offsets that indicate where the entity mentions begin and end in the input text. */
    location: number[];
  }

  /** Metadata related to the message. */
  export interface MessageContextMetadata {
    /** A label identifying the deployment environment, used for filtering log data. This string cannot contain carriage return, newline, or tab characters. */
    deployment?: string;
    /** A string value that identifies the user who is interacting with the workspace. The client must provide a unique identifier for each individual end user who accesses the application. For Plus and Premium plans, this user ID is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or tab characters. */
    user_id?: string;
  }

  /** An input object that includes the input text. */
  export interface MessageInput {
    /** The text of the user input. This string cannot contain carriage return, newline, or tab characters. */
    text?: string;
    /** MessageInput accepts additional properties. */
    [propName: string]: any;
  }

  /** A request sent to the workspace, including the user input and context. */
  export interface MessageRequest {
    /** An input object that includes the input text. */
    input?: MessageInput;
    /** Intents to use when evaluating the user input. Include intents from the previous response to continue using those intents rather than trying to recognize intents in the new input. */
    intents?: RuntimeIntent[];
    /** Entities to use when evaluating the message. Include entities from the previous response to continue using those entities rather than detecting entities in the new input. */
    entities?: RuntimeEntity[];
    /** Whether to return more than one intent. A value of `true` indicates that all matching intents are returned. */
    alternate_intents?: boolean;
    /** State information for the conversation. To maintain state, include the context from the previous response. */
    context?: Context;
    /** An output object that includes the response to the user, the dialog nodes that were triggered, and messages from the log. */
    output?: OutputData;
    /** An array of objects describing any actions requested by the dialog node. */
    actions?: DialogNodeAction[];
  }

  /** The response sent by the workspace, including the output text, detected intents and entities, and context. */
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
    /** An output object that includes the response to the user, the dialog nodes that were triggered, and messages from the log. */
    output: OutputData;
    /** An array of objects describing any actions requested by the dialog node. */
    actions?: DialogNodeAction[];
  }

  /** An output object that includes the response to the user, the dialog nodes that were triggered, and messages from the log. */
  export interface OutputData {
    /** An array of up to 50 messages logged with the request. */
    log_messages: LogMessage[];
    /** An array of responses to the user. */
    text: string[];
    /** Output intended for any channel. It is the responsibility of the client application to implement the supported response types. */
    generic?: DialogRuntimeResponseGeneric[];
    /** An array of the nodes that were triggered to create the response, in the order in which they were visited. This information is useful for debugging and for tracing the path taken through the node tree. */
    nodes_visited?: string[];
    /** An array of objects containing detailed diagnostic information about the nodes that were triggered during processing of the input message. Included only if **nodes_visited_details** is set to `true` in the message request. */
    nodes_visited_details?: DialogNodeVisitedDetails[];
    /** OutputData accepts additional properties. */
    [propName: string]: any;
  }

  /** The pagination data for the returned objects. */
  export interface Pagination {
    /** The URL that will return the same page of results. */
    refresh_url: string;
    /** The URL that will return the next page of results. */
    next_url?: string;
    /** Reserved for future use. */
    total?: number;
    /** Reserved for future use. */
    matched?: number;
    /** A token identifying the current page of results. */
    refresh_cursor?: string;
    /** A token identifying the next page of results. */
    next_cursor?: string;
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
    /** RuntimeEntity accepts additional properties. */
    [propName: string]: any;
  }

  /** An intent identified in the user input. */
  export interface RuntimeIntent {
    /** The name of the recognized intent. */
    intent: string;
    /** A decimal percentage that represents Watson's confidence in the intent. */
    confidence: number;
    /** RuntimeIntent accepts additional properties. */
    [propName: string]: any;
  }

  /** Synonym. */
  export interface Synonym {
    /** The text of the synonym. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    synonym: string;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }

  /** SynonymCollection. */
  export interface SynonymCollection {
    /** An array of synonyms. */
    synonyms: Synonym[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** For internal use only. */
  export interface SystemResponse {
    /** SystemResponse accepts additional properties. */
    [propName: string]: any;
  }

  /** Value. */
  export interface Value {
    /** The text of the entity value. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    value: string;
    /** Any metadata related to the entity value. */
    metadata?: JsonObject;
    /** Specifies the type of entity value. */
    value_type: string;
    /** An array of synonyms for the entity value. A value can specify either synonyms or patterns (depending on the value type), but not both. A synonym must conform to the following resrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. */
    synonyms?: string[];
    /** An array of patterns for the entity value. A value can specify either synonyms or patterns (depending on the value type), but not both. A pattern is a regular expression; for more information about how to specify a pattern, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based). */
    patterns?: string[];
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }

  /** ValueCollection. */
  export interface ValueCollection {
    /** An array of entity values. */
    values: Value[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** Workspace. */
  export interface Workspace {
    /** The name of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    name: string;
    /** The description of the workspace. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The language of the workspace. */
    language: string;
    /** Any metadata related to the workspace. */
    metadata?: JsonObject;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training data is not to be used. */
    learning_opt_out: boolean;
    /** Global settings for the workspace. */
    system_settings?: WorkspaceSystemSettings;
    /** The workspace ID of the workspace. */
    workspace_id: string;
    /** The current status of the workspace. */
    status?: string;
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
    /** An array of intents. */
    intents?: Intent[];
    /** An array of objects describing the entities for the workspace. */
    entities?: Entity[];
    /** An array of objects describing the dialog nodes in the workspace. */
    dialog_nodes?: DialogNode[];
    /** An array of counterexamples. */
    counterexamples?: Counterexample[];
  }

  /** WorkspaceCollection. */
  export interface WorkspaceCollection {
    /** An array of objects describing the workspaces associated with the service instance. */
    workspaces: Workspace[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** Global settings for the workspace. */
  export interface WorkspaceSystemSettings {
    /** Workspace settings related to the Watson Assistant user interface. */
    tooling?: WorkspaceSystemSettingsTooling;
    /** Workspace settings related to the disambiguation feature. **Note:** This feature is available only to Premium users. */
    disambiguation?: WorkspaceSystemSettingsDisambiguation;
    /** For internal use only. */
    human_agent_assist?: JsonObject;
  }

  /** Workspace settings related to the disambiguation feature. **Note:** This feature is available only to Premium users. */
  export interface WorkspaceSystemSettingsDisambiguation {
    /** The text of the introductory prompt that accompanies disambiguation options presented to the user. */
    prompt?: string;
    /** The user-facing label for the option users can select if none of the suggested options is correct. If no value is specified for this property, this option does not appear. */
    none_of_the_above_prompt?: string;
    /** Whether the disambiguation feature is enabled for the workspace. */
    enabled?: boolean;
    /** The sensitivity of the disambiguation feature to intent detection conflicts. Set to **high** if you want the disambiguation feature to be triggered more often. This can be useful for testing or demonstration purposes. */
    sensitivity?: string;
  }

  /** Workspace settings related to the Watson Assistant user interface. */
  export interface WorkspaceSystemSettingsTooling {
    /** Whether the dialog JSON editor displays text responses within the `output.generic` object. */
    store_generic_responses?: boolean;
  }

}

export = AssistantV1;
