var combinations = require("../combinations");
var options = ["B","c","A","D","E"];

options = options.join("%$%").toLowerCase().split("%$%");
options.sort();
console.dir(get1letterCombos(options));
console.dir(get2letterCombos(options));
console.dir(get3letterCombos(options));

function get3letterCombos(options)
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
				output.push(char(pos1) + char(pos2) + char(pos3));

				pos3++;
			}

			pos2++;
		}

		pos1++;
	}

	return output;
}

function get2letterCombos(options)
{
	var output = [];

	var pos1 = 0;
	var pos2;

	while(pos1 < options.length)
	{
		pos2 = pos1 + 1;

		while (pos2 < options.length)
		{
			output.push(char(pos1) + char(pos2));

			pos2++;
		}

		pos1++;
	}

	return output;
}

function get1letterCombos(options)
{
	var output = [];

	var pos1 = 0;

	while (pos1 < options.length)
	{
		output.push(char(pos1));

		pos1++;
	}

	return output;
}

function char(pos)
{
	return options[pos];
}