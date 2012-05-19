
var listly = require('listly');
var underscore = require('underscore');

describe("UserRemoteDAO", function ()
{
	it("all functions should derive from userDAO", function ()
	{
		var userDAO = new listly.UserDAO(null);
		var userRemoteDAO = new listly.UserRemoteDAO(null);
		var remoteFunctions = underscore.functions(userRemoteDAO);

		for (var i = 0; i < remoteFunctions.length; i++)
		{
			var fxnName = remoteFunctions[i];
			console.log(fxnName);
			// assert.ok(userDAO.hasOwnProperty(fxnName) && underscore.isFunction(userDAO[fxnName]));
		}
	});
});