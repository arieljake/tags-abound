
var listly = require('listly');

exports.index = function(req,res) {
	res.render('profile/index', listly.renderUtils.params(req,{title: "Profile"}));
};

exports.edit = function(req, res){
	res.render('profile/edit', {layout: false});
};