import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MealCard from './MealCard'; // Component for individual meal cards
import { GiMeal } from "react-icons/gi";

const Meals = ({ setSelectedPage }) => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/meals');
                if (!response.ok) throw new Error('Network response was invalid')
                const data = await response.json();
                setMeals(data);
            } catch (error) {
                console.log('Error fetching meals : ', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMeals();
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="meals min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        >
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                className="max-w-7xl mx-auto"
            >
                <h2 className="text-4xl mt-14 font-extrabold text-gray-900 mb-8 flex items-center justify-center">
                    <GiMeal className='mr-3' ></GiMeal>Healthy Meals
                </h2>
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
                            {meals.map(meal => (
                                <motion.div
                                    key={meal._id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-gray-20 rounded-lg  p-4 transition-transform transform hover:scale-105"
                                >
                                    <MealCard meal={meal} setSelectedPage={setSelectedPage} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
                {!isLoading && meals.length === 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-500 text-xl mt-12"
                    >
                        No meals found. Please try again.
                    </motion.p>
                )}
            </motion.div>
        </motion.section>
    );
};

export default Meals;