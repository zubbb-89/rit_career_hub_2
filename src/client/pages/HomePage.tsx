import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor horizontal scroll position on mobile/tablet to update pagination dots (1 / 3)
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const itemWidth = el.firstElementChild?.clientWidth || 300;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(2, Math.max(0, index)));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const itemWidth = el.firstElementChild?.clientWidth || 300;
    el.scrollTo({
      left: index * (itemWidth + 16),
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full">
      {/* HERO SECTION — Grounded collegiate layout with Institutional Briefing Card */}
      <section className="border-b border-stone-200 bg-[#f9f8f6] py-12 sm:py-18 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Institutional Headline & Proposition */}
            <div className="lg:col-span-7 space-y-6 motion-reveal">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-white border border-stone-300 text-xs font-semibold tracking-wider uppercase text-[#0c2340]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Rajeev Institute of Technology, Hassan
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#0c2340] tracking-tight leading-[1.12]">
                Welcome to <br />
                <span className="italic font-normal text-slate-800">RIT CareerHub AI</span>
              </h1>

              <div className="border-l-2 border-[#b45309] pl-4 py-1">
                <p className="text-xl sm:text-2xl font-serif text-[#0f172a] font-medium leading-snug tracking-tight">
                  One College. Every Student. A Better Career.
                </p>
              </div>

              <p className="text-base text-slate-600 max-w-xl leading-relaxed font-sans">
                A unified engineering career platform connecting student portfolios, AI-verified achievements, placement readiness roadmaps, and hackathon management under one institutional portal.
              </p>

              {/* Action Buttons — Tactile micro-interactions (150ms) */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#0c2340] hover:bg-[#163861] text-white text-sm font-medium transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#0c2340] focus-visible:ring-offset-2"
                >
                  Explore Platform Features
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-white hover:bg-stone-50 text-slate-700 text-sm font-medium border border-stone-300 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
                >
                  About the Initiative
                </Link>
              </div>
            </div>

            {/* Right Column: Liquid Glass Institutional Briefing Card */}
            <div className="lg:col-span-5 motion-reveal motion-stagger-1">
              <div className="liquid-glass-card sheen-container rounded-lg p-6 sm:p-7 space-y-5 transition-shadow duration-300 hover:shadow-md">
                {/* Specular Sheen Layer (GPU transform/opacity only) */}
                <div className="sheen-overlay" aria-hidden="true" />

                <div className="border-b border-stone-200/80 pb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-sans">
                    Institutional Overview
                  </span>
                  <span className="text-xs font-mono text-[#b45309] font-medium">
                    CODESTORM 2026
                  </span>
                </div>

                <div className="space-y-3.5 text-sm font-sans">
                  <div className="flex items-start justify-between py-1 border-b border-stone-100">
                    <span className="text-slate-500">Institution:</span>
                    <span className="font-medium text-slate-900 text-right">Rajeev Institute of Technology</span>
                  </div>
                  <div className="flex items-start justify-between py-1 border-b border-stone-100">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-medium text-slate-900 text-right">Computer Science & Engineering</span>
                  </div>
                  <div className="flex items-start justify-between py-1 border-b border-stone-100">
                    <span className="text-slate-500">Lead Club:</span>
                    <span className="font-medium text-slate-900 text-right">GDG on Campus – RIT Hassan</span>
                  </div>
                  <div className="flex items-start justify-between py-1 border-b border-stone-100">
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

                <div className="pt-2 text-xs text-slate-500 border-t border-stone-100 leading-relaxed font-sans">
                  Designed for engineering undergraduates across all departments to prepare portfolios, verify credentials, and apply for technical opportunities.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THREE PILLARS — User-controlled horizontal slider on mobile/tablet (<1024px), 3-col grid on desktop */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#b45309] block mb-1">
              Platform Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#0c2340] tracking-tight">
              Engineered for Academic and Career Growth
            </h2>
          </div>

          {/* Slider Controls & Indicator (Visible on Mobile/Tablet, hidden on Desktop) */}
          <div className="flex items-center gap-3 lg:hidden self-start sm:self-auto">
            <span className="font-mono text-xs text-slate-500 tracking-wider">
              0{activeIndex + 1} / 03
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                aria-label="Previous capability slide"
                className="w-8 h-8 rounded-sm bg-white border border-stone-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 flex items-center justify-center transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#0c2340]"
              >
                ←
              </button>
              <button 
                onClick={() => scrollToSlide(Math.min(2, activeIndex + 1))}
                disabled={activeIndex === 2}
                aria-label="Next capability slide"
                className="w-8 h-8 rounded-sm bg-white border border-stone-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 flex items-center justify-center transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#0c2340]"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Pillar Items Container: CSS Snap Track on Mobile/Tablet (<1024px), CSS Grid on Desktop */}
        <div 
          ref={sliderRef}
          tabIndex={0}
          aria-label="Platform capabilities slider"
          className="slider-snap-track no-scrollbar flex lg:grid lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto pb-4 lg:pb-0 touch-pan-x focus-visible:ring-1 focus-visible:ring-stone-300 rounded-lg"
        >
          {/* Pillar 01: Portfolios */}
          <Link
            to="/portfolio/yashawantha"
            className="slider-snap-item w-[84vw] sm:w-[68vw] lg:w-auto shrink-0 lg:shrink bg-white border border-stone-200 rounded-lg p-6 sm:p-7 hover:border-[#b45309] hover:shadow-md transition-all duration-150 flex flex-col justify-between shadow-xs group cursor-pointer"
          >
            <div>
              <div className="text-xs font-mono text-stone-400 group-hover:text-[#b45309] transition-colors mb-2">01 / IDENTITY</div>
              <h3 className="text-lg font-serif font-semibold text-[#0c2340] group-hover:text-[#b45309] mb-2 tracking-tight transition-colors">
                MyRITfolio Websites
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Every student receives a personal, shareable portfolio showcasing academic records, verified achievements, and live GitHub project repositories.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-stone-100 text-xs font-semibold text-[#0c2340] group-hover:text-[#b45309] flex items-center justify-between transition-colors">
              <span>Explore MyRITfolio</span>
              <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>

          {/* Pillar 02: AI Intelligence */}
          <Link
            to="/ai-tools"
            className="slider-snap-item w-[84vw] sm:w-[68vw] lg:w-auto shrink-0 lg:shrink bg-white border border-stone-200 rounded-lg p-6 sm:p-7 hover:border-[#b45309] hover:shadow-md transition-all duration-150 flex flex-col justify-between shadow-xs group cursor-pointer"
          >
            <div>
              <div className="text-xs font-mono text-stone-400 group-hover:text-[#b45309] transition-colors mb-2">02 / READINESS</div>
              <h3 className="text-lg font-serif font-semibold text-[#0c2340] group-hover:text-[#b45309] mb-2 tracking-tight transition-colors">
                AI Career Gap Analysis
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Powered by Gemini API to evaluate target job roles against student profiles, identifying missing technical skills and building 30-60-90 day roadmaps.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-stone-100 text-xs font-semibold text-[#0c2340] group-hover:text-[#b45309] flex items-center justify-between transition-colors">
              <span>Launch AI Analyzer</span>
              <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>

          {/* Pillar 03: Events & Verification */}
          <Link
            to="/events"
            className="slider-snap-item w-[84vw] sm:w-[68vw] lg:w-auto shrink-0 lg:shrink bg-white border border-stone-200 rounded-lg p-6 sm:p-7 hover:border-[#b45309] hover:shadow-md transition-all duration-150 flex flex-col justify-between shadow-xs group cursor-pointer"
          >
            <div>
              <div className="text-xs font-mono text-stone-400 group-hover:text-[#b45309] transition-colors mb-2">03 / VERIFICATION</div>
              <h3 className="text-lg font-serif font-semibold text-[#0c2340] group-hover:text-[#b45309] mb-2 tracking-tight transition-colors">
                Hackathons & UTR Ledger
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Integrated event registrations for CODESTORM 2026 with instant PhonePe QR payment submission and dual-stage administrator ledger approval.
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-stone-100 text-xs font-semibold text-[#0c2340] group-hover:text-[#b45309] flex items-center justify-between transition-colors">
              <span>Register & Pay UTR</span>
              <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>
        </div>

        {/* Mobile Pagination Dots Indicator */}
        <div className="flex lg:hidden items-center justify-center gap-2 mt-4" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                activeIndex === i ? 'w-6 bg-[#0c2340]' : 'w-1.5 bg-stone-300'
              }`}
              aria-label={`Jump to capability 0${i + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
