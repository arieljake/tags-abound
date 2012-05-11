
var listly = require('listly');
var dao = require('listly').userDAO;

exports.init = function (serverParts)
{
	var app = serverParts.app;
	var rewriter = serverParts.rewriter;
	var db = serverParts.db;

	app.get('/login', rewriter.rewrite('/views/login'));
	app.get('/register', registerRedirect);
	app.get('/logout', logoutRedirect);
	app.get('/views/login', index);
	app.get('/views/register', registerRedirect);
	app.get('/views/login/login', login);
	app.get('/views/login/register', register);
	app.post('/doRegister', doRegister(db));
	app.post('/doLogin', doLogin(db));
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

var doLogin = function (db)
{
	return function(req, res)
	{
		var login = {
			username: req.body.username,
			password: req.body.password
		};

		dao.findUserByLogin(db,login,function(user)
		{
			if (user !== null)
			{
				req.session.username = user.username;
				req.session.userId = user._id;

				res.writeHead(202);
				res.end('login successful');
			}
			else
			{
				res.writeHead(207);
				res.end('login failed, please try again');
			}
		});
	};
};

var doRegister = function (db)
{
	return function (req,res)
	{
		var user = {
			username: req.body.username,
			password: req.body.password
		};

		dao.createUser(db, user, function(registerMsg)
		{
			if (registerMsg == true)
			{
				req.session.username = req.body.username;
				res.writeHead(202);
				res.end('registration successful');
			}
			else
			{
				res.writeHead(207);
				res.end(registerMsg);
			}
		});
	};
};
