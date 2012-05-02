var $ = require("mongous").Mongous;
var underscore = require("underscore");

$("listly.v1_submission").find({},function(r)
{
	var docs = r.documents;

	underscore.each(docs, function (doc)
	{
		console.log(doc.title);
	});
});
