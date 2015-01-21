// =====================================
// Exercise 2
// =====================================

// var args = process.argv;

// var sum = 0;

// for(var i = 2; i < args.length; i++) {
// 	sum += parseInt(args[i]);
// }

// console.log(sum);

// =====================================
// Exercise 3
// =====================================

// load the global fs module
// var fs = require('fs');

// // Buffer objects containts complete contents of the file
// var buffer = fs.readFileSync(process.argv[2]);

// console.log(buffer.toString());

// console.log(buffer.toString().split('\n').length -1);

// =====================================
// Exercise 4 - Async IO
// ======================================

// var fs = require('fs');

// fs.readFile(process.argv[2], 'utf8', function(err, data) {
// 	console.log(data.split('\n').length -1);
// });

// =====================================
// Exercise 5 - Filtered LS
// =====================================

// var fs = require('fs');
// var path = require('path');

// fs.readdir(process.argv[2], function(err, files) {
// 	files.forEach(function(file) {
// 		if(path.extname(file) === '.' + process.argv[3]) {
// 			console.log(file);
// 		}
// 	})
// });

// =====================================
// Exercise 6 - Make it modular
// =====================================

// ./ is ncessary, .js extension is optional
// var mymodule = require('./mymodule.js');

// mymodule(process.argv[2], process.argv[3], function(err, data) {

// 	if(err) return console.log(err);

// 	for(var i = 0; i < data.length; i++) {
// 		console.log(data[i]);
// 	}
// });

// =====================================
// Exercise 7 - HTTP client
// =====================================

// var http = require('http');

// // the get callback just has one param
// http.get(process.argv[2], function(response) {

// 	// make the data event emit a string rather than
// 	// the standard Node Buffer objects
// 	response.setEncoding('utf8');

// 	// response is a Node Stream object
// 	// it emits events such as 'data', 'error' and 'end' that can be listened to
// 	response.on('data', function(data) {
// 		console.log(data);
// 	});
// });

// =====================================
// Exercise 8 - HTTP collect
// =====================================

// // collect all data, not just the first data event
// var http = require('http');
// var bl = require('bl'); // buffer list

// http.get(process.argv[2], function(response) {
// 	response.pipe(bl(function(err, data){

// 		if (err) return console.error(err);

// 		data = data.toString();
// 		console.log(data.length);
// 		console.log(data);
// 	}));
// });

// =====================================
// Exercise 9 - Juggling Async
// =====================================

// my solution
// var http = require('http');
// var bl = require('bl');

// var numUrls = 3;
// var remaining = numUrls;

// var responses = new Array(numUrls); // create an array of the correct size

// for(var i = 2; i < numUrls+2; i++) {
// 	getUrl(i-2, process.argv[i]);
// }


// function getUrl(index, url) {
// 	http.get(url, function(response) {
// 		response.pipe(bl(function(err, data) {
// 			if (err) return console.error(err);

// 			responses[index] = data.toString();

// 			remaining--;
// 			if(remaining === 0) {
// 				print();
// 			}

// 		}));
// 	});
// }

// function print() {
// 	for(var i = 0; i < responses.length; i++) {
// 		console.log(responses[i]);
// 	}
// }


// =====================================
// Exercise 10 - Time Server
// YYYY-MM-DD hh:mm
// =====================================

// // networking module
// var net = require('net');

// // port to listen on 
// var port = process.argv[2];

// // add leading zeros to the number, if it needs them
// function zeroFill(n) {
// 	return (n < 10 ? '0' + n : n);
// }

// // create a server
// // the callback is called for each new connection
// var server = net.createServer(function(socket) {
	
// 	var date = new Date();

// 	var dateString = zeroFill(date.getFullYear())
// 				   + '-' 
// 				   + zeroFill(date.getMonth() + 1) // 0 based
// 				   + '-'
// 				   + zeroFill(date.getDate())
// 				   + ' '
// 				   + zeroFill(date.getHours())
// 				   + ':'
// 				   + zeroFill(date.getMinutes())
// 				   + '\n';

// 	socket.end(dateString);
// });

// // start the server
// server.listen(port);

// =====================================
// Exercise 11 - HTTP File Server
// =====================================

// var http = require('http');
// var fs = require('fs');

// var listenPort = process.argv[2];
// var fileLocation = process.argv[3];

// // both request and response are node streams
// var server = http.createServer(function(request, response){
// 	fs.readFile(fileLocation, function(err, data){
// 		response.end(data);
// 	});
// });


// server.listen(listenPort);

// =====================================
// Exercise 12 - 





























