'use strict';

const contentType = require('../../lib/content-type');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('contentType', () => {
  it('should return content type from a filename', () => {
    const fname = 'fake.mp3';
    assert(contentType.fromFilename(fname) === 'audio/mp3');
  });
  it('should return content type from a File object', () => {
    const File = {
      name: 'fake.mp3',
    };
    assert(contentType.fromFilename(File) === 'audio/mp3');
  });
  it('should return undefined for an empty input', () => {
    assert(contentType.fromFilename({}) === undefined);
  });
  it('should return content type from a buffer', () => {
    const buffer = fs.readFileSync(path.join(__dirname, '../resources/blank.wav'));
    assert(contentType.fromHeader(buffer) === 'audio/wav');
  });
});
