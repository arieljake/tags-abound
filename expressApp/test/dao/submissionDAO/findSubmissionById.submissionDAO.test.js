describe("findSubmissionById", function ()
{
	var id;
	var callback;

	beforeEach(function ()
	{
		id = "4f9f9bfe5febe9373d000003";
		callback = function (res)
		{
		};
	});

	it("should specify corrects args to db", function ()
	{
		submissionDAO.findSubmissionById(id,callback);

		assert.equal(collectionSpy.firstCall.args[0], "v1_submission");
		assert.equal(findSpy.firstCall.args[0]._id.toString(), new mongodb.ObjectID(id).toString());
		assert.equal(findSpy.firstCall.args[1].limit, 1);
	});

	it("if it receives null should throw an error", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, null);
		});

		var errorCaught = false;

		try {
			submissionDAO.findSubmissionById(id);
		}
		catch (e) {
			errorCaught = true;
		}

		errorCaught.should.be.true;
	});

	it("should handle no results by returning null", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, []);
		});

		submissionDAO.findSubmissionById(id,function (result)
		{
			assert.equal(result,null);
		});
	});

	it("should return item 0 if 1 item returned", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, [{_id: id, title: "item 1"}]);
		});

		var daoStub = sinon.stub(submissionDAO,"findSubmissionListsById", function (id, callback)
		{
			callback(null);
		});

		submissionDAO.findSubmissionById(id,function (result)
		{
			assert.equal(result.title, "item 1");
		});
	});

	it("should return item 0 if 2 items returned", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, [{_id: id, title: "item 1"},{_id: id, title: "item 2"}]);
		});

		var daoStub = sinon.stub(submissionDAO,"findSubmissionListsById", function (id, callback)
		{
			callback(null);
		});

		submissionDAO.findSubmissionById(id,function (result)
		{
			assert.equal(result.title, "item 1");
		});
	});
});