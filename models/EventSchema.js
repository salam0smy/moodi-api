var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
	title: String,
	attending: Number,
	date: Date,
	images: [{ data: Buffer, contentType: String }],
	status: String
});

var ActivitySchema = new Schema({
	title: String,
	description: String,
	address: { city: { type:String, Default:"London" }, 
			   province:{ type:String, Default:"Ontario" },
			   firstLine: String },
	Events: [EventSchema]
});


module.exports.Activity = mongoose.model('Activity', ActivitySchema);
module.exports.Event = mongoose.model('Event', EventSchema);
