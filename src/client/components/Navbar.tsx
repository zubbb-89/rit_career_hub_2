import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#0f172a] border-b border-slate-800 text-white px-6 py-3 flex items-center justify-between" aria-label="Main navigation">
      <div className="flex items-center space-x-3">
        {/* 1. College Logo (Leftmost) */}
        <img 
          src="/assets/college_logo.png" 
          alt="RIT College Logo" 
          className="h-9 w-9 object-contain bg-white rounded-lg p-0.5 shadow-sm" 
          title="Rajeev Institute of Technology"
        />

        {/* 2. Department Logo (Right after College Logo) */}
        <img 
          src="/assets/cse_logo.jpg" 
          alt="CSE Dept Logo" 
          className="h-9 w-9 object-contain bg-white rounded-lg p-0.5 shadow-sm" 
          title="Dept. of Computer Science & Engineering"
        />
        
        {/* 3. Title Text + 4. Club Logo (Right beside the text) */}
        <div className="flex items-center space-x-2 pl-1">
          <span className="font-bold text-xl tracking-tight text-white">
            RIT CareerHub <span className="text-violet-400 font-extrabold">AI</span>
          </span>
          <img 
            src="/assets/gdg_logo.jpg" 
            alt="GDG on Campus Club Logo" 
            className="h-7 w-7 object-contain bg-white rounded-full p-0.5 shadow-sm" 
            title="GDG on Campus – RIT Hassan"
          />
        </div>
      </div>

      <ul className="flex items-center space-x-6 text-sm font-medium text-slate-300">
        <li><Link to="/" className="hover:text-violet-400 transition-colors">Home</Link></li>
        <li><Link to="/about" className="hover:text-violet-400 transition-colors">About</Link></li>
        <li><Link to="/features" className="hover:text-violet-400 transition-colors">Features</Link></li>
        <li><Link to="/contact" className="hover:text-violet-400 transition-colors">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
