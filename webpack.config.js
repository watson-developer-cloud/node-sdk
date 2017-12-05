'use strict';

// With this configuration, the entire library can be bundled with Webpack.
// However, not all services support client-side usage.
// See https://github.com/watson-developer-cloud/node-sdk/tree/master/examples/webpack for details

module.exports = {
  entry: './index.js',
  output: {
    filename: 'watson-developer-cloud.js',
    library: 'WatsonDeveloperCloud',
    libraryTarget: 'umd'
  },
  // http://webpack.github.io/docs/configuration.html#node
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
