/**
 * (C) Copyright IBM Corp. 2018, 2022.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const DiscoveryV1 = require('../../dist/discovery/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const discoveryServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.discovery.watson.cloud.ibm.com',
  version: 'testString',
};

const discoveryService = new DiscoveryV1(discoveryServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(discoveryService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    version: 'testString',
  };
});

describe('DiscoveryV1', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DiscoveryV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DiscoveryV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DiscoveryV1.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DiscoveryV1(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DiscoveryV1(options);

      expect(testInstance.baseOptions.serviceName).toBe(DiscoveryV1.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DiscoveryV1(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new DiscoveryV1(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new DiscoveryV1(discoveryServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(discoveryServiceOptions.version);
      });
    });
  });
  describe('createEnvironment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createEnvironment
        const name = 'testString';
        const description = 'testString';
        const size = 'LT';
        const params = {
          name: name,
          description: description,
          size: size,
        };

        const createEnvironmentResult = discoveryService.createEnvironment(params);

        // all methods should return a Promise
        expectToBePromise(createEnvironmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.size).toEqual(size);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createEnvironment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.createEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createEnvironmentPromise = discoveryService.createEnvironment();
        expectToBePromise(createEnvironmentPromise);

        createEnvironmentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listEnvironments', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listEnvironments
        const name = 'testString';
        const params = {
          name: name,
        };

        const listEnvironmentsResult = discoveryService.listEnvironments(params);

        // all methods should return a Promise
        expectToBePromise(listEnvironmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.name).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listEnvironments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        discoveryService.listEnvironments({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getEnvironment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getEnvironment
        const environmentId = 'testString';
        const params = {
          environmentId: environmentId,
        };

        const getEnvironmentResult = discoveryService.getEnvironment(params);

        // all methods should return a Promise
        expectToBePromise(getEnvironmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getEnvironment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getEnvironmentPromise = discoveryService.getEnvironment();
        expectToBePromise(getEnvironmentPromise);

        getEnvironmentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateEnvironment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateEnvironment
        const environmentId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const size = 'S';
        const params = {
          environmentId: environmentId,
          name: name,
          description: description,
          size: size,
        };

        const updateEnvironmentResult = discoveryService.updateEnvironment(params);

        // all methods should return a Promise
        expectToBePromise(updateEnvironmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.size).toEqual(size);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateEnvironment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.updateEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateEnvironmentPromise = discoveryService.updateEnvironment();
        expectToBePromise(updateEnvironmentPromise);

        updateEnvironmentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteEnvironment', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteEnvironment
        const environmentId = 'testString';
        const params = {
          environmentId: environmentId,
        };

        const deleteEnvironmentResult = discoveryService.deleteEnvironment(params);

        // all methods should return a Promise
        expectToBePromise(deleteEnvironmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteEnvironment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteEnvironmentPromise = discoveryService.deleteEnvironment();
        expectToBePromise(deleteEnvironmentPromise);

        deleteEnvironmentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listFields', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listFields
        const environmentId = 'testString';
        const collectionIds = ['testString'];
        const params = {
          environmentId: environmentId,
          collectionIds: collectionIds,
        };

        const listFieldsResult = discoveryService.listFields(params);

        // all methods should return a Promise
        expectToBePromise(listFieldsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/fields', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.collection_ids).toEqual(collectionIds);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionIds = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionIds,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listFields(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.listFields({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listFieldsPromise = discoveryService.listFields();
        expectToBePromise(listFieldsPromise);

        listFieldsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createConfiguration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FontSetting
      const fontSettingModel = {
        level: 38,
        min_size: 38,
        max_size: 38,
        bold: true,
        italic: true,
        name: 'testString',
      };

      // PdfHeadingDetection
      const pdfHeadingDetectionModel = {
        fonts: [fontSettingModel],
      };

      // PdfSettings
      const pdfSettingsModel = {
        heading: pdfHeadingDetectionModel,
      };

      // WordStyle
      const wordStyleModel = {
        level: 38,
        names: ['testString'],
      };

      // WordHeadingDetection
      const wordHeadingDetectionModel = {
        fonts: [fontSettingModel],
        styles: [wordStyleModel],
      };

      // WordSettings
      const wordSettingsModel = {
        heading: wordHeadingDetectionModel,
      };

      // XPathPatterns
      const xPathPatternsModel = {
        xpaths: ['testString'],
      };

      // HtmlSettings
      const htmlSettingsModel = {
        exclude_tags_completely: ['testString'],
        exclude_tags_keep_content: ['testString'],
        keep_content: xPathPatternsModel,
        exclude_content: xPathPatternsModel,
        keep_tag_attributes: ['testString'],
        exclude_tag_attributes: ['testString'],
      };

      // SegmentSettings
      const segmentSettingsModel = {
        enabled: false,
        selector_tags: ['h1', 'h2'],
        annotated_fields: ['testString'],
      };

      // NormalizationOperation
      const normalizationOperationModel = {
        operation: 'copy',
        source_field: 'testString',
        destination_field: 'testString',
      };

      // Conversions
      const conversionsModel = {
        pdf: pdfSettingsModel,
        word: wordSettingsModel,
        html: htmlSettingsModel,
        segment: segmentSettingsModel,
        json_normalizations: [normalizationOperationModel],
        image_text_recognition: true,
      };

      // NluEnrichmentKeywords
      const nluEnrichmentKeywordsModel = {
        sentiment: true,
        emotion: true,
        limit: 38,
      };

      // NluEnrichmentEntities
      const nluEnrichmentEntitiesModel = {
        sentiment: true,
        emotion: true,
        limit: 38,
        mentions: true,
        mention_types: true,
        sentence_locations: true,
        model: 'testString',
      };

      // NluEnrichmentSentiment
      const nluEnrichmentSentimentModel = {
        document: true,
        targets: ['testString'],
      };

      // NluEnrichmentEmotion
      const nluEnrichmentEmotionModel = {
        document: true,
        targets: ['testString'],
      };

      // NluEnrichmentSemanticRoles
      const nluEnrichmentSemanticRolesModel = {
        entities: true,
        keywords: true,
        limit: 38,
      };

      // NluEnrichmentRelations
      const nluEnrichmentRelationsModel = {
        model: 'testString',
      };

      // NluEnrichmentConcepts
      const nluEnrichmentConceptsModel = {
        limit: 38,
      };

      // NluEnrichmentFeatures
      const nluEnrichmentFeaturesModel = {
        keywords: nluEnrichmentKeywordsModel,
        entities: nluEnrichmentEntitiesModel,
        sentiment: nluEnrichmentSentimentModel,
        emotion: nluEnrichmentEmotionModel,
        categories: { 'key1': 'testString' },
        semantic_roles: nluEnrichmentSemanticRolesModel,
        relations: nluEnrichmentRelationsModel,
        concepts: nluEnrichmentConceptsModel,
      };

      // EnrichmentOptions
      const enrichmentOptionsModel = {
        features: nluEnrichmentFeaturesModel,
        language: 'ar',
        model: 'testString',
      };

      // Enrichment
      const enrichmentModel = {
        description: 'testString',
        destination_field: 'testString',
        source_field: 'testString',
        overwrite: false,
        enrichment: 'testString',
        ignore_downstream_errors: false,
        options: enrichmentOptionsModel,
      };

      // SourceSchedule
      const sourceScheduleModel = {
        enabled: true,
        time_zone: 'America/New_York',
        frequency: 'daily',
      };

      // SourceOptionsFolder
      const sourceOptionsFolderModel = {
        owner_user_id: 'testString',
        folder_id: 'testString',
        limit: 38,
      };

      // SourceOptionsObject
      const sourceOptionsObjectModel = {
        name: 'testString',
        limit: 38,
      };

      // SourceOptionsSiteColl
      const sourceOptionsSiteCollModel = {
        site_collection_path: 'testString',
        limit: 38,
      };

      // SourceOptionsWebCrawl
      const sourceOptionsWebCrawlModel = {
        url: 'testString',
        limit_to_starting_hosts: true,
        crawl_speed: 'normal',
        allow_untrusted_certificate: false,
        maximum_hops: 38,
        request_timeout: 38,
        override_robots_txt: false,
        blacklist: ['testString'],
      };

      // SourceOptionsBuckets
      const sourceOptionsBucketsModel = {
        name: 'testString',
        limit: 38,
      };

      // SourceOptions
      const sourceOptionsModel = {
        folders: [sourceOptionsFolderModel],
        objects: [sourceOptionsObjectModel],
        site_collections: [sourceOptionsSiteCollModel],
        urls: [sourceOptionsWebCrawlModel],
        buckets: [sourceOptionsBucketsModel],
        crawl_all_buckets: true,
      };

      // Source
      const sourceModel = {
        type: 'box',
        credential_id: 'testString',
        schedule: sourceScheduleModel,
        options: sourceOptionsModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createConfiguration
        const environmentId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const conversions = conversionsModel;
        const enrichments = [enrichmentModel];
        const normalizations = [normalizationOperationModel];
        const source = sourceModel;
        const params = {
          environmentId: environmentId,
          name: name,
          description: description,
          conversions: conversions,
          enrichments: enrichments,
          normalizations: normalizations,
          source: source,
        };

        const createConfigurationResult = discoveryService.createConfiguration(params);

        // all methods should return a Promise
        expectToBePromise(createConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/configurations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.conversions).toEqual(conversions);
        expect(mockRequestOptions.body.enrichments).toEqual(enrichments);
        expect(mockRequestOptions.body.normalizations).toEqual(normalizations);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.createConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createConfigurationPromise = discoveryService.createConfiguration();
        expectToBePromise(createConfigurationPromise);

        createConfigurationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listConfigurations', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listConfigurations
        const environmentId = 'testString';
        const name = 'testString';
        const params = {
          environmentId: environmentId,
          name: name,
        };

        const listConfigurationsResult = discoveryService.listConfigurations(params);

        // all methods should return a Promise
        expectToBePromise(listConfigurationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/configurations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listConfigurations(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.listConfigurations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listConfigurationsPromise = discoveryService.listConfigurations();
        expectToBePromise(listConfigurationsPromise);

        listConfigurationsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getConfiguration', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getConfiguration
        const environmentId = 'testString';
        const configurationId = 'testString';
        const params = {
          environmentId: environmentId,
          configurationId: configurationId,
        };

        const getConfigurationResult = discoveryService.getConfiguration(params);

        // all methods should return a Promise
        expectToBePromise(getConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/configurations/{configuration_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.configuration_id).toEqual(configurationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const configurationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          configurationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getConfigurationPromise = discoveryService.getConfiguration();
        expectToBePromise(getConfigurationPromise);

        getConfigurationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateConfiguration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FontSetting
      const fontSettingModel = {
        level: 38,
        min_size: 38,
        max_size: 38,
        bold: true,
        italic: true,
        name: 'testString',
      };

      // PdfHeadingDetection
      const pdfHeadingDetectionModel = {
        fonts: [fontSettingModel],
      };

      // PdfSettings
      const pdfSettingsModel = {
        heading: pdfHeadingDetectionModel,
      };

      // WordStyle
      const wordStyleModel = {
        level: 38,
        names: ['testString'],
      };

      // WordHeadingDetection
      const wordHeadingDetectionModel = {
        fonts: [fontSettingModel],
        styles: [wordStyleModel],
      };

      // WordSettings
      const wordSettingsModel = {
        heading: wordHeadingDetectionModel,
      };

      // XPathPatterns
      const xPathPatternsModel = {
        xpaths: ['testString'],
      };

      // HtmlSettings
      const htmlSettingsModel = {
        exclude_tags_completely: ['testString'],
        exclude_tags_keep_content: ['testString'],
        keep_content: xPathPatternsModel,
        exclude_content: xPathPatternsModel,
        keep_tag_attributes: ['testString'],
        exclude_tag_attributes: ['testString'],
      };

      // SegmentSettings
      const segmentSettingsModel = {
        enabled: false,
        selector_tags: ['h1', 'h2'],
        annotated_fields: ['testString'],
      };

      // NormalizationOperation
      const normalizationOperationModel = {
        operation: 'copy',
        source_field: 'testString',
        destination_field: 'testString',
      };

      // Conversions
      const conversionsModel = {
        pdf: pdfSettingsModel,
        word: wordSettingsModel,
        html: htmlSettingsModel,
        segment: segmentSettingsModel,
        json_normalizations: [normalizationOperationModel],
        image_text_recognition: true,
      };

      // NluEnrichmentKeywords
      const nluEnrichmentKeywordsModel = {
        sentiment: true,
        emotion: true,
        limit: 38,
      };

      // NluEnrichmentEntities
      const nluEnrichmentEntitiesModel = {
        sentiment: true,
        emotion: true,
        limit: 38,
        mentions: true,
        mention_types: true,
        sentence_locations: true,
        model: 'testString',
      };

      // NluEnrichmentSentiment
      const nluEnrichmentSentimentModel = {
        document: true,
        targets: ['testString'],
      };

      // NluEnrichmentEmotion
      const nluEnrichmentEmotionModel = {
        document: true,
        targets: ['testString'],
      };

      // NluEnrichmentSemanticRoles
      const nluEnrichmentSemanticRolesModel = {
        entities: true,
        keywords: true,
        limit: 38,
      };

      // NluEnrichmentRelations
      const nluEnrichmentRelationsModel = {
        model: 'testString',
      };

      // NluEnrichmentConcepts
      const nluEnrichmentConceptsModel = {
        limit: 38,
      };

      // NluEnrichmentFeatures
      const nluEnrichmentFeaturesModel = {
        keywords: nluEnrichmentKeywordsModel,
        entities: nluEnrichmentEntitiesModel,
        sentiment: nluEnrichmentSentimentModel,
        emotion: nluEnrichmentEmotionModel,
        categories: { 'key1': 'testString' },
        semantic_roles: nluEnrichmentSemanticRolesModel,
        relations: nluEnrichmentRelationsModel,
        concepts: nluEnrichmentConceptsModel,
      };

      // EnrichmentOptions
      const enrichmentOptionsModel = {
        features: nluEnrichmentFeaturesModel,
        language: 'ar',
        model: 'testString',
      };

      // Enrichment
      const enrichmentModel = {
        description: 'testString',
        destination_field: 'testString',
        source_field: 'testString',
        overwrite: false,
        enrichment: 'testString',
        ignore_downstream_errors: false,
        options: enrichmentOptionsModel,
      };

      // SourceSchedule
      const sourceScheduleModel = {
        enabled: true,
        time_zone: 'America/New_York',
        frequency: 'daily',
      };

      // SourceOptionsFolder
      const sourceOptionsFolderModel = {
        owner_user_id: 'testString',
        folder_id: 'testString',
        limit: 38,
      };

      // SourceOptionsObject
      const sourceOptionsObjectModel = {
        name: 'testString',
        limit: 38,
      };

      // SourceOptionsSiteColl
      const sourceOptionsSiteCollModel = {
        site_collection_path: 'testString',
        limit: 38,
      };

      // SourceOptionsWebCrawl
      const sourceOptionsWebCrawlModel = {
        url: 'testString',
        limit_to_starting_hosts: true,
        crawl_speed: 'normal',
        allow_untrusted_certificate: false,
        maximum_hops: 38,
        request_timeout: 38,
        override_robots_txt: false,
        blacklist: ['testString'],
      };

      // SourceOptionsBuckets
      const sourceOptionsBucketsModel = {
        name: 'testString',
        limit: 38,
      };

      // SourceOptions
      const sourceOptionsModel = {
        folders: [sourceOptionsFolderModel],
        objects: [sourceOptionsObjectModel],
        site_collections: [sourceOptionsSiteCollModel],
        urls: [sourceOptionsWebCrawlModel],
        buckets: [sourceOptionsBucketsModel],
        crawl_all_buckets: true,
      };

      // Source
      const sourceModel = {
        type: 'box',
        credential_id: 'testString',
        schedule: sourceScheduleModel,
        options: sourceOptionsModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateConfiguration
        const environmentId = 'testString';
        const configurationId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const conversions = conversionsModel;
        const enrichments = [enrichmentModel];
        const normalizations = [normalizationOperationModel];
        const source = sourceModel;
        const params = {
          environmentId: environmentId,
          configurationId: configurationId,
          name: name,
          description: description,
          conversions: conversions,
          enrichments: enrichments,
          normalizations: normalizations,
          source: source,
        };

        const updateConfigurationResult = discoveryService.updateConfiguration(params);

        // all methods should return a Promise
        expectToBePromise(updateConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/configurations/{configuration_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.conversions).toEqual(conversions);
        expect(mockRequestOptions.body.enrichments).toEqual(enrichments);
        expect(mockRequestOptions.body.normalizations).toEqual(normalizations);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.configuration_id).toEqual(configurationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const configurationId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          configurationId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.updateConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateConfigurationPromise = discoveryService.updateConfiguration();
        expectToBePromise(updateConfigurationPromise);

        updateConfigurationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteConfiguration', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteConfiguration
        const environmentId = 'testString';
        const configurationId = 'testString';
        const params = {
          environmentId: environmentId,
          configurationId: configurationId,
        };

        const deleteConfigurationResult = discoveryService.deleteConfiguration(params);

        // all methods should return a Promise
        expectToBePromise(deleteConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/configurations/{configuration_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.configuration_id).toEqual(configurationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const configurationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          configurationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteConfigurationPromise = discoveryService.deleteConfiguration();
        expectToBePromise(deleteConfigurationPromise);

        deleteConfigurationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createCollection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createCollection
        const environmentId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const configurationId = 'testString';
        const language = 'en';
        const params = {
          environmentId: environmentId,
          name: name,
          description: description,
          configurationId: configurationId,
          language: language,
        };

        const createCollectionResult = discoveryService.createCollection(params);

        // all methods should return a Promise
        expectToBePromise(createCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.configuration_id).toEqual(configurationId);
        expect(mockRequestOptions.body.language).toEqual(language);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.createCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createCollectionPromise = discoveryService.createCollection();
        expectToBePromise(createCollectionPromise);

        createCollectionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listCollections', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCollections
        const environmentId = 'testString';
        const name = 'testString';
        const params = {
          environmentId: environmentId,
          name: name,
        };

        const listCollectionsResult = discoveryService.listCollections(params);

        // all methods should return a Promise
        expectToBePromise(listCollectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listCollections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.listCollections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listCollectionsPromise = discoveryService.listCollections();
        expectToBePromise(listCollectionsPromise);

        listCollectionsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCollection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCollection
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const getCollectionResult = discoveryService.getCollection(params);

        // all methods should return a Promise
        expectToBePromise(getCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getCollectionPromise = discoveryService.getCollection();
        expectToBePromise(getCollectionPromise);

        getCollectionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateCollection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateCollection
        const environmentId = 'testString';
        const collectionId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const configurationId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          name: name,
          description: description,
          configurationId: configurationId,
        };

        const updateCollectionResult = discoveryService.updateCollection(params);

        // all methods should return a Promise
        expectToBePromise(updateCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.configuration_id).toEqual(configurationId);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.updateCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateCollectionPromise = discoveryService.updateCollection();
        expectToBePromise(updateCollectionPromise);

        updateCollectionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCollection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCollection
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const deleteCollectionResult = discoveryService.deleteCollection(params);

        // all methods should return a Promise
        expectToBePromise(deleteCollectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteCollectionPromise = discoveryService.deleteCollection();
        expectToBePromise(deleteCollectionPromise);

        deleteCollectionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listCollectionFields', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCollectionFields
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const listCollectionFieldsResult = discoveryService.listCollectionFields(params);

        // all methods should return a Promise
        expectToBePromise(listCollectionFieldsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/fields', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listCollectionFields(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.listCollectionFields({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listCollectionFieldsPromise = discoveryService.listCollectionFields();
        expectToBePromise(listCollectionFieldsPromise);

        listCollectionFieldsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listExpansions', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listExpansions
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const listExpansionsResult = discoveryService.listExpansions(params);

        // all methods should return a Promise
        expectToBePromise(listExpansionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/expansions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listExpansions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.listExpansions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listExpansionsPromise = discoveryService.listExpansions();
        expectToBePromise(listExpansionsPromise);

        listExpansionsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createExpansions', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Expansion
      const expansionModel = {
        input_terms: ['testString'],
        expanded_terms: ['testString'],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createExpansions
        const environmentId = 'testString';
        const collectionId = 'testString';
        const expansions = [expansionModel];
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          expansions: expansions,
        };

        const createExpansionsResult = discoveryService.createExpansions(params);

        // all methods should return a Promise
        expectToBePromise(createExpansionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/expansions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.expansions).toEqual(expansions);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const expansions = [expansionModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          expansions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createExpansions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.createExpansions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createExpansionsPromise = discoveryService.createExpansions();
        expectToBePromise(createExpansionsPromise);

        createExpansionsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteExpansions', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteExpansions
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const deleteExpansionsResult = discoveryService.deleteExpansions(params);

        // all methods should return a Promise
        expectToBePromise(deleteExpansionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/expansions', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteExpansions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteExpansions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteExpansionsPromise = discoveryService.deleteExpansions();
        expectToBePromise(deleteExpansionsPromise);

        deleteExpansionsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getTokenizationDictionaryStatus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getTokenizationDictionaryStatus
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const getTokenizationDictionaryStatusResult = discoveryService.getTokenizationDictionaryStatus(params);

        // all methods should return a Promise
        expectToBePromise(getTokenizationDictionaryStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getTokenizationDictionaryStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getTokenizationDictionaryStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getTokenizationDictionaryStatusPromise = discoveryService.getTokenizationDictionaryStatus();
        expectToBePromise(getTokenizationDictionaryStatusPromise);

        getTokenizationDictionaryStatusPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createTokenizationDictionary', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TokenDictRule
      const tokenDictRuleModel = {
        text: 'testString',
        tokens: ['testString'],
        readings: ['testString'],
        part_of_speech: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createTokenizationDictionary
        const environmentId = 'testString';
        const collectionId = 'testString';
        const tokenizationRules = [tokenDictRuleModel];
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          tokenizationRules: tokenizationRules,
        };

        const createTokenizationDictionaryResult = discoveryService.createTokenizationDictionary(params);

        // all methods should return a Promise
        expectToBePromise(createTokenizationDictionaryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.tokenization_rules).toEqual(tokenizationRules);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createTokenizationDictionary(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.createTokenizationDictionary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createTokenizationDictionaryPromise = discoveryService.createTokenizationDictionary();
        expectToBePromise(createTokenizationDictionaryPromise);

        createTokenizationDictionaryPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteTokenizationDictionary', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTokenizationDictionary
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const deleteTokenizationDictionaryResult = discoveryService.deleteTokenizationDictionary(params);

        // all methods should return a Promise
        expectToBePromise(deleteTokenizationDictionaryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteTokenizationDictionary(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteTokenizationDictionary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteTokenizationDictionaryPromise = discoveryService.deleteTokenizationDictionary();
        expectToBePromise(deleteTokenizationDictionaryPromise);

        deleteTokenizationDictionaryPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getStopwordListStatus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getStopwordListStatus
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const getStopwordListStatusResult = discoveryService.getStopwordListStatus(params);

        // all methods should return a Promise
        expectToBePromise(getStopwordListStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getStopwordListStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getStopwordListStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getStopwordListStatusPromise = discoveryService.getStopwordListStatus();
        expectToBePromise(getStopwordListStatusPromise);

        getStopwordListStatusPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createStopwordList', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createStopwordList
        const environmentId = 'testString';
        const collectionId = 'testString';
        const stopwordFile = Buffer.from('This is a mock file.');
        const stopwordFilename = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          stopwordFile: stopwordFile,
          stopwordFilename: stopwordFilename,
        };

        const createStopwordListResult = discoveryService.createStopwordList(params);

        // all methods should return a Promise
        expectToBePromise(createStopwordListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.stopword_file.data).toEqual(stopwordFile);
        expect(mockRequestOptions.formData.stopword_file.filename).toEqual(stopwordFilename);
        expect(mockRequestOptions.formData.stopword_file.contentType).toEqual('application/octet-stream');
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const stopwordFile = Buffer.from('This is a mock file.');
        const stopwordFilename = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          stopwordFile,
          stopwordFilename,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createStopwordList(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.createStopwordList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createStopwordListPromise = discoveryService.createStopwordList();
        expectToBePromise(createStopwordListPromise);

        createStopwordListPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteStopwordList', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteStopwordList
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const deleteStopwordListResult = discoveryService.deleteStopwordList(params);

        // all methods should return a Promise
        expectToBePromise(deleteStopwordListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteStopwordList(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteStopwordList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteStopwordListPromise = discoveryService.deleteStopwordList();
        expectToBePromise(deleteStopwordListPromise);

        deleteStopwordListPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addDocument
        const environmentId = 'testString';
        const collectionId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/json';
        const metadata = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          metadata: metadata,
        };

        const addDocumentResult = discoveryService.addDocument(params);

        // all methods should return a Promise
        expectToBePromise(addDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/documents', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.file.data).toEqual(file);
        expect(mockRequestOptions.formData.file.filename).toEqual(filename);
        expect(mockRequestOptions.formData.file.contentType).toEqual(fileContentType);
        expect(mockRequestOptions.formData.metadata).toEqual(metadata);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.addDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.addDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const addDocumentPromise = discoveryService.addDocument();
        expectToBePromise(addDocumentPromise);

        addDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDocumentStatus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDocumentStatus
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          documentId: documentId,
        };

        const getDocumentStatusResult = discoveryService.getDocumentStatus(params);

        // all methods should return a Promise
        expectToBePromise(getDocumentStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getDocumentStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getDocumentStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDocumentStatusPromise = discoveryService.getDocumentStatus();
        expectToBePromise(getDocumentStatusPromise);

        getDocumentStatusPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateDocument
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/json';
        const metadata = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          documentId: documentId,
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          metadata: metadata,
        };

        const updateDocumentResult = discoveryService.updateDocument(params);

        // all methods should return a Promise
        expectToBePromise(updateDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.file.data).toEqual(file);
        expect(mockRequestOptions.formData.file.filename).toEqual(filename);
        expect(mockRequestOptions.formData.file.contentType).toEqual(fileContentType);
        expect(mockRequestOptions.formData.metadata).toEqual(metadata);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.updateDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateDocumentPromise = discoveryService.updateDocument();
        expectToBePromise(updateDocumentPromise);

        updateDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDocument', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteDocument
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          documentId: documentId,
        };

        const deleteDocumentResult = discoveryService.deleteDocument(params);

        // all methods should return a Promise
        expectToBePromise(deleteDocumentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.document_id).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteDocumentPromise = discoveryService.deleteDocument();
        expectToBePromise(deleteDocumentPromise);

        deleteDocumentPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('query', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation query
        const environmentId = 'testString';
        const collectionId = 'testString';
        const filter = 'testString';
        const query = 'testString';
        const naturalLanguageQuery = 'testString';
        const passages = true;
        const aggregation = 'testString';
        const count = 38;
        const _return = 'testString';
        const offset = 38;
        const sort = 'testString';
        const highlight = false;
        const passagesFields = 'testString';
        const passagesCount = 100;
        const passagesCharacters = 50;
        const deduplicate = false;
        const deduplicateField = 'testString';
        const similar = false;
        const similarDocumentIds = 'testString';
        const similarFields = 'testString';
        const bias = 'testString';
        const spellingSuggestions = false;
        const xWatsonLoggingOptOut = false;
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          filter: filter,
          query: query,
          naturalLanguageQuery: naturalLanguageQuery,
          passages: passages,
          aggregation: aggregation,
          count: count,
          _return: _return,
          offset: offset,
          sort: sort,
          highlight: highlight,
          passagesFields: passagesFields,
          passagesCount: passagesCount,
          passagesCharacters: passagesCharacters,
          deduplicate: deduplicate,
          deduplicateField: deduplicateField,
          similar: similar,
          similarDocumentIds: similarDocumentIds,
          similarFields: similarFields,
          bias: bias,
          spellingSuggestions: spellingSuggestions,
          xWatsonLoggingOptOut: xWatsonLoggingOptOut,
        };

        const queryResult = discoveryService.query(params);

        // all methods should return a Promise
        expectToBePromise(queryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/query', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Watson-Logging-Opt-Out', xWatsonLoggingOptOut);
        expect(mockRequestOptions.body.filter).toEqual(filter);
        expect(mockRequestOptions.body.query).toEqual(query);
        expect(mockRequestOptions.body.natural_language_query).toEqual(naturalLanguageQuery);
        expect(mockRequestOptions.body.passages).toEqual(passages);
        expect(mockRequestOptions.body.aggregation).toEqual(aggregation);
        expect(mockRequestOptions.body.count).toEqual(count);
        expect(mockRequestOptions.body.return).toEqual(_return);
        expect(mockRequestOptions.body.offset).toEqual(offset);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.highlight).toEqual(highlight);
        expect(mockRequestOptions.body['passages.fields']).toEqual(passagesFields);
        expect(mockRequestOptions.body['passages.count']).toEqual(passagesCount);
        expect(mockRequestOptions.body['passages.characters']).toEqual(passagesCharacters);
        expect(mockRequestOptions.body.deduplicate).toEqual(deduplicate);
        expect(mockRequestOptions.body['deduplicate.field']).toEqual(deduplicateField);
        expect(mockRequestOptions.body.similar).toEqual(similar);
        expect(mockRequestOptions.body['similar.document_ids']).toEqual(similarDocumentIds);
        expect(mockRequestOptions.body['similar.fields']).toEqual(similarFields);
        expect(mockRequestOptions.body.bias).toEqual(bias);
        expect(mockRequestOptions.body.spelling_suggestions).toEqual(spellingSuggestions);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.query(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.query({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const queryPromise = discoveryService.query();
        expectToBePromise(queryPromise);

        queryPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('queryNotices', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation queryNotices
        const environmentId = 'testString';
        const collectionId = 'testString';
        const filter = 'testString';
        const query = 'testString';
        const naturalLanguageQuery = 'testString';
        const passages = true;
        const aggregation = 'testString';
        const count = 38;
        const _return = ['testString'];
        const offset = 38;
        const sort = ['testString'];
        const highlight = false;
        const passagesFields = ['testString'];
        const passagesCount = 100;
        const passagesCharacters = 50;
        const deduplicateField = 'testString';
        const similar = false;
        const similarDocumentIds = ['testString'];
        const similarFields = ['testString'];
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          filter: filter,
          query: query,
          naturalLanguageQuery: naturalLanguageQuery,
          passages: passages,
          aggregation: aggregation,
          count: count,
          _return: _return,
          offset: offset,
          sort: sort,
          highlight: highlight,
          passagesFields: passagesFields,
          passagesCount: passagesCount,
          passagesCharacters: passagesCharacters,
          deduplicateField: deduplicateField,
          similar: similar,
          similarDocumentIds: similarDocumentIds,
          similarFields: similarFields,
        };

        const queryNoticesResult = discoveryService.queryNotices(params);

        // all methods should return a Promise
        expectToBePromise(queryNoticesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/notices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.query).toEqual(query);
        expect(mockRequestOptions.qs.natural_language_query).toEqual(naturalLanguageQuery);
        expect(mockRequestOptions.qs.passages).toEqual(passages);
        expect(mockRequestOptions.qs.aggregation).toEqual(aggregation);
        expect(mockRequestOptions.qs.count).toEqual(count);
        expect(mockRequestOptions.qs.return).toEqual(_return);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.highlight).toEqual(highlight);
        expect(mockRequestOptions.qs['passages.fields']).toEqual(passagesFields);
        expect(mockRequestOptions.qs['passages.count']).toEqual(passagesCount);
        expect(mockRequestOptions.qs['passages.characters']).toEqual(passagesCharacters);
        expect(mockRequestOptions.qs['deduplicate.field']).toEqual(deduplicateField);
        expect(mockRequestOptions.qs.similar).toEqual(similar);
        expect(mockRequestOptions.qs['similar.document_ids']).toEqual(similarDocumentIds);
        expect(mockRequestOptions.qs['similar.fields']).toEqual(similarFields);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.queryNotices(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.queryNotices({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const queryNoticesPromise = discoveryService.queryNotices();
        expectToBePromise(queryNoticesPromise);

        queryNoticesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('federatedQuery', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation federatedQuery
        const environmentId = 'testString';
        const collectionIds = 'testString';
        const filter = 'testString';
        const query = 'testString';
        const naturalLanguageQuery = 'testString';
        const passages = true;
        const aggregation = 'testString';
        const count = 38;
        const _return = 'testString';
        const offset = 38;
        const sort = 'testString';
        const highlight = false;
        const passagesFields = 'testString';
        const passagesCount = 100;
        const passagesCharacters = 50;
        const deduplicate = false;
        const deduplicateField = 'testString';
        const similar = false;
        const similarDocumentIds = 'testString';
        const similarFields = 'testString';
        const bias = 'testString';
        const xWatsonLoggingOptOut = false;
        const params = {
          environmentId: environmentId,
          collectionIds: collectionIds,
          filter: filter,
          query: query,
          naturalLanguageQuery: naturalLanguageQuery,
          passages: passages,
          aggregation: aggregation,
          count: count,
          _return: _return,
          offset: offset,
          sort: sort,
          highlight: highlight,
          passagesFields: passagesFields,
          passagesCount: passagesCount,
          passagesCharacters: passagesCharacters,
          deduplicate: deduplicate,
          deduplicateField: deduplicateField,
          similar: similar,
          similarDocumentIds: similarDocumentIds,
          similarFields: similarFields,
          bias: bias,
          xWatsonLoggingOptOut: xWatsonLoggingOptOut,
        };

        const federatedQueryResult = discoveryService.federatedQuery(params);

        // all methods should return a Promise
        expectToBePromise(federatedQueryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/query', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Watson-Logging-Opt-Out', xWatsonLoggingOptOut);
        expect(mockRequestOptions.body.collection_ids).toEqual(collectionIds);
        expect(mockRequestOptions.body.filter).toEqual(filter);
        expect(mockRequestOptions.body.query).toEqual(query);
        expect(mockRequestOptions.body.natural_language_query).toEqual(naturalLanguageQuery);
        expect(mockRequestOptions.body.passages).toEqual(passages);
        expect(mockRequestOptions.body.aggregation).toEqual(aggregation);
        expect(mockRequestOptions.body.count).toEqual(count);
        expect(mockRequestOptions.body.return).toEqual(_return);
        expect(mockRequestOptions.body.offset).toEqual(offset);
        expect(mockRequestOptions.body.sort).toEqual(sort);
        expect(mockRequestOptions.body.highlight).toEqual(highlight);
        expect(mockRequestOptions.body['passages.fields']).toEqual(passagesFields);
        expect(mockRequestOptions.body['passages.count']).toEqual(passagesCount);
        expect(mockRequestOptions.body['passages.characters']).toEqual(passagesCharacters);
        expect(mockRequestOptions.body.deduplicate).toEqual(deduplicate);
        expect(mockRequestOptions.body['deduplicate.field']).toEqual(deduplicateField);
        expect(mockRequestOptions.body.similar).toEqual(similar);
        expect(mockRequestOptions.body['similar.document_ids']).toEqual(similarDocumentIds);
        expect(mockRequestOptions.body['similar.fields']).toEqual(similarFields);
        expect(mockRequestOptions.body.bias).toEqual(bias);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionIds = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionIds,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.federatedQuery(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.federatedQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const federatedQueryPromise = discoveryService.federatedQuery();
        expectToBePromise(federatedQueryPromise);

        federatedQueryPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('federatedQueryNotices', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation federatedQueryNotices
        const environmentId = 'testString';
        const collectionIds = ['testString'];
        const filter = 'testString';
        const query = 'testString';
        const naturalLanguageQuery = 'testString';
        const aggregation = 'testString';
        const count = 38;
        const _return = ['testString'];
        const offset = 38;
        const sort = ['testString'];
        const highlight = false;
        const deduplicateField = 'testString';
        const similar = false;
        const similarDocumentIds = ['testString'];
        const similarFields = ['testString'];
        const params = {
          environmentId: environmentId,
          collectionIds: collectionIds,
          filter: filter,
          query: query,
          naturalLanguageQuery: naturalLanguageQuery,
          aggregation: aggregation,
          count: count,
          _return: _return,
          offset: offset,
          sort: sort,
          highlight: highlight,
          deduplicateField: deduplicateField,
          similar: similar,
          similarDocumentIds: similarDocumentIds,
          similarFields: similarFields,
        };

        const federatedQueryNoticesResult = discoveryService.federatedQueryNotices(params);

        // all methods should return a Promise
        expectToBePromise(federatedQueryNoticesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/notices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.collection_ids).toEqual(collectionIds);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.query).toEqual(query);
        expect(mockRequestOptions.qs.natural_language_query).toEqual(naturalLanguageQuery);
        expect(mockRequestOptions.qs.aggregation).toEqual(aggregation);
        expect(mockRequestOptions.qs.count).toEqual(count);
        expect(mockRequestOptions.qs.return).toEqual(_return);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.highlight).toEqual(highlight);
        expect(mockRequestOptions.qs['deduplicate.field']).toEqual(deduplicateField);
        expect(mockRequestOptions.qs.similar).toEqual(similar);
        expect(mockRequestOptions.qs['similar.document_ids']).toEqual(similarDocumentIds);
        expect(mockRequestOptions.qs['similar.fields']).toEqual(similarFields);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionIds = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionIds,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.federatedQueryNotices(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.federatedQueryNotices({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const federatedQueryNoticesPromise = discoveryService.federatedQueryNotices();
        expectToBePromise(federatedQueryNoticesPromise);

        federatedQueryNoticesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getAutocompletion', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAutocompletion
        const environmentId = 'testString';
        const collectionId = 'testString';
        const prefix = 'testString';
        const field = 'testString';
        const count = 38;
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          prefix: prefix,
          field: field,
          count: count,
        };

        const getAutocompletionResult = discoveryService.getAutocompletion(params);

        // all methods should return a Promise
        expectToBePromise(getAutocompletionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/autocompletion', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.prefix).toEqual(prefix);
        expect(mockRequestOptions.qs.field).toEqual(field);
        expect(mockRequestOptions.qs.count).toEqual(count);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const prefix = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          prefix,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getAutocompletion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getAutocompletion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getAutocompletionPromise = discoveryService.getAutocompletion();
        expectToBePromise(getAutocompletionPromise);

        getAutocompletionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listTrainingData', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listTrainingData
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const listTrainingDataResult = discoveryService.listTrainingData(params);

        // all methods should return a Promise
        expectToBePromise(listTrainingDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/training_data', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.listTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listTrainingDataPromise = discoveryService.listTrainingData();
        expectToBePromise(listTrainingDataPromise);

        listTrainingDataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addTrainingData', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TrainingExample
      const trainingExampleModel = {
        document_id: 'testString',
        cross_reference: 'testString',
        relevance: 38,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addTrainingData
        const environmentId = 'testString';
        const collectionId = 'testString';
        const naturalLanguageQuery = 'testString';
        const filter = 'testString';
        const examples = [trainingExampleModel];
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          naturalLanguageQuery: naturalLanguageQuery,
          filter: filter,
          examples: examples,
        };

        const addTrainingDataResult = discoveryService.addTrainingData(params);

        // all methods should return a Promise
        expectToBePromise(addTrainingDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/training_data', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.natural_language_query).toEqual(naturalLanguageQuery);
        expect(mockRequestOptions.body.filter).toEqual(filter);
        expect(mockRequestOptions.body.examples).toEqual(examples);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.addTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.addTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const addTrainingDataPromise = discoveryService.addTrainingData();
        expectToBePromise(addTrainingDataPromise);

        addTrainingDataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteAllTrainingData', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteAllTrainingData
        const environmentId = 'testString';
        const collectionId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const deleteAllTrainingDataResult = discoveryService.deleteAllTrainingData(params);

        // all methods should return a Promise
        expectToBePromise(deleteAllTrainingDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/training_data', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteAllTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteAllTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteAllTrainingDataPromise = discoveryService.deleteAllTrainingData();
        expectToBePromise(deleteAllTrainingDataPromise);

        deleteAllTrainingDataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getTrainingData', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getTrainingData
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
        };

        const getTrainingDataResult = discoveryService.getTrainingData(params);

        // all methods should return a Promise
        expectToBePromise(getTrainingDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.query_id).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getTrainingDataPromise = discoveryService.getTrainingData();
        expectToBePromise(getTrainingDataPromise);

        getTrainingDataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteTrainingData', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTrainingData
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
        };

        const deleteTrainingDataResult = discoveryService.deleteTrainingData(params);

        // all methods should return a Promise
        expectToBePromise(deleteTrainingDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.query_id).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteTrainingDataPromise = discoveryService.deleteTrainingData();
        expectToBePromise(deleteTrainingDataPromise);

        deleteTrainingDataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listTrainingExamples', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listTrainingExamples
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
        };

        const listTrainingExamplesResult = discoveryService.listTrainingExamples(params);

        // all methods should return a Promise
        expectToBePromise(listTrainingExamplesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.query_id).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listTrainingExamples(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.listTrainingExamples({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listTrainingExamplesPromise = discoveryService.listTrainingExamples();
        expectToBePromise(listTrainingExamplesPromise);

        listTrainingExamplesPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createTrainingExample', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createTrainingExample
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const documentId = 'testString';
        const crossReference = 'testString';
        const relevance = 38;
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
          documentId: documentId,
          crossReference: crossReference,
          relevance: relevance,
        };

        const createTrainingExampleResult = discoveryService.createTrainingExample(params);

        // all methods should return a Promise
        expectToBePromise(createTrainingExampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.document_id).toEqual(documentId);
        expect(mockRequestOptions.body.cross_reference).toEqual(crossReference);
        expect(mockRequestOptions.body.relevance).toEqual(relevance);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.query_id).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createTrainingExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.createTrainingExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createTrainingExamplePromise = discoveryService.createTrainingExample();
        expectToBePromise(createTrainingExamplePromise);

        createTrainingExamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteTrainingExample', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTrainingExample
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
          exampleId: exampleId,
        };

        const deleteTrainingExampleResult = discoveryService.deleteTrainingExample(params);

        // all methods should return a Promise
        expectToBePromise(deleteTrainingExampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.query_id).toEqual(queryId);
        expect(mockRequestOptions.path.example_id).toEqual(exampleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteTrainingExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteTrainingExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteTrainingExamplePromise = discoveryService.deleteTrainingExample();
        expectToBePromise(deleteTrainingExamplePromise);

        deleteTrainingExamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateTrainingExample', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateTrainingExample
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const crossReference = 'testString';
        const relevance = 38;
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
          exampleId: exampleId,
          crossReference: crossReference,
          relevance: relevance,
        };

        const updateTrainingExampleResult = discoveryService.updateTrainingExample(params);

        // all methods should return a Promise
        expectToBePromise(updateTrainingExampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.cross_reference).toEqual(crossReference);
        expect(mockRequestOptions.body.relevance).toEqual(relevance);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.query_id).toEqual(queryId);
        expect(mockRequestOptions.path.example_id).toEqual(exampleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateTrainingExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.updateTrainingExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateTrainingExamplePromise = discoveryService.updateTrainingExample();
        expectToBePromise(updateTrainingExamplePromise);

        updateTrainingExamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getTrainingExample', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getTrainingExample
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const params = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
          exampleId: exampleId,
        };

        const getTrainingExampleResult = discoveryService.getTrainingExample(params);

        // all methods should return a Promise
        expectToBePromise(getTrainingExampleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.collection_id).toEqual(collectionId);
        expect(mockRequestOptions.path.query_id).toEqual(queryId);
        expect(mockRequestOptions.path.example_id).toEqual(exampleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getTrainingExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getTrainingExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getTrainingExamplePromise = discoveryService.getTrainingExample();
        expectToBePromise(getTrainingExamplePromise);

        getTrainingExamplePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteUserData', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteUserData
        const customerId = 'testString';
        const params = {
          customerId: customerId,
        };

        const deleteUserDataResult = discoveryService.deleteUserData(params);

        // all methods should return a Promise
        expectToBePromise(deleteUserDataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/user_data', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.customer_id).toEqual(customerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteUserDataPromise = discoveryService.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createEvent', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EventData
      const eventDataModel = {
        environment_id: 'testString',
        session_token: 'testString',
        client_timestamp: '2019-01-01T12:00:00.000Z',
        display_rank: 38,
        collection_id: 'testString',
        document_id: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createEvent
        const type = 'click';
        const data = eventDataModel;
        const params = {
          type: type,
          data: data,
        };

        const createEventResult = discoveryService.createEvent(params);

        // all methods should return a Promise
        expectToBePromise(createEventResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/events', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const type = 'click';
        const data = eventDataModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          type,
          data,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createEvent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.createEvent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createEventPromise = discoveryService.createEvent();
        expectToBePromise(createEventPromise);

        createEventPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('queryLog', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation queryLog
        const filter = 'testString';
        const query = 'testString';
        const count = 38;
        const offset = 38;
        const sort = ['testString'];
        const params = {
          filter: filter,
          query: query,
          count: count,
          offset: offset,
          sort: sort,
        };

        const queryLogResult = discoveryService.queryLog(params);

        // all methods should return a Promise
        expectToBePromise(queryLogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/logs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.query).toEqual(query);
        expect(mockRequestOptions.qs.count).toEqual(count);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.queryLog(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        discoveryService.queryLog({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getMetricsQuery', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMetricsQuery
        const startTime = '2019-01-01T12:00:00.000Z';
        const endTime = '2019-01-01T12:00:00.000Z';
        const resultType = 'document';
        const params = {
          startTime: startTime,
          endTime: endTime,
          resultType: resultType,
        };

        const getMetricsQueryResult = discoveryService.getMetricsQuery(params);

        // all methods should return a Promise
        expectToBePromise(getMetricsQueryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/metrics/number_of_queries', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.start_time).toEqual(startTime);
        expect(mockRequestOptions.qs.end_time).toEqual(endTime);
        expect(mockRequestOptions.qs.result_type).toEqual(resultType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getMetricsQuery(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        discoveryService.getMetricsQuery({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getMetricsQueryEvent', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMetricsQueryEvent
        const startTime = '2019-01-01T12:00:00.000Z';
        const endTime = '2019-01-01T12:00:00.000Z';
        const resultType = 'document';
        const params = {
          startTime: startTime,
          endTime: endTime,
          resultType: resultType,
        };

        const getMetricsQueryEventResult = discoveryService.getMetricsQueryEvent(params);

        // all methods should return a Promise
        expectToBePromise(getMetricsQueryEventResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/metrics/number_of_queries_with_event', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.start_time).toEqual(startTime);
        expect(mockRequestOptions.qs.end_time).toEqual(endTime);
        expect(mockRequestOptions.qs.result_type).toEqual(resultType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getMetricsQueryEvent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        discoveryService.getMetricsQueryEvent({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getMetricsQueryNoResults', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMetricsQueryNoResults
        const startTime = '2019-01-01T12:00:00.000Z';
        const endTime = '2019-01-01T12:00:00.000Z';
        const resultType = 'document';
        const params = {
          startTime: startTime,
          endTime: endTime,
          resultType: resultType,
        };

        const getMetricsQueryNoResultsResult = discoveryService.getMetricsQueryNoResults(params);

        // all methods should return a Promise
        expectToBePromise(getMetricsQueryNoResultsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/metrics/number_of_queries_with_no_search_results', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.start_time).toEqual(startTime);
        expect(mockRequestOptions.qs.end_time).toEqual(endTime);
        expect(mockRequestOptions.qs.result_type).toEqual(resultType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getMetricsQueryNoResults(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        discoveryService.getMetricsQueryNoResults({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getMetricsEventRate', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMetricsEventRate
        const startTime = '2019-01-01T12:00:00.000Z';
        const endTime = '2019-01-01T12:00:00.000Z';
        const resultType = 'document';
        const params = {
          startTime: startTime,
          endTime: endTime,
          resultType: resultType,
        };

        const getMetricsEventRateResult = discoveryService.getMetricsEventRate(params);

        // all methods should return a Promise
        expectToBePromise(getMetricsEventRateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/metrics/event_rate', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.start_time).toEqual(startTime);
        expect(mockRequestOptions.qs.end_time).toEqual(endTime);
        expect(mockRequestOptions.qs.result_type).toEqual(resultType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getMetricsEventRate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        discoveryService.getMetricsEventRate({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getMetricsQueryTokenEvent', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMetricsQueryTokenEvent
        const count = 38;
        const params = {
          count: count,
        };

        const getMetricsQueryTokenEventResult = discoveryService.getMetricsQueryTokenEvent(params);

        // all methods should return a Promise
        expectToBePromise(getMetricsQueryTokenEventResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/metrics/top_query_tokens_with_event_rate', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.qs.count).toEqual(count);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getMetricsQueryTokenEvent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        discoveryService.getMetricsQueryTokenEvent({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listCredentials', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCredentials
        const environmentId = 'testString';
        const params = {
          environmentId: environmentId,
        };

        const listCredentialsResult = discoveryService.listCredentials(params);

        // all methods should return a Promise
        expectToBePromise(listCredentialsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/credentials', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listCredentials(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.listCredentials({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listCredentialsPromise = discoveryService.listCredentials();
        expectToBePromise(listCredentialsPromise);

        listCredentialsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createCredentials', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CredentialDetails
      const credentialDetailsModel = {
        credential_type: 'oauth2',
        client_id: 'testString',
        enterprise_id: 'testString',
        url: 'testString',
        username: 'testString',
        organization_url: 'testString',
        'site_collection.path': 'testString',
        client_secret: 'testString',
        public_key_id: 'testString',
        private_key: 'testString',
        passphrase: 'testString',
        password: 'testString',
        gateway_id: 'testString',
        source_version: 'online',
        web_application_url: 'testString',
        domain: 'testString',
        endpoint: 'testString',
        access_key_id: 'testString',
        secret_access_key: 'testString',
      };

      // StatusDetails
      const statusDetailsModel = {
        authenticated: true,
        error_message: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createCredentials
        const environmentId = 'testString';
        const sourceType = 'box';
        const credentialDetails = credentialDetailsModel;
        const status = statusDetailsModel;
        const params = {
          environmentId: environmentId,
          sourceType: sourceType,
          credentialDetails: credentialDetails,
          status: status,
        };

        const createCredentialsResult = discoveryService.createCredentials(params);

        // all methods should return a Promise
        expectToBePromise(createCredentialsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/credentials', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.source_type).toEqual(sourceType);
        expect(mockRequestOptions.body.credential_details).toEqual(credentialDetails);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createCredentials(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.createCredentials({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createCredentialsPromise = discoveryService.createCredentials();
        expectToBePromise(createCredentialsPromise);

        createCredentialsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCredentials', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCredentials
        const environmentId = 'testString';
        const credentialId = 'testString';
        const params = {
          environmentId: environmentId,
          credentialId: credentialId,
        };

        const getCredentialsResult = discoveryService.getCredentials(params);

        // all methods should return a Promise
        expectToBePromise(getCredentialsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/credentials/{credential_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.credential_id).toEqual(credentialId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const credentialId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          credentialId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getCredentials(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getCredentials({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getCredentialsPromise = discoveryService.getCredentials();
        expectToBePromise(getCredentialsPromise);

        getCredentialsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateCredentials', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CredentialDetails
      const credentialDetailsModel = {
        credential_type: 'oauth2',
        client_id: 'testString',
        enterprise_id: 'testString',
        url: 'testString',
        username: 'testString',
        organization_url: 'testString',
        'site_collection.path': 'testString',
        client_secret: 'testString',
        public_key_id: 'testString',
        private_key: 'testString',
        passphrase: 'testString',
        password: 'testString',
        gateway_id: 'testString',
        source_version: 'online',
        web_application_url: 'testString',
        domain: 'testString',
        endpoint: 'testString',
        access_key_id: 'testString',
        secret_access_key: 'testString',
      };

      // StatusDetails
      const statusDetailsModel = {
        authenticated: true,
        error_message: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateCredentials
        const environmentId = 'testString';
        const credentialId = 'testString';
        const sourceType = 'box';
        const credentialDetails = credentialDetailsModel;
        const status = statusDetailsModel;
        const params = {
          environmentId: environmentId,
          credentialId: credentialId,
          sourceType: sourceType,
          credentialDetails: credentialDetails,
          status: status,
        };

        const updateCredentialsResult = discoveryService.updateCredentials(params);

        // all methods should return a Promise
        expectToBePromise(updateCredentialsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/credentials/{credential_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.source_type).toEqual(sourceType);
        expect(mockRequestOptions.body.credential_details).toEqual(credentialDetails);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.credential_id).toEqual(credentialId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const credentialId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          credentialId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateCredentials(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.updateCredentials({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateCredentialsPromise = discoveryService.updateCredentials();
        expectToBePromise(updateCredentialsPromise);

        updateCredentialsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCredentials', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCredentials
        const environmentId = 'testString';
        const credentialId = 'testString';
        const params = {
          environmentId: environmentId,
          credentialId: credentialId,
        };

        const deleteCredentialsResult = discoveryService.deleteCredentials(params);

        // all methods should return a Promise
        expectToBePromise(deleteCredentialsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/credentials/{credential_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.credential_id).toEqual(credentialId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const credentialId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          credentialId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteCredentials(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteCredentials({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteCredentialsPromise = discoveryService.deleteCredentials();
        expectToBePromise(deleteCredentialsPromise);

        deleteCredentialsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGateways', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listGateways
        const environmentId = 'testString';
        const params = {
          environmentId: environmentId,
        };

        const listGatewaysResult = discoveryService.listGateways(params);

        // all methods should return a Promise
        expectToBePromise(listGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.listGateways({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listGatewaysPromise = discoveryService.listGateways();
        expectToBePromise(listGatewaysPromise);

        listGatewaysPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createGateway
        const environmentId = 'testString';
        const name = 'testString';
        const params = {
          environmentId: environmentId,
          name: name,
        };

        const createGatewayResult = discoveryService.createGateway(params);

        // all methods should return a Promise
        expectToBePromise(createGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.createGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createGatewayPromise = discoveryService.createGateway();
        expectToBePromise(createGatewayPromise);

        createGatewayPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getGateway
        const environmentId = 'testString';
        const gatewayId = 'testString';
        const params = {
          environmentId: environmentId,
          gatewayId: gatewayId,
        };

        const getGatewayResult = discoveryService.getGateway(params);

        // all methods should return a Promise
        expectToBePromise(getGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/gateways/{gateway_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const gatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.getGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getGatewayPromise = discoveryService.getGateway();
        expectToBePromise(getGatewayPromise);

        getGatewayPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteGateway
        const environmentId = 'testString';
        const gatewayId = 'testString';
        const params = {
          environmentId: environmentId,
          gatewayId: gatewayId,
        };

        const deleteGatewayResult = discoveryService.deleteGateway(params);

        // all methods should return a Promise
        expectToBePromise(deleteGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/environments/{environment_id}/gateways/{gateway_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(discoveryServiceOptions.version);
        expect(mockRequestOptions.path.environment_id).toEqual(environmentId);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const gatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          environmentId,
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await discoveryService.deleteGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteGatewayPromise = discoveryService.deleteGateway();
        expectToBePromise(deleteGatewayPromise);

        deleteGatewayPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
