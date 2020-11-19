/**
 * (C) Copyright IBM Corp. 2020.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const PersonalityInsightsV3 = require('../../dist/personality-insights/v3');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.personality-insights.watson.cloud.ibm.com',
  version: 'testString',
};

const personalityInsightsService = new PersonalityInsightsV3(service);

// dont actually create a request
const createRequestMock = jest.spyOn(personalityInsightsService, 'createRequest');
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

describe('PersonalityInsightsV3', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new PersonalityInsightsV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new PersonalityInsightsV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(PersonalityInsightsV3.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new PersonalityInsightsV3(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new PersonalityInsightsV3(options);

      expect(testInstance.baseOptions.serviceName).toBe(PersonalityInsightsV3.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new PersonalityInsightsV3(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new PersonalityInsightsV3(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new PersonalityInsightsV3(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('profile', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContentItem
      const contentItemModel = {
        content: 'testString',
        id: 'testString',
        created: 26,
        updated: 26,
        contenttype: 'text/plain',
        language: 'ar',
        parentid: 'testString',
        reply: true,
        forward: true,
      };

      // Content
      const contentModel = {
        contentItems: [contentItemModel],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation profile
        const content = contentModel;
        const contentType = 'application/json';
        const contentLanguage = 'ar';
        const acceptLanguage = 'ar';
        const rawScores = true;
        const csvHeaders = true;
        const consumptionPreferences = true;
        const params = {
          content: content,
          contentType: contentType,
          contentLanguage: contentLanguage,
          acceptLanguage: acceptLanguage,
          rawScores: rawScores,
          csvHeaders: csvHeaders,
          consumptionPreferences: consumptionPreferences,
        };

        const profileResult = personalityInsightsService.profile(params);

        // all methods should return a Promise
        expectToBePromise(profileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/profile', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'Content-Language', contentLanguage);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(options.body).toEqual(content);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['raw_scores']).toEqual(rawScores);
        expect(options.qs['csv_headers']).toEqual(csvHeaders);
        expect(options.qs['consumption_preferences']).toEqual(consumptionPreferences);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const content = contentModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          content,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        personalityInsightsService.profile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await personalityInsightsService.profile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const profilePromise = personalityInsightsService.profile();
        expectToBePromise(profilePromise);

        profilePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('profileAsCsv', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ContentItem
      const contentItemModel = {
        content: 'testString',
        id: 'testString',
        created: 26,
        updated: 26,
        contenttype: 'text/plain',
        language: 'ar',
        parentid: 'testString',
        reply: true,
        forward: true,
      };

      // Content
      const contentModel = {
        contentItems: [contentItemModel],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation profileAsCsv
        const content = contentModel;
        const contentType = 'application/json';
        const contentLanguage = 'ar';
        const acceptLanguage = 'ar';
        const rawScores = true;
        const csvHeaders = true;
        const consumptionPreferences = true;
        const params = {
          content: content,
          contentType: contentType,
          contentLanguage: contentLanguage,
          acceptLanguage: acceptLanguage,
          rawScores: rawScores,
          csvHeaders: csvHeaders,
          consumptionPreferences: consumptionPreferences,
        };

        const profileAsCsvResult = personalityInsightsService.profileAsCsv(params);

        // all methods should return a Promise
        expectToBePromise(profileAsCsvResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/profile', 'POST');
        const expectedAccept = 'text/csv';
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        checkUserHeader(createRequestMock, 'Content-Language', contentLanguage);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(options.body).toEqual(content);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['raw_scores']).toEqual(rawScores);
        expect(options.qs['csv_headers']).toEqual(csvHeaders);
        expect(options.qs['consumption_preferences']).toEqual(consumptionPreferences);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const content = contentModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          content,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        personalityInsightsService.profileAsCsv(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await personalityInsightsService.profileAsCsv({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const profileAsCsvPromise = personalityInsightsService.profileAsCsv();
        expectToBePromise(profileAsCsvPromise);

        profileAsCsvPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
