'use strict';

var watson = require('watson-developer-cloud');

var relationship_extraction = watson.relationship_extraction({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1'
});

relationship_extraction.extract({
  text: 'IBM Watson developer cloud',
  dataset: 'ie-en-news' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
