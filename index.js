var http = require('http');
var responder = require('./lib/responseGenerator');

http.createServer(function (req, res){
	responder.sendStaticFile('./public', req, res);
}).listen(1337 , '127.0.0.1');

console.log('Node server is Runnning on 1337 ......');