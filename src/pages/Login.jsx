import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${apiUrl}/login`,
                data,
                { withCredentials: true }
            );
            toast.success(response.data.message || 'Logged in successfully!');
            if (response.data.role === 'teacher') {
                navigate('/teacherDashboard');
            } else {
                navigate('/studentDashboard');
            }
            reset(); // Reset the form after successful login
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Failed to login.');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false); // Stop loading after the request
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <Navbar />
            <div className="bg-slate-900 shadow-md rounded-lg p-8 max-w-md w-full text-white">
                <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block mb-2">Email:</label>
                        <input
                            type="email"
                            {...register('email', {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                            })}
                            className="w-full px-3 py-2 rounded-lg outline-none text-black"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Password:</label>
                        <input
                            type="password"
                            {...register('password', { required: "Password is required" })}
                            className="w-full px-3 py-2 rounded-lg outline-none text-black"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Role:</label>
                        <select
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
                                {...register('authNumber', { required: "Authentication Number is required for teachers" })}
                                className="w-full px-3 py-2 rounded-lg outline-none text-black"
                            />
                            {errors.authNumber && <p className="text-red-500">{errors.authNumber.message}</p>}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-center text-white">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
