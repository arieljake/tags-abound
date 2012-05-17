describe("findAllSubmissions", function ()
{
	var callback;

	beforeEach(function ()
	{
		callback = function (res)
		{
		};
	});

	it("should specify corrects args to db", function ()
	{
		submissionDAO.findAllSubmissions(callback);

		assert.equal(collectionSpy.firstCall.args[0], "v1_submission");
		assert.equal(findSpy.firstCall.args.length, 0);
	});

	it("if it receives null should throw an error", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, null);
		});

		var errorCaught = false;

		try {
			submissionDAO.findAllSubmissions();
		}
		catch (e) {
			errorCaught = true;
		}

		errorCaught.should.be.true;
	});

	it("should handle no results by returning empty array", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, []);
		});

		submissionDAO.findAllSubmissions(function (result)
		{
			assert.equal(result.length, 0);
		});
	});

	it("should return an array of items if 1 item returned", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, ["user 1"]);
		});

		submissionDAO.findAllSubmissions(function (result)
		{
			assert.equal(result.length, 1);
			assert.equal(result[0], "user 1");
		});
	});

	it("should return an array of items if 2 items returned", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, ["user 1", "user 2"]);
		});

		submissionDAO.findAllSubmissions(function (result)
		{
			assert.equal(result.length, 2);
			assert.equal(result[0], "user 1");
			assert.equal(result[1], "user 2");
		});
	});
});