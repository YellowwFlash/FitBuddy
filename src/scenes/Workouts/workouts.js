import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaDumbbell, FaSearch } from 'react-icons/fa';
import WorkoutCard from './WorkoutCard';

const Workouts = ({ setSelectedPage }) => {
    const [workouts, setWorkouts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMuscleTerm, setMuscleSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/workouts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWorkouts(data);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWorkouts();
    }, []);

    const filteredWorkouts = workouts.filter(workout =>
        workout.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredMuscleWorkouts = workouts.filter(workout =>
        workout.muscles.toLowerCase().includes(searchMuscleTerm.toLowerCase())
    );

    let displayedWorkouts = [];

    if (searchTerm && searchMuscleTerm) {
        // If both search terms are filled, find common workouts
        displayedWorkouts = workouts.filter(workout =>
            workout.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            workout.muscles.toLowerCase().includes(searchMuscleTerm.toLowerCase())
        );
    } else if (searchTerm) {
        // If only the title search term is filled
        displayedWorkouts = filteredWorkouts;
    } else if (searchMuscleTerm) {
        // If only the muscle search term is filled
        displayedWorkouts = filteredMuscleWorkouts;
    } else {
        // If both search terms are empty, show all workouts
        displayedWorkouts = workouts;
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onViewportEnter={() => { setSelectedPage('Workouts') }}
            className="workouts mt-14 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        >
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                className="max-w-7xl mx-auto"
            >
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center justify-center">
                    <FaDumbbell className="mr-4 text-primary-500" />
                    Our Workouts
                </h2>
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search workouts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border-2 border-gray-300 bg-white h-12 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-primary-500 transition-colors duration-300"
                    />
                    <FaSearch className="absolute right-5 top-4 text-gray-400" />
                </div>
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search muscle based workouts"
                        value={searchMuscleTerm}
                        onChange={(e) => setMuscleSearchTerm(e.target.value)}
                        className="w-full border-2 border-gray-300 bg-white h-12 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-primary-500 transition-colors duration-300"
                    />
                    <FaSearch className="absolute right-5 top-4 text-gray-400" />
                </div>
                {isLoading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center items-center h-64"
                    >
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {displayedWorkouts.map(workout => (
                                <motion.div
                                    key={workout._id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
                                >
                                    <WorkoutCard workout={workout} setSelectedPage={setSelectedPage} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
                {!isLoading && displayedWorkouts.length === 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-500 text-xl mt-12"
                    >
                        No workouts found. Please try again.
                    </motion.p>
                )}
            </motion.div>
        </motion.section>
    );
};

export default Workouts;