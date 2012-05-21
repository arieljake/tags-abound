
function SubmissionEditCtrl($scope, $http, $location)
{
	var self = this;
	var submissionService = new SubmissionService($http);
	var submissionId = null;

	$scope.tagList = [];

	this.setSubmission = function (submission)
	{
		if (submission == null)
		{
			$scope.submission = {};
			$scope.isNew = true;
		}
		else
		{
			$scope.submission = submission;
			$scope.isNew = false;
		}

		$scope.tagList = self.getTagList();
	};

	this.getTagList = function ()
	{
		if ($scope.submission.tags === undefined || $scope.submission.tags === null)
			return [];

		return $scope.submission.tags.split(",");
	};

	if (submissionId !== null)
	{
		submissionService.getSubmission(submissionId, function (submission)
		{
			self.setSubmission(submission);
		});
	}
	else
	{
		self.setSubmission(null);
	}

	$scope.addTag = function (tag)
	{
		var curTags = $scope.submission.tags ? $scope.submission.tags.trim() : "";

		if (curTags.length > 0)
			curTags += "," + tag;
		else
			curTags = tag;

		$scope.submission.tags = curTags;
		$scope.tagList.push(tag);
		$scope.$apply();
	};

	$scope.saveSubmission = function ()
	{
		submissionService.save($scope.submission);
	};

	$scope.cancelEdit = function ()
	{
		$location.path("/submissions");
	};

	$scope.getEditType = function()
	{
		if ($scope.isNew)
			return "New";
		else
			return "Edit";
	}
};