var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	sex: String,
	dob: Date,
	address: String,
	role: {
		designer: Boolean,
		developer: Boolean
	},
	salary: Number,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: String,
	created_at: Date,
	updated_at: Date
});

// Perform these task before each save
userSchema.pre('save', function(next) {
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
		bcrypt.genSalt(saltRounds, function(err, salt) {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash;
			});
		});
	}
	next();
});



var User = mongoose.model('User', userSchema);

module.exports = User;