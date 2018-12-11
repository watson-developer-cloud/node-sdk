'use strict';
const fs = require('fs');
const path = require('path');
const authPath = path.join(__dirname, './auth.js');

const hasAuth = fs.existsSync(authPath);

if (hasAuth) {
  exports.describe = describe;
} else {
  exports.describe = describe.skip.bind(describe);
  exports.describe.skip = exports.describe;
}
exports.auth = hasAuth ? require(authPath) : null;
