var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MoodSchema = new Schema({
	name: String,
	altName: String,
	status: String,
	image: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Mood', MoodSchema);
