describe('listREST', function ()
{
	it('should handle expected lists routes', function ()
	{
		var expectedRoutes = [
			['get', '/lists'],
			['get', '/lists/:listId']
		];

		testRoutesDefined(spies,expectedRoutes);
	});
});