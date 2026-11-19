import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-stone-200 pb-6 mb-8 motion-reveal">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#b45309] block mb-1">
            Communication Channels
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#0c2340] tracking-tight">
            Contact Us
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-sans">
            Have questions or need support? Reach out to us via the channels below.
          </p>
        </div>

        {/* Channels Information Card */}
        <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 shadow-xs motion-reveal motion-stagger-1 max-w-2xl">
          <ul className="divide-y divide-stone-100 font-sans text-sm">
            <li className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Email</span>
              <a 
                href="mailto:support@ritcareerhub.ai" 
                className="font-medium text-[#0c2340] hover:text-[#b45309] underline underline-offset-4 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#0c2340] rounded-xs"
              >
                support@ritcareerhub.ai
              </a>
            </li>
            <li className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Phone</span>
              <span className="font-medium text-slate-800 font-mono">+91 98765 43210</span>
            </li>
            <li className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono pt-0.5">Address</span>
              <span className="font-medium text-slate-800 text-left sm:text-right max-w-sm">
                Rajeev Institute of Technology, Hassan, Karnataka, India
              </span>
            </li>
          </ul>

          <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
            <span>Operating Hours: Monday – Saturday (9:00 AM – 5:00 PM IST)</span>
            <span className="font-mono text-[#b45309] font-medium">Department of CSE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
