const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
    dateCreated: String,
    volume: String,
    volumeInKg: String,
    storingUnit: String,
    storingUnitMaxWeight: String,
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