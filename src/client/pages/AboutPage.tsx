import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 mb-8 motion-reveal">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#b45309] block mb-1">
            Institutional Mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#0c2340] tracking-tight">
            About RIT CareerHub AI
          </h1>
        </div>

        {/* Narrative & Institutional Provenance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-5 text-slate-700 leading-relaxed font-sans text-base motion-reveal motion-stagger-1">
            <p className="text-lg text-slate-900 font-serif leading-relaxed">
              RIT CareerHub AI is a centralized platform designed to empower engineering students at
              Rajeev Institute of Technology, Hassan.
            </p>
            <p className="text-slate-600 leading-relaxed">
              It provides tools to build professional profiles, showcase achievements, generate AI‑driven career roadmaps, and connect with recruiters and hackathon opportunities.
            </p>
            
            <div className="mt-6 border-l-2 border-[#0c2340] bg-slate-50 p-4 rounded-r-md">
              <p className="text-sm text-slate-800 font-medium italic font-serif">
                "One College. Every Student. A Better Career."
              </p>
              <span className="text-xs text-slate-500 font-sans block mt-1">
                Centralizing placement credentials and technical growth for Hassan engineering students.
              </span>
            </div>
          </div>

          {/* Contextual Facts Panel */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-5 text-xs text-slate-600 space-y-4 motion-reveal motion-stagger-2">
            <h2 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-2">
              Affiliation & Stakeholders
            </h2>
            <div className="space-y-2.5">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">College</span>
                <span className="font-medium text-slate-800">Rajeev Institute of Technology</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Department</span>
                <span className="font-medium text-slate-800">Computer Science & Engineering</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Organizing Student Body</span>
                <span className="font-medium text-slate-800">GDG on Campus – RIT Hassan</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Location</span>
                <span className="font-medium text-slate-800">Hassan, Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
