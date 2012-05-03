
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var mongo = require("mongodb");
var mongoskin = require("mongoskin");
var underscore = require("underscore");
var io = require('socket.io');
var fs = require('fs');

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
  app.use(listly.authRequired(false));
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
/**
setInterval(function ()
			{
				listly.mapReduce.performMapReduce(db,function (results)
				{
					logMsg(results);
				});
			},10000);

**/

//Logging

var logMsg = function (msg)
{
	for (var i = 0; i < loggerSockets.length; i++)
	{
		loggerSockets[i].emit('broadcast_msg', msg);
	}
};

// Routes

/** Login **/
app.get('/', submissions.index);
app.get('/login', login.index);
app.post('/login', login.post);
app.get('/logout', login.logout);

/** Utils **/
app.get('/views/logger', function(req,res) { res.render('logger',{layout: false, title: "Logger"});});

/** Submission Views **/
app.get('/views/submissions', submissions.index);
app.get('/views/submissions/index/:submissionId', submissions.indexDetail(function(req) {return req.params["submissionId"];}));
app.get('/views/submissions/list', submissions.list);
app.get('/views/submissions/detail', submissions.detail);
app.get('/views/submissions/edit', submissions.edit);

/** Lists Views **/
app.get('/views/lists', lists.index);
app.get('/views/lists/index/:listId', lists.indexDetail(function(req) {return req.params["listId"];}));
app.get('/views/lists/list', lists.list);
app.get('/views/lists/detail', lists.detail);

/** REST **/
app.get('/submissions', listly.submissionREST.getAllSubmissions(db));
app.get('/submission/:submissionId', listly.submissionREST.getSubmissionById(db,function(req) {return new mongo.ObjectID(req.params["submissionId"]);}));
app.get('/submission/:submissionId/lists', listly.submissionREST.getSubmissionListsById(db,function(req) {return new mongo.ObjectID(req.params["submissionId"]);}));
app.get('/submission/title/:submissionTitle', listly.submissionREST.getSubmissionsByTitle(db,function(req) {return req.params["submissionTitle"];}));
app.get('/lists', listly.listREST.getAllLists(db));
app.get('/list/:listId', listly.listREST.getListById(db,function(req) {return req.params["listId"];}));

app.post('/submission', listly.submissionREST.saveSubmission(db,
														function(req) { return req.body._id ? new mongo.ObjectID(req.body._id) : undefined;},
														function(req) { return req.body;}));