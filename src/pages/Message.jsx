import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import axios from 'axios';

const Message = () => {
    const [message, setMessage] = useState('');
    const [duration, setDuration] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() && duration) {
            try {
                const response = await axios.post(
                    'http://localhost:4000/messages',
                    { message, duration },
                    { withCredentials: true }
                );

                toast.success(response.data.message || 'Message created successfully!');

                setMessage('');
                setDuration('');
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.message || 'Failed to create message.');
                } else {
                    toast.error('Something went wrong. Please try again.');
                }
            }
        }
    };

    return (
        <div className='bg-slate-900 w-full h-screen text-white pt-16'>
            <Navbar />
            <h1 className='text-center text-[2rem] mb-4'>Messages</h1>
            <div className='p-3'>
                <div className='max-w-md mx-auto p-4 bg-slate-800 rounded-lg shadow-md'>
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                        <textarea
                            value={message}
                            onChange={handleMessageChange}
                            rows="4"
                            placeholder="Type your message here..."
                            className='p-2 rounded-lg text-black outline-none'
                            required
                        />
                        <div className='flex flex-col'>
                            <label className='mb-1'>Duration (minutes):</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={handleDurationChange}
                                min="1" 
                                className='p-2 rounded-lg text-black outline-none'
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Message;
