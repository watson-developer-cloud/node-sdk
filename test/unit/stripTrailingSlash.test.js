'use strict';

const stripTrailingSlash = require('../../lib/helper').stripTrailingSlash;

describe('stripTrailingSlash', function() {
  test('should strip one slash from the end of url with a single trailing slash', function() {
    const url = 'https://ibmcloud.net';
    const urlWithSlash = `${url}/`;
    expect(stripTrailingSlash(urlWithSlash)).toEqual(url);
  });

  test('should not strip anything from a url without trailing slashes', function() {
    const url = 'https://ibmcloud.net';
    expect(stripTrailingSlash(url)).toEqual(url);
  });

  test('should return an empty string on empty string', function() {
    const url = '';
    expect(stripTrailingSlash(url)).toEqual(url);
  });
});
