import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  path: string;
  actionText: string;
}

const FeaturesPage: React.FC = () => {
  const features: FeatureItem[] = [
    {
      id: '01',
      title: 'AI‑Powered Career Readiness Analyzer',
      category: 'Intelligence',
      desc: 'Evaluates your technical competencies against tier-1 industry standards. Powered by Gemini API to generate instant readiness scores and 30/60/90-day learning roadmaps.',
      path: '/ai-tools',
      actionText: 'Launch AI Analyzer',
    },
    {
      id: '02',
      title: 'AI Resume Experience Bullet Polisher',
      category: 'Career Tools',
      desc: 'Transforms raw project summaries into high-impact, ATS-optimized, quantifiable resume bullet points tailored for technical recruiters.',
      path: '/ai-tools',
      actionText: 'Polish Resume Bullets',
    },
    {
      id: '03',
      title: 'Personal Verified Student Portfolios (MyRITfolio)',
      category: 'Student Identity',
      desc: 'Individual institutional web portfolios featuring verified USN, academic branch, validated technical competencies, and approved credential seals.',
      path: '/portfolio/yashawantha',
      actionText: 'Open MyRITfolio',
    },
    {
      id: '04',
      title: 'Certificate Upload & Institutional Verification Queue',
      category: 'Verification',
      desc: 'Students can upload real certificate pictures or choose from mock templates. Department Administrators review submissions and issue official audit badges.',
      path: '/portfolio/yashawantha',
      actionText: 'Upload Certificate',
    },
    {
      id: '05',
      title: 'CODESTORM 2026 Event Registration Engine',
      category: 'Events & Hackathons',
      desc: 'Official challenge registration portal supporting solo and team entries, participant USN indexing, and department categorization.',
      path: '/events',
      actionText: 'Register for CodeStorm',
    },
    {
      id: '06',
      title: 'PhonePe UPI QR Gateway & 12-Digit UTR Submission',
      category: 'Transactions',
      desc: 'Test registration payment gateway with live PhonePe QR code, copyable UPI ID (ritcareerhub@sbi), and instant 12-digit UTR submission validation.',
      path: '/events',
      actionText: 'Submit UTR Payment',
    },
    {
      id: '07',
      title: 'Admin TRANSACTION IDs Ledger & Review Console',
      category: 'Auditing',
      desc: 'Searchable, filterable ledger for campus administrators to audit submitted UTRs, verify transaction legitimacy, and approve registrations in real time.',
      path: '/admin',
      actionText: 'Open Admin Ledger',
    },
    {
      id: '08',
      title: 'Live MongoDB Atlas Database Telemetry (Judges View)',
      category: 'Infrastructure',
      desc: 'Live telemetry inspector displaying MongoDB Atlas query latency, active student records, confirmed revenue metrics, and system security parameters.',
      path: '/admin',
      actionText: 'Inspect DB Telemetry',
    },
  ];

  return (
    <div className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#faf8f5] min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-stone-200 pb-6 mb-8 motion-reveal">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#b45309] block mb-1">
            System Modules &bull; RIT CareerHub AI
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0c2340] tracking-tight">
            Interactive Platform Features
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl font-sans leading-relaxed">
            Every module below is fully functional. Click any feature card to directly launch the tool, submit data, or inspect institutional records.
          </p>
        </div>

        {/* Clickable Feature Cards List with Tactile Hover Interactions */}
        <div className="space-y-3.5 motion-reveal motion-stagger-1">
          {features.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="group block bg-white border border-stone-200 rounded-lg p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#b45309] hover:bg-stone-50/50 transition-all duration-150 transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#0c2340]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-stone-400 group-hover:text-[#b45309] select-none pt-0.5 transition-colors">
                    {item.id}
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-base sm:text-lg font-bold text-[#0c2340] font-serif tracking-tight group-hover:text-[#b45309] transition-colors">
                        {item.title}
                      </h2>
                      <span className="font-mono text-[10px] font-semibold uppercase text-stone-600 bg-stone-100 group-hover:bg-amber-100 group-hover:text-amber-900 px-2 py-0.5 rounded border border-stone-200 transition-colors">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 font-sans leading-relaxed max-w-3xl">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Right Action Button Pill */}
                <div className="shrink-0 self-start sm:self-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0c2340] group-hover:bg-[#b45309] px-3.5 py-1.5 rounded-sm transition-colors duration-150 shadow-xs whitespace-nowrap">
                    {item.actionText} &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;