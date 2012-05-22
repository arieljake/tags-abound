
function SubmissionEditCtrl($scope, $http, $location, $window)
{
	this.init($scope,$http,$location,$window);

	if (submissionId != "")
	{
		this.loadSubmission(submissionId);
	}
	else
	{
		this.setSubmission(null);
	}
}

SubmissionEditCtrl.prototype.init = function (scope,http,location,window)
{
	var self = this;

	this.scope = scope;
	this.http = http;
	this.location = location;
	this.window = window;
	this.submissionService = new SubmissionService(http);
	this.scope.tagList = [];

	this.scope.addTag = function (tag)
	{
		var curTags = self.scope.submission.tags ? self.scope.submission.tags.trim() : "";

		if (curTags.length > 0)
			curTags += "," + tag;
		else
			curTags = tag;

		self.scope.submission.tags = curTags;
		self.scope.tagList.push(tag);
		self.scope.$apply();
	};

	this.scope.saveSubmission = function ()
	{
		self.submissionService.saveSubmission(self.scope.submission, function ()
		{
			self.window.location.pathname = "/";
		});
	};

	this.scope.cancelEdit = function ()
	{
		self.window.location.pathname = "/submissions";
	};
};

SubmissionEditCtrl.prototype.loadSubmission = function (submissionId)
{
	var self = this;

	this.submissionService.getSubmission(submissionId, function (submission)
	{
		self.setSubmission(submission);
	});
};

SubmissionEditCtrl.prototype.setSubmission = function (submission)
{
	if (submission == null)
	{
		this.scope.submission = {};
		this.scope.isNew = true;
	}
	else
	{
		this.scope.submission = submission;
		this.scope.isNew = false;
	}

	this.scope.tagList = this.getTagList();
};

SubmissionEditCtrl.prototype.getTagList = function ()
{
	if (this.scope.submission.tags === undefined || this.scope.submission.tags === null)
		return [];

	return this.scope.submission.tags.split(",");
};