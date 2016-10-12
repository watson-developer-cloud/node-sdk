'use strict';

var nock = require('nock');
var watson = require('../../index');
var assert = require('assert');
var authHelper = require('./auth_helper.js');
var auth = authHelper.auth;
var describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

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

  // disabling until https://github.ibm.com/watson-engagement-advisor/wea-backlog/issues/2388 is resolved
  it.skip('message()', function(done) {
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
});
