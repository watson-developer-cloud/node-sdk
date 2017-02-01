const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('../natural-language-understanding/v1.js');

const auth = {username: '<USERNAME>',password: '<PASSWORD>'};
const nlu = new NaturalLanguageUnderstandingV1(auth);

const query = new nlu.QueryBuilder();

const filename = '../test/resources/natural_language_classifier/energy-policy.html';
fs.readFile(filename, 'utf-8', (file_error, file_data) => {
  if (file_error) {
    console.log(file_error);
  } else {
    const q = query.withHtmlString(file_data).getAllFeatures();
    const res = nlu.analyze(q, (err, fetchresult) =>
      {
        console.log(fetchresult);
        if (err) {
          console.log(res);
        }});
      }});
