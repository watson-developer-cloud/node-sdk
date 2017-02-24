'use strict';

const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const config = require('../../webpack.config');

describe('Webpack', function() {
  this.timeout(30 * 1000);

  it('should generate a webpack bundle without errors', function(done) {
    // based on https://webpack.github.io/docs/node.js-api.html#compile-to-memory

    const fs = new MemoryFS();

    const compiler = webpack(config);
    compiler.outputFileSystem = fs;
    compiler.run(function(err, stats) {
      if (err) {
        // fatal error
        return done(err);
      }
      if (stats.compilation.errors && stats.compilation.errors.length) {
        // non-fatal errors that nonetheless still probably bork things
        return done(stats.compilation.errors);
      }
      // console.log(stats.compilation);
      done();
    });
  });
});
