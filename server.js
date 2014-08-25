'use strict'

var DB_URL = "mongodb://admin:OneTech3@ds061268.mongolab.com:61268/moodidb",
	DB_LOCAL_URL = 'mongodb://127.0.0.1:27017/develmoodidb';

var restify = require('restify'),
	mongoose = require('mongoose'),
	bunyan= require('bunyan'),
	log = bunyan.createLogger({
  				name: 'Moodi-RESTAPI',
  				level: process.env.LOG_LEVEL || 'info',
 				stream: process.stdout,
 				serializers: bunyan.stdSerializers
			});

// connect to the database
var db = mongoose.connect(DB_LOCAL_URL);

//attach lister to connected event
mongoose.connection.once('connected', function() {
	console.log("Connected to database");
});


var server = restify.createServer({
	name: 'Moodi-RESTAPI',
    version: '0.0.1',
    log: log
});
 
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

/*
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);*/



server.pre(function (request, response, next) {
    request.log.info({ req: request }, 'REQUEST');
    next();
});
// Setup routes
require('./routes.js').set(server);

server.listen(8081, function () {
    console.log("Server started @ 8081");
});