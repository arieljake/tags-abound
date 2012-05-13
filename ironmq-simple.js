var ironmq = require('ironmq');

ironmq('POpDAlGQZi_w6MStfpbYfpjQLp4')
	.projects('4facd5080c389d026800cf6b')
	.queues('queue1')
	.put('hello world'
	, function callBack(err, obj) {
		console.dir(obj.ids); // array of ids posted
	});