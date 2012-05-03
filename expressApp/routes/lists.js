

exports.index = function(req, res){
	res.render('lists/index', {title: "Lists"});
};

exports.list = function(req, res){
	res.render('lists/list', {layout: false});
};

exports.detail = function(req, res){
	res.render('lists/detail', {layout: false});
};

exports.indexDetail = function (idFxn) {
	return function (req,res)
	{
		var listId = idFxn(req);

		res.redirect('/views/lists/#/list/' + listId);
	};
};