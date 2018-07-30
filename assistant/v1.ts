/**
 * Copyright 2018 IBM All Rights Reserved.
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
import { RequestResponse } from 'request';
import { BaseService } from '../lib/base_service';
import { getMissingParams } from '../lib/helper';

/**
 * The IBM Watson&trade; Assistant service combines machine learning, natural language understanding, and integrated dialog tools to create conversation flows between your apps and your users.
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
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/assistant/api'). The base url may differ between Bluemix regions.
   * @param {string} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.iam_access_token] - An IAM access token fully managed by the application. Responsibility falls on the application to refresh the token, either before it expires or reactively upon receiving a 401 from the service, as any requests made with an expired token will fail.
   * @param {string} [options.iam_apikey] - An API key that can be used to request IAM tokens. If this API key is provided, the SDK will manage the token and handle the refreshing.
   * @param {string} [options.iam_url] - An optional URL for the IAM service API. Defaults to 'https://iam.bluemix.net/identity/token'.
   * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
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
   * Get a response to a user's input.
   *
   * There is no rate limit for this operation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {InputData} [params.input] - An input object that includes the input text.
   * @param {boolean} [params.alternate_intents] - Whether to return more than one intent. Set to `true` to return all
   * matching intents.
   * @param {Context} [params.context] - State information for the conversation. Continue a conversation by including
   * the context object from the previous response.
   * @param {RuntimeEntity[]} [params.entities] - Entities to use when evaluating the message. Include entities from the
   * previous response to continue using those entities rather than detecting entities in the new input.
   * @param {RuntimeIntent[]} [params.intents] - Intents to use when evaluating the user input. Include intents from the
   * previous response to continue using those intents rather than trying to recognize intents in the new input.
   * @param {OutputData} [params.output] - System output. Include the output from the previous response to maintain
   * intermediate information over multiple requests.
   * @param {boolean} [params.nodes_visited_details] - Whether to include additional diagnostic information about the
   * dialog nodes that were visited during processing of the message.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public message(params: AssistantV1.MessageParams, callback?: AssistantV1.Callback<AssistantV1.MessageResponse>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'input': _params.input,
      'alternate_intents': _params.alternate_intents,
      'context': _params.context,
      'entities': _params.entities,
      'intents': _params.intents,
      'output': _params.output
    };
    const query = {
      'nodes_visited_details': _params.nodes_visited_details
    };
    const path = {
      'workspace_id': _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/message',
        method: 'POST',
        json: true,
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * tab characters, and it must be no longer than 64 characters.
   * @param {string} [params.description] - The description of the workspace. This string cannot contain carriage
   * return, newline, or tab characters, and it must be no longer than 128 characters.
   * @param {string} [params.language] - The language of the workspace.
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects defining the entities for the workspace.
   * @param {CreateDialogNode[]} [params.dialog_nodes] - An array of objects defining the nodes in the workspace dialog.
   * @param {CreateCounterexample[]} [params.counterexamples] - An array of objects defining input examples that have
   * been marked as irrelevant input.
   * @param {Object} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learning_opt_out] - Whether training data from the workspace can be used by IBM for
   * general service improvements. `true` indicates that workspace training data is not to be used.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public createWorkspace(params?: AssistantV1.CreateWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Workspace>): NodeJS.ReadableStream | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : (callback) ? callback : () => {/* noop */};
    const body = {
      'name': _params.name,
      'description': _params.description,
      'language': _params.language,
      'intents': _params.intents,
      'entities': _params.entities,
      'dialog_nodes': _params.dialog_nodes,
      'counterexamples': _params.counterexamples,
      'metadata': _params.metadata,
      'learning_opt_out': _params.learning_opt_out
    };
    const parameters = {
      options: {
        url: '/v1/workspaces',
        method: 'POST',
        json: true,
        body,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteWorkspace(params: AssistantV1.DeleteWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'workspace_id': _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getWorkspace(params: AssistantV1.GetWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.WorkspaceExport>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'export': _params.export,
      'include_audit': _params.include_audit
    };
    const path = {
      'workspace_id': _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {string} [params.sort] - The attribute by which returned results will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listWorkspaces(params?: AssistantV1.ListWorkspacesParams, callback?: AssistantV1.Callback<AssistantV1.WorkspaceCollection>): NodeJS.ReadableStream | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : (callback) ? callback : () => {/* noop */};
    const query = {
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };
    const parameters = {
      options: {
        url: '/v1/workspaces',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * tab characters, and it must be no longer than 64 characters.
   * @param {string} [params.description] - The description of the workspace. This string cannot contain carriage
   * return, newline, or tab characters, and it must be no longer than 128 characters.
   * @param {string} [params.language] - The language of the workspace.
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects defining the entities for the workspace.
   * @param {CreateDialogNode[]} [params.dialog_nodes] - An array of objects defining the nodes in the workspace dialog.
   * @param {CreateCounterexample[]} [params.counterexamples] - An array of objects defining input examples that have
   * been marked as irrelevant input.
   * @param {Object} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learning_opt_out] - Whether training data from the workspace can be used by IBM for
   * general service improvements. `true` indicates that workspace training data is not to be used.
   * @param {boolean} [params.append] - Whether the new data is to be appended to the existing data in the workspace. If
   * **append**=`false`, elements included in the new data completely replace the corresponding existing elements,
   * including all subelements. For example, if the new data includes **entities** and **append**=`false`, all existing
   * entities in the workspace are discarded and replaced with the new entities.
   *
   * If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the new
   * data collide with existing elements, the update request fails.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public updateWorkspace(params: AssistantV1.UpdateWorkspaceParams, callback?: AssistantV1.Callback<AssistantV1.Workspace>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'name': _params.name,
      'description': _params.description,
      'language': _params.language,
      'intents': _params.intents,
      'entities': _params.entities,
      'dialog_nodes': _params.dialog_nodes,
      'counterexamples': _params.counterexamples,
      'metadata': _params.metadata,
      'learning_opt_out': _params.learning_opt_out
    };
    const query = {
      'append': _params.append
    };
    const path = {
      'workspace_id': _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
        method: 'POST',
        json: true,
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * This operation is limited to 2000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The name of the intent. This string must conform to the following restrictions:
   * - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * - It must be no longer than 128 characters.
   * @param {string} [params.description] - The description of the intent. This string cannot contain carriage return,
   * newline, or tab characters, and it must be no longer than 128 characters.
   * @param {CreateExample[]} [params.examples] - An array of user input examples for the intent.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public createIntent(params: AssistantV1.CreateIntentParams, callback?: AssistantV1.Callback<AssistantV1.Intent>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'intent'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteIntent(params: AssistantV1.DeleteIntentParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'intent'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getIntent(params: AssistantV1.GetIntentParams, callback?: AssistantV1.Callback<AssistantV1.IntentExport>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'intent'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'export': _params.export,
      'include_audit': _params.include_audit
    };
    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned results will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listIntents(params: AssistantV1.ListIntentsParams, callback?: AssistantV1.Callback<AssistantV1.IntentCollection>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'export': _params.export,
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };
    const path = {
      'workspace_id': _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * This operation is limited to 2000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} [params.new_intent] - The name of the intent. This string must conform to the following
   * restrictions:
   * - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * - It must be no longer than 128 characters.
   * @param {string} [params.new_description] - The description of the intent.
   * @param {CreateExample[]} [params.new_examples] - An array of user input examples for the intent.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public updateIntent(params: AssistantV1.UpdateIntentParams, callback?: AssistantV1.Callback<AssistantV1.Intent>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'intent'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {string} params.text - The text of a user input example. This string must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * - It must be no longer than 1024 characters.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public createExample(params: AssistantV1.CreateExampleParams, callback?: AssistantV1.Callback<AssistantV1.Example>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'intent', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'text': _params.text
    };
    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteExample(params: AssistantV1.DeleteExampleParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'intent', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent,
      'text': _params.text
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getExample(params: AssistantV1.GetExampleParams, callback?: AssistantV1.Callback<AssistantV1.Example>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'intent', 'text'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /**
   * List user input examples.
   *
   * List the user input examples for an intent.
   *
   * This operation is limited to 2500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.intent - The intent name.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned results will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listExamples(params: AssistantV1.ListExamplesParams, callback?: AssistantV1.Callback<AssistantV1.ExampleCollection>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'intent'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * - It must be no longer than 1024 characters.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public updateExample(params: AssistantV1.UpdateExampleParams, callback?: AssistantV1.Callback<AssistantV1.Example>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'intent', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'text': _params.new_text
    };
    const path = {
      'workspace_id': _params.workspace_id,
      'intent': _params.intent,
      'text': _params.text
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input marked as irrelevant input. This string must conform to the
   * following restrictions:
   * - It cannot contain carriage return, newline, or tab characters
   * - It cannot consist of only whitespace characters
   * - It must be no longer than 1024 characters.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public createCounterexample(params: AssistantV1.CreateCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Counterexample>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'text'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteCounterexample(params: AssistantV1.DeleteCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'workspace_id': _params.workspace_id,
      'text': _params.text
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getCounterexample(params: AssistantV1.GetCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Counterexample>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'text'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {string} [params.sort] - The attribute by which returned results will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listCounterexamples(params: AssistantV1.ListCounterexamplesParams, callback?: AssistantV1.Callback<AssistantV1.CounterexampleCollection>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {string} [params.new_text] - The text of a user input counterexample.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public updateCounterexample(params: AssistantV1.UpdateCounterexampleParams, callback?: AssistantV1.Callback<AssistantV1.Counterexample>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'text'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * Create a new entity.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity. This string must conform to the following restrictions:
   * - It can contain only Unicode alphanumeric, underscore, and hyphen characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * - It must be no longer than 64 characters.
   * @param {string} [params.description] - The description of the entity. This string cannot contain carriage return,
   * newline, or tab characters, and it must be no longer than 128 characters.
   * @param {Object} [params.metadata] - Any metadata related to the value.
   * @param {CreateValue[]} [params.values] - An array of objects describing the entity values.
   * @param {boolean} [params.fuzzy_match] - Whether to use fuzzy matching for the entity.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public createEntity(params: AssistantV1.CreateEntityParams, callback?: AssistantV1.Callback<AssistantV1.Entity>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'entity': _params.entity,
      'description': _params.description,
      'metadata': _params.metadata,
      'values': _params.values,
      'fuzzy_match': _params.fuzzy_match
    };
    const path = {
      'workspace_id': _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * Delete an entity from a workspace.
   *
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteEntity(params: AssistantV1.DeleteEntityParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getEntity(params: AssistantV1.GetEntityParams, callback?: AssistantV1.Callback<AssistantV1.EntityExport>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'export': _params.export,
      'include_audit': _params.include_audit
    };
    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned results will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listEntities(params: AssistantV1.ListEntitiesParams, callback?: AssistantV1.Callback<AssistantV1.EntityCollection>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'export': _params.export,
      'page_limit': _params.page_limit,
      'include_count': _params.include_count,
      'sort': _params.sort,
      'cursor': _params.cursor,
      'include_audit': _params.include_audit
    };
    const path = {
      'workspace_id': _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * This operation is limited to 1000 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.entity - The name of the entity.
   * @param {string} [params.new_entity] - The name of the entity. This string must conform to the following
   * restrictions:
   * - It can contain only Unicode alphanumeric, underscore, and hyphen characters.
   * - It cannot begin with the reserved prefix `sys-`.
   * - It must be no longer than 64 characters.
   * @param {string} [params.new_description] - The description of the entity. This string cannot contain carriage
   * return, newline, or tab characters, and it must be no longer than 128 characters.
   * @param {Object} [params.new_metadata] - Any metadata related to the entity.
   * @param {boolean} [params.new_fuzzy_match] - Whether to use fuzzy matching for the entity.
   * @param {CreateValue[]} [params.new_values] - An array of entity values.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public updateEntity(params: AssistantV1.UpdateEntityParams, callback?: AssistantV1.Callback<AssistantV1.Entity>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  };

  /*************************
   * values
   ************************/

  /**
   * Add entity value.
   *
   * Create a new value for an entity.
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
   * - It must be no longer than 64 characters.
   * @param {Object} [params.metadata] - Any metadata related to the entity value.
   * @param {string[]} [params.synonyms] - An array containing any synonyms for the entity value. You can provide either
   * synonyms or patterns (as indicated by **type**), but not both. A synonym must conform to the following
   * restrictions:
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * - It must be no longer than 64 characters.
   * @param {string[]} [params.patterns] - An array of patterns for the entity value. You can provide either synonyms or
   * patterns (as indicated by **type**), but not both. A pattern is a regular expression no longer than 512 characters.
   * For more information about how to specify a pattern, see the
   * [documentation](https://console.bluemix.net/docs/services/conversation/entities.html#creating-entities).
   * @param {string} [params.value_type] - Specifies the type of value.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public createValue(params: AssistantV1.CreateValueParams, callback?: AssistantV1.Callback<AssistantV1.Value>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity', 'value'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'value': _params.value,
      'metadata': _params.metadata,
      'synonyms': _params.synonyms,
      'patterns': _params.patterns,
      'type': _params.value_type
    };
    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteValue(params: AssistantV1.DeleteValueParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity', 'value'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getValue(params: AssistantV1.GetValueParams, callback?: AssistantV1.Callback<AssistantV1.ValueExport>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity', 'value'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'export': _params.export,
      'include_audit': _params.include_audit
    };
    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If
   * **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all
   * content, including subelements, is included.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - The attribute by which returned results will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listValues(params: AssistantV1.ListValuesParams, callback?: AssistantV1.Callback<AssistantV1.ValueCollection>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'export': _params.export,
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * - It must be no longer than 64 characters.
   * @param {Object} [params.new_metadata] - Any metadata related to the entity value.
   * @param {string} [params.new_type] - Specifies the type of value.
   * @param {string[]} [params.new_synonyms] - An array of synonyms for the entity value. You can provide either
   * synonyms or patterns (as indicated by **type**), but not both. A synonym must conform to the following resrictions:
   *
   * - It cannot contain carriage return, newline, or tab characters.
   * - It cannot consist of only whitespace characters.
   * - It must be no longer than 64 characters.
   * @param {string[]} [params.new_patterns] - An array of patterns for the entity value. You can provide either
   * synonyms or patterns (as indicated by **type**), but not both. A pattern is a regular expression no longer than 512
   * characters. For more information about how to specify a pattern, see the
   * [documentation](https://console.bluemix.net/docs/services/conversation/entities.html#creating-entities).
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public updateValue(params: AssistantV1.UpdateValueParams, callback?: AssistantV1.Callback<AssistantV1.Value>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity', 'value'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      'value': _params.new_value,
      'metadata': _params.new_metadata,
      'type': _params.new_type,
      'synonyms': _params.new_synonyms,
      'patterns': _params.new_patterns
    };
    const path = {
      'workspace_id': _params.workspace_id,
      'entity': _params.entity,
      'value': _params.value
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * Add entity value synonym.
   *
   * Add a new synonym to an entity value.
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
   * - It must be no longer than 64 characters.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public createSynonym(params: AssistantV1.CreateSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Synonym>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteSynonym(params: AssistantV1.DeleteSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getSynonym(params: AssistantV1.GetSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Synonym>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {string} [params.sort] - The attribute by which returned results will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listSynonyms(params: AssistantV1.ListSynonymsParams, callback?: AssistantV1.Callback<AssistantV1.SynonymCollection>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity', 'value'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * - It must be no longer than 64 characters.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public updateSynonym(params: AssistantV1.UpdateSynonymParams, callback?: AssistantV1.Callback<AssistantV1.Synonym>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * This operation is limited to 500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.dialog_node - The dialog node ID. This string must conform to the following restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * - It must be no longer than 1024 characters.
   * @param {string} [params.description] - The description of the dialog node. This string cannot contain carriage
   * return, newline, or tab characters, and it must be no longer than 128 characters.
   * @param {string} [params.conditions] - The condition that will trigger the dialog node. This string cannot contain
   * carriage return, newline, or tab characters, and it must be no longer than 2048 characters.
   * @param {string} [params.parent] - The ID of the parent dialog node.
   * @param {string} [params.previous_sibling] - The ID of the previous dialog node.
   * @param {Object} [params.output] - The output of the dialog node. For more information about how to specify dialog
   * node output, see the
   * [documentation](https://console.bluemix.net/docs/services/conversation/dialog-overview.html#complex).
   * @param {Object} [params.context] - The context for the dialog node.
   * @param {Object} [params.metadata] - The metadata for the dialog node.
   * @param {DialogNodeNextStep} [params.next_step] - The next step to be executed in dialog processing.
   * @param {DialogNodeAction[]} [params.actions] - An array of objects describing any actions to be invoked by the
   * dialog node.
   * @param {string} [params.title] - The alias used to identify the dialog node. This string must conform to the
   * following restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * - It must be no longer than 64 characters.
   * @param {string} [params.node_type] - How the dialog node is processed.
   * @param {string} [params.event_name] - How an `event_handler` node is processed.
   * @param {string} [params.variable] - The location in the dialog context where output is stored.
   * @param {string} [params.digress_in] - Whether this top-level dialog node can be digressed into.
   * @param {string} [params.digress_out] - Whether this dialog node can be returned to after a digression.
   * @param {string} [params.digress_out_slots] - Whether the user can digress to top-level nodes while filling out
   * slots.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public createDialogNode(params: AssistantV1.CreateDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.DialogNode>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'dialog_node'];
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
      'actions': _params.actions,
      'title': _params.title,
      'type': _params.node_type,
      'event_name': _params.event_name,
      'variable': _params.variable,
      'digress_in': _params.digress_in,
      'digress_out': _params.digress_out,
      'digress_out_slots': _params.digress_out_slots
    };
    const path = {
      'workspace_id': _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteDialogNode(params: AssistantV1.DeleteDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'dialog_node'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      'workspace_id': _params.workspace_id,
      'dialog_node': _params.dialog_node
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public getDialogNode(params: AssistantV1.GetDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.DialogNode>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'dialog_node'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {string} [params.sort] - The attribute by which returned results will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated`
   * timestamps) in the response.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listDialogNodes(params: AssistantV1.ListDialogNodesParams, callback?: AssistantV1.Callback<AssistantV1.DialogNodeCollection>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * This operation is limited to 500 requests per 30 minutes. For more information, see **Rate limiting**.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {string} params.dialog_node - The dialog node ID (for example, `get_order`).
   * @param {string} [params.new_dialog_node] - The dialog node ID. This string must conform to the following
   * restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * - It must be no longer than 1024 characters.
   * @param {string} [params.new_description] - The description of the dialog node. This string cannot contain carriage
   * return, newline, or tab characters, and it must be no longer than 128 characters.
   * @param {string} [params.new_conditions] - The condition that will trigger the dialog node. This string cannot
   * contain carriage return, newline, or tab characters, and it must be no longer than 2048 characters.
   * @param {string} [params.new_parent] - The ID of the parent dialog node.
   * @param {string} [params.new_previous_sibling] - The ID of the previous sibling dialog node.
   * @param {Object} [params.new_output] - The output of the dialog node. For more information about how to specify
   * dialog node output, see the
   * [documentation](https://console.bluemix.net/docs/services/conversation/dialog-overview.html#complex).
   * @param {Object} [params.new_context] - The context for the dialog node.
   * @param {Object} [params.new_metadata] - The metadata for the dialog node.
   * @param {DialogNodeNextStep} [params.new_next_step] - The next step to be executed in dialog processing.
   * @param {string} [params.new_title] - The alias used to identify the dialog node. This string must conform to the
   * following restrictions:
   * - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters.
   * - It must be no longer than 64 characters.
   * @param {string} [params.new_type] - How the dialog node is processed.
   * @param {string} [params.new_event_name] - How an `event_handler` node is processed.
   * @param {string} [params.new_variable] - The location in the dialog context where output is stored.
   * @param {DialogNodeAction[]} [params.new_actions] - An array of objects describing any actions to be invoked by the
   * dialog node.
   * @param {string} [params.new_digress_in] - Whether this top-level dialog node can be digressed into.
   * @param {string} [params.new_digress_out] - Whether this dialog node can be returned to after a digression.
   * @param {string} [params.new_digress_out_slots] - Whether the user can digress to top-level nodes while filling out
   * slots.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public updateDialogNode(params: AssistantV1.UpdateDialogNodeParams, callback?: AssistantV1.Callback<AssistantV1.DialogNode>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id', 'dialog_node'];
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
      'type': _params.new_type,
      'event_name': _params.new_event_name,
      'variable': _params.new_variable,
      'actions': _params.new_actions,
      'digress_in': _params.new_digress_in,
      'digress_out': _params.new_digress_out,
      'digress_out_slots': _params.new_digress_out_slots
    };
    const path = {
      'workspace_id': _params.workspace_id,
      'dialog_node': _params.dialog_node
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
        method: 'POST',
        json: true,
        body,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * [documentation](https://console.bluemix.net/docs/services/conversation/filter-reference.html#filter-query-syntax).
   * @param {string} [params.sort] - The attribute by which returned results will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`.
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listAllLogs(params: AssistantV1.ListAllLogsParams, callback?: AssistantV1.Callback<AssistantV1.LogCollection>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['filter'];
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
    const parameters = {
      options: {
        url: '/v1/logs',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * @param {string} [params.sort] - The attribute by which returned results will be sorted. To reverse the sort order,
   * prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`.
   * @param {string} [params.filter] - A cacheable parameter that limits the results to those matching the specified
   * filter. For more information, see the
   * [documentation](https://console.bluemix.net/docs/services/conversation/filter-reference.html#filter-query-syntax).
   * @param {number} [params.page_limit] - The number of records to return in each page of results.
   * @param {string} [params.cursor] - A token identifying the page of results to retrieve.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public listLogs(params: AssistantV1.ListLogsParams, callback?: AssistantV1.Callback<AssistantV1.LogCollection>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['workspace_id'];
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
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/logs',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
   * security](https://console.bluemix.net/docs/services/conversation/information-security.html).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customer_id - The customer ID for which all data is to be deleted.
   * @param {Object} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {NodeJS.ReadableStream|void}
   */
  public deleteUserData(params: AssistantV1.DeleteUserDataParams, callback?: AssistantV1.Callback<AssistantV1.Empty>): NodeJS.ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => { /* noop */ };
    const requiredParams = ['customer_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      'customer_id': _params.customer_id
    };
    const parameters = {
      options: {
        url: '/v1/user_data',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
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
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, body?: T, response?: RequestResponse) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `message` operation. */
  export interface MessageParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** An input object that includes the input text. */
    input?: InputData;
    /** Whether to return more than one intent. Set to `true` to return all matching intents. */
    alternate_intents?: boolean;
    /** State information for the conversation. Continue a conversation by including the context object from the previous response. */
    context?: Context;
    /** Entities to use when evaluating the message. Include entities from the previous response to continue using those entities rather than detecting entities in the new input. */
    entities?: RuntimeEntity[];
    /** Intents to use when evaluating the user input. Include intents from the previous response to continue using those intents rather than trying to recognize intents in the new input. */
    intents?: RuntimeIntent[];
    /** System output. Include the output from the previous response to maintain intermediate information over multiple requests. */
    output?: OutputData;
    /** Whether to include additional diagnostic information about the dialog nodes that were visited during processing of the message. */
    nodes_visited_details?: boolean;
    headers?: Object;
  }

  /** Parameters for the `createWorkspace` operation. */
  export interface CreateWorkspaceParams {
    /** The name of the workspace. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 64 characters. */
    name?: string;
    /** The description of the workspace. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 128 characters. */
    description?: string;
    /** The language of the workspace. */
    language?: string;
    /** An array of objects defining the intents for the workspace. */
    intents?: CreateIntent[];
    /** An array of objects defining the entities for the workspace. */
    entities?: CreateEntity[];
    /** An array of objects defining the nodes in the workspace dialog. */
    dialog_nodes?: CreateDialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: CreateCounterexample[];
    /** Any metadata related to the workspace. */
    metadata?: Object;
    /** Whether training data from the workspace can be used by IBM for general service improvements. `true` indicates that workspace training data is not to be used. */
    learning_opt_out?: boolean;
    headers?: Object;
  }

  /** Parameters for the `deleteWorkspace` operation. */
  export interface DeleteWorkspaceParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    headers?: Object;
  }

  /** Parameters for the `getWorkspace` operation. */
  export interface GetWorkspaceParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `listWorkspaces` operation. */
  export interface ListWorkspacesParams {
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned results will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`. */
    sort?: string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `updateWorkspace` operation. */
  export interface UpdateWorkspaceParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the workspace. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 64 characters. */
    name?: string;
    /** The description of the workspace. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 128 characters. */
    description?: string;
    /** The language of the workspace. */
    language?: string;
    /** An array of objects defining the intents for the workspace. */
    intents?: CreateIntent[];
    /** An array of objects defining the entities for the workspace. */
    entities?: CreateEntity[];
    /** An array of objects defining the nodes in the workspace dialog. */
    dialog_nodes?: CreateDialogNode[];
    /** An array of objects defining input examples that have been marked as irrelevant input. */
    counterexamples?: CreateCounterexample[];
    /** Any metadata related to the workspace. */
    metadata?: Object;
    /** Whether training data from the workspace can be used by IBM for general service improvements. `true` indicates that workspace training data is not to be used. */
    learning_opt_out?: boolean;
    /** Whether the new data is to be appended to the existing data in the workspace. If **append**=`false`, elements included in the new data completely replace the corresponding existing elements, including all subelements. For example, if the new data includes **entities** and **append**=`false`, all existing entities in the workspace are discarded and replaced with the new entities. If **append**=`true`, existing elements are preserved, and the new elements are added. If any elements in the new data collide with existing elements, the update request fails. */
    append?: boolean;
    headers?: Object;
  }

  /** Parameters for the `createIntent` operation. */
  export interface CreateIntentParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the intent. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters. - It cannot begin with the reserved prefix `sys-`. - It must be no longer than 128 characters. */
    intent: string;
    /** The description of the intent. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 128 characters. */
    description?: string;
    /** An array of user input examples for the intent. */
    examples?: CreateExample[];
    headers?: Object;
  }

  /** Parameters for the `deleteIntent` operation. */
  export interface DeleteIntentParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    headers?: Object;
  }

  /** Parameters for the `getIntent` operation. */
  export interface GetIntentParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `listIntents` operation. */
  export interface ListIntentsParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    export?: boolean;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned results will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`. */
    sort?: string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `updateIntent` operation. */
  export interface UpdateIntentParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** The name of the intent. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters. - It cannot begin with the reserved prefix `sys-`. - It must be no longer than 128 characters. */
    new_intent?: string;
    /** The description of the intent. */
    new_description?: string;
    /** An array of user input examples for the intent. */
    new_examples?: CreateExample[];
    headers?: Object;
  }

  /** Parameters for the `createExample` operation. */
  export interface CreateExampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** The text of a user input example. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 1024 characters. */
    text: string;
    headers?: Object;
  }

  /** Parameters for the `deleteExample` operation. */
  export interface DeleteExampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** The text of the user input example. */
    text: string;
    headers?: Object;
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
    headers?: Object;
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
    /** The attribute by which returned results will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`. */
    sort?: string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `updateExample` operation. */
  export interface UpdateExampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The intent name. */
    intent: string;
    /** The text of the user input example. */
    text: string;
    /** The text of the user input example. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 1024 characters. */
    new_text?: string;
    headers?: Object;
  }

  /** Parameters for the `createCounterexample` operation. */
  export interface CreateCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The text of a user input marked as irrelevant input. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters - It cannot consist of only whitespace characters - It must be no longer than 1024 characters. */
    text: string;
    headers?: Object;
  }

  /** Parameters for the `deleteCounterexample` operation. */
  export interface DeleteCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The text of a user input counterexample (for example, `What are you wearing?`). */
    text: string;
    headers?: Object;
  }

  /** Parameters for the `getCounterexample` operation. */
  export interface GetCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The text of a user input counterexample (for example, `What are you wearing?`). */
    text: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `listCounterexamples` operation. */
  export interface ListCounterexamplesParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned results will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`. */
    sort?: string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `updateCounterexample` operation. */
  export interface UpdateCounterexampleParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The text of a user input counterexample (for example, `What are you wearing?`). */
    text: string;
    /** The text of a user input counterexample. */
    new_text?: string;
    headers?: Object;
  }

  /** Parameters for the `createEntity` operation. */
  export interface CreateEntityParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, and hyphen characters. - It cannot begin with the reserved prefix `sys-`. - It must be no longer than 64 characters. */
    entity: string;
    /** The description of the entity. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 128 characters. */
    description?: string;
    /** Any metadata related to the value. */
    metadata?: Object;
    /** An array of objects describing the entity values. */
    values?: CreateValue[];
    /** Whether to use fuzzy matching for the entity. */
    fuzzy_match?: boolean;
    headers?: Object;
  }

  /** Parameters for the `deleteEntity` operation. */
  export interface DeleteEntityParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    headers?: Object;
  }

  /** Parameters for the `getEntity` operation. */
  export interface GetEntityParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `listEntities` operation. */
  export interface ListEntitiesParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    export?: boolean;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned results will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`. */
    sort?: string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `updateEntity` operation. */
  export interface UpdateEntityParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The name of the entity. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, and hyphen characters. - It cannot begin with the reserved prefix `sys-`. - It must be no longer than 64 characters. */
    new_entity?: string;
    /** The description of the entity. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 128 characters. */
    new_description?: string;
    /** Any metadata related to the entity. */
    new_metadata?: Object;
    /** Whether to use fuzzy matching for the entity. */
    new_fuzzy_match?: boolean;
    /** An array of entity values. */
    new_values?: CreateValue[];
    headers?: Object;
  }

  /** Parameters for the `createValue` operation. */
  export interface CreateValueParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 64 characters. */
    value: string;
    /** Any metadata related to the entity value. */
    metadata?: Object;
    /** An array containing any synonyms for the entity value. You can provide either synonyms or patterns (as indicated by **type**), but not both. A synonym must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 64 characters. */
    synonyms?: string[];
    /** An array of patterns for the entity value. You can provide either synonyms or patterns (as indicated by **type**), but not both. A pattern is a regular expression no longer than 512 characters. For more information about how to specify a pattern, see the [documentation](https://console.bluemix.net/docs/services/conversation/entities.html#creating-entities). */
    patterns?: string[];
    /** Specifies the type of value. */
    value_type?: CreateValueConstants.ValueType | string;
    headers?: Object;
  }

  /** Constants for the `createValue` operation. */
  export namespace CreateValueConstants {
     /** Specifies the type of value. */
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
    headers?: Object;
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
    export?: boolean;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `listValues` operation. */
  export interface ListValuesParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** Whether to include all element content in the returned data. If **export**=`false`, the returned data includes only information about the element itself. If **export**=`true`, all content, including subelements, is included. */
    export?: boolean;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned results will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`. */
    sort?: string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `updateValue` operation. */
  export interface UpdateValueParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The name of the entity. */
    entity: string;
    /** The text of the entity value. */
    value: string;
    /** The text of the entity value. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 64 characters. */
    new_value?: string;
    /** Any metadata related to the entity value. */
    new_metadata?: Object;
    /** Specifies the type of value. */
    new_type?: UpdateValueConstants.ValueType | string;
    /** An array of synonyms for the entity value. You can provide either synonyms or patterns (as indicated by **type**), but not both. A synonym must conform to the following resrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 64 characters. */
    new_synonyms?: string[];
    /** An array of patterns for the entity value. You can provide either synonyms or patterns (as indicated by **type**), but not both. A pattern is a regular expression no longer than 512 characters. For more information about how to specify a pattern, see the [documentation](https://console.bluemix.net/docs/services/conversation/entities.html#creating-entities). */
    new_patterns?: string[];
    headers?: Object;
  }

  /** Constants for the `updateValue` operation. */
  export namespace UpdateValueConstants {
     /** Specifies the type of value. */
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
    /** The text of the synonym. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 64 characters. */
    synonym: string;
    headers?: Object;
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
    headers?: Object;
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
    headers?: Object;
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
    /** The attribute by which returned results will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`. */
    sort?: string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
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
    /** The text of the synonym. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 64 characters. */
    new_synonym?: string;
    headers?: Object;
  }

  /** Parameters for the `createDialogNode` operation. */
  export interface CreateDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The dialog node ID. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. - It must be no longer than 1024 characters. */
    dialog_node: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 128 characters. */
    description?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 2048 characters. */
    conditions?: string;
    /** The ID of the parent dialog node. */
    parent?: string;
    /** The ID of the previous dialog node. */
    previous_sibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the [documentation](https://console.bluemix.net/docs/services/conversation/dialog-overview.html#complex). */
    output?: Object;
    /** The context for the dialog node. */
    context?: Object;
    /** The metadata for the dialog node. */
    metadata?: Object;
    /** The next step to be executed in dialog processing. */
    next_step?: DialogNodeNextStep;
    /** An array of objects describing any actions to be invoked by the dialog node. */
    actions?: DialogNodeAction[];
    /** The alias used to identify the dialog node. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. - It must be no longer than 64 characters. */
    title?: string;
    /** How the dialog node is processed. */
    node_type?: CreateDialogNodeConstants.NodeType | string;
    /** How an `event_handler` node is processed. */
    event_name?: CreateDialogNodeConstants.EventName | string;
    /** The location in the dialog context where output is stored. */
    variable?: string;
    /** Whether this top-level dialog node can be digressed into. */
    digress_in?: CreateDialogNodeConstants.DigressIn | string;
    /** Whether this dialog node can be returned to after a digression. */
    digress_out?: CreateDialogNodeConstants.DigressOut | string;
    /** Whether the user can digress to top-level nodes while filling out slots. */
    digress_out_slots?: CreateDialogNodeConstants.DigressOutSlots | string;
    headers?: Object;
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
      RETURNING = 'allow_returning',
      ALL = 'allow_all',
      ALL_NEVER_RETURN = 'allow_all_never_return',
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
    headers?: Object;
  }

  /** Parameters for the `getDialogNode` operation. */
  export interface GetDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The dialog node ID (for example, `get_order`). */
    dialog_node: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `listDialogNodes` operation. */
  export interface ListDialogNodesParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** Whether to include information about the number of records returned. */
    include_count?: boolean;
    /** The attribute by which returned results will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`. */
    sort?: string;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    /** Whether to include the audit properties (`created` and `updated` timestamps) in the response. */
    include_audit?: boolean;
    headers?: Object;
  }

  /** Parameters for the `updateDialogNode` operation. */
  export interface UpdateDialogNodeParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The dialog node ID (for example, `get_order`). */
    dialog_node: string;
    /** The dialog node ID. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. - It must be no longer than 1024 characters. */
    new_dialog_node?: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 128 characters. */
    new_description?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 2048 characters. */
    new_conditions?: string;
    /** The ID of the parent dialog node. */
    new_parent?: string;
    /** The ID of the previous sibling dialog node. */
    new_previous_sibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the [documentation](https://console.bluemix.net/docs/services/conversation/dialog-overview.html#complex). */
    new_output?: Object;
    /** The context for the dialog node. */
    new_context?: Object;
    /** The metadata for the dialog node. */
    new_metadata?: Object;
    /** The next step to be executed in dialog processing. */
    new_next_step?: DialogNodeNextStep;
    /** The alias used to identify the dialog node. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. - It must be no longer than 64 characters. */
    new_title?: string;
    /** How the dialog node is processed. */
    new_type?: UpdateDialogNodeConstants.NodeType | string;
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
    headers?: Object;
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
      RETURNING = 'allow_returning',
      ALL = 'allow_all',
      ALL_NEVER_RETURN = 'allow_all_never_return',
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
    /** A cacheable parameter that limits the results to those matching the specified filter. You must specify a filter query that includes a value for `language`, as well as a value for `workspace_id` or `request.context.metadata.deployment`. For more information, see the [documentation](https://console.bluemix.net/docs/services/conversation/filter-reference.html#filter-query-syntax). */
    filter: string;
    /** The attribute by which returned results will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`. */
    sort?: string;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    headers?: Object;
  }

  /** Parameters for the `listLogs` operation. */
  export interface ListLogsParams {
    /** Unique identifier of the workspace. */
    workspace_id: string;
    /** The attribute by which returned results will be sorted. To reverse the sort order, prefix the value with a minus sign (`-`). Supported values are `name`, `updated`, and `workspace_id`. */
    sort?: string;
    /** A cacheable parameter that limits the results to those matching the specified filter. For more information, see the [documentation](https://console.bluemix.net/docs/services/conversation/filter-reference.html#filter-query-syntax). */
    filter?: string;
    /** The number of records to return in each page of results. */
    page_limit?: number;
    /** A token identifying the page of results to retrieve. */
    cursor?: string;
    headers?: Object;
  }

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customer_id: string;
    headers?: Object;
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

  /** State information for the conversation. To maintain state, include the context from the previous response. */
  export interface Context {
    /** The unique identifier of the conversation. */
    conversation_id?: string;
    /** For internal use only. */
    system?: SystemResponse;
  }

  /** Counterexample. */
  export interface Counterexample {
    /** The text of the counterexample. */
    text: string;
    /** The timestamp for creation of the counterexample. */
    created?: string;
    /** The timestamp for the last update to the counterexample. */
    updated?: string;
  }

  /** CounterexampleCollection. */
  export interface CounterexampleCollection {
    /** An array of objects describing the examples marked as irrelevant input. */
    counterexamples: Counterexample[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** CreateCounterexample. */
  export interface CreateCounterexample {
    /** The text of a user input marked as irrelevant input. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters - It cannot consist of only whitespace characters - It must be no longer than 1024 characters. */
    text: string;
  }

  /** CreateDialogNode. */
  export interface CreateDialogNode {
    /** The dialog node ID. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. - It must be no longer than 1024 characters. */
    dialog_node: string;
    /** The description of the dialog node. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 128 characters. */
    description?: string;
    /** The condition that will trigger the dialog node. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 2048 characters. */
    conditions?: string;
    /** The ID of the parent dialog node. */
    parent?: string;
    /** The ID of the previous dialog node. */
    previous_sibling?: string;
    /** The output of the dialog node. For more information about how to specify dialog node output, see the [documentation](https://console.bluemix.net/docs/services/conversation/dialog-overview.html#complex). */
    output?: Object;
    /** The context for the dialog node. */
    context?: Object;
    /** The metadata for the dialog node. */
    metadata?: Object;
    /** The next step to be executed in dialog processing. */
    next_step?: DialogNodeNextStep;
    /** An array of objects describing any actions to be invoked by the dialog node. */
    actions?: DialogNodeAction[];
    /** The alias used to identify the dialog node. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, space, underscore, hyphen, and dot characters. - It must be no longer than 64 characters. */
    title?: string;
    /** How the dialog node is processed. */
    node_type?: string;
    /** How an `event_handler` node is processed. */
    event_name?: string;
    /** The location in the dialog context where output is stored. */
    variable?: string;
    /** Whether this top-level dialog node can be digressed into. */
    digress_in?: string;
    /** Whether this dialog node can be returned to after a digression. */
    digress_out?: string;
    /** Whether the user can digress to top-level nodes while filling out slots. */
    digress_out_slots?: string;
  }

  /** CreateEntity. */
  export interface CreateEntity {
    /** The name of the entity. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, and hyphen characters. - It cannot begin with the reserved prefix `sys-`. - It must be no longer than 64 characters. */
    entity: string;
    /** The description of the entity. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 128 characters. */
    description?: string;
    /** Any metadata related to the value. */
    metadata?: Object;
    /** An array of objects describing the entity values. */
    values?: CreateValue[];
    /** Whether to use fuzzy matching for the entity. */
    fuzzy_match?: boolean;
  }

  /** CreateExample. */
  export interface CreateExample {
    /** The text of a user input example. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 1024 characters. */
    text: string;
  }

  /** CreateIntent. */
  export interface CreateIntent {
    /** The name of the intent. This string must conform to the following restrictions: - It can contain only Unicode alphanumeric, underscore, hyphen, and dot characters. - It cannot begin with the reserved prefix `sys-`. - It must be no longer than 128 characters. */
    intent: string;
    /** The description of the intent. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 128 characters. */
    description?: string;
    /** An array of user input examples for the intent. */
    examples?: CreateExample[];
  }

  /** CreateValue. */
  export interface CreateValue {
    /** The text of the entity value. This string must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 64 characters. */
    value: string;
    /** Any metadata related to the entity value. */
    metadata?: Object;
    /** An array containing any synonyms for the entity value. You can provide either synonyms or patterns (as indicated by **type**), but not both. A synonym must conform to the following restrictions: - It cannot contain carriage return, newline, or tab characters. - It cannot consist of only whitespace characters. - It must be no longer than 64 characters. */
    synonyms?: string[];
    /** An array of patterns for the entity value. You can provide either synonyms or patterns (as indicated by **type**), but not both. A pattern is a regular expression no longer than 512 characters. For more information about how to specify a pattern, see the [documentation](https://console.bluemix.net/docs/services/conversation/entities.html#creating-entities). */
    patterns?: string[];
    /** Specifies the type of value. */
    value_type?: string;
  }

  /** DialogNode. */
  export interface DialogNode {
    /** The dialog node ID. */
    dialog_node_id: string;
    /** The description of the dialog node. */
    description?: string;
    /** The condition that triggers the dialog node. */
    conditions?: string;
    /** The ID of the parent dialog node. This property is not returned if the dialog node has no parent. */
    parent?: string;
    /** The ID of the previous sibling dialog node. This property is not returned if the dialog node has no previous sibling. */
    previous_sibling?: string;
    /** The output of the dialog node. */
    output?: Object;
    /** The context (if defined) for the dialog node. */
    context?: Object;
    /** Any metadata for the dialog node. */
    metadata?: Object;
    /** The next step to execute following this dialog node. */
    next_step?: DialogNodeNextStep;
    /** The timestamp for creation of the dialog node. */
    created?: string;
    /** The timestamp for the most recent update to the dialog node. */
    updated?: string;
    /** The actions for the dialog node. */
    actions?: DialogNodeAction[];
    /** The alias used to identify the dialog node. */
    title?: string;
    /** How the dialog node is processed. */
    node_type?: string;
    /** How an `event_handler` node is processed. */
    event_name?: string;
    /** The location in the dialog context where output is stored. */
    variable?: string;
    /** Whether this top-level dialog node can be digressed into. */
    digress_in?: string;
    /** Whether this dialog node can be returned to after a digression. */
    digress_out?: string;
    /** Whether the user can digress to top-level nodes while filling out slots. */
    digress_out_slots?: string;
  }

  /** DialogNodeAction. */
  export interface DialogNodeAction {
    /** The name of the action. */
    name: string;
    /** The type of action to invoke. */
    action_type?: string;
    /** A map of key/value pairs to be provided to the action. */
    parameters?: Object;
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

  /** DialogNodeVisitedDetails. */
  export interface DialogNodeVisitedDetails {
    /** A dialog node that was triggered during processing of the input message. */
    dialog_node?: string;
    /** The title of the dialog node. */
    title?: string;
    /** The conditions that trigger the dialog node. */
    conditions?: string;
  }

  /** Entity. */
  export interface Entity {
    /** The name of the entity. */
    entity_name: string;
    /** The timestamp for creation of the entity. */
    created?: string;
    /** The timestamp for the last update to the entity. */
    updated?: string;
    /** The description of the entity. */
    description?: string;
    /** Any metadata related to the entity. */
    metadata?: Object;
    /** Whether fuzzy matching is used for the entity. */
    fuzzy_match?: boolean;
  }

  /** An array of entities. */
  export interface EntityCollection {
    /** An array of objects describing the entities defined for the workspace. */
    entities: EntityExport[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** EntityExport. */
  export interface EntityExport {
    /** The name of the entity. */
    entity_name: string;
    /** The timestamp for creation of the entity. */
    created?: string;
    /** The timestamp for the last update to the entity. */
    updated?: string;
    /** The description of the entity. */
    description?: string;
    /** Any metadata related to the entity. */
    metadata?: Object;
    /** Whether fuzzy matching is used for the entity. */
    fuzzy_match?: boolean;
    /** An array objects describing the entity values. */
    values?: ValueExport[];
  }

  /** Example. */
  export interface Example {
    /** The text of the user input example. */
    example_text: string;
    /** The timestamp for creation of the example. */
    created?: string;
    /** The timestamp for the last update to the example. */
    updated?: string;
  }

  /** ExampleCollection. */
  export interface ExampleCollection {
    /** An array of objects describing the examples defined for the intent. */
    examples: Example[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** The user input. */
  export interface InputData {
    /** The text of the user input. This string cannot contain carriage return, newline, or tab characters, and it must be no longer than 2048 characters. */
    text: string;
  }

  /** Intent. */
  export interface Intent {
    /** The name of the intent. */
    intent_name: string;
    /** The timestamp for creation of the intent. */
    created?: string;
    /** The timestamp for the last update to the intent. */
    updated?: string;
    /** The description of the intent. */
    description?: string;
  }

  /** IntentCollection. */
  export interface IntentCollection {
    /** An array of objects describing the intents defined for the workspace. */
    intents: IntentExport[];
    /** The pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** IntentExport. */
  export interface IntentExport {
    /** The name of the intent. */
    intent_name: string;
    /** The timestamp for creation of the intent. */
    created?: string;
    /** The timestamp for the last update to the intent. */
    updated?: string;
    /** The description of the intent. */
    description?: string;
    /** An array of objects describing the user input examples for the intent. */
    examples?: Example[];
  }

  /** LogCollection. */
  export interface LogCollection {
    /** An array of objects describing log events. */
    logs: LogExport[];
    /** The pagination data for the returned objects. */
    pagination: LogPagination;
  }

  /** LogExport. */
  export interface LogExport {
    /** A request received by the workspace, including the user input and context. */
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

  /** The text of the user input. */
  export interface MessageInput {
    /** The user's input. */
    text?: string;
  }

  /** A request formatted for the Watson Assistant service. */
  export interface MessageRequest {
    /** An input object that includes the input text. */
    input?: InputData;
    /** Whether to return more than one intent. Set to `true` to return all matching intents. */
    alternate_intents?: boolean;
    /** State information for the conversation. Continue a conversation by including the context object from the previous response. */
    context?: Context;
    /** Entities to use when evaluating the message. Include entities from the previous response to continue using those entities rather than detecting entities in the new input. */
    entities?: RuntimeEntity[];
    /** Intents to use when evaluating the user input. Include intents from the previous response to continue using those intents rather than trying to recognize intents in the new input. */
    intents?: RuntimeIntent[];
    /** System output. Include the output from the previous response to maintain intermediate information over multiple requests. */
    output?: OutputData;
  }

  /** A response from the Watson Assistant service. */
  export interface MessageResponse {
    /** The user input from the request. */
    input?: MessageInput;
    /** An array of intents recognized in the user input, sorted in descending order of confidence. */
    intents: RuntimeIntent[];
    /** An array of entities identified in the user input. */
    entities: RuntimeEntity[];
    /** Whether to return more than one intent. A value of `true` indicates that all matching intents are returned. */
    alternate_intents?: boolean;
    /** State information for the conversation. */
    context: Context;
    /** Output from the dialog, including the response to the user, the nodes that were triggered, and log messages. */
    output: OutputData;
  }

  /** An output object that includes the response to the user, the nodes that were hit, and messages from the log. */
  export interface OutputData {
    /** An array of up to 50 messages logged with the request. */
    log_messages: LogMessage[];
    /** An array of responses to the user. */
    text: string[];
    /** An array of the nodes that were triggered to create the response, in the order in which they were visited. This information is useful for debugging and for tracing the path taken through the node tree. */
    nodes_visited?: string[];
    /** An array of objects containing detailed diagnostic information about the nodes that were triggered during processing of the input message. Included only if **nodes_visited_details** is set to `true` in the message request. */
    nodes_visited_details?: DialogNodeVisitedDetails[];
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
    metadata?: Object;
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

  /** Synonym. */
  export interface Synonym {
    /** The text of the synonym. */
    synonym_text: string;
    /** The timestamp for creation of the synonym. */
    created?: string;
    /** The timestamp for the most recent update to the synonym. */
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
  }

  /** Value. */
  export interface Value {
    /** The text of the entity value. */
    value_text: string;
    /** Any metadata related to the entity value. */
    metadata?: Object;
    /** The timestamp for creation of the entity value. */
    created?: string;
    /** The timestamp for the last update to the entity value. */
    updated?: string;
    /** An array containing any synonyms for the entity value. */
    synonyms?: string[];
    /** An array containing any patterns for the entity value. */
    patterns?: string[];
    /** Specifies the type of value. */
    value_type: string;
  }

  /** ValueCollection. */
  export interface ValueCollection {
    /** An array of entity values. */
    values: ValueExport[];
    /** An object defining the pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** ValueExport. */
  export interface ValueExport {
    /** The text of the entity value. */
    value_text: string;
    /** Any metadata related to the entity value. */
    metadata?: Object;
    /** The timestamp for creation of the entity value. */
    created?: string;
    /** The timestamp for the last update to the entity value. */
    updated?: string;
    /** An array containing any synonyms for the entity value. */
    synonyms?: string[];
    /** An array containing any patterns for the entity value. */
    patterns?: string[];
    /** Specifies the type of value. */
    value_type: string;
  }

  /** Workspace. */
  export interface Workspace {
    /** The name of the workspace. */
    name: string;
    /** The language of the workspace. */
    language: string;
    /** The timestamp for creation of the workspace. */
    created?: string;
    /** The timestamp for the last update to the workspace. */
    updated?: string;
    /** The workspace ID. */
    workspace_id: string;
    /** The description of the workspace. */
    description?: string;
    /** Any metadata related to the workspace. */
    metadata?: Object;
    /** Whether training data from the workspace (including artifacts such as intents and entities) can be used by IBM for general service improvements. `true` indicates that workspace training data is not to be used. */
    learning_opt_out?: boolean;
  }

  /** WorkspaceCollection. */
  export interface WorkspaceCollection {
    /** An array of objects describing the workspaces associated with the service instance. */
    workspaces: Workspace[];
    /** An object defining the pagination data for the returned objects. */
    pagination: Pagination;
  }

  /** WorkspaceExport. */
  export interface WorkspaceExport {
    /** The name of the workspace. */
    name: string;
    /** The description of the workspace. */
    description: string;
    /** The language of the workspace. */
    language: string;
    /** Any metadata that is required by the workspace. */
    metadata: Object;
    /** The timestamp for creation of the workspace. */
    created?: string;
    /** The timestamp for the last update to the workspace. */
    updated?: string;
    /** The workspace ID. */
    workspace_id: string;
    /** The current status of the workspace. */
    status: string;
    /** Whether training data from the workspace can be used by IBM for general service improvements. `true` indicates that workspace training data is not to be used. */
    learning_opt_out: boolean;
    /** An array of intents. */
    intents?: IntentExport[];
    /** An array of entities. */
    entities?: EntityExport[];
    /** An array of counterexamples. */
    counterexamples?: Counterexample[];
    /** An array of objects describing the dialog nodes in the workspace. */
    dialog_nodes?: DialogNode[];
  }

}

export = AssistantV1;
