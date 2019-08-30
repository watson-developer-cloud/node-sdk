'use strict';
const { IamTokenManager } = require('../../auth');

describe('iam token manager', () => {
  it('should correctly export the token manager from the core module', () => {
    const tokenManager = new IamTokenManager({ apikey: 'abc123' });
    expect(tokenManager).toBeDefined();
    expect(tokenManager.url).toBeDefined();
    expect(tokenManager.tokenInfo).toBeDefined();
    expect(tokenManager.getToken).toBeInstanceOf(Function);
  });
});
