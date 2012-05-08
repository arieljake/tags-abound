

var ProfileService = function ($http)
{
	this.getCurrentUser = function(callback)
	{
		$http({method:'GET', url:'/user'})
			.success(function (data, status, headers, config)
					 {
						 callback(data);
					 });
	};

	this.updateUser = function (user, callback)
	{
		$http({method:'POST', url:'/user', data: user}).
			success(function (data, status, headers, config)
					{
						callback();
					});
	};
};