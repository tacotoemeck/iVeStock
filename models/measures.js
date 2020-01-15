const mongoose = require("mongoose");

const measureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: String, required: true }
});

module.exports = mongoose.model("Measure", measureSchema);