const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    date: String,
    volume: String,
    volumeInKg: String,
    changeFromLast: String,
    changeFromLastInKg: String,
    storingUnit: String,
    storingUnitMaxWeight: String,
    location: String,
    action: String
});

module.exports = mongoose.model("History", historySchema);