import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nav: React.FC = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    };
    const data = localStorage.getItem('token')
  return (
    
    <nav className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-orange-500">taskify</div>
        <div className="space-x-4">
          <a onClick={()=>navigate('/')} className="hover:text-orange-500">Home</a>
          <a onClick={handleLogout} className="hover:text-orange-500">{data ? 'Logout' : 'Login'}</a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
