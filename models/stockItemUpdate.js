const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
    volume: String,
    storingUnit: String,
    location: String
});



module.exports = mongoose.model('StockTake', stockItemSchema);