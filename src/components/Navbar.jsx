import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Zap, MessageSquare, TrendingUp, Search, FileText, ArrowRight } from 'lucide-react';

const solutions = [
  { icon: MessageSquare, label: 'AI Chatbot Pre-Registration',    desc: 'Check in visitors in 30 seconds via chat',  id: 'chatbot'    },
  { icon: TrendingUp,    label: 'Predictive Traffic Forecasting', desc: 'Know visitor volume days in advance',       id: 'forecast'   },
  { icon: Search,        label: 'Natural Language Search',        desc: 'Find records by typing plain English',      id: 'nlsearch'   },
  { icon: FileText,      label: 'Auto Compliance Reports',        desc: 'HIPAA & banking reports in 5 minutes',      id: 'compliance' },
];

export default function Navbar({ onNav }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const [hovBtn, setHovBtn]      = useState(null);
  const dropRef = useRef(null);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);

  useEffect(() => {
    const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const link = (id, label) => (
    <button key={id}
      onClick={() => onNav(id)}
      onMouseEnter={() => setHovBtn(id)}
      onMouseLeave={() => setHovBtn(null)}
      style={{
        padding: '7px 13px', borderRadius: 7, border: 'none',
        background: hovBtn === id ? '#F3F4F6' : 'transparent',
        color: hovBtn === id ? 'var(--text)' : 'var(--text-2)',
        fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
      }}>{label}</button>
  );

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: 64,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
      transition: 'all 0.25s',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', height: '100%', display: 'flex', alignItems: 'center', gap: 6 }}>

        {/* Logo */}
        <button onClick={() => onNav('home')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', marginRight: 28, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1B4FD8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.5px' }}>
            VISIT<span style={{ color: '#1B4FD8' }}>R</span>AK
          </span>
        </button>

        {/* Solutions dropdown */}
        <div ref={dropRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setDropOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '7px 13px', borderRadius: 7, border: 'none',
              background: dropOpen ? '#F3F4F6' : 'transparent',
              color: 'var(--text-2)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (!dropOpen) e.currentTarget.style.background = '#F3F4F6'; }}
            onMouseLeave={e => { if (!dropOpen) e.currentTarget.style.background = 'transparent'; }}
          >
            AI Solutions
            <ChevronDown size={13} color="var(--muted)" style={{ transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none' }} />
          </button>

          {dropOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0,
              background: '#fff', borderRadius: 12, border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)', padding: '6px', width: 380,
              animation: 'fadeUp 0.15s ease',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted-l)', letterSpacing: '0.8px', textTransform: 'uppercase', padding: '6px 10px 8px' }}>
                4 AI-Powered Solutions
              </div>
              {solutions.map(s => {
                const Icon = s.icon;
                return (
                  <button key={s.id}
                    onClick={() => { onNav(s.id); setDropOpen(false); }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '10px 10px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} color="#1B4FD8" />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 1 }}>{s.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.desc}</div>
                    </div>
                  </button>
                );
              })}
              <div style={{ borderTop: '1px solid var(--border-l)', margin: '6px 4px 4px', paddingTop: 6 }}>
                <button onClick={() => { onNav('home'); setDropOpen(false); }}
                  style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: 'none', background: '#F3F4F6', color: 'var(--text-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  See all solutions overview <ArrowRight size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {link('features',   'Features')}
        {link('industries', 'Industries')}
        {link('customers',  'Customers')}
        {link('company',    'Company')}

        <div style={{ flex: 1 }} />

        {/* CTAs */}
        <button
          onMouseEnter={() => setHovBtn('signin')}
          onMouseLeave={() => setHovBtn(null)}
          style={{ padding: '7px 16px', borderRadius: 7, border: '1px solid var(--border)', background: hovBtn === 'signin' ? '#F9FAFB' : '#fff', color: 'var(--text-2)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
          Sign in
        </button>
        <button onClick={() => onNav('demo')}
          onMouseEnter={() => setHovBtn('demo')}
          onMouseLeave={() => setHovBtn(null)}
          style={{ padding: '8px 20px', borderRadius: 7, border: 'none', background: '#1B4FD8', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', boxShadow: hovBtn === 'demo' ? '0 4px 14px rgba(27,79,216,0.4)' : '0 2px 8px rgba(27,79,216,0.25)' }}>
          Request demo →
        </button>
      </div>
    </nav>
  );
}
