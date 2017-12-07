"use strict";
/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
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
var pick = require("object.pick");
var omit = require("object.omit");
var isStream = require("isstream");
var requestwrapper_1 = require("../lib/requestwrapper");
var base_service_1 = require("../lib/base_service");
var DialogV1 = /** @class */ (function (_super) {
    __extends(DialogV1, _super);
    function DialogV1(options) {
        var _this = _super.call(this, options) || this;
        if (!options['silent']) {
            // eslint-disable-next-line no-console
            console.warn('WARNING: The Dialog service was deprecated. Existing instances of ' +
                'the service stopped functioning on August 9, 2017.' +
                'For information about the Conversation service that is replacing Dialog, ' +
                'see https://console.bluemix.net/docs/services/conversation/index.html#about. ' +
                ' Set {silent: true} to disable this message.');
        }
        return _this;
    }
    /**
     * Retrieves the values for profile constiables for specific client ID
     * @param  {Object}   params   { client_id: '', dialog_id: '', name:''}
     */
    DialogV1.prototype.getProfile = function (params, callback) {
        var _params = params || {};
        var parameters = {
            options: {
                url: '/v1/dialogs/{dialog_id}/profile',
                method: 'GET',
                json: true,
                path: _params,
                qs: pick(_params, ['client_id', 'name'])
            },
            requiredParams: ['dialog_id', 'client_id'],
            defaultOptions: this._options
        };
        return requestwrapper_1.createRequest(parameters, callback);
    };
    /**
     * Sets the values for profile variables
     * @param  {Object}   params   { client_id: '', dialog_id: '', name_values:''}
     */
    DialogV1.prototype.updateProfile = function (params, callback) {
        var _params = params || {};
        var parameters = {
            options: {
                url: '/v1/dialogs/{dialog_id}/profile',
                method: 'PUT',
                json: true,
                body: pick(_params, ['name_values', 'client_id']),
                path: params
            },
            requiredParams: ['dialog_id', 'name_values'],
            defaultOptions: this._options
        };
        return requestwrapper_1.createRequest(parameters, callback);
    };
    /**
     * Returns a chat session data dump for a given date.
     * @param  {Object}   params   { client_id: '', dialog_id: '', name_values:''}
     */
    DialogV1.prototype.getConversation = function (params, callback) {
        var _params = params || {};
        var parameters = {
            options: {
                url: '/v1/dialogs/{dialog_id}/conversation',
                method: 'GET',
                json: true,
                qs: omit(_params, ['dialog_id']),
                path: _params
            },
            requiredParams: ['dialog_id', 'date_from', 'date_to'],
            defaultOptions: this._options
        };
        return requestwrapper_1.createRequest(parameters, callback);
    };
    /**
     * Returns a response for a submitted input message.
     * Also used to start new conversations.
     * @param  {Object}   params   { client_id: '', dialog_id: '' }
     */
    DialogV1.prototype.conversation = function (params, callback) {
        var _params = params || {};
        var parameters = {
            options: {
                url: '/v1/dialogs/{dialog_id}/conversation',
                method: 'POST',
                json: true,
                form: omit(_params, ['dialog_id']),
                path: _params
            },
            requiredParams: ['dialog_id'],
            defaultOptions: this._options
        };
        return requestwrapper_1.createRequest(parameters, callback);
    };
    /**
     * Updates content for specified nodes.
     * @param  {Object}   params   { dialog_id: '' }
     */
    DialogV1.prototype.updateContent = function (params, callback) {
        var _params = params || {};
        var parameters = {
            options: {
                url: '/v1/dialogs/{dialog_id}/content',
                method: 'PUT',
                json: true,
                path: _params
            },
            requiredParams: ['dialog_id'],
            defaultOptions: extend(true, {}, this._options, pick(_params, ['headers']))
        };
        return requestwrapper_1.createRequest(parameters, callback);
    };
    /**
     * Gets content for nodes.
     * @param  {Object}   params   { dialog_id: '' }
     */
    DialogV1.prototype.getContent = function (params, callback) {
        var _params = params || {};
        var parameters = {
            options: {
                url: '/v1/dialogs/{dialog_id}/content',
                method: 'GET',
                json: true,
                path: _params
            },
            requiredParams: ['dialog_id'],
            defaultOptions: this._options
        };
        return requestwrapper_1.createRequest(parameters, callback);
    };
    /**
     * Create a dialog based on a file and name
     * @param  {Object}   params   { name: '', file:'' }
     */
    DialogV1.prototype.createDialog = function (params, callback) {
        var _params = params || {};
        if (!_params['file']) {
            callback(new Error('Missing required parameters: file'));
            return;
        }
        if (!isStream(_params['file'])) {
            callback(new Error('file is not a standard Node.js Stream'));
            return;
        }
        var parameters = {
            options: {
                url: '/v1/dialogs',
                method: 'POST',
                json: true,
                formData: pick(_params, ['name', 'file'])
            },
            requiredParams: ['name'],
            defaultOptions: this._options
        };
        return requestwrapper_1.createRequest(parameters, callback);
    };
    /**
     * Returns the dialogs associated with a service instance
     */
    DialogV1.prototype.getDialogs = function (params, callback) {
        var parameters = {
            options: {
                url: '/v1/dialogs',
                method: 'GET',
                json: true
            },
            defaultOptions: this._options
        };
        return requestwrapper_1.createRequest(parameters, callback);
    };
    /**
     * Delete a dialog and removes all associated data
     */
    DialogV1.prototype.deleteDialog = function (params, callback) {
        var parameters = {
            options: {
                url: '/v1/dialogs/{dialog_id}',
                method: 'DELETE',
                json: true,
                path: params
            },
            requiredParams: ['dialog_id'],
            defaultOptions: this._options
        };
        return requestwrapper_1.createRequest(parameters, callback);
    };
    /**
     * Update a dialog with a new dialog file
     * @param  {Object}   params   { dialog_id: '' }
     */
    DialogV1.prototype.updateDialog = function (params, callback) {
        var _params = params || {};
        if (!_params['file']) {
            callback(new Error('Missing required parameters: file'));
            return;
        }
        if (!isStream(_params['file'])) {
            callback(new Error('file is not a standard Node.js Stream'));
            return;
        }
        var parameters = {
            options: {
                url: '/v1/dialogs/{dialog_id}',
                method: 'PUT',
                json: true,
                path: _params,
                formData: omit(_params, ['dialog_id'])
            },
            requiredParams: ['dialog_id'],
            defaultOptions: this._options
        };
        return requestwrapper_1.createRequest(parameters, callback);
    };
    DialogV1.URL = 'https://gateway.watsonplatform.net/dialog/api';
    return DialogV1;
}(base_service_1.BaseService));
DialogV1.prototype.name = 'dialog';
DialogV1.prototype.version = 'v1';
module.exports = DialogV1;
//# sourceMappingURL=v1.js.map