
describe("createSubmission", function ()
{
	var submission;
	var callback;

	beforeEach(function ()
	{
		submission = {title: "testtitle", tags: "testtags"};
		callback = function (res) {};
	});

	it("should specify corrects args to db", function()
	{
		submissionDAO.createSubmission(submission,callback);

		assert.equal(collectionSpy.firstCall.args[0],"v1_submission");
		assert.equal(insertSpy.firstCall.args[0].title,submission.title);
		assert.equal(insertSpy.firstCall.args[0].tags,submission.tags);
	});

	it("if it receives an error should return the error", function ()
	{
		var error = {};

		db.insert.restore();
		var insertStub = sinon.stub(db,"insert", function (document,callback)
		{
			callback(error,null);
		});

		submissionDAO.createSubmission(submission,function (err,items)
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

		submissionDAO.createSubmission(submission,function (err,items)
		{
			assert.equal(err,null);
		});
	});
});