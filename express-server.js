var app = require('express').createServer();

app.get('/index', function (req,res)
{
	res.send('you landed on the index page');
});

app.listen(8020);