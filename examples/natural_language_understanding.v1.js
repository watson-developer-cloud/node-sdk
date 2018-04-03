'use strict';

var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('../natural-language-understanding/v1.js');
//require('dotenv').config({ silent: true }); //  optional

var nlu = new NaturalLanguageUnderstandingV1({
  // note: if unspecified here, credentials are pulled from environment properties:
  // NATURAL_LANGUAGE_UNDERSTANDING_USERNAME &  NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD
  username: '10c68f92-d22a-4608-8d39-0d98f6e627db',
  password: 'o3NZO2NOp7aY',
  version: '2017-02-27',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

var filename = '../test/resources/natural_language_understanding/energy-policy.html';
fs.readFile(filename, 'utf-8', function(file_error, file_data) {
  if (file_error) {
    console.log(file_error);
  } else {
    var options = {
      html: file_data,
      features: {
        concepts: {},
        keywords: {}
      }
    };
    nlu.analyze(options, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
    });
  }
});
