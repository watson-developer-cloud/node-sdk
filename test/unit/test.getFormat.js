'use strict';

const assert = require('assert');
const getFormat = require('../../lib/helper').getFormat;

describe('getFormat', function() {
  it('should return null if params is undefined', function() {
    assert.strictEqual(getFormat(undefined, []), null);
  });
  it('should return null if params is null', function() {
    assert.strictEqual(getFormat(null, []), null);
  });
  it('should return null if formats is undefined', function() {
    assert.strictEqual(getFormat({}, undefined), null);
  });
  it('should return null if formats is null', function() {
    assert.strictEqual(getFormat({}, null), null);
  });
  it('should return null if formats is the empty list', function() {
    assert.strictEqual(getFormat({ a: 1 }, []), null);
  });
  it('should return null if no format match is found', function() {
    assert.strictEqual(getFormat({}, ['a']), null);
  });
  it('should return the first match found', function() {
    assert.strictEqual(getFormat({ a: 1 }, ['a', 'b', 'c']), 'a');
  });
});
