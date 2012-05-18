
var listly = require('listly');
var listlyTest = require('listlyTest');
var sinon = require('sinon');
var assert = require('chai').assert;
var underscore = require('underscore');

describe("UserDAO",function ()
{
	var server;
	var db;
	var userREST;
	var req;
	var res;

	beforeEach(function(done)
	{
		server = new listlyTest.ListlyDataServerStub();
		db = server.db;
		userREST = server.userREST;
		req = new listlyTest.ServerRequestStub();
		res = new listlyTest.ServerResponseStub();

		done();
	});