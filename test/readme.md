# Test cases
[![Build Status](https://secure.travis-ci.org/watson-developer-cloud/node-sdk.png)](http://travis-ci.org/watson-developer-cloud/node-sdk)
[![Dependency Status](https://gemnasium.com/watson-developer-cloud/node-sdk.png)](https://gemnasium.com/watson-developer-cloud/node-sdk)
[![Coverage Status](https://img.shields.io/coveralls/watson-developer-cloud/node-sdk.svg)](https://coveralls.io/r/watson-developer-cloud/node-sdk)

## Run all the tests

```sh
$ npm test
```

## Run a single test

```sh
$ mocha -g 'regexp'
```

## Debug the http requests
see [request](https://github.com/request/request) for more information

```sh
$ NODE_DEBUG=request mocha -g 'regexp'
```

## Generate code coverage reports

1. Install mocha and instanbul globally

    ```sh
    $ npm install mocha -g
    $ npm install istanbul -g
    ```

1. Run `istanbul`

    ```sh
    $ istanbul cover _mocha -- -R spec
    ```

1. Open the coverage results using your browser

    ```sh
    $ ./coverage/lcov-report/index.html
    ```

## Thing we try to test
  Here is the list of things we try to test for each service.

    1. parameters not specified
    1. parameters mis-named
    1. parameters with empty string values
    1. parameters specified twice
    1. parameters with misformatted values
    1. headers not specified
    1. authentication missing
    1. authentication invalid
    1. input too large
    1. input too small
