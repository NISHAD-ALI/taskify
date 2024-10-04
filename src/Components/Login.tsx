import React, { useState } from 'react';
import { login } from '../Api/apis';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isManager, setIsManager] = useState(false); 
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedRole = isManager ? 'Manager' : 'Employee';
    try {
      const res = await login(email,password,selectedRole)
      if (res?.data.success) {
        localStorage.setItem('token', res?.data.token); 
        toast.success('Login success');
        setTimeout(()=>{
            if(selectedRole === 'Manager'){
                navigate('/manager/home')
            }else{
                navigate('/')
            }
            
        },1000)
    } else {
        toast.error(res?.data.message);
    }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          
        
          <div>
            <label className="block text-gray-700">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              required
            />
          </div>

      
          <div className="flex items-center">
            <input
              id="isManager"
              type="checkbox"
              checked={isManager}
              onChange={(e) => setIsManager(e.target.checked)}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="isManager" className="ml-2 block text-gray-700">
              Login as Manager
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/signup" className="text-orange-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
