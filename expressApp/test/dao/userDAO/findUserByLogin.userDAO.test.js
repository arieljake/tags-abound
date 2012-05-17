
describe("findUserByLogin", function ()
{
	var login;
	var callback;

	beforeEach(function ()
	{
		login = {
			username: "testuser",
			password: "testpswd"
		};

		callback = function (res) {};
	});

	it("should specify corrects args to db", function()
	{
		userDAO.findUserByLogin(login,callback);

		// can this be abstracted to a separate 'mongo' layer?
		assert.equal(collectionSpy.firstCall.args[0],"v1_user");
		assert.equal(findSpy.firstCall.args[0].username,login.username);
		assert.equal(findSpy.firstCall.args[0].password,login.password);
		assert.equal(findSpy.firstCall.args[1].limit,1);
	});

	it("if it receives null should throw an error", function ()
	{
		var toArraySpy = sinon.stub(db,"toArray", function (callback)
		{
			callback(null,null);
		});

		var errorCaught = false;

		try
		{
			userDAO.findUserByLogin(login,callback);
		}
		catch (e)
		{
			errorCaught = true;
		}

		errorCaught.should.be.true;
	});

	it("should handle 'no users' by returning null", function ()
	{
		var toArraySpy = sinon.stub(db,"toArray", function (callback)
		{
			callback(null,[]);
		});

		userDAO.findUserByLogin(login,function (result)
		{
			assert.ok(result == null);
		});
	});

	it("should return item 0 if 1 user returned", function ()
	{
		var toArraySpy = sinon.stub(db,"toArray", function (callback)
		{
			callback(null,["user 1"]);
		});

		userDAO.findUserByLogin(login,function (result)
		{
			assert.ok(result == "user 1");
		});
	});

	it("should return item 0 if 2 users returned", function ()
	{
		var toArraySpy = sinon.stub(db,"toArray", function (callback)
		{
			callback(null,["user 1","user 2"]);
		});

		userDAO.findUserByLogin(login,function (result)
		{
			assert.ok(result == "user 1");
		});
	});
});