import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071526] border-t border-[#183b63] text-slate-300 py-8 px-4 sm:px-6 lg:px-8 mt-auto" aria-label="Footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Institutional Logos with exact sequence */}
        <div className="flex items-center space-x-3">
          <img 
            src="/assets/college_logo.png" 
            alt="RIT College Logo" 
            className="h-8 w-8 object-contain bg-white rounded-xs p-0.5 border border-slate-700" 
            title="Rajeev Institute of Technology, Hassan"
          />
          <img 
            src="/assets/cse_logo.jpg" 
            alt="CSE Department Logo" 
            className="h-8 w-8 object-contain bg-white rounded-xs p-0.5 border border-slate-700" 
            title="Department of Computer Science & Engineering"
          />
          <img 
            src="/assets/gdg_logo.jpg" 
            alt="GDG on Campus Logo" 
            className="h-8 w-8 object-contain bg-white rounded-full p-0.5 border border-slate-700" 
            title="GDG on Campus – RIT Hassan"
          />
          <div className="pl-2 border-l border-slate-700 text-xs text-slate-400 font-sans">
            <span className="font-semibold text-white block">RIT Hassan</span>
            <span>Department of CSE</span>
          </div>
        </div>

        {/* Copyright and Platform Tag */}
        <div className="text-center md:text-right font-sans text-xs text-slate-400 space-y-1">
          <p>© {new Date().getFullYear()} RIT CareerHub AI. All rights reserved.</p>
          <p className="text-[11px] text-slate-500 font-mono">
            Developed for CODESTORM 2026 • Challenge 01: Website Building
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
