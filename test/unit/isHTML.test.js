'use strict';

const isHTML = require('../../lib/helper').isHTML;

describe('isHTML', function() {
  it('should return false on undefined', function() {
    expect(isHTML(undefined)).toBe(false);
  });

  it('should return false on null', function() {
    expect(isHTML(null)).toBe(false);
  });

  it('should return false on empty string', function() {
    expect(isHTML('')).toBe(false);
  });

  it('should return false on non-HTML string', function() {
    expect(isHTML('hello world!')).toBe(false);
  });

  it('should return true on string with valid HTML elements', function() {
    expect(isHTML('<title>foobar</title>')).toBe(true);
  });

  it('should return true on string with invalid HTML-like elements', function() {
    expect(isHTML('<foo></foo>')).toBe(true);
  });
});
