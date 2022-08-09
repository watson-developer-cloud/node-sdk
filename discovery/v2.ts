/**
 * (C) Copyright IBM Corp. 2019, 2022.
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
 * IBM OpenAPI SDK Code Generator Version: 3.53.0-9710cac3-20220713-193508
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
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

    const _requiredParams = ['version'];
    const _validationErrors = validateParams(options, _requiredParams, null);
    if (_validationErrors) {
      throw _validationErrors;
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
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

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
   * Create a project.
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
   * The `content_mining` and `content_intelligence` types are available with Premium plan managed deployments and
   * installed deployments only.
   * @param {DefaultQueryParams} [params.defaultQueryParameters] - Default query parameters for this project.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.ProjectDetails>>}
   */
  public createProject(
    params: DiscoveryV2.CreateProjectParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.ProjectDetails>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'type'];
    const _validParams = ['name', 'type', 'defaultQueryParameters', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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

  /**
   * List fields.
   *
   * Gets a list of the unique fields (and their types) stored in the specified collections.
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
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'collectionIds', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * @param {string} [params.language] - The language of the collection. For a list of supported languages, see the
   * [product documentation](/docs/discovery-data?topic=discovery-data-language-support).
   * @param {CollectionEnrichment[]} [params.enrichments] - An array of enrichments that are applied to this collection.
   * To get a list of enrichments that are available for a project, use the [List enrichments](#listenrichments) method.
   *
   * If no enrichments are specified when the collection is created, the default enrichments for the project type are
   * applied. For more information about project default settings, see the [product
   * documentation](/docs/discovery-data?topic=discovery-data-project-defaults).
   * @param {CollectionDetailsSmartDocumentUnderstanding} [params.smartDocumentUnderstanding] - An object that describes
   * the Smart Document Understanding model for a collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.CollectionDetails>>}
   */
  public createCollection(
    params: DiscoveryV2.CreateCollectionParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.CollectionDetails>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name'];
    const _validParams = ['projectId', 'name', 'description', 'language', 'enrichments', 'smartDocumentUnderstanding', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'language': _params.language,
      'enrichments': _params.enrichments,
      'smart_document_understanding': _params.smartDocumentUnderstanding,
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
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * @param {string} [params.name] - The new name of the collection.
   * @param {string} [params.description] - The new description of the collection.
   * @param {CollectionEnrichment[]} [params.enrichments] - An array of enrichments that are applied to this collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.CollectionDetails>>}
   */
  public updateCollection(
    params: DiscoveryV2.UpdateCollectionParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.CollectionDetails>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'name', 'description', 'enrichments', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * documents
   ************************/

  /**
   * List documents.
   *
   * Lists the documents in the specified collection. The list includes only the document ID of each document and
   * returns information for up to 10,000 documents.
   *
   * **Note**: This method is available only from Cloud Pak for Data version 4.0.9 and later installed instances and
   * from Plus and Enterprise plan IBM Cloud-managed instances.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {number} [params.count] - The maximum number of documents to return. Up to 1,000 documents are returned by
   * default. The maximum number allowed is 10,000.
   * @param {string} [params.status] - Filters the documents to include only documents with the specified ingestion
   * status. The options include:
   *
   * * `available`: Ingestion is finished and the document is indexed.
   *
   * * `failed`: Ingestion is finished, but the document is not indexed because of an error.
   *
   * * `pending`: The document is uploaded, but the ingestion process is not started.
   *
   * * `processing`: Ingestion is in progress.
   *
   * You can specify one status value or add a comma-separated list of more than one status value. For example,
   * `available,failed`.
   * @param {boolean} [params.hasNotices] - If set to `true`, only documents that have notices, meaning documents for
   * which warnings or errors were generated during the ingestion, are returned. If set to `false`, only documents that
   * don't have notices are returned. If unspecified, no filter based on notices is applied.
   *
   * Notice details are not available in the result, but you can use the [Query collection
   * notices](#querycollectionnotices) method to find details by adding the parameter
   * `query=notices.document_id:{document-id}`.
   * @param {boolean} [params.isParent] - If set to `true`, only parent documents, meaning documents that were split
   * during the ingestion process and resulted in two or more child documents, are returned. If set to `false`, only
   * child documents are returned. If unspecified, no filter based on the parent or child relationship is applied.
   *
   * CSV files, for example, are split into separate documents per line and JSON files are split into separate documents
   * per object.
   * @param {string} [params.parentDocumentId] - Filters the documents to include only child documents that were
   * generated when the specified parent document was processed.
   * @param {string} [params.sha256] - Filters the documents to include only documents with the specified SHA-256 hash.
   * Format the hash as a hexadecimal string.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.ListDocumentsResponse>>}
   */
  public listDocuments(
    params: DiscoveryV2.ListDocumentsParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.ListDocumentsResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'count', 'status', 'hasNotices', 'isParent', 'parentDocumentId', 'sha256', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
      'count': _params.count,
      'status': _params.status,
      'has_notices': _params.hasNotices,
      'is_parent': _params.isParent,
      'parent_document_id': _params.parentDocumentId,
      'sha256': _params.sha256,
    };

    const path = {
      'project_id': _params.projectId,
      'collection_id': _params.collectionId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listDocuments'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/documents',
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
   * Add a document.
   *
   * Add a document to a collection with optional metadata.
   *
   * Returns immediately after the system has accepted the document for processing.
   *
   * This operation works with a file upload collection. It cannot be used to modify a collection that crawls an
   * external data source.
   *
   *  * For a list of supported file types, see the [product
   * documentation](/docs/discovery-data?topic=discovery-data-collections#supportedfiletypes).
   *
   *  * You must provide document content, metadata, or both. If the request is missing both document content and
   * metadata, it is rejected.
   *
   *   * You can set the **Content-Type** parameter on the **file** part to indicate the media type of the document. If
   * the **Content-Type** parameter is missing or is one of the generic media types (for example,
   * `application/octet-stream`), then the service attempts to automatically detect the document's media type.
   *
   *  *  If the document is uploaded to a collection that shares its data with another collection, the
   * **X-Watson-Discovery-Force** header must be set to `true`.
   *
   *  * In curl requests only, you can assign an ID to a document that you add by appending the ID to the endpoint
   * (`/v2/projects/{project_id}/collections/{collection_id}/documents/{document_id}`). If a document already exists
   * with the specified ID, it is replaced.
   *
   * For more information about how certain file types and field names are handled when a file is added to a collection,
   * see the [product documentation](/docs/discovery-data?topic=discovery-data-index-overview#field-name-limits).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {NodeJS.ReadableStream | Buffer} [params.file] - When adding a document, the content of the document to
   * ingest. For maximum supported file size limits, see [the
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
   *
   * When analyzing a document, the content of the document to analyze but not ingest. Only the `application/json`
   * content type is supported currently. For maximum supported file size limits, see [the product
   * documentation](/docs/discovery-data?topic=discovery-data-analyzeapi#analyzeapi-limits).
   * @param {string} [params.filename] - The filename for file.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.metadata] - Add information about the file that you want to include in the response.
   *
   * The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected.
   *
   * Example:
   *
   *  ```
   *  {
   *   "filename": "favorites2.json",
   *   "file_type": "json"
   *  }.
   * @param {boolean} [params.xWatsonDiscoveryForce] - When `true`, the uploaded document is added to the collection
   * even if the data for that collection is shared with other collections.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentAccepted>>}
   */
  public addDocument(
    params: DiscoveryV2.AddDocumentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentAccepted>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'file', 'filename', 'fileContentType', 'metadata', 'xWatsonDiscoveryForce', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * Get document details.
   *
   * Get details about a specific document, whether the document is added by uploading a file or by crawling an external
   * data source.
   *
   * **Note**: This method is available only from Cloud Pak for Data version 4.0.9 and later installed instances and
   * from Plus and Enterprise plan IBM Cloud-managed instances.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.documentId - The ID of the document.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentDetails>>}
   */
  public getDocument(
    params: DiscoveryV2.GetDocumentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentDetails>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId', 'documentId'];
    const _validParams = ['projectId', 'collectionId', 'documentId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
      'getDocument'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/documents/{document_id}',
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
   * Update a document.
   *
   * Replace an existing document or add a document with a specified document ID. Starts ingesting a document with
   * optional metadata.
   *
   * This operation works with a file upload collection. It cannot be used to modify a collection that crawls an
   * external data source.
   *
   * If the document is uploaded to a collection that shares its data with another collection, the
   * **X-Watson-Discovery-Force** header must be set to `true`.
   *
   * **Notes:**
   *
   *  * Uploading a new document with this method automatically replaces any existing document stored with the same
   * document ID.
   *
   *  * If an uploaded document is split into child documents during ingestion, all existing child documents are
   * overwritten, even if the updated version of the document has fewer child documents.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.documentId - The ID of the document.
   * @param {NodeJS.ReadableStream | Buffer} [params.file] - When adding a document, the content of the document to
   * ingest. For maximum supported file size limits, see [the
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
   *
   * When analyzing a document, the content of the document to analyze but not ingest. Only the `application/json`
   * content type is supported currently. For maximum supported file size limits, see [the product
   * documentation](/docs/discovery-data?topic=discovery-data-analyzeapi#analyzeapi-limits).
   * @param {string} [params.filename] - The filename for file.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.metadata] - Add information about the file that you want to include in the response.
   *
   * The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected.
   *
   * Example:
   *
   *  ```
   *  {
   *   "filename": "favorites2.json",
   *   "file_type": "json"
   *  }.
   * @param {boolean} [params.xWatsonDiscoveryForce] - When `true`, the uploaded document is added to the collection
   * even if the data for that collection is shared with other collections.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentAccepted>>}
   */
  public updateDocument(
    params: DiscoveryV2.UpdateDocumentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentAccepted>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId', 'documentId'];
    const _validParams = ['projectId', 'collectionId', 'documentId', 'file', 'filename', 'fileContentType', 'metadata', 'xWatsonDiscoveryForce', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId', 'collectionId', 'documentId'];
    const _validParams = ['projectId', 'collectionId', 'documentId', 'xWatsonDiscoveryForce', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * queries
   ************************/

  /**
   * Query a project.
   *
   * Search your data by submitting queries that are written in natural language or formatted in the Discovery Query
   * Language. For more information, see the [Discovery
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-query-concepts). The default query
   * parameters differ by project type. For more information about the project default settings, see the [Discovery
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-query-defaults). See [the Projects
   * API documentation](#create-project) for details about how to set custom default query settings.
   *
   * The length of the UTF-8 encoding of the POST body cannot exceed 10,000 bytes, which is roughly equivalent to 10,000
   * characters in English.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string[]} [params.collectionIds] - A comma-separated list of collection IDs to be queried against.
   * @param {string} [params.filter] - Searches for documents that match the Discovery Query Language criteria that is
   * specified as input. Filter calls are cached and are faster than query calls because the results are not ordered by
   * relevance. When used with the **aggregation**, **query**, or **natural_language_query** parameters, the **filter**
   * parameter runs first. This parameter is useful for limiting results to those that contain specific metadata values.
   * @param {string} [params.query] - A query search that is written in the Discovery Query Language and returns all
   * matching documents in your data set with full enrichments and full text, and with the most relevant documents
   * listed first. Use a query search when you want to find the most relevant search results.
   * @param {string} [params.naturalLanguageQuery] - A natural language query that returns relevant documents by using
   * training data and natural language understanding.
   * @param {string} [params.aggregation] - An aggregation search that returns an exact answer by combining query search
   * with filters. Useful for applications to build lists, tables, and time series. For more information about the
   * supported types of aggregations, see the [Discovery
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-query-aggregations).
   * @param {number} [params.count] - Number of results to return.
   * @param {string[]} [params._return] - A list of the fields in the document hierarchy to return. You can specify both
   * root-level (`text`) and nested (`extracted_metadata.filename`) fields. If this parameter is an empty list, then all
   * fields are returned.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total
   * number of results that are returned is 10 and the offset is 8, it returns the last two results.
   * @param {string} [params.sort] - A comma-separated list of fields in the document to sort on. You can optionally
   * specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the
   * default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When `true`, a highlight field is returned for each result that contains
   * fields that match the query. The matching query terms are emphasized with surrounding `<em></em>` tags. This
   * parameter is ignored if **passages.enabled** and **passages.per_document** are `true`, in which case passages are
   * returned for each document instead of highlights.
   * @param {boolean} [params.spellingSuggestions] - When `true` and the **natural_language_query** parameter is used,
   * the **natural_language_query** parameter is spell checked. The most likely correction is returned in the
   * **suggested_query** field of the response (if one exists).
   * @param {QueryLargeTableResults} [params.tableResults] - Configuration for table retrieval.
   * @param {QueryLargeSuggestedRefinements} [params.suggestedRefinements] - Configuration for suggested refinements.
   *
   * **Note**: The **suggested_refinements** parameter that identified dynamic facets from the data is deprecated.
   * @param {QueryLargePassages} [params.passages] - Configuration for passage retrieval.
   * @param {QueryLargeSimilar} [params.similar] - Finds results from documents that are similar to documents of
   * interest. Use this parameter to add a *More like these* function to your search. You can include this parameter
   * with or without a **query**, **filter** or **natural_language_query** parameter.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.QueryResponse>>}
   */
  public query(
    params: DiscoveryV2.QueryParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.QueryResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'collectionIds', 'filter', 'query', 'naturalLanguageQuery', 'aggregation', 'count', '_return', 'offset', 'sort', 'highlight', 'spellingSuggestions', 'tableResults', 'suggestedRefinements', 'passages', 'similar', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
      'similar': _params.similar,
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
    const _requiredParams = ['projectId', 'prefix'];
    const _validParams = ['projectId', 'prefix', 'collectionIds', 'field', 'count', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * @param {string} [params.filter] - Searches for documents that match the Discovery Query Language criteria that is
   * specified as input. Filter calls are cached and are faster than query calls because the results are not ordered by
   * relevance. When used with the `aggregation`, `query`, or `natural_language_query` parameters, the `filter`
   * parameter runs first. This parameter is useful for limiting results to those that contain specific metadata values.
   * @param {string} [params.query] - A query search that is written in the Discovery Query Language and returns all
   * matching documents in your data set with full enrichments and full text, and with the most relevant documents
   * listed first.
   * @param {string} [params.naturalLanguageQuery] - A natural language query that returns relevant documents by using
   * training data and natural language understanding.
   * @param {number} [params.count] - Number of results to return. The maximum for the **count** and **offset** values
   * together in any one query is **10,000**.
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
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'filter', 'query', 'naturalLanguageQuery', 'count', 'offset', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * @param {string} [params.filter] - Searches for documents that match the Discovery Query Language criteria that is
   * specified as input. Filter calls are cached and are faster than query calls because the results are not ordered by
   * relevance. When used with the `aggregation`, `query`, or `natural_language_query` parameters, the `filter`
   * parameter runs first. This parameter is useful for limiting results to those that contain specific metadata values.
   * @param {string} [params.query] - A query search that is written in the Discovery Query Language and returns all
   * matching documents in your data set with full enrichments and full text, and with the most relevant documents
   * listed first.
   * @param {string} [params.naturalLanguageQuery] - A natural language query that returns relevant documents by using
   * training data and natural language understanding.
   * @param {number} [params.count] - Number of results to return. The maximum for the **count** and **offset** values
   * together in any one query is **10,000**.
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
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'filter', 'query', 'naturalLanguageQuery', 'count', 'offset', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
  /*************************
   * queryModifications
   ************************/

  /**
   * Get a custom stop words list.
   *
   * Returns the custom stop words list that is used by the collection. For information about the default stop words
   * lists that are applied to queries, see [the product
   * documentation](/docs/discovery-data?topic=discovery-data-stopwords).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.StopWordList>>}
   */
  public getStopwordList(
    params: DiscoveryV2.GetStopwordListParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.StopWordList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
      'getStopwordList'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/stopwords',
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
   * Create a custom stop words list.
   *
   * Adds a list of custom stop words. Stop words are words that you want the service to ignore when they occur in a
   * query because they're not useful in distinguishing the semantic meaning of the query. The stop words list cannot
   * contain more than 1 million characters.
   *
   * A default stop words list is used by all collections. The default list is applied both at indexing time and at
   * query time. A custom stop words list that you add is used at query time only.
   *
   * The custom stop words list replaces the default stop words list. Therefore, if you want to keep the stop words that
   * were used when the collection was indexed, get the default stop words list for the language of the collection first
   * and edit it to create your custom list. For information about the default stop words lists per language, see [the
   * product documentation](/docs/discovery-data?topic=discovery-data-stopwords).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string[]} [params.stopwords] - List of stop words.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.StopWordList>>}
   */
  public createStopwordList(
    params: DiscoveryV2.CreateStopwordListParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.StopWordList>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'stopwords', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'stopwords': _params.stopwords,
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
      'createStopwordList'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/stopwords',
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
   * Delete a custom stop words list.
   *
   * Deletes a custom stop words list to stop using it in queries against the collection. After a custom stop words list
   * is deleted, the default stop words list is used.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Empty>>}
   */
  public deleteStopwordList(
    params: DiscoveryV2.DeleteStopwordListParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
      'deleteStopwordList'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/stopwords',
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
   * Get the expansion list.
   *
   * Returns the current expansion list for the specified collection. If an expansion list is not specified, an empty
   * expansions array is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Expansions>>}
   */
  public listExpansions(
    params: DiscoveryV2.ListExpansionsParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Expansions>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
      'listExpansions'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/expansions',
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
   * Create or update an expansion list.
   *
   * Creates or replaces the expansion list for this collection. An expansion list introduces alternative wording for
   * key terms that are mentioned in your collection. By identifying synonyms or common misspellings, you expand the
   * scope of a query beyond exact matches. The maximum number of expanded terms allowed per collection is 5,000.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {Expansion[]} params.expansions - An array of query expansion definitions.
   *
   *  Each object in the **expansions** array represents a term or set of terms that will be expanded into other terms.
   * Each expansion object can be configured as `bidirectional` or `unidirectional`.
   *
   * * **Bidirectional**: Each entry in the `expanded_terms` list expands to include all expanded terms. For example, a
   * query for `ibm` expands to `ibm OR international business machines OR big blue`.
   *
   * * **Unidirectional**: The terms in `input_terms` in the query are replaced by the terms in `expanded_terms`. For
   * example, a query for the often misused term `on premise` is converted to `on premises OR on-premises` and does not
   * contain the original term. If you want an input term to be included in the query, then repeat the input term in the
   * expanded terms list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Expansions>>}
   */
  public createExpansions(
    params: DiscoveryV2.CreateExpansionsParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Expansions>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId', 'expansions'];
    const _validParams = ['projectId', 'collectionId', 'expansions', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'expansions': _params.expansions,
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
      'createExpansions'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/expansions',
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
   * Delete the expansion list.
   *
   * Removes the expansion information for this collection. To disable query expansion for a collection, delete the
   * expansion list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Empty>>}
   */
  public deleteExpansions(
    params: DiscoveryV2.DeleteExpansionsParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
      'deleteExpansions'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/collections/{collection_id}/expansions',
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
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * @param {string} params.naturalLanguageQuery - The natural text query that is used as the training query.
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
    const _requiredParams = ['projectId', 'naturalLanguageQuery', 'examples'];
    const _validParams = ['projectId', 'naturalLanguageQuery', 'examples', 'filter', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId', 'queryId'];
    const _validParams = ['projectId', 'queryId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * @param {string} params.naturalLanguageQuery - The natural text query that is used as the training query.
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
    const _requiredParams = ['projectId', 'queryId', 'naturalLanguageQuery', 'examples'];
    const _validParams = ['projectId', 'queryId', 'naturalLanguageQuery', 'examples', 'filter', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId', 'queryId'];
    const _validParams = ['projectId', 'queryId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * enrichments
   ************************/

  /**
   * List enrichments.
   *
   * Lists the enrichments available to this project. The *Part of Speech* and *Sentiment of Phrases* enrichments might
   * be listed, but are reserved for internal use only.
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
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * Create an enrichment for use with the specified project. To apply the enrichment to a collection in the project,
   * use the [Collections API](/apidocs/discovery-data#createcollection).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {CreateEnrichment} params.enrichment - Information about a specific enrichment.
   * @param {NodeJS.ReadableStream | Buffer} [params.file] - The enrichment file to upload. Expected file types per
   * enrichment are as follows:
   *
   * * CSV for `dictionary`
   *
   * * PEAR for `uima_annotator` and `rule_based` (Explorer)
   *
   * * ZIP for `watson_knowledge_studio_model` and `rule_based` (Studio Advanced Rule Editor).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Enrichment>>}
   */
  public createEnrichment(
    params: DiscoveryV2.CreateEnrichmentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Enrichment>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'enrichment'];
    const _validParams = ['projectId', 'enrichment', 'file', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId', 'enrichmentId'];
    const _validParams = ['projectId', 'enrichmentId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId', 'enrichmentId', 'name'];
    const _validParams = ['projectId', 'enrichmentId', 'name', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['projectId', 'enrichmentId'];
    const _validParams = ['projectId', 'enrichmentId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * documentClassifiers
   ************************/

  /**
   * List document classifiers.
   *
   * Get a list of the document classifiers in a project. Returns only the name and classifier ID of each document
   * classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifiers>>}
   */
  public listDocumentClassifiers(
    params: DiscoveryV2.ListDocumentClassifiersParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifiers>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
      'listDocumentClassifiers'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/document_classifiers',
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
   * Create a document classifier.
   *
   * Create a document classifier. You can use the API to create a document classifier in any project type. After you
   * create a document classifier, you can use the Enrichments API to create a classifier enrichment, and then the
   * Collections API to apply the enrichment to a collection in the project.
   *
   * **Note:** This method is supported on installed instances (IBM Cloud Pak for Data) or IBM Cloud-managed Premium or
   * Enterprise plan instances.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {NodeJS.ReadableStream | Buffer} params.trainingData - The training data CSV file to upload. The CSV file
   * must have headers. The file must include a field that contains the text you want to classify and a field that
   * contains the classification labels that you want to use to classify your data. If you want to specify multiple
   * values in a single field, use a semicolon as the value separator. For a sample file, see [the product
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-cm-doc-classifier).
   * @param {CreateDocumentClassifier} params.classifier - An object that manages the settings and data that is required
   * to train a document classification model.
   * @param {NodeJS.ReadableStream | Buffer} [params.testData] - The CSV with test data to upload. The column values in
   * the test file must be the same as the column values in the training data file. If no test data is provided, the
   * training data is split into two separate groups of training and test data.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifier>>}
   */
  public createDocumentClassifier(
    params: DiscoveryV2.CreateDocumentClassifierParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifier>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'trainingData', 'classifier'];
    const _validParams = ['projectId', 'trainingData', 'classifier', 'testData', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const formData = {
      'training_data': {
        data: _params.trainingData,
        contentType: 'text/csv',
      },
      'classifier': _params.classifier,
      'test_data': {
        data: _params.testData,
        contentType: 'text/csv',
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
      'createDocumentClassifier'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/document_classifiers',
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
   * Get a document classifier.
   *
   * Get details about a specific document classifier.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifier>>}
   */
  public getDocumentClassifier(
    params: DiscoveryV2.GetDocumentClassifierParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifier>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'classifierId'];
    const _validParams = ['projectId', 'classifierId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'classifier_id': _params.classifierId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getDocumentClassifier'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/document_classifiers/{classifier_id}',
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
   * Update a document classifier.
   *
   * Update the document classifier name or description, update the training data, or add or update the test data.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {UpdateDocumentClassifier} params.classifier - An object that contains a new name or description for a
   * document classifier, updated training data, or new or updated test data.
   * @param {NodeJS.ReadableStream | Buffer} [params.trainingData] - The training data CSV file to upload. The CSV file
   * must have headers. The file must include a field that contains the text you want to classify and a field that
   * contains the classification labels that you want to use to classify your data. If you want to specify multiple
   * values in a single column, use a semicolon as the value separator. For a sample file, see [the product
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-cm-doc-classifier).
   * @param {NodeJS.ReadableStream | Buffer} [params.testData] - The CSV with test data to upload. The column values in
   * the test file must be the same as the column values in the training data file. If no test data is provided, the
   * training data is split into two separate groups of training and test data.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifier>>}
   */
  public updateDocumentClassifier(
    params: DiscoveryV2.UpdateDocumentClassifierParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifier>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'classifierId', 'classifier'];
    const _validParams = ['projectId', 'classifierId', 'classifier', 'trainingData', 'testData', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const formData = {
      'classifier': _params.classifier,
      'training_data': {
        data: _params.trainingData,
        contentType: 'text/csv',
      },
      'test_data': {
        data: _params.testData,
        contentType: 'text/csv',
      },
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'classifier_id': _params.classifierId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateDocumentClassifier'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/document_classifiers/{classifier_id}',
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
   * Delete a document classifier.
   *
   * Deletes an existing document classifier from the specified project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Empty>>}
   */
  public deleteDocumentClassifier(
    params: DiscoveryV2.DeleteDocumentClassifierParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'classifierId'];
    const _validParams = ['projectId', 'classifierId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'classifier_id': _params.classifierId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteDocumentClassifier'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/document_classifiers/{classifier_id}',
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
   * documentClassifierModels
   ************************/

  /**
   * List document classifier models.
   *
   * Get a list of the document classifier models in a project. Returns only the name and model ID of each document
   * classifier model.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifierModels>>}
   */
  public listDocumentClassifierModels(
    params: DiscoveryV2.ListDocumentClassifierModelsParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifierModels>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'classifierId'];
    const _validParams = ['projectId', 'classifierId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'classifier_id': _params.classifierId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listDocumentClassifierModels'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/document_classifiers/{classifier_id}/models',
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
   * Create a document classifier model.
   *
   * Create a document classifier model by training a model that uses the data and classifier settings defined in the
   * specified document classifier.
   *
   * **Note:** This method is supported on installed intances (IBM Cloud Pak for Data) or IBM Cloud-managed Premium or
   * Enterprise plan instances.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {string} params.name - The name of the document classifier model.
   * @param {string} [params.description] - A description of the document classifier model.
   * @param {number} [params.learningRate] - A tuning parameter in an optimization algorithm that determines the step
   * size at each iteration of the training process. It influences how much of any newly acquired information overrides
   * the existing information, and therefore is said to represent the speed at which a machine learning model learns.
   * The default value is `0.1`.
   * @param {number[]} [params.l1RegularizationStrengths] - Avoids overfitting by shrinking the coefficient of less
   * important features to zero, which removes some features altogether. You can specify many values for hyper-parameter
   * optimization. The default value is `[0.000001]`.
   * @param {number[]} [params.l2RegularizationStrengths] - A method you can apply to avoid overfitting your model on
   * the training data. You can specify many values for hyper-parameter optimization. The default value is `[0.000001]`.
   * @param {number} [params.trainingMaxSteps] - Maximum number of training steps to complete. This setting is useful if
   * you need the training process to finish in a specific time frame to fit into an automated process. The default
   * value is ten million.
   * @param {number} [params.improvementRatio] - Stops the training run early if the improvement ratio is not met by the
   * time the process reaches a certain point. The default value is `0.00001`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifierModel>>}
   */
  public createDocumentClassifierModel(
    params: DiscoveryV2.CreateDocumentClassifierModelParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifierModel>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'classifierId', 'name'];
    const _validParams = ['projectId', 'classifierId', 'name', 'description', 'learningRate', 'l1RegularizationStrengths', 'l2RegularizationStrengths', 'trainingMaxSteps', 'improvementRatio', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'learning_rate': _params.learningRate,
      'l1_regularization_strengths': _params.l1RegularizationStrengths,
      'l2_regularization_strengths': _params.l2RegularizationStrengths,
      'training_max_steps': _params.trainingMaxSteps,
      'improvement_ratio': _params.improvementRatio,
    };

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'classifier_id': _params.classifierId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createDocumentClassifierModel'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/document_classifiers/{classifier_id}/models',
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
   * Get a document classifier model.
   *
   * Get details about a specific document classifier model.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {string} params.modelId - The ID of the classifier model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifierModel>>}
   */
  public getDocumentClassifierModel(
    params: DiscoveryV2.GetDocumentClassifierModelParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifierModel>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'classifierId', 'modelId'];
    const _validParams = ['projectId', 'classifierId', 'modelId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'classifier_id': _params.classifierId,
      'model_id': _params.modelId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getDocumentClassifierModel'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/document_classifiers/{classifier_id}/models/{model_id}',
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
   * Update a document classifier model.
   *
   * Update the document classifier model name or description.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {string} params.modelId - The ID of the classifier model.
   * @param {string} [params.name] - A new name for the enrichment.
   * @param {string} [params.description] - A new description for the enrichment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifierModel>>}
   */
  public updateDocumentClassifierModel(
    params: DiscoveryV2.UpdateDocumentClassifierModelParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.DocumentClassifierModel>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'classifierId', 'modelId'];
    const _validParams = ['projectId', 'classifierId', 'modelId', 'name', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
      'classifier_id': _params.classifierId,
      'model_id': _params.modelId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateDocumentClassifierModel'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/document_classifiers/{classifier_id}/models/{model_id}',
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
   * Delete a document classifier model.
   *
   * Deletes an existing document classifier model from the specified project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.classifierId - The ID of the classifier.
   * @param {string} params.modelId - The ID of the classifier model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.Empty>>}
   */
  public deleteDocumentClassifierModel(
    params: DiscoveryV2.DeleteDocumentClassifierModelParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'classifierId', 'modelId'];
    const _validParams = ['projectId', 'classifierId', 'modelId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': this.version,
    };

    const path = {
      'project_id': _params.projectId,
      'classifier_id': _params.classifierId,
      'model_id': _params.modelId,
    };

    const sdkHeaders = getSdkHeaders(
      DiscoveryV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteDocumentClassifierModel'
    );

    const parameters = {
      options: {
        url: '/v2/projects/{project_id}/document_classifiers/{classifier_id}/models/{model_id}',
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
   * Process a document and return it for realtime use. Supports JSON files only.
   *
   * The file is not stored in the collection, but is processed according to the collection's configuration settings. To
   * get results, enrichments must be applied to a field in the collection that also exists in the file that you want to
   * analyze. For example, to analyze text in a `Quote` field, you must apply enrichments to the `Quote` field in the
   * collection configuration. Then, when you analyze the file, the text in the `Quote` field is analyzed and results
   * are written to a field named `enriched_Quote`.
   *
   * **Note:** This method is supported with Enterprise plan deployments and installed deployments only.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project. This information can be found from the *Integrate and
   * Deploy* page in Discovery.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {NodeJS.ReadableStream | Buffer} [params.file] - When adding a document, the content of the document to
   * ingest. For maximum supported file size limits, see [the
   * documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
   *
   * When analyzing a document, the content of the document to analyze but not ingest. Only the `application/json`
   * content type is supported currently. For maximum supported file size limits, see [the product
   * documentation](/docs/discovery-data?topic=discovery-data-analyzeapi#analyzeapi-limits).
   * @param {string} [params.filename] - The filename for file.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.metadata] - Add information about the file that you want to include in the response.
   *
   * The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected.
   *
   * Example:
   *
   *  ```
   *  {
   *   "filename": "favorites2.json",
   *   "file_type": "json"
   *  }.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DiscoveryV2.Response<DiscoveryV2.AnalyzedDocument>>}
   */
  public analyzeDocument(
    params: DiscoveryV2.AnalyzeDocumentParams
  ): Promise<DiscoveryV2.Response<DiscoveryV2.AnalyzedDocument>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'collectionId'];
    const _validParams = ['projectId', 'collectionId', 'file', 'filename', 'fileContentType', 'metadata', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['customerId'];
    const _validParams = ['customerId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
     *  The `content_mining` and `content_intelligence` types are available with Premium plan managed deployments and
     *  installed deployments only.
     */
    type: CreateProjectConstants.Type | string;
    /** Default query parameters for this project. */
    defaultQueryParameters?: DefaultQueryParams;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createProject` operation. */
  export namespace CreateProjectConstants {
    /** The type of project. The `content_intelligence` type is a *Document Retrieval for Contracts* project and the `other` type is a *Custom* project. The `content_mining` and `content_intelligence` types are available with Premium plan managed deployments and installed deployments only. */
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
    /** The language of the collection. For a list of supported languages, see the [product
     *  documentation](/docs/discovery-data?topic=discovery-data-language-support).
     */
    language?: string;
    /** An array of enrichments that are applied to this collection. To get a list of enrichments that are available
     *  for a project, use the [List enrichments](#listenrichments) method.
     *
     *  If no enrichments are specified when the collection is created, the default enrichments for the project type are
     *  applied. For more information about project default settings, see the [product
     *  documentation](/docs/discovery-data?topic=discovery-data-project-defaults).
     */
    enrichments?: CollectionEnrichment[];
    /** An object that describes the Smart Document Understanding model for a collection. */
    smartDocumentUnderstanding?: CollectionDetailsSmartDocumentUnderstanding;
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
    /** The new name of the collection. */
    name?: string;
    /** The new description of the collection. */
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

  /** Parameters for the `listDocuments` operation. */
  export interface ListDocumentsParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The maximum number of documents to return. Up to 1,000 documents are returned by default. The maximum number
     *  allowed is 10,000.
     */
    count?: number;
    /** Filters the documents to include only documents with the specified ingestion status. The options include:
     *
     *  * `available`: Ingestion is finished and the document is indexed.
     *
     *  * `failed`: Ingestion is finished, but the document is not indexed because of an error.
     *
     *  * `pending`: The document is uploaded, but the ingestion process is not started.
     *
     *  * `processing`: Ingestion is in progress.
     *
     *  You can specify one status value or add a comma-separated list of more than one status value. For example,
     *  `available,failed`.
     */
    status?: string;
    /** If set to `true`, only documents that have notices, meaning documents for which warnings or errors were
     *  generated during the ingestion, are returned. If set to `false`, only documents that don't have notices are
     *  returned. If unspecified, no filter based on notices is applied.
     *
     *  Notice details are not available in the result, but you can use the [Query collection
     *  notices](#querycollectionnotices) method to find details by adding the parameter
     *  `query=notices.document_id:{document-id}`.
     */
    hasNotices?: boolean;
    /** If set to `true`, only parent documents, meaning documents that were split during the ingestion process and
     *  resulted in two or more child documents, are returned. If set to `false`, only child documents are returned. If
     *  unspecified, no filter based on the parent or child relationship is applied.
     *
     *  CSV files, for example, are split into separate documents per line and JSON files are split into separate
     *  documents per object.
     */
    isParent?: boolean;
    /** Filters the documents to include only child documents that were generated when the specified parent document
     *  was processed.
     */
    parentDocumentId?: string;
    /** Filters the documents to include only documents with the specified SHA-256 hash. Format the hash as a
     *  hexadecimal string.
     */
    sha256?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addDocument` operation. */
  export interface AddDocumentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** When adding a document, the content of the document to ingest. For maximum supported file size limits, see
     *  [the
     *  documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
     *
     *  When analyzing a document, the content of the document to analyze but not ingest. Only the `application/json`
     *  content type is supported currently. For maximum supported file size limits, see [the product
     *  documentation](/docs/discovery-data?topic=discovery-data-analyzeapi#analyzeapi-limits).
     */
    file?: NodeJS.ReadableStream | Buffer;
    /** The filename for file. */
    filename?: string;
    /** The content type of file. */
    fileContentType?: AddDocumentConstants.FileContentType | string;
    /** Add information about the file that you want to include in the response.
     *
     *  The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected.
     *
     *  Example:
     *
     *   ```
     *   {
     *    "filename": "favorites2.json",
     *    "file_type": "json"
     *   }.
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

  /** Parameters for the `getDocument` operation. */
  export interface GetDocumentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the document. */
    documentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDocument` operation. */
  export interface UpdateDocumentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the document. */
    documentId: string;
    /** When adding a document, the content of the document to ingest. For maximum supported file size limits, see
     *  [the
     *  documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
     *
     *  When analyzing a document, the content of the document to analyze but not ingest. Only the `application/json`
     *  content type is supported currently. For maximum supported file size limits, see [the product
     *  documentation](/docs/discovery-data?topic=discovery-data-analyzeapi#analyzeapi-limits).
     */
    file?: NodeJS.ReadableStream | Buffer;
    /** The filename for file. */
    filename?: string;
    /** The content type of file. */
    fileContentType?: UpdateDocumentConstants.FileContentType | string;
    /** Add information about the file that you want to include in the response.
     *
     *  The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected.
     *
     *  Example:
     *
     *   ```
     *   {
     *    "filename": "favorites2.json",
     *    "file_type": "json"
     *   }.
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

  /** Parameters for the `query` operation. */
  export interface QueryParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** A comma-separated list of collection IDs to be queried against. */
    collectionIds?: string[];
    /** Searches for documents that match the Discovery Query Language criteria that is specified as input. Filter
     *  calls are cached and are faster than query calls because the results are not ordered by relevance. When used
     *  with the **aggregation**, **query**, or **natural_language_query** parameters, the **filter** parameter runs
     *  first. This parameter is useful for limiting results to those that contain specific metadata values.
     */
    filter?: string;
    /** A query search that is written in the Discovery Query Language and returns all matching documents in your
     *  data set with full enrichments and full text, and with the most relevant documents listed first. Use a query
     *  search when you want to find the most relevant search results.
     */
    query?: string;
    /** A natural language query that returns relevant documents by using training data and natural language
     *  understanding.
     */
    naturalLanguageQuery?: string;
    /** An aggregation search that returns an exact answer by combining query search with filters. Useful for
     *  applications to build lists, tables, and time series. For more information about the supported types of
     *  aggregations, see the [Discovery
     *  documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-query-aggregations).
     */
    aggregation?: string;
    /** Number of results to return. */
    count?: number;
    /** A list of the fields in the document hierarchy to return. You can specify both root-level (`text`) and
     *  nested (`extracted_metadata.filename`) fields. If this parameter is an empty list, then all fields are returned.
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
    /** When `true`, a highlight field is returned for each result that contains fields that match the query. The
     *  matching query terms are emphasized with surrounding `<em></em>` tags. This parameter is ignored if
     *  **passages.enabled** and **passages.per_document** are `true`, in which case passages are returned for each
     *  document instead of highlights.
     */
    highlight?: boolean;
    /** When `true` and the **natural_language_query** parameter is used, the **natural_language_query** parameter
     *  is spell checked. The most likely correction is returned in the **suggested_query** field of the response (if
     *  one exists).
     */
    spellingSuggestions?: boolean;
    /** Configuration for table retrieval. */
    tableResults?: QueryLargeTableResults;
    /** Configuration for suggested refinements.
     *
     *  **Note**: The **suggested_refinements** parameter that identified dynamic facets from the data is deprecated.
     */
    suggestedRefinements?: QueryLargeSuggestedRefinements;
    /** Configuration for passage retrieval. */
    passages?: QueryLargePassages;
    /** Finds results from documents that are similar to documents of interest. Use this parameter to add a *More
     *  like these* function to your search. You can include this parameter with or without a **query**, **filter** or
     *  **natural_language_query** parameter.
     */
    similar?: QueryLargeSimilar;
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
    /** Searches for documents that match the Discovery Query Language criteria that is specified as input. Filter
     *  calls are cached and are faster than query calls because the results are not ordered by relevance. When used
     *  with the `aggregation`, `query`, or `natural_language_query` parameters, the `filter` parameter runs first. This
     *  parameter is useful for limiting results to those that contain specific metadata values.
     */
    filter?: string;
    /** A query search that is written in the Discovery Query Language and returns all matching documents in your
     *  data set with full enrichments and full text, and with the most relevant documents listed first.
     */
    query?: string;
    /** A natural language query that returns relevant documents by using training data and natural language
     *  understanding.
     */
    naturalLanguageQuery?: string;
    /** Number of results to return. The maximum for the **count** and **offset** values together in any one query
     *  is **10,000**.
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
    /** Searches for documents that match the Discovery Query Language criteria that is specified as input. Filter
     *  calls are cached and are faster than query calls because the results are not ordered by relevance. When used
     *  with the `aggregation`, `query`, or `natural_language_query` parameters, the `filter` parameter runs first. This
     *  parameter is useful for limiting results to those that contain specific metadata values.
     */
    filter?: string;
    /** A query search that is written in the Discovery Query Language and returns all matching documents in your
     *  data set with full enrichments and full text, and with the most relevant documents listed first.
     */
    query?: string;
    /** A natural language query that returns relevant documents by using training data and natural language
     *  understanding.
     */
    naturalLanguageQuery?: string;
    /** Number of results to return. The maximum for the **count** and **offset** values together in any one query
     *  is **10,000**.
     */
    count?: number;
    /** The number of query results to skip at the beginning. For example, if the total number of results that are
     *  returned is 10 and the offset is 8, it returns the last two results. The maximum for the **count** and
     *  **offset** values together in any one query is **10000**.
     */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getStopwordList` operation. */
  export interface GetStopwordListParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createStopwordList` operation. */
  export interface CreateStopwordListParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** List of stop words. */
    stopwords?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteStopwordList` operation. */
  export interface DeleteStopwordListParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listExpansions` operation. */
  export interface ListExpansionsParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createExpansions` operation. */
  export interface CreateExpansionsParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** An array of query expansion definitions.
     *
     *   Each object in the **expansions** array represents a term or set of terms that will be expanded into other
     *  terms. Each expansion object can be configured as `bidirectional` or `unidirectional`.
     *
     *  * **Bidirectional**: Each entry in the `expanded_terms` list expands to include all expanded terms. For example,
     *  a query for `ibm` expands to `ibm OR international business machines OR big blue`.
     *
     *  * **Unidirectional**: The terms in `input_terms` in the query are replaced by the terms in `expanded_terms`. For
     *  example, a query for the often misused term `on premise` is converted to `on premises OR on-premises` and does
     *  not contain the original term. If you want an input term to be included in the query, then repeat the input term
     *  in the expanded terms list.
     */
    expansions: Expansion[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteExpansions` operation. */
  export interface DeleteExpansionsParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getComponentSettings` operation. */
  export interface GetComponentSettingsParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
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
    /** The natural text query that is used as the training query. */
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
    /** The natural text query that is used as the training query. */
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
    /** The enrichment file to upload. Expected file types per enrichment are as follows:
     *
     *  * CSV for `dictionary`
     *
     *  * PEAR for `uima_annotator` and `rule_based` (Explorer)
     *
     *  * ZIP for `watson_knowledge_studio_model` and `rule_based` (Studio Advanced Rule Editor).
     */
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

  /** Parameters for the `listDocumentClassifiers` operation. */
  export interface ListDocumentClassifiersParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDocumentClassifier` operation. */
  export interface CreateDocumentClassifierParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The training data CSV file to upload. The CSV file must have headers. The file must include a field that
     *  contains the text you want to classify and a field that contains the classification labels that you want to use
     *  to classify your data. If you want to specify multiple values in a single field, use a semicolon as the value
     *  separator. For a sample file, see [the product
     *  documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-cm-doc-classifier).
     */
    trainingData: NodeJS.ReadableStream | Buffer;
    /** An object that manages the settings and data that is required to train a document classification model. */
    classifier: CreateDocumentClassifier;
    /** The CSV with test data to upload. The column values in the test file must be the same as the column values
     *  in the training data file. If no test data is provided, the training data is split into two separate groups of
     *  training and test data.
     */
    testData?: NodeJS.ReadableStream | Buffer;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDocumentClassifier` operation. */
  export interface GetDocumentClassifierParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the classifier. */
    classifierId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDocumentClassifier` operation. */
  export interface UpdateDocumentClassifierParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the classifier. */
    classifierId: string;
    /** An object that contains a new name or description for a document classifier, updated training data, or new
     *  or updated test data.
     */
    classifier: UpdateDocumentClassifier;
    /** The training data CSV file to upload. The CSV file must have headers. The file must include a field that
     *  contains the text you want to classify and a field that contains the classification labels that you want to use
     *  to classify your data. If you want to specify multiple values in a single column, use a semicolon as the value
     *  separator. For a sample file, see [the product
     *  documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-cm-doc-classifier).
     */
    trainingData?: NodeJS.ReadableStream | Buffer;
    /** The CSV with test data to upload. The column values in the test file must be the same as the column values
     *  in the training data file. If no test data is provided, the training data is split into two separate groups of
     *  training and test data.
     */
    testData?: NodeJS.ReadableStream | Buffer;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDocumentClassifier` operation. */
  export interface DeleteDocumentClassifierParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the classifier. */
    classifierId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDocumentClassifierModels` operation. */
  export interface ListDocumentClassifierModelsParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the classifier. */
    classifierId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDocumentClassifierModel` operation. */
  export interface CreateDocumentClassifierModelParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the classifier. */
    classifierId: string;
    /** The name of the document classifier model. */
    name: string;
    /** A description of the document classifier model. */
    description?: string;
    /** A tuning parameter in an optimization algorithm that determines the step size at each iteration of the
     *  training process. It influences how much of any newly acquired information overrides the existing information,
     *  and therefore is said to represent the speed at which a machine learning model learns. The default value is
     *  `0.1`.
     */
    learningRate?: number;
    /** Avoids overfitting by shrinking the coefficient of less important features to zero, which removes some
     *  features altogether. You can specify many values for hyper-parameter optimization. The default value is
     *  `[0.000001]`.
     */
    l1RegularizationStrengths?: number[];
    /** A method you can apply to avoid overfitting your model on the training data. You can specify many values for
     *  hyper-parameter optimization. The default value is `[0.000001]`.
     */
    l2RegularizationStrengths?: number[];
    /** Maximum number of training steps to complete. This setting is useful if you need the training process to
     *  finish in a specific time frame to fit into an automated process. The default value is ten million.
     */
    trainingMaxSteps?: number;
    /** Stops the training run early if the improvement ratio is not met by the time the process reaches a certain
     *  point. The default value is `0.00001`.
     */
    improvementRatio?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDocumentClassifierModel` operation. */
  export interface GetDocumentClassifierModelParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the classifier. */
    classifierId: string;
    /** The ID of the classifier model. */
    modelId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDocumentClassifierModel` operation. */
  export interface UpdateDocumentClassifierModelParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the classifier. */
    classifierId: string;
    /** The ID of the classifier model. */
    modelId: string;
    /** A new name for the enrichment. */
    name?: string;
    /** A new description for the enrichment. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDocumentClassifierModel` operation. */
  export interface DeleteDocumentClassifierModelParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the classifier. */
    classifierId: string;
    /** The ID of the classifier model. */
    modelId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `analyzeDocument` operation. */
  export interface AnalyzeDocumentParams {
    /** The ID of the project. This information can be found from the *Integrate and Deploy* page in Discovery. */
    projectId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** When adding a document, the content of the document to ingest. For maximum supported file size limits, see
     *  [the
     *  documentation](https://cloud.ibm.com/docs/discovery-data?topic=discovery-data-collections#collections-doc-limits).
     *
     *  When analyzing a document, the content of the document to analyze but not ingest. Only the `application/json`
     *  content type is supported currently. For maximum supported file size limits, see [the product
     *  documentation](/docs/discovery-data?topic=discovery-data-analyzeapi#analyzeapi-limits).
     */
    file?: NodeJS.ReadableStream | Buffer;
    /** The filename for file. */
    filename?: string;
    /** The content type of file. */
    fileContentType?: AnalyzeDocumentConstants.FileContentType | string;
    /** Add information about the file that you want to include in the response.
     *
     *  The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected.
     *
     *  Example:
     *
     *   ```
     *   {
     *    "filename": "favorites2.json",
     *    "file_type": "json"
     *   }.
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

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** An object that contains the converted document and any identified enrichments. Root-level fields from the original file are returned also. */
  export interface AnalyzedDocument {
    /** Array of notices that are triggered when the files are processed. */
    notices?: Notice[];
    /** Result of the document analysis. */
    result?: AnalyzedResult;
  }

  /** Result of the document analysis. */
  export interface AnalyzedResult {
    /** Metadata that was specified with the request. */
    metadata?: JsonObject;
    /** AnalyzedResult accepts additional properties. */
    [propName: string]: any;
  }

  /** An object with details for creating federated document classifier models. */
  export interface ClassifierFederatedModel {
    /** Name of the field that contains the values from which multiple classifier models are defined. For example,
     *  you can specify a field that lists product lines to create a separate model per product line.
     */
    field: string;
  }

  /** An object that contains information about a trained document classifier model. */
  export interface ClassifierModelEvaluation {
    /** A micro-average aggregates the contributions of all classes to compute the average metric. Classes refers to
     *  the classification labels that are specified in the **answer_field**.
     */
    micro_average: ModelEvaluationMicroAverage;
    /** A macro-average computes metric independently for each class and then takes the average. Class refers to the
     *  classification label that is specified in the **answer_field**.
     */
    macro_average: ModelEvaluationMacroAverage;
    /** An array of evaluation metrics, one set of metrics for each class, where class refers to the classification
     *  label that is specified in the **answer_field**.
     */
    per_class: PerClassModelEvaluation[];
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
    /** The language of the collection. For a list of supported languages, see the [product
     *  documentation](/docs/discovery-data?topic=discovery-data-language-support).
     */
    language?: string;
    /** An array of enrichments that are applied to this collection. To get a list of enrichments that are available
     *  for a project, use the [List enrichments](#listenrichments) method.
     *
     *  If no enrichments are specified when the collection is created, the default enrichments for the project type are
     *  applied. For more information about project default settings, see the [product
     *  documentation](/docs/discovery-data?topic=discovery-data-project-defaults).
     */
    enrichments?: CollectionEnrichment[];
    /** An object that describes the Smart Document Understanding model for a collection. */
    smart_document_understanding?: CollectionDetailsSmartDocumentUnderstanding;
  }

  /** An object that describes the Smart Document Understanding model for a collection. */
  export interface CollectionDetailsSmartDocumentUnderstanding {
    /** When `true`, smart document understanding conversion is enabled for the collection. */
    enabled?: boolean;
    /** Specifies the type of Smart Document Understanding (SDU) model that is enabled for the collection. The
     *  following types of models are supported:
     *
     *   * `custom`: A user-trained model is applied.
     *
     *   * `pre_trained`: A pretrained model is applied. This type of model is applied automatically to *Document
     *  Retrieval for Contracts* projects.
     *
     *   * `text_extraction`: An SDU model that extracts text and metadata from the content. This model is enabled in
     *  collections by default regardless of the types of documents in the collection (as long as the service plan
     *  supports SDU models).
     *
     *  You can apply user-trained or pretrained models to collections from the *Identify fields* page of the product
     *  user interface. For more information, see [the product
     *  documentation](/docs/discovery-data?topic=discovery-data-configuring-fields).
     */
    model?: string;
  }

  /** An object describing an enrichment for a collection. */
  export interface CollectionEnrichment {
    /** The unique identifier of this enrichment. For more information about how to determine the ID of an
     *  enrichment, see [the product
     *  documentation](/docs/discovery-data?topic=discovery-data-manage-enrichments#enrichments-ids).
     */
    enrichment_id?: string;
    /** An array of field names that the enrichment is applied to.
     *
     *  If you apply an enrichment to a field from a JSON file, the data is converted to an array automatically, even if
     *  the field contains a single value.
     */
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

  /** An object that manages the settings and data that is required to train a document classification model. */
  export interface CreateDocumentClassifier {
    /** A human-readable name of the document classifier. */
    name: string;
    /** A description of the document classifier. */
    description?: string;
    /** The language of the training data that is associated with the document classifier. Language is specified by
     *  using the ISO 639-1 language code, such as `en` for English or `ja` for Japanese.
     */
    language: string;
    /** The name of the field from the training and test data that contains the classification labels. */
    answer_field: string;
    /** An array of enrichments to apply to the data that is used to train and test the document classifier. The
     *  output from the enrichments is used as features by the classifier to classify the document content both during
     *  training and at run time.
     */
    enrichments?: DocumentClassifierEnrichment[];
    /** An object with details for creating federated document classifier models. */
    federated_classification?: ClassifierFederatedModel;
  }

  /** Information about a specific enrichment. */
  export interface CreateEnrichment {
    /** The human readable name for this enrichment. */
    name?: string;
    /** The description of this enrichment. */
    description?: string;
    /** The type of this enrichment. The following types are supported:
     *
     *  * `classifier`: Creates a document classifier enrichment from a document classifier model that you create by
     *  using the [Document classifier API](/apidocs/discovery-data#createdocumentclassifier). **Note**: A text
     *  classifier enrichment can be created only from the product user interface.
     *
     *  * `dictionary`: Creates a custom dictionary enrichment that you define in a CSV file.
     *
     *  * `regular_expression`: Creates a custom regular expression enrichment from regex syntax that you specify in the
     *  request.
     *
     *  * `rule_based`: Creates an enrichment from an advanced rules model that is created and exported as a ZIP file
     *  from Watson Knowledge Studio.
     *
     *  * `uima_annotator`: Creates an enrichment from a custom UIMA text analysis model that is defined in a PEAR file
     *  created in one of the following ways:
     *
     *      * Watson Explorer Content Analytics Studio. **Note**: Supported in IBM Cloud Pak for Data instances only.
     *
     *      * Rule-based model that is created in Watson Knowledge Studio.
     *
     *  * `watson_knowledge_studio_model`: Creates an enrichment from a Watson Knowledge Studio machine learning model
     *  that is defined in a ZIP file.
     */
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
    /** Object that contains suggested refinement settings.
     *
     *  **Note**: The `suggested_refinements` parameter that identified dynamic facets from the data is deprecated.
     */
    suggested_refinements?: DefaultQueryParamsSuggestedRefinements;
    /** When `true`, a spelling suggestions for the query are returned by default. */
    spelling_suggestions?: boolean;
    /** When `true`, highlights for the query are returned by default. */
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

  /** Object that contains suggested refinement settings. **Note**: The `suggested_refinements` parameter that identified dynamic facets from the data is deprecated. */
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

  /** Information about a document classifier. */
  export interface DocumentClassifier {
    /** A unique identifier of the document classifier. */
    classifier_id?: string;
    /** A human-readable name of the document classifier. */
    name: string;
    /** A description of the document classifier. */
    description?: string;
    /** The date that the document classifier was created. */
    created?: string;
    /** The language of the training data that is associated with the document classifier. Language is specified by
     *  using the ISO 639-1 language code, such as `en` for English or `ja` for Japanese.
     */
    language?: string;
    /** An array of enrichments to apply to the data that is used to train and test the document classifier. The
     *  output from the enrichments is used as features by the classifier to classify the document content both during
     *  training and at run time.
     */
    enrichments?: DocumentClassifierEnrichment[];
    /** An array of fields that are used to train the document classifier. The same set of fields must exist in the
     *  training data, the test data, and the documents where the resulting document classifier enrichment is applied at
     *  run time.
     */
    recognized_fields?: string[];
    /** The name of the field from the training and test data that contains the classification labels. */
    answer_field?: string;
    /** Name of the CSV file with training data that is used to train the document classifier. */
    training_data_file?: string;
    /** Name of the CSV file with data that is used to test the document classifier. If no test data is provided, a
     *  subset of the training data is used for testing purposes.
     */
    test_data_file?: string;
    /** An object with details for creating federated document classifier models. */
    federated_classification?: ClassifierFederatedModel;
  }

  /** An object that describes enrichments that are applied to the training and test data that is used by the document classifier. */
  export interface DocumentClassifierEnrichment {
    /** A unique identifier of the enrichment. */
    enrichment_id: string;
    /** An array of field names where the enrichment is applied. */
    fields: string[];
  }

  /** Information about a document classifier model. */
  export interface DocumentClassifierModel {
    /** A unique identifier of the document classifier model. */
    model_id?: string;
    /** A human-readable name of the document classifier model. */
    name: string;
    /** A description of the document classifier model. */
    description?: string;
    /** The date that the document classifier model was created. */
    created?: string;
    /** The date that the document classifier model was last updated. */
    updated?: string;
    /** Name of the CSV file that contains the training data that is used to train the document classifier model. */
    training_data_file?: string;
    /** Name of the CSV file that contains data that is used to test the document classifier model. If no test data
     *  is provided, a subset of the training data is used for testing purposes.
     */
    test_data_file?: string;
    /** The status of the training run. */
    status?: string;
    /** An object that contains information about a trained document classifier model. */
    evaluation?: ClassifierModelEvaluation;
    /** A unique identifier of the enrichment that is generated by this document classifier model. */
    enrichment_id?: string;
    /** The date that the document classifier model was deployed. */
    deployed_at?: string;
  }

  /** An object that contains a list of document classifier model definitions. */
  export interface DocumentClassifierModels {
    /** An array of document classifier model definitions. */
    models?: DocumentClassifierModel[];
  }

  /** An object that contains a list of document classifier definitions. */
  export interface DocumentClassifiers {
    /** An array of document classifier definitions. */
    classifiers?: DocumentClassifier[];
  }

  /** Information about a document. */
  export interface DocumentDetails {
    /** The unique identifier of the document. */
    document_id?: string;
    /** Date and time that the document is added to the collection. For a child document, the date and time when the
     *  process that generates the child document runs. The date-time format is `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`.
     */
    created?: string;
    /** Date and time that the document is finished being processed and is indexed. This date changes whenever the
     *  document is reprocessed, including for enrichment changes. The date-time format is
     *  `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`.
     */
    updated?: string;
    /** The status of the ingestion of the document. The possible values are:
     *
     *  * `available`: Ingestion is finished and the document is indexed.
     *
     *  * `failed`: Ingestion is finished, but the document is not indexed because of an error.
     *
     *  * `pending`: The document is uploaded, but the ingestion process is not started.
     *
     *  * `processing`: Ingestion is in progress.
     */
    status?: string;
    /** Array of JSON objects for notices, meaning warning or error messages, that are produced by the document
     *  ingestion process. The array does not include notices that are produced for child documents that are generated
     *  when a document is processed.
     */
    notices?: Notice[];
    /** Information about the child documents that are generated from a single document during ingestion or other
     *  processing.
     */
    children?: DocumentDetailsChildren;
    /** Name of the original source file (if available). */
    filename?: string;
    /** The type of the original source file, such as `csv`, `excel`, `html`, `json`, `pdf`, `text`, `word`, and so
     *  on.
     */
    file_type?: string;
    /** The SHA-256 hash of the original source file. The hash is formatted as a hexadecimal string. */
    sha256?: string;
  }

  /** Information about the child documents that are generated from a single document during ingestion or other processing. */
  export interface DocumentDetailsChildren {
    /** Indicates whether the child documents have any notices. The value is `false` if the document does not have
     *  child documents.
     */
    have_notices?: boolean;
    /** Number of child documents. The value is `0` when processing of the document doesn't generate any child
     *  documents.
     */
    count?: number;
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
    /** An array of supported languages for this enrichment. When creating an enrichment, only specify a language
     *  that is used by the model or in the dictionary. Required when **type** is `dictionary`. Optional when **type**
     *  is `rule_based`. Not valid when creating any other type of enrichment.
     */
    languages?: string[];
    /** The name of the entity type. This value is used as the field name in the index. Required when **type** is
     *  `dictionary` or `regular_expression`. Not valid when creating any other type of enrichment.
     */
    entity_type?: string;
    /** The regular expression to apply for this enrichment. Required when **type** is `regular_expression`. Not
     *  valid when creating any other type of enrichment.
     */
    regular_expression?: string;
    /** The name of the result document field that this enrichment creates. Required when **type** is `rule_based`
     *  or `classifier`. Not valid when creating any other type of enrichment.
     */
    result_field?: string;
    /** A unique identifier of the document classifier. Required when **type** is `classifier`. Not valid when
     *  creating any other type of enrichment.
     */
    classifier_id?: string;
    /** A unique identifier of the document classifier model. Required when **type** is `classifier`. Not valid when
     *  creating any other type of enrichment.
     */
    model_id?: string;
    /** Specifies a threshold. Only classes with evaluation confidence scores that are higher than the specified
     *  threshold are included in the output. Optional when **type** is `classifier`. Not valid when creating any other
     *  type of enrichment.
     */
    confidence_threshold?: number;
    /** Evaluates only the classes that fall in the top set of results when ranked by confidence. For example, if
     *  set to `5`, then the top five classes for each document are evaluated. If set to 0, the **confidence_threshold**
     *  is used to determine the predicted classes. Optional when **type** is `classifier`. Not valid when creating any
     *  other type of enrichment.
     */
    top_k?: number;
  }

  /** An object that contains an array of enrichment definitions. */
  export interface Enrichments {
    /** An array of enrichment definitions. */
    enrichments?: Enrichment[];
  }

  /** An expansion definition. Each object respresents one set of expandable strings. For example, you could have expansions for the word `hot` in one object, and expansions for the word `cold` in another. Follow these guidelines when you add terms: * Specify the terms in lowercase. Lowercase terms expand to uppercase. * Multiword terms are supported only in bidirectional expansions. * Do not specify a term that is specified in the stop words list for the collection. */
  export interface Expansion {
    /** A list of terms that will be expanded for this expansion. If specified, only the items in this list are
     *  expanded.
     */
    input_terms?: string[];
    /** A list of terms that this expansion will be expanded to. If specified without **input_terms**, the list also
     *  functions as the input term list.
     */
    expanded_terms: string[];
  }

  /** The query expansion definitions for the specified collection. */
  export interface Expansions {
    /** An array of query expansion definitions.
     *
     *   Each object in the **expansions** array represents a term or set of terms that will be expanded into other
     *  terms. Each expansion object can be configured as `bidirectional` or `unidirectional`.
     *
     *  * **Bidirectional**: Each entry in the `expanded_terms` list expands to include all expanded terms. For example,
     *  a query for `ibm` expands to `ibm OR international business machines OR big blue`.
     *
     *  * **Unidirectional**: The terms in `input_terms` in the query are replaced by the terms in `expanded_terms`. For
     *  example, a query for the often misused term `on premise` is converted to `on premises OR on-premises` and does
     *  not contain the original term. If you want an input term to be included in the query, then repeat the input term
     *  in the expanded terms list.
     */
    expansions: Expansion[];
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

  /** Response object that contains an array of documents. */
  export interface ListDocumentsResponse {
    /** The number of matching results for the document query. */
    matching_results?: number;
    /** An array that lists the documents in a collection. Only the document ID of each document is returned in the
     *  list. You can use the [Get document](#getdocument) method to get more information about an individual document.
     */
    documents?: DocumentDetails[];
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

  /** A macro-average computes metric independently for each class and then takes the average. Class refers to the classification label that is specified in the **answer_field**. */
  export interface ModelEvaluationMacroAverage {
    /** A metric that measures how many of the overall documents are classified correctly. */
    precision: number;
    /** A metric that measures how often documents that should be classified into certain classes are classified
     *  into those classes.
     */
    recall: number;
    /** A metric that measures whether the optimal balance between precision and recall is reached. The F1 score can
     *  be interpreted as a weighted average of the precision and recall values. An F1 score reaches its best value at 1
     *  and worst value at 0.
     */
    f1: number;
  }

  /** A micro-average aggregates the contributions of all classes to compute the average metric. Classes refers to the classification labels that are specified in the **answer_field**. */
  export interface ModelEvaluationMicroAverage {
    /** A metric that measures how many of the overall documents are classified correctly. */
    precision: number;
    /** A metric that measures how often documents that should be classified into certain classes are classified
     *  into those classes.
     */
    recall: number;
    /** A metric that measures whether the optimal balance between precision and recall is reached. The F1 score can
     *  be interpreted as a weighted average of the precision and recall values. An F1 score reaches its best value at 1
     *  and worst value at 0.
     */
    f1: number;
  }

  /** A notice produced for the collection. */
  export interface Notice {
    /** Identifies the notice. Many notices might have the same ID. This field exists so that user applications can
     *  programmatically identify a notice and take automatic corrective action. Typical notice IDs include:
     *
     *  `index_failed`, `index_failed_too_many_requests`, `index_failed_incompatible_field`,
     *  `index_failed_cluster_unavailable`, `ingestion_timeout`, `ingestion_error`, `bad_request`, `internal_error`,
     *  `missing_model`, `unsupported_model`, `smart_document_understanding_failed_incompatible_field`,
     *  `smart_document_understanding_failed_internal_error`, `smart_document_understanding_failed_internal_error`,
     *  `smart_document_understanding_failed_warning`, `smart_document_understanding_page_error`,
     *  `smart_document_understanding_page_warning`. **Note:** This is not a complete list. Other values might be
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

  /** An object that measures the metrics from a training run for each classification label separately. */
  export interface PerClassModelEvaluation {
    /** Class name. Each class name is derived from a value in the **answer_field**. */
    name: string;
    /** A metric that measures how many of the overall documents are classified correctly. */
    precision: number;
    /** A metric that measures how often documents that should be classified into certain classes are classified
     *  into those classes.
     */
    recall: number;
    /** A metric that measures whether the optimal balance between precision and recall is reached. The F1 score can
     *  be interpreted as a weighted average of the precision and recall values. An F1 score reaches its best value at 1
     *  and worst value at 0.
     */
    f1: number;
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
     *  The `content_mining` and `content_intelligence` types are available with Premium plan managed deployments and
     *  installed deployments only.
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
     *  The `content_mining` and `content_intelligence` types are available with Premium plan managed deployments and
     *  installed deployments only.
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
    /** Maximum number of passages to return per document in the result. Ignored if **passages.per_document** is
     *  `false`.
     */
    max_per_document?: number;
    /** A list of fields to extract passages from. If this parameter is an empty list, then all root-level fields
     *  are included.
     */
    fields?: string[];
    /** The maximum number of passages to return. Ignored if **passages.per_document** is `true`. */
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
     *  The **find_answers** parameter is available only on managed instances of Discovery.
     */
    find_answers?: boolean;
    /** The number of `answer` objects to return per passage if the **find_answers** parmeter is specified as
     *  `true`.
     */
    max_answers_per_passage?: number;
  }

  /** Finds results from documents that are similar to documents of interest. Use this parameter to add a *More like these* function to your search. You can include this parameter with or without a **query**, **filter** or **natural_language_query** parameter. */
  export interface QueryLargeSimilar {
    /** When `true`, includes documents in the query results that are similar to documents you specify. */
    enabled?: boolean;
    /** The list of documents of interest. Required if **enabled** is `true`. */
    document_ids?: string[];
    /** Looks for similarities in the specified subset of fields in the documents. If not specified, all of the
     *  document fields are used.
     */
    fields?: string[];
  }

  /** Configuration for suggested refinements. **Note**: The **suggested_refinements** parameter that identified dynamic facets from the data is deprecated. */
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
    /** Array of suggested refinements. **Note**: The `suggested_refinements` parameter that identified dynamic
     *  facets from the data is deprecated.
     */
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
    /** The confidence score of the passage's analysis. A higher score indicates greater confidence. The score is
     *  used to rank the passages from all documents and is returned only if **passages.per_document** is `false`.
     */
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

  /** A suggested additional query term or terms user to filter results. **Note**: The `suggested_refinements` parameter is deprecated. */
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

  /** List of words to filter out of text that is submitted in queries. */
  export interface StopWordList {
    /** List of stop words. */
    stopwords: string[];
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
    /** The natural text query that is used as the training query. */
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
    /** Array of training queries. At least 50 queries are required for training to begin. A maximum of 10,000
     *  queries are returned.
     */
    queries?: TrainingQuery[];
  }

  /** An object that contains a new name or description for a document classifier, updated training data, or new or updated test data. */
  export interface UpdateDocumentClassifier {
    /** A new name for the classifier. */
    name?: string;
    /** A new description for the classifier. */
    description?: string;
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
    /** The size of the sections that the results are split into. */
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
