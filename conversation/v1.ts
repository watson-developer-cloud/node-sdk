/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import extend = require('extend');
import { getMissingParams } from '../lib/helper';
import GeneratedConversationV1 = require('./v1-generated');

class ConversationV1 extends GeneratedConversationV1 {
  static VERSION_DATE_2017_05_26: string = '2017-05-26';

  static VERSION_DATE_2017_04_21: string = '2017-04-21';

  static VERSION_DATE_2017_02_03: string = '2017-02-03';

  static VERSION_DATE_2016_09_20: string = '2016-09-20';

  static VERSION_DATE_2016_07_11: string = '2016-07-11';

  private static removedError: Error = new Error(
    'This endpoint has been deprecated.'
  );

  constructor(options) {
    // For backward compatibility, allow version to be passed in version_date.
    const _options = extend({}, options);
    _options.version = _options.version_date || _options.version;
    super(_options);
  }

  workspaceStatus(params, callback) {
    console.warn(ConversationV1.removedError);
  }

  getIntents(params, callback) {
    console.warn("WARNING: getIntents() was renamed to listIntents(). Support for getIntents() will be removed in the next major release");
    return super.listIntents(params, callback);
  }

  updateIntent(params, callback) {
    if (
      params &&
      (params.new_intent ||
        params.new_description ||
        params.new_examples ||
        (params.intent && !params.old_intent))
    ) {
      return super.updateIntent(params, callback);
    }

    const requiredParams = ['workspace_id', 'old_intent', 'intent'];
    const missingParams = getMissingParams(params, requiredParams);
    if (missingParams) { return callback(missingParams); }

    const newParams = extend({}, params);
    newParams.intent = params.old_intent;
    newParams.new_intent = params.intent;
    newParams.new_description = params.description;
    newParams.new_examples = params.examples;

    return super.updateIntent(newParams, callback);
  }

  getExamples(params, callback) {
    console.warn("WARNING: getExamples() was renamed to listExamples(). Support for getExamples() will be removed in the next major release");
    return super.listExamples(params, callback);
  }

  updateExample(params, callback) {
    if (params && (params.new_text || (params.text && !params.old_text))) {
      return super.updateExample(params, callback);
    }

    const requiredParams = ['workspace_id', 'intent', 'old_text', 'text'];
    const missingParams = getMissingParams(params, requiredParams);
    if (missingParams) { return callback(missingParams); }

    const newParams = extend({}, params);
    newParams.text = params.old_text;
    newParams.new_text = params.text;

    return super.updateExample(newParams, callback);
  }

  getCounterExamples(params, callback) {
    console.warn("WARNING: getCounterExamples() was renamed to listCounterExamples(). Support for getCounterExamples() will be removed in the next major release");
    return super.listCounterexamples(params, callback);
  }

  createCounterExample(params, callback) {
    return super.createCounterexample(params, callback);
  }

  deleteCounterExample(params, callback) {
    return super.deleteCounterexample(params, callback);
  }

  getCounterExample(params, callback) {
    return super.getCounterexample(params, callback);
  }

  updateCounterExample(params, callback) {
    if (params && (params.new_text || (params.text && !params.old_text))) {
      return super.updateCounterexample(params, callback);
    }

    const requiredParams = ['workspace_id', 'old_text', 'text'];
    const missingParams = getMissingParams(params, requiredParams);
    if (missingParams) { return callback(missingParams); }

    const newParams = extend({}, params);
    newParams.text = params.old_text;
    newParams.new_text = params.text;

    return super.updateCounterexample(newParams, callback);
  }

  getEntities(params, callback) {
    console.warn("WARNING: getEntities() was renamed to listEntities(). Support for getEntities() will be removed in the next major release");
    return super.listEntities(params, callback);
  }

  updateEntity(params, callback) {
    if (
      params &&
      (params.new_entity ||
        params.new_description ||
        params.new_metadata ||
        params.new_fuzzy_match ||
        params.new_values ||
        (params.entity && !params.old_entity))
    ) {
      return super.updateEntity(params, callback);
    }

    const requiredParams = ['workspace_id', 'old_entity', 'entity'];
    const missingParams = getMissingParams(params, requiredParams);
    if (missingParams) { return callback(missingParams); }

    const newParams = extend({}, params);
    newParams.entity = params.old_entity;
    newParams.new_entity = params.entity;
    newParams.new_description = params.description;
    newParams.new_metadata = params.metadata;
    newParams.new_fuzzy_match = params.fuzzy_match;
    newParams.new_values = params.values;

    return super.updateEntity(newParams, callback);
  }

  getValues(params, callback) {
    console.warn("WARNING: getValues() was renamed to listValues(). Support for getValues() will be removed in the next major release");
    return super.listValues(params, callback);
  }

  updateValue(params, callback) {
    if (
      params &&
      (params.new_value ||
        params.new_metadata ||
        params.new_type ||
        params.new_synonyms ||
        params.new_patterns ||
        (params.value && !params.old_value))
    ) {
      return super.updateValue(params, callback);
    }

    const requiredParams = ['workspace_id', 'entity', 'old_value', 'value'];
    const missingParams = getMissingParams(params, requiredParams);
    if (missingParams) { return callback(missingParams); }

    const newParams = extend({}, params);
    newParams.value = params.old_value;
    newParams.new_value = params.value;
    newParams.new_metadata = params.metadata;
    newParams.new_type = params.type;
    newParams.new_synonyms = params.synonyms;
    newParams.new_patterns = params.patterns;

    return super.updateValue(newParams, callback);
  }

  getSynonyms(params, callback) {
    console.warn("WARNING: getSynonyms() was renamed to listSynonyms(). Support for getSynonyms() will be removed in the next major release");
    return super.listSynonyms(params, callback);
  }

  updateSynonym(params, callback) {
    if (params && (params.new_synonym || !params.old_synonym)) {
      return super.updateSynonym(params, callback);
    }

    const requiredParams = [
      'workspace_id',
      'entity',
      'value',
      'old_synonym',
      'synonym'
    ];
    const missingParams = getMissingParams(params, requiredParams);
    if (missingParams) { return callback(missingParams); }

    const newParams = extend({}, params);
    newParams.synonym = params.old_synonym;
    newParams.new_synonym = params.synonym;

    return super.updateSynonym(newParams, callback);
  }

  getLogs(params, callback) {
    console.warn("WARNING: getLogs() was renamed to listLogs(). Support for getLogs() will be removed in the next major release");
    return super.listLogs(params, callback);
  }

  createDialogNode(params, callback) {
    const newParams = extend({}, params);
    if (params && params.type && !newParams.node_type) {
      newParams.node_type = params.type;
    }
    return super.createDialogNode(newParams, callback);
  }

  getDialogNodes(params, callback) {
    console.warn("WARNING: getDialogNodes() was renamed to listDialogNodes(). Support for getDialogNodes() will be removed in the next major release");
    return super.listDialogNodes(params, callback);
  }

  updateDialogNode(params, callback) {
    if (
      params &&
      (params.new_dialog_node ||
        params.new_description ||
        params.new_conditions ||
        params.new_parent ||
        params.new_previous_sibling ||
        params.new_output ||
        params.new_context ||
        params.new_metadata ||
        params.new_next_step ||
        params.new_title ||
        params.new_type ||
        params.new_event_name ||
        params.new_variable ||
        params.new_actions ||
        (params.dialog_node && !params.old_dialog_node))
    ) {
      return super.updateDialogNode(params, callback);
    }

    const requiredParams = ['workspace_id', 'old_dialog_node', 'dialog_node'];
    const missingParams = getMissingParams(params, requiredParams);
    if (missingParams) { return callback(missingParams); }

    const newParams = extend({}, params);
    newParams.dialog_node = params.old_dialog_node;
    newParams.new_dialog_node = params.dialog_node;
    newParams.new_description = params.description;
    newParams.new_conditions = params.conditions;
    newParams.new_parent = params.parent;
    newParams.new_previous_sibling = params.previous_sibling;
    newParams.new_output = params.output;
    newParams.new_context = params.context;
    newParams.new_metadata = params.metadata;
    newParams.new_next_step = params.next_step;
    newParams.new_title = params.title;
    newParams.new_type = params.type;
    newParams.new_event_name = params.event_name;
    newParams.new_variable = params.variable;
    newParams.new_actions = params.actions;

    return super.updateDialogNode(newParams, callback);
  }
}

export = ConversationV1;
