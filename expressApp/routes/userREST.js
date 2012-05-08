
var dao = require('listly').userDAO;

exports.init = function (serverParts)
{
	var app = serverParts.app;
	var db = serverParts.db;

	app.get('/user', getCurrentUser(db));
	app.post('/user', updateUser(db));
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
			dao.findUserById(db, req.session.userId, function(user)
			{
				res.send(user);
			});
		}
	};
};

var updateUser = function (db)
{
	return function (req,res)
	{
		var user = req.body;
		var id = req.session.userId;

		if (id !== undefined)
		{
			dao.updateUser(db,id,user,function(user)
			{
				res.send(true);
			});
		}
		else
		{
			res.send(false);
		}
	};
};