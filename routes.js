'use strict'

var MoodController = require('./modelControllers/MoodController.js');
var EventController = require('./modelControllers/EventController.js');


exports.set = function(app) {

	// app.put('/token', /*restify-oauth2*/);

	// config mood api
	app.get('/moods/:id', MoodController.get);
	app.get('/moods', MoodController.query);
	app.post('/moods', MoodController.post);
	app.put('moods/:id', MoodController.put);
	app.del('moods/:id', MoodController.delete);
	app.get('/moods/:id/image', MoodController.getImage);
	app.post('/moods/:id/image', MoodController.putImage);

	// config events routes
	app.get('/events', EventController.query);
	app.get('/events/:id', EventController.get);
	app.post('/events', EventController.post);
	app.put('/events/:id', EventController.put);
	app.del('/events/:id', EventController.delete);
	app.get('/concierge/:id', EventController.concierge);
	app.get('/events/:id/image/:img_id', EventController.getImage);
	app.post('/events/:id/image', EventController.putImage);
};