

exports.registerRedirect = function (req,res) {
	res.redirect('/views/login#/register');
};

exports.logoutRedirect = function(req, res) {
	req.session.username = undefined;
	res.redirect('/');
};

exports.index = function(req,res) {
	res.render('login/index', {title: "Login", noMenu: true});
};

exports.login = function (req,res) {
	res.render('login/login', {layout: false});
};

exports.register = function (req,res) {
	res.render('login/register', {layout: false});
};
