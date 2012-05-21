
function RegisterCtrl($scope, $http, $window)
{
	var registerService = new RegisterService($http);

	$scope.registerInfo = {};
	$scope.errorMessage = null;

	$scope.register = function ()
	{
		var errorMessage = validateForm();

		if (errorMessage !== null)
		{
			$scope.errorMessage = errorMessage;
			return;
		}

		registerService.register($scope.registerInfo, function (responseCode, errorMessage)
		{
			if (responseCode == 202)
				$window.location.pathname = "/";
			else
				$scope.errorMessage = errorMessage;
		});
	};

	var validateForm = function ()
	{
		if ($scope.registrationForm.username.$invalid)
		{
			if ($scope.registrationForm.username.$error.required)
				return "Please choose a username.";
		}

		if ($scope.registrationForm.emailAddress.$invalid)
		{
			if ($scope.registrationForm.emailAddress.$error.required)
				return "An email address is required for registration.";
			else if ($scope.registrationForm.emailAddress.$error.email)
				return "Please check the spelling of your email address.";
		}

		if ($scope.registrationForm.password.$invalid)
		{
			if ($scope.registrationForm.password.$error.required)
				return "Please provide a password.";
		}

		if ($scope.registrationForm.password2.$invalid)
		{
			if ($scope.registrationForm.password2.$error.required)
				return "Please retype your password.";
		}

		if ($scope.registerInfo.password != $scope.registerInfo.password2)
		{
			return "The passwords do not match, please try again.";
		}

		return null;
	}
}