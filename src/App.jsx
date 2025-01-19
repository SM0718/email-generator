import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default App