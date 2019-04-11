'use strict';
require('dotenv').config();

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');

/**
 * Instantiate the Watson Language Translator Service
 */
const languageTranslator = new LanguageTranslatorV3({
  username: process.env.LANGUAGE_TRANSLATOR_USERNAME || '<language_translator_username>',
  password: process.env.LANGUAGE_TRANSLATOR_PASSWORD || '<language_translator_password>',
  version: '2019-01-10'
});

const params = {
  text: "Hello, this is a example of translating language with Watson.",
  source: 'en',
  target: 'es',
}

// return the body - primary use case

languageTranslator.translate(params)
  .then(body => {
    console.log(JSON.stringify(body, null, 2));
    console.log('\n');
  })
  .catch(err => {
    console.log(err);
  });

// return the entire response - in the case that more
// information (such as response headers) is required

params.return_response = true;

languageTranslator.translate(params)
  .then(res => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch(err => {
    console.log(err);
  });
