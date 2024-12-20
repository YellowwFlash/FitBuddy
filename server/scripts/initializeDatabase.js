const mongoose = require('mongoose');
const Workout = require('../models/Workout');
const Meal = require('../models/Meal');
const fetch = require('node-fetch');

mongoose.connect('mongodb://localhost:27017/testing1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const muscleGroups = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps'
];

const initializeDatabase = async () => {
    try {
        // Clear existing data
        await Workout.deleteMany({})
            .then(() => {
                console.log('successfully deleted workouts');
            });

        await Meal.deleteMany({})
            .then(() => {
                console.log('successfully deleted meals');
            });

        // Fetch exercises based on muscle group
        for (let muscle of muscleGroups) {
            const exerciseResponse = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
                headers: {
                    'X-Api-Key': 'OTpYKAIlGrjkv79DTAEzsw==Ok6GaLIOsi8tQ7F2' // Replace with your actual API key
                }
            });

            if (!exerciseResponse.ok) {
                throw new Error(`Error fetching exercises: ${exerciseResponse.status} ${exerciseResponse.statusText}`);
            }

            const exerciseData = await exerciseResponse.json();


            const workouts = exerciseData.map(exercise => ({
                title: exercise.name,
                description: exercise.instructions || 'No description available',
                muscles: exercise.muscle || 'No muscles listed',
                difficulty: exercise.difficulty || 'Unknown',
                equipment: exercise.equipment,
            }));

            await Workout.insertMany(workouts);
            console.log('Exercises fetched and stored successfully!');
        }

        // Fetch meals (keeping your previous meal fetching logic)
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b90edead13msh575c75a0e526bdcp1a664cjsn4bf468501db1',
                'x-rapidapi-host': 'tasty.p.rapidapi.com'
            }
        };

        const mealResponse = await fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options);
        const mealData = await mealResponse.json();

        const meals = mealData.results.map(meal => ({
            title: meal.name,
            description: meal.description || 'No description available',
            image: meal.thumbnail_url,
            tags: meal.tags.map(tag => tag.name),
            nutrition: meal.nutrition
        }));

        await Meal.insertMany(meals);
        console.log('Meals fetched and stored successfully!');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        mongoose.connection.close();
    }
};

initializeDatabase();