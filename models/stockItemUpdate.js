const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
    dateCreated: String,
    countMethod: String,
    volumeType: String,
    volume: String,
    volumeInKg: String,
    volumeInUnit: String,
    storingUnit: { type: String, required: [true, "Where did you plan to store it... on the floor? You need to select a container first you silly goose :D"] },
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