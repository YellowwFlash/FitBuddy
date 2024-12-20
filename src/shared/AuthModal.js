import React, { useState } from 'react';

const AuthModal = ({ mode, onClose, onLogin, onSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'signin') {
            onLogin(email, password);
        } else {
            onSignUp(email, password);
        }
    };

    return (
        <div className="modal">
            <h2>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">
                    {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default AuthModal;