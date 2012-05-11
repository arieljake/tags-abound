
/*************************
 * Modules
 *************************/
var express = require('express');
var routes = require('./node_modules/listly/lib/routes');
var mongo = require("mongodb");
var mongoskin = require("mongoskin");
var io = require('socket.io');
var fs = require('fs');
// var everyauth = require('everyauth');

var underscore = require("underscore");
var rewriter = require('express-rewrite');
var json = require('json');

var listly = require('listly');

/*************************
 * Server Configuration
 *************************/

var app = express.createServer();
var db = mongoskin.db("localhost:27017/listly?auto_reconnect");
// var db = mongoskin.db("mongodb://heroku_app4599724:30c110279pipobpp46gf04j06q@ds033317.mongolab.com:33317/heroku_app4599724?auto_reconnect");
var socketServer = io.listen(app);

var listlySocketServer = listly.socketServer.manageSocketServer(socketServer);
var listlyEmailService = listly.emailService.createEmailService();

// listly.everyauth.configure(everyauth);

var serverParts = {
	app: app,
	db: db,
	rewriter: rewriter,
	listlySocketServer: listlySocketServer,
	listlyEmailService: listlyEmailService
};

/*************************
 * HTTP Configuration
 *************************/

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.session(listly.sessionSettings.createSessionSettings(express)));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(rewriter);
  app.use(listly.authRequired(true,false));
  // app.use(everyauth.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

listly.server.init(serverParts);
// everyauth.helpExpress(app);

app.listen(3000, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
