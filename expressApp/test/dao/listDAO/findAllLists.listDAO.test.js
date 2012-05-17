describe("findAllLists", function ()
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
		listDAO.findAllLists(callback);

		assert.equal(collectionSpy.firstCall.args[0], "v1_list");
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
			listDAO.findAllLists();
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

		listDAO.findAllLists(function (result)
		{
			assert.equal(result.length, 0);
		});
	});

	it("should return an array of items if 1 item returned", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, ["item 1"]);
		});

		listDAO.findAllLists(function (result)
		{
			assert.equal(result.length, 1);
			assert.equal(result[0], "item 1");
		});
	});

	it("should return an array of items if 2 items returned", function ()
	{
		var toArraySpy = sinon.stub(db, "toArray", function (callback)
		{
			callback(null, ["item 1", "item 2"]);
		});

		listDAO.findAllLists(function (result)
		{
			assert.equal(result.length, 2);
			assert.equal(result[0], "item 1");
			assert.equal(result[1], "item 2");
		});
	});
});