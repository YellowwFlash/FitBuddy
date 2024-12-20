import { motion } from 'framer-motion';
import React from 'react';
import { FaCarrot, FaEye, FaUtensils, FaWeight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MealCard = ({ meal, setSelectedPage }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }} // Scale effect on hover
            transition={{ type: 'spring', stiffness: 300 }}
            onViewportEnter={() => { setSelectedPage('Meals') }}
            className="bg-white border rounded-lg shadow-md p-4 transition-transform duration-300"
        >
            <img src={meal.image} alt={meal.title} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-xl font-semibold text-gray-800 mt-2">{meal.title}</h3>
            <p className="text-gray-600 mt-1">{meal.description}</p>
            <div className="flex flex-wrap mt-2">
                {meal.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium mx-2 my-0.5 px-2.5 py-0.5 rounded">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="my-4 flex justify-between">
                <div className="flex items-center">
                    <FaCarrot className="text-green-500 mr-1" />
                    <span className="text-gray-600 text-sm">Healthy</span>
                </div>
                <div className="flex items-center">
                    <FaWeight className="text-gray-500 mr-1" />
                    <span className="text-gray-600 text-sm">Calories: {meal.nutrition.calories}</span>
                </div>
                <div className="flex items-center">
                    <FaUtensils className="text-gray-500 mr-1" />
                    <span className="text-gray-600 text-sm">Prep Time: {meal.prepTime || 'N/A'}</span>
                </div>
            </div>
            <Link to={`/meals/${meal._id}`} className=" hover:underline transition duration-500 flex items-center justify-center mt-4 text-primary-500">
                <FaEye className="mr-1" />
                View More
            </Link>
        </motion.div>
    );
};

export default MealCard;