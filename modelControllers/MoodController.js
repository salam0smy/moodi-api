var Mood = require('../models/MoodSchema.js'),
	fs = require('fs');
	

// returns moods in the collection
exports.query = function(req, res, next){
	Mood.find().exec(function (err, docs){
		if(err){
			console.log("no moods was found");
			next(err);
		}
		for (var i = docs.length - 1; i >= 0; i--) {
			docs[i].image = undefined;
		};
		res.send(200, docs);
		return next();
	});
	return next();
}

// returns a mood
exports.get = function(req, res, next){
	Mood.findById(req.params.id, function(err, mood){
		if(err || !mood){
			console.log("no moods was found");
			res.send(204);
			return next(err);
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
	console.log("updated mood:");
	console.log(mood);
	mood.save(function(err, __mood){
		if(err)
			return next(err);
		res.send(200, __mood);
	});
});
};

// delete resource in moods collection
exports.delete = function(req, res, next){
	Mood.findById(req.params.id, function(err, mood){
		if(err)
			return next(err);
	
		mood.remove(function(err, __mood){
			if(err)
				return next(err);
			res.send(204);
			return next();
		});
	});
};


// mood ID given in req.params.id
// send mood's image back
exports.getImage = function(req, res, next){
	Mood.findById(req.params.id, function(err, mood){
		if(err)
			return next(err);
	
		res.writeHead(200,{
			'Content-Type': mood.image.contentType
		});
        res.write(mood.image.data);
        res.end();
	});
};

// upload image to given mood id
exports.putImage = function(req, res, next){
	console.log("file is");
		console.log(req.files.file.name);
		console.log(req.files.file.path);
	console.log(req.params.id);

	Mood.findById(req.params.id, function(err, mood){
		if(err)
			return next(err);
		mood.image.data = fs.readFileSync(req.files.file.path);
		mood.image.contentType = req.files.file.type;
		mood.save(function(err, __mood){
			if(err)
				return next(err);
			res.send(__mood);
		});
	});
}

