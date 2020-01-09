const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	name: String,
	icon: String,
	category: String,
	amount: String,
	description: String,
	measures: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Measure"
		}
	],
	stockTake: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "StockTake"
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