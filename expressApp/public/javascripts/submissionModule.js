
var BASE_VIEW_URL = "/view/submissions";

var listTemplate = BASE_VIEW_URL + '/list';
var detailTemplate = BASE_VIEW_URL + '/detail';
var editTemplate = BASE_VIEW_URL + '/edit';

angular.module('route', [], function ($routeProvider, $locationProvider, $provide)
{
	$routeProvider.when('/submissions',
						{template: listTemplate, controller: SubmissionListCtrl});
	$routeProvider.when('/submission/:submissionId',
						{template: detailTemplate, controller: SubmissionDetailCtrl});
	$routeProvider.when('/new',
						{template: editTemplate, controller: SubmissionEditCtrl});
	$routeProvider.when('/edit/:submissionId',
						{template: editTemplate, controller: SubmissionEditCtrl});

	$routeProvider.otherwise({redirectTo:'/submissions'});

	$provide.factory('submissionSvc', function ($rootScope, $http, $location)
	{
		return new SubmissionService($rootScope, $http, $location);
	});
})
	.filter('checkmark', checkmarkFilterFactory)
	.directive('tagsInput', function ()
			   {
				   return function (scope, element, attrs)
				   {
					   var tagsInputSettings = {};

					   if ($(element).attr('ng-model') != undefined)
					   {
						   tagsInputSettings.onChange = function (element, tags)
						   {
							   var modelDestPath = $(element).attr('ng-model').split(".");
							   var modelDest = function dive(dest,path)
							   {
								   if (path.length == 1)
								   	return dest;

								   var propName = path.shift();
								   return dive(dest[propName],path);

							   }(scope,modelDestPath);

							  modelDest[modelDestPath.pop()] = $(element).val();
						   };
					   }

					   $(element).tagsInput(tagsInputSettings);
				   }
			   });

function SubmissionListCtrl($rootScope, $scope, $http, $route, $routeParams, $location)
{
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.location = $location;
	$rootScope.submissions = [];

	$http({method:'GET', url:'/submissions'}).
		success(function (data, status, headers, config)
				{
					$rootScope.submissions = data;
				});

	$scope.numSubmissions = function ()
	{
		return $scope.submissions.length;
	};

	$scope.removeDoneSubmissions = function ()
	{
		$scope.submissions = _.filter($scope.submissions, function (submission)
		{
			return submission.done == false;
		});
	}

	$scope.addSubmission = function ()
	{
		var id = $scope.numSubmissions() + 1;

		$scope.submissions.push({name:$scope.formSubmissionName, id:id, done:false});
		$scope.formSubmissionName = null;
	};

	$scope.getFilteredSubmissions = function ()
	{
		if ($scope.submissionOrder == undefined)
		{
			$scope.submissionOrder = "name";
		}

		var filteredList = _.filter($scope.submissions, function (submission)
		{
			return $scope.submissionFilter == null ||
				$scope.submissionFilter == "" ||
				submission.name.indexOf($scope.submissionFilter) >= 0;
		});

		var orderedList = _.sortBy(filteredList, function (submission)
		{
			return submission[$scope.submissionOrder];
		});

		return orderedList;
	}

	$scope.refreshSubmissions = function ()
	{
		$http({method:'GET', url:'/static/data/submissions.json'}).
			success(function (data, status, headers, config)
					{
						$scope.submissions = data;
					});
	};
}

function SubmissionDetailCtrl($scope, $http, $route, $routeParams)
{
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;

	$http({method:'GET', url:'/submission/' + $routeParams.submissionId}).
		success(function (data, status, headers, config)
				{
					$scope.curSubmission = data;
				});
}

function SubmissionEditCtrl($scope, $route, $routeParams, $location, submissionSvc)
{
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;

	if ($routeParams.submissionId != undefined)
	{
		submissionSvc.get($routeParams.submissionId, function (submission)
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
		submissionSvc.save($scope.submission);
	};

	$scope.cancelEdit = function ()
	{
		$location.path("/submissions");
	};
}

function SubmissionService($rootScope, $http, $location)
{
	this.get = function (submissionId,callback)
	{
		$http({method:'GET', url:'/submission/' + submissionId})
			.success(function(data, status, headers, config)
							 {
								 callback(data);
							 });
	};

	this.save = function (submission)
	{
		$http({method:'POST', url:'/save/submission', data: submission}).
			success(function (data, status, headers, config)
					{
						$location.path("/submissions");
					});
	};
}