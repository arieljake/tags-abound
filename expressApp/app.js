
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
var rewriter = require('express-rewrite');
var json = require('json');
var listly = require('listly');

var submissions = require('./routes/submissions');
var lists = require('./routes/lists');
var login = require('./routes/login');

var db = mongoskin.db("localhost:27017/listly?auto_reconnect");

/*************************
 * HTTP Configuration
 *************************/
var app = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.session(listly.sessionSettings.createSessionSettings(express)));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(rewriter);
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

app.dynamicHelpers({
	session: function (req,res) {
		return req.session;
	}
});

app.listen(3000, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

/****************************
 * Socket Server Configuration
 ****************************/

//var socketServer = io.listen(app);
//var listlySocketServer = listly.socketServer.manageSocketServer(socketServer);

/****************************
 * Scheduled processes
 ****************************/

/**
setInterval(function ()
			{
				listly.mapReduce.performMapReduce(db,function (results)
				{
					logMsg(results);
				});
			},10000);

**/


/****************************
 * Utils
 ****************************/

app.get('/ping', function (req,res) {
	listlySocketServer.logMsg('ping successful');
	res.send('ping successful');
});
app.get('/views/logger', function(req,res) { res.render('socket/logger',{layout: false, title: "Logger"});});
app.get('/fxn/mapReduce', function(req,res) {
	var json = require('json');
	res.writeHead(200);
	listly.mapReduce.performMapReduce.call(null,db, function (results)
	{
		var output = json.stringify(results);
		res.write(output);
		listlySocketServer.logMsg(output);
	}, function ()
	{
		res.end();
	});
});

/**********************
 * VIEWS
 **********************/

/** Aliases **/
app.get('/login', rewriter.rewrite('/views/login'));
app.get('/register', login.registerRedirect);
app.get('/logout', login.logoutRedirect);
app.get('/', rewriter.rewrite('/views/submissions'));

/** Login **/
app.get('/views/login', login.index);
app.get('/views/register', login.registerRedirect);
app.get('/views/login/login', login.login);
app.get('/views/login/register', login.register);

/** Submissions **/
app.get('/views/submissions', submissions.index);
app.get('/views/submissions/index/:submissionId', rewriter.rewrite('/views/submissions/#/submission/$1'));
app.get('/views/submissions/list', submissions.list);
app.get('/views/submissions/detail', submissions.detail);
app.get('/views/submissions/edit', submissions.edit);

/** Lists **/
app.get('/views/lists', lists.index);
app.get('/views/lists/index/:listId', rewriter.rewrite('/views/lists/#/list/$1'));
app.get('/views/lists/list', lists.list);
app.get('/views/lists/detail', lists.detail);

/**********************
 * REST
 **********************/

/** User **/
app.post('/user/login', listly.userREST.doLogin(db));
app.post('/user/register', listly.userREST.doRegister(db));

/** Submissions **/
app.get('/submissions', listly.submissionREST.getAllSubmissions(db));
app.get('/submission/:submissionId', listly.submissionREST.getSubmissionById(db,function(req) {return new mongo.ObjectID(req.params["submissionId"]);}));
app.get('/submission/:submissionId/lists', listly.submissionREST.getSubmissionListsById(db,function(req) {return new mongo.ObjectID(req.params["submissionId"]);}));
app.get('/submission/title/:submissionTitle', listly.submissionREST.getSubmissionsByTitle(db,function(req) {return req.params["submissionTitle"];}));
app.post('/submission', listly.submissionREST.saveSubmission(db,
															 function(req) { return req.body._id ? new mongo.ObjectID(req.body._id) : undefined;},
															 function(req) { return req.body;}));

/** Lists **/
app.get('/lists', listly.listREST.getAllLists(db));
app.get('/list/:listId', listly.listREST.getListById(db,function(req) {return req.params["listId"];}));

