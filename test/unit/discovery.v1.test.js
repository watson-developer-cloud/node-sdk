const DiscoveryV1 = require('../../discovery/v1');
const helper = require('../../lib/helper');
const utils = require('../resources/unitTestUtils');

const {
  missingParamsError,
  missingParamsSuccess,
  checkUrlAndMethod,
  checkCallback,
  checkHeaders,
  checkForEmptyObject,
  checkRequiredParamsHandling,
  getOptions,
} = utils;

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/discovery/api',
  version: '2018-09-19',
};

const discovery = new DiscoveryV1(service);
const createRequestMock = jest.spyOn(discovery, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
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
      const filename = 'fake_filename';
      const file_content_type = 'fake_file_content_type';
      const params = {
        environment_id,
        collection_id,
        document_id,
        file,
        metadata,
        filename,
        file_content_type,
      };

      // invoke method
      discovery.updateDocument(params);

      // assert that create request was called and extract called arguments
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      // check `options` object
      const options = getOptions(createRequestMock);

      checkUrlAndMethod(
        options,
        '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        'POST'
      );
      checkHeaders(createRequestMock, 'application/json', 'multipart/form-data');
      checkCallback(createRequestMock);

      expect(options.path.environment_id).toEqual(environment_id);
      expect(options.path.collection_id).toEqual(collection_id);
      expect(options.path.document_id).toEqual(document_id);

      expect(options.formData.file.data).toEqual(file);
      expect(options.formData.file.filename).toEqual(filename);
      expect(options.formData.file.contentType).toEqual(file_content_type);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const environment_id = 'fake_environment_id';
      const collection_id = 'fake_collection_id';
      const document_id = 'fake_document_id';
      const accept = 'fake/header';
      const params = {
        environment_id,
        collection_id,
        document_id,
        headers: {
          Accept: accept,
        },
      };

      // invoke the method
      discovery.updateDocument(params);
      checkHeaders(createRequestMock, accept);
    });
  });

  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      // invoke the method
      discovery.updateDocument(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['environment_id', 'collection_id', 'document_id'];

      // invoke the method
      discovery.updateDocument({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
