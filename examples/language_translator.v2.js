'use strict';

var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
var fs     = require('fs');

var language_translator = new LanguageTranslatorV2({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

language_translator.translate({
  text: 'A sentence must have a verb', source : 'en', target: 'es' },
  function (err, translation) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(translation, null, 2));
});


// Create a translation model using a tmx file
language_translator.createModel({
    base_model_id: 'en-fr',
    name:'my-model',
    forced_glossary: fs.createReadStream('resources/glossary.tmx')
  }, function (err, model) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(model, null, 2));
});
