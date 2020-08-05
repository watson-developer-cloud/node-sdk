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
const CompareComplyV1 = require('../../dist/compare-comply/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.us-south.compare-comply.watson.cloud.ibm.com',
  version: '2018-10-18',
};

const compareComply = new CompareComplyV1(service);
const createRequestMock = jest.spyOn(compareComply, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('CompareComplyV1', () => {
  describe('convertToHtml', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const file = 'fake_file';
        const fileContentType = 'fake_fileContentType';
        const model = 'fake_model';
        const params = {
          file,
          fileContentType,
          model,
        };

        const convertToHtmlResult = compareComply.convertToHtml(params);

        // all methods should return a Promise
        expectToBePromise(convertToHtmlResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/html_conversion', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].contentType).toEqual(fileContentType);
        expect(options.qs['model']).toEqual(model);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file = 'fake_file';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          file,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComply.convertToHtml(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['file'];

        let err;
        try {
          await compareComply.convertToHtml({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['file'];

        const convertToHtmlPromise = compareComply.convertToHtml();
        expectToBePromise(convertToHtmlPromise);

        convertToHtmlPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('classifyElements', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const file = 'fake_file';
        const fileContentType = 'fake_fileContentType';
        const model = 'fake_model';
        const params = {
          file,
          fileContentType,
          model,
        };

        const classifyElementsResult = compareComply.classifyElements(params);

        // all methods should return a Promise
        expectToBePromise(classifyElementsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/element_classification', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].contentType).toEqual(fileContentType);
        expect(options.qs['model']).toEqual(model);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file = 'fake_file';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          file,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComply.classifyElements(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['file'];

        let err;
        try {
          await compareComply.classifyElements({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['file'];

        const classifyElementsPromise = compareComply.classifyElements();
        expectToBePromise(classifyElementsPromise);

        classifyElementsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('extractTables', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const file = 'fake_file';
        const fileContentType = 'fake_fileContentType';
        const model = 'fake_model';
        const params = {
          file,
          fileContentType,
          model,
        };

        const extractTablesResult = compareComply.extractTables(params);

        // all methods should return a Promise
        expectToBePromise(extractTablesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/tables', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['file'].data).toEqual(file);
        expect(options.formData['file'].contentType).toEqual(fileContentType);
        expect(options.qs['model']).toEqual(model);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file = 'fake_file';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          file,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComply.extractTables(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['file'];

        let err;
        try {
          await compareComply.extractTables({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['file'];

        const extractTablesPromise = compareComply.extractTables();
        expectToBePromise(extractTablesPromise);

        extractTablesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('compareDocuments', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const file1 = 'fake_file1';
        const file2 = 'fake_file2';
        const file1ContentType = 'fake_file1ContentType';
        const file2ContentType = 'fake_file2ContentType';
        const file1Label = 'fake_file1Label';
        const file2Label = 'fake_file2Label';
        const model = 'fake_model';
        const params = {
          file1,
          file2,
          file1ContentType,
          file2ContentType,
          file1Label,
          file2Label,
          model,
        };

        const compareDocumentsResult = compareComply.compareDocuments(params);

        // all methods should return a Promise
        expectToBePromise(compareDocumentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/comparison', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['file_1'].data).toEqual(file1);
        expect(options.formData['file_1'].contentType).toEqual(file1ContentType);
        expect(options.formData['file_2'].data).toEqual(file2);
        expect(options.formData['file_2'].contentType).toEqual(file2ContentType);
        expect(options.qs['file_1_label']).toEqual(file1Label);
        expect(options.qs['file_2_label']).toEqual(file2Label);
        expect(options.qs['model']).toEqual(model);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file1 = 'fake_file1';
        const file2 = 'fake_file2';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          file1,
          file2,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComply.compareDocuments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['file1', 'file2'];

        let err;
        try {
          await compareComply.compareDocuments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['file1', 'file2'];

        const compareDocumentsPromise = compareComply.compareDocuments();
        expectToBePromise(compareDocumentsPromise);

        compareDocumentsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addFeedback', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const feedbackData = 'fake_feedbackData';
        const userId = 'fake_userId';
        const comment = 'fake_comment';
        const params = {
          feedbackData,
          userId,
          comment,
        };

        const addFeedbackResult = compareComply.addFeedback(params);

        // all methods should return a Promise
        expectToBePromise(addFeedbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/feedback', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['feedback_data']).toEqual(feedbackData);
        expect(options.body['user_id']).toEqual(userId);
        expect(options.body['comment']).toEqual(comment);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const feedbackData = 'fake_feedbackData';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          feedbackData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComply.addFeedback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['feedbackData'];

        let err;
        try {
          await compareComply.addFeedback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['feedbackData'];

        const addFeedbackPromise = compareComply.addFeedback();
        expectToBePromise(addFeedbackPromise);

        addFeedbackPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listFeedback', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const feedbackType = 'fake_feedbackType';
        const before = 'fake_before';
        const after = 'fake_after';
        const documentTitle = 'fake_documentTitle';
        const modelId = 'fake_modelId';
        const modelVersion = 'fake_modelVersion';
        const categoryRemoved = 'fake_categoryRemoved';
        const categoryAdded = 'fake_categoryAdded';
        const categoryNotChanged = 'fake_categoryNotChanged';
        const typeRemoved = 'fake_typeRemoved';
        const typeAdded = 'fake_typeAdded';
        const typeNotChanged = 'fake_typeNotChanged';
        const pageLimit = 'fake_pageLimit';
        const cursor = 'fake_cursor';
        const sort = 'fake_sort';
        const includeTotal = 'fake_includeTotal';
        const params = {
          feedbackType,
          before,
          after,
          documentTitle,
          modelId,
          modelVersion,
          categoryRemoved,
          categoryAdded,
          categoryNotChanged,
          typeRemoved,
          typeAdded,
          typeNotChanged,
          pageLimit,
          cursor,
          sort,
          includeTotal,
        };

        const listFeedbackResult = compareComply.listFeedback(params);

        // all methods should return a Promise
        expectToBePromise(listFeedbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/feedback', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['feedback_type']).toEqual(feedbackType);
        expect(options.qs['before']).toEqual(before);
        expect(options.qs['after']).toEqual(after);
        expect(options.qs['document_title']).toEqual(documentTitle);
        expect(options.qs['model_id']).toEqual(modelId);
        expect(options.qs['model_version']).toEqual(modelVersion);
        expect(options.qs['category_removed']).toEqual(categoryRemoved);
        expect(options.qs['category_added']).toEqual(categoryAdded);
        expect(options.qs['category_not_changed']).toEqual(categoryNotChanged);
        expect(options.qs['type_removed']).toEqual(typeRemoved);
        expect(options.qs['type_added']).toEqual(typeAdded);
        expect(options.qs['type_not_changed']).toEqual(typeNotChanged);
        expect(options.qs['page_limit']).toEqual(pageLimit);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['include_total']).toEqual(includeTotal);
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

        compareComply.listFeedback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        compareComply.listFeedback({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await compareComply.listFeedback(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getFeedback', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const feedbackId = 'fake_feedbackId';
        const model = 'fake_model';
        const params = {
          feedbackId,
          model,
        };

        const getFeedbackResult = compareComply.getFeedback(params);

        // all methods should return a Promise
        expectToBePromise(getFeedbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/feedback/{feedback_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['model']).toEqual(model);
        expect(options.path['feedback_id']).toEqual(feedbackId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const feedbackId = 'fake_feedbackId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          feedbackId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComply.getFeedback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['feedbackId'];

        let err;
        try {
          await compareComply.getFeedback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['feedbackId'];

        const getFeedbackPromise = compareComply.getFeedback();
        expectToBePromise(getFeedbackPromise);

        getFeedbackPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteFeedback', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const feedbackId = 'fake_feedbackId';
        const model = 'fake_model';
        const params = {
          feedbackId,
          model,
        };

        const deleteFeedbackResult = compareComply.deleteFeedback(params);

        // all methods should return a Promise
        expectToBePromise(deleteFeedbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/feedback/{feedback_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['model']).toEqual(model);
        expect(options.path['feedback_id']).toEqual(feedbackId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const feedbackId = 'fake_feedbackId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          feedbackId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComply.deleteFeedback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['feedbackId'];

        let err;
        try {
          await compareComply.deleteFeedback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['feedbackId'];

        const deleteFeedbackPromise = compareComply.deleteFeedback();
        expectToBePromise(deleteFeedbackPromise);

        deleteFeedbackPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createBatch', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const _function = 'fake__function';
        const inputCredentialsFile = 'fake_inputCredentialsFile';
        const inputBucketLocation = 'fake_inputBucketLocation';
        const inputBucketName = 'fake_inputBucketName';
        const outputCredentialsFile = 'fake_outputCredentialsFile';
        const outputBucketLocation = 'fake_outputBucketLocation';
        const outputBucketName = 'fake_outputBucketName';
        const model = 'fake_model';
        const params = {
          _function,
          inputCredentialsFile,
          inputBucketLocation,
          inputBucketName,
          outputCredentialsFile,
          outputBucketLocation,
          outputBucketName,
          model,
        };

        const createBatchResult = compareComply.createBatch(params);

        // all methods should return a Promise
        expectToBePromise(createBatchResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/batches', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['input_credentials_file'].data).toEqual(inputCredentialsFile);
        expect(options.formData['input_credentials_file'].contentType).toEqual('application/json');
        expect(options.formData['input_bucket_location']).toEqual(inputBucketLocation);
        expect(options.formData['input_bucket_name']).toEqual(inputBucketName);
        expect(options.formData['output_credentials_file'].data).toEqual(outputCredentialsFile);
        expect(options.formData['output_credentials_file'].contentType).toEqual('application/json');
        expect(options.formData['output_bucket_location']).toEqual(outputBucketLocation);
        expect(options.formData['output_bucket_name']).toEqual(outputBucketName);
        expect(options.qs['function']).toEqual(_function);
        expect(options.qs['model']).toEqual(model);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const _function = 'fake__function';
        const inputCredentialsFile = 'fake_inputCredentialsFile';
        const inputBucketLocation = 'fake_inputBucketLocation';
        const inputBucketName = 'fake_inputBucketName';
        const outputCredentialsFile = 'fake_outputCredentialsFile';
        const outputBucketLocation = 'fake_outputBucketLocation';
        const outputBucketName = 'fake_outputBucketName';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          _function,
          inputCredentialsFile,
          inputBucketLocation,
          inputBucketName,
          outputCredentialsFile,
          outputBucketLocation,
          outputBucketName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComply.createBatch(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = [
          '_function',
          'inputCredentialsFile',
          'inputBucketLocation',
          'inputBucketName',
          'outputCredentialsFile',
          'outputBucketLocation',
          'outputBucketName',
        ];

        let err;
        try {
          await compareComply.createBatch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = [
          '_function',
          'inputCredentialsFile',
          'inputBucketLocation',
          'inputBucketName',
          'outputCredentialsFile',
          'outputBucketLocation',
          'outputBucketName',
        ];

        const createBatchPromise = compareComply.createBatch();
        expectToBePromise(createBatchPromise);

        createBatchPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listBatches', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const params = {};

        const listBatchesResult = compareComply.listBatches(params);

        // all methods should return a Promise
        expectToBePromise(listBatchesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/batches', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        compareComply.listBatches(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method
        compareComply.listBatches({});
        checkForSuccessfulExecution(createRequestMock);
      });

      test('should use argument as callback function if only one is passed in', async () => {
        // invoke the method
        const callbackMock = jest.fn();
        await compareComply.listBatches(callbackMock);
        expect(callbackMock).toHaveBeenCalled();
      });
    });
  });
  describe('getBatch', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const batchId = 'fake_batchId';
        const params = {
          batchId,
        };

        const getBatchResult = compareComply.getBatch(params);

        // all methods should return a Promise
        expectToBePromise(getBatchResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/batches/{batch_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['batch_id']).toEqual(batchId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const batchId = 'fake_batchId';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          batchId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComply.getBatch(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['batchId'];

        let err;
        try {
          await compareComply.getBatch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['batchId'];

        const getBatchPromise = compareComply.getBatch();
        expectToBePromise(getBatchPromise);

        getBatchPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateBatch', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // parameters
        const batchId = 'fake_batchId';
        const action = 'fake_action';
        const model = 'fake_model';
        const params = {
          batchId,
          action,
          model,
        };

        const updateBatchResult = compareComply.updateBatch(params);

        // all methods should return a Promise
        expectToBePromise(updateBatchResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/batches/{batch_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['action']).toEqual(action);
        expect(options.qs['model']).toEqual(model);
        expect(options.path['batch_id']).toEqual(batchId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const batchId = 'fake_batchId';
        const action = 'fake_action';
        const userAccept = 'fake/header';
        const userContentType = 'fake/header';
        const params = {
          batchId,
          action,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComply.updateBatch(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        // required parameters for this method
        const requiredParams = ['batchId', 'action'];

        let err;
        try {
          await compareComply.updateBatch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        // required parameters for this method
        const requiredParams = ['batchId', 'action'];

        const updateBatchPromise = compareComply.updateBatch();
        expectToBePromise(updateBatchPromise);

        updateBatchPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
