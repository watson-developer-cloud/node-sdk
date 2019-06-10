/**
 * Copyright 2019 IBM All Rights Reserved.
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

const helper = require('ibm-cloud-sdk-core');
const PersonalityInsightsV3 = require('../../personality-insights/v3');
const utils = require('../resources/unitTestUtils');

const {
  getOptions,
  checkUrlAndMethod,
  checkCallback,
  checkMediaHeaders,
  missingParamsSuccess,
  expectToBePromise,
  missingParamsError,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  checkUserHeader,
} = utils;

const noop = () => {};

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/personality-insights/api/personality-insights/api',
  version: '2018-10-18',
};

const personalityInsights = new PersonalityInsightsV3(service);
const createRequestMock = jest.spyOn(personalityInsights, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('profile', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const content = 'fake_content';
      const content_language = 'fake_content_language';
      const accept_language = 'fake_accept_language';
      const raw_scores = 'fake_raw_scores';
      const csv_headers = 'fake_csv_headers';
      const consumption_preferences = 'fake_consumption_preferences';
      const content_type = 'fake_content_type';
      const params = {
        content,
        content_language,
        accept_language,
        raw_scores,
        csv_headers,
        consumption_preferences,
        content_type,
      };

      // invoke method
      personalityInsights.profile(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/profile', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = content_type;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Content-Language', content_language);
      checkUserHeader(createRequestMock, 'Accept-Language', accept_language);
      checkUserHeader(createRequestMock, 'Content-Type', content_type);
      expect(options.body).toEqual(content);
      expect(options.qs['raw_scores']).toEqual(raw_scores);
      expect(options.qs['csv_headers']).toEqual(csv_headers);
      expect(options.qs['consumption_preferences']).toEqual(consumption_preferences);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const content = 'fake_content';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        content,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      personalityInsights.profile(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      personalityInsights.profile(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['content'];

      personalityInsights.profile({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
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
      const content_language = 'fake_content_language';
      const accept_language = 'fake_accept_language';
      const raw_scores = 'fake_raw_scores';
      const csv_headers = 'fake_csv_headers';
      const consumption_preferences = 'fake_consumption_preferences';
      const content_type = 'fake_content_type';
      const params = {
        content,
        content_language,
        accept_language,
        raw_scores,
        csv_headers,
        consumption_preferences,
        content_type,
      };

      // invoke method
      personalityInsights.profileAsCsv(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/profile', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'text/csv';
      const expectedContentType = content_type;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Content-Language', content_language);
      checkUserHeader(createRequestMock, 'Accept-Language', accept_language);
      checkUserHeader(createRequestMock, 'Content-Type', content_type);
      expect(options.body).toEqual(content);
      expect(options.qs['raw_scores']).toEqual(raw_scores);
      expect(options.qs['csv_headers']).toEqual(csv_headers);
      expect(options.qs['consumption_preferences']).toEqual(consumption_preferences);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const content = 'fake_content';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        content,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      personalityInsights.profileAsCsv(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      personalityInsights.profileAsCsv(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['content'];

      personalityInsights.profileAsCsv({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
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
