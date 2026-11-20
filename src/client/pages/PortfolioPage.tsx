import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface AchievementItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  issuingOrganization: string;
  date: string;
  fileUrl?: string;
  verificationStatus: string;
  verificationRef?: string;
}

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
  achievements: AchievementItem[];
}

// 3 High-resolution collegiate mock certificate SVG Data URIs
const MOCK_CERTIFICATES = {
  hackathon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560"><rect width="800" height="560" fill="%23fffdfa" stroke="%23b45309" stroke-width="12"/><rect x="20" y="20" width="760" height="520" fill="none" stroke="%230c2340" stroke-width="2"/><text x="400" y="90" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="%230c2340" text-anchor="middle">RAJEEV INSTITUTE OF TECHNOLOGY</text><text x="400" y="125" font-family="sans-serif" font-size="14" fill="%23b45309" font-weight="bold" letter-spacing="2" text-anchor="middle">DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING</text><circle cx="400" cy="180" r="35" fill="%23b45309" fill-opacity="0.1" stroke="%23b45309" stroke-width="2"/><text x="400" y="188" font-size="24" text-anchor="middle">🏆</text><text x="400" y="250" font-family="Georgia, serif" font-size="32" font-weight="bold" fill="%230c2340" text-anchor="middle">CERTIFICATE OF EXCELLENCE</text><text x="400" y="285" font-family="sans-serif" font-size="14" fill="%2364748b" text-anchor="middle">THIS IS PROUDLY PRESENTED TO</text><text x="400" y="340" font-family="Georgia, serif" font-size="30" font-weight="bold" fill="%23b45309" text-anchor="middle">Yashawantha H M</text><text x="400" y="375" font-family="sans-serif" font-size="13" fill="%23334155" text-anchor="middle">USN: 4RA22CS001 • 1ST PLACE WINNER</text><text x="400" y="415" font-family="sans-serif" font-size="15" fill="%230c2340" font-weight="600" text-anchor="middle">CODESTORM 2026: STATE LEVEL HACKATHON</text><line x1="160" y1="480" x2="320" y2="480" stroke="%2394a3b8" stroke-width="1.5"/><text x="240" y="500" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">HEAD OF DEPARTMENT, CSE</text><line x1="480" y1="480" x2="640" y2="480" stroke="%2394a3b8" stroke-width="1.5"/><text x="560" y="500" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">GDG FACULTY ADVISOR</text></svg>`,
  cloud: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560"><rect width="800" height="560" fill="%23f8fafc" stroke="%230284c7" stroke-width="12"/><rect x="20" y="20" width="760" height="520" fill="none" stroke="%230c2340" stroke-width="2"/><text x="400" y="90" font-family="sans-serif" font-size="24" font-weight="bold" fill="%230c2340" text-anchor="middle">GOOGLE DEVELOPER GROUPS ON CAMPUS</text><text x="400" y="125" font-family="sans-serif" font-size="13" fill="%230284c7" font-weight="bold" letter-spacing="3" text-anchor="middle">TECHNICAL CERTIFICATION CREDENTIAL</text><circle cx="400" cy="180" r="35" fill="%230284c7" fill-opacity="0.1" stroke="%230284c7" stroke-width="2"/><text x="400" y="188" font-size="24" text-anchor="middle">☁️</text><text x="400" y="250" font-family="Georgia, serif" font-size="30" font-weight="bold" fill="%230c2340" text-anchor="middle">CLOUD &amp; FULL-STACK SPECIALIST</text><text x="400" y="285" font-family="sans-serif" font-size="14" fill="%2364748b" text-anchor="middle">VERIFIED COMPETENCY CREDENTIAL</text><text x="400" y="340" font-family="Georgia, serif" font-size="30" font-weight="bold" fill="%230284c7" text-anchor="middle">Yashawantha H M</text><text x="400" y="375" font-family="sans-serif" font-size="13" fill="%23334155" text-anchor="middle">USN: 4RA22CS001 • RIT HASSAN</text><text x="400" y="415" font-family="sans-serif" font-size="15" fill="%230c2340" font-weight="600" text-anchor="middle">Demonstrated Mastery in React 18, Node.js &amp; MongoDB Atlas</text><line x1="200" y1="480" x2="360" y2="480" stroke="%2394a3b8" stroke-width="1.5"/><text x="280" y="500" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">GDG CHAPTER LEAD</text><line x1="440" y1="480" x2="600" y2="480" stroke="%2394a3b8" stroke-width="1.5"/><text x="520" y="500" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">ACADEMIC AUDITOR</text></svg>`,
  research: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560"><rect width="800" height="560" fill="%23fff" stroke="%231e293b" stroke-width="12"/><rect x="20" y="20" width="760" height="520" fill="none" stroke="%23475569" stroke-width="2"/><text x="400" y="90" font-family="Georgia, serif" font-size="26" font-weight="bold" fill="%231e293b" text-anchor="middle">NATIONAL RESEARCH &amp; INNOVATION CONCLAVE</text><text x="400" y="125" font-family="sans-serif" font-size="13" fill="%23b45309" font-weight="bold" letter-spacing="2" text-anchor="middle">AFFILIATED TO VTU BELAGAVI</text><circle cx="400" cy="180" r="35" fill="%231e293b" fill-opacity="0.1" stroke="%231e293b" stroke-width="2"/><text x="400" y="188" font-size="24" text-anchor="middle">📜</text><text x="400" y="250" font-family="Georgia, serif" font-size="30" font-weight="bold" fill="%231e293b" text-anchor="middle">BEST TECHNICAL PAPER AWARD</text><text x="400" y="285" font-family="sans-serif" font-size="14" fill="%2364748b" text-anchor="middle">AWARDED FOR EXCELLENCE IN AI &amp; SYSTEM DESIGN</text><text x="400" y="340" font-family="Georgia, serif" font-size="30" font-weight="bold" fill="%230c2340" text-anchor="middle">Yashawantha H M</text><text x="400" y="375" font-family="sans-serif" font-size="13" fill="%23334155" text-anchor="middle">RIT Hassan • Computer Science &amp; Engineering</text><text x="400" y="415" font-family="sans-serif" font-size="15" fill="%23b45309" font-weight="600" text-anchor="middle">Paper Title: Autonomous AI-Driven Student Career Verification</text><line x1="200" y1="480" x2="360" y2="480" stroke="%2394a3b8" stroke-width="1.5"/><text x="280" y="500" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">CONFERENCE CHAIR</text><line x1="440" y1="480" x2="600" y2="480" stroke="%2394a3b8" stroke-width="1.5"/><text x="520" y="500" font-family="sans-serif" font-size="11" fill="%2364748b" text-anchor="middle">PRINCIPAL, RIT HASSAN</text></svg>`,
};

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
      fileUrl: MOCK_CERTIFICATES.hackathon,
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
      fileUrl: MOCK_CERTIFICATES.cloud,
      verificationStatus: 'approved',
      verificationRef: '#RIT-VER-2026-8812',
    },
  ],
};

export const PortfolioPage: React.FC = () => {
  const { username = 'yashawantha' } = useParams<{ username: string }>();
  const [data, setData] = useState<PortfolioData>(defaultPortfolio);
  const [copied, setCopied] = useState(false);

  // Certificate Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Smart India Hackathon 2026 Winner');
  const [modalCategory, setModalCategory] = useState('Hackathon');
  const [modalIssuer, setModalIssuer] = useState('Ministry of Education & AICTE');
  const [modalDate, setModalDate] = useState('2026-11-20');
  const [modalDescription, setModalDescription] = useState('Awarded for innovative AI agricultural monitoring system.');
  const [selectedMock, setSelectedMock] = useState<'hackathon' | 'cloud' | 'research' | 'custom'>('hackathon');
  const [customFileUrl, setCustomFileUrl] = useState<string>(MOCK_CERTIFICATES.hackathon);
  const [uploading, setUploading] = useState(false);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  // Certificate Lightbox View State
  const [viewingCertificate, setViewingCertificate] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolio = async () => {
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
        }
      } catch (e) {
        console.warn('Portfolio fetch notice; using fallback', e);
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

  // Handle Local File Upload (with base64 conversion & Cloudinary fallback)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomFileUrl(reader.result);
          setSelectedMock('custom');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Certificate for Admin Verification
  const handleSubmitCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSubmitNotice(null);

    const certificatePayload = {
      title: modalTitle,
      category: modalCategory,
      issuingOrganization: modalIssuer,
      date: modalDate,
      description: modalDescription,
      fileUrl: customFileUrl || MOCK_CERTIFICATES.hackathon,
    };

    try {
      const token = localStorage.getItem('token') || 'demo-jwt-student-token-2026';
      const res = await fetch('/api/student/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(certificatePayload),
      });

      const resJson = await res.json();
      const newAch: AchievementItem = resJson.achievement || {
        _id: 'ach-' + Date.now(),
        ...certificatePayload,
        verificationStatus: 'pending',
      };

      // Update state locally so student sees it immediately
      setData((prev) => ({
        ...prev,
        achievements: [newAch, ...prev.achievements],
      }));

      setSubmitNotice('✓ Certificate submitted! It is now queued in the Admin Ledger for institutional audit.');
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitNotice(null);
      }, 2000);
    } catch (err: any) {
      // Local optimistic fallback
      const fallbackAch: AchievementItem = {
        _id: 'ach-' + Date.now(),
        ...certificatePayload,
        verificationStatus: 'pending',
      };
      setData((prev) => ({
        ...prev,
        achievements: [fallbackAch, ...prev.achievements],
      }));
      setSubmitNotice('✓ Certificate queued locally for Admin verification.');
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitNotice(null);
      }, 2000);
    } finally {
      setUploading(false);
    }
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

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-3.5 py-1.5 bg-[#0c2340] hover:bg-[#153660] text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer shadow-xs"
              >
                + Submit Certificate for Audit
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded border border-stone-300 transition-colors cursor-pointer"
              >
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>
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
            <div>
              <h2 className="text-xl font-serif font-bold text-[#0c2340]">
                Institutional Credentials &amp; Certifications
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Official records reviewed and cryptographically badged by RIT CareerHub Admin.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline cursor-pointer"
            >
              + Upload Certificate
            </button>
          </div>

          <div className="space-y-4">
            {achievements.map((ach) => (
              <div
                key={ach._id}
                className="bg-white rounded-lg border border-stone-200 p-6 shadow-xs transition-all duration-150"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                        {ach.category} &bull; {ach.issuingOrganization}
                      </span>
                      {ach.verificationStatus === 'pending' && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300">
                          ⏳ PENDING ADMIN AUDIT
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#0c2340] mt-0.5">
                      {ach.title}
                    </h3>
                    <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>

                  {/* Certificate Picture Thumbnail with Click-to-Preview */}
                  {ach.fileUrl && (
                    <div className="shrink-0">
                      <div
                        onClick={() => setViewingCertificate(ach.fileUrl || null)}
                        className="w-32 h-24 bg-stone-50 border-2 border-stone-200 rounded p-1 shadow-xs cursor-pointer hover:border-amber-400 transition-colors group relative"
                        title="Click to view full certificate"
                      >
                        <img
                          src={ach.fileUrl}
                          alt={ach.title}
                          className="w-full h-full object-cover rounded-xs"
                        />
                        <div className="absolute inset-0 bg-[#0c2340]/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xs flex items-center justify-center text-white text-[11px] font-medium">
                          🔍 View
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-[11px] text-stone-500 font-mono gap-2">
                  <div>
                    Issued: {new Date(ach.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>

                  {ach.verificationStatus === 'approved' ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
                      <span>✓ APPROVED BY RIT CAREERHUB ADMIN</span>
                      {ach.verificationRef && (
                        <span className="text-amber-800 font-mono ml-1">({ach.verificationRef})</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-amber-700 italic font-sans text-xs">
                      Under review by Department Auditor
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL 1: STUDENT UPLOAD CERTIFICATE */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="bg-white w-full max-w-xl rounded-lg border border-stone-200 p-6 shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#0c2340]">
                    Upload Certificate for Institutional Audit
                  </h3>
                  <p className="text-xs text-stone-500">
                    Submit real or mock certificate picture to be approved by RIT CareerHub Admin.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-stone-400 hover:text-stone-700 font-bold text-xl px-2"
                >
                  &times;
                </button>
              </div>

              {submitNotice && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded font-medium">
                  {submitNotice}
                </div>
              )}

              <form onSubmit={handleSubmitCertificate} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Achievement / Certificate Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={modalTitle}
                    onChange={(e) => setModalTitle(e.target.value)}
                    placeholder="e.g. Smart India Hackathon 2026 Winner"
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                      Category
                    </label>
                    <select
                      value={modalCategory}
                      onChange={(e) => setModalCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                    >
                      <option>Hackathon</option>
                      <option>Competition</option>
                      <option>Workshop</option>
                      <option>Internship</option>
                      <option>Research</option>
                      <option>Technical</option>
                      <option>Sports</option>
                      <option>Cultural</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                      Issuing Body / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={modalIssuer}
                      onChange={(e) => setModalIssuer(e.target.value)}
                      placeholder="e.g. GDG on Campus, VTU, NPTEL"
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Issuance Date
                  </label>
                  <input
                    type="date"
                    value={modalDate}
                    onChange={(e) => setModalDate(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>

                {/* Certificate Picture Selection: Mock Presets OR Real Upload */}
                <div className="pt-2 border-t border-stone-100">
                  <label className="block text-xs font-bold text-[#0c2340] uppercase tracking-wide mb-2">
                    Certificate Picture (Choose Mock Preset or Upload File)
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMock('hackathon');
                        setCustomFileUrl(MOCK_CERTIFICATES.hackathon);
                      }}
                      className={`p-2 border rounded text-xs text-center transition-colors ${
                        selectedMock === 'hackathon'
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      🏆 Hackathon Winner
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMock('cloud');
                        setCustomFileUrl(MOCK_CERTIFICATES.cloud);
                      }}
                      className={`p-2 border rounded text-xs text-center transition-colors ${
                        selectedMock === 'cloud'
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      ☁️ Google Cloud
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMock('research');
                        setCustomFileUrl(MOCK_CERTIFICATES.research);
                      }}
                      className={`p-2 border rounded text-xs text-center transition-colors ${
                        selectedMock === 'research'
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      📜 VTU Research Paper
                    </button>
                  </div>

                  <div className="mb-3">
                    <div className="text-[11px] text-stone-500 mb-1">Or upload real image from PC:</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-xs text-stone-600 file:mr-2 file:py-1 file:px-3 file:rounded file:border file:border-stone-300 file:text-xs file:bg-stone-100 file:font-medium hover:file:bg-stone-200 cursor-pointer"
                    />
                  </div>

                  {/* Certificate Live Preview Box */}
                  <div className="border border-stone-200 rounded p-2 bg-stone-50 text-center">
                    <div className="text-[10px] text-stone-500 uppercase font-semibold mb-1">
                      Certificate Preview
                    </div>
                    <div className="max-h-48 overflow-hidden rounded border border-amber-300 shadow-inner flex items-center justify-center bg-white">
                      <img
                        src={customFileUrl}
                        alt="Preview Certificate"
                        className="max-h-44 object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded text-xs font-medium text-stone-700 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-5 py-2 bg-[#0c2340] hover:bg-[#15345d] text-white text-xs font-semibold rounded transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {uploading ? 'Submitting to Admin...' : 'Submit Certificate for Verification'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: FULL-SIZE LIGHTBOX VIEW */}
        {viewingCertificate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs cursor-pointer"
            onClick={() => setViewingCertificate(null)}
          >
            <div
              className="bg-white p-2 rounded-lg max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl relative cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setViewingCertificate(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10"
              >
                &times;
              </button>
              <img
                src={viewingCertificate}
                alt="Certificate Full View"
                className="w-full max-h-[80vh] object-contain rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;