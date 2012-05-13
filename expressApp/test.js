var spawn = require('child_process').spawn;
var args = [
	'--debug-brk',
	'/usr/local/lib/node_modules/mocha/bin/_mocha',
	'--reporter',
	'dot',
	'--ui',
	'bdd',
	'-r',
	'should',
	'-r',
	'jsmockito',
	'-r',
	'jshamcrest',
	'-r',
	'listlyTest',
	'test/routes/submissionREST.js'
];

var proc = spawn("node", args, { customFds: [0,1,2] });
proc.on('exit', process.exit);