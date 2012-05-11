var BASE_VIEW_URL = "/views/submissions";

var listTemplate = BASE_VIEW_URL + '/list';
var detailTemplate = BASE_VIEW_URL + '/detail';
var editTemplate = BASE_VIEW_URL + '/edit';

var submissionModule = angular.module('route', [], function ($routeProvider, $locationProvider, $provide)
{
	$routeProvider.when('/submissions', {template:listTemplate, controller:SubmissionListCtrl});
	$routeProvider.when('/submission/:submissionId', {template:detailTemplate, controller:SubmissionDetailCtrl});
	$routeProvider.when('/new', {template:editTemplate, controller:SubmissionEditCtrl});
	$routeProvider.when('/edit/:submissionId', {template:editTemplate, controller:SubmissionEditCtrl});
	$routeProvider.otherwise({redirectTo:'/submissions'});

	$provide.factory('submissionService', function ($http, $location)
	{
		return new SubmissionService($http, $location);
	});
});
submissionModule.directive('onEnter', directives.onEnter);
submissionModule.directive('stopRKey', directives.stopRkey);

function SubmissionListCtrl($rootScope, $scope, $http, $route, $routeParams, submissionService)
{
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.submissions = [];

	submissionService.getAll(function (submissions)
							 {
								 $scope.submissions = submissions;
							 });
}

function SubmissionDetailCtrl($scope, $route, $routeParams, submissionService)
{
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.submissionId = $routeParams.submissionId;

	submissionService.getSubmission($scope.submissionId, function (submission)
	{
		$scope.curSubmission = submission;

		submissionService.getSubmissionLists($scope.submissionId, function (lists)
		{
			$scope.curSubmissionLists = lists;
		});
	});
};

function SubmissionEditCtrl($scope, $route, $routeParams, $location, submissionService)
{
	var self = this;

	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
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

	if ($routeParams.submissionId != undefined)
	{
		submissionService.getSubmission($routeParams.submissionId, function (submission)
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