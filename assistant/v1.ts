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
 * The Assistant v1 API provides authoring methods your application can use to create or update a workspace.
 */

class AssistantV1 extends BaseService {

  static URL: string = 'https://gateway.watsonplatform.net/assistant/api';
  name: string; // set by prototype to 'conversation'
  serviceVersion: string; // set by prototype to 'v1'

  /**
   * Construct a AssistantV1 object.
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
   * @returns {AssistantV1}
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
   * message
   ************************/

  /**
   * Get response to user input.
   *
   * Send user input to a workspace and receive a response.
   *
   * **Important:** This method has been superseded by the new v2 runtime API. The v2 API offers significant advantages,
   * including ease of deployment, automatic state management, versioning, and search capabilities. For more
   * information, see the [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-api-overview).
   *
   * There is no rate limit for this operation.
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
   * @param {boolean} [params.nodesVisitedDetails] - Whether to include additional diagnostic information about the
   * dialog nodes that were visited during processing of the message.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public message(params: AssistantV1.MessageParams, callback?: AssistantV1.Callback<AssistantV1.MessageResponse>): Promise<AssistantV1.Response<AssistantV1.MessageResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId'];

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
        'intents': _params.intents,
        'entities': _params.entities,
        'alternate_intents': _params.alternateIntents,
        'context': _params.context,
        'output': _params.output
      };

      const query = {
        'nodes_visited_details': _params.nodesVisitedDetails
      };

      const path = {
        'workspace_id': _params.workspaceId
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
   * workspaces
   ************************/

  /**
   * List workspaces.
   *
   * List the workspaces associated with a Watson Assistant service instance.
   *
   * This operation is limited to 500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.sort] - The attribute by which returned workspaces will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listWorkspaces(params?: AssistantV1.ListWorkspacesParams, callback?: AssistantV1.Callback<AssistantV1.WorkspaceCollection>): Promise<AssistantV1.Response<AssistantV1.WorkspaceCollection>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {

      const query = {
        'page_limit': _params.pageLimit,
        'sort': _params.sort,
        'cursor': _params.cursor,
        'include_audit': _params.includeAudit
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listWorkspaces');

      const parameters = {
        options: {
          url: '/v1/workspaces',
          method: 'GET',
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
   * @param {boolean} [params.learningOptOut] - Whether training data from the workspace (including artifacts such as
   * intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training
   * data is not to be used.
   * @param {WorkspaceSystemSettings} [params.systemSettings] - Global settings for the workspace.
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects describing the entities for the workspace.
   * @param {DialogNode[]} [params.dialogNodes] - An array of objects describing the dialog nodes in the workspace.
   * @param {Counterexample[]} [params.counterexamples] - An array of objects defining input examples that have been
   * marked as irrelevant input.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createWorkspace(params?: AssistantV1.CreateWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Workspace>): Promise<AssistantV1.Response<AssistantV1.Workspace>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {

      const body = {
        'name': _params.name,
        'description': _params.description,
        'language': _params.language,
        'metadata': _params.metadata,
        'learning_opt_out': _params.learningOptOut,
        'system_settings': _params.systemSettings,
        'intents': _params.intents,
        'entities': _params.entities,
        'dialog_nodes': _params.dialogNodes,
        'counterexamples': _params.counterexamples
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createWorkspace');

      const parameters = {
        options: {
          url: '/v1/workspaces',
          method: 'POST',
          body,
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
   * Get information about a workspace.
   *
   * Get information about a workspace, optionally including all workspace content.
   *
   * With **export**=`false`, this operation is limited to 6000 requests per 5 minutes. With **export**=`true`, the
   * limit is 20 requests per 30 minutes. For more information, see **Rate limiting**.
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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getWorkspace(params: AssistantV1.GetWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Workspace>): Promise<AssistantV1.Response<AssistantV1.Workspace>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId'];

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
        'export': _params._export,
        'include_audit': _params.includeAudit,
        'sort': _params.sort
      };

      const path = {
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'getWorkspace');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}',
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

  /**
   * Update workspace.
   *
   * Update an existing workspace with new or modified data. You must provide component objects defining the content of
   * the updated workspace.
   *
   * This operation is limited to 30 request per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} [params.name] - The name of the workspace. This string cannot contain carriage return, newline, or
   * tab characters.
   * @param {string} [params.description] - The description of the workspace. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.language] - The language of the workspace.
   * @param {JsonObject} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learningOptOut] - Whether training data from the workspace (including artifacts such as
   * intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training
   * data is not to be used.
   * @param {WorkspaceSystemSettings} [params.systemSettings] - Global settings for the workspace.
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects describing the entities for the workspace.
   * @param {DialogNode[]} [params.dialogNodes] - An array of objects describing the dialog nodes in the workspace.
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
  public updateWorkspace(params: AssistantV1.UpdateWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Workspace>): Promise<AssistantV1.Response<AssistantV1.Workspace>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId'];

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
        'name': _params.name,
        'description': _params.description,
        'language': _params.language,
        'metadata': _params.metadata,
        'learning_opt_out': _params.learningOptOut,
        'system_settings': _params.systemSettings,
        'intents': _params.intents,
        'entities': _params.entities,
        'dialog_nodes': _params.dialogNodes,
        'counterexamples': _params.counterexamples
      };

      const query = {
        'append': _params.append
      };

      const path = {
        'workspace_id': _params.workspaceId
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
   * Delete workspace.
   *
   * Delete a workspace from the service instance.
   *
   * This operation is limited to 30 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteWorkspace(params: AssistantV1.DeleteWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<AssistantV1.Response<AssistantV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId'];

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
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteWorkspace');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}',
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
   * intents
   ************************/

  /**
   * List intents.
   *
   * List the intents for a workspace.
   *
   * With **export**=`false`, this operation is limited to 2000 requests per 30 minutes. With **export**=`true`, the
   * limit is 400 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.sort] - The attribute by which returned intents will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listIntents(params: AssistantV1.ListIntentsParams, callback?: AssistantV1.Callback<AssistantV1.IntentCollection>): Promise<AssistantV1.Response<AssistantV1.IntentCollection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId'];

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
        'export': _params._export,
        'page_limit': _params.pageLimit,
        'sort': _params.sort,
        'cursor': _params.cursor,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listIntents');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/intents',
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
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
  public createIntent(params: AssistantV1.CreateIntentParams, callback?: AssistantV1.Callback<AssistantV1.Intent>): Promise<AssistantV1.Response<AssistantV1.Intent>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'intent'];

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
        'intent': _params.intent,
        'description': _params.description,
        'examples': _params.examples
      };

      const path = {
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createIntent');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/intents',
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
   * Get intent.
   *
   * Get information about an intent, optionally including all intent content.
   *
   * With **export**=`false`, this operation is limited to 6000 requests per 5 minutes. With **export**=`true`, the
   * limit is 400 requests per 30 minutes. For more information, see **Rate limiting**.
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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getIntent(params: AssistantV1.GetIntentParams, callback?: AssistantV1.Callback<AssistantV1.Intent>): Promise<AssistantV1.Response<AssistantV1.Intent>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'intent'];

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
        'export': _params._export,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} [params.newIntent] - The name of the intent. This string must conform to the following
   * restrictions:
   * - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * @param {string} [params.newDescription] - The description of the intent. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {Example[]} [params.newExamples] - An array of user input examples for the intent.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateIntent(params: AssistantV1.UpdateIntentParams, callback?: AssistantV1.Callback<AssistantV1.Intent>): Promise<AssistantV1.Response<AssistantV1.Intent>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'intent'];

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
        'intent': _params.newIntent,
        'description': _params.newDescription,
        'examples': _params.newExamples
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * Delete intent.
   *
   * Delete an intent from a workspace.
   *
   * This operation is limited to 2000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteIntent(params: AssistantV1.DeleteIntentParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<AssistantV1.Response<AssistantV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'intent'];

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
        'workspace_id': _params.workspaceId,
        'intent': _params.intent
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteIntent');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/intents/{intent}',
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
   * examples
   ************************/

  /**
   * List user input examples.
   *
   * List the user input examples for an intent, optionally including contextual entity mentions.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.sort] - The attribute by which returned examples will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listExamples(params: AssistantV1.ListExamplesParams, callback?: AssistantV1.Callback<AssistantV1.ExampleCollection>): Promise<AssistantV1.Response<AssistantV1.ExampleCollection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'intent'];

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
        'page_limit': _params.pageLimit,
        'sort': _params.sort,
        'cursor': _params.cursor,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
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
  public createExample(params: AssistantV1.CreateExampleParams, callback?: AssistantV1.Callback<AssistantV1.Example>): Promise<AssistantV1.Response<AssistantV1.Example>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'intent', 'text'];

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
        'text': _params.text,
        'mentions': _params.mentions
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * Get user input example.
   *
   * Get information about a user input example.
   *
   * This operation is limited to 6000 requests per 5 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of the user input example.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getExample(params: AssistantV1.GetExampleParams, callback?: AssistantV1.Callback<AssistantV1.Example>): Promise<AssistantV1.Response<AssistantV1.Example>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'intent', 'text'];

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
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of the user input example.
   * @param {string} [params.newText] - The text of the user input example. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {Mention[]} [params.newMentions] - An array of contextual entity mentions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateExample(params: AssistantV1.UpdateExampleParams, callback?: AssistantV1.Callback<AssistantV1.Example>): Promise<AssistantV1.Response<AssistantV1.Example>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'intent', 'text'];

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
        'text': _params.newText,
        'mentions': _params.newMentions
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * Delete user input example.
   *
   * Delete a user input example from an intent.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of the user input example.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteExample(params: AssistantV1.DeleteExampleParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<AssistantV1.Response<AssistantV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'intent', 'text'];

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
        'workspace_id': _params.workspaceId,
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
   * counterexamples
   ************************/

  /**
   * List counterexamples.
   *
   * List the counterexamples for a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.sort] - The attribute by which returned counterexamples will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listCounterexamples(params: AssistantV1.ListCounterexamplesParams, callback?: AssistantV1.Callback<AssistantV1.CounterexampleCollection>): Promise<AssistantV1.Response<AssistantV1.CounterexampleCollection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId'];

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
        'page_limit': _params.pageLimit,
        'sort': _params.sort,
        'cursor': _params.cursor,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listCounterexamples');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/counterexamples',
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input marked as irrelevant input. This string must conform to the
   * following restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createCounterexample(params: AssistantV1.CreateCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Counterexample>): Promise<AssistantV1.Response<AssistantV1.Counterexample>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'text'];

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
        'text': _params.text
      };

      const path = {
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createCounterexample');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/counterexamples',
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
   * Get counterexample.
   *
   * Get information about a counterexample. Counterexamples are examples that have been marked as irrelevant input.
   *
   * This operation is limited to 6000 requests per 5 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getCounterexample(params: AssistantV1.GetCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Counterexample>): Promise<AssistantV1.Response<AssistantV1.Counterexample>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'text'];

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
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {string} [params.newText] - The text of a user input marked as irrelevant input. This string must conform to
   * the following restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateCounterexample(params: AssistantV1.UpdateCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Counterexample>): Promise<AssistantV1.Response<AssistantV1.Counterexample>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'text'];

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
        'text': _params.newText
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * Delete counterexample.
   *
   * Delete a counterexample from a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteCounterexample(params: AssistantV1.DeleteCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<AssistantV1.Response<AssistantV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'text'];

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
        'workspace_id': _params.workspaceId,
        'text': _params.text
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteCounterexample');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
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
   * entities
   ************************/

  /**
   * List entities.
   *
   * List the entities for a workspace.
   *
   * With **export**=`false`, this operation is limited to 1000 requests per 30 minutes. With **export**=`true`, the
   * limit is 200 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.sort] - The attribute by which returned entities will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listEntities(params: AssistantV1.ListEntitiesParams, callback?: AssistantV1.Callback<AssistantV1.EntityCollection>): Promise<AssistantV1.Response<AssistantV1.EntityCollection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId'];

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
        'export': _params._export,
        'page_limit': _params.pageLimit,
        'sort': _params.sort,
        'cursor': _params.cursor,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listEntities');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/entities',
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
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createEntity(params: AssistantV1.CreateEntityParams, callback?: AssistantV1.Callback<AssistantV1.Entity>): Promise<AssistantV1.Response<AssistantV1.Entity>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity'];

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
        'entity': _params.entity,
        'description': _params.description,
        'metadata': _params.metadata,
        'fuzzy_match': _params.fuzzyMatch,
        'values': _params.values
      };

      const path = {
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createEntity');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/entities',
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
   * Get entity.
   *
   * Get information about an entity, optionally including all entity content.
   *
   * With **export**=`false`, this operation is limited to 6000 requests per 5 minutes. With **export**=`true`, the
   * limit is 200 requests per 30 minutes. For more information, see **Rate limiting**.
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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getEntity(params: AssistantV1.GetEntityParams, callback?: AssistantV1.Callback<AssistantV1.Entity>): Promise<AssistantV1.Response<AssistantV1.Entity>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity'];

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
        'export': _params._export,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateEntity(params: AssistantV1.UpdateEntityParams, callback?: AssistantV1.Callback<AssistantV1.Entity>): Promise<AssistantV1.Response<AssistantV1.Entity>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity'];

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
        'entity': _params.newEntity,
        'description': _params.newDescription,
        'metadata': _params.newMetadata,
        'fuzzy_match': _params.newFuzzyMatch,
        'values': _params.newValues
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * Delete entity.
   *
   * Delete an entity from a workspace, or disable a system entity.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteEntity(params: AssistantV1.DeleteEntityParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<AssistantV1.Response<AssistantV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity'];

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
        'workspace_id': _params.workspaceId,
        'entity': _params.entity
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteEntity');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/entities/{entity}',
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listMentions(params: AssistantV1.ListMentionsParams, callback?: AssistantV1.Callback<AssistantV1.EntityMentionCollection>): Promise<AssistantV1.Response<AssistantV1.EntityMentionCollection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity'];

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
        'export': _params._export,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * values
   ************************/

  /**
   * List entity values.
   *
   * List the values for an entity.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {boolean} [params._export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.sort] - The attribute by which returned entity values will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listValues(params: AssistantV1.ListValuesParams, callback?: AssistantV1.Callback<AssistantV1.ValueCollection>): Promise<AssistantV1.Response<AssistantV1.ValueCollection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity'];

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
        'export': _params._export,
        'page_limit': _params.pageLimit,
        'sort': _params.sort,
        'cursor': _params.cursor,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createValue(params: AssistantV1.CreateValueParams, callback?: AssistantV1.Callback<AssistantV1.Value>): Promise<AssistantV1.Response<AssistantV1.Value>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity', 'value'];

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
        'value': _params.value,
        'metadata': _params.metadata,
        'type': _params.type,
        'synonyms': _params.synonyms,
        'patterns': _params.patterns
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * Get entity value.
   *
   * Get information about an entity value.
   *
   * This operation is limited to 6000 requests per 5 minutes. For more information, see **Rate limiting**.
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
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getValue(params: AssistantV1.GetValueParams, callback?: AssistantV1.Callback<AssistantV1.Value>): Promise<AssistantV1.Response<AssistantV1.Value>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity', 'value'];

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
        'export': _params._export,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateValue(params: AssistantV1.UpdateValueParams, callback?: AssistantV1.Callback<AssistantV1.Value>): Promise<AssistantV1.Response<AssistantV1.Value>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity', 'value'];

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
        'value': _params.newValue,
        'metadata': _params.newMetadata,
        'type': _params.newType,
        'synonyms': _params.newSynonyms,
        'patterns': _params.newPatterns
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * Delete entity value.
   *
   * Delete a value from an entity.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteValue(params: AssistantV1.DeleteValueParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<AssistantV1.Response<AssistantV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity', 'value'];

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
        'workspace_id': _params.workspaceId,
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
   * synonyms
   ************************/

  /**
   * List entity value synonyms.
   *
   * List the synonyms for an entity value.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.sort] - The attribute by which returned entity value synonyms will be sorted. To reverse
   * the sort order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listSynonyms(params: AssistantV1.ListSynonymsParams, callback?: AssistantV1.Callback<AssistantV1.SynonymCollection>): Promise<AssistantV1.Response<AssistantV1.SynonymCollection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity', 'value'];

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
        'page_limit': _params.pageLimit,
        'sort': _params.sort,
        'cursor': _params.cursor,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym. This string must conform to the following restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createSynonym(params: AssistantV1.CreateSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Synonym>): Promise<AssistantV1.Response<AssistantV1.Synonym>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

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
        'synonym': _params.synonym
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * Get entity value synonym.
   *
   * Get information about a synonym of an entity value.
   *
   * This operation is limited to 6000 requests per 5 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getSynonym(params: AssistantV1.GetSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Synonym>): Promise<AssistantV1.Response<AssistantV1.Synonym>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

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
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {string} [params.newSynonym] - The text of the synonym. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateSynonym(params: AssistantV1.UpdateSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Synonym>): Promise<AssistantV1.Response<AssistantV1.Synonym>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

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
        'synonym': _params.newSynonym
      };

      const path = {
        'workspace_id': _params.workspaceId,
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
   * Delete entity value synonym.
   *
   * Delete a synonym from an entity value.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteSynonym(params: AssistantV1.DeleteSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<AssistantV1.Response<AssistantV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'entity', 'value', 'synonym'];

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
        'workspace_id': _params.workspaceId,
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
   * dialogNodes
   ************************/

  /**
   * List dialog nodes.
   *
   * List the dialog nodes for a workspace.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.sort] - The attribute by which returned dialog nodes will be sorted. To reverse the sort
   * order, prefix the value with a minus sign (`-`).
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listDialogNodes(params: AssistantV1.ListDialogNodesParams, callback?: AssistantV1.Callback<AssistantV1.DialogNodeCollection>): Promise<AssistantV1.Response<AssistantV1.DialogNodeCollection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId'];

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
        'page_limit': _params.pageLimit,
        'sort': _params.sort,
        'cursor': _params.cursor,
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listDialogNodes');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/dialog_nodes',
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.dialogNode - The dialog node ID. This string must conform to the following restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.description] - The description of the dialog node. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.conditions] - The condition that will trigger the dialog node. This string cannot contain
   * carriage return, newline, or tab characters.
   * @param {string} [params.parent] - The ID of the parent dialog node. This property is omitted if the dialog node has
   * no parent.
   * @param {string} [params.previousSibling] - The ID of the previous sibling dialog node. This property is omitted if
   * the dialog node has no previous sibling.
   * @param {DialogNodeOutput} [params.output] - The output of the dialog node. For more information about how to
   * specify dialog node output, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
   * @param {JsonObject} [params.context] - The context for the dialog node.
   * @param {JsonObject} [params.metadata] - The metadata for the dialog node.
   * @param {DialogNodeNextStep} [params.nextStep] - The next step to execute following this dialog node.
   * @param {string} [params.title] - The alias used to identify the dialog node. This string must conform to the
   * following restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.type] - How the dialog node is processed.
   * @param {string} [params.eventName] - How an `event_handler` node is processed.
   * @param {string} [params.variable] - The location in the dialog context where output is stored.
   * @param {DialogNodeAction[]} [params.actions] - An array of objects describing any actions to be invoked by the
   * dialog node.
   * @param {string} [params.digressIn] - Whether this top-level dialog node can be digressed into.
   * @param {string} [params.digressOut] - Whether this dialog node can be returned to after a digression.
   * @param {string} [params.digressOutSlots] - Whether the user can digress to top-level nodes while filling out slots.
   * @param {string} [params.userLabel] - A label that can be displayed externally to describe the purpose of the node
   * to users.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public createDialogNode(params: AssistantV1.CreateDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.DialogNode>): Promise<AssistantV1.Response<AssistantV1.DialogNode>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'dialogNode'];

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
        'user_label': _params.userLabel
      };

      const path = {
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'createDialogNode');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/dialog_nodes',
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
   * Get dialog node.
   *
   * Get information about a dialog node.
   *
   * This operation is limited to 6000 requests per 5 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.dialogNode - The dialog node ID (for example, `get_order`).
   * @param {boolean} [params.includeAudit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public getDialogNode(params: AssistantV1.GetDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.DialogNode>): Promise<AssistantV1.Response<AssistantV1.DialogNode>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'dialogNode'];

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
        'include_audit': _params.includeAudit
      };

      const path = {
        'workspace_id': _params.workspaceId,
        'dialog_node': _params.dialogNode
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'getDialogNode');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
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
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.dialogNode - The dialog node ID (for example, `get_order`).
   * @param {string} [params.newDialogNode] - The dialog node ID. This string must conform to the following
   * restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * @param {string} [params.newDescription] - The description of the dialog node. This string cannot contain carriage
   * return, newline, or tab characters.
   * @param {string} [params.newConditions] - The condition that will trigger the dialog node. This string cannot
   * contain carriage return, newline, or tab characters.
   * @param {string} [params.newParent] - The ID of the parent dialog node. This property is omitted if the dialog node
   * has no parent.
   * @param {string} [params.newPreviousSibling] - The ID of the previous sibling dialog node. This property is omitted
   * if the dialog node has no previous sibling.
   * @param {DialogNodeOutput} [params.newOutput] - The output of the dialog node. For more information about how to
   * specify dialog node output, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
   * @param {JsonObject} [params.newContext] - The context for the dialog node.
   * @param {JsonObject} [params.newMetadata] - The metadata for the dialog node.
   * @param {DialogNodeNextStep} [params.newNextStep] - The next step to execute following this dialog node.
   * @param {string} [params.newTitle] - The alias used to identify the dialog node. This string must conform to the
   * following restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
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
   * node to users.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public updateDialogNode(params: AssistantV1.UpdateDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.DialogNode>): Promise<AssistantV1.Response<AssistantV1.DialogNode>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'dialogNode'];

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
        'user_label': _params.newUserLabel
      };

      const path = {
        'workspace_id': _params.workspaceId,
        'dialog_node': _params.dialogNode
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'updateDialogNode');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
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
   * Delete dialog node.
   *
   * Delete a dialog node from a workspace.
   *
   * This operation is limited to 500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} params.dialogNode - The dialog node ID (for example, `get_order`).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteDialogNode(params: AssistantV1.DeleteDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<AssistantV1.Response<AssistantV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId', 'dialogNode'];

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
        'workspace_id': _params.workspaceId,
        'dialog_node': _params.dialogNode
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteDialogNode');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
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
   * logs
   ************************/

  /**
   * List log events in a workspace.
   *
   * List the events from the log of a specific workspace.
   *
   * If **cursor** is not specified, this operation is limited to 40 requests per 30 minutes. If **cursor** is
   * specified, the limit is 120 requests per minute. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspaceId - Unique identifier of the workspace.
   * @param {string} [params.sort] - How to sort the returned log events. You can sort by **request_timestamp**. To
   * reverse the sort order, prefix the parameter value with a minus sign (`-`).
   * @param {string} [params.filter] - A cacheable parameter that limits the results to those matching the specified
   * filter. For more information, see the
   * [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-filter-reference#filter-reference).
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listLogs(params: AssistantV1.ListLogsParams, callback?: AssistantV1.Callback<AssistantV1.LogCollection>): Promise<AssistantV1.Response<AssistantV1.LogCollection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['workspaceId'];

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
        'workspace_id': _params.workspaceId
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listLogs');

      const parameters = {
        options: {
          url: '/v1/workspaces/{workspace_id}/logs',
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
   * @param {number} [params.pageLimit] - The number of records to return in each page of results.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public listAllLogs(params: AssistantV1.ListAllLogsParams, callback?: AssistantV1.Callback<AssistantV1.LogCollection>): Promise<AssistantV1.Response<AssistantV1.LogCollection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['filter'];

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
        'filter': _params.filter,
        'sort': _params.sort,
        'page_limit': _params.pageLimit,
        'cursor': _params.cursor
      };

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'listAllLogs');

      const parameters = {
        options: {
          url: '/v1/logs',
          method: 'GET',
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
   * @param {string} params.customerId - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {Promise<any>|void}
   */
  public deleteUserData(params: AssistantV1.DeleteUserDataParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): Promise<AssistantV1.Response<AssistantV1.Empty>> {
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

      const sdkHeaders = getSdkHeaders('conversation', 'v1', 'deleteUserData');

      const parameters = {
        options: {
          url: '/v1/user_data',
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

AssistantV1.prototype.name = 'conversation';
AssistantV1.prototype.serviceVersion = 'v1';

/*************************
 * interfaces
 ************************/

namespace AssistantV1 {

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
    /** Whether to include additional diagnostic information about the dialog nodes that were visited during
     *  processing of the message.
     */
    nodesVisitedDetails?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listWorkspaces` operation. */
  export interface ListWorkspacesParams {
    /** The number of records to return in each page of results. */
    pageLimit?: number;
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
    /** Any metadata related to the workspace. */
    metadata?: JsonObject;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by
     *  IBM for general service improvements. `true` indicates that workspace training data is not to be used.
     */
    learningOptOut?: boolean;
    /** Global settings for the workspace. */
    systemSettings?: WorkspaceSystemSettings;
    /** An array of objects defining the intents for the workspace. */
    intents?: CreateIntent[];
    /** An array of objects describing the entities for the workspace. */
    entities?: CreateEntity[];
    /** An array of objects describing the dialog nodes in the workspace. */
    dialogNodes?: DialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: Counterexample[];
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
    /** Any metadata related to the workspace. */
    metadata?: JsonObject;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by
     *  IBM for general service improvements. `true` indicates that workspace training data is not to be used.
     */
    learningOptOut?: boolean;
    /** Global settings for the workspace. */
    systemSettings?: WorkspaceSystemSettings;
    /** An array of objects defining the intents for the workspace. */
    intents?: CreateIntent[];
    /** An array of objects describing the entities for the workspace. */
    entities?: CreateEntity[];
    /** An array of objects describing the dialog nodes in the workspace. */
    dialogNodes?: DialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: Counterexample[];
    /** Whether the new data is to be appended to the existing data in the workspace. If **append**=`false`,
     *  elements included in the new data completely replace the corresponding existing elements, including all
     *  subelements. For example, if the new data includes **entities** and **append**=`false`, all existing entities in
     *  the workspace are discarded and replaced with the new entities.
     *
     *  If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the
     *  new data collide with existing elements, the update request fails.
     */
    append?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteWorkspace` operation. */
  export interface DeleteWorkspaceParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    headers?: OutgoingHttpHeaders;
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
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based).
     */
    patterns?: string[];
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
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based).
     */
    newPatterns?: string[];
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
    /** The dialog node ID. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
     */
    dialogNode: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab
     *  characters.
     */
    conditions?: string;
    /** The ID of the parent dialog node. This property is omitted if the dialog node has no parent. */
    parent?: string;
    /** The ID of the previous sibling dialog node. This property is omitted if the dialog node has no previous
     *  sibling.
     */
    previousSibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
     */
    output?: DialogNodeOutput;
    /** The context for the dialog node. */
    context?: JsonObject;
    /** The metadata for the dialog node. */
    metadata?: JsonObject;
    /** The next step to execute following this dialog node. */
    nextStep?: DialogNodeNextStep;
    /** The alias used to identify the dialog node. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
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
    /** A label that can be displayed externally to describe the purpose of the node to users. */
    userLabel?: string;
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
    /** The dialog node ID (for example, `get_order`). */
    dialogNode: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    includeAudit?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDialogNode` operation. */
  export interface UpdateDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspaceId: string;
    /** The dialog node ID (for example, `get_order`). */
    dialogNode: string;
    /** The dialog node ID. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
     */
    newDialogNode?: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    newDescription?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab
     *  characters.
     */
    newConditions?: string;
    /** The ID of the parent dialog node. This property is omitted if the dialog node has no parent. */
    newParent?: string;
    /** The ID of the previous sibling dialog node. This property is omitted if the dialog node has no previous
     *  sibling.
     */
    newPreviousSibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
     */
    newOutput?: DialogNodeOutput;
    /** The context for the dialog node. */
    newContext?: JsonObject;
    /** The metadata for the dialog node. */
    newMetadata?: JsonObject;
    /** The next step to execute following this dialog node. */
    newNextStep?: DialogNodeNextStep;
    /** The alias used to identify the dialog node. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
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
    /** A label that can be displayed externally to describe the purpose of the node to users. */
    newUserLabel?: string;
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
    /** The dialog node ID (for example, `get_order`). */
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
     *  see the
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-filter-reference#filter-reference).
     */
    filter?: string;
    /** The number of records to return in each page of results. */
    pageLimit?: number;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAllLogs` operation. */
  export interface ListAllLogsParams {
    /** A cacheable parameter that limits the results to those matching the specified filter. You must specify a
     *  filter query that includes a value for `language`, as well as a value for `workspace_id` or
     *  `request.context.metadata.deployment`. For more information, see the
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-filter-reference#filter-reference).
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

  /** CounterexampleCollection. */
  export interface CounterexampleCollection {
    /** An array of objects describing the examples marked as irrelevant input. */
    counterexamples: Counterexample[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** CreateEntity. */
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

  /** CreateIntent. */
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

  /** CreateValue. */
  export interface CreateValue {
    /** The text of the entity value. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    value: string;
    /** Any metadata related to the entity value. */
    metadata?: JsonObject;
    /** Specifies the type of entity value. */
    type?: string;
    /** An array of synonyms for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A synonym must conform to the following resrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    synonyms?: string[];
    /** An array of patterns for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A pattern is a regular expression; for more information about how to specify a
     *  pattern, see the
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based).
     */
    patterns?: string[];
    /** The timestamp for creation of the object. */
    created?: string;
    /** The timestamp for the most recent update to the object. */
    updated?: string;
  }

  /** DialogNode. */
  export interface DialogNode {
    /** The dialog node ID. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
     */
    dialog_node: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters. */
    description?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab
     *  characters.
     */
    conditions?: string;
    /** The ID of the parent dialog node. This property is omitted if the dialog node has no parent. */
    parent?: string;
    /** The ID of the previous sibling dialog node. This property is omitted if the dialog node has no previous
     *  sibling.
     */
    previous_sibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-overview#dialog-overview-responses).
     */
    output?: DialogNodeOutput;
    /** The context for the dialog node. */
    context?: JsonObject;
    /** The metadata for the dialog node. */
    metadata?: JsonObject;
    /** The next step to execute following this dialog node. */
    next_step?: DialogNodeNextStep;
    /** The alias used to identify the dialog node. This string must conform to the following restrictions:
     *  - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
     */
    title?: string;
    /** How the dialog node is processed. */
    type?: string;
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
    type?: string;
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
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     *
     *  **Note:** The **search_skill** response type is available only for Plus and Premium users, and is used only by
     *  the v2 runtime API.
     */
    response_type: string;
    /** A list of one or more objects defining text responses. Required when **response_type**=`text`. */
    values?: DialogNodeOutputTextValuesElement[];
    /** How a response is selected from the list, if more than one response is specified. Valid only when
     *  **response_type**=`text`.
     */
    selection_policy?: string;
    /** The delimiter to use as a separator between responses when `selection_policy`=`multiline`. */
    delimiter?: string;
    /** How long to pause, in milliseconds. The valid values are from 0 to 10000. Valid only when
     *  **response_type**=`pause`.
     */
    time?: number;
    /** Whether to send a "user is typing" event during the pause. Ignored if the channel does not support this
     *  event. Valid only when **response_type**=`pause`.
     */
    typing?: boolean;
    /** The URL of the image. Required when **response_type**=`image`. */
    source?: string;
    /** An optional title to show before the response. Valid only when **response_type**=`image` or `option`. */
    title?: string;
    /** An optional description to show with the response. Valid only when **response_type**=`image` or `option`. */
    description?: string;
    /** The preferred type of control to display, if supported by the channel. Valid only when
     *  **response_type**=`option`.
     */
    preference?: string;
    /** An array of objects describing the options from which the user can choose. You can include up to 20 options.
     *  Required when **response_type**=`option`.
     */
    options?: DialogNodeOutputOptionsElement[];
    /** An optional message to be sent to the human agent who will be taking over the conversation. Valid only when
     *  **reponse_type**=`connect_to_agent`.
     */
    message_to_human_agent?: string;
    /** The text of the search query. This can be either a natural-language query or a query that uses the Discovery
     *  query language syntax, depending on the value of the **query_type** property. For more information, see the
     *  [Discovery service
     *  documentation](https://cloud.ibm.com/docs/services/discovery/query-operators.html#query-operators). Required
     *  when **response_type**=`search_skill`.
     */
    query?: string;
    /** The type of the search query. Required when **response_type**=`search_skill`. */
    query_type?: string;
    /** An optional filter that narrows the set of documents to be searched. For more information, see the
     *  [Discovery service documentation]([Discovery service
     *  documentation](https://cloud.ibm.com/docs/services/discovery/query-parameters.html#filter).
     */
    filter?: string;
    /** The version of the Discovery service API to use for the query. */
    discovery_version?: string;
  }

  /** Options that modify how specified output is handled. */
  export interface DialogNodeOutputModifiers {
    /** Whether values in the output will overwrite output values in an array specified by previously executed
     *  dialog nodes. If this option is set to `false`, new values will be appended to previously specified values.
     */
    overwrite?: boolean;
  }

  /** DialogNodeOutputOptionsElement. */
  export interface DialogNodeOutputOptionsElement {
    /** The user-facing label for the option. */
    label: string;
    /** An object defining the message input to be sent to the Watson Assistant service if the user selects the
     *  corresponding option.
     */
    value: DialogNodeOutputOptionsElementValue;
  }

  /** An object defining the message input to be sent to the Watson Assistant service if the user selects the corresponding option. */
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

  /** DialogNodeOutputTextValuesElement. */
  export interface DialogNodeOutputTextValuesElement {
    /** The text of a response. This string can include newline characters (`\n`), Markdown tagging, or other
     *  special characters, if supported by the channel.
     */
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

  /** DialogSuggestion. */
  export interface DialogSuggestion {
    /** The user-facing label for the disambiguation option. This label is taken from the **user_label** property of
     *  the corresponding dialog node.
     */
    label: string;
    /** An object defining the message input, intents, and entities to be sent to the Watson Assistant service if
     *  the user selects the corresponding disambiguation option.
     */
    value: DialogSuggestionValue;
    /** The dialog output that will be returned from the Watson Assistant service if the user selects the
     *  corresponding option.
     */
    output?: DialogSuggestionOutput;
    /** The ID of the dialog node that the **label** property is taken from. The **label** property is populated
     *  using the value of the dialog node's **user_label** property.
     */
    dialog_node?: string;
  }

  /** The dialog output that will be returned from the Watson Assistant service if the user selects the corresponding option. */
  export interface DialogSuggestionOutput {
    /** An array of the nodes that were triggered to create the response, in the order in which they were visited.
     *  This information is useful for debugging and for tracing the path taken through the node tree.
     */
    nodes_visited?: string[];
    /** An array of objects containing detailed diagnostic information about the nodes that were triggered during
     *  processing of the input message. Included only if **nodes_visited_details** is set to `true` in the message
     *  request.
     */
    nodes_visited_details?: DialogNodeVisitedDetails[];
    /** An array of responses to the user. */
    text: string[];
    /** Output intended for any channel. It is the responsibility of the client application to implement the
     *  supported response types.
     */
    generic?: DialogSuggestionResponseGeneric[];
    /** DialogSuggestionOutput accepts additional properties. */
    [propName: string]: any;
  }

  /** DialogSuggestionResponseGeneric. */
  export interface DialogSuggestionResponseGeneric {
    /** The type of response returned by the dialog node. The specified response type must be supported by the
     *  client application or channel.
     *
     *  **Note:** The **suggestion** response type is part of the disambiguation feature, which is only available for
     *  Plus and Premium users. The **search_skill** response type is available only for Plus and Premium users, and is
     *  used only by the v2 runtime API.
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
    /** The ID of the dialog node that the **topic** property is taken from. The **topic** property is populated
     *  using the value of the dialog node's **user_label** property.
     */
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
    /** An array of zero-based character offsets that indicate where the entity mentions begin and end in the input
     *  text.
     */
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

  /** ExampleCollection. */
  export interface ExampleCollection {
    /** An array of objects describing the examples defined for the intent. */
    examples: Example[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** Intent. */
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
    /** An array of zero-based character offsets that indicate where the entity mentions begin and end in the input
     *  text.
     */
    location: number[];
  }

  /** Metadata related to the message. */
  export interface MessageContextMetadata {
    /** A label identifying the deployment environment, used for filtering log data. This string cannot contain
     *  carriage return, newline, or tab characters.
     */
    deployment?: string;
    /** A string value that identifies the user who is interacting with the workspace. The client must provide a
     *  unique identifier for each individual end user who accesses the application. For Plus and Premium plans, this
     *  user ID is used to identify unique users for billing purposes. This string cannot contain carriage return,
     *  newline, or tab characters.
     */
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
    /** An output object that includes the response to the user, the dialog nodes that were triggered, and messages
     *  from the log.
     */
    output: OutputData;
    /** An array of objects describing any actions requested by the dialog node. */
    actions?: DialogNodeAction[];
  }

  /** An output object that includes the response to the user, the dialog nodes that were triggered, and messages from the log. */
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
    /** An array of responses to the user. */
    text: string[];
    /** Output intended for any channel. It is the responsibility of the client application to implement the
     *  supported response types.
     */
    generic?: RuntimeResponseGeneric[];
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
    /** An array of zero-based character offsets that indicate where the detected entity values begin and end in the
     *  input text.
     */
    location: number[];
    /** The entity value that was recognized in the user input. */
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
     *  Plus and Premium users.
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
    /** The ID of the dialog node that the **topic** property is taken from. The **topic** property is populated
     *  using the value of the dialog node's **user_label** property.
     */
    dialog_node?: string;
    /** An array of objects describing the possible matching dialog nodes from which the user can choose.
     *
     *  **Note:** The **suggestions** property is part of the disambiguation feature, which is only available for
     *  Premium users.
     */
    suggestions?: DialogSuggestion[];
  }

  /** Synonym. */
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
    /** The text of the entity value. This string must conform to the following restrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    value: string;
    /** Any metadata related to the entity value. */
    metadata?: JsonObject;
    /** Specifies the type of entity value. */
    type: string;
    /** An array of synonyms for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A synonym must conform to the following resrictions:
     *  - It cannot contain carriage return, newline, or tab characters.
     *  - It cannot consist of only whitespace characters.
     */
    synonyms?: string[];
    /** An array of patterns for the entity value. A value can specify either synonyms or patterns (depending on the
     *  value type), but not both. A pattern is a regular expression; for more information about how to specify a
     *  pattern, see the
     *  [documentation](https://cloud.ibm.com/docs/services/assistant?topic=assistant-entities#entities-create-dictionary-based).
     */
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
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by
     *  IBM for general service improvements. `true` indicates that workspace training data is not to be used.
     */
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
    /** Workspace settings related to the disambiguation feature.
     *
     *  **Note:** This feature is available only to Premium users.
     */
    disambiguation?: WorkspaceSystemSettingsDisambiguation;
    /** For internal use only. */
    human_agent_assist?: JsonObject;
  }

  /** Workspace settings related to the disambiguation feature. **Note:** This feature is available only to Premium users. */
  export interface WorkspaceSystemSettingsDisambiguation {
    /** The text of the introductory prompt that accompanies disambiguation options presented to the user. */
    prompt?: string;
    /** The user-facing label for the option users can select if none of the suggested options is correct. If no
     *  value is specified for this property, this option does not appear.
     */
    none_of_the_above_prompt?: string;
    /** Whether the disambiguation feature is enabled for the workspace. */
    enabled?: boolean;
    /** The sensitivity of the disambiguation feature to intent detection conflicts. Set to **high** if you want the
     *  disambiguation feature to be triggered more often. This can be useful for testing or demonstration purposes.
     */
    sensitivity?: string;
  }

  /** Workspace settings related to the Watson Assistant user interface. */
  export interface WorkspaceSystemSettingsTooling {
    /** Whether the dialog JSON editor displays text responses within the `output.generic` object. */
    store_generic_responses?: boolean;
  }

}

export = AssistantV1;
