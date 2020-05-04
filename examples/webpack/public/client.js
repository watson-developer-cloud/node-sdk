/* eslint-disable require-jsdoc */
'use strict';
// notes:
//
// * This file is bundled by webpack-dev-middleware into bundle.js
//
// * The require('ibm-watson/language_translator/v3') could also be written as require('ibm-watson').LanguageTranslatorV3,
//   but that version results in a much larger bundle size.
//
// * Tokens expire after 1 hour. This demo simply fetches a new one for each translation rather than keeping a fresh one.
//
// * fetch() is a modern version of XMLHttpRequest. A pollyfill is available for older browsers: https://github.com/github/fetch

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { BearerTokenAuthenticator } = require('ibm-watson/auth');

const btn = document.getElementById('analyze-btn');
const input = document.getElementById('input');
const output = document.getElementById('output');

/**
 * @return {Promise<String>} returns a promise that resolves to a string token
 */
function getToken() {
  return fetch('/api/token').then(resp => resp.json());
}

function analyze(credentials) {
  const toneAnalyzer = new ToneAnalyzerV3({
    authenticator: new BearerTokenAuthenticator({
      bearerToken: credentials.accessToken,
    }),
    url: credentials.url,
    version: '2016-05-19',
  });
  toneAnalyzer
    .tone({
      toneInput: { text: input.value },
      contentType: 'application/json',
    })
    .then(({ result }) => {
      output.innerHTML = JSON.stringify(result, null, 2);
    })
    .catch(error => {
      output.innerHTML = error;
    });
}

btn.onclick = function () {
  getToken().then(analyze);
};
