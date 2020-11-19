'use strict';

const AssistantV1 = require('../../dist/assistant/v1');
const { IamAuthenticator } = require('../../dist/auth');
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
    it('alternateIntents with custom headers', async () => {
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

      const res = await assistant.message(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(res.headers && res.headers != {}).toBe(true);
      expect(res.result.intents.length > 1).toBe(true);
    });

    it('dialog_stack with 2017-02-03 version', async () => {
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

      const res = await assistant.message(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.context.system.dialog_stack).toEqual([{ dialog_node: 'root' }]);
    });

    it('dialog_stack with 2016-09-20 version', async () => {
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

      const res = await assistant.message(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.context.system.dialog_stack).toEqual([]);
    });

    it('dialog_stack with 2016-07-11 version', async () => {
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

      const res = await assistant.message(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.context.system.dialog_stack).toEqual([]);
    });
  });

  describe('listWorkspaces()', () => {
    it('result should contain workspaces key', async () => {
      const res = await assistant.listWorkspaces();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.hasOwnProperty('workspaces')).toBe(true);
    });

    it('result should contain an array of workspaces', async () => {
      const res = await assistant.listWorkspaces();
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(Object.prototype.toString.call(result.workspaces)).toBe('[object Array]');
    });

    it('result should return pagination information', async () => {
      const params = {
        pageLimit: 2,
        sort: '-name',
      };

      const res = await assistant.listWorkspaces(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.hasOwnProperty('pagination')).toBe(true);
    });
  });

  describe('createWorkspace()', () => {
    it('should create a new workspace', async () => {
      const params = workspace;

      const res = await assistant.createWorkspace(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      workspace1.workspaceId = result.workspace_id;
      expect(result.name).toBe(params.name);
      expect(result.language).toBe('fr');
      expect(result.metadata).toBeDefined();
      expect(result.description).toBe(params.description);
    });
  });

  describe('updateWorkspace()', () => {
    it('should update the workspace with intents', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = workspace1;

      const res = await assistant.updateWorkspace(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.name).toBe(params.name);
      expect(result.language).toBe('fr');
      expect(result.metadata).toBeDefined();
      expect(result.description).toBe(params.description);
    });
  });

  describe('getWorkspace()', () => {
    it('should get the workspace with the right intent', async () => {
      expect(workspace1.workspaceId).toBeTruthy();
      const params = {
        _export: true,
        workspaceId: workspace1.workspaceId,
      };

      const res = await assistant.getWorkspace(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.intents[0].intent).toBe('test');
    });
  });

  describe('createIntent()', () => {
    it('should create an intent', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntents[0].intent,
        description: testIntents[0].description,
        examples: testIntents[0].examples,
      };

      const res = await assistant.createIntent(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.intent).toBe(testIntents[0].intent);
      expect(result.description).toBe(testIntents[0].description);
    });
  });

  describe('getIntents()', () => {
    it('should get intents of the workspace', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        _export: true,
      };

      const res = await assistant.listIntents(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.intents[0].intent).toBe(testIntents[0].intent);
      expect(result.intents[0].examples[0].text).toBe(testIntents[0].examples[0].text);
    });

    it('should have pagination information', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        _export: true,
        pageLimit: 1,
        sort: 'intent',
      };

      const res = await assistant.listIntents(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.hasOwnProperty('pagination')).toBe(true);
    });
  });

  describe('getIntent()', () => {
    it('should get an intent of the workspace', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntents[0].intent,
      };

      const res = await assistant.getIntent(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.intent).toBe(testIntents[0].intent);
      expect(result.description).toBe(testIntents[0].description);
    });
  });

  describe('updateIntent()', () => {
    it('should update an intent of the workspace', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntents[0].intent,
        newIntent: testIntentsUpdate.intent,
        newDescription: testIntentsUpdate.description,
        newExamples: testIntentsUpdate.examples,
      };

      const res = await assistant.updateIntent(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.intent).toBe(testIntentsUpdate.intent);
    });
  });

  describe('getExamples()', () => {
    it('should get all examples of intent', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
      };

      const res = await assistant.listExamples(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.examples[0].text).toBe(testIntentsUpdate.examples[0].text);
    });

    it('should have pagination information', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
        pageLimit: 2,
        sort: '-text',
      };

      const res = await assistant.listExamples(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.hasOwnProperty('pagination')).toBe(true);
    });
  });

  describe('createExample()', () => {
    it('should create an example in the intent', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
        text: 'new_example',
      };

      const res = await assistant.createExample(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.text).toBe('new_example');
    });
  });

  describe('getExample()', () => {
    it('should get an example of intent', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
        text: testIntentsUpdate.examples[0].text,
      };

      const res = await assistant.getExample(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.text).toBe(testIntentsUpdate.examples[0].text);
    });
  });

  describe('updateExample()', () => {
    it('should update an example of intent', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
        text: testIntentsUpdate.examples[0].text,
        newText: testExamplesNew,
      };

      const res = await assistant.updateExample(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.text).toBe(testExamplesNew);
    });
  });

  describe('deleteExample()', () => {
    it('should delete an example of intent', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
        text: testExamplesNew,
      };

      const res = await assistant.deleteExample(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });

  describe('deleteIntent()', () => {
    it('should delete an intent of the workspace', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        intent: testIntentsUpdate.intent,
      };

      const res = await assistant.deleteIntent(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });

  describe('createCounterexample()', () => {
    it('should return the newly created counterexample of the workspace', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        text: counterexampleText,
      };

      const res = await assistant.createCounterexample(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.text).toBe(counterexampleText);
    });
  });

  describe('getCounterexample()', () => {
    it('should return a counterexample - using promise', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        text: counterexampleText,
      };

      const res = await assistant.getCounterexample(params);
      const { result } = res || {};
      expect(result.text).toBe(counterexampleText);
    });
  });

  describe('listCounterexamples()', () => {
    it('should return counterexamples of the workspace', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
      };

      const res = await assistant.listCounterexamples(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.counterexamples[0].text).toBe(counterexampleText);
    });
    it('should return counterexamples of the workspace with pagination', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        pageLimit: 1,
        sort: 'text',
      };

      const res = await assistant.listCounterexamples(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.counterexamples[0].text).toBe(counterexampleText);
      expect(result.hasOwnProperty('pagination')).toBe(true);
    });
  });

  describe('updateCounterexample()', () => {
    it('should return an updated counterexample', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        text: counterexampleText,
        newText: counterexampleTextNew,
      };

      const res = await assistant.updateCounterexample(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.text).toBe(counterexampleTextNew);
    });
  });

  describe('deleteCounterexample()', () => {
    it('should delete a counterexample', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        text: counterexampleTextNew,
      };

      const res = await assistant.deleteCounterexample(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });

  describe('createEntity()', () => {
    it('should create an entity', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntities[0].entity,
        values: testEntities[0].values,
        fuzzyMatch: true,
      };

      const res = await assistant.createEntity(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.entity).toBe(testEntities[0].entity);
      expect(result.description).toBeUndefined();
    });
  });

  describe('listEntities()', () => {
    it('should get entities of the workspace', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        _export: true,
      };

      const res = await assistant.listEntities(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.entities[0].entity).toBe(testEntities[0].entity);
      expect(result.entities[0].values[0].value).toBe(testEntities[0].values[0].value);
    });

    it('should have pagination information', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        _export: true,
        pageLimit: 1,
        sort: 'entity',
      };

      const res = await assistant.listEntities(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.hasOwnProperty('pagination')).toBe(true);
    });
  });

  describe('getEntity()', () => {
    it('should get an entity of the workspace', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntities[0].entity,
      };

      const res = await assistant.getEntity(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.entity).toBe(testEntities[0].entity);
      expect(result.description).toBeUndefined();
    });
  });

  describe('updateEntity()', () => {
    it('should update an entity of the workspace', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntities[0].entity,
        newEntity: testEntitiesUpdate.entity,
        newValues: testEntitiesUpdate.values,
        fuzzyMatch: false,
      };

      const res = await assistant.updateEntity(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.entity).toBe(testEntitiesUpdate.entity);
    });
  });

  describe('createValue()', () => {
    it('should create a value', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValue.value,
        synonyms: testValue.synonyms,
      };

      const res = await assistant.createValue(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.value).toBe(testValue.value);
      expect(result.description).toBeUndefined();
    });
  });

  describe('listValues()', () => {
    it('should get values of the entity', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        _export: true,
      };

      const res = await assistant.listValues(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.values[1].value).toBe(testValue.value);
      expect(result.values[1].synonyms[0]).toBe(testValue.synonyms[0]);
    });

    it('should have pagination information', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        _export: true,
        pageLimit: 1,
        sort: 'value',
      };

      const res = await assistant.listValues(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.hasOwnProperty('pagination')).toBe(true);
    });
  });

  describe('getValue()', () => {
    it('should get a value of the entity', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValue.value,
      };

      const res = await assistant.getValue(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.value).toBe(testValue.value);
      expect(result.description).toBeUndefined();
    });
  });

  describe('updateValue()', () => {
    it('should update a value of the entity', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValue.value,
        newValue: testValueUpdate.value,
        newSynonyms: testValueUpdate.synonyms,
      };

      const res = await assistant.updateValue(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.value).toBe(testValueUpdate.value);
    });
  });

  describe('createSynonym()', () => {
    it('should create a synonym', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        synonym: testSynonym,
      };

      const res = await assistant.createSynonym(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.synonym).toBe(testSynonym);
    });
  });

  describe('listSynonyms()', () => {
    it('should get synonyms of the value', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        _export: true,
      };

      const res = await assistant.listSynonyms(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.synonyms[1].synonym).toBe(testSynonym);
    });

    it('should have pagination information', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        _export: true,
        pageLimit: 1,
      };

      const res = await assistant.listSynonyms(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.hasOwnProperty('pagination')).toBe(true);
    });
  });

  describe('getSynonym()', () => {
    it('should get a synonym of the value', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        synonym: testSynonym,
      };

      const res = await assistant.getSynonym(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.synonym).toBe(testSynonym);
    });
  });

  describe('updateSynonym()', () => {
    it('should update a synonym of the value', async () => {
      // We cannot run this test when workspace creation failed.
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        synonym: testSynonym,
        newSynonym: testSynonymUpdate,
      };

      const res = await assistant.updateSynonym(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.synonym).toBe(testSynonymUpdate);
    });
  });

  describe('listLogs()', () => {
    it('should return logs', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        _export: true,
        pageLimit: 1,
      };

      const res = await assistant.listLogs(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.hasOwnProperty('logs')).toBe(true);
    });
  });

  describe('deleteSynonym()', () => {
    it('should delete a synonym of the value', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
        synonym: testSynonymUpdate,
      };

      const res = await assistant.deleteSynonym(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });

  describe('deleteValue()', () => {
    it('should delete a value of the entity', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
        value: testValueUpdate.value,
      };

      const res = await assistant.deleteValue(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });

  describe('listMentions()', () => {
    it('should return an EntityMentionCollection', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
      };

      const res = await assistant.listMentions(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(Array.isArray(result.examples)).toBe(true);
      expect(result.pagination).toBeDefined();
    });
  });

  describe('deleteEntity()', () => {
    it('should delete an entity of the workspace', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        entity: testEntitiesUpdate.entity,
      };

      const res = await assistant.deleteEntity(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });

  describe('createDialogNode()', () => {
    it('should create an dialog node', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        dialogNode: testDialogNode,
        conditions: 'true',
      };

      const res = await assistant.createDialogNode(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.dialog_node).toBe(testDialogNode);
      expect(result.conditions).toBe('true');
      expect(result.description).toBeUndefined();
    });
  });

  describe('listDialogNodes()', () => {
    it('should get dialog nodes of the workspace', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
      };

      const res = await assistant.listDialogNodes(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.dialog_nodes[0].dialog_node).toBe(testDialogNode);
    });

    it('should have pagination information', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        pageLimit: 1,
        sort: 'dialog_node',
      };

      const res = await assistant.listDialogNodes(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.hasOwnProperty('pagination')).toBe(true);
    });
  });

  describe('getDialogNode()', () => {
    it('should get a dialog node of the workspace', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        dialogNode: testDialogNode,
      };

      const res = await assistant.getDialogNode(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.dialog_node).toBe(testDialogNode);
      expect(result.description).toBeUndefined();
    });
  });

  describe('updateDialogNode()', () => {
    it('should update a dialog node of the workspace', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        dialogNode: testDialogNode,
        newDialogNode: testDialogNode_update,
        newConditions: 'false',
      };

      const res = await assistant.updateDialogNode(params);
      const { result } = res || {};
      expect(result).toBeDefined();
      expect(result.dialog_node).toBe(testDialogNode_update);
      expect(result.conditions).toBe('false');
    });
  });

  describe('deleteDialogNode()', () => {
    it('should delete a dialog node of the workspace', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
        dialogNode: testDialogNode_update,
      };

      const res = await assistant.deleteDialogNode(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });

  describe('deleteWorkspace()', () => {
    it('should delete the workplace', async () => {
      expect(workspace1.workspaceId).toBeTruthy();

      const params = {
        workspaceId: workspace1.workspaceId,
      };

      const res = await assistant.deleteWorkspace(params);
      const { result } = res || {};
      expect(result).toBeDefined();
    });
  });
});
