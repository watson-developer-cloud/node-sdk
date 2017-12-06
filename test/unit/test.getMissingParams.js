'use strict';

const assert = require('assert');
const getMissingParams = require('../../lib/helper').getMissingParams;

describe('getMissingParams', function() {
  it('should return null when both params and requires are null', function() {
    assert.strictEqual(getMissingParams(null, null), null);
  });
  it('should return null when both params and requires are undefined', function() {
    assert.strictEqual(getMissingParams(undefined, undefined), null);
  });
  it('should return null when params is null and requires is undefined', function() {
    assert.strictEqual(getMissingParams(null, undefined), null);
  });
  it('should return null if params is undefined and requires is null', function() {
    assert.strictEqual(getMissingParams(undefined, null), null);
  });
  it('should return null if params is undefined and require is the empty list', function() {
    assert.strictEqual(getMissingParams(undefined, []), null);
  });
  it('should return null if params is the empty object and require is null', function() {
    assert.strictEqual(getMissingParams({}, undefined), null);
  });
  it('should return null if params is null and require is the empty list', function() {
    assert.strictEqual(getMissingParams(null, []), null);
  });
  it('should return null if params is the empty object and require is null', function() {
    assert.strictEqual(getMissingParams({}, null), null);
  });
  it('should return null if params is non-empty and require is null', function() {
    assert.strictEqual(getMissingParams(['a'], null), null);
  });
  it('should return null if params is non-empty and require is undefined', function() {
    assert.strictEqual(getMissingParams({ a: 'a' }, undefined), null);
  });
  it('should return null if params is non-empty and require is the empty list', function() {
    assert.strictEqual(getMissingParams({ a: 'a' }, []), null);
  });
  it('should return null if no parameters are missing', function() {
    assert.strictEqual(getMissingParams({ a: 'a', b: 'b', c: 'c' }, ['b', 'c']), null);
  });
  it('should throw an error if there are missing parameters', function() {
    assert.strictEqual(
      getMissingParams({ a: 'a' }, ['a', 'b']).message,
      'Missing required parameters: b'
    );
  });
  it('should throw an error if params is null and there are missing parameters', function() {
    assert.strictEqual(
      getMissingParams(null, ['a', 'b']).message,
      'Missing required parameters: a, b'
    );
  });
  it('should throw an error if params is undefined and there are missing parameters', function() {
    assert.strictEqual(
      getMissingParams(undefined, ['a', 'b']).message,
      'Missing required parameters: a, b'
    );
  });
});
