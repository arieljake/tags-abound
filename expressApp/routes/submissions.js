
var listly = require('listly');

exports.index = function(req, res){
	res.render('submissions/index', listly.renderUtils.params(req,{title: "Submissions"}));
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