var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/meanDB');

var db = mongoose.connection;

db.on('error', function() {
	console.error("Ops! Connection Failed")});
db.once('open', function() {
	console.log("Yo! Connection established");
});

process.on('SIGINT', function() {
  	db.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	sex: String,
	dob: Date,
	address: String,
	role: {
		designer: Boolean,
		developer: Boolean
	},
	salary: Number,
	email: { type: String, required: true, unique: true },
	password: String,
	created_at: Date,
	updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});



var User = mongoose.model('User', userSchema);

module.exports = User;

