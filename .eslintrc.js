module.exports = {
  "env": {
    "node": true,
  },
  "plugins": [
    "node",
    "prettier",
  ],
  "extends": [
    "eslint:recommended",
    "google",
    "plugin:node/recommended",
    "prettier",
  ],
  "rules": {
    "prettier/prettier": ["error", {"singleQuote": true, "printWidth": 160}],
    "prefer-const": "error",
    "prefer-rest-params": "off", // https://github.com/mysticatea/eslint-plugin-node/issues/63
    // The rest of these override rules that are enabled by one of the configs we extend but not compatible with current codebase
    // todo: fix issues and then remove overrides here
    "valid-jsdoc": "off", // too many issues; drowns out everything else
    "camelcase": "off", // todo: determine if we should keep this off globally, or disable it on a per-line basis
  }
};
