var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
	title: String,
	attending: Number,
	desc: String,
	address: { 
		name: { type: String},
		city: { type: String}, 
		province:{ type: String},
		street: { type: String} },
	date: Date,
	images: [{ data: Buffer, contentType: String }],
	status: String,
	moods: [Schema.ObjectId]
});

module.exports = mongoose.model('Event', EventSchema);
