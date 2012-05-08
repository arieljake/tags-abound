
var listly = require('listly');

exports.init = function (serverParts)
{
	var app = serverParts.app;
	var rewriter = serverParts.rewriter;

	app.get('/views/lists', index);
	app.get('/views/lists/index/:listId', rewriter.rewrite('/views/lists/#/list/$1'));
	app.get('/views/lists/list', list);
	app.get('/views/lists/detail', detail);
};

var index = function(req, res)
{
	res.render('lists/index', listly.renderUtils.params(req,{title: "Lists"}));
};

var list = function(req, res)
{
	res.render('lists/list', listly.renderUtils.params(req,{layout: false}));
};

var detail = function(req, res)
{
	res.render('lists/detail', listly.renderUtils.params(req,{layout: false}));
};