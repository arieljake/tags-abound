var listly = require('listly');
var listlyTest = require('listlyTest');
var underscore = require('underscore');
var sinon = require('sinon');
var assert = require('chai').assert;


var testRoutesDefined = function (spies,expectedRoutes)
{
	for (var i = 0; i < expectedRoutes.length; i++)
	{
		var route = expectedRoutes[i];
		var spy = spies[route[0]];
		assert.ok(spy.calledWith(route[1]),route[0] + ' ' + route[1]);
	}
};

describe('dataRouter', function ()
{
	var server;
	var router;
	var spies = {};

	beforeEach(function (done)
	{
		server = new listlyTest.ListlyDataServerStub();

		spies.get = sinon.spy(server.app, "get");
		spies.post = sinon.spy(server.app, "post");
		spies.put = sinon.spy(server.app, "put");

		router = new listly.ListlyDataRouter(server);

		done();
	});
