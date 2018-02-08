'use strict';

var PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2');
var fs = require('fs');

var personalityInsights = new PersonalityInsightsV2({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  url: 'https://gateway.watsonplatform.net/personality-insights/api/'
});

/*
 * English example:
 *   'text' parameter contains the input text.
 */
personalityInsights.profile(
  {
    text: 'Enter more than 100 unique words here...'
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
    text: 'Ingrese un texto de más de 100 palabras aquí...',
    language: 'es'
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
    text: 'Ingrese un texto de más de 100 palabras aquí...',
    language: 'es',
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
 * https://console.bluemix.net/docs/services/personality-insights/output-csv.html#outputCSV
 */
personalityInsights
  .profile({
    text: 'Enter more than 100 unique words here...',
    csv: true,
    csv_headers: true
  })
  .pipe(fs.createWriteStream('./output.csv'));
