const mongoose = require("mongoose");

const measureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    volumeType: String,
    weight: String,
    volume: String

});

module.exports = mongoose.model("Measure", measureSchema);