
var listly = require('listly');

exports.index = function (db,idFxn) {
	return function(req, res)
	{
		var listId = idFxn(req);
		res.render('list/index', listly.renderUtils.params(req,{title: listId, id: listId}));
	}
};

exports.detail = function(req, res){
	res.render('list/detail', {layout: false});
};