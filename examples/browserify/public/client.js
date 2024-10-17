/* eslint-disable require-jsdoc */
'use strict';
// notes:
//
// * This file is bundled by exprss-browserify into bundle.js
//
// * The require('ibm-watson/language_translator/v3') could also be written as require('ibm-watson').LanguageTranslatorV3,
//   but that version results in a much larger bundle size.
//
// * Tokens expire after 1 hour. This demo simply fetches a new one for each translation rather than keeping a fresh one.
//
// * fetch() is a modern version of XMLHttpRequest. A pollyfill is available for older browsers: https://github.com/github/fetch

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { BearerTokenAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');

const btn = document.getElementById('analyze-btn');

/**
 * @return {Promise<String>} returns a promise that resolves to a string token
 */
function getToken() {
  return fetch('/api/token').then(resp => resp.json());
}

function analyze(credentials) {
  const textToSpeech = new TextToSpeechV1({
    authenticator: new BearerTokenAuthenticator({
      bearerToken: credentials.accessToken,
    }),
    url: credentials.url,
    version: '2023-03-31',
  });

  const synthesizeParams = {
    text: 'Hello from IBM Watson',
    accept: 'audio/mp3',
    voice: 'en-US_AllisonVoice',
  };

  textToSpeech
    .synthesize(synthesizeParams)
    .then(response => {
      const audio = response.result;
      audio.pipe(fs.createWriteStream('hello_world.mp3'));
    })
    .catch(err => {
      console.log('error:', err);
    });
}

btn.onclick = function () {
  getToken().then(analyze);
};
