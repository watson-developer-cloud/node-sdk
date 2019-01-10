'use strict';

const VisualRecognitionV3 = require('../../visual-recognition/v3-generated');
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
const expectToBePromise = utils.expectToBePromise;

const service = {
  username: 'batman',
  password: 'bruce-wayne',
  url: 'https://gateway.watsonplatform.net/visual-recognition/api',
  version: '2018-10-18',
};

const watson_vision_combined = new VisualRecognitionV3(service);
const createRequestMock = jest.spyOn(watson_vision_combined, 'createRequest');
const missingParamsMock = jest.spyOn(helper, 'getMissingParams');
const noop = () => {};

afterEach(() => {
  createRequestMock.mockReset();
  missingParamsMock.mockClear();
});

describe('classify', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const images_file = 'fake_images_file';
      const accept_language = 'fake_accept_language';
      const url = 'fake_url';
      const threshold = 'fake_threshold';
      const owners = 'fake_owners';
      const classifier_ids = 'fake_classifier_ids';
      const images_file_content_type = 'fake_images_file_content_type';
      const images_filename = 'fake_images_filename';
      const params = {
        images_file,
        accept_language,
        url,
        threshold,
        owners,
        classifier_ids,
        images_file_content_type,
        images_filename,
      };

      // invoke method
      watson_vision_combined.classify(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classify', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      checkUserHeader(createRequestMock, 'Accept-Language', accept_language);
      expect(options.formData['images_file'].data).toEqual(images_file);
      expect(options.formData['images_file'].filename).toEqual(images_filename);
      expect(options.formData['images_file'].contentType).toEqual(images_file_content_type);
      expect(options.formData['url']).toEqual(url);
      expect(options.formData['threshold']).toEqual(threshold);
      expect(options.formData['owners']).toEqual(owners);
      expect(options.formData['classifier_ids']).toEqual(classifier_ids);
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

      watson_vision_combined.classify(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const classifyPromise = watson_vision_combined.classify(params);
      expectToBePromise(classifyPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      watson_vision_combined.classify({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      watson_vision_combined.classify(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});
describe('detectFaces', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const images_file = 'fake_images_file';
      const url = 'fake_url';
      const images_file_content_type = 'fake_images_file_content_type';
      const images_filename = 'fake_images_filename';
      const params = {
        images_file,
        url,
        images_file_content_type,
        images_filename,
      };

      // invoke method
      watson_vision_combined.detectFaces(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/detect_faces', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['images_file'].data).toEqual(images_file);
      expect(options.formData['images_file'].filename).toEqual(images_filename);
      expect(options.formData['images_file'].contentType).toEqual(images_file_content_type);
      expect(options.formData['url']).toEqual(url);
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

      watson_vision_combined.detectFaces(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const detectFacesPromise = watson_vision_combined.detectFaces(params);
      expectToBePromise(detectFacesPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      watson_vision_combined.detectFaces({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      watson_vision_combined.detectFaces(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});
describe('createClassifier', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const name = 'fake_name';
      const classname_positive_examples = 'fake_positive_examples';
      const negative_examples = 'fake_negative_examples';
      const classname_positive_examples_filename = 'fake_positive_examples_filename';
      const negative_examples_filename = 'fake_negative_examples_filename';
      const params = {
        name,
        classname_positive_examples,
        negative_examples,
        classname_positive_examples_filename,
        negative_examples_filename,
      };

      // invoke method
      watson_vision_combined.createClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['name']).toEqual(name);
      expect(options.formData['classname_positive_examples'].data).toEqual(
        classname_positive_examples
      );
      expect(options.formData['classname_positive_examples'].filename).toEqual(
        classname_positive_examples_filename
      );
      expect(options.formData['classname_positive_examples'].contentType).toEqual(
        'application/octet-stream'
      );
      expect(options.formData['negative_examples'].data).toEqual(negative_examples);
      expect(options.formData['negative_examples'].filename).toEqual(negative_examples_filename);
      expect(options.formData['negative_examples'].contentType).toEqual('application/octet-stream');
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const name = 'fake_name';
      const classname_positive_examples = 'fake_positive_examples';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        name,
        classname_positive_examples,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      watson_vision_combined.createClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const name = 'fake_name';
      const classname_positive_examples = 'fake_positive_examples';
      const params = {
        name,
        classname_positive_examples,
      };

      // invoke method
      const createClassifierPromise = watson_vision_combined.createClassifier(params);
      expectToBePromise(createClassifierPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      watson_vision_combined.createClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['name', '<classname>_positive_examples'];

      watson_vision_combined.createClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['name', '<classname>_positive_examples'];

      const createClassifierPromise = watson_vision_combined.createClassifier();
      expectToBePromise(createClassifierPromise);

      createClassifierPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('deleteClassifier', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      watson_vision_combined.deleteClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['classifier_id']).toEqual(classifier_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      watson_vision_combined.deleteClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      const deleteClassifierPromise = watson_vision_combined.deleteClassifier(params);
      expectToBePromise(deleteClassifierPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      watson_vision_combined.deleteClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      watson_vision_combined.deleteClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      const deleteClassifierPromise = watson_vision_combined.deleteClassifier();
      expectToBePromise(deleteClassifierPromise);

      deleteClassifierPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('getClassifier', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      watson_vision_combined.getClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['classifier_id']).toEqual(classifier_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      watson_vision_combined.getClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      const getClassifierPromise = watson_vision_combined.getClassifier(params);
      expectToBePromise(getClassifierPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      watson_vision_combined.getClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      watson_vision_combined.getClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      const getClassifierPromise = watson_vision_combined.getClassifier();
      expectToBePromise(getClassifierPromise);

      getClassifierPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('listClassifiers', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const verbose = 'fake_verbose';
      const params = {
        verbose,
      };

      // invoke method
      watson_vision_combined.listClassifiers(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.qs['verbose']).toEqual(verbose);
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

      watson_vision_combined.listClassifiers(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const params = {};

      // invoke method
      const listClassifiersPromise = watson_vision_combined.listClassifiers(params);
      expectToBePromise(listClassifiersPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      watson_vision_combined.listClassifiers({}, noop);
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      watson_vision_combined.listClassifiers(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});
describe('updateClassifier', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const classname_positive_examples = 'fake_positive_examples';
      const negative_examples = 'fake_negative_examples';
      const classname_positive_examples_filename = 'fake_positive_examples_filename';
      const negative_examples_filename = 'fake_negative_examples_filename';
      const params = {
        classifier_id,
        classname_positive_examples,
        negative_examples,
        classname_positive_examples_filename,
        negative_examples_filename,
      };

      // invoke method
      watson_vision_combined.updateClassifier(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['classname_positive_examples'].data).toEqual(
        classname_positive_examples
      );
      expect(options.formData['classname_positive_examples'].filename).toEqual(
        classname_positive_examples_filename
      );
      expect(options.formData['classname_positive_examples'].contentType).toEqual(
        'application/octet-stream'
      );
      expect(options.formData['negative_examples'].data).toEqual(negative_examples);
      expect(options.formData['negative_examples'].filename).toEqual(negative_examples_filename);
      expect(options.formData['negative_examples'].contentType).toEqual('application/octet-stream');
      expect(options.path['classifier_id']).toEqual(classifier_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      watson_vision_combined.updateClassifier(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      const updateClassifierPromise = watson_vision_combined.updateClassifier(params);
      expectToBePromise(updateClassifierPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      watson_vision_combined.updateClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      watson_vision_combined.updateClassifier({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      const updateClassifierPromise = watson_vision_combined.updateClassifier();
      expectToBePromise(updateClassifierPromise);

      updateClassifierPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('getCoreMlModel', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      watson_vision_combined.getCoreMlModel(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/classifiers/{classifier_id}/core_ml_model', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/octet-stream';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['classifier_id']).toEqual(classifier_id);
      expect(options.encoding).toBeNull();
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier_id,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      watson_vision_combined.getCoreMlModel(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const params = {
        classifier_id,
      };

      // invoke method
      const getCoreMlModelPromise = watson_vision_combined.getCoreMlModel(params);
      expectToBePromise(getCoreMlModelPromise);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      watson_vision_combined.getCoreMlModel(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      watson_vision_combined.getCoreMlModel({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      const getCoreMlModelPromise = watson_vision_combined.getCoreMlModel();
      expectToBePromise(getCoreMlModelPromise);

      getCoreMlModelPromise.catch(err => {
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
      watson_vision_combined.deleteUserData(params, noop);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v3/user_data', 'DELETE');
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

      watson_vision_combined.deleteUserData(params, noop);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });

    test('should return a promise when no callback is given', () => {
      // parameters
      const customer_id = 'fake_customer_id';
      const params = {
        customer_id,
      };

      // invoke method
      const deleteUserDataPromise = watson_vision_combined.deleteUserData(params);
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
      watson_vision_combined.deleteUserData(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      watson_vision_combined.deleteUserData({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });

    test('should reject promise when required params are not given', done => {
      // required parameters for this method
      const requiredParams = ['customer_id'];

      const deleteUserDataPromise = watson_vision_combined.deleteUserData();
      expectToBePromise(deleteUserDataPromise);

      deleteUserDataPromise.catch(err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
