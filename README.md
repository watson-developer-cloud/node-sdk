Watson Developer Cloud Nodejs Client
============================================

[![Build Status](https://secure.travis-ci.org/watson-developer-cloud/nodejs-wrapper.png)](http://travis-ci.org/watson-developer-cloud/nodejs-wrapper)
[![Dependency Status](https://gemnasium.com/watson-developer-cloud/nodejs-wrapper.png)](https://gemnasium.com/watson-developer-cloud/nodejs-wrapper)
[![Coverage Status](https://img.shields.io/coveralls/watson-developer-cloud/nodejs-wrapper.svg)](https://coveralls.io/r/watson-developer-cloud/nodejs-wrapper)
[![Join the chat at https://gitter.im/watson-developer-cloud/nodejs-wrapper](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/watson-developer-cloud/nodejs-wrapper?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Wrapper to use the [Watson Developer Cloud][wdc] services. A collection of REST APIs and SDKs that use cognitive computing to solve complex problems.

## Table of Contents
  * [Watson Developer Cloud][wdc]
    * [Questions](#questions)
    * [Installation](#installation)
    * [Usage](#usage)
    * [Getting the Service Credentials](#getting-the-service-credentials)
    * [IBM Watson Services](#ibm-watson-services)
      * [Concept Expansion](#concept-expansion)
      * [Concept Insights](#concept-insights)
      * [Language Identification](#language-identification)
      * [Machine Translation](#machine-translation)
      * [Message Resonance](#message-resonance)
      * [Personality Insights](#personality-insights)
      * [Question and Answer](#question-and-answer)
      * [Relationship Extraction](#relationship-extraction)
      * [Speech to Text](#speech-to-text)
      * [Text to Speech](#text-to-speech)
      * [Tradeoff Analytics](#tradeoff-analytics)
      * [Visual Recognition](#visual-recognition)
    * [Running in Bluemix](#running-in-bluemix)
    * [Debug](#debug)
    * [Tests](#tests)
    * [Open Source @ IBM](#open-source--ibm)
    * [License](#license)
    * [Contributing](#contributing)


## Questions

If you are having difficulties using the APIs or have a question about the IBM Watson Services, please ask a question on [dW Answers](https://developer.ibm.com/answers/questions/ask/?topics=watson) or [Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-watson).


## Installation

```sh
$ npm install watson-developer-cloud --save
```

## Usage

The examples below assume you already have service credentials. If not, you will have to create and bind the service in [Bluemix][bluemix]. See the [Getting Started][getting_started] page for more details.

If you are running your application in Bluemix, you don't need to specify the credentials, the wrapper will get them for you by looking at the `VCAP_SERVICES`

### Getting the Service Credentials
The credentials for the services are stored in the [VCAP_SERVICES][vcap_environment] environment variable. In order to get them you need to first create and bind the service to your application.

There are two ways to get the credentials, you can use Bluemix to access your app and view the `VCAP_SERVICES` there or you can run:

```sh
$ cf env <application-name>
```

Example output:
```sh
  System-Provided:
  {
  "VCAP_SERVICES": {
    "visual_recognition": [{
        "credentials": {
          "password": "<password>",
          "url": "<url>",
          "username": "<username>"
        },
      "label": "visual_recognition",
      "name": "visual-recognition-service",
      "plan": "free"
   }]
  }
  }
```

You need to copy `username`, `password`.

## IBM Watson Services
The Watson Developer Cloud offers a variety of services for building cognitive apps.

### Concept Expansion
Example: Map euphemisms or colloquial terms to more commonly understood phrases using the [Concept Expansion][concept_expansion] service.

```javascript
var watson = require('watson-developer-cloud');

var concept_expansion = watson.concept_expansion({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});
var params = {
  seeds: ['motrin','tylenol','aspirin'],
  dataset: 'mtsamples',
  label: 'medications'
};
concept_expansion.expand(params, function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
```

### Concept Insights
Example: Use the [Concept Insights][concept_insights] to identify words in the text that correspond to concepts in a Wikipedia graph.
```js
var watson = require('watson-developer-cloud');

var concept_insights = watson.concept_insights({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

var params = {
  user: 'wikipedia',
  graph: 'en-20120601',
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

// Retrieve the concepts for input text
concept_insights.annotateText(params, function(err, response) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(response, null, 2));
});
```

### Language Identification
Example: Identify a language using the [Language Identification][language_identification] service.

```javascript
var watson = require('watson-developer-cloud');

var language_identification = watson.language_identification({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

language_identification.identify({
  text: 'The language identification service takes text input and identifies the language used.' }, function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
```

### Machine Translation
Example: Translate text from one language to another using the [Machine Translation][machine_translation] service.

```javascript
var watson = require('watson-developer-cloud');

var machine_translation = watson.machine_translation({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

machine_translation.translate({
  text: 'A sentence must have a verb', from : 'enus', to: 'eses' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
```

### Message Resonance
Example: Get resonance information for individual words in a sentence from the [Message Resonance][message_resonance] service.

```js
var watson = require('watson-developer-cloud');
var message_resonance = watson.message_resonance({
  username:'<username>',
  password:'<password>',
  version:'v1'
});

message_resonance.resonance({ text: 'IBM Watson Developer Cloud', dataset: 1 }, function(err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
```

### Personality Insights
Example: Analyze text and get a personality profile using the [Personality Insights][personality_insights] service.

```javascript
var watson = require('watson-developer-cloud');

var personality_insights = watson.personality_insights({
  username: '<username>',
  password: '<password>',
  version: 'v2'
});

personality_insights.profile({
  text: 'type more than 100 unique words here...' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
```
**Node:** Don't forget to update the `text` variable!

### Question and Answer
Example: Ask a healthcare-related question to the [Question and Answer][question_and_answer] service.

```js
var watson = require('watson-developer-cloud');
var question_and_answer_healthcare = watson.question_and_answer({
  username: '<username>',
  password: '<password>',
  version: 'v1',
  dataset: 'healthcare' /* The dataset can be specified when creating the service or when calling it */
});

question_and_answer_healthcare.ask({ text: 'What is HIV?'}, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
```

### Relationship Extraction
Example: Analyze an English news article and get the relationships between sentence components (nouns, verbs, subjects, objects, etc.) using the [Relationship Extraction][relationship_extraction] service.

```javascript
var watson = require('watson-developer-cloud');

var relationship_extraction = watson.relationship_extraction({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

relationship_extraction.extract({
  text: 'IBM Watson developer cloud', dataset: 'ie-en-news' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
```

### Speech to Text
Example: Use the [Speech to Text][speech_to_text] to recognize the text from a wav file.

```js
var watson = require('watson-developer-cloud');
var request = require('request');

var speech_to_text = watson.speech_to_text({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

var params = {
  // From file
  audio: request('http://speech-to-text-demo.mybluemix.net/audio/sample1.wav'),
  content_type: 'audio/l16; rate=44100'
};

speech_to_text.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
```

### Text to Speech
Example: Use the [Text to Speech][text_to_speech] to synthesize text into a wav file.

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
    voice: 'VoiceEnUsMichael', // optional voice
    accept: 'audio/wav'
};

// pipe the synthesized text to a file
text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'));
```

### Tradeoff Analytics
Example: Use the [Tradeoff Analytics][tradeoff_analytics] to find the best phone that minimize price and weight and maximize screen size.

```js
var watson = require('watson-developer-cloud');

var tradeoff_analytics = watson.tradeoff_analytics({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

var params = {
  'subject': 'phone',
  'columns': [{
    'key': 'price',
    'full_name': 'Price (Eur)',
    'type': 'NUMERIC',
    'is_objective': true,
    'goal': 'MIN'
  }, {
    'key': 'RAM',
    'full_name': 'RAM (MB)',
    'type': 'NUMERIC',
    'is_objective': false,
    'goal': 'MAX'
  }, {
    'key': 'weight',
    'full_name': 'Weight (gr)',
    'type': 'NUMERIC',
    'is_objective': true,
    'goal': 'MIN'
  }],
  'options': [{
    'key': ' 1',
    'name': 'Samsung Galaxy S4 White',
    'values': {
      'weight': 130,
      'price': 239,
      'RAM': 2048
    }
  }, {
    'key': '2',
    'name': 'Samsung Galaxy S4 Black',
    'values': {
      'weight': 130,
      'price': 240,
      'RAM': 2048
    }
  }, {
    'key': '3',
    'name': 'Samsung Galaxy S3 White',
    'values': {
      'weight': 133,
      'price': 79,
      'RAM': 2048
    }
  }]
};

tradeoff_analytics.dilemmas(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
```

### Visual Recognition
Example: Use the [Visual Recognition][visual_recognition] service to recognize the picture below.

<img src="http://visual-recognition-demo.mybluemix.net/images/horses.jpg" width="150" height="150" />

```js
var watson = require('watson-developer-cloud');
var request = require('request');

var visual_recognition = watson.visual_recognition({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});

var params = {
  image_file: request('http://visual-recognition-demo.mybluemix.net/images/horses.jpg')
};
visual_recognition.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, 'labels', 2));
});
```

## Running in Bluemix
By default the wrapper will try to use the Bluemix `VCAP_SERVICES` to get the credentials for a given service. You can avoid this by using: `use_vcap_services`.

```javascript
var watson = require('watson-developer-cloud');

var concept_expansion = watson.concept_expansion({
  version: 'v1',
  use_vcap_services: false
});
```
The example above will fail because you did not provide a username and password and the wrapper will not look into Bluemix for those values.

## Debug
This wrapper relies in the `request` npm module writted by [mikeal][mikeal_github] to call the Watson Services. In order to debug add 'request' to the `NODE_DEBUG`:

```sh
$ NODE_DEBUG='request' node app.js
```
where `app.js` is your nodejs file

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
[Find more open source projects on the IBM Github Page](http://ibm.github.io/)

## License

This library is licensed under Apache 2.0. Full license text is
available in [COPYING](https://github.com/watson-developer-cloud/nodejs-wrapper/blob/master/LICENSE).

## Contributing
See [CONTRIBUTING](https://github.com/watson-developer-cloud/nodejs-wrapper/blob/master/CONTRIBUTING.md).


[question_and_answer]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/qaapi/
[message_resonance]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/mrapi/
[personality_insights]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/personality-insights/
[language_identification]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/lidapi/
[machine_translation]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/mtapi/
[concept_expansion]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/glimpseapi/
[relationship_extraction]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/sireapi/
[visual_recognition]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/visual-recognition/
[text_to_speech]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/text-to-speech/
[speech_to_text]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/speech-to-text/
[concept_insights]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/concept-insights/
[tradeoff_analytics]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/


[getting_started]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/getstarted.html
[wdc]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/
[vcap_environment]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/index.html#EnvVars
[bluemix]: https://console.ng.bluemix.net
[npm_link]: https://www.npmjs.com/package/watson-developer-cloud
[mikeal_github]: https://github.com/request/request
