var ListService = function ($http)
{
	this.get = function (listId, callback)
	{
		$http({method:'GET', url:'/list/' + listId})
			.success(function (data, status, headers, config)
					 {
						 callback(data);
					 });
	};

	this.getAll = function (callback)
	{
		$http({method:'GET', url:'/lists'}).
			success(function (data, status, headers, config)
					{
						callback(data);
					});
	}
};