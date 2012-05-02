var mongo = require("mongoskin");
var underscore = require("underscore");

var db = mongo.db("localhost:27017/listly?auto_reconnect");
db.collection("v1_submission").find().toArray(function (err,items) {

	underscore.each(items, function (item)
	{
		console.dir(item.title);
	});

});