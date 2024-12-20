const express = require('express');
const Meal = require('../models/Meal');
const router = express.Router();

// GET all meals
router.get('/', async (req, res) => {
    try {
        const meals = await Meal.find();
        res.json(meals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET individual meal
router.get('/:id', async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        
        if (!meal) return res.status(404).send('Meal not found');
        res.json(meal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add more routes for POST, PUT, DELETE as needed

module.exports = router;