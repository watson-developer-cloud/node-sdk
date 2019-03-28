# Watson APIs Node.js SDK

[![Build Status](https://secure.travis-ci.org/watson-developer-cloud/node-sdk.svg)](http://travis-ci.org/watson-developer-cloud/node-sdk)
[![codecov](https://codecov.io/gh/watson-developer-cloud/node-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/watson-developer-cloud/node-sdk)
[![Slack](https://wdc-slack-inviter.mybluemix.net/badge.svg)](https://wdc-slack-inviter.mybluemix.net)
[![npm-version](https://img.shields.io/npm/v/watson-developer-cloud.svg)](https://www.npmjs.com/package/watson-developer-cloud)
[![npm-downloads](https://img.shields.io/npm/dm/watson-developer-cloud.svg)](https://www.npmjs.com/package/watson-developer-cloud)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Node.js client library to use the Watson APIs.

<details>
  <summary>Table of Contents</summary>

  * [Before you begin](#before-you-begin)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Client-side usage](#client-side-usage)
  * [Authentication](#authentication)
    * [IAM](#iam)
    * [Username and password](#username-and-password)
    * [API key](#api-key)
  * [Callbacks vs Promises](#callbacks-vs-promises)
  * [Sending request headers](#sending-request-headers)
  * [Parsing HTTP response](#parsing-http-response)
  * [Data collection opt-out](#data-collection-opt-out)
  * [Documentation](#documentation)
  * [Questions](#questions)
  * [IBM Watson services](#ibm-watson-services)
    * [Authorization](#authorization)
    * [Assistant v2](#assistant-v2)
    * [Assistant v1](#assistant-v1)
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

## Before you begin
* You need an [IBM Cloud][ibm-cloud-onboarding] account.

## Installation

```sh
npm install watson-developer-cloud
```

## Usage

The [examples][examples] folder has basic and advanced examples. The examples within each service assume that you already have [service credentials](#getting-credentials).

Credentials are checked for in the following order:

1. Hard-coded or programatic credentials passed to the service constructor

2. Environment variables:
- `SERVICE_NAME_USERNAME` and `SERVICE_NAME_PASSWORD` environment properties
- If using IAM: `SERVICE_NAME_IAM_APIKEY` and optionally `SERVICE_NAME_IAM_URL`, or `SERVICE_NAME_IAM_ACCESS_TOKEN`
- Optionally, `SERVICE_NAME_URL`

3. IBM-Cloud-supplied credentials (via the `VCAP_SERVICES` JSON-encoded environment property)

If you run your app in IBM Cloud, the SDK gets credentials from the [`VCAP_SERVICES`][vcap_services] environment variable.

### Client-side usage

See the `examples/` folder for [Browserify](http://browserify.org/) and [Webpack](http://webpack.github.io/) client-side SDK examples (with server-side generation of auth tokens.)

Note: not all services currently support CORS, and therefore not all services can be used client-side.
Of those that do, most require an auth token to be generated server-side via the [Authorization Service](#authorization).

## Authentication
Watson services are migrating to token-based Identity and Access Management (IAM) authentication.

- With some service instances, you authenticate to the API by using **[IAM](#iam)**.
- In other instances, you authenticate by providing the **[username and password](#username-and-password)** for the service instance.

### Getting credentials

To find out which authentication to use, view the service credentials. You find the service credentials for authentication the same way for all Watson services:

1.  Go to the IBM Cloud [Dashboard](https://cloud.ibm.com/) page.
2.  Either click an existing Watson service instance in your [resource list](https://cloud.ibm.com/resources) or click [**Create resource > AI**](https://cloud.ibm.com/catalog?category=ai) and create a service instance.
3. Click on the **Manage** item in the left nav bar of your service instance.

On this page, you should be able to see your credentials for accessing your service instance.

In your code, you can use these values in the service constructor or with a method call after instantiating your service.

### Supplying credentials

There are two ways to supply the credentials you found above to the SDK for authentication:

#### Credentials file (easier!)

With a credentials file, you just need to put the file in the right place and the SDK will do the work of parsing it and authenticating. You can get this file by clicking the **Download** button for the credentials in the **Manage** tab of your service instance.

The file downloaded will be called `ibm-credentials.env`. This is the name the SDK will search for and **must** be preserved unless you want to configure the file path (more on that later). The SDK will look for your `ibm-credentials.env` file in the following places (in order):

- Directory provided by the environment variable `IBM_CREDENTIALS_FILE`
- Your system's home directory
- Your current working directory (the directory Node is executed from)

As long as you set that up correctly, you don't have to worry about setting any authentication options in your code. So, for example, if you created and downloaded the credential file for your Discovery instance, you just need to do the following:

```js
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const discovery = new DiscoveryV1({ version: '2019-02-01' });
```

And that's it!

If you're using more than one service at a time in your code and get two different `ibm-credentials.env` files, just put the contents together in one `ibm-credentials.env` file and the SDK will handle assigning credentials to their appropriate services.

If you would like to configure the location/name of your credential file, you can set an environment variable called `IBM_CREDENTIALS_FILE`. **This will take precedence over the locations specified above.** Here's how you can do that:

```bash
export IBM_CREDENTIALS_FILE="<path>"
```

where `<path>` is something like `/home/user/Downloads/<file_name>.env`. If you just provide a path to a directory, the SDK will look for a file called `ibm-credentials.env` in that directory.

#### Manually

The SDK also supports setting credentials manually in your code. You will either use IAM credentials or Basic Authentication (username/password) credentials.

##### IAM

Some services use token-based Identity and Access Management (IAM) authentication. IAM authentication uses a service API key to get an access token that is passed with the call. Access tokens are valid for approximately one hour and must be regenerated.

You supply either an IAM service **API key** or an **access token**:

- Use the API key to have the SDK manage the lifecycle of the access token. The SDK requests an access token, ensures that the access token is valid, and refreshes it if necessary.
- Use the access token if you want to manage the lifecycle yourself. For details, see [Authenticating with IAM tokens](https://console.bluemix.net/docs/services/watson/getting-started-iam.html). If you want to switch to API key, override your stored IAM credentials with an IAM API key.

###### Supplying the IAM API key

```js
// in the constructor, letting the SDK manage the IAM token
const discovery = new DiscoveryV1({
  url: '<service_url>',
  version: '<version-date>',
  iam_apikey: '<iam_api_key>',
  iam_url: '<iam_url>', // optional - the default value is https://iam.bluemix.net/identity/token
});
```

###### Supplying the access token

```js
// in the constructor, assuming control of managing IAM token
const discovery = new DiscoveryV1({
  url: '<service_url>',
  version: '<version-date>',
  iam_access_token: '<access-token>'
});
```

```js
// after instantiation, assuming control of managing IAM token
const discovery = new DiscoveryV1({
  url: '<service_url>',
  version: '<version-date>'
});

discovery.setAccessToken('<access-token>')
```

### Username and password

```javascript
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
    version: '{version}',
    username: '{username}',
    password: '{password}'
  });
```

### Callbacks vs Promises

All SDK methods are asynchronous, as they are making network requests to Watson services. To handle receiving the data from these requests, the SDK offers support for both Promises and Callback functions. A Promise will be returned by default unless a Callback function is provided.

```js
const discovery = new watson.DiscoveryV1({
/* iam_apikey, version, url, etc... */
});

// using Promises
discovery.listEnvironments()
  .then(body => {
    console.log(JSON.stringify(body, null, 2));
  })
  .catch(err => {
    console.log(err);
  });

// using Promises provides the ability to use async / await
async function callDiscovery() { // note that callDiscovery also returns a Promise
  const body = await discovery.listEnvironments();
}

// using a Callback function
discovery.listEnvironments((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 2));
  }
});
```

### Setting the service URL

You can set the service URL by calling the setServiceUrl() method.

```javascript
const discovery = new DiscoveryV1({
  version: '<version-date>'
});

discovery.setServiceUrl('https://gateway-wdc.watsonplatform.net/discovery/api');
```

### Sending request headers

Custom headers can be passed with any request. Each method has an optional parameter `headers` which can be used to pass in these custom headers, which can override headers that we use as parameters.

For example, this is how you can pass in custom headers to Watson Assistant service. In this example, the `'custom'` value for `'Accept-Language'` will override the default header for `'Accept-Language'`, and the `'Custom-Header'` while not overriding the default headers, will additionally be sent with the request.

```js
var assistant = new watson.AssistantV1({
/* username, password, version, url, etc... */
});

assistant.message({
  workspace_id: 'something',
  input: {'text': 'Hello'},
  headers: {
    'Custom-Header': 'custom',
    'Accept-Language': 'custom'

  }
},  function(err, result, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(result, null, 2));
});

```

### Parsing HTTP response

To retrieve the HTTP response, all methods can be called with a callback function with three parameters, with the third being the response. Users for example may retrieve the response headers with this usage pattern.

If using Promises, the parameter `return_response` must be added and set to `true`. Then, the result returned will be equivalent to the third argument in the callback function - the entire response.

Here is an example of how to access the response headers for Watson Assistant:

```js
var assistant = new watson.AssistantV1({
/* username, password, version, url, etc... */
});

assistant.message(params,  function(err, result, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(response.headers);
});

// using Promises

params.return_response = true;

assistant.message(params)
  .then(response => {
    console.log(response.headers);
  })
  .catch(err => {
    console.log('error:', err);
  });

```

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

### Configuring the HTTP client

The HTTP client can be configured to disable SSL verification. Note that this has serious security implications - only do this if you really mean to! ⚠️

To do this, set `disable_ssl_verification` to `true` in the service constructor, like below:

```
const discovery = new DiscoveryV1({
  url: '<service_url>',
  version: '<version-date>',
  iam_apikey: '<iam_api_key>',
  disable_ssl_verification: true, // this will disable SSL verification for any request made with this object
});
```

## Documentation

You can find links to the documentation at https://console.bluemix.net/developer/watson/documentation. Find the service that you're interested in, click **API reference**, and then select the **Node** tab.

There are also auto-generated JSDocs available at http://watson-developer-cloud.github.io/node-sdk/master/

## Questions

If you are having difficulties using the APIs or have a question about the Watson services, please ask a question at [dW Answers](https://developer.ibm.com/answers/questions/ask/?topics=watson) or [Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-watson-cognitive).

## IBM Watson services

### Authorization

The Authorization service can generate auth tokens for situations where providing the service username/password is undesirable.

Tokens are valid for 1 hour and may be sent using the `X-Watson-Authorization-Token` header or the `watson-token` query param.
Note that the token is supplied URL-encoded, and will not be accepted if it is double-encoded in a querystring.

> _NOTE_: Authenticating with the `X-Watson-Authorization-Token` header or the `watson-token` query param is now deprecated. The token continues to work with Cloud Foundry services, but is not supported for services that use Identity and Access Management (IAM) authentication. For details see [Authenticating with IAM tokens](https://console.bluemix.net/docs/services/watson/getting-started-iam.html#iam) or the README in the IBM Watson SDK you use.
The Authorization SDK now supports returning IAM Access Tokens when instantiated with an IAM API key.

```javascript
var watson = require('watson-developer-cloud');

// to get an IAM Access Token
var authorization = new watson.AuthorizationV1({
  iam_apikey: '<Service API key>',
  iam_url: '<IAM endpoint URL - OPTIONAL>',
});

authorization.getToken(function (err, token) {
  if (!token) {
    console.log('error:', err);
  } else {
    // Use your token here
  }
});

// to get a Watson Token - NOW DEPRECATED
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

### Assistant v2

Use the [Assistant][conversation] service to determine the intent of a message.

Note: You must first create a workspace via IBM Cloud. See [the documentation](https://console.bluemix.net/docs/services/conversation/index.html#about) for details.

```js
var AssistantV2 = require('watson-developer-cloud/assistant/v2');

var assistant = new AssistantV2({
  username: '<username>',
  password: '<password>',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-09-19'
});

assistant.message(
  {
    input: { text: "What's the weather?" },
    assistant_id: '<assistant id>',
    session_id: '<session id>',
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

### Assistant v1

Use the [Assistant][assistant] service to determine the intent of a message.

Note: You must first create a workspace via IBM Cloud. See [the documentation](https://console.bluemix.net/docs/services/conversation/index.html#about) for details.

```js
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var assistant = new AssistantV1({
  username: '<username>',
  password: '<password>',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-02-16'
});

assistant.message(
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

### Compare Comply

Use the Compare Comply service to compare and classify documents.

```javascript
const fs = require('fs');
const CompareComplyV1 = require('watson-developer-cloud/compare-comply/v1');

const compareComply = new CompareComplyV1({
  iam_apikey: '<iam_apikey>',
  url: 'https://gateway.watsonplatform.net/compare-comply/api',
  version: '2018-12-06'
});

compareComply.compareDocuments(
  {
      file_1: fs.createReadStream('<path-to-file-1>'),
      file_1_filename: '<filename-1>',
      file_1_label: 'file-1',
      file_2: fs.createReadStream('<path-to-file-2>'),
      file_2_filename: '<filename-2>',
      file_2_label: 'file-2',
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
  version: '2017-09-01'
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
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');

const languageTranslator = new LanguageTranslatorV3({
  iam_apikey: '<apikey>',
  url: 'https://gateway.watsonplatform.net/language-translator/api/',
  version: 'YYYY-MM-DD',
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
  version: '2018-04-05',
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
  version: '2016-10-19',
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
  .pipe(speechToText.recognizeUsingWebSocket({ content_type: 'audio/l16; rate=44100' }))
  .pipe(fs.createWriteStream('./transcription.txt'));
```


### Text to Speech

Use the [Text to Speech][text_to_speech] service to synthesize text into an audio file.

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


// or, using WebSockets
textToSpeech.synthesizeUsingWebSocket(params);
synthStream.pipe(fs.createWriteStream('./audio.ogg'));
// see more information in examples/text_to_speech_websocket.js
```



### Tone Analyzer

Use the [Tone Analyzer][tone_analyzer] service to analyze the
emotion, writing and social tones of a text.

```js
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
  username: '<username>',
  password: '<password>',
  version: '2016-05-19',
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
  url: '<service_url>',
  version: '2018-03-19',
  iam_apikey: '<iam_api_key>',
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
Sample code for [integrating Tone Analyzer and Assistant][assistant_tone_analyzer_example] is provided in the [examples directory][examples].

## Unauthenticated requests
By default, the library tries to authenticate and will ask for `iam_apikey`, `iam_access_token`, or `username` and `password` to send an `Authorization` header. You can avoid this by using:

`use_unauthenticated`.

```javascript
var watson = require('watson-developer-cloud');

var assistant = new watson.AssistantV1({
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
$ jest '<path to test>'
```

## Open source @ IBM
[Find more open source projects on the IBM Github Page.](http://ibm.github.io/)

## License

This library is licensed under Apache 2.0. Full license text is available in
[COPYING][license].

## Contributing

See [CONTRIBUTING](https://github.com/watson-developer-cloud/node-sdk/blob/master/.github/CONTRIBUTING.md).

[assistant]: https://www.ibm.com/watson/services/conversation/
[discovery]: https://www.ibm.com/watson/services/discovery/
[personality_insights]: https://www.ibm.com/watson/services/personality-insights/
[visual_recognition]: https://www.ibm.com/watson/services/visual-recognition/
[tone_analyzer]: https://www.ibm.com/watson/services/tone-analyzer/
[text_to_speech]: https://www.ibm.com/watson/services/text-to-speech/
[speech_to_text]: https://www.ibm.com/watson/services/speech-to-text/
[language_translator]: https://www.ibm.com/watson/services/language-translator/
[ibm_cloud]: https://console.bluemix.net
[watson-dashboard]: https://console.bluemix.net/dashboard/apps?category=watson
[npm_link]: https://www.npmjs.com/package/watson-developer-cloud
[request_github]: https://github.com/request/request
[examples]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples
[document_conversion_integration_example]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples/document_conversion_integration.v1.js
[assistant_tone_analyzer_example]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples/conversation_tone_analyzer_integration
[license]: http://www.apache.org/licenses/LICENSE-2.0
[vcap_services]: https://console.bluemix.net/docs/services/watson/getting-started-variables.html
[ibm-cloud-onboarding]: http://console.bluemix.net/registration?target=/developer/watson&cm_sp=WatsonPlatform-WatsonServices-_-OnPageNavLink-IBMWatson_SDKs-_-Node

