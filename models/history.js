const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    date: String,
    volume: String,
    changeFromLast: String,
    storingUnit: String,
    location: String,
    action: String
});

module.exports = mongoose.model("History", historySchema);