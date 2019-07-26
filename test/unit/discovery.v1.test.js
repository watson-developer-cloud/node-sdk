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
const DiscoveryV1 = require('../../discovery/v1');
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
  checkDefaultSuccessArgs,
} = utils;

const noop = () => {};

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/discovery/api/discovery/api',
  version: '2018-10-18',
};

const discovery = new DiscoveryV1(service);
const createRequestMock = jest.spyOn(discovery, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

// dont actually create a request
createRequestMock.mockImplementation(noop);

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

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

      // invoke method
      discovery.createEnvironment(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments', 'POST');
      checkCallback(createRequestMock);
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
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createEnvironment(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.createEnvironment(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['name'];

      discovery.createEnvironment({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
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

      // invoke method
      discovery.listEnvironments(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['name']).toEqual(name);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.listEnvironments(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.listEnvironments({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.listEnvironments(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
      };

      // invoke method
      discovery.getEnvironment(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getEnvironment(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
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
      discovery.getEnvironment(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.getEnvironment({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

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
      const environment_id = 'fake_environment_id';
      const name = 'fake_name';
      const description = 'fake_description';
      const size = 'fake_size';
      const params = {
        environment_id,
        name,
        description,
        size,
      };

      // invoke method
      discovery.updateEnvironment(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}', 'PUT');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.body['description']).toEqual(description);
      expect(options.body['size']).toEqual(size);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.updateEnvironment(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
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
      discovery.updateEnvironment(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.updateEnvironment({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

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
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
      };

      // invoke method
      discovery.deleteEnvironment(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteEnvironment(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
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
      discovery.deleteEnvironment(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.deleteEnvironment({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_ids = 'fake_collection_ids';
      const params = {
        environment_id,
        collection_ids,
      };

      // invoke method
      discovery.listFields(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/fields', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['collection_ids']).toEqual(collection_ids);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_ids = 'fake_collection_ids';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_ids,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.listFields(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_ids = 'fake_collection_ids';
      const params = {
        environment_id,
        collection_ids,
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
      discovery.listFields(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_ids'];

      discovery.listFields({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_ids'];

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
      const environment_id = 'fake_environment_id';
      const name = 'fake_name';
      const description = 'fake_description';
      const conversions = 'fake_conversions';
      const enrichments = 'fake_enrichments';
      const normalizations = 'fake_normalizations';
      const source = 'fake_source';
      const params = {
        environment_id,
        name,
        description,
        conversions,
        enrichments,
        normalizations,
        source,
      };

      // invoke method
      discovery.createConfiguration(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/configurations', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.body['description']).toEqual(description);
      expect(options.body['conversions']).toEqual(conversions);
      expect(options.body['enrichments']).toEqual(enrichments);
      expect(options.body['normalizations']).toEqual(normalizations);
      expect(options.body['source']).toEqual(source);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const name = 'fake_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createConfiguration(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const name = 'fake_name';
      const params = {
        environment_id,
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
      discovery.createConfiguration(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'name'];

      discovery.createConfiguration({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'name'];

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
      const environment_id = 'fake_environment_id';
      const name = 'fake_name';
      const params = {
        environment_id,
        name,
      };

      // invoke method
      discovery.listConfigurations(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/configurations', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['name']).toEqual(name);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.listConfigurations(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
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
      discovery.listConfigurations(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.listConfigurations({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

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
      const environment_id = 'fake_environment_id';
      const configuration_id = 'fake_configuration_id';
      const params = {
        environment_id,
        configuration_id,
      };

      // invoke method
      discovery.getConfiguration(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/configurations/{configuration_id}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['configuration_id']).toEqual(configuration_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const configuration_id = 'fake_configuration_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        configuration_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getConfiguration(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const configuration_id = 'fake_configuration_id';
      const params = {
        environment_id,
        configuration_id,
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
      discovery.getConfiguration(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'configuration_id'];

      discovery.getConfiguration({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'configuration_id'];

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
      const environment_id = 'fake_environment_id';
      const configuration_id = 'fake_configuration_id';
      const name = 'fake_name';
      const description = 'fake_description';
      const conversions = 'fake_conversions';
      const enrichments = 'fake_enrichments';
      const normalizations = 'fake_normalizations';
      const source = 'fake_source';
      const params = {
        environment_id,
        configuration_id,
        name,
        description,
        conversions,
        enrichments,
        normalizations,
        source,
      };

      // invoke method
      discovery.updateConfiguration(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/configurations/{configuration_id}',
        'PUT'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.body['description']).toEqual(description);
      expect(options.body['conversions']).toEqual(conversions);
      expect(options.body['enrichments']).toEqual(enrichments);
      expect(options.body['normalizations']).toEqual(normalizations);
      expect(options.body['source']).toEqual(source);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['configuration_id']).toEqual(configuration_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const configuration_id = 'fake_configuration_id';
      const name = 'fake_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        configuration_id,
        name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.updateConfiguration(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const configuration_id = 'fake_configuration_id';
      const name = 'fake_name';
      const params = {
        environment_id,
        configuration_id,
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
      discovery.updateConfiguration(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'configuration_id', 'name'];

      discovery.updateConfiguration({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'configuration_id', 'name'];

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
      const environment_id = 'fake_environment_id';
      const configuration_id = 'fake_configuration_id';
      const params = {
        environment_id,
        configuration_id,
      };

      // invoke method
      discovery.deleteConfiguration(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/configurations/{configuration_id}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['configuration_id']).toEqual(configuration_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const configuration_id = 'fake_configuration_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        configuration_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteConfiguration(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const configuration_id = 'fake_configuration_id';
      const params = {
        environment_id,
        configuration_id,
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
      discovery.deleteConfiguration(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'configuration_id'];

      discovery.deleteConfiguration({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'configuration_id'];

      const deleteConfigurationPromise = discovery.deleteConfiguration();
      expectToBePromise(deleteConfigurationPromise);

      deleteConfigurationPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('testConfigurationInEnvironment', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const configuration = 'fake_configuration';
      const file = 'fake_file';
      const filename = 'fake_filename';
      const file_content_type = 'fake_file_content_type';
      const metadata = 'fake_metadata';
      const step = 'fake_step';
      const configuration_id = 'fake_configuration_id';
      const params = {
        environment_id,
        configuration,
        file,
        filename,
        file_content_type,
        metadata,
        step,
        configuration_id,
      };

      // invoke method
      discovery.testConfigurationInEnvironment(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/preview', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['configuration']).toEqual(configuration);
      expect(options.formData['file'].data).toEqual(file);
      expect(options.formData['file'].filename).toEqual(filename);
      expect(options.formData['file'].contentType).toEqual(file_content_type);
      expect(options.formData['metadata']).toEqual(metadata);
      expect(options.qs['step']).toEqual(step);
      expect(options.qs['configuration_id']).toEqual(configuration_id);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.testConfigurationInEnvironment(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
      };

      // invoke method
      const testConfigurationInEnvironmentPromise = discovery.testConfigurationInEnvironment(
        params
      );
      expectToBePromise(testConfigurationInEnvironmentPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      discovery.testConfigurationInEnvironment(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.testConfigurationInEnvironment({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      const testConfigurationInEnvironmentPromise = discovery.testConfigurationInEnvironment();
      expectToBePromise(testConfigurationInEnvironmentPromise);

      testConfigurationInEnvironmentPromise.catch(err => {
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
      const environment_id = 'fake_environment_id';
      const name = 'fake_name';
      const description = 'fake_description';
      const configuration_id = 'fake_configuration_id';
      const language = 'fake_language';
      const params = {
        environment_id,
        name,
        description,
        configuration_id,
        language,
      };

      // invoke method
      discovery.createCollection(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.body['description']).toEqual(description);
      expect(options.body['configuration_id']).toEqual(configuration_id);
      expect(options.body['language']).toEqual(language);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const name = 'fake_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createCollection(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const name = 'fake_name';
      const params = {
        environment_id,
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
      discovery.createCollection(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'name'];

      discovery.createCollection({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'name'];

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
      const environment_id = 'fake_environment_id';
      const name = 'fake_name';
      const params = {
        environment_id,
        name,
      };

      // invoke method
      discovery.listCollections(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['name']).toEqual(name);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.listCollections(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
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
      discovery.listCollections(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.listCollections({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.getCollection(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getCollection(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.getCollection(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.getCollection({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const name = 'fake_name';
      const description = 'fake_description';
      const configuration_id = 'fake_configuration_id';
      const params = {
        environment_id,
        collection_id,
        name,
        description,
        configuration_id,
      };

      // invoke method
      discovery.updateCollection(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}',
        'PUT'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.body['description']).toEqual(description);
      expect(options.body['configuration_id']).toEqual(configuration_id);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.updateCollection(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.updateCollection(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.updateCollection({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.deleteCollection(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteCollection(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.deleteCollection(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.deleteCollection({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.listCollectionFields(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/fields',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.listCollectionFields(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.listCollectionFields(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.listCollectionFields({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.listExpansions(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/expansions',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.listExpansions(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.listExpansions(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.listExpansions({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const expansions = 'fake_expansions';
      const params = {
        environment_id,
        collection_id,
        expansions,
      };

      // invoke method
      discovery.createExpansions(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/expansions',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['expansions']).toEqual(expansions);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const expansions = 'fake_expansions';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        expansions,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createExpansions(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const expansions = 'fake_expansions';
      const params = {
        environment_id,
        collection_id,
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
      discovery.createExpansions(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'expansions'];

      discovery.createExpansions({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'expansions'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.deleteExpansions(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/expansions',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteExpansions(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.deleteExpansions(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.deleteExpansions({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.getTokenizationDictionaryStatus(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getTokenizationDictionaryStatus(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      const getTokenizationDictionaryStatusPromise = discovery.getTokenizationDictionaryStatus(
        params
      );
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
      discovery.getTokenizationDictionaryStatus(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.getTokenizationDictionaryStatus({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const tokenization_rules = 'fake_tokenization_rules';
      const params = {
        environment_id,
        collection_id,
        tokenization_rules,
      };

      // invoke method
      discovery.createTokenizationDictionary(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['tokenization_rules']).toEqual(tokenization_rules);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createTokenizationDictionary(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.createTokenizationDictionary(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.createTokenizationDictionary({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.deleteTokenizationDictionary(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteTokenizationDictionary(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.deleteTokenizationDictionary(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.deleteTokenizationDictionary({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.getStopwordListStatus(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getStopwordListStatus(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.getStopwordListStatus(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.getStopwordListStatus({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const stopword_file = 'fake_stopword_file';
      const stopword_filename = 'fake_stopword_filename';
      const params = {
        environment_id,
        collection_id,
        stopword_file,
        stopword_filename,
      };

      // invoke method
      discovery.createStopwordList(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['stopword_file'].data).toEqual(stopword_file);
      expect(options.formData['stopword_file'].filename).toEqual(stopword_filename);
      expect(options.formData['stopword_file'].contentType).toEqual('application/octet-stream');
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const stopword_file = 'fake_stopword_file';
      const stopword_filename = 'fake_stopword_filename';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        stopword_file,
        stopword_filename,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createStopwordList(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const stopword_file = 'fake_stopword_file';
      const stopword_filename = 'fake_stopword_filename';
      const params = {
        environment_id,
        collection_id,
        stopword_file,
        stopword_filename,
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
      discovery.createStopwordList(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = [
        'environment_id',
        'collection_id',
        'stopword_file',
        'stopword_filename',
      ];

      discovery.createStopwordList({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = [
        'environment_id',
        'collection_id',
        'stopword_file',
        'stopword_filename',
      ];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.deleteStopwordList(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteStopwordList(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.deleteStopwordList(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.deleteStopwordList({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const file = 'fake_file';
      const filename = 'fake_filename';
      const file_content_type = 'fake_file_content_type';
      const metadata = 'fake_metadata';
      const params = {
        environment_id,
        collection_id,
        file,
        filename,
        file_content_type,
        metadata,
      };

      // invoke method
      discovery.addDocument(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/documents',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['file'].data).toEqual(file);
      expect(options.formData['file'].filename).toEqual(filename);
      expect(options.formData['file'].contentType).toEqual(file_content_type);
      expect(options.formData['metadata']).toEqual(metadata);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.addDocument(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.addDocument(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.addDocument({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const document_id = 'fake_document_id';
      const params = {
        environment_id,
        collection_id,
        document_id,
      };

      // invoke method
      discovery.getDocumentStatus(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
      expect(options.path['document_id']).toEqual(document_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const document_id = 'fake_document_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        document_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getDocumentStatus(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const document_id = 'fake_document_id';
      const params = {
        environment_id,
        collection_id,
        document_id,
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
      discovery.getDocumentStatus(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'document_id'];

      discovery.getDocumentStatus({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'document_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const document_id = 'fake_document_id';
      const file = 'fake_file';
      const filename = 'fake_filename';
      const file_content_type = 'fake_file_content_type';
      const metadata = 'fake_metadata';
      const params = {
        environment_id,
        collection_id,
        document_id,
        file,
        filename,
        file_content_type,
        metadata,
      };

      // invoke method
      discovery.updateDocument(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['file'].data).toEqual(file);
      expect(options.formData['file'].filename).toEqual(filename);
      expect(options.formData['file'].contentType).toEqual(file_content_type);
      expect(options.formData['metadata']).toEqual(metadata);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
      expect(options.path['document_id']).toEqual(document_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const document_id = 'fake_document_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        document_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.updateDocument(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const document_id = 'fake_document_id';
      const params = {
        environment_id,
        collection_id,
        document_id,
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
      discovery.updateDocument(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'document_id'];

      discovery.updateDocument({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'document_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const document_id = 'fake_document_id';
      const params = {
        environment_id,
        collection_id,
        document_id,
      };

      // invoke method
      discovery.deleteDocument(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
      expect(options.path['document_id']).toEqual(document_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const document_id = 'fake_document_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        document_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteDocument(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const document_id = 'fake_document_id';
      const params = {
        environment_id,
        collection_id,
        document_id,
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
      discovery.deleteDocument(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'document_id'];

      discovery.deleteDocument({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'document_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const filter = 'fake_filter';
      const query = 'fake_query';
      const natural_language_query = 'fake_natural_language_query';
      const passages = 'fake_passages';
      const aggregation = 'fake_aggregation';
      const count = 'fake_count';
      const return_fields = 'fake_return_fields';
      const offset = 'fake_offset';
      const sort = 'fake_sort';
      const highlight = 'fake_highlight';
      const passages_fields = 'fake_passages_fields';
      const passages_count = 'fake_passages_count';
      const passages_characters = 'fake_passages_characters';
      const deduplicate = 'fake_deduplicate';
      const deduplicate_field = 'fake_deduplicate_field';
      const collection_ids = 'fake_collection_ids';
      const similar = 'fake_similar';
      const similar_document_ids = 'fake_similar_document_ids';
      const similar_fields = 'fake_similar_fields';
      const bias = 'fake_bias';
      const logging_opt_out = 'fake_logging_opt_out';
      const params = {
        environment_id,
        collection_id,
        filter,
        query,
        natural_language_query,
        passages,
        aggregation,
        count,
        return_fields,
        offset,
        sort,
        highlight,
        passages_fields,
        passages_count,
        passages_characters,
        deduplicate,
        deduplicate_field,
        collection_ids,
        similar,
        similar_document_ids,
        similar_fields,
        bias,
        logging_opt_out,
      };

      // invoke method
      discovery.query(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/query',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'X-Watson-Logging-Opt-Out', logging_opt_out);
      expect(options.body['filter']).toEqual(filter);
      expect(options.body['query']).toEqual(query);
      expect(options.body['natural_language_query']).toEqual(natural_language_query);
      expect(options.body['passages']).toEqual(passages);
      expect(options.body['aggregation']).toEqual(aggregation);
      expect(options.body['count']).toEqual(count);
      expect(options.body['return']).toEqual(return_fields);
      expect(options.body['offset']).toEqual(offset);
      expect(options.body['sort']).toEqual(sort);
      expect(options.body['highlight']).toEqual(highlight);
      expect(options.body['passages.fields']).toEqual(passages_fields);
      expect(options.body['passages.count']).toEqual(passages_count);
      expect(options.body['passages.characters']).toEqual(passages_characters);
      expect(options.body['deduplicate']).toEqual(deduplicate);
      expect(options.body['deduplicate.field']).toEqual(deduplicate_field);
      expect(options.body['collection_ids']).toEqual(collection_ids);
      expect(options.body['similar']).toEqual(similar);
      expect(options.body['similar.document_ids']).toEqual(similar_document_ids);
      expect(options.body['similar.fields']).toEqual(similar_fields);
      expect(options.body['bias']).toEqual(bias);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.query(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.query(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.query({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const filter = 'fake_filter';
      const query = 'fake_query';
      const natural_language_query = 'fake_natural_language_query';
      const passages = 'fake_passages';
      const aggregation = 'fake_aggregation';
      const count = 'fake_count';
      const return_fields = 'fake_return_fields';
      const offset = 'fake_offset';
      const sort = 'fake_sort';
      const highlight = 'fake_highlight';
      const passages_fields = 'fake_passages_fields';
      const passages_count = 'fake_passages_count';
      const passages_characters = 'fake_passages_characters';
      const deduplicate_field = 'fake_deduplicate_field';
      const similar = 'fake_similar';
      const similar_document_ids = 'fake_similar_document_ids';
      const similar_fields = 'fake_similar_fields';
      const params = {
        environment_id,
        collection_id,
        filter,
        query,
        natural_language_query,
        passages,
        aggregation,
        count,
        return_fields,
        offset,
        sort,
        highlight,
        passages_fields,
        passages_count,
        passages_characters,
        deduplicate_field,
        similar,
        similar_document_ids,
        similar_fields,
      };

      // invoke method
      discovery.queryNotices(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/notices',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['filter']).toEqual(filter);
      expect(options.qs['query']).toEqual(query);
      expect(options.qs['natural_language_query']).toEqual(natural_language_query);
      expect(options.qs['passages']).toEqual(passages);
      expect(options.qs['aggregation']).toEqual(aggregation);
      expect(options.qs['count']).toEqual(count);
      expect(options.qs['return']).toEqual(return_fields);
      expect(options.qs['offset']).toEqual(offset);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['highlight']).toEqual(highlight);
      expect(options.qs['passages.fields']).toEqual(passages_fields);
      expect(options.qs['passages.count']).toEqual(passages_count);
      expect(options.qs['passages.characters']).toEqual(passages_characters);
      expect(options.qs['deduplicate.field']).toEqual(deduplicate_field);
      expect(options.qs['similar']).toEqual(similar);
      expect(options.qs['similar.document_ids']).toEqual(similar_document_ids);
      expect(options.qs['similar.fields']).toEqual(similar_fields);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.queryNotices(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.queryNotices(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.queryNotices({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const filter = 'fake_filter';
      const query = 'fake_query';
      const natural_language_query = 'fake_natural_language_query';
      const passages = 'fake_passages';
      const aggregation = 'fake_aggregation';
      const count = 'fake_count';
      const return_fields = 'fake_return_fields';
      const offset = 'fake_offset';
      const sort = 'fake_sort';
      const highlight = 'fake_highlight';
      const passages_fields = 'fake_passages_fields';
      const passages_count = 'fake_passages_count';
      const passages_characters = 'fake_passages_characters';
      const deduplicate = 'fake_deduplicate';
      const deduplicate_field = 'fake_deduplicate_field';
      const collection_ids = 'fake_collection_ids';
      const similar = 'fake_similar';
      const similar_document_ids = 'fake_similar_document_ids';
      const similar_fields = 'fake_similar_fields';
      const bias = 'fake_bias';
      const logging_opt_out = 'fake_logging_opt_out';
      const params = {
        environment_id,
        filter,
        query,
        natural_language_query,
        passages,
        aggregation,
        count,
        return_fields,
        offset,
        sort,
        highlight,
        passages_fields,
        passages_count,
        passages_characters,
        deduplicate,
        deduplicate_field,
        collection_ids,
        similar,
        similar_document_ids,
        similar_fields,
        bias,
        logging_opt_out,
      };

      // invoke method
      discovery.federatedQuery(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/query', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'X-Watson-Logging-Opt-Out', logging_opt_out);
      expect(options.body['filter']).toEqual(filter);
      expect(options.body['query']).toEqual(query);
      expect(options.body['natural_language_query']).toEqual(natural_language_query);
      expect(options.body['passages']).toEqual(passages);
      expect(options.body['aggregation']).toEqual(aggregation);
      expect(options.body['count']).toEqual(count);
      expect(options.body['return']).toEqual(return_fields);
      expect(options.body['offset']).toEqual(offset);
      expect(options.body['sort']).toEqual(sort);
      expect(options.body['highlight']).toEqual(highlight);
      expect(options.body['passages.fields']).toEqual(passages_fields);
      expect(options.body['passages.count']).toEqual(passages_count);
      expect(options.body['passages.characters']).toEqual(passages_characters);
      expect(options.body['deduplicate']).toEqual(deduplicate);
      expect(options.body['deduplicate.field']).toEqual(deduplicate_field);
      expect(options.body['collection_ids']).toEqual(collection_ids);
      expect(options.body['similar']).toEqual(similar);
      expect(options.body['similar.document_ids']).toEqual(similar_document_ids);
      expect(options.body['similar.fields']).toEqual(similar_fields);
      expect(options.body['bias']).toEqual(bias);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.federatedQuery(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
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
      discovery.federatedQuery(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.federatedQuery({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_ids = 'fake_collection_ids';
      const filter = 'fake_filter';
      const query = 'fake_query';
      const natural_language_query = 'fake_natural_language_query';
      const aggregation = 'fake_aggregation';
      const count = 'fake_count';
      const return_fields = 'fake_return_fields';
      const offset = 'fake_offset';
      const sort = 'fake_sort';
      const highlight = 'fake_highlight';
      const deduplicate_field = 'fake_deduplicate_field';
      const similar = 'fake_similar';
      const similar_document_ids = 'fake_similar_document_ids';
      const similar_fields = 'fake_similar_fields';
      const params = {
        environment_id,
        collection_ids,
        filter,
        query,
        natural_language_query,
        aggregation,
        count,
        return_fields,
        offset,
        sort,
        highlight,
        deduplicate_field,
        similar,
        similar_document_ids,
        similar_fields,
      };

      // invoke method
      discovery.federatedQueryNotices(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/notices', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['collection_ids']).toEqual(collection_ids);
      expect(options.qs['filter']).toEqual(filter);
      expect(options.qs['query']).toEqual(query);
      expect(options.qs['natural_language_query']).toEqual(natural_language_query);
      expect(options.qs['aggregation']).toEqual(aggregation);
      expect(options.qs['count']).toEqual(count);
      expect(options.qs['return']).toEqual(return_fields);
      expect(options.qs['offset']).toEqual(offset);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['highlight']).toEqual(highlight);
      expect(options.qs['deduplicate.field']).toEqual(deduplicate_field);
      expect(options.qs['similar']).toEqual(similar);
      expect(options.qs['similar.document_ids']).toEqual(similar_document_ids);
      expect(options.qs['similar.fields']).toEqual(similar_fields);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_ids = 'fake_collection_ids';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_ids,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.federatedQueryNotices(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_ids = 'fake_collection_ids';
      const params = {
        environment_id,
        collection_ids,
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
      discovery.federatedQueryNotices(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_ids'];

      discovery.federatedQueryNotices({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_ids'];

      const federatedQueryNoticesPromise = discovery.federatedQueryNotices();
      expectToBePromise(federatedQueryNoticesPromise);

      federatedQueryNoticesPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('queryEntities', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const feature = 'fake_feature';
      const entity = 'fake_entity';
      const context = 'fake_context';
      const count = 'fake_count';
      const evidence_count = 'fake_evidence_count';
      const params = {
        environment_id,
        collection_id,
        feature,
        entity,
        context,
        count,
        evidence_count,
      };

      // invoke method
      discovery.queryEntities(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/query_entities',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['feature']).toEqual(feature);
      expect(options.body['entity']).toEqual(entity);
      expect(options.body['context']).toEqual(context);
      expect(options.body['count']).toEqual(count);
      expect(options.body['evidence_count']).toEqual(evidence_count);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.queryEntities(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      const queryEntitiesPromise = discovery.queryEntities(params);
      expectToBePromise(queryEntitiesPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      discovery.queryEntities(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.queryEntities({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      const queryEntitiesPromise = discovery.queryEntities();
      expectToBePromise(queryEntitiesPromise);

      queryEntitiesPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});

describe('queryRelations', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const entities = 'fake_entities';
      const context = 'fake_context';
      const sort = 'fake_sort';
      const filter = 'fake_filter';
      const count = 'fake_count';
      const evidence_count = 'fake_evidence_count';
      const params = {
        environment_id,
        collection_id,
        entities,
        context,
        sort,
        filter,
        count,
        evidence_count,
      };

      // invoke method
      discovery.queryRelations(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/query_relations',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['entities']).toEqual(entities);
      expect(options.body['context']).toEqual(context);
      expect(options.body['sort']).toEqual(sort);
      expect(options.body['filter']).toEqual(filter);
      expect(options.body['count']).toEqual(count);
      expect(options.body['evidence_count']).toEqual(evidence_count);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.queryRelations(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      const queryRelationsPromise = discovery.queryRelations(params);
      expectToBePromise(queryRelationsPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      discovery.queryRelations(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.queryRelations({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      const queryRelationsPromise = discovery.queryRelations();
      expectToBePromise(queryRelationsPromise);

      queryRelationsPromise.catch(err => {
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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.listTrainingData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.listTrainingData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.listTrainingData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.listTrainingData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const natural_language_query = 'fake_natural_language_query';
      const filter = 'fake_filter';
      const examples = 'fake_examples';
      const params = {
        environment_id,
        collection_id,
        natural_language_query,
        filter,
        examples,
      };

      // invoke method
      discovery.addTrainingData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['natural_language_query']).toEqual(natural_language_query);
      expect(options.body['filter']).toEqual(filter);
      expect(options.body['examples']).toEqual(examples);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.addTrainingData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.addTrainingData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.addTrainingData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
      };

      // invoke method
      discovery.deleteAllTrainingData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteAllTrainingData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const params = {
        environment_id,
        collection_id,
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
      discovery.deleteAllTrainingData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

      discovery.deleteAllTrainingData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
      };

      // invoke method
      discovery.getTrainingData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
      expect(options.path['query_id']).toEqual(query_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        query_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getTrainingData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
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
      discovery.getTrainingData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id'];

      discovery.getTrainingData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
      };

      // invoke method
      discovery.deleteTrainingData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
      expect(options.path['query_id']).toEqual(query_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        query_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteTrainingData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
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
      discovery.deleteTrainingData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id'];

      discovery.deleteTrainingData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
      };

      // invoke method
      discovery.listTrainingExamples(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
      expect(options.path['query_id']).toEqual(query_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        query_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.listTrainingExamples(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
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
      discovery.listTrainingExamples(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id'];

      discovery.listTrainingExamples({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const document_id = 'fake_document_id';
      const cross_reference = 'fake_cross_reference';
      const relevance = 'fake_relevance';
      const params = {
        environment_id,
        collection_id,
        query_id,
        document_id,
        cross_reference,
        relevance,
      };

      // invoke method
      discovery.createTrainingExample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples',
        'POST'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['document_id']).toEqual(document_id);
      expect(options.body['cross_reference']).toEqual(cross_reference);
      expect(options.body['relevance']).toEqual(relevance);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
      expect(options.path['query_id']).toEqual(query_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        query_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createTrainingExample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
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
      discovery.createTrainingExample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id'];

      discovery.createTrainingExample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const example_id = 'fake_example_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
        example_id,
      };

      // invoke method
      discovery.deleteTrainingExample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
      expect(options.path['query_id']).toEqual(query_id);
      expect(options.path['example_id']).toEqual(example_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const example_id = 'fake_example_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        query_id,
        example_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteTrainingExample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const example_id = 'fake_example_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
        example_id,
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
      discovery.deleteTrainingExample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];

      discovery.deleteTrainingExample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const example_id = 'fake_example_id';
      const cross_reference = 'fake_cross_reference';
      const relevance = 'fake_relevance';
      const params = {
        environment_id,
        collection_id,
        query_id,
        example_id,
        cross_reference,
        relevance,
      };

      // invoke method
      discovery.updateTrainingExample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        'PUT'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['cross_reference']).toEqual(cross_reference);
      expect(options.body['relevance']).toEqual(relevance);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
      expect(options.path['query_id']).toEqual(query_id);
      expect(options.path['example_id']).toEqual(example_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const example_id = 'fake_example_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        query_id,
        example_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.updateTrainingExample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const example_id = 'fake_example_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
        example_id,
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
      discovery.updateTrainingExample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];

      discovery.updateTrainingExample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];

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
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const example_id = 'fake_example_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
        example_id,
      };

      // invoke method
      discovery.getTrainingExample(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['collection_id']).toEqual(collection_id);
      expect(options.path['query_id']).toEqual(query_id);
      expect(options.path['example_id']).toEqual(example_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const example_id = 'fake_example_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        query_id,
        example_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getTrainingExample(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const query_id = 'fake_query_id';
      const example_id = 'fake_example_id';
      const params = {
        environment_id,
        collection_id,
        query_id,
        example_id,
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
      discovery.getTrainingExample(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];

      discovery.getTrainingExample({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];

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
      const customer_id = 'fake_customer_id';
      const params = {
        customer_id,
      };

      // invoke method
      discovery.deleteUserData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/user_data', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = undefined;
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['customer_id']).toEqual(customer_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        customer_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteUserData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const params = {
        customer_id,
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
      discovery.deleteUserData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      discovery.deleteUserData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

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

      // invoke method
      discovery.createEvent(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/events', 'POST');
      checkCallback(createRequestMock);
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
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        type,
        data,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createEvent(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.createEvent(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['type', 'data'];

      discovery.createEvent({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
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

      // invoke method
      discovery.queryLog(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/logs', 'GET');
      checkCallback(createRequestMock);
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
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.queryLog(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.queryLog({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.queryLog(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const start_time = 'fake_start_time';
      const end_time = 'fake_end_time';
      const result_type = 'fake_result_type';
      const params = {
        start_time,
        end_time,
        result_type,
      };

      // invoke method
      discovery.getMetricsQuery(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/metrics/number_of_queries', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['start_time']).toEqual(start_time);
      expect(options.qs['end_time']).toEqual(end_time);
      expect(options.qs['result_type']).toEqual(result_type);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getMetricsQuery(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getMetricsQuery({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.getMetricsQuery(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const start_time = 'fake_start_time';
      const end_time = 'fake_end_time';
      const result_type = 'fake_result_type';
      const params = {
        start_time,
        end_time,
        result_type,
      };

      // invoke method
      discovery.getMetricsQueryEvent(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/metrics/number_of_queries_with_event', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['start_time']).toEqual(start_time);
      expect(options.qs['end_time']).toEqual(end_time);
      expect(options.qs['result_type']).toEqual(result_type);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getMetricsQueryEvent(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getMetricsQueryEvent({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.getMetricsQueryEvent(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const start_time = 'fake_start_time';
      const end_time = 'fake_end_time';
      const result_type = 'fake_result_type';
      const params = {
        start_time,
        end_time,
        result_type,
      };

      // invoke method
      discovery.getMetricsQueryNoResults(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/metrics/number_of_queries_with_no_search_results', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['start_time']).toEqual(start_time);
      expect(options.qs['end_time']).toEqual(end_time);
      expect(options.qs['result_type']).toEqual(result_type);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getMetricsQueryNoResults(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getMetricsQueryNoResults({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.getMetricsQueryNoResults(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const start_time = 'fake_start_time';
      const end_time = 'fake_end_time';
      const result_type = 'fake_result_type';
      const params = {
        start_time,
        end_time,
        result_type,
      };

      // invoke method
      discovery.getMetricsEventRate(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/metrics/event_rate', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['start_time']).toEqual(start_time);
      expect(options.qs['end_time']).toEqual(end_time);
      expect(options.qs['result_type']).toEqual(result_type);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getMetricsEventRate(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getMetricsEventRate({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.getMetricsEventRate(noop);
      checkDefaultSuccessArgs(createRequestMock);
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

      // invoke method
      discovery.getMetricsQueryTokenEvent(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/metrics/top_query_tokens_with_event_rate', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['count']).toEqual(count);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getMetricsQueryTokenEvent(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getMetricsQueryTokenEvent({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.getMetricsQueryTokenEvent(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
      };

      // invoke method
      discovery.listCredentials(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/credentials', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.listCredentials(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
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
      discovery.listCredentials(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.listCredentials({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

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
      const environment_id = 'fake_environment_id';
      const source_type = 'fake_source_type';
      const credential_details = 'fake_credential_details';
      const status = 'fake_status';
      const params = {
        environment_id,
        source_type,
        credential_details,
        status,
      };

      // invoke method
      discovery.createCredentials(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/credentials', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['source_type']).toEqual(source_type);
      expect(options.body['credential_details']).toEqual(credential_details);
      expect(options.body['status']).toEqual(status);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createCredentials(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
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
      discovery.createCredentials(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.createCredentials({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

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
      const environment_id = 'fake_environment_id';
      const credential_id = 'fake_credential_id';
      const params = {
        environment_id,
        credential_id,
      };

      // invoke method
      discovery.getCredentials(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/credentials/{credential_id}',
        'GET'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['credential_id']).toEqual(credential_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const credential_id = 'fake_credential_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        credential_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getCredentials(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const credential_id = 'fake_credential_id';
      const params = {
        environment_id,
        credential_id,
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
      discovery.getCredentials(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'credential_id'];

      discovery.getCredentials({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'credential_id'];

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
      const environment_id = 'fake_environment_id';
      const credential_id = 'fake_credential_id';
      const source_type = 'fake_source_type';
      const credential_details = 'fake_credential_details';
      const status = 'fake_status';
      const params = {
        environment_id,
        credential_id,
        source_type,
        credential_details,
        status,
      };

      // invoke method
      discovery.updateCredentials(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/credentials/{credential_id}',
        'PUT'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['source_type']).toEqual(source_type);
      expect(options.body['credential_details']).toEqual(credential_details);
      expect(options.body['status']).toEqual(status);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['credential_id']).toEqual(credential_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const credential_id = 'fake_credential_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        credential_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.updateCredentials(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const credential_id = 'fake_credential_id';
      const params = {
        environment_id,
        credential_id,
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
      discovery.updateCredentials(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'credential_id'];

      discovery.updateCredentials({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'credential_id'];

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
      const environment_id = 'fake_environment_id';
      const credential_id = 'fake_credential_id';
      const params = {
        environment_id,
        credential_id,
      };

      // invoke method
      discovery.deleteCredentials(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/credentials/{credential_id}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['credential_id']).toEqual(credential_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const credential_id = 'fake_credential_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        credential_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteCredentials(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const credential_id = 'fake_credential_id';
      const params = {
        environment_id,
        credential_id,
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
      discovery.deleteCredentials(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'credential_id'];

      discovery.deleteCredentials({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'credential_id'];

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
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
      };

      // invoke method
      discovery.listGateways(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/gateways', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.listGateways(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
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
      discovery.listGateways(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.listGateways({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

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
      const environment_id = 'fake_environment_id';
      const name = 'fake_name';
      const params = {
        environment_id,
        name,
      };

      // invoke method
      discovery.createGateway(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/gateways', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.path['environment_id']).toEqual(environment_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createGateway(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const params = {
        environment_id,
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
      discovery.createGateway(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

      discovery.createGateway({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id'];

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
      const environment_id = 'fake_environment_id';
      const gateway_id = 'fake_gateway_id';
      const params = {
        environment_id,
        gateway_id,
      };

      // invoke method
      discovery.getGateway(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/gateways/{gateway_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['gateway_id']).toEqual(gateway_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const gateway_id = 'fake_gateway_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        gateway_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.getGateway(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const gateway_id = 'fake_gateway_id';
      const params = {
        environment_id,
        gateway_id,
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
      discovery.getGateway(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'gateway_id'];

      discovery.getGateway({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'gateway_id'];

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
      const environment_id = 'fake_environment_id';
      const gateway_id = 'fake_gateway_id';
      const params = {
        environment_id,
        gateway_id,
      };

      // invoke method
      discovery.deleteGateway(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/gateways/{gateway_id}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = undefined;
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['environment_id']).toEqual(environment_id);
      expect(options.path['gateway_id']).toEqual(gateway_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const gateway_id = 'fake_gateway_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        gateway_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.deleteGateway(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const gateway_id = 'fake_gateway_id';
      const params = {
        environment_id,
        gateway_id,
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
      discovery.deleteGateway(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'gateway_id'];

      discovery.deleteGateway({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'gateway_id'];

      const deleteGatewayPromise = discovery.deleteGateway();
      expectToBePromise(deleteGatewayPromise);

      deleteGatewayPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
