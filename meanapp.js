var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var mongoDAO = require('./dao/mongodao');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(multer()); // for parsing multipart/form-data


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

/*Create Server and Listen on 1337*/
var server = app.listen(1337, function() {
  console.log('Server started on port 1337');
});

