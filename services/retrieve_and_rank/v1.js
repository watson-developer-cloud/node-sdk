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
var extend         = require('extend');
var requestFactory = require('../../lib/requestwrapper');
var solr           = require('solr-client');
var pick           = require('object.pick');
var omit           = require('object.omit');
var isStream       = require('isstream');

function RetrieveAndRank(options) {
  var serviceDefaults = {
    version: 'v1',
    url: 'https://gateway.watsonplatform.net/retrieve-and-rank/api'
  };

  // Extend default options with user provided options
  this._options = extend(serviceDefaults, options);
}

/**
 * Creates a ranker
 */
RetrieveAndRank.prototype.createRanker = function(params, callback) {
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
 */
RetrieveAndRank.prototype.rank = function(params, callback) {
  params = params || {};

  if (!params || !params.answer_data) {
    callback(new Error('Missing required parameters: answer_data'));
    return;
  }
  if ((typeof params.answer_data !== 'string') && (!isStream(params.answer_data))) {
    callback(new Error('answer_data needs to be a String or Stream'));
    return;
  }

  var parameters = {
    options: {
      url: '/v1/rankers/{ranker_id}/rank',
      method: 'POST',
      json: true,
      formData: {
        answer_data: params.answer_data,
        answer_metadata: JSON.stringify(omit(params, ['answer_data']))
      },
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
RetrieveAndRank.prototype.rankerStatus = function(params, callback) {
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
RetrieveAndRank.prototype.listRankers = function(params, callback) {
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
RetrieveAndRank.prototype.deleteRanker = function(params, callback) {
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
RetrieveAndRank.prototype.listClusters = function(params, callback) {
  return sendRequest('GET', solrClustersPath(), this._options, callback);
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
RetrieveAndRank.prototype.createCluster = function(params, callback) {
  // Avoid modifying the global options by making a deep copy
  var createOptions = JSON.parse(JSON.stringify(this._options));
  createOptions.body = JSON.stringify(params || {});
  if (createOptions.headers === undefined) {
    createOptions.headers = {};
  }
  createOptions.headers['Content-Type'] = 'application/json';

  return sendRequest('POST', solrClustersPath(), createOptions, callback);
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
RetrieveAndRank.prototype.pollCluster = function(params, callback) {
  if (!params || !params.cluster_id) {
    return callback(new Error('Missing required parameter: cluster_id'));
  }
  return sendRequest('GET', solrClusterPath(params.cluster_id), this._options, callback);
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
RetrieveAndRank.prototype.deleteCluster = function(params, callback) {
  if (!params || !params.cluster_id) {
    return callback(new Error('Missing required parameter: cluster_id'));
  }
  return sendRequest('DELETE', solrClusterPath(params.cluster_id), this._options, callback);
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
RetrieveAndRank.prototype.listConfigs = function(params, callback) {
  if (!params || !params.cluster_id) {
    return callback(new Error('Missing required parameter: cluster_id'));
  }
  return sendRequest('GET', solrConfigsPath(params.cluster_id), this._options, callback);
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
RetrieveAndRank.prototype.uploadConfig = function(params, callback) {
  if (!params || !params.cluster_id) {
    return callback(new Error('Missing required parameter: cluster_id'));
  } else if (!params.config_name) {
    return callback(new Error('Missing required parameter: config_name'));
  } else if (!params.config_zip_path) {
    return callback(new Error('Missing required parameter: config_zip_path'));
  }

  // Avoid modifying the global options by making a deep copy
  var uploadOptions = JSON.parse(JSON.stringify(this._options));
  uploadOptions.body = fs.readFileSync(params.config_zip_path);
  if (uploadOptions.headers === undefined) {
    uploadOptions.headers = {};
  }
  uploadOptions.headers['Content-Type'] = 'application/zip';

  return sendRequest('POST', solrConfigPath(params.cluster_id, params.config_name), uploadOptions, callback);
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
RetrieveAndRank.prototype.getConfig = function(params, callback) {
  if (!params || !params.cluster_id) {
    return callback(new Error('Missing required parameter: cluster_id'));
  } else if (!params.config_name) {
    return callback(new Error('Missing required parameter: config_name'));
  }
  return sendRequest('GET', solrConfigPath(params.cluster_id, params.config_name), this._options, callback);
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
RetrieveAndRank.prototype.deleteConfig = function(params, callback) {
  if (!params || !params.cluster_id) {
    return callback(new Error('Missing required parameter: cluster_id'));
  } else if (!params.config_name) {
    return callback(new Error('Missing required parameter: config_name'));
  }
  return sendRequest('DELETE', solrConfigPath(params.cluster_id, params.config_name), this._options, callback);
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
RetrieveAndRank.prototype.listCollections = function(params, callback) {
  if (!params || !params.cluster_id) {
    return callback(new Error('Missing required parameter: cluster_id'));
  }
  var listPath = adminCollectionsPath(params.cluster_id, 'LIST', getWriterType(params));
  return sendRequest('GET', listPath, this._options, callback);
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
RetrieveAndRank.prototype.createCollection = function(params, callback) {
  if (!params || !params.cluster_id) {
    return callback(new Error('Missing required parameter: cluster_id'));
  } else if (!params.collection_name) {
    return callback(new Error('Missing required parameter: collection_name'));
  } else if (!params.config_name) {
    return callback(new Error('Missing required parameter: config_name'));
  }
  var createPath = adminCollectionsPath(params.cluster_id, 'CREATE', getWriterType(params));
  createPath += '&name=' + params.collection_name + '&collection.configName=' + params.config_name;
  return sendRequest('GET', createPath, this._options, callback);
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
RetrieveAndRank.prototype.deleteCollection = function(params, callback) {
  if (!params || !params.cluster_id) {
    return callback(new Error('Missing required parameter: cluster_id'));
  } else if (!params.collection_name) {
    return callback(new Error('Missing required parameter: collection_name'));
  }
  var deletePath = adminCollectionsPath(params.cluster_id, 'DELETE', getWriterType(params)) +
    '&name=' + params.collection_name;
  return sendRequest('GET', deletePath, this._options, callback);
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
RetrieveAndRank.prototype.createSolrClient = function(params) {
  if (!params || !params.cluster_id) {
    throw new Error('Missing required parameter: cluster_id');
  } else if (!params.collection_name) {
    throw new Error('Missing required parameter: collection_name');
  }
  var serviceUrl = url.parse(this._options.url);
  var apiPath = serviceUrl.path === '/' ? '' : serviceUrl.path || '';

  var solrClient = solr.createClient({
    host: serviceUrl.hostname,
    path: apiPath + solrClusterPath(params.cluster_id) + '/solr',
    port: serviceUrl.port || '443',
    secure: true,
    core: params.collection_name
  });

  if (this._options.api_key) {
    var auth = new Buffer(this._options.api_key, 'base64').toString('ascii').split(':');
    solrClient.basicAuth(auth[0], auth[1]);
  }
  return solrClient;
};

// Helper methods

function solrClustersPath() {
  return '/v1/solr_clusters';
}

function solrClusterPath(clusterId) {
  return solrClustersPath() +'/' + clusterId;
}

function solrConfigsPath(clusterId) {
  return solrClusterPath(clusterId) + '/config';
}

function solrConfigPath(clusterId, configName) {
  return solrConfigsPath(clusterId) + '/' + configName;
}

function adminCollectionsPath(clusterId, action, wt) {
  return solrClusterPath(clusterId) + '/solr/admin/collections?action=' + action + '&wt=' + wt;
}

function getWriterType(params) {
  if (params && params.wt) {
    return params.wt;
  }
  return 'json';
}

function sendRequest(method, url, options, callback) {
  var parameters = {
    options: {
      method: method,
      url: url
    },
    defaultOptions: options
  };
  return requestFactory(parameters, callback);
}

module.exports = RetrieveAndRank;
