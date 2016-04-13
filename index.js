//var express = require('express');
//var app = express();

//var http = require('http');

//var http = require('http');
//var io = require('socket.io').listen(server);

//var file = new(static.Server)();
//var server = app.listen(8000);

//var app = require('express').createServer();
//var io = require('socket.io')(app);

//app.listen(8000);

//app.get('/', function (req, res) {
  //res.sendfile(__dirname + '/index.html');
//});


//var app = require('express')();
//var static = require('node-static');
//var server = require('http').Server(app);
//var io = require('socket.io')(server);

//server.listen(8000);

//app.get('/', function (req, res) {
  //res.sendfile(__dirname + '/index.html');
//});



//var http = require('http');
//var express = require('express'),
  //  app = module.exports.app = express();

//app.use(express.static(__dirname + '/'));


//var server = http.createServer(app);
//var io = require('socket.io').listen(server);  //pass a http.Server instance
//server.listen(8000);



//var port = http.createServer(function (req, res) {
//	file.serve(req, res);
//}).listen(8000);



// Create a node-static server instance
//var file = new(static.Server)();
// We use the http module’s createServer function and
// rely on our instance of node-static to serve the files

var app = express();
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var static = require('node-static');
var http = require('http');
// Create a node-static server instance
var file = new(static.Server)();
// We use the http module’s createServer function and
// rely on our instance of node-static to serve the files
var app = http.createServer(function (req, res) {
file.serve(req, res);
}).listen(8000);

// Use socket.io JavaScript library for real-time web applications
var io = require('socket.io').listen(app);
// Let's start managing connections...
	io.sockets.on('connection', function (socket){
// Handle 'message' messages
	socket.on('message', function (message) {
	log('S --> got message: ', message);
	// channel-only broadcast...	
	socket.broadcast.to(message.channel).emit('message', message);
});

// Handle 'create or join' messages
socket.on('create or join', function (room) {
	var numClients = io.sockets.clients(room).length;
	log('S --> Room ' + room + ' has ' + numClients + ' client(s)');
	log('S --> Request to create or join room', room);

	// First client joining...
if (numClients == 0){
	socket.join(room);
	socket.emit('created', room);
	} else if (numClients == 1) {
		// Second client joining...
		io.sockets.in(room).emit('join', room);
		socket.join(room);
		socket.emit('joined', room);
	} else { // max two clients
	socket.emit('full', room);
	}
});

function log(){
	var array = [">>> "];
	for (var i = 0; i < arguments.length; i++) {
		array.push(arguments[i]);
		}
	socket.emit('log', array);
}
});

