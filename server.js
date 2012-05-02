var http = require('http');
var hello = require('./hello.js');

http.createServer(function (request, response)
{
	hello.getResponse(function(output)
					  {
						  response.writeHead(200, {'Content-Type': 'text/plain'});
						  response.end(output);
					  });

}
).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');