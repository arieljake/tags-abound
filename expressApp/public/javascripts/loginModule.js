angular.module('route', [], function ($routeProvider, $locationProvider, $provide)
{
	$provide.factory('loginService', function ($rootScope, $http)
	{
		return new LoginService($rootScope, $http);
	});
});

function LoginCtrl($scope, $http, $route, $window, loginService)
{
	$scope.$route = $route;
	$scope.loginInfo = {};
	$scope.errorMessage = null;

	$scope.login = function ()
	{
		loginService.login($scope.loginInfo, function (responseCode, errorMessage)
		{
			if (responseCode == 202)
				$window.location.pathname = "/";
			else
				$scope.errorMessage = errorMessage;
		});
	};
}

function LoginService($rootScope, $http)
{
	this.login = function (info, callback)
	{
		$http({method:'POST', url:'/login', data: info})
			.success(function (data, status, headers, config)
					 {
						 callback(status, data);
					 });
	};
}