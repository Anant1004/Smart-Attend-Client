import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rollNumber: '',
        role: 'student', 
    });
    
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/signup`, formData, { withCredentials: true });
            toast.success(response.data.message || 'Signup successful!');
            navigate('/login'); 
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }

        setFormData({
            name: '',
            email: '',
            password: '',
            rollNumber: '',
            role: 'student',
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <Navbar />
            <div className="bg-slate-900 shadow-md rounded-lg p-8 max-w-md w-full text-white">
                <h1 className="text-2xl font-semibold text-center mt-7">Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 rounded-lg text-black outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 rounded-lg text-black outline-none"
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
                            className="w-full px-3 py-2 rounded-lg text-black outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Role:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg text-black outline-none"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>

                    {formData.role === 'student' && (
                        <div className="mb-4">
                            <label className="block mb-2">Roll Number:</label>
                            <input
                                type="text"
                                name="rollNumber"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                required={formData.role === 'student'}
                                className="w-full px-3 py-2 rounded-lg text-black outline-none"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-white">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
