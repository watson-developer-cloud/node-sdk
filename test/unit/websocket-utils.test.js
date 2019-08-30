/**
 * (C) Copyright IBM Corp. 2019.
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

const { processUserParameters } = require('../../lib/websocket-utils');

describe('websocket utility functions', () => {
  describe('processUserParameters', () => {
    it('should convert parameters from camelcase to intended values', () => {
      const intendedValues = [
        'kebab-case',
        'snake_case',
        'camelCase',
        'lowercase',
        'mIxED_CaSe',
        'unused_param',
      ];
      const userOptions = {
        kebabCase: 'some value',
        snakeCase: 'some value',
        camelCase: 'some value',
        lowercase: 'some value',
        mIxEdCaSe: 'some value',
        notInTheList: 'some value',
      };
      const processedValues = processUserParameters(userOptions, intendedValues);
      Object.keys(processedValues).forEach(param => {
        expect(intendedValues).toContain(param);
      });
      expect(processedValues).toEqual({
        'kebab-case': 'some value',
        snake_case: 'some value',
        camelCase: 'some value',
        lowercase: 'some value',
        mIxED_CaSe: 'some value',
      });
    });

    it('should warn the user if they provide the service name for a parameter', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const intendedValues = ['kebab-case', 'snake_case'];
      const userOptions = {
        kebabCase: 'some value',
        snake_case: 'some value',
        notInTheList: 'some value',
      };
      const processedValues = processUserParameters(userOptions, intendedValues);
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy.mock.calls[0][0]).toBe(
        'Unrecognized parameter: "snake_case". Did you mean "snakeCase"?'
      );
      expect(processedValues['kebab-case']).toBe('some value');
      expect(Object.keys(processedValues).length).toBe(1);
      consoleSpy.mockRestore();
    });
  });
});
