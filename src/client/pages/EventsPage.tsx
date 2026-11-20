import React, { useState, useEffect } from 'react';

export const EventsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    usn: '',
    email: '',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    teamName: '',
    teamSize: 'Solo',
    utrNumber: '',
  });

  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    message: string;
    transactionId?: string;
  } | null>(null);

  const demoUpiId = 'ritcareerhub@sbi';

  useEffect(() => {
    // If user is already logged in as student, prefill their details
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const u = JSON.parse(stored);
        setFormData((prev) => ({
          ...prev,
          fullName: prev.fullName || u.name || '',
          email: prev.email || u.email || '',
          usn: prev.usn || (u.email?.includes('@') ? '4RA22CS001' : ''),
        }));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(demoUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.usn || !formData.utrNumber) {
      alert('Please fill out your Name, USN, and 12-digit UTR Number.');
      return;
    }

    if (!/^\d{12}$/.test(formData.utrNumber.trim())) {
      alert('UTR Number must be exactly 12 numeric digits (from your PhonePe/GPay receipt).');
      return;
    }

    setSubmitting(true);
    setSubmissionStatus(null);

    try {
      // 1. Submit Registration & Payment UTR to Backend
      const payRes = await fetch('/api/payments/submit-utr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: formData.utrNumber.trim(),
          utrNumber: formData.utrNumber.trim(),
          registrationId: `REG-2026-CS01-${Math.floor(100 + Math.random() * 900)}`,
          fullName: formData.fullName,
          studentName: formData.fullName,
          usn: formData.usn.toUpperCase().trim(),
          studentUsn: formData.usn.toUpperCase().trim(),
          email: formData.email,
          studentEmail: formData.email,
          department: formData.department,
          year: formData.year,
          teamName: formData.teamName || 'Solo Entry',
          teamSize: formData.teamSize,
          eventTitle: 'CODESTORM 2026 – Challenge 01 (Website Building)',
          eventName: 'CODESTORM 2026 – Challenge 01 (Website Building)',
          amount: 1,
          paymentMethod: 'PhonePe UPI QR',
        }),
      });

      const payData = await payRes.json();

      if (!payRes.ok) {
        throw new Error(payData.error || payData.message || 'Payment submission failed');
      }

      // Broadcast sync across browser tabs so Admin Ledger updates immediately!
      try {
        localStorage.setItem('rit_txn_updated', Date.now().toString());
        window.dispatchEvent(new CustomEvent('rit_transaction_submitted', { detail: payData.transaction }));
      } catch (be) {
        console.debug('Storage sync notice', be);
      }

      setSubmissionStatus({
        success: true,
        message: 'Registration and UTR recorded! Verification is queued in the Admin Ledger.',
        transactionId: payData.transaction?.transactionId || payData.transaction?._id || formData.utrNumber.trim(),
      });

      // Clear sensitive fields
      setFormData((prev) => ({ ...prev, utrNumber: '' }));
    } catch (err: any) {
      setSubmissionStatus({
        success: false,
        message: err.message || 'An error occurred during submission. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8 border-b border-stone-200 pb-6">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            <span>GDG on Campus &bull; Dept of CSE &bull; RIT Hassan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0c2340] tracking-tight">
            CODESTORM 2026 &mdash; Challenge 01 Registration
          </h1>
          <p className="mt-2 text-stone-600 text-base max-w-3xl">
            Official registration portal for the Website Building Challenge. Complete your entry and submit your ₹1 test confirmation via PhonePe UPI QR.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Registration Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-stone-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-serif font-bold text-[#0c2340] mb-4">
              Participant Information
            </h2>

            {submissionStatus && (
              <div
                className={`mb-6 p-4 rounded-md border text-sm ${
                  submissionStatus.success
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="font-semibold text-base mb-1">{submissionStatus.message}</div>
                {submissionStatus.transactionId && (
                  <div className="mt-1 font-mono text-xs text-stone-700">
                    Confirmed UTR / Transaction ID:{' '}
                    <span className="font-bold bg-white px-2 py-0.5 rounded border border-emerald-300 text-amber-900">
                      {submissionStatus.transactionId}
                    </span>
                  </div>
                )}
                {submissionStatus.success && (
                  <div className="mt-3 pt-2 border-t border-emerald-200 flex items-center justify-between">
                    <span className="text-xs text-stone-600">Recorded in MongoDB Atlas live ledger</span>
                    <a
                      href="/admin"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0c2340] hover:bg-[#15345d] text-white text-xs font-semibold rounded shadow-xs transition-colors"
                    >
                      <span>Open Admin Ledger</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Yashawantha H M"
                    className="w-full px-3 py-2 border border-stone-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    College USN *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.usn}
                    onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                    placeholder="4RA22CS001"
                    className="w-full px-3 py-2 border border-stone-300 rounded-sm text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@rit.ac.in"
                    className="w-full px-3 py-2 border border-stone-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  >
                    <option>Computer Science & Engineering</option>
                    <option>Information Science & Engineering</option>
                    <option>Electronics & Communication</option>
                    <option>Mechanical Engineering</option>
                    <option>Civil Engineering</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Academic Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Team Mode
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  >
                    <option>Solo Hacker</option>
                    <option>Team (2 Members)</option>
                    <option>Team (3-4 Members)</option>
                  </select>
                </div>
              </div>

              {formData.teamSize !== 'Solo Hacker' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="e.g. CodeStorm Pioneers"
                    className="w-full px-3 py-2 border border-stone-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>
              )}

              {/* UTR Input Section */}
              <div className="pt-4 border-t border-stone-200">
                <label className="block text-xs font-bold text-[#0c2340] uppercase tracking-wide mb-1">
                  12-Digit PhonePe / UPI UTR Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={12}
                    value={formData.utrNumber}
                    onChange={(e) => setFormData({ ...formData, utrNumber: e.target.value.replace(/\D/g, '') })}
                    placeholder="e.g. 402918239014"
                    className="w-full px-3 py-2.5 font-mono text-base tracking-widest border border-amber-300 bg-amber-50/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-stone-500 font-sans">
                    {formData.utrNumber.length}/12
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-stone-500">
                  Scan the PhonePe QR code on the right, send the ₹1 test registration fee, and enter the 12-digit UTR/Ref from the transaction screen.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || formData.utrNumber.length !== 12}
                  className="w-full py-3 px-4 bg-[#0c2340] hover:bg-[#143258] text-white font-medium text-sm rounded-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                >
                  {submitting ? 'Verifying & Submitting...' : 'Submit Registration & UTR'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: PhonePe QR & Instructions (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* PhonePe QR Card */}
            <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-xs text-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Instant Payment Gateway
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0c2340]">
                Scan &amp; Pay via PhonePe / GPay
              </h3>
              <p className="text-xs text-stone-600 mt-1 mb-4">
                Demonstration Verification Fee: <span className="font-bold text-[#b45309]">₹1.00</span>
              </p>

              {/* QR Code Container */}
              <div className="mx-auto w-52 h-52 bg-stone-50 border-2 border-stone-200 p-2 rounded-md shadow-inner flex items-center justify-center">
                <img
                  src="/assets/phonepe_qr.jpg"
                  alt="Official PhonePe QR Code"
                  className="max-h-full max-w-full object-contain rounded"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* UPI ID Copy Box */}
              <div className="mt-4 pt-4 border-t border-stone-100">
                <div className="text-xs text-stone-500 mb-1">Official UPI Payee ID</div>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-xs font-mono font-bold bg-stone-100 px-3 py-1.5 rounded text-stone-800 border border-stone-200">
                    {demoUpiId}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="text-xs px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded transition-colors duration-150"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Instruction Callout */}
            <div className="bg-stone-50 rounded-lg border border-stone-200 p-5 text-xs text-stone-600 space-y-2">
              <div className="font-semibold text-stone-900 text-sm">UTR Verification Protocol:</div>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Scan the PhonePe QR with any UPI app (PhonePe, GPay, Paytm).</li>
                <li>Send test fee of ₹1 to initiate transaction telemetry.</li>
                <li>Copy the 12-digit UTR/Bank Ref Number from the confirmation screen.</li>
                <li>Paste above and submit to immediately populate the Admin ledger.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;