

function SubmissionDetailCtrl($scope, $http)
{
	var submissionService = new SubmissionService($http);

	var submissionId = null;

	submissionService.getSubmission(submissionId, function (submission)
	{
		$scope.curSubmission = submission;

		submissionService.getSubmissionLists(submissionId, function (lists)
		{
			$scope.curSubmissionLists = lists;
		});
	});
};