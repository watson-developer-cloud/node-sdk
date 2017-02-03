'use strict';

const nock = require('nock');
const watson = require('../../index');
const assert = require('assert');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const assign = require('object.assign'); // for node v0.12 compatibility
const ConversationV1 = require('../../conversation/v1');

const TEN_SECONDS = 10000;
const TWO_SECONDS = 2000;

describe('conversation_integration', function() {
  this.timeout(TEN_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  this.retries(1);

  let conversation;

  before(function() {
    conversation = watson.conversation(auth.conversation);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  describe('message()', function() {
    it('alternate_intents', function(done) {
      const params = {
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
      const constructorParams = assign({}, auth.conversation, {
        version_date: ConversationV1.VERSION_DATE_2016_09_20
      });
      const conversation = watson.conversation(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights'
        },
        workspace_id: auth.conversation.workspace_id
      };

      conversation.message(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(result.context.system.dialog_stack, [{ dialog_node: 'root' }]);
        done();
      });
    });

    it('dialog_stack with 2016-07-11 version_date', function(done) {
      const constructorParams = assign({}, auth.conversation, {
        version_date: ConversationV1.VERSION_DATE_2016_07_11
      });
      const conversation = watson.conversation(constructorParams);

      const params = {
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
