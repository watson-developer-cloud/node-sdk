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

'use strict';

const extend = require('extend')
const pick = require('object.pick')
const requestFactory = require('../lib/requestwrapper')
const helper = require('../lib/helper')
const util = require('util')
const BaseService = require('../lib/base_service')

/**
 * @param {Object} options
 * @param {String} options.version_date - Release date of the API version in YYYY-MM-DD format.
 * @constructor
 */
function ConversationV1(options) {
  BaseService.call(this, options);
  // check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use ConversationV1.VERSION_DATE_2017_05_26');
  }
  this._options.qs.version = options.version_date;
}
util.inherits(ConversationV1, BaseService);
ConversationV1.prototype.name = 'conversation';
ConversationV1.prototype.version = 'v1';
ConversationV1.URL = 'https://gateway.watsonplatform.net/conversation/api';

ConversationV1.VERSION_DATE_2017_05_26 = '2017-05-26';
ConversationV1.VERSION_DATE_2017_04_21 = '2017-04-21';
ConversationV1.VERSION_DATE_2017_02_03 = '2017-02-03';
ConversationV1.VERSION_DATE_2016_09_20 = '2016-09-20';
ConversationV1.VERSION_DATE_2016_07_11 = '2016-07-11';

/**
 * Create counterexample.
 *
 * Add a new counterexample to a workspace. Counterexamples are examples that have been marked as irrelevant input.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.text - The text of a user input marked as irrelevant input.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.createCounterexample = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { text: params.text };
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/counterexamples',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete counterexample.
 *
 * Delete a counterexample from a workspace. Counterexamples are examples that have been marked as irrelevant input.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.deleteCounterexample = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { workspace_id: params.workspace_id, text: params.text };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Get counterexample.
 *
 * Get information about a counterexample. Counterexamples are examples that have been marked as irrelevant input.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.getCounterexample = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { workspace_id: params.workspace_id, text: params.text };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
      method: 'GET',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List counterexamples.
 *
 * List the counterexamples for a workspace. Counterexamples are examples that have been marked as irrelevant input.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
 * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
 * @param {Object} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
 * @param {Object} [params.cursor] - A token identifying the last value from the previous page of results.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.listCounterexamples = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { page_limit: params.page_limit, include_count: params.include_count, sort: params.sort, cursor: params.cursor };
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/counterexamples',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Update counterexample.
 *
 * Update the text of a counterexample. Counterexamples are examples that have been marked as irrelevant input.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.text - The text of a user input counterexample (for example, `What are you wearing?`).
 * @param {Object} [params.new_text] - The text of the example to be marked as irrelevant input.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.updateCounterexample = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'text', ];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { text: params.new_text };
  const path = { workspace_id: params.workspace_id, text: params.text };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/counterexamples/{text}',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Create entity.
 *
 * Create a new entity.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} [params.description] - The description of the entity.
 * @param {Object} [params.metadata] - Any metadata related to the value.
 * @param {Array<Object>} [params.values] - An array of entity values.
 * @param {boolean} [params.fuzzy_match] - Whether to use fuzzy matching for the entity.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.createEntity = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', ];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { entity: params.entity, description: params.description, metadata: params.metadata, values: params.values, fuzzy_match: params.fuzzy_match };
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete entity.
 *
 * Delete an entity from a workspace.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.deleteEntity = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { workspace_id: params.workspace_id, entity: params.entity };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Get entity.
 *
 * Get information about an entity, optionally including all entity content.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.getEntity = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { export: params.export };
  const path = { workspace_id: params.workspace_id, entity: params.entity };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List entities.
 *
 * List the entities for a workspace.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
 * @param {Object} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
 * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
 * @param {Object} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
 * @param {Object} [params.cursor] - A token identifying the last value from the previous page of results.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.listEntities = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { export: params.export, page_limit: params.page_limit, include_count: params.include_count, sort: params.sort, cursor: params.cursor };
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Update entity.
 *
 * Update an existing entity with new or modified data.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} [params.new_entity] - The name of the entity.
 * @param {Object} [params.new_description] - The description of the entity.
 * @param {Object} [params.new_metadata] - Any metadata related to the entity.
 * @param {boolean} [params.new_fuzzy_match] - Whether to use fuzzy matching for the entity.
 * @param {Array<Object>} [params.new_values] - An array of entity values.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.updateEntity = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', ];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { entity: params.new_entity, description: params.new_description, metadata: params.new_metadata, fuzzy_match: params.new_fuzzy_match, values: params.new_values };
  const path = { workspace_id: params.workspace_id, entity: params.entity };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Create user input example.
 *
 * Add a new user input example to an intent.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.intent - The intent name (for example, `pizza_order`).
 * @param {Object} params.text - The text of a user input example.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.createExample = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'intent', 'text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { text: params.text };
  const path = { workspace_id: params.workspace_id, intent: params.intent };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete user input example.
 *
 * Delete a user input example from an intent.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.intent - The intent name (for example, `pizza_order`).
 * @param {Object} params.text - The text of the user input example.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.deleteExample = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'intent', 'text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { workspace_id: params.workspace_id, intent: params.intent, text: params.text };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Get user input example.
 *
 * Get information about a user input example.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.intent - The intent name (for example, `pizza_order`).
 * @param {Object} params.text - The text of the user input example.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.getExample = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'intent', 'text'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { workspace_id: params.workspace_id, intent: params.intent, text: params.text };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
      method: 'GET',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List user input examples.
 *
 * List the user input examples for an intent.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.intent - The intent name (for example, `pizza_order`).
 * @param {Object} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
 * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
 * @param {Object} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
 * @param {Object} [params.cursor] - A token identifying the last value from the previous page of results.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.listExamples = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'intent'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { page_limit: params.page_limit, include_count: params.include_count, sort: params.sort, cursor: params.cursor };
  const path = { workspace_id: params.workspace_id, intent: params.intent };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Update user input example.
 *
 * Update the text of a user input example.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.intent - The intent name (for example, `pizza_order`).
 * @param {Object} params.text - The text of the user input example.
 * @param {Object} [params.new_text] - The text of the user input example.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.updateExample = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'intent', 'text', ];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { text: params.new_text };
  const path = { workspace_id: params.workspace_id, intent: params.intent, text: params.text };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}/examples/{text}',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Create intent.
 *
 * Create a new intent.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.intent - The name of the intent.
 * @param {Object} [params.description] - The description of the intent.
 * @param {Array<Object>} [params.examples] - An array of user input examples.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.createIntent = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'intent', ];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { intent: params.intent, description: params.description, examples: params.examples };
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete intent.
 *
 * Delete an intent from a workspace.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.intent - The intent name (for example, `pizza_order`).
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.deleteIntent = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'intent'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { workspace_id: params.workspace_id, intent: params.intent };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Get intent.
 *
 * Get information about an intent, optionally including all intent content.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.intent - The intent name (for example, `pizza_order`).
 * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.getIntent = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'intent'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { export: params.export };
  const path = { workspace_id: params.workspace_id, intent: params.intent };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List intents.
 *
 * List the intents for a workspace.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
 * @param {Object} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
 * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
 * @param {Object} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
 * @param {Object} [params.cursor] - A token identifying the last value from the previous page of results.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.listIntents = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { export: params.export, page_limit: params.page_limit, include_count: params.include_count, sort: params.sort, cursor: params.cursor };
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Update intent.
 *
 * Update an existing intent with new or modified data. You must provide data defining the content of the updated intent.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.intent - The intent name (for example, `pizza_order`).
 * @param {Object} [params.new_intent] - The name of the intent.
 * @param {Object} [params.new_description] - The description of the intent.
 * @param {Array<Object>} [params.new_examples] - An array of user input examples for the intent.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.updateIntent = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'intent', ];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { intent: params.new_intent, description: params.new_description, examples: params.new_examples };
  const path = { workspace_id: params.workspace_id, intent: params.intent };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/intents/{intent}',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List log events.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
 * @param {Object} [params.filter] - A cacheable parameter that limits the results to those matching the specified filter.
 * @param {Object} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
 * @param {Object} [params.cursor] - A token identifying the last value from the previous page of results.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.listLogs = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { sort: params.sort, filter: params.filter, page_limit: params.page_limit, cursor: params.cursor };
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/logs',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Get a response to a user's input.
 *
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - Unique identifier of the workspace.
 * @param {Object} [params.input] - An input object that includes the input text.
 * @param {boolean} [params.alternate_intents] - Whether to return more than one intent. Set to `true` to return all matching intents.
 * @param {Object} [params.context] - State information for the conversation. Continue a conversation by including the context object from the previous response.
 * @param {Array<Object>} [params.entities] - Include the entities from the previous response when they do not need to change and to prevent Watson from trying to identify them.
 * @param {Array<Object>} [params.intents] - An array of name-confidence pairs for the user input. Include the intents from the previous response when they do not need to change and to prevent Watson from trying to identify them.
 * @param {Object} [params.output] - System output. Include the output from the request when you have several requests within the same Dialog turn to pass back in the intermediate information.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.message = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { input: params.input, alternate_intents: params.alternate_intents, context: params.context, entities: params.entities, intents: params.intents, output: params.output };
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/message',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Add entity value synonym.
 *
 * Add a new synonym to an entity value.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} params.value - The text of the entity value.
 * @param {Object} params.synonym - The text of the synonym.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.createSynonym = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { synonym: params.synonym };
  const path = { workspace_id: params.workspace_id, entity: params.entity, value: params.value };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete entity value synonym.
 *
 * Delete a synonym for an entity value.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} params.value - The text of the entity value.
 * @param {Object} params.synonym - The text of the synonym.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.deleteSynonym = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { workspace_id: params.workspace_id, entity: params.entity, value: params.value, synonym: params.synonym };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Get entity value synonym.
 *
 * Get information about a synonym for an entity value.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} params.value - The text of the entity value.
 * @param {Object} params.synonym - The text of the synonym.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.getSynonym = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', 'value', 'synonym'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { workspace_id: params.workspace_id, entity: params.entity, value: params.value, synonym: params.synonym };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
      method: 'GET',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List entity value synonyms.
 *
 * List the synonyms for an entity value.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} params.value - The text of the entity value.
 * @param {Object} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
 * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
 * @param {Object} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
 * @param {Object} [params.cursor] - A token identifying the last value from the previous page of results.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.listSynonyms = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', 'value'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { page_limit: params.page_limit, include_count: params.include_count, sort: params.sort, cursor: params.cursor };
  const path = { workspace_id: params.workspace_id, entity: params.entity, value: params.value };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Update entity value synonym.
 *
 * Update the information about a synonym for an entity value.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} params.value - The text of the entity value.
 * @param {Object} params.synonym - The text of the synonym.
 * @param {Object} [params.new_synonym] - The text of the synonym.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.updateSynonym = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', 'value', 'synonym', ];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { synonym: params.new_synonym };
  const path = { workspace_id: params.workspace_id, entity: params.entity, value: params.value, synonym: params.synonym };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}/synonyms/{synonym}',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Add entity value.
 *
 * Create a new value for an entity.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} params.value - The text of the entity value.
 * @param {Object} [params.metadata] - Any metadata related to the entity value.
 * @param {Array<Object>} [params.synonyms] - An array of synonyms for the entity value.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.createValue = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', 'value', ];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { value: params.value, metadata: params.metadata, synonyms: params.synonyms };
  const path = { workspace_id: params.workspace_id, entity: params.entity };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete entity value.
 *
 * Delete a value for an entity.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} params.value - The text of the entity value.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.deleteValue = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', 'value'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { workspace_id: params.workspace_id, entity: params.entity, value: params.value };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Get entity value.
 *
 * Get information about an entity value.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} params.value - The text of the entity value.
 * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.getValue = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', 'value'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { export: params.export };
  const path = { workspace_id: params.workspace_id, entity: params.entity, value: params.value };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List entity values.
 *
 * List the values for an entity.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
 * @param {Object} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
 * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
 * @param {Object} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
 * @param {Object} [params.cursor] - A token identifying the last value from the previous page of results.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.listValues = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { export: params.export, page_limit: params.page_limit, include_count: params.include_count, sort: params.sort, cursor: params.cursor };
  const path = { workspace_id: params.workspace_id, entity: params.entity };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Update entity value.
 *
 * Update the content of a value for an entity.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} params.entity - The name of the entity.
 * @param {Object} params.value - The text of the entity value.
 * @param {Object} [params.new_value] - The text of the entity value.
 * @param {Object} [params.new_metadata] - Any metadata related to the entity value.
 * @param {Array<Object>} [params.new_synonyms] - An array of synonyms for the entity value.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.updateValue = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id', 'entity', 'value', ];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { value: params.new_value, metadata: params.new_metadata, synonyms: params.new_synonyms };
  const path = { workspace_id: params.workspace_id, entity: params.entity, value: params.value };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}/entities/{entity}/values/{value}',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Create workspace.
 *
 * Create a workspace based on component objects. You must provide workspace components defining the content of the new workspace.
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {Object} [params.name] - The name of the workspace.
 * @param {Object} [params.description] - The description of the workspace.
 * @param {Object} [params.language] - The language of the workspace.
 * @param {Array<Object>} [params.intents] - An array of objects defining the intents for the workspace.
 * @param {Array<Object>} [params.entities] - An array of objects defining the entities for the workspace.
 * @param {Array<Object>} [params.dialog_nodes] - An array of objects defining the nodes in the workspace dialog.
 * @param {Array<Object>} [params.counterexamples] - An array of objects defining input examples that have been marked as irrelevant input.
 * @param {Object} [params.metadata] - Any metadata related to the workspace.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.createWorkspace = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const body = { name: params.name, description: params.description, language: params.language, intents: params.intents, entities: params.entities, dialog_nodes: params.dialog_nodes, counterexamples: params.counterexamples, metadata: params.metadata };
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
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Delete workspace.
 *
 * Delete a workspace from the service instance.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.deleteWorkspace = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}',
      method: 'DELETE',
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * Get information about a workspace.
 *
 * Get information about a workspace, optionally including all workspace content.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {boolean} [params.export] - Whether to include all element content in the returned data. If export=`false`, the returned data includes only information about the element itself. If export=`true`, all content, including subelements, is included. The default value is `false`.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.getWorkspace = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const query = { export: params.export };
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}',
      method: 'GET',
      qs: query,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
      }
    })
  };
  return requestFactory(parameters, callback);
};

/**
 * List workspaces.
 *
 * List the workspaces associated with a Conversation service instance.
 *
 * @param {Object} [params] - The parameters to send to the service.
 * @param {Object} [params.page_limit] - The number of records to return in each page of results. The default page limit is 100.
 * @param {boolean} [params.include_count] - Whether to include information about the number of records returned.
 * @param {Object} [params.sort] - Sorts the response according to the value of the specified property, in ascending or descending order.
 * @param {Object} [params.cursor] - A token identifying the last value from the previous page of results.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.listWorkspaces = function(params, callback) {
  if (typeof params === 'function' && !callback) {
    callback = params;
    params = {};
  }
  const query = { page_limit: params.page_limit, include_count: params.include_count, sort: params.sort, cursor: params.cursor };
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
  return requestFactory(parameters, callback);
};

/**
 * Update workspace.
 *
 * Update an existing workspace with new or modified data. You must provide component objects defining the content of the updated workspace.
 *
 * @param {Object} params - The parameters to send to the service.
 * @param {Object} params.workspace_id - The workspace ID.
 * @param {Object} [params.name] - The name of the workspace.
 * @param {Object} [params.description] - The description of the workspace.
 * @param {Object} [params.language] - The language of the workspace.
 * @param {Array<Object>} [params.intents] - An array of objects defining the intents for the workspace.
 * @param {Array<Object>} [params.entities] - An array of objects defining the entities for the workspace.
 * @param {Array<Object>} [params.dialog_nodes] - An array of objects defining the nodes in the workspace dialog.
 * @param {Array<Object>} [params.counterexamples] - An array of objects defining input examples that have been marked as irrelevant input.
 * @param {Object} [params.metadata] - Any metadata related to the workspace.
 * @param {Function} [callback] - The callback that handles the response.
 */
ConversationV1.prototype.updateWorkspace = function(params, callback) {
  params = params || {};
  const requiredParams = ['workspace_id'];
  const missingParams = helper.getMissingParams(params, requiredParams);
  if (missingParams) {
    callback(missingParams);
    return;
  }
  const body = { name: params.name, description: params.description, language: params.language, intents: params.intents, entities: params.entities, dialog_nodes: params.dialog_nodes, counterexamples: params.counterexamples, metadata: params.metadata };
  const path = { workspace_id: params.workspace_id };
  const parameters = {
    options: {
      url: '/v1/workspaces/{workspace_id}',
      method: 'POST',
      json: true,
      body: body,
      path: path
    },
    defaultOptions: extend(true, this._options, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
  };
  return requestFactory(parameters, callback);
};

module.exports = ConversationV1