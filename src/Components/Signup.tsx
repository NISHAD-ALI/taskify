import React, { useState } from 'react';
import { signup } from '../Api/apis';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isManager, setIsManager] = useState(false);
  const [role,setRole] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
        setRole(isManager ? 'Manager' : 'Employee')
      console.log({ name, email, password, role: isManager ? 'Manager' : 'Employee' });
      const res = await signup(name,email,password,role)
      console.log(res)
      if(res?.data?.success){
        toast.success('Signup success');
        setTimeout(()=>{
            navigate('/login')
        },2000)
      }
      
   } else {
      toast.error('Passwords do not match!');
    } 
  };

  return (
    <div className="flex h-screen justify-center items-center bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              required
            />
          </div>

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


          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Register as Manager
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-orange-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
