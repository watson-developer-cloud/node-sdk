/**
 * Copyright 2017 IBM All Rights Reserved.
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
import { createRequest } from '../lib/requestwrapper';
import { getMissingParams } from '../lib/helper';
import { BaseService } from '../lib/base_service';

/**
 * The IBM Watson Conversation service combines machine learning, natural language understanding, and integrated dialog tools to create conversation flows between your apps and your users.
 */

class ConversationV1 extends BaseService {

  name: string; // set by prototype to 'conversation'
  version: string; // set by prototype to 'v1'

  static VERSION_DATE_2017_05_26: string = '2017-05-26';

  static VERSION_DATE_2017_04_21: string = '2017-04-21';

  static VERSION_DATE_2017_02_03: string = '2017-02-03';

  static VERSION_DATE_2016_09_20: string = '2016-09-20';

  static VERSION_DATE_2016_07_11: string = '2016-07-11';

  static URL: string = 'https://gateway.watsonplatform.net/conversation/api';

  /**
   * Construct a ConversationV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {String} options.version_date - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/conversation/api'). The base url may differ between Bluemix regions.
   * @param {String} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {String} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {ConversationV1}
   * @throws {Error}
   */
  constructor(options: ConversationV1.Options) {
    super(options);
    // check if 'version_date' was provided
    if (typeof this._options.version_date === 'undefined') {
      throw new Error('Argument error: version_date was not specified, use ConversationV1.VERSION_DATE_2017_05_26');
    }
    this._options.qs.version = options.version_date;
  }

  /*************************
   * counterexamples
   ************************/

  /**
   * Create counterexample.
   *
   * Add a new counterexample to a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.text - The text of a user input marked as irrelevant input.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createCounterexample(params: ConversationV1.CreateCounterexampleParams, callback?: ConversationV1.Callback<ConversationV1.Counterexample>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      text: _params.text
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Delete counterexample.
   *
   * Delete a counterexample from a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteCounterexample(params: ConversationV1.DeleteCounterexampleParams, callback?: ConversationV1.Callback<ConversationV1.Empty>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      text: _params.text
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Get counterexample.
   *
   * Get information about a counterexample. Counterexamples are examples that have been marked as irrelevant input.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getCounterexample(params: ConversationV1.GetCounterexampleParams, callback?: ConversationV1.Callback<ConversationV1.Counterexample>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      text: _params.text
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * List counterexamples.
   *
   * List the counterexamples for a workspace. Counterexamples are examples that have been marked as irrelevant input.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
   * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listCounterexamples(params: ConversationV1.ListCounterexamplesParams, callback?: ConversationV1.Callback<ConversationV1.CounterexampleCollection>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      page_limit: _params.page_limit,
      include_count: _params.include_count,
      sort: _params.sort,
      cursor: _params.cursor
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Update counterexample.
   *
   * Update the text of a counterexample. Counterexamples are examples that have been marked as irrelevant input.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
   * @param {string} [params.new_text] - The text of the example to be marked as irrelevant input.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateCounterexample(params: ConversationV1.UpdateCounterexampleParams, callback?: ConversationV1.Callback<ConversationV1.Counterexample>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      text: _params.new_text
    };
    const path = { 
      workspace_id: _params.workspace_id,
      text: _params.text
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /*************************
   * dialogNodes
   ************************/

  /**
   * Create dialog node.
   *
   * Create a dialog node.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.dialog_node - The dialog node ID.
   * @param {string} [params.description] - The description of the dialog node.
   * @param {string} [params.conditions] - The condition that will trigger the dialog node.
   * @param {string} [params.parent] - The ID of the parent dialog node (if any).
   * @param {string} [params.previous_sibling] - The previous dialog node.
   * @param {Object} [params.output] - The output of the dialog node.
   * @param {Object} [params.context] - The context for the dialog node.
   * @param {Object} [params.metadata] - The metadata for the dialog node.
   * @param {DialogNodeNextStep} [params.next_step] - The next step to execute following this dialog node.
   * @param {DialogNodeAction[]} [params.actions] - The actions for the dialog node.
   * @param {string} [params.title] - The alias used to identify the dialog node.
   * @param {string} [params.node_type] - How the dialog node is processed.
   * @param {string} [params.event_name] - How an `event_handler` node is processed.
   * @param {string} [params.variable] - The location in the dialog context where output is stored.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createDialogNode(params: ConversationV1.CreateDialogNodeParams, callback?: ConversationV1.Callback<ConversationV1.DialogNode>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'dialog_node'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      dialog_node: _params.dialog_node,
      description: _params.description,
      conditions: _params.conditions,
      parent: _params.parent,
      previous_sibling: _params.previous_sibling,
      output: _params.output,
      context: _params.context,
      metadata: _params.metadata,
      next_step: _params.next_step,
      actions: _params.actions,
      title: _params.title,
      type: _params.node_type,
      event_name: _params.event_name,
      variable: _params.variable
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Delete dialog node.
   *
   * Delete a dialog node from the workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.dialog_node - The dialog node ID (for example, `get_order`).
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteDialogNode(params: ConversationV1.DeleteDialogNodeParams, callback?: ConversationV1.Callback<ConversationV1.Empty>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'dialog_node'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      dialog_node: _params.dialog_node
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Get dialog node.
   *
   * Get information about a dialog node.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.dialog_node - The dialog node ID (for example, `get_order`).
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getDialogNode(params: ConversationV1.GetDialogNodeParams, callback?: ConversationV1.Callback<ConversationV1.DialogNode>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'dialog_node'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      dialog_node: _params.dialog_node
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * List dialog nodes.
   *
   * List the dialog nodes in the workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
   * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listDialogNodes(params: ConversationV1.ListDialogNodesParams, callback?: ConversationV1.Callback<ConversationV1.DialogNodeCollection>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      page_limit: _params.page_limit,
      include_count: _params.include_count,
      sort: _params.sort,
      cursor: _params.cursor
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Update dialog node.
   *
   * Update information for a dialog node.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.dialog_node - The dialog node ID (for example, `get_order`).
   * @param {string} params.new_dialog_node - The dialog node ID.
   * @param {string} [params.new_description] - The description of the dialog node.
   * @param {string} [params.new_conditions] - The condition that will trigger the dialog node.
   * @param {string} [params.new_parent] - The ID of the parent dialog node (if any).
   * @param {string} [params.new_previous_sibling] - The previous dialog node.
   * @param {Object} [params.new_output] - The output of the dialog node.
   * @param {Object} [params.new_context] - The context for the dialog node.
   * @param {Object} [params.new_metadata] - The metadata for the dialog node.
   * @param {DialogNodeNextStep} [params.new_next_step] - The next step to execute following this dialog node.
   * @param {string} [params.new_title] - The alias used to identify the dialog node.
   * @param {string} [params.new_type] - How the node is processed.
   * @param {string} [params.new_event_name] - How an `event_handler` node is processed.
   * @param {string} [params.new_variable] - The location in the dialog context where output is stored.
   * @param {DialogNodeAction[]} [params.new_actions] - The actions for the dialog node.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateDialogNode(params: ConversationV1.UpdateDialogNodeParams, callback?: ConversationV1.Callback<ConversationV1.DialogNode>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'dialog_node', 'new_dialog_node'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      dialog_node: _params.new_dialog_node,
      description: _params.new_description,
      conditions: _params.new_conditions,
      parent: _params.new_parent,
      previous_sibling: _params.new_previous_sibling,
      output: _params.new_output,
      context: _params.new_context,
      metadata: _params.new_metadata,
      next_step: _params.new_next_step,
      title: _params.new_title,
      type: _params.new_type,
      event_name: _params.new_event_name,
      variable: _params.new_variable,
      actions: _params.new_actions
    };
    const path = { 
      workspace_id: _params.workspace_id,
      dialog_node: _params.dialog_node
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /*************************
   * entities
   ************************/

  /**
   * Create entity.
   *
   * Create a new entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} [params.description] - The description of the entity.
   * @param {Object} [params.metadata] - Any metadata related to the value.
   * @param {CreateValue[]} [params.values] - An array of entity values.
   * @param {boolean} [params.fuzzy_match] - Whether to use fuzzy matching for the entity.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createEntity(params: ConversationV1.CreateEntityParams, callback?: ConversationV1.Callback<ConversationV1.Entity>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      entity: _params.entity,
      description: _params.description,
      metadata: _params.metadata,
      values: _params.values,
      fuzzy_match: _params.fuzzy_match
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Delete entity.
   *
   * Delete an entity from a workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteEntity(params: ConversationV1.DeleteEntityParams, callback?: ConversationV1.Callback<ConversationV1.Empty>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Get entity.
   *
   * Get information about an entity, optionally including all entity content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getEntity(params: ConversationV1.GetEntityParams, callback?: ConversationV1.Callback<ConversationV1.EntityExport>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      export: _params.export
    };
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * List entities.
   *
   * List the entities for a workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
   * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
   * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listEntities(params: ConversationV1.ListEntitiesParams, callback?: ConversationV1.Callback<ConversationV1.EntityCollection>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      export: _params.export,
      page_limit: _params.page_limit,
      include_count: _params.include_count,
      sort: _params.sort,
      cursor: _params.cursor
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Update entity.
   *
   * Update an existing entity with new or modified data.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} [params.new_entity] - The name of the entity.
   * @param {string} [params.new_description] - The description of the entity.
   * @param {Object} [params.new_metadata] - Any metadata related to the entity.
   * @param {boolean} [params.new_fuzzy_match] - Whether to use fuzzy matching for the entity.
   * @param {CreateValue[]} [params.new_values] - An array of entity values.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateEntity(params: ConversationV1.UpdateEntityParams, callback?: ConversationV1.Callback<ConversationV1.Entity>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      entity: _params.new_entity,
      description: _params.new_description,
      metadata: _params.new_metadata,
      fuzzy_match: _params.new_fuzzy_match,
      values: _params.new_values
    };
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /*************************
   * examples
   ************************/

  /**
   * Create user input example.
   *
   * Add a new user input example to an intent.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.intent - The intent name (for example, `pizza_order`).
   * @param {string} params.text - The text of a user input example.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createExample(params: ConversationV1.CreateExampleParams, callback?: ConversationV1.Callback<ConversationV1.Example>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'intent', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      text: _params.text
    };
    const path = { 
      workspace_id: _params.workspace_id,
      intent: _params.intent
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Delete user input example.
   *
   * Delete a user input example from an intent.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.intent - The intent name (for example, `pizza_order`).
   * @param {string} params.text - The text of the user input example.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteExample(params: ConversationV1.DeleteExampleParams, callback?: ConversationV1.Callback<ConversationV1.Empty>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'intent', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      intent: _params.intent,
      text: _params.text
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Get user input example.
   *
   * Get information about a user input example.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.intent - The intent name (for example, `pizza_order`).
   * @param {string} params.text - The text of the user input example.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getExample(params: ConversationV1.GetExampleParams, callback?: ConversationV1.Callback<ConversationV1.Example>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'intent', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      intent: _params.intent,
      text: _params.text
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * List user input examples.
   *
   * List the user input examples for an intent.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.intent - The intent name (for example, `pizza_order`).
   * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
   * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listExamples(params: ConversationV1.ListExamplesParams, callback?: ConversationV1.Callback<ConversationV1.ExampleCollection>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'intent'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      page_limit: _params.page_limit,
      include_count: _params.include_count,
      sort: _params.sort,
      cursor: _params.cursor
    };
    const path = { 
      workspace_id: _params.workspace_id,
      intent: _params.intent
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Update user input example.
   *
   * Update the text of a user input example.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.intent - The intent name (for example, `pizza_order`).
   * @param {string} params.text - The text of the user input example.
   * @param {string} [params.new_text] - The text of the user input example.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateExample(params: ConversationV1.UpdateExampleParams, callback?: ConversationV1.Callback<ConversationV1.Example>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'intent', 'text'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      text: _params.new_text
    };
    const path = { 
      workspace_id: _params.workspace_id,
      intent: _params.intent,
      text: _params.text
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /*************************
   * intents
   ************************/

  /**
   * Create intent.
   *
   * Create a new intent.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.intent - The name of the intent.
   * @param {string} [params.description] - The description of the intent.
   * @param {CreateExample[]} [params.examples] - An array of user input examples.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createIntent(params: ConversationV1.CreateIntentParams, callback?: ConversationV1.Callback<ConversationV1.Intent>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'intent'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      intent: _params.intent,
      description: _params.description,
      examples: _params.examples
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Delete intent.
   *
   * Delete an intent from a workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.intent - The intent name (for example, `pizza_order`).
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteIntent(params: ConversationV1.DeleteIntentParams, callback?: ConversationV1.Callback<ConversationV1.Empty>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'intent'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      intent: _params.intent
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Get intent.
   *
   * Get information about an intent, optionally including all intent content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.intent - The intent name (for example, `pizza_order`).
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getIntent(params: ConversationV1.GetIntentParams, callback?: ConversationV1.Callback<ConversationV1.IntentExport>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'intent'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      export: _params.export
    };
    const path = { 
      workspace_id: _params.workspace_id,
      intent: _params.intent
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * List intents.
   *
   * List the intents for a workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
   * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
   * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listIntents(params: ConversationV1.ListIntentsParams, callback?: ConversationV1.Callback<ConversationV1.IntentCollection>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      export: _params.export,
      page_limit: _params.page_limit,
      include_count: _params.include_count,
      sort: _params.sort,
      cursor: _params.cursor
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Update intent.
   *
   * Update an existing intent with new or modified data. You must provide data defining the content of the updated intent.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.intent - The intent name (for example, `pizza_order`).
   * @param {string} [params.new_intent] - The name of the intent.
   * @param {string} [params.new_description] - The description of the intent.
   * @param {CreateExample[]} [params.new_examples] - An array of user input examples for the intent.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateIntent(params: ConversationV1.UpdateIntentParams, callback?: ConversationV1.Callback<ConversationV1.Intent>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'intent'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      intent: _params.new_intent,
      description: _params.new_description,
      examples: _params.new_examples
    };
    const path = { 
      workspace_id: _params.workspace_id,
      intent: _params.intent
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/intents/{intent}',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /*************************
   * logs
   ************************/

  /**
   * List log events in a workspace.
   *
   * List log events in a specific workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
   * @param {string} [params.filter] - A cacheable parameter that limits the results to those matching the specified filter. For more information, see the [documentation](https://console.bluemix.net/docs/services/conversation/filter-reference.html#filter-query-syntax).
   * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
   * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listLogs(params: ConversationV1.ListLogsParams, callback?: ConversationV1.Callback<ConversationV1.LogCollection>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      sort: _params.sort,
      filter: _params.filter,
      page_limit: _params.page_limit,
      cursor: _params.cursor
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/logs',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /*************************
   * message
   ************************/

  /**
   * Get a response to a user's input.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - Unique identifier of the workspace.
   * @param {InputData} [params.input] - An input object that includes the input text.
   * @param {boolean} [params.alternate_intents] - Whether to return more than one intent. Set to `true` to return all matching intents.
   * @param {Context} [params.context] - State information for the conversation. Continue a conversation by including the context object from the previous response.
   * @param {RuntimeEntity[]} [params.entities] - Include the entities from the previous response when they do not need to change and to prevent Watson from trying to identify them.
   * @param {RuntimeIntent[]} [params.intents] - An array of name-confidence pairs for the user input. Include the intents from the previous response when they do not need to change and to prevent Watson from trying to identify them.
   * @param {OutputData} [params.output] - System output. Include the output from the request when you have several requests within the same Dialog turn to pass back in the intermediate information.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  message(params: ConversationV1.MessageParams, callback?: ConversationV1.Callback<ConversationV1.MessageResponse>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      input: _params.input,
      alternate_intents: _params.alternate_intents,
      context: _params.context,
      entities: _params.entities,
      intents: _params.intents,
      output: _params.output
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/message',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /*************************
   * synonyms
   ************************/

  /**
   * Add entity value synonym.
   *
   * Add a new synonym to an entity value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createSynonym(params: ConversationV1.CreateSynonymParams, callback?: ConversationV1.Callback<ConversationV1.Synonym>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      synonym: _params.synonym
    };
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity,
      value: _params.value
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Delete entity value synonym.
   *
   * Delete a synonym for an entity value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteSynonym(params: ConversationV1.DeleteSynonymParams, callback?: ConversationV1.Callback<ConversationV1.Empty>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity,
      value: _params.value,
      synonym: _params.synonym
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Get entity value synonym.
   *
   * Get information about a synonym for an entity value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getSynonym(params: ConversationV1.GetSynonymParams, callback?: ConversationV1.Callback<ConversationV1.Synonym>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity,
      value: _params.value,
      synonym: _params.synonym
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * List entity value synonyms.
   *
   * List the synonyms for an entity value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
   * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listSynonyms(params: ConversationV1.ListSynonymsParams, callback?: ConversationV1.Callback<ConversationV1.SynonymCollection>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity', 'value'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      page_limit: _params.page_limit,
      include_count: _params.include_count,
      sort: _params.sort,
      cursor: _params.cursor
    };
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity,
      value: _params.value
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Update entity value synonym.
   *
   * Update the information about a synonym for an entity value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} params.synonym - The text of the synonym.
   * @param {string} [params.new_synonym] - The text of the synonym.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateSynonym(params: ConversationV1.UpdateSynonymParams, callback?: ConversationV1.Callback<ConversationV1.Synonym>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      synonym: _params.new_synonym
    };
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity,
      value: _params.value,
      synonym: _params.synonym
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /*************************
   * values
   ************************/

  /**
   * Add entity value.
   *
   * Create a new value for an entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {Object} [params.metadata] - Any metadata related to the entity value.
   * @param {string[]} [params.synonyms] - An array of synonyms for the entity value.
   * @param {string[]} [params.patterns] - An array of patterns for the entity value. A pattern is specified as a regular expression.
   * @param {string} [params.value_type] - Specifies the type of value (`synonyms` or `patterns`). The default value is `synonyms`.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createValue(params: ConversationV1.CreateValueParams, callback?: ConversationV1.Callback<ConversationV1.Value>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity', 'value'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      value: _params.value,
      metadata: _params.metadata,
      synonyms: _params.synonyms,
      patterns: _params.patterns,
      type: _params.value_type
    };
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Delete entity value.
   *
   * Delete a value for an entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteValue(params: ConversationV1.DeleteValueParams, callback?: ConversationV1.Callback<ConversationV1.Empty>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity', 'value'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity,
      value: _params.value
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Get entity value.
   *
   * Get information about an entity value.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getValue(params: ConversationV1.GetValueParams, callback?: ConversationV1.Callback<ConversationV1.ValueExport>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity', 'value'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      export: _params.export
    };
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity,
      value: _params.value
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * List entity values.
   *
   * List the values for an entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
   * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
   * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listValues(params: ConversationV1.ListValuesParams, callback?: ConversationV1.Callback<ConversationV1.ValueCollection>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      export: _params.export,
      page_limit: _params.page_limit,
      include_count: _params.include_count,
      sort: _params.sort,
      cursor: _params.cursor
    };
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Update entity value.
   *
   * Update the content of a value for an entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} params.entity - The name of the entity.
   * @param {string} params.value - The text of the entity value.
   * @param {string} [params.new_value] - The text of the entity value.
   * @param {Object} [params.new_metadata] - Any metadata related to the entity value.
   * @param {string} [params.new_type] - Specifies the type of value (`synonyms` or `patterns`). The default value is `synonyms`.
   * @param {string[]} [params.new_synonyms] - An array of synonyms for the entity value.
   * @param {string[]} [params.new_patterns] - An array of patterns for the entity value. A pattern is specified as a regular expression.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateValue(params: ConversationV1.UpdateValueParams, callback?: ConversationV1.Callback<ConversationV1.Value>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id', 'entity', 'value'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      value: _params.new_value,
      metadata: _params.new_metadata,
      type: _params.new_type,
      synonyms: _params.new_synonyms,
      patterns: _params.new_patterns
    };
    const path = { 
      workspace_id: _params.workspace_id,
      entity: _params.entity,
      value: _params.value
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /*************************
   * workspaces
   ************************/

  /**
   * Create workspace.
   *
   * Create a workspace based on component objects. You must provide workspace components defining the content of the new workspace.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - The name of the workspace.
   * @param {string} [params.description] - The description of the workspace.
   * @param {string} [params.language] - The language of the workspace.
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects defining the entities for the workspace.
   * @param {CreateDialogNode[]} [params.dialog_nodes] - An array of objects defining the nodes in the workspace dialog.
   * @param {CreateCounterexample[]} [params.counterexamples] - An array of objects defining input examples that have been marked as irrelevant input.
   * @param {Object} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learning_opt_out] - Whether training data from the workspace can be used by IBM for general service improvements. `true` indicates that workspace training data is not to be used.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createWorkspace(params?: ConversationV1.CreateWorkspaceParams, callback?: ConversationV1.Callback<ConversationV1.Workspace>): ReadableStream | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : (callback) ? callback : () => {};
    const body = { 
      name: _params.name,
      description: _params.description,
      language: _params.language,
      intents: _params.intents,
      entities: _params.entities,
      dialog_nodes: _params.dialog_nodes,
      counterexamples: _params.counterexamples,
      metadata: _params.metadata,
      learning_opt_out: _params.learning_opt_out
    };
    const parameters = {
      options: {
        url: '/v1/workspaces',
        method: 'POST',
        json: true,
        body: body,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Delete workspace.
   *
   * Delete a workspace from the service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteWorkspace(params: ConversationV1.DeleteWorkspaceParams, callback?: ConversationV1.Callback<ConversationV1.Empty>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Get information about a workspace.
   *
   * Get information about a workspace, optionally including all workspace content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getWorkspace(params: ConversationV1.GetWorkspaceParams, callback?: ConversationV1.Callback<ConversationV1.WorkspaceExport>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = { 
      export: _params.export
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * List workspaces.
   *
   * List the workspaces associated with a Conversation service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
   * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
   * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
   * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listWorkspaces(params?: ConversationV1.ListWorkspacesParams, callback?: ConversationV1.Callback<ConversationV1.WorkspaceCollection>): ReadableStream | void {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : (callback) ? callback : () => {};
    const query = { 
      page_limit: _params.page_limit,
      include_count: _params.include_count,
      sort: _params.sort,
      cursor: _params.cursor
    };
    const parameters = {
      options: {
        url: '/v1/workspaces',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

  /**
   * Update workspace.
   *
   * Update an existing workspace with new or modified data. You must provide component objects defining the content of the updated workspace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.workspace_id - The workspace ID.
   * @param {string} [params.name] - The name of the workspace.
   * @param {string} [params.description] - The description of the workspace.
   * @param {string} [params.language] - The language of the workspace.
   * @param {CreateIntent[]} [params.intents] - An array of objects defining the intents for the workspace.
   * @param {CreateEntity[]} [params.entities] - An array of objects defining the entities for the workspace.
   * @param {CreateDialogNode[]} [params.dialog_nodes] - An array of objects defining the nodes in the workspace dialog.
   * @param {CreateCounterexample[]} [params.counterexamples] - An array of objects defining input examples that have been marked as irrelevant input.
   * @param {Object} [params.metadata] - Any metadata related to the workspace.
   * @param {boolean} [params.learning_opt_out] - Whether training data from the workspace can be used by IBM for general service improvements. `true` indicates that workspace training data is not to be used.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateWorkspace(params: ConversationV1.UpdateWorkspaceParams, callback?: ConversationV1.Callback<ConversationV1.Workspace>): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = (callback) ? callback : () => {};
    const requiredParams = ['workspace_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = { 
      name: _params.name,
      description: _params.description,
      language: _params.language,
      intents: _params.intents,
      entities: _params.entities,
      dialog_nodes: _params.dialog_nodes,
      counterexamples: _params.counterexamples,
      metadata: _params.metadata,
      learning_opt_out: _params.learning_opt_out
    };
    const path = { 
      workspace_id: _params.workspace_id
    };
    const parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return createRequest(parameters, _callback);
  };

}

ConversationV1.prototype.name = 'conversation';
ConversationV1.prototype.version = 'v1';

/*************************
 * interfaces
 ************************/

namespace ConversationV1 {

  export interface Empty { }

  export type Callback<T> = (error: any, body?: T, response?: RequestResponse) => void;

  export type Options = {
    version_date: string;
    url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  }

  /*************************
   * request interfaces
   ************************/

  export interface CreateCounterexampleParams {
    workspace_id: string;
    text: string;
  }

  export interface DeleteCounterexampleParams {
    workspace_id: string;
    text: string;
  }

  export interface GetCounterexampleParams {
    workspace_id: string;
    text: string;
  }

  export interface ListCounterexamplesParams {
    workspace_id: string;
    page_limit?: number;
    include_count?: boolean;
    sort?: string;
    cursor?: string;
  }

  export interface UpdateCounterexampleParams {
    workspace_id: string;
    text: string;
    new_text?: string;
  }

  export interface CreateDialogNodeParams {
    workspace_id: string;
    dialog_node: string;
    description?: string;
    conditions?: string;
    parent?: string;
    previous_sibling?: string;
    output?: Object;
    context?: Object;
    metadata?: Object;
    next_step?: DialogNodeNextStep;
    actions?: DialogNodeAction[];
    title?: string;
    node_type?: CreateDialogNodeConstants.NodeType | string;
    event_name?: CreateDialogNodeConstants.EventName | string;
    variable?: string;
  }

  export namespace CreateDialogNodeConstants {
    export enum NodeType {
      STANDARD = 'standard',
      EVENT_HANDLER = 'event_handler',
      FRAME = 'frame',
      SLOT = 'slot',
      RESPONSE_CONDITION = 'response_condition',
    }
    export enum EventName {
      FOCUS = 'focus',
      INPUT = 'input',
      FILLED = 'filled',
      VALIDATE = 'validate',
      FILLED_MULTIPLE = 'filled_multiple',
      GENERIC = 'generic',
      NOMATCH = 'nomatch',
      NOMATCH_RESPONSES_DEPLETED = 'nomatch_responses_depleted',
    }
  }

  export interface DeleteDialogNodeParams {
    workspace_id: string;
    dialog_node: string;
  }

  export interface GetDialogNodeParams {
    workspace_id: string;
    dialog_node: string;
  }

  export interface ListDialogNodesParams {
    workspace_id: string;
    page_limit?: number;
    include_count?: boolean;
    sort?: string;
    cursor?: string;
  }

  export interface UpdateDialogNodeParams {
    workspace_id: string;
    dialog_node: string;
    new_dialog_node: string;
    new_description?: string;
    new_conditions?: string;
    new_parent?: string;
    new_previous_sibling?: string;
    new_output?: Object;
    new_context?: Object;
    new_metadata?: Object;
    new_next_step?: DialogNodeNextStep;
    new_title?: string;
    new_type?: UpdateDialogNodeConstants.NodeType | string;
    new_event_name?: UpdateDialogNodeConstants.EventName | string;
    new_variable?: string;
    new_actions?: DialogNodeAction[];
  }

  export namespace UpdateDialogNodeConstants {
    export enum NodeType {
      STANDARD = 'standard',
      EVENT_HANDLER = 'event_handler',
      FRAME = 'frame',
      SLOT = 'slot',
      RESPONSE_CONDITION = 'response_condition',
    }
    export enum EventName {
      FOCUS = 'focus',
      INPUT = 'input',
      FILLED = 'filled',
      VALIDATE = 'validate',
      FILLED_MULTIPLE = 'filled_multiple',
      GENERIC = 'generic',
      NOMATCH = 'nomatch',
      NOMATCH_RESPONSES_DEPLETED = 'nomatch_responses_depleted',
    }
  }

  export interface CreateEntityParams {
    workspace_id: string;
    entity: string;
    description?: string;
    metadata?: Object;
    values?: CreateValue[];
    fuzzy_match?: boolean;
  }

  export interface DeleteEntityParams {
    workspace_id: string;
    entity: string;
  }

  export interface GetEntityParams {
    workspace_id: string;
    entity: string;
    export?: boolean;
  }

  export interface ListEntitiesParams {
    workspace_id: string;
    export?: boolean;
    page_limit?: number;
    include_count?: boolean;
    sort?: string;
    cursor?: string;
  }

  export interface UpdateEntityParams {
    workspace_id: string;
    entity: string;
    new_entity?: string;
    new_description?: string;
    new_metadata?: Object;
    new_fuzzy_match?: boolean;
    new_values?: CreateValue[];
  }

  export interface CreateExampleParams {
    workspace_id: string;
    intent: string;
    text: string;
  }

  export interface DeleteExampleParams {
    workspace_id: string;
    intent: string;
    text: string;
  }

  export interface GetExampleParams {
    workspace_id: string;
    intent: string;
    text: string;
  }

  export interface ListExamplesParams {
    workspace_id: string;
    intent: string;
    page_limit?: number;
    include_count?: boolean;
    sort?: string;
    cursor?: string;
  }

  export interface UpdateExampleParams {
    workspace_id: string;
    intent: string;
    text: string;
    new_text?: string;
  }

  export interface CreateIntentParams {
    workspace_id: string;
    intent: string;
    description?: string;
    examples?: CreateExample[];
  }

  export interface DeleteIntentParams {
    workspace_id: string;
    intent: string;
  }

  export interface GetIntentParams {
    workspace_id: string;
    intent: string;
    export?: boolean;
  }

  export interface ListIntentsParams {
    workspace_id: string;
    export?: boolean;
    page_limit?: number;
    include_count?: boolean;
    sort?: string;
    cursor?: string;
  }

  export interface UpdateIntentParams {
    workspace_id: string;
    intent: string;
    new_intent?: string;
    new_description?: string;
    new_examples?: CreateExample[];
  }

  export interface ListLogsParams {
    workspace_id: string;
    sort?: string;
    filter?: string;
    page_limit?: number;
    cursor?: string;
  }

  export interface MessageParams {
    workspace_id: string;
    input?: InputData;
    alternate_intents?: boolean;
    context?: Context;
    entities?: RuntimeEntity[];
    intents?: RuntimeIntent[];
    output?: OutputData;
  }

  export interface CreateSynonymParams {
    workspace_id: string;
    entity: string;
    value: string;
    synonym: string;
  }

  export interface DeleteSynonymParams {
    workspace_id: string;
    entity: string;
    value: string;
    synonym: string;
  }

  export interface GetSynonymParams {
    workspace_id: string;
    entity: string;
    value: string;
    synonym: string;
  }

  export interface ListSynonymsParams {
    workspace_id: string;
    entity: string;
    value: string;
    page_limit?: number;
    include_count?: boolean;
    sort?: string;
    cursor?: string;
  }

  export interface UpdateSynonymParams {
    workspace_id: string;
    entity: string;
    value: string;
    synonym: string;
    new_synonym?: string;
  }

  export interface CreateValueParams {
    workspace_id: string;
    entity: string;
    value: string;
    metadata?: Object;
    synonyms?: string[];
    patterns?: string[];
    value_type?: CreateValueConstants.ValueType | string;
  }

  export namespace CreateValueConstants {
    export enum ValueType {
      SYNONYMS = 'synonyms',
      PATTERNS = 'patterns',
    }
  }

  export interface DeleteValueParams {
    workspace_id: string;
    entity: string;
    value: string;
  }

  export interface GetValueParams {
    workspace_id: string;
    entity: string;
    value: string;
    export?: boolean;
  }

  export interface ListValuesParams {
    workspace_id: string;
    entity: string;
    export?: boolean;
    page_limit?: number;
    include_count?: boolean;
    sort?: string;
    cursor?: string;
  }

  export interface UpdateValueParams {
    workspace_id: string;
    entity: string;
    value: string;
    new_value?: string;
    new_metadata?: Object;
    new_type?: UpdateValueConstants.ValueType | string;
    new_synonyms?: string[];
    new_patterns?: string[];
  }

  export namespace UpdateValueConstants {
    export enum ValueType {
      SYNONYMS = 'synonyms',
      PATTERNS = 'patterns',
    }
  }

  export interface CreateWorkspaceParams {
    name?: string;
    description?: string;
    language?: string;
    intents?: CreateIntent[];
    entities?: CreateEntity[];
    dialog_nodes?: CreateDialogNode[];
    counterexamples?: CreateCounterexample[];
    metadata?: Object;
    learning_opt_out?: boolean;
  }

  export interface DeleteWorkspaceParams {
    workspace_id: string;
  }

  export interface GetWorkspaceParams {
    workspace_id: string;
    export?: boolean;
  }

  export interface ListWorkspacesParams {
    page_limit?: number;
    include_count?: boolean;
    sort?: string;
    cursor?: string;
  }

  export interface UpdateWorkspaceParams {
    workspace_id: string;
    name?: string;
    description?: string;
    language?: string;
    intents?: CreateIntent[];
    entities?: CreateEntity[];
    dialog_nodes?: CreateDialogNode[];
    counterexamples?: CreateCounterexample[];
    metadata?: Object;
    learning_opt_out?: boolean;
  }

  /*************************
   * model interfaces
   ************************/

  export interface Context {
    conversation_id: string;
    system: SystemResponse;
  }

  export interface Counterexample {
    text: string;
    created: string;
    updated: string;
  }

  export interface CounterexampleCollection {
    counterexamples: Counterexample[];
    pagination: Pagination;
  }

  export interface CreateCounterexample {
    text: string;
  }

  export interface CreateDialogNode {
    dialog_node: string;
    description?: string;
    conditions?: string;
    parent?: string;
    previous_sibling?: string;
    output?: Object;
    context?: Object;
    metadata?: Object;
    next_step?: DialogNodeNextStep;
    actions?: DialogNodeAction[];
    title?: string;
    node_type?: string;
    event_name?: string;
    variable?: string;
  }

  export interface CreateEntity {
    entity: string;
    description?: string;
    metadata?: Object;
    values?: CreateValue[];
    fuzzy_match?: boolean;
  }

  export interface CreateExample {
    text: string;
  }

  export interface CreateIntent {
    intent: string;
    description?: string;
    examples?: CreateExample[];
  }

  export interface CreateValue {
    value: string;
    metadata?: Object;
    synonyms?: string[];
    patterns?: string[];
    value_type?: string;
  }

  export interface DialogNode {
    dialog_node_id: string;
    description: string;
    conditions: string;
    parent: string;
    previous_sibling: string;
    output: Object;
    context: Object;
    metadata: Object;
    next_step: DialogNodeNextStep;
    created: string;
    updated?: string;
    actions?: DialogNodeAction[];
    title: string;
    node_type?: string;
    event_name?: string;
    variable?: string;
  }

  export interface DialogNodeAction {
    name: string;
    action_type?: string;
    parameters?: Object;
    result_variable: string;
    credentials?: string;
  }

  export interface DialogNodeCollection {
    dialog_nodes: DialogNode[];
    pagination: Pagination;
  }

  export interface DialogNodeNextStep {
    behavior: string;
    dialog_node?: string;
    selector?: string;
  }

  export interface Entity {
    entity_name: string;
    created: string;
    updated: string;
    description?: string;
    metadata?: Object;
    fuzzy_match?: boolean;
  }

  export interface EntityCollection {
    entities: EntityExport[];
    pagination: Pagination;
  }

  export interface Example {
    example_text: string;
    created: string;
    updated: string;
  }

  export interface ExampleCollection {
    examples: Example[];
    pagination: Pagination;
  }

  export interface InputData {
    text: string;
  }

  export interface Intent {
    intent_name: string;
    created: string;
    updated: string;
    description?: string;
  }

  export interface IntentCollection {
    intents: IntentExport[];
    pagination: Pagination;
  }

  export interface LogCollection {
    logs: LogExport[];
    pagination: LogPagination;
  }

  export interface LogMessage {
    level: string;
    msg: string;
  }

  export interface LogPagination {
    next_url?: string;
    matched?: number;
  }

  export interface MessageInput {
    text?: string;
  }

  export interface MessageRequest {
    input?: InputData;
    alternate_intents?: boolean;
    context?: Context;
    entities?: RuntimeEntity[];
    intents?: RuntimeIntent[];
    output?: OutputData;
  }

  export interface OutputData {
    log_messages: LogMessage[];
    text: string[];
    nodes_visited?: string[];
  }

  export interface Pagination {
    refresh_url: string;
    next_url?: string;
    total?: number;
    matched?: number;
  }

  export interface RuntimeEntity {
    entity: string;
    location: number[];
    value: string;
    confidence?: number;
    metadata?: Object;
  }

  export interface RuntimeIntent {
    intent: string;
    confidence: number;
  }

  export interface Synonym {
    synonym_text: string;
    created: string;
    updated: string;
  }

  export interface SynonymCollection {
    synonyms: Synonym[];
    pagination: Pagination;
  }

  export interface SystemResponse {
  }

  export interface Value {
    value_text: string;
    metadata?: Object;
    created: string;
    updated: string;
    synonyms?: string[];
    patterns?: string[];
    value_type: string;
  }

  export interface ValueCollection {
    values: ValueExport[];
    pagination: Pagination;
  }

  export interface Workspace {
    name: string;
    language: string;
    created: string;
    updated: string;
    workspace_id: string;
    description?: string;
    metadata?: Object;
    learning_opt_out?: boolean;
  }

  export interface WorkspaceCollection {
    workspaces: Workspace[];
    pagination: Pagination;
  }

  export interface EntityExport {
    entity_name: string;
    created: string;
    updated: string;
    description?: string;
    metadata?: Object;
    fuzzy_match?: boolean;
    values?: ValueExport[];
  }

  export interface IntentExport {
    intent_name: string;
    created: string;
    updated: string;
    description?: string;
    examples?: Example[];
  }

  export interface LogExport {
    request: MessageRequest;
    response: MessageResponse;
    log_id: string;
    request_timestamp: string;
    response_timestamp: string;
    workspace_id: string;
    language: string;
  }

  export interface MessageResponse {
    input?: MessageInput;
    intents: RuntimeIntent[];
    entities: RuntimeEntity[];
    alternate_intents?: boolean;
    context: Context;
    output: OutputData;
  }

  export interface ValueExport {
    value_text: string;
    metadata?: Object;
    created: string;
    updated: string;
    synonyms?: string[];
    patterns?: string[];
    value_type: string;
  }

  export interface WorkspaceExport {
    name: string;
    description: string;
    language: string;
    metadata: Object;
    created: string;
    updated: string;
    workspace_id: string;
    status: string;
    learning_opt_out: boolean;
    intents?: IntentExport[];
    entities?: EntityExport[];
    counterexamples?: Counterexample[];
    dialog_nodes?: DialogNode[];
  }

}

export = ConversationV1;
