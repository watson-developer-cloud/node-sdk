'use strict';

const assert = require('assert');
const sinon = require('sinon');
const IamTokenManagerV1 = require('../../iam-token-manager/v1').IamTokenManagerV1;

describe('iam_token_manager_v1', function() {
  it('should return an access token given by the user', function(done) {
    const userManagedToken = 'abcd-1234';
    const instance = new IamTokenManagerV1({ iamAccessToken: userManagedToken });
    const requestSpy = sinon.spy(instance, 'requestToken');
    const refreshSpy = sinon.spy(instance, 'refreshToken');

    instance.getToken(function(err, token) {
      assert.equal(token, userManagedToken);
      assert.equal(requestSpy.notCalled, true);
      assert.equal(refreshSpy.notCalled, true);
      done();
    });
  });

  it('should turn an iam apikey into an access token', function(done) {
    const instance = new IamTokenManagerV1({ iamApikey: 'abcd-1234' });
    const requestStub = sinon.stub(instance, 'requestToken');
    const refreshSpy = sinon.spy(instance, 'refreshToken');

    const accessToken = '9012';
    const iamResponse = {
      access_token: accessToken,
      refresh_token: '3456',
      token_type: 'Bearer',
      expires_in: 3600,
      expiration: Math.floor(Date.now() / 1000) + 3600,
    };
    requestStub.yields(null, iamResponse);

    instance.getToken(function(err, token) {
      assert.equal(token, accessToken);
      assert.equal(requestStub.calledOnce, true);
      assert.equal(refreshSpy.notCalled, true);
      done();
    });
  });

  it('should refresh an expired access token', function(done) {
    const instance = new IamTokenManagerV1({ iamApikey: 'abcd-1234' });
    const requestSpy = sinon.spy(instance, 'requestToken');
    const refreshStub = sinon.stub(instance, 'refreshToken');

    const currentTokenInfo = {
      access_token: '1234',
      refresh_token: '5678',
      token_type: 'Bearer',
      expires_in: 3600,
      expiration: Math.floor(Date.now() / 1000),
    };

    instance.tokenInfo = currentTokenInfo;

    const accessToken = '9012';
    const iamResponse = {
      access_token: accessToken,
      refresh_token: '3456',
      token_type: 'Bearer',
      expires_in: 3600,
      expiration: Math.floor(Date.now() / 1000) + 3600,
    };
    refreshStub.yields(null, iamResponse);

    instance.getToken(function(err, token) {
      assert.equal(token, accessToken);
      assert.equal(requestSpy.notCalled, true);
      assert.equal(refreshStub.calledOnce, true);
      done();
    });
  });

  it('should use a valid access token if one is stored', function(done) {
    const instance = new IamTokenManagerV1({ iamApikey: 'abcd-1234' });
    const requestSpy = sinon.spy(instance, 'requestToken');
    const refreshSpy = sinon.spy(instance, 'refreshToken');

    const accessToken = '1234';
    const currentTokenInfo = {
      access_token: accessToken,
      refresh_token: '5678',
      token_type: 'Bearer',
      expires_in: 3600,
      expiration: Math.floor(Date.now() / 1000) + 3000,
    };

    instance.tokenInfo = currentTokenInfo;

    instance.getToken(function(err, token) {
      assert.equal(token, accessToken);
      assert.equal(requestSpy.notCalled, true);
      assert.equal(refreshSpy.notCalled, true);
      done();
    });
  });

  it('should return a user-managed access token if one is set post-construction', function(done) {
    const instance = new IamTokenManagerV1({ iamApikey: 'abcd-1234' });
    const requestSpy = sinon.spy(instance, 'requestToken');
    const refreshSpy = sinon.spy(instance, 'refreshToken');

    const accessToken = '9012';
    const currentTokenInfo = {
      access_token: '1234',
      refresh_token: '5678',
      token_type: 'Bearer',
      expires_in: 3600,
      expiration: Math.floor(Date.now() / 1000) + 3000,
    };

    instance.tokenInfo = currentTokenInfo;
    instance.setAccessToken(accessToken);

    instance.getToken(function(err, token) {
      assert.equal(token, accessToken);
      assert.equal(requestSpy.notCalled, true);
      assert.equal(refreshSpy.notCalled, true);
      done();
    });
  });
});
