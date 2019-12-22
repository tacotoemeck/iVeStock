const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	name: String,
	measure: String,
	amount: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
});



module.exports = mongoose.model('Stock', stockSchema);