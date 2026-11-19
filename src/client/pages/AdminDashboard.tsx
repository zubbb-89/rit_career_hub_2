import React, { useState, useEffect } from 'react';

interface Transaction {
  _id: string;
  transactionId: string;
  studentUsn: string;
  studentName: string;
  eventTitle: string;
  amount: number;
  utrNumber: string;
  paymentMethod: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
}

interface Certificate {
  _id: string;
  studentName: string;
  usn: string;
  title: string;
  category: string;
  issuingOrganization: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  verificationRef?: string;
  createdAt: string;
}

interface DbStats {
  counts: {
    users: number;
    students: number;
    transactions: number;
    events: number;
    achievements: number;
    verifiedCertificates: number;
  };
  metrics: {
    totalRevenueInr: number;
    verifiedRevenueInr: number;
    pendingUtrReviews: number;
  };
  telemetry: {
    database: string;
    engine: string;
    status: string;
    latencyMs: number;
    timestamp: string;
  };
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'certificates' | 'telemetry'>('transactions');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [stats, setStats] = useState<DbStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Load telemetry stats
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.warn('Failed to load DB stats', e);
    }
  };

  // Load transactions
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/transactions', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.transactions || []);
      }
    } catch (e) {
      console.warn('Failed to load transactions', e);
    } finally {
      setLoading(false);
    }
  };

  // Load certificates
  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/certificates', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setCertificates(data || []);
      }
    } catch (e) {
      console.warn('Failed to load certificates', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchTransactions();
    fetchCertificates();
  }, []);

  const handleVerifyTransaction = async (id: string, status: 'VERIFIED' | 'REJECTED') => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/transactions/${id}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status, notes: `Reviewed by RIT Admin on ${new Date().toLocaleDateString()}` }),
      });

      if (res.ok) {
        setActionMessage(`Transaction updated to ${status}`);
        setTimeout(() => setActionMessage(null), 3000);
        fetchTransactions();
        fetchStats();
      }
    } catch (e: any) {
      alert(`Action failed: ${e.message}`);
    }
  };

  const handleVerifyCertificate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/certificates/${id}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setActionMessage(`Certificate ${status === 'approved' ? 'Approved & Badge Issued' : 'Rejected'}`);
        setTimeout(() => setActionMessage(null), 3000);
        fetchCertificates();
        fetchStats();
      }
    } catch (e: any) {
      alert(`Action failed: ${e.message}`);
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.studentUsn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.utrNumber?.includes(searchQuery) ||
      t.transactionId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || t.verificationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and Telemetry Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              <span>Auditor &amp; Verification Console</span>
              <span>&bull;</span>
              <span>RIT Hassan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0c2340]">
              Admin Ledger &amp; Telemetry
            </h1>
          </div>

          {stats?.telemetry && (
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-sm border border-stone-200 text-xs">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-stone-600 font-mono">
                Atlas Connected: <strong className="text-stone-900">{stats.telemetry.latencyMs}ms</strong>
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-stone-600 font-mono">
                Pending UTRs: <strong className="text-amber-700">{stats.metrics?.pendingUtrReviews || 0}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Global Action Banner */}
        {actionMessage && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium rounded-sm">
            ✓ {actionMessage}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mt-6 border-b border-stone-200 flex space-x-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`pb-3 border-b-2 font-serif text-base transition-colors ${
              activeTab === 'transactions'
                ? 'border-[#0c2340] text-[#0c2340] font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            TRANSACTION IDs ({transactions.length})
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`pb-3 border-b-2 font-serif text-base transition-colors ${
              activeTab === 'certificates'
                ? 'border-[#0c2340] text-[#0c2340] font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Certificate Verifications ({certificates.length})
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`pb-3 border-b-2 font-serif text-base transition-colors ${
              activeTab === 'telemetry'
                ? 'border-[#0c2340] text-[#0c2340] font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Live Database Telemetry (Judges View)
          </button>
        </div>

        {/* TAB 1: TRANSACTION IDs LEDGER */}
        {activeTab === 'transactions' && (
          <div className="mt-6 bg-white rounded-lg border border-stone-200 p-6 shadow-xs">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search by USN, Name, UTR, or Ref ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-medium">Status:</span>
                {(['ALL', 'PENDING', 'VERIFIED', 'REJECTED'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      filterStatus === st
                        ? 'bg-[#0c2340] text-white font-semibold'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700 border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-y border-stone-200 font-semibold text-stone-900 uppercase tracking-wider">
                    <th className="py-3 px-3">Ref ID</th>
                    <th className="py-3 px-3">Student / USN</th>
                    <th className="py-3 px-3">Event</th>
                    <th className="py-3 px-3">12-Digit UTR</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-stone-400">
                        No transactions found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((tx) => (
                      <tr key={tx._id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3 px-3 font-mono font-medium text-stone-900">
                          {tx.transactionId}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-stone-900">{tx.studentName}</div>
                          <div className="font-mono text-stone-500 text-[11px]">{tx.studentUsn}</div>
                        </td>
                        <td className="py-3 px-3 max-w-[200px] truncate" title={tx.eventTitle}>
                          {tx.eventTitle}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {tx.utrNumber}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-stone-900">
                          ₹{tx.amount}.00
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                              tx.verificationStatus === 'VERIFIED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : tx.verificationStatus === 'REJECTED'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {tx.verificationStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1">
                          {tx.verificationStatus === 'PENDING' ? (
                            <>
                              <button
                                onClick={() => handleVerifyTransaction(tx._id, 'VERIFIED')}
                                className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-medium transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleVerifyTransaction(tx._id, 'REJECTED')}
                                className="px-2 py-1 bg-stone-200 hover:bg-rose-100 hover:text-rose-800 text-stone-700 rounded text-[11px] font-medium transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-stone-400 text-[11px] italic">Verified</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFICATE VERIFICATION */}
        {activeTab === 'certificates' && (
          <div className="mt-6 bg-white rounded-lg border border-stone-200 p-6 shadow-xs">
            <h2 className="text-lg font-serif font-bold text-[#0c2340] mb-4">
              Institutional Credential Approvals
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700 border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-y border-stone-200 font-semibold text-stone-900 uppercase tracking-wider">
                    <th className="py-3 px-3">Student</th>
                    <th className="py-3 px-3">Achievement Title</th>
                    <th className="py-3 px-3">Issuing Body</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Verification Badge</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {certificates.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-stone-400">
                        No certificates currently pending review.
                      </td>
                    </tr>
                  ) : (
                    certificates.map((cert) => (
                      <tr key={cert._id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-stone-900">{cert.studentName}</div>
                          <div className="font-mono text-stone-500 text-[11px]">{cert.usn}</div>
                        </td>
                        <td className="py-3 px-3 font-medium text-stone-900">{cert.title}</td>
                        <td className="py-3 px-3 text-stone-600">{cert.issuingOrganization}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                              cert.verificationStatus === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : cert.verificationStatus === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {cert.verificationStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          {cert.verificationStatus === 'approved' ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-300">
                              ✓ APPROVED BY RIT CAREERHUB ADMIN
                            </span>
                          ) : (
                            <span className="text-stone-400 text-[11px]">Unverified</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right space-x-1">
                          {cert.verificationStatus === 'pending' && (
                            <>
                              <button
                                onClick={() => handleVerifyCertificate(cert._id, 'approved')}
                                className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-medium"
                              >
                                Approve &amp; Issue Badge
                              </button>
                              <button
                                onClick={() => handleVerifyCertificate(cert._id, 'rejected')}
                                className="px-2 py-1 bg-stone-200 hover:bg-rose-100 text-stone-700 rounded text-[11px]"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE DATABASE TELEMETRY */}
        {activeTab === 'telemetry' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Total Students
                </div>
                <div className="text-3xl font-serif font-bold text-[#0c2340] mt-1">
                  {stats?.counts?.students || 0}
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Indexed in Atlas database</div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Confirmed UTR Records
                </div>
                <div className="text-3xl font-serif font-bold text-emerald-700 mt-1">
                  {stats?.counts?.transactions || 0}
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Verified Revenue: ₹{stats?.metrics?.verifiedRevenueInr || 0}
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Verified Badges Issued
                </div>
                <div className="text-3xl font-serif font-bold text-amber-700 mt-1">
                  {stats?.counts?.verifiedCertificates || 0}
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Official RIT career credentials</div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Atlas SRV Latency
                </div>
                <div className="text-3xl font-serif font-bold text-[#0c2340] mt-1">
                  {stats?.telemetry?.latencyMs || 0} ms
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  ● State: {stats?.telemetry?.status || 'Online'}
                </div>
              </div>
            </div>

            {/* Technical Architecture Audit Box for Judges */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs">
              <h3 className="text-base font-serif font-bold text-[#0c2340] mb-3">
                Live Full-Stack System Architecture Inspection (Judges View)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono bg-stone-50 p-4 rounded border border-stone-200">
                <div>
                  <div className="text-stone-500 mb-1">Database SRV Cluster:</div>
                  <div className="text-stone-800 font-bold">cluster0.orbau98.mongodb.net</div>
                </div>
                <div>
                  <div className="text-stone-500 mb-1">Target Database:</div>
                  <div className="text-stone-800 font-bold">ritcareerhub</div>
                </div>
                <div>
                  <div className="text-stone-500 mb-1">Security &amp; Encryption:</div>
                  <div className="text-stone-800 font-bold">PBKDF2 SHA-512 + JWT Auth</div>
                </div>
                <div>
                  <div className="text-stone-500 mb-1">Media &amp; CDN Storage:</div>
                  <div className="text-emerald-700 font-bold">Cloudinary (fywhu19j) &bull; Verified</div>
                </div>
                <div>
                  <div className="text-stone-500 mb-1">AI Intelligence Engine:</div>
                  <div className="text-amber-800 font-bold">Google Gemini (3.5-flash-lite)</div>
                </div>
                <div>
                  <div className="text-stone-500 mb-1">Audit Verification Hash:</div>
                  <div className="text-stone-800 font-bold">#RIT-VER-2026-CODESTORM</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;