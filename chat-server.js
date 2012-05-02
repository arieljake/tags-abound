var app = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io').listen(app);

app.listen(8020);

function handler(req,res)
{
	fs.readFile( __dirname + '/chat-client.html', function (err,data)
	{
		if (err)
		{
			console.log(err);
			res.writeHead(500);
			return res.end( 'Error leading chat client' );
		}

		res.writeHead(200);
		res.end(data);
	})
}

io.sockets.on( 'connection', function (socket)
{
	socket.on('set nickname', function (nickname)
	{
		socket.set('nickname', nickname, function ()
		{
			var connected_msg = nickname + ' is now connected';
			console.log(connected_msg);

			io.sockets.volatile.emit('broadcast_msg', connected_msg);
		})
	});

	socket.on('emit_msg', function (msg)
	{
		socket.get('nickname', function (err, nickname)
		{
			var output = nickname + ": " + msg;
			console.log(output);
			io.sockets.volatile.emit( 'broadcast_msg', output);
		})
	});

	socket.on('disconnect', function ()
	{
		socket.get('nickname', function (err, nickname)
		{
			console.log('Disconnect', nickname);
			var msg = '<b>' + nickname + ' has disconnected.</b>';
			io.sockets.volatile.emit('broadcast_msg', msg);
		})
	})
})