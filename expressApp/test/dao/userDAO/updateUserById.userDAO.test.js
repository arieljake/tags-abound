
describe("updateUserById", function ()
{
	var id;
	var user;
	var callback;

	beforeEach(function ()
	{
		id = "4f9f9bfe5febe9373d000003";
		user = {username: "testuser", tags: "testtags"};
		callback = function (res) {};
	});

	it("should specify corrects args to db", function()
	{
		userDAO.updateUser(id,user,callback);

		// can this be abstracted to a separate 'mongo' layer?
		assert.equal(collectionSpy.firstCall.args[0],"v1_user");
		assert.equal(updateByIdSpy.firstCall.args[0].toString(),new mongodb.ObjectID(id).toString());
		assert.equal(updateByIdSpy.firstCall.args[1],user);
	});

	it("if it receives an error should return the error", function ()
	{
		var error = {};

		db.insert.restore();
		var insertStub = sinon.stub(db,"insert", function (id,document,callback)
		{
			callback(error);
		});

		userDAO.updateUser(id,user,function (err)
		{
			assert.equal(err,error);
		});
	});

	it("if it receives a null error should return null", function ()
	{
		db.insert.restore();
		var insertStub = sinon.stub(db,"insert", function (id,document,callback)
		{
			callback(null);
		});

		userDAO.updateUser(id,user,function (err)
		{
			assert.equal(err,null);
		});
	});
});