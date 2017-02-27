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
  },
  // Loader for Retrieve & Rank
  // Retrieve & Rank depends on solr-client, which depends on JSONStream, which starts with a shebang line, which
  // Webpack chokes on - this strips off that line.
  //
  // This isn't strictly needed because Retrieve & Rank doesn't support CORS, so there's no reason to include it in a
  // bundle. However, it's preserved here just to make things easy.
  //
  // See https://github.com/webpack/webpack/issues/2168 for more info
  module: {
    rules: [
      {
        test: /JSONStream/,
        use: 'shebang-loader'
      }
    ]
  }
};
