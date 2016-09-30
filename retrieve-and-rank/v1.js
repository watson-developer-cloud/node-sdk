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

var fs             = require('fs');
var url            = require('url');
var requestFactory = require('../lib/requestwrapper');
var solr           = require('solr-client');
var helper         = require('../lib/helper');
var pick           = require('object.pick');
var omit           = require('object.omit');
var isStream       = require('isstream');
var util = require('util');
var BaseService = require('../lib/base_service');

/**
 *
 * @param options
 * @constructor
 */
function RetrieveAndRankV1(options) {
  BaseService.call(this, options);
}
util.inherits(RetrieveAndRankV1, BaseService);
RetrieveAndRankV1.prototype.name = 'retrieve_and_rank';
RetrieveAndRankV1.prototype.version = 'v1';
RetrieveAndRankV1.URL = 'https://gateway.watsonplatform.net/retrieve-and-rank/api';

/**
 * Creates a ranker
 */
RetrieveAndRankV1.prototype.createRanker = function(params, callback) {
  params = params || {};

  if (!params || !params.training_data) {
    callback(new Error('Missing required parameters: training_data'));
    return;
  }
  if ((typeof params.training_data !== 'string') && (!isStream(params.training_data))) {
    callback(new Error('training_data needs to be a String or Stream'));
    return;
  }

  var parameters = {
    options: {
      url: '/v1/rankers',
      method: 'POST',
      json: true,
      formData: {
        training_data: params.training_data,
        training_metadata: params.training_metadata || JSON.stringify(omit(params, ['training_data']))
      }
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns the ranked candidates
 *
 * @param {Object} params - everything except answer_data and answers will be passed in as answer_metadata
 * @param {String|ReadableStream} params.answer_data
 * @param {Number} [params.answers] - number of answers to return
 * @param {Function} callback
 */
RetrieveAndRankV1.prototype.rank = function(params, callback) {
  params = params || {};

  if (!params || !params.answer_data) {
    callback(new Error('Missing required parameters: answer_data'));
    return;
  }
  if ((typeof params.answer_data !== 'string') && (!isStream(params.answer_data))) {
    callback(new Error('answer_data needs to be a String or Stream'));
    return;
  }

  var topLevelParams = ['answer_data', 'answers'];
  var formData = pick(params, topLevelParams);
  formData.answer_metadata =  JSON.stringify(omit(params, topLevelParams));

  var parameters = {
    options: {
      url: '/v1/rankers/{ranker_id}/rank',
      method: 'POST',
      json: true,
      formData: formData,
      path: pick(params, ['ranker_id'])
    },
    requiredParams: ['ranker_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Returns the training status of the ranker
 */
RetrieveAndRankV1.prototype.rankerStatus = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/rankers/{ranker_id}',
      method: 'GET',
      json: true,
      path: params
    },
    requiredParams: ['ranker_id'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Retrieves the list of rankers for the user
 */
RetrieveAndRankV1.prototype.listRankers = function(params, callback) {
  var parameters = {
    options: {
      url: '/v1/rankers',
      method: 'GET',
      json: true
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Deletes a ranker
 */
RetrieveAndRankV1.prototype.deleteRanker = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/rankers/{ranker_id}',
      method: 'DELETE',
      path: params,
      json: true
    },
    requiredParams: ['ranker_id'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

// Solr cluster lifecycle operations

/**
 * Lists all Solr clusters associated with the service instance.
 *
 * @param params An Object representing the parameters for this service call.
 *   This request currently does not require any parameters.
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.listClusters = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/solr_clusters',
      method: 'GET',
      json: true
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Creates a Solr cluster.
 *
 * @param params An Object representing the parameters for this service call.
 *   Optional params
 *     - cluster_name: name to use for identifying the cluster in responses
 *     - cluster_size: size of the cluster to create
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.createCluster = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/solr_clusters',
      method: 'POST',
      json: true,
      body: params
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Checks whether the specified Solr cluster is ready for use.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to poll
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.pollCluster = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}',
      method: 'GET',
      path: params,
      json: true
    },
    requiredParams: ['cluster_id'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Change the size of the Solr cluster.

 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to poll
 *     - cluster_size: the integer size to resize the cluster to
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.resizeCluster = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}/cluster_size',
      method: 'PUT',
      body: { cluster_size: params.cluster_size },
      path: params,
      json: true
    },
    requiredParams: ['cluster_id', 'cluster_size'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Get the status of a resize request.

 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to poll
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.getResizeStatus = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}/cluster_size',
      method: 'GET',
      path: params,
      json: true
    },
    requiredParams: ['cluster_id'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Deletes a Solr cluster.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to delete
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.deleteCluster = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}',
      method: 'DELETE',
      path: params,
      json: true
    },
    requiredParams: ['cluster_id'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Get memory and disk usage stats from a Solr cluster
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to get stats from
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.getClusterStats = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}/stats',
      method: 'GET',
      path: params,
      json: true
    },
    requiredParams: ['cluster_id'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

// Solr config operations

/**
 * Lists the configuration sets in ZooKeeper.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to get configuration from
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.listConfigs = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}/config',
      method: 'GET',
      path: params,
      json: true
    },
    requiredParams: ['cluster_id'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Upload a configuration set to ZooKeeper.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to upload configuration to
 *     - config_name: the name of the config in ZooKeeper referenced when creating a collection
 *     - config_zip_path: the ZIP file to upload
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.uploadConfig = function(params, callback) {
  params = params || {};

  if (!params || !params.config_zip_path) {
    callback(new Error('Missing required parameters: config_zip_path'));
    return;
  }
  var configFile = null;
  if (typeof params.config_zip_path === 'string') {
    configFile = fs.createReadStream(params.config_zip_path);
  } else if (isStream(params.config_zip_path)) {
    configFile = params.config_zip_path;
  } else {
    callback(new Error('config_zip_path needs to be a String or Stream'));
    return;
  }

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}/config/{config_name}',
      method: 'POST',
      path: params
    },
    requiredParams: ['cluster_id', 'config_name'],
    defaultOptions: this._options
  };

  return configFile.on('response', function(response) {
    // Replace content-type
    response.headers['content-type'] = 'application/zip';
  }).pipe(requestFactory(parameters, callback));

};

/**
 * Get a configuration set from ZooKeeper as a .zip file.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to get configuration from
 *     - config_name: the name of the config in ZooKeeper
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.getConfig = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}/config/{config_name}',
      method: 'GET',
      path: params,
      json: true,
      headers: {
        'accept' : 'application/zip'
      }
    },
    requiredParams: ['cluster_id', 'config_name'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Delete a configuration set in ZooKeeper.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to delete configuration from
 *     - config_name: the name of the config in ZooKeeper
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.deleteConfig = function(params, callback) {
  params = params || {};

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}/config/{config_name}',
      method: 'DELETE',
      path: params,
      json: true
    },
    requiredParams: ['cluster_id', 'config_name'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

// Solr collection operations

/**
 * List all collections for a Solr cluster.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to list collections from
 *   Optional params:
 *     - wt: the writer type for the response, defaults to 'json'
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.listCollections = function(params, callback) {
  params = params || {};
  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}/solr/admin/collections',
      method: 'GET',
      qs: {
        action: 'LIST',
        wt: params.wt || 'json'
      },
      path: params,
      json: true
    },
    requiredParams: ['cluster_id'],
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Create a Solr collection.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to create the collection on
 *     - collection_name: the name of the collection to create
 *     - config_name: the name of the config in ZooKeeper
 *   Optional params:
 *     - wt: the writer type for the response, defaults to 'json'
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.createCollection = function(params, callback) {
  params = params || {};

  var missingParams = helper.getMissingParams(params, ['cluster_id', 'collection_name', 'config_name']);
  if (missingParams){
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }

  var queryParams = {
    'collection.configName': params.config_name,
    name: params.collection_name,
    wt: params.wt || 'json',
    action: 'CREATE'
  };

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}/solr/admin/collections',
      method: 'POST',
      qs: queryParams,
      path: pick(params,['cluster_id']),
      json: true
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Delete a Solr collection.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to delete the collection on
 *     - collection_name: the name of the collection to delete
 *   Optional params:
 *     - wt: the writer type for the response, defaults to 'json'
 *
 * @param callback The callback.
 */
RetrieveAndRankV1.prototype.deleteCollection = function(params, callback) {
  params = params || {};

  var missingParams = helper.getMissingParams(params, ['cluster_id', 'collection_name']);
  if (missingParams){
    callback(new Error('Missing required parameters: ' + missingParams.join(', ')));
    return;
  }

  var queryParams = {
    name: params.collection_name,
    wt: params.wt || 'json',
    action: 'DELETE'
  };

  var parameters = {
    options: {
      url: '/v1/solr_clusters/{cluster_id}/solr/admin/collections',
      method: 'POST',
      qs: queryParams,
      path: pick(params,['cluster_id']),
      json: true
    },
    defaultOptions: this._options
  };

  return requestFactory(parameters, callback);
};

/**
 * Get a Solr client for indexing and searching documents.
 * See https://github.com/lbdremy/solr-node-client for documentation and examples.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - cluster_id: the ID of the Solr cluster to delete the collection on
 *     - collection_name: the name of the collection for indexing/searching
 */
RetrieveAndRankV1.prototype.createSolrClient = function(params) {
  params = params || {};

  var missingParams = helper.getMissingParams(params, ['cluster_id', 'collection_name']);
  if (missingParams){
    throw new Error('Missing required parameters: ' + missingParams.join(', '));
  }

  var serviceUrl = url.parse(this._options.url);
  var apiPath = serviceUrl.path === '/' ? '' : serviceUrl.path || '';

  var solrClient = solr.createClient({
    host: serviceUrl.hostname,
    path: apiPath + '/v1/solr_clusters/' + params.cluster_id + '/solr',
    port: serviceUrl.port || '443',
    secure: true,
    core: params.collection_name
  });

  if (this._options.username && this._options.password) {
    solrClient.basicAuth(this._options.username, this._options.password);
  }
  return solrClient;
};

module.exports = RetrieveAndRankV1;
