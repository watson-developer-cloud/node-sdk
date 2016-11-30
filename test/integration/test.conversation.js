'use strict';

var nock = require('nock');
var watson = require('../../index');
var assert = require('assert');
var authHelper = require('./auth_helper.js');
var auth = authHelper.auth;
var describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
var ConversationV1 = require('../../conversation/v1');

var TEN_SECONDS = 10000;
var TWO_SECONDS = 2000;


describe('conversation_integration', function() {
  this.timeout(TEN_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  var conversation;

  before(function() {
    conversation = watson.conversation(auth.conversation);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  describe('message()', function() {
    it('alternate_intents', function(done) {
      var params = {
        input: {
          text: 'Turn on the lights'
        },
        alternate_intents: true,
        workspace_id: auth.conversation.workspace_id
      };

      conversation.message(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.alternate_intents, true);
        done();
      });
    });

    it('dialog_stack with 2016-09-20 version_date', function(done) {
      var constructorParams = Object.assign({}, auth.conversation, {version_date: ConversationV1.VERSION_DATE_2016_09_20});
      var conversation = watson.conversation(constructorParams);

      var params = {
        input: {
          text: 'Turn on the lights'
        },
        workspace_id: auth.conversation.workspace_id
      };

      conversation.message(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(result.context.system.dialog_stack, [{dialog_node: 'root'}]);
        done();
      });
    });

    it('dialog_stack with 2016-07-11 version_date', function(done) {
      var constructorParams = Object.assign({}, auth.conversation, {version_date: ConversationV1.VERSION_DATE_2016_07_11});
      var conversation = watson.conversation(constructorParams);

      var params = {
        input: {
          text: 'Turn on the lights'
        },
        workspace_id: auth.conversation.workspace_id
      };

      conversation.message(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(result.context.system.dialog_stack, ['root']);
        done();
      });
    });
  });

});
