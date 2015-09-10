/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
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

'use strict';

module.exports = {

  stripTrailingSlash: function(url) {
    // Match a forward slash / at the end of the string ($)
    return url.replace(/\/$/, '');
  },

  getMissingParams: function(params, requires) {

    if (!requires) {
      return null;
    } else if (!params) {
      return requires;
    }

    var missing = [];

    requires.forEach(function(require) {
      if (!params[require])
        missing.push(require);
    });
    return missing.length > 0 ? missing : null;
  },

  /**
   * Return true if 'text' is html
   * @param  {String}  text The 'text' to analyze
   * @return {Boolean}      true if 'text' has html tags
   */
  isHTML: function (text){
    return /<[a-z][\s\S]*>/i.test(text);
  },

  /**
   * Returns the first match from formats that is key the params map
   * otherwise null
   * @param  {Object}  params   The parameters
   * @param  {Array}  requires The keys we want to check
    */
  getFormat: function(params, formats) {
    if (!formats || !params)
      return null;

    for(var i = 0; i < formats.length; i++) {
      if (formats[i] in params)
        return formats[i];
    }
    return null;
  }
};
