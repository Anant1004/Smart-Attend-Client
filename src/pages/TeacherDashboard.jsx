import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import useAuth from '../hooks/Tokencheck';
import { useNavigate } from 'react-router-dom';


const TeacherDashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attendance, setAttendance] = useState({});
    const navigate = useNavigate();
    const { checkAuthToken} = useAuth();

    useEffect(() => {
        const fetchStudents = async () => {
            if (!checkAuthToken()) {
                toast.error('log in to access this !!.');
                navigate('/login');
                return; 
            }
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/students`, {
                    withCredentials: true, 
                });
                setStudents(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching students');
                setLoading(false);
                toast.error('Error fetching students'); 
            }
        };

        fetchStudents();
    }, []);

    const handleAttendanceChange = (rollNumber, status) => {
        setAttendance((prevAttendance) => ({
            ...prevAttendance,
            [rollNumber]: status,
        }));
    };

    const handleSubmit = async () => {
        try {
            const attendanceData = students.map((student) => ({
                rollNumber: student.rollNumber,
                status: attendance[student.rollNumber] || 'Not Marked',
            }));

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/attendance`, 
                { attendanceData },
                { withCredentials: true }
            );

            toast.success('Attendance submitted successfully!'); 
        } catch (err) {
            console.error(err.response?.data || err.message);
            toast.error(err.response?.data?.message || 'Error submitting attendance'); 
        }
    };

    if (loading) return <p className="text-center text-white">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="bg-slate-900 min-h-screen w-full">
            <Navbar />
            <div className='pt-20 px-3'>
                <h2 className="text-3xl font-bold text-center text-white mb-8">Teacher Dashboard</h2>
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="table-auto w-full bg-slate-900 text-center text-white">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Roll No</th>
                                <th className="px-4 py-2">Attendance</th>
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
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleAttendanceChange(student.rollNumber, 'present')}
                                                className={`px-4 py-2 rounded ${
                                                    attendance[student.rollNumber] === 'present'
                                                        ? 'bg-green-500'
                                                        : 'bg-gray-500'
                                                } hover:bg-green-400`}
                                            >
                                                Present
                                            </button>
                                            <button
                                                onClick={() => handleAttendanceChange(student.rollNumber, 'absent')}
                                                className={`px-4 py-2 rounded ${
                                                    attendance[student.rollNumber] === 'absent'
                                                        ? 'bg-red-500'
                                                        : 'bg-gray-500'
                                                } hover:bg-red-400`}
                                            >
                                                Absent
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-6">
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-bold"
                    >
                        Submit Attendance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
