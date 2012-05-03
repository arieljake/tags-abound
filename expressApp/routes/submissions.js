

exports.index = function(req, res){
	res.render('submissions/index', {title: "Submissions"});
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

exports.indexDetail = function (idFxn){
	return function (req,res)
	{
		var submissionId = idFxn(req);

		res.redirect('/views/submissions/#/submission/' + submissionId);
	};
};