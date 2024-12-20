const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String },
    tags: { type: [String] },
    nutrition: { type: { String: Number } },
});

module.exports = mongoose.model('Meal', mealSchema);