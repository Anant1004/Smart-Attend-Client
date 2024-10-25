import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    navigate('/signup'); 
  };

  return (
    <>
      <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-start pt-10">
        <Navbar />
        <section className="text-center mt-10 p-4">
          <h1 className="text-red-700 md:text-[5rem] text-[3rem] font-bold leading-tight tracking-wide">
            Welcome to Our Platform
          </h1>
          <p className="mt-4 md:text-lg text-sm max-w-md mx-auto text-gray-300 leading-relaxed">
            Discover a space designed to streamline attendance management and communication for students and teachers.
          </p>
          <div className="mt-8">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-semibold transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
        </section>
        <section className="mt-16 w-full px-4 md:px-10 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
              <h2 className="text-xl font-semibold mb-2 text-blue-400">Attendance Management</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Track student attendance efficiently with real-time monitoring and analytics.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
              <h2 className="text-xl font-semibold mb-2 text-blue-400">Communication Hub</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Send important notices and updates to students directly within the platform.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
              <h2 className="text-xl font-semibold mb-2 text-blue-400">Easy Navigation</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Simple and intuitive design for teachers and students to navigate and manage tasks.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
