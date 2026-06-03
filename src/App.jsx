import { useState } from 'react';
import Navbar          from './components/Navbar';
import FloatingChatbot from './components/FloatingChatbot';
import HomePage        from './pages/HomePage';
import RecommendationPage from './pages/RecommendationPage';
import VendorPage      from './pages/VendorPage';
import ChatbotPage     from './pages/ChatbotPage';
import ForecastPage    from './pages/ForecastPage';
import SearchPage      from './pages/SearchPage';
import CompliancePage  from './pages/CompliancePage';
import VisitorsPage    from './pages/VisitorsPage';
import SettingsPage    from './pages/SettingsPage';
import './index.css';

const PAGE_META = {
  recommendations: { title: 'AI Recommendation Engine',       tag: 'Solution 01' },
  vendors:         { title: 'Vendor & Contractor Management', tag: 'Solution 02' },
  chatbot:         { title: 'AI Chatbot Pre-Registration',    tag: 'Solution 03' },
  forecast:        { title: 'Predictive Traffic Forecasting', tag: 'Solution 04' },
  nlsearch:        { title: 'Natural Language Search',        tag: 'Solution 05' },
  compliance:      { title: 'Auto Compliance Reports',        tag: 'Solution 06' },
  visitors:   { title: 'Visitor Management',             tag: 'Live Data'   },
  settings:   { title: 'Platform Settings',              tag: 'Configuration' },
};

function InnerPage({ pageId, children, onNav }) {
  const meta = PAGE_META[pageId] || {};
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Breadcrumb bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '14px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => onNav('home')} style={{ fontSize: 13, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0 }}>Home</button>
          <span style={{ color: 'var(--muted-l)', fontSize: 12 }}>/</span>
          <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>AI Solutions</span>
          <span style={{ color: 'var(--muted-l)', fontSize: 12 }}>/</span>
          <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{meta.title}</span>
          {meta.tag && (
            <span style={{ marginLeft: 4, fontSize: 11, fontWeight: 700, color: '#1B4FD8', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 20, padding: '2px 10px' }}>{meta.tag}</span>
          )}
        </div>
      </div>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');

  const handleNav = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (page === 'home' || page === 'solutions' || page === 'features' || page === 'industries' || page === 'customers' || page === 'company' || page === 'access-control' || page === 'demo') {
      return <HomePage onNav={handleNav} />;
    }
    const inner = {
      recommendations: <RecommendationPage />,
      vendors:         <VendorPage />,
      chatbot:    <ChatbotPage />,
      forecast:   <ForecastPage />,
      nlsearch:   <SearchPage />,
      compliance: <CompliancePage />,
      visitors:   <VisitorsPage />,
      settings:   <SettingsPage />,
    };
    if (inner[page]) {
      return <InnerPage pageId={page} onNav={handleNav}>{inner[page]}</InnerPage>;
    }
    return <HomePage onNav={handleNav} />;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Navbar onNav={handleNav} activePage={page} />
      {renderPage()}
      <FloatingChatbot />
    </div>
  );
}
