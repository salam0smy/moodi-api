var DB_URL = "mongodb://admin:OneTech3@ds061268.mongolab.com:61268/moodidb";

var restify = require('restify');
var mongoose = require('mongoose');

// connect to the database
var db = mongoose.connect(DB_URL);

//attach lister to connected event
mongoose.connection.once('connected', function() {
	console.log("Connected to database");
});

var server = restify.createServer();
 
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(8081, function () {
    console.log("Server started @ 8081");
});