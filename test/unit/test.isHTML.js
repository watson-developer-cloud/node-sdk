'use strict';

const assert = require('assert');
const isHTML = require('../../lib/helper').isHTML;

describe('isHTML', function() {
  it('should return false on undefined', function() {
    assert.strictEqual(isHTML(undefined), false);
  });
  it('should return false on null', function() {
    assert.strictEqual(isHTML(null), false);
  });
  it('should return false on empty string', function() {
    assert.strictEqual(isHTML(''), false);
  });
  it('should return false on non-HTML string', function() {
    assert.strictEqual(isHTML('hello world!'), false);
  });
  it('should return true on string with valid HTML elements', function() {
    assert.strictEqual(isHTML('<title>foobar</title>'), true);
  });
  it('should return true on string with invalid HTML-like elements', function() {
    assert.strictEqual(isHTML('<foo></foo>'), true);
  });
});
