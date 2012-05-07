
var listly = require('listly');

exports.index = function(req, res){
	res.render('submissions/index', listly.renderUtils.params(req,{title: "Submissions"}));
};

exports.list = function(req, res){
	res.render('submissions/list', listly.renderUtils.params(req,{layout: false}));
};

exports.detail = function(req, res){
	res.render('submissions/detail', listly.renderUtils.params(req,{layout: false}));
};

exports.edit = function(req, res){
	res.render('submissions/edit', listly.renderUtils.params(req,{layout: false}));
};