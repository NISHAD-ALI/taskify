import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto text-center">
        <p className="text-gray-500">&copy; 2024 Task Manager. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#home" className="hover:text-orange-500">Home</a>
          <a href="#features" className="hover:text-orange-500">Features</a>
          <a href="#about" className="hover:text-orange-500">About</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
