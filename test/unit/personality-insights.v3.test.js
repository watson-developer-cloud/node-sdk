/**
 * (C) Copyright IBM Corp. 2019.
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

const helper = require('ibm-cloud-sdk-core'); // for mocking `getMissingParams`
const { NoAuthAuthenticator } = require('ibm-cloud-sdk-core');
const PersonalityInsightsV3 = require('../../personality-insights/v3');
const utils = require('../resources/unitTestUtils');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  missingParamsSuccess,
  expectToBePromise,
  missingParamsError,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  checkUserHeader,
} = utils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://gateway.watsonplatform.net/personality-insights/api/personality-insights/api',
  version: '2018-10-18',
};

const personalityInsights = new PersonalityInsightsV3(service);
const createRequestMock = jest.spyOn(personalityInsights, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
  missingParamsMock.mockClear();
});

describe('PersonalityInsightsV3', () => {
  describe('profile', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
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

        personalityInsights.profile(params);

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

      test('should return a promise when no callback is given', () => {
        // parameters
        const content = 'fake_content';
        const params = {
          content,
        };

        // invoke method
        const profilePromise = personalityInsights.profile(params);
        expectToBePromise(profilePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        personalityInsights.profile(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['content'];

        let err;
        try {
          await personalityInsights.profile({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['content'];

        const profilePromise = personalityInsights.profile();
        expectToBePromise(profilePromise);

        profilePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('profileAsCsv', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
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

        personalityInsights.profileAsCsv(params);

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

      test('should return a promise when no callback is given', () => {
        // parameters
        const content = 'fake_content';
        const params = {
          content,
        };

        // invoke method
        const profileAsCsvPromise = personalityInsights.profileAsCsv(params);
        expectToBePromise(profileAsCsvPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        personalityInsights.profileAsCsv(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['content'];

        let err;
        try {
          await personalityInsights.profileAsCsv({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['content'];

        const profileAsCsvPromise = personalityInsights.profileAsCsv();
        expectToBePromise(profileAsCsvPromise);

        profileAsCsvPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
});
