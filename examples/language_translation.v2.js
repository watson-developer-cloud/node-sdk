'use strict';

var watson = require('watson-developer-cloud');
var fs     = require('fs');

var language_translation = watson.language_translation({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v2'
});

language_translation.translate({
  text: 'A sentence must have a verb', source : 'en', target: 'es' },
  function (err, translation) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(translation, null, 2));
});


// Create a translation model using a tmx file
language_translation.createModel({
    base_model_id: 'en-fr',
    name:'my-model',
    forced_glossary: fs.createReadStream('resources/glossary.tmx')
  }, function (err, model) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(model, null, 2));
});
