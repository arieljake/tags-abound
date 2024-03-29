
var listly = require('listly');
var listlyTest = require('listlyTest');
var sinon = require('sinon');
var assert = require('chai').assert;
var underscore = require('underscore');

describe("UserDAO",function ()
{
	var server;
	var userREST;
	var userDAO;
	var req;
	var res;

	beforeEach(function(done)
	{
		server = new listlyTest.ListlyDataServerStub();
		userREST = server.userREST;
		userDAO = server.userDAO;
		req = new listlyTest.ServerRequestStub();
		res = new listlyTest.ServerResponseStub();

		done();
	});