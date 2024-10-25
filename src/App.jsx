import Navbar from './components/Navbar'
import './index.css'

function App() {

  return (
    <>
    <div className='bg-slate-900 text-white w-full h-lvh flex flex-col items-center justify-center'>
      <Navbar/>
      <h1 className='text-red-700 md:text-[5rem] text-[4rem]'>Homepage</h1>
    </div>
    </>
  )
}

export default App
