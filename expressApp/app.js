
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var mongo = require("mongodb");
var mongoskin = require("mongoskin");
var underscore = require("underscore");
var io = require('socket.io');

var listly = require('listly');
var submissions = require('./routes/submissions');
var lists = require('./routes/lists');
var login = require('./routes/login');

var app = express.createServer();
var db = mongoskin.db("localhost:27017/listly?auto_reconnect");

// HTTP Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.session({secret: "listlyisfun"}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(listly.authRequired(true));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.listen(3000, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

// Socket Configuration

var socketServer = io.listen(app);
var loggerSockets = [];

socketServer.sockets.on('connection', function (socket)
{
	loggerSockets.push(socket);

	socket.on('end', function (socket)
	{
		var index = loggerSockets.indexOf(socket);
		loggerSockets.splice(index,1);
	});
});

// scheduled processes

setInterval(function ()
			{
				listly.mapReduce.performMapReduce(db,function (results)
				{
					logMsg(results);
				});
			},10000);

//Logging

var logMsg = function (msg)
{
	for (var i = 0; i < loggerSockets.length; i++)
	{
		loggerSockets[i].emit('broadcast_msg', msg);
	}
};

// Routes

app.get('/', submissions.index);
app.get('/login', login.get);
app.post('/login', login.post);
app.get('/logout', login.logout);
app.get('/view/logger', function(req,res) { res.render('logger',{layout: false, title: "Logger"});});

/** Submissions **/
app.get('/view/submissions', submissions.index);
app.get('/view/submissions/list', submissions.list);
app.get('/view/submissions/detail', submissions.detail);
app.get('/view/submissions/edit', submissions.edit);

app.get('/submissions', submissions.getAllSubmissions(db));
app.get('/submission/:submissionId', submissions.getSubmissionById(db,function(req) {return new mongo.ObjectID(req.params["submissionId"]);}));
app.get('/submission/title/:submissionTitle', submissions.getSubmissionsByTitle(db,function(req) {return req.params["submissionTitle"];}));

app.post('/save/submission', submissions.saveSubmission(db,
														function(req) { return req.body._id ? new mongo.ObjectID(req.body._id) : undefined;},
														function(req) { return req.body;}));

/** Lists **/
app.get('/view/lists', lists.index);
app.get('/view/lists/list', lists.list);
app.get('/view/lists/detail', lists.detail);

app.get('/lists', lists.getAllLists(db));
app.get('/list/:listId', lists.getListById(db,function(req) {return req.params["listId"];}));