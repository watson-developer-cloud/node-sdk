'use strict';

const assert = require('assert');
const watson = require('../../index');
const nock = require('nock');
const extend = require('extend');
const pick = require('object.pick');
const omit = require('object.omit');

describe('assistant-v1', function() {
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

  const assistant = new watson.AssistantV1(service);

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
      const req = assistant.message(params, noop);
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + paths.message + '?version=' + service.version);
      assert.equal(req.method, 'POST');
      assert.deepEqual(JSON.parse(body), reqPayload);
    });

    it('should generate a valid payload but parse out the junk option', function() {
      const req = assistant.message(params1, noop);
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(req.uri.href, service.url + paths.message + '?version=' + service.version);
      assert.equal(req.method, 'POST');
      assert.deepEqual(JSON.parse(body), reqPayload2);
    });

    it('should check no parameters provided (negative test)', function() {
      assistant.message({}, missingParameter);
      assistant.message(null, missingParameter);
      assistant.message(undefined, missingParameter);
    });
  });

  describe('createCounterexample()', function() {
    const reqPayload = { text: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      assistant.createCounterexample({}, missingParameter);
      assistant.createCounterexample(null, missingParameter);
      assistant.createCounterexample(undefined, missingParameter);
      assistant.createCounterexample(pick(params, ['workspace_id']), missingParameter);
      assistant.createCounterexample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.createCounterexample(params, noop);
      const body = Buffer.from(req.body).toString('ascii');
      assert.equal(
        req.uri.href,
        service.url + paths.counterexamples + '?version=' + service.version
      );
      assert.deepEqual(JSON.parse(body), pick(params, ['text']));
      assert.equal(req.method, 'POST');
    });

    it('should generate a valid payload with detailed response', function() {
      const paramsWithHeaders = extend({}, params, { headers: { customheader: 'custom' } });
      assistant.createCounterexample(paramsWithHeaders, function(err, result, request) {
        const body = Buffer.from(result.body).toString('ascii');
        assert.equal(
          result.uri.href,
          service.url + paths.counterexamples + '?version=' + service.version
        );
        assert.deepEqual(JSON.parse(body), pick(params, ['text']));
        assert.equal(result.method, 'POST');
        return;
      });
    });
  });

  describe('deleteCounterexample()', function() {
    const reqPayload = { text: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      assistant.deleteCounterexample({}, missingParameter);
      assistant.deleteCounterexample(null, missingParameter);
      assistant.deleteCounterexample(undefined, missingParameter);
      assistant.deleteCounterexample(pick(params, ['workspace_id']), missingParameter);
      assistant.deleteCounterexample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.deleteCounterexample(params, noop);
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
      assistant.getCounterexample({}, missingParameter);
      assistant.getCounterexample(null, missingParameter);
      assistant.getCounterexample(undefined, missingParameter);
      assistant.getCounterexample(pick(params, ['workspace_id']), missingParameter);
      assistant.getCounterexample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.getCounterexample(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.counterexamples + '/' + reqPayload.text + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listCounterexamples()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.listCounterexamples({}, missingParameter);
      assistant.listCounterexamples(null, missingParameter);
      assistant.listCounterexamples(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.listCounterexamples(payload, noop);
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
      assistant.updateCounterexample({}, missingParameter);
      assistant.updateCounterexample(null, missingParameter);
      assistant.updateCounterexample(undefined, missingParameter);
      assistant.updateCounterexample(pick(params, ['workspace_id']), missingParameter);
      assistant.updateCounterexample(pick(params, ['text']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.updateCounterexample(params, noop);
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
      assistant.createDialogNode({}, missingParameter);
      assistant.createDialogNode(null, missingParameter);
      assistant.createDialogNode(undefined, missingParameter);
      assistant.createDialogNode(pick(params, ['workspace_id']), missingParameter);
      assistant.createDialogNode(pick(params, ['dialog_node']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.createDialogNode(params, noop);
      assert.equal(req.uri.href, service.url + paths.dialog_nodes + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteDialogNode()', function() {
    const reqPayload = { dialog_node: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      assistant.deleteDialogNode({}, missingParameter);
      assistant.deleteDialogNode(null, missingParameter);
      assistant.deleteDialogNode(undefined, missingParameter);
      assistant.deleteDialogNode(pick(params, ['workspace_id']), missingParameter);
      assistant.deleteDialogNode(pick(params, ['dialog_node']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.deleteDialogNode(params, noop);
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
      assistant.getDialogNode({}, missingParameter);
      assistant.getDialogNode(null, missingParameter);
      assistant.getDialogNode(undefined, missingParameter);
      assistant.getDialogNode(pick(params, ['workspace_id']), missingParameter);
      assistant.getDialogNode(pick(params, ['dialog_node']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.getDialogNode(params, noop);
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
      assistant.listDialogNodes({}, missingParameter);
      assistant.listDialogNodes(null, missingParameter);
      assistant.listDialogNodes(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.listDialogNodes(payload, noop);
      assert.equal(req.uri.href, service.url + paths.dialog_nodes + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateDialogNode()', function() {
    const reqPayload = { dialog_node: 'foo', new_dialog_node: 'foo2' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      assistant.updateDialogNode({}, missingParameter);
      assistant.updateDialogNode(null, missingParameter);
      assistant.updateDialogNode(undefined, missingParameter);
      assistant.updateDialogNode(pick(params, ['workspace_id']), missingParameter);
      assistant.updateDialogNode(pick(params, ['dialog_node']), missingParameter);
      assistant.updateDialogNode(pick(params, ['new_dialog_node']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.updateDialogNode(params, noop);
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
      assistant.createEntity({}, missingParameter);
      assistant.createEntity(null, missingParameter);
      assistant.createEntity(undefined, missingParameter);
      assistant.createEntity(pick(params, ['workspace_id']), missingParameter);
      assistant.createEntity(pick(params, ['entity']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.createEntity(params, noop);
      assert.equal(req.uri.href, service.url + paths.entities + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteEntity()', function() {
    const reqPayload = { entity: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      assistant.deleteEntity({}, missingParameter);
      assistant.deleteEntity(null, missingParameter);
      assistant.deleteEntity(undefined, missingParameter);
      assistant.deleteEntity(pick(params, ['workspace_id']), missingParameter);
      assistant.deleteEntity(pick(params, ['entity']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.deleteEntity(params, noop);
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
      assistant.getEntity({}, missingParameter);
      assistant.getEntity(null, missingParameter);
      assistant.getEntity(undefined, missingParameter);
      assistant.getEntity(pick(params, ['workspace_id']), missingParameter);
      assistant.getEntity(pick(params, ['entity']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.getEntity(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.entities + '/' + reqPayload.entity + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listEntities()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.listEntities({}, missingParameter);
      assistant.listEntities(null, missingParameter);
      assistant.listEntities(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.listEntities(payload, noop);
      assert.equal(req.uri.href, service.url + paths.entities + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateEntity()', function() {
    const reqPayload = { entity: 'foo' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      assistant.updateEntity({}, missingParameter);
      assistant.updateEntity(null, missingParameter);
      assistant.updateEntity(undefined, missingParameter);
      assistant.updateEntity(pick(params, ['workspace_id']), missingParameter);
      assistant.updateEntity(pick(params, ['entity']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.updateEntity(params, noop);
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
      assistant.createExample({}, missingParameter);
      assistant.createExample(null, missingParameter);
      assistant.createExample(undefined, missingParameter);
      assistant.createExample(pick(params, ['workspace_id']), missingParameter);
      assistant.createExample(pick(params, ['text']), missingParameter);
      assistant.createExample(pick(params, ['intent']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.createExample(params, noop);
      assert.equal(req.uri.href, service.url + paths.examples + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteExample()', function() {
    const reqPayload = { text: 'text', intent: payload2.intent };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      assistant.deleteExample({}, missingParameter);
      assistant.deleteExample(null, missingParameter);
      assistant.deleteExample(undefined, missingParameter);
      assistant.deleteExample(pick(params, ['workspace_id']), missingParameter);
      assistant.deleteExample(pick(params, ['text']), missingParameter);
      assistant.deleteExample(pick(params, ['intent']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.deleteExample(params, noop);
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
      assistant.getExample({}, missingParameter);
      assistant.getExample(null, missingParameter);
      assistant.getExample(undefined, missingParameter);
      assistant.getExample(pick(params, ['workspace_id']), missingParameter);
      assistant.getExample(pick(params, ['text']), missingParameter);
      assistant.getExample(pick(params, ['intent']), missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.getExample(params, noop);
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
      assistant.listExamples({}, missingParameter);
      assistant.listExamples(null, missingParameter);
      assistant.listExamples(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.listExamples(params, noop);
      assert.equal(req.uri.href, service.url + paths.examples + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateExample()', function() {
    const reqPayload = { text: 'text', intent: payload2.intent };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      assistant.updateExample({}, missingParameter);
      assistant.updateExample(null, missingParameter);
      assistant.updateExample(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.updateExample(params, noop);
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
      assistant.createIntent({}, missingParameter);
      assistant.createIntent(null, missingParameter);
      assistant.createIntent(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.createIntent(intentParams, noop);
      assert.equal(req.uri.href, service.url + paths.intents + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteIntent()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.deleteIntent({}, missingParameter);
      assistant.deleteIntent(null, missingParameter);
      assistant.deleteIntent(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.deleteIntent(intentParams, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.intents + '/' + intentParams.intent + '?version=' + service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getIntent()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.getIntent({}, missingParameter);
      assistant.getIntent(null, missingParameter);
      assistant.getIntent(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.getIntent(intentParams, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.intents + '/' + intentParams.intent + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listIntents()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.listIntents({}, missingParameter);
      assistant.listIntents(null, missingParameter);
      assistant.listIntents(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.listIntents(payload, noop);
      assert.equal(req.uri.href, service.url + paths.intents + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateIntent()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.updateIntent({}, missingParameter);
      assistant.updateIntent(null, missingParameter);
      assistant.updateIntent(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.updateIntent(intentParams, noop);
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
      assistant.listAllLogs({}, missingParameter);
      assistant.listAllLogs(null, missingParameter);
      assistant.listAllLogs(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.listAllLogs(param, noop);
      assert.equal(
        req.uri.href,
        service.url + '/v1/logs' + '?version=' + service.version + '&filter=' + param.filter
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listLogs()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.listLogs({}, missingParameter);
      assistant.listLogs(null, missingParameter);
      assistant.listLogs(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.listLogs(payload, noop);
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
      assistant.createSynonym({}, missingParameter);
      assistant.createSynonym(null, missingParameter);
      assistant.createSynonym(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.createSynonym(synParams, noop);
      assert.equal(req.uri.href, service.url + paths.synonyms + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteSynonym()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.deleteSynonym({}, missingParameter);
      assistant.deleteSynonym(null, missingParameter);
      assistant.deleteSynonym(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.deleteSynonym(synParams, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.synonyms + '/' + synParams.synonym + '?version=' + service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getSynonym()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.getSynonym({}, missingParameter);
      assistant.getSynonym(null, missingParameter);
      assistant.getSynonym(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.getSynonym(synParams, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.synonyms + '/' + synParams.synonym + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listSynonyms()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.listSynonyms({}, missingParameter);
      assistant.listSynonyms(null, missingParameter);
      assistant.listSynonyms(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.listSynonyms(omit(synParams, ['synonym']), noop);
      assert.equal(req.uri.href, service.url + paths.synonyms + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateSynonym()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.updateSynonym({}, missingParameter);
      assistant.updateSynonym(null, missingParameter);
      assistant.updateSynonym(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.updateSynonym(synParams, noop);
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
      assistant.createValue({}, missingParameter);
      assistant.createValue(null, missingParameter);
      assistant.createValue(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.createValue(params, noop);
      assert.equal(req.uri.href, service.url + paths.values + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteValue()', function() {
    const reqPayload = { entity: payload2.entity, value: 'val' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      assistant.deleteValue({}, missingParameter);
      assistant.deleteValue(null, missingParameter);
      assistant.deleteValue(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.deleteValue(params, noop);
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
      assistant.getValue({}, missingParameter);
      assistant.getValue(null, missingParameter);
      assistant.getValue(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.getValue(params, noop);
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
      assistant.listValues({}, missingParameter);
      assistant.listValues(null, missingParameter);
      assistant.listValues(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.listValues(params, noop);
      assert.equal(req.uri.href, service.url + paths.values + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateValue()', function() {
    const reqPayload = { entity: payload2.entity, value: 'val' };
    const params = extend({}, reqPayload, payload);

    it('should check no parameters provided (negative test)', function() {
      assistant.updateValue({}, missingParameter);
      assistant.updateValue(null, missingParameter);
      assistant.updateValue(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.updateValue(params, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.values + '/' + reqPayload.value + '?version=' + service.version
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('createWorkspace()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.createWorkspace({}, missingParameter);
      assistant.createWorkspace(null, missingParameter);
      assistant.createWorkspace(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.createWorkspace({}, noop);
      assert.equal(req.uri.href, service.url + paths.workspaces + '?version=' + service.version);
      assert.equal(req.method, 'POST');
    });
  });

  describe('deleteWorkspace()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.deleteWorkspace({}, missingParameter);
      assistant.deleteWorkspace(null, missingParameter);
      assistant.deleteWorkspace(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.deleteWorkspace(payload, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.workspaces + '/' + payload.workspace_id + '?version=' + service.version
      );
      assert.equal(req.method, 'DELETE');
    });
  });

  describe('getWorkspace()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.getWorkspace({}, missingParameter);
      assistant.getWorkspace(null, missingParameter);
      assistant.getWorkspace(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.getWorkspace(payload, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.workspaces + '/' + payload.workspace_id + '?version=' + service.version
      );
      assert.equal(req.method, 'GET');
    });
  });

  describe('listWorkspaces()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.listWorkspaces({}, missingParameter);
      assistant.listWorkspaces(null, missingParameter);
      assistant.listWorkspaces(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.listWorkspaces({}, noop);
      assert.equal(req.uri.href, service.url + paths.workspaces + '?version=' + service.version);
      assert.equal(req.method, 'GET');
    });
  });

  describe('updateWorkspace()', function() {
    it('should check no parameters provided (negative test)', function() {
      assistant.updateWorkspace({}, missingParameter);
      assistant.updateWorkspace(null, missingParameter);
      assistant.updateWorkspace(undefined, missingParameter);
    });

    it('should generate a valid payload', function() {
      const req = assistant.updateWorkspace(payload, noop);
      assert.equal(
        req.uri.href,
        service.url + paths.workspaces + '/' + payload.workspace_id + '?version=' + service.version
      );
      assert.equal(req.method, 'POST');
    });
  });

  describe('credentials()', function() {
    it('should load its credentials from bluemix (conversation)', function() {
      process.env.VCAP_SERVICES = JSON.stringify({
        conversation: [
          {
            credentials: {
              url: 'https://gateway.watsonplatform.net/assistant/api',
              username: 'hyphenated-user',
              password: 'hpyhenated-pass',
            },
          },
        ],
      });
      const assistant = new watson.AssistantV1({
        version: '2018-02-16',
      });
      assert(assistant);
      assert.equal(assistant.getCredentials().username, 'hyphenated-user');
    });

    it('should load its credentials from environment (conversation)', function() {
      process.env.CONVERSATION_USERNAME = 'user';
      process.env.CONVERSATION_PASSWORD = 'password';
      process.env.CONVERSATION_URL = 'https://gateway.watsonplatform.net/assistant/api';
      const assistant = new watson.AssistantV1({
        version: '2018-02-16',
      });
      assert(assistant);
      assert.equal(assistant.getCredentials().username, 'user');
    });

    it('should load its credentials from environment (assistant)', function() {
      process.env.ASSISTANT_USERNAME = 'user';
      process.env.ASSISTANT_PASSWORD = 'password';
      process.env.ASSISTANT_URL = 'https://gateway.watsonplatform.net/assistant/api';
      const assistant = new watson.AssistantV1({
        version: '2018-02-16',
      });
      assert(assistant);
      assert.equal(assistant.getCredentials().username, 'user');
    });
  });
});
