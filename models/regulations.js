const mongoose = require("mongoose");

var regulationSchema = new mongoose.Schema({
    section: String,
    order: Number,
    content: String,
    color: String,
});
var RegulationSchema = mongoose.model('dictionary', regulationSchema);

module.exports = RegulationSchema;