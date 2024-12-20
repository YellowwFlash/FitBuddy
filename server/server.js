const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const workoutsRouter = require('./routes/workout');
const mealsRouter = require('./routes/meals');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/testing1');

app.use('/api/auth', authRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/meals', mealsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT);