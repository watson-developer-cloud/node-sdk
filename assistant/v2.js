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
/**
 * The IBM Watson&trade; Assistant service combines machine learning, natural language understanding, and integrated dialog tools to create conversation flows between your apps and your users.
 */
var AssistantV2 = /** @class */ (function (_super) {
    __extends(AssistantV2, _super);
    /**
     * Construct a AssistantV2 object.
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
     * @returns {AssistantV2}
     * @throws {Error}
     */
    function AssistantV2(options) {
        var _this = _super.call(this, options) || this;
        // check if 'version' was provided
        if (typeof _this._options.version === 'undefined') {
            throw new Error('Argument error: version was not specified');
        }
        _this._options.qs.version = options.version;
        return _this;
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
     * @param {string} params.assistant_id - Unique identifier of the assistant. You can find the assistant ID of an
     * assistant on the **Assistants** tab of the Watson Assistant tool. For information about creating assistants, see
     * the [documentation](https://console.bluemix.net/docs/services/assistant/create-assistant.html#creating-assistants).
     *
     * **Note:** Currently, the v2 API does not support creating assistants.
     * @param {Object} [params.headers] - Custom request headers
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV2.prototype.createSession = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['assistant_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var path = {
            'assistant_id': _params.assistant_id
        };
        var parameters = {
            options: {
                url: '/v2/assistants/{assistant_id}/sessions',
                method: 'POST',
                path: path,
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
    ;
    /**
     * Delete session.
     *
     * Deletes a session explicitly before it times out.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.assistant_id - Unique identifier of the assistant. You can find the assistant ID of an
     * assistant on the **Assistants** tab of the Watson Assistant tool. For information about creating assistants, see
     * the [documentation](https://console.bluemix.net/docs/services/assistant/create-assistant.html#creating-assistants).
     *
     * **Note:** Currently, the v2 API does not support creating assistants.
     * @param {string} params.session_id - Unique identifier of the session.
     * @param {Object} [params.headers] - Custom request headers
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV2.prototype.deleteSession = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['assistant_id', 'session_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var path = {
            'assistant_id': _params.assistant_id,
            'session_id': _params.session_id
        };
        var parameters = {
            options: {
                url: '/v2/assistants/{assistant_id}/sessions/{session_id}',
                method: 'DELETE',
                path: path,
            },
            defaultOptions: extend(true, {}, this._options, {
                headers: extend(true, {
                    'Accept': 'application/json',
                }, _params.headers),
            }),
        };
        return this.createRequest(parameters, _callback);
    };
    ;
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
     * @param {string} params.assistant_id - Unique identifier of the assistant. You can find the assistant ID of an
     * assistant on the **Assistants** tab of the Watson Assistant tool. For information about creating assistants, see
     * the [documentation](https://console.bluemix.net/docs/services/assistant/create-assistant.html#creating-assistants).
     *
     * **Note:** Currently, the v2 API does not support creating assistants.
     * @param {string} params.session_id - Unique identifier of the session.
     * @param {MessageInput} [params.input] - An input object that includes the input text.
     * @param {MessageContext} [params.context] - State information for the conversation.
     * @param {Object} [params.headers] - Custom request headers
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {NodeJS.ReadableStream|void}
     */
    AssistantV2.prototype.message = function (params, callback) {
        var _params = extend({}, params);
        var _callback = (callback) ? callback : function () { };
        var requiredParams = ['assistant_id', 'session_id'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = {
            'input': _params.input,
            'context': _params.context
        };
        var path = {
            'assistant_id': _params.assistant_id,
            'session_id': _params.session_id
        };
        var parameters = {
            options: {
                url: '/v2/assistants/{assistant_id}/sessions/{session_id}/message',
                method: 'POST',
                json: true,
                body: body,
                path: path,
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
    ;
    AssistantV2.URL = 'https://gateway.watsonplatform.net/assistant/api';
    return AssistantV2;
}(base_service_1.BaseService));
AssistantV2.prototype.name = 'conversation';
AssistantV2.prototype.serviceVersion = 'v2';
module.exports = AssistantV2;
//# sourceMappingURL=v2.js.map