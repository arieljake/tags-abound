var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var host = "localhost";
var port = Connection.DEFAULT_PORT;

var db = new Db('listly', new Server(host, port, {}));
db.open(function (err,db)
{
	db.collection('v1_submission', function (err, collection)
	{
		collection.find(function(err,cursor)
						{
							cursor.each(function(err, item)
										{
											if (item != null)
											{
												console.log("item: " + item.title + "\n");
											}
										});
						});
	});
});