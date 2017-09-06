Watson Developer Cloud Node.js SDK
============================================
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/460c1d01a56942dbb7dd15d9ee0da535)](https://www.codacy.com/app/gattana/node-sdk?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=watson-developer-cloud/node-sdk&amp;utm_campaign=Badge_Grade)
[![Build Status](https://secure.travis-ci.org/watson-developer-cloud/node-sdk.svg)](http://travis-ci.org/watson-developer-cloud/node-sdk)
[![Dependency Status](https://gemnasium.com/watson-developer-cloud/node-sdk.svg)](https://gemnasium.com/watson-developer-cloud/node-sdk)
[![npm-version](https://img.shields.io/npm/v/watson-developer-cloud.svg)](https://www.npmjs.com/package/watson-developer-cloud)
[![npm-downloads](https://img.shields.io/npm/dm/watson-developer-cloud.svg)](https://www.npmjs.com/package/watson-developer-cloud)

Node.js client library to use the Watson Developer Cloud services, a collection of APIs that use cognitive computing to solve complex problems.

## Table of Contents
  * [Major Changes for v2](#major-changes-for-v2)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Documentation](#documentation)
  * [Getting the Service Credentials](#getting-the-service-credentials)
  * [Questions](#questions)
  * [Examples](#examples)
  * [IBM Watson Services](#ibm-watson-services)
    * [AlchemyLanguage](#alchemylanguage)
    * [AlchemyData News](#alchemydata-news)
    * [Authorization](#authorization)
    * [Conversation](#conversation)
    * [Dialog](#dialog)
    * [Discovery](#discovery)
    * [Document Conversion](#document-conversion)
    * [Language Translator](#language-translator)
    * [Natural Language Classifier](#natural-language-classifier)
    * [Natural Language Understanding](#natural-language-understanding)
    * [Personality Insights](#personality-insights)
    * [Retrieve and Rank](#retrieve-and-rank)
    * [Speech to Text](#speech-to-text)
    * [Text to Speech](#text-to-speech)
    * [Tone Analyzer](#tone-analyzer)
    * [Tradeoff Analytics](#tradeoff-analytics)
    * [Visual Recognition](#visual-recognition)
    * [Removed Services](#removed-services)
  * [Composing Services](#composing-services)
  * [Debug](#debug)
  * [Tests](#tests)
  * [Open Source @ IBM](#open-source--ibm)
  * [License](#license)
  * [Contributing](#contributing)


## Major changes for v2

### BREAKING: user-supplied credentials are now preferred over Bluemix-supplied credentials.

See [Usage](#usage) section for details.

This change also removes the `use_vcap_services` flag.

### Client-side usage is partially supported

See [Client-side usage](#client-side-usage) section for details.

### New recommended method for instantiating services:

```js
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({/*...*/});
```

This was primarily done to enable smaller bundles for client-side usage, but also gives a small performance boost for server-side usage by only loading the portion of the library that is actually needed.

The following methods will also work, but cause the entire library to be loaded:

```js
// Alternate methods of using the library.
// Not recommended, especially for client-side JS.
var watson = require('watson-developer-cloud');

var toneAnalyzer = new watson.ToneAnalyzerV3({/*...*/});

var tone_analyzer = watson.tone_analyzer({version: 'v3', /*...*/});
```

## Installation

```sh
$ npm install watson-developer-cloud --save
```

## Usage

The examples below assume that you already have service credentials. If not,
you will have to create a service in [Bluemix][bluemix].

If you are running your application in Bluemix, you don't need to specify the
credentials; the library will get them for you by looking at the `VCAP_SERVICES` environment variable.

Credentials are checked for in the following order:

1. Hard-coded or programatic credentials passed to the service constructor

2. `SERVICE_NAME_USERNAME` and `SERVICE_NAME_PASSWORD` environment properties (or `SERVICE_NAME_API_KEY` when appropriate) and, optionally, `SERVICE_NAME_URL`

3. Bluemix-supplied credentials (via the `VCAP_SERVICES` JSON-encoded environment property)

### Client-side usage
See the `examples/` folder for [Browserify](http://browserify.org/) and [Webpack](http://webpack.github.io/) client-side SDK examples (with server-side generation of auth tokens.)

Note: not all services currently support CORS, and therefore not all services can be used client-side.
Of those that do, most require an auth token to be generated server-side via the [Authorization Service](#authorization).

### Data collection opt-out

By default, [all requests are logged](https://console.bluemix.net/docs/services/watson/getting-started-logging.html). This can be disabled of by setting the `X-Watson-Learning-Opt-Out` header when creating the service instance:

```js
var myInstance = new watson.WhateverServiceV1({
  /* username, password, version, etc... */
  headers: {
    "X-Watson-Learning-Opt-Out": true
  }
});
```

## Documentation

You can find links to the documentation at https://www.ibm.com/watson/developercloud/doc/index.html. Find the service that you're interested in, click **API reference**, and then select the **Node** tab.

There are also auto-generated JSDocs available at http://watson-developer-cloud.github.io/node-sdk/latest/

## Getting the service credentials
You will need the `username` and `password` (`api_key` for AlchemyAPI) credentials for each service. Service credentials are different from your Bluemix account username and password.

To get your service credentials, follow these steps:

1.  Log in to Bluemix at https://bluemix.net.
1.  Create an instance of the service:
    1.  In the Bluemix **Catalog**, select the service you want to use.
    1.  Type a unique name for the service instance in the **Service name** field. For example, type `my-service-name`. Leave the default values for the other options.
    1.  Click **Create**.
    1.  From the service dashboard, click **Service credentials**.
    1.  Click **View credentials** under **Actions**.
    1.  Copy `username` and `password` (or `api_key` for Visual Recognition).

## Questions

If you are having difficulties using the APIs or have a question about the Watson services, please ask a question at [dW Answers](https://developer.ibm.com/answers/questions/ask/?topics=watson) or [Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-watson-cognitive).

## Examples
The [examples][examples] folder has basic and advanced examples.

## IBM Watson services
The Watson Developer Cloud offers a variety of services for building cognitive
apps.

### AlchemyLanguage
[AlchemyLanguage][alchemy_language] offers 12 API functions as part of its text analysis service, each of which uses sophisticated natural language processing techniques to analyze your content and add high-level semantic information.

Use the [Sentiment Analysis][sentiment_analysis] endpoint to identify positive/negative sentiment within a sample text document.

```javascript
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

var alchemy_language = new AlchemyLanguageV1({
  api_key: 'API_KEY'
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

### AlchemyData News
[Alchemy Data News][alchemy_data_news] indexes 250k to 300k English language news and blog articles every day with historical search available for the past 60 days.
Example: Get the volume data from the last 7 days using 12hs of time slice.

```javascript
var AlchemyDataNewsV1 = require('watson-developer-cloud/alchemy-data-news/v1');

var alchemy_data_news = new AlchemyDataNewsV1({
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
The Authorization service can generate auth tokens for situations where providing the service username/password is undesirable.

Tokens are valid for 1 hour and may be sent using the `X-Watson-Authorization-Token` header or the `watson-token` query param.

Note that the token is supplied URL-encoded, and will not be accepted if it is double-encoded in a querystring.

```javascript
var watson = require('watson-developer-cloud');

var authorization = new watson.AuthorizationV1({
  username: '<Text to Speech username>',
  password: '<Text to Speech password>',
  url: watson.TextToSpeechV1.URL
});

authorization.getToken(function (err, token) {
  if (!token) {
    console.log('error:', err);
  } else {
    // Use your token here
  }
});
```


### Conversation

Use the [Conversation][conversation] service to determine the intent of a message.

Note: you must first create a workspace via Bluemix. See [the documentation](https://console.bluemix.net/docs/services/conversation/index.html#about) for details.

```js
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

var conversation = new ConversationV1({
  username: '<username>',
  password: '<password>',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

conversation.message({
  input: { text: 'What\'s the weather?' },
  workspace_id: '<workspace id>'
 }, function(err, response) {
     if (err) {
       console.error(err);
     } else {
       console.log(JSON.stringify(response, null, 2));
     }
});
```

### Dialog
The Dialog service was deprecated on August 15, 2016, existing instances of the service will continue to function until August 9, 2017. Users of the Dialog service should migrate their applications to use the Conversation service. See the [migration documentation][dialog_migration] to learn how to migrate your dialogs to the Conversation service.

### Discovery

Use the [Discovery Service][discovery] to search and analyze structured and unstructured data.

```javascript
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
  username: '<username>',
  password: '<password>',
  version_date: DiscoveryV1.VERSION_DATE_2017_04_27
});

discovery.query({
    environment_id: '<environment_id>',
    collection_id: '<collection_id>',
    query: 'my_query'
  }, function(err, response) {
        if (err) {
          console.error(err);
        } else {
          console.log(JSON.stringify(response, null, 2));
        }
   });
```

### Document Conversion

```javascript
var DocumentConversionV1 = require('watson-developer-cloud/document-conversion/v1');
var fs = require('fs');

var document_conversion = new DocumentConversionV1({
  username:     '<username>',
  password:     '<password>',
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

The IBM Watson™ Language Translation service has been rebranded as the Language Translator service.

The Language Translator service provides the same capabilities as the Language Translation service, but with simpler pricing. For information about migrating existing applications from the Language Translation service to the Language Translator service, see the [Migration documentation][language-translator-migration]

```javascript
var LanguageTranslationV2 = require('watson-developer-cloud/language-translation/v2');

var language_translation = new LanguageTranslationV2({
  username: '<username>',
  password: '<password>'
});
```

### Language Translator

Translate text from one language to another or idenfity a language using the [Language Translator][language_translator] service.

**Note:** There is a deprecated Language *Translation* service and a newer Language *Translator* service. The only difference is the pricing structure and the service endpoint.

The SDK currently defaults to the older endpoint for both `LanguageTranslationV2` and `LanguageTranslatorV2`, but `LanguageTranslatorV2`'s default endpoint will change in the next major release (3.0.0). **To guarantee compatibility, include the `url` when creating a `LanguageTranslatorV2` instance.**

See [Migrating from Language Translation][language-translator-migration] for more details.

```javascript
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var language_translator = new LanguageTranslatorV2({
  username: '<username>',
  password: '<password>',
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

language_translator.translate({
  text: 'A sentence must have a verb', source : 'en', target: 'es' },
  function (err, translation) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(translation, null, 2));
});

language_translator.identify({
  text: 'The language translator service takes text input and identifies the language used.' },
  function (err, language) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(language, null, 2));
});
```

### Natural Language Classifier

Use [Natural Language Classifier](https://console.bluemix.net/docs/services/natural-language-classifier/getting-started.html) service to create a classifier instance by providing a set of representative strings and a set of one or more correct classes for each as training. Then use the trained classifier to classify your new question for best matching answers or to retrieve next actions for your application.

```javascript
var NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');

var natural_language_classifier = new NaturalLanguageClassifierV1({
  username: '<username>',
  password: '<password>'
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

### Natural Language Understanding

Use Natural Language Understanding is a collection of natural language processing APIs that help you understand sentiment,
 keywords, entities, high-level concepts and more.

```javascript
var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
  username: '<username>',
  password: '<password>',
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

nlu.analyze({
  'html': file_data, // Buffer or String
  'features': {
    'concepts': {},
    'keywords': {},
  }
}, function(err, response) {
     if (err)
       console.log('error:', err);
     else
       console.log(JSON.stringify(response, null, 2));
 });

```

### Personality Insights
Analyze text in English and get a personality profile by using the
[Personality Insights][personality_insights] service.

```javascript
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var personality_insights = new PersonalityInsightsV3({
  username: '<username>',
  password: '<password>',
  version_date: '2016-10-19'
});

personality_insights.profile({
  text: 'Enter more than 100 unique words here...',
  consumption_preferences: true
  },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
```

**Note:** Don't forget to update the `text` variable!

### Retrieve and Rank
Use the [Retrieve and Rank][retrieve_and_rank] service to enhance search results with machine learning.

```javascript
var RetrieveAndRankV1 = require('watson-developer-cloud/retrieve-and-rank/v1');

var retrieve = new RetrieveAndRankV1({
  username: '<username>',
  password: '<password>',
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
Use the [Speech to Text][speech_to_text] service to recognize the text from a .wav file.

```javascript
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1({
  username: '<username>',
  password: '<password>'
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
Use the [Text to Speech][text_to_speech] service to synthesize text into a .wav file.

```js
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var text_to_speech = new TextToSpeechV1({
  username: '<username>',
  password: '<password>'
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
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: '<username>',
  password: '<password>',
  version_date: '2016-05-19'
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
var TradeoffAnalyticsV1 = require('watson-developer-cloud/tradeoff-analytics/v1');

var tradeoff_analytics = new TradeoffAnalyticsV1({
  username: '<username>',
  password: '<password>'
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

### Visual Recognition
Use the [Visual Recognition][visual_recognition] service to recognize the
following picture.

<img src="https://visual-recognition-demo.mybluemix.net/images/samples/5.jpg" width="150" />

```js
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visual_recognition = new VisualRecognitionV3({
  api_key: '<api_key>',
  version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
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

## Removed services

The following services are no longer available.

* **AlchemyVision**: Visual Recognition replaced Alchemy Vision with improved billing and a superset of the original features
* **Concept Insights**: AlchemyLanguage's concept function can be used as a replacement for most Concept Insights use cases; therefore, we encourage existing Concept Insights service users to migrate to AlchemyLanguage.
* **Relationship Extraction**: You can now access Relationship Extraction models with AlchemyLanguage. See the [migration guide][re_migration] for details.
* **Message Resonance**: Use Natural Language Understanding or Tone Analyzer to understand the emotions of your audience and messages.
* **Question and Answer**: Use Conversation or Natural Language Classifier to identify intent and Retrieve and Rank to search for relevant documents.
* **Visual Insights**: Use Visual Recognition to achieve a similar result
* **Concept Expansion**: Use Natural Langue Understanding to extract concepts, entities, and more.

## Composing services

### Integration of Tone Analyzer with Conversation
Sample code for [integrating Tone Analyzer and Conversation][conversation_tone_analyzer_example] is provided in the [examples directory][examples].

## Integration of Document Conversion with Retrieve and Rank
See the [Document Conversion integration example][document_conversion_integration_example] about how to integrate the Document Conversion service
with the Retrieve and Rank service.

## Unauthenticated requests
By default, the library tries to use Basic Auth and will ask for `api_key` or `username` and `password` and send an `Authorization: Basic XXXXXXX`. You can avoid this by using:

`use_unauthenticated`.

```javascript
var watson = require('watson-developer-cloud');

var dialog = new watson.DialogV1({
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

[conversation]: https://www.ibm.com/watson/services/conversation/
[discovery]: https://www.ibm.com/watson/services/discovery/
[personality_insights]: https://www.ibm.com/watson/services/personality-insights/
[retrieve_and_rank]: https://www.ibm.com/watson/services/retrieve-and-rank/
[visual_recognition]: https://www.ibm.com/watson/services/visual-recognition/
[tone_analyzer]: https://www.ibm.com/watson/services/tone-analyzer/
[text_to_speech]: https://www.ibm.com/watson/services/text-to-speech/
[speech_to_text]: https://www.ibm.com/watson/services/speech-to-text/
[tradeoff_analytics]: https://console.bluemix.net/docs/services/tradeoff-analytics/index.html
[language_translator]: https://www.ibm.com/watson/services/language-translator/
[re_migration]: https://console.bluemix.net/docs/services/alchemy-language/migration.html
[alchemy_language]: https://console.bluemix.net/docs/services/alchemy-language/index.html
[alchemy_data_news]: https://console.bluemix.net/docs/services/alchemydata-news/index.html

[bluemix]: https://console.bluemix.net
[npm_link]: https://www.npmjs.com/package/watson-developer-cloud
[request_github]: https://github.com/request/request
[dialog_migration]: https://console.bluemix.net/docs/services/conversation/index.html
[language-translator-migration]: https://console.bluemix.net/docs/services/language-translator/migrating.html

[examples]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples
[document_conversion_integration_example]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples/document_conversion_integration.v1.js
[conversation_tone_analyzer_example]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples/conversation_tone_analyzer_integration

[license]: http://www.apache.org/licenses/LICENSE-2.0
