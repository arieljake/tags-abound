var dao = require('listly').listDAO;

exports.init = function (serverParts)
{
	var app = serverParts.app;
	var db = serverParts.db;

	app.get('/lists', getAllLists(db));
	app.get('/list/:listId', getListById(db,"listId"));
};

var getAllLists = function (db)
{
	return function (req,res)
	{
		dao.findAllLists(db,function(items)
		{
			res.send(items);
		});
	};
};

var getListById = function (db,idParamName)
{
	return function (req,res)
	{
		var listId = req.params[idParamName];

		dao.findListById(db,listId,function(item)
		{
			res.send(item);
		});
	};
};