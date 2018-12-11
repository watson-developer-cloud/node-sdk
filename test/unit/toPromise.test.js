'use strict';

const fs = require('fs');
const path = require('path');
const toPromise = require('../../lib/to-promise');

describe('toPromise()', () => {
  it('should resolve with results buffer as a string', () => {
    const file = fs.createReadStream(path.join(__dirname, '../resources/weather_data_train.csv'));
    // jest doesn't support type matching yet https://github.com/facebook/jest/issues/3457
    return expect(toPromise(file).then(res => typeof res)).resolves.toBe('string');
  });

  it('should resolve with results string as an array', () => {
    const file = fs.createReadStream(path.join(__dirname, '../resources/weather_data_train.csv'));
    file.setEncoding('utf-8');
    return expect(toPromise(file)).resolves.toBeInstanceOf(Array);
  });
});
