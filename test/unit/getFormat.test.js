'use strict';

const getFormat = require('../../lib/helper').getFormat;

describe('getFormat', function() {
  test('should return null if params is undefined', function() {
    expect(getFormat(undefined, [])).toBeNull();
  });

  test('should return null if params is null', function() {
    expect(getFormat(null, [])).toBeNull();
  });

  test('should return null if formats is undefined', function() {
    expect(getFormat({}, undefined)).toBeNull();
  });

  test('should return null if formats is null', function() {
    expect(getFormat({}, null)).toBeNull();
  });

  test('should return null if formats is the empty list', function() {
    expect(getFormat({ a: 1 }, [])).toBeNull();
  });

  test('should return null if no format match is found', function() {
    expect(getFormat({}, ['a'])).toBeNull();
  });

  test('should return the first match found', function() {
    expect(getFormat({ a: 1 }, ['a', 'b', 'c'])).toEqual('a');
  });

  test('should return the first match found even if other formats match', function() {
    expect(getFormat({ c: 3, b: 2, a: 1 }, ['a', 'b', 'c'])).toEqual('a');
  });
});
