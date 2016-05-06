var User = require('../model/usermodel');

var jwt = require('jwt-simple');

exports.insertUser = function(res, username, sex, dob, address, salary, email, password) {
	console.log("Request Received in insert User");
	var user = new User({
		username: username,
		sex: sex,
		dob: dob,
		address: address,
		salary: salary,
		email: email,
		password: password,
	})

	user.save(function(err) {
		console.log("In Save");
		if (err) {
			console.error("Couldn't save data due to : " + err);
			var duperror = err.toString().indexOf("duplicate key error") != -1 ? true : false;
			if (duperror) {
				res.send({
					success: false,
					message: "Sorry! We already have a registered user with that username/email"
				});
			} else {
				res.send({
					success: false,
					message: "Sorry! We couldn't create your profile. Please try later"
				});
			}

		} else {
			console.log("Data saved succesfully for: " + username);
			res.send({
				success: true,
				message: "We have succesfully created your profile"
			});
		}
	})
};

exports.authenticate = function(res, email, password) {
	console.log("Authentication Request rceived for: " + email);
	User.findOne({
		"email": email
	}, function(err, user) {
		if (err) {
			console.error("Couldn't find " + email + " in our DB");
			res.send({
				success: false,
				message: "Sorry! We ran into an error. Please try later"
			});
		} else if (!user) {
			res.send({
				success: false,
				message: "Sorry! Couldn't find user"
			});
		} else {
			// check if password matches
			user.comparePassword(password, function(err, isMatch) {
				if (isMatch && !err) {
					// if user is found and password is right create a token
					var token = jwt.encode({
						username: user.username,
						email: user.email
					}, 'secret');
					// return the information including token as JSON
					res.json({
						success: true,
						token: token
					});
				} else {
					res.send({
						success: false,
						msg: 'Authentication failed. Wrong password.'
					});
				}
			});
		}
	});
};

exports.getUser = function(res, username) {
	User.findOne({
		"username": username
	}, function(err, user) {
		if (err) {
			console.error("Couldn't find " + username + " in our DB");
			res.send({
				success: false,
				message: "Sorry! Couldn't find " + username + " in our DB"
			});
		} 
		if (!user) {
			return res.status(403).send({
				success: false,
				msg: 'Authentication failed. User not found.'
			});
		} else {
			res.json({
				success: true,
				msg: 'Welcome in the member area ' + user.name + '!',
				userObj: user
			});
		}
	});

}