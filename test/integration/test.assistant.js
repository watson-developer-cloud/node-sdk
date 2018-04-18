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
    description: 'description_1',
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
const counterexampleText = 'Hey, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~';
const counterexampleText_new = 'Oh, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~';
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

describe('assistant_integration', function() {
  this.timeout(TEN_SECONDS);
  this.slow(TWO_SECONDS); // this controls when the tests get a colored warning for taking too long
  // this.retries(1);

  let assistant;

  before(function() {
    auth.conversation.version = '2018-02-16';
    assistant = new watson.AssistantV1(auth.conversation);
    nock.enableNetConnect();
  });

  after(function() {
    nock.disableNetConnect();
  });

  describe('message()', function() {
    it('alternate_intents with custom headers', function(done) {
      const params = {
        input: {
          text: 'Turn on the lights',
        },
        alternate_intents: true,
        workspace_id: auth.conversation.workspace_id,
        headers: {
          customheader: 'custom',
        },
      };

      assistant.message(params, function(err, result, response) {
        if (err) {
          return done(err);
        }

        assert(response.headers && response.headers != {});
        assert(result.intents.length > 1);
        done();
      });
    });

    it('dialog_stack with 2017-02-03 version', function(done) {
      const constructorParams = assign({}, auth.conversation, {
        version: '2017-02-03',
      });
      const assistant = new watson.AssistantV1(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspace_id: auth.conversation.workspace_id,
      };

      assistant.message(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(result.context.system.dialog_stack, [{ dialog_node: 'root' }]);
        done();
      });
    });

    it('dialog_stack with 2016-09-20 version', function(done) {
      const constructorParams = assign({}, auth.conversation, {
        version: '2016-09-20',
      });
      const assistant = new watson.AssistantV1(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspace_id: auth.conversation.workspace_id,
      };

      assistant.message(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(result.context.system.dialog_stack, [{ dialog_node: 'root' }]);
        done();
      });
    });

    it('dialog_stack with 2016-07-11 version', function(done) {
      const constructorParams = assign({}, auth.conversation, {
        version: '2016-07-11',
      });
      const assistant = new watson.AssistantV1(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspace_id: auth.conversation.workspace_id,
      };

      assistant.message(params, function(err, result) {
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
      assistant.listWorkspaces(function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.hasOwnProperty('workspaces'), true);
        done();
      });
    });

    it('result should contain an array of workspaces', function(done) {
      assistant.listWorkspaces(function(err, result) {
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
      assistant.listWorkspaces(params, function(err, result) {
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

      assistant.createWorkspace(params, function(err, result) {
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

      assistant.updateWorkspace(params, function(err, result) {
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

      assistant.getWorkspace(params, function(err, result) {
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
        description: test_intents[0].description,
        examples: test_intents[0].examples,
      };

      assistant.createIntent(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.intent, test_intents[0].intent);
        assert.equal(result.description, test_intents[0].description);
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

      assistant.listIntents(params, function(err, result) {
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

      assistant.listIntents(params, function(err, result) {
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

      assistant.getIntent(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.intent, test_intents[0].intent);
        assert.equal(result.description, test_intents[0].description);
        done();
      });
    });
  });

  describe('updateIntent()', function() {
    it('should update an intent of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents[0].intent,
        new_intent: test_intents_update.intent,
        new_description: test_intents_update.description,
        new_examples: test_intents_update.examples,
      };

      assistant.updateIntent(params, function(err, result) {
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

      assistant.listExamples(params, function(err, result) {
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

      assistant.listExamples(params, function(err, result) {
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

      assistant.createExample(params, function(err, result) {
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

      assistant.getExample(params, function(err, result) {
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
        text: test_intents_update.examples[0].text,
        new_text: test_examples_new,
      };

      assistant.updateExample(params, function(err, result) {
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

      assistant.deleteExample(params, function(err, result) {
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

      assistant.deleteIntent(params, function(err, result) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });

  describe('createCounterexample()', function() {
    it('should return the newly created counterexample of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterexampleText,
      };

      assistant.createCounterexample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.text, counterexampleText);
        done();
      });
    });
  });

  describe('getCounterexample()', function() {
    it('should return a counterexample', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterexampleText,
      };

      assistant.getCounterexample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.text, counterexampleText);
        done();
      });
    });
  });

  describe('listCounterexamples()', function() {
    it('should return counterexamples of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
      };

      assistant.listCounterexamples(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.counterexamples[0].text, counterexampleText);
        done();
      });
    });
    it('should return counterexamples of the workspace with pagination', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        page_limit: 1,
        include_count: true,
        sort: 'text',
      };

      assistant.listCounterexamples(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.counterexamples[0].text, counterexampleText);
        assert.equal(result.hasOwnProperty('pagination'), true);
        done();
      });
    });
  });

  describe('updateCounterexample()', function() {
    it('should return an updated counterexample', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterexampleText,
        new_text: counterexampleText_new,
      };

      assistant.updateCounterexample(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.text, counterexampleText_new);
        done();
      });
    });
  });

  describe('deleteCounterexample()', function() {
    it('should delete a counterexample', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterexampleText_new,
      };

      assistant.deleteCounterexample(params, function(err, result) {
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

      assistant.createEntity(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.entity, test_entities[0].entity);
        assert.equal(result.description, null);
        done();
      });
    });
  });

  describe('listEntities()', function() {
    it('should get entities of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        export: true,
      };

      assistant.listEntities(params, function(err, result) {
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

      assistant.listEntities(params, function(err, result) {
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

      assistant.getEntity(params, function(err, result) {
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
        entity: test_entities[0].entity,
        new_entity: test_entities_update.entity,
        new_values: test_entities_update.values,
        fuzzy_match: false,
      };

      assistant.updateEntity(params, function(err, result) {
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

      assistant.createValue(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.value, test_value.value);
        assert.equal(result.description, null);
        done();
      });
    });
  });

  describe('listValues()', function() {
    it('should get values of the entity', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        export: true,
      };

      assistant.listValues(params, function(err, result) {
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

      assistant.listValues(params, function(err, result) {
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

      assistant.getValue(params, function(err, result) {
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
        value: test_value.value,
        new_value: test_value_update.value,
        new_synonyms: test_value_update.synonyms,
      };

      assistant.updateValue(params, function(err, result) {
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

      assistant.createSynonym(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.synonym, test_synonym);
        done();
      });
    });
  });

  describe('listSynonyms()', function() {
    it('should get synonyms of the value', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        export: true,
      };

      assistant.listSynonyms(params, function(err, result) {
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

      assistant.listSynonyms(params, function(err, result) {
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

      assistant.getSynonym(params, function(err, result) {
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
        synonym: test_synonym,
        new_synonym: test_synonym_update,
      };

      assistant.updateSynonym(params, function(err, result) {
        if (err) {
          return done(err);
        }
        assert.equal(result.synonym, test_synonym_update);
        done();
      });
    });
  });

  describe('listLogs()', function() {
    it('should return logs', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
        export: true,
        page_limit: 1,
      };

      assistant.listLogs(params, function(err, result) {
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

      assistant.deleteSynonym(params, function(err, result) {
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

      assistant.deleteValue(params, function(err, result) {
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

      assistant.deleteEntity(params, function(err, result) {
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

      assistant.createDialogNode(params, function(err, result) {
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

  describe('listDialogNodes()', function() {
    it('should get dialog nodes of the workspace', function(done) {
      const params = {
        workspace_id: workspace1.workspace_id,
      };

      assistant.listDialogNodes(params, function(err, result) {
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

      assistant.listDialogNodes(params, function(err, result) {
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

      assistant.getDialogNode(params, function(err, result) {
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
        dialog_node: test_dialog_node,
        new_dialog_node: test_dialog_node_update,
        new_conditions: 'false',
      };

      assistant.updateDialogNode(params, function(err, result) {
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

      assistant.deleteDialogNode(params, function(err, result) {
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

      assistant.deleteWorkspace(params, function(err, result) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
