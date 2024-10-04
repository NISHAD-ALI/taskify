import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from '../Pages/Manager/LoginPage';
import EmployeeHomePage from '../Pages/Employee/HomePage';
import SignupPage from '../Pages/Manager/SignupPage';
import ProtectedRoute from '../Components/isLoggedIn';

function Employee() {


  return (
  
    <Routes>
     
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path='' element={<ProtectedRoute />}>
    <Route path="/" element={<EmployeeHomePage />} />
    </Route>
    </Routes>
   
  )
}

export default Employee