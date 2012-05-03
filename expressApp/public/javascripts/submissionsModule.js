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
submissionModule.filter('checkmark', filters.checkmarkFilterFactory);
submissionModule.directive('tagsInput', directives.tagsInputFactory);

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

	submissionService.get($scope.submissionId, function (submission)
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
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;

	if ($routeParams.submissionId != undefined)
	{
		submissionService.get($routeParams.submissionId, function (submission)
		{
			$scope.submission = submission;
		});
	}
	else
	{
		$scope.submission = {};
	}

	$scope.saveSubmission = function ()
	{
		submissionService.save($scope.submission);
	};

	$scope.cancelEdit = function ()
	{
		$location.path("/submissions");
	};
}
;