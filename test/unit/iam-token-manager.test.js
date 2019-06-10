'use strict';
const TokenManagerV1 = require('../../iam-token-manager/v1');

describe('iam token manager', () => {
  it('should correctly export the token manager from the core module', () => {
    const tokenManager = new TokenManagerV1({});
    expect(tokenManager).toBeDefined();
    expect(tokenManager.url).toBeDefined();
    expect(tokenManager.tokenInfo).toBeDefined();
    expect(tokenManager.getToken).toBeInstanceOf(Function);
    expect(tokenManager.setAccessToken).toBeInstanceOf(Function);
  });
});
