import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from '../Pages/Manager/LoginPage';
import HomePage from '../Pages/Manager/HomePage';
import SignupPage from '../Pages/Manager/SignupPage';
import ProtectedRoute from '../Components/isLoggedIn';
import TaskCreationForm from '../Components/Manger/CreateTask';
import EmployeesPage from '../Pages/Manager/Employees';

function Manager() {


  return (
  
    <Routes>
      <Route path='' element={<ProtectedRoute />}>
    <Route path="/home" element={<HomePage />} />
    <Route path='/createTask' element={<TaskCreationForm/>}/>
    <Route path='/employees' element={<EmployeesPage/>}/>
    </Route>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    </Routes>
   
  )
}

export default Manager