// import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import Signup from './pages/Signup'
import Login from './pages/Login'
import About from './pages/About'
import StudentDashboard from './pages/StudentDashboard.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import Message from './pages/Message.jsx';
import './index.css'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/about", element: <About /> },
  { path: "/studentDashboard", element: <StudentDashboard /> },
  { path: "/teacherDashboard", element: <TeacherDashboard /> },
  { path: "/messages", element: <Message/> }
])


createRoot(document.getElementById('root')).render(
  <>
    {/* <StrictMode> */}
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    {/* </StrictMode>, */}
  </>

)
