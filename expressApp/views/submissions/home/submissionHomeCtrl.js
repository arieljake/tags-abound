
var SubmissionHomeCtrl = function ($scope, $http)
{
	this.init($scope,$http);

	this.submissionService.getAllSubmission(function (submissions)
	{
		$scope.submissions = submissions;
	});
}

SubmissionHomeCtrl.prototype.init = function (scope,http)
{
	this.scope = scope;
	this.http = http;
	this.submissionService = new SubmissionService(http);

	this.scope.submissions = [];
};