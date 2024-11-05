import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL;

const AuthButton = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axios.get(`${apiUrl}/loggedIn`, { withCredentials: true });
                setIsLoggedIn(response.data.isLoggedIn);
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
        };
        checkLoggedIn();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${apiUrl}/logout`, { withCredentials: true });
            toast.success(response.data.message || 'Logged out successfully!');
            setIsLoggedIn(false);
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
        <div className='md:flex md:items-center md:justify-center'>
            {isLoggedIn ? (
                <button onClick={handleLogout} className='ml-3'>Logout</button>
            ) : (
                <Link to="/login" className='md:font-medium md:text-lg px-3 py-2 hover:bg-gray-700 rounded-md'>Login</Link>
            )}
        </div>
    );
};

export default AuthButton;
