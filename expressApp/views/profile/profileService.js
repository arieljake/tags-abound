

var ProfileService = function ($http)
{
	this.getUser = function(username,callback)
	{
		$http.jsonp(baseDataUrl + '/users/' + username + '?callback=JSON_CALLBACK')
			.success(function (data, status, headers, config)
					 {
						 callback(data);
					 });
	};

	this.updateUser = function (user, callback)
	{
		$http({method:'PUT', url:'/user', data: user}).
			success(function (data, status, headers, config)
			{
				callback();
			});
	};
};