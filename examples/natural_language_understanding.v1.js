'use strict';

const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');

const nlu = new NaturalLanguageUnderstandingV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  version: '2019-07-12',
});

const filename = './resources/watson-wikipedia.html';
fs.readFile(filename, 'utf-8', function (error, data) {
  if (error) {
    console.log(error);
  } else {
    const options = {
      html: data,
      features: {
        concepts: {},
        keywords: {},
      },
    };
    nlu
      .analyze(options)
      .then(response => {
        console.log(JSON.stringify(response.result, null, 2));
      })
      .catch(error => console.error(error));
  }
});
