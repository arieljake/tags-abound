describe('submissionREST', function ()
{
	it('should handle expected submission routes', function ()
	{
		var expectedRoutes = [
			['get', '/submissions'],
			['get', '/submissions/:submissionId'],
			['get', '/submissions/:submissionId/lists'],
			['get', '/submissions/search?title=:submissionTitle'],
			['get', '/submissions']
		];

		testRoutesDefined(spies,expectedRoutes);
	});
});