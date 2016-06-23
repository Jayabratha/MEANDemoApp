var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RentalSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	group: {
		type: String,
		required: true
	}
});

var Rental = mongoose.model('Rental', RentalSchema);

module.exports = Rental;