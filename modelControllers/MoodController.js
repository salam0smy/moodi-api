var Mood = require(__dirname + '/../models/MoodSchema'),
	mongoose = require('mongoose');

// returns moods in the collection
exports.get = function(req, res, next){
	Mood.find().exec(function (err, docs){
		if(err){
			console.log("no moods");
			next(err);
		}
		var i = 0, stop = docs.length;

        for (i; i < stop; i++) {
            docs[i].image = undefined;
        }

		res.send(200 , docs);
		return next();
	});
	return next();
}

// Create a new resource in moods collection
exports.post = function(req, res, next){
	var mood = new Mood(req.params);
	mood.save(function(err, mood){
		if(err)
			return next(err);
		res.send(200, mood);
	});
	return next();
};