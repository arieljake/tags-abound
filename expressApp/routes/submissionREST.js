var dao = require('listly').submissionDAO;

exports.init = function (serverParts)
{
	var app = serverParts.app;
	var db = serverParts.db;

	app.get('/submissions', getAllSubmissions(db));
	app.get('/submission/:submissionId', getSubmissionById(db,"submissionId"));
	app.get('/submission/:submissionId/lists', getSubmissionListsById(db,"submissionId"));
	app.get('/submission/title/:submissionTitle', getSubmissionsByTitle(db,"submissionTitle"));
	app.post('/submission', saveSubmission(db));
};

var getAllSubmissions = function (db)
{
	return function (req,res)
	{
		dao.findAllSubmissions(db,function(items)
		{
			res.send(items);
		});
	};
};

var getSubmissionById = function (db,idParamName)
{
	return function (req,res)
	{
		dao.findSubmissionById(dbreq.params[idParamName],function(item)
		{
			res.send(item);
		});
	};
};

var getSubmissionListsById = function (db,idParamName)
{
	return function (req,res)
	{
		dao.findSubmissionListsById(db,req.params[idParamName],function (lists)
		{
			res.send(lists);
		});
	};
};

var getSubmissionsByTitle = function (db,titleParamName)
{
	return function (req,res)
	{
		var title = req.params[titleParamName];

		dao.findSubmissionsByTitle(db,title,function(items)
		{
			res.send(items);
		});
	};
};

var saveSubmission = function (db)
{
	return function (req,res)
	{
		var submission = req.body;
		var id = submission._id ? submission._id : undefined;

		submission.username = req.session.username;

		if (id === undefined)
		{
			dao.createSubmission(db,submission,function(submission)
			{
				res.send(submission);
			});
		}
		else
		{
			dao.updateSubmission(db,id,submission,function(submission)
			{
				res.send(submission);
			});
		}
	};
};