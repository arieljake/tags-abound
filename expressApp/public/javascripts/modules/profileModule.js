var BASE_VIEW_URL = "/views/user/profile";

var viewTemplate = BASE_VIEW_URL + '/view';

var profileModule = angular.module('route', [], function ($routeProvider, $locationProvider, $provide)
{
	$routeProvider.when('', {template: viewTemplate, controller: ProfileViewCtrl});
	$routeProvider.otherwise({redirectTo:''});

	$provide.factory('profileService', function ($http)
	{
		return new ProfileService($http);
	});
});

function ProfileViewCtrl($scope, $route, $routeParams, profileService)
{
	var self = this;

	$scope.$route = $route;
	$scope.$routeParams = $routeParams;

	profileService.getCurrentUser(function (user)
	{
		$scope.user = user;

		self.refreshTagList();
	});

	this.refreshTagList = function ()
	{
		$scope.tagList = self.hasTags() ? $scope.user.tags.split(',') : [];
	};

	this.hasTags = function ()
	{
		return $scope.user.tags !== undefined && $scope.user.tags !== null && $scope.user.tags.trim().length > 0;
	};
}
;