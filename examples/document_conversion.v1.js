'use strict';

var watson = require('watson-developer-cloud');
var fs = require('fs');

var document_conversion = watson.document_conversion({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1',
  version_date: '2015-12-01'
});

// convert a single document
document_conversion.convert({
  // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT
  file: fs.createReadStream(__dirname + '/resources/example.html'),
  conversion_target: document_conversion.conversion_target.ANSWER_UNITS,
  config: {
    // split the html file by "h2", "h3" and "h4" tags
    html_to_answer_units: {
      selectors: [ 'h2','h3', 'h4']
    }
  }
}, function (err, response) {
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }
});
