/**
 * (C) Copyright IBM Corp. 2019, 2021.
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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.38.0-07189efd-20210827-205025
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  getMissingParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * IBM Watson&trade; Discovery is a cognitive search and content analytics engine that you can add to applications to
 * identify patterns, trends and actionable insights to drive better decision-making. Securely unify structured and
 * unstructured data with pre-enriched content, and use a simplified query language to eliminate the need for manual
 * filtering of results.
 *
 * API Version: 2.0
 * See: https://cloud.ibm.com/docs/discovery-data
 */

class DiscoveryV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.discovery.watson.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'discovery';

  /** Release date of the version of the API you want to use. Specify dates in YYYY-MM-DD format. The current
   *  version is `2020-08-30`.
   */
  version: string;

  /**
   * Construct a DiscoveryV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - Release date of the version of the API you want to use. Specify dates in
   * YYYY-MM-DD format. The current version is `2020-08-30`.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {DiscoveryV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['version'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
    if (!options.serviceName) {
      options.serviceName = DiscoveryV2.DEFAULT_SERVICE_NAME;
    }
    // If the caller didn't supply an authenticator, construct one from external configuration.
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    super(options);
    this.configureService(options.serviceName);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    }
    this.version = options.version;
  }

  /*************************
   * collections
   ************************/

  /**
   * List collections.
   *
   * Lists existing collections for the specified project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.ListCollectionsResponse>>}
   */
  public listCollections(
    params: DiscoveryV2.ListCollectionsParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.ListCollectionsResponse>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listCollections'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a collection.
   *
   * Create a new collection in the specified project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.name - The name of the collection.
   * @param {string} [params.description] - A description of the collection.
   * @param {string} [params.language] - The language of the collection.
   * @param {CollectionEnrichment[]} [params.enrichments] - An array of enrichments that are applied to this collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.CollectionDetails>>}
   */
  public createCollection(
    params: DiscoveryV2.CreateCollectionParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.CollectionDetails>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'name'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'language': _params.language,
      'enrichments': _params.enrichments,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createCollection'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get collection.
   *
   * Get details about the specified collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.CollectionDetails>>}
   */
  public getCollection(
    params: DiscoveryV2.GetCollectionParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.CollectionDetails>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'collectionId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'collection_id': _params.collectionId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getCollection'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a collection.
   *
   * Updates the specified collection's name, description, and enrichments.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} [params.name] - The name of the collection.
   * @param {string} [params.description] - A description of the collection.
   * @param {CollectionEnrichment[]} [params.enrichments] - An array of enrichments that are applied to this collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.CollectionDetails>>}
   */
  public updateCollection(
    params: DiscoveryV2.UpdateCollectionParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.CollectionDetails>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'collectionId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'enrichments': _params.enrichments,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'collection_id': _params.collectionId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateCollection'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a collection.
   *
   * Deletes the specified collection from the project. All documents stored in the specified collection and not shared
   * is also deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Empty>>}
   */
  public deleteCollection(
    params: DiscoveryV2.DeleteCollectionParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Empty>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'collectionId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'collection_id': _params.collectionId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteCollection'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * queries
   ************************/

  /**
   * Query a project.
   *
   * By using this method, you can construct queries. For details, see the [Discovery
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-query-concepts). The default query
   * parameters are defined by the settings for this project, see the [Discovery
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-project-defaults) for an overview of
   * the standard default settings, and see [the Projects API documentation](#create-project) for details about how to
   * set custom default query settings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string[]} [params.collectionIds] - A comma-separated list of collection IDs to be queried against.
   * @param {string} [params.filter] - A cacheable query that excludes documents that don't mention the query content.
   * Filter searches are better for metadata-type searches and for assessing the concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and
   * full text, but with the most relevant documents listed first. Use a query search when you want to find the most
   * relevant search results.
   * @param {string} [params.naturalLanguageQuery] - A natural language query that returns relevant documents by
   * utilizing training data and natural language understanding.
   * @param {string} [params.aggregation] - An aggregation search that returns an exact answer by combining query search
   * with filters. Useful for applications to build lists, tables, and time series. For a full list of possible
   * aggregations, see the Query reference.
   * @param {number} [params.count] - Number of results to return.
   * @param {string[]} [params._return] - A list of the fields in the document hierarchy to return. If this parameter is
   * an empty list, then all fields are returned.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total
   * number of results that are returned is 10 and the offset is 8, it returns the last two results.
   * @param {string} [params.sort] - A comma-separated list of fields in the document to sort on. You can optionally
   * specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the
   * default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When `true`, a highlight field is returned for each result which contains the
   * fields which match the query with `<em></em>` tags around the matching query terms.
   * @param {boolean} [params.spellingSuggestions] - When `true` and the **natural_language_query** parameter is used,
   * the **natural_language_query** parameter is spell checked. The most likely correction is returned in the
   * **suggested_query** field of the response (if one exists).
   * @param {QueryLargeTableResults} [params.tableResults] - Configuration for table retrieval.
   * @param {QueryLargeSuggestedRefinements} [params.suggestedRefinements] - Configuration for suggested refinements.
   * Available with Premium plans only.
   * @param {QueryLargePassages} [params.passages] - Configuration for passage retrieval.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.QueryResponse>>}
   */
  public query(
    params: DiscoveryV2.QueryParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.QueryResponse>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'collection_ids': _params.collectionIds,
      'filter': _params.filter,
      'query': _params.query,
      'natural_language_query': _params.naturalLanguageQuery,
      'aggregation': _params.aggregation,
      'count': _params.count,
      'return': _params._return,
      'offset': _params.offset,
      'sort': _params.sort,
      'highlight': _params.highlight,
      'spelling_suggestions': _params.spellingSuggestions,
      'table_results': _params.tableResults,
      'suggested_refinements': _params.suggestedRefinements,
      'passages': _params.passages,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'query'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/query',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get Autocomplete Suggestions.
   *
   * Returns completion query suggestions for the specified prefix.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.prefix - The prefix to use for autocompletion. For example, the prefix `Ho` could
   * autocomplete to `hot`, `housing`, or `how`.
   * @param {string[]} [params.collectionIds] - Comma separated list of the collection IDs. If this parameter is not
   * specified, all collections in the project are used.
   * @param {string} [params.field] - The field in the result documents that autocompletion suggestions are identified
   * from.
   * @param {number} [params.count] - The number of autocompletion suggestions to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Completions>>}
   */
  public getAutocompletion(
    params: DiscoveryV2.GetAutocompletionParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Completions>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'prefix'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'prefix': _params.prefix,
      'collection_ids': _params.collectionIds,
      'field': _params.field,
      'count': _params.count,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getAutocompletion'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/autocompletion',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query collection notices.
   *
   * Finds collection-level notices (errors and warnings) that are generated when documents are ingested.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} [params.filter] - A cacheable query that excludes documents that don't mention the query content.
   * Filter searches are better for metadata-type searches and for assessing the concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and
   * full text, but with the most relevant documents listed first.
   * @param {string} [params.naturalLanguageQuery] - A natural language query that returns relevant documents by
   * utilizing training data and natural language understanding.
   * @param {number} [params.count] - Number of results to return. The maximum for the **count** and **offset** values
   * together in any one query is **10000**.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total
   * number of results that are returned is 10 and the offset is 8, it returns the last two results. The maximum for the
   * **count** and **offset** values together in any one query is **10000**.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.QueryNoticesResponse>>}
   */
  public queryCollectionNotices(
    params: DiscoveryV2.QueryCollectionNoticesParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.QueryNoticesResponse>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'collectionId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'filter': _params.filter,
      'query': _params.query,
      'natural_language_query': _params.naturalLanguageQuery,
      'count': _params.count,
      'offset': _params.offset,
    };

    const path = {
      'project_id': _params.projectId,
      'collection_id': _params.collectionId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'queryCollectionNotices'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/notices',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Query project notices.
   *
   * Finds project-level notices (errors and warnings). Currently, project-level notices are generated by relevancy
   * training.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} [params.filter] - A cacheable query that excludes documents that don't mention the query content.
   * Filter searches are better for metadata-type searches and for assessing the concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and
   * full text, but with the most relevant documents listed first.
   * @param {string} [params.naturalLanguageQuery] - A natural language query that returns relevant documents by
   * utilizing training data and natural language understanding.
   * @param {number} [params.count] - Number of results to return. The maximum for the **count** and **offset** values
   * together in any one query is **10000**.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total
   * number of results that are returned is 10 and the offset is 8, it returns the last two results. The maximum for the
   * **count** and **offset** values together in any one query is **10000**.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.QueryNoticesResponse>>}
   */
  public queryNotices(
    params: DiscoveryV2.QueryNoticesParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.QueryNoticesResponse>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'filter': _params.filter,
      'query': _params.query,
      'natural_language_query': _params.naturalLanguageQuery,
      'count': _params.count,
      'offset': _params.offset,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'queryNotices'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/notices',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List fields.
   *
   * Gets a list of the unique fields (and their types) stored in the the specified collections.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string[]} [params.collectionIds] - Comma separated list of the collection IDs. If this parameter is not
   * specified, all collections in the project are used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.ListFieldsResponse>>}
   */
  public listFields(
    params: DiscoveryV2.ListFieldsParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.ListFieldsResponse>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'collection_ids': _params.collectionIds,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listFields'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/fields',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * componentSettings
   ************************/

  /**
   * List component settings.
   *
   * Returns default configuration settings for components.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.ComponentSettingsResponse>>}
   */
  public getComponentSettings(
    params: DiscoveryV2.GetComponentSettingsParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.ComponentSettingsResponse>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getComponentSettings'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/component_settings',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * documents
   ************************/

  /**
   * Add a document.
   *
   * Add a document to a collection with optional metadata.
   *
   * Returns immediately after the system has accepted the document for processing.
   *
   *   * The user must provide document content, metadata, or both. If the request is missing both document content and
   * metadata, it is rejected.
   *
   *   * The user can set the **Content-Type** parameter on the **file** part to indicate the media type of the
   * document. If the **Content-Type** parameter is missing or is one of the generic media types (for example,
   * `application/octet-stream`), then the service attempts to automatically detect the document's media type.
   *
   *   * The following field names are reserved and are filtered out if present after normalization: `id`, `score`,
   * `highlight`, and any field with the prefix of: `_`, `+`, or `-`
   *
   *   * Fields with empty name values after normalization are filtered out before indexing.
   *
   *   * Fields that contain the following characters after normalization are filtered out before indexing: `#` and `,`
   *
   *   If the document is uploaded to a collection that shares its data with another collection, the
   * **X-Watson-Discovery-Force** header must be set to `true`.
   *
   * **Note:** Documents can be added with a specific **document_id** by using the
   * **_/v2/projects/{project_id}/collections/{collection_id}/documents** method.
   *
   * **Note:** This operation only works on collections created to accept direct file uploads. It cannot be used to
   * modify a collection that connects to an external source such as Microsoft SharePoint.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {NodeJS.ReadableStream | Buffer} [params.file] - The content of the document to ingest. For maximum
   * supported file size limits, see [the
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
   * @param {string} [params.filename] - The filename for file.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.metadata] - The maximum supported metadata file size is 1 MB. Metadata parts larger than 1
   * MB are rejected.
   *
   *
   * Example:  ``` {
   *   "Creator": "Johnny Appleseed",
   *   "Subject": "Apples"
   * } ```.
   * @param {boolean} [params.xWatsonDiscoveryForce] - When `true`, the uploaded document is added to the collection
   * even if the data for that collection is shared with other collections.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentAccepted>>}
   */
  public addDocument(
    params: DiscoveryV2.AddDocumentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentAccepted>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'collectionId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const formData = {
      'file': {
        data: _params.file,
        filename: _params.filename,
        contentType: _params.fileContentType,
      },
      'metadata': _params.metadata,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'collection_id': _params.collectionId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'addDocument'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/documents',
        method: 'POST',
        qs: query,
        path,
        formData
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-Watson-Discovery-Force': _params.xWatsonDiscoveryForce,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a document.
   *
   * Replace an existing document or add a document with a specified **document_id**. Starts ingesting a document with
   * optional metadata.
   *
   * If the document is uploaded to a collection that shares its data with another collection, the
   * **X-Watson-Discovery-Force** header must be set to `true`.
   *
   * **Note:** When uploading a new document with this method it automatically replaces any document stored with the
   * same **document_id** if it exists.
   *
   * **Note:** This operation only works on collections created to accept direct file uploads. It cannot be used to
   * modify a collection that connects to an external source such as Microsoft SharePoint.
   *
   * **Note:** If an uploaded document is segmented, all segments are overwritten, even if the updated version of the
   * document has fewer segments.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.documentId - The ID of the document.
   * @param {NodeJS.ReadableStream | Buffer} [params.file] - The content of the document to ingest. For maximum
   * supported file size limits, see [the
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
   * @param {string} [params.filename] - The filename for file.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.metadata] - The maximum supported metadata file size is 1 MB. Metadata parts larger than 1
   * MB are rejected.
   *
   *
   * Example:  ``` {
   *   "Creator": "Johnny Appleseed",
   *   "Subject": "Apples"
   * } ```.
   * @param {boolean} [params.xWatsonDiscoveryForce] - When `true`, the uploaded document is added to the collection
   * even if the data for that collection is shared with other collections.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentAccepted>>}
   */
  public updateDocument(
    params: DiscoveryV2.UpdateDocumentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentAccepted>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'collectionId', 'documentId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const formData = {
      'file': {
        data: _params.file,
        filename: _params.filename,
        contentType: _params.fileContentType,
      },
      'metadata': _params.metadata,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'collection_id': _params.collectionId,
      'document_id': _params.documentId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateDocument'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/documents/{document_id}',
        method: 'POST',
        qs: query,
        path,
        formData
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-Watson-Discovery-Force': _params.xWatsonDiscoveryForce,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a document.
   *
   * If the given document ID is invalid, or if the document is not found, then the a success response is returned (HTTP
   * status code `200`) with the status set to 'deleted'.
   *
   * **Note:** This operation only works on collections created to accept direct file uploads. It cannot be used to
   * modify a collection that connects to an external source such as Microsoft SharePoint.
   *
   * **Note:** Segments of an uploaded document cannot be deleted individually. Delete all segments by deleting using
   * the `parent_document_id` of a segment result.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.documentId - The ID of the document.
   * @param {boolean} [params.xWatsonDiscoveryForce] - When `true`, the uploaded document is added to the collection
   * even if the data for that collection is shared with other collections.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DeleteDocumentResponse>>}
   */
  public deleteDocument(
    params: DiscoveryV2.DeleteDocumentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DeleteDocumentResponse>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'collectionId', 'documentId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'collection_id': _params.collectionId,
      'document_id': _params.documentId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteDocument'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/documents/{document_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Watson-Discovery-Force': _params.xWatsonDiscoveryForce,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * trainingData
   ************************/

  /**
   * List training queries.
   *
   * List the training queries for the specified project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.TrainingQuerySet>>}
   */
  public listTrainingQueries(
    params: DiscoveryV2.ListTrainingQueriesParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.TrainingQuerySet>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listTrainingQueries'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/training_data/queries',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete training queries.
   *
   * Removes all training queries for the specified project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Empty>>}
   */
  public deleteTrainingQueries(
    params: DiscoveryV2.DeleteTrainingQueriesParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Empty>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteTrainingQueries'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/training_data/queries',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create training query.
   *
   * Add a query to the training data for this project. The query can contain a filter and natural language query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.naturalLanguageQuery - The natural text query for the training query.
   * @param {TrainingExample[]} params.examples - Array of training examples.
   * @param {string} [params.filter] - The filter used on the collection before the **natural_language_query** is
   * applied.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.TrainingQuery>>}
   */
  public createTrainingQuery(
    params: DiscoveryV2.CreateTrainingQueryParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.TrainingQuery>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'naturalLanguageQuery', 'examples'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'natural_language_query': _params.naturalLanguageQuery,
      'examples': _params.examples,
      'filter': _params.filter,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createTrainingQuery'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/training_data/queries',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a training data query.
   *
   * Get details for a specific training data query, including the query string and all examples.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.queryId - The ID of the query used for training.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.TrainingQuery>>}
   */
  public getTrainingQuery(
    params: DiscoveryV2.GetTrainingQueryParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.TrainingQuery>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'queryId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'query_id': _params.queryId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getTrainingQuery'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/training_data/queries/{query_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a training query.
   *
   * Updates an existing training query and it's examples.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.queryId - The ID of the query used for training.
   * @param {string} params.naturalLanguageQuery - The natural text query for the training query.
   * @param {TrainingExample[]} params.examples - Array of training examples.
   * @param {string} [params.filter] - The filter used on the collection before the **natural_language_query** is
   * applied.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.TrainingQuery>>}
   */
  public updateTrainingQuery(
    params: DiscoveryV2.UpdateTrainingQueryParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.TrainingQuery>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'queryId', 'naturalLanguageQuery', 'examples'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'natural_language_query': _params.naturalLanguageQuery,
      'examples': _params.examples,
      'filter': _params.filter,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'query_id': _params.queryId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateTrainingQuery'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/training_data/queries/{query_id}',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a training data query.
   *
   * Removes details from a training data query, including the query string and all examples.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.queryId - The ID of the query used for training.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Empty>>}
   */
  public deleteTrainingQuery(
    params: DiscoveryV2.DeleteTrainingQueryParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Empty>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'queryId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'query_id': _params.queryId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteTrainingQuery'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/training_data/queries/{query_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * analyze
   ************************/

  /**
   * Analyze a Document.
   *
   * Process a document using the specified collection's settings and return it for realtime use.
   *
   * **Note:** Documents processed using this method are not added to the specified collection.
   *
   * **Note:** This method is only supported on IBM Cloud Pak for Data instances of Discovery.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {NodeJS.ReadableStream | Buffer} [params.file] - The content of the document to ingest. For maximum
   * supported file size limits, see [the
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
   * @param {string} [params.filename] - The filename for file.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.metadata] - The maximum supported metadata file size is 1 MB. Metadata parts larger than 1
   * MB are rejected.
   *
   *
   * Example:  ``` {
   *   "Creator": "Johnny Appleseed",
   *   "Subject": "Apples"
   * } ```.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.AnalyzedDocument>>}
   */
  public analyzeDocument(
    params: DiscoveryV2.AnalyzeDocumentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.AnalyzedDocument>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'collectionId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const formData = {
      'file': {
        data: _params.file,
        filename: _params.filename,
        contentType: _params.fileContentType,
      },
      'metadata': _params.metadata,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'collection_id': _params.collectionId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'analyzeDocument'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/analyze',
        method: 'POST',
        qs: query,
        path,
        formData
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * enrichments
   ************************/

  /**
   * List Enrichments.
   *
   * List the enrichments available to this project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Enrichments>>}
   */
  public listEnrichments(
    params: DiscoveryV2.ListEnrichmentsParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Enrichments>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listEnrichments'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/enrichments',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create an enrichment.
   *
   * Create an enrichment for use with the specified project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {CreateEnrichment} params.enrichment - Information about a specific enrichment.
   * @param {NodeJS.ReadableStream | Buffer} [params.file] - The enrichment file to upload.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Enrichment>>}
   */
  public createEnrichment(
    params: DiscoveryV2.CreateEnrichmentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Enrichment>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'enrichment'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const formData = {
      'enrichment': _params.enrichment,
      'file': {
        data: _params.file,
        contentType: 'application/octet-stream',
      },
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createEnrichment'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/enrichments',
        method: 'POST',
        qs: query,
        path,
        formData
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get enrichment.
   *
   * Get details about a specific enrichment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.enrichmentId - The ID of the enrichment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Enrichment>>}
   */
  public getEnrichment(
    params: DiscoveryV2.GetEnrichmentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Enrichment>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'enrichmentId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'enrichment_id': _params.enrichmentId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getEnrichment'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/enrichments/{enrichment_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update an enrichment.
   *
   * Updates an existing enrichment's name and description.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.enrichmentId - The ID of the enrichment.
   * @param {string} params.name - A new name for the enrichment.
   * @param {string} [params.description] - A new description for the enrichment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Enrichment>>}
   */
  public updateEnrichment(
    params: DiscoveryV2.UpdateEnrichmentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Enrichment>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'enrichmentId', 'name'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'enrichment_id': _params.enrichmentId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateEnrichment'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/enrichments/{enrichment_id}',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an enrichment.
   *
   * Deletes an existing enrichment from the specified project.
   *
   * **Note:** Only enrichments that have been manually created can be deleted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.enrichmentId - The ID of the enrichment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Empty>>}
   */
  public deleteEnrichment(
    params: DiscoveryV2.DeleteEnrichmentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Empty>> {
    const _params = { ...params };
    const requiredParams = ['projectId', 'enrichmentId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'enrichment_id': _params.enrichmentId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteEnrichment'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/enrichments/{enrichment_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * projects
   ************************/

  /**
   * List projects.
   *
   * Lists existing projects for this instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.ListProjectsResponse>>}
   */
  public listProjects(
    params?: DiscoveryV2.ListProjectsParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.ListProjectsResponse>> {
    const _params = { ...params };

    const query = {
      'version': this.version,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listProjects'
    );

    const parameters = {
      options: {
        url: '/v2/projects',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a Project.
   *
   * Create a new project for this instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The human readable name of this project.
   * @param {string} params.type - The type of project.
   *
   * The `content_intelligence` type is a *Document Retrieval for Contracts* project and the `other` type is a *Custom*
   * project.
   *
   * The `content_mining` and `content_intelligence` types are available with Premium and Cloud Pak for Data deployments
   * only.
   * @param {DefaultQueryParams} [params.defaultQueryParameters] - Default query parameters for this project.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.ProjectDetails>>}
   */
  public createProject(
    params: DiscoveryV2.CreateProjectParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.ProjectDetails>> {
    const _params = { ...params };
    const requiredParams = ['name', 'type'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'default_query_parameters': _params.defaultQueryParameters,
    };

    const query = {
      'version': this.version,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createProject'
    );

    const parameters = {
      options: {
        url: '/v2/projects',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get project.
   *
   * Get details on the specified project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.ProjectDetails>>}
   */
  public getProject(
    params: DiscoveryV2.GetProjectParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.ProjectDetails>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getProject'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a project.
   *
   * Update the specified project's name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} [params.name] - The new name to give this project.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.ProjectDetails>>}
   */
  public updateProject(
    params: DiscoveryV2.UpdateProjectParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.ProjectDetails>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateProject'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a project.
   *
   * Deletes the specified project.
   *
   * **Important:** Deleting a project deletes everything that is part of the specified project, including all
   * collections.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Empty>>}
   */
  public deleteProject(
    params: DiscoveryV2.DeleteProjectParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Empty>> {
    const _params = { ...params };
    const requiredParams = ['projectId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteProject'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * userData
   ************************/

  /**
   * Delete labeled data.
   *
   * Deletes all data associated with a specified customer ID. The method has no effect if no data is associated with
   * the customer ID.
   *
   * You associate a customer ID with data by passing the **X-Watson-Metadata** header with a request that passes data.
   * For more information about personal data and customer IDs, see [Information
   * security](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-information-security#information-security).
   *
   *
   * **Note:** This method is only supported on IBM Cloud instances of Discovery.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customerId - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Empty>>}
   */
  public deleteUserData(
    params: DiscoveryV2.DeleteUserDataParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Empty>> {
    const _params = { ...params };
    const requiredParams = ['customerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'version': this.version,
      'customer_id': _params.customerId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteUserData'
    );

    const parameters = {
      options: {
        url: '/v2/user_data',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace DiscoveryV2 {
  /** Options for the `DiscoveryV2` constructor. */
  export interface Options extends UserOptions {
    /** Release date of the version of the API you want to use. Specify dates in YYYY-MM-DD format. The current
     *  version is `2020-08-30`.
     */
    version: string;
  }

  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listCollections` operation. */
  export interface ListCollectionsParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createCollection` operation. */
  export interface CreateCollectionParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The name of the collection. */
    name: string;
    /** A description of the collection. */
    description?: string;
    /** The language of the collection. */
    language?: string;
    /** An array of enrichments that are applied to this collection. */
    enrichments?: CollectionEnrichment[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCollection` operation. */
  export interface GetCollectionParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCollection` operation. */
  export interface UpdateCollectionParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The name of the collection. */
    name?: string;
    /** A description of the collection. */
    description?: string;
    /** An array of enrichments that are applied to this collection. */
    enrichments?: CollectionEnrichment[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCollection` operation. */
  export interface DeleteCollectionParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `query` operation. */
  export interface QueryParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** A comma-separated list of collection IDs to be queried against. */
    collectionIds?: string[];
    /** A cacheable query that excludes documents that don't mention the query content. Filter searches are better
     *  for metadata-type searches and for assessing the concepts in the data set.
     */
    filter?: string;
    /** A query search returns all documents in your data set with full enrichments and full text, but with the most
     *  relevant documents listed first. Use a query search when you want to find the most relevant search results.
     */
    query?: string;
    /** A natural language query that returns relevant documents by utilizing training data and natural language
     *  understanding.
     */
    naturalLanguageQuery?: string;
    /** An aggregation search that returns an exact answer by combining query search with filters. Useful for
     *  applications to build lists, tables, and time series. For a full list of possible aggregations, see the Query
     *  reference.
     */
    aggregation?: string;
    /** Number of results to return. */
    count?: number;
    /** A list of the fields in the document hierarchy to return. If this parameter is an empty list, then all
     *  fields are returned.
     */
    _return?: string[];
    /** The number of query results to skip at the beginning. For example, if the total number of results that are
     *  returned is 10 and the offset is 8, it returns the last two results.
     */
    offset?: number;
    /** A comma-separated list of fields in the document to sort on. You can optionally specify a sort direction by
     *  prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no
     *  prefix is specified.
     */
    sort?: string;
    /** When `true`, a highlight field is returned for each result which contains the fields which match the query
     *  with `<em></em>` tags around the matching query terms.
     */
    highlight?: boolean;
    /** When `true` and the **natural_language_query** parameter is used, the **natural_language_query** parameter
     *  is spell checked. The most likely correction is returned in the **suggested_query** field of the response (if
     *  one exists).
     */
    spellingSuggestions?: boolean;
    /** Configuration for table retrieval. */
    tableResults?: QueryLargeTableResults;
    /** Configuration for suggested refinements. Available with Premium plans only. */
    suggestedRefinements?: QueryLargeSuggestedRefinements;
    /** Configuration for passage retrieval. */
    passages?: QueryLargePassages;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAutocompletion` operation. */
  export interface GetAutocompletionParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The prefix to use for autocompletion. For example, the prefix `Ho` could autocomplete to `hot`, `housing`,
     *  or `how`.
     */
    prefix: string;
    /** Comma separated list of the collection IDs. If this parameter is not specified, all collections in the
     *  project are used.
     */
    collectionIds?: string[];
    /** The field in the result documents that autocompletion suggestions are identified from. */
    field?: string;
    /** The number of autocompletion suggestions to return. */
    count?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `queryCollectionNotices` operation. */
  export interface QueryCollectionNoticesParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** A cacheable query that excludes documents that don't mention the query content. Filter searches are better
     *  for metadata-type searches and for assessing the concepts in the data set.
     */
    filter?: string;
    /** A query search returns all documents in your data set with full enrichments and full text, but with the most
     *  relevant documents listed first.
     */
    query?: string;
    /** A natural language query that returns relevant documents by utilizing training data and natural language
     *  understanding.
     */
    naturalLanguageQuery?: string;
    /** Number of results to return. The maximum for the **count** and **offset** values together in any one query
     *  is **10000**.
     */
    count?: number;
    /** The number of query results to skip at the beginning. For example, if the total number of results that are
     *  returned is 10 and the offset is 8, it returns the last two results. The maximum for the **count** and
     *  **offset** values together in any one query is **10000**.
     */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `queryNotices` operation. */
  export interface QueryNoticesParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** A cacheable query that excludes documents that don't mention the query content. Filter searches are better
     *  for metadata-type searches and for assessing the concepts in the data set.
     */
    filter?: string;
    /** A query search returns all documents in your data set with full enrichments and full text, but with the most
     *  relevant documents listed first.
     */
    query?: string;
    /** A natural language query that returns relevant documents by utilizing training data and natural language
     *  understanding.
     */
    naturalLanguageQuery?: string;
    /** Number of results to return. The maximum for the **count** and **offset** values together in any one query
     *  is **10000**.
     */
    count?: number;
    /** The number of query results to skip at the beginning. For example, if the total number of results that are
     *  returned is 10 and the offset is 8, it returns the last two results. The maximum for the **count** and
     *  **offset** values together in any one query is **10000**.
     */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listFields` operation. */
  export interface ListFieldsParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** Comma separated list of the collection IDs. If this parameter is not specified, all collections in the
     *  project are used.
     */
    collectionIds?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getComponentSettings` operation. */
  export interface GetComponentSettingsParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addDocument` operation. */
  export interface AddDocumentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The content of the document to ingest. For maximum supported file size limits, see [the
     *  documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
     */
    file?: NodeJS.ReadableStream | Buffer;
    /** The filename for file. */
    filename?: string;
    /** The content type of file. */
    fileContentType?: AddDocumentConstants.FileContentType | string;
    /** The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected.
     *
     *
     *  Example:  ``` {
     *    "Creator": "Johnny Appleseed",
     *    "Subject": "Apples"
     *  } ```.
     */
    metadata?: string;
    /** When `true`, the uploaded document is added to the collection even if the data for that collection is shared
     *  with other collections.
     */
    xWatsonDiscoveryForce?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `addDocument` operation. */
  export namespace AddDocumentConstants {
    /** The content type of file. */
    export enum FileContentType {
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_PDF = 'application/pdf',
      TEXT_HTML = 'text/html',
      APPLICATION_XHTML_XML = 'application/xhtml+xml',
    }
  }

  /** Parameters for the `updateDocument` operation. */
  export interface UpdateDocumentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the document. */
    documentId: string;
    /** The content of the document to ingest. For maximum supported file size limits, see [the
     *  documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
     */
    file?: NodeJS.ReadableStream | Buffer;
    /** The filename for file. */
    filename?: string;
    /** The content type of file. */
    fileContentType?: UpdateDocumentConstants.FileContentType | string;
    /** The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected.
     *
     *
     *  Example:  ``` {
     *    "Creator": "Johnny Appleseed",
     *    "Subject": "Apples"
     *  } ```.
     */
    metadata?: string;
    /** When `true`, the uploaded document is added to the collection even if the data for that collection is shared
     *  with other collections.
     */
    xWatsonDiscoveryForce?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateDocument` operation. */
  export namespace UpdateDocumentConstants {
    /** The content type of file. */
    export enum FileContentType {
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_PDF = 'application/pdf',
      TEXT_HTML = 'text/html',
      APPLICATION_XHTML_XML = 'application/xhtml+xml',
    }
  }

  /** Parameters for the `deleteDocument` operation. */
  export interface DeleteDocumentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the document. */
    documentId: string;
    /** When `true`, the uploaded document is added to the collection even if the data for that collection is shared
     *  with other collections.
     */
    xWatsonDiscoveryForce?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTrainingQueries` operation. */
  export interface ListTrainingQueriesParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTrainingQueries` operation. */
  export interface DeleteTrainingQueriesParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTrainingQuery` operation. */
  export interface CreateTrainingQueryParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The natural text query for the training query. */
    naturalLanguageQuery: string;
    /** Array of training examples. */
    examples: TrainingExample[];
    /** The filter used on the collection before the **natural_language_query** is applied. */
    filter?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTrainingQuery` operation. */
  export interface GetTrainingQueryParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the query used for training. */
    queryId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTrainingQuery` operation. */
  export interface UpdateTrainingQueryParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the query used for training. */
    queryId: string;
    /** The natural text query for the training query. */
    naturalLanguageQuery: string;
    /** Array of training examples. */
    examples: TrainingExample[];
    /** The filter used on the collection before the **natural_language_query** is applied. */
    filter?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTrainingQuery` operation. */
  export interface DeleteTrainingQueryParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the query used for training. */
    queryId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `analyzeDocument` operation. */
  export interface AnalyzeDocumentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The content of the document to ingest. For maximum supported file size limits, see [the
     *  documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
     */
    file?: NodeJS.ReadableStream | Buffer;
    /** The filename for file. */
    filename?: string;
    /** The content type of file. */
    fileContentType?: AnalyzeDocumentConstants.FileContentType | string;
    /** The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected.
     *
     *
     *  Example:  ``` {
     *    "Creator": "Johnny Appleseed",
     *    "Subject": "Apples"
     *  } ```.
     */
    metadata?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `analyzeDocument` operation. */
  export namespace AnalyzeDocumentConstants {
    /** The content type of file. */
    export enum FileContentType {
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_PDF = 'application/pdf',
      TEXT_HTML = 'text/html',
      APPLICATION_XHTML_XML = 'application/xhtml+xml',
    }
  }

  /** Parameters for the `listEnrichments` operation. */
  export interface ListEnrichmentsParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createEnrichment` operation. */
  export interface CreateEnrichmentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** Information about a specific enrichment. */
    enrichment: CreateEnrichment;
    /** The enrichment file to upload. */
    file?: NodeJS.ReadableStream | Buffer;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEnrichment` operation. */
  export interface GetEnrichmentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the enrichment. */
    enrichmentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateEnrichment` operation. */
  export interface UpdateEnrichmentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the enrichment. */
    enrichmentId: string;
    /** A new name for the enrichment. */
    name: string;
    /** A new description for the enrichment. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteEnrichment` operation. */
  export interface DeleteEnrichmentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the enrichment. */
    enrichmentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProjects` operation. */
  export interface ListProjectsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProject` operation. */
  export interface CreateProjectParams {
    /** The human readable name of this project. */
    name: string;
    /** The type of project.
     *
     *  The `content_intelligence` type is a *Document Retrieval for Contracts* project and the `other` type is a
     *  *Custom* project.
     *
     *  The `content_mining` and `content_intelligence` types are available with Premium and Cloud Pak for Data
     *  deployments only.
     */
    type: CreateProjectConstants.Type | string;
    /** Default query parameters for this project. */
    defaultQueryParameters?: DefaultQueryParams;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createProject` operation. */
  export namespace CreateProjectConstants {
    /** The type of project. The `content_intelligence` type is a *Document Retrieval for Contracts* project and the `other` type is a *Custom* project. The `content_mining` and `content_intelligence` types are available with Premium and Cloud Pak for Data deployments only. */
    export enum Type {
      DOCUMENT_RETRIEVAL = 'document_retrieval',
      CONVERSATIONAL_SEARCH = 'conversational_search',
      CONTENT_INTELLIGENCE = 'content_intelligence',
      CONTENT_MINING = 'content_mining',
      OTHER = 'other',
    }
  }

  /** Parameters for the `getProject` operation. */
  export interface GetProjectParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProject` operation. */
  export interface UpdateProjectParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The new name to give this project. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProject` operation. */
  export interface DeleteProjectParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** An object that contains the converted document and any identified enrichments. */
  export interface AnalyzedDocument {
    /** Array of document results that match the query. */
    notices?: Notice[];
    /** Result of the document analysis. */
    result?: AnalyzedResult;
  }

  /** Result of the document analysis. */
  export interface AnalyzedResult {
    /** Metadata of the document. */
    metadata?: JsonObject;
    /** AnalyzedResult accepts additional properties. */
    [propName: string]: any;
  }

  /** A collection for storing documents. */
  export interface Collection {
    /** The unique identifier of the collection. */
    collection_id?: string;
    /** The name of the collection. */
    name?: string;
  }

  /** A collection for storing documents. */
  export interface CollectionDetails {
    /** The unique identifier of the collection. */
    collection_id?: string;
    /** The name of the collection. */
    name: string;
    /** A description of the collection. */
    description?: string;
    /** The date that the collection was created. */
    created?: string;
    /** The language of the collection. */
    language?: string;
    /** An array of enrichments that are applied to this collection. */
    enrichments?: CollectionEnrichment[];
  }

  /** An object describing an Enrichment for a collection. */
  export interface CollectionEnrichment {
    /** The unique identifier of this enrichment. */
    enrichment_id?: string;
    /** An array of field names that the enrichment is applied to. */
    fields?: string[];
  }

  /** An object that contains an array of autocompletion suggestions. */
  export interface Completions {
    /** Array of autocomplete suggestion based on the provided prefix. */
    completions?: string[];
  }

  /** Display settings for aggregations. */
  export interface ComponentSettingsAggregation {
    /** Identifier used to map aggregation settings to aggregation configuration. */
    name?: string;
    /** User-friendly alias for the aggregation. */
    label?: string;
    /** Whether users is allowed to select more than one of the aggregation terms. */
    multiple_selections_allowed?: boolean;
    /** Type of visualization to use when rendering the aggregation. */
    visualization_type?: string;
  }

  /** Fields shown in the results section of the UI. */
  export interface ComponentSettingsFieldsShown {
    /** Body label. */
    body?: ComponentSettingsFieldsShownBody;
    /** Title label. */
    title?: ComponentSettingsFieldsShownTitle;
  }

  /** Body label. */
  export interface ComponentSettingsFieldsShownBody {
    /** Use the whole passage as the body. */
    use_passage?: boolean;
    /** Use a specific field as the title. */
    field?: string;
  }

  /** Title label. */
  export interface ComponentSettingsFieldsShownTitle {
    /** Use a specific field as the title. */
    field?: string;
  }

  /** The default component settings for this project. */
  export interface ComponentSettingsResponse {
    /** Fields shown in the results section of the UI. */
    fields_shown?: ComponentSettingsFieldsShown;
    /** Whether or not autocomplete is enabled. */
    autocomplete?: boolean;
    /** Whether or not structured search is enabled. */
    structured_search?: boolean;
    /** Number or results shown per page. */
    results_per_page?: number;
    /** a list of component setting aggregations. */
    aggregations?: ComponentSettingsAggregation[];
  }

  /** Information about a specific enrichment. */
  export interface CreateEnrichment {
    /** The human readable name for this enrichment. */
    name?: string;
    /** The description of this enrichment. */
    description?: string;
    /** The type of this enrichment. */
    type?: string;
    /** An object that contains options for the current enrichment. Starting with version `2020-08-30`, the
     *  enrichment options are not included in responses from the List Enrichments method.
     */
    options?: EnrichmentOptions;
  }

  /** Default query parameters for this project. */
  export interface DefaultQueryParams {
    /** An array of collection identifiers to query. If empty or omitted all collections in the project are queried. */
    collection_ids?: string[];
    /** Default settings configuration for passage search options. */
    passages?: DefaultQueryParamsPassages;
    /** Default project query settings for table results. */
    table_results?: DefaultQueryParamsTableResults;
    /** A string representing the default aggregation query for the project. */
    aggregation?: string;
    /** Object that contains suggested refinement settings. Available with Premium plans only. */
    suggested_refinements?: DefaultQueryParamsSuggestedRefinements;
    /** When `true`, a spelling suggestions for the query are returned by default. */
    spelling_suggestions?: boolean;
    /** When `true`, a highlights for the query are returned by default. */
    highlight?: boolean;
    /** The number of document results returned by default. */
    count?: number;
    /** A comma separated list of document fields to sort results by default. */
    sort?: string;
    /** An array of field names to return in document results if present by default. */
    return?: string[];
  }

  /** Default settings configuration for passage search options. */
  export interface DefaultQueryParamsPassages {
    /** When `true`, a passage search is performed by default. */
    enabled?: boolean;
    /** The number of passages to return. */
    count?: number;
    /** An array of field names to perform the passage search on. */
    fields?: string[];
    /** The approximate number of characters that each returned passage will contain. */
    characters?: number;
    /** When `true` the number of passages that can be returned from a single document is restricted to the
     *  *max_per_document* value.
     */
    per_document?: boolean;
    /** The default maximum number of passages that can be taken from a single document as the result of a passage
     *  query.
     */
    max_per_document?: number;
  }

  /** Object that contains suggested refinement settings. Available with Premium plans only. */
  export interface DefaultQueryParamsSuggestedRefinements {
    /** When `true`, suggested refinements for the query are returned by default. */
    enabled?: boolean;
    /** The number of suggested refinements to return by default. */
    count?: number;
  }

  /** Default project query settings for table results. */
  export interface DefaultQueryParamsTableResults {
    /** When `true`, a table results for the query are returned by default. */
    enabled?: boolean;
    /** The number of table results to return by default. */
    count?: number;
    /** The number of table results to include in each result document. */
    per_document?: number;
  }

  /** Information returned when a document is deleted. */
  export interface DeleteDocumentResponse {
    /** The unique identifier of the document. */
    document_id?: string;
    /** Status of the document. A deleted document has the status deleted. */
    status?: string;
  }

  /** Information returned after an uploaded document is accepted. */
  export interface DocumentAccepted {
    /** The unique identifier of the ingested document. */
    document_id?: string;
    /** Status of the document in the ingestion process. A status of `processing` is returned for documents that are
     *  ingested with a *version* date before `2019-01-01`. The `pending` status is returned for all others.
     */
    status?: string;
  }

  /** List of document attributes. */
  export interface DocumentAttribute {
    /** The type of attribute. */
    type?: string;
    /** The text associated with the attribute. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: TableElementLocation;
  }

  /** Information about a specific enrichment. */
  export interface Enrichment {
    /** The unique identifier of this enrichment. */
    enrichment_id?: string;
    /** The human readable name for this enrichment. */
    name?: string;
    /** The description of this enrichment. */
    description?: string;
    /** The type of this enrichment. */
    type?: string;
    /** An object that contains options for the current enrichment. Starting with version `2020-08-30`, the
     *  enrichment options are not included in responses from the List Enrichments method.
     */
    options?: EnrichmentOptions;
  }

  /** An object that contains options for the current enrichment. Starting with version `2020-08-30`, the enrichment options are not included in responses from the List Enrichments method. */
  export interface EnrichmentOptions {
    /** An array of supported languages for this enrichment. Required when `type` is `dictionary`. Optional when
     *  `type` is `rule_based`. Not valid when creating any other type of enrichment.
     */
    languages?: string[];
    /** The name of the entity type. This value is used as the field name in the index. Required when `type` is
     *  `dictionary` or `regular_expression`. Not valid when creating any other type of enrichment.
     */
    entity_type?: string;
    /** The regular expression to apply for this enrichment. Required when `type` is `regular_expression`. Not valid
     *  when creating any other type of enrichment.
     */
    regular_expression?: string;
    /** The name of the result document field that this enrichment creates. Required when `type` is `rule_based`.
     *  Not valid when creating any other type of enrichment.
     */
    result_field?: string;
  }

  /** An object that contains an array of enrichment definitions. */
  export interface Enrichments {
    /** An array of enrichment definitions. */
    enrichments?: Enrichment[];
  }

  /** Object that contains field details. */
  export interface Field {
    /** The name of the field. */
    field?: string;
    /** The type of the field. */
    type?: string;
    /** The collection Id of the collection where the field was found. */
    collection_id?: string;
  }

  /** Response object that contains an array of collection details. */
  export interface ListCollectionsResponse {
    /** An array that contains information about each collection in the project. */
    collections?: Collection[];
  }

  /** The list of fetched fields. The fields are returned using a fully qualified name format, however, the format differs slightly from that used by the query operations. * Fields which contain nested objects are assigned a type of "nested". * Fields which belong to a nested object are prefixed with `.properties` (for example, `warnings.properties.severity` means that the `warnings` object has a property called `severity`). */
  export interface ListFieldsResponse {
    /** An array that contains information about each field in the collections. */
    fields?: Field[];
  }

  /** A list of projects in this instance. */
  export interface ListProjectsResponse {
    /** An array of project details. */
    projects?: ProjectListDetails[];
  }

  /** A notice produced for the collection. */
  export interface Notice {
    /** Identifies the notice. Many notices might have the same ID. This field exists so that user applications can
     *  programmatically identify a notice and take automatic corrective action. Typical notice IDs include:
     *  `index_failed`, `index_failed_too_many_requests`, `index_failed_incompatible_field`,
     *  `index_failed_cluster_unavailable`, `ingestion_timeout`, `ingestion_error`, `bad_request`, `internal_error`,
     *  `missing_model`, `unsupported_model`, `smart_document_understanding_failed_incompatible_field`,
     *  `smart_document_understanding_failed_internal_error`, `smart_document_understanding_failed_internal_error`,
     *  `smart_document_understanding_failed_warning`, `smart_document_understanding_page_error`,
     *  `smart_document_understanding_page_warning`. **Note:** This is not a complete list, other values might be
     *  returned.
     */
    notice_id?: string;
    /** The creation date of the collection in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z'. */
    created?: string;
    /** Unique identifier of the document. */
    document_id?: string;
    /** Unique identifier of the collection. */
    collection_id?: string;
    /** Unique identifier of the query used for relevance training. */
    query_id?: string;
    /** Severity level of the notice. */
    severity?: string;
    /** Ingestion or training step in which the notice occurred. */
    step?: string;
    /** The description of the notice. */
    description?: string;
  }

  /** Detailed information about the specified project. */
  export interface ProjectDetails {
    /** The unique identifier of this project. */
    project_id?: string;
    /** The human readable name of this project. */
    name?: string;
    /** The type of project.
     *
     *  The `content_intelligence` type is a *Document Retrieval for Contracts* project and the `other` type is a
     *  *Custom* project.
     *
     *  The `content_mining` and `content_intelligence` types are available with Premium and Cloud Pak for Data
     *  deployments only.
     */
    type?: string;
    /** Relevancy training status information for this project. */
    relevancy_training_status?: ProjectListDetailsRelevancyTrainingStatus;
    /** The number of collections configured in this project. */
    collection_count?: number;
    /** Default query parameters for this project. */
    default_query_parameters?: DefaultQueryParams;
  }

  /** Details about a specific project. */
  export interface ProjectListDetails {
    /** The unique identifier of this project. */
    project_id?: string;
    /** The human readable name of this project. */
    name?: string;
    /** The type of project.
     *
     *  The `content_intelligence` type is a *Document Retrieval for Contracts* project and the `other` type is a
     *  *Custom* project.
     *
     *  The `content_mining` and `content_intelligence` types are available with Premium and Cloud Pak for Data
     *  deployments only.
     */
    type?: string;
    /** Relevancy training status information for this project. */
    relevancy_training_status?: ProjectListDetailsRelevancyTrainingStatus;
    /** The number of collections configured in this project. */
    collection_count?: number;
  }

  /** Relevancy training status information for this project. */
  export interface ProjectListDetailsRelevancyTrainingStatus {
    /** When the training data was updated. */
    data_updated?: string;
    /** The total number of examples. */
    total_examples?: number;
    /** When `true`, sufficient label diversity is present to allow training for this project. */
    sufficient_label_diversity?: boolean;
    /** When `true`, the relevancy training is in processing. */
    processing?: boolean;
    /** When `true`, the minimum number of examples required to train has been met. */
    minimum_examples_added?: boolean;
    /** The time that the most recent successful training occurred. */
    successfully_trained?: string;
    /** When `true`, relevancy training is available when querying collections in the project. */
    available?: boolean;
    /** The number of notices generated during the relevancy training. */
    notices?: number;
    /** When `true`, the minimum number of queries required to train has been met. */
    minimum_queries_added?: boolean;
  }

  /** An abstract aggregation type produced by Discovery to analyze the input provided. */
  export interface QueryAggregation {
    /** The type of aggregation command used. Options include: term, histogram, timeslice, nested, filter, min, max,
     *  sum, average, unique_count, and top_hits.
     */
    type: string;
  }

  /** Top value result for the term aggregation. */
  export interface QueryGroupByAggregationResult {
    /** Value of the field with a non-zero frequency in the document set. */
    key: string;
    /** Number of documents that contain the 'key'. */
    matching_results: number;
    /** The relevancy for this group. */
    relevancy?: number;
    /** The number of documents which have the group as the value of specified field in the whole set of documents
     *  in this collection. Returned only when the `relevancy` parameter is set to `true`.
     */
    total_matching_documents?: number;
    /** The estimated number of documents which would match the query and also meet the condition. Returned only
     *  when the `relevancy` parameter is set to `true`.
     */
    estimated_matching_documents?: number;
    /** An array of sub-aggregations. */
    aggregations?: QueryAggregation[];
  }

  /** Histogram numeric interval result. */
  export interface QueryHistogramAggregationResult {
    /** The value of the upper bound for the numeric segment. */
    key: number;
    /** Number of documents with the specified key as the upper bound. */
    matching_results: number;
    /** An array of sub-aggregations. */
    aggregations?: QueryAggregation[];
  }

  /** Configuration for passage retrieval. */
  export interface QueryLargePassages {
    /** A passages query that returns the most relevant passages from the results. */
    enabled?: boolean;
    /** If `true`, ranks the documents by document quality, and then returns the highest-ranked passages per
     *  document in a `document_passages` field for each document entry in the results list of the response.
     *
     *  If `false`, ranks the passages from all of the documents by passage quality regardless of the document quality
     *  and returns them in a separate `passages` field in the response.
     */
    per_document?: boolean;
    /** Maximum number of passages to return per document in the result. Ignored if `passages.per_document` is
     *  `false`.
     */
    max_per_document?: number;
    /** A list of fields to extract passages from. If this parameter is an empty list, then all root-level fields
     *  are included.
     */
    fields?: string[];
    /** The maximum number of passages to return. Ignored if `passages.per_document` is `true`. */
    count?: number;
    /** The approximate number of characters that any one passage will have. */
    characters?: number;
    /** When true, `answer` objects are returned as part of each passage in the query results. The primary
     *  difference between an `answer` and a `passage` is that the length of a passage is defined by the query, where
     *  the length of an `answer` is calculated by Discovery based on how much text is needed to answer the question.
     *
     *  This parameter is ignored if passages are not enabled for the query, or no **natural_language_query** is
     *  specified.
     *
     *  If the **find_answers** parameter is set to `true` and **per_document** parameter is also set to `true`, then
     *  the document search results and the passage search results within each document are reordered using the answer
     *  confidences. The goal of this reordering is to place the best answer as the first answer of the first passage of
     *  the first document. Similarly, if the **find_answers** parameter is set to `true` and **per_document** parameter
     *  is set to `false`, then the passage search results are reordered in decreasing order of the highest confidence
     *  answer for each document and passage.
     *
     *  The **find_answers** parameter is **beta** functionality available only on managed instances and should not be
     *  used in a production environment. This parameter is not available on installed instances of Discovery.
     */
    find_answers?: boolean;
    /** The number of `answer` objects to return per passage if the **find_answers** parmeter is specified as
     *  `true`.
     */
    max_answers_per_passage?: number;
  }

  /** Configuration for suggested refinements. Available with Premium plans only. */
  export interface QueryLargeSuggestedRefinements {
    /** Whether to perform suggested refinements. */
    enabled?: boolean;
    /** Maximum number of suggested refinements texts to be returned. The maximum is `100`. */
    count?: number;
  }

  /** Configuration for table retrieval. */
  export interface QueryLargeTableResults {
    /** Whether to enable table retrieval. */
    enabled?: boolean;
    /** Maximum number of tables to return. */
    count?: number;
  }

  /** Object that contains notice query results. */
  export interface QueryNoticesResponse {
    /** The number of matching results. */
    matching_results?: number;
    /** Array of document results that match the query. */
    notices?: Notice[];
  }

  /** A response that contains the documents and aggregations for the query. */
  export interface QueryResponse {
    /** The number of matching results for the query. Results that match due to a curation only are not counted in
     *  the total.
     */
    matching_results?: number;
    /** Array of document results for the query. */
    results?: QueryResult[];
    /** Array of aggregations for the query. */
    aggregations?: QueryAggregation[];
    /** An object contain retrieval type information. */
    retrieval_details?: RetrievalDetails;
    /** Suggested correction to the submitted **natural_language_query** value. */
    suggested_query?: string;
    /** Array of suggested refinements. */
    suggested_refinements?: QuerySuggestedRefinement[];
    /** Array of table results. */
    table_results?: QueryTableResult[];
    /** Passages that best match the query from across all of the collections in the project. */
    passages?: QueryResponsePassage[];
  }

  /** A passage query response. */
  export interface QueryResponsePassage {
    /** The content of the extracted passage. */
    passage_text?: string;
    /** The confidence score of the passage's analysis. A higher score indicates greater confidence. */
    passage_score?: number;
    /** The unique identifier of the ingested document. */
    document_id?: string;
    /** The unique identifier of the collection. */
    collection_id?: string;
    /** The position of the first character of the extracted passage in the originating field. */
    start_offset?: number;
    /** The position after the last character of the extracted passage in the originating field. */
    end_offset?: number;
    /** The label of the field from which the passage has been extracted. */
    field?: string;
    /** An estimate of the probability that the passage is relevant. */
    confidence?: number;
    /** An array of extracted answers to the specified query. */
    answers?: ResultPassageAnswer[];
  }

  /** Result document for the specified query. */
  export interface QueryResult {
    /** The unique identifier of the document. */
    document_id: string;
    /** Metadata of the document. */
    metadata?: JsonObject;
    /** Metadata of a query result. */
    result_metadata: QueryResultMetadata;
    /** Passages from the document that best matches the query. */
    document_passages?: QueryResultPassage[];
    /** QueryResult accepts additional properties. */
    [propName: string]: any;
  }

  /** Metadata of a query result. */
  export interface QueryResultMetadata {
    /** The document retrieval source that produced this search result. */
    document_retrieval_source?: string;
    /** The collection id associated with this training data set. */
    collection_id: string;
    /** The confidence score for the given result. Calculated based on how relevant the result is estimated to be.
     *  confidence can range from `0.0` to `1.0`. The higher the number, the more relevant the document. The
     *  `confidence` value for a result was calculated using the model specified in the `document_retrieval_strategy`
     *  field of the result set. This field is only returned if the **natural_language_query** parameter is specified in
     *  the query.
     */
    confidence?: number;
  }

  /** A passage query result. */
  export interface QueryResultPassage {
    /** The content of the extracted passage. */
    passage_text?: string;
    /** The position of the first character of the extracted passage in the originating field. */
    start_offset?: number;
    /** The position after the last character of the extracted passage in the originating field. */
    end_offset?: number;
    /** The label of the field from which the passage has been extracted. */
    field?: string;
    /** Estimate of the probability that the passage is relevant. */
    confidence?: number;
    /** An arry of extracted answers to the specified query. */
    answers?: ResultPassageAnswer[];
  }

  /** A suggested additional query term or terms user to filter results. */
  export interface QuerySuggestedRefinement {
    /** The text used to filter. */
    text?: string;
  }

  /** A tables whose content or context match a search query. */
  export interface QueryTableResult {
    /** The identifier for the retrieved table. */
    table_id?: string;
    /** The identifier of the document the table was retrieved from. */
    source_document_id?: string;
    /** The identifier of the collection the table was retrieved from. */
    collection_id?: string;
    /** HTML snippet of the table info. */
    table_html?: string;
    /** The offset of the table html snippet in the original document html. */
    table_html_offset?: number;
    /** Full table object retrieved from Table Understanding Enrichment. */
    table?: TableResultTable;
  }

  /** Top value result for the term aggregation. */
  export interface QueryTermAggregationResult {
    /** Value of the field with a non-zero frequency in the document set. */
    key: string;
    /** Number of documents that contain the 'key'. */
    matching_results: number;
    /** The relevancy for this term. */
    relevancy?: number;
    /** The number of documents which have the term as the value of specified field in the whole set of documents in
     *  this collection. Returned only when the `relevancy` parameter is set to `true`.
     */
    total_matching_documents?: number;
    /** The estimated number of documents which would match the query and also meet the condition. Returned only
     *  when the `relevancy` parameter is set to `true`.
     */
    estimated_matching_documents?: number;
    /** An array of sub-aggregations. */
    aggregations?: QueryAggregation[];
  }

  /** A timeslice interval segment. */
  export interface QueryTimesliceAggregationResult {
    /** String date value of the upper bound for the timeslice interval in ISO-8601 format. */
    key_as_string: string;
    /** Numeric date value of the upper bound for the timeslice interval in UNIX milliseconds since epoch. */
    key: number;
    /** Number of documents with the specified key as the upper bound. */
    matching_results: number;
    /** An array of sub-aggregations. */
    aggregations?: QueryAggregation[];
  }

  /** A query response that contains the matching documents for the preceding aggregations. */
  export interface QueryTopHitsAggregationResult {
    /** Number of matching results. */
    matching_results: number;
    /** An array of the document results. */
    hits?: JsonObject[];
  }

  /** Object that contains a potential answer to the specified query. */
  export interface ResultPassageAnswer {
    /** Answer text for the specified query as identified by Discovery. */
    answer_text?: string;
    /** The position of the first character of the extracted answer in the originating field. */
    start_offset?: number;
    /** The position after the last character of the extracted answer in the originating field. */
    end_offset?: number;
    /** An estimate of the probability that the answer is relevant. */
    confidence?: number;
  }

  /** An object contain retrieval type information. */
  export interface RetrievalDetails {
    /** Identifies the document retrieval strategy used for this query. `relevancy_training` indicates that the
     *  results were returned using a relevancy trained model.
     *
     *  **Note**: In the event of trained collections being queried, but the trained model is not used to return
     *  results, the **document_retrieval_strategy** is listed as `untrained`.
     */
    document_retrieval_strategy?: string;
  }

  /** Cells that are not table header, column header, or row header cells. */
  export interface TableBodyCells {
    /** The unique ID of the cell in the current table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: TableElementLocation;
    /** The textual contents of this cell from the input document without associated markup content. */
    text?: string;
    /** The `begin` index of this cell's `row` location in the current table. */
    row_index_begin?: number;
    /** The `end` index of this cell's `row` location in the current table. */
    row_index_end?: number;
    /** The `begin` index of this cell's `column` location in the current table. */
    column_index_begin?: number;
    /** The `end` index of this cell's `column` location in the current table. */
    column_index_end?: number;
    /** A list of table row header ids. */
    row_header_ids?: TableRowHeaderIds[];
    /** A list of table row header texts. */
    row_header_texts?: TableRowHeaderTexts[];
    /** A list of table row header texts normalized. */
    row_header_texts_normalized?: TableRowHeaderTextsNormalized[];
    /** A list of table column header ids. */
    column_header_ids?: TableColumnHeaderIds[];
    /** A list of table column header texts. */
    column_header_texts?: TableColumnHeaderTexts[];
    /** A list of table column header texts normalized. */
    column_header_texts_normalized?: TableColumnHeaderTextsNormalized[];
    /** A list of document attributes. */
    attributes?: DocumentAttribute[];
  }

  /** A key in a key-value pair. */
  export interface TableCellKey {
    /** The unique ID of the key in the table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: TableElementLocation;
    /** The text content of the table cell without HTML markup. */
    text?: string;
  }

  /** A value in a key-value pair. */
  export interface TableCellValues {
    /** The unique ID of the value in the table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: TableElementLocation;
    /** The text content of the table cell without HTML markup. */
    text?: string;
  }

  /** An array of values, each being the `id` value of a column header that is applicable to the current cell. */
  export interface TableColumnHeaderIds {
    /** The `id` value of a column header. */
    id?: string;
  }

  /** An array of values, each being the `text` value of a column header that is applicable to the current cell. */
  export interface TableColumnHeaderTexts {
    /** The `text` value of a column header. */
    text?: string;
  }

  /** If you provide customization input, the normalized version of the column header texts according to the customization; otherwise, the same value as `column_header_texts`. */
  export interface TableColumnHeaderTextsNormalized {
    /** The normalized version of a column header text. */
    text_normalized?: string;
  }

  /** Column-level cells, each applicable as a header to other cells in the same column as itself, of the current table. */
  export interface TableColumnHeaders {
    /** The unique ID of the cell in the current table. */
    cell_id?: string;
    /** The location of the column header cell in the current table as defined by its `begin` and `end` offsets,
     *  respectfully, in the input document.
     */
    location?: JsonObject;
    /** The textual contents of this cell from the input document without associated markup content. */
    text?: string;
    /** If you provide customization input, the normalized version of the cell text according to the customization;
     *  otherwise, the same value as `text`.
     */
    text_normalized?: string;
    /** The `begin` index of this cell's `row` location in the current table. */
    row_index_begin?: number;
    /** The `end` index of this cell's `row` location in the current table. */
    row_index_end?: number;
    /** The `begin` index of this cell's `column` location in the current table. */
    column_index_begin?: number;
    /** The `end` index of this cell's `column` location in the current table. */
    column_index_end?: number;
  }

  /** The numeric location of the identified element in the document, represented with two integers labeled `begin` and `end`. */
  export interface TableElementLocation {
    /** The element's `begin` index. */
    begin: number;
    /** The element's `end` index. */
    end: number;
  }

  /** The contents of the current table's header. */
  export interface TableHeaders {
    /** The unique ID of the cell in the current table. */
    cell_id?: string;
    /** The location of the table header cell in the current table as defined by its `begin` and `end` offsets,
     *  respectfully, in the input document.
     */
    location?: JsonObject;
    /** The textual contents of the cell from the input document without associated markup content. */
    text?: string;
    /** The `begin` index of this cell's `row` location in the current table. */
    row_index_begin?: number;
    /** The `end` index of this cell's `row` location in the current table. */
    row_index_end?: number;
    /** The `begin` index of this cell's `column` location in the current table. */
    column_index_begin?: number;
    /** The `end` index of this cell's `column` location in the current table. */
    column_index_end?: number;
  }

  /** Key-value pairs detected across cell boundaries. */
  export interface TableKeyValuePairs {
    /** A key in a key-value pair. */
    key?: TableCellKey;
    /** A list of values in a key-value pair. */
    value?: TableCellValues[];
  }

  /** Full table object retrieved from Table Understanding Enrichment. */
  export interface TableResultTable {
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: TableElementLocation;
    /** The textual contents of the current table from the input document without associated markup content. */
    text?: string;
    /** Text and associated location within a table. */
    section_title?: TableTextLocation;
    /** Text and associated location within a table. */
    title?: TableTextLocation;
    /** An array of table-level cells that apply as headers to all the other cells in the current table. */
    table_headers?: TableHeaders[];
    /** An array of row-level cells, each applicable as a header to other cells in the same row as itself, of the
     *  current table.
     */
    row_headers?: TableRowHeaders[];
    /** An array of column-level cells, each applicable as a header to other cells in the same column as itself, of
     *  the current table.
     */
    column_headers?: TableColumnHeaders[];
    /** An array of key-value pairs identified in the current table. */
    key_value_pairs?: TableKeyValuePairs[];
    /** An array of cells that are neither table header nor column header nor row header cells, of the current table
     *  with corresponding row and column header associations.
     */
    body_cells?: TableBodyCells[];
    /** An array of lists of textual entries across the document related to the current table being parsed. */
    contexts?: TableTextLocation[];
  }

  /** An array of values, each being the `id` value of a row header that is applicable to this body cell. */
  export interface TableRowHeaderIds {
    /** The `id` values of a row header. */
    id?: string;
  }

  /** An array of values, each being the `text` value of a row header that is applicable to this body cell. */
  export interface TableRowHeaderTexts {
    /** The `text` value of a row header. */
    text?: string;
  }

  /** If you provide customization input, the normalized version of the row header texts according to the customization; otherwise, the same value as `row_header_texts`. */
  export interface TableRowHeaderTextsNormalized {
    /** The normalized version of a row header text. */
    text_normalized?: string;
  }

  /** Row-level cells, each applicable as a header to other cells in the same row as itself, of the current table. */
  export interface TableRowHeaders {
    /** The unique ID of the cell in the current table. */
    cell_id?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: TableElementLocation;
    /** The textual contents of this cell from the input document without associated markup content. */
    text?: string;
    /** If you provide customization input, the normalized version of the cell text according to the customization;
     *  otherwise, the same value as `text`.
     */
    text_normalized?: string;
    /** The `begin` index of this cell's `row` location in the current table. */
    row_index_begin?: number;
    /** The `end` index of this cell's `row` location in the current table. */
    row_index_end?: number;
    /** The `begin` index of this cell's `column` location in the current table. */
    column_index_begin?: number;
    /** The `end` index of this cell's `column` location in the current table. */
    column_index_end?: number;
  }

  /** Text and associated location within a table. */
  export interface TableTextLocation {
    /** The text retrieved. */
    text?: string;
    /** The numeric location of the identified element in the document, represented with two integers labeled
     *  `begin` and `end`.
     */
    location?: TableElementLocation;
  }

  /** Object that contains example response details for a training query. */
  export interface TrainingExample {
    /** The document ID associated with this training example. */
    document_id: string;
    /** The collection ID associated with this training example. */
    collection_id: string;
    /** The relevance of the training example. */
    relevance: number;
    /** The date and time the example was created. */
    created?: string;
    /** The date and time the example was updated. */
    updated?: string;
  }

  /** Object that contains training query details. */
  export interface TrainingQuery {
    /** The query ID associated with the training query. */
    query_id?: string;
    /** The natural text query for the training query. */
    natural_language_query: string;
    /** The filter used on the collection before the **natural_language_query** is applied. */
    filter?: string;
    /** The date and time the query was created. */
    created?: string;
    /** The date and time the query was updated. */
    updated?: string;
    /** Array of training examples. */
    examples: TrainingExample[];
  }

  /** Object specifying the training queries contained in the identified training set. */
  export interface TrainingQuerySet {
    /** Array of training queries. */
    queries?: TrainingQuery[];
  }

  /** Returns a scalar calculation across all documents for the field specified. Possible calculations include min, max, sum, average, and unique_count. */
  export interface QueryCalculationAggregation extends QueryAggregation {
    /** The field to perform the calculation on. */
    field: string;
    /** The value of the calculation. */
    value?: number;
  }

  /** A modifier that narrows the document set of the sub-aggregations it precedes. */
  export interface QueryFilterAggregation extends QueryAggregation {
    /** The filter that is written in Discovery Query Language syntax and is applied to the documents before
     *  sub-aggregations are run.
     */
    match: string;
    /** Number of documents that match the filter. */
    matching_results: number;
    /** An array of sub-aggregations. */
    aggregations?: QueryAggregation[];
  }

  /** Returns the top values for the field specified. */
  export interface QueryGroupByAggregation extends QueryAggregation {
    /** Array of top values for the field. */
    results?: QueryGroupByAggregationResult[];
  }

  /** Numeric interval segments to categorize documents by using field values from a single numeric field to describe the category. */
  export interface QueryHistogramAggregation extends QueryAggregation {
    /** The numeric field name used to create the histogram. */
    field: string;
    /** The size of the sections the results are split into. */
    interval: number;
    /** Identifier specified in the query request of this aggregation. */
    name?: string;
    /** Array of numeric intervals. */
    results?: QueryHistogramAggregationResult[];
  }

  /** A restriction that alters the document set that is used for sub-aggregations it precedes to nested documents found in the field specified. */
  export interface QueryNestedAggregation extends QueryAggregation {
    /** The path to the document field to scope sub-aggregations to. */
    path: string;
    /** Number of nested documents found in the specified field. */
    matching_results: number;
    /** An array of sub-aggregations. */
    aggregations?: QueryAggregation[];
  }

  /** Returns the top values for the field specified. */
  export interface QueryTermAggregation extends QueryAggregation {
    /** The field in the document used to generate top values from. */
    field: string;
    /** The number of top values returned. */
    count?: number;
    /** Identifier specified in the query request of this aggregation. */
    name?: string;
    /** Array of top values for the field. */
    results?: QueryTermAggregationResult[];
  }

  /** A specialized histogram aggregation that uses dates to create interval segments. */
  export interface QueryTimesliceAggregation extends QueryAggregation {
    /** The date field name used to create the timeslice. */
    field: string;
    /** The date interval value. Valid values are seconds, minutes, hours, days, weeks, and years. */
    interval: string;
    /** Identifier specified in the query request of this aggregation. */
    name?: string;
    /** Array of aggregation results. */
    results?: QueryTimesliceAggregationResult[];
  }

  /** Returns the top documents ranked by the score of the query. */
  export interface QueryTopHitsAggregation extends QueryAggregation {
    /** The number of documents to return. */
    size: number;
    /** Identifier specified in the query request of this aggregation. */
    name?: string;
    hits?: QueryTopHitsAggregationResult;
  }
}

export = DiscoveryV2;
