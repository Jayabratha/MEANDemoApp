var User = require('../model/user_model');
var Expense = require('../model/expense_model');
var Rental = require('../model/rental_model');

var jwt = require('jwt-simple');

var insertUser = function(res, username, firstname, lastname, phone, sex, dob, address, exp, email, password) {
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

var authenticate = function(res, email, password) {
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

var updateProfile = function (res, username, firstname, lastname, phone, sex, dob, address, exp) {
	console.log(username + ',' + firstname + ',' + lastname + ',' + phone + ',' + sex + ',' + dob + ',' + address + ',' + exp)
	User.update({
		username: username
	}, {
		firstname: firstname,
		lastname: lastname,
		phone: phone,
		sex: sex,
		dob: dob,
		address: address,
		exp: exp
	}, function (err) {
		if (err) {
			res.send({
				success: false,
				message: "Failed to update profile info"
			});
		} else {
			res.send({
				success: true,
				message: "Successfully Updated Profile Information"
			});
		}
	})
};

var getUser = function(res, username) {
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

var deleteProfile = function (res, username, userToDelete) {
	var isAdmin = false;
	User.findOne({
		"username": username
	}, {
		"isAdmin": true
	}, function(err, user) {
		console.log("Test2");
		if (user && user.admin) {
			console.log("Test3");
			isAdmin = true;
		}
		console.log(username + ',' + userToDelete);
		if (isAdmin || (username === userToDelete)) {
			console.log("Test4");
			User.remove({
				username: userToDelete
			}, function (err) {
				console.log("Test5");
				if (err) {
					res.send({
						success: false,
						message: "Failed to delete profile"
					});
				} else {
					res.send({
						success: true,
						message: "Successfully Deleted Your Profile"
					});
				}
			})
		} else {
			res.send({
				success: false,
				message: "You are not authorized to delete this profile"
			});
		}
	});
};

var updateDpLink = function(res, dpLink, username) {
	User.update({
		username: username
	}, {
		dpLink: dpLink
	}, function (err) {
		if (err) {
			res.send({
				success: false,
				message: "Failed to update your display pic"
			});
		} else {
			res.send({
				success: true,
				message: "Successfully Updated Display pic"
			});
		}
	})
};

var addExpense = function(res, amount, type, date, comment, user, group) {
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
};

var getExpenses = function(res, username, month, year) {
	var startDate = new Date(year, month, 1);
	var endDate = new Date(year, month + 1, 0);
	console.log(username + month + year);
	Expense.find({
		"user": username,
		"date": {$gte: startDate, $lt: endDate}
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

var getGroupMembers = function(res, group) {
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

var getGroupExpenses = function(res, group, month, year) {
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
};

var getGroupRentals = function(res, group) {
	Rental.find({
		group: group
	}, function (err, rentals) {
		if (err) {
			res.send({
				success: false,
				message: "We ran into an Error, Please try later"
			});
		}
		if (!rentals) {
			return res.status(403).send({
				success: false,
				msg: 'Authentication failed. Group not found.'
			});
		} else {
			res.json({
				success: true,
				msg: 'Group Members retrieved succesfully',
				rentals: rentals
			});
		}
	})
};

var saveAndUpdateRentals = function(res, group, rentals) {
	var removalSuccessful = true; insertSuccessful = true;
	Rental.remove({"group": group}, function(err) {
		if(err) {
				removalSuccessful = false;
			}
	});

	if (removalSuccessful) {
		rentals.forEach(function (rentalObj, index) {
			var rental, rentalName, rentalAmount;
			rentalName = rentalObj.name;
			rentalAmount = rentalObj.amount;

			rental = new Rental({
				name: rentalName,
				amount: rentalAmount,
				group: group
			});

			rental.save(function(err) {
				if(err) {
					insertSuccessful = false;
				}
			});
		});

		if (insertSuccessful) {
			res.send({
				success: true,
				message: "We have succesfully saved your rentals"
			});
		} else {
			res.send({
				success: false,
				message: "Sorry! Failed to save your rentals"
			});
		}
	} else {
		res.send({
			success: false,
			message: "Sorry! Failed to save your rentals"
		});
	}	
};

module.exports = {
	insertUser: insertUser,
	authenticate: authenticate,
	updateProfile: updateProfile,
	deleteProfile: deleteProfile,
	getUser: getUser,
	updateDpLink: updateDpLink,
	addExpense: addExpense,
	getExpenses: getExpenses,
	getGroupMembers: getGroupMembers,
	getGroupExpenses: getGroupExpenses,
	getGroupRentals: getGroupRentals,
	saveAndUpdateRentals: saveAndUpdateRentals
}