var RegisterService = function ($http)
{
	this.register = function (info, callback)
	{
		$http({method:'POST', url:'/register', data: info})
			.success(function (data, status, headers, config)
					 {
						 callback(status, data);
					 });
	};
};