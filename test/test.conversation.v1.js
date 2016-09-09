debugger
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
    version_date: '2016-07-11'
  };

  var service1 = {
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1',
    username: 'batman'
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
    var reqPayload1 = {output:'foo',alternate_intents:true,entities:'1entity',intents:'1intent',junk:'junk'};
    var reqPayload2 = {output:'foo',alternate_intents:true,entities:'1entity',intents:'1intent'};
    var params = extend({}, reqPayload, payload);
    var params1 = extend({}, reqPayload1, payload);
    
    it('should generate a valid payload', function() {
        var req = conversation.message(params,noop);
        var body = new Buffer(req.body).toString('ascii');
        assert.equal(req.uri.href, service.url + paths.message + '?version=' + service.version_date);
        assert.equal(req.method, 'POST');
        assert.deepEqual(JSON.parse(body), reqPayload);
      });
    
    it('should generate a valid payload but parse out the junk option', function() {
        var req = conversation.message(params1,noop);
        var body = new Buffer(req.body).toString('ascii');
        assert.equal(req.uri.href, service.url + paths.message + '?version=' + service.version_date);
        assert.equal(req.method, 'POST');
        assert.deepEqual(JSON.parse(body), reqPayload2);
      });
    
    it('should check no parameters provided (negative test)', function() {
      conversation.message({}, missingParameter);
      conversation.message(null, missingParameter);
      conversation.message(undefined, missingParameter);
      conversation.message(pick(params,['workspace_id']), missingParameter);
      conversation.message(pick(params,['input']), missingParameter);
    });
    
    it('should generate version_date was not specified (negative test)', function(done) {
      try {
        var conversation1 = watson.conversation(service1);
      }
      catch(err) {
        assert.equal(err.message, 'Argument error: version_date was not specified, use 2016-07-11'); 
      }
      done();
    });
  });

});
