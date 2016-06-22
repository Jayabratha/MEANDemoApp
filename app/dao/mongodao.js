var User = require('../model/user_model');
var Expense = require('../model/expense_model');
var Mess = require('../model/mess_model');

var jwt = require('jwt-simple');

exports.insertUser = function(res, username, firstname, lastname, phone, sex, dob, address, exp, email, password) {
	console.log("Request Received in insert User");
	var user = new User({
		username: username,
		firstname: firstname,
		lastname: lastname,
		phone: phone,
		sex: sex,
		dob: dob,
		address: address,
		exp: exp,
		email: email,
		password: password,
		group: "Jyoti Tower",
		admin: false
	});

	console.log(user);

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
	}, {
		"password": false
	}, function(err, user) {
		if (err) {
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
};

exports.addExpense = function(res, amount, type, date, comment, user, group) {
	console.log("Amount " + amount);
	var expense = new Expense({
		amount: amount,
		type: type,
		date: date,
		comment: comment,
		user: user,
		group: group
	});

	expense.save(function(err) {
		if (err) {
			console.log(err);
			res.send({
				success: false,
				message: "Sorry! We couldn't create your profile. Please try later"
			});
		} else {
			res.send({
				success: true,
				message: "Expense Data succesfully saved"
			});
		}
	})
}

exports.getExpenses = function(res, username) {
	console.log(username);
	Expense.find({
		"user": username
	}, function(err, expenses) {
		if (err) {
			res.send({
				success: false,
				message: "We ran into an Error, Please try later"
			});
		}
		if (!expenses) {
			return res.status(403).send({
				success: false,
				msg: 'Authentication failed. User not found.'
			});
		} else {
			res.json({
				success: true,
				msg: 'Expense Data retrieved succesfully',
				expenses: expenses
			});
		}
	});
};

exports.getGroupMembers = function(res, group) {
	User.find({
		group: group
	},{
		"username": true,
		"firstname": true,
		"lastname": true,
		"admin": true,
		"dpLink": true
	}, function(err, members) {
		if (err) {
			res.send({
				success: false,
				message: "We ran into an Error, Please try later"
			});
		}
		if (!members) {
			return res.status(403).send({
				success: false,
				msg: 'Authentication failed. Group not found.'
			});
		} else {
			res.json({
				success: true,
				msg: 'Group Members retrieved succesfully',
				members: members
			});
		}
	});
};

exports.getGroupExpenses = function(res, group) {
	Expense.aggregate([
		{ $match: {
            "group": group
        }},
        {$group : {
        	_id : "$user",
        	expense : {$sum : "$amount"}
        }}
        ], function (err, result) {
			if (err) {
				res.send({
					success: false,
					message: "We ran into an Error, Please try later"
				});
			}
			if (!result) {
				return res.status(403).send({
					success: false,
					msg: 'Authentication failed. Group not found.'
				});
			} else {
				res.json({
					success: true,
					msg: 'Group Expenses retrived successfully',
					result: result
				});
			}
	});
}

exports.setCharges = function(res, group, rentals) {
	Mess.update({"name" : group},
	 {"rentals" : rentals},
	 {upsert: true}, function (err) {
	 		if (err) {
				res.send({
					success: false,
					message: "We ran into an Error, Please try later"
				});
			} else {
				res.json({
					success: true,
					msg: 'Rentals updated'
				});
			}
	 });
}