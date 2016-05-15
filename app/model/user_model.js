var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	firstname: String,
	lastname: String,
	phone: Number,
	sex: String,
	dob: Date,
	address: String,
	exp: Number,
	email: {
		type: String,
		required: true,
		unique: true
	},
	group: String,
	admin: Boolean,
	password: String,
	created_at: Date,
	updated_at: Date
});

// Perform these task before each save
UserSchema.pre('save', function(next) {
	var user = this,
		currentDate = new Date(),
		saltRounds = 10;

	// Update the create date and update date
	// Change the updated_at field to current date
	user.updated_at = currentDate;

	// If created_at doesn't exist, add to that field
	if (!user.created_at) {
		user.created_at = currentDate;
	}

	//Hash the Passwords before saving is the password is modified or the user is new
	if (user.isModified('password') || user.isNew) {
		//Generate Salt and Password Hash
		console.log("Generating Salt");
		bcrypt.genSalt(saltRounds, function(err, salt) {
			if (err) {
				console.log('Salt' + err);
				return next(err);
			}
			bcrypt.hash(user.password, salt, function(err, hash) {
				console.log("Generating Password Hash");
				if (err) {
					console.log('Hash' + err);
					return next(err);
				}
				console.log(hash);
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});


//Method to compare password hashes
UserSchema.methods.comparePassword = function(password, cb) {
	console.log(password + ', ' + this.password)
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) {
			console.log(err);
			return cb(err);
		}
		cb(null, isMatch);
	});
};

var User = mongoose.model('User', UserSchema);

module.exports = User;