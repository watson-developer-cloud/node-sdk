'use strict';

var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var fs = require('fs');

var personality_insights = new PersonalityInsightsV3({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version_date: '2016-10-19'
});

/*
 * English example:
 *   'text' parameter contains the input text.
 */
personality_insights.profile(
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
personality_insights.profile(
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
personality_insights.profile(
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
 * https://console.bluemix.net/docs/services/personality-insights/output-csv.html#outputCSV
 */
personality_insights
  .profile_csv({
    content: 'Enter more than 100 unique words here...',
    content_type: 'text/plain',
    csv_headers: true
  })
  .pipe(fs.createWriteStream('./output.csv'));
