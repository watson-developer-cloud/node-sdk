'use strict';

const formatError = require('../../lib/requestwrapper').formatError;

describe('formatError', () => {
  const basicAxiosError = {
    response: {
      config: 'large object',
      request: 'large object',
      statusText: 'Not Found',
      status: 404,
      data: {
        error: 'Model not found.',
        code: 404,
      },
      headers: {
        'content-type': 'application/json',
        'content-length': '65',
        'x-global-transaction-id': 'fhd7s8hfudj9ksoo0wpnd78a',
      },
    },
    request: {
      message: 'request was made but no response was received',
    },
    message: 'error in building the request',
  };

  it('should build an error from a basic error response', () => {
    const error = formatError(basicAxiosError);
    expect(error instanceof Error).toBe(true);
    expect(error.name).toBe('Not Found');
    expect(error.code).toBe(404);
    expect(error.message).toBe('Model not found.');
    expect(error.body).toBe('{"error":"Model not found.","code":404}');
    expect(error.headers).toEqual(basicAxiosError.response.headers);
  });

  it('check the unauthenticated thing - 401', () => {
    basicAxiosError.response.status = 401;
    const error = formatError(basicAxiosError);
    expect(error instanceof Error).toBe(true);
    expect(error.message).toBe('Access is denied due to invalid credentials.');
  });

  it('check the unauthenticated thing - 403', () => {
    basicAxiosError.response.status = 403;
    const error = formatError(basicAxiosError);
    expect(error instanceof Error).toBe(true);
    expect(error.message).toBe('Access is denied due to invalid credentials.');
  });

  it('check the unauthenticated thing - iam', () => {
    basicAxiosError.response.status = 400;
    basicAxiosError.response.data.context = {
      url: 'http://iam.bluemix.net',
    };
    const error = formatError(basicAxiosError);
    expect(error instanceof Error).toBe(true);
    expect(error.message).toBe('Access is denied due to invalid credentials.');

    // clean up
    delete basicAxiosError.response.data.context;
  });

  it('check what happens when there is no data.error', () => {
    delete basicAxiosError.response.data.error;
    const error = formatError(basicAxiosError);
    expect(error instanceof Error).toBe(true);
    expect(error.message).toBe('Not Found');
  });

  it('check error with circular ref in data', () => {
    const otherObject = {
      a: {
        b: 'c',
      },
    };
    basicAxiosError.response.data = {
      error: otherObject,
    };
    // create a circular reference
    basicAxiosError.response.data.error.a.newKey = otherObject;
    const error = formatError(basicAxiosError);
    expect(error instanceof Error).toBe(true);
    expect(typeof error.body).toBe('object');
    expect(error.message).toBe('Not Found');
  });

  it('check the request flow', () => {
    delete basicAxiosError.response;
    const error = formatError(basicAxiosError);
    expect(error instanceof Error).toBe(true);
    expect(error.message).toBe('Response not received. Body of error is HTTP ClientRequest object');
    expect(error.body).toEqual(basicAxiosError.request);
  });

  it('check the message flow', () => {
    delete basicAxiosError.request;
    const error = formatError(basicAxiosError);
    expect(error instanceof Error).toBe(true);
    expect(error.message).toBe('error in building the request');
  });
});
