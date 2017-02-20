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

const util = require('util');
const requestFactory = require('../lib/requestwrapper');
const BaseService = require('../lib/base_service');
const pick = require('object.pick');

/**
 *
 * @param {Object} options
 * @constructor
 */
function DiscoveryV1Experimental(options) {
  BaseService.call(this, options);

  // Check if 'version_date' was provided
  if (typeof this._options.version_date === 'undefined') {
    throw new Error('Argument error: version_date was not specified, use DiscoveryV1Experimental.VERSION_DATE_2016_07_11');
  }
  this._options.qs.version = options.version_date;
}

util.inherits(DiscoveryV1Experimental, BaseService);
DiscoveryV1Experimental.prototype.name = 'discovery';
DiscoveryV1Experimental.prototype.version = 'v1-experimental';
DiscoveryV1Experimental.URL = 'https://gateway.watsonplatform.net/discovery-experimental/api';

/**
 * Initial release
 * @type {string}
 */
DiscoveryV1Experimental.VERSION_DATE_2016_07_11 = '2016-11-07';

/**
 * Return the list of environments
 *
 * @param {Object} params
 * @param {String} [params.name] search enviroments with the given name
 */
DiscoveryV1Experimental.prototype.getEnvironments = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments',
      method: 'GET',
      json: true,
      qs: pick(params, ['name'])
    },
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get details about an environment
 *
 * @param {Object} params
 * @param {String} params.environment_id
 */
DiscoveryV1Experimental.prototype.getEnvironment = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}',
      method: 'GET',
      path: pick(params, ['environment_id']),
      json: true
    },
    requiredParams: ['environment_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Return the list of collections in the given environment
 *
 * @param {Object} params
 * @param {String} params.environment_id
 * @param {String} [params.name] Find collections with the given name.
 */
DiscoveryV1Experimental.prototype.getCollections = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections',
      method: 'GET',
      path: pick(params, ['environment_id']),
      json: true
    },
    requiredParams: ['environment_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Get details about a collection
 *
 * @param {Object} params
 * @param {String} params.environment_id
 * @param {string} params.collection_id
 */
DiscoveryV1Experimental.prototype.getCollection = function(params, collectionId, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections/{collection_id}',
      method: 'GET',
      path: pick(params, ['environment_id', 'collection_id']),
      json: true
    },
    requiredParams: ['environment_id', 'collection_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

/**
 * Queries the collection
 *
 * @param {Object} params
 * @param {String} params.environment_id
 * @param {string} params.collection_id
 * @param {String} [params.filter]  A cacheable query that allows you to limit the information returned to exclude anything that isn't related to what you are searching. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the dataset.
 * @param {String} [params.query]  A query search returns all possible results, even when it's not very relevant, with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. Results are scored between 0 and 1, with 1 being an exact match and 0 being not a match at all.
 * @param {String} [params.aggregation] An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
 * @param {Number} [params.count=10] Number of documents to return
 * @param {String} [params.return] A comma separated list of the portion of the document hierarchy to return.
 * @param {Number} [params.offset=0] For pagination purposes. Returns additional pages of results. Deep pagination is highly unperformant, and should be avoided.
 */
DiscoveryV1Experimental.prototype.query = function(params, callback) {
  params = params || {};

  const parameters = {
    options: {
      url: '/v1/environments/{environment_id}/collections/{collection_id}/query',
      method: 'GET',
      json: true,
      path: pick(params, ['environment_id', 'collection_id']),
      qs: pick(params, ['filter', 'aggregation', 'return', 'count', 'offset', 'query'])
    },
    requiredParams: ['environment_id', 'collection_id'],
    defaultOptions: this._options
  };
  return requestFactory(parameters, callback);
};

module.exports = DiscoveryV1Experimental;
