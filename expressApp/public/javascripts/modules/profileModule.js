function ProfileCtrl($scope, $route, $routeParams, $http)
{
	var self = this;
	var profileService = new ProfileService($http);

	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
};