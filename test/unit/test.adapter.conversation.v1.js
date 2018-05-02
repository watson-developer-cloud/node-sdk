'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const extend = require('extend');
const pick = require('object.pick');
const omit = require('object.omit');

describe('conversation-v1', function() {
  const noop = function() {};

  // Test params
  const service = {
    username: 'batman',
    password: 'bruce-wayne',
    url: 'http://ibm.com:80',
    version: 'v1',
    version_date: '2017-05-26',
  };

  const payload = {
    workspace_id: 'workspace1',
  };

  const payload2 = {
    intent: 'intent1',
    text: 'text',
    entity: 'entity1',
    value: 'value1',
  };

  const paths = {
    message: '/v1/workspaces/' + payload.workspace_id + '/message',
    counterexamples: '/v1/workspaces/' + payload.workspace_id + '/counterexamples',
    dialog_nodes: '/v1/workspaces/' + payload.workspace_id + '/dialog_nodes',
    entities: '/v1/workspaces/' + payload.workspace_id + '/entities',
    examples:
      '/v1/workspaces/' + payload.workspace_id + '/intents/' + payload2.intent + '/examples',
    intents: '/v1/workspaces/' + payload.workspace_id + '/intents',
    logs: '/v1/workspaces/' + payload.workspace_id + '/logs',
    values: '/v1/workspaces/' + payload.workspace_id + '/entities/' + payload2.entity + '/values',
    synonyms:
      '/v1/workspaces/' +
      payload.workspace_id +
      '/entities/' +
      payload2.entity +
      '/values/' +
      payload2.value +
      '/synonyms',
    workspaces: '/v1/workspaces',
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

  describe('message()', function() {
    const reqPayload = { input: 'foo', context: 'rab' };
    const reqPayload1 = {
      output: 'foo',
      alternate_intents: true,
      entities: '1entity',
      intents: '1intent',
      junk: 'junk',
    };
    const reqPayload2 = {
      output: 'foo',
      alternate_intents: true,
      entities: '1entity',
      intents: '1intent',
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
    });
  });

  describe('getIntents()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.getIntents({}, missingParameter);
      conversation.getIntents(null, missingParameter);
      conversation.getIntents(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getIntents(payload, noop);
      assert.equal(req.uri.href, service.url + paths.intents + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });
  });

  describe('getEntities()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.getEntities({}, missingParameter);
      conversation.getEntities(null, missingParameter);
      conversation.getEntities(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getEntities(payload, noop);
      assert.equal(req.uri.href, service.url + paths.entities + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });
  });

  describe('getValues()', function() {
    const reqPayload = { entity: payload2.entity };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.getValues({}, missingParameter);
      conversation.getValues(null, missingParameter);
      conversation.getValues(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getValues(params, noop);
      assert.equal(req.uri.href, service.url + paths.values + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });
  });

  const synPayload = {
    entity: payload2.entity,
    value: payload2.value,
    synonym: 'syn',
  };
  const synParams = extend({}, synPayload, payload);

  describe('updateSynonym()', function() {
    const synParams2 = extend({}, { old_synonym: 'old_syn' }, synParams);

    it('should check no parameters provided (negative test)', function() {
      conversation.updateSynonym({}, missingParameter);
      conversation.updateSynonym(null, missingParameter);
      conversation.updateSynonym(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.updateSynonym(synParams2, noop);
      assert.equal(
        req.uri.href,
        service.url +
          paths.synonyms +
          '/' +
          synParams2.old_synonym +
          '?version=' +
          service.version_date
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('getSynonyms()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.getSynonyms({}, missingParameter);
      conversation.getSynonyms(null, missingParameter);
      conversation.getSynonyms(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getSynonyms(omit(synParams, ['synonym']), noop);
      assert.equal(req.uri.href, service.url + paths.synonyms + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });
  });

  describe('getDialogNodes()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.getDialogNodes({}, missingParameter);
      conversation.getDialogNodes(null, missingParameter);
      conversation.getDialogNodes(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getDialogNodes(payload, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.dialog_nodes + '?version=' + service.version_date
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('getLogs()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.getLogs({}, missingParameter);
      conversation.getLogs(null, missingParameter);
      conversation.getLogs(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getLogs(payload, noop);
      assert.equal(req.uri.href, service.url + paths.logs + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });
  });

  const intentPayload = { intent: 'intent1', old_intent: 'old1' };
  const intentParams = extend({}, intentPayload, payload);

  describe('updateIntent()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.updateIntent({}, missingParameter);
      conversation.updateIntent(null, missingParameter);
      conversation.updateIntent(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.updateIntent(intentParams, noop);
      assert.equal(
        req.uri.href,
        service.url +
          paths.intents +
          '/' +
          intentParams.old_intent +
          '?version=' +
          service.version_date
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('getExamples()', function() {
    const reqPayload = { intent: payload2.intent };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.getExamples({}, missingParameter);
      conversation.getExamples(null, missingParameter);
      conversation.getExamples(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getExamples(params, noop);
      assert.equal(req.uri.href, service.url + paths.examples + '?version=' + service.version_date);
      assert.equal(req.method, 'GET');
    });
  });

  describe('getCounterExamples()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.getCounterExamples({}, missingParameter);
      conversation.getCounterExamples(null, missingParameter);
      conversation.getCounterExamples(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getCounterExamples(payload, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.counterexamples + '?version=' + service.version_date
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('createCounterExample()', function() {
    const reqPayload = { text: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.createCounterExample({}, missingParameter);
      conversation.createCounterExample(null, missingParameter);
      conversation.createCounterExample(undefined, missingParameter);
      conversation.createCounterExample(pick(params, ['workspace_id']), missingParameter);
      conversation.createCounterExample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.createCounterExample(params, noop);
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(
        req.uri.href,
        service.url + paths.counterexamples + '?version=' + service.version_date
      );
      assert.deepEqual(JSON.parse(body), pick(params, ['text']));
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteCounterExample()', function() {
    const reqPayload = { text: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.deleteCounterExample({}, missingParameter);
      conversation.deleteCounterExample(null, missingParameter);
      conversation.deleteCounterExample(undefined, missingParameter);
      conversation.deleteCounterExample(pick(params, ['workspace_id']), missingParameter);
      conversation.deleteCounterExample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.deleteCounterexample(params, noop);
      assert.equal(
        req.uri.href,
        service.url +
          paths.counterexamples +
          '/' +
          reqPayload.text +
          '?version=' +
          service.version_date
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getCounterExample()', function() {
    const reqPayload = { text: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.getCounterExample({}, missingParameter);
      conversation.getCounterExample(null, missingParameter);
      conversation.getCounterExample(undefined, missingParameter);
      conversation.getCounterExample(pick(params, ['workspace_id']), missingParameter);
      conversation.getCounterExample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getCounterExample(params, noop);
      assert.equal(
        req.uri.href,
        service.url +
          paths.counterexamples +
          '/' +
          reqPayload.text +
          '?version=' +
          service.version_date
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateCounterExample()', function() {
    const reqPayload = { text: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.updateCounterExample({}, missingParameter);
      conversation.updateCounterExample(null, missingParameter);
      conversation.updateCounterExample(undefined, missingParameter);
      conversation.updateCounterExample(pick(params, ['workspace_id']), missingParameter);
      conversation.updateCounterExample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.updateCounterExample(params, noop);
      assert.equal(
        req.uri.href,
        service.url +
          paths.counterexamples +
          '/' +
          reqPayload.text +
          '?version=' +
          service.version_date
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('updateEntity()', function() {
    const reqPayload = { entity: 'foo', old_entity: 'foo_old' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.updateEntity({}, missingParameter);
      conversation.updateEntity(null, missingParameter);
      conversation.updateEntity(undefined, missingParameter);
      conversation.updateEntity(pick(params, ['workspace_id']), missingParameter);
      conversation.updateEntity(pick(params, ['entity']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.updateEntity(params, noop);
      assert.equal(
        req.uri.href,
        service.url +
          paths.entities +
          '/' +
          reqPayload.old_entity +
          '?version=' +
          service.version_date
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('updateValue()', function() {
    const reqPayload = {
      entity: payload2.entity,
      value: 'val',
      old_value: 'val_old',
    };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.updateValue({}, missingParameter);
      conversation.updateValue(null, missingParameter);
      conversation.updateValue(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.updateValue(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.values + '/' + reqPayload.old_value + '?version=' + service.version_date
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('updateExample()', function() {
    const reqPayload = {
      text: 'text',
      old_text: 'oldtext',
      intent: payload2.intent,
    };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.updateExample({}, missingParameter);
      conversation.updateExample(null, missingParameter);
      conversation.updateExample(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.updateExample(params, noop);
      assert.equal(
        req.uri.href,
        service.url +
          paths.examples +
          '/' +
          reqPayload.old_text +
          '?version=' +
          service.version_date
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('updateDialogNode()', function() {
    const reqPayload = {
      dialog_node: 'foo',
      new_dialog_node: 'foo_new',
      old_dialog_node: 'foo_old',
    };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.updateDialogNode({}, missingParameter);
      conversation.updateDialogNode(null, missingParameter);
      conversation.updateDialogNode(undefined, missingParameter);
      conversation.updateDialogNode(pick(params, ['workspace_id']), missingParameter);
      conversation.updateDialogNode(pick(params, ['dialog_node']), missingParameter);
      conversation.updateDialogNode(pick(params, ['new_dialog_node']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.updateDialogNode(params, noop);
      assert.equal(
        req.uri.href,
        service.url +
          paths.dialog_nodes +
          '/' +
          reqPayload.dialog_node +
          '?version=' +
          service.version_date
      );
      assert.equal(req.method, 'POST');
    });
  });
});
