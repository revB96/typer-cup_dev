const mongoose = require("mongoose");

var lastRoundStatsSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true},
    points: {type: Number, default: 0},
    tickets: {type: Number, default: 0},
    correctScore: {type: Number, default: 0},
    correctTeam: {type: Number, default: 0},
    defeat: {type: Number, default: 0},
    correctQuestions: {type: Number, default: 0},
    quizPoints: {type: Number, default: 0},
    active: {type: Boolean, default: true},
    updatedAt: Date
});
var LastRoundStats = mongoose.model('LastRoundStats', lastRoundStatsSchema);

module.exports = LastRoundStats;