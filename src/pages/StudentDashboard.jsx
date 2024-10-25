import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; 

const StudentDashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const checkAuthToken = () => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='));
            return token ? true : false;
        };

        const fetchStudents = async () => {
            if (!checkAuthToken()) {
                toast.error('You must log in to access the dashboard.');
                navigate('/login');
                return; 
            }

            try {
                const response = await axios.get('http://localhost:4000/students', {
                    withCredentials: true 
                });

                if (Array.isArray(response.data)) {
                    setStudents(response.data);
                    toast.success('Students fetched successfully!');
                } else {
                    setError('Unexpected response format');
                    toast.error('Unexpected response format');
                }
                setLoading(false);
            } catch (err) {
                console.error('API error:', err.response ? err.response.data : err.message);
                setError('Error fetching students');
                toast.error('Error fetching students'); 
                setLoading(false);
            }
        };

        fetchStudents();
    }, [navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="bg-slate-900 min-h-screen w-full text-white">
            <Navbar />
            <div className="container mx-auto pt-20 px-3">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Students Dashboard</h2>
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="table-auto w-full bg-slate-900 text-left text-white">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Roll No</th>
                                <th className="px-4 py-2">Attendance Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr
                                    key={student._id}
                                    className={`${index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-900'} hover:bg-slate-700`}
                                >
                                    <td className="px-4 py-2">{student.name}</td>
                                    <td className="px-4 py-2">{student.rollNumber}</td>
                                    <td className="px-4 py-2">
                                        {student.attendanceStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
