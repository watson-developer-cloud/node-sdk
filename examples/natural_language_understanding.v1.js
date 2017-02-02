var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('../natural-language-understanding/v1.js');

var auth = {url: 'https://gateway-s.watsonplatform.net/natural-language-understanding/api',
            version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2016_01_23};
var nlu = new NaturalLanguageUnderstandingV1(auth);

var filename = '../test/resources/natural_language_understanding/energy-policy.html';
fs.readFile(filename, 'utf-8', function(file_error, file_data) {
  if (file_error) {
    console.log(file_error);
  } else {
    var options = { 'html': file_data,
    'features': {
      'concepts': {},
      'keywords': {},
      }
    };
    var res = nlu.analyze(options, function(err, fetchresult)
      {
        console.log(fetchresult);
        if (err) {
          console.log(res);
        }});
      }});
