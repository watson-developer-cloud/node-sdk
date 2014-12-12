# Test cases
[![Build Status](https://secure.travis-ci.org/watson-developer-cloud/nodejs-wrapper-alpha.png)](http://travis-ci.org/watson-developer-cloud/nodejs-wrapper-alpha)
[![Dependency Status](https://gemnasium.com/watson-developer-cloud/nodejs-wrapper-alpha.png)](https://gemnasium.com/watson-developer-cloud/nodejs-wrapper-alpha)
[![Coverage Status](https://img.shields.io/coveralls/watson-developer-cloud/nodejs-wrapper-alpha.svg)](https://coveralls.io/r/watson-developer-cloud/nodejs-wrapper-alpha)

## Run all the tests

```sh
$ npm test
```

## Run a single test

```sh
$ mocha --reporter spec --timeout 4000 --grep 'regexp'
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