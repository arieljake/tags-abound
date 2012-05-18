var BASE_VIEW_URL = "/views/user/home";

var mainTemplate = BASE_VIEW_URL + "/main";

var homeModule = angular.module('route', [], function ($routeProvider, $locationProvider, $provide)
{
	$routeProvider.when('', {template: mainTemplate, controller: MainHomeCtrl});
	$routeProvider.otherwise({redirectTo:''});

	$provide.factory('homeService', function ($http)
	{
		return new HomeService($http);
	});
});

function MainHomeCtrl($scope, $route, $routeParams, homeService)
{
	var self = this;

	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
};