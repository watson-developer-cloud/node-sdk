/**
 * (C) Copyright IBM Corp. 2017, 2020.
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
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * IBM Watson&trade; Discovery is a cognitive search and content analytics engine that you can add to applications to
 * identify patterns, trends and actionable insights to drive better decision-making. Securely unify structured and
 * unstructured data with pre-enriched content, and use a simplified query language to eliminate the need for manual
 * filtering of results.
 */

class DiscoveryV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.discovery.watson.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'discovery';

  /**
   * Construct a DiscoveryV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.version - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever
   * the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses
   * the API version for the date you specify, or the most recent version before that date. Note that you should not
   * programmatically specify the current date at runtime, in case the API has been updated since your application's
   * release. Instead, specify a version date that is compatible with your application, and don't change it until your
   * application is ready for a later version.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {DiscoveryV1}
   * @throws {Error}
   */
  constructor(options: UserOptions) {
    if (!options.serviceName) {
      options.serviceName = DiscoveryV1.DEFAULT_SERVICE_NAME;
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
    // check if 'version' was provided
    if (typeof this.baseOptions.version === 'undefined') {
      throw new Error('Argument error: version was not specified');
    }
    this.baseOptions.qs.version = options.version;
  }

  /*************************
   * environments
   ************************/

  /**
   * Create an environment.
   *
   * Creates a new environment for private data. An environment must be created before collections can be created.
   *
   * **Note**: You can create only one environment for private data per service instance. An attempt to create another
   * environment results in an error.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Name that identifies the environment.
   * @param {string} [params.description] - Description of the environment.
   * @param {string} [params.size] - Size of the environment. In the Lite plan the default and only accepted value is
   * `LT`, in all other plans the default is `S`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Environment>>}
   */
  public createEnvironment(params: DiscoveryV1.CreateEnvironmentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Environment>): Promise<DiscoveryV1.Response<DiscoveryV1.Environment>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['name'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'description': _params.description,
        'size': _params.size
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'createEnvironment');

      const parameters = {
        options: {
          url: '/v1/environments',
          method: 'POST',
          body,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * List environments.
   *
   * List existing environments for the service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - Show only the environment with the given name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.ListEnvironmentsResponse>>}
   */
  public listEnvironments(params?: DiscoveryV1.ListEnvironmentsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.ListEnvironmentsResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.ListEnvironmentsResponse>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const query = {
        'name': _params.name
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'listEnvironments');

      const parameters = {
        options: {
          url: '/v1/environments',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get environment info.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Environment>>}
   */
  public getEnvironment(params: DiscoveryV1.GetEnvironmentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Environment>): Promise<DiscoveryV1.Response<DiscoveryV1.Environment>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getEnvironment');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Update an environment.
   *
   * Updates an environment. The environment's **name** and  **description** parameters can be changed. You must specify
   * a **name** for the environment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} [params.name] - Name that identifies the environment.
   * @param {string} [params.description] - Description of the environment.
   * @param {string} [params.size] - Size that the environment should be increased to. Environment size cannot be
   * modified when using a Lite plan. Environment size can only increased and not decreased.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Environment>>}
   */
  public updateEnvironment(params: DiscoveryV1.UpdateEnvironmentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Environment>): Promise<DiscoveryV1.Response<DiscoveryV1.Environment>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'description': _params.description,
        'size': _params.size
      };

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'updateEnvironment');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}',
          method: 'PUT',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete environment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.DeleteEnvironmentResponse>>}
   */
  public deleteEnvironment(params: DiscoveryV1.DeleteEnvironmentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteEnvironmentResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.DeleteEnvironmentResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteEnvironment');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * List fields across collections.
   *
   * Gets a list of the unique fields (and their types) stored in the indexes of the specified collections.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string[]} params.collectionIds - A comma-separated list of collection IDs to be queried against.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.ListCollectionFieldsResponse>>}
   */
  public listFields(params: DiscoveryV1.ListFieldsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.ListCollectionFieldsResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.ListCollectionFieldsResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionIds'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
        'collection_ids': _params.collectionIds
      };

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'listFields');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/fields',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * configurations
   ************************/

  /**
   * Add configuration.
   *
   * Creates a new configuration.
   *
   * If the input configuration contains the **configuration_id**, **created**, or **updated** properties, then they are
   * ignored and overridden by the system, and an error is not returned so that the overridden fields do not need to be
   * removed when copying a configuration.
   *
   * The configuration can contain unrecognized JSON fields. Any such fields are ignored and do not generate an error.
   * This makes it easier to use newer configuration files with older versions of the API and the service. It also makes
   * it possible for the tooling to add additional metadata and information to the configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.name - The name of the configuration.
   * @param {string} [params.description] - The description of the configuration, if available.
   * @param {Conversions} [params.conversions] - Document conversion settings.
   * @param {Enrichment[]} [params.enrichments] - An array of document enrichment settings for the configuration.
   * @param {NormalizationOperation[]} [params.normalizations] - Defines operations that can be used to transform the
   * final output JSON into a normalized form. Operations are executed in the order that they appear in the array.
   * @param {Source} [params.source] - Object containing source parameters for the configuration.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Configuration>>}
   */
  public createConfiguration(params: DiscoveryV1.CreateConfigurationParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Configuration>): Promise<DiscoveryV1.Response<DiscoveryV1.Configuration>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'name'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'description': _params.description,
        'conversions': _params.conversions,
        'enrichments': _params.enrichments,
        'normalizations': _params.normalizations,
        'source': _params.source
      };

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'createConfiguration');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/configurations',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * List configurations.
   *
   * Lists existing configurations for the service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} [params.name] - Find configurations with the given name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.ListConfigurationsResponse>>}
   */
  public listConfigurations(params: DiscoveryV1.ListConfigurationsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.ListConfigurationsResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.ListConfigurationsResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
        'name': _params.name
      };

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'listConfigurations');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/configurations',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get configuration details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.configurationId - The ID of the configuration.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Configuration>>}
   */
  public getConfiguration(params: DiscoveryV1.GetConfigurationParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Configuration>): Promise<DiscoveryV1.Response<DiscoveryV1.Configuration>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'configurationId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'configuration_id': _params.configurationId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getConfiguration');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/configurations/{configuration_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Update a configuration.
   *
   * Replaces an existing configuration.
   *   * Completely replaces the original configuration.
   *   * The **configuration_id**, **updated**, and **created** fields are accepted in the request, but they are
   * ignored, and an error is not generated. It is also acceptable for users to submit an updated configuration with
   * none of the three properties.
   *   * Documents are processed with a snapshot of the configuration as it was at the time the document was submitted
   * to be ingested. This means that already submitted documents will not see any updates made to the configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.configurationId - The ID of the configuration.
   * @param {string} params.name - The name of the configuration.
   * @param {string} [params.description] - The description of the configuration, if available.
   * @param {Conversions} [params.conversions] - Document conversion settings.
   * @param {Enrichment[]} [params.enrichments] - An array of document enrichment settings for the configuration.
   * @param {NormalizationOperation[]} [params.normalizations] - Defines operations that can be used to transform the
   * final output JSON into a normalized form. Operations are executed in the order that they appear in the array.
   * @param {Source} [params.source] - Object containing source parameters for the configuration.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Configuration>>}
   */
  public updateConfiguration(params: DiscoveryV1.UpdateConfigurationParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Configuration>): Promise<DiscoveryV1.Response<DiscoveryV1.Configuration>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'configurationId', 'name'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'description': _params.description,
        'conversions': _params.conversions,
        'enrichments': _params.enrichments,
        'normalizations': _params.normalizations,
        'source': _params.source
      };

      const path = {
        'environment_id': _params.environmentId,
        'configuration_id': _params.configurationId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'updateConfiguration');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/configurations/{configuration_id}',
          method: 'PUT',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete a configuration.
   *
   * The deletion is performed unconditionally. A configuration deletion request succeeds even if the configuration is
   * referenced by a collection or document ingestion. However, documents that have already been submitted for
   * processing continue to use the deleted configuration. Documents are always processed with a snapshot of the
   * configuration as it existed at the time the document was submitted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.configurationId - The ID of the configuration.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.DeleteConfigurationResponse>>}
   */
  public deleteConfiguration(params: DiscoveryV1.DeleteConfigurationParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteConfigurationResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.DeleteConfigurationResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'configurationId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'configuration_id': _params.configurationId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteConfiguration');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/configurations/{configuration_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * collections
   ************************/

  /**
   * Create a collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.name - The name of the collection to be created.
   * @param {string} [params.description] - A description of the collection.
   * @param {string} [params.configurationId] - The ID of the configuration in which the collection is to be created.
   * @param {string} [params.language] - The language of the documents stored in the collection, in the form of an ISO
   * 639-1 language code.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Collection>>}
   */
  public createCollection(params: DiscoveryV1.CreateCollectionParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Collection>): Promise<DiscoveryV1.Response<DiscoveryV1.Collection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'name'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'description': _params.description,
        'configuration_id': _params.configurationId,
        'language': _params.language
      };

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'createCollection');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * List collections.
   *
   * Lists existing collections for the service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} [params.name] - Find collections with the given name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.ListCollectionsResponse>>}
   */
  public listCollections(params: DiscoveryV1.ListCollectionsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.ListCollectionsResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.ListCollectionsResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
        'name': _params.name
      };

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'listCollections');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get collection details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Collection>>}
   */
  public getCollection(params: DiscoveryV1.GetCollectionParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Collection>): Promise<DiscoveryV1.Response<DiscoveryV1.Collection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getCollection');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Update a collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.name - The name of the collection.
   * @param {string} [params.description] - A description of the collection.
   * @param {string} [params.configurationId] - The ID of the configuration in which the collection is to be updated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Collection>>}
   */
  public updateCollection(params: DiscoveryV1.UpdateCollectionParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Collection>): Promise<DiscoveryV1.Response<DiscoveryV1.Collection>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'name'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'name': _params.name,
        'description': _params.description,
        'configuration_id': _params.configurationId
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'updateCollection');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}',
          method: 'PUT',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete a collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.DeleteCollectionResponse>>}
   */
  public deleteCollection(params: DiscoveryV1.DeleteCollectionParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteCollectionResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.DeleteCollectionResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCollection');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * List collection fields.
   *
   * Gets a list of the unique fields (and their types) stored in the index.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.ListCollectionFieldsResponse>>}
   */
  public listCollectionFields(params: DiscoveryV1.ListCollectionFieldsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.ListCollectionFieldsResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.ListCollectionFieldsResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'listCollectionFields');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/fields',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * queryModifications
   ************************/

  /**
   * Get the expansion list.
   *
   * Returns the current expansion list for the specified collection. If an expansion list is not specified, an object
   * with empty expansion arrays is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Expansions>>}
   */
  public listExpansions(params: DiscoveryV1.ListExpansionsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Expansions>): Promise<DiscoveryV1.Response<DiscoveryV1.Expansions>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'listExpansions');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/expansions',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Create or update expansion list.
   *
   * Create or replace the Expansion list for this collection. The maximum number of expanded terms per collection is
   * `500`. The current expansion list is replaced with the uploaded content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {Expansion[]} params.expansions - An array of query expansion definitions.
   *
   *  Each object in the **expansions** array represents a term or set of terms that will be expanded into other terms.
   * Each expansion object can be configured as bidirectional or unidirectional. Bidirectional means that all terms are
   * expanded to all other terms in the object. Unidirectional means that a set list of terms can be expanded into a
   * second list of terms.
   *
   *  To create a bi-directional expansion specify an **expanded_terms** array. When found in a query, all items in the
   * **expanded_terms** array are then expanded to the other items in the same array.
   *
   *  To create a uni-directional expansion, specify both an array of **input_terms** and an array of
   * **expanded_terms**. When items in the **input_terms** array are present in a query, they are expanded using the
   * items listed in the **expanded_terms** array.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Expansions>>}
   */
  public createExpansions(params: DiscoveryV1.CreateExpansionsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Expansions>): Promise<DiscoveryV1.Response<DiscoveryV1.Expansions>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'expansions'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'expansions': _params.expansions
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'createExpansions');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/expansions',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete the expansion list.
   *
   * Remove the expansion information for this collection. The expansion list must be deleted to disable query expansion
   * for a collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Empty>>}
   */
  public deleteExpansions(params: DiscoveryV1.DeleteExpansionsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>): Promise<DiscoveryV1.Response<DiscoveryV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteExpansions');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/expansions',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get tokenization dictionary status.
   *
   * Returns the current status of the tokenization dictionary for the specified collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TokenDictStatusResponse>>}
   */
  public getTokenizationDictionaryStatus(params: DiscoveryV1.GetTokenizationDictionaryStatusParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TokenDictStatusResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.TokenDictStatusResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getTokenizationDictionaryStatus');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Create tokenization dictionary.
   *
   * Upload a custom tokenization dictionary to use with the specified collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {TokenDictRule[]} [params.tokenizationRules] - An array of tokenization rules. Each rule contains, the
   * original `text` string, component `tokens`, any alternate character set `readings`, and which `part_of_speech` the
   * text is from.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TokenDictStatusResponse>>}
   */
  public createTokenizationDictionary(params: DiscoveryV1.CreateTokenizationDictionaryParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TokenDictStatusResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.TokenDictStatusResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'tokenization_rules': _params.tokenizationRules
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'createTokenizationDictionary');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete tokenization dictionary.
   *
   * Delete the tokenization dictionary from the collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Empty>>}
   */
  public deleteTokenizationDictionary(params: DiscoveryV1.DeleteTokenizationDictionaryParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>): Promise<DiscoveryV1.Response<DiscoveryV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTokenizationDictionary');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get stopword list status.
   *
   * Returns the current status of the stopword list for the specified collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TokenDictStatusResponse>>}
   */
  public getStopwordListStatus(params: DiscoveryV1.GetStopwordListStatusParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TokenDictStatusResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.TokenDictStatusResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getStopwordListStatus');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Create stopword list.
   *
   * Upload a custom stopword list to use with the specified collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {NodeJS.ReadableStream|Buffer} params.stopwordFile - The content of the stopword list to ingest.
   * @param {string} params.stopwordFilename - The filename for stopwordFile.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TokenDictStatusResponse>>}
   */
  public createStopwordList(params: DiscoveryV1.CreateStopwordListParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TokenDictStatusResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.TokenDictStatusResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'stopwordFile', 'stopwordFilename'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const formData = {
        'stopword_file': {
          data: _params.stopwordFile,
          filename: _params.stopwordFilename,
          contentType: 'application/octet-stream'
        }
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'createStopwordList');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords',
          method: 'POST',
          path,
          formData
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete a custom stopword list.
   *
   * Delete a custom stopword list from the collection. After a custom stopword list is deleted, the default list is
   * used for the collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Empty>>}
   */
  public deleteStopwordList(params: DiscoveryV1.DeleteStopwordListParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>): Promise<DiscoveryV1.Response<DiscoveryV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteStopwordList');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * documents
   ************************/

  /**
   * Add a document.
   *
   * Add a document to a collection with optional metadata.
   *
   *   * The **version** query parameter is still required.
   *
   *   * Returns immediately after the system has accepted the document for processing.
   *
   *   * The user must provide document content, metadata, or both. If the request is missing both document content and
   * metadata, it is rejected.
   *
   *   * The user can set the **Content-Type** parameter on the **file** part to indicate the media type of the
   * document. If the **Content-Type** parameter is missing or is one of the generic media types (for example,
   * `application/octet-stream`), then the service attempts to automatically detect the document's media type.
   *
   *   * The following field names are reserved and will be filtered out if present after normalization: `id`, `score`,
   * `highlight`, and any field with the prefix of: `_`, `+`, or `-`
   *
   *   * Fields with empty name values after normalization are filtered out before indexing.
   *
   *   * Fields containing the following characters after normalization are filtered out before indexing: `#` and `,`
   *
   *  **Note:** Documents can be added with a specific **document_id** by using the
   * **_/v1/environments/{environment_id}/collections/{collection_id}/documents** method.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {NodeJS.ReadableStream|Buffer} [params.file] - The content of the document to ingest. The maximum supported
   * file size when adding a file to a collection is 50 megabytes, the maximum supported file size when testing a
   * configuration is 1 megabyte. Files larger than the supported size are rejected.
   * @param {string} [params.filename] - The filename for file.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.metadata] - The maximum supported metadata file size is 1 MB. Metadata parts larger than 1
   * MB are rejected. Example:  ``` {
   *   "Creator": "Johnny Appleseed",
   *   "Subject": "Apples"
   * } ```.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.DocumentAccepted>>}
   */
  public addDocument(params: DiscoveryV1.AddDocumentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DocumentAccepted>): Promise<DiscoveryV1.Response<DiscoveryV1.DocumentAccepted>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const formData = {
        'file': {
          data: _params.file,
          filename: _params.filename,
          contentType: _params.fileContentType
        },
        'metadata': _params.metadata
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'addDocument');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/documents',
          method: 'POST',
          path,
          formData
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get document details.
   *
   * Fetch status details about a submitted document. **Note:** this operation does not return the document itself.
   * Instead, it returns only the document's processing status and any notices (warnings or errors) that were generated
   * when the document was ingested. Use the query API to retrieve the actual document content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.documentId - The ID of the document.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.DocumentStatus>>}
   */
  public getDocumentStatus(params: DiscoveryV1.GetDocumentStatusParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DocumentStatus>): Promise<DiscoveryV1.Response<DiscoveryV1.DocumentStatus>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'documentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId,
        'document_id': _params.documentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getDocumentStatus');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Update a document.
   *
   * Replace an existing document or add a document with a specified **document_id**. Starts ingesting a document with
   * optional metadata.
   *
   * **Note:** When uploading a new document with this method it automatically replaces any document stored with the
   * same **document_id** if it exists.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.documentId - The ID of the document.
   * @param {NodeJS.ReadableStream|Buffer} [params.file] - The content of the document to ingest. The maximum supported
   * file size when adding a file to a collection is 50 megabytes, the maximum supported file size when testing a
   * configuration is 1 megabyte. Files larger than the supported size are rejected.
   * @param {string} [params.filename] - The filename for file.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.metadata] - The maximum supported metadata file size is 1 MB. Metadata parts larger than 1
   * MB are rejected. Example:  ``` {
   *   "Creator": "Johnny Appleseed",
   *   "Subject": "Apples"
   * } ```.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.DocumentAccepted>>}
   */
  public updateDocument(params: DiscoveryV1.UpdateDocumentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DocumentAccepted>): Promise<DiscoveryV1.Response<DiscoveryV1.DocumentAccepted>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'documentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const formData = {
        'file': {
          data: _params.file,
          filename: _params.filename,
          contentType: _params.fileContentType
        },
        'metadata': _params.metadata
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId,
        'document_id': _params.documentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'updateDocument');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
          method: 'POST',
          path,
          formData
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete a document.
   *
   * If the given document ID is invalid, or if the document is not found, then the a success response is returned (HTTP
   * status code `200`) with the status set to 'deleted'.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.documentId - The ID of the document.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.DeleteDocumentResponse>>}
   */
  public deleteDocument(params: DiscoveryV1.DeleteDocumentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteDocumentResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.DeleteDocumentResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'documentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId,
        'document_id': _params.documentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteDocument');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * queries
   ************************/

  /**
   * Query a collection.
   *
   * By using this method, you can construct long queries. For details, see the [Discovery
   * documentation](https://cloud.ibm.com/docs/discovery?topic=discovery-query-concepts#query-concepts).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} [params.filter] - A cacheable query that excludes documents that don't mention the query content.
   * Filter searches are better for metadata-type searches and for assessing the concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and
   * full text, but with the most relevant documents listed first. Use a query search when you want to find the most
   * relevant search results.
   * @param {string} [params.naturalLanguageQuery] - A natural language query that returns relevant documents by
   * utilizing training data and natural language understanding.
   * @param {boolean} [params.passages] - A passages query that returns the most relevant passages from the results.
   * @param {string} [params.aggregation] - An aggregation search that returns an exact answer by combining query search
   * with filters. Useful for applications to build lists, tables, and time series. For a full list of possible
   * aggregations, see the Query reference.
   * @param {number} [params.count] - Number of results to return.
   * @param {string} [params._return] - A comma-separated list of the portion of the document hierarchy to return.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total
   * number of results that are returned is 10 and the offset is 8, it returns the last two results.
   * @param {string} [params.sort] - A comma-separated list of fields in the document to sort on. You can optionally
   * specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the
   * default sort direction if no prefix is specified. This parameter cannot be used in the same query as the **bias**
   * parameter.
   * @param {boolean} [params.highlight] - When true, a highlight field is returned for each result which contains the
   * fields which match the query with `<em></em>` tags around the matching query terms.
   * @param {string} [params.passagesFields] - A comma-separated list of fields that passages are drawn from. If this
   * parameter not specified, then all top-level fields are included.
   * @param {number} [params.passagesCount] - The maximum number of passages to return. The search returns fewer
   * passages if the requested total is not found. The default is `10`. The maximum is `100`.
   * @param {number} [params.passagesCharacters] - The approximate number of characters that any one passage will have.
   * @param {boolean} [params.deduplicate] - When `true`, and used with a Watson Discovery News collection, duplicate
   * results (based on the contents of the **title** field) are removed. Duplicate comparison is limited to the current
   * query only; **offset** is not considered. This parameter is currently Beta functionality.
   * @param {string} [params.deduplicateField] - When specified, duplicate results based on the field specified are
   * removed from the returned results. Duplicate comparison is limited to the current query only, **offset** is not
   * considered. This parameter is currently Beta functionality.
   * @param {boolean} [params.similar] - When `true`, results are returned based on their similarity to the document IDs
   * specified in the **similar.document_ids** parameter.
   * @param {string} [params.similarDocumentIds] - A comma-separated list of document IDs to find similar documents.
   *
   * **Tip:** Include the **natural_language_query** parameter to expand the scope of the document similarity search
   * with the natural language query. Other query parameters, such as **filter** and **query**, are subsequently applied
   * and reduce the scope.
   * @param {string} [params.similarFields] - A comma-separated list of field names that are used as a basis for
   * comparison to identify similar documents. If not specified, the entire document is used for comparison.
   * @param {string} [params.bias] - Field which the returned results will be biased against. The specified field must
   * be either a **date** or **number** format. When a **date** type field is specified returned results are biased
   * towards field values closer to the current date. When a **number** type field is specified, returned results are
   * biased towards higher field values. This parameter cannot be used in the same query as the **sort** parameter.
   * @param {boolean} [params.spellingSuggestions] - When `true` and the **natural_language_query** parameter is used,
   * the **natural_languge_query** parameter is spell checked. The most likely correction is retunred in the
   * **suggested_query** field of the response (if one exists).
   *
   * **Important:** this parameter is only valid when using the Cloud Pak version of Discovery.
   * @param {boolean} [params.xWatsonLoggingOptOut] - If `true`, queries are not stored in the Discovery **Logs**
   * endpoint.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.QueryResponse>>}
   */
  public query(params: DiscoveryV1.QueryParams, callback?: DiscoveryV1.Callback<DiscoveryV1.QueryResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.QueryResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'filter': _params.filter,
        'query': _params.query,
        'natural_language_query': _params.naturalLanguageQuery,
        'passages': _params.passages,
        'aggregation': _params.aggregation,
        'count': _params.count,
        'return': _params._return,
        'offset': _params.offset,
        'sort': _params.sort,
        'highlight': _params.highlight,
        'passages.fields': _params.passagesFields,
        'passages.count': _params.passagesCount,
        'passages.characters': _params.passagesCharacters,
        'deduplicate': _params.deduplicate,
        'deduplicate.field': _params.deduplicateField,
        'similar': _params.similar,
        'similar.document_ids': _params.similarDocumentIds,
        'similar.fields': _params.similarFields,
        'bias': _params.bias,
        'spelling_suggestions': _params.spellingSuggestions
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'query');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/query',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Watson-Logging-Opt-Out': _params.xWatsonLoggingOptOut
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Query system notices.
   *
   * Queries for notices (errors or warnings) that might have been generated by the system. Notices are generated when
   * ingesting documents and performing relevance training. See the [Discovery
   * documentation](https://cloud.ibm.com/docs/discovery?topic=discovery-query-concepts#query-concepts) for more details
   * on the query language.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} [params.filter] - A cacheable query that excludes documents that don't mention the query content.
   * Filter searches are better for metadata-type searches and for assessing the concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and
   * full text, but with the most relevant documents listed first.
   * @param {string} [params.naturalLanguageQuery] - A natural language query that returns relevant documents by
   * utilizing training data and natural language understanding.
   * @param {boolean} [params.passages] - A passages query that returns the most relevant passages from the results.
   * @param {string} [params.aggregation] - An aggregation search that returns an exact answer by combining query search
   * with filters. Useful for applications to build lists, tables, and time series. For a full list of possible
   * aggregations, see the Query reference.
   * @param {number} [params.count] - Number of results to return. The maximum for the **count** and **offset** values
   * together in any one query is **10000**.
   * @param {string[]} [params._return] - A comma-separated list of the portion of the document hierarchy to return.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total
   * number of results that are returned is 10 and the offset is 8, it returns the last two results. The maximum for the
   * **count** and **offset** values together in any one query is **10000**.
   * @param {string[]} [params.sort] - A comma-separated list of fields in the document to sort on. You can optionally
   * specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the
   * default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When true, a highlight field is returned for each result which contains the
   * fields which match the query with `<em></em>` tags around the matching query terms.
   * @param {string[]} [params.passagesFields] - A comma-separated list of fields that passages are drawn from. If this
   * parameter not specified, then all top-level fields are included.
   * @param {number} [params.passagesCount] - The maximum number of passages to return. The search returns fewer
   * passages if the requested total is not found.
   * @param {number} [params.passagesCharacters] - The approximate number of characters that any one passage will have.
   * @param {string} [params.deduplicateField] - When specified, duplicate results based on the field specified are
   * removed from the returned results. Duplicate comparison is limited to the current query only, **offset** is not
   * considered. This parameter is currently Beta functionality.
   * @param {boolean} [params.similar] - When `true`, results are returned based on their similarity to the document IDs
   * specified in the **similar.document_ids** parameter.
   * @param {string[]} [params.similarDocumentIds] - A comma-separated list of document IDs to find similar documents.
   *
   * **Tip:** Include the **natural_language_query** parameter to expand the scope of the document similarity search
   * with the natural language query. Other query parameters, such as **filter** and **query**, are subsequently applied
   * and reduce the scope.
   * @param {string[]} [params.similarFields] - A comma-separated list of field names that are used as a basis for
   * comparison to identify similar documents. If not specified, the entire document is used for comparison.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.QueryNoticesResponse>>}
   */
  public queryNotices(params: DiscoveryV1.QueryNoticesParams, callback?: DiscoveryV1.Callback<DiscoveryV1.QueryNoticesResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.QueryNoticesResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
        'filter': _params.filter,
        'query': _params.query,
        'natural_language_query': _params.naturalLanguageQuery,
        'passages': _params.passages,
        'aggregation': _params.aggregation,
        'count': _params.count,
        'return': _params._return,
        'offset': _params.offset,
        'sort': _params.sort,
        'highlight': _params.highlight,
        'passages.fields': _params.passagesFields,
        'passages.count': _params.passagesCount,
        'passages.characters': _params.passagesCharacters,
        'deduplicate.field': _params.deduplicateField,
        'similar': _params.similar,
        'similar.document_ids': _params.similarDocumentIds,
        'similar.fields': _params.similarFields
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'queryNotices');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/notices',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Query multiple collections.
   *
   * By using this method, you can construct long queries that search multiple collection. For details, see the
   * [Discovery documentation](https://cloud.ibm.com/docs/discovery?topic=discovery-query-concepts#query-concepts).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionIds - A comma-separated list of collection IDs to be queried against.
   * @param {string} [params.filter] - A cacheable query that excludes documents that don't mention the query content.
   * Filter searches are better for metadata-type searches and for assessing the concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and
   * full text, but with the most relevant documents listed first. Use a query search when you want to find the most
   * relevant search results.
   * @param {string} [params.naturalLanguageQuery] - A natural language query that returns relevant documents by
   * utilizing training data and natural language understanding.
   * @param {boolean} [params.passages] - A passages query that returns the most relevant passages from the results.
   * @param {string} [params.aggregation] - An aggregation search that returns an exact answer by combining query search
   * with filters. Useful for applications to build lists, tables, and time series. For a full list of possible
   * aggregations, see the Query reference.
   * @param {number} [params.count] - Number of results to return.
   * @param {string} [params._return] - A comma-separated list of the portion of the document hierarchy to return.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total
   * number of results that are returned is 10 and the offset is 8, it returns the last two results.
   * @param {string} [params.sort] - A comma-separated list of fields in the document to sort on. You can optionally
   * specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the
   * default sort direction if no prefix is specified. This parameter cannot be used in the same query as the **bias**
   * parameter.
   * @param {boolean} [params.highlight] - When true, a highlight field is returned for each result which contains the
   * fields which match the query with `<em></em>` tags around the matching query terms.
   * @param {string} [params.passagesFields] - A comma-separated list of fields that passages are drawn from. If this
   * parameter not specified, then all top-level fields are included.
   * @param {number} [params.passagesCount] - The maximum number of passages to return. The search returns fewer
   * passages if the requested total is not found. The default is `10`. The maximum is `100`.
   * @param {number} [params.passagesCharacters] - The approximate number of characters that any one passage will have.
   * @param {boolean} [params.deduplicate] - When `true`, and used with a Watson Discovery News collection, duplicate
   * results (based on the contents of the **title** field) are removed. Duplicate comparison is limited to the current
   * query only; **offset** is not considered. This parameter is currently Beta functionality.
   * @param {string} [params.deduplicateField] - When specified, duplicate results based on the field specified are
   * removed from the returned results. Duplicate comparison is limited to the current query only, **offset** is not
   * considered. This parameter is currently Beta functionality.
   * @param {boolean} [params.similar] - When `true`, results are returned based on their similarity to the document IDs
   * specified in the **similar.document_ids** parameter.
   * @param {string} [params.similarDocumentIds] - A comma-separated list of document IDs to find similar documents.
   *
   * **Tip:** Include the **natural_language_query** parameter to expand the scope of the document similarity search
   * with the natural language query. Other query parameters, such as **filter** and **query**, are subsequently applied
   * and reduce the scope.
   * @param {string} [params.similarFields] - A comma-separated list of field names that are used as a basis for
   * comparison to identify similar documents. If not specified, the entire document is used for comparison.
   * @param {string} [params.bias] - Field which the returned results will be biased against. The specified field must
   * be either a **date** or **number** format. When a **date** type field is specified returned results are biased
   * towards field values closer to the current date. When a **number** type field is specified, returned results are
   * biased towards higher field values. This parameter cannot be used in the same query as the **sort** parameter.
   * @param {boolean} [params.xWatsonLoggingOptOut] - If `true`, queries are not stored in the Discovery **Logs**
   * endpoint.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.QueryResponse>>}
   */
  public federatedQuery(params: DiscoveryV1.FederatedQueryParams, callback?: DiscoveryV1.Callback<DiscoveryV1.QueryResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.QueryResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionIds'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'collection_ids': _params.collectionIds,
        'filter': _params.filter,
        'query': _params.query,
        'natural_language_query': _params.naturalLanguageQuery,
        'passages': _params.passages,
        'aggregation': _params.aggregation,
        'count': _params.count,
        'return': _params._return,
        'offset': _params.offset,
        'sort': _params.sort,
        'highlight': _params.highlight,
        'passages.fields': _params.passagesFields,
        'passages.count': _params.passagesCount,
        'passages.characters': _params.passagesCharacters,
        'deduplicate': _params.deduplicate,
        'deduplicate.field': _params.deduplicateField,
        'similar': _params.similar,
        'similar.document_ids': _params.similarDocumentIds,
        'similar.fields': _params.similarFields,
        'bias': _params.bias
      };

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'federatedQuery');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/query',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Watson-Logging-Opt-Out': _params.xWatsonLoggingOptOut
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Query multiple collection system notices.
   *
   * Queries for notices (errors or warnings) that might have been generated by the system. Notices are generated when
   * ingesting documents and performing relevance training. See the [Discovery
   * documentation](https://cloud.ibm.com/docs/discovery?topic=discovery-query-concepts#query-concepts) for more details
   * on the query language.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string[]} params.collectionIds - A comma-separated list of collection IDs to be queried against.
   * @param {string} [params.filter] - A cacheable query that excludes documents that don't mention the query content.
   * Filter searches are better for metadata-type searches and for assessing the concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and
   * full text, but with the most relevant documents listed first.
   * @param {string} [params.naturalLanguageQuery] - A natural language query that returns relevant documents by
   * utilizing training data and natural language understanding.
   * @param {string} [params.aggregation] - An aggregation search that returns an exact answer by combining query search
   * with filters. Useful for applications to build lists, tables, and time series. For a full list of possible
   * aggregations, see the Query reference.
   * @param {number} [params.count] - Number of results to return. The maximum for the **count** and **offset** values
   * together in any one query is **10000**.
   * @param {string[]} [params._return] - A comma-separated list of the portion of the document hierarchy to return.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total
   * number of results that are returned is 10 and the offset is 8, it returns the last two results. The maximum for the
   * **count** and **offset** values together in any one query is **10000**.
   * @param {string[]} [params.sort] - A comma-separated list of fields in the document to sort on. You can optionally
   * specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the
   * default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When true, a highlight field is returned for each result which contains the
   * fields which match the query with `<em></em>` tags around the matching query terms.
   * @param {string} [params.deduplicateField] - When specified, duplicate results based on the field specified are
   * removed from the returned results. Duplicate comparison is limited to the current query only, **offset** is not
   * considered. This parameter is currently Beta functionality.
   * @param {boolean} [params.similar] - When `true`, results are returned based on their similarity to the document IDs
   * specified in the **similar.document_ids** parameter.
   * @param {string[]} [params.similarDocumentIds] - A comma-separated list of document IDs to find similar documents.
   *
   * **Tip:** Include the **natural_language_query** parameter to expand the scope of the document similarity search
   * with the natural language query. Other query parameters, such as **filter** and **query**, are subsequently applied
   * and reduce the scope.
   * @param {string[]} [params.similarFields] - A comma-separated list of field names that are used as a basis for
   * comparison to identify similar documents. If not specified, the entire document is used for comparison.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.QueryNoticesResponse>>}
   */
  public federatedQueryNotices(params: DiscoveryV1.FederatedQueryNoticesParams, callback?: DiscoveryV1.Callback<DiscoveryV1.QueryNoticesResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.QueryNoticesResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionIds'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
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
        'deduplicate.field': _params.deduplicateField,
        'similar': _params.similar,
        'similar.document_ids': _params.similarDocumentIds,
        'similar.fields': _params.similarFields
      };

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'federatedQueryNotices');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/notices',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get Autocomplete Suggestions.
   *
   * Returns completion query suggestions for the specified prefix.  /n/n **Important:** this method is only valid when
   * using the Cloud Pak version of Discovery.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.prefix - The prefix to use for autocompletion. For example, the prefix `Ho` could
   * autocomplete to `Hot`, `Housing`, or `How do I upgrade`. Possible completions are.
   * @param {string} [params.field] - The field in the result documents that autocompletion suggestions are identified
   * from.
   * @param {number} [params.count] - The number of autocompletion suggestions to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Completions>>}
   */
  public getAutocompletion(params: DiscoveryV1.GetAutocompletionParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Completions>): Promise<DiscoveryV1.Response<DiscoveryV1.Completions>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'prefix'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
        'prefix': _params.prefix,
        'field': _params.field,
        'count': _params.count
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getAutocompletion');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/autocompletion',
          method: 'GET',
          qs: query,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * trainingData
   ************************/

  /**
   * List training data.
   *
   * Lists the training data for the specified collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TrainingDataSet>>}
   */
  public listTrainingData(params: DiscoveryV1.ListTrainingDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingDataSet>): Promise<DiscoveryV1.Response<DiscoveryV1.TrainingDataSet>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'listTrainingData');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Add query to training data.
   *
   * Adds a query to the training data for this collection. The query can contain a filter and natural language query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} [params.naturalLanguageQuery] - The natural text query for the new training query.
   * @param {string} [params.filter] - The filter used on the collection before the **natural_language_query** is
   * applied.
   * @param {TrainingExample[]} [params.examples] - Array of training examples.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TrainingQuery>>}
   */
  public addTrainingData(params: DiscoveryV1.AddTrainingDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingQuery>): Promise<DiscoveryV1.Response<DiscoveryV1.TrainingQuery>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'natural_language_query': _params.naturalLanguageQuery,
        'filter': _params.filter,
        'examples': _params.examples
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'addTrainingData');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete all training data.
   *
   * Deletes all training data from a collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Empty>>}
   */
  public deleteAllTrainingData(params: DiscoveryV1.DeleteAllTrainingDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>): Promise<DiscoveryV1.Response<DiscoveryV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteAllTrainingData');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get details about a query.
   *
   * Gets details for a specific training data query, including the query string and all examples.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.queryId - The ID of the query used for training.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TrainingQuery>>}
   */
  public getTrainingData(params: DiscoveryV1.GetTrainingDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingQuery>): Promise<DiscoveryV1.Response<DiscoveryV1.TrainingQuery>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'queryId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId,
        'query_id': _params.queryId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getTrainingData');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete a training data query.
   *
   * Removes the training data query and all associated examples from the training data set.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.queryId - The ID of the query used for training.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Empty>>}
   */
  public deleteTrainingData(params: DiscoveryV1.DeleteTrainingDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>): Promise<DiscoveryV1.Response<DiscoveryV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'queryId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId,
        'query_id': _params.queryId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTrainingData');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * List examples for a training data query.
   *
   * List all examples for this training data query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.queryId - The ID of the query used for training.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TrainingExampleList>>}
   */
  public listTrainingExamples(params: DiscoveryV1.ListTrainingExamplesParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExampleList>): Promise<DiscoveryV1.Response<DiscoveryV1.TrainingExampleList>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'queryId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId,
        'query_id': _params.queryId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'listTrainingExamples');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Add example to training data query.
   *
   * Adds a example to this training data query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.queryId - The ID of the query used for training.
   * @param {string} [params.documentId] - The document ID associated with this training example.
   * @param {string} [params.crossReference] - The cross reference associated with this training example.
   * @param {number} [params.relevance] - The relevance of the training example.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TrainingExample>>}
   */
  public createTrainingExample(params: DiscoveryV1.CreateTrainingExampleParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExample>): Promise<DiscoveryV1.Response<DiscoveryV1.TrainingExample>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'queryId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'document_id': _params.documentId,
        'cross_reference': _params.crossReference,
        'relevance': _params.relevance
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId,
        'query_id': _params.queryId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'createTrainingExample');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete example for training data query.
   *
   * Deletes the example document with the given ID from the training data query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.queryId - The ID of the query used for training.
   * @param {string} params.exampleId - The ID of the document as it is indexed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Empty>>}
   */
  public deleteTrainingExample(params: DiscoveryV1.DeleteTrainingExampleParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>): Promise<DiscoveryV1.Response<DiscoveryV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'queryId', 'exampleId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId,
        'query_id': _params.queryId,
        'example_id': _params.exampleId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTrainingExample');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Change label or cross reference for example.
   *
   * Changes the label or cross reference query for this training data example.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.queryId - The ID of the query used for training.
   * @param {string} params.exampleId - The ID of the document as it is indexed.
   * @param {string} [params.crossReference] - The example to add.
   * @param {number} [params.relevance] - The relevance value for this example.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TrainingExample>>}
   */
  public updateTrainingExample(params: DiscoveryV1.UpdateTrainingExampleParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExample>): Promise<DiscoveryV1.Response<DiscoveryV1.TrainingExample>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'queryId', 'exampleId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'cross_reference': _params.crossReference,
        'relevance': _params.relevance
      };

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId,
        'query_id': _params.queryId,
        'example_id': _params.exampleId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'updateTrainingExample');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
          method: 'PUT',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Get details for training data example.
   *
   * Gets the details for this training example.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.collectionId - The ID of the collection.
   * @param {string} params.queryId - The ID of the query used for training.
   * @param {string} params.exampleId - The ID of the document as it is indexed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.TrainingExample>>}
   */
  public getTrainingExample(params: DiscoveryV1.GetTrainingExampleParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExample>): Promise<DiscoveryV1.Response<DiscoveryV1.TrainingExample>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'collectionId', 'queryId', 'exampleId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'collection_id': _params.collectionId,
        'query_id': _params.queryId,
        'example_id': _params.exampleId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getTrainingExample');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

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
   * security](https://cloud.ibm.com/docs/discovery?topic=discovery-information-security#information-security).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customerId - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Empty>>}
   */
  public deleteUserData(params: DiscoveryV1.DeleteUserDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>): Promise<DiscoveryV1.Response<DiscoveryV1.Empty>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['customerId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const query = {
        'customer_id': _params.customerId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteUserData');

      const parameters = {
        options: {
          url: '/v1/user_data',
          method: 'DELETE',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * eventsAndFeedback
   ************************/

  /**
   * Create event.
   *
   * The **Events** API can be used to create log entries that are associated with specific queries. For example, you
   * can record which documents in the results set were "clicked" by a user and when that click occurred.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.type - The event type to be created.
   * @param {EventData} params.data - Query event data object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.CreateEventResponse>>}
   */
  public createEvent(params: DiscoveryV1.CreateEventParams, callback?: DiscoveryV1.Callback<DiscoveryV1.CreateEventResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.CreateEventResponse>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['type', 'data'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'type': _params.type,
        'data': _params.data
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'createEvent');

      const parameters = {
        options: {
          url: '/v1/events',
          method: 'POST',
          body,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Search the query and event log.
   *
   * Searches the query and event log to find query sessions that match the specified criteria. Searching the **logs**
   * endpoint uses the standard Discovery query syntax for the parameters that are supported.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.filter] - A cacheable query that excludes documents that don't mention the query content.
   * Filter searches are better for metadata-type searches and for assessing the concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and
   * full text, but with the most relevant documents listed first.
   * @param {number} [params.count] - Number of results to return. The maximum for the **count** and **offset** values
   * together in any one query is **10000**.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total
   * number of results that are returned is 10 and the offset is 8, it returns the last two results. The maximum for the
   * **count** and **offset** values together in any one query is **10000**.
   * @param {string[]} [params.sort] - A comma-separated list of fields in the document to sort on. You can optionally
   * specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the
   * default sort direction if no prefix is specified.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.LogQueryResponse>>}
   */
  public queryLog(params?: DiscoveryV1.QueryLogParams, callback?: DiscoveryV1.Callback<DiscoveryV1.LogQueryResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.LogQueryResponse>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const query = {
        'filter': _params.filter,
        'query': _params.query,
        'count': _params.count,
        'offset': _params.offset,
        'sort': _params.sort
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'queryLog');

      const parameters = {
        options: {
          url: '/v1/logs',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Number of queries over time.
   *
   * Total number of queries using the **natural_language_query** parameter over a specific time window.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.startTime] - Metric is computed from data recorded after this timestamp; must be in
   * `YYYY-MM-DDThh:mm:ssZ` format.
   * @param {string} [params.endTime] - Metric is computed from data recorded before this timestamp; must be in
   * `YYYY-MM-DDThh:mm:ssZ` format.
   * @param {string} [params.resultType] - The type of result to consider when calculating the metric.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.MetricResponse>>}
   */
  public getMetricsQuery(params?: DiscoveryV1.GetMetricsQueryParams, callback?: DiscoveryV1.Callback<DiscoveryV1.MetricResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.MetricResponse>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const query = {
        'start_time': _params.startTime,
        'end_time': _params.endTime,
        'result_type': _params.resultType
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getMetricsQuery');

      const parameters = {
        options: {
          url: '/v1/metrics/number_of_queries',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Number of queries with an event over time.
   *
   * Total number of queries using the **natural_language_query** parameter that have a corresponding "click" event over
   * a specified time window. This metric requires having integrated event tracking in your application using the
   * **Events** API.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.startTime] - Metric is computed from data recorded after this timestamp; must be in
   * `YYYY-MM-DDThh:mm:ssZ` format.
   * @param {string} [params.endTime] - Metric is computed from data recorded before this timestamp; must be in
   * `YYYY-MM-DDThh:mm:ssZ` format.
   * @param {string} [params.resultType] - The type of result to consider when calculating the metric.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.MetricResponse>>}
   */
  public getMetricsQueryEvent(params?: DiscoveryV1.GetMetricsQueryEventParams, callback?: DiscoveryV1.Callback<DiscoveryV1.MetricResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.MetricResponse>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const query = {
        'start_time': _params.startTime,
        'end_time': _params.endTime,
        'result_type': _params.resultType
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getMetricsQueryEvent');

      const parameters = {
        options: {
          url: '/v1/metrics/number_of_queries_with_event',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Number of queries with no search results over time.
   *
   * Total number of queries using the **natural_language_query** parameter that have no results returned over a
   * specified time window.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.startTime] - Metric is computed from data recorded after this timestamp; must be in
   * `YYYY-MM-DDThh:mm:ssZ` format.
   * @param {string} [params.endTime] - Metric is computed from data recorded before this timestamp; must be in
   * `YYYY-MM-DDThh:mm:ssZ` format.
   * @param {string} [params.resultType] - The type of result to consider when calculating the metric.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.MetricResponse>>}
   */
  public getMetricsQueryNoResults(params?: DiscoveryV1.GetMetricsQueryNoResultsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.MetricResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.MetricResponse>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const query = {
        'start_time': _params.startTime,
        'end_time': _params.endTime,
        'result_type': _params.resultType
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getMetricsQueryNoResults');

      const parameters = {
        options: {
          url: '/v1/metrics/number_of_queries_with_no_search_results',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Percentage of queries with an associated event.
   *
   * The percentage of queries using the **natural_language_query** parameter that have a corresponding "click" event
   * over a specified time window.  This metric requires having integrated event tracking in your application using the
   * **Events** API.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.startTime] - Metric is computed from data recorded after this timestamp; must be in
   * `YYYY-MM-DDThh:mm:ssZ` format.
   * @param {string} [params.endTime] - Metric is computed from data recorded before this timestamp; must be in
   * `YYYY-MM-DDThh:mm:ssZ` format.
   * @param {string} [params.resultType] - The type of result to consider when calculating the metric.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.MetricResponse>>}
   */
  public getMetricsEventRate(params?: DiscoveryV1.GetMetricsEventRateParams, callback?: DiscoveryV1.Callback<DiscoveryV1.MetricResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.MetricResponse>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const query = {
        'start_time': _params.startTime,
        'end_time': _params.endTime,
        'result_type': _params.resultType
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getMetricsEventRate');

      const parameters = {
        options: {
          url: '/v1/metrics/event_rate',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Most frequent query tokens with an event.
   *
   * The most frequent query tokens parsed from the **natural_language_query** parameter and their corresponding "click"
   * event rate within the recording period (queries and events are stored for 30 days). A query token is an individual
   * word or unigram within the query string.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.count] - Number of results to return. The maximum for the **count** and **offset** values
   * together in any one query is **10000**.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.MetricTokenResponse>>}
   */
  public getMetricsQueryTokenEvent(params?: DiscoveryV1.GetMetricsQueryTokenEventParams, callback?: DiscoveryV1.Callback<DiscoveryV1.MetricTokenResponse>): Promise<DiscoveryV1.Response<DiscoveryV1.MetricTokenResponse>> {
    const _params = (typeof params === 'function' && !callback) ? {} : extend({}, params);
    const _callback = (typeof params === 'function' && !callback) ? params : callback;

    return new Promise((resolve, reject) => {
      const query = {
        'count': _params.count
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getMetricsQueryTokenEvent');

      const parameters = {
        options: {
          url: '/v1/metrics/top_query_tokens_with_event_rate',
          method: 'GET',
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * credentials
   ************************/

  /**
   * List credentials.
   *
   * List all the source credentials that have been created for this service instance.
   *
   *  **Note:**  All credentials are sent over an encrypted connection and encrypted at rest.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.CredentialsList>>}
   */
  public listCredentials(params: DiscoveryV1.ListCredentialsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.CredentialsList>): Promise<DiscoveryV1.Response<DiscoveryV1.CredentialsList>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'listCredentials');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/credentials',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Create credentials.
   *
   * Creates a set of credentials to connect to a remote source. Created credentials are used in a configuration to
   * associate a collection with the remote source.
   *
   * **Note:** All credentials are sent over an encrypted connection and encrypted at rest.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} [params.sourceType] - The source that this credentials object connects to.
   * -  `box` indicates the credentials are used to connect an instance of Enterprise Box.
   * -  `salesforce` indicates the credentials are used to connect to Salesforce.
   * -  `sharepoint` indicates the credentials are used to connect to Microsoft SharePoint Online.
   * -  `web_crawl` indicates the credentials are used to perform a web crawl.
   * =  `cloud_object_storage` indicates the credentials are used to connect to an IBM Cloud Object Store.
   * @param {CredentialDetails} [params.credentialDetails] - Object containing details of the stored credentials.
   *
   * Obtain credentials for your source from the administrator of the source.
   * @param {string} [params.status] - The current status of this set of credentials. `connected` indicates that the
   * credentials are available to use with the source configuration of a collection. `invalid` refers to the credentials
   * (for example, the password provided has expired) and must be corrected before they can be used with a collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Credentials>>}
   */
  public createCredentials(params: DiscoveryV1.CreateCredentialsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Credentials>): Promise<DiscoveryV1.Response<DiscoveryV1.Credentials>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'source_type': _params.sourceType,
        'credential_details': _params.credentialDetails,
        'status': _params.status
      };

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'createCredentials');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/credentials',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * View Credentials.
   *
   * Returns details about the specified credentials.
   *
   *  **Note:** Secure credential information such as a password or SSH key is never returned and must be obtained from
   * the source system.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.credentialId - The unique identifier for a set of source credentials.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Credentials>>}
   */
  public getCredentials(params: DiscoveryV1.GetCredentialsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Credentials>): Promise<DiscoveryV1.Response<DiscoveryV1.Credentials>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'credentialId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'credential_id': _params.credentialId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getCredentials');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/credentials/{credential_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Update credentials.
   *
   * Updates an existing set of source credentials.
   *
   * **Note:** All credentials are sent over an encrypted connection and encrypted at rest.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.credentialId - The unique identifier for a set of source credentials.
   * @param {string} [params.sourceType] - The source that this credentials object connects to.
   * -  `box` indicates the credentials are used to connect an instance of Enterprise Box.
   * -  `salesforce` indicates the credentials are used to connect to Salesforce.
   * -  `sharepoint` indicates the credentials are used to connect to Microsoft SharePoint Online.
   * -  `web_crawl` indicates the credentials are used to perform a web crawl.
   * =  `cloud_object_storage` indicates the credentials are used to connect to an IBM Cloud Object Store.
   * @param {CredentialDetails} [params.credentialDetails] - Object containing details of the stored credentials.
   *
   * Obtain credentials for your source from the administrator of the source.
   * @param {string} [params.status] - The current status of this set of credentials. `connected` indicates that the
   * credentials are available to use with the source configuration of a collection. `invalid` refers to the credentials
   * (for example, the password provided has expired) and must be corrected before they can be used with a collection.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Credentials>>}
   */
  public updateCredentials(params: DiscoveryV1.UpdateCredentialsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Credentials>): Promise<DiscoveryV1.Response<DiscoveryV1.Credentials>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'credentialId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'source_type': _params.sourceType,
        'credential_details': _params.credentialDetails,
        'status': _params.status
      };

      const path = {
        'environment_id': _params.environmentId,
        'credential_id': _params.credentialId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'updateCredentials');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/credentials/{credential_id}',
          method: 'PUT',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete credentials.
   *
   * Deletes a set of stored credentials from your Discovery instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.credentialId - The unique identifier for a set of source credentials.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.DeleteCredentials>>}
   */
  public deleteCredentials(params: DiscoveryV1.DeleteCredentialsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteCredentials>): Promise<DiscoveryV1.Response<DiscoveryV1.DeleteCredentials>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'credentialId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'credential_id': _params.credentialId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCredentials');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/credentials/{credential_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /*************************
   * gatewayConfiguration
   ************************/

  /**
   * List Gateways.
   *
   * List the currently configured gateways.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.GatewayList>>}
   */
  public listGateways(params: DiscoveryV1.ListGatewaysParams, callback?: DiscoveryV1.Callback<DiscoveryV1.GatewayList>): Promise<DiscoveryV1.Response<DiscoveryV1.GatewayList>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'listGateways');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/gateways',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Create Gateway.
   *
   * Create a gateway configuration to use with a remotely installed gateway.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} [params.name] - User-defined name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Gateway>>}
   */
  public createGateway(params: DiscoveryV1.CreateGatewayParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Gateway>): Promise<DiscoveryV1.Response<DiscoveryV1.Gateway>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const body = {
        'name': _params.name
      };

      const path = {
        'environment_id': _params.environmentId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'createGateway');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/gateways',
          method: 'POST',
          body,
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * List Gateway Details.
   *
   * List information about the specified gateway.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.gatewayId - The requested gateway ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.Gateway>>}
   */
  public getGateway(params: DiscoveryV1.GetGatewayParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Gateway>): Promise<DiscoveryV1.Response<DiscoveryV1.Gateway>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'gatewayId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'gateway_id': _params.gatewayId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'getGateway');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/gateways/{gateway_id}',
          method: 'GET',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

  /**
   * Delete Gateway.
   *
   * Delete the specified gateway configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environmentId - The ID of the environment.
   * @param {string} params.gatewayId - The requested gateway ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @param {Function} [callback] - The callback that handles the response
   * @returns {Promise<DiscoveryV1.Response<DiscoveryV1.GatewayDelete>>}
   */
  public deleteGateway(params: DiscoveryV1.DeleteGatewayParams, callback?: DiscoveryV1.Callback<DiscoveryV1.GatewayDelete>): Promise<DiscoveryV1.Response<DiscoveryV1.GatewayDelete>> {
    const _params = extend({}, params);
    const _callback = callback;
    const requiredParams = ['environmentId', 'gatewayId'];

    return new Promise((resolve, reject) => {
      const missingParams = getMissingParams(_params, requiredParams);
      if (missingParams) {
        if (_callback) {
          _callback(missingParams);
          return resolve();
        }
        return reject(missingParams);
      }

      const path = {
        'environment_id': _params.environmentId,
        'gateway_id': _params.gatewayId
      };

      const sdkHeaders = getSdkHeaders(DiscoveryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteGateway');

      const parameters = {
        options: {
          url: '/v1/environments/{environment_id}/gateways/{gateway_id}',
          method: 'DELETE',
          path,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return this.createRequest(parameters).then(
        res => {
          if (_callback) {
            _callback(null, res);
          }
          return resolve(res);
        },
        err => {
          if (_callback) {
            _callback(err)
            return resolve();
          }
          return reject(err);
        }
      );
    });
  };

}

/*************************
 * interfaces
 ************************/

namespace DiscoveryV1 {

  /** An operation response. **/
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `createEnvironment` operation. */
  export interface CreateEnvironmentParams {
    /** Name that identifies the environment. */
    name: string;
    /** Description of the environment. */
    description?: string;
    /** Size of the environment. In the Lite plan the default and only accepted value is `LT`, in all other plans
     *  the default is `S`.
     */
    size?: CreateEnvironmentConstants.Size | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createEnvironment` operation. */
  export namespace CreateEnvironmentConstants {
    /** Size of the environment. In the Lite plan the default and only accepted value is `LT`, in all other plans the default is `S`. */
    export enum Size {
      LT = 'LT',
      XS = 'XS',
      S = 'S',
      MS = 'MS',
      M = 'M',
      ML = 'ML',
      L = 'L',
      XL = 'XL',
      XXL = 'XXL',
      XXXL = 'XXXL',
    }
  }

  /** Parameters for the `listEnvironments` operation. */
  export interface ListEnvironmentsParams {
    /** Show only the environment with the given name. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEnvironment` operation. */
  export interface GetEnvironmentParams {
    /** The ID of the environment. */
    environmentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateEnvironment` operation. */
  export interface UpdateEnvironmentParams {
    /** The ID of the environment. */
    environmentId: string;
    /** Name that identifies the environment. */
    name?: string;
    /** Description of the environment. */
    description?: string;
    /** Size that the environment should be increased to. Environment size cannot be modified when using a Lite
     *  plan. Environment size can only increased and not decreased.
     */
    size?: UpdateEnvironmentConstants.Size | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateEnvironment` operation. */
  export namespace UpdateEnvironmentConstants {
    /** Size that the environment should be increased to. Environment size cannot be modified when using a Lite plan. Environment size can only increased and not decreased. */
    export enum Size {
      S = 'S',
      MS = 'MS',
      M = 'M',
      ML = 'ML',
      L = 'L',
      XL = 'XL',
      XXL = 'XXL',
      XXXL = 'XXXL',
    }
  }

  /** Parameters for the `deleteEnvironment` operation. */
  export interface DeleteEnvironmentParams {
    /** The ID of the environment. */
    environmentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listFields` operation. */
  export interface ListFieldsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** A comma-separated list of collection IDs to be queried against. */
    collectionIds: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createConfiguration` operation. */
  export interface CreateConfigurationParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The name of the configuration. */
    name: string;
    /** The description of the configuration, if available. */
    description?: string;
    /** Document conversion settings. */
    conversions?: Conversions;
    /** An array of document enrichment settings for the configuration. */
    enrichments?: Enrichment[];
    /** Defines operations that can be used to transform the final output JSON into a normalized form. Operations
     *  are executed in the order that they appear in the array.
     */
    normalizations?: NormalizationOperation[];
    /** Object containing source parameters for the configuration. */
    source?: Source;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigurations` operation. */
  export interface ListConfigurationsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** Find configurations with the given name. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfiguration` operation. */
  export interface GetConfigurationParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the configuration. */
    configurationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateConfiguration` operation. */
  export interface UpdateConfigurationParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the configuration. */
    configurationId: string;
    /** The name of the configuration. */
    name: string;
    /** The description of the configuration, if available. */
    description?: string;
    /** Document conversion settings. */
    conversions?: Conversions;
    /** An array of document enrichment settings for the configuration. */
    enrichments?: Enrichment[];
    /** Defines operations that can be used to transform the final output JSON into a normalized form. Operations
     *  are executed in the order that they appear in the array.
     */
    normalizations?: NormalizationOperation[];
    /** Object containing source parameters for the configuration. */
    source?: Source;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConfiguration` operation. */
  export interface DeleteConfigurationParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the configuration. */
    configurationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createCollection` operation. */
  export interface CreateCollectionParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The name of the collection to be created. */
    name: string;
    /** A description of the collection. */
    description?: string;
    /** The ID of the configuration in which the collection is to be created. */
    configurationId?: string;
    /** The language of the documents stored in the collection, in the form of an ISO 639-1 language code. */
    language?: CreateCollectionConstants.Language | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createCollection` operation. */
  export namespace CreateCollectionConstants {
    /** The language of the documents stored in the collection, in the form of an ISO 639-1 language code. */
    export enum Language {
      EN = 'en',
      ES = 'es',
      DE = 'de',
      AR = 'ar',
      FR = 'fr',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
      PT = 'pt',
      NL = 'nl',
      ZH_CN = 'zh-CN',
    }
  }

  /** Parameters for the `listCollections` operation. */
  export interface ListCollectionsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** Find collections with the given name. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCollection` operation. */
  export interface GetCollectionParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCollection` operation. */
  export interface UpdateCollectionParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The name of the collection. */
    name: string;
    /** A description of the collection. */
    description?: string;
    /** The ID of the configuration in which the collection is to be updated. */
    configurationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCollection` operation. */
  export interface DeleteCollectionParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listCollectionFields` operation. */
  export interface ListCollectionFieldsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listExpansions` operation. */
  export interface ListExpansionsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createExpansions` operation. */
  export interface CreateExpansionsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** An array of query expansion definitions.
     *
     *   Each object in the **expansions** array represents a term or set of terms that will be expanded into other
     *  terms. Each expansion object can be configured as bidirectional or unidirectional. Bidirectional means that all
     *  terms are expanded to all other terms in the object. Unidirectional means that a set list of terms can be
     *  expanded into a second list of terms.
     *
     *   To create a bi-directional expansion specify an **expanded_terms** array. When found in a query, all items in
     *  the **expanded_terms** array are then expanded to the other items in the same array.
     *
     *   To create a uni-directional expansion, specify both an array of **input_terms** and an array of
     *  **expanded_terms**. When items in the **input_terms** array are present in a query, they are expanded using the
     *  items listed in the **expanded_terms** array.
     */
    expansions: Expansion[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteExpansions` operation. */
  export interface DeleteExpansionsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTokenizationDictionaryStatus` operation. */
  export interface GetTokenizationDictionaryStatusParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTokenizationDictionary` operation. */
  export interface CreateTokenizationDictionaryParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** An array of tokenization rules. Each rule contains, the original `text` string, component `tokens`, any
     *  alternate character set `readings`, and which `part_of_speech` the text is from.
     */
    tokenizationRules?: TokenDictRule[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTokenizationDictionary` operation. */
  export interface DeleteTokenizationDictionaryParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getStopwordListStatus` operation. */
  export interface GetStopwordListStatusParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createStopwordList` operation. */
  export interface CreateStopwordListParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The content of the stopword list to ingest. */
    stopwordFile: NodeJS.ReadableStream|Buffer;
    /** The filename for stopwordFile. */
    stopwordFilename: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteStopwordList` operation. */
  export interface DeleteStopwordListParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addDocument` operation. */
  export interface AddDocumentParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The content of the document to ingest. The maximum supported file size when adding a file to a collection is
     *  50 megabytes, the maximum supported file size when testing a configuration is 1 megabyte. Files larger than the
     *  supported size are rejected.
     */
    file?: NodeJS.ReadableStream|Buffer;
    /** The filename for file. */
    filename?: string;
    /** The content type of file. */
    fileContentType?: AddDocumentConstants.FileContentType | string;
    /** The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:
     *  ``` {
     *    "Creator": "Johnny Appleseed",
     *    "Subject": "Apples"
     *  } ```.
     */
    metadata?: string;
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

  /** Parameters for the `getDocumentStatus` operation. */
  export interface GetDocumentStatusParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the document. */
    documentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDocument` operation. */
  export interface UpdateDocumentParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the document. */
    documentId: string;
    /** The content of the document to ingest. The maximum supported file size when adding a file to a collection is
     *  50 megabytes, the maximum supported file size when testing a configuration is 1 megabyte. Files larger than the
     *  supported size are rejected.
     */
    file?: NodeJS.ReadableStream|Buffer;
    /** The filename for file. */
    filename?: string;
    /** The content type of file. */
    fileContentType?: UpdateDocumentConstants.FileContentType | string;
    /** The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:
     *  ``` {
     *    "Creator": "Johnny Appleseed",
     *    "Subject": "Apples"
     *  } ```.
     */
    metadata?: string;
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
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the document. */
    documentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `query` operation. */
  export interface QueryParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
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
    /** A passages query that returns the most relevant passages from the results. */
    passages?: boolean;
    /** An aggregation search that returns an exact answer by combining query search with filters. Useful for
     *  applications to build lists, tables, and time series. For a full list of possible aggregations, see the Query
     *  reference.
     */
    aggregation?: string;
    /** Number of results to return. */
    count?: number;
    /** A comma-separated list of the portion of the document hierarchy to return. */
    _return?: string;
    /** The number of query results to skip at the beginning. For example, if the total number of results that are
     *  returned is 10 and the offset is 8, it returns the last two results.
     */
    offset?: number;
    /** A comma-separated list of fields in the document to sort on. You can optionally specify a sort direction by
     *  prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no
     *  prefix is specified. This parameter cannot be used in the same query as the **bias** parameter.
     */
    sort?: string;
    /** When true, a highlight field is returned for each result which contains the fields which match the query
     *  with `<em></em>` tags around the matching query terms.
     */
    highlight?: boolean;
    /** A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all
     *  top-level fields are included.
     */
    passagesFields?: string;
    /** The maximum number of passages to return. The search returns fewer passages if the requested total is not
     *  found. The default is `10`. The maximum is `100`.
     */
    passagesCount?: number;
    /** The approximate number of characters that any one passage will have. */
    passagesCharacters?: number;
    /** When `true`, and used with a Watson Discovery News collection, duplicate results (based on the contents of
     *  the **title** field) are removed. Duplicate comparison is limited to the current query only; **offset** is not
     *  considered. This parameter is currently Beta functionality.
     */
    deduplicate?: boolean;
    /** When specified, duplicate results based on the field specified are removed from the returned results.
     *  Duplicate comparison is limited to the current query only, **offset** is not considered. This parameter is
     *  currently Beta functionality.
     */
    deduplicateField?: string;
    /** When `true`, results are returned based on their similarity to the document IDs specified in the
     *  **similar.document_ids** parameter.
     */
    similar?: boolean;
    /** A comma-separated list of document IDs to find similar documents.
     *
     *  **Tip:** Include the **natural_language_query** parameter to expand the scope of the document similarity search
     *  with the natural language query. Other query parameters, such as **filter** and **query**, are subsequently
     *  applied and reduce the scope.
     */
    similarDocumentIds?: string;
    /** A comma-separated list of field names that are used as a basis for comparison to identify similar documents.
     *  If not specified, the entire document is used for comparison.
     */
    similarFields?: string;
    /** Field which the returned results will be biased against. The specified field must be either a **date** or
     *  **number** format. When a **date** type field is specified returned results are biased towards field values
     *  closer to the current date. When a **number** type field is specified, returned results are biased towards
     *  higher field values. This parameter cannot be used in the same query as the **sort** parameter.
     */
    bias?: string;
    /** When `true` and the **natural_language_query** parameter is used, the **natural_languge_query** parameter is
     *  spell checked. The most likely correction is retunred in the **suggested_query** field of the response (if one
     *  exists).
     *
     *  **Important:** this parameter is only valid when using the Cloud Pak version of Discovery.
     */
    spellingSuggestions?: boolean;
    /** If `true`, queries are not stored in the Discovery **Logs** endpoint. */
    xWatsonLoggingOptOut?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `queryNotices` operation. */
  export interface QueryNoticesParams {
    /** The ID of the environment. */
    environmentId: string;
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
    /** A passages query that returns the most relevant passages from the results. */
    passages?: boolean;
    /** An aggregation search that returns an exact answer by combining query search with filters. Useful for
     *  applications to build lists, tables, and time series. For a full list of possible aggregations, see the Query
     *  reference.
     */
    aggregation?: string;
    /** Number of results to return. The maximum for the **count** and **offset** values together in any one query
     *  is **10000**.
     */
    count?: number;
    /** A comma-separated list of the portion of the document hierarchy to return. */
    _return?: string[];
    /** The number of query results to skip at the beginning. For example, if the total number of results that are
     *  returned is 10 and the offset is 8, it returns the last two results. The maximum for the **count** and
     *  **offset** values together in any one query is **10000**.
     */
    offset?: number;
    /** A comma-separated list of fields in the document to sort on. You can optionally specify a sort direction by
     *  prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no
     *  prefix is specified.
     */
    sort?: string[];
    /** When true, a highlight field is returned for each result which contains the fields which match the query
     *  with `<em></em>` tags around the matching query terms.
     */
    highlight?: boolean;
    /** A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all
     *  top-level fields are included.
     */
    passagesFields?: string[];
    /** The maximum number of passages to return. The search returns fewer passages if the requested total is not
     *  found.
     */
    passagesCount?: number;
    /** The approximate number of characters that any one passage will have. */
    passagesCharacters?: number;
    /** When specified, duplicate results based on the field specified are removed from the returned results.
     *  Duplicate comparison is limited to the current query only, **offset** is not considered. This parameter is
     *  currently Beta functionality.
     */
    deduplicateField?: string;
    /** When `true`, results are returned based on their similarity to the document IDs specified in the
     *  **similar.document_ids** parameter.
     */
    similar?: boolean;
    /** A comma-separated list of document IDs to find similar documents.
     *
     *  **Tip:** Include the **natural_language_query** parameter to expand the scope of the document similarity search
     *  with the natural language query. Other query parameters, such as **filter** and **query**, are subsequently
     *  applied and reduce the scope.
     */
    similarDocumentIds?: string[];
    /** A comma-separated list of field names that are used as a basis for comparison to identify similar documents.
     *  If not specified, the entire document is used for comparison.
     */
    similarFields?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `federatedQuery` operation. */
  export interface FederatedQueryParams {
    /** The ID of the environment. */
    environmentId: string;
    /** A comma-separated list of collection IDs to be queried against. */
    collectionIds: string;
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
    /** A passages query that returns the most relevant passages from the results. */
    passages?: boolean;
    /** An aggregation search that returns an exact answer by combining query search with filters. Useful for
     *  applications to build lists, tables, and time series. For a full list of possible aggregations, see the Query
     *  reference.
     */
    aggregation?: string;
    /** Number of results to return. */
    count?: number;
    /** A comma-separated list of the portion of the document hierarchy to return. */
    _return?: string;
    /** The number of query results to skip at the beginning. For example, if the total number of results that are
     *  returned is 10 and the offset is 8, it returns the last two results.
     */
    offset?: number;
    /** A comma-separated list of fields in the document to sort on. You can optionally specify a sort direction by
     *  prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no
     *  prefix is specified. This parameter cannot be used in the same query as the **bias** parameter.
     */
    sort?: string;
    /** When true, a highlight field is returned for each result which contains the fields which match the query
     *  with `<em></em>` tags around the matching query terms.
     */
    highlight?: boolean;
    /** A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all
     *  top-level fields are included.
     */
    passagesFields?: string;
    /** The maximum number of passages to return. The search returns fewer passages if the requested total is not
     *  found. The default is `10`. The maximum is `100`.
     */
    passagesCount?: number;
    /** The approximate number of characters that any one passage will have. */
    passagesCharacters?: number;
    /** When `true`, and used with a Watson Discovery News collection, duplicate results (based on the contents of
     *  the **title** field) are removed. Duplicate comparison is limited to the current query only; **offset** is not
     *  considered. This parameter is currently Beta functionality.
     */
    deduplicate?: boolean;
    /** When specified, duplicate results based on the field specified are removed from the returned results.
     *  Duplicate comparison is limited to the current query only, **offset** is not considered. This parameter is
     *  currently Beta functionality.
     */
    deduplicateField?: string;
    /** When `true`, results are returned based on their similarity to the document IDs specified in the
     *  **similar.document_ids** parameter.
     */
    similar?: boolean;
    /** A comma-separated list of document IDs to find similar documents.
     *
     *  **Tip:** Include the **natural_language_query** parameter to expand the scope of the document similarity search
     *  with the natural language query. Other query parameters, such as **filter** and **query**, are subsequently
     *  applied and reduce the scope.
     */
    similarDocumentIds?: string;
    /** A comma-separated list of field names that are used as a basis for comparison to identify similar documents.
     *  If not specified, the entire document is used for comparison.
     */
    similarFields?: string;
    /** Field which the returned results will be biased against. The specified field must be either a **date** or
     *  **number** format. When a **date** type field is specified returned results are biased towards field values
     *  closer to the current date. When a **number** type field is specified, returned results are biased towards
     *  higher field values. This parameter cannot be used in the same query as the **sort** parameter.
     */
    bias?: string;
    /** If `true`, queries are not stored in the Discovery **Logs** endpoint. */
    xWatsonLoggingOptOut?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `federatedQueryNotices` operation. */
  export interface FederatedQueryNoticesParams {
    /** The ID of the environment. */
    environmentId: string;
    /** A comma-separated list of collection IDs to be queried against. */
    collectionIds: string[];
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
    /** An aggregation search that returns an exact answer by combining query search with filters. Useful for
     *  applications to build lists, tables, and time series. For a full list of possible aggregations, see the Query
     *  reference.
     */
    aggregation?: string;
    /** Number of results to return. The maximum for the **count** and **offset** values together in any one query
     *  is **10000**.
     */
    count?: number;
    /** A comma-separated list of the portion of the document hierarchy to return. */
    _return?: string[];
    /** The number of query results to skip at the beginning. For example, if the total number of results that are
     *  returned is 10 and the offset is 8, it returns the last two results. The maximum for the **count** and
     *  **offset** values together in any one query is **10000**.
     */
    offset?: number;
    /** A comma-separated list of fields in the document to sort on. You can optionally specify a sort direction by
     *  prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no
     *  prefix is specified.
     */
    sort?: string[];
    /** When true, a highlight field is returned for each result which contains the fields which match the query
     *  with `<em></em>` tags around the matching query terms.
     */
    highlight?: boolean;
    /** When specified, duplicate results based on the field specified are removed from the returned results.
     *  Duplicate comparison is limited to the current query only, **offset** is not considered. This parameter is
     *  currently Beta functionality.
     */
    deduplicateField?: string;
    /** When `true`, results are returned based on their similarity to the document IDs specified in the
     *  **similar.document_ids** parameter.
     */
    similar?: boolean;
    /** A comma-separated list of document IDs to find similar documents.
     *
     *  **Tip:** Include the **natural_language_query** parameter to expand the scope of the document similarity search
     *  with the natural language query. Other query parameters, such as **filter** and **query**, are subsequently
     *  applied and reduce the scope.
     */
    similarDocumentIds?: string[];
    /** A comma-separated list of field names that are used as a basis for comparison to identify similar documents.
     *  If not specified, the entire document is used for comparison.
     */
    similarFields?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAutocompletion` operation. */
  export interface GetAutocompletionParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The prefix to use for autocompletion. For example, the prefix `Ho` could autocomplete to `Hot`, `Housing`,
     *  or `How do I upgrade`. Possible completions are.
     */
    prefix: string;
    /** The field in the result documents that autocompletion suggestions are identified from. */
    field?: string;
    /** The number of autocompletion suggestions to return. */
    count?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTrainingData` operation. */
  export interface ListTrainingDataParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addTrainingData` operation. */
  export interface AddTrainingDataParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The natural text query for the new training query. */
    naturalLanguageQuery?: string;
    /** The filter used on the collection before the **natural_language_query** is applied. */
    filter?: string;
    /** Array of training examples. */
    examples?: TrainingExample[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAllTrainingData` operation. */
  export interface DeleteAllTrainingDataParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTrainingData` operation. */
  export interface GetTrainingDataParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the query used for training. */
    queryId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTrainingData` operation. */
  export interface DeleteTrainingDataParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the query used for training. */
    queryId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTrainingExamples` operation. */
  export interface ListTrainingExamplesParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the query used for training. */
    queryId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTrainingExample` operation. */
  export interface CreateTrainingExampleParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the query used for training. */
    queryId: string;
    /** The document ID associated with this training example. */
    documentId?: string;
    /** The cross reference associated with this training example. */
    crossReference?: string;
    /** The relevance of the training example. */
    relevance?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTrainingExample` operation. */
  export interface DeleteTrainingExampleParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the query used for training. */
    queryId: string;
    /** The ID of the document as it is indexed. */
    exampleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTrainingExample` operation. */
  export interface UpdateTrainingExampleParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the query used for training. */
    queryId: string;
    /** The ID of the document as it is indexed. */
    exampleId: string;
    /** The example to add. */
    crossReference?: string;
    /** The relevance value for this example. */
    relevance?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTrainingExample` operation. */
  export interface GetTrainingExampleParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The ID of the collection. */
    collectionId: string;
    /** The ID of the query used for training. */
    queryId: string;
    /** The ID of the document as it is indexed. */
    exampleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createEvent` operation. */
  export interface CreateEventParams {
    /** The event type to be created. */
    type: CreateEventConstants.Type | string;
    /** Query event data object. */
    data: EventData;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createEvent` operation. */
  export namespace CreateEventConstants {
    /** The event type to be created. */
    export enum Type {
      CLICK = 'click',
    }
  }

  /** Parameters for the `queryLog` operation. */
  export interface QueryLogParams {
    /** A cacheable query that excludes documents that don't mention the query content. Filter searches are better
     *  for metadata-type searches and for assessing the concepts in the data set.
     */
    filter?: string;
    /** A query search returns all documents in your data set with full enrichments and full text, but with the most
     *  relevant documents listed first.
     */
    query?: string;
    /** Number of results to return. The maximum for the **count** and **offset** values together in any one query
     *  is **10000**.
     */
    count?: number;
    /** The number of query results to skip at the beginning. For example, if the total number of results that are
     *  returned is 10 and the offset is 8, it returns the last two results. The maximum for the **count** and
     *  **offset** values together in any one query is **10000**.
     */
    offset?: number;
    /** A comma-separated list of fields in the document to sort on. You can optionally specify a sort direction by
     *  prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no
     *  prefix is specified.
     */
    sort?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMetricsQuery` operation. */
  export interface GetMetricsQueryParams {
    /** Metric is computed from data recorded after this timestamp; must be in `YYYY-MM-DDThh:mm:ssZ` format. */
    startTime?: string;
    /** Metric is computed from data recorded before this timestamp; must be in `YYYY-MM-DDThh:mm:ssZ` format. */
    endTime?: string;
    /** The type of result to consider when calculating the metric. */
    resultType?: GetMetricsQueryConstants.ResultType | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getMetricsQuery` operation. */
  export namespace GetMetricsQueryConstants {
    /** The type of result to consider when calculating the metric. */
    export enum ResultType {
      DOCUMENT = 'document',
    }
  }

  /** Parameters for the `getMetricsQueryEvent` operation. */
  export interface GetMetricsQueryEventParams {
    /** Metric is computed from data recorded after this timestamp; must be in `YYYY-MM-DDThh:mm:ssZ` format. */
    startTime?: string;
    /** Metric is computed from data recorded before this timestamp; must be in `YYYY-MM-DDThh:mm:ssZ` format. */
    endTime?: string;
    /** The type of result to consider when calculating the metric. */
    resultType?: GetMetricsQueryEventConstants.ResultType | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getMetricsQueryEvent` operation. */
  export namespace GetMetricsQueryEventConstants {
    /** The type of result to consider when calculating the metric. */
    export enum ResultType {
      DOCUMENT = 'document',
    }
  }

  /** Parameters for the `getMetricsQueryNoResults` operation. */
  export interface GetMetricsQueryNoResultsParams {
    /** Metric is computed from data recorded after this timestamp; must be in `YYYY-MM-DDThh:mm:ssZ` format. */
    startTime?: string;
    /** Metric is computed from data recorded before this timestamp; must be in `YYYY-MM-DDThh:mm:ssZ` format. */
    endTime?: string;
    /** The type of result to consider when calculating the metric. */
    resultType?: GetMetricsQueryNoResultsConstants.ResultType | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getMetricsQueryNoResults` operation. */
  export namespace GetMetricsQueryNoResultsConstants {
    /** The type of result to consider when calculating the metric. */
    export enum ResultType {
      DOCUMENT = 'document',
    }
  }

  /** Parameters for the `getMetricsEventRate` operation. */
  export interface GetMetricsEventRateParams {
    /** Metric is computed from data recorded after this timestamp; must be in `YYYY-MM-DDThh:mm:ssZ` format. */
    startTime?: string;
    /** Metric is computed from data recorded before this timestamp; must be in `YYYY-MM-DDThh:mm:ssZ` format. */
    endTime?: string;
    /** The type of result to consider when calculating the metric. */
    resultType?: GetMetricsEventRateConstants.ResultType | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getMetricsEventRate` operation. */
  export namespace GetMetricsEventRateConstants {
    /** The type of result to consider when calculating the metric. */
    export enum ResultType {
      DOCUMENT = 'document',
    }
  }

  /** Parameters for the `getMetricsQueryTokenEvent` operation. */
  export interface GetMetricsQueryTokenEventParams {
    /** Number of results to return. The maximum for the **count** and **offset** values together in any one query
     *  is **10000**.
     */
    count?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listCredentials` operation. */
  export interface ListCredentialsParams {
    /** The ID of the environment. */
    environmentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createCredentials` operation. */
  export interface CreateCredentialsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The source that this credentials object connects to.
     *  -  `box` indicates the credentials are used to connect an instance of Enterprise Box.
     *  -  `salesforce` indicates the credentials are used to connect to Salesforce.
     *  -  `sharepoint` indicates the credentials are used to connect to Microsoft SharePoint Online.
     *  -  `web_crawl` indicates the credentials are used to perform a web crawl.
     *  =  `cloud_object_storage` indicates the credentials are used to connect to an IBM Cloud Object Store.
     */
    sourceType?: CreateCredentialsConstants.SourceType | string;
    /** Object containing details of the stored credentials.
     *
     *  Obtain credentials for your source from the administrator of the source.
     */
    credentialDetails?: CredentialDetails;
    /** The current status of this set of credentials. `connected` indicates that the credentials are available to
     *  use with the source configuration of a collection. `invalid` refers to the credentials (for example, the
     *  password provided has expired) and must be corrected before they can be used with a collection.
     */
    status?: CreateCredentialsConstants.Status | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createCredentials` operation. */
  export namespace CreateCredentialsConstants {
    /** The source that this credentials object connects to. -  `box` indicates the credentials are used to connect an instance of Enterprise Box. -  `salesforce` indicates the credentials are used to connect to Salesforce. -  `sharepoint` indicates the credentials are used to connect to Microsoft SharePoint Online. -  `web_crawl` indicates the credentials are used to perform a web crawl. =  `cloud_object_storage` indicates the credentials are used to connect to an IBM Cloud Object Store. */
    export enum SourceType {
      BOX = 'box',
      SALESFORCE = 'salesforce',
      SHAREPOINT = 'sharepoint',
      WEB_CRAWL = 'web_crawl',
      CLOUD_OBJECT_STORAGE = 'cloud_object_storage',
    }
    /** The current status of this set of credentials. `connected` indicates that the credentials are available to use with the source configuration of a collection. `invalid` refers to the credentials (for example, the password provided has expired) and must be corrected before they can be used with a collection. */
    export enum Status {
      CONNECTED = 'connected',
      INVALID = 'invalid',
    }
  }

  /** Parameters for the `getCredentials` operation. */
  export interface GetCredentialsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The unique identifier for a set of source credentials. */
    credentialId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCredentials` operation. */
  export interface UpdateCredentialsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The unique identifier for a set of source credentials. */
    credentialId: string;
    /** The source that this credentials object connects to.
     *  -  `box` indicates the credentials are used to connect an instance of Enterprise Box.
     *  -  `salesforce` indicates the credentials are used to connect to Salesforce.
     *  -  `sharepoint` indicates the credentials are used to connect to Microsoft SharePoint Online.
     *  -  `web_crawl` indicates the credentials are used to perform a web crawl.
     *  =  `cloud_object_storage` indicates the credentials are used to connect to an IBM Cloud Object Store.
     */
    sourceType?: UpdateCredentialsConstants.SourceType | string;
    /** Object containing details of the stored credentials.
     *
     *  Obtain credentials for your source from the administrator of the source.
     */
    credentialDetails?: CredentialDetails;
    /** The current status of this set of credentials. `connected` indicates that the credentials are available to
     *  use with the source configuration of a collection. `invalid` refers to the credentials (for example, the
     *  password provided has expired) and must be corrected before they can be used with a collection.
     */
    status?: UpdateCredentialsConstants.Status | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateCredentials` operation. */
  export namespace UpdateCredentialsConstants {
    /** The source that this credentials object connects to. -  `box` indicates the credentials are used to connect an instance of Enterprise Box. -  `salesforce` indicates the credentials are used to connect to Salesforce. -  `sharepoint` indicates the credentials are used to connect to Microsoft SharePoint Online. -  `web_crawl` indicates the credentials are used to perform a web crawl. =  `cloud_object_storage` indicates the credentials are used to connect to an IBM Cloud Object Store. */
    export enum SourceType {
      BOX = 'box',
      SALESFORCE = 'salesforce',
      SHAREPOINT = 'sharepoint',
      WEB_CRAWL = 'web_crawl',
      CLOUD_OBJECT_STORAGE = 'cloud_object_storage',
    }
    /** The current status of this set of credentials. `connected` indicates that the credentials are available to use with the source configuration of a collection. `invalid` refers to the credentials (for example, the password provided has expired) and must be corrected before they can be used with a collection. */
    export enum Status {
      CONNECTED = 'connected',
      INVALID = 'invalid',
    }
  }

  /** Parameters for the `deleteCredentials` operation. */
  export interface DeleteCredentialsParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The unique identifier for a set of source credentials. */
    credentialId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listGateways` operation. */
  export interface ListGatewaysParams {
    /** The ID of the environment. */
    environmentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createGateway` operation. */
  export interface CreateGatewayParams {
    /** The ID of the environment. */
    environmentId: string;
    /** User-defined name. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getGateway` operation. */
  export interface GetGatewayParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The requested gateway ID. */
    gatewayId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteGateway` operation. */
  export interface DeleteGatewayParams {
    /** The ID of the environment. */
    environmentId: string;
    /** The requested gateway ID. */
    gatewayId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Aggregation results for the specified query. */
  export interface AggregationResult {
    /** Key that matched the aggregation type. */
    key?: string;
    /** Number of matching results. */
    matching_results?: number;
    /** Aggregations returned in the case of chained aggregations. */
    aggregations?: QueryAggregation[];
  }

  /** A collection for storing documents. */
  export interface Collection {
    /** The unique identifier of the collection. */
    collection_id?: string;
    /** The name of the collection. */
    name?: string;
    /** The description of the collection. */
    description?: string;
    /** The creation date of the collection in the format yyyy-MM-dd'T'HH:mmcon:ss.SSS'Z'. */
    created?: string;
    /** The timestamp of when the collection was last updated in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z'. */
    updated?: string;
    /** The status of the collection. */
    status?: string;
    /** The unique identifier of the collection's configuration. */
    configuration_id?: string;
    /** The language of the documents stored in the collection. Permitted values include `en` (English), `de`
     *  (German), and `es` (Spanish).
     */
    language?: string;
    /** Object containing collection document count information. */
    document_counts?: DocumentCounts;
    /** Summary of the disk usage statistics for this collection. */
    disk_usage?: CollectionDiskUsage;
    /** Training status details. */
    training_status?: TrainingStatus;
    /** Object containing information about the crawl status of this collection. */
    crawl_status?: CollectionCrawlStatus;
    /** Object containing smart document understanding information for this collection. */
    smart_document_understanding?: SduStatus;
  }

  /** Object containing information about the crawl status of this collection. */
  export interface CollectionCrawlStatus {
    /** Object containing source crawl status information. */
    source_crawl?: SourceStatus;
  }

  /** Summary of the disk usage statistics for this collection. */
  export interface CollectionDiskUsage {
    /** Number of bytes used by the collection. */
    used_bytes?: number;
  }

  /** Summary of the collection usage in the environment. */
  export interface CollectionUsage {
    /** Number of active collections in the environment. */
    available?: number;
    /** Total number of collections allowed in the environment. */
    maximum_allowed?: number;
  }

  /** An object containing an array of autocompletion suggestions. */
  export interface Completions {
    /** Array of autcomplete suggestion based on the provided prefix. */
    completions?: string[];
  }

  /** A custom configuration for the environment. */
  export interface Configuration {
    /** The unique identifier of the configuration. */
    configuration_id?: string;
    /** The name of the configuration. */
    name: string;
    /** The creation date of the configuration in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z'. */
    created?: string;
    /** The timestamp of when the configuration was last updated in the format yyyy-MM-dd'T'HH:mm:ss.SSS'Z'. */
    updated?: string;
    /** The description of the configuration, if available. */
    description?: string;
    /** Document conversion settings. */
    conversions?: Conversions;
    /** An array of document enrichment settings for the configuration. */
    enrichments?: Enrichment[];
    /** Defines operations that can be used to transform the final output JSON into a normalized form. Operations
     *  are executed in the order that they appear in the array.
     */
    normalizations?: NormalizationOperation[];
    /** Object containing source parameters for the configuration. */
    source?: Source;
  }

  /** Document conversion settings. */
  export interface Conversions {
    /** A list of PDF conversion settings. */
    pdf?: PdfSettings;
    /** A list of Word conversion settings. */
    word?: WordSettings;
    /** A list of HTML conversion settings. */
    html?: HtmlSettings;
    /** A list of Document Segmentation settings. */
    segment?: SegmentSettings;
    /** Defines operations that can be used to transform the final output JSON into a normalized form. Operations
     *  are executed in the order that they appear in the array.
     */
    json_normalizations?: NormalizationOperation[];
    /** When `true`, automatic text extraction from images (this includes images embedded in supported document
     *  formats, for example PDF, and suppported image formats, for example TIFF) is performed on documents uploaded to
     *  the collection. This field is supported on **Advanced** and higher plans only. **Lite** plans do not support
     *  image text recognition.
     */
    image_text_recognition?: boolean;
  }

  /** An object defining the event being created. */
  export interface CreateEventResponse {
    /** The event type that was created. */
    type?: string;
    /** Query event data object. */
    data?: EventData;
  }

  /** Object containing details of the stored credentials. Obtain credentials for your source from the administrator of the source. */
  export interface CredentialDetails {
    /** The authentication method for this credentials definition. The  **credential_type** specified must be
     *  supported by the **source_type**. The following combinations are possible:
     *
     *  -  `"source_type": "box"` - valid `credential_type`s: `oauth2`
     *  -  `"source_type": "salesforce"` - valid `credential_type`s: `username_password`
     *  -  `"source_type": "sharepoint"` - valid `credential_type`s: `saml` with **source_version** of `online`, or
     *  `ntlm_v1` with **source_version** of `2016`
     *  -  `"source_type": "web_crawl"` - valid `credential_type`s: `noauth` or `basic`
     *  -  "source_type": "cloud_object_storage"` - valid `credential_type`s: `aws4_hmac`.
     */
    credential_type?: string;
    /** The **client_id** of the source that these credentials connect to. Only valid, and required, with a
     *  **credential_type** of `oauth2`.
     */
    client_id?: string;
    /** The **enterprise_id** of the Box site that these credentials connect to. Only valid, and required, with a
     *  **source_type** of `box`.
     */
    enterprise_id?: string;
    /** The **url** of the source that these credentials connect to. Only valid, and required, with a
     *  **credential_type** of `username_password`, `noauth`, and `basic`.
     */
    url?: string;
    /** The **username** of the source that these credentials connect to. Only valid, and required, with a
     *  **credential_type** of `saml`, `username_password`, `basic`, or `ntlm_v1`.
     */
    username?: string;
    /** The **organization_url** of the source that these credentials connect to. Only valid, and required, with a
     *  **credential_type** of `saml`.
     */
    organization_url?: string;
    /** The **site_collection.path** of the source that these credentials connect to. Only valid, and required, with
     *  a **source_type** of `sharepoint`.
     */
    site_collection_path?: string;
    /** The **client_secret** of the source that these credentials connect to. Only valid, and required, with a
     *  **credential_type** of `oauth2`. This value is never returned and is only used when creating or modifying
     *  **credentials**.
     */
    client_secret?: string;
    /** The **public_key_id** of the source that these credentials connect to. Only valid, and required, with a
     *  **credential_type** of `oauth2`. This value is never returned and is only used when creating or modifying
     *  **credentials**.
     */
    public_key_id?: string;
    /** The **private_key** of the source that these credentials connect to. Only valid, and required, with a
     *  **credential_type** of `oauth2`. This value is never returned and is only used when creating or modifying
     *  **credentials**.
     */
    private_key?: string;
    /** The **passphrase** of the source that these credentials connect to. Only valid, and required, with a
     *  **credential_type** of `oauth2`. This value is never returned and is only used when creating or modifying
     *  **credentials**.
     */
    passphrase?: string;
    /** The **password** of the source that these credentials connect to. Only valid, and required, with
     *  **credential_type**s of `saml`, `username_password`, `basic`, or `ntlm_v1`.
     *
     *  **Note:** When used with a **source_type** of `salesforce`, the password consists of the Salesforce password and
     *  a valid Salesforce security token concatenated. This value is never returned and is only used when creating or
     *  modifying **credentials**.
     */
    password?: string;
    /** The ID of the **gateway** to be connected through (when connecting to intranet sites). Only valid with a
     *  **credential_type** of `noauth`, `basic`, or `ntlm_v1`. Gateways are created using the
     *  `/v1/environments/{environment_id}/gateways` methods.
     */
    gateway_id?: string;
    /** The type of Sharepoint repository to connect to. Only valid, and required, with a **source_type** of
     *  `sharepoint`.
     */
    source_version?: string;
    /** SharePoint OnPrem WebApplication URL. Only valid, and required, with a **source_version** of `2016`. If a
     *  port is not supplied, the default to port `80` for http and port `443` for https connections are used.
     */
    web_application_url?: string;
    /** The domain used to log in to your OnPrem SharePoint account. Only valid, and required, with a
     *  **source_version** of `2016`.
     */
    domain?: string;
    /** The endpoint associated with the cloud object store that your are connecting to. Only valid, and required,
     *  with a **credential_type** of `aws4_hmac`.
     */
    endpoint?: string;
    /** The access key ID associated with the cloud object store. Only valid, and required, with a
     *  **credential_type** of `aws4_hmac`. This value is never returned and is only used when creating or modifying
     *  **credentials**. For more infomation, see the [cloud object store
     *  documentation](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-using-hmac-credentials#using-hmac-credentials).
     */
    access_key_id?: string;
    /** The secret access key associated with the cloud object store. Only valid, and required, with a
     *  **credential_type** of `aws4_hmac`. This value is never returned and is only used when creating or modifying
     *  **credentials**. For more infomation, see the [cloud object store
     *  documentation](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-using-hmac-credentials#using-hmac-credentials).
     */
    secret_access_key?: string;
  }

  /** Object containing credential information. */
  export interface Credentials {
    /** Unique identifier for this set of credentials. */
    credential_id?: string;
    /** The source that this credentials object connects to.
     *  -  `box` indicates the credentials are used to connect an instance of Enterprise Box.
     *  -  `salesforce` indicates the credentials are used to connect to Salesforce.
     *  -  `sharepoint` indicates the credentials are used to connect to Microsoft SharePoint Online.
     *  -  `web_crawl` indicates the credentials are used to perform a web crawl.
     *  =  `cloud_object_storage` indicates the credentials are used to connect to an IBM Cloud Object Store.
     */
    source_type?: string;
    /** Object containing details of the stored credentials.
     *
     *  Obtain credentials for your source from the administrator of the source.
     */
    credential_details?: CredentialDetails;
    /** The current status of this set of credentials. `connected` indicates that the credentials are available to
     *  use with the source configuration of a collection. `invalid` refers to the credentials (for example, the
     *  password provided has expired) and must be corrected before they can be used with a collection.
     */
    status?: string;
  }

  /** Object containing array of credential definitions. */
  export interface CredentialsList {
    /** An array of credential definitions that were created for this instance. */
    credentials?: Credentials[];
  }

  /** Response object returned when deleting a colleciton. */
  export interface DeleteCollectionResponse {
    /** The unique identifier of the collection that is being deleted. */
    collection_id: string;
    /** The status of the collection. The status of a successful deletion operation is `deleted`. */
    status: string;
  }

  /** Information returned when a configuration is deleted. */
  export interface DeleteConfigurationResponse {
    /** The unique identifier for the configuration. */
    configuration_id: string;
    /** Status of the configuration. A deleted configuration has the status deleted. */
    status: string;
    /** An array of notice messages, if any. */
    notices?: Notice[];
  }

  /** Object returned after credentials are deleted. */
  export interface DeleteCredentials {
    /** The unique identifier of the credentials that have been deleted. */
    credential_id?: string;
    /** The status of the deletion request. */
    status?: string;
  }

  /** Information returned when a document is deleted. */
  export interface DeleteDocumentResponse {
    /** The unique identifier of the document. */
    document_id?: string;
    /** Status of the document. A deleted document has the status deleted. */
    status?: string;
  }

  /** Response object returned when deleting an environment. */
  export interface DeleteEnvironmentResponse {
    /** The unique identifier for the environment. */
    environment_id: string;
    /** Status of the environment. */
    status: string;
  }

  /** Summary of the disk usage statistics for the environment. */
  export interface DiskUsage {
    /** Number of bytes within the environment's disk capacity that are currently used to store data. */
    used_bytes?: number;
    /** Total number of bytes available in the environment's disk capacity. */
    maximum_allowed_bytes?: number;
  }

  /** Information returned after an uploaded document is accepted. */
  export interface DocumentAccepted {
    /** The unique identifier of the ingested document. */
    document_id?: string;
    /** Status of the document in the ingestion process. A status of `processing` is returned for documents that are
     *  ingested with a *version* date before `2019-01-01`. The `pending` status is returned for all others.
     */
    status?: string;
    /** Array of notices produced by the document-ingestion process. */
    notices?: Notice[];
  }

  /** Object containing collection document count information. */
  export interface DocumentCounts {
    /** The total number of available documents in the collection. */
    available?: number;
    /** The number of documents in the collection that are currently being processed. */
    processing?: number;
    /** The number of documents in the collection that failed to be ingested. */
    failed?: number;
    /** The number of documents that have been uploaded to the collection, but have not yet started processing. */
    pending?: number;
  }

  /** Status information about a submitted document. */
  export interface DocumentStatus {
    /** The unique identifier of the document. */
    document_id: string;
    /** The unique identifier for the configuration. */
    configuration_id?: string;
    /** Status of the document in the ingestion process. */
    status: string;
    /** Description of the document status. */
    status_description: string;
    /** Name of the original source file (if available). */
    filename?: string;
    /** The type of the original source file. */
    file_type?: string;
    /** The SHA-1 hash of the original source file (formatted as a hexadecimal string). */
    sha1?: string;
    /** Array of notices produced by the document-ingestion process. */
    notices: Notice[];
  }

  /** Enrichment step to perform on the document. Each enrichment is performed on the specified field in the order that they are listed in the configuration. */
  export interface Enrichment {
    /** Describes what the enrichment step does. */
    description?: string;
    /** Field where enrichments will be stored. This field must already exist or be at most 1 level deeper than an
     *  existing field. For example, if `text` is a top-level field with no sub-fields, `text.foo` is a valid
     *  destination but `text.foo.bar` is not.
     */
    destination_field: string;
    /** Field to be enriched.
     *
     *  Arrays can be specified as the **source_field** if the **enrichment** service for this enrichment is set to
     *  `natural_language_undstanding`.
     */
    source_field: string;
    /** Indicates that the enrichments will overwrite the destination_field field if it already exists. */
    overwrite?: boolean;
    /** Name of the enrichment service to call. Current options are `natural_language_understanding` and `elements`.
     *
     *   When using `natual_language_understanding`, the **options** object must contain Natural Language Understanding
     *  options.
     *
     *   When using `elements` the **options** object must contain Element Classification options. Additionally, when
     *  using the `elements` enrichment the configuration specified and files ingested must meet all the criteria
     *  specified in [the
     *  documentation](https://cloud.ibm.com/docs/discovery?topic=discovery-element-classification#element-classification).
     */
    enrichment: string;
    /** If true, then most errors generated during the enrichment process will be treated as warnings and will not
     *  cause the document to fail processing.
     */
    ignore_downstream_errors?: boolean;
    /** Options which are specific to a particular enrichment. */
    options?: EnrichmentOptions;
  }

  /** Options which are specific to a particular enrichment. */
  export interface EnrichmentOptions {
    /** Object containing Natural Language Understanding features to be used. */
    features?: NluEnrichmentFeatures;
    /** ISO 639-1 code indicating the language to use for the analysis. This code overrides the automatic language
     *  detection performed by the service. Valid codes are `ar` (Arabic), `en` (English), `fr` (French), `de` (German),
     *  `it` (Italian), `pt` (Portuguese), `ru` (Russian), `es` (Spanish), and `sv` (Swedish). **Note:** Not all
     *  features support all languages, automatic detection is recommended.
     */
    language?: string;
    /** *For use with `elements` enrichments only.* The element extraction model to use. Models available are:
     *  `contract`.
     */
    model?: string;
  }

  /** Details about an environment. */
  export interface Environment {
    /** Unique identifier for the environment. */
    environment_id?: string;
    /** Name that identifies the environment. */
    name?: string;
    /** Description of the environment. */
    description?: string;
    /** Creation date of the environment, in the format `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`. */
    created?: string;
    /** Date of most recent environment update, in the format `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`. */
    updated?: string;
    /** Current status of the environment. `resizing` is displayed when a request to increase the environment size
     *  has been made, but is still in the process of being completed.
     */
    status?: string;
    /** If `true`, the environment contains read-only collections that are maintained by IBM. */
    read_only?: boolean;
    /** Current size of the environment. */
    size?: string;
    /** The new size requested for this environment. Only returned when the environment *status* is `resizing`.
     *
     *  *Note:* Querying and indexing can still be performed during an environment upsize.
     */
    requested_size?: string;
    /** Details about the resource usage and capacity of the environment. */
    index_capacity?: IndexCapacity;
    /** Information about the Continuous Relevancy Training for this environment. */
    search_status?: SearchStatus;
  }

  /** Summary of the document usage statistics for the environment. */
  export interface EnvironmentDocuments {
    /** Number of documents indexed for the environment. */
    available?: number;
    /** Total number of documents allowed in the environment's capacity. */
    maximum_allowed?: number;
  }

  /** Query event data object. */
  export interface EventData {
    /** The **environment_id** associated with the query that the event is associated with. */
    environment_id: string;
    /** The session token that was returned as part of the query results that this event is associated with. */
    session_token: string;
    /** The optional timestamp for the event that was created. If not provided, the time that the event was created
     *  in the log was used.
     */
    client_timestamp?: string;
    /** The rank of the result item which the event is associated with. */
    display_rank?: number;
    /** The **collection_id** of the document that this event is associated with. */
    collection_id: string;
    /** The **document_id** of the document that this event is associated with. */
    document_id: string;
    /** The query identifier stored in the log. The query and any events associated with that query are stored with
     *  the same **query_id**.
     */
    query_id?: string;
  }

  /** An expansion definition. Each object respresents one set of expandable strings. For example, you could have expansions for the word `hot` in one object, and expansions for the word `cold` in another. */
  export interface Expansion {
    /** A list of terms that will be expanded for this expansion. If specified, only the items in this list are
     *  expanded.
     */
    input_terms?: string[];
    /** A list of terms that this expansion will be expanded to. If specified without **input_terms**, it also
     *  functions as the input term list.
     */
    expanded_terms: string[];
  }

  /** The query expansion definitions for the specified collection. */
  export interface Expansions {
    /** An array of query expansion definitions.
     *
     *   Each object in the **expansions** array represents a term or set of terms that will be expanded into other
     *  terms. Each expansion object can be configured as bidirectional or unidirectional. Bidirectional means that all
     *  terms are expanded to all other terms in the object. Unidirectional means that a set list of terms can be
     *  expanded into a second list of terms.
     *
     *   To create a bi-directional expansion specify an **expanded_terms** array. When found in a query, all items in
     *  the **expanded_terms** array are then expanded to the other items in the same array.
     *
     *   To create a uni-directional expansion, specify both an array of **input_terms** and an array of
     *  **expanded_terms**. When items in the **input_terms** array are present in a query, they are expanded using the
     *  items listed in the **expanded_terms** array.
     */
    expansions: Expansion[];
  }

  /** Object containing field details. */
  export interface Field {
    /** The name of the field. */
    field?: string;
    /** The type of the field. */
    type?: string;
  }

  /** Font matching configuration. */
  export interface FontSetting {
    /** The HTML heading level that any content with the matching font is converted to. */
    level?: number;
    /** The minimum size of the font to match. */
    min_size?: number;
    /** The maximum size of the font to match. */
    max_size?: number;
    /** When `true`, the font is matched if it is bold. */
    bold?: boolean;
    /** When `true`, the font is matched if it is italic. */
    italic?: boolean;
    /** The name of the font. */
    name?: string;
  }

  /** Object describing a specific gateway. */
  export interface Gateway {
    /** The gateway ID of the gateway. */
    gateway_id?: string;
    /** The user defined name of the gateway. */
    name?: string;
    /** The current status of the gateway. `connected` means the gateway is connected to the remotly installed
     *  gateway. `idle` means this gateway is not currently in use.
     */
    status?: string;
    /** The generated **token** for this gateway. The value of this field is used when configuring the remotly
     *  installed gateway.
     */
    token?: string;
    /** The generated **token_id** for this gateway. The value of this field is used when configuring the remotly
     *  installed gateway.
     */
    token_id?: string;
  }

  /** Gatway deletion confirmation. */
  export interface GatewayDelete {
    /** The gateway ID of the deleted gateway. */
    gateway_id?: string;
    /** The status of the request. */
    status?: string;
  }

  /** Object containing gateways array. */
  export interface GatewayList {
    /** Array of configured gateway connections. */
    gateways?: Gateway[];
  }

  /** A list of HTML conversion settings. */
  export interface HtmlSettings {
    /** Array of HTML tags that are excluded completely. */
    exclude_tags_completely?: string[];
    /** Array of HTML tags which are excluded but still retain content. */
    exclude_tags_keep_content?: string[];
    /** Object containing an array of XPaths. */
    keep_content?: XPathPatterns;
    /** Object containing an array of XPaths. */
    exclude_content?: XPathPatterns;
    /** An array of HTML tag attributes to keep in the converted document. */
    keep_tag_attributes?: string[];
    /** Array of HTML tag attributes to exclude. */
    exclude_tag_attributes?: string[];
  }

  /** Details about the resource usage and capacity of the environment. */
  export interface IndexCapacity {
    /** Summary of the document usage statistics for the environment. */
    documents?: EnvironmentDocuments;
    /** Summary of the disk usage statistics for the environment. */
    disk_usage?: DiskUsage;
    /** Summary of the collection usage in the environment. */
    collections?: CollectionUsage;
  }

  /** The list of fetched fields. The fields are returned using a fully qualified name format, however, the format differs slightly from that used by the query operations. * Fields which contain nested JSON objects are assigned a type of "nested". * Fields which belong to a nested object are prefixed with `.properties` (for example, `warnings.properties.severity` means that the `warnings` object has a property called `severity`). * Fields returned from the News collection are prefixed with `v{N}-fullnews-t3-{YEAR}.mappings` (for example, `v5-fullnews-t3-2016.mappings.text.properties.author`). */
  export interface ListCollectionFieldsResponse {
    /** An array containing information about each field in the collections. */
    fields?: Field[];
  }

  /** Response object containing an array of collection details. */
  export interface ListCollectionsResponse {
    /** An array containing information about each collection in the environment. */
    collections?: Collection[];
  }

  /** Object containing an array of available configurations. */
  export interface ListConfigurationsResponse {
    /** An array of configurations that are available for the service instance. */
    configurations?: Configuration[];
  }

  /** Response object containing an array of configured environments. */
  export interface ListEnvironmentsResponse {
    /** An array of [environments] that are available for the service instance. */
    environments?: Environment[];
  }

  /** Object containing results that match the requested **logs** query. */
  export interface LogQueryResponse {
    /** Number of matching results. */
    matching_results?: number;
    /** Array of log query response results. */
    results?: LogQueryResponseResult[];
  }

  /** Individual result object for a **logs** query. Each object represents either a query to a Discovery collection or an event that is associated with a query. */
  export interface LogQueryResponseResult {
    /** The environment ID that is associated with this log entry. */
    environment_id?: string;
    /** The **customer_id** label that was specified in the header of the query or event API call that corresponds
     *  to this log entry.
     */
    customer_id?: string;
    /** The type of log entry returned.
     *
     *   **query** indicates that the log represents the results of a call to the single collection **query** method.
     *
     *   **event** indicates that the log represents  a call to the **events** API.
     */
    document_type?: string;
    /** The value of the **natural_language_query** query parameter that was used to create these results. Only
     *  returned with logs of type **query**.
     *
     *  **Note:** Other query parameters (such as **filter** or **deduplicate**) might  have been used with this query,
     *  but are not recorded.
     */
    natural_language_query?: string;
    /** Object containing result information that was returned by the query used to create this log entry. Only
     *  returned with logs of type `query`.
     */
    document_results?: LogQueryResponseResultDocuments;
    /** Date that the log result was created. Returned in `YYYY-MM-DDThh:mm:ssZ` format. */
    created_timestamp?: string;
    /** Date specified by the user when recording an event. Returned in `YYYY-MM-DDThh:mm:ssZ` format. Only returned
     *  with logs of type **event**.
     */
    client_timestamp?: string;
    /** Identifier that corresponds to the **natural_language_query** string used in the original or associated
     *  query. All **event** and **query** log entries that have the same original **natural_language_query** string
     *  also have them same **query_id**. This field can be used to recall all **event** and **query** log results that
     *  have the same original query (**event** logs do not contain the original **natural_language_query** field).
     */
    query_id?: string;
    /** Unique identifier (within a 24-hour period) that identifies a single `query` log and any `event` logs that
     *  were created for it.
     *
     *  **Note:** If the exact same query is run at the exact same time on different days, the **session_token** for
     *  those queries might be identical. However, the **created_timestamp** differs.
     *
     *  **Note:** Session tokens are case sensitive. To avoid matching on session tokens that are identical except for
     *  case, use the exact match operator (`::`) when you query for a specific session token.
     */
    session_token?: string;
    /** The collection ID of the document associated with this event. Only returned with logs of type `event`. */
    collection_id?: string;
    /** The original display rank of the document associated with this event. Only returned with logs of type
     *  `event`.
     */
    display_rank?: number;
    /** The document ID of the document associated with this event. Only returned with logs of type `event`. */
    document_id?: string;
    /** The type of event that this object respresents. Possible values are
     *
     *   -  `query` the log of a query to a collection
     *
     *   -  `click` the result of a call to the **events** endpoint.
     */
    event_type?: string;
    /** The type of result that this **event** is associated with. Only returned with logs of type `event`. */
    result_type?: string;
  }

  /** Object containing result information that was returned by the query used to create this log entry. Only returned with logs of type `query`. */
  export interface LogQueryResponseResultDocuments {
    /** Array of log query response results. */
    results?: LogQueryResponseResultDocumentsResult[];
    /** The number of results returned in the query associate with this log. */
    count?: number;
  }

  /** Each object in the **results** array corresponds to an individual document returned by the original query. */
  export interface LogQueryResponseResultDocumentsResult {
    /** The result rank of this document. A position of `1` indicates that it was the first returned result. */
    position?: number;
    /** The **document_id** of the document that this result represents. */
    document_id?: string;
    /** The raw score of this result. A higher score indicates a greater match to the query parameters. */
    score?: number;
    /** The confidence score of the result's analysis. A higher score indicating greater confidence. */
    confidence?: number;
    /** The **collection_id** of the document represented by this result. */
    collection_id?: string;
  }

  /** An aggregation analyzing log information for queries and events. */
  export interface MetricAggregation {
    /** The measurement interval for this metric. Metric intervals are always 1 day (`1d`). */
    interval?: string;
    /** The event type associated with this metric result. This field, when present, will always be `click`. */
    event_type?: string;
    /** Array of metric aggregation query results. */
    results?: MetricAggregationResult[];
  }

  /** Aggregation result data for the requested metric. */
  export interface MetricAggregationResult {
    /** Date in string form representing the start of this interval. */
    key_as_string?: string;
    /** Unix epoch time equivalent of the **key_as_string**, that represents the start of this interval. */
    key?: number;
    /** Number of matching results. */
    matching_results?: number;
    /** The number of queries with associated events divided by the total number of queries for the interval. Only
     *  returned with **event_rate** metrics.
     */
    event_rate?: number;
  }

  /** The response generated from a call to a **metrics** method. */
  export interface MetricResponse {
    /** Array of metric aggregations. */
    aggregations?: MetricAggregation[];
  }

  /** An aggregation analyzing log information for queries and events. */
  export interface MetricTokenAggregation {
    /** The event type associated with this metric result. This field, when present, will always be `click`. */
    event_type?: string;
    /** Array of results for the metric token aggregation. */
    results?: MetricTokenAggregationResult[];
  }

  /** Aggregation result data for the requested metric. */
  export interface MetricTokenAggregationResult {
    /** The content of the **natural_language_query** parameter used in the query that this result represents. */
    key?: string;
    /** Number of matching results. */
    matching_results?: number;
    /** The number of queries with associated events divided by the total number of queries currently stored
     *  (queries and events are stored in the log for 30 days).
     */
    event_rate?: number;
  }

  /** The response generated from a call to a **metrics** method that evaluates tokens. */
  export interface MetricTokenResponse {
    /** Array of metric token aggregations. */
    aggregations?: MetricTokenAggregation[];
  }

  /** An object that indicates the Categories enrichment will be applied to the specified field. */
  export interface NluEnrichmentCategories {
    /** NluEnrichmentCategories accepts additional properties. */
    [propName: string]: any;
  }

  /** An object specifiying the concepts enrichment and related parameters. */
  export interface NluEnrichmentConcepts {
    /** The maximum number of concepts enrichments to extact from each instance of the specified field. */
    limit?: number;
  }

  /** An object specifying the emotion detection enrichment and related parameters. */
  export interface NluEnrichmentEmotion {
    /** When `true`, emotion detection is performed on the entire field. */
    document?: boolean;
    /** A comma-separated list of target strings that will have any associated emotions detected. */
    targets?: string[];
  }

  /** An object speficying the Entities enrichment and related parameters. */
  export interface NluEnrichmentEntities {
    /** When `true`, sentiment analysis of entities will be performed on the specified field. */
    sentiment?: boolean;
    /** When `true`, emotion detection of entities will be performed on the specified field. */
    emotion?: boolean;
    /** The maximum number of entities to extract for each instance of the specified field. */
    limit?: number;
    /** When `true`, the number of mentions of each identified entity is recorded. The default is `false`. */
    mentions?: boolean;
    /** When `true`, the types of mentions for each idetifieid entity is recorded. The default is `false`. */
    mention_types?: boolean;
    /** When `true`, a list of sentence locations for each instance of each identified entity is recorded. The
     *  default is `false`.
     */
    sentence_locations?: boolean;
    /** The enrichement model to use with entity extraction. May be a custom model provided by Watson Knowledge
     *  Studio, or the default public model `alchemy`.
     */
    model?: string;
  }

  /** Object containing Natural Language Understanding features to be used. */
  export interface NluEnrichmentFeatures {
    /** An object specifying the Keyword enrichment and related parameters. */
    keywords?: NluEnrichmentKeywords;
    /** An object speficying the Entities enrichment and related parameters. */
    entities?: NluEnrichmentEntities;
    /** An object specifying the sentiment extraction enrichment and related parameters. */
    sentiment?: NluEnrichmentSentiment;
    /** An object specifying the emotion detection enrichment and related parameters. */
    emotion?: NluEnrichmentEmotion;
    /** An object that indicates the Categories enrichment will be applied to the specified field. */
    categories?: NluEnrichmentCategories;
    /** An object specifiying the semantic roles enrichment and related parameters. */
    semantic_roles?: NluEnrichmentSemanticRoles;
    /** An object specifying the relations enrichment and related parameters. */
    relations?: NluEnrichmentRelations;
    /** An object specifiying the concepts enrichment and related parameters. */
    concepts?: NluEnrichmentConcepts;
  }

  /** An object specifying the Keyword enrichment and related parameters. */
  export interface NluEnrichmentKeywords {
    /** When `true`, sentiment analysis of keywords will be performed on the specified field. */
    sentiment?: boolean;
    /** When `true`, emotion detection of keywords will be performed on the specified field. */
    emotion?: boolean;
    /** The maximum number of keywords to extract for each instance of the specified field. */
    limit?: number;
  }

  /** An object specifying the relations enrichment and related parameters. */
  export interface NluEnrichmentRelations {
    /** *For use with `natural_language_understanding` enrichments only.* The enrichement model to use with
     *  relationship extraction. May be a custom model provided by Watson Knowledge Studio, the default public model
     *  is`en-news`.
     */
    model?: string;
  }

  /** An object specifiying the semantic roles enrichment and related parameters. */
  export interface NluEnrichmentSemanticRoles {
    /** When `true`, entities are extracted from the identified sentence parts. */
    entities?: boolean;
    /** When `true`, keywords are extracted from the identified sentence parts. */
    keywords?: boolean;
    /** The maximum number of semantic roles enrichments to extact from each instance of the specified field. */
    limit?: number;
  }

  /** An object specifying the sentiment extraction enrichment and related parameters. */
  export interface NluEnrichmentSentiment {
    /** When `true`, sentiment analysis is performed on the entire field. */
    document?: boolean;
    /** A comma-separated list of target strings that will have any associated sentiment analyzed. */
    targets?: string[];
  }

  /** Object containing normalization operations. */
  export interface NormalizationOperation {
    /** Identifies what type of operation to perform.
     *
     *  **copy** - Copies the value of the **source_field** to the **destination_field** field. If the
     *  **destination_field** already exists, then the value of the **source_field** overwrites the original value of
     *  the **destination_field**.
     *
     *  **move** - Renames (moves) the **source_field** to the **destination_field**. If the **destination_field**
     *  already exists, then the value of the **source_field** overwrites the original value of the
     *  **destination_field**. Rename is identical to copy, except that the **source_field** is removed after the value
     *  has been copied to the **destination_field** (it is the same as a _copy_ followed by a _remove_).
     *
     *  **merge** - Merges the value of the **source_field** with the value of the **destination_field**. The
     *  **destination_field** is converted into an array if it is not already an array, and the value of the
     *  **source_field** is appended to the array. This operation removes the **source_field** after the merge. If the
     *  **source_field** does not exist in the current document, then the **destination_field** is still converted into
     *  an array (if it is not an array already). This conversion ensures the type for **destination_field** is
     *  consistent across all documents.
     *
     *  **remove** - Deletes the **source_field** field. The **destination_field** is ignored for this operation.
     *
     *  **remove_nulls** - Removes all nested null (blank) field values from the ingested document. **source_field** and
     *  **destination_field** are ignored by this operation because _remove_nulls_ operates on the entire ingested
     *  document. Typically, **remove_nulls** is invoked as the last normalization operation (if it is invoked at all,
     *  it can be time-expensive).
     */
    operation?: string;
    /** The source field for the operation. */
    source_field?: string;
    /** The destination field for the operation. */
    destination_field?: string;
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
    /** Unique identifier of the query used for relevance training. */
    query_id?: string;
    /** Severity level of the notice. */
    severity?: string;
    /** Ingestion or training step in which the notice occurred. Typical step values include: `classify_elements`,
     *  `smartDocumentUnderstanding`, `ingestion`, `indexing`, `convert`. **Note:** This is not a complete list, other
     *  values might be returned.
     */
    step?: string;
    /** The description of the notice. */
    description?: string;
  }

  /** Object containing heading detection conversion settings for PDF documents. */
  export interface PdfHeadingDetection {
    /** Array of font matching configurations. */
    fonts?: FontSetting[];
  }

  /** A list of PDF conversion settings. */
  export interface PdfSettings {
    /** Object containing heading detection conversion settings for PDF documents. */
    heading?: PdfHeadingDetection;
  }

  /** An aggregation produced by  Discovery to analyze the input provided. */
  export interface QueryAggregation {
    /** The type of aggregation command used. For example: term, filter, max, min, etc. */
    type?: string;
    /** Array of aggregation results. */
    results?: AggregationResult[];
    /** Number of matching results. */
    matching_results?: number;
    /** Aggregations returned by Discovery. */
    aggregations?: QueryAggregation[];
  }

  /** Object containing notice query results. */
  export interface QueryNoticesResponse {
    /** The number of matching results. */
    matching_results?: number;
    /** Array of document results that match the query. */
    results?: QueryNoticesResult[];
    /** Array of aggregation results that match the query. */
    aggregations?: QueryAggregation[];
    /** Array of passage results that match the query. */
    passages?: QueryPassages[];
    /** The number of duplicates removed from this notices query. */
    duplicates_removed?: number;
  }

  /** Query result object. */
  export interface QueryNoticesResult {
    /** The unique identifier of the document. */
    id?: string;
    /** Metadata of the document. */
    metadata?: JsonObject;
    /** The collection ID of the collection containing the document for this result. */
    collection_id?: string;
    /** Metadata of a query result. */
    result_metadata?: QueryResultMetadata;
    /** The internal status code returned by the ingestion subsystem indicating the overall result of ingesting the
     *  source document.
     */
    code?: number;
    /** Name of the original source file (if available). */
    filename?: string;
    /** The type of the original source file. */
    file_type?: string;
    /** The SHA-1 hash of the original source file (formatted as a hexadecimal string). */
    sha1?: string;
    /** Array of notices for the document. */
    notices?: Notice[];
    /** QueryNoticesResult accepts additional properties. */
    [propName: string]: any;
  }

  /** A passage query result. */
  export interface QueryPassages {
    /** The unique identifier of the document from which the passage has been extracted. */
    document_id?: string;
    /** The confidence score of the passages's analysis. A higher score indicates greater confidence. */
    passage_score?: number;
    /** The content of the extracted passage. */
    passage_text?: string;
    /** The position of the first character of the extracted passage in the originating field. */
    start_offset?: number;
    /** The position of the last character of the extracted passage in the originating field. */
    end_offset?: number;
    /** The label of the field from which the passage has been extracted. */
    field?: string;
  }

  /** A response containing the documents and aggregations for the query. */
  export interface QueryResponse {
    /** The number of matching results for the query. */
    matching_results?: number;
    /** Array of document results for the query. */
    results?: QueryResult[];
    /** Array of aggregation results for the query. */
    aggregations?: QueryAggregation[];
    /** Array of passage results for the query. */
    passages?: QueryPassages[];
    /** The number of duplicate results removed. */
    duplicates_removed?: number;
    /** The session token for this query. The session token can be used to add events associated with this query to
     *  the query and event log.
     *
     *  **Important:** Session tokens are case sensitive.
     */
    session_token?: string;
    /** An object contain retrieval type information. */
    retrieval_details?: RetrievalDetails;
    /** The suggestions for a misspelled natural language query. */
    suggested_query?: string;
  }

  /** Query result object. */
  export interface QueryResult {
    /** The unique identifier of the document. */
    id?: string;
    /** Metadata of the document. */
    metadata?: JsonObject;
    /** The collection ID of the collection containing the document for this result. */
    collection_id?: string;
    /** Metadata of a query result. */
    result_metadata?: QueryResultMetadata;
    /** QueryResult accepts additional properties. */
    [propName: string]: any;
  }

  /** Metadata of a query result. */
  export interface QueryResultMetadata {
    /** An unbounded measure of the relevance of a particular result, dependent on the query and matching document.
     *  A higher score indicates a greater match to the query parameters.
     */
    score: number;
    /** The confidence score for the given result. Calculated based on how relevant the result is estimated to be.
     *  confidence can range from `0.0` to `1.0`. The higher the number, the more relevant the document. The
     *  `confidence` value for a result was calculated using the model specified in the `document_retrieval_strategy`
     *  field of the result set.
     */
    confidence?: number;
  }

  /** An object contain retrieval type information. */
  export interface RetrievalDetails {
    /** Indentifies the document retrieval strategy used for this query. `relevancy_training` indicates that the
     *  results were returned using a relevancy trained model. `continuous_relevancy_training` indicates that the
     *  results were returned using the continuous relevancy training model created by result feedback analysis.
     *  `untrained` means the results were returned using the standard untrained model.
     *
     *   **Note**: In the event of trained collections being queried, but the trained model is not used to return
     *  results, the **document_retrieval_strategy** will be listed as `untrained`.
     */
    document_retrieval_strategy?: string;
  }

  /** Object containing smart document understanding information for this collection. */
  export interface SduStatus {
    /** When `true`, smart document understanding conversion is enabled for this collection. All collections created
     *  with a version date after `2019-04-30` have smart document understanding enabled. If `false`, documents added to
     *  the collection are converted using the **conversion** settings specified in the configuration associated with
     *  the collection.
     */
    enabled?: boolean;
    /** The total number of pages annotated using smart document understanding in this collection. */
    total_annotated_pages?: number;
    /** The current number of pages that can be used for training smart document understanding. The `total_pages`
     *  number is calculated as the total number of pages identified from the documents listed in the
     *  **total_documents** field.
     */
    total_pages?: number;
    /** The total number of documents in this collection that can be used to train smart document understanding. For
     *  **lite** plan collections, the maximum is the first 20 uploaded documents (not including HTML or JSON
     *  documents). For other plans, the maximum is the first 40 uploaded documents (not including HTML or JSON
     *  documents). When the maximum is reached, additional documents uploaded to the collection are not considered for
     *  training smart document understanding.
     */
    total_documents?: number;
    /** Information about custom smart document understanding fields that exist in this collection. */
    custom_fields?: SduStatusCustomFields;
  }

  /** Information about custom smart document understanding fields that exist in this collection. */
  export interface SduStatusCustomFields {
    /** The number of custom fields defined for this collection. */
    defined?: number;
    /** The maximum number of custom fields that are allowed in this collection. */
    maximum_allowed?: number;
  }

  /** Information about the Continuous Relevancy Training for this environment. */
  export interface SearchStatus {
    /** Current scope of the training. Always returned as `environment`. */
    scope?: string;
    /** The current status of Continuous Relevancy Training for this environment. */
    status?: string;
    /** Long description of the current Continuous Relevancy Training status. */
    status_description?: string;
    /** The date stamp of the most recent completed training for this environment. */
    last_trained?: string;
  }

  /** A list of Document Segmentation settings. */
  export interface SegmentSettings {
    /** Enables/disables the Document Segmentation feature. */
    enabled?: boolean;
    /** Defines the heading level that splits into document segments. Valid values are h1, h2, h3, h4, h5, h6. The
     *  content of the header field that the segmentation splits at is used as the **title** field for that segmented
     *  result. Only valid if used with a collection that has **enabled** set to `false` in the
     *  **smart_document_understanding** object.
     */
    selector_tags?: string[];
    /** Defines the annotated smart document understanding fields that the document is split on. The content of the
     *  annotated field that the segmentation splits at is used as the **title** field for that segmented result. For
     *  example, if the field `sub-title` is specified, when a document is uploaded each time the smart documement
     *  understanding conversion encounters a field of type `sub-title` the document is split at that point and the
     *  content of the field used as the title of the remaining content. Thnis split is performed for all instances of
     *  the listed fields in the uploaded document. Only valid if used with a collection that has **enabled** set to
     *  `true` in the **smart_document_understanding** object.
     */
    annotated_fields?: string[];
  }

  /** Object containing source parameters for the configuration. */
  export interface Source {
    /** The type of source to connect to.
     *  -  `box` indicates the configuration is to connect an instance of Enterprise Box.
     *  -  `salesforce` indicates the configuration is to connect to Salesforce.
     *  -  `sharepoint` indicates the configuration is to connect to Microsoft SharePoint Online.
     *  -  `web_crawl` indicates the configuration is to perform a web page crawl.
     *  -  `cloud_object_storage` indicates the configuration is to connect to a cloud object store.
     */
    type?: string;
    /** The **credential_id** of the credentials to use to connect to the source. Credentials are defined using the
     *  **credentials** method. The **source_type** of the credentials used must match the **type** field specified in
     *  this object.
     */
    credential_id?: string;
    /** Object containing the schedule information for the source. */
    schedule?: SourceSchedule;
    /** The **options** object defines which items to crawl from the source system. */
    options?: SourceOptions;
  }

  /** The **options** object defines which items to crawl from the source system. */
  export interface SourceOptions {
    /** Array of folders to crawl from the Box source. Only valid, and required, when the **type** field of the
     *  **source** object is set to `box`.
     */
    folders?: SourceOptionsFolder[];
    /** Array of Salesforce document object types to crawl from the Salesforce source. Only valid, and required,
     *  when the **type** field of the **source** object is set to `salesforce`.
     */
    objects?: SourceOptionsObject[];
    /** Array of Microsoft SharePointoint Online site collections to crawl from the SharePoint source. Only valid
     *  and required when the **type** field of the **source** object is set to `sharepoint`.
     */
    site_collections?: SourceOptionsSiteColl[];
    /** Array of Web page URLs to begin crawling the web from. Only valid and required when the **type** field of
     *  the **source** object is set to `web_crawl`.
     */
    urls?: SourceOptionsWebCrawl[];
    /** Array of cloud object store buckets to begin crawling. Only valid and required when the **type** field of
     *  the **source** object is set to `cloud_object_store`, and the **crawl_all_buckets** field is `false` or not
     *  specified.
     */
    buckets?: SourceOptionsBuckets[];
    /** When `true`, all buckets in the specified cloud object store are crawled. If set to `true`, the **buckets**
     *  array must not be specified.
     */
    crawl_all_buckets?: boolean;
  }

  /** Object defining a cloud object store bucket to crawl. */
  export interface SourceOptionsBuckets {
    /** The name of the cloud object store bucket to crawl. */
    name: string;
    /** The number of documents to crawl from this cloud object store bucket. If not specified, all documents in the
     *  bucket are crawled.
     */
    limit?: number;
  }

  /** Object that defines a box folder to crawl with this configuration. */
  export interface SourceOptionsFolder {
    /** The Box user ID of the user who owns the folder to crawl. */
    owner_user_id: string;
    /** The Box folder ID of the folder to crawl. */
    folder_id: string;
    /** The maximum number of documents to crawl for this folder. By default, all documents in the folder are
     *  crawled.
     */
    limit?: number;
  }

  /** Object that defines a Salesforce document object type crawl with this configuration. */
  export interface SourceOptionsObject {
    /** The name of the Salesforce document object to crawl. For example, `case`. */
    name: string;
    /** The maximum number of documents to crawl for this document object. By default, all documents in the document
     *  object are crawled.
     */
    limit?: number;
  }

  /** Object that defines a Microsoft SharePoint site collection to crawl with this configuration. */
  export interface SourceOptionsSiteColl {
    /** The Microsoft SharePoint Online site collection path to crawl. The path must be be relative to the
     *  **organization_url** that was specified in the credentials associated with this source configuration.
     */
    site_collection_path: string;
    /** The maximum number of documents to crawl for this site collection. By default, all documents in the site
     *  collection are crawled.
     */
    limit?: number;
  }

  /** Object defining which URL to crawl and how to crawl it. */
  export interface SourceOptionsWebCrawl {
    /** The starting URL to crawl. */
    url: string;
    /** When `true`, crawls of the specified URL are limited to the host part of the **url** field. */
    limit_to_starting_hosts?: boolean;
    /** The number of concurrent URLs to fetch. `gentle` means one URL is fetched at a time with a delay between
     *  each call. `normal` means as many as two URLs are fectched concurrently with a short delay between fetch calls.
     *  `aggressive` means that up to ten URLs are fetched concurrently with a short delay between fetch calls.
     */
    crawl_speed?: string;
    /** When `true`, allows the crawl to interact with HTTPS sites with SSL certificates with untrusted signers. */
    allow_untrusted_certificate?: boolean;
    /** The maximum number of hops to make from the initial URL. When a page is crawled each link on that page will
     *  also be crawled if it is within the **maximum_hops** from the initial URL. The first page crawled is 0 hops,
     *  each link crawled from the first page is 1 hop, each link crawled from those pages is 2 hops, and so on.
     */
    maximum_hops?: number;
    /** The maximum milliseconds to wait for a response from the web server. */
    request_timeout?: number;
    /** When `true`, the crawler will ignore any `robots.txt` encountered by the crawler. This should only ever be
     *  done when crawling a web site the user owns. This must be be set to `true` when a **gateway_id** is specied in
     *  the **credentials**.
     */
    override_robots_txt?: boolean;
    /** Array of URL's to be excluded while crawling. The crawler will not follow links which contains this string.
     *  For example, listing `https://ibm.com/watson` also excludes `https://ibm.com/watson/discovery`.
     */
    blacklist?: string[];
  }

  /** Object containing the schedule information for the source. */
  export interface SourceSchedule {
    /** When `true`, the source is re-crawled based on the **frequency** field in this object. When `false` the
     *  source is not re-crawled; When `false` and connecting to Salesforce the source is crawled annually.
     */
    enabled?: boolean;
    /** The time zone to base source crawl times on. Possible values correspond to the IANA (Internet Assigned
     *  Numbers Authority) time zones list.
     */
    time_zone?: string;
    /** The crawl schedule in the specified **time_zone**.
     *
     *  -  `five_minutes`: Runs every five minutes.
     *  -  `hourly`: Runs every hour.
     *  -  `daily`: Runs every day between 00:00 and 06:00.
     *  -  `weekly`: Runs every week on Sunday between 00:00 and 06:00.
     *  -  `monthly`: Runs the on the first Sunday of every month between 00:00 and 06:00.
     */
    frequency?: string;
  }

  /** Object containing source crawl status information. */
  export interface SourceStatus {
    /** The current status of the source crawl for this collection. This field returns `not_configured` if the
     *  default configuration for this source does not have a **source** object defined.
     *
     *  -  `running` indicates that a crawl to fetch more documents is in progress.
     *  -  `complete` indicates that the crawl has completed with no errors.
     *  -  `queued` indicates that the crawl has been paused by the system and will automatically restart when possible.
     *  -  `unknown` indicates that an unidentified error has occured in the service.
     */
    status?: string;
    /** Date in `RFC 3339` format indicating the time of the next crawl attempt. */
    next_crawl?: string;
  }

  /** An object defining a single tokenizaion rule. */
  export interface TokenDictRule {
    /** The string to tokenize. */
    text: string;
    /** Array of tokens that the `text` field is split into when found. */
    tokens: string[];
    /** Array of tokens that represent the content of the `text` field in an alternate character set. */
    readings?: string[];
    /** The part of speech that the `text` string belongs to. For example `noun`. Custom parts of speech can be
     *  specified.
     */
    part_of_speech: string;
  }

  /** Object describing the current status of the wordlist. */
  export interface TokenDictStatusResponse {
    /** Current wordlist status for the specified collection. */
    status?: string;
    /** The type for this wordlist. Can be `tokenization_dictionary` or `stopwords`. */
    type?: string;
  }

  /** Top hit information for this query. */
  export interface TopHitsResults {
    /** Number of matching results. */
    matching_results?: number;
    /** Top results returned by the aggregation. */
    hits?: QueryResult[];
  }

  /** Training information for a specific collection. */
  export interface TrainingDataSet {
    /** The environment id associated with this training data set. */
    environment_id?: string;
    /** The collection id associated with this training data set. */
    collection_id?: string;
    /** Array of training queries. */
    queries?: TrainingQuery[];
  }

  /** Training example details. */
  export interface TrainingExample {
    /** The document ID associated with this training example. */
    document_id?: string;
    /** The cross reference associated with this training example. */
    cross_reference?: string;
    /** The relevance of the training example. */
    relevance?: number;
  }

  /** Object containing an array of training examples. */
  export interface TrainingExampleList {
    /** Array of training examples. */
    examples?: TrainingExample[];
  }

  /** Training query details. */
  export interface TrainingQuery {
    /** The query ID associated with the training query. */
    query_id?: string;
    /** The natural text query for the training query. */
    natural_language_query?: string;
    /** The filter used on the collection before the **natural_language_query** is applied. */
    filter?: string;
    /** Array of training examples. */
    examples?: TrainingExample[];
  }

  /** Training status details. */
  export interface TrainingStatus {
    /** The total number of training examples uploaded to this collection. */
    total_examples?: number;
    /** When `true`, the collection has been successfully trained. */
    available?: boolean;
    /** When `true`, the collection is currently processing training. */
    processing?: boolean;
    /** When `true`, the collection has a sufficent amount of queries added for training to occur. */
    minimum_queries_added?: boolean;
    /** When `true`, the collection has a sufficent amount of examples added for training to occur. */
    minimum_examples_added?: boolean;
    /** When `true`, the collection has a sufficent amount of diversity in labeled results for training to occur. */
    sufficient_label_diversity?: boolean;
    /** The number of notices associated with this data set. */
    notices?: number;
    /** The timestamp of when the collection was successfully trained. */
    successfully_trained?: string;
    /** The timestamp of when the data was uploaded. */
    data_updated?: string;
  }

  /** Object containing heading detection conversion settings for Microsoft Word documents. */
  export interface WordHeadingDetection {
    /** Array of font matching configurations. */
    fonts?: FontSetting[];
    /** Array of Microsoft Word styles to convert. */
    styles?: WordStyle[];
  }

  /** A list of Word conversion settings. */
  export interface WordSettings {
    /** Object containing heading detection conversion settings for Microsoft Word documents. */
    heading?: WordHeadingDetection;
  }

  /** Microsoft Word styles to convert into a specified HTML head level. */
  export interface WordStyle {
    /** HTML head level that content matching this style is tagged with. */
    level?: number;
    /** Array of word style names to convert. */
    names?: string[];
  }

  /** Object containing an array of XPaths. */
  export interface XPathPatterns {
    /** An array to XPaths. */
    xpaths?: string[];
  }

  /** Calculation. */
  export interface Calculation extends QueryAggregation {
    /** The field where the aggregation is located in the document. */
    field?: string;
    /** Value of the aggregation. */
    value?: number;
  }

  /** Filter. */
  export interface Filter extends QueryAggregation {
    /** The match the aggregated results queried for. */
    match?: string;
  }

  /** Histogram. */
  export interface Histogram extends QueryAggregation {
    /** The field where the aggregation is located in the document. */
    field?: string;
    /** Interval of the aggregation. (For 'histogram' type). */
    interval?: number;
  }

  /** Nested. */
  export interface Nested extends QueryAggregation {
    /** The area of the results the aggregation was restricted to. */
    path?: string;
  }

  /** Term. */
  export interface Term extends QueryAggregation {
    /** The field where the aggregation is located in the document. */
    field?: string;
    /** The number of terms identified. */
    count?: number;
  }

  /** Timeslice. */
  export interface Timeslice extends QueryAggregation {
    /** The field where the aggregation is located in the document. */
    field?: string;
    /** Interval of the aggregation. Valid date interval values are second/seconds minute/minutes, hour/hours,
     *  day/days, week/weeks, month/months, and year/years.
     */
    interval?: string;
    /** Used to indicate that anomaly detection should be performed. Anomaly detection is used to locate unusual
     *  datapoints within a time series.
     */
    anomaly?: boolean;
  }

  /** TopHits. */
  export interface TopHits extends QueryAggregation {
    /** Number of top hits returned by the aggregation. */
    size?: number;
    hits?: TopHitsResults;
  }

}

export = DiscoveryV1;
