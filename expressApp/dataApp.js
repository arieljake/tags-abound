/*************************
 * Modules
 *************************/
var express = require('express');
var rewriter = require('express-rewrite');
var io = require('socket.io');
var mongoskin = require("mongoskin");
var listly = require('listly');

/*************************
 * Server Configuration
 *************************/
var app = express.createServer();
var db = mongoskin.db("localhost:27017/listly?auto_reconnect");
var socketServer = io.listen(app);

// var db = mongoskin.db("mongodb://heroku_app4599724:30c110279pipobpp46gf04j06q@ds033317.mongolab.com:33317/heroku_app4599724?auto_reconnect");

var serverParts = {
	rootDir:__dirname,
	app: app,
	db: db,
	rewriter: rewriter,
	socketServer: socketServer
};

/*************************
 * HTTP Configuration
 *************************/

app.configure(function ()
{
	app.use(express.cookieParser());
	app.use(express.session(listly.session.createSessionSettings(express)));
	app.use(express.bodyParser());
	app.use(express.query());
	app.use(express.methodOverride());
	app.use(rewriter);
	app.use(listly.dataAuthRequired(true));
	app.use(app.router);
});

app.configure('development', function ()
{
	app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function ()
{
	app.use(express.errorHandler());
});

var ListlyDataServer = listly.ListlyDataServer;
var listlyDataServer = new ListlyDataServer(serverParts);

app.listen(3001, function ()
{
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
