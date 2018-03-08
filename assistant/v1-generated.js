"use strict";
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var extend = require("extend");
var base_service_1 = require("../lib/base_service");
var helper_1 = require("../lib/helper");
var requestwrapper_1 = require("../lib/requestwrapper");
/**
 * The IBM Watson Assistant service combines machine learning, natural language understanding, and integrated dialog tools to create conversation flows between your apps and your users.
 */
var AssistantV1 = /** @class */ (function (_super) {
    __extends(AssistantV1, _super);
    /**
     * Construct a AssistantV1 object.
     *
     * @param {Object} options - Options for the service.
     * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
     * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/conversation/api'). The base url may differ between Bluemix regions.
     * @param {string} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
     * @param {string} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
     * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
     * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
     * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
     * @constructor
     * @returns {AssistantV1}
     * @throws {Error}
     */
    function AssistantV1(options) {
        var _this = _super.call(this, options) || this;
        // check if 'version' was provided
        if (typeof _this._options.version === 'undefined') {
            throw new Error('Argument error: version was not specified');
        }
        _this._options.qs.version = options.version;
        return _this;
    }
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.createWorkspace = function (params, callback) {
        var _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
        var _callback = (typeof params === 'function' && !callback) ? params : (callback) ? callback : function () { };
        var body = {
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
        var parameters = {
            options: {
                url: '/v1/workspaces',
                method: 'POST',
                json: true,
                body: body,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Delete workspace.
     *
     * Delete a workspace from the service instance.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.deleteWorkspace = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Get information about a workspace.
     *
     * Get information about a workspace, optionally including all workspace content.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.getWorkspace = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'export': _params.export,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * List workspaces.
     *
     * List the workspaces associated with an Assistant service instance.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
     * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
     * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
     * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.listWorkspaces = function (params, callback) {
        var _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
        var _callback = (typeof params === 'function' && !callback) ? params : (callback) ? callback : function () { };
        var query = {
            'page_limit': _params.page_limit,
            'include_count': _params.include_count,
            'sort': _params.sort,
            'cursor': _params.cursor,
            'include_audit': _params.include_audit
        };
        var parameters = {
            options: {
                url: '/v1/workspaces',
                method: 'GET',
                qs: query,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.append] - Specifies that the elements included in the request body are to be appended to the existing data in the workspace. The default value is `false`.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.updateWorkspace = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
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
        var query = {
            'append': _params.append
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}',
                method: 'POST',
                json: true,
                body: body,
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.nodes_visited_details] - Whether to include additional diagnostic information about the dialog nodes that were visited during processing of the message.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.message = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'input': _params.input,
            'alternate_intents': _params.alternate_intents,
            'context': _params.context,
            'entities': _params.entities,
            'intents': _params.intents,
            'output': _params.output
        };
        var query = {
            'nodes_visited_details': _params.nodes_visited_details
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/message',
                method: 'POST',
                json: true,
                body: body,
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.createIntent = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'intent'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'intent': _params.intent,
            'description': _params.description,
            'examples': _params.examples
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/intents',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Delete intent.
     *
     * Delete an intent from a workspace.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {string} params.intent - The intent name (for example, `pizza_order`).
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.deleteIntent = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'intent'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var path = {
            'workspace_id': _params.workspace_id,
            'intent': _params.intent
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/intents/{intent}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Get intent.
     *
     * Get information about an intent, optionally including all intent content.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {string} params.intent - The intent name (for example, `pizza_order`).
     * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.getIntent = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'intent'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'export': _params.export,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'intent': _params.intent
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/intents/{intent}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.listIntents = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'export': _params.export,
            'page_limit': _params.page_limit,
            'include_count': _params.include_count,
            'sort': _params.sort,
            'cursor': _params.cursor,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/intents',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.updateIntent = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'intent'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'intent': _params.new_intent,
            'description': _params.new_description,
            'examples': _params.new_examples
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'intent': _params.intent
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/intents/{intent}',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.createExample = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'intent', 'text'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'text': _params.text
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'intent': _params.intent
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.deleteExample = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'intent', 'text'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var path = {
            'workspace_id': _params.workspace_id,
            'intent': _params.intent,
            'text': _params.text
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Get user input example.
     *
     * Get information about a user input example.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {string} params.intent - The intent name (for example, `pizza_order`).
     * @param {string} params.text - The text of the user input example.
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.getExample = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'intent', 'text'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'intent': _params.intent,
            'text': _params.text
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.listExamples = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'intent'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'page_limit': _params.page_limit,
            'include_count': _params.include_count,
            'sort': _params.sort,
            'cursor': _params.cursor,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'intent': _params.intent
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.updateExample = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'intent', 'text'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'text': _params.new_text
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'intent': _params.intent,
            'text': _params.text
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.createEntity = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'entity': _params.entity,
            'description': _params.description,
            'metadata': _params.metadata,
            'values': _params.values,
            'fuzzy_match': _params.fuzzy_match
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Delete entity.
     *
     * Delete an entity from a workspace.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {string} params.entity - The name of the entity.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.deleteEntity = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Get entity.
     *
     * Get information about an entity, optionally including all entity content.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {string} params.entity - The name of the entity.
     * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.getEntity = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'export': _params.export,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.listEntities = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'export': _params.export,
            'page_limit': _params.page_limit,
            'include_count': _params.include_count,
            'sort': _params.sort,
            'cursor': _params.cursor,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.updateEntity = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'entity': _params.new_entity,
            'description': _params.new_description,
            'metadata': _params.new_metadata,
            'fuzzy_match': _params.new_fuzzy_match,
            'values': _params.new_values
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.createValue = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity', 'value'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'value': _params.value,
            'metadata': _params.metadata,
            'synonyms': _params.synonyms,
            'patterns': _params.patterns,
            'type': _params.value_type
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.deleteValue = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity', 'value'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity,
            'value': _params.value
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.getValue = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity', 'value'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'export': _params.export,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity,
            'value': _params.value
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.listValues = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'export': _params.export,
            'page_limit': _params.page_limit,
            'include_count': _params.include_count,
            'sort': _params.sort,
            'cursor': _params.cursor,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.updateValue = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity', 'value'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'value': _params.new_value,
            'metadata': _params.new_metadata,
            'type': _params.new_type,
            'synonyms': _params.new_synonyms,
            'patterns': _params.new_patterns
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity,
            'value': _params.value
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.createSynonym = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'synonym': _params.synonym
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity,
            'value': _params.value
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.deleteSynonym = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity,
            'value': _params.value,
            'synonym': _params.synonym
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.getSynonym = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity,
            'value': _params.value,
            'synonym': _params.synonym
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.listSynonyms = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity', 'value'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'page_limit': _params.page_limit,
            'include_count': _params.include_count,
            'sort': _params.sort,
            'cursor': _params.cursor,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity,
            'value': _params.value
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.updateSynonym = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'synonym': _params.new_synonym
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'entity': _params.entity,
            'value': _params.value,
            'synonym': _params.synonym
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.createDialogNode = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'dialog_node'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
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
            'variable': _params.variable
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/dialog_nodes',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Delete dialog node.
     *
     * Delete a dialog node from the workspace.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {string} params.dialog_node - The dialog node ID (for example, `get_order`).
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.deleteDialogNode = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'dialog_node'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var path = {
            'workspace_id': _params.workspace_id,
            'dialog_node': _params.dialog_node
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Get dialog node.
     *
     * Get information about a dialog node.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {string} params.dialog_node - The dialog node ID (for example, `get_order`).
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.getDialogNode = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'dialog_node'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'dialog_node': _params.dialog_node
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.listDialogNodes = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'page_limit': _params.page_limit,
            'include_count': _params.include_count,
            'sort': _params.sort,
            'cursor': _params.cursor,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/dialog_nodes',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Update dialog node.
     *
     * Update information for a dialog node.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {string} params.dialog_node - The dialog node ID (for example, `get_order`).
     * @param {string} [params.new_dialog_node] - The dialog node ID.
     * @param {string} [params.new_description] - The description of the dialog node.
     * @param {string} [params.new_conditions] - The condition that will trigger the dialog node.
     * @param {string} [params.new_parent] - The ID of the parent dialog node (if any).
     * @param {string} [params.new_previous_sibling] - The previous dialog node.
     * @param {Object} [params.new_output] - The output of the dialog node.
     * @param {Object} [params.new_context] - The context for the dialog node.
     * @param {Object} [params.new_metadata] - The metadata for the dialog node.
     * @param {DialogNodeNextStep} [params.new_next_step] - The next step to execute following this dialog node.
     * @param {string} [params.new_title] - The alias used to identify the dialog node.
     * @param {string} [params.new_type] - How the dialog node is processed.
     * @param {string} [params.new_event_name] - How an `event_handler` node is processed.
     * @param {string} [params.new_variable] - The location in the dialog context where output is stored.
     * @param {DialogNodeAction[]} [params.new_actions] - The actions for the dialog node.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.updateDialogNode = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'dialog_node'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
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
            'actions': _params.new_actions
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'dialog_node': _params.dialog_node
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /*************************
     * logs
     ************************/
    /**
     * List log events in all workspaces.
     *
     * List log events in all workspaces in the service instance.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.filter - A cacheable parameter that limits the results to those matching the specified filter. You must specify a filter query that includes a value for `language`, as well as a value for `workspace_id` or `request.context.metadata.deployment`. For more information, see the [documentation](https://console.bluemix.net/docs/services/conversation/filter-reference.html#filter-query-syntax).
     * @param {string} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
     * @param {number} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
     * @param {string} [params.cursor] - A token identifying the last value from the previous page of results.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.listAllLogs = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['filter'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'filter': _params.filter,
            'sort': _params.sort,
            'page_limit': _params.page_limit,
            'cursor': _params.cursor
        };
        var parameters = {
            options: {
                url: '/v1/logs',
                method: 'GET',
                qs: query,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.listLogs = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'sort': _params.sort,
            'filter': _params.filter,
            'page_limit': _params.page_limit,
            'cursor': _params.cursor
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/logs',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.createCounterexample = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'text'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'text': _params.text
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/counterexamples',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Delete counterexample.
     *
     * Delete a counterexample from a workspace. Counterexamples are examples that have been marked as irrelevant input.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.deleteCounterexample = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'text'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var path = {
            'workspace_id': _params.workspace_id,
            'text': _params.text
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    /**
     * Get counterexample.
     *
     * Get information about a counterexample. Counterexamples are examples that have been marked as irrelevant input.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.workspace_id - The workspace ID.
     * @param {string} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.getCounterexample = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'text'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'text': _params.text
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @param {boolean} [params.include_audit] - Whether to include the audit properties (`created` and `updated` timestamps) in the response.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.listCounterexamples = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var query = {
            'page_limit': _params.page_limit,
            'include_count': _params.include_count,
            'sort': _params.sort,
            'cursor': _params.cursor,
            'include_audit': _params.include_audit
        };
        var path = {
            'workspace_id': _params.workspace_id
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/counterexamples',
                method: 'GET',
                qs: query,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
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
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV1.prototype.updateCounterexample = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['workspace_id', 'text'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'text': _params.new_text
        };
        var path = {
            'workspace_id': _params.workspace_id,
            'text': _params.text
        };
        var parameters = {
            options: {
                url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
                method: 'POST',
                json: true,
                body: body,
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    ;
    AssistantV1.URL = 'https://gateway.watsonplatform.net/assistant/api';
    return AssistantV1;
}(base_service_1.BaseService));
AssistantV1.prototype.name = 'conversation';
AssistantV1.prototype.serviceVersion = 'v1';
/*************************
 * interfaces
 ************************/
(function (AssistantV1) {
    /** Constants for the `createValue` operation. */
    var CreateValueConstants;
    (function (CreateValueConstants) {
        /** Specifies the type of value (`synonyms` or `patterns`). The default value is `synonyms`. */
        var ValueType;
        (function (ValueType) {
            ValueType["SYNONYMS"] = "synonyms";
            ValueType["PATTERNS"] = "patterns";
        })(ValueType = CreateValueConstants.ValueType || (CreateValueConstants.ValueType = {}));
    })(CreateValueConstants = AssistantV1.CreateValueConstants || (AssistantV1.CreateValueConstants = {}));
    /** Constants for the `updateValue` operation. */
    var UpdateValueConstants;
    (function (UpdateValueConstants) {
        /** Specifies the type of value (`synonyms` or `patterns`). The default value is `synonyms`. */
        var ValueType;
        (function (ValueType) {
            ValueType["SYNONYMS"] = "synonyms";
            ValueType["PATTERNS"] = "patterns";
        })(ValueType = UpdateValueConstants.ValueType || (UpdateValueConstants.ValueType = {}));
    })(UpdateValueConstants = AssistantV1.UpdateValueConstants || (AssistantV1.UpdateValueConstants = {}));
    /** Constants for the `createDialogNode` operation. */
    var CreateDialogNodeConstants;
    (function (CreateDialogNodeConstants) {
        /** How the dialog node is processed. */
        var NodeType;
        (function (NodeType) {
            NodeType["STANDARD"] = "standard";
            NodeType["EVENT_HANDLER"] = "event_handler";
            NodeType["FRAME"] = "frame";
            NodeType["SLOT"] = "slot";
            NodeType["RESPONSE_CONDITION"] = "response_condition";
        })(NodeType = CreateDialogNodeConstants.NodeType || (CreateDialogNodeConstants.NodeType = {}));
        /** How an `event_handler` node is processed. */
        var EventName;
        (function (EventName) {
            EventName["FOCUS"] = "focus";
            EventName["INPUT"] = "input";
            EventName["FILLED"] = "filled";
            EventName["VALIDATE"] = "validate";
            EventName["FILLED_MULTIPLE"] = "filled_multiple";
            EventName["GENERIC"] = "generic";
            EventName["NOMATCH"] = "nomatch";
            EventName["NOMATCH_RESPONSES_DEPLETED"] = "nomatch_responses_depleted";
        })(EventName = CreateDialogNodeConstants.EventName || (CreateDialogNodeConstants.EventName = {}));
    })(CreateDialogNodeConstants = AssistantV1.CreateDialogNodeConstants || (AssistantV1.CreateDialogNodeConstants = {}));
    /** Constants for the `updateDialogNode` operation. */
    var UpdateDialogNodeConstants;
    (function (UpdateDialogNodeConstants) {
        /** How the dialog node is processed. */
        var NodeType;
        (function (NodeType) {
            NodeType["STANDARD"] = "standard";
            NodeType["EVENT_HANDLER"] = "event_handler";
            NodeType["FRAME"] = "frame";
            NodeType["SLOT"] = "slot";
            NodeType["RESPONSE_CONDITION"] = "response_condition";
        })(NodeType = UpdateDialogNodeConstants.NodeType || (UpdateDialogNodeConstants.NodeType = {}));
        /** How an `event_handler` node is processed. */
        var EventName;
        (function (EventName) {
            EventName["FOCUS"] = "focus";
            EventName["INPUT"] = "input";
            EventName["FILLED"] = "filled";
            EventName["VALIDATE"] = "validate";
            EventName["FILLED_MULTIPLE"] = "filled_multiple";
            EventName["GENERIC"] = "generic";
            EventName["NOMATCH"] = "nomatch";
            EventName["NOMATCH_RESPONSES_DEPLETED"] = "nomatch_responses_depleted";
        })(EventName = UpdateDialogNodeConstants.EventName || (UpdateDialogNodeConstants.EventName = {}));
    })(UpdateDialogNodeConstants = AssistantV1.UpdateDialogNodeConstants || (AssistantV1.UpdateDialogNodeConstants = {}));
})(AssistantV1 || (AssistantV1 = {}));
module.exports = AssistantV1;
//# sourceMappingURL=v1-generated.js.map