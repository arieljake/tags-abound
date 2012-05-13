var fivebeans = require('fivebeans');
var client = new fivebeans.client('mq-aws-us-east-1.iron.io', 11300);

client.connect( function (err)
{
	console.dir(err);

//	client.use("testtube", function (err, tname)
//	{
//		console.dir(err);
//		console.dir(tname);

		client.put(100,0,60000,"oauth POpDAlGQZi_w6MStfpbYfpjQLp4 4facd5080c389d026800cf6b", function (err, jobid) {

			console.dir(err);
			console.dir(jobid);

		});

//	});
});