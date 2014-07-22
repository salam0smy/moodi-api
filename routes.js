'use strict'

var MoodController = require(__dirname + '/modelControllers/MoodController.js');
var EventController = require(__dirname + '/modelControllers/EventController.js');


exports.set = function(app) {
	// config mood api
	app.get('/moods/:id', MoodController.get);
	app.get('/moods', MoodController.query);
	app.post('/moods', MoodController.post);
	app.put('moods/:id', MoodController.put);
	app.del('moods/:id', MoodController.delete);
	app.get('/moods/:id/image', MoodController.getImage);

	// config events routes
	app.get('/events', EventController.query);
	app.get('/events/:id', EventController.get);
	app.post('/events', EventController.post);
	app.put('/events/:id', EventController.put);
	app.del('/events/:id', EventController.delete);
	app.get('/concierge/:id', EventController.concierge);

};