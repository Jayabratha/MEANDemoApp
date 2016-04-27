var User = require('../model/usermodel');

exports.insertUser = function(res, username, sex, dob, address, role, salary, email, password) {
	var user = new User({
		username: username,
		sex: sex,
		dob: dob,
		address: address,
		role: {
			designer: role.designer,
			developer: role.developer
		},
		salary: salary,
		email: email,
		password: password,
	})

	user.save(function(err) {
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
			res.cookie('user', username);
			res.cookie('token', new Buffer(username + password).toString('base64'));
			res.send({
				success: true,
				message: "We have succesfully created your profile"
			});
		}
	})

}

exports.authUser = function(res, email, password) {
	console.log("Authentication Request rceived for: " + email);
	User.find({
		"email": email
	}, function(err, users) {
		if (err) {
			console.error("Couldn't find " + email + " in our DB");
			res.send({
				success: false,
				message: "Sorry! Couldn't find " + email + " in our DB"
			});
		} else {
			console.log(users.length + " User found");
			if (users.length > 0) {
				for (var user in users) {
					console.log("User found: " + users[user].username);
				}
				var firstuser = users[0];
				if (firstuser.password == password) {
					console.log(firstuser);
					res.cookie('user', firstuser.username);
					res.cookie('token', new Buffer(firstuser.username + firstuser.password).toString('base64'));
					res.send({
						success: true,
						message: "User found in DB"
					});
				} else {
					console.log("WRONG PASSWORD!");
					res.send({
						success: false,
						message: "Wrong Password! Please try again"
					});
				}
			} else {
				console.log("No User Found");
				res.send({
					success: false,
					message: "No user found. Please register first"
				});
			}

		}

	});

}

exports.getUser = function(res, username, password) {
	User.find({
		"username": username
	}, function(err, users) {
		if (err) {
			console.error("Couldn't find " + username + " in our DB");
			res.send({
				success: false,
				message: "Sorry! Couldn't find " + username + " in our DB"
			});
		} else {
			console.log(users.length + " User found");
			for (var user in users) {
				console.log("User found: " + users[user].username);
			}
			var firstuser = users[0];
			if (firstuser.password == password) {
				console.log(firstuser);
				res.send({
					success: true,
					message: "User found in DB",
					userObj: firstuser
				});
			} else {
				console.log("WRONG PASSWORD!");
				res.send({
					success: false,
					message: "Wrong Password! Please try again"
				});
			}

		}

	});

}