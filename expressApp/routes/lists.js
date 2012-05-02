/**
 * Created with JetBrains WebStorm.
 * User: arieljake
 * Date: 4/30/12
 * Time: 10:50 PM
 * To change this template use File | Settings | File Templates.
 */

var dao = require("listly").listDAO;

exports.index = function(req, res){
	res.render('lists/lists', {title: "Lists"});
};

exports.list = function(req, res){
	res.render('lists/list', {layout: false});
};

exports.detail = function(req, res){
	res.render('lists/detail', {layout: false});
};

exports.getAllLists = function (db)
{
	return function (req,res){
		dao.findAllLists(db,function(items)
		{
			res.send(items);
		});
	};
};

exports.getListById = function (db,idFxn)
{
	return function (req,res){
		dao.findListById(db,idFxn(req),function(item)
		{
			res.send(item.value);
		});
	};
};