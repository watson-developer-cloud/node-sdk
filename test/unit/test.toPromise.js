'use strict';

const toPromise = require('../../lib/to-promise');
const fs = require('fs');
const assert = require('assert');
const path = require('path');

describe('toPromise()', () => {
  it('should resolve with results buffer as a string', () => {
    const file = fs.createReadStream(path.join(__dirname, '../resources/weather_data_train.csv'));
    toPromise(file)
      .then(res => {
        assert(typeof res === 'string');
      })
      .catch(err => {
        assert(false);
      });
  });
  it('should resolve with results string as an array', () => {
    const file = fs.createReadStream(path.join(__dirname, '../resources/weather_data_train.csv'));
    file.setEncoding('utf-8');
    toPromise(file)
      .then(res => {
        assert(res instanceof Array);
      })
      .catch(err => {
        assert(false);
      });
  });
});
