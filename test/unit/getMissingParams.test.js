'use strict';

const getMissingParams = require('../../lib/helper').getMissingParams;

describe('getMissingParams', function() {
  it('should return null when both params and requires are null', function() {
    expect(getMissingParams(null, null)).toBeNull();
  });

  it('should return null when both params and requires are undefined', function() {
    expect(getMissingParams(undefined, undefined)).toBeNull();
  });

  it('should return null when params is null and requires is undefined', function() {
    expect(getMissingParams(null, undefined)).toBeNull();
  });

  it('should return null if params is undefined and requires is null', function() {
    expect(getMissingParams(undefined, null)).toBeNull();
  });

  it('should return null if params is undefined and require is an empty list', function() {
    expect(getMissingParams(undefined, [])).toBeNull();
  });

  it('should return null if params is an empty object and require is null', function() {
    expect(getMissingParams({}, undefined)).toBeNull();
  });

  it('should return null if params is null and require is an empty list', function() {
    expect(getMissingParams(null, [])).toBeNull();
  });

  it('should return null if params is an empty object and require is null', function() {
    expect(getMissingParams({}, null)).toBeNull();
  });

  it('should return null if params is non-empty and require is null', function() {
    expect(getMissingParams(['a'], null)).toBeNull();
  });

  it('should return null if params is non-empty and require is undefined', function() {
    expect(getMissingParams({ a: 'a' }, undefined)).toBeNull();
  });

  it('should return null if params is non-empty and require is an empty list', function() {
    expect(getMissingParams({ a: 'a' }, [])).toBeNull();
  });

  it('should return null if no parameters are missing', function() {
    expect(getMissingParams({ a: 'a', b: 'b', c: 'c' }, ['b', 'c'])).toBeNull();
  });

  it('should throw an error if there are missing parameters', function() {
    expect(getMissingParams({ a: 'a' }, ['a', 'b']).message).toBe('Missing required parameters: b');
  });

  it('should throw an error if params is null and there are missing parameters', function() {
    expect(getMissingParams(null, ['a', 'b']).message).toBe('Missing required parameters: a, b');
  });

  it('should throw an error if params is undefined and there are missing parameters', function() {
    expect(getMissingParams(undefined, ['a', 'b']).message).toBe(
      'Missing required parameters: a, b'
    );
  });
});
