import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Contact from './components/contact'

function App() {

  return (
    <div className='h-screen w-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white'>
      <Navbar/>
     <div className="canvas-app w-screen flex justify-center items-center">
      <Contact/>
     </div>
    </div>
  )
}

export default App
