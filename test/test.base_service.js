// note: this has a lot of overlap with test.wrapper.js
// many/most of those tests should be moved here
var BaseService = require('../lib/base_service');

describe('BaseService', function() {
  it('sould support token auth', function() {
    var instance = new BaseService({token: 'foo'});

  });
});
