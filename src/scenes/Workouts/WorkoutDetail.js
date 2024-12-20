import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDumbbell, FaLevelUpAlt, FaYoutube, FaWeight } from 'react-icons/fa';

const WorkoutDetail = ({setSelectedPage}) => {
    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');



    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/workouts/${id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setWorkout(data);
                await fetchVideos(data.title);
            } catch (error) {
                setError('Error fetching workout details');
                console.error(error);
            }
        };
        fetchWorkout();
    }, [id]);

    const fetchVideos = async (exerciseName) => {
        const apiKey = 'AIzaSyDEFr_CO1yibixn1hAqoqYPxB5bHuFEhnM';
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(exerciseName)}&key=${apiKey}`);
            if (!response.ok) throw new Error('Failed to fetch videos');
            const data = await response.json();
            setVideos(data.items);
        } catch (error) {
            setError('Error fetching videos');
            console.error(error);
        }
    };

    if (error) return <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-center text-xl mt-10 px-4">{error}</motion.p>;
    if (!workout) return <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xl mt-10 px-4">Loading...</motion.p>;

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onViewportEnter={() => { setSelectedPage('Workouts') }}
            className="mx-auto min-h-full w-full px-4 sm:w-11/12 md:w-5/6 py-10 sm:py-20"
        >
            <motion.h2
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                className="text-3xl sm:text-4xl font-bold mt-6 sm:mt-10 mb-4 sm:mb-6 text-primary-600"
            >
                {workout.title}
            </motion.h2>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-6 sm:mb-8"
            >
                <p className="text-base sm:text-lg mb-4">{workout.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-0">
                    <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
                        <FaDumbbell className="text-primary-500 mr-2" />
                        <p className="font-semibold">Muscles: <span className="font-normal">{workout.muscles}</span></p>
                    </div>
                    <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
                        <FaLevelUpAlt className="text-primary-500 mr-2" />
                        <p className="font-semibold">Difficulty: <span className="font-normal">{workout.difficulty}</span></p>
                    </div>
                    <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
                        <FaWeight className="text-primary-500 mr-2" />
                        <p className="font-semibold">Equipment: <span className="font-normal">{workout.equipment}</span></p>
                    </div>
                </div>
            </motion.div>

            <motion.h3
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-10 mb-4 sm:mb-6 text-primary-600"
            >
                Related Videos
            </motion.h3>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
                {videos.length > 0 ? (
                    videos.map((video, index) => (
                        <motion.div
                            key={video.id.videoId}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
                        >
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={video.snippet.thumbnails.high.url}
                                    alt={video.snippet.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h4 className="text-base sm:text-lg font-bold mb-2 truncate">{video.snippet.title}</h4>
                                <p className="text-gray-500 text-xs sm:text-sm mb-4 h-12 overflow-hidden">{video.snippet.description}</p>
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-red-700 transition duration-300 text-sm sm:text-base"
                                >
                                    <FaYoutube className="mr-2" />
                                    Watch Video
                                </a>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-base sm:text-lg">No videos available for this exercise.</p>
                )}
            </motion.div>
        </motion.section>
    );
};

export default WorkoutDetail;