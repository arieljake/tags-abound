var BASE_VIEW_URL = "/views/profile";

var editTemplate = BASE_VIEW_URL + '/edit';

var profileModule = angular.module('route', [], function ($routeProvider, $locationProvider, $provide)
{
	$routeProvider.when('/', {template: editTemplate, controller: ProfileEditCtrl});
	$routeProvider.otherwise({redirectTo:'/'});

	$provide.factory('profileService', function ($http)
	{
		return new ProfileService($http);
	});
});

function ProfileEditCtrl($scope, $route, $routeParams, profileService)
{
	var self = this;

	$scope.$route = $route;
	$scope.$routeParams = $routeParams;

	profileService.getCurrentUser(function (user)
								  {
									  $scope.user = user;
								  });
};