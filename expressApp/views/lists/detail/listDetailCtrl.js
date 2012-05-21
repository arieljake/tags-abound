

var ListDetailCtrl = function ($scope, $http)
{
	var listService = new ListService($http);
	var listId = null;

	listService.getListById(listId, function (list)
	{
		$scope.curList = list.value;
	});
};