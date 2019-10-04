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
const DiscoveryV1 = require('../../discovery/v1');
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
  checkDefaultSuccessArgs,
} = utils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://gateway.watsonplatform.net/discovery/api/discovery/api',
  version: '2018-10-18',
};

const discovery = new DiscoveryV1(service);
const createRequestMock = jest.spyOn(discovery, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
  missingParamsMock.mockClear();
});

describe('DiscoveryV1', () => {
  describe('createEnvironment', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const name = 'fake_name';
        const description = 'fake_description';
        const size = 'fake_size';
        const params = {
          name,
          description,
          size,
        };

        discovery.createEnvironment(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['size']).toEqual(size);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'fake_name';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createEnvironment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const name = 'fake_name';
        const params = {
          name,
        };

        // invoke method
        const createEnvironmentPromise = discovery.createEnvironment(params);
        expectToBePromise(createEnvironmentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.createEnvironment(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['name'];

        let err;
        try {
          await discovery.createEnvironment({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['name'];

        const createEnvironmentPromise = discovery.createEnvironment();
        expectToBePromise(createEnvironmentPromise);

        createEnvironmentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listEnvironments', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const name = 'fake_name';
        const params = {
          name,
        };

        discovery.listEnvironments(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listEnvironments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const params = {};

        // invoke method
        const listEnvironmentsPromise = discovery.listEnvironments(params);
        expectToBePromise(listEnvironmentsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        discovery.listEnvironments({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await discovery.listEnvironments(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getEnvironment', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        discovery.getEnvironment(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getEnvironment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        // invoke method
        const getEnvironmentPromise = discovery.getEnvironment(params);
        expectToBePromise(getEnvironmentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getEnvironment(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        let err;
        try {
          await discovery.getEnvironment({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        const getEnvironmentPromise = discovery.getEnvironment();
        expectToBePromise(getEnvironmentPromise);

        getEnvironmentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateEnvironment', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const name = 'fake_name';
        const description = 'fake_description';
        const size = 'fake_size';
        const params = {
          environmentId,
          name,
          description,
          size,
        };

        discovery.updateEnvironment(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['size']).toEqual(size);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.updateEnvironment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        // invoke method
        const updateEnvironmentPromise = discovery.updateEnvironment(params);
        expectToBePromise(updateEnvironmentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.updateEnvironment(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        let err;
        try {
          await discovery.updateEnvironment({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        const updateEnvironmentPromise = discovery.updateEnvironment();
        expectToBePromise(updateEnvironmentPromise);

        updateEnvironmentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteEnvironment', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        discovery.deleteEnvironment(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteEnvironment(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        // invoke method
        const deleteEnvironmentPromise = discovery.deleteEnvironment(params);
        expectToBePromise(deleteEnvironmentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteEnvironment(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        let err;
        try {
          await discovery.deleteEnvironment({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        const deleteEnvironmentPromise = discovery.deleteEnvironment();
        expectToBePromise(deleteEnvironmentPromise);

        deleteEnvironmentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listFields', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionIds = 'fake_collectionIds';
        const params = {
          environmentId,
          collectionIds,
        };

        discovery.listFields(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/fields', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['collection_ids']).toEqual(collectionIds);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionIds = 'fake_collectionIds';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionIds,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listFields(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionIds = 'fake_collectionIds';
        const params = {
          environmentId,
          collectionIds,
        };

        // invoke method
        const listFieldsPromise = discovery.listFields(params);
        expectToBePromise(listFieldsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.listFields(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionIds'];

        let err;
        try {
          await discovery.listFields({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionIds'];

        const listFieldsPromise = discovery.listFields();
        expectToBePromise(listFieldsPromise);

        listFieldsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createConfiguration', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const name = 'fake_name';
        const description = 'fake_description';
        const conversions = 'fake_conversions';
        const enrichments = 'fake_enrichments';
        const normalizations = 'fake_normalizations';
        const source = 'fake_source';
        const params = {
          environmentId,
          name,
          description,
          conversions,
          enrichments,
          normalizations,
          source,
        };

        discovery.createConfiguration(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/configurations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['conversions']).toEqual(conversions);
        expect(options.body['enrichments']).toEqual(enrichments);
        expect(options.body['normalizations']).toEqual(normalizations);
        expect(options.body['source']).toEqual(source);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const name = 'fake_name';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const name = 'fake_name';
        const params = {
          environmentId,
          name,
        };

        // invoke method
        const createConfigurationPromise = discovery.createConfiguration(params);
        expectToBePromise(createConfigurationPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.createConfiguration(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'name'];

        let err;
        try {
          await discovery.createConfiguration({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'name'];

        const createConfigurationPromise = discovery.createConfiguration();
        expectToBePromise(createConfigurationPromise);

        createConfigurationPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listConfigurations', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const name = 'fake_name';
        const params = {
          environmentId,
          name,
        };

        discovery.listConfigurations(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/configurations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['name']).toEqual(name);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listConfigurations(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        // invoke method
        const listConfigurationsPromise = discovery.listConfigurations(params);
        expectToBePromise(listConfigurationsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.listConfigurations(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        let err;
        try {
          await discovery.listConfigurations({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        const listConfigurationsPromise = discovery.listConfigurations();
        expectToBePromise(listConfigurationsPromise);

        listConfigurationsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getConfiguration', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const configurationId = 'fake_configurationId';
        const params = {
          environmentId,
          configurationId,
        };

        discovery.getConfiguration(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/configurations/{configuration_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['configuration_id']).toEqual(configurationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const configurationId = 'fake_configurationId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          configurationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const configurationId = 'fake_configurationId';
        const params = {
          environmentId,
          configurationId,
        };

        // invoke method
        const getConfigurationPromise = discovery.getConfiguration(params);
        expectToBePromise(getConfigurationPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getConfiguration(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'configurationId'];

        let err;
        try {
          await discovery.getConfiguration({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'configurationId'];

        const getConfigurationPromise = discovery.getConfiguration();
        expectToBePromise(getConfigurationPromise);

        getConfigurationPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateConfiguration', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const configurationId = 'fake_configurationId';
        const name = 'fake_name';
        const description = 'fake_description';
        const conversions = 'fake_conversions';
        const enrichments = 'fake_enrichments';
        const normalizations = 'fake_normalizations';
        const source = 'fake_source';
        const params = {
          environmentId,
          configurationId,
          name,
          description,
          conversions,
          enrichments,
          normalizations,
          source,
        };

        discovery.updateConfiguration(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/configurations/{configuration_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['conversions']).toEqual(conversions);
        expect(options.body['enrichments']).toEqual(enrichments);
        expect(options.body['normalizations']).toEqual(normalizations);
        expect(options.body['source']).toEqual(source);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['configuration_id']).toEqual(configurationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const configurationId = 'fake_configurationId';
        const name = 'fake_name';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          configurationId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.updateConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const configurationId = 'fake_configurationId';
        const name = 'fake_name';
        const params = {
          environmentId,
          configurationId,
          name,
        };

        // invoke method
        const updateConfigurationPromise = discovery.updateConfiguration(params);
        expectToBePromise(updateConfigurationPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.updateConfiguration(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'configurationId', 'name'];

        let err;
        try {
          await discovery.updateConfiguration({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'configurationId', 'name'];

        const updateConfigurationPromise = discovery.updateConfiguration();
        expectToBePromise(updateConfigurationPromise);

        updateConfigurationPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteConfiguration', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const configurationId = 'fake_configurationId';
        const params = {
          environmentId,
          configurationId,
        };

        discovery.deleteConfiguration(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/configurations/{configuration_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['configuration_id']).toEqual(configurationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const configurationId = 'fake_configurationId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          configurationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteConfiguration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const configurationId = 'fake_configurationId';
        const params = {
          environmentId,
          configurationId,
        };

        // invoke method
        const deleteConfigurationPromise = discovery.deleteConfiguration(params);
        expectToBePromise(deleteConfigurationPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteConfiguration(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'configurationId'];

        let err;
        try {
          await discovery.deleteConfiguration({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'configurationId'];

        const deleteConfigurationPromise = discovery.deleteConfiguration();
        expectToBePromise(deleteConfigurationPromise);

        deleteConfigurationPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createCollection', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const name = 'fake_name';
        const description = 'fake_description';
        const configurationId = 'fake_configurationId';
        const language = 'fake_language';
        const params = {
          environmentId,
          name,
          description,
          configurationId,
          language,
        };

        discovery.createCollection(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['configuration_id']).toEqual(configurationId);
        expect(options.body['language']).toEqual(language);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const name = 'fake_name';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const name = 'fake_name';
        const params = {
          environmentId,
          name,
        };

        // invoke method
        const createCollectionPromise = discovery.createCollection(params);
        expectToBePromise(createCollectionPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.createCollection(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'name'];

        let err;
        try {
          await discovery.createCollection({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'name'];

        const createCollectionPromise = discovery.createCollection();
        expectToBePromise(createCollectionPromise);

        createCollectionPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listCollections', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const name = 'fake_name';
        const params = {
          environmentId,
          name,
        };

        discovery.listCollections(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['name']).toEqual(name);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listCollections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        // invoke method
        const listCollectionsPromise = discovery.listCollections(params);
        expectToBePromise(listCollectionsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.listCollections(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        let err;
        try {
          await discovery.listCollections({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        const listCollectionsPromise = discovery.listCollections();
        expectToBePromise(listCollectionsPromise);

        listCollectionsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getCollection', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.getCollection(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const getCollectionPromise = discovery.getCollection(params);
        expectToBePromise(getCollectionPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getCollection(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.getCollection({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const getCollectionPromise = discovery.getCollection();
        expectToBePromise(getCollectionPromise);

        getCollectionPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateCollection', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const name = 'fake_name';
        const description = 'fake_description';
        const configurationId = 'fake_configurationId';
        const params = {
          environmentId,
          collectionId,
          name,
          description,
          configurationId,
        };

        discovery.updateCollection(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['description']).toEqual(description);
        expect(options.body['configuration_id']).toEqual(configurationId);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.updateCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const updateCollectionPromise = discovery.updateCollection(params);
        expectToBePromise(updateCollectionPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.updateCollection(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.updateCollection({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const updateCollectionPromise = discovery.updateCollection();
        expectToBePromise(updateCollectionPromise);

        updateCollectionPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteCollection', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.deleteCollection(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteCollection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const deleteCollectionPromise = discovery.deleteCollection(params);
        expectToBePromise(deleteCollectionPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteCollection(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.deleteCollection({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const deleteCollectionPromise = discovery.deleteCollection();
        expectToBePromise(deleteCollectionPromise);

        deleteCollectionPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listCollectionFields', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.listCollectionFields(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/fields', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listCollectionFields(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const listCollectionFieldsPromise = discovery.listCollectionFields(params);
        expectToBePromise(listCollectionFieldsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.listCollectionFields(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.listCollectionFields({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const listCollectionFieldsPromise = discovery.listCollectionFields();
        expectToBePromise(listCollectionFieldsPromise);

        listCollectionFieldsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listExpansions', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.listExpansions(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/expansions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listExpansions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const listExpansionsPromise = discovery.listExpansions(params);
        expectToBePromise(listExpansionsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.listExpansions(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.listExpansions({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const listExpansionsPromise = discovery.listExpansions();
        expectToBePromise(listExpansionsPromise);

        listExpansionsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createExpansions', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const expansions = 'fake_expansions';
        const params = {
          environmentId,
          collectionId,
          expansions,
        };

        discovery.createExpansions(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/expansions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['expansions']).toEqual(expansions);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const expansions = 'fake_expansions';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          expansions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createExpansions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const expansions = 'fake_expansions';
        const params = {
          environmentId,
          collectionId,
          expansions,
        };

        // invoke method
        const createExpansionsPromise = discovery.createExpansions(params);
        expectToBePromise(createExpansionsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.createExpansions(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'expansions'];

        let err;
        try {
          await discovery.createExpansions({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'expansions'];

        const createExpansionsPromise = discovery.createExpansions();
        expectToBePromise(createExpansionsPromise);

        createExpansionsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteExpansions', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.deleteExpansions(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/expansions', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteExpansions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const deleteExpansionsPromise = discovery.deleteExpansions(params);
        expectToBePromise(deleteExpansionsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteExpansions(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.deleteExpansions({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const deleteExpansionsPromise = discovery.deleteExpansions();
        expectToBePromise(deleteExpansionsPromise);

        deleteExpansionsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getTokenizationDictionaryStatus', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.getTokenizationDictionaryStatus(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getTokenizationDictionaryStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const getTokenizationDictionaryStatusPromise = discovery.getTokenizationDictionaryStatus(params);
        expectToBePromise(getTokenizationDictionaryStatusPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getTokenizationDictionaryStatus(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.getTokenizationDictionaryStatus({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const getTokenizationDictionaryStatusPromise = discovery.getTokenizationDictionaryStatus();
        expectToBePromise(getTokenizationDictionaryStatusPromise);

        getTokenizationDictionaryStatusPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createTokenizationDictionary', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const tokenizationRules = 'fake_tokenizationRules';
        const params = {
          environmentId,
          collectionId,
          tokenizationRules,
        };

        discovery.createTokenizationDictionary(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['tokenization_rules']).toEqual(tokenizationRules);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createTokenizationDictionary(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const createTokenizationDictionaryPromise = discovery.createTokenizationDictionary(params);
        expectToBePromise(createTokenizationDictionaryPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.createTokenizationDictionary(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.createTokenizationDictionary({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const createTokenizationDictionaryPromise = discovery.createTokenizationDictionary();
        expectToBePromise(createTokenizationDictionaryPromise);

        createTokenizationDictionaryPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteTokenizationDictionary', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.deleteTokenizationDictionary(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteTokenizationDictionary(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const deleteTokenizationDictionaryPromise = discovery.deleteTokenizationDictionary(params);
        expectToBePromise(deleteTokenizationDictionaryPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteTokenizationDictionary(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.deleteTokenizationDictionary({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const deleteTokenizationDictionaryPromise = discovery.deleteTokenizationDictionary();
        expectToBePromise(deleteTokenizationDictionaryPromise);

        deleteTokenizationDictionaryPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getStopwordListStatus', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.getStopwordListStatus(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getStopwordListStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const getStopwordListStatusPromise = discovery.getStopwordListStatus(params);
        expectToBePromise(getStopwordListStatusPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getStopwordListStatus(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.getStopwordListStatus({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const getStopwordListStatusPromise = discovery.getStopwordListStatus();
        expectToBePromise(getStopwordListStatusPromise);

        getStopwordListStatusPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createStopwordList', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const stopwordFile = 'fake_stopwordFile';
        const stopwordFilename = 'fake_stopwordFilename';
        const params = {
          environmentId,
          collectionId,
          stopwordFile,
          stopwordFilename,
        };

        discovery.createStopwordList(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['stopword_file'].data).toEqual(stopwordFile);
        expect(options.formData['stopword_file'].filename).toEqual(stopwordFilename);
        expect(options.formData['stopword_file'].contentType).toEqual('application/octet-stream');
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const stopwordFile = 'fake_stopwordFile';
        const stopwordFilename = 'fake_stopwordFilename';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
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

        discovery.createStopwordList(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const stopwordFile = 'fake_stopwordFile';
        const stopwordFilename = 'fake_stopwordFilename';
        const params = {
          environmentId,
          collectionId,
          stopwordFile,
          stopwordFilename,
        };

        // invoke method
        const createStopwordListPromise = discovery.createStopwordList(params);
        expectToBePromise(createStopwordListPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.createStopwordList(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'stopwordFile', 'stopwordFilename'];

        let err;
        try {
          await discovery.createStopwordList({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'stopwordFile', 'stopwordFilename'];

        const createStopwordListPromise = discovery.createStopwordList();
        expectToBePromise(createStopwordListPromise);

        createStopwordListPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteStopwordList', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.deleteStopwordList(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteStopwordList(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const deleteStopwordListPromise = discovery.deleteStopwordList(params);
        expectToBePromise(deleteStopwordListPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteStopwordList(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.deleteStopwordList({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const deleteStopwordListPromise = discovery.deleteStopwordList();
        expectToBePromise(deleteStopwordListPromise);

        deleteStopwordListPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('addDocument', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const file = 'fake_file';
        const filename = 'fake_filename';
        const fileContentType = 'fake_fileContentType';
        const metadata = 'fake_metadata';
        const params = {
          environmentId,
          collectionId,
          file,
          filename,
          fileContentType,
          metadata,
        };

        discovery.addDocument(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/documents', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].filename).toEqual(filename);
        expect(options.formData['file'].contentType).toEqual(fileContentType);
        expect(options.formData['metadata']).toEqual(metadata);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.addDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const addDocumentPromise = discovery.addDocument(params);
        expectToBePromise(addDocumentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.addDocument(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.addDocument({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const addDocumentPromise = discovery.addDocument();
        expectToBePromise(addDocumentPromise);

        addDocumentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getDocumentStatus', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const params = {
          environmentId,
          collectionId,
          documentId,
        };

        discovery.getDocumentStatus(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getDocumentStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const params = {
          environmentId,
          collectionId,
          documentId,
        };

        // invoke method
        const getDocumentStatusPromise = discovery.getDocumentStatus(params);
        expectToBePromise(getDocumentStatusPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getDocumentStatus(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'documentId'];

        let err;
        try {
          await discovery.getDocumentStatus({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'documentId'];

        const getDocumentStatusPromise = discovery.getDocumentStatus();
        expectToBePromise(getDocumentStatusPromise);

        getDocumentStatusPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateDocument', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const file = 'fake_file';
        const filename = 'fake_filename';
        const fileContentType = 'fake_fileContentType';
        const metadata = 'fake_metadata';
        const params = {
          environmentId,
          collectionId,
          documentId,
          file,
          filename,
          fileContentType,
          metadata,
        };

        discovery.updateDocument(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].filename).toEqual(filename);
        expect(options.formData['file'].contentType).toEqual(fileContentType);
        expect(options.formData['metadata']).toEqual(metadata);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.updateDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const params = {
          environmentId,
          collectionId,
          documentId,
        };

        // invoke method
        const updateDocumentPromise = discovery.updateDocument(params);
        expectToBePromise(updateDocumentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.updateDocument(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'documentId'];

        let err;
        try {
          await discovery.updateDocument({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'documentId'];

        const updateDocumentPromise = discovery.updateDocument();
        expectToBePromise(updateDocumentPromise);

        updateDocumentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteDocument', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const params = {
          environmentId,
          collectionId,
          documentId,
        };

        discovery.deleteDocument(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['document_id']).toEqual(documentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          documentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteDocument(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const documentId = 'fake_documentId';
        const params = {
          environmentId,
          collectionId,
          documentId,
        };

        // invoke method
        const deleteDocumentPromise = discovery.deleteDocument(params);
        expectToBePromise(deleteDocumentPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteDocument(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'documentId'];

        let err;
        try {
          await discovery.deleteDocument({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'documentId'];

        const deleteDocumentPromise = discovery.deleteDocument();
        expectToBePromise(deleteDocumentPromise);

        deleteDocumentPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('query', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const filter = 'fake_filter';
        const query = 'fake_query';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const passages = 'fake_passages';
        const aggregation = 'fake_aggregation';
        const count = 'fake_count';
        const _return = 'fake__return';
        const offset = 'fake_offset';
        const sort = 'fake_sort';
        const highlight = 'fake_highlight';
        const passagesFields = 'fake_passagesFields';
        const passagesCount = 'fake_passagesCount';
        const passagesCharacters = 'fake_passagesCharacters';
        const deduplicate = 'fake_deduplicate';
        const deduplicateField = 'fake_deduplicateField';
        const similar = 'fake_similar';
        const similarDocumentIds = 'fake_similarDocumentIds';
        const similarFields = 'fake_similarFields';
        const bias = 'fake_bias';
        const spellingSuggestions = 'fake_spellingSuggestions';
        const xWatsonLoggingOptOut = 'fake_xWatsonLoggingOptOut';
        const params = {
          environmentId,
          collectionId,
          filter,
          query,
          naturalLanguageQuery,
          passages,
          aggregation,
          count,
          _return,
          offset,
          sort,
          highlight,
          passagesFields,
          passagesCount,
          passagesCharacters,
          deduplicate,
          deduplicateField,
          similar,
          similarDocumentIds,
          similarFields,
          bias,
          spellingSuggestions,
          xWatsonLoggingOptOut,
        };

        discovery.query(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/query', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Watson-Logging-Opt-Out', xWatsonLoggingOptOut);
        expect(options.body['filter']).toEqual(filter);
        expect(options.body['query']).toEqual(query);
        expect(options.body['natural_language_query']).toEqual(naturalLanguageQuery);
        expect(options.body['passages']).toEqual(passages);
        expect(options.body['aggregation']).toEqual(aggregation);
        expect(options.body['count']).toEqual(count);
        expect(options.body['return']).toEqual(_return);
        expect(options.body['offset']).toEqual(offset);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['highlight']).toEqual(highlight);
        expect(options.body['passages.fields']).toEqual(passagesFields);
        expect(options.body['passages.count']).toEqual(passagesCount);
        expect(options.body['passages.characters']).toEqual(passagesCharacters);
        expect(options.body['deduplicate']).toEqual(deduplicate);
        expect(options.body['deduplicate.field']).toEqual(deduplicateField);
        expect(options.body['similar']).toEqual(similar);
        expect(options.body['similar.document_ids']).toEqual(similarDocumentIds);
        expect(options.body['similar.fields']).toEqual(similarFields);
        expect(options.body['bias']).toEqual(bias);
        expect(options.body['spelling_suggestions']).toEqual(spellingSuggestions);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.query(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const queryPromise = discovery.query(params);
        expectToBePromise(queryPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.query(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.query({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const queryPromise = discovery.query();
        expectToBePromise(queryPromise);

        queryPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('queryNotices', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const filter = 'fake_filter';
        const query = 'fake_query';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const passages = 'fake_passages';
        const aggregation = 'fake_aggregation';
        const count = 'fake_count';
        const _return = 'fake__return';
        const offset = 'fake_offset';
        const sort = 'fake_sort';
        const highlight = 'fake_highlight';
        const passagesFields = 'fake_passagesFields';
        const passagesCount = 'fake_passagesCount';
        const passagesCharacters = 'fake_passagesCharacters';
        const deduplicateField = 'fake_deduplicateField';
        const similar = 'fake_similar';
        const similarDocumentIds = 'fake_similarDocumentIds';
        const similarFields = 'fake_similarFields';
        const params = {
          environmentId,
          collectionId,
          filter,
          query,
          naturalLanguageQuery,
          passages,
          aggregation,
          count,
          _return,
          offset,
          sort,
          highlight,
          passagesFields,
          passagesCount,
          passagesCharacters,
          deduplicateField,
          similar,
          similarDocumentIds,
          similarFields,
        };

        discovery.queryNotices(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/notices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['query']).toEqual(query);
        expect(options.qs['natural_language_query']).toEqual(naturalLanguageQuery);
        expect(options.qs['passages']).toEqual(passages);
        expect(options.qs['aggregation']).toEqual(aggregation);
        expect(options.qs['count']).toEqual(count);
        expect(options.qs['return']).toEqual(_return);
        expect(options.qs['offset']).toEqual(offset);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['highlight']).toEqual(highlight);
        expect(options.qs['passages.fields']).toEqual(passagesFields);
        expect(options.qs['passages.count']).toEqual(passagesCount);
        expect(options.qs['passages.characters']).toEqual(passagesCharacters);
        expect(options.qs['deduplicate.field']).toEqual(deduplicateField);
        expect(options.qs['similar']).toEqual(similar);
        expect(options.qs['similar.document_ids']).toEqual(similarDocumentIds);
        expect(options.qs['similar.fields']).toEqual(similarFields);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.queryNotices(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const queryNoticesPromise = discovery.queryNotices(params);
        expectToBePromise(queryNoticesPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.queryNotices(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.queryNotices({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const queryNoticesPromise = discovery.queryNotices();
        expectToBePromise(queryNoticesPromise);

        queryNoticesPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('federatedQuery', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionIds = 'fake_collectionIds';
        const filter = 'fake_filter';
        const query = 'fake_query';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const passages = 'fake_passages';
        const aggregation = 'fake_aggregation';
        const count = 'fake_count';
        const _return = 'fake__return';
        const offset = 'fake_offset';
        const sort = 'fake_sort';
        const highlight = 'fake_highlight';
        const passagesFields = 'fake_passagesFields';
        const passagesCount = 'fake_passagesCount';
        const passagesCharacters = 'fake_passagesCharacters';
        const deduplicate = 'fake_deduplicate';
        const deduplicateField = 'fake_deduplicateField';
        const similar = 'fake_similar';
        const similarDocumentIds = 'fake_similarDocumentIds';
        const similarFields = 'fake_similarFields';
        const bias = 'fake_bias';
        const xWatsonLoggingOptOut = 'fake_xWatsonLoggingOptOut';
        const params = {
          environmentId,
          collectionIds,
          filter,
          query,
          naturalLanguageQuery,
          passages,
          aggregation,
          count,
          _return,
          offset,
          sort,
          highlight,
          passagesFields,
          passagesCount,
          passagesCharacters,
          deduplicate,
          deduplicateField,
          similar,
          similarDocumentIds,
          similarFields,
          bias,
          xWatsonLoggingOptOut,
        };

        discovery.federatedQuery(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/query', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Watson-Logging-Opt-Out', xWatsonLoggingOptOut);
        expect(options.body['collection_ids']).toEqual(collectionIds);
        expect(options.body['filter']).toEqual(filter);
        expect(options.body['query']).toEqual(query);
        expect(options.body['natural_language_query']).toEqual(naturalLanguageQuery);
        expect(options.body['passages']).toEqual(passages);
        expect(options.body['aggregation']).toEqual(aggregation);
        expect(options.body['count']).toEqual(count);
        expect(options.body['return']).toEqual(_return);
        expect(options.body['offset']).toEqual(offset);
        expect(options.body['sort']).toEqual(sort);
        expect(options.body['highlight']).toEqual(highlight);
        expect(options.body['passages.fields']).toEqual(passagesFields);
        expect(options.body['passages.count']).toEqual(passagesCount);
        expect(options.body['passages.characters']).toEqual(passagesCharacters);
        expect(options.body['deduplicate']).toEqual(deduplicate);
        expect(options.body['deduplicate.field']).toEqual(deduplicateField);
        expect(options.body['similar']).toEqual(similar);
        expect(options.body['similar.document_ids']).toEqual(similarDocumentIds);
        expect(options.body['similar.fields']).toEqual(similarFields);
        expect(options.body['bias']).toEqual(bias);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.federatedQuery(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        // invoke method
        const federatedQueryPromise = discovery.federatedQuery(params);
        expectToBePromise(federatedQueryPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.federatedQuery(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        let err;
        try {
          await discovery.federatedQuery({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        const federatedQueryPromise = discovery.federatedQuery();
        expectToBePromise(federatedQueryPromise);

        federatedQueryPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('federatedQueryNotices', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionIds = 'fake_collectionIds';
        const filter = 'fake_filter';
        const query = 'fake_query';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const aggregation = 'fake_aggregation';
        const count = 'fake_count';
        const _return = 'fake__return';
        const offset = 'fake_offset';
        const sort = 'fake_sort';
        const highlight = 'fake_highlight';
        const deduplicateField = 'fake_deduplicateField';
        const similar = 'fake_similar';
        const similarDocumentIds = 'fake_similarDocumentIds';
        const similarFields = 'fake_similarFields';
        const params = {
          environmentId,
          collectionIds,
          filter,
          query,
          naturalLanguageQuery,
          aggregation,
          count,
          _return,
          offset,
          sort,
          highlight,
          deduplicateField,
          similar,
          similarDocumentIds,
          similarFields,
        };

        discovery.federatedQueryNotices(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/notices', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['collection_ids']).toEqual(collectionIds);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['query']).toEqual(query);
        expect(options.qs['natural_language_query']).toEqual(naturalLanguageQuery);
        expect(options.qs['aggregation']).toEqual(aggregation);
        expect(options.qs['count']).toEqual(count);
        expect(options.qs['return']).toEqual(_return);
        expect(options.qs['offset']).toEqual(offset);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['highlight']).toEqual(highlight);
        expect(options.qs['deduplicate.field']).toEqual(deduplicateField);
        expect(options.qs['similar']).toEqual(similar);
        expect(options.qs['similar.document_ids']).toEqual(similarDocumentIds);
        expect(options.qs['similar.fields']).toEqual(similarFields);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionIds = 'fake_collectionIds';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionIds,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.federatedQueryNotices(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionIds = 'fake_collectionIds';
        const params = {
          environmentId,
          collectionIds,
        };

        // invoke method
        const federatedQueryNoticesPromise = discovery.federatedQueryNotices(params);
        expectToBePromise(federatedQueryNoticesPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.federatedQueryNotices(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionIds'];

        let err;
        try {
          await discovery.federatedQueryNotices({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionIds'];

        const federatedQueryNoticesPromise = discovery.federatedQueryNotices();
        expectToBePromise(federatedQueryNoticesPromise);

        federatedQueryNoticesPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getAutocompletion', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const prefix = 'fake_prefix';
        const field = 'fake_field';
        const count = 'fake_count';
        const params = {
          environmentId,
          collectionId,
          prefix,
          field,
          count,
        };

        discovery.getAutocompletion(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/autocompletion', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['prefix']).toEqual(prefix);
        expect(options.qs['field']).toEqual(field);
        expect(options.qs['count']).toEqual(count);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const prefix = 'fake_prefix';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          prefix,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getAutocompletion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const prefix = 'fake_prefix';
        const params = {
          environmentId,
          collectionId,
          prefix,
        };

        // invoke method
        const getAutocompletionPromise = discovery.getAutocompletion(params);
        expectToBePromise(getAutocompletionPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getAutocompletion(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'prefix'];

        let err;
        try {
          await discovery.getAutocompletion({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'prefix'];

        const getAutocompletionPromise = discovery.getAutocompletion();
        expectToBePromise(getAutocompletionPromise);

        getAutocompletionPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listTrainingData', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.listTrainingData(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/training_data', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const listTrainingDataPromise = discovery.listTrainingData(params);
        expectToBePromise(listTrainingDataPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.listTrainingData(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.listTrainingData({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const listTrainingDataPromise = discovery.listTrainingData();
        expectToBePromise(listTrainingDataPromise);

        listTrainingDataPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('addTrainingData', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const naturalLanguageQuery = 'fake_naturalLanguageQuery';
        const filter = 'fake_filter';
        const examples = 'fake_examples';
        const params = {
          environmentId,
          collectionId,
          naturalLanguageQuery,
          filter,
          examples,
        };

        discovery.addTrainingData(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/training_data', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['natural_language_query']).toEqual(naturalLanguageQuery);
        expect(options.body['filter']).toEqual(filter);
        expect(options.body['examples']).toEqual(examples);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.addTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const addTrainingDataPromise = discovery.addTrainingData(params);
        expectToBePromise(addTrainingDataPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.addTrainingData(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.addTrainingData({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const addTrainingDataPromise = discovery.addTrainingData();
        expectToBePromise(addTrainingDataPromise);

        addTrainingDataPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteAllTrainingData', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        discovery.deleteAllTrainingData(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/training_data', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteAllTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const params = {
          environmentId,
          collectionId,
        };

        // invoke method
        const deleteAllTrainingDataPromise = discovery.deleteAllTrainingData(params);
        expectToBePromise(deleteAllTrainingDataPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteAllTrainingData(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        let err;
        try {
          await discovery.deleteAllTrainingData({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId'];

        const deleteAllTrainingDataPromise = discovery.deleteAllTrainingData();
        expectToBePromise(deleteAllTrainingDataPromise);

        deleteAllTrainingDataPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getTrainingData', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const params = {
          environmentId,
          collectionId,
          queryId,
        };

        discovery.getTrainingData(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['query_id']).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const params = {
          environmentId,
          collectionId,
          queryId,
        };

        // invoke method
        const getTrainingDataPromise = discovery.getTrainingData(params);
        expectToBePromise(getTrainingDataPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getTrainingData(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId'];

        let err;
        try {
          await discovery.getTrainingData({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId'];

        const getTrainingDataPromise = discovery.getTrainingData();
        expectToBePromise(getTrainingDataPromise);

        getTrainingDataPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteTrainingData', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const params = {
          environmentId,
          collectionId,
          queryId,
        };

        discovery.deleteTrainingData(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['query_id']).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteTrainingData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const params = {
          environmentId,
          collectionId,
          queryId,
        };

        // invoke method
        const deleteTrainingDataPromise = discovery.deleteTrainingData(params);
        expectToBePromise(deleteTrainingDataPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteTrainingData(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId'];

        let err;
        try {
          await discovery.deleteTrainingData({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId'];

        const deleteTrainingDataPromise = discovery.deleteTrainingData();
        expectToBePromise(deleteTrainingDataPromise);

        deleteTrainingDataPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listTrainingExamples', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const params = {
          environmentId,
          collectionId,
          queryId,
        };

        discovery.listTrainingExamples(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['query_id']).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listTrainingExamples(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const params = {
          environmentId,
          collectionId,
          queryId,
        };

        // invoke method
        const listTrainingExamplesPromise = discovery.listTrainingExamples(params);
        expectToBePromise(listTrainingExamplesPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.listTrainingExamples(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId'];

        let err;
        try {
          await discovery.listTrainingExamples({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId'];

        const listTrainingExamplesPromise = discovery.listTrainingExamples();
        expectToBePromise(listTrainingExamplesPromise);

        listTrainingExamplesPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createTrainingExample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const documentId = 'fake_documentId';
        const crossReference = 'fake_crossReference';
        const relevance = 'fake_relevance';
        const params = {
          environmentId,
          collectionId,
          queryId,
          documentId,
          crossReference,
          relevance,
        };

        discovery.createTrainingExample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['document_id']).toEqual(documentId);
        expect(options.body['cross_reference']).toEqual(crossReference);
        expect(options.body['relevance']).toEqual(relevance);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['query_id']).toEqual(queryId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          collectionId,
          queryId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createTrainingExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const params = {
          environmentId,
          collectionId,
          queryId,
        };

        // invoke method
        const createTrainingExamplePromise = discovery.createTrainingExample(params);
        expectToBePromise(createTrainingExamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.createTrainingExample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId'];

        let err;
        try {
          await discovery.createTrainingExample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId'];

        const createTrainingExamplePromise = discovery.createTrainingExample();
        expectToBePromise(createTrainingExamplePromise);

        createTrainingExamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteTrainingExample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const exampleId = 'fake_exampleId';
        const params = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
        };

        discovery.deleteTrainingExample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['query_id']).toEqual(queryId);
        expect(options.path['example_id']).toEqual(exampleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const exampleId = 'fake_exampleId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
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

        discovery.deleteTrainingExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const exampleId = 'fake_exampleId';
        const params = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
        };

        // invoke method
        const deleteTrainingExamplePromise = discovery.deleteTrainingExample(params);
        expectToBePromise(deleteTrainingExamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteTrainingExample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId', 'exampleId'];

        let err;
        try {
          await discovery.deleteTrainingExample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId', 'exampleId'];

        const deleteTrainingExamplePromise = discovery.deleteTrainingExample();
        expectToBePromise(deleteTrainingExamplePromise);

        deleteTrainingExamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateTrainingExample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const exampleId = 'fake_exampleId';
        const crossReference = 'fake_crossReference';
        const relevance = 'fake_relevance';
        const params = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
          crossReference,
          relevance,
        };

        discovery.updateTrainingExample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['cross_reference']).toEqual(crossReference);
        expect(options.body['relevance']).toEqual(relevance);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['query_id']).toEqual(queryId);
        expect(options.path['example_id']).toEqual(exampleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const exampleId = 'fake_exampleId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
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

        discovery.updateTrainingExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const exampleId = 'fake_exampleId';
        const params = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
        };

        // invoke method
        const updateTrainingExamplePromise = discovery.updateTrainingExample(params);
        expectToBePromise(updateTrainingExamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.updateTrainingExample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId', 'exampleId'];

        let err;
        try {
          await discovery.updateTrainingExample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId', 'exampleId'];

        const updateTrainingExamplePromise = discovery.updateTrainingExample();
        expectToBePromise(updateTrainingExamplePromise);

        updateTrainingExamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getTrainingExample', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const exampleId = 'fake_exampleId';
        const params = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
        };

        discovery.getTrainingExample(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['collection_id']).toEqual(collectionId);
        expect(options.path['query_id']).toEqual(queryId);
        expect(options.path['example_id']).toEqual(exampleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const exampleId = 'fake_exampleId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
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

        discovery.getTrainingExample(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const collectionId = 'fake_collectionId';
        const queryId = 'fake_queryId';
        const exampleId = 'fake_exampleId';
        const params = {
          environmentId,
          collectionId,
          queryId,
          exampleId,
        };

        // invoke method
        const getTrainingExamplePromise = discovery.getTrainingExample(params);
        expectToBePromise(getTrainingExamplePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getTrainingExample(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId', 'exampleId'];

        let err;
        try {
          await discovery.getTrainingExample({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'collectionId', 'queryId', 'exampleId'];

        const getTrainingExamplePromise = discovery.getTrainingExample();
        expectToBePromise(getTrainingExamplePromise);

        getTrainingExamplePromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteUserData', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const customerId = 'fake_customerId';
        const params = {
          customerId,
        };

        discovery.deleteUserData(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/user_data', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['customer_id']).toEqual(customerId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customerId = 'fake_customerId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          customerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteUserData(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const customerId = 'fake_customerId';
        const params = {
          customerId,
        };

        // invoke method
        const deleteUserDataPromise = discovery.deleteUserData(params);
        expectToBePromise(deleteUserDataPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteUserData(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        let err;
        try {
          await discovery.deleteUserData({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['customerId'];

        const deleteUserDataPromise = discovery.deleteUserData();
        expectToBePromise(deleteUserDataPromise);

        deleteUserDataPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createEvent', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const type = 'fake_type';
        const data = 'fake_data';
        const params = {
          type,
          data,
        };

        discovery.createEvent(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/events', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['type']).toEqual(type);
        expect(options.body['data']).toEqual(data);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const type = 'fake_type';
        const data = 'fake_data';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          type,
          data,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createEvent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const type = 'fake_type';
        const data = 'fake_data';
        const params = {
          type,
          data,
        };

        // invoke method
        const createEventPromise = discovery.createEvent(params);
        expectToBePromise(createEventPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.createEvent(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['type', 'data'];

        let err;
        try {
          await discovery.createEvent({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['type', 'data'];

        const createEventPromise = discovery.createEvent();
        expectToBePromise(createEventPromise);

        createEventPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('queryLog', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const filter = 'fake_filter';
        const query = 'fake_query';
        const count = 'fake_count';
        const offset = 'fake_offset';
        const sort = 'fake_sort';
        const params = {
          filter,
          query,
          count,
          offset,
          sort,
        };

        discovery.queryLog(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/logs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['query']).toEqual(query);
        expect(options.qs['count']).toEqual(count);
        expect(options.qs['offset']).toEqual(offset);
        expect(options.qs['sort']).toEqual(sort);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.queryLog(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const params = {};

        // invoke method
        const queryLogPromise = discovery.queryLog(params);
        expectToBePromise(queryLogPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        discovery.queryLog({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await discovery.queryLog(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getMetricsQuery', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const startTime = 'fake_startTime';
        const endTime = 'fake_endTime';
        const resultType = 'fake_resultType';
        const params = {
          startTime,
          endTime,
          resultType,
        };

        discovery.getMetricsQuery(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/metrics/number_of_queries', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['start_time']).toEqual(startTime);
        expect(options.qs['end_time']).toEqual(endTime);
        expect(options.qs['result_type']).toEqual(resultType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getMetricsQuery(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const params = {};

        // invoke method
        const getMetricsQueryPromise = discovery.getMetricsQuery(params);
        expectToBePromise(getMetricsQueryPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        discovery.getMetricsQuery({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await discovery.getMetricsQuery(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getMetricsQueryEvent', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const startTime = 'fake_startTime';
        const endTime = 'fake_endTime';
        const resultType = 'fake_resultType';
        const params = {
          startTime,
          endTime,
          resultType,
        };

        discovery.getMetricsQueryEvent(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/metrics/number_of_queries_with_event', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['start_time']).toEqual(startTime);
        expect(options.qs['end_time']).toEqual(endTime);
        expect(options.qs['result_type']).toEqual(resultType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getMetricsQueryEvent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const params = {};

        // invoke method
        const getMetricsQueryEventPromise = discovery.getMetricsQueryEvent(params);
        expectToBePromise(getMetricsQueryEventPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        discovery.getMetricsQueryEvent({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await discovery.getMetricsQueryEvent(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getMetricsQueryNoResults', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const startTime = 'fake_startTime';
        const endTime = 'fake_endTime';
        const resultType = 'fake_resultType';
        const params = {
          startTime,
          endTime,
          resultType,
        };

        discovery.getMetricsQueryNoResults(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/metrics/number_of_queries_with_no_search_results', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['start_time']).toEqual(startTime);
        expect(options.qs['end_time']).toEqual(endTime);
        expect(options.qs['result_type']).toEqual(resultType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getMetricsQueryNoResults(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const params = {};

        // invoke method
        const getMetricsQueryNoResultsPromise = discovery.getMetricsQueryNoResults(params);
        expectToBePromise(getMetricsQueryNoResultsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        discovery.getMetricsQueryNoResults({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await discovery.getMetricsQueryNoResults(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getMetricsEventRate', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const startTime = 'fake_startTime';
        const endTime = 'fake_endTime';
        const resultType = 'fake_resultType';
        const params = {
          startTime,
          endTime,
          resultType,
        };

        discovery.getMetricsEventRate(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/metrics/event_rate', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['start_time']).toEqual(startTime);
        expect(options.qs['end_time']).toEqual(endTime);
        expect(options.qs['result_type']).toEqual(resultType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getMetricsEventRate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const params = {};

        // invoke method
        const getMetricsEventRatePromise = discovery.getMetricsEventRate(params);
        expectToBePromise(getMetricsEventRatePromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        discovery.getMetricsEventRate({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await discovery.getMetricsEventRate(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getMetricsQueryTokenEvent', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const count = 'fake_count';
        const params = {
          count,
        };

        discovery.getMetricsQueryTokenEvent(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/metrics/top_query_tokens_with_event_rate', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['count']).toEqual(count);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getMetricsQueryTokenEvent(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const params = {};

        // invoke method
        const getMetricsQueryTokenEventPromise = discovery.getMetricsQueryTokenEvent(params);
        expectToBePromise(getMetricsQueryTokenEventPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        discovery.getMetricsQueryTokenEvent({});
        checkDefaultSuccessArgs(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await discovery.getMetricsQueryTokenEvent(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('listCredentials', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        discovery.listCredentials(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/credentials', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listCredentials(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        // invoke method
        const listCredentialsPromise = discovery.listCredentials(params);
        expectToBePromise(listCredentialsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.listCredentials(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        let err;
        try {
          await discovery.listCredentials({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        const listCredentialsPromise = discovery.listCredentials();
        expectToBePromise(listCredentialsPromise);

        listCredentialsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createCredentials', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const sourceType = 'fake_sourceType';
        const credentialDetails = 'fake_credentialDetails';
        const status = 'fake_status';
        const params = {
          environmentId,
          sourceType,
          credentialDetails,
          status,
        };

        discovery.createCredentials(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/credentials', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['source_type']).toEqual(sourceType);
        expect(options.body['credential_details']).toEqual(credentialDetails);
        expect(options.body['status']).toEqual(status);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createCredentials(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        // invoke method
        const createCredentialsPromise = discovery.createCredentials(params);
        expectToBePromise(createCredentialsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.createCredentials(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        let err;
        try {
          await discovery.createCredentials({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        const createCredentialsPromise = discovery.createCredentials();
        expectToBePromise(createCredentialsPromise);

        createCredentialsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getCredentials', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const credentialId = 'fake_credentialId';
        const params = {
          environmentId,
          credentialId,
        };

        discovery.getCredentials(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/credentials/{credential_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['credential_id']).toEqual(credentialId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const credentialId = 'fake_credentialId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          credentialId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getCredentials(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const credentialId = 'fake_credentialId';
        const params = {
          environmentId,
          credentialId,
        };

        // invoke method
        const getCredentialsPromise = discovery.getCredentials(params);
        expectToBePromise(getCredentialsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getCredentials(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'credentialId'];

        let err;
        try {
          await discovery.getCredentials({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'credentialId'];

        const getCredentialsPromise = discovery.getCredentials();
        expectToBePromise(getCredentialsPromise);

        getCredentialsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('updateCredentials', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const credentialId = 'fake_credentialId';
        const sourceType = 'fake_sourceType';
        const credentialDetails = 'fake_credentialDetails';
        const status = 'fake_status';
        const params = {
          environmentId,
          credentialId,
          sourceType,
          credentialDetails,
          status,
        };

        discovery.updateCredentials(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/credentials/{credential_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['source_type']).toEqual(sourceType);
        expect(options.body['credential_details']).toEqual(credentialDetails);
        expect(options.body['status']).toEqual(status);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['credential_id']).toEqual(credentialId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const credentialId = 'fake_credentialId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          credentialId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.updateCredentials(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const credentialId = 'fake_credentialId';
        const params = {
          environmentId,
          credentialId,
        };

        // invoke method
        const updateCredentialsPromise = discovery.updateCredentials(params);
        expectToBePromise(updateCredentialsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.updateCredentials(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'credentialId'];

        let err;
        try {
          await discovery.updateCredentials({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'credentialId'];

        const updateCredentialsPromise = discovery.updateCredentials();
        expectToBePromise(updateCredentialsPromise);

        updateCredentialsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteCredentials', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const credentialId = 'fake_credentialId';
        const params = {
          environmentId,
          credentialId,
        };

        discovery.deleteCredentials(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/credentials/{credential_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['credential_id']).toEqual(credentialId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const credentialId = 'fake_credentialId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          credentialId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteCredentials(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const credentialId = 'fake_credentialId';
        const params = {
          environmentId,
          credentialId,
        };

        // invoke method
        const deleteCredentialsPromise = discovery.deleteCredentials(params);
        expectToBePromise(deleteCredentialsPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteCredentials(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'credentialId'];

        let err;
        try {
          await discovery.deleteCredentials({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'credentialId'];

        const deleteCredentialsPromise = discovery.deleteCredentials();
        expectToBePromise(deleteCredentialsPromise);

        deleteCredentialsPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('listGateways', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        discovery.listGateways(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.listGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        // invoke method
        const listGatewaysPromise = discovery.listGateways(params);
        expectToBePromise(listGatewaysPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.listGateways(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        let err;
        try {
          await discovery.listGateways({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        const listGatewaysPromise = discovery.listGateways();
        expectToBePromise(listGatewaysPromise);

        listGatewaysPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('createGateway', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const name = 'fake_name';
        const params = {
          environmentId,
          name,
        };

        discovery.createGateway(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.path['environment_id']).toEqual(environmentId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.createGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const params = {
          environmentId,
        };

        // invoke method
        const createGatewayPromise = discovery.createGateway(params);
        expectToBePromise(createGatewayPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.createGateway(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        let err;
        try {
          await discovery.createGateway({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId'];

        const createGatewayPromise = discovery.createGateway();
        expectToBePromise(createGatewayPromise);

        createGatewayPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('getGateway', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const gatewayId = 'fake_gatewayId';
        const params = {
          environmentId,
          gatewayId,
        };

        discovery.getGateway(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/gateways/{gateway_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['gateway_id']).toEqual(gatewayId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const gatewayId = 'fake_gatewayId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.getGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const gatewayId = 'fake_gatewayId';
        const params = {
          environmentId,
          gatewayId,
        };

        // invoke method
        const getGatewayPromise = discovery.getGateway(params);
        expectToBePromise(getGatewayPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.getGateway(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'gatewayId'];

        let err;
        try {
          await discovery.getGateway({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'gatewayId'];

        const getGatewayPromise = discovery.getGateway();
        expectToBePromise(getGatewayPromise);

        getGatewayPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
  describe('deleteGateway', () => {
    describe('positive tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsSuccess);
      });
      test('should pass the right params to createRequest', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const gatewayId = 'fake_gatewayId';
        const params = {
          environmentId,
          gatewayId,
        };

        discovery.deleteGateway(params);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/environments/{environment_id}/gateways/{gateway_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['environment_id']).toEqual(environmentId);
        expect(options.path['gateway_id']).toEqual(gatewayId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const gatewayId = 'fake_gatewayId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          environmentId,
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        discovery.deleteGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should return a promise when no callback is given', () => {
        // parameters
        const environmentId = 'fake_environmentId';
        const gatewayId = 'fake_gatewayId';
        const params = {
          environmentId,
          gatewayId,
        };

        // invoke method
        const deleteGatewayPromise = discovery.deleteGateway(params);
        expectToBePromise(deleteGatewayPromise);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('negative tests', () => {
      beforeAll(() => {
        missingParamsMock.mockReturnValue(missingParamsError);
      });

      test('should convert a `null` value for `params` to an empty object', done => {
        discovery.deleteGateway(null).catch(() => {
          checkForEmptyObject(missingParamsMock);
          done();
        });
      });

      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'gatewayId'];

        let err;
        try {
          await discovery.deleteGateway({});
        } catch (e) {
          err = e;
        }

        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['environmentId', 'gatewayId'];

        const deleteGatewayPromise = discovery.deleteGateway();
        expectToBePromise(deleteGatewayPromise);

        deleteGatewayPromise.catch(err => {
          checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
          done();
        });
      });
    });
  });
});
