'use strict'

var DB_URL = "mongodb://admin:OneTech3@ds061268.mongolab.com:61268/moodidb",
	DB_LOCAL_URL = 'mongodb://127.0.0.1:27017/develmoodidb';

var restify = require('restify');
var mongoose = require('mongoose');

// connect to the database
var db = mongoose.connect(DB_LOCAL_URL);

//attach lister to connected event
mongoose.connection.once('connected', function() {
	console.log("Connected to database");
});

var server = restify.createServer();
 
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

// Setup routes
require(__dirname + '/routes.js').set(server);

server.listen(8081, function () {
    console.log("Server started @ 8081");
});