var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var AdminAccountSchema = new Schema({
    nickname: String
});

AdminAccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('AdminAccount', AdminAccountSchema);