
describe("updateSubmissionById", function ()
{
	var id;
	var submission;
	var callback;

	beforeEach(function ()
	{
		id = "4f9f9bfe5febe9373d000003";
		submission = {title: "testtitle", tags: "testtags"};
		callback = function (res) {};
	});

	it("should specify corrects args to db", function()
	{
		submissionDAO.updateSubmissionById(id,submission,callback);

		assert.equal(collectionSpy.firstCall.args[0],"v1_submission");
		assert.equal(updateByIdSpy.firstCall.args[0].toString(),new mongodb.ObjectID(id).toString());
		assert.equal(updateByIdSpy.firstCall.args[1],submission);
	});

	it("if it receives an error should return the error", function ()
	{
		var error = {};

		db.insert.restore();
		var insertStub = sinon.stub(db,"insert", function (id,document,callback)
		{
			callback(error);
		});

		submissionDAO.updateSubmissionById(id,submission,function (err)
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

		submissionDAO.updateSubmissionById(id,submission,function (err)
		{
			assert.equal(err,null);
		});
	});
});