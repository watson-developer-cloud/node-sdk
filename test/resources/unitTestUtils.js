'use strict';

const missingParamsError = 1;
const missingParamsSuccess = 0;

module.exports.missingParamsError = missingParamsError;
module.exports.missingParamsSuccess = missingParamsSuccess;

module.exports.checkUrlAndMethod = function(options, url, method) {
  expect(options.url).toEqual(url);
  expect(options.method).toEqual(method);
};

module.exports.checkMediaHeaders = function(createRequestMock, accept, contentType) {
  const headers = createRequestMock.mock.calls[0][0].defaultOptions.headers;
  expect(headers.Accept).toEqual(accept);
  expect(headers['Content-Type']).toEqual(contentType);
};

module.exports.checkUserHeader = function(createRequestMock, baseName, param) {
  const headers = createRequestMock.mock.calls[0][0].defaultOptions.headers;
  expect(headers[baseName]).toEqual(param);
};

module.exports.checkDefaultSuccessArgs = function(createRequestMock) {
  // get arg to getMissingParams
  const userParams = createRequestMock.mock.calls[0];
  expect(typeof userParams[0]).toEqual('object');
};

module.exports.checkForEmptyObject = function(missingParamsMock) {
  // get arg to getMissingParams
  const userParams = missingParamsMock.mock.calls[0][0];

  // assert userParams is an object and is not null
  const emptyObject = {};
  expect(userParams).not.toBeNull();
  expect(userParams).toEqual(emptyObject);
};

module.exports.checkRequiredParamsHandling = function(required, err, mpMock, crMock) {
  // empty object should always be used as params
  const params = {};

  // assert getMissingParams was called and extract called arguments
  expect(mpMock).toHaveBeenCalledTimes(1);
  const userParams = mpMock.mock.calls[0][0];
  const validatorParams = mpMock.mock.calls[0][1];

  // assert getMissingParams is called with correct args
  expect(userParams).toEqual(params);
  expect(validatorParams).toEqual(required);

  // assert callback is called with missingParamsError
  expect(err).toEqual(missingParamsError);

  // assert createRequest is never called
  expect(crMock).toHaveBeenCalledTimes(0);
};

module.exports.getOptions = function(createRequestMock) {
  return createRequestMock.mock.calls[0][0].options;
};

module.exports.expectToBePromise = function(obj) {
  expect(typeof obj.then).toBe('function');
};
