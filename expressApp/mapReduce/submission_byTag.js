db.v1_submission.mapReduce(
	function ()
	{
		if (this.tags !== undefined)
		{
			var itemTags = this.tags.split(",");

			while (itemTags.length > 0)
			{
				var tag = itemTags.pop();
				emit(tag,{name: tag, count: 1, usages: [{title: this.title, id: this._id}]});
			}
		}
	},
	function(key, values)
	{
		var results = {name: key, count: 0, usages: []};

		for (var i=0; i < values.length; i++)
		{
			var value = values[i];
			results.count = results.count + value.count;
			results.usages = results.usages.concat(value.usages);
		}

		return results;
	},
	{out: {replace: "v1_submission_byTag"}}
);
