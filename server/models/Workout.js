const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    muscles: { type: String },
    difficulty: { type: String },
    equipment: { type: String }

});

module.exports = mongoose.model('Workout', workoutSchema);