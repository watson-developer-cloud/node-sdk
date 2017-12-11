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

import * as extend from 'extend';
import { RequestResponse } from 'request';
import { createRequest } from '../lib/requestwrapper';
import { getMissingParams } from '../lib/helper';
import { BaseService } from '../lib/base_service';
import { FileObject } from '../lib/helper';

/**
 * The IBM Watson Discovery Service is a cognitive search and content analytics engine that you can add to applications to identify patterns, trends and actionable insights to drive better decision-making. Securely unify structured and unstructured data with pre-enriched content, and use a simplified query language to eliminate the need for manual filtering of results.
 */

class DiscoveryV1 extends BaseService {
  name: string; // set by prototype to 'discovery'
  version: string; // set by prototype to 'v1'

  static URL: string = 'https://gateway.watsonplatform.net/discovery/api';

  /**
   * Construct a DiscoveryV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {String} options.version_date - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
   * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/discovery/api'). The base url may differ between Bluemix regions.
   * @param {String} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {String} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
   * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
   * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
   * @constructor
   * @returns {DiscoveryV1}
   * @throws {Error}
   */
  constructor(options: DiscoveryV1.Options) {
    super(options);
    // check if 'version_date' was provided
    if (typeof this._options.version_date === 'undefined') {
      throw new Error('Argument error: version_date was not specified');
    }
    this._options.qs.version = options.version_date;
  }

  /*************************
   * environments
   ************************/

  /**
   * Add an environment
   *
   * Creates a new environment.  You can create only one environment per service instance. An attempt to create another environment results in an error.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Name that identifies the environment.
   * @param {string} [params.description] - Description of the environment.
   * @param {number} [params.size] - **Deprecated**: Size of the environment.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createEnvironment(
    params: DiscoveryV1.CreateEnvironmentParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Environment>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      name: _params.name,
      description: _params.description,
      size: _params.size
    };
    const parameters = {
      options: {
        url: '/v1/environments',
        method: 'POST',
        json: true,
        body: body
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Delete environment
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteEnvironment(
    params: DiscoveryV1.DeleteEnvironmentParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteEnvironmentResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Get environment info
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getEnvironment(
    params: DiscoveryV1.GetEnvironmentParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Environment>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * List environments
   *
   * List existing environments for the service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - Show only the environment with the given name.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listEnvironments(
    params?: DiscoveryV1.ListEnvironmentsParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.ListEnvironmentsResponse>
  ): ReadableStream | void {
    const _params =
      typeof params === 'function' && !callback ? {} : extend({}, params);
    const _callback =
      typeof params === 'function' && !callback
        ? params
        : callback ? callback : () => {};
    const query = {
      name: _params.name
    };
    const parameters = {
      options: {
        url: '/v1/environments',
        method: 'GET',
        qs: query
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * List fields in specified collecitons
   *
   * Gets a list of the unique fields (and their types) stored in the indexes of the specified collecitons.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string[]} params.collection_ids - A comma-separated list of collection IDs to be queried against.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listFields(
    params: DiscoveryV1.ListFieldsParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.ListCollectionFieldsResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_ids'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      collection_ids: _params.collection_ids
    };
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/fields',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Update an environment
   *
   * Updates an environment. The environment's `name` and  `description` parameters can be changed. You must specify a `name` for the environment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} [params.name] - Name that identifies the environment.
   * @param {string} [params.description] - Description of the environment.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateEnvironment(
    params: DiscoveryV1.UpdateEnvironmentParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Environment>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      name: _params.name,
      description: _params.description
    };
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * configurations
   ************************/

  /**
   * Add configuration
   *
   * Creates a new configuration.  If the input configuration contains the `configuration_id`, `created`, or `updated` properties, then they are ignored and overridden by the system, and an error is not returned so that the overridden fields do not need to be removed when copying a configuration.  The configuration can contain unrecognized JSON fields. Any such fields are ignored and do not generate an error. This makes it easier to use newer configuration files with older versions of the API and the service. It also makes it possible for the tooling to add additional metadata and information to the configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.name - The name of the configuration.
   * @param {string} [params.description] - The description of the configuration, if available.
   * @param {Conversions} [params.conversions] - The document conversion settings for the configuration.
   * @param {Enrichment[]} [params.enrichments] - An array of document enrichment settings for the configuration.
   * @param {NormalizationOperation[]} [params.normalizations] - Defines operations that can be used to transform the final output JSON into a normalized form. Operations are executed in the order that they appear in the array.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createConfiguration(
    params: DiscoveryV1.CreateConfigurationParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Configuration>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      name: _params.name,
      description: _params.description,
      conversions: _params.conversions,
      enrichments: _params.enrichments,
      normalizations: _params.normalizations
    };
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Delete a configuration
   *
   * The deletion is performed unconditionally. A configuration deletion request succeeds even if the configuration is referenced by a collection or document ingestion. However, documents that have already been submitted for processing continue to use the deleted configuration. Documents are always processed with a snapshot of the configuration as it existed at the time the document was submitted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.configuration_id - The ID of the configuration.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteConfiguration(
    params: DiscoveryV1.DeleteConfigurationParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteConfigurationResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'configuration_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      configuration_id: _params.configuration_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/configurations/{configuration_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Get configuration details
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.configuration_id - The ID of the configuration.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getConfiguration(
    params: DiscoveryV1.GetConfigurationParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Configuration>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'configuration_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      configuration_id: _params.configuration_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/configurations/{configuration_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * List configurations
   *
   * Lists existing configurations for the service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} [params.name] - Find configurations with the given name.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listConfigurations(
    params: DiscoveryV1.ListConfigurationsParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.ListConfigurationsResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      name: _params.name
    };
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Update a configuration
   *
   * Replaces an existing configuration.   * Completely replaces the original configuration.   * The `configuration_id`, `updated`, and `created` fields are accepted in the request, but they are ignored, and an error is not generated. It is also acceptable for users to submit an updated configuration with none of the three properties.   * Documents are processed with a snapshot of the configuration as it was at the time the document was submitted to be ingested. This means that already submitted documents will not see any updates made to the configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.configuration_id - The ID of the configuration.
   * @param {string} params.name - The name of the configuration.
   * @param {string} [params.description] - The description of the configuration, if available.
   * @param {Conversions} [params.conversions] - The document conversion settings for the configuration.
   * @param {Enrichment[]} [params.enrichments] - An array of document enrichment settings for the configuration.
   * @param {NormalizationOperation[]} [params.normalizations] - Defines operations that can be used to transform the final output JSON into a normalized form. Operations are executed in the order that they appear in the array.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateConfiguration(
    params: DiscoveryV1.UpdateConfigurationParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Configuration>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'configuration_id', 'name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      name: _params.name,
      description: _params.description,
      conversions: _params.conversions,
      enrichments: _params.enrichments,
      normalizations: _params.normalizations
    };
    const path = {
      environment_id: _params.environment_id,
      configuration_id: _params.configuration_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/configurations/{configuration_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * testYourConfigurationOnADocument
   ************************/

  /**
   * Test configuration
   *
   * Runs a sample document through the default or your configuration and returns diagnostic information designed to help you understand how the document was processed. The document is not added to the index.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} [params.configuration] - The configuration to use to process the document. If this part is provided, then the provided configuration is used to process the document. If the `configuration_id` is also provided (both are present at the same time), then request is rejected. The maximum supported configuration size is 1 MB. Configuration parts larger than 1 MB are rejected. See the `GET /configurations/{configuration_id}` operation for an example configuration.
   * @param {string} [params.step] - Specify to only run the input document through the given step instead of running the input document through the entire ingestion workflow. Valid values are `convert`, `enrich`, and `normalize`.
   * @param {string} [params.configuration_id] - The ID of the configuration to use to process the document. If the `configuration` form part is also provided (both are present at the same time), then request will be rejected.
   * @param {ReadableStream|FileObject|Buffer} [params.file] - The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected.
   * @param {string} [params.metadata] - If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ```
   * @param {string} [params.file_content_type] - The content type of file.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  testConfigurationInEnvironment(
    params: DiscoveryV1.TestConfigurationInEnvironmentParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.TestDocument>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      configuration: _params.configuration,
      file: {
        data: _params.file,
        contentType: _params.file_content_type
      },
      metadata: _params.metadata
    };
    const query = {
      step: _params.step,
      configuration_id: _params.configuration_id
    };
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/preview',
        method: 'POST',
        qs: query,
        path: path,
        formData: formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * collections
   ************************/

  /**
   * Create a collection
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.name - The name of the collection to be created.
   * @param {string} [params.description] - A description of the collection.
   * @param {string} [params.configuration_id] - The ID of the configuration in which the collection is to be created.
   * @param {string} [params.language] - The language of the documents stored in the collection, in the form of an ISO 639-1 language code.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createCollection(
    params: DiscoveryV1.CreateCollectionParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Collection>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'name'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      name: _params.name,
      description: _params.description,
      configuration_id: _params.configuration_id,
      language: _params.language
    };
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Delete a collection
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteCollection(
    params: DiscoveryV1.DeleteCollectionParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteCollectionResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Get collection details
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getCollection(
    params: DiscoveryV1.GetCollectionParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Collection>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * List unique fields
   *
   * Gets a list of the unique fields (and their types) stored in the index.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listCollectionFields(
    params: DiscoveryV1.ListCollectionFieldsParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.ListCollectionFieldsResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/fields',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * List collections
   *
   * Lists existing collections for the service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} [params.name] - Find collections with the given name.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listCollections(
    params: DiscoveryV1.ListCollectionsParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.ListCollectionsResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      name: _params.name
    };
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Update a collection
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.name - The name of the collection.
   * @param {string} [params.description] - A description of the collection.
   * @param {string} [params.configuration_id] - The ID of the configuration in which the collection is to be updated.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateCollection(
    params: DiscoveryV1.UpdateCollectionParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Collection>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      name: _params.name,
      description: _params.description,
      configuration_id: _params.configuration_id
    };
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * documents
   ************************/

  /**
   * Add a document
   *
   * Add a document to a collection with optional metadata.    * The `version` query parameter is still required.    * Returns immediately after the system has accepted the document for processing.    * The user must provide document content, metadata, or both. If the request is missing both document content and metadata, it is rejected.    * The user can set the `Content-Type` parameter on the `file` part to indicate the media type of the document. If the `Content-Type` parameter is missing or is one of the generic media types (for example, `application/octet-stream`), then the service attempts to automatically detect the document's media type.    * The following field names are reserved and will be filtered out if present after normalization: `id`, `score`, `highlight`, and any field with the prefix of: `_`, `+`, or `-`    * Fields with empty name values after normalization are filtered out before indexing.    * Fields containing the following characters after normalization are filtered out before indexing: `#` and `,`
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {ReadableStream|FileObject|Buffer} [params.file] - The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected.
   * @param {string} [params.metadata] - If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ```
   * @param {string} [params.file_content_type] - The content type of file.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  addDocument(
    params: DiscoveryV1.AddDocumentParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.DocumentAccepted>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      file: {
        data: _params.file,
        contentType: _params.file_content_type
      },
      metadata: _params.metadata
    };
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/documents',
        method: 'POST',
        path: path,
        formData: formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Delete a document
   *
   * If the given document ID is invalid, or if the document is not found, then the a success response is returned (HTTP status code `200`) with the status set to 'deleted'.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.document_id - The ID of the document.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteDocument(
    params: DiscoveryV1.DeleteDocumentParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteDocumentResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id', 'document_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id,
      document_id: _params.document_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Get document details
   *
   * Fetch status details about a submitted document. **Note:** this operation does not return the document itself. Instead, it returns only the document's processing status and any notices (warnings or errors) that were generated when the document was ingested. Use the query API to retrieve the actual document content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.document_id - The ID of the document.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getDocumentStatus(
    params: DiscoveryV1.GetDocumentStatusParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.DocumentStatus>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id', 'document_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id,
      document_id: _params.document_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Update a document
   *
   * Replace an existing document. Starts ingesting a document with optional metadata.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.document_id - The ID of the document.
   * @param {ReadableStream|FileObject|Buffer} [params.file] - The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected.
   * @param {string} [params.metadata] - If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ```
   * @param {string} [params.file_content_type] - The content type of file.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateDocument(
    params: DiscoveryV1.UpdateDocumentParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.DocumentAccepted>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id', 'document_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const formData = {
      file: {
        data: _params.file,
        contentType: _params.file_content_type
      },
      metadata: _params.metadata
    };
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id,
      document_id: _params.document_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        method: 'POST',
        path: path,
        formData: formData
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * queries
   ************************/

  /**
   * Query documents in multiple collections
   *
   * See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string[]} params.collection_ids - A comma-separated list of collection IDs to be queried against.
   * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
   * @param {number} [params.count] - Number of documents to return.
   * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
   * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
   * @param {boolean} [params.deduplicate] - When `true` and used with a Watson Discovery News collection, duplicate results (based on the contents of the `title` field) are removed. Duplicate comparison is limited to the current query only, `offset` is not considered. Defaults to `false`. This parameter is currently Beta functionality.
   * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  federatedQuery(
    params: DiscoveryV1.FederatedQueryParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.QueryResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_ids'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      collection_ids: _params.collection_ids,
      filter: _params.filter,
      query: _params.query,
      natural_language_query: _params.natural_language_query,
      aggregation: _params.aggregation,
      count: _params.count,
      return_fields: _params.return_fields,
      offset: _params.offset,
      sort: _params.sort,
      highlight: _params.highlight,
      deduplicate: _params.deduplicate,
      'deduplicate.field': _params.deduplicate_field
    };
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/query',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Query multiple collection system notices
   *
   * Queries for notices (errors or warnings) that might have been generated by the system. Notices are generated when ingesting documents and performing relevance training. See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details on the query language.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string[]} params.collection_ids - A comma-separated list of collection IDs to be queried against.
   * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
   * @param {number} [params.count] - Number of documents to return.
   * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
   * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
   * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  federatedQueryNotices(
    params: DiscoveryV1.FederatedQueryNoticesParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.QueryNoticesResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_ids'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      collection_ids: _params.collection_ids,
      filter: _params.filter,
      query: _params.query,
      natural_language_query: _params.natural_language_query,
      aggregation: _params.aggregation,
      count: _params.count,
      return_fields: _params.return_fields,
      offset: _params.offset,
      sort: _params.sort,
      highlight: _params.highlight,
      'deduplicate.field': _params.deduplicate_field
    };
    const path = {
      environment_id: _params.environment_id
    };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/notices',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Query documents
   *
   * See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
   * @param {boolean} [params.passages] - A passages query that returns the most relevant passages from the results.
   * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
   * @param {number} [params.count] - Number of documents to return.
   * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return_fields.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
   * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
   * @param {string[]} [params.passages_fields] - A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all top-level fields are included.
   * @param {number} [params.passages_count] - The maximum number of passages to return. The search returns fewer passages if the requested total is not found. The default is `10`. The maximum is `100`.
   * @param {number} [params.passages_characters] - The approximate number of characters that any one passage will have. The default is `400`. The minimum is `50`. The maximum is `2000`.
   * @param {boolean} [params.deduplicate] - When `true` and used with a Watson Discovery News collection, duplicate results (based on the contents of the `title` field) are removed. Duplicate comparison is limited to the current query only, `offset` is not considered. Defaults to `false`. This parameter is currently Beta functionality.
   * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  query(
    params: DiscoveryV1.QueryParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.QueryResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      filter: _params.filter,
      query: _params.query,
      natural_language_query: _params.natural_language_query,
      passages: _params.passages,
      aggregation: _params.aggregation,
      count: _params.count,
      return: _params.return_fields,
      offset: _params.offset,
      sort: _params.sort,
      highlight: _params.highlight,
      'passages.fields': _params.passages_fields,
      'passages.count': _params.passages_count,
      'passages.characters': _params.passages_characters,
      deduplicate: _params.deduplicate,
      'deduplicate.field': _params.deduplicate_field
    };
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/query',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Knowledge Graph entity query
   *
   * See the [Knowledge Graph documentation](https://console.bluemix.net/docs/services/discovery/building-kg.html) for more details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} [params.feature] - The entity query feature to perform. Must be `disambiguate`
   * @param {QueryEntitiesEntity} [params.entity] - A text string that appears within the entity text field.
   * @param {QueryEntitiesContext} [params.context] - Entity text to provide context for the queried entity and rank based on that association. For example, if you wanted to query the city of London in England your query would look for `London` with the context of `England`.
   * @param {number} [params.count] - The number of results to return. The default is `10`. The maximum is `1000`.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  queryEntities(
    params: DiscoveryV1.QueryEntitiesParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.QueryEntitiesResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      feature: _params.feature,
      entity: _params.entity,
      context: _params.context,
      count: _params.count
    };
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/query_entities',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Query system notices
   *
   * Queries for notices (errors or warnings) that might have been generated by the system. Notices are generated when ingesting documents and performing relevance training. See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details on the query language.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
   * @param {boolean} [params.passages] - A passages query that returns the most relevant passages from the results.
   * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
   * @param {number} [params.count] - Number of documents to return.
   * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
   * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
   * @param {string[]} [params.passages_fields] - A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all top-level fields are included.
   * @param {number} [params.passages_count] - The maximum number of passages to return. The search returns fewer passages if the requested total is not found. The default is `10`. The maximum is `100`.
   * @param {number} [params.passages_characters] - The approximate number of characters that any one passage will have. The default is `400`. The minimum is `50`. The maximum is `2000`.
   * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  queryNotices(
    params: DiscoveryV1.QueryNoticesParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.QueryNoticesResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const query = {
      filter: _params.filter,
      query: _params.query,
      natural_language_query: _params.natural_language_query,
      passages: _params.passages,
      aggregation: _params.aggregation,
      count: _params.count,
      return_fields: _params.return_fields,
      offset: _params.offset,
      sort: _params.sort,
      highlight: _params.highlight,
      'passages.fields': _params.passages_fields,
      'passages.count': _params.passages_count,
      'passages.characters': _params.passages_characters,
      'deduplicate.field': _params.deduplicate_field
    };
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/notices',
        method: 'GET',
        qs: query,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   * Knowledge Graph relationship query
   *
   * See the [Knowledge Graph documentation](https://console.bluemix.net/docs/services/discovery/building-kg.html) for more details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {QueryRelationsEntity[]} [params.entities] - An array of entities to find relationships for.
   * @param {QueryEntitiesContext} [params.context] - Entity text to provide context for the queried entity and rank based on that association. For example, if you wanted to query the city of London in England your query would look for `London` with the context of `England`.
   * @param {string} [params.sort] - The sorting method for the relationships, can be `score` or `frequency`. `frequency` is the number of unique times each entity is identified. The default is `score`
   * @param {QueryRelationsFilter} [params.filter] - Filters to apply to the relationship query
   * @param {number} [params.count] - The number of results to return. The default is `10`. The maximum is `1000`.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  queryRelations(
    params: DiscoveryV1.QueryRelationsParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.QueryRelationsResponse>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      entities: _params.entities,
      context: _params.context,
      sort: _params.sort,
      filter: _params.filter,
      count: _params.count
    };
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/query_relations',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /*************************
   * trainingData
   ************************/

  /**
   *
   *
   * Adds a query to the training data for this collection. The query can contain a filter and natural language query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} [params.natural_language_query] -
   * @param {string} [params.filter] -
   * @param {TrainingExample[]} [params.examples] -
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  addTrainingData(
    params: DiscoveryV1.AddTrainingDataParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingQuery>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      natural_language_query: _params.natural_language_query,
      filter: _params.filter,
      examples: _params.examples
    };
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   *
   *
   * Adds a new example to this training data query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {string} [params.document_id] -
   * @param {string} [params.cross_reference] -
   * @param {number} [params.relevance] -
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  createTrainingExample(
    params: DiscoveryV1.CreateTrainingExampleParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExample>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id', 'query_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      document_id: _params.document_id,
      cross_reference: _params.cross_reference,
      relevance: _params.relevance
    };
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id,
      query_id: _params.query_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples',
        method: 'POST',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   *
   *
   * Clears all training data for this collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteAllTrainingData(
    params: DiscoveryV1.DeleteAllTrainingDataParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   *
   *
   * Removes the training data and all associated examples from the training data set.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteTrainingData(
    params: DiscoveryV1.DeleteTrainingDataParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id', 'query_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id,
      query_id: _params.query_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   *
   *
   * Removes the example with the given ID for the training data query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {string} params.example_id - The ID of the document as it is indexed.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  deleteTrainingExample(
    params: DiscoveryV1.DeleteTrainingExampleParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = [
      'environment_id',
      'collection_id',
      'query_id',
      'example_id'
    ];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id,
      query_id: _params.query_id,
      example_id: _params.example_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        method: 'DELETE',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   *
   *
   * Shows details for a specific training data query, including the query string and all examples.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getTrainingData(
    params: DiscoveryV1.GetTrainingDataParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingQuery>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id', 'query_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id,
      query_id: _params.query_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   *
   *
   * Gets the details for this training example.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {string} params.example_id - The ID of the document as it is indexed.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  getTrainingExample(
    params: DiscoveryV1.GetTrainingExampleParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExample>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = [
      'environment_id',
      'collection_id',
      'query_id',
      'example_id'
    ];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id,
      query_id: _params.query_id,
      example_id: _params.example_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   *
   *
   * Lists the training data for this collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listTrainingData(
    params: DiscoveryV1.ListTrainingDataParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingDataSet>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   *
   *
   * List all examples for this training data query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  listTrainingExamples(
    params: DiscoveryV1.ListTrainingExamplesParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExampleList>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = ['environment_id', 'collection_id', 'query_id'];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id,
      query_id: _params.query_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples',
        method: 'GET',
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }

  /**
   *
   *
   * Changes the label or cross reference query for this training example.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {string} params.example_id - The ID of the document as it is indexed.
   * @param {string} [params.cross_reference] -
   * @param {number} [params.relevance] -
   * @param {Function} [callback] - The callback that handles the response.
   * @returns {ReadableStream|void}
   */
  updateTrainingExample(
    params: DiscoveryV1.UpdateTrainingExampleParams,
    callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExample>
  ): ReadableStream | void {
    const _params = extend({}, params);
    const _callback = callback ? callback : () => {};
    const requiredParams = [
      'environment_id',
      'collection_id',
      'query_id',
      'example_id'
    ];
    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return _callback(missingParams);
    }
    const body = {
      cross_reference: _params.cross_reference,
      relevance: _params.relevance
    };
    const path = {
      environment_id: _params.environment_id,
      collection_id: _params.collection_id,
      query_id: _params.query_id,
      example_id: _params.example_id
    };
    const parameters = {
      options: {
        url:
          '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
    };
    return createRequest(parameters, _callback);
  }
}

DiscoveryV1.prototype.name = 'discovery';
DiscoveryV1.prototype.version = 'v1';

/*************************
 * interfaces
 ************************/

namespace DiscoveryV1 {
  /** Options for the `DiscoveryV1` constructor. **/
  export type Options = {
    version_date: string;
    url?: string;
    username?: string;
    password?: string;
    use_unauthenticated?: boolean;
    headers?: object;
  };

  /** The callback for a service request. **/
  export type Callback<T> = (
    error: any,
    body?: T,
    response?: RequestResponse
  ) => void;

  /** The body of a service request that returns no response data. **/
  export interface Empty {}

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `createEnvironment` operation. **/
  export interface CreateEnvironmentParams {
    /** Name that identifies the environment. **/
    name: string;
    /** Description of the environment. **/
    description?: string;
    /** **Deprecated**: Size of the environment. **/
    size?: number;
  }

  /** Parameters for the `deleteEnvironment` operation. **/
  export interface DeleteEnvironmentParams {
    /** The ID of the environment. **/
    environment_id: string;
  }

  /** Parameters for the `getEnvironment` operation. **/
  export interface GetEnvironmentParams {
    /** The ID of the environment. **/
    environment_id: string;
  }

  /** Parameters for the `listEnvironments` operation. **/
  export interface ListEnvironmentsParams {
    /** Show only the environment with the given name. **/
    name?: string;
  }

  /** Parameters for the `listFields` operation. **/
  export interface ListFieldsParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** A comma-separated list of collection IDs to be queried against. **/
    collection_ids: string[];
  }

  /** Parameters for the `updateEnvironment` operation. **/
  export interface UpdateEnvironmentParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** Name that identifies the environment. **/
    name?: string;
    /** Description of the environment. **/
    description?: string;
  }

  /** Parameters for the `createConfiguration` operation. **/
  export interface CreateConfigurationParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The name of the configuration. **/
    name: string;
    /** The description of the configuration, if available. **/
    description?: string;
    /** The document conversion settings for the configuration. **/
    conversions?: Conversions;
    /** An array of document enrichment settings for the configuration. **/
    enrichments?: Enrichment[];
    /** Defines operations that can be used to transform the final output JSON into a normalized form. Operations are executed in the order that they appear in the array. **/
    normalizations?: NormalizationOperation[];
  }

  /** Parameters for the `deleteConfiguration` operation. **/
  export interface DeleteConfigurationParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the configuration. **/
    configuration_id: string;
  }

  /** Parameters for the `getConfiguration` operation. **/
  export interface GetConfigurationParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the configuration. **/
    configuration_id: string;
  }

  /** Parameters for the `listConfigurations` operation. **/
  export interface ListConfigurationsParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** Find configurations with the given name. **/
    name?: string;
  }

  /** Parameters for the `updateConfiguration` operation. **/
  export interface UpdateConfigurationParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the configuration. **/
    configuration_id: string;
    /** The name of the configuration. **/
    name: string;
    /** The description of the configuration, if available. **/
    description?: string;
    /** The document conversion settings for the configuration. **/
    conversions?: Conversions;
    /** An array of document enrichment settings for the configuration. **/
    enrichments?: Enrichment[];
    /** Defines operations that can be used to transform the final output JSON into a normalized form. Operations are executed in the order that they appear in the array. **/
    normalizations?: NormalizationOperation[];
  }

  /** Parameters for the `testConfigurationInEnvironment` operation. **/
  export interface TestConfigurationInEnvironmentParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The configuration to use to process the document. If this part is provided, then the provided configuration is used to process the document. If the `configuration_id` is also provided (both are present at the same time), then request is rejected. The maximum supported configuration size is 1 MB. Configuration parts larger than 1 MB are rejected. See the `GET /configurations/{configuration_id}` operation for an example configuration. **/
    configuration?: string;
    /** Specify to only run the input document through the given step instead of running the input document through the entire ingestion workflow. Valid values are `convert`, `enrich`, and `normalize`. **/
    step?: TestConfigurationInEnvironmentConstants.Step | string;
    /** The ID of the configuration to use to process the document. If the `configuration` form part is also provided (both are present at the same time), then request will be rejected. **/
    configuration_id?: string;
    /** The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected. **/
    file?: ReadableStream | FileObject | Buffer;
    /** If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ``` **/
    metadata?: string;
    /** The content type of file. **/
    file_content_type?:
      | TestConfigurationInEnvironmentConstants.FileContentType
      | string;
  }

  /** Constants for the `testConfigurationInEnvironment` operation. **/
  export namespace TestConfigurationInEnvironmentConstants {
    /** Specify to only run the input document through the given step instead of running the input document through the entire ingestion workflow. Valid values are `convert`, `enrich`, and `normalize`. **/
    export enum Step {
      HTML_INPUT = 'html_input',
      HTML_OUTPUT = 'html_output',
      JSON_OUTPUT = 'json_output',
      JSON_NORMALIZATIONS_OUTPUT = 'json_normalizations_output',
      ENRICHMENTS_OUTPUT = 'enrichments_output',
      NORMALIZATIONS_OUTPUT = 'normalizations_output'
    }
    /** The content type of file. **/
    export enum FileContentType {
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_PDF = 'application/pdf',
      TEXT_HTML = 'text/html',
      APPLICATION_XHTML_XML = 'application/xhtml+xml'
    }
  }

  /** Parameters for the `createCollection` operation. **/
  export interface CreateCollectionParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The name of the collection to be created. **/
    name: string;
    /** A description of the collection. **/
    description?: string;
    /** The ID of the configuration in which the collection is to be created. **/
    configuration_id?: string;
    /** The language of the documents stored in the collection, in the form of an ISO 639-1 language code. **/
    language?: CreateCollectionConstants.Language | string;
  }

  /** Constants for the `createCollection` operation. **/
  export namespace CreateCollectionConstants {
    /** The language of the documents stored in the collection, in the form of an ISO 639-1 language code. **/
    export enum Language {
      EN = 'en',
      ES = 'es',
      DE = 'de',
      AR = 'ar',
      FR = 'fr',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
      PT_BR = 'pt-br'
    }
  }

  /** Parameters for the `deleteCollection` operation. **/
  export interface DeleteCollectionParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
  }

  /** Parameters for the `getCollection` operation. **/
  export interface GetCollectionParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
  }

  /** Parameters for the `listCollectionFields` operation. **/
  export interface ListCollectionFieldsParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
  }

  /** Parameters for the `listCollections` operation. **/
  export interface ListCollectionsParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** Find collections with the given name. **/
    name?: string;
  }

  /** Parameters for the `updateCollection` operation. **/
  export interface UpdateCollectionParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The name of the collection. **/
    name: string;
    /** A description of the collection. **/
    description?: string;
    /** The ID of the configuration in which the collection is to be updated. **/
    configuration_id?: string;
  }

  /** Parameters for the `addDocument` operation. **/
  export interface AddDocumentParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected. **/
    file?: ReadableStream | FileObject | Buffer;
    /** If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ``` **/
    metadata?: string;
    /** The content type of file. **/
    file_content_type?: AddDocumentConstants.FileContentType | string;
  }

  /** Constants for the `addDocument` operation. **/
  export namespace AddDocumentConstants {
    /** The content type of file. **/
    export enum FileContentType {
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_PDF = 'application/pdf',
      TEXT_HTML = 'text/html',
      APPLICATION_XHTML_XML = 'application/xhtml+xml'
    }
  }

  /** Parameters for the `deleteDocument` operation. **/
  export interface DeleteDocumentParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The ID of the document. **/
    document_id: string;
  }

  /** Parameters for the `getDocumentStatus` operation. **/
  export interface GetDocumentStatusParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The ID of the document. **/
    document_id: string;
  }

  /** Parameters for the `updateDocument` operation. **/
  export interface UpdateDocumentParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The ID of the document. **/
    document_id: string;
    /** The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected. **/
    file?: ReadableStream | FileObject | Buffer;
    /** If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ``` **/
    metadata?: string;
    /** The content type of file. **/
    file_content_type?: UpdateDocumentConstants.FileContentType | string;
  }

  /** Constants for the `updateDocument` operation. **/
  export namespace UpdateDocumentConstants {
    /** The content type of file. **/
    export enum FileContentType {
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_PDF = 'application/pdf',
      TEXT_HTML = 'text/html',
      APPLICATION_XHTML_XML = 'application/xhtml+xml'
    }
  }

  /** Parameters for the `federatedQuery` operation. **/
  export interface FederatedQueryParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** A comma-separated list of collection IDs to be queried against. **/
    collection_ids: string[];
    /** A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set. **/
    filter?: string;
    /** A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time. **/
    query?: string;
    /** A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time. **/
    natural_language_query?: string;
    /** An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference. **/
    aggregation?: string;
    /** Number of documents to return. **/
    count?: number;
    /** A comma separated list of the portion of the document hierarchy to return. **/
    return_fields?: string[];
    /** The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results. **/
    offset?: number;
    /** A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified. **/
    sort?: string[];
    /** When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false. **/
    highlight?: boolean;
    /** When `true` and used with a Watson Discovery News collection, duplicate results (based on the contents of the `title` field) are removed. Duplicate comparison is limited to the current query only, `offset` is not considered. Defaults to `false`. This parameter is currently Beta functionality. **/
    deduplicate?: boolean;
    /** When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality. **/
    deduplicate_field?: string;
  }

  /** Parameters for the `federatedQueryNotices` operation. **/
  export interface FederatedQueryNoticesParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** A comma-separated list of collection IDs to be queried against. **/
    collection_ids: string[];
    /** A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set. **/
    filter?: string;
    /** A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time. **/
    query?: string;
    /** A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time. **/
    natural_language_query?: string;
    /** An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference. **/
    aggregation?: string;
    /** Number of documents to return. **/
    count?: number;
    /** A comma separated list of the portion of the document hierarchy to return. **/
    return_fields?: string[];
    /** The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results. **/
    offset?: number;
    /** A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified. **/
    sort?: string[];
    /** When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false. **/
    highlight?: boolean;
    /** When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality. **/
    deduplicate_field?: string;
  }

  /** Parameters for the `query` operation. **/
  export interface QueryParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set. **/
    filter?: string;
    /** A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time. **/
    query?: string;
    /** A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time. **/
    natural_language_query?: string;
    /** A passages query that returns the most relevant passages from the results. **/
    passages?: boolean;
    /** An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference. **/
    aggregation?: string;
    /** Number of documents to return. **/
    count?: number;
    /** A comma separated list of the portion of the document hierarchy to return_fields. **/
    return_fields?: string[];
    /** The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results. **/
    offset?: number;
    /** A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified. **/
    sort?: string[];
    /** When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false. **/
    highlight?: boolean;
    /** A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all top-level fields are included. **/
    passages_fields?: string[];
    /** The maximum number of passages to return. The search returns fewer passages if the requested total is not found. The default is `10`. The maximum is `100`. **/
    passages_count?: number;
    /** The approximate number of characters that any one passage will have. The default is `400`. The minimum is `50`. The maximum is `2000`. **/
    passages_characters?: number;
    /** When `true` and used with a Watson Discovery News collection, duplicate results (based on the contents of the `title` field) are removed. Duplicate comparison is limited to the current query only, `offset` is not considered. Defaults to `false`. This parameter is currently Beta functionality. **/
    deduplicate?: boolean;
    /** When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality. **/
    deduplicate_field?: string;
  }

  /** Parameters for the `queryEntities` operation. **/
  export interface QueryEntitiesParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The entity query feature to perform. Must be `disambiguate` **/
    feature?: string;
    /** A text string that appears within the entity text field. **/
    entity?: QueryEntitiesEntity;
    /** Entity text to provide context for the queried entity and rank based on that association. For example, if you wanted to query the city of London in England your query would look for `London` with the context of `England`. **/
    context?: QueryEntitiesContext;
    /** The number of results to return. The default is `10`. The maximum is `1000`. **/
    count?: number;
  }

  /** Parameters for the `queryNotices` operation. **/
  export interface QueryNoticesParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set. **/
    filter?: string;
    /** A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time. **/
    query?: string;
    /** A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time. **/
    natural_language_query?: string;
    /** A passages query that returns the most relevant passages from the results. **/
    passages?: boolean;
    /** An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference. **/
    aggregation?: string;
    /** Number of documents to return. **/
    count?: number;
    /** A comma separated list of the portion of the document hierarchy to return. **/
    return_fields?: string[];
    /** The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results. **/
    offset?: number;
    /** A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified. **/
    sort?: string[];
    /** When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false. **/
    highlight?: boolean;
    /** A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all top-level fields are included. **/
    passages_fields?: string[];
    /** The maximum number of passages to return. The search returns fewer passages if the requested total is not found. The default is `10`. The maximum is `100`. **/
    passages_count?: number;
    /** The approximate number of characters that any one passage will have. The default is `400`. The minimum is `50`. The maximum is `2000`. **/
    passages_characters?: number;
    /** When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality. **/
    deduplicate_field?: string;
  }

  /** Parameters for the `queryRelations` operation. **/
  export interface QueryRelationsParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** An array of entities to find relationships for. **/
    entities?: QueryRelationsEntity[];
    /** Entity text to provide context for the queried entity and rank based on that association. For example, if you wanted to query the city of London in England your query would look for `London` with the context of `England`. **/
    context?: QueryEntitiesContext;
    /** The sorting method for the relationships, can be `score` or `frequency`. `frequency` is the number of unique times each entity is identified. The default is `score` **/
    sort?: QueryRelationsConstants.Sort | string;
    /** Filters to apply to the relationship query **/
    filter?: QueryRelationsFilter;
    /** The number of results to return. The default is `10`. The maximum is `1000`. **/
    count?: number;
  }

  /** Constants for the `queryRelations` operation. **/
  export namespace QueryRelationsConstants {
    /** The sorting method for the relationships, can be `score` or `frequency`. `frequency` is the number of unique times each entity is identified. The default is `score` **/
    export enum Sort {
      SCORE = 'score',
      FREQUENCY = 'frequency'
    }
  }

  /** Parameters for the `addTrainingData` operation. **/
  export interface AddTrainingDataParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    natural_language_query?: string;
    filter?: string;
    examples?: TrainingExample[];
  }

  /** Parameters for the `createTrainingExample` operation. **/
  export interface CreateTrainingExampleParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The ID of the query used for training. **/
    query_id: string;
    document_id?: string;
    cross_reference?: string;
    relevance?: number;
  }

  /** Parameters for the `deleteAllTrainingData` operation. **/
  export interface DeleteAllTrainingDataParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
  }

  /** Parameters for the `deleteTrainingData` operation. **/
  export interface DeleteTrainingDataParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The ID of the query used for training. **/
    query_id: string;
  }

  /** Parameters for the `deleteTrainingExample` operation. **/
  export interface DeleteTrainingExampleParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The ID of the query used for training. **/
    query_id: string;
    /** The ID of the document as it is indexed. **/
    example_id: string;
  }

  /** Parameters for the `getTrainingData` operation. **/
  export interface GetTrainingDataParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The ID of the query used for training. **/
    query_id: string;
  }

  /** Parameters for the `getTrainingExample` operation. **/
  export interface GetTrainingExampleParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The ID of the query used for training. **/
    query_id: string;
    /** The ID of the document as it is indexed. **/
    example_id: string;
  }

  /** Parameters for the `listTrainingData` operation. **/
  export interface ListTrainingDataParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
  }

  /** Parameters for the `listTrainingExamples` operation. **/
  export interface ListTrainingExamplesParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The ID of the query used for training. **/
    query_id: string;
  }

  /** Parameters for the `updateTrainingExample` operation. **/
  export interface UpdateTrainingExampleParams {
    /** The ID of the environment. **/
    environment_id: string;
    /** The ID of the collection. **/
    collection_id: string;
    /** The ID of the query used for training. **/
    query_id: string;
    /** The ID of the document as it is indexed. **/
    example_id: string;
    cross_reference?: string;
    relevance?: number;
  }

  /*************************
   * model interfaces
   ************************/

  /** AggregationResult **/
  export interface AggregationResult {
    /** Key that matched the aggregation type. **/
    key?: string;
    /** Number of matching results. **/
    matching_results?: number;
    /** Aggregations returned in the case of chained aggregations. **/
    aggregations?: QueryAggregation[];
  }

  /** A collection for storing documents. **/
  export interface Collection {
    /** The unique identifier of the collection. **/
    collection_id?: string;
    /** The name of the collection. **/
    name?: string;
    /** The description of the collection. **/
    description?: string;
    /** The creation date of the collection in the format yyyy-MM-dd'T'HH:mmcon:ss.SSS'Z' **/
    created?: string;
    /** The timestamp of when the collection was last updated in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' **/
    updated?: string;
    /** The status of the collection. **/
    status?: string;
    /** The unique identifier of the collection's configuration. **/
    configuration_id?: string;
    /** The language of the documents stored in the collection. Permitted values include `en_us` (U.S. English), `de` (German), and `es` (Spanish). **/
    language?: string;
    /** The object providing information about the documents in the collection. Present only when retrieving details of a collection. **/
    document_counts?: DocumentCounts;
    /** The object providing information about the disk usage of the collection. Present only when retrieving details of a collection. **/
    disk_usage?: CollectionDiskUsage;
    /** Provides information about the status of relevance training for collection. **/
    training_status?: TrainingStatus;
  }

  /** Summary of the disk usage statistics for this collection. **/
  export interface CollectionDiskUsage {
    /** Number of bytes used by the collection. **/
    used_bytes?: number;
  }

  /** Summary of the collection usage in the environment **/
  export interface CollectionUsage {
    /** Number of active collections in the environment **/
    available?: number;
    /** Total number of collections allowed in the environment **/
    maximum_allowed?: number;
  }

  /** A custom configuration for the environment. **/
  export interface Configuration {
    /** The unique identifier of the configuration **/
    configuration_id?: string;
    /** The name of the configuration. **/
    name: string;
    /** The creation date of the configuration in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' **/
    created?: string;
    /** The timestamp of when the configuration was last updated in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' **/
    updated?: string;
    /** The description of the configuration, if available. **/
    description?: string;
    /** The document conversion settings for the configuration. **/
    conversions?: Conversions;
    /** An array of document enrichment settings for the configuration. **/
    enrichments?: Enrichment[];
    /** Defines operations that can be used to transform the final output JSON into a normalized form. Operations are executed in the order that they appear in the array. **/
    normalizations?: NormalizationOperation[];
  }

  /** Document conversion settings. **/
  export interface Conversions {
    /** A list of PDF conversion settings. **/
    pdf?: PdfSettings;
    /** A list of Word conversion settings. **/
    word?: WordSettings;
    /** A list of HTML conversion settings. **/
    html?: HtmlSettings;
    /** Defines operations that can be used to transform the final output JSON into a normalized form. Operations are executed in the order that they appear in the array. **/
    json_normalizations?: NormalizationOperation[];
  }

  /** DeleteCollectionResponse **/
  export interface DeleteCollectionResponse {
    /** The unique identifier of the collection that is being deleted. **/
    collection_id: string;
    /** The status of the collection. The status of a successful deletion operation is `deleted`. **/
    status: string;
  }

  /** DeleteConfigurationResponse **/
  export interface DeleteConfigurationResponse {
    /** The unique identifier for the configuration. **/
    configuration_id: string;
    /** Status of the configuration. A deleted configuration has the status deleted. **/
    status: string;
    /** An array of notice messages, if any. **/
    notices?: Notice[];
  }

  /** DeleteDocumentResponse **/
  export interface DeleteDocumentResponse {
    /** The unique identifier of the document. **/
    document_id?: string;
    /** Status of the document. A deleted document has the status deleted. **/
    status?: string;
  }

  /** DeleteEnvironmentResponse **/
  export interface DeleteEnvironmentResponse {
    /** The unique identifier for the environment. **/
    environment_id: string;
    /** Status of the environment. **/
    status: string;
  }

  /** Summary of the disk usage statistics for the environment. **/
  export interface DiskUsage {
    /** Number of bytes used on the environment's disk capacity. **/
    used_bytes?: number;
    /** Total number of bytes available in the environment's disk capacity. **/
    maximum_allowed_bytes?: number;
    /** **Deprecated**: Total number of bytes available in the environment's disk capacity. **/
    total_bytes?: number;
    /** **Deprecated**: Amount of disk capacity used, in KB or GB format. **/
    used?: string;
    /** **Deprecated**: Total amount of the environment's disk capacity, in KB or GB format. **/
    total?: string;
    /** **Deprecated**: Percentage of the environment's disk capacity that is being used. **/
    percent_used?: number;
  }

  /** DocumentAccepted **/
  export interface DocumentAccepted {
    /** The unique identifier of the ingested document. **/
    document_id?: string;
    /** Status of the document in the ingestion process. **/
    status?: string;
    /** Array of notices produced by the document-ingestion process. **/
    notices?: Notice[];
  }

  /** DocumentCounts **/
  export interface DocumentCounts {
    /** The total number of available documents in the collection. **/
    available?: number;
    /** The number of documents in the collection that are currently being processed. **/
    processing?: number;
    /** The number of documents in the collection that failed to be ingested. **/
    failed?: number;
  }

  /** DocumentSnapshot **/
  export interface DocumentSnapshot {
    step?: string;
    snapshot?: Object;
  }

  /** Status information about a submitted document. **/
  export interface DocumentStatus {
    /** The unique identifier of the document. **/
    document_id: string;
    /** The unique identifier for the configuration. **/
    configuration_id: string;
    /** The creation date of the document in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' **/
    created: string;
    /** Date of the most recent document update, in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' **/
    updated: string;
    /** Status of the document in the ingestion process. **/
    status: string;
    /** Description of the document status. **/
    status_description: string;
    /** Name of the original source file (if available). **/
    filename?: string;
    /** The type of the original source file. **/
    file_type?: string;
    /** The SHA-1 hash of the original source file (formatted as a hexadecimal string). **/
    sha1?: string;
    /** Array of notices produced by the document-ingestion process. **/
    notices: Notice[];
  }

  /** Enrichment **/
  export interface Enrichment {
    /** Describes what the enrichment step does. **/
    description?: string;
    /** Field where enrichments will be stored. This field must already exist or be at most 1 level deeper than an existing field. For example, if `text` is a top-level field with no sub-fields, `text.foo` is a valid destination but `text.foo.bar` is not. **/
    destination_field: string;
    /** Field to be enriched. **/
    source_field: string;
    /** Indicates that the enrichments will overwrite the destination_field field if it already exists. **/
    overwrite?: boolean;
    /** Name of the enrichment service to call. Currently the only valid value is `alchemy_language`. **/
    enrichment_name: string;
    /** If true, then most errors generated during the enrichment process will be treated as warnings and will not cause the document to fail processing. **/
    ignore_downstream_errors?: boolean;
    /** A list of options specific to the enrichment **/
    options?: EnrichmentOptions;
  }

  /** Details about an environment. **/
  export interface Environment {
    /** Unique identifier for the environment. **/
    environment_id?: string;
    /** Name that identifies the environment. **/
    name?: string;
    /** Description of the environment. **/
    description?: string;
    /** Creation date of the environment, in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' **/
    created?: string;
    /** Date of most recent environment update, in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' **/
    updated?: string;
    /** Status of the environment. **/
    status?: string;
    /** If true, then the environment contains read-only collections which are maintained by IBM. **/
    read_only?: boolean;
    /** **Deprecated**: Size of the environment. **/
    size?: number;
    /** Details about the resource usage and capacity of the environment. **/
    index_capacity?: IndexCapacity;
  }

  /** Summary of the document usage statistics for the environment. **/
  export interface EnvironmentDocuments {
    /** Number of documents indexed for the environment. **/
    indexed?: number;
    /** Total number of documents allowed in the environment's capacity. **/
    maximum_allowed?: number;
  }

  /** Field **/
  export interface Field {
    /** The name of the field. **/
    field_name?: string;
    /** The type of the field. **/
    field_type?: string;
  }

  /** FontSetting **/
  export interface FontSetting {
    level?: number;
    min_size?: number;
    max_size?: number;
    bold?: boolean;
    italic?: boolean;
    name?: string;
  }

  /** A list of HTML conversion settings. **/
  export interface HtmlSettings {
    exclude_tags_completely?: string[];
    exclude_tags_keep_content?: string[];
    keep_content?: XPathPatterns;
    exclude_content?: XPathPatterns;
    keep_tag_attributes?: string[];
    exclude_tag_attributes?: string[];
  }

  /** Details about the resource usage and capacity of the environment. **/
  export interface IndexCapacity {
    /** Summary of the document usage statistics for the environment **/
    documents?: EnvironmentDocuments;
    /** Summary of the disk usage of the environment. **/
    disk_usage?: DiskUsage;
    /** Summary of the collection usage in the environment **/
    collections?: CollectionUsage;
    /** **Deprecated**: Summary of the memory usage of the environment. **/
    memory_usage?: MemoryUsage;
  }

  /** The list of fetched fields.  The fields are returned using a fully qualified name format, however, the format differs slightly from that used by the query operations.    * Fields which contain nested JSON objects are assigned a type of "nested".    * Fields which belong to a nested object are prefixed with `.properties` (for example, `warnings.properties.severity` means that the `warnings` object has a property called `severity`).    * Fields returned from the News collection are prefixed with `v{N}-fullnews-t3-{YEAR}.mappings` (for example, `v5-fullnews-t3-2016.mappings.text.properties.author`). **/
  export interface ListCollectionFieldsResponse {
    /** An array containing information about each field in the collections. **/
    fields?: Field[];
  }

  /** ListCollectionsResponse **/
  export interface ListCollectionsResponse {
    /** An array containing information about each collection in the environment. **/
    collections?: Collection[];
  }

  /** ListConfigurationsResponse **/
  export interface ListConfigurationsResponse {
    /** An array of Configurations that are available for the service instance. **/
    configurations?: Configuration[];
  }

  /** ListEnvironmentsResponse **/
  export interface ListEnvironmentsResponse {
    /** An array of [environments] that are available for the service instance. **/
    environments?: Environment[];
  }

  /** **Deprecated**: Summary of the memory usage statistics for this environment. **/
  export interface MemoryUsage {
    /** **Deprecated**: Number of bytes used in the environment's memory capacity. **/
    used_bytes?: number;
    /** **Deprecated**: Total number of bytes available in the environment's memory capacity. **/
    total_bytes?: number;
    /** **Deprecated**: Amount of memory capacity used, in KB or GB format. **/
    used?: string;
    /** **Deprecated**: Total amount of the environment's memory capacity, in KB or GB format. **/
    total?: string;
    /** **Deprecated**: Percentage of the environment's memory capacity that is being used. **/
    percent_used?: number;
  }

  /** NormalizationOperation **/
  export interface NormalizationOperation {
    /** Identifies what type of operation to perform.   **copy** - Copies the value of the `source_field` to the `destination_field` field. If the `destination_field` already exists, then the value of the `source_field` overwrites the original value of the `destination_field`.   **move** - Renames (moves) the `source_field` to the `destination_field`. If the `destination_field` already exists, then the value of the `source_field` overwrites the original value of the `destination_field`. Rename is identical to copy, except that the `source_field` is removed after the value has been copied to the `destination_field` (it is the same as a _copy_ followed by a _remove_).   **merge** - Merges the value of the `source_field` with the value of the `destination_field`. The `destination_field` is converted into an array if it is not already an array, and the value of the `source_field` is appended to the array. This operation removes the `source_field` after the merge. If the `source_field` does not exist in the current document, then the `destination_field` is still converted into an array (if it is not an array already). This is ensures the type for `destination_field` is consistent across all documents.   **remove** - Deletes the `source_field` field. The `destination_field` is ignored for this operation.   **remove_nulls** - Removes all nested null (blank) leif values from the JSON tree. `source_field` and `destination_field` are ignored by this operation because _remove_nulls_ operates on the entire JSON tree. Typically, `remove_nulls` is invoked as the last normalization operation (if it is inoked at all, it can be time-expensive). **/
    operation?: string;
    /** The source field for the operation. **/
    source_field?: string;
    /** The destination field for the operation. **/
    destination_field?: string;
  }

  /** A notice produced for the collection. **/
  export interface Notice {
    /** Identifies the notice. Many notices might have the same ID. This field exists so that user applications can programmatically identify a notice and take automatic corrective action. **/
    notice_id?: string;
    /** The creation date of the collection in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' **/
    created?: string;
    /** Unique identifier of the document. **/
    document_id?: string;
    /** Unique identifier of the query used for relevance training. **/
    query_id?: string;
    /** Severity level of the notice. **/
    severity?: string;
    /** Ingestion or training step in which the notice occurred. **/
    step?: string;
    /** The description of the notice. **/
    description?: string;
  }

  /** PdfHeadingDetection **/
  export interface PdfHeadingDetection {
    fonts?: FontSetting[];
  }

  /** A list of PDF conversion settings. **/
  export interface PdfSettings {
    heading?: PdfHeadingDetection;
  }

  /** An aggregation produced by the Discovery service to analyze the input provided. **/
  export interface QueryAggregation {
    /** The type of aggregation command used. For example: term, filter, max, min, etc. **/
    type?: string;
    /** The field where the aggregation is located in the document. **/
    field?: string;
    results?: AggregationResult[];
    /** The match the aggregated results queried for. **/
    match?: string;
    /** Number of matching results. **/
    matching_results?: number;
    /** Aggregations returned by the Discovery service. **/
    aggregations?: QueryAggregation[];
  }

  /** Entity text to provide context for the queried entity and rank based on that association. For example, if you wanted to query the city of London in England your query would look for `London` with the context of `England`. **/
  export interface QueryEntitiesContext {
    /** Entity text to provide context for the queried entity and rank based on that association. For example, if you wanted to query the city of London in England your query would look for `London` with the context of `England`. **/
    text?: string;
  }

  /** A text string that appears within the entity text field. **/
  export interface QueryEntitiesEntity {
    /** Entity text content. **/
    text?: string;
    /** The type of the specified entity. **/
    type?: string;
  }

  /** An array of entities resulting from the query. **/
  export interface QueryEntitiesResponse {
    entities?: QueryEntitiesEntity[];
  }

  /** QueryFilterType **/
  export interface QueryFilterType {
    /** A comma-separated list of types to exclude. **/
    exclude?: string[];
    /** A comma-separated list of types to include. All other types are excluded. **/
    include?: string[];
  }

  /** QueryNoticesResponse **/
  export interface QueryNoticesResponse {
    matching_results?: number;
    results?: QueryNoticesResult[];
    aggregations?: QueryAggregation[];
    passages?: QueryPassages[];
    duplicates_removed?: number;
  }

  /** QueryPassages **/
  export interface QueryPassages {
    /** The unique identifier of the document from which the passage has been extracted. **/
    document_id?: string;
    /** The confidence score of the passages's analysis. A higher score indicates greater confidence. **/
    passage_score?: number;
    /** The content of the extracted passage. **/
    passage_text?: string;
    /** The position of the first character of the extracted passage in the originating field. **/
    start_offset?: number;
    /** The position of the last character of the extracted passage in the originating field. **/
    end_offset?: number;
    /** The label of the field from which the passage has been extracted. **/
    field?: string;
  }

  /** QueryRelationsArgument **/
  export interface QueryRelationsArgument {
    entities?: QueryEntitiesEntity[];
  }

  /** QueryRelationsEntity **/
  export interface QueryRelationsEntity {
    /** Entity text content. **/
    text?: string;
    /** The type of the specified entity. **/
    type?: string;
    /** If false, implicit disambiguation is performed. The default is `false`. **/
    exact?: boolean;
  }

  /** QueryRelationsFilter **/
  export interface QueryRelationsFilter {
    /** A list of relation types to include or exclude from the query. **/
    relation_types?: QueryFilterType;
    /** A list of entity types to include or exclude from the query. **/
    entity_types?: QueryFilterType;
    /** A comma-separated list of document IDs to include in the query **/
    document_ids?: string[];
  }

  /** QueryRelationsRelationship **/
  export interface QueryRelationsRelationship {
    /** The identified relationship type **/
    type?: string;
    /** The number of times the relationship is mentioned. **/
    frequency?: number;
    /** Information about the relationship **/
    arguments?: QueryRelationsArgument[];
  }

  /** QueryRelationsResponse **/
  export interface QueryRelationsResponse {
    relations?: QueryRelationsRelationship[];
  }

  /** A response containing the documents and aggregations for the query. **/
  export interface QueryResponse {
    matching_results?: number;
    results?: QueryResult[];
    aggregations?: QueryAggregation[];
    passages?: QueryPassages[];
    duplicates_removed?: number;
  }

  /** QueryResult **/
  export interface QueryResult {
    /** The unique identifier of the document. **/
    id?: string;
    /** *Deprecated* This field is now part of the `result_metadata` object. **/
    score?: number;
    /** Metadata of the document. **/
    metadata?: Object;
    /** The collection ID of the collection containing the document for this result. **/
    collection_id?: string;
    result_metadata?: QueryResultResultMetadata;
  }

  /** QueryResultResultMetadata **/
  export interface QueryResultResultMetadata {
    /** The confidence score of the result's analysis. A higher score indicating greater confidence. **/
    score?: number;
  }

  /** TestDocument **/
  export interface TestDocument {
    /** The unique identifier for the configuration. **/
    configuration_id?: string;
    /** Status of the preview operation. **/
    status?: string;
    /** The number of 10-kB chunks of field data that were enriched. This can be used to estimate the cost of running a real ingestion. **/
    enriched_field_units?: number;
    /** Format of the test document. **/
    original_media_type?: string;
    /** An array of objects that describe each step in the preview process. **/
    snapshots?: DocumentSnapshot[];
    /** An array of notice messages about the preview operation. **/
    notices?: Notice[];
  }

  /** TrainingDataSet **/
  export interface TrainingDataSet {
    environment_id?: string;
    collection_id?: string;
    queries?: TrainingQuery[];
  }

  /** TrainingExample **/
  export interface TrainingExample {
    document_id?: string;
    cross_reference?: string;
    relevance?: number;
  }

  /** TrainingExampleList **/
  export interface TrainingExampleList {
    examples?: TrainingExample[];
  }

  /** TrainingQuery **/
  export interface TrainingQuery {
    query_id?: string;
    natural_language_query?: string;
    filter?: string;
    examples?: TrainingExample[];
  }

  /** TrainingStatus **/
  export interface TrainingStatus {
    total_examples?: number;
    available?: boolean;
    processing?: boolean;
    minimum_queries_added?: boolean;
    minimum_examples_added?: boolean;
    sufficient_label_diversity?: boolean;
    notices?: number;
    successfully_trained?: string;
    data_updated?: string;
  }

  /** WordHeadingDetection **/
  export interface WordHeadingDetection {
    fonts?: FontSetting[];
    styles?: WordStyle[];
  }

  /** A list of Word conversion settings. **/
  export interface WordSettings {
    heading?: WordHeadingDetection;
  }

  /** WordStyle **/
  export interface WordStyle {
    level?: number;
    names?: string[];
  }

  /** XPathPatterns **/
  export interface XPathPatterns {
    xpaths?: string[];
  }

  /** Options which are specific to a particular enrichment. **/
  export interface EnrichmentOptions {
    /** A comma-separated list of analyses that will be applied when using the `alchemy_language` enrichment. See the service documentation for details on each extract option.  Possible values include:    * entity   * keyword   * taxonomy   * concept   * relation   * doc-sentiment   * doc-emotion   * typed-rels **/
    extract?: string[];
    sentiment?: boolean;
    quotations?: boolean;
    show_source_text?: boolean;
    hierarchical_typed_relations?: boolean;
    /** Required when using the `typed-rel` extract option. Should be set to the ID of a previously published custom Watson Knowledge Studio model. **/
    model?: string;
    /** If provided, then do not attempt to detect the language of the input document. Instead, assume the language is the one specified in this field.  You can set this property to work around `unsupported-text-language` errors.  Supported languages include English, German, French, Italian, Portuguese, Russian, Spanish and Swedish. Supported language codes are the ISO-639-1, ISO-639-2, ISO-639-3, and the plain english name of the language (for example "russian"). **/
    language?: string;
  }

  /** QueryNoticesResult **/
  export interface QueryNoticesResult {
    /** The unique identifier of the document. **/
    id?: string;
    /** *Deprecated* This field is now part of the `result_metadata` object. **/
    score?: number;
    /** Metadata of the document. **/
    metadata?: Object;
    /** The collection ID of the collection containing the document for this result. **/
    collection_id?: string;
    result_metadata?: QueryResultResultMetadata;
  }
}

export = DiscoveryV1;
