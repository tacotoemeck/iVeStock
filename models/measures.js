const mongoose = require("mongoose");
 
const measureSchema = new mongoose.Schema({
    name: String,
    weight: String
});
 
module.exports = mongoose.model("Measure", measureSchema);