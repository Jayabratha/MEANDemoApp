var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoDAO = require('./dao/mongodao');
var multer = require('multer'); // for parsing multipart/form-data
var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images/userimages/')
        },
        filename: function (req, file, cb) {
            var getFileExt = function(fileName){
                var fileExt = fileName.split(".");
                if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
                    return "";
                }
                return fileExt.pop();
            }
            fs.mkdir(path.join('public/images/userimages/', req.body.username), function(){
            	cb(null, path.join(req.body.username, Date.now() + '.' + getFileExt(file.originalname)));
            });
        }
    })
var upload = multer({ storage: storage });

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

//Add Photos
app.post('/photoupload', upload.array('photo'), function(req, res, next){
	 res.status(204).end();
})

//Remove Photo
app.get('/removephoto', function(req, res, next){
	var username = req.query.username,
		filename = req.query.filename;
	fs.unlink(path.join('public/images/userimages/', username, filename), function(err, files){
		res.send("Files Deleted Successfully");
	})

})

app.get('/photos', function(req, res, next){
	fs.readdir(path.join('public/images/userimages/', req.query.username), function(err, files){
		res.send(files);
	})
})

/*Create Server and Listen on 1337*/
var server = app.listen(1337, function() {
  console.log('Server started on port 1337');
});

