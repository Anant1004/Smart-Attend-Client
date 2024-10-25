import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Logout = () => {
    const [error, setError] = useState('');

    const isAuthenticated = () => {
        const cookies = document.cookie.split(';');
        const token = cookies.find(cookie => cookie.trim().startsWith('token='));
        return !!token;
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get(
                'http://localhost:4000/logout', 
                { withCredentials: true } 
            );
            console.log(response);
            console.log(response.data.message);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Error occurred during logout. Please try again.');
            }
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isAuthenticated() ? (
                <button onClick={handleLogout} className='ml-3'>Logout</button>
            ) : (
                <Link to="/login" className='ml-3'>Login</Link>
            )}
        </div>
    );
};

export default Logout;
