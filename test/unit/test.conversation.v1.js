'use strict';

const assert = require('assert');
const watson = require('../../index');
const sinon = require('sinon');
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
    version: '2017-05-26',
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
      .post(paths.message + '?version=' + service.version)
      .reply(200, {});
  });

  after(function() {
    nock.cleanAll();
  });

  const missingParameter = function(err) {
    assert.ok(err instanceof Error && /required parameters/.test(err));
  };

  const conversation = new watson.ConversationV1(service);

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
      assert.equal(req.uri.href, service.url + paths.message + '?version=' + service.version);
      assert.equal(req.method, 'POST');
      assert.deepEqual(JSON.parse(body), reqPayload);
    });

    it('should generate a valid payload but parse out the junk option', function() {
      const req = conversation.message(params1, noop);
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + paths.message + '?version=' + service.version);
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
  });

  describe('createCounterexample()', function() {
    const reqPayload = { text: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.createCounterexample({}, missingParameter);
      conversation.createCounterexample(null, missingParameter);
      conversation.createCounterexample(undefined, missingParameter);
      conversation.createCounterexample(pick(params, ['workspace_id']), missingParameter);
      conversation.createCounterexample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.createCounterexample(params, noop);
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(
        req.uri.href,
        service.url + paths.counterexamples + '?version=' + service.version
      );
      assert.deepEqual(JSON.parse(body), pick(params, ['text']));
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteCounterexample()', function() {
    const reqPayload = { text: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.deleteCounterexample({}, missingParameter);
      conversation.deleteCounterexample(null, missingParameter);
      conversation.deleteCounterexample(undefined, missingParameter);
      conversation.deleteCounterexample(pick(params, ['workspace_id']), missingParameter);
      conversation.deleteCounterexample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.deleteCounterexample(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.counterexamples + '/' + reqPayload.text + '?version=' + service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getCounterexample()', function() {
    const reqPayload = { text: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.getCounterexample({}, missingParameter);
      conversation.getCounterexample(null, missingParameter);
      conversation.getCounterexample(undefined, missingParameter);
      conversation.getCounterexample(pick(params, ['workspace_id']), missingParameter);
      conversation.getCounterexample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getCounterexample(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.counterexamples + '/' + reqPayload.text + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listCounterexamples()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.listCounterexamples({}, missingParameter);
      conversation.listCounterexamples(null, missingParameter);
      conversation.listCounterexamples(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.listCounterexamples(payload, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.counterexamples + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateCounterexample()', function() {
    const reqPayload = { text: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.updateCounterexample({}, missingParameter);
      conversation.updateCounterexample(null, missingParameter);
      conversation.updateCounterexample(undefined, missingParameter);
      conversation.updateCounterexample(pick(params, ['workspace_id']), missingParameter);
      conversation.updateCounterexample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.updateCounterexample(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.counterexamples + '/' + reqPayload.text + '?version=' + service.version
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('createDialogNode()', function() {
    const reqPayload = { dialog_node: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.createDialogNode({}, missingParameter);
      conversation.createDialogNode(null, missingParameter);
      conversation.createDialogNode(undefined, missingParameter);
      conversation.createDialogNode(pick(params, ['workspace_id']), missingParameter);
      conversation.createDialogNode(pick(params, ['dialog_node']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.createDialogNode(params, noop);
      assert.equal(req.uri.href, service.url + paths.dialog_nodes + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteDialogNode()', function() {
    const reqPayload = { dialog_node: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.deleteDialogNode({}, missingParameter);
      conversation.deleteDialogNode(null, missingParameter);
      conversation.deleteDialogNode(undefined, missingParameter);
      conversation.deleteDialogNode(pick(params, ['workspace_id']), missingParameter);
      conversation.deleteDialogNode(pick(params, ['dialog_node']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.deleteDialogNode(params, noop);
      assert.equal(
        req.uri.href,
        service.url +
          paths.dialog_nodes +
          '/' +
          reqPayload.dialog_node +
          '?version=' +
          service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getDialogNode()', function() {
    const reqPayload = { dialog_node: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.getDialogNode({}, missingParameter);
      conversation.getDialogNode(null, missingParameter);
      conversation.getDialogNode(undefined, missingParameter);
      conversation.getDialogNode(pick(params, ['workspace_id']), missingParameter);
      conversation.getDialogNode(pick(params, ['dialog_node']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getDialogNode(params, noop);
      assert.equal(
        req.uri.href,
        service.url +
          paths.dialog_nodes +
          '/' +
          reqPayload.dialog_node +
          '?version=' +
          service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listDialogNodes()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.listDialogNodes({}, missingParameter);
      conversation.listDialogNodes(null, missingParameter);
      conversation.listDialogNodes(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.listDialogNodes(payload, noop);
      assert.equal(req.uri.href, service.url + paths.dialog_nodes + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateDialogNode()', function() {
    const reqPayload = { dialog_node: 'foo', new_dialog_node: 'foo2' };
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
          service.version
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('createEntity()', function() {
    const reqPayload = { entity: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.createEntity({}, missingParameter);
      conversation.createEntity(null, missingParameter);
      conversation.createEntity(undefined, missingParameter);
      conversation.createEntity(pick(params, ['workspace_id']), missingParameter);
      conversation.createEntity(pick(params, ['entity']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.createEntity(params, noop);
      assert.equal(req.uri.href, service.url + paths.entities + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteEntity()', function() {
    const reqPayload = { entity: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.deleteEntity({}, missingParameter);
      conversation.deleteEntity(null, missingParameter);
      conversation.deleteEntity(undefined, missingParameter);
      conversation.deleteEntity(pick(params, ['workspace_id']), missingParameter);
      conversation.deleteEntity(pick(params, ['entity']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.deleteEntity(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.entities + '/' + reqPayload.entity + '?version=' + service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getEntity()', function() {
    const reqPayload = { entity: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.getEntity({}, missingParameter);
      conversation.getEntity(null, missingParameter);
      conversation.getEntity(undefined, missingParameter);
      conversation.getEntity(pick(params, ['workspace_id']), missingParameter);
      conversation.getEntity(pick(params, ['entity']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getEntity(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.entities + '/' + reqPayload.entity + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listEntities()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.listEntities({}, missingParameter);
      conversation.listEntities(null, missingParameter);
      conversation.listEntities(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.listEntities(payload, noop);
      assert.equal(req.uri.href, service.url + paths.entities + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateEntity()', function() {
    const reqPayload = { entity: 'foo' };
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
        service.url + paths.entities + '/' + reqPayload.entity + '?version=' + service.version
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('createExample()', function() {
    const reqPayload = { text: 'text', intent: payload2.intent };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.createExample({}, missingParameter);
      conversation.createExample(null, missingParameter);
      conversation.createExample(undefined, missingParameter);
      conversation.createExample(pick(params, ['workspace_id']), missingParameter);
      conversation.createExample(pick(params, ['text']), missingParameter);
      conversation.createExample(pick(params, ['intent']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.createExample(params, noop);
      assert.equal(req.uri.href, service.url + paths.examples + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteExample()', function() {
    const reqPayload = { text: 'text', intent: payload2.intent };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.deleteExample({}, missingParameter);
      conversation.deleteExample(null, missingParameter);
      conversation.deleteExample(undefined, missingParameter);
      conversation.deleteExample(pick(params, ['workspace_id']), missingParameter);
      conversation.deleteExample(pick(params, ['text']), missingParameter);
      conversation.deleteExample(pick(params, ['intent']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.deleteExample(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.examples + '/' + reqPayload.text + '?version=' + service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getExample()', function() {
    const reqPayload = { text: 'text', intent: payload2.intent };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.getExample({}, missingParameter);
      conversation.getExample(null, missingParameter);
      conversation.getExample(undefined, missingParameter);
      conversation.getExample(pick(params, ['workspace_id']), missingParameter);
      conversation.getExample(pick(params, ['text']), missingParameter);
      conversation.getExample(pick(params, ['intent']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getExample(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.examples + '/' + reqPayload.text + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listExamples()', function() {
    const reqPayload = { intent: payload2.intent };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.listExamples({}, missingParameter);
      conversation.listExamples(null, missingParameter);
      conversation.listExamples(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.listExamples(params, noop);
      assert.equal(req.uri.href, service.url + paths.examples + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateExample()', function() {
    const reqPayload = { text: 'text', intent: payload2.intent };
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
        service.url + paths.examples + '/' + reqPayload.text + '?version=' + service.version
      );
      assert.equal(req.method, 'POST');
    });
  });

  const intentPayload = { intent: 'intent1' };
  const intentParams = extend({}, intentPayload, payload);

  describe('createIntent()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.createIntent({}, missingParameter);
      conversation.createIntent(null, missingParameter);
      conversation.createIntent(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.createIntent(intentParams, noop);
      assert.equal(req.uri.href, service.url + paths.intents + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteIntent()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.deleteIntent({}, missingParameter);
      conversation.deleteIntent(null, missingParameter);
      conversation.deleteIntent(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.deleteIntent(intentParams, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.intents + '/' + intentParams.intent + '?version=' + service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getIntent()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.getIntent({}, missingParameter);
      conversation.getIntent(null, missingParameter);
      conversation.getIntent(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getIntent(intentParams, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.intents + '/' + intentParams.intent + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listIntents()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.listIntents({}, missingParameter);
      conversation.listIntents(null, missingParameter);
      conversation.listIntents(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.listIntents(payload, noop);
      assert.equal(req.uri.href, service.url + paths.intents + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

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
        service.url + paths.intents + '/' + intentParams.intent + '?version=' + service.version
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('listAllLogs()', function() {
    const param = { filter: 'test' };
    it('should check no parameters provided (negative test)', function() {
      conversation.listAllLogs({}, missingParameter);
      conversation.listAllLogs(null, missingParameter);
      conversation.listAllLogs(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.listAllLogs(param, noop);
      assert.equal(
        req.uri.href,
        service.url + '/v1/logs' + '?version=' + service.version + '&filter=' + param.filter
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listLogs()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.listLogs({}, missingParameter);
      conversation.listLogs(null, missingParameter);
      conversation.listLogs(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.listLogs(payload, noop);
      assert.equal(req.uri.href, service.url + paths.logs + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  const synPayload = {
    entity: payload2.entity,
    value: payload2.value,
    synonym: 'syn',
  };
  const synParams = extend({}, synPayload, payload);

  describe('createSynonym()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.createSynonym({}, missingParameter);
      conversation.createSynonym(null, missingParameter);
      conversation.createSynonym(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.createSynonym(synParams, noop);
      assert.equal(req.uri.href, service.url + paths.synonyms + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteSynonym()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.deleteSynonym({}, missingParameter);
      conversation.deleteSynonym(null, missingParameter);
      conversation.deleteSynonym(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.deleteSynonym(synParams, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.synonyms + '/' + synParams.synonym + '?version=' + service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getSynonym()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.getSynonym({}, missingParameter);
      conversation.getSynonym(null, missingParameter);
      conversation.getSynonym(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getSynonym(synParams, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.synonyms + '/' + synParams.synonym + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listSynonyms()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.listSynonyms({}, missingParameter);
      conversation.listSynonyms(null, missingParameter);
      conversation.listSynonyms(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.listSynonyms(omit(synParams, ['synonym']), noop);
      assert.equal(req.uri.href, service.url + paths.synonyms + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateSynonym()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.updateSynonym({}, missingParameter);
      conversation.updateSynonym(null, missingParameter);
      conversation.updateSynonym(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.updateSynonym(synParams, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.synonyms + '/' + synParams.synonym + '?version=' + service.version
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('createValue()', function() {
    const reqPayload = { entity: payload2.entity, value: 'val' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.createValue({}, missingParameter);
      conversation.createValue(null, missingParameter);
      conversation.createValue(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.createValue(params, noop);
      assert.equal(req.uri.href, service.url + paths.values + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteValue()', function() {
    const reqPayload = { entity: payload2.entity, value: 'val' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.deleteValue({}, missingParameter);
      conversation.deleteValue(null, missingParameter);
      conversation.deleteValue(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.deleteValue(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.values + '/' + reqPayload.value + '?version=' + service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getValue()', function() {
    const reqPayload = { entity: payload2.entity, value: 'val' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.getValue({}, missingParameter);
      conversation.getValue(null, missingParameter);
      conversation.getValue(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getValue(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.values + '/' + reqPayload.value + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listValues()', function() {
    const reqPayload = { entity: payload2.entity };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      conversation.listValues({}, missingParameter);
      conversation.listValues(null, missingParameter);
      conversation.listValues(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.listValues(params, noop);
      assert.equal(req.uri.href, service.url + paths.values + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateValue()', function() {
    const reqPayload = { entity: payload2.entity, value: 'val' };
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
        service.url + paths.values + '/' + reqPayload.value + '?version=' + service.version
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('createWorkspace()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.createWorkspace({}, missingParameter);
      conversation.createWorkspace(null, missingParameter);
      conversation.createWorkspace(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.createWorkspace({}, noop);
      assert.equal(req.uri.href, service.url + paths.workspaces + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteWorkspace()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.deleteWorkspace({}, missingParameter);
      conversation.deleteWorkspace(null, missingParameter);
      conversation.deleteWorkspace(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.deleteWorkspace(payload, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.workspaces + '/' + payload.workspace_id + '?version=' + service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getWorkspace()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.getWorkspace({}, missingParameter);
      conversation.getWorkspace(null, missingParameter);
      conversation.getWorkspace(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.getWorkspace(payload, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.workspaces + '/' + payload.workspace_id + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('workspaceStatus()', function() {
    it('should issue a console warning for deprecated method', function() {
      const spy = sinon.stub(console, 'warn');
      conversation.workspaceStatus({}, noop);
      assert(spy.calledOnce);
      spy.restore();
    });
  });

  describe('listWorkspaces()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.listWorkspaces({}, missingParameter);
      conversation.listWorkspaces(null, missingParameter);
      conversation.listWorkspaces(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.listWorkspaces({}, noop);
      assert.equal(req.uri.href, service.url + paths.workspaces + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateWorkspace()', function() {
    it('should check no parameters provided (negative test)', function() {
      conversation.updateWorkspace({}, missingParameter);
      conversation.updateWorkspace(null, missingParameter);
      conversation.updateWorkspace(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = conversation.updateWorkspace(payload, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.workspaces + '/' + payload.workspace_id + '?version=' + service.version
      );
      assert.equal(req.method, 'POST');
    });
  });
});
