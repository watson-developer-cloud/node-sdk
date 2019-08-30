import extend = require('extend');
import { getSdkHeaders } from '../lib/common';
import SynthesizeStream = require('../lib/synthesize-stream');
import GeneratedTextToSpeechV1 = require('./v1-generated');

class TextToSpeechV1 extends GeneratedTextToSpeechV1 {
  constructor(options) {
    super(options);
  }

  /**
   * Repair the WAV header of an audio/wav file.
   *
   * @param {Buffer} wavFileData - Wave audio - will be edited in place and returned
   * @return {Buffer} wavFileData - the original Buffer, with a correct header
   */
  repairWavHeader = (wavFileData) => {
    const totalBytes = wavFileData.length;

    // bytes 4-8 in header give the total file size,
    // after the first 8 bytes
    // this is a reliable constant
    const chunkSize = totalBytes - 8;
    wavFileData.writeInt32LE(chunkSize, 4);

    // the first subchunk is at byte 12, the fmt subchunk
    // this is the only other reliable constant
    let chunkIdOffset = 12;
    const fieldSize = 4;

    // every subchunk has a 4 byte id followed by a 4 byte size field
    let chunkSizeOffset = chunkIdOffset + fieldSize;
    let subchunk2sizeLocation = 0;

    // initialize values to hold data of each chunk we come across
    let tempChunkID = '';
    let tempChunkSize = 0;

    while (tempChunkID !== 'data') {
      if (chunkSizeOffset + fieldSize > totalBytes) {
        break;
      }

      tempChunkID = wavFileData
        .slice(chunkIdOffset, chunkIdOffset + fieldSize)
        .toString('ascii');
      tempChunkSize = wavFileData.readInt32LE(chunkSizeOffset);

      // save the location of the data size field
      if (tempChunkID === 'data') {
        subchunk2sizeLocation = chunkSizeOffset;
      }

      // skip over all the data in the temp chunk
      chunkIdOffset = chunkSizeOffset + fieldSize + tempChunkSize;
      chunkSizeOffset = chunkIdOffset + fieldSize;
    }

    const subchunk2size = totalBytes - subchunk2sizeLocation - fieldSize;

    // update the size of the audio data and return
    wavFileData.writeInt32LE(subchunk2size, subchunk2sizeLocation);

    return wavFileData;
  };

  /**
   * Use the synthesize function with a readable stream over websockets
   *
   * @param {Object} params The parameters
   * @return {SynthesizeStream}
   */
  synthesizeUsingWebSocket(params) {
    params = params || {};
    params.url = this.baseOptions.url;

    // pass the Authenticator to the SynthesizeStream object
    params.authenticator = this.getAuthenticator();

    // if the user configured a custom https client, use it in the websocket method
    // let httpsAgent take precedence, default to null
    params.agent = this._options.httpsAgent || this._options.httpAgent || null;

    // include analytics headers
    const sdkHeaders = getSdkHeaders('text_to_speech', 'v1', 'synthesizeUsingWebSocket');

    params.headers = extend(
      true,
      sdkHeaders,
      params.headers
    );

    // allow user to disable ssl verification when using websockets
    params.disableSslVerification = this.baseOptions.disableSslVerification;

    // SynthesizeStream.main(params);
    return new SynthesizeStream(params);
  }
}

export = TextToSpeechV1;
