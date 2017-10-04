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

const requestFactory = require('../lib/requestwrapper');
const pick = require('object.pick');
const util = require('util');
const BaseService = require('../lib/base_service');

/**
 *
 * @param {Object} options
 * @param {Object} options.version_date
 * @constructor
 */
function ConversationV1(options) {
  BaseService.call(this, options);

  // Check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use ConversationV1.VERSION_DATE_2017_05_26');
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
```json
 "context": {
    "system": {
      "dialog_stack": [
        "root"
      ],
```
 * New:
```json
 "context": {
    "system": {
      "dialog_stack": [
        {
          "dialog_node": "root"
        }
      ],
```
 *
 * @see https://console.bluemix.net/docs/services/conversation/release-notes.html#20September2016
 * @type {string}
 */
ConversationV1.VERSION_DATE_2016_09_20 = '2016-09-20';

/**
 * 02/03 Update
 *
 * * Absolute scoring has now been enabled.
 * @see https://console.bluemix.net/docs/services/conversation/intents.html#absolute-scoring
 *
 * Old:
 ```json
 "intents": [
   { "intent" : "turn_off", "confidence" : 0.54 },
   { "intent" : "locate_amenity", "confidence" : 0.4},
   { "intent" : "weather", "confidence" : 0.06}
 ]
```
 * Previously all intent confidence values summed to 1.0.
 * New:
```json
 "intents": [
   { "intent" : "turn_off", "confidence" : 0.54 },
   { "intent" : "locate_amenity", "confidence" : 0.52},
   { "intent" : "weather", "confidence" : 0.01}
 ]
```
 * Now each intent is scored individually with a maximum confidence value of 1.
 *
 * * Irrelevant input detection.
 * Previously an intent was always returned regardless of whether the system considered it irrelevant to the
 * training data within the workspace. With Irrelevant input detection the system will now return an empty intent
 * array if the system thinks the input is irrelevant to the workspace content.
 * Old:
 ```json
 "input" : { "text" : "what color is the sky?"},
 "intents": [
 { "intent" : "weather", "confidence" : 0.36 },
 { "intent" : "turn_off", "confidence" : 0.33},
 { "intent" : "locate_amenity", "confidence" : 0.31}
 ]
 ```
 * New:
 ```json
 "input" : { "text" : "what color is the sky?"},
 "intents": []
 ```
 *
 * @see https://console.bluemix.net/docs/services/conversation/release-notes.html#3February2017
 * @type {string}
 */
ConversationV1.VERSION_DATE_2017_02_03 = '2017-02-03';

/**
 * Adds support entities (with values and synonyms) and accessing logs
 *
 * @see https://www.ibm.com/watson/developercloud/doc/conversation/release-notes.html#18-april-2017
 * @type {string}
 */
ConversationV1.VERSION_DATE_2017_04_21 = '2017-04-21';

/**
 * Schema changes for error response objects and workspace exporting
 *
 * @see https://console.bluemix.net/docs/services/conversation/release-notes.html#release-notes
 * @type {string}
 */
ConversationV1.VERSION_DATE_2017_05_26 = '2017-05-26';

/**
 * Method: message
 *
 * Returns a response to a user utterance.
 *
 * Example response for 2017-02-03 version_date:
```json
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
```
 *
 *
 *
 * @param {Object} params
 * @param params.workspace_id
 * @param [params.input]
 * @param [params.context]
 * @param [params.alternate_intents=false] - includes other lower-confidence intents in the intents array.
 * @param [params.output]
 * @param [params.entities]
 * @param [params.intents]
 *
 */
ConversationV1.prototype.message = function(params, callback) {
  params = params || {};

  const parameters = {
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

/**
 * Method: listWorkspaces
 *
 * Returns the list of workspaces in Watson Conversation Service instance
 *
 * Example Response:
```json
 {
   "workspaces": [
     {
       "name": "Pizza app",
       "created": "2015-12-06T23:53:59.153Z",
       "language": "en",
       "metadata": {},
       "updated": "2015-12-06T23:53:59.153Z",
       "description": "Pizza app",
       "workspace_id": "pizza_app-e0f3"
     }
   ]
 }
```
 *
 * @param {Object} [params]
 * @param {Number} [params.page_limit]
 * @param {Boolean} [params.include_count]
 * @param {String} [params.sort]
 * @param {String} [params.cursor]
 * @param {Function} [callback]
 */
ConversationV1.prototype.listWorkspaces = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = null;
  }
  const parameters = {
    options: {
      url: '/v1/workspaces',
      method: 'GET',
      qs: pick(params, ['page_limit', 'include_count', 'sort', 'cursor'])
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: createWorkspace
 *
 * Creates a new workspace
 *
 * Model Schema
```json
 {
  "name": "string",
  "description": "string",
  "language": "string",
  "metadata": {},
  "counterexamples": [
    {
      "text": "string"
    }
  ],
  "dialog_nodes": [
    {
      "dialog_node": "string",
      "description": "string",
      "conditions": "string",
      "parent": "string",
      "previous_sibling": "string",
      "output": {
        "text": "string"
      },
      "context": {},
      "metadata": {},
      "go_to": {
        "dialog_node": "string",
        "selector": "string",
        "return": true
      }
    }
  ],
  "entities": [
    {
      "entity": "string",
      "description": {
        "long": [
          "string"
        ],
        "short": [
          "string"
        ],
        "examples": [
          "string"
        ]
      },
      "type": "string",
      "source": "string",
      "open_list": false,
      "values": [
        {
          "value": "string",
          "metadata": {},
          "synonyms": [
            "string"
          ]
        }
      ]
    }
  ],
  "intents": [
    {
      "intent": "string",
      "description": "string",
      "examples": [
        {
          "text": "string"
        }
      ]
    }
  ]
 }
```
 *
 * Example Response
```json
 {
  "name": "Pizza app",
  "created": "2015-12-06T23:53:59.153Z",
  "language": "en",
  "metadata": {},
  "updated": "2015-12-06T23:53:59.153Z",
  "description": "Pizza app",
  "workspace_id": "pizza_app-e0f3"
 }
```
 *
 * @param  {Object}  params
 * @param {String} [params.name]
 * @param {String} [params.description]
 * @param {String} [params.language]
 * @param {Object} [params.metadata]
 * @param {Array<Object>} [params.entities]
 * @param {Array<Object>} [params.intents]
 * @param {Array<Object>} [params.dialog_nodes]
 * @param {Array<Object>} [params.counterexamples]
 * @param {Function} [callback]
 *
 */

ConversationV1.prototype.createWorkspace = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces',
      method: 'POST',
      json: true,
      body: pick(params, ['name', 'language', 'entities', 'intents', 'dialog_nodes', 'metadata', 'description', 'counterexamples'])
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getWorkspace
 *
 * Returns information about a specified workspace or return the whole workspace
 *
 * Example Response (with default export value):
```json
 {
  "name": "Pizza app",
  "created": "2015-12-06T23:53:59.153Z",
  "language": "en",
  "metadata": {},
  "updated": "2015-12-06T23:53:59.153Z",
  "description": "Pizza app",
  "workspace_id": "pizza_app-e0f3"
 }
```
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Function} [callback]
 */

ConversationV1.prototype.getWorkspace = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}',
      method: 'GET',
      json: true,
      qs: pick(params, ['export']),
      path: pick(params, ['workspace_id'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: deleteWorkspace
 *
 * Deletes the specified workspace
 *
 *
 * @param  {Object}   params   { workspace_id: '' }
 * @param params.workspace_id
 * @param {Function} [callback]
 */

ConversationV1.prototype.deleteWorkspace = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}',
      method: 'DELETE',
      json: true,
      path: pick(params, ['workspace_id'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: updateWorkspace
 *
 * Updates a workspace
 *
 * Example value
```json
 {
  "name": "Pizza app",
  "created": "2015-12-06T23:53:59.153Z",
  "language": "en",
  "metadata": {},
  "description": "Pizza app",
  "workspace_id": "pizza_app-e0f3",
  "counterexamples": [
    {
      "text": "string"
    }
  ],
  "dialog_nodes": [
    {
      "dialog_node": "string",
      "description": "string",
      "conditions": "string",
      "parent": "string",
      "previous_sibling": "string",
      "output": {
        "text": "string"
      },
      "context": {},
      "metadata": {},
      "go_to": {
        "dialog_node": "string",
        "selector": "string",
        "return": true
      }
    }
  ],
  "entities": [
    {
      "entity": "string",
      "description": {
        "long": [
          "string"
        ],
        "short": [
          "string"
        ],
        "examples": [
          "string"
        ]
      },
      "type": "string",
      "source": "string",
      "open_list": false,
      "values": [
        {
          "value": "string",
          "metadata": {},
          "synonyms": [
            "string"
          ]
        }
      ]
    }
  ],
  "intents": [
    {
      "intent": "string",
      "description": "string",
      "examples": [
        {
          "text": "string"
        }
      ]
    }
  ]
 }
```
 *
 * Example Response:
```json
 {
  "name": "Pizza app",
  "created": "2015-12-06T23:53:59.153Z",
  "language": "en",
  "metadata": {},
  "updated": "2015-12-06T23:53:59.153Z",
  "description": "Pizza app",
  "workspace_id": "pizza_app-e0f3"
 }
```
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} [params.name]
 * @param {String} [params.description]
 * @param {String} [params.language]
 * @param {Object} [params.metadata]
 * @param {Array<Object>} [params.entities]
 * @param {Array<Object>} [params.intents]
 * @param {Array<Object>} [params.dialog_nodes]
 * @param {Array<Object>} [params.counterexamples]
 * @param {Function} [callback]
 *
 */

ConversationV1.prototype.updateWorkspace = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}',
      method: 'POST',
      json: true,
      body: pick(params, ['name', 'language', 'entities', 'intents', 'dialog_nodes', 'metadata', 'description', 'counterexamples']),
      path: pick(params, ['workspace_id'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: workspaceStatus
 *
 * Returns the training status of the specified workspace
 *
 * Example Response:
```json
 {
  "workspace_id": "pizza_app-e0f3",
  "training": "true"
 }
```
 *
 * @param {Object} params
 * @param params.workspace_id
 * @param {Function} [callback]
 *
 */

ConversationV1.prototype.workspaceStatus = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/status',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: createIntent
 *
 * Create a new intent
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} [params.intent]
 * @param {String} [params.description]
 * @param {Array<Object>} [params.examples]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.createIntent = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id']),
      body: pick(params, ['intent', 'description', 'examples'])
    },
    requiredParams: ['workspace_id', 'intent'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getIntents
 *
 * List the intents for a workspace.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Number} [params.page_limit]
 * @param {Boolean} [params.include_count]
 * @param {String} [params.sort]
 * @param {String} [params.cursor]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getIntents = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id']),
      qs: pick(params, ['export', 'page_limit', 'include_count', 'sort', 'cursor'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getIntent
 *
 * Get information about an intent, optionally including all intent content.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.intent
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getIntent = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id', 'intent']),
      qs: pick(params, ['export'])
    },
    requiredParams: ['workspace_id', 'intent'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: updateIntent
 *
 * Update an existing intent with new or modified data. You must provide JSON data defining the content of the updated intent.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.old_intent
 * @param {String} params.intent
 * @param {String} params.description
 * @param {Array<Object>} params.examples
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.updateIntent = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{old_intent}',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id', 'old_intent']),
      body: pick(params, ['intent', 'description', 'examples'])
    },
    requiredParams: ['workspace_id', 'old_intent', 'intent'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: deleteIntent
 *
 * Delete an intent from a workspace
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.intent
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.deleteIntent = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}',
      method: 'DELETE',
      json: true,
      path: pick(params, ['workspace_id', 'intent'])
    },
    requiredParams: ['workspace_id', 'intent'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getExamples
 *
 * List the user input examples for an intent.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.intent
 * @param {Number} [params.page_limit]
 * @param {Boolean} [params.include_count]
 * @param {String} [params.sort]
 * @param {String} [params.cursor]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getExamples = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id', 'intent']),
      qs: pick(params, ['page_limit', 'include_count', 'sort', 'cursor'])
    },
    requiredParams: ['workspace_id', 'intent'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: createExample
 *
 * Add a new user input example to an intent.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.intent
 * @param {String} params.text
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.createExample = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id', 'intent']),
      body: pick(params, ['text'])
    },
    requiredParams: ['workspace_id', 'intent'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: deleteExample
 *
 * Delete a user input example from an intent.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.intent
 * @param {String} params.text
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.deleteExample = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
      method: 'DELETE',
      json: true,
      path: pick(params, ['workspace_id', 'intent', 'text'])
    },
    requiredParams: ['workspace_id', 'intent', 'text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getExample
 *
 * Get information about a user input example.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.intent
 * @param {String} params.text
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getExample = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id', 'intent', 'text'])
    },
    requiredParams: ['workspace_id', 'intent', 'text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: updateExample
 *
 * Update the text of a user input example.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.intent
 * @param {String} params.text
 * @param {Object} params.example
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.updateExample = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{old_text}',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id', 'intent', 'old_text']),
      body: pick(params, ['text'])
    },
    requiredParams: ['workspace_id', 'intent', 'old_text', 'text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getCounterExamples
 *
 * List the counterexamples for a workspace. Counterexamples are examples that have been marked as irrelevant input
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {Number} [params.page_limit]
 * @param {Boolean} [params.include_count]
 * @param {String} [params.sort]
 * @param {String} [params.cursor]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getCounterExamples = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/counterexamples',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id']),
      qs: pick(params, ['page_limit', 'include_count', 'sort', 'cursor'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: createCounterExample
 *
 * Add a new counterexample to a workspace. Counterexamples are examples that have been marked as irrelevant input.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.text The text of a user input example.
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.createCounterExample = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/counterexamples',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id']),
      body: pick(params, ['text'])
    },
    requiredParams: ['workspace_id', 'text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: deleteCounterExample
 *
 * Delete a counterexample from a workspace. Counterexamples are examples that have been marked as irrelevant input.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.text The text of a user input example.
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.deleteCounterExample = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
      method: 'DELETE',
      json: true,
      path: pick(params, ['workspace_id', 'text'])
    },
    requiredParams: ['workspace_id', 'text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getCounterExample
 *
 * Get information about a counterexample. Counterexamples are examples that have been marked as irrelevant input.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.text The text of a user input example.
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getCounterExample = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id', 'text'])
    },
    requiredParams: ['workspace_id', 'text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: updateCounterExample
 *
 * Get information about a counterexample. Counterexamples are examples that have been marked as irrelevant input.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.old_text
 * @param {String} params.text The text of a user input example.
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.updateCounterExample = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/counterexamples/{old_text}',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id', 'old_text']),
      body: pick(params, ['text'])
    },
    requiredParams: ['workspace_id', 'old_text', 'text'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: createEntity
 *
 * Create a new entity
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} [params.entity]
 * @param {String} [params.description]
 * @param {Object} [params.metadata]
 * @param {Boolean} [params.fuzzy_match=false] - whether to use fuzzy matching for the entity.
 * @param {Array<Object>} [params.values]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.createEntity = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id']),
      body: pick(params, ['entity', 'description', 'metadata', 'values', 'fuzzy_match'])
    },
    requiredParams: ['workspace_id', 'entity'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getEntities
 *
 * List the entities for a workspace.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Number} [params.page_limit]
 * @param {Boolean} [params.include_count]
 * @param {String} [params.sort]
 * @param {String} [params.cursor]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getEntities = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id']),
      qs: pick(params, ['export', 'page_limit', 'include_count', 'sort', 'cursor'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getEntity
 *
 * Get information about an entity, optionally including all entity content.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.entity
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getEntity = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id', 'entity']),
      qs: pick(params, ['export'])
    },
    requiredParams: ['workspace_id', 'entity'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: updateEntity
 *
 * Update an existing entity with new or modified data. You must provide JSON data defining the content of the updated entity.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.old_entity
 * @param {String} params.entity
 * @param {String} params.description
 * @param {Object} params.metadata
 * @param {Boolean} [params.fuzzy_match=false] - whether to use fuzzy matching for the entity.
 * @param {Array<Object>} params.values
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.updateEntity = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{old_entity}',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id', 'old_entity']),
      body: pick(params, ['entity', 'description', 'metadata', 'values', 'fuzzy_match'])
    },
    requiredParams: ['workspace_id', 'old_entity', 'entity'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: deleteEntity
 *
 * Delete an entity from a workspace.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.entity
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.deleteEntity = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}',
      method: 'DELETE',
      json: true,
      path: pick(params, ['workspace_id', 'entity'])
    },
    requiredParams: ['workspace_id', 'entity'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: createValue
 *
 * Add a new value to an entity.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} [params.entity]
 * @param {String} [params.value]
 * @param {Object} [params.metadata]
 * @param {Array<String>} [params.synonyms]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.createValue = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id', 'entity']),
      body: pick(params, ['value', 'metadata', 'synonyms'])
    },
    requiredParams: ['workspace_id', 'entity', 'value'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getValues
 *
 * List the values for an entity.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.entity
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Number} [params.page_limit]
 * @param {Boolean} [params.include_count]
 * @param {String} [params.sort]
 * @param {String} [params.cursor]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getValues = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id', 'entity']),
      qs: pick(params, ['export', 'page_limit', 'include_count', 'sort', 'cursor'])
    },
    requiredParams: ['workspace_id', 'entity'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getValue
 *
 * Get information about an entity value.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.entity
 * @param {String} params.value
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getValue = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id', 'entity', 'value']),
      qs: pick(params, ['export'])
    },
    requiredParams: ['workspace_id', 'entity', 'value'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: updateValue
 *
 * Update an existing entity value with new or modified data. You must provide JSON data defining the content of the updated entity value.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.entity
 * @param {String} params.old_value
 * @param {String} params.value
 * @param {Object} params.metadata
 * @param {Array<String>} params.synonyms
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.updateValue = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{old_value}',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id', 'entity', 'old_value']),
      body: pick(params, ['value', 'metadata', 'synonyms'])
    },
    requiredParams: ['workspace_id', 'entity', 'old_value', 'value'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: deleteValue
 *
 * Delete an entity from a workspace.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.entity
 * @param {String} params.value
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.deleteValue = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
      method: 'DELETE',
      json: true,
      path: pick(params, ['workspace_id', 'entity', 'value'])
    },
    requiredParams: ['workspace_id', 'entity', 'value'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: createSynonyms
 *
 * Add a new synonym to an entity value.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} [params.entity]
 * @param {String} [params.value]
 * @param {String} [params.synonym]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.createSynonym = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id', 'entity', 'value']),
      body: pick(params, ['synonym'])
    },
    requiredParams: ['workspace_id', 'entity', 'value', 'synonym'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getSynonyms
 *
 * List the synonyms for an entity value.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.entity
 * @param {String} params.value
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Number} [params.page_limit]
 * @param {Boolean} [params.include_count]
 * @param {String} [params.sort]
 * @param {String} [params.cursor]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getSynonyms = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id', 'entity', 'value']),
      qs: pick(params, ['export', 'page_limit', 'include_count', 'sort', 'cursor'])
    },
    requiredParams: ['workspace_id', 'entity', 'value'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getSynonym
 *
 * Get information about an entity value.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.entity
 * @param {String} params.value
 * @param {String} params.synonym
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getSynonym = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id', 'entity', 'value', 'synonym']),
      qs: pick(params, ['export'])
    },
    requiredParams: ['workspace_id', 'entity', 'value', 'synonym'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: updateSynonym
 *
 * Update an existing entity value synonym with new text.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.entity
 * @param {String} params.value
 * @param {String} params.old_synonym
 * @param {String} params.synonym
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.updateSynonym = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{old_synonym}',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id', 'entity', 'value', 'old_synonym']),
      body: pick(params, ['synonym'])
    },
    requiredParams: ['workspace_id', 'entity', 'value', 'old_synonym', 'synonym'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: deleteSynonym
 *
 * Delete a synonym from an entity value.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.entity
 * @param {String} params.value
 * @param {String} params.synonym
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.deleteSynonym = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
      method: 'DELETE',
      json: true,
      path: pick(params, ['workspace_id', 'entity', 'value', 'synonym'])
    },
    requiredParams: ['workspace_id', 'entity', 'value', 'synonym'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getLogs
 *
 * Returns information about requests (user input) received, and responses sent, by the workspace.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.filter
 * @param {Number} [params.page_limit]
 * @param {String} [params.sort]
 * @param {String} [params.cursor]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getLogs = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/logs',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id']),
      qs: pick(params, ['filter', 'page_limit', 'sort', 'cursor'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: createDialogNode
 *
 * Create a new dialog node
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} [params.dialog_node]
 * @param {String} [params.description]
 * @param {Array<Object>} [params.examples]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.createDialogNode = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/dialog_nodes',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id']),
      body: pick(params, [
        'dialog_node',
        'description',
        'conditions',
        'parent',
        'previous_sibling',
        'output',
        'context',
        'metadata',
        'next_step',
        'actions',
        'title',
        'type',
        'event_name',
        'variable'
      ])
    },
    requiredParams: ['workspace_id', 'dialog_node'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getDialogNodes
 *
 * List the dialog nodes for a workspace.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Number} [params.page_limit]
 * @param {Boolean} [params.include_count]
 * @param {String} [params.sort]
 * @param {String} [params.cursor]
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getDialogNodes = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/dialog_nodes',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id']),
      qs: pick(params, ['page_limit', 'include_count', 'sort', 'cursor'])
    },
    requiredParams: ['workspace_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: getDialogNode
 *
 * Get information about an dialog node, optionally including all dialog node content.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.dialog_node
 * @param {Boolean} [params.export=false] - if true, the full contents of all of the sub-resources are returned
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.getDialogNode = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
      method: 'GET',
      json: true,
      path: pick(params, ['workspace_id', 'dialog_node']),
      qs: pick(params, ['export'])
    },
    requiredParams: ['workspace_id', 'dialog_node'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: updateDialogNode
 *
 * Update an existing dialog node with new or modified data. You must provide JSON data defining the content of the updated dialog node.
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.old_dialog_node
 * @param {String} params.dialog_node
 * @param {String} params.description
 * @param {Array<Object>} params.examples
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.updateDialogNode = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/dialog_nodes/{old_dialog_node}',
      method: 'POST',
      json: true,
      path: pick(params, ['workspace_id', 'old_dialog_node']),
      body: pick(params, [
        'dialog_node',
        'description',
        'conditions',
        'parent',
        'previous_sibling',
        'output',
        'context',
        'metadata',
        'next_step',
        'actions',
        'title',
        'type',
        'event_name',
        'variable'
      ])
    },
    requiredParams: ['workspace_id', 'old_dialog_node', 'dialog_node'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Method: deleteDialogNode
 *
 * Delete an dialog node from a workspace
 *
 * @param {Object} params
 * @param {String} params.workspace_id
 * @param {String} params.dialog_node
 * @param {Function} [callback]
 *
 */
ConversationV1.prototype.deleteDialogNode = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/dialog_nodes/{dialog_node}',
      method: 'DELETE',
      json: true,
      path: pick(params, ['workspace_id', 'dialog_node'])
    },
    requiredParams: ['workspace_id', 'dialog_node'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = ConversationV1;
