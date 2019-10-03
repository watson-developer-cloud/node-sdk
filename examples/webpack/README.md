# Watson Developer Cloud Webpack Example

This example app shows a basic client and server setup to use the Watson JS SDK in a client-side context.

The example here uses [express](http://expressjs.com/) to serve the content and [webpack](https://www.npmjs.com/package/webpack-dev-middleware) and
[webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) to generate the client-side bundle.

## Important notes

A server-side component is required to generate auth tokens for services that use a username/password combo.
(This is all services except Alchemy and Visual Recognition which use API keys instead.)

Not all Watson services currently support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS),
and in some cases, certain methods work while others do not. Below is a partial list of service support:

The following services support CORS

 * Tradeoff Analytics
 * Tone Analyzer
 * Speech to Text*
 * Text to Speech*
 * Personality Insights
 * Document Conversion
 * All Alchemy services

\* Speech to Text and Text to Speech should be usable via the Node.js SDK, but we also have a [Speech JavaScript SDK](https://www.npmjs.com/package/watson-speech) that was specifically written for browser support.


The following services do not support CORS

 * Language Translator
 * Visual Recognition (partial support)
 * Retrieve and Rank

 Ideally, only the specific services used shoud be included, for example:

 ```js
 var ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
 var AssistantV1 = require('ibm-watson/assistant/v1');
 ```

 **Not Recommended**: It's possible to load the entire library, but it is not recommended due to the added file size:

 ```js
 var watson = require('ibm-watson');
 ```
 or
 ```
 const { AssistantV1, ToneAnalyzerV3 } = require('ibm-watson');
 ```

 Additionally, when importing the entire library, the `shebang-loader` package is need and must be configured
 in webpack.config.js:

 ```js
   module: {
     rules: [{
         test: /JSONStream/,
         use: 'shebang-loader'
     }]
   }
 ```

## Webpack configuration

The `ibm-watson` Node SDK version 5+ should work out of the box with most bundlers, including webpack.  For versions below 5.0.0, the following configurations may be required to leverage the SDK in client environments.

In most cases, you will want the following in your configuration:


```js
  node: {
    // see http://webpack.github.io/docs/configuration.html#node
    // and https://webpack.js.org/configuration/node/
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
```

Several services use the `fs` library, which won't work in browser environments, and the `request` library loads `fs`,
`net`, and `tls`, but shouldn't need any of them for basic usage because webpack automatically includes
[equivalent libraries](https://www.npmjs.com/package/node-libs-browser).
