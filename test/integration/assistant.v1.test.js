'use strict';

const AssistantV1 = require('../../assistant/v1');
const authHelper = require('../resources/auth_helper.js');
const auth = authHelper.auth;
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)
const assign = require('object.assign'); // for node v0.12 compatibility
const serviceErrorUtils = require('../resources/service_error_util');

const extend = require('extend');

const TEN_SECONDS = 10000;

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
  jest.setTimeout(TEN_SECONDS);
  auth.assistant.version = '2019-03-27';
  const assistant = new AssistantV1(auth.assistant);

  describe('message()', function() {
    it('alternate_intents with custom headers', function(done) {
      const params = {
        input: {
          text: 'Turn on the lights',
        },
        alternate_intents: true,
        workspace_id: auth.assistant.workspace_id,
        headers: {
          customheader: 'custom',
        },
      };

      assistant.message(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result, response) {
          if (err) {
            return done(err);
          }

          expect(response.headers && response.headers != {}).toBe(true);
          expect(result.intents.length > 1).toBe(true);
          done();
        })
      );
    });

    it('dialog_stack with 2017-02-03 version', function(done) {
      const constructorParams = assign({}, auth.assistant, {
        version: '2017-02-03',
      });
      const assistant = new AssistantV1(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspace_id: auth.assistant.workspace_id,
      };

      assistant.message(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.context.system.dialog_stack).toEqual([
            { dialog_node: 'node_22_1467833484410' },
          ]);
          done();
        })
      );
    });

    it('dialog_stack with 2016-09-20 version', function(done) {
      const constructorParams = assign({}, auth.assistant, {
        version: '2016-09-20',
      });
      const assistant = new AssistantV1(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspace_id: auth.assistant.workspace_id,
      };

      assistant.message(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.context.system.dialog_stack).toEqual([
            { dialog_node: 'node_22_1467833484410' },
          ]);
          done();
        })
      );
    });

    it('dialog_stack with 2016-07-11 version', function(done) {
      const constructorParams = assign({}, auth.assistant, {
        version: '2016-07-11',
      });
      const assistant = new AssistantV1(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspace_id: auth.assistant.workspace_id,
      };

      assistant.message(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.context.system.dialog_stack).toEqual(['node_22_1467833484410']);
          done();
        })
      );
    });
  });

  describe('listWorkspaces()', function() {
    it('result should contain workspaces key', function(done) {
      assistant.listWorkspaces(
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.hasOwnProperty('workspaces')).toBe(true);
          done();
        })
      );
    });

    it('result should contain an array of workspaces', function(done) {
      assistant.listWorkspaces(
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(Object.prototype.toString.call(result.workspaces)).toBe('[object Array]');
          done();
        })
      );
    });

    it('result should return pagination information', function(done) {
      const params = {
        page_limit: 2,
        include_count: true,
        sort: '-name',
      };
      assistant.listWorkspaces(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.hasOwnProperty('pagination')).toBe(true);
          done();
        })
      );
    });
  });

  describe('createWorkspace()', function() {
    it('should create a new workspace', function(done) {
      const params = workspace;

      assistant.createWorkspace(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          workspace1.workspace_id = result.workspace_id;
          expect(result.name).toBe(params.name);
          expect(result.language).toBe('fr');
          expect(result.metadata).toBeDefined();
          expect(result.description).toBe(params.description);
          done();
        })
      );
    });
  });

  describe('updateWorkspace()', function() {
    it('should update the workspace with intents', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = workspace1;

      assistant.updateWorkspace(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.name).toBe(params.name);
          expect(result.language).toBe('fr');
          expect(result.metadata).toBeDefined();
          expect(result.description).toBe(params.description);
          done();
        })
      );
    });
  });

  describe('getWorkspace()', function() {
    it('should get the workspace with the right intent', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }
      const params = {
        _export: true,
        workspace_id: workspace1.workspace_id,
      };

      assistant.getWorkspace(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.intents[0].intent).toBe('test');
          done();
        })
      );
    });
  });

  describe('createIntent()', function() {
    it('should create an intent', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents[0].intent,
        description: test_intents[0].description,
        examples: test_intents[0].examples,
      };

      assistant.createIntent(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.intent).toBe(test_intents[0].intent);
          expect(result.description).toBe(test_intents[0].description);
          done();
        })
      );
    });
  });

  describe('getIntents()', function() {
    it('should get intents of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        _export: true,
      };

      assistant.listIntents(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.intents[0].intent).toBe(test_intents[0].intent);
          expect(result.intents[0].examples[0].text).toBe(test_intents[0].examples[0].text);
          done();
        })
      );
    });

    it('should have pagination information', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        _export: true,
        page_limit: 1,
        include_count: true,
        sort: 'intent',
      };

      assistant.listIntents(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.hasOwnProperty('pagination')).toBe(true);
          done();
        })
      );
    });
  });

  describe('getIntent()', function() {
    it('should get an intent of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents[0].intent,
      };

      assistant.getIntent(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.intent).toBe(test_intents[0].intent);
          expect(result.description).toBe(test_intents[0].description);
          done();
        })
      );
    });
  });

  describe('updateIntent()', function() {
    it('should update an intent of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents[0].intent,
        new_intent: test_intents_update.intent,
        new_description: test_intents_update.description,
        new_examples: test_intents_update.examples,
      };

      assistant.updateIntent(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.intent).toBe(test_intents_update.intent);
          done();
        })
      );
    });
  });

  describe('getExamples()', function() {
    it('should get all examples of intent', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
      };

      assistant.listExamples(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.examples[0].text).toBe(test_intents_update.examples[0].text);
          done();
        })
      );
    });

    it('should have pagination information', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
        page_limit: 2,
        include_count: true,
        sort: '-text',
      };

      assistant.listExamples(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.hasOwnProperty('pagination')).toBe(true);
          done();
        })
      );
    });
  });

  describe('createExample()', function() {
    it('should create an example in the intent', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
        text: 'new_example',
      };

      assistant.createExample(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.text).toBe('new_example');
          done();
        })
      );
    });
  });

  describe('getExample()', function() {
    it('should get an example of intent', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
        text: test_intents_update.examples[0].text,
      };

      assistant.getExample(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.text).toBe(test_intents_update.examples[0].text);
          done();
        })
      );
    });
  });

  describe('updateExample()', function() {
    it('should update an example of intent', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
        text: test_intents_update.examples[0].text,
        new_text: test_examples_new,
      };

      assistant.updateExample(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.text).toBe(test_examples_new);
          done();
        })
      );
    });
  });

  describe('deleteExample()', function() {
    it('should delete an example of intent', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
        text: test_examples_new,
      };

      assistant.deleteExample(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          done();
        })
      );
    });
  });

  describe('deleteIntent()', function() {
    it('should delete an intent of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        intent: test_intents_update.intent,
      };

      assistant.deleteIntent(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          done();
        })
      );
    });
  });

  describe('createCounterexample()', function() {
    it('should return the newly created counterexample of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterexampleText,
      };

      assistant.createCounterexample(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.text).toBe(counterexampleText);
          done();
        })
      );
    });
  });

  describe('getCounterexample()', function() {
    it('should return a counterexample - using promise', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterexampleText,
      };

      assistant
        .getCounterexample(params)
        .then(result => {
          expect(result.text).toBe(counterexampleText);
          done();
        })
        .catch(err => {
          expect(err.code).toBe(200);
          return done(err);
        });
    });
  });

  describe('listCounterexamples()', function() {
    it('should return counterexamples of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
      };

      assistant.listCounterexamples(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.counterexamples[0].text).toBe(counterexampleText);
          done();
        })
      );
    });
    it('should return counterexamples of the workspace with pagination', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        page_limit: 1,
        include_count: true,
        sort: 'text',
      };

      assistant.listCounterexamples(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.counterexamples[0].text).toBe(counterexampleText);
          expect(result.hasOwnProperty('pagination')).toBe(true);
          done();
        })
      );
    });
  });

  describe('updateCounterexample()', function() {
    it('should return an updated counterexample', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterexampleText,
        new_text: counterexampleText_new,
      };

      assistant.updateCounterexample(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.text).toBe(counterexampleText_new);
          done();
        })
      );
    });
  });

  describe('deleteCounterexample()', function() {
    it('should delete a counterexample', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        text: counterexampleText_new,
      };

      assistant.deleteCounterexample(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          done();
        })
      );
    });
  });

  describe('createEntity()', function() {
    it('should create an entity', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities[0].entity,
        values: test_entities[0].values,
        fuzzy_match: true,
      };

      assistant.createEntity(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            expect(err.code).toBe(200);
            return done(err);
          }
          expect(result.entity).toBe(test_entities[0].entity);
          expect(result.description).toBeUndefined();
          done();
        })
      );
    });
  });

  describe('listEntities()', function() {
    it('should get entities of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        _export: true,
      };

      assistant.listEntities(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.entities[0].entity).toBe(test_entities[0].entity);
          expect(result.entities[0].values[0].value).toBe(test_entities[0].values[0].value);
          done();
        })
      );
    });

    it('should have pagination information', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        _export: true,
        page_limit: 1,
        include_count: true,
        sort: 'entity',
      };

      assistant.listEntities(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.hasOwnProperty('pagination')).toBe(true);
          done();
        })
      );
    });
  });

  describe('getEntity()', function() {
    it('should get an entity of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities[0].entity,
      };

      assistant.getEntity(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.entity).toBe(test_entities[0].entity);
          expect(result.description).toBeUndefined();
          expect(result.fuzzy_match).toBe(true);
          done();
        })
      );
    });
  });

  describe('updateEntity()', function() {
    it('should update an entity of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities[0].entity,
        new_entity: test_entities_update.entity,
        new_values: test_entities_update.values,
        fuzzy_match: false,
      };

      assistant.updateEntity(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.entity).toBe(test_entities_update.entity);
          done();
        })
      );
    });
  });

  describe('createValue()', function() {
    it('should create a value', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value.value,
        synonyms: test_value.synonyms,
      };

      assistant.createValue(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.value).toBe(test_value.value);
          expect(result.description).toBeUndefined();
          done();
        })
      );
    });
  });

  describe('listValues()', function() {
    it('should get values of the entity', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        _export: true,
      };

      assistant.listValues(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.values[1].value).toBe(test_value.value);
          expect(result.values[1].synonyms[0]).toBe(test_value.synonyms[0]);
          done();
        })
      );
    });

    it('should have pagination information', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        _export: true,
        page_limit: 1,
        include_count: true,
        sort: 'value',
      };

      assistant.listValues(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.hasOwnProperty('pagination')).toBe(true);
          done();
        })
      );
    });
  });

  describe('getValue()', function() {
    it('should get a value of the entity', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value.value,
      };

      assistant.getValue(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.value).toBe(test_value.value);
          expect(result.description).toBeUndefined();
          done();
        })
      );
    });
  });

  describe('updateValue()', function() {
    it('should update a value of the entity', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value.value,
        new_value: test_value_update.value,
        new_synonyms: test_value_update.synonyms,
      };

      assistant.updateValue(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.value).toBe(test_value_update.value);
          done();
        })
      );
    });
  });

  describe('createSynonym()', function() {
    it('should create a synonym', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        synonym: test_synonym,
      };

      assistant.createSynonym(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.synonym).toBe(test_synonym);
          done();
        })
      );
    });
  });

  describe('listSynonyms()', function() {
    it('should get synonyms of the value', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        _export: true,
      };

      assistant.listSynonyms(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.synonyms[1].synonym).toBe(test_synonym);
          done();
        })
      );
    });

    it('should have pagination information', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        _export: true,
        page_limit: 1,
        include_count: true,
      };

      assistant.listSynonyms(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.hasOwnProperty('pagination')).toBe(true);
          done();
        })
      );
    });
  });

  describe('getSynonym()', function() {
    it('should get a synonym of the value', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        synonym: test_synonym,
      };

      assistant.getSynonym(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.synonym).toBe(test_synonym);
          done();
        })
      );
    });
  });

  describe('updateSynonym()', function() {
    it('should update a synonym of the value', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        synonym: test_synonym,
        new_synonym: test_synonym_update,
      };

      assistant.updateSynonym(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.synonym).toBe(test_synonym_update);
          done();
        })
      );
    });
  });

  describe('listLogs()', function() {
    it('should return logs', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        _export: true,
        page_limit: 1,
      };

      assistant.listLogs(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.hasOwnProperty('logs')).toBe(true);
          done();
        })
      );
    });
  });

  describe('deleteSynonym()', function() {
    it('should delete a synonym of the value', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
        synonym: test_synonym_update,
      };

      assistant.deleteSynonym(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          done();
        })
      );
    });
  });

  describe('deleteValue()', function() {
    it('should delete a value of the entity', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
        value: test_value_update.value,
      };

      assistant.deleteValue(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          done();
        })
      );
    });
  });

  describe('listMentions()', function() {
    it('should return an EntityMentionCollection', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
      };
      assistant.listMentions(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(Array.isArray(result.examples)).toBe(true);
          expect(result.pagination).toBeDefined();
          done();
        })
      );
    });
  });

  describe('deleteEntity()', function() {
    it('should delete an entity of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        entity: test_entities_update.entity,
      };

      assistant.deleteEntity(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          done();
        })
      );
    });
  });

  describe('createDialogNode()', function() {
    it('should create an dialog node', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        dialog_node: test_dialog_node,
        conditions: 'true',
      };

      assistant.createDialogNode(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.dialog_node).toBe(test_dialog_node);
          expect(result.conditions).toBe('true');
          expect(result.description).toBeUndefined();
          done();
        })
      );
    });
  });

  describe('listDialogNodes()', function() {
    it('should get dialog nodes of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
      };

      assistant.listDialogNodes(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.dialog_nodes[0].dialog_node).toBe(test_dialog_node);
          done();
        })
      );
    });

    it('should have pagination information', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        page_limit: 1,
        include_count: true,
        sort: 'dialog_node',
      };

      assistant.listDialogNodes(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.hasOwnProperty('pagination')).toBe(true);
          done();
        })
      );
    });
  });

  describe('getDialogNode()', function() {
    it('should get a dialog node of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        dialog_node: test_dialog_node,
      };

      assistant.getDialogNode(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.dialog_node).toBe(test_dialog_node);
          expect(result.description).toBeUndefined();
          done();
        })
      );
    });
  });

  describe('updateDialogNode()', function() {
    it('should update a dialog node of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        dialog_node: test_dialog_node,
        new_dialog_node: test_dialog_node_update,
        new_conditions: 'false',
      };

      assistant.updateDialogNode(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          expect(result.dialog_node).toBe(test_dialog_node_update);
          expect(result.conditions).toBe('false');
          done();
        })
      );
    });
  });

  describe('deleteDialogNode()', function() {
    it('should delete a dialog node of the workspace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
        dialog_node: test_dialog_node_update,
      };

      assistant.deleteDialogNode(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          done();
        })
      );
    });
  });

  describe('deleteWorkspace()', function() {
    it('should delete the workplace', function(done) {
      if (!workspace1.workspace_id) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspace_id: workspace1.workspace_id,
      };

      assistant.deleteWorkspace(
        params,
        serviceErrorUtils.checkErrorCode(200, function(err, result) {
          if (err) {
            return done(err);
          }
          done();
        })
      );
    });
  });
});
