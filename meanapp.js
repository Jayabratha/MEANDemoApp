var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
// for parsing multipart/form-data
var multer = require('multer');
var mongoose = require('mongoose');
var passport = require('passport');

//Connect to MongoDB
mongoose.connect('mongodb://jaydb:mongomeandb@ds051833.mongolab.com:51833/meandb');
//mongoose.connect('mongodb://localhost:27017/meanDB');

var db = mongoose.connection;

db.on('error', function() {
	console.error("Ops! Connection Failed")});
db.once('open', function() {
	console.log("Yo! Connection established");
});

process.on('SIGINT', function() {
  	db.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/deploy/images/userimages/')
	},
	filename: function(req, file, cb) {
		var userFolderName = req.body.username.split(' ')[0];
		fs.mkdir(path.join('public/deploy/images/userimages/', userFolderName), function() {
			cb(null, path.join(userFolderName, file.originalname));
		});
	}
});

var upload = multer({
	storage: storage
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Configure Passport
require('./config/passport')(passport);

//Public Views Mapping
app.use('/', express.static(path.join(__dirname, 'public/deploy')));

//Configure Routes
require('./app/routes.js')(app, upload, fs);

//Set Environment Port
app.set('port', process.env.PORT || 3000);

/*Create Server and Listen on 1337*/
var server = app.listen(app.get('port'), function() {
	console.log('Server started on port' + server.address().port);
});