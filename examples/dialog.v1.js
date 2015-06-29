'use strict';

var watson = require('watson-developer-cloud');

var dialog = watson.dialog({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE',
  version: 'v1'
});

dialog.getDialogs({}, function (err, dialogs) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(dialogs, null, 2));
});
