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

'use strict';

var extend         = require('extend');
var requestFactory = require('../../lib/requestwrapper');
var pick           = require('object.pick');
var omit           = require('object.omit');
var isStream       = require('isstream');

function Dialog(options) {
  // Default URL
  var serviceDefaults = {
    url: 'https://gateway.watsonplatform.net/dialog/api'
  };

  // Replace default options with user provided
  this._options = extend(serviceDefaults, options);
}

/**
 * Retreives the values for profile variables for specific client ID
 * @param  Object   params   { client_id: '', dialog_id: '', name:''}
 */
Dialog.prototype.getProfile = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/dialogs/{dialog_id}/profile',
      method: 'GET',
      json: true,
      path: params,
      qs: pick(params, ['client_id'])
    },
    requiredParams: ['dialog_id', 'client_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Sets the values for profile variables
 * @param  Object   params   { client_id: '', dialog_id: '', name_values:''}
 */
Dialog.prototype.updateProfile = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/dialogs/{dialog_id}/profile',
      method: 'PUT',
      json: true,
      body: pick(params, ['name_values']),
      qs: pick(params, ['client_id']),
      path: params
    },
    requiredParams: ['dialog_id', 'name_values'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns a chat session data dump for a given date.
 * @param  Object   params   { client_id: '', dialog_id: '', name_values:''}
 */
Dialog.prototype.getConversation = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/dialogs/{dialog_id}/conversation',
      method: 'GET',
      json: true,
      qs: omit(params, ['dialog_id']),
      path: params
    },
    requiredParams: ['dialog_id', 'date_from', 'date_to'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns a response for a submitted input message.
 * Also used to start new conversations.
 * @param  Object   params   { client_id: '', dialog_id: '' }
 */
Dialog.prototype.conversation = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/dialogs/{dialog_id}/conversation',
      method: 'POST',
      json: true,
      form: omit(params, ['dialog_id']),
      path: params
    },
    requiredParams: ['dialog_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Updates content for specified nodes.
 * @param  Object   params   { dialog_id: '' }
 */
Dialog.prototype.updateContent = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/dialogs/{dialog_id}/content',
      method: 'PUT',
      json: true,
      path: params
    },
    requiredParams: ['dialog_id'],
    defaultOptions: extend(this._options, pick(params, ['headers']))
  };
  return requestFactory(parameters, callback);
};

/**
 * Gets content for nodes.
 * @param  Object   params   { dialog_id: '' }
 */
Dialog.prototype.getContent = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/dialogs/{dialog_id}/content',
      method: 'GET',
      json: true,
      path: params
    },
    requiredParams: ['dialog_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Create a dialog based on a file and name
 * @param  Object   params   { name: '', file:'' }
 */
Dialog.prototype.createDialog = function(params, callback) {
  params = params || {};

  if (!params.file) {
    callback(new Error('Missing required parameters: file'));
    return;
  }

  if (!isStream(params.file)) {
    callback(new Error('file is not a standard Node.js Stream'));
    return;
  }

  var parameters = {
    options: {
      url: '/v1/dialogs',
      method: 'POST',
      json: true,
      formData: pick(params,['name','file'])
    },
    requiredParams: ['name'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns the dialogs associated with a service instance
 */
Dialog.prototype.getDialogs = function(params, callback) {
  var parameters = {
    options: {
      url: '/v1/dialogs',
      method: 'GET',
      json: true
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete a dialog and removes all associated data
 */
Dialog.prototype.deleteDialog = function(params, callback) {
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
  return requestFactory(parameters, callback);
};

/**
 * Update a dialog with a new dialog file
 * @param  Object   params   { dialog_id: '' }
 */
Dialog.prototype.updateDialog = function(params, callback) {
  params = params || {};

  if (!params.file) {
    callback(new Error('Missing required parameters: file'));
    return;
  }

  if (!isStream(params.file)) {
    callback(new Error('file is not a standard Node.js Stream'));
    return;
  }

  var parameters = {
    options: {
      url: '/v1/dialogs/{dialog_id}',
      method: 'PUT',
      json: true,
      path: params,
      formData: omit(params, ['dialog_id']),
    },
    requiredParams: ['dialog_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = Dialog;
