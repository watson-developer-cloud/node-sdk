'use strict';

var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
require('dotenv').config({ silent: true }); //  optional

var nlu = new NaturalLanguageUnderstandingV1({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  // iam_apikey: 'INSERT YOUR IAM API KEY HERE',
  version: '2020-04-30',
});

var filename = '../test/resources/natural_language_understanding/energy-policy.html';
fs.readFile(filename, 'utf-8', function (file_error, file_data) {
  if (file_error) {
    console.log(file_error);
  } else {
    var options = {
      html: file_data,
      features: {
        concepts: {},
        keywords: {},
      },
    };
    nlu.analyze(options, function (err, res) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
    });
  }
});
