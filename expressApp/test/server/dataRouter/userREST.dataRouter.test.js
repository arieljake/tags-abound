describe('userREST', function ()
{
	it('should handle expected user routes', function ()
	{
		var expectedRoutes = [
			['get', '/users/:userId'],
			['put', '/users/:userId']
		];

		testRoutesDefined(spies,expectedRoutes);
	});
});