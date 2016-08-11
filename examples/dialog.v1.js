'use strict';

var DialogV1 = require('watson-developer-cloud/dialog/v1');

var dialog = new DialogV1({
  username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

dialog.getDialogs({}, function (err, dialogs) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(dialogs, null, 2));
});
