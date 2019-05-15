'use strict';

var PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
var fs = require('fs');

var personalityInsights = new PersonalityInsightsV3({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: '2016-10-19',
  url: 'https://gateway.watsonplatform.net/personality-insights/api/'
});

/*
 * English example:
 *   'text' parameter contains the input text.
 */
personalityInsights.profile(
  {
    content: 'Enter more than 100 unique words here...',
    content_type: 'text/plain',
    consumption_preferences: true
  },
  function(err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);

/*
 * Spanish example:
 *   'language' parameter is needed in 'es' since our
 *   text content is in Spanish.
 */
personalityInsights.profile(
  {
    content: 'Ingrese un texto de más de 100 palabras aquí...',
    content_type: 'text/plain',
    content_language: 'es'
  },
  function(err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);

/*
 * Requesting output in an specific language:
 *   Following the Spanish Example, now we would like to
 *   obtain the output in Spanish, i.e. all the trait
 *   names and output messages in Spanish. You can specify
 *   the expected language by passing 'accept_language'
 *   parameter with the locale.
 */
personalityInsights.profile(
  {
    content: 'Ingrese un texto de más de 100 palabras aquí...',
    content_type: 'text/plain',
    content_language: 'es',
    accept_language: 'es'
  },
  function(err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);

/*
 * CSV output example:
 * https://cloud.ibm.com/docs/services/personality-insights?topic=personality-insights-outputCSV#outputCSV
 */
personalityInsights
  .profileAsCsv(
  {
    content: 'Enter more than 100 unique words here...',
    content_type: 'text/plain',
    csv_headers: true
  },
  (err, res) => {
    if (err) {
      console.log('error:', err);
    } else {
      fs.writeFileSync('./output.csv', res);
    }
  });
