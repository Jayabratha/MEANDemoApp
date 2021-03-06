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
	});

	//Authenticate User
	app.post('/auth', function(req, res, next) {
		console.log('Authenticating User');
		mongoDAO.authenticate(res, req.body.email, req.body.password);
	});

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
	});

	//Update Profile Info
	app.post('/updateprofile', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var token = getToken(req.headers);
		console.log(req.body);
		if (token) {
			var decoded = jwt.decode(token, 'secret');
			mongoDAO.updateProfile(res, decoded.username, req.body.firstname, req.body.lastname, req.body.phone, req.body.sex, req.body.dob, req.body.address, req.body.exp);
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	});

	//Delete User Account
	app.delete('/deleteprofile', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		console.log("Test");
		var token = getToken(req.headers);
		if (token) {
			var decoded = jwt.decode(token, 'secret');
			mongoDAO.deleteProfile(res, decoded.username, req.query.userToDelete);
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	});

	//Add Photos
	app.post('/photoupload', upload.single('photo'), passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var token = getToken(req.headers), newFilePath;
		if (token) {
			var decoded = jwt.decode(token, 'secret'),
				newFilePath = '../images/userimages/' + decoded.username + '/' + req.file.originalname;
			console.log(decoded);
			mongoDAO.updateDpLink(res, newFilePath, decoded.username);
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	});

	//Remove Photo
	app.get('/removephoto', function(req, res) {
		var username = req.query.username,
			filename = req.query.filename;
		fs.unlink(path.join('public/images/userimages/', username, filename), function(err, files) {
			res.status(204).end();
		})
	});

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
			var month = req.query.month;
			var year = req.query.year;
			console.log('Getting Expenses for ' + user);
			mongoDAO.getExpenses(res, user, month, year);
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	});

	//Get Group Info
	app.get('/getgroup', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var token = getToken(req.headers);
		if (token) {
			var decoded = jwt.decode(token, 'secret');
			var group = req.query.group;
			console.log('Getting Group info for ' + group);
			mongoDAO.getGroupMembers(res, group);
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	});

	//Get Group Expenses
	app.get('/getgroupexpenses', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var token = getToken(req.headers);
		if (token) {
			var decoded = jwt.decode(token, 'secret');
			var group = req.query.group;
			console.log('Getting Group Expense info for ' + group);
			mongoDAO.getGroupExpenses(res, group);
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	});

	//Get Rentals
	app.get('/getrentals', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var token = getToken(req.headers);
		if (token) {
			var decoded = jwt.decode(token, 'secret');
			var group = req.query.group;
			console.log('Getting Rentals info for ' + group);
			mongoDAO.getGroupRentals(res, group);
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	});

	//Save Rentals
	app.post('/saverentals', passport.authenticate('jwt', {
		session: false
	}), function(req, res) {
		var token = getToken(req.headers);
		if (token) {
			var decoded = jwt.decode(token, 'secret');
			var group = req.body.group;
			var rentals = req.body.rentals;
			console.log('Setting Rentals info for ' + group);
			console.log(rentals);
			mongoDAO.saveAndUpdateRentals(res, group, rentals);
		} else {
			return res.status(403).send({
				success: false,
				msg: 'No token provided.'
			});
		}
	});

};