const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
	name: { type: String, required: [true, "It needs to be names silly!"] },
	icon: String,
	category: { type: String, required: [true, "Choose a category first!"] },
	volumeType: { type: String, required: [true, "Please answer - How do you measure this item?"] },
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