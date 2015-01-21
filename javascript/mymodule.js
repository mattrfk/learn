

var fs = require('fs');
var path = require('path');

// assigning a single function to module.exports overwrites what was already there
module.exports = function( dirName, extension, callback) {

	// error handling!
	if(dirName === undefined) return callback("no dirName", null);
	if(extension === undefined) return callback("no extension", null);


	fs.readdir(dirName, function(err, files) {

		// idiomatic node error handling
		if(err) return callback(err);

		//TODO should use filter here, then pass to callback
		files = files.filter(function(file) {
			return path.extname(file) === '.' + extension;
		});

		callback(null, files);
	});
}