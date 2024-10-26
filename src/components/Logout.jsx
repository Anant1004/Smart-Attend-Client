import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL;

const Logout = () => {
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/logout`, 
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
            <button onClick={handleLogout} className='ml-3'>Logout</button>
            {/* Optionally, you can add a link to login if the user is not authenticated */}
            {/* <Link to="/login" className='md:text-lg font-medium md:relative md:top-2 hover:bg-gray-700 px-3 py-2 rounded-md'>Login</Link> */}
        </div>
    );
};

export default Logout;
