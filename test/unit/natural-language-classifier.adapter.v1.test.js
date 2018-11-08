'use strict';

const NaturalLanguageClassifierV1 = require('../../natural-language-classifier/v1');
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
      const classifier = 'fake_classifier';
      const text = 'fake_text';
      const params = {
        classifier,
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
      expect(options.path['classifier_id']).toEqual(classifier);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier = 'fake_classifier';
      const text = 'fake_text';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier,
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
describe('remove', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier = 'fake_classifier';
      const params = {
        classifier,
      };

      // invoke method
      natural_language_classifier.remove(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers/{classifier_id}', 'DELETE');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['classifier_id']).toEqual(classifier);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier = 'fake_classifier';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      natural_language_classifier.remove(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      natural_language_classifier.remove(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      natural_language_classifier.remove({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('status', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const classifier = 'fake_classifer';
      const params = {
        classifier,
      };

      // invoke method
      natural_language_classifier.status(params);

      // assert that create request was called
      expect(createRequestMock).toHaveBeenCalledTimes(1);

      const options = getOptions(createRequestMock);

      checkUrlAndMethod(options, '/v1/classifiers/{classifier_id}', 'GET');
      checkCallback(createRequestMock);
      const expectedAccept = 'application/json';
      const expectedContentType = 'application/json';
      checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      expect(options.path['classifier_id']).toEqual(classifier);
    });

    test('should prioritize user-given headers', () => {
      // parameters
      const classifier = 'fake_classifer';
      const accept = 'fake/header';
      const contentType = 'fake/header';
      const params = {
        classifier,
        headers: {
          Accept: accept,
          'Content-Type': contentType,
        },
      };

      natural_language_classifier.status(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
  });
  describe('negative tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsError);
    });

    test('should convert a `null` value for `params` to an empty object', done => {
      natural_language_classifier.status(null, () => {
        checkForEmptyObject(missingParamsMock);
        done();
      });
    });

    test('should enforce required parameters', done => {
      // required parameters for this method
      const requiredParams = ['classifier_id'];

      natural_language_classifier.status({}, err => {
        checkRequiredParamsHandling(requiredParams, err, missingParamsMock, createRequestMock);
        done();
      });
    });
  });
});
describe('list', () => {
  describe('positive tests', () => {
    beforeAll(() => {
      missingParamsMock.mockReturnValue(missingParamsSuccess);
    });
    test('should pass the right params to createRequest', () => {
      // parameters
      const params = {};

      // invoke method
      natural_language_classifier.list(params);

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

      natural_language_classifier.list(params);
      checkMediaHeaders(createRequestMock, accept, contentType);
    });
    test('should not have any problems when no parameters are passed in', () => {
      // invoke the method
      natural_language_classifier.list();
      checkDefaultSuccessArgs(createRequestMock);
    });

    test('should use argument as callback function if only one is passed in', () => {
      // invoke the method
      natural_language_classifier.list(noop);
      checkDefaultSuccessArgs(createRequestMock);
    });
  });
});
