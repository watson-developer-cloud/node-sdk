import { extname } from 'path';

// This module attempts to identify common content-types based on the filename or header
// It is not exhaustive, and for best results, you should always manually specify the content-type option.
// See the complete list of supported content-types at
// https://console.bluemix.net/docs/services/speech-to-text/input.html#formats

// *some* file types can be identified by the first 3-4 bytes of the file
const headerContentTypes: { [key: string]: string } = {
  fLaC: 'audio/flac',
  RIFF: 'audio/wav',
  OggS: 'audio/ogg',
  ID3: 'audio/mp3',
  '\u001aEߣ': 'audio/webm' // String for first four hex's of webm: [1A][45][DF][A3] (https://www.matroska.org/technical/specs/index.html#EBML)
};

const filenameContentTypes: { [key: string]: string } = {
  '.mp3': 'audio/mp3',
  '.wav': 'audio/wav',
  '.flac': 'audio/flac',
  '.ogg': 'audio/ogg',
  '.oga': 'audio/ogg',
  '.opus': 'audio/ogg; codec=opus',
  '.webm': 'audio/webm'
};

/**
 * Takes the beginning of an audio file and returns the associated content-type / mime type
 *
 * @param {Buffer} buffer with at least the first 4 bytes of the file
 * @return {String|undefined} - the contentType of undefined
 */
export function fromHeader(buffer: Buffer): string {
  var headerStr = buffer
    .slice(0, 4)
    .toString()
    .substr(0, 4);
  // mp3's are only consistent for the first 3 characters
  return (
    headerContentTypes[headerStr] || headerContentTypes[headerStr.substr(0, 3)]
  );
}

/**
 * Guess the content type from the filename
 *
 * Note: Blob and File objects include a .type property, but we're ignoring it because it's frequently either
 * incorrect (e.g. video/ogg instead of audio/ogg) or else a different format than what's expected (e.g. audio/x-wav)
 *
 * @param {String|Blob|File} file - string filename or url, or binary File/Blob object
 * @return {String|undefined}
 */
export function fromFilename(file: String | Blob | File): string {
  const ext: string = extname(
    (typeof file === 'string' && file) || file['name'] || ''
  );
  return filenameContentTypes[ext];
}
