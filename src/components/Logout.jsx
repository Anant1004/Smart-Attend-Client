import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Logout = () => {
    const navigate = useNavigate(); 

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
            toast.success(response.data.message || 'Logged out successfully!');
            navigate('/'); 
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to logout.');
            } else {
                toast.error('Error occurred during logout. Please try again.');
            }
        }
    };

    return (
        <div>
            {isAuthenticated() ? (
                <button onClick={handleLogout} className='ml-3'>Logout</button>
            ) : (
                <Link to="/login" className='md:text-lg font-medium md:relative md:top-2 hover:bg-gray-700 px-3 py-2 rounded-md'>Login</Link>
            )}
        </div>
    );
};

export default Logout;
