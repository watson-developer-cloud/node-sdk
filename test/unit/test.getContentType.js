'use strict';

const assert = require('assert');
const fs = require('fs');
const getContentType = require('../../lib/helper').getContentType;
const path = require('path');

describe('getContentType', function() {
  it('should return null for empty input', function() {
    const contentType = getContentType(null);
    assert.strictEqual(contentType, null);
  });
  it('should return null for undefined input', function() {
    const contentType = getContentType(undefined);
    assert.strictEqual(contentType, null);
  });
  it('should return null for empty object', function() {
    const contentType = getContentType({});
    assert.strictEqual(contentType, null);
  });
  it('should return application/zip for zip file stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/dark.zip')));
    assert.strictEqual(contentType, 'application/zip');
  });
  it('should return application/zip for zip file buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/dark.zip')));
    assert.strictEqual(contentType, 'application/zip');
  });
  it('should return application/zip for zip file string', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/dark.zip').toString()));
    assert.strictEqual(contentType, 'application/zip');
  });
  it('should return application/pdf for pdf file stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/samplePDF.pdf')));
    assert.strictEqual(contentType, 'application/pdf');
  });
  it('should return application/pdf for pdf file buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/samplePDF.pdf')));
    assert.strictEqual(contentType, 'application/pdf');
  });
  it('should return application/pdf for pdf file string', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/samplePDF.pdf')));
    assert.strictEqual(contentType, 'application/pdf');
  });
  it('should return image/png for a png image stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/car.png')));
    assert.strictEqual(contentType, 'image/png');
  });
  it('should return image/png for a png image buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/car.png')));
    assert.strictEqual(contentType, 'image/png');
  });
  it('should return image/jpeg for a jpeg image stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/obama.jpg')));
    assert.strictEqual(contentType, 'image/jpeg');
  });
  it('should return image/jpeg for a jpeg image buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/obama.jpg')));
    assert.strictEqual(contentType, 'image/jpeg');
  });
  it('should return audio/ogg for an ogg audio stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/weather.ogg')));
    assert.strictEqual(contentType, 'audio/ogg');
  });
  it('should return audio/opus for an ogg,codecs=opus audio buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/weather.ogg')));
    assert.strictEqual(contentType, 'audio/opus');
  });
  it('should return audio/ogg for an ogg audio stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/watson-hi.ogg')));
    assert.strictEqual(contentType, 'audio/ogg');
  });
  it('should return audio/opus for an ogg,codecs=opus audio buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/watson-hi.ogg')));
    assert.strictEqual(contentType, 'audio/opus');
  });
  it('should return audio/wave for a wave audio stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/blank.wav')));
    assert.strictEqual(contentType, 'audio/wave');
  });
  it('should return audio/x-wav for a x-wav audio buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/blank.wav')));
    assert.strictEqual(contentType, 'audio/x-wav');
  });
  it('should return audio/x-flac for a flac audio stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/weather.flac')));
    assert.strictEqual(contentType, 'audio/x-flac');
  });
  it('should return audio/x-flac for a flac audio buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/weather.flac')));
    assert.strictEqual(contentType, 'audio/x-flac');
  });
  it('it should return application/vnd.openxmlformats-officedocument.wordprocessingml.document for a word document stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/sampleWord.docx')));
    assert.strictEqual(contentType, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  });
  it('it should return application/vnd.openxmlformats-officedocument.wordprocessingml.document for a word document buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/sampleWord.docx')));
    assert.strictEqual(contentType, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  });
  it('should return text/html for a html document stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/sampleHtml.html')));
    assert.strictEqual(contentType, 'text/html');
  });
  // TODO submit pull request to fileType to add support for html buffers
  it('should return null for a html document buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/sampleHtml.html')));
    assert.strictEqual(contentType, null);
  });
  it('should return application/xml for a xml document stream', function() {
    const contentType = getContentType(fs.createReadStream(path.join(__dirname, '../resources/pizza.xml')));
    assert.strictEqual(contentType, 'application/xml');
  });
  // TODO: submit pull request to add support to fileType for xml buffers
  it('should return null for a xml document buffer', function() {
    const contentType = getContentType(fs.readFileSync(path.join(__dirname, '../resources/pizza.xml')));
    assert.strictEqual(contentType, null);
  });
});
