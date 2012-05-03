db.v1_submission.mapReduce(
	function ()
	{
		var get3letterCombos = function (options)
		{
			var output = [];

			var pos1 = 0;
			var pos2;
			var pos3;

			while (pos1 < options.length)
			{
				pos2 = pos1 + 1;

				while(pos2 < options.length)
				{
					pos3 = pos2 + 1;

					while (pos3 < options.length)
					{
						output.push(options[pos1] + "," + options[pos2] + "," + options[pos3]);

						pos3++;
					}

					pos2++;
				}

				pos1++;
			}

			return output;
		};

		var get2letterCombos = function (options)
		{
			var output = [];

			var pos1 = 0;
			var pos2;

			while(pos1 < options.length)
			{
				pos2 = pos1 + 1;

				while (pos2 < options.length)
				{
					output.push(options[pos1] + "," + options[pos2]);

					pos2++;
				}

				pos1++;
			}

			return output;
		};

		var get1letterCombos = function (options)
		{
			var output = [];

			var pos1 = 0;

			while (pos1 < options.length)
			{
				output.push(options[pos1]);

				pos1++;
			}

			return output;
		};

		if (this.tags !== undefined)
		{
			var itemTags = this.tags.toLowerCase().split(",");
			itemTags.sort();

			var tagCombos1 = get1letterCombos(itemTags);
			var tagCombos2 = get2letterCombos(itemTags);
			var tagCombos3 = get3letterCombos(itemTags);
			var allTagCombos = tagCombos1.concat(tagCombos2.concat(tagCombos3));

			while (allTagCombos.length > 0)
			{
				var tag = allTagCombos.pop();
				emit(tag,{name: tag, count: 1, usages: [{title: this.title, id: this._id}]});
			}
		};
	},
	function(key, values)
	{
		var results = {name: key, count: 0, usages: []};

		while (values.length > 0)
		{
			var value = values.pop();
			results.count = results.count + value.count;
			results.usages = results.usages.concat(value.usages);
		}

		return results;
	},
	{out: {replace: "v1_submission_byTag"}}
);
