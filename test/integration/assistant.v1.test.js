'use strict';

const AssistantV1 = require('../../assistant/v1');
const { IamAuthenticator } = require('../../auth');
const authHelper = require('../resources/auth_helper.js');
const describe = authHelper.describe; // this runs describe.skip if there is no auth.js file :)

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

const testIntents = [
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
const testIntentsUpdate = {
  intent: 'intent_2',
  description: 'description_2',
  examples: [
    {
      text: 'Hey, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~',
    },
  ],
};
const testExamplesNew = 'Oh, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~';
const counterexampleText = 'Hey, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~';
const counterexampleTextNew = 'Oh, here\'s a URL ☺ http://example.com/?a=$+*^;&c=%20#!"`~';
const testEntities = [
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
const testEntitiesUpdate = {
  entity: 'entity_2',
  values: [
    {
      value: 'v1',
      synonyms: ['s1'],
    },
  ],
};
const testValue = {
  value: 'value_1',
  synonyms: ['syn_1'],
};
const testValueUpdate = {
  value: 'value_2',
  synonyms: ['syn_2'],
};
const testSynonym = 'synonym_1';
const testSynonymUpdate = 'synonym_2';
const testDialogNode = 'new_node';
const testDialogNode_update = 'updated_node';

// changing language is forbidden starting with VERSION_DATE_2017_05_26
const workspace1 = extend(true, {}, workspace, intents, { language: workspace.language });

// extract service params from auth.js

describe('assistant v1 integration', () => {
  jest.setTimeout(TEN_SECONDS);

  const options = authHelper.auth.assistant;
  options.version = '2019-03-27';
  options.authenticator = new IamAuthenticator({ apikey: options.apikey });
  const assistant = new AssistantV1(options);

  describe('message()', () => {
    it('alternateIntents with custom headers', done => {
      const params = {
        input: {
          text: 'Turn on the lights',
        },
        alternateIntents: true,
        workspaceId: options.workspaceId,
        headers: {
          customheader: 'custom',
        },
      };

      assistant.message(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(res.headers && res.headers != {}).toBe(true);
        expect(res.result.intents.length > 1).toBe(true);
        done();
      });
    });

    it('dialog_stack with 2017-02-03 version', done => {
      const constructorParams = Object.assign({}, options, {
        version: '2017-02-03',
      });
      const assistant = new AssistantV1(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspaceId: options.workspaceId,
      };

      assistant.message(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.context.system.dialog_stack).toEqual([
          { dialog_node: 'node_22_1467833484410' },
        ]);
        done();
      });
    });

    it('dialog_stack with 2016-09-20 version', done => {
      const constructorParams = Object.assign({}, options, {
        version: '2016-09-20',
      });
      const assistant = new AssistantV1(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspaceId: options.workspaceId,
      };

      assistant.message(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.context.system.dialog_stack).toEqual([
          { dialog_node: 'node_22_1467833484410' },
        ]);
        done();
      });
    });

    it('dialog_stack with 2016-07-11 version', done => {
      const constructorParams = Object.assign({}, options, {
        version: '2016-07-11',
      });
      const assistant = new AssistantV1(constructorParams);

      const params = {
        input: {
          text: 'Turn on the lights',
        },
        workspaceId: options.workspaceId,
      };

      assistant.message(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.context.system.dialog_stack).toEqual(['node_22_1467833484410']);
        done();
      });
    });
  });

  describe('listWorkspaces()', () => {
    it('result should contain workspaces key', done => {
      assistant.listWorkspaces((err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.hasOwnProperty('workspaces')).toBe(true);
        done();
      });
    });

    it('result should contain an array of workspaces', done => {
      assistant.listWorkspaces((err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(Object.prototype.toString.call(result.workspaces)).toBe('[object Array]');
        done();
      });
    });

    it('result should return pagination information', done => {
      const params = {
        pageLimit: 2,
        sort: '-name',
      };
      assistant.listWorkspaces(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.hasOwnProperty('pagination')).toBe(true);
        done();
      });
    });
  });

  describe('createWorkspace()', () => {
    it('should create a new workspace', done => {
      const params = workspace;

      assistant.createWorkspace(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        workspace1.workspaceId = result.workspace_id;
        expect(result.name).toBe(params.name);
        expect(result.language).toBe('fr');
        expect(result.metadata).toBeDefined();
        expect(result.description).toBe(params.description);
        done();
      });
    });
  });

  describe('updateWorkspace()', () => {
    it('should update the workspace with intents', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = workspace1;

      assistant.updateWorkspace(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.name).toBe(params.name);
        expect(result.language).toBe('fr');
        expect(result.metadata).toBeDefined();
        expect(result.description).toBe(params.description);
        done();
      });
    });
  });

  describe('getWorkspace()', () => {
    it('should get the workspace with the right intent', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }
      const params = {
        _export: true,
        workspaceId: workspace1.workspaceId,
      };

      assistant.getWorkspace(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.intents[0].intent).toBe('test');
        done();
      });
    });
  });

  describe('createIntent()', () => {
    it('should create an intent', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntents[0].intent,
        description: testIntents[0].description,
        examples: testIntents[0].examples,
      };

      assistant.createIntent(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.intent).toBe(testIntents[0].intent);
        expect(result.description).toBe(testIntents[0].description);
        done();
      });
    });
  });

  describe('getIntents()', () => {
    it('should get intents of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        _export: true,
      };

      assistant.listIntents(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.intents[0].intent).toBe(testIntents[0].intent);
        expect(result.intents[0].examples[0].text).toBe(testIntents[0].examples[0].text);
        done();
      });
    });

    it('should have pagination information', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        _export: true,
        pageLimit: 1,
        sort: 'intent',
      };

      assistant.listIntents(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.hasOwnProperty('pagination')).toBe(true);
        done();
      });
    });
  });

  describe('getIntent()', () => {
    it('should get an intent of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntents[0].intent,
      };

      assistant.getIntent(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.intent).toBe(testIntents[0].intent);
        expect(result.description).toBe(testIntents[0].description);
        done();
      });
    });
  });

  describe('updateIntent()', () => {
    it('should update an intent of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntents[0].intent,
        newIntent: testIntentsUpdate.intent,
        newDescription: testIntentsUpdate.description,
        newExamples: testIntentsUpdate.examples,
      };

      assistant.updateIntent(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.intent).toBe(testIntentsUpdate.intent);
        done();
      });
    });
  });

  describe('getExamples()', () => {
    it('should get all examples of intent', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
      };

      assistant.listExamples(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.examples[0].text).toBe(testIntentsUpdate.examples[0].text);
        done();
      });
    });

    it('should have pagination information', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
        pageLimit: 2,
        sort: '-text',
      };

      assistant.listExamples(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.hasOwnProperty('pagination')).toBe(true);
        done();
      });
    });
  });

  describe('createExample()', () => {
    it('should create an example in the intent', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
        text: 'new_example',
      };

      assistant.createExample(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.text).toBe('new_example');
        done();
      });
    });
  });

  describe('getExample()', () => {
    it('should get an example of intent', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
        text: testIntentsUpdate.examples[0].text,
      };

      assistant.getExample(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.text).toBe(testIntentsUpdate.examples[0].text);
        done();
      });
    });
  });

  describe('updateExample()', () => {
    it('should update an example of intent', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
        text: testIntentsUpdate.examples[0].text,
        newText: testExamplesNew,
      };

      assistant.updateExample(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.text).toBe(testExamplesNew);
        done();
      });
    });
  });

  describe('deleteExample()', () => {
    it('should delete an example of intent', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
        text: testExamplesNew,
      };

      assistant.deleteExample(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('deleteIntent()', () => {
    it('should delete an intent of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
      };

      assistant.deleteIntent(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('createCounterexample()', () => {
    it('should return the newly created counterexample of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        text: counterexampleText,
      };

      assistant.createCounterexample(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.text).toBe(counterexampleText);
        done();
      });
    });
  });

  describe('getCounterexample()', () => {
    it('should return a counterexample - using promise', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        text: counterexampleText,
      };

      assistant
        .getCounterexample(params)
        .catch(err => {
          expect(err.code).toBe(200);
          return done(err);
        })
        .then(({ result }) => {
          expect(result.text).toBe(counterexampleText);
          done();
        });
    });
  });

  describe('listCounterexamples()', () => {
    it('should return counterexamples of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
      };

      assistant.listCounterexamples(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.counterexamples[0].text).toBe(counterexampleText);
        done();
      });
    });
    it('should return counterexamples of the workspace with pagination', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        pageLimit: 1,
        sort: 'text',
      };

      assistant.listCounterexamples(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.counterexamples[0].text).toBe(counterexampleText);
        expect(result.hasOwnProperty('pagination')).toBe(true);
        done();
      });
    });
  });

  describe('updateCounterexample()', () => {
    it('should return an updated counterexample', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        text: counterexampleText,
        newText: counterexampleTextNew,
      };

      assistant.updateCounterexample(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.text).toBe(counterexampleTextNew);
        done();
      });
    });
  });

  describe('deleteCounterexample()', () => {
    it('should delete a counterexample', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        text: counterexampleTextNew,
      };

      assistant.deleteCounterexample(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('createEntity()', () => {
    it('should create an entity', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntities[0].entity,
        values: testEntities[0].values,
        fuzzyMatch: true,
      };

      assistant.createEntity(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.entity).toBe(testEntities[0].entity);
        expect(result.description).toBeUndefined();
        done();
      });
    });
  });

  describe('listEntities()', () => {
    it('should get entities of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        _export: true,
      };

      assistant.listEntities(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.entities[0].entity).toBe(testEntities[0].entity);
        expect(result.entities[0].values[0].value).toBe(testEntities[0].values[0].value);
        done();
      });
    });

    it('should have pagination information', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        _export: true,
        pageLimit: 1,
        sort: 'entity',
      };

      assistant.listEntities(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.hasOwnProperty('pagination')).toBe(true);
        done();
      });
    });
  });

  describe('getEntity()', () => {
    it('should get an entity of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntities[0].entity,
      };

      assistant.getEntity(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.entity).toBe(testEntities[0].entity);
        expect(result.description).toBeUndefined();
        done();
      });
    });
  });

  describe('updateEntity()', () => {
    it('should update an entity of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntities[0].entity,
        newEntity: testEntitiesUpdate.entity,
        newValues: testEntitiesUpdate.values,
        fuzzyMatch: false,
      };

      assistant.updateEntity(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.entity).toBe(testEntitiesUpdate.entity);
        done();
      });
    });
  });

  describe('createValue()', () => {
    it('should create a value', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValue.value,
        synonyms: testValue.synonyms,
      };

      assistant.createValue(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.value).toBe(testValue.value);
        expect(result.description).toBeUndefined();
        done();
      });
    });
  });

  describe('listValues()', () => {
    it('should get values of the entity', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        _export: true,
      };

      assistant.listValues(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.values[1].value).toBe(testValue.value);
        expect(result.values[1].synonyms[0]).toBe(testValue.synonyms[0]);
        done();
      });
    });

    it('should have pagination information', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        _export: true,
        pageLimit: 1,
        sort: 'value',
      };

      assistant.listValues(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.hasOwnProperty('pagination')).toBe(true);
        done();
      });
    });
  });

  describe('getValue()', () => {
    it('should get a value of the entity', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValue.value,
      };

      assistant.getValue(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.value).toBe(testValue.value);
        expect(result.description).toBeUndefined();
        done();
      });
    });
  });

  describe('updateValue()', () => {
    it('should update a value of the entity', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValue.value,
        newValue: testValueUpdate.value,
        newSynonyms: testValueUpdate.synonyms,
      };

      assistant.updateValue(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.value).toBe(testValueUpdate.value);
        done();
      });
    });
  });

  describe('createSynonym()', () => {
    it('should create a synonym', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        synonym: testSynonym,
      };

      assistant.createSynonym(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.synonym).toBe(testSynonym);
        done();
      });
    });
  });

  describe('listSynonyms()', () => {
    it('should get synonyms of the value', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        _export: true,
      };

      assistant.listSynonyms(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.synonyms[1].synonym).toBe(testSynonym);
        done();
      });
    });

    it('should have pagination information', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        _export: true,
        pageLimit: 1,
      };

      assistant.listSynonyms(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.hasOwnProperty('pagination')).toBe(true);
        done();
      });
    });
  });

  describe('getSynonym()', () => {
    it('should get a synonym of the value', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        synonym: testSynonym,
      };

      assistant.getSynonym(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.synonym).toBe(testSynonym);
        done();
      });
    });
  });

  describe('updateSynonym()', () => {
    it('should update a synonym of the value', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        synonym: testSynonym,
        newSynonym: testSynonymUpdate,
      };

      assistant.updateSynonym(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.synonym).toBe(testSynonymUpdate);
        done();
      });
    });
  });

  describe('listLogs()', () => {
    it('should return logs', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        _export: true,
        pageLimit: 1,
      };

      assistant.listLogs(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.hasOwnProperty('logs')).toBe(true);
        done();
      });
    });
  });

  describe('deleteSynonym()', () => {
    it('should delete a synonym of the value', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        synonym: testSynonymUpdate,
      };

      assistant.deleteSynonym(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('deleteValue()', () => {
    it('should delete a value of the entity', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
      };

      assistant.deleteValue(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('listMentions()', () => {
    it('should return an EntityMentionCollection', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
      };
      assistant.listMentions(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(Array.isArray(result.examples)).toBe(true);
        expect(result.pagination).toBeDefined();
        done();
      });
    });
  });

  describe('deleteEntity()', () => {
    it('should delete an entity of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
      };

      assistant.deleteEntity(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('createDialogNode()', () => {
    it('should create an dialog node', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        dialogNode: testDialogNode,
        conditions: 'true',
      };

      assistant.createDialogNode(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.dialog_node).toBe(testDialogNode);
        expect(result.conditions).toBe('true');
        expect(result.description).toBeUndefined();
        done();
      });
    });
  });

  describe('listDialogNodes()', () => {
    it('should get dialog nodes of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
      };

      assistant.listDialogNodes(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.dialog_nodes[0].dialog_node).toBe(testDialogNode);
        done();
      });
    });

    it('should have pagination information', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        pageLimit: 1,
        sort: 'dialog_node',
      };

      assistant.listDialogNodes(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.hasOwnProperty('pagination')).toBe(true);
        done();
      });
    });
  });

  describe('getDialogNode()', () => {
    it('should get a dialog node of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        dialogNode: testDialogNode,
      };

      assistant.getDialogNode(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.dialog_node).toBe(testDialogNode);
        expect(result.description).toBeUndefined();
        done();
      });
    });
  });

  describe('updateDialogNode()', () => {
    it('should update a dialog node of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        dialogNode: testDialogNode,
        newDialogNode: testDialogNode_update,
        newConditions: 'false',
      };

      assistant.updateDialogNode(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        expect(result.dialog_node).toBe(testDialogNode_update);
        expect(result.conditions).toBe('false');
        done();
      });
    });
  });

  describe('deleteDialogNode()', () => {
    it('should delete a dialog node of the workspace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
        dialogNode: testDialogNode_update,
      };

      assistant.deleteDialogNode(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        done();
      });
    });
  });

  describe('deleteWorkspace()', () => {
    it('should delete the workplace', done => {
      if (!workspace1.workspaceId) {
        // We cannot run this test when workspace creation failed.
        return done();
      }

      const params = {
        workspaceId: workspace1.workspaceId,
      };

      assistant.deleteWorkspace(params, (err, res) => {
        expect(err).toBeNull();
        const { result } = res || {};
        expect(result).toBeDefined();
        done();
      });
    });
  });
});
