
var filters = {};

filters.checkmarkFilterFactory = function ()
{
	return function (input)
	{
		return input ? '\u2713' : '\u2718';
	}
};