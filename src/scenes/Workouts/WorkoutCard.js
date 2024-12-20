import { motion } from 'framer-motion';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WorkoutCard = ({ workout, setSelectedPage }) => {
    const MAX_DESCRIPTION_WORDS = 50;

    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > MAX_DESCRIPTION_WORDS) {
            return words.slice(0, MAX_DESCRIPTION_WORDS).join(' ') + '...';
        }
        return description;
    };

    return (
        <motion.div className="border rounded-lg p-4"
            onViewportEnter={() => { setSelectedPage('Workouts') }}>
            <h3 className="text-xl font-semibold">{workout.title}</h3>
            <p className="text-gray-700 mt-2">{truncateDescription(workout.description)}</p>
            <Link to={`/workouts/${workout._id}`} className=" hover:underline transition duration-500 flex items-center mt-2 text-blue-500" >
                <FaEye className="mr-1" />
                View More
            </Link>
        </motion.div>
    );
};

export default WorkoutCard;