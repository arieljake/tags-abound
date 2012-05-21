
function LoginCtrl($scope, $http, $window)
{
	var loginService = new LoginService($http);

	$scope.loginInfo = {};
	$scope.errorMessage = null;

	$('div.pageTitle').innerText = "Login";

	$scope.login = function ()
	{
		loginService.login($scope.loginInfo, function (responseCode, errorMessage)
		{
			if (responseCode == 202)
				$window.location.pathname = "/";
			else
				$scope.errorMessage = errorMessage;
		});
	};
}