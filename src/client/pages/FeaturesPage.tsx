import React from 'react';

const FeaturesPage: React.FC = () => {
  const features = [
    { id: '01', title: 'AI‑powered career readiness analyzer', category: 'Intelligence', desc: 'Analyzes target roles, evaluates skill gaps, and formulates 30/60/90-day learning trajectories.' },
    { id: '02', title: 'AI resume builder with PDF export', category: 'Career Tools', desc: 'Generates professional, ATS-friendly resumes aligned with student credentials and project work.' },
    { id: '03', title: 'Personal portfolio websites (MyRITfolio)', category: 'Student Portfolios', desc: 'Individual verified web portfolios (/student/username) featuring academic records and GitHub links.' },
    { id: '04', title: 'Hackathon & event registration system', category: 'Events', desc: 'Seamless registration engine built for CODESTORM 2026 with participant validation.' },
    { id: '05', title: 'Secure file uploads via Cloudinary', category: 'Infrastructure', desc: 'Cloudinary media pipeline for certificates, student portraits, and event banners.' },
    { id: '06', title: 'Payment transaction management (PhonePe QR demo)', category: 'Transactions', desc: 'PhonePe dynamic UPI QR checkout with student UTR submission and admin audit verification.' },
    { id: '07', title: 'Recruiter portal and talent discovery', category: 'Industry Outreach', desc: 'Role-filtered search for verified engineering candidates with opted-in portfolio access.' },
    { id: '08', title: 'Progressive Web App (installable)', category: 'Universal Access', desc: 'Mobile-first PWA with standalone display mode and offline support for iOS, Android, and Desktop.' },
  ];

  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 mb-8 motion-reveal">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#b45309] block mb-1">
            System Modules
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#0c2340] tracking-tight">
            Features
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-xl font-sans">
            Comprehensive institutional modules architected to support student career readiness, certificate validation, and event management.
          </p>
        </div>

        {/* Structured Feature Index with Hairline Dividers */}
        <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white rounded-lg shadow-xs overflow-hidden motion-reveal motion-stagger-1">
          {features.map((item) => (
            <div 
              key={item.id} 
              className="py-4 px-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors duration-150"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs font-semibold text-slate-400 select-none">
                  {item.id}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-slate-900 font-sans">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-center font-mono text-[11px] font-medium text-[#0c2340] bg-slate-100 px-2 py-0.5 rounded-xs border border-slate-200 whitespace-nowrap">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
