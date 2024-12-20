import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import fitnessImage from '../../assets/fitness-image (2).jpg';
import FlashMessage from '../../shared/FlashMessage';

const SigninForm = ({ loginCheck }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flashMessage, setFlashMessage] = useState({ message: '', type: '' });
    const { isLoggedIn, setIsLoggedIn } = loginCheck;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the user is already logged in
        if (isLoggedIn) {
            setFlashMessage({ message: 'You are already logged in', type: 'success' });
            setTimeout(() => {
                navigate('/');
            }, 1000);
            return;
        }

        // Check if fields are empty
        if (!email || !password) {
            setFlashMessage({ message: 'Fields cannot be empty', type: 'error' });
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Invalid credentials');
            }

            setFlashMessage({ message: 'Sign in successful!', type: 'success' });
            setIsLoggedIn(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            setFlashMessage({ message: error.message || 'An error occurred!', type: 'error' });
            setEmail('');
            setPassword('');
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-10 w-full max-w-4xl flex flex-col md:flex-row"
            >
                <div className="md:w-1/2 mb-4 md:mb-0">
                    <img src={fitnessImage} alt="Fitness" className="rounded-lg shadow-lg object-cover h-full" />
                </div>

                <div className="md:w-1/2 md:ml-6 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-5 text-center">Sign In</h2>
                    <p className='text-center mb-7 text-xl'>Get back to your beast mode!!</p>

                    {flashMessage.message && (
                        <FlashMessage
                            message={flashMessage.message}
                            type={flashMessage.type}
                            onClose={() => setFlashMessage({ message: '', type: '' })}
                        />
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Email</label>
                            <div className="flex items-center border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 hover:shadow-lg">
                                <FaEnvelope className="text-gray-500 mr-2" />
                                <input
                                    type="email"
                                    placeholder="example@example.com"
                                    className="w-full focus:outline-none transition duration-200 p-2 rounded-md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Password</label>
                            <div className="flex items-center border border-gray-300 rounded-md p-2 transition duration-300 hover:shadow-lg">
                                <FaLock className="text-gray-500 mr-2" />
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="w-full focus:outline-none transition duration-200 p-2 rounded-md"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105 shadow-md">
                            Sign In
                        </button>

                        <p className="mt-4 text-center text-gray-600">
                            Don't have an account?
                            <span
                                onClick={handleSignUpClick}
                                className="text-blue-600 cursor-pointer hover:underline font-semibold ml-1"
                            >
                                Sign Up
                            </span>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SigninForm;
