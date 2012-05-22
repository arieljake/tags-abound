describe('userREST', function ()
{
	it('should handle expected user routes', function ()
	{
		var expectedRoutes = [
			['get', '/users/:username'],
			['put', '/users/:username']
		];

		testRoutesDefined(spies,expectedRoutes);
	});
});