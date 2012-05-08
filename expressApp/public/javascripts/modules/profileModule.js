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
profileModule.directive('onEnter', directives.onEnter);
profileModule.directive('onLinkClick', directives.onEnter);

function ProfileEditCtrl($scope, $route, $routeParams, profileService)
{
	var self = this;

	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.tagList = [];


	profileService.getCurrentUser(function (user)
								  {
									  $scope.user = user;

									  self.refreshTagList();
								  });

	$scope.addTag = function (tag)
	{
		$scope.tagList.push(tag);
		$scope.user.tags = $scope.tagList.join(',');
		$scope.$apply();
	};

	$scope.removeTag = function ()
	{
		var tag = this.tag;
		var tagIndex = $scope.tagList.indexOf(tag);

		if (tagIndex >= 0)
		{
			$scope.tagList.splice(tagIndex,1);
			$scope.user.tags = $scope.tagList.join(',');
		}
	};

	this.refreshTagList = function()
	{
		$scope.tagList = self.hasTags() ? $scope.user.tags.split(',') : [];
	};

	this.hasTags = function ()
	{
		return $scope.user.tags !== undefined && $scope.user.tags !== null && $scope.user.tags.trim().length > 0;
	};
};