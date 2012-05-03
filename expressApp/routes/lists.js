

exports.index = function(req, res){
	res.render('lists/index', {title: "Lists"});
};

exports.list = function(req, res){
	res.render('lists/list', {layout: false});
};

exports.detail = function(req, res){
	res.render('lists/detail', {layout: false});
};