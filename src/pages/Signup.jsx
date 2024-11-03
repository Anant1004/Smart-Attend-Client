import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('student');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/signup`, data);
            toast.success(response.data.message || 'Signup successful!');
            navigate('/login');
            reset();
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <Navbar />
            <div className="bg-slate-900 shadow-md rounded-lg p-8 max-w-md w-full text-white">
                <h1 className="text-2xl font-semibold text-center mt-7">Signup</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            {...register('name', { required: "Name is required" })}
                            className="w-full px-3 py-2 rounded-lg text-black outline-none"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Email:</label>
                        <input
                            type="email"
                            {...register('email', { 
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                            })}
                            className="w-full px-3 py-2 rounded-lg text-black outline-none"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Password:</label>
                        <input
                            type="password"
                            {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                            className="w-full px-3 py-2 rounded-lg text-black outline-none"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Role:</label>
                        <select
                            {...register('role')}
                            className="w-full px-3 py-2 rounded-lg text-black outline-none"
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>

                    {selectedRole === 'student' && ( 
                        <div className="mb-4">
                            <label className="block mb-2">Roll Number:</label>
                            <input
                                type="text"
                                {...register('rollNumber', {
                                    required: "Roll Number is required for students"
                                })}
                                className="w-full px-3 py-2 rounded-lg text-black outline-none"
                            />
                            {errors.rollNumber && <p className="text-red-500">{errors.rollNumber.message}</p>}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
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
