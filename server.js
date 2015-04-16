var http = require('http');
var app = require('./app.js');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server = http.createServer(app);

server.listen(port, ipaddress, function () {
  console.log( "Listening on " + ipaddress + ", server_port " + port);
});