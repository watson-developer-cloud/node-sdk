'use strict';

var watson = require('watson-developer-cloud');

var machine_translation = watson.machine_translation({
  username: 'INSERT YOUR USERNAME FOR THE CONCEPT EXPANSION SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE CONCEPT EXPANSION SERVICE HERE',
  version: 'v1'
});

machine_translation.translate({
  text: 'A sentence must have a verb', from : 'enus', to: 'eses' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
