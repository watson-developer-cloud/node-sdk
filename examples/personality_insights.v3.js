const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');

const personalityInsights = new PersonalityInsightsV3({
  version: '2017-10-13',
});

personalityInsights
  .profile({
    content: 'Enter more than 100 unique words here...',
    contentType: 'text/plain',
    consumptionPreferences: true,
    rawScores: true,
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
