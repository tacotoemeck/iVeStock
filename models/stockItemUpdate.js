const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
    volume: String,
    storingUnit: String,
    location: String,
    action: String,
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "History"
        }
    ]
});



module.exports = mongoose.model('StockTake', stockItemSchema);