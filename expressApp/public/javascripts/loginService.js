var LoginService = function ($http)
{
	this.login = function (info, callback)
	{
		$http({method:'POST', url:'/user/login', data: info})
			.success(function (data, status, headers, config)
					 {
						 callback(status, data);
					 });
	};

	this.register = function (info, callback)
	{
		$http({method:'POST', url:'/user/register', data: info})
			.success(function (data, status, headers, config)
					 {
						 callback(status, data);
					 });
	};
};