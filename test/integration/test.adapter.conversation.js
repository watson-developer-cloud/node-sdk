'use strict';

const nock = require('nock');
const watson = require('../../index');
const assert = require('assert');
const authHelper = require('./auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const assign = require('object.assign'); // for node v0.12 compatibility

const extend = require('extend');

const TEN_SECONDS = 10000;
const TWO_SECONDS = 2000;

const workspace = {
  name: 'integration test',
  language: 'fr',
  entities: [
    {
      entity: 'hello',
      values: [
        {
          value: 'hola',
          synonyms: ['yo', 'yoo'],
        },
      ],
    },
  ],
};

const intents = {
  language: 'en',
  intents: [
    {
      intent: 'test',
      examples: [
        {
          text: 'I test',
        },
      ],
    },
  ],
};

const test_intents = [
  {
    intent: 'intent_1',
    examples: [
      {
        text: 'Hi, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~',
      },
    ],
  },
];
const test_intents_update = {
  intent: 'intent_2',
  description: 'description_2',
  examples: [
    {
      text: 'Hey, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~',
    },
  ],
};
const test_examples_new = 'Oh, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~';
const counterExampleText = 'Hey, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~';
const counterExampleText_new = 'Oh, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~';
const test_entities = [
  {
    entity: 'entity_1',
    values: [
      {
        value: 'value_1',
        synonyms: ['syn_1'],
      },
    ],
  },
];
const test_entities_update = {
  entity: 'entity_2',
  values: [
    {
      value: 'v1',
      synonyms: ['s1'],
    },
  ],
};
const test_value = {
  value: 'value_1',
  synonyms: ['syn_1'],
};
const test_value_update = {
  value: 'value_2',
  synonyms: ['syn_2'],
};
const test_synonym = 'synonym_1';
const test_synonym_update = 'synonym_2';
const test_dialog_node = 'new_node';
const test_dialog_node_update = 'updated_node';

// changing language is forbidden starting with VERSION_DATE_2017_05_26
const workspace1 = extend(true, {}, workspace, intents, { language: workspace.language });

describe('conversation_adapter_integration', function() {
  this.timeout(TEN_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  // this.retries(1);

  let conversation;

  before(function() {
    const constructorParams = assign({}, auth.conversation, {
      version: 'v1',
      version_date: '2018-02-16',
    });
    conversation = watson.conversation(constructorParams);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  describe('message()', function() {
    it('alternate_intents', function(done) {
      const params = {
        input: {
          text: 'Turn on the lights',
        },
        alternate_intents: true,
        workspace_id: auth.conversation.workspace_id,
      };

      conversation.message(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert(result.intents.length > 1);
        done();
      });
    });

    it('dialog_stack with 2017-02-03 version_date', function(done) {
      const constructorParams = assign({}, auth.conversation, {
        version: 'v1',
        version_date: '2017-02-03',
      });
      const conversation = watson.conversation(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspace_id: auth.conversation.workspace_id,
      };

      conversation.message(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(result.context.system.dialog_stack, [{ dialog_node: 'root' }]);
        done();
      });
    });

    it('dialog_stack with 2016-09-20 version_date', function(done) {
      const constructorParams = assign({}, auth.conversation, {
        version: 'v1',
        version_date: '2016-09-20',
      });
      const conversation = watson.conversation(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspace_id: auth.conversation.workspace_id,
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
        version: 'v1',
        version_date: '2016-07-11',
      });
      const conversation = watson.conversation(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspace_id: auth.conversation.workspace_id,
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

  describe('listWorkspaces()', function() {
    it('result should contain workspaces key', function(done) {
      conversation.listWorkspaces(function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.hasOwnProperty('workspaces'), true);
        done();
      });
    });

    it('result should contain an array of workspaces', function(done) {
      conversation.listWorkspaces(function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(Object.prototype.toString.call(result.workspaces), '[object Array]');
        done();
      });
    });

    it('result should return pagination information', function(done) {
      const params = {
        page_limit: 2,
        include_count: true,
        sort: '-name',
      };
      conversation.listWorkspaces(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.hasOwnProperty('pagination'), true);
        done();
      });
    });
  });

  describe('createWorkspace()', function() {
    it('should create a new workspace', function(done) {
      const params = workspace;

      conversation.createWorkspace(params, function(err, result) {
        if (err) {
          return done(err);
        }
        workspace1.workspace_id = result.workspace_id;
        assert.equal(result.name, params.name);
        assert.equal(result.language, 'fr');
        assert.equal(result.metadata, params.metadata);
        assert.equal(result.description, params.description);
        done();
      });
    });
  });

  describe('updateWorkspace()', function() {
    it('should update the workspace with intents', function(done) {
      const params = workspace1;

      conversation.updateWorkspace(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.name, params.name);
        assert.equal(result.language, 'fr');
        assert.equal(result.metadata, params.metadata);
        assert.equal(result.description, params.description);
        done();
      });
    });
  });

  describe('getWorkspace()', function() {
    it('should get the workspace with the right intent', function(done) {
      const params = {
        export: true,
        workspace_id: workspace1.workspace_id,
      };

      conversation.getWorkspace(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.intents[0].intent, 'test');
        done();
      });
    });
  });

  describe('createIntent()', function() {
    it('should create an intent', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents[0].intent,
        examples: test_intents[0].examples,
      };

      conversation.createIntent(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.intent, test_intents[0].intent);
        assert.equal(result.description, null);
        done();
      });
    });
  });

  describe('getIntents()', function() {
    it('should get intents of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        export: true,
      };

      conversation.getIntents(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.intents[0].intent, test_intents[0].intent);
        assert.equal(result.intents[0].examples[0].text, test_intents[0].examples[0].text);
        done();
      });
    });

    it('should have pagination information', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        export: true,
        page_limit: 1,
        include_count: true,
        sort: 'intent',
      };

      conversation.getIntents(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.hasOwnProperty('pagination'), true);
        done();
      });
    });
  });

  describe('getIntent()', function() {
    it('should get an intent of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents[0].intent,
      };

      conversation.getIntent(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.intent, test_intents[0].intent);
        assert.equal(result.description, null);
        done();
      });
    });
  });

  describe('updateIntent()', function() {
    it('should update an intent of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        old_intent: test_intents[0].intent,
        intent: test_intents_update.intent,
        description: test_intents_update.description,
        examples: test_intents_update.examples,
      };

      conversation.updateIntent(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.intent, test_intents_update.intent);
        done();
      });
    });
  });

  describe('getExamples()', function() {
    it('should get all examples of intent', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
      };

      conversation.getExamples(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.examples[0].text, test_intents_update.examples[0].text);
        done();
      });
    });

    it('should have pagination information', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
        page_limit: 2,
        include_count: true,
        sort: '-text',
      };

      conversation.getExamples(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.hasOwnProperty('pagination'), true);
        done();
      });
    });
  });

  describe('createExample()', function() {
    it('should create an example in the intent', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
        text: 'new_example',
      };

      conversation.createExample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.text, 'new_example');
        done();
      });
    });
  });

  describe('getExample()', function() {
    it('should get an example of intent', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
        text: test_intents_update.examples[0].text,
      };

      conversation.getExample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.text, test_intents_update.examples[0].text);
        done();
      });
    });
  });

  describe('updateExample()', function() {
    it('should update an example of intent', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
        old_text: test_intents_update.examples[0].text,
        text: test_examples_new,
      };

      conversation.updateExample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.text, test_examples_new);
        done();
      });
    });
  });

  describe('deleteExample()', function() {
    it('should delete an example of intent', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
        text: test_examples_new,
      };

      conversation.deleteExample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('deleteIntent()', function() {
    it('should delete an intent of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
      };

      conversation.deleteIntent(params, function(err, result) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('createCounterExample()', function() {
    it('should return the newly created counterExample of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterExampleText,
      };

      conversation.createCounterExample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.text, counterExampleText);
        done();
      });
    });
  });

  describe('getCounterExample()', function() {
    it('should return a counterExample', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterExampleText,
      };

      conversation.getCounterExample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.text, counterExampleText);
        done();
      });
    });
  });

  describe('getCounterExamples()', function() {
    it('should return counterExamples of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
      };

      conversation.getCounterExamples(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.counterexamples[0].text, counterExampleText);
        done();
      });
    });
    it('should return counterExamples of the workspace with pagination', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        page_limit: 1,
        include_count: true,
        sort: 'text',
      };

      conversation.getCounterExamples(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.counterexamples[0].text, counterExampleText);
        assert.equal(result.hasOwnProperty('pagination'), true);
        done();
      });
    });
  });

  describe('updateCounterExample()', function() {
    it('should return an updated counterExample', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        old_text: counterExampleText,
        text: counterExampleText_new,
      };

      conversation.updateCounterExample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.text, counterExampleText_new);
        done();
      });
    });
  });

  describe('deleteCounterExample()', function() {
    it('should delete a counterExample', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterExampleText_new,
      };

      conversation.deleteCounterExample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('createEntity()', function() {
    it('should create an entity', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities[0].entity,
        values: test_entities[0].values,
        fuzzy_match: true,
      };

      conversation.createEntity(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.entity, test_entities[0].entity);
        assert.equal(result.description, null);
        done();
      });
    });
  });

  describe('getEntities()', function() {
    it('should get entities of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        export: true,
      };

      conversation.getEntities(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.entities[0].entity, test_entities[0].entity);
        assert.equal(result.entities[0].values[0].value, test_entities[0].values[0].value);
        done();
      });
    });

    it('should have pagination information', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        export: true,
        page_limit: 1,
        include_count: true,
        sort: 'entity',
      };

      conversation.getEntities(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.hasOwnProperty('pagination'), true);
        done();
      });
    });
  });

  describe('getEntity()', function() {
    it('should get an entity of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities[0].entity,
      };

      conversation.getEntity(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.entity, test_entities[0].entity);
        assert.equal(result.description, null);
        assert.equal(result.fuzzy_match, true);
        done();
      });
    });
  });

  describe('updateEntity()', function() {
    it('should update an entity of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        old_entity: test_entities[0].entity,
        entity: test_entities_update.entity,
        values: test_entities_update.values,
        fuzzy_match: false,
      };

      conversation.updateEntity(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.entity, test_entities_update.entity);
        done();
      });
    });
  });

  describe('createValue()', function() {
    it('should create a value', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value.value,
        synonyms: test_value.synonyms,
      };

      conversation.createValue(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.value, test_value.value);
        assert.equal(result.description, null);
        done();
      });
    });
  });

  describe('getValues()', function() {
    it('should get values of the entity', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        export: true,
      };

      conversation.getValues(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.values[1].value, test_value.value);
        assert.equal(result.values[1].synonyms[0], test_value.synonyms[0]);
        done();
      });
    });

    it('should have pagination information', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        export: true,
        page_limit: 1,
        include_count: true,
        sort: 'value',
      };

      conversation.getValues(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.hasOwnProperty('pagination'), true);
        done();
      });
    });
  });

  describe('getValue()', function() {
    it('should get a value of the entity', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value.value,
      };

      conversation.getValue(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.value, test_value.value);
        assert.equal(result.description, null);
        done();
      });
    });
  });

  describe('updateValue()', function() {
    it('should update a value of the entity', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        old_value: test_value.value,
        value: test_value_update.value,
        synonyms: test_value_update.synonyms,
      };

      conversation.updateValue(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.value, test_value_update.value);
        done();
      });
    });
  });

  describe('createSynonym()', function() {
    it('should create a synonym', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        synonym: test_synonym,
      };

      conversation.createSynonym(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.synonym, test_synonym);
        done();
      });
    });
  });

  describe('getSynonyms()', function() {
    it('should get synonyms of the value', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        export: true,
      };

      conversation.getSynonyms(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.synonyms[1].synonym, test_synonym);
        done();
      });
    });

    it('should have pagination information', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        export: true,
        page_limit: 1,
        include_count: true,
      };

      conversation.getSynonyms(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.hasOwnProperty('pagination'), true);
        done();
      });
    });
  });

  describe('getSynonym()', function() {
    it('should get a synonym of the value', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        synonym: test_synonym,
      };

      conversation.getSynonym(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.synonym, test_synonym);
        done();
      });
    });
  });

  describe('updateSynonym()', function() {
    it('should update a synonym of the value', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        old_synonym: test_synonym,
        synonym: test_synonym_update,
      };

      conversation.updateSynonym(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.synonym, test_synonym_update);
        done();
      });
    });
  });

  describe('getLogs()', function() {
    it('should return logs', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        export: true,
        page_limit: 1,
      };

      conversation.getLogs(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.hasOwnProperty('logs'), true);
        done();
      });
    });
  });

  describe('deleteSynonym()', function() {
    it('should delete a synonym of the value', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        synonym: test_synonym_update,
      };

      conversation.deleteSynonym(params, function(err, result) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('deleteValue()', function() {
    it('should delete a value of the entity', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
      };

      conversation.deleteValue(params, function(err, result) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('deleteEntity()', function() {
    it('should delete an entity of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
      };

      conversation.deleteEntity(params, function(err, result) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('createDialogNode()', function() {
    it('should create an dialog node', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        dialog_node: test_dialog_node,
        conditions: 'true',
      };

      conversation.createDialogNode(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(
          result.dialog_node,
          test_dialog_node,
          'dialog_node field has unexpected value'
        );
        assert.equal(result.conditions, 'true', 'conditions field has unexpected value');
        assert.equal(result.description, null, 'description field is not null');
        done();
      });
    });
  });

  describe('getDialogNodes()', function() {
    it('should get dialog nodes of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
      };

      conversation.getDialogNodes(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.dialog_nodes[0].dialog_node, test_dialog_node);
        done();
      });
    });

    it('should have pagination information', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        page_limit: 1,
        include_count: true,
        sort: 'dialog_node',
      };

      conversation.getDialogNodes(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.hasOwnProperty('pagination'), true);
        done();
      });
    });
  });

  describe('getDialogNode()', function() {
    it('should get a dialog node of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        dialog_node: test_dialog_node,
      };

      conversation.getDialogNode(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.dialog_node, test_dialog_node);
        assert.equal(result.description, null);
        done();
      });
    });
  });

  describe('updateDialogNode()', function() {
    it('should update a dialog node of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        old_dialog_node: test_dialog_node,
        dialog_node: test_dialog_node_update,
        conditions: 'false',
      };

      conversation.updateDialogNode(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.dialog_node, test_dialog_node_update);
        assert.equal(result.conditions, 'false');
        done();
      });
    });
  });

  describe('deleteDialogNode()', function() {
    it('should delete a dialog node of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        dialog_node: test_dialog_node_update,
      };

      conversation.deleteDialogNode(params, function(err, result) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('deleteWorkspace()', function() {
    it('should delete the workplace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
      };

      conversation.deleteWorkspace(params, function(err, result) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
