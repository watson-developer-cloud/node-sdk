'use strict';

const CompareComplyV1 = require('../../compare-comply/v1');
const helper = require('../../lib/helper');
const utils = require('../resources/unitTestUtils');

const missingParamsError = utils.missingParamsError;
const missingParamsSuccess = utils.missingParamsSuccess;
const checkUrlAndMethod = utils.checkUrlAndMethod;
const checkCallback = utils.checkCallback;
const checkMediaHeaders = utils.checkMediaHeaders;
const checkDefaultSuccessArgs = utils.checkDefaultSuccessArgs;
const checkForEmptyObject = utils.checkForEmptyObject;
const checkRequiredParamsHandling = utils.checkRequiredParamsHandling;
const getOptions = utils.getOptions;

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/compare-comply/api',
  version: '2018-10-18',
};

const compare_comply = new CompareComplyV1(service);
const createRequestMock = jest.spyOn(compare_comply, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');
const noop = () => {};

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('convertToHtml', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const file = 'fake_file';
      const model_id = 'fake_model_id';
      const file_content_type = 'fake_file_content_type';
      const filename = 'fake_filename';
      const params = {
        file,
        model_id,
        file_content_type,
        filename,
      };

      // invoke method
      compare_comply.convertToHtml(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/html_conversion', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['file'].data).toEqual(file);
      expect(options.formData['file'].filename).toEqual(filename);
      expect(options.formData['file'].contentType).toEqual(file_content_type);
      expect(options.qs['model_id']).toEqual(model_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const file = 'fake_file';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        file,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      compare_comply.convertToHtml(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      compare_comply.convertToHtml(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['file'];

      compare_comply.convertToHtml({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('classifyElements', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const file = 'fake_file';
      const model_id = 'fake_model_id';
      const file_content_type = 'fake_file_content_type';
      const filename = 'fake_filename';
      const params = {
        file,
        model_id,
        file_content_type,
        filename,
      };

      // invoke method
      compare_comply.classifyElements(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/element_classification', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['file'].data).toEqual(file);
      expect(options.formData['file'].filename).toEqual(filename);
      expect(options.formData['file'].contentType).toEqual(file_content_type);
      expect(options.qs['model_id']).toEqual(model_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const file = 'fake_file';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        file,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      compare_comply.classifyElements(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      compare_comply.classifyElements(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['file'];

      compare_comply.classifyElements({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('extractTables', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const file = 'fake_file';
      const model_id = 'fake_model_id';
      const file_content_type = 'fake_file_content_type';
      const filename = 'fake_filename';
      const params = {
        file,
        model_id,
        file_content_type,
        filename,
      };

      // invoke method
      compare_comply.extractTables(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/tables', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['file'].data).toEqual(file);
      expect(options.formData['file'].filename).toEqual(filename);
      expect(options.formData['file'].contentType).toEqual(file_content_type);
      expect(options.qs['model_id']).toEqual(model_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const file = 'fake_file';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        file,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      compare_comply.extractTables(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      compare_comply.extractTables(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['file'];

      compare_comply.extractTables({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('compareDocuments', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const file_1 = 'fake_file_1';
      const file_2 = 'fake_file_2';
      const file_1_label = 'fake_file_1_label';
      const file_2_label = 'fake_file_2_label';
      const model_id = 'fake_model_id';
      const file_1_content_type = 'fake_file_1_content_type';
      const file_1_filename = 'fake_file_1_filename';
      const file_2_content_type = 'fake_file_2_content_type';
      const file_2_filename = 'fake_file_2_filename';
      const params = {
        file_1,
        file_2,
        file_1_label,
        file_2_label,
        model_id,
        file_1_content_type,
        file_1_filename,
        file_2_content_type,
        file_2_filename,
      };

      // invoke method
      compare_comply.compareDocuments(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/comparison', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['file_1'].data).toEqual(file_1);
      expect(options.formData['file_1'].filename).toEqual(file_1_filename);
      expect(options.formData['file_1'].contentType).toEqual(file_1_content_type);
      expect(options.formData['file_2'].data).toEqual(file_2);
      expect(options.formData['file_2'].filename).toEqual(file_2_filename);
      expect(options.formData['file_2'].contentType).toEqual(file_2_content_type);
      expect(options.qs['file_1_label']).toEqual(file_1_label);
      expect(options.qs['file_2_label']).toEqual(file_2_label);
      expect(options.qs['model_id']).toEqual(model_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const file_1 = 'fake_file_1';
      const file_2 = 'fake_file_2';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        file_1,
        file_2,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      compare_comply.compareDocuments(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      compare_comply.compareDocuments(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['file_1', 'file_2'];

      compare_comply.compareDocuments({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('addFeedback', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const feedback_data = 'fake_feedback_data';
      const user_id = 'fake_user_id';
      const comment = 'fake_comment';
      const params = {
        feedback_data,
        user_id,
        comment,
      };

      // invoke method
      compare_comply.addFeedback(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/feedback', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['feedback_data']).toEqual(feedback_data);
      expect(options.body['user_id']).toEqual(user_id);
      expect(options.body['comment']).toEqual(comment);
      expect(options.json).toEqual(true);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const feedback_data = 'fake_feedback_data';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        feedback_data,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      compare_comply.addFeedback(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      compare_comply.addFeedback(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['feedback_data'];

      compare_comply.addFeedback({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('deleteFeedback', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const feedback_id = 'fake_feedback_id';
      const model_id = 'fake_model_id';
      const params = {
        feedback_id,
        model_id,
      };

      // invoke method
      compare_comply.deleteFeedback(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/feedback/{feedback_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['model_id']).toEqual(model_id);
      expect(options.path['feedback_id']).toEqual(feedback_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const feedback_id = 'fake_feedback_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        feedback_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      compare_comply.deleteFeedback(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      compare_comply.deleteFeedback(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['feedback_id'];

      compare_comply.deleteFeedback({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('getFeedback', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const feedback_id = 'fake_feedback_id';
      const model_id = 'fake_model_id';
      const params = {
        feedback_id,
        model_id,
      };

      // invoke method
      compare_comply.getFeedback(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/feedback/{feedback_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['model_id']).toEqual(model_id);
      expect(options.path['feedback_id']).toEqual(feedback_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const feedback_id = 'fake_feedback_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        feedback_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      compare_comply.getFeedback(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      compare_comply.getFeedback(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['feedback_id'];

      compare_comply.getFeedback({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('listFeedback', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const feedback_type = 'fake_feedback_type';
      const before = 'fake_before';
      const after = 'fake_after';
      const document_title = 'fake_document_title';
      const model_id = 'fake_model_id';
      const model_version = 'fake_model_version';
      const category_removed = 'fake_category_removed';
      const category_added = 'fake_category_added';
      const category_not_changed = 'fake_category_not_changed';
      const type_removed = 'fake_type_removed';
      const type_added = 'fake_type_added';
      const type_not_changed = 'fake_type_not_changed';
      const page_limit = 'fake_page_limit';
      const cursor = 'fake_cursor';
      const sort = 'fake_sort';
      const include_total = 'fake_include_total';
      const params = {
        feedback_type,
        before,
        after,
        document_title,
        model_id,
        model_version,
        category_removed,
        category_added,
        category_not_changed,
        type_removed,
        type_added,
        type_not_changed,
        page_limit,
        cursor,
        sort,
        include_total,
      };

      // invoke method
      compare_comply.listFeedback(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/feedback', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['feedback_type']).toEqual(feedback_type);
      expect(options.qs['before']).toEqual(before);
      expect(options.qs['after']).toEqual(after);
      expect(options.qs['document_title']).toEqual(document_title);
      expect(options.qs['model_id']).toEqual(model_id);
      expect(options.qs['model_version']).toEqual(model_version);
      expect(options.qs['category_removed']).toEqual(category_removed);
      expect(options.qs['category_added']).toEqual(category_added);
      expect(options.qs['category_not_changed']).toEqual(category_not_changed);
      expect(options.qs['type_removed']).toEqual(type_removed);
      expect(options.qs['type_added']).toEqual(type_added);
      expect(options.qs['type_not_changed']).toEqual(type_not_changed);
      expect(options.qs['page_limit']).toEqual(page_limit);
      expect(options.qs['cursor']).toEqual(cursor);
      expect(options.qs['sort']).toEqual(sort);
      expect(options.qs['include_total']).toEqual(include_total);
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

      compare_comply.listFeedback(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      compare_comply.listFeedback();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      compare_comply.listFeedback(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});
describe('createBatch', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const _function = 'fake__function';
      const input_credentials_file = 'fake_input_credentials_file';
      const input_bucket_location = 'fake_input_bucket_location';
      const input_bucket_name = 'fake_input_bucket_name';
      const output_credentials_file = 'fake_output_credentials_file';
      const output_bucket_location = 'fake_output_bucket_location';
      const output_bucket_name = 'fake_output_bucket_name';
      const model_id = 'fake_model_id';
      const input_credentials_filename = 'fake_input_credentials_filename';
      const output_credentials_filename = 'fake_output_credentials_filename';
      const params = {
        _function,
        input_credentials_file,
        input_bucket_location,
        input_bucket_name,
        output_credentials_file,
        output_bucket_location,
        output_bucket_name,
        model_id,
        input_credentials_filename,
        output_credentials_filename,
      };

      // invoke method
      compare_comply.createBatch(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/batches', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['input_credentials_file'].data).toEqual(input_credentials_file);
      expect(options.formData['input_credentials_file'].filename).toEqual(
        input_credentials_filename
      );
      expect(options.formData['input_credentials_file'].contentType).toEqual('application/json');
      expect(options.formData['input_bucket_location']).toEqual(input_bucket_location);
      expect(options.formData['input_bucket_name']).toEqual(input_bucket_name);
      expect(options.formData['output_credentials_file'].data).toEqual(output_credentials_file);
      expect(options.formData['output_credentials_file'].filename).toEqual(
        output_credentials_filename
      );
      expect(options.formData['output_credentials_file'].contentType).toEqual('application/json');
      expect(options.formData['output_bucket_location']).toEqual(output_bucket_location);
      expect(options.formData['output_bucket_name']).toEqual(output_bucket_name);
      expect(options.qs['function']).toEqual(_function);
      expect(options.qs['model_id']).toEqual(model_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const _function = 'fake__function';
      const input_credentials_file = 'fake_input_credentials_file';
      const input_bucket_location = 'fake_input_bucket_location';
      const input_bucket_name = 'fake_input_bucket_name';
      const output_credentials_file = 'fake_output_credentials_file';
      const output_bucket_location = 'fake_output_bucket_location';
      const output_bucket_name = 'fake_output_bucket_name';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        _function,
        input_credentials_file,
        input_bucket_location,
        input_bucket_name,
        output_credentials_file,
        output_bucket_location,
        output_bucket_name,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      compare_comply.createBatch(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      compare_comply.createBatch(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = [
        '_function',
        'input_credentials_file',
        'input_bucket_location',
        'input_bucket_name',
        'output_credentials_file',
        'output_bucket_location',
        'output_bucket_name',
      ];

      compare_comply.createBatch({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('getBatch', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const batch_id = 'fake_batch_id';
      const params = {
        batch_id,
      };

      // invoke method
      compare_comply.getBatch(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/batches/{batch_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['batch_id']).toEqual(batch_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const batch_id = 'fake_batch_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        batch_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      compare_comply.getBatch(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      compare_comply.getBatch(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['batch_id'];

      compare_comply.getBatch({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('listBatches', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const params = {};

      // invoke method
      compare_comply.listBatches(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/batches', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

      compare_comply.listBatches(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      compare_comply.listBatches();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      compare_comply.listBatches(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});
describe('updateBatch', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const batch_id = 'fake_batch_id';
      const action = 'fake_action';
      const model_id = 'fake_model_id';
      const params = {
        batch_id,
        action,
        model_id,
      };

      // invoke method
      compare_comply.updateBatch(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/batches/{batch_id}', 'PUT');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['action']).toEqual(action);
      expect(options.qs['model_id']).toEqual(model_id);
      expect(options.path['batch_id']).toEqual(batch_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const batch_id = 'fake_batch_id';
      const action = 'fake_action';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        batch_id,
        action,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      compare_comply.updateBatch(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      compare_comply.updateBatch(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['batch_id', 'action'];

      compare_comply.updateBatch({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
