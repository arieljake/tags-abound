describe('submissionREST', function ()
{
	it('should handle expected submission routes', function ()
	{
		var expectedRoutes = [
			['get', '/submissions'],
			['get', '/submissions/:submissionId'],
			['get', '/submissions/search?title=:submissionTitle'],
			['get', '/submissions'],
			['post', '/submissions'],
			['put', '/submissions/:submissionId']
		];

		testRoutesDefined(spies,expectedRoutes);
	});
});