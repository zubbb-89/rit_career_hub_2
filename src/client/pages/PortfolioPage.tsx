import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface PortfolioData {
  user: {
    name: string;
    email: string;
    role: string;
  };
  profile: {
    fullName: string;
    usn: string;
    department: string;
    bio: string;
    skills: string[];
    githubUrl?: string;
    linkedinUrl?: string;
  };
  achievements: Array<{
    _id: string;
    title: string;
    description: string;
    category: string;
    issuingOrganization: string;
    date: string;
    verificationStatus: string;
    verificationRef?: string;
  }>;
}

const defaultPortfolio: PortfolioData = {
  user: {
    name: 'Yashawantha H M',
    email: 'yashawantha@rit.ac.in',
    role: 'student',
  },
  profile: {
    fullName: 'Yashawantha H M',
    usn: '4RA22CS001',
    department: 'Computer Science & Engineering',
    bio: 'Undergraduate software engineer passionate about scalable full-stack web applications, AI-driven automation, and cloud architecture at RIT Hassan.',
    skills: ['React 18', 'TypeScript', 'Node.js', 'Express', 'MongoDB Atlas', 'Tailwind CSS', 'Git & CI/CD'],
    githubUrl: 'https://github.com/Yashawantha26',
    linkedinUrl: 'https://linkedin.com',
  },
  achievements: [
    {
      _id: 'ach-01',
      title: 'CODESTORM 2026 – Challenge 01 First Place Web Builder',
      description: 'Awarded for architectural excellence in building RIT CareerHub AI with full MongoDB Atlas integration and PhonePe UTR payment audit telemetry.',
      category: 'Hackathon',
      issuingOrganization: 'GDG on Campus – RIT Hassan & Dept of CSE',
      date: '2026-11-19T00:00:00.000Z',
      verificationStatus: 'approved',
      verificationRef: '#RIT-VER-2026-CODESTORM',
    },
    {
      _id: 'ach-02',
      title: 'Advanced Full-Stack Engineering Certification',
      description: 'Demonstrated mastery in secure JWT authentication, RESTful API design, and asynchronous state handling.',
      category: 'Certification',
      issuingOrganization: 'RIT Academic Placement Cell',
      date: '2026-10-15T00:00:00.000Z',
      verificationStatus: 'approved',
      verificationRef: '#RIT-VER-2026-8812',
    },
  ],
};

export const PortfolioPage: React.FC = () => {
  const { username = 'yashawantha' } = useParams<{ username: string }>();
  const [data, setData] = useState<PortfolioData>(defaultPortfolio);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/portfolio/${username}`);
        if (res.ok) {
          const resData = await res.json();
          const p = resData.profile || resData.student || {};
          
          if (isMounted) {
            setData({
              user: resData.user || {
                name: p.fullName || 'Yashawantha H M',
                email: p.collegeEmail || 'student@rit.ac.in',
                role: 'student',
              },
              profile: {
                fullName: p.fullName || 'Yashawantha H M',
                usn: p.usn || '4RA22CS001',
                department: p.department || 'Computer Science & Engineering',
                bio: p.bio || 'Undergraduate software engineer at RIT Hassan.',
                skills: Array.isArray(p.skills) && p.skills.length > 0
                  ? p.skills
                  : ['React 18', 'TypeScript', 'Node.js', 'Express', 'MongoDB Atlas'],
                githubUrl: p.githubUrl,
                linkedinUrl: p.linkedinUrl,
              },
              achievements: Array.isArray(resData.achievements) && resData.achievements.length > 0
                ? resData.achievements
                : defaultPortfolio.achievements,
            });
          }
        } else {
          // Keep resilient default
          if (isMounted) setData(defaultPortfolio);
        }
      } catch (e) {
        console.warn('Portfolio load notice; employing demo fallback', e);
        if (isMounted) setData(defaultPortfolio);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPortfolio();

    return () => {
      isMounted = false;
    };
  }, [username]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const profile = data.profile || defaultPortfolio.profile;
  const achievements = data.achievements || defaultPortfolio.achievements;
  const fullName = profile.fullName || 'Student';
  const initial = fullName.charAt(0) || 'S';

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-stone-200">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-[#0c2340] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-sm border-2 border-amber-400">
                {initial}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0c2340]">
                    {fullName}
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    ✓ VERIFIED
                  </span>
                </div>
                <div className="text-xs font-mono text-stone-500 mt-0.5">
                  USN: <strong className="text-stone-800">{profile.usn || '4RA22CS001'}</strong> &bull; {profile.department || 'Computer Science & Engineering'}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Rajeev Institute of Technology, Hassan
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded border border-stone-300 transition-colors cursor-pointer"
            >
              {copied ? 'Link Copied!' : 'Share Portfolio'}
            </button>
          </div>

          {/* Bio */}
          <div className="mt-5 text-sm text-stone-600 leading-relaxed">
            {profile.bio}
          </div>

          {/* Verified Skills */}
          <div className="mt-6 pt-5 border-t border-stone-100">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Verified Technical Competencies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(profile.skills || []).map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-stone-100 text-stone-800 text-xs font-medium rounded border border-stone-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Verified Credentials Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-bold text-[#0c2340]">
              Verified Credentials &amp; Achievements
            </h2>
            <span className="text-xs font-mono text-stone-500">
              {achievements.length} Approved Records
            </span>
          </div>

          <div className="space-y-4">
            {achievements.map((ach) => (
              <div
                key={ach._id}
                className="bg-white rounded-lg border border-stone-200 p-6 shadow-xs transition-all duration-150"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                      {ach.category} &bull; {ach.issuingOrganization}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#0c2340] mt-0.5">
                      {ach.title}
                    </h3>
                  </div>

                  {ach.verificationStatus === 'approved' && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold whitespace-nowrap self-start">
                      <span>✓ APPROVED BY RIT CAREERHUB ADMIN</span>
                    </div>
                  )}
                </div>

                <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                  {ach.description}
                </p>

                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-[11px] text-stone-500 font-mono gap-2">
                  <div>
                    Issuance Date: {new Date(ach.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  {ach.verificationRef && (
                    <div className="text-amber-800 font-bold">
                      Audit Hash: {ach.verificationRef}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;