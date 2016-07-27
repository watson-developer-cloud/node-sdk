// notes:
//
// * This file is bundled by exprss-browserify into bundle.js
//
// * The require('watson-developer-cloud/language_translator/v2') could also be written as require('watson-developer-cloud').LanguageTranslatorV2,
//   but that version results in a much larger bundle size.
//
// * Tokens expire after 1 hour. This demo simply fetches a new one for each translation rather than keeping a fresh one.
//
// * fetch() is a modern version of XMLHttpRequest. A pollyfill is available for older browsers: https://github.com/github/fetch

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var btn = document.getElementById('analyze-btn');
var input = document.getElementById('input');
var output = document.getElementById('output');

/**
 * @return {Promise<String>} returns a promise that resolves to a string token
 */
function getToken() {
  return fetch('/api/token/tone_analyzer').then(function(response) {
    return response.text();
  })
}

function analyze(token) {
  var toneAnalyzer = new ToneAnalyzerV3({token: token, version_date:'2016-05-19'});
  toneAnalyzer.tone({
    text: input.value
  }, function(err, result) {
    if (err) {
      output.innerHTML = err;
      return console.log(err);
    }
    output.innerHTML = JSON.stringify(result, null, 2);
  });
}

btn.onclick = function() {
  getToken().then(analyze);
};
