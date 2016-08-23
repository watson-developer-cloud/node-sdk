'use strict';

var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
var alchemy_language = new AlchemyLanguageV1({
  api_key: 'API_KEY'
});

// Combined call
// ------------
var parameters = {
  extract: 'entities,keywords',
  sentiment: 1,
  maxRetrieve: 1,
  url: 'https://www.ibm.com/us-en/'
};

alchemy_language.combined(parameters, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});


// Authors (using example.html from the same local directory)
// ------------
// var fs = require('fs');
// var html;
// var parameters = {};
// fs.readFile('example.html', 'utf8', function (err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   parameters = {
//     'html': data
//   };
//   alchemy_language.authors(parameters, function (error, response) {
//     if (error)
//       console.log('error:', error);
//     else
//       console.log(JSON.stringify(response, null, 2));
//   })
// });


// Concepts
// ------------
// var parameters = {
//   url: 'http://www.ibm.com/watson',
//   knowledgeGraph: 1
// };
//
// alchemy_language.concepts(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Date Extraction
// ------------
// var parameters = {
//   text: 'Set a reminder for my appointment next Tuesday',
//   anchorDate: '2016-03-22 00:00:00'
// };
//
// alchemy_language.dates(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Emotion Analysis
// ------------
// var parameters = {
//   url: 'http://www.charliechaplin.com/en/synopsis/articles/29-The-Great-Dictator-s-Speech'
// };
//
// alchemy_language.emotion(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Entities
// ------------
// var parameters = {
//   url: 'http://www-03.ibm.com/press/us/en/pressrelease/49384.wss'
// };
//
// alchemy_language.entities(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Feed Detection
// ------------
// var parameters = {
//   url: 'http://news.ycombinator.com'
// };
//
// alchemy_language.feeds(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Keywords
// ------------
// var parameters = {
//   url: 'http://www.twitter.com/ibmwatson'
// };
//
// alchemy_language.keywords(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Language Detection
// ------------
// var parameters = {
//   url: 'http://www.ibm.com/us-en/'
// };
//
// alchemy_language.language(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Microformats
// ------------
// var parameters = {
//   url: 'http://www.ibm.com/us-en/'
// };
//
// alchemy_language.microformats(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Publication date
// ------------
// var parameters = {
//   url: 'https://www.whitehouse.gov/the-press-office/2016/03/19/weekly-address-president-obamas-supreme-court-nomination'
// };
//
// alchemy_language.publicationDate(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Relations
// ------------
// var parameters = {
//   url: 'https://www.whitehouse.gov/the-press-office/2016/03/19/weekly-address-president-obamas-supreme-court-nomination'
// };
//
// alchemy_language.relations(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Typed Relations
// ------------
// var parameters = {
//   url: 'http://www.huffingtonpost.com/2010/06/22/iphone-4-review-the-worst_n_620714.html'
// };
//
// alchemy_language.typedRelations(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Sentiment
// ------------
// var parameters = {
//   text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
// };
//
// alchemy_language.sentiment(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Targeted Sentiment
// ------------
// var parameters = {
//   text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek',
//   targets: [
//     'IBM Watson'
//   ]
// };
//
// alchemy_language.sentiment(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Taxonomy
// ------------
// var parameters = {
//   url: 'cnn.com'
// };
//
// alchemy_language.taxonomy(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Text extraction (cleaned)
// ------------
// var parameters = {
//   url: 'http://techcrunch.com/2016/01/29/ibm-watson-weather-company-sale'
// };
//
// alchemy_language.text(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Text extraction (raw)
// ------------
// var parameters = {
//   url: 'http://techcrunch.com/2016/01/29/ibm-watson-weather-company-sale',
//   raw: true
// };
//
// alchemy_language.text(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });


// Title extraction
// ------------
// var parameters = {
//   url: 'http://techcrunch.com/2016/01/29/ibm-watson-weather-company-sale'
// };
//
// alchemy_language.title(parameters, function (err, response) {
//   if (err)
//     console.log('error:', err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });
