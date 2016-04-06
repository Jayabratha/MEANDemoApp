var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoDAO = require('./dao/mongodao');
var multer = require('multer'); // for parsing multipart/form-data

/*var getNewFileName = function(originalFileName){
	var newFileName = "";
    var getFileExt = function(fileName){
	    var fileExt = fileName.split(".");
	    if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
	        return "";
	    }
	    return fileExt.pop();
    }
    var getFileFirstName = function(fileName){
        var fileFirstName = fileName.split(".");
        return fileFirstName[0];
    }
    return getFileFirstName(originalFileName) + '.' + getFileExt(originalFileName);
};*/

var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images/userimages/')
        },
        filename: function (req, file, cb) { 
        	var userFolderName = req.body.username.split(' ')[0];       	
            fs.mkdir(path.join('public/images/userimages/', userFolderName), function(){
            	cb(null, path.join(userFolderName, file.originalname));
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
	mongoDAO.insertUser(res, req.body.username, req.body.sex, req.body.dob, req.body.addr, req.body.role, req.body.exp, req.body.email, req.body.password );
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
app.post('/photoupload', upload.single('photo'), function(req, res, next){
	var newFileName = req.file.originalname;
	console.log(req.file.originalname);
	console.log(newFileName);
	res.send(newFileName);
})

//Remove Photo
app.get('/removephoto', function(req, res, next){
	var username = req.query.username,
		filename = req.query.filename;
	fs.unlink(path.join('public/images/userimages/', username, filename), function(err, files){
		res.status(204).end();
	})
})

//Get Uploaded Photos
app.get('/photos', function(req, res, next){
	var userFolderName = req.query.username.split(' ')[0];
	fs.readdir(path.join('public/images/userimages/', userFolderName), function(err, files){
		var i, sortedFiles=[], fileStats, fileStatArray=[], filesLength;
		if(files){
			console.log(files);
			filesLength = files.length;
			//Sort files based on creation/change time 
			for(i = 0; i<filesLength; i++){
				fileStats = fs.statSync('public/images/userimages/' + userFolderName + '/' + files[i]);
				fileStatArray.push({
		            filename: files[i],
		            ctime: fileStats.ctime
		        });
			}
			res.send(files);
		}
		else {
			res.send('No Files Uploaded');
		}		
	});
})

//Set Environment Port
app.set('port', process.env.PORT || 3000);

/*Create Server and Listen on 1337*/
var server = app.listen(app.get('port'), function() {
  console.log('Server started on port' + server.address().port);
});

