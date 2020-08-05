/**
 * (C) Copyright IBM Corp. 2018, 2020.
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

const { NoAuthAuthenticator, unitTestUtils } = require('ibm-cloud-sdk-core');
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
  version: '2018-10-18',
};

const personalityInsights = new PersonalityInsightsV3(service);
const createRequestMock = jest.spyOn(personalityInsights, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('PersonalityInsightsV3', () => {
  describe('profile', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const content = 'fake_content';
        const contentType = 'fake_contentType';
        const contentLanguage = 'fake_contentLanguage';
        const acceptLanguage = 'fake_acceptLanguage';
        const rawScores = 'fake_rawScores';
        const csvHeaders = 'fake_csvHeaders';
        const consumptionPreferences = 'fake_consumptionPreferences';
        const params = {
          content,
          contentType,
          contentLanguage,
          acceptLanguage,
          rawScores,
          csvHeaders,
          consumptionPreferences,
        };

        const profileResult = personalityInsights.profile(params);

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
        expect(options.qs['raw_scores']).toEqual(rawScores);
        expect(options.qs['csv_headers']).toEqual(csvHeaders);
        expect(options.qs['consumption_preferences']).toEqual(consumptionPreferences);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const content = 'fake_content';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          content,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        personalityInsights.profile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['content'];

        let err;
        try {
          await personalityInsights.profile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['content'];

        const profilePromise = personalityInsights.profile();
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
      test('should pass the right params to createRequest', () => {
        // parameters
        const content = 'fake_content';
        const contentType = 'fake_contentType';
        const contentLanguage = 'fake_contentLanguage';
        const acceptLanguage = 'fake_acceptLanguage';
        const rawScores = 'fake_rawScores';
        const csvHeaders = 'fake_csvHeaders';
        const consumptionPreferences = 'fake_consumptionPreferences';
        const params = {
          content,
          contentType,
          contentLanguage,
          acceptLanguage,
          rawScores,
          csvHeaders,
          consumptionPreferences,
        };

        const profileAsCsvResult = personalityInsights.profileAsCsv(params);

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
        expect(options.qs['raw_scores']).toEqual(rawScores);
        expect(options.qs['csv_headers']).toEqual(csvHeaders);
        expect(options.qs['consumption_preferences']).toEqual(consumptionPreferences);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const content = 'fake_content';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          content,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        personalityInsights.profileAsCsv(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['content'];

        let err;
        try {
          await personalityInsights.profileAsCsv({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['content'];

        const profileAsCsvPromise = personalityInsights.profileAsCsv();
        expectToBePromise(profileAsCsvPromise);

        profileAsCsvPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
