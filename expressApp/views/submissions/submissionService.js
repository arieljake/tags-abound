var SubmissionService = function($http)
{
	this.getAll = function (callback)
	{
		$http({method:'GET', url:'/submissions'}).
			success(function (data, status, headers, config)
					{
						callback(data);
					});
	};

	this.getSubmission = function (submissionId, callback)
	{
		$http({method:'GET', url:'/submission/' + submissionId})
			.success(function (data, status, headers, config)
					 {
						 callback(data);
					 });
	};

	this.getSubmissionLists = function (submissionId, callback)
	{
		$http({method:'GET', url:'/submission/' + submissionId + '/lists'})
			.success(function (data, status, headers, config)
					 {
						 callback(data);
					 });
	};

	this.save = function (submission, callback)
	{
		$http({method:'POST', url:'/submission', data:submission}).
			success(function (data, status, headers, config)
					{
						callback(status);
					});
	};
};