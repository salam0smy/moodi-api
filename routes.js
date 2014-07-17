'use strict'

var MoodController = require(__dirname + '/modelControllers/MoodController.js');


exports.set = function(app) {
	// config mood api
	app.get('/moods', MoodController.get);
	app.post('/moods', MoodController.post);

};