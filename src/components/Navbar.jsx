import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white w-full fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex-shrink-0 flex items-center ">
                            <h1 className="text-2xl font-bold">SmartAttend</h1>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4 ">
                                <Link to="/" className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">Home</Link>
                                <Link to="/about" className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">About</Link>
                                <Link to="/studentDashboard" className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">Student</Link>
                                <Link to="/messages" className="px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700">Notice</Link>
                                <Logout />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">About</Link>
                        <Link to="/studentDashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Student</Link>
                        <Link to="/messages" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Notice</Link>
                        <Logout />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
