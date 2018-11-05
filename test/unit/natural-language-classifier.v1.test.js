'use strict';

const NaturalLanguageClassifierV1 = require('../../natural-language-classifier/v1-generated');
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
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  version: '2018-10-18',
};

const natural_language_classifier = new NaturalLanguageClassifierV1(service);
const createRequestMock = jest.spyOn(natural_language_classifier, 'createRequest');
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
      const classifier_id = 'fake_classifier_id';
      const text = 'fake_text';
      const params = {
        classifier_id,
        text,
      };

      // invoke method
      natural_language_classifier.classify(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers/{classifier_id}/classify', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['text']).toEqual(text);
      expect(options.json).toEqual(true);
      expect(options.path['classifier_id']).toEqual(classifier_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier_id,
        text,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      natural_language_classifier.classify(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      natural_language_classifier.classify(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id', 'text'];

      natural_language_classifier.classify({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('classifyCollection', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const collection = 'fake_collection';
      const params = {
        classifier_id,
        collection,
      };

      // invoke method
      natural_language_classifier.classifyCollection(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers/{classifier_id}/classify_collection', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.body['collection']).toEqual(collection);
      expect(options.json).toEqual(true);
      expect(options.path['classifier_id']).toEqual(classifier_id);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier_id = 'fake_classifier_id';
      const collection = 'fake_collection';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier_id,
        collection,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      natural_language_classifier.classifyCollection(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      natural_language_classifier.classifyCollection(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id', 'collection'];

      natural_language_classifier.classifyCollection({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
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
      const metadata = 'fake_metadata';
      const training_data = 'fake_training_data';
      const metadata_filename = 'fake_metadata_filename';
      const training_data_filename = 'fake_training_data_filename';
      const params = {
        metadata,
        training_data,
        metadata_filename,
        training_data_filename,
      };

      // invoke method
      natural_language_classifier.createClassifier(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers', 'POST');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'multipart/form-data';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.formData['training_metadata'].data).toEqual(metadata);
      expect(options.formData['training_metadata'].filename).toEqual(metadata_filename);
      expect(options.formData['training_metadata'].contentType).toEqual('application/json');
      expect(options.formData['training_data'].data).toEqual(training_data);
      expect(options.formData['training_data'].filename).toEqual(training_data_filename);
      expect(options.formData['training_data'].contentType).toEqual('text/csv');
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const metadata = 'fake_metadata';
      const training_data = 'fake_training_data';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        metadata,
        training_data,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      natural_language_classifier.createClassifier(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      natural_language_classifier.createClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['metadata', 'training_data'];

      natural_language_classifier.createClassifier({}, err => {
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
      natural_language_classifier.deleteClassifier(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers/{classifier_id}', 'DELETE');
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

      natural_language_classifier.deleteClassifier(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      natural_language_classifier.deleteClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      natural_language_classifier.deleteClassifier({}, err => {
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
      natural_language_classifier.getClassifier(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers/{classifier_id}', 'GET');
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

      natural_language_classifier.getClassifier(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      natural_language_classifier.getClassifier(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      natural_language_classifier.getClassifier({}, err => {
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
      const params = {};

      // invoke method
      natural_language_classifier.listClassifiers(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers', 'GET');
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

      natural_language_classifier.listClassifiers(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      natural_language_classifier.listClassifiers();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      natural_language_classifier.listClassifiers(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});
