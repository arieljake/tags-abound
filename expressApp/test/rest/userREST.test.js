
var listlyTest = require('listlyTest');
var sinon = require('sinon');
var assert = require('chai').assert;
var should = require('should');
var mongodb = require('mongodb');

module.exports.describe = function ()
{
	describe("UserDAO",function ()
	{
		var server;
		var userDAO;
		var db;
		var collectionSpy;
		var findSpy;
		var insertSpy;
		var updateByIdSpy;

		beforeEach(function(done)
		{
			server = new listlyTest.ListlyDataServerStub();
			userDAO = server.userDAO;
			db = server.db;
			collectionSpy = sinon.spy(db,"collection");
			findSpy = sinon.spy(db,"find");
			insertSpy = sinon.spy(db,"insert");
			updateByIdSpy = sinon.spy(db,"updateById");

			done();
		});

		describe("findUserById", function ()
		{
			var id;
			var callback;

			beforeEach(function ()
			{
				id = "4f9f9bfe5febe9373d000003";
				callback = function (res) {};
			});

			it("should specify corrects args to db", function()
			{
				userDAO.findUserById(id,callback);

				// can this be abstracted to a separate 'mongo' layer?
				assert.equal(collectionSpy.firstCall.args[0],"v1_user");
				assert.equal(findSpy.firstCall.args[0]._id.toString(),new mongodb.ObjectID(id).toString());
				assert.equal(findSpy.firstCall.args[1].limit,1);
			});

			it("if it receives null should throw an error", function ()
			{
				var toArraySpy = sinon.stub(db,"toArray", function (callback)
				{
					callback(null,null);
				});

				var errorCaught = false;

				try
				{
					userDAO.findUserById(id);
				}
				catch (e)
				{
					errorCaught = true;
				}

				errorCaught.should.be.true;
			});

			it("should handle 'no users' by returning null", function ()
			{
				var toArraySpy = sinon.stub(db,"toArray", function (callback)
				{
					callback(null,[]);
				});

				userDAO.findUserById(id,function (result)
				{
					assert.ok(result == null);
				});
			});

			it("should return item 0 if 1 user returned", function ()
			{
				var toArraySpy = sinon.stub(db,"toArray", function (callback)
				{
					callback(null,["user 1"]);
				});

				userDAO.findUserById(id,function (result)
				{
					assert.ok(result == "user 1");
				});
			});

			it("should return item 0 if 2 users returned", function ()
			{
				var toArraySpy = sinon.stub(db,"toArray", function (callback)
				{
					callback(null,["user 1","user 2"]);
				});

				userDAO.findUserById(id,function (result)
				{
					assert.ok(result == "user 1");
				});
			});
		});
	});
};