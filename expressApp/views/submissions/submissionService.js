var SubmissionService = function ($http)
{
	this.getAllSubmission = function (callback)
	{
		$http.jsonp(baseDataUrl + '/submissions' + '?callback=JSON_CALLBACK')
			.success(function (data, status, headers, config)
			{
				callback(data);
			});
	};

	this.getSubmission = function (submissionId, callback)
	{
		$http.jsonp(baseDataUrl + '/submissions/' + submissionId + '?callback=JSON_CALLBACK')
			.success(function (data, status, headers, config)
			{
				callback(data);
			});
	};

	this.saveSubmission = function (submission, callback)
	{
		$http({method:'POST', url:'/submissions', data:submission}).
			success(function (data, status, headers, config)
			{
				callback(status);
			});
	};
};