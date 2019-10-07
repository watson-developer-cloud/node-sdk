import extend = require('extend');
import { OutgoingHttpHeaders } from 'http';
import { UserOptions } from 'ibm-cloud-sdk-core';
import isStream = require('isstream');
import { Readable } from 'stream';
import { getSdkHeaders } from '../lib/common';
import SynthesizeStream = require('../lib/synthesize-stream');
import GeneratedTextToSpeechV1 = require('./v1-generated');

class TextToSpeechV1 extends GeneratedTextToSpeechV1 {
  constructor(options: UserOptions) {
    super(options);
  }

  /**
   * Repair the WAV header of an audio/wav file in Stream format.
   * The Stream is read into memory, then the data is repaired and returned as a Buffer.
   *
   * @param {Buffer} wavFileAsStream - wave audio as a stream
   * @return {Buffer} wavFileData - a Buffer with the correct header
   */
  repairWavHeaderStream = (wavFileAsStream: Readable): Promise<Buffer> => {
    // in case of accidentally calling the wrong method
    if (!isStream(wavFileAsStream)) {
      return Buffer.isBuffer(wavFileAsStream)
        ? Promise.resolve(this.repairWavHeader(wavFileAsStream))
        : Promise.reject('Expected input data to be a Stream.');
    }

    const buffers: Buffer[] = [];
    return new Promise((resolve, reject) => {
      // stream info to the buffer
      wavFileAsStream.on('data', data => {
        buffers.push(data);
      });

      wavFileAsStream.on('end', () => {
        resolve(this.repairWavHeader(Buffer.concat(buffers)));
      });

      wavFileAsStream.on('error', err => {
        reject(err);
      });
    })
  };

  /**
   * Repair the WAV header of an audio/wav file.
   *
   * @param {Buffer} wavFileData - Wave audio - will be edited in place and returned
   * @return {Buffer} the original Buffer, with the correct header
   */
  repairWavHeader = (wavFileData: Buffer): Buffer => {
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
  synthesizeUsingWebSocket(params: TextToSpeechV1.SynthesizeWebSocketParams): SynthesizeStream {
    const streamParams: SynthesizeStream.Options = extend(
      params,
      {},
      {
        // pass the Authenticator to the SynthesizeStream object
        authenticator: this.getAuthenticator(),
        url: this.baseOptions.url,
        // if the user configured a custom https client, use it in the websocket method
        // let httpsAgent take precedence, default to null
        agent: this.baseOptions.httpsAgent || this.baseOptions.httpAgent || null,
        // allow user to disable ssl verification when using websockets
        disableSslVerification: this.baseOptions.disableSslVerification
      }
    );

    // include analytics headers
    const sdkHeaders = getSdkHeaders('text_to_speech', 'v1', 'synthesizeUsingWebSocket');

    streamParams.headers = extend(
      true,
      sdkHeaders,
      streamParams.headers
    );

    return new SynthesizeStream(streamParams);
  }
}

namespace TextToSpeechV1 {
  export interface SynthesizeWebSocketParams {
    headers?: OutgoingHttpHeaders;

    /* payload options */
    text: string;
    accept: string;
    timings?: string[];

    /* query params */
    accessToken?: string;
    watsonToken?: string;
    voice?: string;
    customizationId?: string;
    xWatsonLearningOptOut?: boolean;
    xWatsonMetadata?: string;
  }
}

export = TextToSpeechV1;
