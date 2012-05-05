
var BASE_VIEW_URL = "/views/login";

var loginTemplate = BASE_VIEW_URL + '/login';
var registerTemplate = BASE_VIEW_URL + '/register';

angular.module('route', [], function ($routeProvider, $locationProvider, $provide)
{
	$routeProvider.when('/login', {template: loginTemplate, controller: LoginCtrl});
	$routeProvider.when('/register', {template: registerTemplate, controller: RegisterCtrl});
	$routeProvider.otherwise({redirectTo:'/login'});

	$provide.factory('loginService', function ($http)
	{
		return new LoginService($http);
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

function RegisterCtrl($scope, $http, $route, $window, loginService)
{
	$scope.$route = $route;
	$scope.registerInfo = {};
	$scope.errorMessage = null;

	$scope.register = function ()
	{
		if ($scope.registerInfo.password != $scope.registerInfo.password2)
		{
			$scope.errorMessage = "The passwords do not match, please try again.";
			return;
		}

		loginService.register($scope.registerInfo, function (responseCode, errorMessage)
		{
			if (responseCode == 202)
				$window.location.pathname = "/";
			else
				$scope.errorMessage = errorMessage;
		});
	};
}