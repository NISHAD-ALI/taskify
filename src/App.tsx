import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee from "./Routes/EmployeeRoutes";
import { Toaster } from 'react-hot-toast';
import Manager from "./Routes/ManagerRoutes";
import './index.css'
function App() {
  return (
<div>
<Toaster position="top-right" />
   <Router>
    <Routes>
    <Route path="/*" element={<Employee />} />
    <Route path="/manager*" element={<Manager />} />
    </Routes>
   </Router>
   </div>
  )
}

export default App

  