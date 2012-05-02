var fs = require('fs');

exports.getResponse = function (callback)
{
	fs.readFile('test.json', function (err, data)
	{
		callback(data);
	});
};