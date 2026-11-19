import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav 
      className="sticky top-0 z-50 bg-[#0c2340] bg-[#0c2340]/90 backdrop-blur-[12px] border-b border-[#1b3a61] text-white transition-colors duration-150" 
      aria-label="Main institutional navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Brand Area */}
        <div className="flex items-center space-x-3">
          {/* 1. College Logo (Far-left) */}
          <img 
            src="/assets/college_logo.png" 
            alt="RIT College Crest" 
            className="h-8 w-8 object-contain bg-white rounded-sm p-0.5 shadow-sm border border-slate-300" 
            title="Rajeev Institute of Technology, Hassan"
          />

          {/* 2. Department Logo (Right after College Logo) */}
          <img 
            src="/assets/cse_logo.jpg" 
            alt="CSE Department Crest" 
            className="h-8 w-8 object-contain bg-white rounded-sm p-0.5 shadow-sm border border-slate-300" 
            title="Dept. of Computer Science & Engineering"
          />
          
          {/* 3. Title Text + 4. Club Logo (Beside text) */}
          <div className="flex items-center space-x-2 pl-1">
            <span className="font-semibold text-lg tracking-tight text-white font-sans">
              RIT CareerHub <span className="font-bold text-amber-400">AI</span>
            </span>
            <img 
              src="/assets/gdg_logo.jpg" 
              alt="GDG on Campus Club Emblem" 
              className="h-6 w-6 object-contain bg-white rounded-full p-0.5 shadow-sm border border-slate-300" 
              title="GDG on Campus – RIT Hassan"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-1 sm:space-x-6 text-sm font-medium">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-2.5 py-1.5 rounded-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c2340] ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `px-2.5 py-1.5 rounded-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c2340] ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/features" 
              className={({ isActive }) => 
                `px-2.5 py-1.5 rounded-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c2340] ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                }`
              }
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `px-2.5 py-1.5 rounded-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c2340] ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
