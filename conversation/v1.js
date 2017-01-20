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
 * @param options.version_date
 * @constructor
 */
function ConversationV1(options) {
  BaseService.call(this, options);

  // Check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use ConversationV1.VERSION_DATE_2016_09_20');
  }
  this._options.qs.version = options.version_date;
}
util.inherits(ConversationV1, BaseService);
ConversationV1.prototype.name = 'conversation';
ConversationV1.prototype.version = 'v1';
ConversationV1.URL = 'https://gateway.watsonplatform.net/conversation/api';

/**
 * Initial release
 * @type {string}
 */
ConversationV1.VERSION_DATE_2016_07_11 = '2016-07-11';

/**
 * 9/20 update made changes to response format
 *
 * * context.system.dialog_stack changed from an array of strings to an array of objects
 *
 * Old:
 "context": {
    "system": {
      "dialog_stack": [
        "root"
      ],

 * New:
 "context": {
    "system": {
      "dialog_stack": [
        {
          "dialog_node": "root"
        }
      ],
 *
 * @see http://www.ibm.com/watson/developercloud/doc/conversation/release-notes.html#20-september-2016
 * @type {string}
 */
ConversationV1.VERSION_DATE_2016_09_20 = '2016-09-20';

/**
 * Returns a response to a user utterance.
 *
 * Example response for 2016-09-20 version_date:
 {
   "intents": [
     {
       "intent": "turn_on",
       "confidence": 0.999103316650195
     }
   ],
   "entities": [
     {
       "entity": "appliance",
       "location": [
         12,
         18
       ],
       "value": "light"
     }
   ],
   "input": {
     "text": "Turn on the lights"
   },
   "output": {
     "log_messages": [],
     "text": [
       "Hi. It looks like a nice drive today. What would you like me to do?"
     ],
     "nodes_visited": [
       "node_1_1467221909631"
     ]
   },
   "context": {
     "conversation_id": "820334ac-ee79-45b5-aa03-7958dcd0fd34",
     "system": {
       "dialog_stack": [
         {
           "dialog_node": "root"
         }
       ],
       "dialog_turn_counter": 1,
       "dialog_request_counter": 1
     }
   }
 }
 *
 *
 *
 * @param  {Object}   params   { workspace_id: '',  }
 * @param params.workspace_id
 * @param [params.input]
 * @param [params.context]
 * @param [params.alternate_intents=false] - includes other lower-confidence intents in the intents array
 * @param [params.output]
 * @param [params.entities]
 * @param [params.intents]
 *
 */
ConversationV1.prototype.message = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/message',
      method: 'POST',
      json: true,
      body: pick(params, ['input', 'context', 'alternate_intents', 'output', 'entities', 'intents']),
      path: pick(params, ['workspace_id'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = ConversationV1;
