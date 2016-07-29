'use strict';

var assert = require('assert');
var watson = require('../index');
var nock   = require('nock');
var extend = require('extend');
var pick   = require('object.pick');

describe('conversation-v1', function() {

  var noop = function() {};

  // Test params
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1',
    version_date: '2016-05-19'
  };

  var payload = {
    workspace_id: 'workspace1'
  };

  var paths = {
    message : '/v1/workspaces/' + payload.workspace_id + '/message'
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(paths.message + '?version=' + service.version_date)
      .reply(200, {});
  });

  after(function() {
    nock.cleanAll();
  });

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  var conversation = watson.conversation(service);

  describe('conversation()', function() {
    var reqPayload = {input:'foo',context:'rab'};
    var params = extend({}, reqPayload, payload);

    it('should check no parameters provided', function() {
      conversation.message({}, missingParameter);
      conversation.message(null, missingParameter);
      conversation.message(undefined, missingParameter);
      conversation.message(pick(params,['workspace_id']), missingParameter);
    });

    it('should generate a valid payload', function(done) {
      var req = conversation.message(params,noop);
      var body = new Buffer(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + paths.message + '?version=' + service.version_date);
      assert.equal(req.method, 'POST');
      assert.deepEqual(JSON.parse(body), reqPayload);
      done();
    });
  });

});
