const express = require('express');
const Workout = require('../models/Workout');
const router = express.Router();

// GET all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find();
        
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET individual workout
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).send('Workout not found');
        res.json(workout);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add more routes for POST, PUT, DELETE as needed

module.exports = router;