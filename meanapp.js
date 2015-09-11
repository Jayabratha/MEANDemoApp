var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoDAO = require('./dao/mongodao');
var multer = require('multer'); // for parsing multipart/form-data
var upload = multer({dest: './public/images/userimages/'});
console.log(upload);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
app.use(cookieParser());


app.use('/', express.static(path.join(__dirname, 'public')));

app.post('/register', function(req, res, next){
	console.log('Form Data Received for: ' + req.body.username );
	mongoDAO.insertUser(res, req.body.username, req.body.sex, req.body.dob, req.body.addr, req.body.checkboxModel, req.body.salary, req.body.email, req.body.password );
})

app.post('/auth', function(req, res, next){
	console.log('Authenticating User');
	mongoDAO.authUser(res, req.body.email, req.body.password);
})

app.get('/profile', function(req, res, next){
	if(req.cookies.user){
		var username = req.cookies.user;
		var password = req.cookies.password;
		console.log("Profile Request for " + username + " received" );
		mongoDAO.getUser(res, username, password);
	}
	else {
		console.log("No user logged in");
		res.send("Profile Info Not Found");
	}
})

app.post('/photoupload', upload.array('photo'), function(req, res, next){
	 res.status(204).end();
})

/*Create Server and Listen on 1337*/
var server = app.listen(1337, function() {
  console.log('Server started on port 1337');
});

