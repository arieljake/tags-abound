

var json = require('json');

exports.init = function (serverParts)
{
	var app = serverParts.app;
	var listlySocketServer = serverParts.listlySocketServer;
	var db = serverParts.db;

	app.get('/ping', function (req,res)
	{
		listlySocketServer.logMsg('ping successful');
		res.send('ping successful');
	});

	app.get('/views/logger', function(req,res)
	{
		res.render('socket/logger',{layout: false, title: "Logger"});
	});

	app.get('/fxn/mapReduce', function(req,res)
	{
		res.writeHead(200);

		listly.mapReduce.performMapReduce.call(null, db, function (results)
		{
			var output = json.stringify(results);
			res.write(output);
			listlySocketServer.logMsg(output);

		}, function ()
		{
			res.end();
		});
	});
};