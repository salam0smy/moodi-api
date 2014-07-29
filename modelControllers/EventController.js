var Events = require('../models/EventSchema.js');


exports.query = function(req, res, next){
	Events.find().exec(function(err, docs){
		if(err)
			next(err);
		res.send(200, docs);
	});
};

exports.get = function(req, res, next){
	Events.findById(req.params.id, function(err, doc){
		if(err)
			next(err);
		res.send(doc);
	});
};

// Create a new resource in moods collection
exports.post = function(req, res, next){
	var ev = new Events(req.params);

	ev.save(function(err, evnt){
		if(err)
			return next(err);
		res.send(200, evnt);
	});
	return next();
};

// update all fields in Event
exports.put = function(req, res, next){
	Events.findById(req.params.id, function(err, doc){
		if(err)
			next(err);

		//update fields
        for (var field in Events.schema.paths) {
           if ((field !== '_id') && (field !== '__v')) {
              if (req.body[field] !== undefined) {
                 doc[field] = req.body[field];
              }  
           }  
        } 
        doc.save(function(err, evnt){
			if(err)
				return next(err);
			res.send(200, evnt);
		})
	});
};

// delete resource in event collection
exports.delete = function(req, res, next){
	Events.findById(req.params.id, function(err, ev){
		if(err)
			return next(err);
	
		ev.remove(function(err, __ev){
			if(err)
				return next(err);
			res.send(204);
			return next();
		});
	});
};

// returns list of events for given mood id
exports.concierge = function(req, res, next){
	Events.find({'moods':{$in:[req.params.id]}}, function(err, _events){
		if(err)
			return next(err);
		res.send(200, _events);
	});
}