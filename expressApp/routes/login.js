


exports.get = function(req,res) {
	res.render('login/login', {title: "Login", noMenu: true});
};


exports.post = function(req, res){

	if (req.body.username == "arieljake")
	{
		req.session.username = req.body.username;
		res.redirect('/',202);
	}
	else
	{
		res.end('you must sign in as arieljake to enter');
	}

};

exports.logout = function(req, res) {
	req.session.username = undefined;
	res.redirect('/',200);
};