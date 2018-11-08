# Test cases
[![Build Status](https://secure.travis-ci.org/watson-developer-cloud/node-sdk.png)](http://travis-ci.org/watson-developer-cloud/node-sdk)
[![Coverage Status](https://codecov.io/gh/watson-developer-cloud/node-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/watson-developer-cloud/node-sdk)

This SDK uses [jest](https://jestjs.io/) for its testing suite. The tests are split up into unit tests, which verify the internal workings of the code and do not rely on a network connection, and integration tests, which verify the SDK against live instances of Watson services.

This repository includes scripts for running the tests. These scripts use the `--silent` and `--verbose` options.

To run a single test on its own or to run the tests with [custom options](https://jestjs.io/docs/en/cli), install `jest` globally.
```sh
$ npm install -g jest
```

## Unit tests

```sh
$ npm run test-unit
    # or
$ jest test/unit/
```

## Integration tests

```sh
$ npm run test-integration
    # or
$ jest test/integration/
```

## Run a single test

```sh
# can be a path to any file or multiple files using globs and/or regular expressions
$ jest test/unit/baseService.test.js
```

## Run all tests
```sh
$ npm test
    # or
$ jest test/
```
