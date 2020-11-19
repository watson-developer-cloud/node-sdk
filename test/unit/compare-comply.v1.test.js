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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

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
  version: 'testString',
};

const compareComplyService = new CompareComplyV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(compareComplyService, 'createRequest');
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

describe('CompareComplyV1', () => {
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new CompareComplyV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new CompareComplyV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(CompareComplyV1.DEFAULT_SERVICE_URL);
    });

    test('use user-given service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new CompareComplyV1(options);

      expect(testInstance.baseOptions.serviceName).toBe('my-service');
    });

    test('use default service name', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new CompareComplyV1(options);

      expect(testInstance.baseOptions.serviceName).toBe(CompareComplyV1.DEFAULT_SERVICE_NAME);
    });

    test('use user-given service authenticator', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new CompareComplyV1(options);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).not.toHaveBeenCalled();
    });

    test('use environment authenticator', () => {
      const testInstance = new CompareComplyV1(requiredGlobals);

      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(getAuthenticatorMock).toHaveBeenCalled();
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new CompareComplyV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('convertToHtml', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation convertToHtml
        const file = Buffer.from('This is a mock file.');
        const fileContentType = 'application/pdf';
        const model = 'contracts';
        const params = {
          file: file,
          fileContentType: fileContentType,
          model: model,
        };

        const convertToHtmlResult = compareComplyService.convertToHtml(params);

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
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['model']).toEqual(model);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          file,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.convertToHtml(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await compareComplyService.convertToHtml({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const convertToHtmlPromise = compareComplyService.convertToHtml();
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
        // Construct the params object for operation classifyElements
        const file = Buffer.from('This is a mock file.');
        const fileContentType = 'application/pdf';
        const model = 'contracts';
        const params = {
          file: file,
          fileContentType: fileContentType,
          model: model,
        };

        const classifyElementsResult = compareComplyService.classifyElements(params);

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
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['model']).toEqual(model);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          file,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.classifyElements(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await compareComplyService.classifyElements({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const classifyElementsPromise = compareComplyService.classifyElements();
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
        // Construct the params object for operation extractTables
        const file = Buffer.from('This is a mock file.');
        const fileContentType = 'application/pdf';
        const model = 'contracts';
        const params = {
          file: file,
          fileContentType: fileContentType,
          model: model,
        };

        const extractTablesResult = compareComplyService.extractTables(params);

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
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['model']).toEqual(model);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          file,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.extractTables(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await compareComplyService.extractTables({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const extractTablesPromise = compareComplyService.extractTables();
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
        // Construct the params object for operation compareDocuments
        const file1 = Buffer.from('This is a mock file.');
        const file2 = Buffer.from('This is a mock file.');
        const file1ContentType = 'application/pdf';
        const file2ContentType = 'application/pdf';
        const file1Label = 'testString';
        const file2Label = 'testString';
        const model = 'contracts';
        const params = {
          file1: file1,
          file2: file2,
          file1ContentType: file1ContentType,
          file2ContentType: file2ContentType,
          file1Label: file1Label,
          file2Label: file2Label,
          model: model,
        };

        const compareDocumentsResult = compareComplyService.compareDocuments(params);

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
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['file_1_label']).toEqual(file1Label);
        expect(options.qs['file_2_label']).toEqual(file2Label);
        expect(options.qs['model']).toEqual(model);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const file1 = Buffer.from('This is a mock file.');
        const file2 = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          file1,
          file2,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.compareDocuments(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await compareComplyService.compareDocuments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const compareDocumentsPromise = compareComplyService.compareDocuments();
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
      // Request models needed by this operation.

      // ShortDoc
      const shortDocModel = {
        title: 'testString',
        hash: 'testString',
      };

      // Location
      const locationModel = {
        begin: 26,
        end: 26,
      };

      // Label
      const labelModel = {
        nature: 'testString',
        party: 'testString',
      };

      // TypeLabel
      const typeLabelModel = {
        label: labelModel,
        provenance_ids: ['testString'],
        modification: 'added',
      };

      // Category
      const categoryModel = {
        label: 'Amendments',
        provenance_ids: ['testString'],
        modification: 'added',
      };

      // OriginalLabelsIn
      const originalLabelsInModel = {
        types: [typeLabelModel],
        categories: [categoryModel],
      };

      // UpdatedLabelsIn
      const updatedLabelsInModel = {
        types: [typeLabelModel],
        categories: [categoryModel],
      };

      // FeedbackDataInput
      const feedbackDataInputModel = {
        feedback_type: 'testString',
        document: shortDocModel,
        model_id: 'testString',
        model_version: 'testString',
        location: locationModel,
        text: 'testString',
        original_labels: originalLabelsInModel,
        updated_labels: updatedLabelsInModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addFeedback
        const feedbackData = feedbackDataInputModel;
        const userId = 'testString';
        const comment = 'testString';
        const params = {
          feedbackData: feedbackData,
          userId: userId,
          comment: comment,
        };

        const addFeedbackResult = compareComplyService.addFeedback(params);

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
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const feedbackData = feedbackDataInputModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          feedbackData,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.addFeedback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await compareComplyService.addFeedback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addFeedbackPromise = compareComplyService.addFeedback();
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
        // Construct the params object for operation listFeedback
        const feedbackType = 'testString';
        const documentTitle = 'testString';
        const modelId = 'testString';
        const modelVersion = 'testString';
        const categoryRemoved = 'testString';
        const categoryAdded = 'testString';
        const categoryNotChanged = 'testString';
        const typeRemoved = 'testString';
        const typeAdded = 'testString';
        const typeNotChanged = 'testString';
        const pageLimit = 100;
        const cursor = 'testString';
        const sort = 'testString';
        const includeTotal = true;
        const params = {
          feedbackType: feedbackType,
          documentTitle: documentTitle,
          modelId: modelId,
          modelVersion: modelVersion,
          categoryRemoved: categoryRemoved,
          categoryAdded: categoryAdded,
          categoryNotChanged: categoryNotChanged,
          typeRemoved: typeRemoved,
          typeAdded: typeAdded,
          typeNotChanged: typeNotChanged,
          pageLimit: pageLimit,
          cursor: cursor,
          sort: sort,
          includeTotal: includeTotal,
        };

        const listFeedbackResult = compareComplyService.listFeedback(params);

        // all methods should return a Promise
        expectToBePromise(listFeedbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/feedback', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['feedback_type']).toEqual(feedbackType);
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
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.listFeedback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        compareComplyService.listFeedback({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getFeedback', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getFeedback
        const feedbackId = 'testString';
        const model = 'contracts';
        const params = {
          feedbackId: feedbackId,
          model: model,
        };

        const getFeedbackResult = compareComplyService.getFeedback(params);

        // all methods should return a Promise
        expectToBePromise(getFeedbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/feedback/{feedback_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['model']).toEqual(model);
        expect(options.path['feedback_id']).toEqual(feedbackId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const feedbackId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          feedbackId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.getFeedback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await compareComplyService.getFeedback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getFeedbackPromise = compareComplyService.getFeedback();
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
        // Construct the params object for operation deleteFeedback
        const feedbackId = 'testString';
        const model = 'contracts';
        const params = {
          feedbackId: feedbackId,
          model: model,
        };

        const deleteFeedbackResult = compareComplyService.deleteFeedback(params);

        // all methods should return a Promise
        expectToBePromise(deleteFeedbackResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/feedback/{feedback_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['model']).toEqual(model);
        expect(options.path['feedback_id']).toEqual(feedbackId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const feedbackId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          feedbackId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.deleteFeedback(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await compareComplyService.deleteFeedback({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteFeedbackPromise = compareComplyService.deleteFeedback();
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
        // Construct the params object for operation createBatch
        const _function = 'html_conversion';
        const inputCredentialsFile = Buffer.from('This is a mock file.');
        const inputBucketLocation = 'testString';
        const inputBucketName = 'testString';
        const outputCredentialsFile = Buffer.from('This is a mock file.');
        const outputBucketLocation = 'testString';
        const outputBucketName = 'testString';
        const model = 'contracts';
        const params = {
          _function: _function,
          inputCredentialsFile: inputCredentialsFile,
          inputBucketLocation: inputBucketLocation,
          inputBucketName: inputBucketName,
          outputCredentialsFile: outputCredentialsFile,
          outputBucketLocation: outputBucketLocation,
          outputBucketName: outputBucketName,
          model: model,
        };

        const createBatchResult = compareComplyService.createBatch(params);

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
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['function']).toEqual(_function);
        expect(options.qs['model']).toEqual(model);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const _function = 'html_conversion';
        const inputCredentialsFile = Buffer.from('This is a mock file.');
        const inputBucketLocation = 'testString';
        const inputBucketName = 'testString';
        const outputCredentialsFile = Buffer.from('This is a mock file.');
        const outputBucketLocation = 'testString';
        const outputBucketName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
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

        compareComplyService.createBatch(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await compareComplyService.createBatch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createBatchPromise = compareComplyService.createBatch();
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
        // Construct the params object for operation listBatches
        const params = {};

        const listBatchesResult = compareComplyService.listBatches(params);

        // all methods should return a Promise
        expectToBePromise(listBatchesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/batches', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.listBatches(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        compareComplyService.listBatches({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getBatch', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getBatch
        const batchId = 'testString';
        const params = {
          batchId: batchId,
        };

        const getBatchResult = compareComplyService.getBatch(params);

        // all methods should return a Promise
        expectToBePromise(getBatchResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/batches/{batch_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['batch_id']).toEqual(batchId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const batchId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          batchId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.getBatch(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await compareComplyService.getBatch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getBatchPromise = compareComplyService.getBatch();
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
        // Construct the params object for operation updateBatch
        const batchId = 'testString';
        const action = 'rescan';
        const model = 'contracts';
        const params = {
          batchId: batchId,
          action: action,
          model: model,
        };

        const updateBatchResult = compareComplyService.updateBatch(params);

        // all methods should return a Promise
        expectToBePromise(updateBatchResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/batches/{batch_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['action']).toEqual(action);
        expect(options.qs['model']).toEqual(model);
        expect(options.path['batch_id']).toEqual(batchId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const batchId = 'testString';
        const action = 'rescan';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          batchId,
          action,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        compareComplyService.updateBatch(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await compareComplyService.updateBatch({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateBatchPromise = compareComplyService.updateBatch();
        expectToBePromise(updateBatchPromise);

        updateBatchPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
