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

import extend = require('extend');
import pick = require('object.pick');
import omit = require('object.omit');
import isStream = require('isstream');
import { RequestResponse } from 'request';
import { createRequest } from '../lib/requestwrapper';
import { BaseService } from '../lib/base_service';
import { FileObject } from '../lib/helper';

class DialogV1 extends BaseService {
  static URL: string = 'https://gateway.watsonplatform.net/dialog/api';
  
  /**
   * Construct a DialogV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version_date - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {string} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/conversation/api'). The base url may differ between Bluemix regions.
   * @param {string} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {string} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {DialogV1}
   * @throws {Error}
   */
  constructor(options: DialogV1.Options) {
    super(options);
    if (!options['silent']) {
      // eslint-disable-next-line no-console
      console.warn(
        'WARNING: The Dialog service was deprecated. Existing instances of ' +
          'the service stopped functioning on August 9, 2017.' +
          'For information about the Conversation service that is replacing Dialog, ' +
          'see https://console.bluemix.net/docs/services/conversation/index.html#about. ' +
          ' Set {silent: true} to disable this message.'
      );
    }
  }

  /**
   * Retrieves the values for profile constiables for specific client ID
   * @param  {Object}   params   { client_id: '', dialog_id: '', name:''}
   */
  getProfile(
    params: DialogV1.GetProfileParams,
    callback: DialogV1.Callback
  ): ReadableStream | void {
    const _params = params || {};
    const parameters = {
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
    return createRequest(parameters, callback);
  }

  /**
   * Sets the values for profile variables
   * @param  {Object}   params   { client_id: '', dialog_id: '', name_values:''}
   */
  updateProfile(
    params: DialogV1.UpdateProfileParams,
    callback: DialogV1.Callback
  ): ReadableStream | void {
    const _params = params || {};
    const parameters = {
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
    return createRequest(parameters, callback);
  }

  /**
   * Returns a chat session data dump for a given date.
   * @param  {Object}   params   { client_id: '', dialog_id: '', name_values:''}
   */
  getConversation(
    params: DialogV1.GetConversationParams,
    callback: DialogV1.Callback
  ): ReadableStream | void {
    const _params = params || {};
    const parameters = {
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
    return createRequest(parameters, callback);
  }

  /**
   * Returns a response for a submitted input message.
   * Also used to start new conversations.
   * @param  {Object}   params   { client_id: '', dialog_id: '' }
   */
  conversation(
    params: DialogV1.ConversationParams,
    callback: DialogV1.Callback
  ): ReadableStream | void {
    const _params = params || {};
    const parameters = {
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
    return createRequest(parameters, callback);
  }

  /**
   * Updates content for specified nodes.
   * @param  {Object}   params   { dialog_id: '' }
   */
  updateContent(
    params: DialogV1.UpdateContentParams,
    callback: DialogV1.Callback
  ): ReadableStream | void {
    const _params = params || {};
    const parameters = {
      options: {
        url: '/v1/dialogs/{dialog_id}/content',
        method: 'PUT',
        json: true,
        path: _params
      },
      requiredParams: ['dialog_id'],
      defaultOptions: extend(
        true,
        {},
        this._options,
        pick(_params, ['headers'])
      )
    };
    return createRequest(parameters, callback);
  }

  /**
   * Gets content for nodes.
   * @param  {Object}   params   { dialog_id: '' }
   */
  getContent(
    params: DialogV1.GetContentParams,
    callback: DialogV1.Callback
  ): ReadableStream | void {
    const _params = params || {};
    const parameters = {
      options: {
        url: '/v1/dialogs/{dialog_id}/content',
        method: 'GET',
        json: true,
        path: _params
      },
      requiredParams: ['dialog_id'],
      defaultOptions: this._options
    };
    return createRequest(parameters, callback);
  }

  /**
   * Create a dialog based on a file and name
   * @param  {Object}   params   { name: '', file:'' }
   */
  createDialog(
    params: DialogV1.CreateDialogParams,
    callback: DialogV1.Callback
  ): ReadableStream | void {
    const _params = params || {};
    if (!_params['file']) {
      callback(new Error('Missing required parameters: file'));
      return;
    }
    if (!isStream(_params['file'])) {
      callback(new Error('file is not a standard Node.js Stream'));
      return;
    }
    const parameters = {
      options: {
        url: '/v1/dialogs',
        method: 'POST',
        json: true,
        formData: pick(_params, ['name', 'file'])
      },
      requiredParams: ['name'],
      defaultOptions: this._options
    };
    return createRequest(parameters, callback);
  }

  /**
   * Returns the dialogs associated with a service instance
   */
  getDialogs(
    params: DialogV1.GetDialogsParams,
    callback: DialogV1.Callback
  ): ReadableStream | void {
    const parameters = {
      options: {
        url: '/v1/dialogs',
        method: 'GET',
        json: true
      },
      defaultOptions: this._options
    };
    return createRequest(parameters, callback);
  }

  /**
   * Delete a dialog and removes all associated data
   */
  deleteDialog(
    params: DialogV1.DeleteDialogParams,
    callback: DialogV1.Callback
  ): ReadableStream | void {
    const parameters = {
      options: {
        url: '/v1/dialogs/{dialog_id}',
        method: 'DELETE',
        json: true,
        path: params
      },
      requiredParams: ['dialog_id'],
      defaultOptions: this._options
    };
    return createRequest(parameters, callback);
  }

  /**
   * Update a dialog with a new dialog file
   * @param  {Object}   params   { dialog_id: '' }
   */
  updateDialog(
    params: DialogV1.UpdateDialogParams,
    callback: DialogV1.Callback
  ): ReadableStream | void {
    const _params = params || {};
    if (!_params['file']) {
      callback(new Error('Missing required parameters: file'));
      return;
    }
    if (!isStream(_params['file'])) {
      callback(new Error('file is not a standard Node.js Stream'));
      return;
    }
    const parameters = {
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
    return createRequest(parameters, callback);
  }
}

DialogV1.prototype.name = 'dialog';
DialogV1.prototype.version = 'v1';

namespace DialogV1 {
  /** Options for the `DialogV1` constructor. **/
  export type Options = {
    url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  };

  /** The callback for a service request. **/
  export type Callback = (
    error: any,
    body?: any,
    response?: RequestResponse
  ) => void;

  export interface UpdateDialogParams {
    /** The dialog template identifier. **/
    dialog_id: string;
    /** The dialog template file. Valid file extensions are .mct for encrypeed dialog files, .json and .xml. **/
    file: FileObject;
  }

  export interface UpdateContentParams {
    /** The dialog template identifier. **/
    dialog_id: string;
    [key: string]: any;
  }

  export interface GetContentParams {
    /** The dialog template identifier. **/
    dialog_id: string;
    [key: string]: any;
  }

  export interface GetDialogsParams {}

  export interface CreateDialogParams {
    /** The dialog template name. **/
    name: string;
    /** The dialog template file. Valid file extensions are .mct for encrypeed dialog files, .json and .xml. **/
    file: FileObject;
  }

  export interface DeleteDialogParams {
    /** The dialog identifier. **/
    id: string;
  }

  export interface ConversationParams {
    /** The dialog template indentifier. **/
    dialog_id: string;
    /** A generated conversation identifier number. If it is not specified, a new conversation is started. **/
    conversation_id: string;
    /** A generated client identifier number. If it is not specified, a new client identifier is issued. **/
    client_id: string;
    /** The user input to be processed. If the conversation_id parameter is blank, this parameter is optional. **/
    input: string;
  }

  export interface GetConversationParams {
    /** The dialog template identifier. **/
    dialog_id: string;
    /** The start of the range in YYYY-MM-DD HH:MM:SS format. **/
    date_from: string;
    /** The end of the range in YYYY-MM-DD HH:MM:SS format. **/
    date_to: string;
    /** The offset starting point in the conversation result list. The default value is 0. **/
    offset: number;
    /** The maximum number of conversations to retrieve. The default value is 10000. **/
    limit: number;
  }

  export interface GetProfileParams {
    /** The dialog template identifier. **/
    dialog_id: string;
    /** A client ID obtained from /dialog. **/
    client_id: string;
  }

  export interface UpdateProfileParams {
    /** The dialog template identifier. **/
    dialog_id: string;
    /** A client ID obtained from /dialog. **/
    client_id: string;
    name_values: string;
  }
}

export = DialogV1;
