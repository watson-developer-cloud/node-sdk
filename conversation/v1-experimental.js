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

var requestFactory = require('../lib/requestwrapper');
var pick           = require('object.pick');
var util = require('util');
var BaseService = require('../lib/base_service');

/**
 *
 * @param options
 * @constructor
 */
function ConversationV1Experimental(options) {
  BaseService.call(this, options);

  if (!this._options.silent) {
    // eslint-disable-next-line no-console
    console.warn(new Error("Watson Conversation v1-experimental is sunset as of 2016-08-01. Please upgrade to v1. Set {silent: true} to disable this message.").stack);
  }

  // Check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use 2016-05-19');
  }
  this._options.qs.version = options.version_date;
}
util.inherits(ConversationV1Experimental, BaseService);
ConversationV1Experimental.prototype.name = 'conversation';
ConversationV1Experimental.prototype.version = 'v1-experimental';
ConversationV1Experimental.URL = 'https://gateway.watsonplatform.net/conversation-experimental/api';

/**
 * Returns a response to a user utterance.
 * @param  {Object}   params   { workspace_id: '',  }
 */
ConversationV1Experimental.prototype.message = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/message',
      method: 'POST',
      json: true,
      body: pick(params, ['input', 'context']),
      path: pick(params, ['workspace_id'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = ConversationV1Experimental;
