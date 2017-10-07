'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const extend = require('extend');
const pick = require('object.pick');

describe('conversation-v1', function() {
  const noop = function() {};

  // Test params
  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1',
    version_date: '2017-05-26'
  };

  const service1 = {
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1',
    username: 'batman'
  };

  const payload = {
    workspace_id: 'workspace1'
  };

  const paths = {
    message: '/v1/workspaces/' + payload.workspace_id + '/message'
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

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  const conversation = watson.conversation(service);

  describe('conversation()', function() {
    const reqPayload = { input: 'foo', context: 'rab' };
    const reqPayload1 = {
      output: 'foo',
      alternate_intents: true,
      entities: '1entity',
      intents: '1intent',
      junk: 'junk'
    };
    const reqPayload2 = {
      output: 'foo',
      alternate_intents: true,
      entities: '1entity',
      intents: '1intent'
    };
    const params = extend({}, reqPayload, payload);
    const params1 = extend({}, reqPayload1, payload);

    it('should generate a valid payload', function() {
      const req = conversation.message(params, noop);
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + paths.message + '?version=' + service.version_date);
      assert.equal(req.method, 'POST');
      assert.deepEqual(JSON.parse(body), reqPayload);
    });

    it('should generate a valid payload but parse out the junk option', function() {
      const req = conversation.message(params1, noop);
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + paths.message + '?version=' + service.version_date);
      assert.equal(req.method, 'POST');
      assert.deepEqual(JSON.parse(body), reqPayload2);
    });

    it('should check no parameters provided (negative test)', function() {
      conversation.message({}, missingParameter);
      conversation.message(null, missingParameter);
      conversation.message(undefined, missingParameter);
      conversation.message(pick(params, ['workspace_id']), missingParameter);
      conversation.message(pick(params, ['input']), missingParameter);
    });

    it('should generate version_date was not specified (negative test)', function() {
      let threw = false;
      try {
        watson.conversation(service1);
      } catch (err) {
        threw = true;
        assert.equal(err.message, 'Argument error: version_date was not specified, use ConversationV1.VERSION_DATE_2017_05_26');
      }
      assert(threw, 'should throw an error');
    });
  });
});
