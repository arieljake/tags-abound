


function ProfileCtrl($scope, $http)
{
	var self = this;
	var profileService = new ProfileService($http);

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
};