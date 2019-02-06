'use strict';

const DiscoveryV1 = require('../../discovery/v1-generated');
const helper = require('../../lib/helper');
const utils = require('../resources/unitTestUtils');

const missingParamsError = utils.missingParamsError;
const missingParamsSuccess = utils.missingParamsSuccess;
const checkUrlAndMethod = utils.checkUrlAndMethod;
const checkCallback = utils.checkCallback;
const checkMediaHeaders = utils.checkMediaHeaders;
const checkUserHeader = utils.checkUserHeader;
const checkDefaultSuccessArgs = utils.checkDefaultSuccessArgs;
const checkForEmptyObject = utils.checkForEmptyObject;
const checkRequiredParamsHandling = utils.checkRequiredParamsHandling;
const getOptions = utils.getOptions;

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/discovery/api',
  version: '2018-10-18',
};

const discovery = new DiscoveryV1(service);
const createRequestMock = jest.spyOn(discovery, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');
const noop = () => {};

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
      discovery.createEnvironment(params);

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
      expect(options.json).toEqual(true);
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

      discovery.createEnvironment(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteEnvironment(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.deleteEnvironment(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getEnvironment(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.getEnvironment(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.listEnvironments(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.listEnvironments(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      discovery.listEnvironments();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.listEnvironments(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      discovery.listFields(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/fields', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.listFields(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.updateEnvironment(params);

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
      expect(options.json).toEqual(true);
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

      discovery.updateEnvironment(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.createConfiguration(params);

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
      expect(options.json).toEqual(true);
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

      discovery.createConfiguration(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteConfiguration(params);

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
      const expectedContentType = 'application/json';
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

      discovery.deleteConfiguration(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getConfiguration(params);

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
      const expectedContentType = 'application/json';
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

      discovery.getConfiguration(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.listConfigurations(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/configurations', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.listConfigurations(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.updateConfiguration(params);

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
      expect(options.json).toEqual(true);
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

      discovery.updateConfiguration(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const step = 'fake_step';
      const configuration_id = 'fake_configuration_id';
      const file = 'fake_file';
      const metadata = 'fake_metadata';
      const file_content_type = 'fake_file_content_type';
      const filename = 'fake_filename';
      const params = {
        environment_id,
        configuration,
        step,
        configuration_id,
        file,
        metadata,
        file_content_type,
        filename,
      };

      // invoke method
      discovery.testConfigurationInEnvironment(params);

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

      discovery.testConfigurationInEnvironment(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.createCollection(params);

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
      expect(options.json).toEqual(true);
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

      discovery.createCollection(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteCollection(params);

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
      const expectedContentType = 'application/json';
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

      discovery.deleteCollection(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getCollection(params);

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
      const expectedContentType = 'application/json';
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

      discovery.getCollection(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.listCollectionFields(params);

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
      const expectedContentType = 'application/json';
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

      discovery.listCollectionFields(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.listCollections(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/collections', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.listCollections(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.updateCollection(params);

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
      expect(options.json).toEqual(true);
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

      discovery.updateCollection(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.createExpansions(params);

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
      expect(options.json).toEqual(true);
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

      discovery.createExpansions(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.createStopwordList(params);

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
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        stopword_file,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      discovery.createStopwordList(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const requiredParams = ['environment_id', 'collection_id', 'stopword_file'];

      discovery.createStopwordList({}, err => {
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
      discovery.createTokenizationDictionary(params);

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
      expect(options.json).toEqual(true);
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

      discovery.createTokenizationDictionary(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteExpansions(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/expansions',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.deleteExpansions(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteStopwordList(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/stopwords',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.deleteStopwordList(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteTokenizationDictionary(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/word_lists/tokenization_dictionary',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.deleteTokenizationDictionary(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getStopwordListStatus(params);

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
      const expectedContentType = 'application/json';
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

      discovery.getStopwordListStatus(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getTokenizationDictionaryStatus(params);

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
      const expectedContentType = 'application/json';
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

      discovery.getTokenizationDictionaryStatus(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.listExpansions(params);

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
      const expectedContentType = 'application/json';
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

      discovery.listExpansions(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const metadata = 'fake_metadata';
      const file_content_type = 'fake_file_content_type';
      const filename = 'fake_filename';
      const params = {
        environment_id,
        collection_id,
        file,
        metadata,
        file_content_type,
        filename,
      };

      // invoke method
      discovery.addDocument(params);

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

      discovery.addDocument(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteDocument(params);

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
      const expectedContentType = 'application/json';
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

      discovery.deleteDocument(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getDocumentStatus(params);

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
      const expectedContentType = 'application/json';
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

      discovery.getDocumentStatus(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const metadata = 'fake_metadata';
      const file_content_type = 'fake_file_content_type';
      const filename = 'fake_filename';
      const params = {
        environment_id,
        collection_id,
        document_id,
        file,
        metadata,
        file_content_type,
        filename,
      };

      // invoke method
      discovery.updateDocument(params);

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

      discovery.updateDocument(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.federatedQuery(params);

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
      expect(options.json).toEqual(true);
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

      discovery.federatedQuery(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.federatedQueryNotices(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/notices', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.federatedQueryNotices(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.query(params);

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
      expect(options.json).toEqual(true);
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

      discovery.query(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.queryEntities(params);

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
      expect(options.json).toEqual(true);
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

      discovery.queryEntities(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.queryNotices(params);

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
      const expectedContentType = 'application/json';
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

      discovery.queryNotices(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.queryRelations(params);

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
      expect(options.json).toEqual(true);
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

      discovery.queryRelations(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.addTrainingData(params);

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
      expect(options.json).toEqual(true);
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

      discovery.addTrainingData(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.createTrainingExample(params);

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
      expect(options.json).toEqual(true);
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

      discovery.createTrainingExample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteAllTrainingData(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.deleteAllTrainingData(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteTrainingData(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.deleteTrainingData(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteTrainingExample(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        'DELETE'
      );
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.deleteTrainingExample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getTrainingData(params);

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
      const expectedContentType = 'application/json';
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

      discovery.getTrainingData(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getTrainingExample(params);

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
      const expectedContentType = 'application/json';
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

      discovery.getTrainingExample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.listTrainingData(params);

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
      const expectedContentType = 'application/json';
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

      discovery.listTrainingData(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.listTrainingExamples(params);

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
      const expectedContentType = 'application/json';
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

      discovery.listTrainingExamples(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.updateTrainingExample(params);

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
      expect(options.json).toEqual(true);
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

      discovery.updateTrainingExample(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteUserData(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/user_data', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.deleteUserData(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.createEvent(params);

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
      expect(options.json).toEqual(true);
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

      discovery.createEvent(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getMetricsEventRate(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/metrics/event_rate', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.getMetricsEventRate(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      discovery.getMetricsEventRate();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.getMetricsEventRate(noop);
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
      discovery.getMetricsQuery(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/metrics/number_of_queries', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.getMetricsQuery(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      discovery.getMetricsQuery();
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
      discovery.getMetricsQueryEvent(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/metrics/number_of_queries_with_event', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.getMetricsQueryEvent(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      discovery.getMetricsQueryEvent();
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
      discovery.getMetricsQueryNoResults(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/metrics/number_of_queries_with_no_search_results', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.getMetricsQueryNoResults(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      discovery.getMetricsQueryNoResults();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.getMetricsQueryNoResults(noop);
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
      discovery.getMetricsQueryTokenEvent(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/metrics/top_query_tokens_with_event_rate', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.getMetricsQueryTokenEvent(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      discovery.getMetricsQueryTokenEvent();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.getMetricsQueryTokenEvent(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      discovery.queryLog(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/logs', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.queryLog(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      discovery.queryLog();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      discovery.queryLog(noop);
      checkDefaultSuccessArgs(createRequestMock);
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
      const params = {
        environment_id,
        source_type,
        credential_details,
      };

      // invoke method
      discovery.createCredentials(params);

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
      expect(options.json).toEqual(true);
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

      discovery.createCredentials(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteCredentials(params);

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
      const expectedContentType = 'application/json';
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

      discovery.deleteCredentials(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
  });
});
describe('getSourceCredentials', () => {
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
      discovery.getSourceCredentials(params);

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
      const expectedContentType = 'application/json';
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

      discovery.getSourceCredentials(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      discovery.getSourceCredentials(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'credential_id'];

      discovery.getSourceCredentials({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
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
      discovery.listCredentials(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/credentials', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.listCredentials(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      const params = {
        environment_id,
        credential_id,
        source_type,
        credential_details,
      };

      // invoke method
      discovery.updateCredentials(params);

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
      expect(options.json).toEqual(true);
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

      discovery.updateCredentials(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.createGateway(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/gateways', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['name']).toEqual(name);
      expect(options.json).toEqual(true);
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

      discovery.createGateway(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.deleteGateway(params);

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
      const expectedContentType = 'application/json';
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

      discovery.deleteGateway(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.getGateway(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/gateways/{gateway_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.getGateway(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
      discovery.listGateways(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/environments/{environment_id}/gateways', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
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

      discovery.listGateways(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
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
  });
});
