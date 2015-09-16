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

function Search(options) {
  console.warn('WARNING! The Search client has been replaced by the RetrieveAndRank client.');

  var serviceDefaults = {
    version: 'v1',
    url: 'https://gateway.watsonplatform.net/search/api'
  };

  // Extend default options with user provided options
  this._options = extend(serviceDefaults, options);
}

// Solr cluster lifecycle operations

/**
 * Lists all Solr clusters currently associated with the service instance.
 *
 * @param params An Object representing the parameters for this service call.
 *   This request currently does not require any parameters.
 *
 * @param callback The callback.
 */
Search.prototype.listClusters = function(params, callback) {
  return sendRequest('GET', solrClustersPath(), this._options, callback);
};

/**
 * Deletes all Solr clusters currently associated with the service instance.
 *
 * @param params An Object representing the parameters for this service call.
 *   This request currently does not require any parameters.
 *
 * @param callback The callback.
 */
Search.prototype.deleteClusters = function(params, callback) {
  return sendRequest('DELETE', solrClustersPath(), this._options, callback);
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
Search.prototype.createCluster = function(params, callback) {
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
 *     - clusterId: the ID of the Solr cluster to poll
 *
 * @param callback The callback.
 */
Search.prototype.pollCluster = function(params, callback) {
  if (!params || !params.clusterId) {
    return callback(new Error('Missing required parameter: clusterId'));
  }
  return sendRequest('GET', solrClusterPath(params.clusterId), this._options, callback);
};

/**
 * Deletes an existing Solr cluster.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - clusterId: the ID of the Solr cluster to delete
 *
 * @param callback The callback.
 */
Search.prototype.deleteCluster = function(params, callback) {
  if (!params || !params.clusterId) {
    return callback(new Error('Missing required parameter: clusterId'));
  }
  return sendRequest('DELETE', solrClusterPath(params.clusterId), this._options, callback);
};

// Solr config operations

/**
 * Lists the configuration sets in ZooKeeper.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - clusterId: the ID of the Solr cluster to get configuration from
 *
 * @param callback The callback.
 */
Search.prototype.listConfigs = function(params, callback) {
  if (!params || !params.clusterId) {
    return callback(new Error('Missing required parameter: clusterId'));
  }
  return sendRequest('GET', solrConfigsPath(params.clusterId), this._options, callback);
};

/**
 * Upload a configuration set to ZooKeeper.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - clusterId: the ID of the Solr cluster to upload configuration to
 *     - configName: the name of the config in ZooKeeper referenced when creating a collection
 *     - configZipPath: the ZIP file to upload
 *
 * @param callback The callback.
 */
Search.prototype.uploadConfig = function(params, callback) {
  if (!params || !params.clusterId) {
    return callback(new Error('Missing required parameter: clusterId'));
  } else if (!params.configName) {
    return callback(new Error('Missing required parameter: configName'));
  } else if (!params.configZipPath) {
    return callback(new Error('Missing required parameter: configZipPath'));
  }

  // Avoid modifying the global options by making a deep copy
  var uploadOptions = JSON.parse(JSON.stringify(this._options));
  uploadOptions.body = fs.readFileSync(params.configZipPath);
  if (uploadOptions.headers === undefined) {
    uploadOptions.headers = {};
  }
  uploadOptions.headers['Content-Type'] = 'application/zip';

  return sendRequest('POST', solrConfigPath(params.clusterId, params.configName), uploadOptions, callback);
};

/**
 * Get a configuration set from ZooKeeper as a ZIP file.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - clusterId: the ID of the Solr cluster to get configuration from
 *     - configName: the name of the config in ZooKeeper
 *
 * @param callback The callback.
 */
Search.prototype.getConfig = function(params, callback) {
  if (!params || !params.clusterId) {
    return callback(new Error('Missing required parameter: clusterId'));
  } else if (!params.configName) {
    return callback(new Error('Missing required parameter: configName'));
  }
  return sendRequest('GET', solrConfigPath(params.clusterId, params.configName), this._options, callback);
};

/**
 * Delete a configuration set in ZooKeeper.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - clusterId: the ID of the Solr cluster to delete configuration from
 *     - configName: the name of the config in ZooKeeper
 *
 * @param callback The callback.
 */
Search.prototype.deleteConfig = function(params, callback) {
  if (!params || !params.clusterId) {
    return callback(new Error('Missing required parameter: clusterId'));
  } else if (!params.configName) {
    return callback(new Error('Missing required parameter: configName'));
  }
  return sendRequest('DELETE', solrConfigPath(params.clusterId, params.configName), this._options, callback);
};

// Solr collection operations

/**
 * List all collections for a given Solr cluster.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - clusterId: the ID of the Solr cluster to list collections from
 *
 * @param callback The callback.
 */
Search.prototype.listCollections = function(params, callback) {
  if (!params || !params.clusterId) {
    return callback(new Error('Missing required parameter: clusterId'));
  }
  return sendRequest('GET', adminCollectionsPath(params.clusterId, 'LIST'), this._options, callback);
};

/**
 * Create a Solr collection.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - clusterId: the ID of the Solr cluster to create the collection on
 *     - collectionName: the name of the collection to create
 *     - configName: the name of the config in ZooKeeper
 *
 * @param callback The callback.
 */
Search.prototype.createCollection = function(params, callback) {
  if (!params || !params.clusterId) {
    return callback(new Error('Missing required parameter: clusterId'));
  } else if (!params.collectionName) {
    return callback(new Error('Missing required parameter: collectionName'));
  } else if (!params.configName) {
    return callback(new Error('Missing required parameter: configName'));
  }
  var createPath = adminCollectionsPath(params.clusterId, 'CREATE');
  createPath += '&name=' + params.collectionName + '&collection.configName=' + params.configName;
  return sendRequest('GET', createPath, this._options, callback);
};

/**
 * Delete a Solr collection.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - clusterId: the ID of the Solr cluster to delete the collection on
 *     - collectionName: the name of the collection to delete
 *
 * @param callback The callback.
 */
Search.prototype.deleteCollection = function(params, callback) {
  if (!params || !params.clusterId) {
    return callback(new Error('Missing required parameter: clusterId'));
  } else if (!params.collectionName) {
    return callback(new Error('Missing required parameter: collectionName'));
  }
  var deletePath = adminCollectionsPath(params.clusterId, 'DELETE') + '&name=' + params.collectionName;
  return sendRequest('GET', deletePath, this._options, callback);
};

/**
 * Get a Solr client for indexing and searching documents.
 * See https://github.com/lbdremy/solr-node-client for documentation and examples.
 *
 * @param params An Object representing the parameters for this service call.
 *   Required params:
 *     - clusterId: the ID of the Solr cluster to delete the collection on
 *     - collectionName: the name of the collection for indexing/searching
 *     - username: the Bluemix service username
 *     - password: the Bluemix service password
 */
Search.prototype.createSolrClient = function(params) {
  if (!params || !params.clusterId) {
    throw new Error('Missing required parameter: clusterId');
  } else if (!params.collectionName) {
    throw new Error('Missing required parameter: collectionName');
  }
  var serviceUrl = url.parse(this._options.url);
  var apiPath = serviceUrl.path === '/' ? '' : serviceUrl.path || '';

  var solrClient = solr.createClient({
    host: serviceUrl.hostname,
    path: apiPath + solrClusterPath(params.clusterId) + '/solr',
    port: serviceUrl.port || '443',
    secure: true,
    core: params.collectionName
  });
  solrClient.basicAuth(params.username, params.password);
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

function adminCollectionsPath(clusterId, action) {
  return solrClusterPath(clusterId) + '/solr/admin/collections?action=' + action;
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

module.exports = Search;
