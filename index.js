var serialport = require("serialport"),		// include the serialport library
	SerialPort  = serialport.SerialPort,	   // make a local instance of serial
	express = require('express'),				   // make an instance of express
	open = require('open'),                   // used to open the browser
	url = 'http://localhost:8080',            // URL to open in the browser
	WebSocketServer = require('ws').Server;
	
var app = express(),								   // start Express framework
   server = require('http').createServer(app);		// start an HTTP server

// configure server to serve static files from /js so you can use zepto:
app.use('/js', express.static(__dirname + '/js'));

app.use(express.static(__dirname + '/public/'));
 
// third word of the command line is serial port name:
// console.log('hello', process.argv);
// var portName = process.argv[2];	
var portName = "/dev/tty.usbmodem1431";

// print out the port you're listening on:
console.log("opening serial port: " + portName);	

// listen for incoming requests on the server:
server.listen(8080);								         
console.log("Listening for new clients on port 8080");
// open the app in a browser:
// open(url);                   

// open the serial port. Uses the command line parameter:
var myPort = new SerialPort(portName, { 
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n") 
});

/* The rest of the functions are event-driven. 
   They only get called when the server gets incoming GET requests:
*/

// socket

var wss = new WebSocketServer({server: server});
console.log('websocket server created');
wss.on('connection', function(ws) {
  // var id = setInterval(function() {
  //   ws.send(JSON.stringify(new Date()), function() {  });
  // }, 1000);

  console.log('websocket connection open');

  ws.on('close', function() {
    console.log('websocket connection close');
    // clearInterval(id);
  });
});


// respond to web GET requests with the index.html page:
app.get('/', function (request, response) {
  response.sendfile(__dirname + '/index.html');
});
  

// take anything that begins with /output:
app.get('/output/*', function (request, response) {
  // the route is the first parameter of the URL request:
  var latexCommand = request.params[0];  
  console.log("received "+ latexCommand);

  // send it out the serial port:
  myPort.write(latexCommand);
  // send an HTTP header to the client:
  response.writeHead(200, {'Content-Type': 'text/html'});
  // send the data and close the connection:
  response.end(latexCommand);
});


