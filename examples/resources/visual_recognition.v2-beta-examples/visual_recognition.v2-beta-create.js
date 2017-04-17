var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  username: '09b559ae-066f-49b2-b48b-eae7e2dc558f',
  password: 'VX11OLZ4uplF',
  version: 'v2-beta',
  version_date: '2015-12-02'
});

var params = {
	name: 'tiger',
	positive_examples: fs.createReadStream('./tiger.zip'),
	negative_examples: fs.createReadStream('./leopard.zip')
};

visual_recognition.createClassifier(params, 
	function(err, response) {
   	 if (err)
      		console.log(err);
    	 else
   		console.log(JSON.stringify(response, null, 2));
});