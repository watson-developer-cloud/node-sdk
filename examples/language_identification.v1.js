'use strict';

var watson = require('watson-developer-cloud');

var language_identification = watson.language_identification({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1'
});

language_identification.identify({
  text: 'The language identification service takes text input and identifies the language used.' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
