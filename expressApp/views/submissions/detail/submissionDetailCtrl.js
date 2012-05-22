

var SubmissionDetailCtrl = function($scope, $http)
{
	var submissionService = new SubmissionService($http);

	submissionService.getSubmission(submissionId, function (submission)
	{
		$scope.curSubmission = submission;
	});
};