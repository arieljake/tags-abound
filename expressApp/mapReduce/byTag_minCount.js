db.v1_submission_byTag.mapReduce(
	function ()
	{
		if (this.value.count >= 3)
			emit(this._id,this.value);
	},
	function(key, values)
	{
		return values;
	},
	{out: {replace: "v1_list"}}
);