

var ListHomeCtrl = function($scope, $http)
{
	var listService = new ListService($http);

	$scope.lists = [];

	listService.getAll(function (lists)
	{
		$scope.lists = lists;
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