module.exports = function(app, upload, fs) {
	var express = require('express');
	var path = require('path');
	var mongoDAO = require('./dao/mongodao');
	var passport = require('passport');
	var jwt = require('jwt-simple');

	var getToken = function(headers) {
		if (headers && headers.authorization) {
			var parted = headers.authorization.split(' ');
			if (parted.length === 2) {
				return parted[1];
			} else {
				return null;
			}
		} else {
			return null;
		}
	};

	//Register New User
	app.post('/register', function(req, res, next) {
		console.log('Form Data Received for: ' + req.body.username);
		mongoDAO.insertUser(res, req.body.username, req.body.firstname, req.body.lastname, req.body.phone, req.body.sex, req.body.dob, req.body.addr, req.body.exp, req.body.email, req.body.password);
	})

	//Authenticate User
	app.post('/auth', function(req, res, next) {
		console.log('Authenticating User');
		mongoDAO.authenticate(res, req.body.email, req.body.password);
	})

	//Get Profile Information
	app.get('/profile', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var token = getToken(req.headers);
		if (token) {
			var decoded = jwt.decode(token, 'secret');
			console.log(decoded);
			mongoDAO.getUser(res, decoded.username);
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	})

	//Add Photos
	app.post('/photoupload', upload.single('photo'), function(req, res) {
		var newFileName = req.file.originalname;
		console.log(req.file.originalname);
		console.log(newFileName);
		res.send(newFileName);
	})

	//Remove Photo
	app.get('/removephoto', function(req, res) {
		var username = req.query.username,
			filename = req.query.filename;
		fs.unlink(path.join('public/images/userimages/', username, filename), function(err, files) {
			res.status(204).end();
		})
	})

	//Get Uploaded Photos
	app.get('/photos', function(req, res) {
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

	//Add Expense
	app.post('/addexpense', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var token = getToken(req.headers);
		if (token) {
			var decoded = jwt.decode(token, 'secret');
			console.log('Adding New Expense')
			if (decoded.username === req.body.user) {
				mongoDAO.addExpense(res, req.body.amount, req.body.type, req.body.date, req.body.comment,
					req.body.user, req.body.group);
			} else {
				return res.status(401).send({
					success: false,
					msg: 'You are not authorized to perform this action'
				});
			}
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	});

	//Get Expenses
	app.get('/getexpenses', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var token = getToken(req.headers);
		if (token) {
			var decoded = jwt.decode(token, 'secret');
			var user = req.query.username;
			console.log('Getting Expenses for ' + user);
			mongoDAO.getExpenses(res, user);
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	})
};