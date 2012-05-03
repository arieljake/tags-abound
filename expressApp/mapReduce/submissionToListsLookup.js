db.v1_list.mapReduce(
	function ()
	{
		var usages = this.value.usages;

		while (usages.length > 0)
		{
			var usage = usages.pop();

			emit(usage.id,{title: usage.title, lists: [this._id]});
		}
	},
	function(key, values)
	{
		var output = values[0];

		for (var i = 1; i < values.length; i++)
		{
			while (values[i].lists.length > 0)
			{
				var list = values[i].lists.pop();

				if (output.lists.indexOf(list) == -1)
				{
					output.lists.push(list);
				}
			}
		}

		return output;
	},
	{out: {replace: "v1_submission_to_lists"}}
);