const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    measureID: String,
    action: String,
    date: String,
    volume: String,
    storingUnit: String,
    location: String,
    action: String
});

module.exports = mongoose.model("History", historySchema);