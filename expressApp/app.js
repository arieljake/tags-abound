/*************************
 * Modules
 *************************/
var express = require('express');
var mongoskin = require("mongoskin");
var io = require('socket.io');
var rewriter = require('express-rewrite');
var listly = require('listly');
// var everyauth = require('everyauth');

/*************************
 * Server Configuration
 *************************/
var app = express.createServer();

var db = mongoskin.db("localhost:27017/listly?auto_reconnect");
// var db = mongoskin.db("mongodb://heroku_app4599724:30c110279pipobpp46gf04j06q@ds033317.mongolab.com:33317/heroku_app4599724?auto_reconnect");

var socketServer = io.listen(app);

var listlySocketServer = listly.socketServer.manageSocketServer(socketServer);
var listlyEmailService = listly.emailService.createEmailService(__dirname);

// listly.everyauth.configure(everyauth);

var serverParts = {
	app: app,
	db:db,
	rewriter:rewriter,
	listlySocketServer:listlySocketServer,
	listlyEmailService:listlyEmailService,
	rootDir:__dirname
};

/*************************
 * HTTP Configuration
 *************************/

app.configure(function ()
{
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(express.cookieParser());
	app.use(express.session(listly.session.createSessionSettings(express)));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(rewriter);
	app.use(listly.authRequired(true, true));
	// app.use(everyauth.middleware());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function ()
{
	app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function ()
{
	app.use(express.errorHandler());
});

listly.server.init(serverParts);
// everyauth.helpExpress(app);

app.listen(3000, function ()
{
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
