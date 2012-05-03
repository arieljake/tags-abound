/**
 * Created with JetBrains WebStorm.
 * User: arieljake
 * Date: 4/30/12
 * Time: 10:50 PM
 * To change this template use File | Settings | File Templates.
 */

exports.index = function (db,idFxn) {
	return function(req, res)
	{
		var listId = idFxn(req);
		res.render('list/index',{title: listId, id: listId});
	}
};

exports.detail = function(req, res){
	res.render('list/detail', {layout: false});
};