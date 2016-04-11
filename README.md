Watson Developer Cloud Node.js SDK
============================================
[![Codacy Badge](https://www.codacy.com/project/badge/9d457db455d846649457bb97b6dea290)](https://www.codacy.com/app/germanattanasio/node-sdk)
[![Build Status](https://secure.travis-ci.org/watson-developer-cloud/node-sdk.svg)](http://travis-ci.org/watson-developer-cloud/node-sdk)
[![Dependency Status](https://gemnasium.com/watson-developer-cloud/node-sdk.svg)](https://gemnasium.com/watson-developer-cloud/node-sdk)
[![codecov.io](https://codecov.io/github/watson-developer-cloud/node-sdk/coverage.svg?branch=master)](https://codecov.io/github/watson-developer-cloud/node-sdk?branch=master)
[![npm-version](https://img.shields.io/npm/v/watson-developer-cloud.svg)](https://www.npmjs.com/package/watson-developer-cloud)
[![npm-downloads](https://img.shields.io/npm/dm/watson-developer-cloud.svg)](https://www.npmjs.com/package/watson-developer-cloud)

Node client library to use the [Watson Developer Cloud][wdc] services, a collection of REST
APIs and SDKs that use cognitive computing to solve complex problems.

## Table of Contents
  * [Breaking Changes for v1.0](#breaking-changes-for-v10)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Getting the Service Credentials](#getting-the-service-credentials)
  * [Questions](#questions)
  * [Examples](#examples)
  * [IBM Watson Services](#ibm-watson-services)
    * [Alchemy Language](#alchemy-language)
    * [Alchemy Vision](#alchemy-vision)
    * [Alchemy Data News](#alchemy-data-news)
    * [Authorization](#authorization)
    * [Concept Expansion](#concept-expansion)
    * [Concept Insights](#concept-insights)
    * [Dialog](#dialog)
    * [Document Conversion](#document-conversion)
    * [Language Translation](#language-translation)
    * [Natural Language Classifier](#natural-language-classifier)
    * [Personality Insights](#personality-insights)
    * [Relationship Extraction](#relationship-extraction)
    * [Retrieve and Rank](#retrieve-and-rank)
    * [Speech to Text](#speech-to-text)
    * [Text to Speech](#text-to-speech)
    * [Tone Analyzer](#tone-analyzer)
    * [Tradeoff Analytics](#tradeoff-analytics)
    * [Visual Insights](#visual-insights)
    * [Visual Recognition](#visual-recognition)
  * [Running in Bluemix](#running-in-bluemix)
  * [Debug](#debug)
  * [Tests](#tests)
  * [Open Source @ IBM](#open-source--ibm)
  * [License](#license)
  * [Contributing](#contributing)

## Breaking Changes for v1.0

Several breaking changes were introduced with the v1.0.0 release:

  * Experimental and Beta services now require the appropriate tag to be added to their version:
    * Concept Expansion `v1` is now `v1-beta`
    * Question and Answer `v1` is now `v1-beta`
    * Relationship Extraction `v1` is now `v1-beta`
    * Tone Analyzer `v2` is now `v2-experimental`
    * Visual Insights `v1` is now `v1-experimental`
    * Visual Recognition `v1` is now `v1-beta`
  * Speech to Text gained a new `createRecognizeStream()` method replacing the existing live streaming methods with a simpler Read/Write stream.
    The older methods are still available in v1.0 but each log a deprecation warning (unless `{silent: true}` is passed in) and will be removed from a future release.
    The affected methods are:
    * `recognizeLive()`
    * `observeResult()`
    * `getRecognizeStatus()`
  * The Document Conversion API has been reduced to a single `convert()` method; it no longer offers batch conversion or cloud storage of files.
  * Several deprecated services have been removed:
    * Message Resonance
    * Tone Analyzer v1 (replaced by v2-experimental)
    * Search (replaced by Retrieve and Rank)
  * Dropped support for node.js v0.10.x (For reference: the WDC Node.js SDK now officially support the latest 0.12, LTS, and Stable releases of Node.js.)


## Installation

```sh
$ npm install watson-developer-cloud --save
```

## Usage

The examples below assume that you already have service credentials. If not,
you will have to create a service in [Bluemix][bluemix].

If you are running your application in Bluemix, you don't need to specify the
credentials; the library will get them for you by looking at the `VCAP_SERVICES` environment variable.

## Getting the Service Credentials
You will need the `username` and `password` (`api_key` for AlchemyAPI) credentials for each service. Service credentials are different from your Bluemix account username and password.

To get your service credentials, follow these steps:
 1. Log in to Bluemix at https://bluemix.net.

 1. Create an instance of the service:
     1. In the Bluemix **Catalog**, select the service you want to use.
     1. Under **Add Service**, type a unique name for the service instance in the Service name field. For example, type `my-service-name`. Leave the default values for the other options.
     1. Click **Create**.

 1. Copy your credentials:
     1. On the left side of the page, click **Service Credentials** to view your service credentials.
     1. Copy `username` and `password`(`api_key` for AlchemyAPI).

## Questions

If you are having difficulties using the APIs or have a question about the IBM
Watson Services, please ask a question on
[dW Answers](https://developer.ibm.com/answers/questions/ask/?topics=watson)
or [Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-watson).

## Examples
The [examples][examples] folder has basic and advanced examples.

## IBM Watson Services
The Watson Developer Cloud offers a variety of services for building cognitive
apps.

### Alchemy Language
[Alchemy Language][alchemy_language] offers 12 API functions as part of its text analysis service, each of which uses sophisticated natural language processing techniques to analyze your content and add high-level semantic information.

Use the [Sentiment Analysis][sentiment_analysis] endpoint to identify positive/negative sentiment within a sample text document.

```javascript
var watson = require('watson-developer-cloud');

var alchemy_language = watson.alchemy_language({
  api_key: '<api_key>'
});

var params = {
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

alchemy_language.sentiment(params, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
```

### Alchemy Vision
[Alchemy Vision][alchemy_vision] uses deep learning innovations to understand a picture's content and context. It sees complex visual scenes in their entirety —without needing any textual clues— leveraging a holistic approach to understanding the multiple objects and surroundings.

Example: Extract keywords from an image.

```javascript
var watson = require('watson-developer-cloud');
var fs = require('fs');

var alchemy_vision = watson.alchemy_vision({
  api_key: '<api_key>'
});

var params = {
  image: fs.createReadStream('src/test/resources/obama.jpg')
};

alchemy_vision.getImageKeywords(params, function (err, keywords) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(keywords, null, 2));
});
```

### Alchemy Data News
[Alchemy Data News][alchemy_data_news] indexes 250k to 300k English language news and blog articles every day with historical search available for the past 60 days.
Example: Get the volume data from the last 7 days using 12hs of time slice.

```javascript
var watson = require('watson-developer-cloud');

var alchemy_data_news = watson.alchemy_data_news({
  api_key: '<api_key>'
});

var params = {
  start: 'now-1d',
  end: 'now'
};

alchemy_data_news.getNews(params, function (err, news) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(news, null, 2));
});
```

### Authorization
The Authorization service can generates tokens, this are useful when it's too cumbersome to provide a username/password pair.
Tokens are valid for 1 hour and need to be send using the `X-Watson-Authorization-Token` header.

```javascript
var watson = require('watson-developer-cloud');

var authorization = watson.authorization({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

var params = {
  // URL of the resource you wish to access
  url: 'https://stream.watsonplatform.net/text-to-speech/api'
};

authorization.getToken(params, function (err, token) {
  if (!token) {
    console.log('error:', err);
  } else {
    // Use your token here
  }
});
```

### Concept Expansion
The Watson [Concept Expansion][concept_expansion] Service will be withdrawn. The Watson Concept Expansion Service tile will be removed from the Bluemix catalog on Sunday, March 6, 2016, after which you cannot provision new instances of this service. However, existing provisioned instances will continue to be usable until March 30, 2016.

### Concept Insights
Use the [Concept Insights][concept_insights] service to identify words in the
text that correspond to concepts in a Wikipedia graph.

```javascript
var watson = require('watson-developer-cloud');

var concept_insights = watson.concept_insights({
  username: '<username>',
  password: '<password>',
  version: 'v2'
});

var params = {
  graph: '/graphs/wikipedia/en-20120601',
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

// Retrieve the concepts for input text
concept_insights.graphs.annotateText(params, function(err, res) {
  if (err)
    console.log(err);
  else {
    console.log(JSON.stringify(res, null, 2));
  }
});
```

### Dialog
Use the Dialog service to list all the dialogs you have.

```javascript
var watson = require('watson-developer-cloud');

var dialog = watson.dialog({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

dialog.getDialogs({}, function (err, dialogs) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(dialogs, null, 2));
});
```

### Document Conversion

```javascript
var watson = require('watson-developer-cloud');
var fs = require('fs');

var document_conversion = watson.document_conversion({
  username:     '<username>',
  password:     '<password>',
  version:      'v1',
  version_date: '2015-12-01'
});

// convert a single document
document_conversion.convert({
  // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT
  file: fs.createReadStream('sample-docx.docx'),
  conversion_target: document_conversion.conversion_target.ANSWER_UNITS,
  // Add custom configuration properties or omit for defaults
  word: {
    heading: {
      fonts: [
        { level: 1, min_size: 24 },
        { level: 2, min_size: 16, max_size: 24 }
      ]
    }
  }
}, function (err, response) {
  if (err) {
    console.error(err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }
});
```

See the [Document Conversion integration example][document_conversion_integration_example] about how to integrate the Document Conversion service
with the Retrieve and Rank service.

### Language Translation

Translate text from one language to another or idenfity a language using the [Language Translation][language_translation] service.

```javascript
var watson = require('watson-developer-cloud');

var language_translation = watson.language_translation({
  username: '<username>',
  password: '<password>',
  version: 'v2'
});

language_translation.translate({
  text: 'A sentence must have a verb', source : 'en', target: 'es', model_id: '<model-id>' },
  function (err, translation) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(translation, null, 2));
});

language_translation.identify({
  text: 'The language translation service takes text input and identifies the language used.' },
  function (err, language) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(language, null, 2));
});
```

### Natural Language Classifier

Use [Natural Language Classifier](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/nl-classifier/) service to create a classifier instance by providing a set of representative strings and a set of one or more correct classes for each as training. Then use the trained classifier to classify your new question for best matching answers or to retrieve next actions for your application.

```javascript
var watson = require('watson-developer-cloud');

var natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

natural_language_classifier.classify({
  text: 'Is it sunny?',
  classifier_id: '<classifier-id>' },
  function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
```

See this [example](https://github.com/watson-developer-cloud/node-sdk/blob/master/examples/natural_language_classifier.v1.js) to learn how to create a classifier.

### Personality Insights
Analyze text in english and get a personality profile by using the
[Personality Insights][personality_insights] service.

```javascript
var watson = require('watson-developer-cloud');

var personality_insights = watson.personality_insights({
  username: '<username>',
  password: '<password>',
  version: 'v2'
});

personality_insights.profile({
  text: 'Enter more than 100 unique words here...',
  language: 'en' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
```

**Note:** Don't forget to update the `text` variable!


### Relationship Extraction
Analyze an English news article and get the relationships between sentence
components (nouns, verbs, subjects, objects, etc.) by using the
[Relationship Extraction][relationship_extraction] service.

```javascript
var watson = require('watson-developer-cloud');

var relationship_extraction = watson.relationship_extraction({
  username: '<username>',
  password: '<password>',
  version: 'v1-beta'
});

relationship_extraction.extract({
  text: 'IBM Watson developer cloud',
  dataset: 'ie-en-news' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
```

### Retrieve and Rank
Use the [Retrieve and Rank][retrieve_and_rank] service to enhance search results with machine learning.

```javascript
var retrieve = watson.retrieve_and_rank({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1',
  url: 'https://gateway.watsonplatform.net/retrieve-and-rank/api'
});

var solrClient = retrieve.createSolrClient({
  cluster_id: 'INSERT YOUR CLUSTER ID HERE',
  collection_name: 'example_collection'
});

// add a document
var doc = { id : 1234, title_t : 'Hello', text_field_s: 'some text' };
solrClient.add(doc, function(err) {
  if(err) {
    console.log('Error indexing document: ' + err);
  } else {
    console.log('Indexed a document.');
    solrClient.commit(function(err) {
      if(err) {
        console.log('Error committing change: ' + err);
      } else {
        console.log('Successfully commited changes.');
      }
    });
  }
});

// search all documents
var query = solrClient.createQuery();
query.q({ '*' : '*' });
solrClient.search(query, function(err, searchResponse) {
  if(err) {
    console.log('Error searching for documents: ' + err);
  } else {
    console.log('Found ' + searchResponse.response.numFound + ' document(s).');
    console.log('First document: ' + JSON.stringify(searchResponse.response.docs[0], null, 2));
  }
});
```

### Speech to Text
Use the [Speech to Text][speech_to_text] service to recognize the text from a
.wav file.

```javascript
var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

var params = {
  // From file
  audio: fs.createReadStream('./resources/speech.wav'),
  content_type: 'audio/l16; rate=44100'
};

speech_to_text.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});

// or streaming
fs.createReadStream('./resources/speech.wav')
  .pipe(speech_to_text.createRecognizeStream({ content_type: 'audio/l16; rate=44100' }))
  .pipe(fs.createWriteStream('./transcription.txt'));
```

### Text to Speech
Use the [Text to Speech][text_to_speech] service to synthesize text into a
.wav file.

```js
var watson = require('watson-developer-cloud');
var fs = require('fs');

var text_to_speech = watson.text_to_speech({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

var params = {
  text: 'Hello from IBM Watson',
  voice: 'en-US_AllisonVoice', // Optional voice
  accept: 'audio/wav'
};

// Pipe the synthesized text to a file
text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));
```

### Tone Analyzer
Use the [Tone Analyzer][tone_analyzer] service to analyze the
emotion, writing and social tones of a text.

```js
var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: '<username>',
  password: '<password>',
  version: 'v3-beta',
  version_date: '2016-02-11'
});

tone_analyzer.tone({ text: 'Greetings from Watson Developer Cloud!' },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(tone, null, 2));
});
```


### Tradeoff Analytics
Use the [Tradeoff Analytics][tradeoff_analytics] service to find the best
phone that minimizes price and weight and maximizes screen size.

```javascript
var watson = require('watson-developer-cloud');

var tradeoff_analytics = watson.tradeoff_analytics({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

// From file
var params = require('./resources/problem.json');

tradeoff_analytics.dilemmas(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
```

### Visual Insights
Use the [Visual Insights][visual_insights] to get insight into the themes present in a collection of images based on their visual appearance/content.

```js
var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_insights = watson.visual_insights({
  username: '<username>',
  password: '<password>',
  version: 'v1-experimental'
});

var params = {
  images_file: fs.createReadStream('./resources/images.zip')
};

visual_insights.summary(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
```

### Visual Recognition
Use the [Visual Recognition][visual_recognition] service to recognize the
following picture.

<img src="https://visual-recognition-demo.mybluemix.net/images/samples/5.jpg" width="150" />

```js
var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  username: '<username>',
  password: '<password>',
  version: 'v2-beta',
  version_date: '2015-12-02'
});

var params = {
  images_file: fs.createReadStream('./resources/car.png')
};

visual_recognition.classify(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
```

## Running in Bluemix
By default, the library tries to use the Bluemix `VCAP_SERVICES` environment
variable to get the credentials for a given service. You can avoid this by
using:
`use_vcap_services`.

```javascript
var watson = require('watson-developer-cloud');

var concept_expansion = watson.concept_expansion({
  version: 'v1-beta',
  use_vcap_services: false
});
```
This example fails because you did not provide a username and password and
the library will not look into Bluemix for these values.

## Unauthenticated requests
By default, the library tries to use Basic Auth and will ask for `api_key` or `username` and `password` and send an `Authorization: Basic XXXXXXX`. You can avoid this by using:

`use_unauthenticated`.

```javascript
var watson = require('watson-developer-cloud');

var dialog = watson.dialog({
  version: 'v1',
  use_unauthenticated: true
});
```

## Debug
This library relies on the `request` npm module writted by
[request][request_github] to call the Watson Services. To debug the apps, add
'request' to the `NODE_DEBUG` environment variable:

```sh
$ NODE_DEBUG='request' node app.js
```
where `app.js` is your Node.js file.

## Tests
Running all the tests:
```sh
$ npm test
```

Running a specific test:
```sh
$ mocha -g '<test name>'
```

## Open Source @ IBM
[Find more open source projects on the IBM Github Page.](http://ibm.github.io/)

## License

This library is licensed under Apache 2.0. Full license text is available in
[COPYING][license].

## Contributing
See [CONTRIBUTING](https://github.com/watson-developer-cloud/node-sdk/blob/master/.github/CONTRIBUTING.md).


[personality_insights]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/
[concept_expansion]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/glimpseapi/
[relationship_extraction]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/sireapi/
[retrieve_and_rank]: http://watson.stage1.mybluemix.net/smarterplanet/us/en/ibmwatson/developercloud/retrieve-rank.html
[visual_recognition]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/visual-recognition/
[visual_insights]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/visual-insights/

[tone_analyzer]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tone-analyzer.html
[text_to_speech]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/text-to-speech/
[speech_to_text]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/speech-to-text/
[concept_insights]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/concept-insights/
[tradeoff_analytics]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/
[language_translation]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/language-translation/

[alchemy_language]: http://www.alchemyapi.com/products/alchemylanguage
[sentiment_analysis]: http://www.alchemyapi.com/products/alchemylanguage/sentiment-analysis
[alchemy_vision]: http://www.alchemyapi.com/products/alchemyvision
[alchemy_data_news]: http://www.alchemyapi.com/products/alchemydata-news

[wdc]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/
[bluemix]: https://console.ng.bluemix.net
[npm_link]: https://www.npmjs.com/package/watson-developer-cloud
[request_github]: https://github.com/request/request
[examples]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples
[document_conversion_integration_example]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples/document_conversion_integration.v1.js
[license]: http://www.apache.org/licenses/LICENSE-2.0
