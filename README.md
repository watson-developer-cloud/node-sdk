# Watson APIs Node.js SDK

[![Build and Test](https://github.com/watson-developer-cloud/node-sdk/workflows/Build%20and%20Test/badge.svg?branch=master)](https://github.com/watson-developer-cloud/node-sdk/actions?query=workflow%3A"Build+and+Test")
[![Deploy and Publish](https://github.com/watson-developer-cloud/node-sdk/workflows/Deploy%20and%20Publish/badge.svg?branch=master)](https://github.com/watson-developer-cloud/node-sdk/actions?query=workflow%3A%22Deploy+and+Publish%22)
[![codecov](https://codecov.io/gh/watson-developer-cloud/node-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/watson-developer-cloud/node-sdk)
[![Slack](https://wdc-slack-inviter.mybluemix.net/badge.svg)](https://wdc-slack-inviter.mybluemix.net)
[![npm-version](https://img.shields.io/npm/v/ibm-watson.svg)](https://www.npmjs.com/package/ibm-watson)
[![npm-downloads](https://img.shields.io/npm/dm/ibm-watson.svg)](https://www.npmjs.com/package/ibm-watson)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Deprecated builds
[![Build Status](https://secure.travis-ci.org/watson-developer-cloud/node-sdk.svg?branch=master)](http://travis-ci.org/watson-developer-cloud/node-sdk)

Node.js client library to use the Watson APIs.

## Before you begin
* You need an [IBM Cloud][ibm-cloud-onboarding] account.

## Prerequisites
- **Node >=16**: This SDK is tested with Node versions 16 and up. It may work on previous versions but this is not officially supported.

## Installation

```sh
npm install ibm-watson
```

## Usage

```js
import DiscoveryV1 from 'ibm-watson/discovery/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

const discoveryClient = new DiscoveryV1({
  authenticator: new IamAuthenticator({ apikey: '{apikey}' }),
  version: '{version}',
});

// ...

```

The [examples][examples] folder has basic and advanced examples. The examples within each service assume that you already have [service credentials](#getting-credentials).

### Client-side usage

Starting with v5.0.0, the SDK should work in the browser, out of the box, with most bundlers.

See the `examples/` folder for [Browserify](http://browserify.org/) and [Webpack](http://webpack.github.io/) client-side SDK examples (with server-side generation of auth tokens.)

Note: not all services currently support CORS, and therefore not all services can be used client-side.
Of those that do, most require an auth token to be generated server-side via the [Authorization Service](#authorization).

## Authentication
Watson services are migrating to token-based Identity and Access Management (IAM) authentication.

- With some service instances, you authenticate to the API by using **[IAM](#iam)**.
- In other instances, you authenticate by providing the **[username and password](#username-and-password)** for the service instance.
- If you're using a Watson service on ICP, you'll need to authenticate in [a specific way](#icp).

Authentication is accomplished using dedicated Authenticators for each authentication scheme. Import authenticators from `ibm-watson/auth` or rely on externally-configured credentials which will be read from a credentials file or environment variables.

To learn more about the Authenticators and how to use them with your services, see [the detailed documentation](https://github.com/IBM/node-sdk-core/blob/master/AUTHENTICATION.md).

### Getting credentials

To find out which authentication to use, view the service credentials. You find the service credentials for authentication the same way for all Watson services:

1.  Go to the IBM Cloud [Dashboard](https://cloud.ibm.com/) page.
2.  Either click an existing Watson service instance in your [resource list](https://cloud.ibm.com/resources) or click [**Create resource > AI**](https://cloud.ibm.com/catalog?category=ai) and create a service instance.
3. Click on the **Manage** item in the left nav bar of your service instance.

On this page, you should be able to see your credentials for accessing your service instance.

In your code, you can use these values in the service constructor or with a method call after instantiating your service.

### Supplying credentials

There are two ways to supply the credentials you found above to the SDK for authentication:
- Allow the credentials to be automatically read from the environment
- Instantiate an authenticator with explicit credentials and use it to create your service

#### Credentials file (easier!)

With a credentials file, you just need to put the file in the right place and the SDK will do the work of parsing it and authenticating. You can get this file by clicking the **Download** button for the credentials in the **Manage** tab of your service instance.

The file downloaded will be called `ibm-credentials.env`. This is the name the SDK will search for and **must** be preserved unless you want to configure the file path (more on that later). The SDK will look for your `ibm-credentials.env` file in the following places (in order):

- Directory provided by the environment variable `IBM_CREDENTIALS_FILE`
- Your system's home directory
- Your current working directory (the directory Node is executed from)

As long as you set that up correctly, you don't have to worry about setting any authentication options in your code. So, for example, if you created and downloaded the credential file for your Discovery instance, you just need to do the following:

```js
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const discovery = new DiscoveryV1({ version: '2019-02-01' });
```

And that's it!

If you're using more than one service at a time in your code and get two different `ibm-credentials.env` files, just put the contents together in one `ibm-credentials.env` file and the SDK will handle assigning credentials to their appropriate services.

**Special Note**: Due to legacy issues in Assistant V1 and V2 as well as Visual Recognition V3 and V4, the following parameter `serviceName` must be added when creating the service object:
```js
const AssistantV1 = require('ibm-watson/assistant/v1');
const assistant = new AssistantV1({
  version: '2020-04-01',
  serviceName: 'assistant',
})
```
```js
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const assistant = new VisualRecognitionV3({
  version: '2018-03-19',
  serviceName: 'visual-recognition',
})
```
It is worth noting that if you are planning to rely on VCAP_SERVICES for authentication then the `serviceName` parameter **MUST** be removed otherwise VCAP_SERVICES will not be able to authenticate you. See [Cloud Authentication Prioritization](#cloud-authentication-prioritization) for more details.

If you would like to configure the location/name of your credential file, you can set an environment variable called `IBM_CREDENTIALS_FILE`. **This will take precedence over the locations specified above.** Here's how you can do that:

```bash
export IBM_CREDENTIALS_FILE="<path>"
```

where `<path>` is something like `/home/user/Downloads/<file_name>.env`. If you just provide a path to a directory, the SDK will look for a file called `ibm-credentials.env` in that directory.

#### Manually

The SDK also supports setting credentials manually in your code, using an Authenticator.

##### IAM

Some services use token-based Identity and Access Management (IAM) authentication. IAM authentication uses a service API key to get an access token that is passed with the call. Access tokens are valid for approximately one hour and must be regenerated.

To use IAM authentication, you must use an `IamAuthenticator` or a `BearerTokenAuthenticator`.
- Use the `IamAuthenticator` to have the SDK manage the lifecycle of the access token. The SDK requests an access token, ensures that the access token is valid, and refreshes it if necessary.
- Use the `BearerTokenAuthenticator` if you want to manage the lifecycle yourself. For details, see [Authenticating with IAM tokens](https://cloud.ibm.com/docs/watson/getting-started-iam.html). If you want to switch your authenticator, you must override the `authenticator` property directly.

##### ICP

To use the SDK in a Cloud Pak, use the `CloudPakForDataAuthenticator`. This will require a username, password, and URL.

### Cloud Authentication Prioritization

When uploading your application to IBM Cloud there is a certain priority Watson services will use when looking for proper credentials. The order is as follows:
1. Programmatic (i.e. IamAuthenticator)
2. Credentials File
3. VCAP_SERVICES (an environment variable used by IBM Cloud, details found [here](https://cloud.ibm.com/docs/watson?topic=watson-vcapServices))

## Setting the Service URL
You can set or reset the base URL after constructing the client instance using the `setServiceUrl` method:

```js
const DiscoveryV1 = require('ibm-watson/discovery/v1');

const discovery = DiscoveryV1({
/* authenticator, version, etc... */
});

discovery.setServiceUrl('<new url>');
```

## Promises

All SDK methods are asynchronous, as they are making network requests to Watson services. To handle receiving the data from these requests, the SDK offers support with Promises.
```js
const DiscoveryV1 = require('ibm-watson/discovery/v1');

const discovery = new DiscoveryV1({
/* authenticator, version, serviceUrl, etc... */
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
```

## Sending request headers

Custom headers can be passed with any request. Each method has an optional parameter `headers` which can be used to pass in these custom headers, which can override headers that we use as parameters.

For example, this is how you can pass in custom headers to Watson Assistant service. In this example, the `'custom'` value for `'Accept-Language'` will override the default header for `'Accept-Language'`, and the `'Custom-Header'` while not overriding the default headers, will additionally be sent with the request.

```js
const assistant = new watson.AssistantV1({
/* authenticator, version, serviceUrl, etc... */
});

assistant.message({
  workspaceId: 'something',
  input: {'text': 'Hello'},
  headers: {
    'Custom-Header': 'custom',
    'Accept-Language': 'custom'
  }
})
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error: ', err);
  });
```

## Parsing HTTP response

The SDK now returns the full HTTP response by default for each method.

Here is an example of how to access the response headers for Watson Assistant:

```js
const assistant = new AssistantV1({
/* authenticator, version, serviceUrl, etc... */
});

assistant.message(params).then(
  response => {
    console.log(response.headers);
  },
  err => {
    console.log(err);
    /*
      `err` is an Error object. It will always have a `message` field
      and depending on the type of error, it may also have the following fields:
      - body
      - headers
      - name
      - code
    */
  }
);
```

### Global Transaction ID
Every SDK call returns a response with a transaction ID in the `X-Global-Transaction-Id` header. Together the service instance region, this ID helps support teams troubleshoot issues from relevant logs.

#### HTTP Example
```js
const assistant = new AssistantV1({
/* authenticator, version, serviceUrl, etc... */
});

assistant.message(params).then(
  response => {
    console.log(response.headers['X-Global-Transaction-Id']);
  },
  err => {
    console.log(err);
  }
);
```

#### WebSocket Example
```js
const speechToText = new SpeechToTextV1({
/* authenticator, version, serviceUrl, etc... */
});
const recognizeStream = recognizeUsingWebSocket(params);

// getTransactionId returns a Promise that resolves to the ID
recognizeStream.getTransactionId().then(
  globalTransactionId => console.log(globalTransactionId),
  err => console.log(err),
);
```

However, the transaction ID isn't available when the API doesn't return a response for some reason. In that case, you can set your own transaction ID in the request. For example, replace `<my-unique-transaction-id>` in the following example with a unique transaction ID.

```js
const assistant = new AssistantV1({
/* authenticator, version, serviceUrl, etc... */
});

assistant.message({
  workspaceId: 'something',
  input: {'text': 'Hello'},
  headers: {
    'X-Global-Transaction-Id': '<my-unique-transaction-id>'
  }
}).then(
  response => {
    console.log(response.headers['X-Global-Transaction-Id']);
  },
  err => {
    console.log(err);
  }
);
```

## Data collection opt-out

By default, [all requests are logged](https://cloud.ibm.com/docs/watson/getting-started-logging.html). This can be disabled of by setting the `X-Watson-Learning-Opt-Out` header when creating the service instance:

```js
const myInstance = new watson.WhateverServiceV1({
  /* authenticator, version, serviceUrl, etc... */
  headers: {
    "X-Watson-Learning-Opt-Out": true
  }
});
```

## Configuring the HTTPS Agent
The SDK provides the user with full control over the HTTPS Agent used to make requests. This is available for both the service client and the authenticators that make network requests (e.g. `IamAuthenticator`). Outlined below are a couple of different scenarios where this capability is needed. Note that this functionality is for Node environments only - these configurtions will have no effect in the browser.

### Use behind a corporate proxy
To use the SDK (which makes HTTPS requests) behind an HTTP proxy, a special tunneling agent must be used. Use the package [`tunnel`](https://github.com/koichik/node-tunnel/) for this. Configure this agent with your proxy information, and pass it in as the HTTPS agent in the service constructor. Additionally, you must set `proxy` to `false` in the service constructor. If using an Authenticator that makes network requests (IAM or CP4D), you must set these fields in the Authenticator constructor as well.

See this example configuration:
```js
const tunnel = require('tunnel');
const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const httpsAgent = tunnel.httpsOverHttp({
  proxy: {
    host: 'some.host.org',
    port: 1234,
  },
});

const assistant = new AssistantV1({
  authenticator: new IamAuthenticator({
    apikey: 'fakekey-1234'
    httpsAgent, // not necessary if using Basic or BearerToken authentication
    proxy: false,
  }),
  version: '2020-01-28',
  httpsAgent,
  proxy: false,
});
```

### Sending custom certificates
To send custom certificates as a security measure in your request, use the `cert`, `key`, and/or `ca` properties of the HTTPS Agent. See [this documentation](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options) for more information about the options. Note that the entire contents of the file must be provided - not just the file name.
```js
const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const certFile = fs.readFileSync('./my-cert.pem');
const keyFile = fs.readFileSync('./my-key.pem');

const assistant = new AssistantV1({
  authenticator: new IamAuthenticator({
    apikey: 'fakekey-1234',
    httpsAgent: new https.Agent({
      key: keyFile,
      cert: certFile,
    })
  }),
  version: '2019-02-28',
  httpsAgent: new https.Agent({
    key: keyFile,
    cert: certFile,
  }),
});
```

### Disabling SSL Verification

The HTTP client can be configured to disable SSL verification. **Note that this has serious security implications - only do this if you really mean to!** ⚠️

To do this, set `disableSslVerification` to `true` in the service constructor and/or authenticator constructor, like below:

```js
const discovery = new DiscoveryV1({
  serviceUrl: '<service_url>',
  version: '<version-date>',
  authenticator: new IamAuthenticator({ apikey: '<apikey>', disableSslVerification: true }), // this will disable SSL verification for requests to the token endpoint
  disableSslVerification: true, // this will disable SSL verification for any request made with this client instance
});
```

### All other configuration options
To see all possible https agent configuration options go to this [link](https://node.readthedocs.io/en/latest/api/https/#httpsrequestoptions-callback) for the quickest and most readable format. For even more detailed information, you can go to the Node documentation [here](https://nodejs.org/api/http.html#httprequestoptions-callback)

## Documentation

You can find links to the documentation at https://cloud.ibm.com/developer/watson/documentation. Find the service that you're interested in, click **API reference**, and then select the **Node** tab.

There are also auto-generated JSDocs available at http://watson-developer-cloud.github.io/node-sdk/master/

## Questions

If you have issues with the APIs or have a question about the Watson services, see [Stack Overflow](https://stackoverflow.com/questions/tagged/ibm-watson+node.js).

## IBM Watson services

### Assistant v2

Use the [Assistant][assistant] service to determine the intent of a message.

Note: You must first create a workspace via IBM Cloud. See [the documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-index#about) for details.

```js
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  authenticator: new IamAuthenticator({ apikey: '<apikey>' }),
  serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com',
  version: '2018-09-19'
});

assistant.message(
  {
    input: { text: "What's the weather?" },
    assistantId: '<assistant id>',
    sessionId: '<session id>',
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  });
```

### Assistant v1

Use the [Assistant][assistant] service to determine the intent of a message.

Note: You must first create a workspace via IBM Cloud. See [the documentation](https://cloud.ibm.com/docs/assistant?topic=assistant-index#about) for details.

```js
const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV1({
  authenticator: new IamAuthenticator({ apikey: '<apikey>' }),
  serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com',
  version: '2018-02-16'
});

assistant.message(
  {
    input: { text: "What's the weather?" },
    workspaceId: '<workspace id>'
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  });
```

### Discovery v2

Use the [Discovery Service][discovery] to search and analyze structured and unstructured data.

```js
const DiscoveryV2 = require('ibm-watson/discovery/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const discovery = new DiscoveryV2({
  authenticator: new IamAuthenticator({ apikey: '<apikey>' }),
  serviceUrl: 'https://api.us-south.discovery.watson.cloud.ibm.com',
  version: '2019-11-22'
});

discovery.query(
  {
    projectId: '<project_id>',
    collectionId: '<collection_id>',
    query: 'my_query'
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  });
```
### Discovery v1

Use the [Discovery Service][discovery] to search and analyze structured and unstructured data.

```js
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const discovery = new DiscoveryV1({
  authenticator: new IamAuthenticator({ apikey: '<apikey>' }),
  serviceUrl: 'https://api.us-south.discovery.watson.cloud.ibm.com',
  version: '2017-09-01'
});

discovery.query(
  {
    environmentId: '<environment_id>',
    collectionId: '<collection_id>',
    query: 'my_query'
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  });
```

### Language Translator

Translate text from one language to another or idenfity a language using the [Language Translator][language_translator] service.

```js
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  authenticator: new IamAuthenticator({ apikey: '<apikey>' }),
  serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com',
  version: 'YYYY-MM-DD',
});

languageTranslator.translate(
  {
    text: 'A sentence must have a verb',
    source: 'en',
    target: 'es'
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error: ', err);
  });

languageTranslator.identify(
  {
    text:
      'The language translator service takes text input and identifies the language used.'
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error: ', err);
  });
```


### Natural Language Understanding

[Natural Language Understanding](https://cloud.ibm.com/docs/services/natural-language-understanding/getting-started.html) is a collection of natural language processing APIs that help you understand sentiment, keywords, entities, high-level concepts and more.

```js
const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({ apikey: '<apikey>' }),
  version: '2018-04-05',
  serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com'
});

nlu.analyze(
  {
    html: file_data, // Buffer or String
    features: {
      concepts: {},
      keywords: {}
    }
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error: ', err);
  });
```


### Speech to Text

Use the [Speech to Text][speech_to_text] service to recognize the text from a `.wav` file.

```js
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({ apikey: '<apikey>' }),
  serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com'
});

const params = {
  // From file
  audio: fs.createReadStream('./resources/speech.wav'),
  contentType: 'audio/l16; rate=44100'
};

speechToText.recognize(params)
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  });

// or streaming
fs.createReadStream('./resources/speech.wav')
  .pipe(speechToText.recognizeUsingWebSocket({ contentType: 'audio/l16; rate=44100' }))
  .pipe(fs.createWriteStream('./transcription.txt'));
```


### Text to Speech

Use the [Text to Speech][text_to_speech] service to synthesize text into an audio file.

```js
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({ apikey: '<apikey>' }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com'
});

const params = {
  text: 'Hello from IBM Watson',
  voice: 'en-US_AllisonVoice', // Optional voice
  accept: 'audio/wav'
};

// Synthesize speech, correct the wav header, then save to disk
// (wav header requires a file length, but this is unknown until after the header is already generated and sent)
// note that `repairWavHeaderStream` will read the whole stream into memory in order to process it.
// the method returns a Promise that resolves with the repaired buffer
textToSpeech
  .synthesize(params)
  .then(response => {
    const audio = response.result;
    return textToSpeech.repairWavHeaderStream(audio);
  })
  .then(repairedFile => {
    fs.writeFileSync('audio.wav', repairedFile);
    console.log('audio.wav written with a corrected wav header');
  })
  .catch(err => {
    console.log(err);
  });


// or, using WebSockets
textToSpeech.synthesizeUsingWebSocket(params);
synthStream.pipe(fs.createWriteStream('./audio.ogg'));
// see more information in examples/text_to_speech_websocket.js
```

## Unauthenticated requests
The SDK always expects an authenticator to be passed in. To make an unautuhenticated request, use the `NoAuthAuthenticator`.

```js
const watson = require('ibm-watson');
const { NoAuthAuthenticator } = require('ibm-watson/auth');

const assistant = new watson.AssistantV1({
  authenticator: new NoAuthAuthenticator(),
});
```

## Debug

This library relies on the `axios` npm module written by
[axios](https://github.com/axios/axios) to call the Watson Services. To debug the apps, add
'axios' to the `NODE_DEBUG` environment variable:

```sh
$ NODE_DEBUG='axios' node app.js
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

## Contributing
See [CONTRIBUTING](https://github.com/watson-developer-cloud/node-sdk/blob/master/.github/CONTRIBUTING.md).

## Featured Projects
We love to highlight cool open-source projects that use this SDK! If you'd like to get your project added to the list, feel free to make an issue linking us to it.
- [Watson Speech to Text Demo App](https://github.com/watson-developer-cloud/speech-to-text-nodejs)
- [Watson Assistant Demo App](https://github.com/watson-developer-cloud/assistant-demo)
- [Virtual TJBot Node-RED Nodes](https://github.com/jeancarl/node-red-contrib-virtual-tjbot)
- [CLI tool for Watson Assistant](https://github.com/Themandunord/IWAC)
- [CLI tool for Watson Visual Recognition](https://github.com/boneskull/puddlenuts)

## License
This library is licensed under Apache 2.0. Full license text is available in
[COPYING][license].

[assistant]: https://www.ibm.com/cloud/watson-assistant/
[discovery]: https://www.ibm.com/cloud/watson-discovery
[personality_insights]: https://www.ibm.com/watson/services/personality-insights/
[visual_recognition]: https://www.ibm.com/watson/services/visual-recognition/
[tone_analyzer]: https://www.ibm.com/watson/services/tone-analyzer/
[text_to_speech]: https://www.ibm.com/watson/services/text-to-speech/
[speech_to_text]: https://www.ibm.com/watson/services/speech-to-text/
[language_translator]: https://www.ibm.com/watson/services/language-translator/
[examples]: https://github.com/watson-developer-cloud/node-sdk/tree/master/examples
[ibm-cloud-onboarding]: http://cloud.ibm.com/registration?target=/developer/watson&cm_sp=WatsonPlatform-WatsonServices-_-OnPageNavLink-IBMWatson_SDKs-_-Node
