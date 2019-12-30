const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	name: String,
	category: String,
	amount: String,
	description: String,
	measures: [
		{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Measure"
	}
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
});



module.exports = mongoose.model('Stock', stockSchema);