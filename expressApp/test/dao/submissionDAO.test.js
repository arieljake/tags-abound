
var listlyTest = require('listlyTest');
var sinon = require('sinon');
var assert = require('chai').assert;
var should = require('should');
var mongodb = require('mongodb');

describe("SubmissionDAO",function ()
{
	var server;
	var submissionDAO;
	var db;
	var collectionSpy;
	var findSpy;
	var insertSpy;
	var updateByIdSpy;

	beforeEach(function(done)
	{
		server = new listlyTest.ListlyDataServerStub();
		submissionDAO = server.submissionDAO;
		db = server.db;
		collectionSpy = sinon.spy(db,"collection");
		findSpy = sinon.spy(db,"find");
		insertSpy = sinon.spy(db,"insert");
		updateByIdSpy = sinon.spy(db,"updateById");

		done();
	});