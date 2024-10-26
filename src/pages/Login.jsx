import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        authNumber: '',
    });
    
    const [role, setRole] = useState('student');
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/login`,
                formData,
                { withCredentials: true }
            );
            toast.success(response.data.message || 'Logged in successfully!');
            if (response.data.role === 'teacher') {
                navigate('/teacherDashboard'); 
            } else {
                navigate('/studentDashboard'); 
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to login.');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }

        setFormData({
            email: '',
            password: '',
            authNumber: '',
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <Navbar />
            <div className="bg-slate-900 shadow-md rounded-lg p-8 max-w-md w-full text-white">
                <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 rounded-lg outline-none text-black"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 rounded-lg outline-none text-black"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Role:</label>
                        <select
                            name="role"
                            value={role}
                            onChange={handleRoleChange}
                            className="w-full px-3 py-2 rounded-lg outline-none text-black"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>

                    {role === 'teacher' && (
                        <div className="mb-4">
                            <label className="block mb-2">Authentication Number:</label>
                            <input
                                type="text"
                                name="authNumber"
                                value={formData.authNumber}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 rounded-lg outline-none text-black"
                            />
                        </div>
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Login</button>
                </form>
                <p className="mt-4 text-center text-white">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
