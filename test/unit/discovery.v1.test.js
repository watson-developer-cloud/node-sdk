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

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(discoveryService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('DiscoveryV1', () => {

  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      version: 'testString',
    };
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

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
      function __createEnvironmentTest() {
        // Construct the params object for operation createEnvironment
        const name = 'testString';
        const description = 'testString';
        const size = 'LT';
        const createEnvironmentParams = {
          name: name,
          description: description,
          size: size,
        };

        const createEnvironmentResult = discoveryService.createEnvironment(createEnvironmentParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEnvironmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createEnvironmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createEnvironmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEnvironmentParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createEnvironment(createEnvironmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createEnvironment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listEnvironments', () => {
    describe('positive tests', () => {
      function __listEnvironmentsTest() {
        // Construct the params object for operation listEnvironments
        const name = 'testString';
        const listEnvironmentsParams = {
          name: name,
        };

        const listEnvironmentsResult = discoveryService.listEnvironments(listEnvironmentsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listEnvironmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listEnvironmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listEnvironmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listEnvironmentsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listEnvironments(listEnvironmentsParams);
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
      function __getEnvironmentTest() {
        // Construct the params object for operation getEnvironment
        const environmentId = 'testString';
        const getEnvironmentParams = {
          environmentId: environmentId,
        };

        const getEnvironmentResult = discoveryService.getEnvironment(getEnvironmentParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEnvironmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getEnvironmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getEnvironmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEnvironmentParams = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getEnvironment(getEnvironmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getEnvironment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateEnvironment', () => {
    describe('positive tests', () => {
      function __updateEnvironmentTest() {
        // Construct the params object for operation updateEnvironment
        const environmentId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const size = 'S';
        const updateEnvironmentParams = {
          environmentId: environmentId,
          name: name,
          description: description,
          size: size,
        };

        const updateEnvironmentResult = discoveryService.updateEnvironment(updateEnvironmentParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateEnvironmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateEnvironmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateEnvironmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateEnvironmentParams = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateEnvironment(updateEnvironmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateEnvironment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteEnvironment', () => {
    describe('positive tests', () => {
      function __deleteEnvironmentTest() {
        // Construct the params object for operation deleteEnvironment
        const environmentId = 'testString';
        const deleteEnvironmentParams = {
          environmentId: environmentId,
        };

        const deleteEnvironmentResult = discoveryService.deleteEnvironment(deleteEnvironmentParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteEnvironmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteEnvironmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteEnvironmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteEnvironmentParams = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteEnvironment(deleteEnvironmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteEnvironment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listFields', () => {
    describe('positive tests', () => {
      function __listFieldsTest() {
        // Construct the params object for operation listFields
        const environmentId = 'testString';
        const collectionIds = ['testString'];
        const listFieldsParams = {
          environmentId: environmentId,
          collectionIds: collectionIds,
        };

        const listFieldsResult = discoveryService.listFields(listFieldsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listFieldsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listFieldsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listFieldsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionIds = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listFieldsParams = {
          environmentId,
          collectionIds,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listFields(listFieldsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listFields({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listFields();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createConfigurationTest() {
        // Construct the params object for operation createConfiguration
        const environmentId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const conversions = conversionsModel;
        const enrichments = [enrichmentModel];
        const normalizations = [normalizationOperationModel];
        const source = sourceModel;
        const createConfigurationParams = {
          environmentId: environmentId,
          name: name,
          description: description,
          conversions: conversions,
          enrichments: enrichments,
          normalizations: normalizations,
          source: source,
        };

        const createConfigurationResult = discoveryService.createConfiguration(createConfigurationParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createConfigurationParams = {
          environmentId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createConfiguration(createConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listConfigurations', () => {
    describe('positive tests', () => {
      function __listConfigurationsTest() {
        // Construct the params object for operation listConfigurations
        const environmentId = 'testString';
        const name = 'testString';
        const listConfigurationsParams = {
          environmentId: environmentId,
          name: name,
        };

        const listConfigurationsResult = discoveryService.listConfigurations(listConfigurationsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listConfigurationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listConfigurationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listConfigurationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listConfigurationsParams = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listConfigurations(listConfigurationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listConfigurations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listConfigurations();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getConfiguration', () => {
    describe('positive tests', () => {
      function __getConfigurationTest() {
        // Construct the params object for operation getConfiguration
        const environmentId = 'testString';
        const configurationId = 'testString';
        const getConfigurationParams = {
          environmentId: environmentId,
          configurationId: configurationId,
        };

        const getConfigurationResult = discoveryService.getConfiguration(getConfigurationParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const configurationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getConfigurationParams = {
          environmentId,
          configurationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getConfiguration(getConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateConfigurationTest() {
        // Construct the params object for operation updateConfiguration
        const environmentId = 'testString';
        const configurationId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const conversions = conversionsModel;
        const enrichments = [enrichmentModel];
        const normalizations = [normalizationOperationModel];
        const source = sourceModel;
        const updateConfigurationParams = {
          environmentId: environmentId,
          configurationId: configurationId,
          name: name,
          description: description,
          conversions: conversions,
          enrichments: enrichments,
          normalizations: normalizations,
          source: source,
        };

        const updateConfigurationResult = discoveryService.updateConfiguration(updateConfigurationParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const configurationId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateConfigurationParams = {
          environmentId,
          configurationId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateConfiguration(updateConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteConfiguration', () => {
    describe('positive tests', () => {
      function __deleteConfigurationTest() {
        // Construct the params object for operation deleteConfiguration
        const environmentId = 'testString';
        const configurationId = 'testString';
        const deleteConfigurationParams = {
          environmentId: environmentId,
          configurationId: configurationId,
        };

        const deleteConfigurationResult = discoveryService.deleteConfiguration(deleteConfigurationParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const configurationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteConfigurationParams = {
          environmentId,
          configurationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteConfiguration(deleteConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createCollection', () => {
    describe('positive tests', () => {
      function __createCollectionTest() {
        // Construct the params object for operation createCollection
        const environmentId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const configurationId = 'testString';
        const language = 'en';
        const createCollectionParams = {
          environmentId: environmentId,
          name: name,
          description: description,
          configurationId: configurationId,
          language: language,
        };

        const createCollectionResult = discoveryService.createCollection(createCollectionParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCollectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createCollectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createCollectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCollectionParams = {
          environmentId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createCollection(createCollectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createCollection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listCollections', () => {
    describe('positive tests', () => {
      function __listCollectionsTest() {
        // Construct the params object for operation listCollections
        const environmentId = 'testString';
        const name = 'testString';
        const listCollectionsParams = {
          environmentId: environmentId,
          name: name,
        };

        const listCollectionsResult = discoveryService.listCollections(listCollectionsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCollectionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listCollectionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listCollectionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCollectionsParams = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listCollections(listCollectionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listCollections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listCollections();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCollection', () => {
    describe('positive tests', () => {
      function __getCollectionTest() {
        // Construct the params object for operation getCollection
        const environmentId = 'testString';
        const collectionId = 'testString';
        const getCollectionParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const getCollectionResult = discoveryService.getCollection(getCollectionParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCollectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getCollectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getCollectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCollectionParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getCollection(getCollectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getCollection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateCollection', () => {
    describe('positive tests', () => {
      function __updateCollectionTest() {
        // Construct the params object for operation updateCollection
        const environmentId = 'testString';
        const collectionId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const configurationId = 'testString';
        const updateCollectionParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          name: name,
          description: description,
          configurationId: configurationId,
        };

        const updateCollectionResult = discoveryService.updateCollection(updateCollectionParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCollectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateCollectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateCollectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCollectionParams = {
          environmentId,
          collectionId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateCollection(updateCollectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateCollection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCollection', () => {
    describe('positive tests', () => {
      function __deleteCollectionTest() {
        // Construct the params object for operation deleteCollection
        const environmentId = 'testString';
        const collectionId = 'testString';
        const deleteCollectionParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const deleteCollectionResult = discoveryService.deleteCollection(deleteCollectionParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCollectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteCollectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteCollectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCollectionParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteCollection(deleteCollectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteCollection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteCollection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listCollectionFields', () => {
    describe('positive tests', () => {
      function __listCollectionFieldsTest() {
        // Construct the params object for operation listCollectionFields
        const environmentId = 'testString';
        const collectionId = 'testString';
        const listCollectionFieldsParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const listCollectionFieldsResult = discoveryService.listCollectionFields(listCollectionFieldsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCollectionFieldsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listCollectionFieldsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listCollectionFieldsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCollectionFieldsParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listCollectionFields(listCollectionFieldsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listCollectionFields({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listCollectionFields();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listExpansions', () => {
    describe('positive tests', () => {
      function __listExpansionsTest() {
        // Construct the params object for operation listExpansions
        const environmentId = 'testString';
        const collectionId = 'testString';
        const listExpansionsParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const listExpansionsResult = discoveryService.listExpansions(listExpansionsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listExpansionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listExpansionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listExpansionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listExpansionsParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listExpansions(listExpansionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listExpansions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listExpansions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createExpansionsTest() {
        // Construct the params object for operation createExpansions
        const environmentId = 'testString';
        const collectionId = 'testString';
        const expansions = [expansionModel];
        const createExpansionsParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          expansions: expansions,
        };

        const createExpansionsResult = discoveryService.createExpansions(createExpansionsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createExpansionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createExpansionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createExpansionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const expansions = [expansionModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createExpansionsParams = {
          environmentId,
          collectionId,
          expansions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createExpansions(createExpansionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createExpansions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createExpansions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteExpansions', () => {
    describe('positive tests', () => {
      function __deleteExpansionsTest() {
        // Construct the params object for operation deleteExpansions
        const environmentId = 'testString';
        const collectionId = 'testString';
        const deleteExpansionsParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const deleteExpansionsResult = discoveryService.deleteExpansions(deleteExpansionsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteExpansionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteExpansionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteExpansionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteExpansionsParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteExpansions(deleteExpansionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteExpansions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteExpansions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTokenizationDictionaryStatus', () => {
    describe('positive tests', () => {
      function __getTokenizationDictionaryStatusTest() {
        // Construct the params object for operation getTokenizationDictionaryStatus
        const environmentId = 'testString';
        const collectionId = 'testString';
        const getTokenizationDictionaryStatusParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const getTokenizationDictionaryStatusResult = discoveryService.getTokenizationDictionaryStatus(getTokenizationDictionaryStatusParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTokenizationDictionaryStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getTokenizationDictionaryStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getTokenizationDictionaryStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTokenizationDictionaryStatusParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getTokenizationDictionaryStatus(getTokenizationDictionaryStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getTokenizationDictionaryStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getTokenizationDictionaryStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createTokenizationDictionaryTest() {
        // Construct the params object for operation createTokenizationDictionary
        const environmentId = 'testString';
        const collectionId = 'testString';
        const tokenizationRules = [tokenDictRuleModel];
        const createTokenizationDictionaryParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          tokenizationRules: tokenizationRules,
        };

        const createTokenizationDictionaryResult = discoveryService.createTokenizationDictionary(createTokenizationDictionaryParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTokenizationDictionaryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createTokenizationDictionaryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createTokenizationDictionaryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTokenizationDictionaryParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createTokenizationDictionary(createTokenizationDictionaryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createTokenizationDictionary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createTokenizationDictionary();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTokenizationDictionary', () => {
    describe('positive tests', () => {
      function __deleteTokenizationDictionaryTest() {
        // Construct the params object for operation deleteTokenizationDictionary
        const environmentId = 'testString';
        const collectionId = 'testString';
        const deleteTokenizationDictionaryParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const deleteTokenizationDictionaryResult = discoveryService.deleteTokenizationDictionary(deleteTokenizationDictionaryParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTokenizationDictionaryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteTokenizationDictionaryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteTokenizationDictionaryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTokenizationDictionaryParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteTokenizationDictionary(deleteTokenizationDictionaryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteTokenizationDictionary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteTokenizationDictionary();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getStopwordListStatus', () => {
    describe('positive tests', () => {
      function __getStopwordListStatusTest() {
        // Construct the params object for operation getStopwordListStatus
        const environmentId = 'testString';
        const collectionId = 'testString';
        const getStopwordListStatusParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const getStopwordListStatusResult = discoveryService.getStopwordListStatus(getStopwordListStatusParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getStopwordListStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getStopwordListStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getStopwordListStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getStopwordListStatusParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getStopwordListStatus(getStopwordListStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getStopwordListStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getStopwordListStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createStopwordList', () => {
    describe('positive tests', () => {
      function __createStopwordListTest() {
        // Construct the params object for operation createStopwordList
        const environmentId = 'testString';
        const collectionId = 'testString';
        const stopwordFile = Buffer.from('This is a mock file.');
        const stopwordFilename = 'testString';
        const createStopwordListParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          stopwordFile: stopwordFile,
          stopwordFilename: stopwordFilename,
        };

        const createStopwordListResult = discoveryService.createStopwordList(createStopwordListParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createStopwordListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createStopwordListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createStopwordListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const stopwordFile = Buffer.from('This is a mock file.');
        const stopwordFilename = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createStopwordListParams = {
          environmentId,
          collectionId,
          stopwordFile,
          stopwordFilename,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createStopwordList(createStopwordListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createStopwordList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createStopwordList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteStopwordList', () => {
    describe('positive tests', () => {
      function __deleteStopwordListTest() {
        // Construct the params object for operation deleteStopwordList
        const environmentId = 'testString';
        const collectionId = 'testString';
        const deleteStopwordListParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const deleteStopwordListResult = discoveryService.deleteStopwordList(deleteStopwordListParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteStopwordListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteStopwordListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteStopwordListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteStopwordListParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteStopwordList(deleteStopwordListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteStopwordList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteStopwordList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addDocument', () => {
    describe('positive tests', () => {
      function __addDocumentTest() {
        // Construct the params object for operation addDocument
        const environmentId = 'testString';
        const collectionId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/json';
        const metadata = 'testString';
        const addDocumentParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          metadata: metadata,
        };

        const addDocumentResult = discoveryService.addDocument(addDocumentParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __addDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __addDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addDocumentParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.addDocument(addDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.addDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.addDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDocumentStatus', () => {
    describe('positive tests', () => {
      function __getDocumentStatusTest() {
        // Construct the params object for operation getDocumentStatus
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const getDocumentStatusParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          documentId: documentId,
        };

        const getDocumentStatusResult = discoveryService.getDocumentStatus(getDocumentStatusParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDocumentStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getDocumentStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getDocumentStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDocumentStatusParams = {
          environmentId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getDocumentStatus(getDocumentStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getDocumentStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getDocumentStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDocument', () => {
    describe('positive tests', () => {
      function __updateDocumentTest() {
        // Construct the params object for operation updateDocument
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const filename = 'testString';
        const fileContentType = 'application/json';
        const metadata = 'testString';
        const updateDocumentParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          documentId: documentId,
          file: file,
          filename: filename,
          fileContentType: fileContentType,
          metadata: metadata,
        };

        const updateDocumentResult = discoveryService.updateDocument(updateDocumentParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDocumentParams = {
          environmentId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateDocument(updateDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDocument', () => {
    describe('positive tests', () => {
      function __deleteDocumentTest() {
        // Construct the params object for operation deleteDocument
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const deleteDocumentParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          documentId: documentId,
        };

        const deleteDocumentResult = discoveryService.deleteDocument(deleteDocumentParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDocumentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteDocumentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteDocumentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const documentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDocumentParams = {
          environmentId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteDocument(deleteDocumentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteDocument({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteDocument();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('query', () => {
    describe('positive tests', () => {
      function __queryTest() {
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
        const queryParams = {
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

        const queryResult = discoveryService.query(queryParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __queryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __queryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __queryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const queryParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.query(queryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.query({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.query();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('queryNotices', () => {
    describe('positive tests', () => {
      function __queryNoticesTest() {
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
        const queryNoticesParams = {
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

        const queryNoticesResult = discoveryService.queryNotices(queryNoticesParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __queryNoticesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __queryNoticesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __queryNoticesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const queryNoticesParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.queryNotices(queryNoticesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.queryNotices({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.queryNotices();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('federatedQuery', () => {
    describe('positive tests', () => {
      function __federatedQueryTest() {
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
        const federatedQueryParams = {
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

        const federatedQueryResult = discoveryService.federatedQuery(federatedQueryParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __federatedQueryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __federatedQueryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __federatedQueryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionIds = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const federatedQueryParams = {
          environmentId,
          collectionIds,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.federatedQuery(federatedQueryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.federatedQuery({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.federatedQuery();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('federatedQueryNotices', () => {
    describe('positive tests', () => {
      function __federatedQueryNoticesTest() {
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
        const federatedQueryNoticesParams = {
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

        const federatedQueryNoticesResult = discoveryService.federatedQueryNotices(federatedQueryNoticesParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __federatedQueryNoticesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __federatedQueryNoticesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __federatedQueryNoticesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionIds = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const federatedQueryNoticesParams = {
          environmentId,
          collectionIds,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.federatedQueryNotices(federatedQueryNoticesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.federatedQueryNotices({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.federatedQueryNotices();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAutocompletion', () => {
    describe('positive tests', () => {
      function __getAutocompletionTest() {
        // Construct the params object for operation getAutocompletion
        const environmentId = 'testString';
        const collectionId = 'testString';
        const prefix = 'testString';
        const field = 'testString';
        const count = 38;
        const getAutocompletionParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          prefix: prefix,
          field: field,
          count: count,
        };

        const getAutocompletionResult = discoveryService.getAutocompletion(getAutocompletionParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAutocompletionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getAutocompletionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getAutocompletionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const prefix = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAutocompletionParams = {
          environmentId,
          collectionId,
          prefix,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getAutocompletion(getAutocompletionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getAutocompletion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getAutocompletion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTrainingData', () => {
    describe('positive tests', () => {
      function __listTrainingDataTest() {
        // Construct the params object for operation listTrainingData
        const environmentId = 'testString';
        const collectionId = 'testString';
        const listTrainingDataParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const listTrainingDataResult = discoveryService.listTrainingData(listTrainingDataParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTrainingDataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listTrainingDataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listTrainingDataTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTrainingDataParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listTrainingData(listTrainingDataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listTrainingData();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __addTrainingDataTest() {
        // Construct the params object for operation addTrainingData
        const environmentId = 'testString';
        const collectionId = 'testString';
        const naturalLanguageQuery = 'testString';
        const filter = 'testString';
        const examples = [trainingExampleModel];
        const addTrainingDataParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          naturalLanguageQuery: naturalLanguageQuery,
          filter: filter,
          examples: examples,
        };

        const addTrainingDataResult = discoveryService.addTrainingData(addTrainingDataParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addTrainingDataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __addTrainingDataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __addTrainingDataTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addTrainingDataParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.addTrainingData(addTrainingDataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.addTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.addTrainingData();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAllTrainingData', () => {
    describe('positive tests', () => {
      function __deleteAllTrainingDataTest() {
        // Construct the params object for operation deleteAllTrainingData
        const environmentId = 'testString';
        const collectionId = 'testString';
        const deleteAllTrainingDataParams = {
          environmentId: environmentId,
          collectionId: collectionId,
        };

        const deleteAllTrainingDataResult = discoveryService.deleteAllTrainingData(deleteAllTrainingDataParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAllTrainingDataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteAllTrainingDataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteAllTrainingDataTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAllTrainingDataParams = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteAllTrainingData(deleteAllTrainingDataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteAllTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteAllTrainingData();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTrainingData', () => {
    describe('positive tests', () => {
      function __getTrainingDataTest() {
        // Construct the params object for operation getTrainingData
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const getTrainingDataParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
        };

        const getTrainingDataResult = discoveryService.getTrainingData(getTrainingDataParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTrainingDataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getTrainingDataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getTrainingDataTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTrainingDataParams = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getTrainingData(getTrainingDataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getTrainingData();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTrainingData', () => {
    describe('positive tests', () => {
      function __deleteTrainingDataTest() {
        // Construct the params object for operation deleteTrainingData
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const deleteTrainingDataParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
        };

        const deleteTrainingDataResult = discoveryService.deleteTrainingData(deleteTrainingDataParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTrainingDataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteTrainingDataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteTrainingDataTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTrainingDataParams = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteTrainingData(deleteTrainingDataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteTrainingData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteTrainingData();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTrainingExamples', () => {
    describe('positive tests', () => {
      function __listTrainingExamplesTest() {
        // Construct the params object for operation listTrainingExamples
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const listTrainingExamplesParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
        };

        const listTrainingExamplesResult = discoveryService.listTrainingExamples(listTrainingExamplesParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTrainingExamplesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listTrainingExamplesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listTrainingExamplesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTrainingExamplesParams = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listTrainingExamples(listTrainingExamplesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listTrainingExamples({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listTrainingExamples();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTrainingExample', () => {
    describe('positive tests', () => {
      function __createTrainingExampleTest() {
        // Construct the params object for operation createTrainingExample
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const documentId = 'testString';
        const crossReference = 'testString';
        const relevance = 38;
        const createTrainingExampleParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
          documentId: documentId,
          crossReference: crossReference,
          relevance: relevance,
        };

        const createTrainingExampleResult = discoveryService.createTrainingExample(createTrainingExampleParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTrainingExampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createTrainingExampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createTrainingExampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTrainingExampleParams = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createTrainingExample(createTrainingExampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createTrainingExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createTrainingExample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTrainingExample', () => {
    describe('positive tests', () => {
      function __deleteTrainingExampleTest() {
        // Construct the params object for operation deleteTrainingExample
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const deleteTrainingExampleParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
          exampleId: exampleId,
        };

        const deleteTrainingExampleResult = discoveryService.deleteTrainingExample(deleteTrainingExampleParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTrainingExampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteTrainingExampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteTrainingExampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTrainingExampleParams = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteTrainingExample(deleteTrainingExampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteTrainingExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteTrainingExample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateTrainingExample', () => {
    describe('positive tests', () => {
      function __updateTrainingExampleTest() {
        // Construct the params object for operation updateTrainingExample
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const crossReference = 'testString';
        const relevance = 38;
        const updateTrainingExampleParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
          exampleId: exampleId,
          crossReference: crossReference,
          relevance: relevance,
        };

        const updateTrainingExampleResult = discoveryService.updateTrainingExample(updateTrainingExampleParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTrainingExampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateTrainingExampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateTrainingExampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTrainingExampleParams = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateTrainingExample(updateTrainingExampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateTrainingExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateTrainingExample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTrainingExample', () => {
    describe('positive tests', () => {
      function __getTrainingExampleTest() {
        // Construct the params object for operation getTrainingExample
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const getTrainingExampleParams = {
          environmentId: environmentId,
          collectionId: collectionId,
          queryId: queryId,
          exampleId: exampleId,
        };

        const getTrainingExampleResult = discoveryService.getTrainingExample(getTrainingExampleParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTrainingExampleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getTrainingExampleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getTrainingExampleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const collectionId = 'testString';
        const queryId = 'testString';
        const exampleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTrainingExampleParams = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getTrainingExample(getTrainingExampleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getTrainingExample({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getTrainingExample();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteUserData', () => {
    describe('positive tests', () => {
      function __deleteUserDataTest() {
        // Construct the params object for operation deleteUserData
        const customerId = 'testString';
        const deleteUserDataParams = {
          customerId: customerId,
        };

        const deleteUserDataResult = discoveryService.deleteUserData(deleteUserDataParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteUserDataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteUserDataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteUserDataTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteUserDataParams = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteUserData(deleteUserDataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteUserData({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteUserData();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createEventTest() {
        // Construct the params object for operation createEvent
        const type = 'click';
        const data = eventDataModel;
        const createEventParams = {
          type: type,
          data: data,
        };

        const createEventResult = discoveryService.createEvent(createEventParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEventTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createEventTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createEventTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const type = 'click';
        const data = eventDataModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEventParams = {
          type,
          data,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createEvent(createEventParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createEvent({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createEvent();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('queryLog', () => {
    describe('positive tests', () => {
      function __queryLogTest() {
        // Construct the params object for operation queryLog
        const filter = 'testString';
        const query = 'testString';
        const count = 38;
        const offset = 38;
        const sort = ['testString'];
        const queryLogParams = {
          filter: filter,
          query: query,
          count: count,
          offset: offset,
          sort: sort,
        };

        const queryLogResult = discoveryService.queryLog(queryLogParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __queryLogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __queryLogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __queryLogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const queryLogParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.queryLog(queryLogParams);
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
      function __getMetricsQueryTest() {
        // Construct the params object for operation getMetricsQuery
        const startTime = '2019-01-01T12:00:00.000Z';
        const endTime = '2019-01-01T12:00:00.000Z';
        const resultType = 'document';
        const getMetricsQueryParams = {
          startTime: startTime,
          endTime: endTime,
          resultType: resultType,
        };

        const getMetricsQueryResult = discoveryService.getMetricsQuery(getMetricsQueryParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMetricsQueryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getMetricsQueryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getMetricsQueryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMetricsQueryParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getMetricsQuery(getMetricsQueryParams);
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
      function __getMetricsQueryEventTest() {
        // Construct the params object for operation getMetricsQueryEvent
        const startTime = '2019-01-01T12:00:00.000Z';
        const endTime = '2019-01-01T12:00:00.000Z';
        const resultType = 'document';
        const getMetricsQueryEventParams = {
          startTime: startTime,
          endTime: endTime,
          resultType: resultType,
        };

        const getMetricsQueryEventResult = discoveryService.getMetricsQueryEvent(getMetricsQueryEventParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMetricsQueryEventTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getMetricsQueryEventTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getMetricsQueryEventTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMetricsQueryEventParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getMetricsQueryEvent(getMetricsQueryEventParams);
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
      function __getMetricsQueryNoResultsTest() {
        // Construct the params object for operation getMetricsQueryNoResults
        const startTime = '2019-01-01T12:00:00.000Z';
        const endTime = '2019-01-01T12:00:00.000Z';
        const resultType = 'document';
        const getMetricsQueryNoResultsParams = {
          startTime: startTime,
          endTime: endTime,
          resultType: resultType,
        };

        const getMetricsQueryNoResultsResult = discoveryService.getMetricsQueryNoResults(getMetricsQueryNoResultsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMetricsQueryNoResultsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getMetricsQueryNoResultsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getMetricsQueryNoResultsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMetricsQueryNoResultsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getMetricsQueryNoResults(getMetricsQueryNoResultsParams);
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
      function __getMetricsEventRateTest() {
        // Construct the params object for operation getMetricsEventRate
        const startTime = '2019-01-01T12:00:00.000Z';
        const endTime = '2019-01-01T12:00:00.000Z';
        const resultType = 'document';
        const getMetricsEventRateParams = {
          startTime: startTime,
          endTime: endTime,
          resultType: resultType,
        };

        const getMetricsEventRateResult = discoveryService.getMetricsEventRate(getMetricsEventRateParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMetricsEventRateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getMetricsEventRateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getMetricsEventRateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMetricsEventRateParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getMetricsEventRate(getMetricsEventRateParams);
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
      function __getMetricsQueryTokenEventTest() {
        // Construct the params object for operation getMetricsQueryTokenEvent
        const count = 38;
        const getMetricsQueryTokenEventParams = {
          count: count,
        };

        const getMetricsQueryTokenEventResult = discoveryService.getMetricsQueryTokenEvent(getMetricsQueryTokenEventParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMetricsQueryTokenEventTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getMetricsQueryTokenEventTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getMetricsQueryTokenEventTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMetricsQueryTokenEventParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getMetricsQueryTokenEvent(getMetricsQueryTokenEventParams);
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
      function __listCredentialsTest() {
        // Construct the params object for operation listCredentials
        const environmentId = 'testString';
        const listCredentialsParams = {
          environmentId: environmentId,
        };

        const listCredentialsResult = discoveryService.listCredentials(listCredentialsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCredentialsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listCredentialsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listCredentialsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCredentialsParams = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listCredentials(listCredentialsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listCredentials({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listCredentials();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createCredentialsTest() {
        // Construct the params object for operation createCredentials
        const environmentId = 'testString';
        const sourceType = 'box';
        const credentialDetails = credentialDetailsModel;
        const status = statusDetailsModel;
        const createCredentialsParams = {
          environmentId: environmentId,
          sourceType: sourceType,
          credentialDetails: credentialDetails,
          status: status,
        };

        const createCredentialsResult = discoveryService.createCredentials(createCredentialsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCredentialsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createCredentialsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createCredentialsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCredentialsParams = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createCredentials(createCredentialsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createCredentials({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createCredentials();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCredentials', () => {
    describe('positive tests', () => {
      function __getCredentialsTest() {
        // Construct the params object for operation getCredentials
        const environmentId = 'testString';
        const credentialId = 'testString';
        const getCredentialsParams = {
          environmentId: environmentId,
          credentialId: credentialId,
        };

        const getCredentialsResult = discoveryService.getCredentials(getCredentialsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCredentialsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getCredentialsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getCredentialsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const credentialId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCredentialsParams = {
          environmentId,
          credentialId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getCredentials(getCredentialsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getCredentials({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getCredentials();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateCredentialsTest() {
        // Construct the params object for operation updateCredentials
        const environmentId = 'testString';
        const credentialId = 'testString';
        const sourceType = 'box';
        const credentialDetails = credentialDetailsModel;
        const status = statusDetailsModel;
        const updateCredentialsParams = {
          environmentId: environmentId,
          credentialId: credentialId,
          sourceType: sourceType,
          credentialDetails: credentialDetails,
          status: status,
        };

        const updateCredentialsResult = discoveryService.updateCredentials(updateCredentialsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCredentialsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __updateCredentialsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __updateCredentialsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const credentialId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCredentialsParams = {
          environmentId,
          credentialId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.updateCredentials(updateCredentialsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.updateCredentials({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.updateCredentials();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCredentials', () => {
    describe('positive tests', () => {
      function __deleteCredentialsTest() {
        // Construct the params object for operation deleteCredentials
        const environmentId = 'testString';
        const credentialId = 'testString';
        const deleteCredentialsParams = {
          environmentId: environmentId,
          credentialId: credentialId,
        };

        const deleteCredentialsResult = discoveryService.deleteCredentials(deleteCredentialsParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCredentialsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteCredentialsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteCredentialsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const credentialId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCredentialsParams = {
          environmentId,
          credentialId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteCredentials(deleteCredentialsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteCredentials({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteCredentials();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listGateways', () => {
    describe('positive tests', () => {
      function __listGatewaysTest() {
        // Construct the params object for operation listGateways
        const environmentId = 'testString';
        const listGatewaysParams = {
          environmentId: environmentId,
        };

        const listGatewaysResult = discoveryService.listGateways(listGatewaysParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGatewaysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __listGatewaysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __listGatewaysTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listGatewaysParams = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.listGateways(listGatewaysParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.listGateways({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.listGateways();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createGateway', () => {
    describe('positive tests', () => {
      function __createGatewayTest() {
        // Construct the params object for operation createGateway
        const environmentId = 'testString';
        const name = 'testString';
        const createGatewayParams = {
          environmentId: environmentId,
          name: name,
        };

        const createGatewayResult = discoveryService.createGateway(createGatewayParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __createGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __createGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createGatewayParams = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.createGateway(createGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.createGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.createGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getGateway', () => {
    describe('positive tests', () => {
      function __getGatewayTest() {
        // Construct the params object for operation getGateway
        const environmentId = 'testString';
        const gatewayId = 'testString';
        const getGatewayParams = {
          environmentId: environmentId,
          gatewayId: gatewayId,
        };

        const getGatewayResult = discoveryService.getGateway(getGatewayParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __getGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __getGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const gatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGatewayParams = {
          environmentId,
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.getGateway(getGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.getGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.getGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteGateway', () => {
    describe('positive tests', () => {
      function __deleteGatewayTest() {
        // Construct the params object for operation deleteGateway
        const environmentId = 'testString';
        const gatewayId = 'testString';
        const deleteGatewayParams = {
          environmentId: environmentId,
          gatewayId: gatewayId,
        };

        const deleteGatewayResult = discoveryService.deleteGateway(deleteGatewayParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        discoveryService.enableRetries();
        __deleteGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        discoveryService.disableRetries();
        __deleteGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'testString';
        const gatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteGatewayParams = {
          environmentId,
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discoveryService.deleteGateway(deleteGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await discoveryService.deleteGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await discoveryService.deleteGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
