# Watson APIs Node.js SDK

[![Build Status](https://secure.travis-ci.org/watson-developer-cloud/node-sdk.svg)](http://travis-ci.org/watson-developer-cloud/node-sdk)
[![Slack](https://wdc-slack-inviter.mybluemix.net/badge.svg)](https://wdc-slack-inviter.mybluemix.net)
[![npm-version](https://img.shields.io/npm/v/watson-developer-cloud.svg)](https://www.npmjs.com/package/watson-developer-cloud)
[![npm-downloads](https://img.shields.io/npm/dm/watson-developer-cloud.svg)](https://www.npmjs.com/package/watson-developer-cloud)

Node.js client library to use the Watson APIs.

<details>
  <summary>Table of Contents</summary>

  * [Installation](#installation)
  * [Getting the Service Credentials](#getting-the-service-credentials)
  * [Usage](#usage)
  * [Client-side usage](#client-side-usage)
  * [Data collection opt-out](#data-collection-opt-out)
  * [Questions](#questions)
  * [Examples](#examples)
  * [IBM Watson Services](#ibm-watson-services)
    * [Authorization](#authorization)
    * [Conversation](#conversation)
    * [Discovery](#discovery)
    * [Language Translator](#language-translator)
    * [Natural Language Classifier](#natural-language-classifier)
    * [Natural Language Understanding](#natural-language-understanding)
    * [Personality Insights](#personality-insights)
    * [Speech to Text](#speech-to-text)
    * [Text to Speech](#text-to-speech)
    * [Tone Analyzer](#tone-analyzer)
    * [Visual Recognition](#visual-recognition)
  * [Composing Services](#composing-services)
  * [Debug](#debug)
  * [Tests](#tests)
  * [License](#license)
  * [Contributing](#contributing)

</details>

## Installation

```sh
npm install watson-developer-cloud
```

## Getting the service credentials

You will need the `username`, `password`, and `url` (`api_key` for Visual Recognition) for each service. Service credentials are different from your IBM Cloud account username and password.

To get your service credentials, follow these steps:

1.  Log in to IBM Cloud at https://console.bluemix.net/catalog/?category=watson.
1.  In the IBM Cloud **Catalog**, select the service you want to use.
1.  Type a unique name for the service instance in the **Service name** field. For example, type `my-service-name`. Leave the default values for the other options.
1.  Click **Create**.
1.  From the service dashboard, click **Service credentials**.
1.  Click **View credentials** under **Actions**.
1.  Copy `username`, `password` (or `api_key` for Visual Recognition), and `url`.

## Usage

The examples below assume that you already have service credentials. If not,
you will have to create a service in [IBM Cloud][ibm_cloud].

If you are running your application in IBM Cloud, you don't need to specify the
credentials; the library will get them for you by looking at the `VCAP_SERVICES` environment variable.

Credentials are checked for in the following order:

1. Hard-coded or programatic credentials passed to the service constructor

2. `SERVICE_NAME_USERNAME` and `SERVICE_NAME_PASSWORD` environment properties (or `SERVICE_NAME_API_KEY` when appropriate) and, optionally, `SERVICE_NAME_URL`

3. IBM-Cloud-supplied credentials (via the `VCAP_SERVICES` JSON-encoded environment property)

### Client-side usage

See the `examples/` folder for [Browserify](http://browserify.org/) and [Webpack](http://webpack.github.io/) client-side SDK examples (with server-side generation of auth tokens.)

Note: not all services currently support CORS, and therefore not all services can be used client-side.
Of those that do, most require an auth token to be generated server-side via the [Authorization Service](#authorization).

### Data collection opt-out

By default, [all requests are logged](https://console.bluemix.net/docs/services/watson/getting-started-logging.html). This can be disabled of by setting the `X-Watson-Learning-Opt-Out` header when creating the service instance:

```js
var myInstance = new watson.WhateverServiceV1({
  /* username, password, version, url, etc... */
  headers: {
    "X-Watson-Learning-Opt-Out": true
  }
});
```

## Documentation

You can find links to the documentation at https://console.bluemix.net/developer/watson/documentation. Find the service that you're interested in, click **API reference**, and then select the **Node** tab.

There are also auto-generated JSDocs available at http://watson-developer-cloud.github.io/node-sdk/master/


## Questions

If you are having difficulties using the APIs or have a question about the Watson services, please ask a question at [dW Answers](https://developer.ibm.com/answers/questions/ask/?topics=watson) or [Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-watson-cognitive).

## Examples

The [examples][examples] folder has basic and advanced examples.

### Authorization

The Authorization service can generate auth tokens for situations where providing the service username/password is undesirable.

Tokens are valid for 1 hour and may be sent using the `X-Watson-Authorization-Token` header or the `watson-token` query param.

Note that the token is supplied URL-encoded, and will not be accepted if it is double-encoded in a querystring.

```javascript
var watson = require('watson-developer-cloud');

var authorization = new watson.AuthorizationV1({
  username: '<Text to Speech username>',
  password: '<Text to Speech password>',
  url: 'https://stream.watsonplatform.net/authorization/api', // Speech tokens
});

authorization.getToken({
  url: 'https://stream.watsonplatform.net/text-to-speech/api'
},
function (err, token) {
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
  url: 'https://gateway.watsonplatform.net/conversation/api/',
  version_date: '2017-05-26'
});

conversation.message(
  {
    input: { text: "What's the weather?" },
    workspace_id: '<workspace id>'
  },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);
```

### Discovery

Use the [Discovery Service][discovery] to search and analyze structured and unstructured data.

```javascript
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
  username: '<username>',
  password: '<password>',
  url: 'https://gateway.watsonplatform.net/discovery/api/',
  version_date: '2017-09-01'
});

discovery.query(
  {
    environment_id: '<environment_id>',
    collection_id: '<collection_id>',
    query: 'my_query'
  },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);
```


### Language Translator

Translate text from one language to another or idenfity a language using the [Language Translator][language_translator] service.

```javascript
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var languageTranslator = new LanguageTranslatorV2({
  username: '<username>',
  password: '<password>',
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

languageTranslator.translate(
  {
    text: 'A sentence must have a verb',
    source: 'en',
    target: 'es'
  },
  function(err, translation) {
    if (err)  {
      console.log('error:', err);
    } else  {
      console.log(JSON.stringify(translation, null, 2));
  }
);

languageTranslator.identify(
  {
    text:
      'The language translator service takes text input and identifies the language used.'
  },
  function(err, language) {
    if (err)  {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(language, null, 2));
    }
  }
);
```


### Natural Language Classifier

Use [Natural Language Classifier](https://console.bluemix.net/docs/services/natural-language-classifier/getting-started.html) service to create a classifier instance by providing a set of representative strings and a set of one or more correct classes for each as training. Then use the trained classifier to classify your new question for best matching answers or to retrieve next actions for your application.

```javascript
var NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');

var classifier = new NaturalLanguageClassifierV1({
  username: '<username>',
  password: '<password>',
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api/'
});

classifier.classify(
  {
    text: 'Is it sunny?',
    classifier_id: '<classifier-id>'
  },
  function(err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);
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
  version_date: '2017-02-27',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

nlu.analyze(
  {
    html: file_data, // Buffer or String
    features: {
      concepts: {},
      keywords: {}
    }
  },
  function(err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);
```


### Personality Insights

Analyze text in English and get a personality profile by using the
[Personality Insights][personality_insights] service.

```javascript
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var personalityInsights = new PersonalityInsightsV3({
  username: '<username>',
  password: '<password>',
  version_date: '2016-10-19',
  url: 'https://gateway.watsonplatform.net/personality-insights/api/'
});

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
```


### Speech to Text

Use the [Speech to Text][speech_to_text] service to recognize the text from a `.wav` file.

```javascript
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speechToText = new SpeechToTextV1({
  username: '<username>',
  password: '<password>',
  url: 'https://stream.watsonplatform.net/speech-to-text/api/'
});

var params = {
  // From file
  audio: fs.createReadStream('./resources/speech.wav'),
  content_type: 'audio/l16; rate=44100'
};

speechToText.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});

// or streaming
fs.createReadStream('./resources/speech.wav')
  .pipe(speechToText.createRecognizeStream({ content_type: 'audio/l16; rate=44100' }))
  .pipe(fs.createWriteStream('./transcription.txt'));
```


### Text to Speech

Use the [Text to Speech][text_to_speech] service to synthesize text into a .wav file.

```js
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var textToSpeech = new TextToSpeechV1({
  username: '<username>',
  password: '<password>',
  url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});

var params = {
  text: 'Hello from IBM Watson',
  voice: 'en-US_AllisonVoice', // Optional voice
  accept: 'audio/wav'
};

// Synthesize speech, correct the wav header, then save to disk
// (wav header requires a file length, but this is unknown until after the header is already generated and sent)
textToSpeech
  .synthesize(params, function(err, audio) {
    if (err) {
      console.log(err);
      return;
    }
    textToSpeech.repairWavHeader(audio);
    fs.writeFileSync('audio.wav', audio);
    console.log('audio.wav written with a corrected wav header');
});
```

### Tone Analyzer

Use the [Tone Analyzer][tone_analyzer] service to analyze the
emotion, writing and social tones of a text.

```js
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
  username: '<username>',
  password: '<password>',
  version_date: '2016-05-19',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});

toneAnalyzer.tone(
  {
    tone_input: 'Greetings from Watson Developer Cloud!',
    content_type: 'text/plain'
  },
  function(err, tone) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(tone, null, 2));
    }
  }
);
```


### Visual Recognition

Use the [Visual Recognition][visual_recognition] service to recognize the
following picture.

<img src="https://visual-recognition-demo.ng.bluemix.net/images/samples/5.jpg" />

```js
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
  api_key: '<api_key>',
  version_date: '2016-05-20'
});

var params = {
  images_file: fs.createReadStream('./resources/car.png')
};

visualRecognition.classify(params, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 2));
  }
});
```


## Composing services

### Integration of Tone Analyzer with Conversation
Sample code for [integrating Tone Analyzer and Conversation][conversation_tone_analyzer_example] is provided in the [examples directory][examples].

## Unauthenticated requests
By default, the library tries to use Basic Auth and will ask for `api_key` or `username` and `password` and send an `Authorization: Basic XXXXXXX`. You can avoid this by using:

`use_unauthenticated`.

```javascript
var watson = require('watson-developer-cloud');

var conversation = new watson.ConversationV1({
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
[visual_recognition]: https://www.ibm.com/watson/services/visual-recognition/
[tone_analyzer]: https://www.ibm.com/watson/services/tone-analyzer/
[text_to_speech]: https://www.ibm.com/watson/services/text-to-speech/
[speech_to_text]: https://www.ibm.com/watson/services/speech-to-text/
[language_translator]: https://www.ibm.com/watson/services/language-translator/

[ibm_cloud]: https://console.bluemix.net
[npm_link]: https://www.npmjs.com/package/watson-developer-cloud
[request_github]: https://github.com/request/request
[dialog_migration]: https://console.bluemix.net/docs/services/conversation/index.html

[examples]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples
[document_conversion_integration_example]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples/document_conversion_integration.v1.js
[conversation_tone_analyzer_example]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples/conversation_tone_analyzer_integration

[license]: http://www.apache.org/licenses/LICENSE-2.0
