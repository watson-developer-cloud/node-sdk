'use strict';

const assert = require('assert');
const stripTrailingSlash = require('../../lib/helper').stripTrailingSlash;

describe('stripTrailingSlash', function() {
  it('should strip one slash from the end of url with a single trailing slash', function() {
    const url = 'https://ibmcloud.net/';
    assert.strictEqual(stripTrailingSlash(url), 'https://ibmcloud.net');
  });
  it('should not strip anything from a url without trailing slashes', function() {
    const url = 'https://ibmcloud.net';
    assert.strictEqual(stripTrailingSlash(url), url);
  });
  it('should return an empty string on empty string', function() {
    const url = '';
    assert.strictEqual(stripTrailingSlash(url), url);
  });
});
