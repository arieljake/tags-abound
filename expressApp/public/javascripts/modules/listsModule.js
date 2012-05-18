var BASE_VIEW_URL = "/views/lists";

var listTemplate = BASE_VIEW_URL + '/list';
var detailTemplate = BASE_VIEW_URL + '/detail';

angular.module('route', [], function ($routeProvider, $locationProvider, $provide)
{
	$routeProvider.when('', {template:listTemplate, controller:ListListCtrl});
	$routeProvider.when('/:listId', {template:detailTemplate, controller:ListDetailCtrl});
	$routeProvider.otherwise({redirectTo:''});

	$provide.factory('listService', function ($http)
	{
		return new ListService($http);
	});
});

var ListListCtrl = function($rootScope, $scope, $route, $routeParams, listService)
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
};

var ListDetailCtrl = function ($scope, $http, $route, $routeParams, listService)
{
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;

	listService.getListById($routeParams.listId, function (list)
	{
		$scope.curList = list.value;
	});
};