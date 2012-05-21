
function SubmissionHomeCtrl($scope, $http)
{
	var submissionService = new SubmissionService($http);

	$scope.submissions = [];

	submissionService.getAll(function (submissions)
	{
		$scope.submissions = submissions;
	});
}