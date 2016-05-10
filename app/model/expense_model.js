var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

var ExpenseSchema = new Schema({
	amount: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	comment: String,
	user: {
		type: String,
		required: true
	},
	group: String
});

var Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;
