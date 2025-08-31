import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import DoctorCards from './components/DoctorCards.jsx'
import PatientLogin from './components/PatientLogin.jsx'
import PatientSignUp from './components/PatientSignUp.jsx'
import UserSelectionSignUp from './components/DPSignUp.jsx'
import UserSelectionLogin from './components/DPLogin.jsx'
import DoctorSignUp from './components/DoctorSignUp.jsx'
import DoctorLogin from './components/DoctorLogin.jsx'
import BookingPage from './components/Booking.jsx'
import Contact from './components/Contact.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<DoctorCards />} />
      <Route path='/login' element={<UserSelectionLogin />} />
      <Route path='/patient-login' element={<PatientLogin />} />
      <Route path='/doctor-login' element={<DoctorLogin />} />
      <Route path='/signin' element={<UserSelectionSignUp />} />
      <Route path='/patient-signup' element={<PatientSignUp />} />
      <Route path='/doctor-signup' element={<DoctorSignUp />} />
      <Route path="/book-appointment" element={<BookingPage />} />
      <Route path="/book-appointment/:id" element={<BookingPage />} />
      <Route path='/contact' element={<Contact />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)