
var listlyTest = require('listlyTest');
var underscore = require('underscore');
var sinon = require('sinon');

describe('submissionREST', function ()
{
	var restProvider;
	var dao;
	var msgService;
	var req;
	var res;

	beforeEach(function(done)
	{
		dao = new listlyTest.SubmissionDAO();
		req = new listlyTest.ServerRequestStub();
		res = new listlyTest.ServerResponseStub();
		restProvider = new listlyTest.SubmissionREST(dao,msgService);

		done();
	});

	describe('findAllSubmissions()', function ()
	{
		it('should call findAllSubmissions on the submissionDAO', function ()
		{
			var daoMock = sinon.mock(dao);
			daoMock.expects("findAllSubmissions").once();

			var restFunction = restProvider.getAllSubmissions();
			restFunction(req,res);

			daoMock.verify();
		});

		it('should send results as json', function ()
		{
			var daoStub = sinon.stub(dao,"findAllSubmissions",function(callback)
			{
				callback(null);
			});

			var resSpy = sinon.spy(res,"setHeader");

			var restFunction = restProvider.getAllSubmissions();
			restFunction(req,res);

			sinon.assert.calledOnce(resSpy);
			sinon.assert.calledWith(resSpy,"Content-Type","application/json");
		});

		it('should send results to res', function ()
		{
			var items = [];

			var daoStub = sinon.stub(dao,"findAllSubmissions",function(callback)
			{
				callback(items);
			});

			var resSpy = sinon.spy(res,"send");

			var restFunction = restProvider.getAllSubmissions();
			restFunction(req,res);

			sinon.assert.calledOnce(resSpy);
			sinon.assert.calledWith(resSpy,items);
		});
	});

	describe('getSubmissionById()', function ()
	{
		it('should call findSubmissionById on the submissionDAO with the correct param', function ()
		{
			var daoMock = sinon.mock(dao);
			daoMock.expects("findSubmissionById").withArgs(100).once();

			req.params["myParam"] = 100;

			var restFunction = restProvider.getSubmissionById("myParam");
			restFunction(req,res);

			daoMock.verify();
		});

		it('should send results as json', function ()
		{
			var daoStub = sinon.stub(dao,"findSubmissionById",function(id,callback)
			{
				callback(null);
			});

			var resSpy = sinon.spy(res,"setHeader");

			var restFunction = restProvider.getSubmissionById();
			restFunction(req,res);

			sinon.assert.calledOnce(resSpy);
			sinon.assert.calledWith(resSpy,"Content-Type","application/json");
		});

		it('should send results to res', function ()
		{
			var items = [];

			var daoStub = sinon.stub(dao,"findSubmissionById",function(id,callback)
			{
				callback(items);
			});

			var resSpy = sinon.spy(res,"send");

			var restFunction = restProvider.getSubmissionById();
			restFunction(req,res);

			sinon.assert.calledOnce(resSpy);
			sinon.assert.calledWith(resSpy,items);
		});
	});
})