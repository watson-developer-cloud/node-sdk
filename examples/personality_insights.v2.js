'use strict';

var PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2');
var fs     = require('fs');

var personality_insights = new PersonalityInsightsV2({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

/*
 * English example:
 *   'text' parameter contains the input text.
 */
personality_insights.profile({
  text: 'Enter more than 100 unique words here...' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});

/*
 * Spanish example:
 *   'language' parameter is needed in 'es' since our
 *   text content is in Spanish.
 */
personality_insights.profile({
  text: 'Ingrese un texto de más de 100 palabras aquí...',
  language: 'es'},
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});

/*
 * Requesting output in an specific language:
 *   Following the Spanish Example, now we would like to
 *   obtain the output in Spanish, i.e. all the trait
 *   names and output messages in Spanish. You can specify
 *   the expected language by passing 'accept_language'
 *   parameter with the locale.
 */
personality_insights.profile({
  text: 'Ingrese un texto de más de 100 palabras aquí...',
  language: 'es',
  accept_language: 'es'},
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});


/*
 * CSV output example:
 * https://www.ibm.com/watson/developercloud/doc/personality-insights/output.shtml#outputCSV
 */
personality_insights.profile({
    text: 'Enter more than 100 unique words here...',
    csv: true,
    csv_headers: true
  }).pipe(fs.createWriteStream('./output.csv'));
