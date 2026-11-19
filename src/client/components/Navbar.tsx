import React from 'react';
import { Link } from 'react-router-dom';
import collegeLogo from '/assets/college_logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-navy-900 text-white p-4 flex items-center justify-between" aria-label="Main navigation">
      <div className="flex items-center space-x-2">
        <img src={collegeLogo} alt="RIT College Logo" className="h-8 w-8" />
        <span className="font-semibold text-xl">RIT CareerHub AI</span>
      </div>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/about" className="hover:underline">About</Link></li>
        <li><Link to="/features" className="hover:underline">Features</Link></li>
        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
