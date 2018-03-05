module.exports = {
  env: {
    node: true,
    mocha: true,
  },
  rules: {
    'no-invalid-this': 'off', // This is part of mocha's api, but eslint's mocha env apparently doesn't get it
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
  },
};
