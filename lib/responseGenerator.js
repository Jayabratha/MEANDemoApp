var fs = require('fs');

exports.send404 = send404;
exports.sendStaticFile = sendStaticFile;

function send404 (response) {
	response.writeHead( 404, {'Content-Type' : 'text/plain' });
	response.end("No Content");
}


function sendStaticFile (staticPath , request, response) {
	
	var filename = request.url;
	var contentType;

	if(filename == "/"){
		contentType = 'text/html'
		filename = "/index.html";
	}

	if(filename.match(/^(\/styles\/|\/css\/)/)){
		contentType = 'text/css';
	}

	if(filename.match(/^(\/js\/)/)){
		contentType = 'text/javascript';
	}

	console.log(contentType);

	var file = staticPath + '/' + filename;

	console.log('Serving static File' + file );

	fs.stat(file, function (error, stats){
		if(error || stats.isDirectory()){
			console.log(error);
			send404(response);
		}
		else {
			var readStream = fs.createReadStream( file );
			response.writeHead( 200, {'Content-Type' : contentType });
			readStream.pipe(response);
		}
	});
}