'use strict';

const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const fs = require('fs');

const personality_insights = new PersonalityInsightsV3({
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
    text: 'Enter more than 100 unique words here...',
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
    text: 'Ingrese un texto de más de 100 palabras aquí...',
    headers: { 'Content-Language': 'es' }
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
    text: 'Ingrese un texto de más de 100 palabras aquí...',
    headers: { 'Content-Language': 'es', 'Accept-Language': 'es' }
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
 * https://www.ibm.com/watson/developercloud/doc/personality-insights/output.shtml#outputCSV
 */
personality_insights
  .profile({
    text: 'Enter more than 100 unique words here...',
    csv_headers: true,
    headers: { Accept: 'text/csv' }
  })
  .pipe(fs.createWriteStream('./output.csv'));
