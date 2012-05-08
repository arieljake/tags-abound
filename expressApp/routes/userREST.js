
var dao = require('listly').userDAO;
var mongo = require("mongodb");

exports.init = function (serverParts)
{
	var app = serverParts.app;
	var db = serverParts.db;

	app.post('/user/login', doLogin(db));
	app.post('/user/register', doRegister(db));
	app.get('/user', getCurrentUser(db));
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

var getCurrentUser = function (db)
{
	return function (req,res)
	{
		if (req.session === undefined || req.session.username === undefined)
		{
			res.writeHead(404);
		}
		else
		{
			var userId = new mongo.ObjectID(req.session.userId);

			dao.findUserById(db, userId, function(user)
			{
				res.send(user);
			});
		}
	};
};