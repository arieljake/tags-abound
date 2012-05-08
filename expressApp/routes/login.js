
var listly = require('listly');

exports.init = function (serverParts)
{
	var app = serverParts.app;
	var rewriter = serverParts.rewriter;

	app.get('/login', rewriter.rewrite('/views/login'));
	app.get('/register', registerRedirect);
	app.get('/logout', logoutRedirect);
	app.get('/views/login', index);
	app.get('/views/register', registerRedirect);
	app.get('/views/login/login', login);
	app.get('/views/login/register', register);
}

var registerRedirect = function (req,res)
{
	res.redirect('/views/login#/register');
};

var logoutRedirect = function(req, res)
{
	req.session.username = undefined;
	res.redirect('/');
};

var index = function(req,res)
{
	res.render('login/index', listly.renderUtils.params(req,{title: "Login", noMenu: true}));
};

var login = function (req,res)
{
	res.render('login/login', listly.renderUtils.params(req,{layout: false}));
};

var register = function (req,res)
{
	res.render('login/register', listly.renderUtils.params(req,{layout: false}));
};
