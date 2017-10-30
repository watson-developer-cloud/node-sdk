'use strict';

const assert = require('assert');
const fs = require('fs');
const buildRequestFileObject = require('../../lib/helper').buildRequestFileObject;
const path = require('path');

describe('buildRequestFileObject', function() {
  it('should return correct result for stream fileparam and single producer', function() {
    const fileParams = {
      data: fs.createReadStream(__dirname + '../resources/weather_data_train.csv'),
      contentType: 'text/csv'
    };
    const fileRequestObject = buildRequestFileObject(fileParams);
    assert.strictEqual(fileRequestObject.options.filename, 'weather_data_train.csv');
    assert.strictEqual(fileRequestObject.options.contentType, 'text/csv');
  });
  it('should return correct result for stream fileparam and multiple producer without user provided content type', function() {
    const fileParams = {
      data: fs.createReadStream(path.join(__dirname, '../resources/weather_data_train.csv')),
      contentType: null
    };
    const fileRequestObject = buildRequestFileObject(fileParams);
    assert.strictEqual(fileRequestObject.options.filename, 'weather_data_train.csv');
    assert.strictEqual(fileRequestObject.options.contentType, 'text/csv');
  });
  it('should return correct result for form-data input without user-provided filename', function() {
    const fileParams = {
      data: {
        value: fs.createReadStream(path.join(__dirname, '../resources/weather_data_train.csv')),
        options: {
          contentType: 'img/png'
        }
      },
      contentType: 'application/csv'
    };
    const fileRequestObject = buildRequestFileObject(fileParams);
    assert.strictEqual(fileRequestObject.options.filename, null);
    assert.strictEqual(fileRequestObject.options.contentType, 'img/png');
  });
  it('should return correct result for form-data input with user-provided filename', function() {
    const fileParams = {
      data: {
        value: fs.createReadStream(path.join(__dirname + '../resources/weather_data_train.csv')),
        options: {
          filename: 'hello.csv'
        }
      },
      contentType: null
    };
    const fileRequestObject = buildRequestFileObject(fileParams);
    assert.strictEqual(fileRequestObject.options.filename, 'hello.csv');
    assert.strictEqual(fileRequestObject.options.contentType, 'text/csv');
  });
  it('should return correct result with form-data input without user-provided filename or content type', function() {
    const fileParams = {
      data: {
        value: fs.createReadStream(path.join(__dirname, '../resources/weather_data_train.csv')),
        options: {}
      }
    };
    const fileRequestObject = buildRequestFileObject(fileParams);
    assert.strictEqual(fileRequestObject.options.filename, null);
    assert.strictEqual(fileRequestObject.options.contentType, 'text/csv');
  });
  it('should return correct result for buffer fileparam and multiple producers without user-provided content type', function() {
    const fileParams = {
      data: fs.readFileSync(path.join(__dirname, '../resources/weather_data_train.csv')),
      contentType: null
    };
    const fileRequestObject = buildRequestFileObject(fileParams);
    assert.strictEqual(fileRequestObject.options.filename, null);
    assert.strictEqual(fileRequestObject.options.contentType, 'application/octet-stream');
  });
  it('should return correct result for string fileparam and single producer', function() {
    const fileParams = {
      data: fs.readFileSync(path.join(__dirname, '../resources/discovery-sampleAddConf.json')).toString(),
      contentType: 'application/json'
    };
    const fileRequestObject = buildRequestFileObject(fileParams);
    assert.strictEqual(fileRequestObject.options.filename, null);
    assert.strictEqual(fileRequestObject.options.contentType, 'application/json');
  });
  it('should return correct result for stream fileparam and undefined content type', function() {
    const fileParams = {
      data: fs.createReadStream(path.join(__dirname, '../resources/discovery-sampleAddConf.json'))
    };
    const fileRequestObject = buildRequestFileObject(fileParams);
    assert.strictEqual(fileRequestObject.options.filename, 'discovery-sampleAddConf.json');
    assert.strictEqual(fileRequestObject.options.contentType, 'application/json');
  });
});
