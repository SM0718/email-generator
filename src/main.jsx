import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import EditTemplate from './pages/EditTemplate.jsx'
import UserTemplates from './pages/UserTemplates.jsx'
import Login from './pages/Login.jsx'
import CreateAccount from './pages/CreateAccount.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/:index/:id' element={<EditTemplate />} />
      <Route path='/user-templates' element={<UserTemplates />} />
      <Route path='/login' element={<Login />} />
      <Route path='/create-account' element={<CreateAccount />} />
    </Route>
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>,
)