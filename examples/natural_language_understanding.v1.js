const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('../natural-language-understanding/v1.js');

const auth = {username: process.env['DISCOVERY_USERNAME'] || '<USERNAME>',
              password: process.env['DISCOVERY_PASSWORD'] || '<PASSWORD>',
              version_date: NaturalLanguageUnderstandingV1.VERSION_DATE};
const nlu = new NaturalLanguageUnderstandingV1(auth);

const filename = '../test/resources/natural_language_classifier/energy-policy.html';
fs.readFile(filename, 'utf-8', (file_error, file_data) => {
  if (file_error) {
    console.log(file_error);
  } else {
    const options = { 'html': file_data,
    'features': {
      'concepts': {},
      'keywords': {},
      }
    };
    const res = nlu.analyze(options, (err, fetchresult) =>
      {
        console.log(fetchresult);
        if (err) {
          console.log(res);
        }});
      }});
