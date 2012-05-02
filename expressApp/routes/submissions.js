/**
 * Created with JetBrains WebStorm.
 * User: arieljake
 * Date: 4/30/12
 * Time: 10:50 PM
 * To change this template use File | Settings | File Templates.
 */

var dao = require("listly").submissionDAO;
var utils = require("listly").utils;

exports.index = function(req, res){
	res.render('submissions/submissions', {title: "Submissions"});
};

exports.list = function(req, res){
	res.render('submissions/list', {layout: false});
};

exports.detail = function(req, res){
	res.render('submissions/detail', {layout: false});
};

exports.edit = function(req, res){
	res.render('submissions/edit', {layout: false});
};

exports.getAllSubmissions = function (db)
{
	return function (req,res){
		dao.findAllSubmissions(db,function(items)
		{
			res.send(items);
		});
	};
};

exports.getSubmissionById = function (db,idFxn)
{
	return function (req,res){
		dao.findSubmissionById(db,idFxn(req),function(item)
		{
			res.send(item);
		});
	};
};

exports.getSubmissionsByTitle = function (db,titleFxn)
{
	return function (req,res){
		dao.findSubmissionsByTitle(db,titleFxn(req),function(items)
		{
			res.send(items);
		});
	};
};

exports.saveSubmission = function (db,idFxn,submissionFxn)
{
	return function (req,res){

		var submission = submissionFxn(req);
		var id = idFxn(req);

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