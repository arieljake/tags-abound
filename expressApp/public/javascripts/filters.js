function checkmarkFilterFactory()
{
	return function (input)
	{
		return input ? '\u2713' : '\u2718';
	}
}