import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* HERO SECTION — Asymmetric, grounded collegiate layout */}
      <section className="border-b border-slate-200/90 bg-[#f8fafc] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Institutional Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 motion-reveal">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-slate-100 border border-slate-300 text-xs font-semibold tracking-wide uppercase text-[#0c2340]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Rajeev Institute of Technology, Hassan
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#0c2340] tracking-tight leading-[1.12]">
                Welcome to <br />
                <span className="italic font-normal text-slate-800">RIT CareerHub AI</span>
              </h1>

              <div className="border-l-2 border-[#b45309] pl-4 py-1">
                <p className="text-xl sm:text-2xl font-serif text-[#0f172a] font-medium leading-snug">
                  One College. Every Student. A Better Career.
                </p>
              </div>

              <p className="text-base text-slate-600 max-w-xl leading-relaxed font-sans">
                A unified engineering career platform connecting student portfolios, AI-verified achievements, placement readiness roadmaps, and hackathon management under one institutional portal.
              </p>

              {/* Action Buttons — Purposeful 150ms states, varied radii */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#0c2340] hover:bg-[#163861] text-white text-sm font-medium transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#0c2340] focus-visible:ring-offset-2"
                >
                  Explore Platform Features
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium border border-slate-300 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                >
                  About the Initiative
                </Link>
              </div>
            </div>

            {/* Right Column: Grounded Institutional Briefing Card */}
            <div className="lg:col-span-5 motion-reveal motion-stagger-1">
              <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-7 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-sans">Institutional Overview</span>
                  <span className="text-xs font-mono text-[#b45309] font-medium">CODESTORM 2026</span>
                </div>

                <div className="space-y-3.5 text-sm font-sans">
                  <div className="flex items-start justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Institution:</span>
                    <span className="font-medium text-slate-900 text-right">Rajeev Institute of Technology</span>
                  </div>
                  <div className="flex items-start justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-medium text-slate-900 text-right">Computer Science & Engineering</span>
                  </div>
                  <div className="flex items-start justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Lead Club:</span>
                    <span className="font-medium text-slate-900 text-right">GDG on Campus – RIT Hassan</span>
                  </div>
                  <div className="flex items-start justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Architecture:</span>
                    <span className="font-mono text-xs text-[#0c2340] bg-slate-100 px-2 py-0.5 rounded-sm">React + Express + MongoDB Atlas</span>
                  </div>
                  <div className="flex items-start justify-between py-1">
                    <span className="text-slate-500">Database Status:</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Connected & Synced
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500 border-t border-slate-100 leading-relaxed font-sans">
                  Designed for engineering undergraduates across all departments to prepare portfolios, verify credentials, and apply for technical opportunities.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THREE PILLARS — Asymmetric, human-crafted layout with hairline dividers */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#b45309] block mb-1">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#0c2340] tracking-tight">
            Engineered for Academic and Career Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Portfolios */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors duration-150 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2">01 / IDENTITY</div>
              <h3 className="text-lg font-serif font-semibold text-[#0c2340] mb-2">
                MyRITfolio Websites
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Every student receives a personal, shareable portfolio showcasing academic records, verified achievements, and live GitHub project repositories.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-medium text-[#0c2340]">
              Verified URL Engine →
            </div>
          </div>

          {/* Card 2: AI Intelligence */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors duration-150 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2">02 / READINESS</div>
              <h3 className="text-lg font-serif font-semibold text-[#0c2340] mb-2">
                AI Career Gap Analysis
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Powered by Gemini API to evaluate target job roles against student profiles, identifying missing technical skills and building 30-60-90 day roadmaps.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-medium text-[#0c2340]">
              Personalized Roadmaps →
            </div>
          </div>

          {/* Card 3: Events & Verification */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors duration-150 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2">03 / VERIFICATION</div>
              <h3 className="text-lg font-serif font-semibold text-[#0c2340] mb-2">
                Hackathons & UTR Ledger
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Integrated event registrations for CODESTORM 2026 with instant PhonePe QR payment submission and dual-stage administrator ledger approval.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-medium text-[#0c2340]">
              Instant Ledger Audit →
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
