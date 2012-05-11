var LoginService = function ($http)
{
	this.login = function (info, callback)
	{
		$http({method:'POST', url:'/doLogin', data: info})
			.success(function (data, status, headers, config)
					 {
						 callback(status, data);
					 });
	};

	this.register = function (info, callback)
	{
		$http({method:'POST', url:'/doRegister', data: info})
			.success(function (data, status, headers, config)
					 {
						 callback(status, data);
					 });
	};
};