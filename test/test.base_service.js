// note: this has a lot of overlap with test.wrapper.js
// many/most of those tests should be moved here
var BaseService = require('../lib/base_service');
var assert = require('assert');

describe('BaseService', function() {
  it('should support token auth', function() {
    var instance = new BaseService({token: 'foo'});
    assert.equal(instance._options.headers['X-Watson-Authorization-Token'],'foo');
  });
});
