describe("findSubmissionListsById", function ()
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
		submissionDAO.findSubmissionListsById(id,callback);

		assert.equal(collectionSpy.firstCall.args[0], "v1_submission_to_lists");
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
			submissionDAO.findSubmissionListsById(id);
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

		submissionDAO.findSubmissionListsById(id,function (result)
		{
			assert.equal(result,null);
		});
	});

	it("should return item 0's value.lists if 1 item returned", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, [{value: {lists: "list1"}}]);
		});

		submissionDAO.findSubmissionListsById(id,function (result)
		{
			assert.equal(result, "list1");
		});
	});

	it("should return item 0's value.lists if 2 items returned", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, [{value: {lists: "list1"}},{value: {lists: "list2"}}]);
		});

		submissionDAO.findSubmissionListsById(id,function (result)
		{
			assert.equal(result, "list1");
		});
	});
});