'use strict';

const contentType = require('../../lib/content-type');
const fs = require('fs');
const path = require('path');

describe('contentType', () => {
  const mp3 = 'audio/mp3';
  const wav = 'audio/wav';

  it('should return content type from a filename', () => {
    const fname = 'fake.mp3';
    expect(contentType.fromFilename(fname)).toBe(mp3);
  });

  it('should return content type from a File object', () => {
    const File = { name: 'fake.mp3' };
    expect(contentType.fromFilename(File)).toBe(mp3);
  });

  it('should return undefined for an empty input', () => {
    expect(contentType.fromFilename({})).toBeUndefined();
  });

  it('should return content type from a buffer', () => {
    const buffer = fs.readFileSync(path.join(__dirname, '../resources/blank.wav'));
    expect(contentType.fromHeader(buffer)).toBe(wav);
  });
});
