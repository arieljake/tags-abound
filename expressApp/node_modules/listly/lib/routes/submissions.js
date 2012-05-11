
var listly = require('listly');

exports.init = function (serverParts)
{
	var app = serverParts.app;
	var rewriter = serverParts.rewriter;

	app.get('/', rewriter.rewrite('/views/submissions'));
	app.get('/views/submissions', index);
	app.get('/views/submissions/index/:submissionId', rewriter.rewrite('/views/submissions/#/submission/$1'));
	app.get('/views/submissions/list', list);
	app.get('/views/submissions/detail', detail);
	app.get('/views/submissions/edit', edit);
};

var index = function(req, res)
{
	res.render('submissions/index', listly.renderUtils.params(req,{title: "Submissions"}));
};

var list = function(req, res)
{
	res.render('submissions/list', listly.renderUtils.params(req,{layout: false}));
};

var detail = function(req, res)
{
	res.render('submissions/detail', listly.renderUtils.params(req,{layout: false}));
};

var edit = function(req, res)
{
	res.render('submissions/edit', listly.renderUtils.params(req,{layout: false}));
};