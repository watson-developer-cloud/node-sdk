'use strict';

var watson = require('watson-developer-cloud');

var personality_insights = watson.personality_insights({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v2'
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
 * https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/output.shtml#outputCSV
 */
personality_insights.profile({
    text: 'Enter more than 100 unique words here...',
    csv: true,
    csv_headers: true
  }).pipe(fs.createWriteStream('./output.csv'));
