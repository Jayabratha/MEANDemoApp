module.exports = function(app, upload, fs) {
	var express = require('express');
	var path = require('path');
	var mongoDAO = require('./dao/mongodao');

	app.post('/register', function(req, res, next) {
		console.log('Form Data Received for: ' + req.body.username);
		mongoDAO.insertUser(res, req.body.username, req.body.sex, req.body.dob, req.body.addr, req.body.role, req.body.exp, req.body.email, req.body.password);
	})

	app.post('/auth', function(req, res, next) {
		console.log('Authenticating User');
		mongoDAO.authUser(res, req.body.email, req.body.password);
	})

	app.get('/profile', function(req, res, next) {
		if (req.cookies.user) {
			var username = req.cookies.user;
			var password = new Buffer(req.cookies.token, 'base64').toString().replace(username, '');
			console.log("Profile Request for " + username + " received");
			mongoDAO.getUser(res, username, password);
		} else {
			console.log("No user logged in");
			res.send("Profile Info Not Found");
		}
	})

	//Add Photos
	app.post('/photoupload', upload.single('photo'), function(req, res, next) {
		var newFileName = req.file.originalname;
		console.log(req.file.originalname);
		console.log(newFileName);
		res.send(newFileName);
	})

	//Remove Photo
	app.get('/removephoto', function(req, res, next) {
		var username = req.query.username,
			filename = req.query.filename;
		fs.unlink(path.join('public/images/userimages/', username, filename), function(err, files) {
			res.status(204).end();
		})
	})

	//Get Uploaded Photos
	app.get('/photos', function(req, res, next) {
		var userFolderName = req.query.username.split(' ')[0];
		fs.readdir(path.join('public/images/userimages/', userFolderName), function(err, files) {
			var i, sortedFiles = [],
				fileStats, fileStatArray = [],
				filesLength;
			if (files) {
				console.log(files);
				filesLength = files.length;
				//Sort files based on creation/change time 
				for (i = 0; i < filesLength; i++) {
					fileStats = fs.statSync('public/images/userimages/' + userFolderName + '/' + files[i]);
					fileStatArray.push({
						filename: files[i],
						ctime: fileStats.ctime
					});
				}
				res.send(files);
			} else {
				res.send('No Files Uploaded');
			}
		});
	});
};