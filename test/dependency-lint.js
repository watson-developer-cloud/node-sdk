'use strict';
const node_version = parseInt(process.versions.node, 10);
if (node_version >= 4) {
  require('../node_modules/.bin/dependency-lint');
} else {
  // eslint-disable-next-line no-console
  console.log('skipping dependency lint for older versions of Node.js');
}
