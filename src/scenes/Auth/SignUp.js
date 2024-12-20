import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import FlashMessage from '../../shared/FlashMessage';

const SignupForm = ({ loginCheck }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

        // Validate form fields
        if (!username || !email || !password || !confirmPassword) {
            setFlashMessage({ message: 'Fields cannot be empty', type: 'error' });
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setFlashMessage({ message: 'Passwords do not match! Please enter passwords correctly', type: 'error' });
            setPassword('');
            setConfirmPassword('');
            return;
        }

        // Proceed with form submission
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed');
            } else {
                setFlashMessage({ message: 'Successfully signed up!', type: 'success' });
                setIsLoggedIn(true); // Update login status
                setTimeout(() => {
                    navigate('/'); // Navigate to the home page
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setFlashMessage({ message: error.message, type: 'error' });
        }
    };

    const handleSignInClick = () => {
        navigate('/signin');
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Sign Up
                    </h2>

                    {flashMessage.message && (
                        <FlashMessage
                            message={flashMessage.message}
                            type={flashMessage.type}
                            onClose={() => setFlashMessage({ message: '', type: '' })}
                        />
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <div className="flex items-center border border-gray-300 rounded-md p-2 transition duration-300 focus-within:border-blue-500">
                                <FaUser className="text-gray-500 mr-2" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full focus:outline-none"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <div className="flex items-center border border-gray-300 rounded-md p-2 transition duration-300 focus-within:border-blue-500">
                                <FaEnvelope className="text-gray-500 mr-2" />
                                <input
                                    type="email"
                                    placeholder="example@example.com"
                                    className="w-full focus:outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <div className="flex items-center border border-gray-300 rounded-md p-2 transition duration-300 focus-within:border-blue-500">
                                <FaLock className="text-gray-500 mr-2" />
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="w-full focus:outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Confirm Password</label>
                            <div className="flex items-center border border-gray-300 rounded-md p-2 transition duration-300 focus-within:border-blue-500">
                                <FaLock className="text-gray-500 mr-2" />
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="w-full focus:outline-none"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                        >
                            Sign Up
                        </button>

                        <p className="mt-4 text-center text-gray-600">
                            Already have an account?
                            <span
                                onClick={handleSignInClick}
                                className="text-blue-500 cursor-pointer hover:underline ml-1"
                            >
                                Login
                            </span>
                        </p>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default SignupForm;
