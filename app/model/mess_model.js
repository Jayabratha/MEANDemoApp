var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	rentals: []
});

var Mess = mongoose.model('Mess', MessSchema);

module.exports = Mess;