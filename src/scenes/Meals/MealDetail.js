import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaAppleAlt, FaCarrot, FaWeight } from 'react-icons/fa';
import { GiHeavyCollar, GiStrong, GiWrappedSweet } from "react-icons/gi";
import { useParams } from 'react-router-dom';

const MealDetail = ({setSelectedPage}) => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        const fetchMeal = async () => {
            const response = await fetch(`http://localhost:5000/api/meals/${id}`); // Fetch individual meal
            const data = await response.json();
            setMeal(data);
        };
        fetchMeal();
    }, [id]);

    if (!meal) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onViewportEnter={() => {setSelectedPage('Meals')}}
            className="meal-detail min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="basis-4/6 mx-auto mt-16 flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:w-1/2">
                    <img src={meal.image} alt={meal.title} className=" object-cover" />
                </div>
                <div className="md:w-1/2 p-6">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">{meal.title}</h2>
                    <p className="text-gray-600 mb-4">{meal.description}</p>

                    <div className="flex flex-wrap mb-4">
                        {meal.tags && meal.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center mb-4">
                        <FaWeight className="text-gray-500 mr-2" />
                        <span className="text-gray-700">Calories: {meal.nutrition.calories}</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaAppleAlt className="text-green-500 mr-2" />
                        <span className="text-gray-700">Carbohydrates: {meal.nutrition.carbohydrates}g</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaCarrot className="text-green-500 mr-2" />
                        <span className="text-gray-700">Protein: {meal.nutrition.protein}g</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <GiHeavyCollar className="text-gray-500 mr-2" />
                        <span className="text-gray-700">Fat: {meal.nutrition.fat }g</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <GiStrong className="text-gray-500 mr-2" />
                        <span className="text-gray-700">Fiber : {meal.nutrition.fiber }g</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <GiWrappedSweet className="text-gray-500 mr-2" />
                        <span className="text-gray-700">Sugar: {meal.nutrition.sugar }g</span>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default MealDetail;