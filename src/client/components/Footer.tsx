import React from 'react';
import collegeLogo from '/assets/college_logo.png';
import cseLogo from '/assets/cse_logo.jpg';
import gdgLogo from '/assets/gdg_logo.jpg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 p-6" aria-label="Footer">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <img src={collegeLogo} alt="RIT College Logo" className="h-8 w-8" />
          <img src={cseLogo} alt="CSE Department Logo" className="h-8 w-8" />
          <img src={gdgLogo} alt="GDG RIT Hassan Logo" className="h-8 w-8" />
        </div>
        <p className="text-sm">© {new Date().getFullYear()} RIT CareerHub AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
