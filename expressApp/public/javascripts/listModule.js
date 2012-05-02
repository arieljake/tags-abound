var BASE_VIEW_URL = "/view/lists";

var listTemplate = BASE_VIEW_URL + '/list';
var detailTemplate = BASE_VIEW_URL + '/detail';

angular.module('route', [], function ($routeProvider, $locationProvider, $provide)
{
	$routeProvider.when('/lists',
						{template:listTemplate, controller:ListListCtrl});
	$routeProvider.when('/list/:listId',
						{template:detailTemplate, controller:ListDetailCtrl});

	$routeProvider.otherwise({redirectTo:'/lists'});

	$provide.factory('listService', function ($rootScope, $http, $location)
	{
		return new ListService($rootScope, $http);
	});
});

function ListListCtrl($rootScope, $scope, $route, $routeParams, listService)
{
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$rootScope.lists = [];

	listService.getAll(function (lists)
					   {
						   $rootScope.lists = lists;
					   });

	$scope.numLists = function ()
	{
		return $scope.lists.length;
	};

	$scope.getFilteredLists = function ()
	{
		if ($scope.listOrder == undefined)
		{
			$scope.listOrder = "name";
		}

		var filteredList = _.filter($scope.lists, function (list)
		{
			return $scope.listFilter == null ||
				$scope.listFilter == "" ||
				list.name.indexOf($scope.listFilter) >= 0;
		});

		var orderedList = _.sortBy(filteredList, function (list)
		{
			return list[$scope.listOrder];
		});

		return orderedList;
	}
}

function ListDetailCtrl($scope, $http, $route, $routeParams, listService)
{
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;

	listService.get($routeParams.listId, function (list)
	{
		$scope.curList = list;
	});
}

function ListService($rootScope, $http)
{
	this.get = function (listId, callback)
	{
		$http({method:'GET', url:'/list/' + listId})
			.success(function (data, status, headers, config)
					 {
						 callback(data);
					 });
	};

	this.getAll = function (callback)
	{
		$http({method:'GET', url:'/lists'}).
			success(function (data, status, headers, config)
					{
						callback(data);
					});
	}
}