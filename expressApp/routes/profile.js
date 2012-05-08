
var listly = require('listly');

exports.init = function (serverParts)
{
	var app = serverParts.app;

	app.get('/views/profile', index);
	app.get('/views/profile/edit', edit);
};

var index = function(req,res)
{
	res.render('profile/index', listly.renderUtils.params(req,{title: "Profile"}));
};

var edit = function(req, res)
{
	res.render('profile/edit', listly.renderUtils.params(req,{layout: false}));
};

var view = function(req, res)
{
	res.render('profile/view', listly.renderUtils.params(req,{layout: false}));
};