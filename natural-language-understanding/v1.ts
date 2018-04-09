/**
 * Copyright 2017,2018 IBM All Rights Reserved.
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
import GeneratedNaturalLanguageUnderstandingV1 = require('./v1-generated');

class NaturalLanguageUnderstandingV1 extends GeneratedNaturalLanguageUnderstandingV1 {
  static VERSION_DATE_2016_01_23: string = '2016-01-23';
  static VERSION_DATE_2017_02_27: string = '2017-02-27';

  constructor(options) {
    // For backward compatibility, allow version to be passed in version_date.
    const _options = extend({}, options);
    _options.version = _options.version_date || _options.version;
    super(_options);
  }
}

export = NaturalLanguageUnderstandingV1;
