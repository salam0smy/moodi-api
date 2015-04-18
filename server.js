'use strict'

var DB_URL = "mongodb://user:pass@ds061268.mongolab.com:61268/moodidb",
	DB_LOCAL_URL = 'mongodb://127.0.0.1:27017/develmoodidb';

var restify = require('restify'),
	mongoose = require('mongoose');

// connect to the database
var db = mongoose.connect(DB_LOCAL_URL);

//attach lister to connected event
mongoose.connection.once('connected', function() {
	console.log("Connected to database");
});


var server = restify.createServer({
	name: 'Moodi-RESTAPI',
    version: '0.0.2'
});
 
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());


server.pre(function (request, response, next) {
    request.log.info({ req: request }, 'REQUEST');
    next();
});
// Setup routes
require('./routes.js').set(server);

var port = (process.env.NODE_ENV == 'production') ? process.env.PORT : 8081;
server.listen(port, function () {
    console.log("Server started @ "+ port);
});
