# Watson Developer Cloud Browserify Example

This example app shows a basic client and server setup to use the Watson JS SDK in a client-side context.

The example here uses [express](http://expressjs.com/) to serve the content and
[express-browserify](https://www.npmjs.com/package/express-browserify) to generate the client-side bundle.

## Important notes

A server-side component is required to generate auth tokens for services that use an IAM apikey.

Not all Watson services currently support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS),
and in some cases, certain methods work while others do not. Below is a partial list of service support:

The following services support CORS

- Speech to Text\*
- Text to Speech\*
- Natural Language Understanding
- Watson Assistant

\* Speech to Text and Text to Speech should be usable via the Node.js SDK, but we also have a [Speech JavaScript SDK](https://www.npmjs.com/package/watson-speech) that was specifically written for browser support.
