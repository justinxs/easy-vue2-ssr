const nodemon = require('nodemon');



nodemon(`--watch server -e js --watch config -e js,json --ignore node_modules/**node_modules --inspect=3001 ./server/main.js`);

nodemon.on('start', function() {
	console.log('App has started');
}).on('quit', function() {
	console.log('App has quit');
	process.exit();
}).on('restart', function(files) {
	console.log('App restarted due to: ', files);
});