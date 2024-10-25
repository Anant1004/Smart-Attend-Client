import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rollNumber: '',
        role: 'student', 
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:4000/signup', formData, { withCredentials: true });
            setSuccessMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
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
            <Navbar/>
            <div className="bg-slate-900 shadow-md rounded-lg p-8 max-w-md w-full text-white">
                <h1 className="text-2xl font-semibold mb-6 text-center">Signup</h1>

                {error && <p className="text-red-600 mb-4">{error}</p>}
                {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block  mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 rounded-lg text-black outline-none "
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
                            className="w-full px-3 py-2 rounded-lg text-black outline-none   "
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block  mb-2">Password:</label>
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
                        <label className="block  mb-2">Role:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg text-black outline-none "
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>

                    {formData.role === 'student' && (
                        <div className="mb-4">
                            <label className="block  mb-2">Roll Number:</label>
                            <input
                                type="text"
                                name="rollNumber"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                required={formData.role === 'student'}
                                className="w-full px-3 py-2 rounded-lg text-black outline-none   "
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700  -2 -blue-500 -opacity-50"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
