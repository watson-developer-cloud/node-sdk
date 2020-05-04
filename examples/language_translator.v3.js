const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');

/**
 * Instantiate the Watson Language Translator Service
 */
const languageTranslator = new LanguageTranslatorV3({
  // See: https://github.com/watson-developer-cloud/node-sdk#authentication
  version: '2018-05-01',
});

languageTranslator
  .translate({
    text: 'Hello, this is a example of translating language with Watson.',
    source: 'en',
    target: 'es',
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(error => console.error(error));
