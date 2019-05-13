const fs = require('fs');
const path = require('path');
const axios = require('axios');
const test_output = fs.readFileSync(path.resolve('test-output.log'), { encoding: 'utf8' });
const test_ouput_json = JSON.parse(test_output);
const ansi_regex = new RegExp(
  [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
  ].join('|'),
  'g'
);

const failed_suits = test_ouput_json.testResults.filter(suite => suite.status === 'failed');

const errors = {
  service: [],
  test: [],
};

failed_suits.map(suite => {
  const failed_tests = suite.assertionResults.filter(test => test.status === 'failed');
  const error_suite = {
    name: suite.name.split('node-sdk/test')[1],
    service: [],
    test: [],
  };

  failed_tests.map(result => {
    const message_clean = result.failureMessages.join('\n').replace(ansi_regex, '');
    error_suite[message_clean.indexOf(/^Received: 5/m) > 0 ? 'service' : 'test'].push(
      `${result.fullName}\n${message_clean}`
    );
  });

  errors.service.push(`${error_suite.name}\n${error_suite.service.join('\n')}`);
  errors.test.push(`${error_suite.name}\n${error_suite.test.join('\n')}`);
});

let body = '';
if (errors.service.length > 0) {
  body = `${body}## Service Failures\n${errors.service.join('\n')}\n`;
}

if (errors.test.length > 0) {
  body = `${body}## Possible Test Failures\n${errors.test.join('\n')}\n`;
}

if (process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false') {
  // Send the result to the pull request if it is a pull request.
  axios
    .post(
      `https://api.github.com/repos/${process.env.TRAVIS_REPO_SLUG}/issues/${
        process.env.TRAVIS_PULL_REQUEST
      }/comments`,
      {
        body: body,
      },
      {
        headers: {
          'User-Agent': 'watson-github-bot',
          Authorization: `token ${process.env.GH_TOKEN}`,
        },
      }
    )
    .catch(error => {
      console.error(error); // eslint-disable-line
    })
    .then(() => {
      if (errors.test.length > 0) {
        process.exit(1); // eslint-disable-line
      }
    });
} else {
  // Write to stdout
  console.log(body); // eslint-disable-line

  if (errors.test.length > 0) {
    process.exit(1); // eslint-disable-line
  }
}
