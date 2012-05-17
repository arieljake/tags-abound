
describe("createUser", function ()
{
	var user;
	var callback;

	beforeEach(function ()
	{
		user = {username: "testuser", tags: "testtags"};
		callback = function (res) {};
	});

	it("should specify corrects args to db", function()
	{
		userDAO.createUser(user,callback);

		assert.equal(collectionSpy.firstCall.args[0],"v1_user");
		assert.equal(insertSpy.firstCall.args[0].username,user.username);
		assert.equal(insertSpy.firstCall.args[0].tags,user.tags);
	});

	it("if it receives an error should return the error", function ()
	{
		var error = {};

		db.insert.restore();
		var insertStub = sinon.stub(db,"insert", function (document,callback)
		{
			callback(error,null);
		});

		userDAO.createUser(user,function (err,items)
		{
			assert.equal(err,error);
		});
	});

	it("if it receives items should return the null error", function ()
	{
		var items = {};

		db.insert.restore();
		var insertStub = sinon.stub(db,"insert", function (document,callback)
		{
			callback(null,items);
		});

		userDAO.createUser(user,function (err,items)
		{
			assert.equal(err,null);
		});
	});
});