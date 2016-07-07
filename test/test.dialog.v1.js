'use strict';

var assert  = require('assert');
var extend  = require('extend');
var pick    = require('object.pick');
var omit    = require('object.omit');
var watson  = require('../index');
var nock    = require('nock');
var qs      = require('querystring');
var fs      = require('fs');

describe('dialog', function() {

  var noop = function() {};

  // Test params
  var service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1'
  };

  var payload = {
    dialog_id: 'dialog1',
    client_id: 'client1'
  };

  var paths = {
    profile : '/v1/dialogs/' + payload.dialog_id + '/profile',
    conversation : '/v1/dialogs/' + payload.dialog_id + '/conversation',
    content : '/v1/dialogs/' + payload.dialog_id + '/content',
    dialog : '/v1/dialogs/' + payload.dialog_id
  };

  before(function() {
    nock.disableNetConnect();
    nock(service.url)
      .persist()
      .post(paths.profile, qs.stringify({client_id:payload.client_id}))
      .reply(200, {})
      .get(paths.profile, qs.stringify({client_id:payload.client_id}))
      .reply(200, {});
  });

  after(function() {
    nock.cleanAll();
  });

  var dialog = watson.dialog(service);

  var missingParameter = function(err) {
    assert.ok((err instanceof Error) && /required parameters/.test(err));
  };

  describe('getProfile()', function() {

    it('should check no parameters provided', function() {
      dialog.getProfile({}, missingParameter);
      dialog.getProfile(null, missingParameter);
      dialog.getProfile(undefined, missingParameter);
      dialog.getProfile(pick(payload,['dialog_id']), missingParameter);
      dialog.getProfile(pick(payload,['client_id']), missingParameter);
    });

    it('should generate a valid payload', function() {
      var clientQuery = qs.stringify(pick(payload,['client_id']));
      var req = dialog.getProfile(payload, noop);
      assert.equal(req.uri.href, service.url + paths.profile + '?' + clientQuery);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateProfile()', function() {
    var params = extend({name_values: 'foo'}, payload);

    it('should check no parameters provided', function() {
      dialog.updateProfile({}, missingParameter);
      dialog.updateProfile(null, missingParameter);
      dialog.updateProfile(undefined, missingParameter);
      dialog.updateProfile(pick(params,['dialog_id']), missingParameter);
      dialog.updateProfile(pick(params,['client_id']), missingParameter);
      dialog.updateProfile(omit(params,['name_values']), missingParameter);
    });

    it('should generate a valid payload', function() {

      var req = dialog.updateProfile(params, noop);
      assert.equal(req.uri.href, service.url + paths.profile);
      assert.equal(req.method, 'PUT');
    });
  });

  describe('getConversation()', function() {
    var params = extend({date_from:'foo', date_to:'bar'}, payload);

    it('should check no parameters provided', function() {
      dialog.getConversation({}, missingParameter);
      dialog.getConversation(null, missingParameter);
      dialog.getConversation(undefined, missingParameter);
      dialog.getConversation(pick(params,['dialog_id']), missingParameter);
      dialog.getConversation(omit(params,['dialog_id']), missingParameter);
    });

    it('should generate a valid payload', function() {
      var conversationPath = paths.conversation + '?' + qs.stringify(omit(params,['dialog_id']));
      var req = dialog.getConversation(params, noop);
      assert.equal(req.uri.href, service.url + conversationPath);
      assert.equal(req.method, 'GET');
    });
  });

  describe('conversation()', function() {
    var params = extend({input:'foo', conversation_id:'bar'}, payload);

    it('should check no parameters provided', function() {
      dialog.conversation({}, missingParameter);
      dialog.conversation(null, missingParameter);
      dialog.conversation(undefined, missingParameter);
      dialog.conversation(pick(params,['dialog_id']), missingParameter);
      dialog.conversation(omit(params,['dialog_id']), missingParameter);
    });

    it('should generate a valid payload', function() {
      var req = dialog.conversation(params, noop);
      var body = new Buffer(req.body).toString('ascii');

      assert.equal(req.uri.href, service.url + paths.conversation);
      assert.equal(req.method, 'POST');
      assert.equal(body, qs.stringify(omit(params,'dialog_id')));
    });
  });

  describe('updateContent()', function() {
    var params = extend({ headers: {'Content-Type': 'bar'}},payload);

    it('should check no parameters provided', function() {
      dialog.updateContent({}, missingParameter);
      dialog.updateContent(null, missingParameter);
      dialog.updateContent(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      var req = dialog.updateContent(params, noop);
      assert.equal(req.uri.href, service.url + paths.content);
      assert.equal(req.method, 'PUT');
      assert.equal(req.headers['Content-Type'], 'bar');
    });
  });

  describe('getContent()', function() {
    it('should check no parameters provided', function() {
      dialog.getContent({}, missingParameter);
      dialog.getContent(null, missingParameter);
      dialog.getContent(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      var req = dialog.getContent(payload, noop);
      assert.equal(req.uri.href, service.url + paths.content);
      assert.equal(req.method, 'GET');
    });
  });

  describe('createDialog()', function() {
    var params = {
      file: fs.createReadStream(__dirname + '/resources/pizza.xml'),
      name: 'foo'
    };

    it('should check no parameters provided', function() {
      dialog.createDialog({}, missingParameter);
      dialog.createDialog(null, missingParameter);
      dialog.createDialog(undefined, missingParameter);
      dialog.createDialog(pick(params,['file']), missingParameter);
      dialog.createDialog(pick(params,['name']), missingParameter);

    });

    it('should generate a valid payload', function() {
      var req = dialog.createDialog(params, noop);
      assert.equal(req.uri.href, service.url + '/v1/dialogs');
      assert.equal(req.method, 'POST');
      assert.equal(req.formData.name, params.name);
      assert.equal(req.formData.file, params.file);
    });
  });

  describe('getDialogs()', function() {
    it('should generate a valid payload', function() {
      var req = dialog.getDialogs({}, noop);
      assert.equal(req.uri.href, service.url + '/v1/dialogs');
      assert.equal(req.method, 'GET');
    });
  });

  describe('deleteDialog()', function() {
    it('should check no parameters provided', function() {
      dialog.deleteDialog({}, missingParameter);
      dialog.deleteDialog(null, missingParameter);
      dialog.deleteDialog(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      var req = dialog.deleteDialog(pick(payload,['dialog_id']), noop);
      assert.equal(req.uri.href, service.url + paths.dialog);
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('updateDialog()', function() {
    var params = {
      file: fs.createReadStream(__dirname + '/resources/pizza.xml'),
      dialog_id: payload.dialog_id
    };

    it('should check no parameters provided', function() {
      dialog.updateDialog({}, missingParameter);
      dialog.updateDialog(null, missingParameter);
      dialog.updateDialog(undefined, missingParameter);
      dialog.updateDialog(pick(params,['file']), missingParameter);
      dialog.updateDialog(pick(params,['dialog_id']), missingParameter);

    });

    it('should generate a valid payload', function() {
      var req = dialog.updateDialog(params, noop);
      assert.equal(req.uri.href, service.url + paths.dialog);
      assert.equal(req.method, 'PUT');
      assert.equal(req.formData.file, params.file);
    });
  });

});
