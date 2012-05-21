
function ProfileEditCtrl($scope, $http)
{
	var self = this;
	var profileService = new ProfileService($http);

	$scope.tagList = [];
	$scope.errorMessage = null;

	profileService.getCurrentUser(function (user)
	{
		if (user.sex === undefined) {
			user.sex = "female";
		}

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

		if (tagIndex >= 0) {
			$scope.tagList.splice(tagIndex, 1);
			$scope.user.tags = $scope.tagList.join(',');
		}
	};

	$scope.saveUser = function ()
	{
		profileService.updateUser($scope.user, function (results)
		{
			$scope.errorMessage = results.message;
		});
	};

	this.refreshTagList = function ()
	{
		$scope.tagList = self.hasTags() ? $scope.user.tags.split(',') : [];
	};

	this.hasTags = function ()
	{
		return $scope.user.tags !== undefined && $scope.user.tags !== null && $scope.user.tags.trim().length > 0;
	};
};