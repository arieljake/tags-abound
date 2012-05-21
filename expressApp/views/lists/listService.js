var ListService = function ($http)
{
	this.getListById = function (listId, callback)
	{
		$http.jsonp(baseDataUrl + '/lists/' + listId + '?callback=JSON_CALLBACK')
			.success(function (data, status, headers, config)
					 {
						 callback(data);
					 });
	};

	this.getAll = function (callback)
	{
		$http.jsonp(baseDataUrl + '/lists' + '?callback=JSON_CALLBACK').
			success(function (data, status, headers, config)
					{
						callback(data);
					});
	}
};