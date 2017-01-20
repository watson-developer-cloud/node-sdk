var fs = require('fs');
var path = require('path');
var authPath = path.join(__dirname, '../resources/auth.js');

var hasAuth = fs.existsSync(authPath);

if (hasAuth) {
  exports.describe = describe;
} else {
  exports.describe = describe.skip.bind(describe);
  exports.describe.skip = exports.describe;
}
exports.auth = hasAuth ? require(authPath) : null;
