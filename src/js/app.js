define(['secondModule'], function(secondModule) {
	var jsOutput = document.getElementById('js-output');
	jsOutput.innerHTML += 'Entry module works!';
	// call secondModule run function
	var secondModule = require('./secondModule');
	secondModule.run(jsOutput);
});
