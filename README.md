Watson Developer Cloud Nodejs Client - Alpha
============================================

[![Build Status](https://secure.travis-ci.org/watson-developer-cloud/nodejs-wrapper-alpha.png)](http://travis-ci.org/watson-developer-cloud/nodejs-wrapper-alpha)
[![Dependency Status](https://gemnasium.com/watson-developer-cloud/nodejs-wrapper-alpha.png)](https://gemnasium.com/watson-developer-cloud/nodejs-wrapper-alpha)
[![Coverage Status](https://img.shields.io/coveralls/watson-developer-cloud/nodejs-wrapper-alpha.svg)](https://coveralls.io/r/watson-developer-cloud/nodejs-wrapper-alpha)
[![Join the chat at https://gitter.im/watson-developer-cloud/nodejs-wrapper-alpha](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/watson-developer-cloud/nodejs-wrapper-alpha?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Wrapper to use the [Watson Developer Cloud][wdc] services. A collection of REST APIs and SDKs that use cognitive computing to solve complex problems.

## Table of Contents
  * [Watson Developer Cloud Nodejs Client - Alpha](#watson-developer-cloud-nodejs-client---alpha)
    * [Questions](#questions)
    * [Installation](#installation)
    * [Usage](#usage)
    * [Getting the Service Credentials](#getting-the-service-credentials)
    * IBM Watson Services
      * [Question and Answer](#question-and-answer)
      * [Visual Recognition](#visual-recognition)
      * [Text to Speech](#text-to-speech)
      * [Speech to Text](#speech-to-text)
      * [Concept Insights](#concept-insights)
      * [Message Resonance](#message-resonance)
      * [Language Identification](#language-identification)
      * [Machine Translation](#machine-translation)
      * [User Modeling](#user-modeling)
      * [Relationship Extraction](#relationship-extraction)
      * [Concept Expansion](#concept-expansion)
    * [Running in Bluemix](#running-in-bluemix)
    * [Debug](#debug)
    * [Tests](#tests)
    * [Open Source @ IBM](#open-source--ibm)
    * [License](#license)
    * [Contributing](#contributing)


## Alpha
This is an **Alpha release** of the `watson-developer-cloud` [npm][npm_link] module. Features might be changed in backward-incompatible ways and is not recommended for production use.

## Questions

If you are having difficulties using the APIs or have a question about the IBM Watson Services, please ask a question on [dW Answers](https://developer.ibm.com/answers/questions/ask/?topics=watson) or [Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-watson).


## Installation

```sh
$ npm install watson-developer-cloud-alpha --save
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
    "user_modeling": [{
        "credentials": {
          "password": "<password>",
          "url": "<url>",
          "username": "<username>"
        },
      "label": "user_modeling",
      "name": "um-service",
      "plan": "user_modeling_free_plan"
   }]
  }
  }
```

You need to copy `username`, `password`.

### Question and Answer
Example: Ask a healthcare-related question to the [Question and Answer][question_and_answer] service.

```js
var watson = require('watson-developer-cloud-alpha');
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

### Visual Recognition
Example: Use the [Visual Recognition][visual_recognition] service to recognize the picture below.

<img src="http://visual-recognition-demo.mybluemix.net/images/horses.jpg" width="150" height="150" />

```js
var watson = require('watson-developer-cloud-alpha');
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

### Text to Speech
Example: Use the [Text to Speech][text_to_speech] to synthesize text into a wav file.

```js
var watson = require('watson-developer-cloud-alpha');
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

### Speech to Text
Example: Use the [Speech to Text][speech_to_text] to recognize the text from a wav file.

```js
var watson = require('watson-developer-cloud-alpha');
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
### Concept Insights
Example: Use the [Concept Insights][concept_insights] to identify words in the text that correspond to concepts in a Wikipedia graph.
```js
var watson = require('watson-developer-cloud-alpha');

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
### Message Resonance
Example: Get resonance information for individual words in a sentence from the [Message Resonance][message_resonance] service.

```js
var watson = require('watson-developer-cloud-alpha');
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

### Language Identification
Example: Identify a language using the [Language Identification][language_identification] service.

```javascript
var watson = require('watson-developer-cloud-alpha');

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
var watson = require('watson-developer-cloud-alpha');

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

### User Modeling
Example: Analyze text and get a personality profile using the [User Modeling][user_modeling] service.

```javascript
var watson = require('watson-developer-cloud-alpha');

var user_modeling = watson.user_modeling({
  username: '<username>',
  password: '<password>',
  version: 'v2'
});

user_modeling.profile({
  text: 'type more than 100 unique words here...' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
```
**Node:** Don't forget to update the `text` variable!

### Relationship Extraction
Example: Analyze an English news article and get the relationships between sentence components (nouns, verbs, subjects, objects, etc.) using the [Relationship Extraction][relationship_extraction] service.

```javascript
var watson = require('watson-developer-cloud-alpha');

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

### Concept Expansion
Example: Map euphemisms or colloquial terms to more commonly understood phrases using the [Concept Expansion][concept_expansion] service.

```javascript
var watson = require('watson-developer-cloud-alpha');

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

## Running in Bluemix
By default the wrapper will try to use the Bluemix `VCAP_SERVICES` to get the credentials for a given service. You can avoid this by using: `use_vcap_services`.

```javascript
var watson = require('watson-developer-cloud-alpha');

var concept_expansion = watson.concept_expansion({
  version: 'v1',
  use_vcap_services: false
});
```
The example above will fail because you did not provide a username and password and the wrapper will not look into Bluemix for those values.

## Debug
This wrapper relies in the `request` npm module writted by [mikeal][mikeal_github] to call the Watson Services. In order to debug add 'request' to the `NODE_DEBUG`:

```sh
$ NODE_DEBUG='request' app.js
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
available in [COPYING](https://github.com/watson-developer-cloud/nodejs-wrapper-alpha/blob/master/LICENSE).

## Contributing
See [CONTRIBUTING](https://github.com/watson-developer-cloud/nodejs-wrapper-alpha/blob/master/CONTRIBUTING.md).


[question_and_answer]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/qaapi/
[message_resonance]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/mrapi/
[user_modeling]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/systemuapi/
[language_identification]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/lidapi/
[machine_translation]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/mtapi/
[concept_expansion]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/glimpseapi/
[relationship_extraction]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/sireapi/
[visual_recognition]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/visual-recognition/
[text_to_speech]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/text-to-speech/
[speech_to_text]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/speech-to-text/
[concept_insights]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/concept-insights/

[getting_started]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/getstarted.html
[wdc]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/
[vcap_environment]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/index.html#EnvVars
[bluemix]: https://console.ng.bluemix.net
[npm_link]: https://www.npmjs.com/package/watson-developer-cloud-alpha
[mikeal_github]: https://github.com/request/request
