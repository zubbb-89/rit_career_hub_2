import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    // Check logged-in user from localStorage
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Compute page scroll percentage for the subtle 2px progress bar
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / winHeight)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-200">
      <nav 
        className={`w-full text-white transition-all duration-200 ${
          isScrolled 
            ? 'liquid-glass-nav-scrolled py-2' 
            : 'liquid-glass-nav-base py-3'
        }`}
        aria-label="Main institutional navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left Brand Area — Exact Logo Sequence Preserved */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            {/* 1. College Logo (Far-left) */}
            <img 
              src="/assets/college_logo.png" 
              alt="RIT College Crest" 
              className={`object-contain bg-white rounded-xs p-0.5 shadow-sm border border-slate-300 transition-all duration-200 ${
                isScrolled ? 'h-7 w-7' : 'h-8 w-8'
              }`}
              title="Rajeev Institute of Technology, Hassan"
            />

            {/* 2. Department Logo (Right after College Logo) */}
            <img 
              src="/assets/cse_logo.jpg" 
              alt="CSE Department Crest" 
              className={`object-contain bg-white rounded-xs p-0.5 shadow-sm border border-slate-300 transition-all duration-200 ${
                isScrolled ? 'h-7 w-7' : 'h-8 w-8'
              }`}
              title="Dept. of Computer Science & Engineering"
            />
            
            {/* 3. Title Text + 4. Club Logo (Beside text) */}
            <div className="flex items-center space-x-2 pl-0.5">
              <span className={`font-semibold tracking-tight text-white font-sans transition-all duration-200 ${
                isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              }`}>
                RIT CareerHub <span className="font-bold text-amber-400">AI</span>
              </span>
              <img 
                src="/assets/gdg_logo.jpg" 
                alt="GDG on Campus Club Emblem" 
                className="h-6 w-6 object-contain bg-white rounded-full p-0.5 shadow-sm border border-slate-300" 
                title="GDG on Campus – RIT Hassan"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 sm:space-x-4 text-xs font-medium">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-2.5 py-1.5 rounded-sm transition-colors duration-150 ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/events" 
              className={({ isActive }) => 
                `px-2.5 py-1.5 rounded-sm transition-colors duration-150 ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                }`
              }
            >
              CodeStorm Events
            </NavLink>
            <NavLink 
              to="/ai-tools" 
              className={({ isActive }) => 
                `px-2.5 py-1.5 rounded-sm transition-colors duration-150 ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                }`
              }
            >
              AI Tools
            </NavLink>
            <NavLink 
              to="/portfolio/yashawantha" 
              className={({ isActive }) => 
                `px-2.5 py-1.5 rounded-sm transition-colors duration-150 ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                }`
              }
            >
              MyRITfolio
            </NavLink>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => 
                `px-2.5 py-1.5 rounded-sm transition-colors duration-150 ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                }`
              }
            >
              Admin Ledger
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `px-2.5 py-1.5 rounded-sm transition-colors duration-150 ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-slate-200 hover:text-white'
                }`
              }
            >
              About
            </NavLink>

            {/* Auth / Account Action */}
            <div className="pl-2 border-l border-slate-700/60 flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-mono">
                    {user.name.split(' ')[0]} ({user.role})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-[11px] text-slate-300 hover:text-white underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-sm font-semibold transition-colors shadow-xs"
                >
                  Portal Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c2340] border-t border-slate-700 px-4 pt-3 pb-4 space-y-2 text-sm">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200 hover:text-amber-400"
            >
              Home
            </NavLink>
            <NavLink
              to="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200 hover:text-amber-400"
            >
              CodeStorm Events &bull; UTR Pay
            </NavLink>
            <NavLink
              to="/ai-tools"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200 hover:text-amber-400"
            >
              AI Career Readiness
            </NavLink>
            <NavLink
              to="/portfolio/yashawantha"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200 hover:text-amber-400"
            >
              MyRITfolio Showcase
            </NavLink>
            <NavLink
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200 hover:text-amber-400"
            >
              Admin Ledger (TRANSACTION IDs)
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200 hover:text-amber-400"
            >
              About RIT
            </NavLink>
            <div className="pt-2 border-t border-slate-700">
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium"
              >
                {user ? `Logged in as ${user.name}` : 'Portal Sign In / Register'}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Subtle Scroll Progress Indicator Bar directly under Navbar */}
      <div 
        className="h-[2px] bg-amber-500 w-full origin-left transition-transform duration-75 ease-out pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
    </header>
  );
};

export default Navbar;