var Mood = require(__dirname + '/../models/MoodSchema.js');
	

// returns moods in the collection
exports.query = function(req, res, next){
	Mood.find().exec(function (err, docs){
		if(err){
			console.log("no moods was found");
			next(err);
		}
		//var i = 0, stop = docs.length;

       // for (i; i < stop; i++) {
        //    docs[i].image = undefined;
      //  }
        //Console.log(docs);
		res.send(200 , docs);
		return next();
	});
	return next();
}

// returns a mood
exports.get = function(req, res, next){
	Mood.findById(req.params.id, function(err, mood){
		if(err){
			console.log("no moods was found");
			next(err);
		}
        mood.image = undefined;
		res.send(200 , mood);
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

// update resource in moods collection
exports.put = function(req, res, next){
	var _mood = req.params;
	Mood.findById(req.params.id, function(err, mood){
		if(err)
			return next(err);
	mood.name = _mood.name;
	mood.altName = _mood.altName;
	mood.status = _mood.status;
	mood.save(function(err, __mood){
		if(err)
			return next(err);
		res.send(200, __mood);
	});
});
};


// mood ID given in req.params.id
// send mood's image back
exports.getImage = function(req, res, next){
	Mood.findById(req.params.id, function(err, mood){
		if(err)
			return next(err);
		res.contentType(mood.image.contentType);
        res.send(mood.image.data);
	});
};

// upload image to given mood id
exports.putImage = function(req, res, next){
	Mood.findById(req.params.id, function(err, mood){
		if(err)
			return next(err);
		// TODO: complete implamenting upload image
	});
}
