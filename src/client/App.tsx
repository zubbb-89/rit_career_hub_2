import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import AdminDashboard from './pages/AdminDashboard';
import AiToolsPage from './pages/AiToolsPage';
import PortfolioPage from './pages/PortfolioPage';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lightweight scroll-to-top handler for smooth spatial context on route changes
const PageScrollManager: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <PageScrollManager />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/ai-tools" element={<AiToolsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:username" element={<PortfolioPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;