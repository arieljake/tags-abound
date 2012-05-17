
var mongoskin = require('mongoskin');
var listly = require('listly');
var listlyTest = require('listlyTest');
var underscore = require('underscore');
var sinon = require('sinon');
var assert = require('chai').assert;

describe('submissionREST', function ()
{
	var restProvider;
	var server;
	var dao;
	var req;
	var res;

	beforeEach(function(done)
	{
		server = new listlyTest.ListlyDataServerStub();
		req = new listlyTest.ServerRequestStub();
		res = new listlyTest.ServerResponseStub();

		restProvider = server.submissionREST;
		dao = server.submissionDAO;

		done();
	});

	describe('findAllSubmissions()', function ()
	{
		var items;
		var daoStub;

		beforeEach(function(done)
		{
			items = [];

			daoStub = sinon.stub(dao,"findAllSubmissions",function (callback)
			{
				callback(items);
			});

			done();
		});

		it('should call findAllSubmissions on the submissionDAO', function ()
		{
			restProvider.getAllSubmissions(req,res);

			assert.ok(daoStub.calledOnce);
		});

		it('should send results to res', function ()
		{
			var resSpy = sinon.spy(res,"send");

			restProvider.getAllSubmissions(req,res);

			assert.ok(resSpy.calledOnce);
			assert.equal(resSpy.firstCall.args[0],listly.renderUtils.outputJSONP(req,items));
		});
	});
})