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

'user strict';

import { GeneratedLanguageTranslatorV2 } from './v2-generated';
import { getMissingParams } from '../lib/helper';
import * as isStream from 'isstream';

class LanguageTranslatorV2 extends GeneratedLanguageTranslatorV2 {
  constructor(options) {
    // Welp, this is awkward. Originally the rename was *just* a rename, but then (after the SDK was updated,
    // but before the backend was updated), it was decided that the billing should be simplified at the same time.
    // That's a solid improvement, but it means that the SDK now needs to support both services independently,
    // and correcting the default URL here will break older code, so it must be reserved for a major release.
    // todo: consider checking for options.url === LanguageTranslationV2.URL and also throw this warning then.
    // (This probably does't matter since the api didn't change)
    if (!options || !options.url) {
      const err = new Error(
        'LanguageTranslatorV2 currently defaults to the url for LanguageTranslationV2, ' +
          'but this will change in the next major release of the watson-developer-cloud Node.js SDK. ' +
          'Please either specify the url https://gateway.watsonplatform.net/language-translator/api or else use ' +
          'LanguageTranslationV2. ' +
          'See http://www.ibm.com/watson/developercloud/doc/language-translator/migrating.shtml for more details.'
      );
      // eslint-disable-next-line no-console
      console.warn(err);
    }
    super(options);
  }

  getModels(params, callback) {
    return super.listModels(params, callback);
  }

  getModel(params, callback) {
    return super.getModel(params, callback);
  }

  createModel(params, callback) {
    const missingParams = getMissingParams(params, ['base_model_id']);
    if (missingParams) {
      return callback(missingParams);
    }

    const inputTypes: string[] = [
      'forced_glossary',
      'parallel_corpus',
      'monolingual_corpus',
    ];
    inputTypes.forEach(type => {
      if (params[type] && !isStream(params[type])) {
        return callback(new Error(`${type} is not a standard Node.js Stream`));
      }
    });
    return super.createModel(params, callback);
  }

  translate(params, callback) {
    if (!params || !(params.model_id || (params.source && params.target))) {
      return callback(
        new Error('Missing required parameters: model_id or source and target')
      );
    }
    return super.translate(params, callback);
  }

  getIdentifiableLanguages(params, callback) {
    return super.listIdentifiableLanguages(params, callback);
  }
}

export = LanguageTranslatorV2;
