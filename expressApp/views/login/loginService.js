var LoginService = function ($http)
{
	this.login = function (info, callback)
	{
		$http({method:'POST', url:'/login', data: info})
			.success(function (data, status, headers, config)
					 {
						 callback(status, data);
					 });
	};
};