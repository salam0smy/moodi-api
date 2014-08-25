var Events = require('../models/EventSchema.js'),
	fs = require('fs');


exports.query = function(req, res, next){
	Events.find().exec(function(err, _events){
		if(err)
			next(err);
		var evArr = [];
		for (var i = _events.length - 1; i >= 0; i--) {
			var mEvent = stripImage(_events[i]);
			evArr.push(mEvent);
		};
		res.send(200, evArr);
	});
};

exports.get = function(req, res, next){
	Events.findById(req.params.id, function(err, doc){
		if(err)
			next(err);
		var ev = stripImage(doc);
		res.send(ev);
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
		var field = "title";
		if(req.body[field]){
			doc[field] = req.body[field];
		}
		field = "desc";
		if(req.body[field]){
			doc[field] = req.body[field];
		}
		field = "date";
		if(req.body[field]){
			doc[field] = req.body[field];
		}
		field = "status";
		if(req.body[field]){
			doc[field] = req.body[field];
		}
		field = "address";
		if(req.body[field]){
			var doc = doc[field]
			var address = req.body[field]
			field = "name";
			if(address[field]){
				doc[field] = address[field];
			}
			field = "street";
			if(address[field]){
				doc[field] = address[field];
			}
			field = "city";
			if(address[field]){
				doc[field] = address[field];
			}
			field = "province";
			if(address[field]){
				doc[field] = address[field];
			}
		}
		//update fields
        // for (var field in Events.schema.paths) {
        //    if ((field !== '_id') && (field !== '__v')) {
        //    	console.log("\n")
        //     console.log(field+" :");
        //       if (req.body[field] !== undefined) {
              	
        //       	console.log(req.body[field]);
        //          doc[field] = req.body[field];
        //       }  
        //    }  
        // } 
        doc.save(function(err, evnt){
			if(err)
				return next(err);
			var mevent = stripImage(evnt);
			res.send(200, mevent);
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
		var evArr = [];
		for (var i = _events.length - 1; i >= 0; i--) {
			var mEvent = stripImage(_events[i])
			evArr.push(mEvent);
		};
		res.send(200, evArr);
	});
}

exports.getImage = function(req, res, next){
	var i = req.params.img_id - 1;
	Events.findById(req.params.id, function(err, eve){
		if(err)
			return next(err);
	
		res.writeHead(200,{
			'Content-Type': eve.images[i].contentType
		});
        res.write(eve.images[i].data);
        res.end();
	});
};

// upload image to given event id
exports.putImage = function(req, res, next){
	console.log("file is");
	console.log(req.files.file.name);
	console.log(req.files.file.path);
	console.log(req.params.id);

	Events.findById(req.params.id, function(err, eve){
		if(err)
			return next(err);
		var i = eve.images.length;
		var img = {}
		
		img.data = fs.readFileSync(req.files.file.path);
		img.contentType = req.files.file.type;
		eve.images.push(img);
		console.log(eve.images[i]);
		eve.save(function(err, __eve){
			if(err)
				return next(err);
			res.send(202);
		});
	});
}

function stripImage(event) {
	var mEvent = event.toJSON();
	mEvent.imageCount = event.images.length
	mEvent.images = undefined;
	return mEvent;
}